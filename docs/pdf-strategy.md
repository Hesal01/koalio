# Stratégie PDF Koalio

> Source de vérité technique pour la génération des PDFs de fiches d'exercices. Le PDF est *le* livrable produit Koalio ("la force de l'app c'est ces pdf"), donc cette décision est structurante.

---

## TL;DR

- **Aujourd'hui (MVP)** : `window.print()` + feuille de style `@media print` native navigateur. Vectoriel parfait, gratuit, ~30-50 KB.
- **Cible production** : Puppeteer/Playwright dans une Cloud Function Firebase. L'app POST le `Sheet` → la function rend le HTML headless → renvoie le PDF blob → l'app déclenche le download.
- **À éviter, déjà testé sans succès** : `html2canvas + jsPDF` (raster lourd, flou en zoom, lag, 40 MB). `jsPDF` programmatique pur (perd toute la richesse visuelle, "très moche" selon test user).

---

## 1. Solution actuelle : `window.print()`

### Comment ça marche

`src/app/features/generator/generator-result.component.ts` :
```ts
downloadPdf() {
  const previousTitle = document.title;
  document.title = this.buildFilename().replace(/\.pdf$/, '');
  window.print();
  setTimeout(() => { document.title = previousTitle; }, 500);
}
```

Le navigateur ouvre sa dialog d'impression, l'user choisit "Enregistrer en PDF", le PDF généré est vectoriel natif (texte sélectionnable, fonts embarquées, emojis Apple Color/Segoe natifs).

### Feuilles de style print

Trois fichiers contiennent du `@media print` :

| Fichier | Rôle |
|---|---|
| `src/styles.scss` | `@page` (A4 portrait, marges 15mm 18mm) ; cache `app-header` ; reset `main` padding ; `print-color-adjust: exact` global |
| `src/app/features/generator/generator-result.component.scss` | Cache `.result-header` et `.actions-top` ; reset `.page` / `.container` padding |
| `src/app/features/generator/sheet-layout/sheet-layout.component.scss` | Kill `box-shadow` / `border-radius` de `.sheet` ; bascule `.sheet-body` de `display: flex` vers `block` (sinon `break-inside: avoid` ne tient pas) ; `break-inside: avoid !important` sur `.exercise-block` ; `margin-bottom: 8mm` sur les exercises pour remplacer le `gap` flex perdu |

### Avantages

- **Vectoriel parfait** : net à n'importe quel zoom, pas de pixellisation.
- **~30-50 KB** par fiche au lieu de 2-40 MB en raster.
- **Gratuit** : pas de Cloud Function, pas de coût d'invocation, fonctionne offline.
- **Fonts riches** : Inter + Fredoka embarqués automatiquement, emojis natifs colorés.
- **Sélectionnable, recherchable, accessible** dans tout viewer PDF.
- **Code minimal** : ~5 lignes JS + 3 blocs `@media print`. Pas de dépendances.

### Inconvénients (motivent la migration future)

1. **1 clic supplémentaire pour l'user** : la dialog navigateur s'interpose. L'user doit choisir "Enregistrer en PDF" puis cliquer "Enregistrer". Sur Chrome/Edge c'est par défaut, sur Safari c'est moins évident.
2. **Filename approximatif** : on set `document.title` mais Safari ignore parfois, et la dialog permet de toute façon à l'user de renommer.
3. **Pas industrialisable** : impossible d'envoyer un PDF par email automatique, de programmer une fiche hebdo, de générer en batch côté serveur — tout passe par l'utilisateur.
4. **UI navigateur non-brandée** : la dialog d'impression n'est pas Koalio. On ne peut pas y afficher de logo, de texte d'accompagnement, de prévisualisation custom.
5. **Variabilité cross-browser** : Chrome, Safari, Firefox génèrent chacun le PDF avec leurs propres règles ; les rendus diffèrent légèrement.

---

## 2. Cible production : Puppeteer dans Cloud Function Firebase

### Pourquoi cette stack

- Le `CLAUDE.md` mentionne déjà Firebase Functions dans le stack (Firestore, Auth, Functions, Hosting).
- Puppeteer est l'industrie standard 2026 pour "render HTML → PDF" côté serveur (Linear, Notion, GitHub utilisent ce pattern).
- Le Chromium headless lancé par Puppeteer rend le HTML *exactement* comme un navigateur, donc la cohérence visuelle entre l'aperçu HTML sur `/result/:id` et le PDF est garantie sans effort.

### Architecture cible

```
┌─────────────┐     POST /generatePdf     ┌──────────────────┐
│  Angular    │  { sheetId: "abc..." }    │  Cloud Function  │
│  client     │ ────────────────────────▶ │  + Puppeteer     │
│             │                            │                  │
│             │  ◀──────────────────────── │  Renders HTML    │
│             │     PDF blob (Stream)      │  → page.pdf()    │
└─────────────┘                            └──────────────────┘
       │
       └──▶  saveAs(blob, filename)
```

L'Angular app déclenche le téléchargement avec `<a href={blobUrl} download={filename}>` — UX 100 % transparente, pas de dialog navigateur.

### Skeleton Cloud Function (Node.js)

```ts
// functions/src/generatePdf.ts
import * as functions from 'firebase-functions';
import puppeteer from 'puppeteer';

export const generatePdf = functions
  .runWith({ memory: '1GB', timeoutSeconds: 60 })
  .https.onCall(async (data, ctx) => {
    const { sheetId } = data;
    // 1. Authentifier l'user, récupérer la sheet depuis Firestore
    const sheet = await getSheetForUser(sheetId, ctx.auth);

    // 2. Lancer Puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'], // requis sur Cloud Functions
    });
    const page = await browser.newPage();

    // 3. Render le HTML (on réutilise le component sheet-layout via SSR
    //    OU on poste le HTML rendu côté client OU on a un endpoint /render?id=)
    await page.goto(`https://koalio.be/_print/${sheetId}?token=...`, {
      waitUntil: 'networkidle0',
    });

    // 4. Émettre le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '18mm', right: '18mm' },
    });

    await browser.close();
    return { pdfBase64: pdfBuffer.toString('base64') };
  });
```

### Coûts estimés

- Cloud Functions Firebase : ~0,40 € par million d'invocations + temps CPU (~50ms-1s par PDF).
- Cold start Puppeteer : 1-3 secondes la première fois, puis warm pendant ~10 min.
- Pour 10 000 PDFs/mois (~333 fiches/jour) : <5 € de fonction + bande passante. Négligeable au plan Premium 4,99 €/mois.

### UX gain

- Bouton "Télécharger" → spinner 1-3 s → fichier descend, point. Zéro dialog, zéro friction.
- Filename custom imposé côté serveur (`Content-Disposition`).
- Possibilité d'ajouter un watermark, une signature, un footer dynamique server-side.

---

## 3. Quand migrer

Trigger naturels pour passer de `window.print()` à Puppeteer :

1. **Premier feature qui exige un PDF côté serveur** :
   - "Envoyer la fiche par email à mon enfant"
   - "Recevoir une fiche programmée chaque dimanche soir"
   - "Export récapitulatif mensuel pour le prof"
   - Une fois qu'on a *besoin* d'un endpoint qui retourne un PDF, autant tout faire passer par là.

2. **Friction de conversion mesurée** : si le tracking montre que le taux de download chute parce que l'user abandonne dans la dialog navigateur (Safari surtout), c'est le signal pour migrer.

3. **Volume premium** : à partir de quelques centaines d'abonnés payants, l'argument "UX premium = pas de dialog" devient vendeur.

4. **Custom assets** : si les illustrations Midjourney (cf. `public/assets/sheet/README.md`) demandent un control fin du rendu (filtres, compositions) que `window.print()` ne fait pas bien, server-side gagne.

Pas de date fixée. Réévaluer trimestriellement ou au déclenchement d'un des triggers ci-dessus.

---

## 4. Anti-références (à ne pas refaire)

Ces approches ont été testées et rejetées en mai 2026 :

- ❌ **`html2canvas` + `jsPDF` (image-based)** : rasterisation systématique → PDF de 40 MB en PNG, 2-5 MB en JPEG mais flou en zoom et lag de scroll. Limite structurelle, pas une question de tuning.
- ❌ **`jsPDF` natif programmatique** (`text()`, `rect()`, `lines()`) : crisp et léger (~50 KB) mais visuellement très en retrait du HTML — Helvetica au lieu de Fredoka/Inter, pas d'emojis, perte des fonds pastels. "Très moche" verdict user. Si on revient à du natif jsPDF un jour, il faudra embarquer des fonts custom + des illustrations rasters → autant prendre Puppeteer.

---

## 5. Fichiers concernés

### Solution actuelle

| Fichier | Rôle |
|---|---|
| `src/app/features/generator/generator-result.component.ts` | Trigger `window.print()` + filename via `document.title` |
| `src/styles.scss` | `@page`, `app-header { display: none }`, print-color-adjust |
| `src/app/features/generator/generator-result.component.scss` | Cache header + boutons |
| `src/app/features/generator/sheet-layout/sheet-layout.component.scss` | Layout sheet en print, page-break sur exercises |

### Migration future

| À créer | Rôle |
|---|---|
| `functions/src/generatePdf.ts` | Cloud Function callable Puppeteer |
| `functions/package.json` | Dépendances `puppeteer`, `firebase-functions` |
| Endpoint `/_print/:id?token=...` | Route Angular non-listée qui rend la fiche sans chrome (utilisée par Puppeteer en headless) |
| `src/app/features/generator/generator-result.component.ts` | Remplacer `downloadPdf()` par appel à la Cloud Function |

### À garder utile dans les deux cas

- `public/assets/sheet/` (README + dossiers items/themes) : les illustrations Midjourney à venir s'intègreront dans `sheet-layout.component.html` côté HTML, peu importe qui rend le PDF.
