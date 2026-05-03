# Catalogue des formats d'exercices — Koalio (P1 first)

> Source de vérité produit/pédagogique pour les formats d'exercices supportés par le moteur de génération. Une fiche P1 typique combine 5 exercices issus de ce catalogue.

---

## 1. Tableau de référence quantitatif

Métriques approximatives à garder en tête lors de la génération et de la mise en page d'une fiche.

| Format | Temps enfant / unité | Densité optimale / bloc | Blocs max / fiche P1 | Charge cognitive | Production écrite | Asset Midjourney requis |
|---|---|---|---|---|---|---|
| `text-blank` | ~10 sec / ligne | 5-10 lignes | 2 | Faible-moyenne | Oui (chiffre/lettre/mot) | Aucun |
| `count-items` | ~30 sec / set | 3-5 lignes | 2 | Faible | Oui (un chiffre) | 1 PNG par item répété |
| `circle` | ~5 sec / item | 6-12 items | 2 | Faible | Non (sélection) | 0 ou scène contextuelle |
| `match` | ~10 sec / paire | 4-6 paires | 2 | Faible-moyenne | Non (trait) | 1 PNG par concept × 2 |
| `multiple-choice` | ~15 sec / question | 3-5 questions | 1 | Moyenne | Non (case à cocher) | Variable (options en images) |
| `order` | ~1 min / set | 1 séquence (4-5 items) | 1 | Moyenne-élevée | Variable (numéro ou réécriture) | 0 ou images |
| `draw-items` | **2-5 min / bloc** | 1-2 zones | 2 | Moyenne | Geste graphique | Optionnel (amorces) |

**À retenir** :
- Une fiche P1 (5 exercices) coûte ~15-25 min total à un enfant. Au-delà, il décroche.
- `draw-items` est le format **le plus chronophage** — l'utiliser avec parcimonie.
- `text-blank` est le format **le plus rapide** — bon candidat pour le drill quand on veut beaucoup d'occurrences.
- Le "temps unité" varie aussi selon le sous-variant : un word problem text-blank = 30 sec, un compute simple = 5 sec.

---

## 2. Recette d'une fiche P1 type

```
Fiche P1 maths (5 exercices, ~15-20 min) :
├── 1 bloc text-blank "compute" (drill, mise en confiance)         — 6-8 lignes, 1 min
├── 1 bloc count-items (ancrage visuel d'un concept)               — 3-5 lignes, 2 min
├── 1 bloc text-blank "reverse" ou "decompose"                     — 5-6 lignes, 2 min
├── 1 bloc match OU MCQ (variation cognitive)                      — 4-6 paires, 2 min
└── 1 bloc draw-items OU order (point pédagogique fort)            — 1 zone/séquence, 5 min

Fiche P1 français (5 exercices) :
├── 1 bloc circle phonème (entoure mots avec /a/)                  — 8-12 mots, 2 min
├── 1 bloc match (image ↔ mot)                                     — 4-6 paires, 3 min
├── 1 bloc circle (entoure les lettres "m" / les majuscules)       — 10-15 items, 2 min
├── 1 bloc match (majuscule ↔ minuscule)                           — 4-6 paires, 2 min
└── 1 bloc order (ordre d'une histoire) ou MCQ (phonème initial)   — 4-5 items, 3 min
```

---

## 3. Modèle conceptuel : 3 axes orthogonaux

Un exercice = combinaison de :

1. **Format** — *comment* l'enfant répond (cf. catalogue détaillé ci-dessous)
2. **Contenu** — *quoi* est testé (alimenté par programme FWB, par niveau et matière)
3. **Habillage / funTheme** — *quel* univers visuel (dinosaures pour le MVP)

Les 3 axes sont presque indépendants → on peut les coder séparément, les combiner à l'infini.

---

## 4. Catalogue détaillé

### 4.1. `text-blank` ⭐⭐⭐

> Texte avec un ou plusieurs `___` à compléter. Format le plus universel et le plus rapide.

**Sous-variants en P1** (8) :
1. **Compute** : `3 + 4 = ___`
2. **Reverse** : `7 + ___ = 10`
3. **Decompose** : `17 = ___D + ___U`
4. **Sequence** : `2, 4, ___, 8, ___`
5. **Compare** : `5 ___ 8` (avec <, >, =)
6. **Word problem** : `Léa a 6 œufs. Elle en trouve 3. Elle en a ___.`
7. **Notation visuelle pour opérandes** : dés, doigts, images peuvent remplacer les chiffres (`⚀ + ☐ = 3`)
8. **Phrase à trou** (P3+) : `Le chat ___ sur le canapé.`

**Variations visuelles** : inline (1 ligne), tabulaire (D+U en colonnes), posé (P3+), compact 2-colonnes pour drill.

**Limites pédagogiques** :
- Aucune dimension visuelle (sauf notation) — peu adapté aux concepts qui demandent manipulation.
- Réponse univoque, pas de créativité.
- Monotone à haute dose (>2 blocs par fiche = soporifique).
- Pas de raisonnement visible (on voit le résultat, pas la démarche).
- Repose sur la lecture (mauvais lecteur P1 galère sur les word problems).

**Limites pratiques** :
- Multi-blanc pénible au-delà de 2-3 par ligne.
- Phrase trop longue noie le blank.
- Validation binaire (peu de tolérance).

**Quand c'est BON** : drill calcul mental, mémorisation, décomposition, application directe, autonomie correction parent.

**Quand c'est MAUVAIS** : découverte d'un concept (préfère count-items / draw-items), comparer sans calculer (préfère circle / MCQ), grandeurs physiques (préfère count-items).

**Reco P1** :
- Maximum **2 blocs** par fiche.
- 1 bloc compute en début (mise en confiance, 6-8 lignes).
- 1 bloc word-problem en fin (application, 1-3 énoncés).
- Éviter le multi-blanc sauf pour décomposition D/U (visuellement claire).

---

### 4.2. `count-items` ⭐⭐⭐

> Compter une collection d'items visuels et écrire le nombre.

**Sous-variants** (9) :
1. **Simple count** : `🥚🥚🥚🥚🥚 → ___`
2. **Mixed groups** : `3 œufs + 2 fossiles → ___ œufs, ___ fossiles`
3. **Scene scattering** : items dispersés dans une scène ("combien de poissons dans le lac ?")
4. **Pre-grouped** : 2 rangées de 5 étoiles (intro 5+5=10)
5. **By category** : "4 œufs blancs + 3 bleus → ___ blancs, ___ bleus"
6. **Compare** : 2 sets, écrire chaque count + entourer le plus grand
7. **Skip count** : paires (2,4,6...) ou mains (5,10,15...)
8. **Count syllables** (français) : `chocolat → ___ syllabes`
9. **Count phonemes** (français) : `chat → ___ sons`

**Variations visuelles** : rangée alignée, grille (2x3, 3x4...), disposition libre (scene), avec cadres groupés (frame de 5).

**Limites pédagogiques** :
- Ne travaille QUE le dénombrement (mono-tâche).
- Plafonne autour de 30 items (au-delà, illisible).
- **Compétence dépassée rapidement** — c'est un format P1-P2 quasi-exclusivement.
- Dépend complètement de la qualité visuelle (asset Midjourney critique).
- Monotone si répété.

**Limites pratiques** :
- Densité d'items critique (trop dense → erreur, trop espacé → bouffe la page).
- Items identiques vs variés : compromis facilité / pédagogie.
- Versions phono difficiles à matérialiser sans audio.

**Quand c'est BON** : premier contact avec un nombre (P1 début d'année), introduction visuelle d'un concept, conscience phonologique, variation visuelle dans une fiche dominée par du calcul.

**Quand c'est MAUVAIS** : calcul mental (préfère text-blank), nombres > 30 (illisible), P3+ pour dénombrement pur (infantilisant).

**Reco P1** :
- 1 à 2 blocs par fiche.
- Items entre 5 et 15, exceptionnellement 20.
- Toujours en funTheme (œufs de dino, pas pommes génériques).
- Au moins 1 variant "mixed groups" ou "compare" pour la richesse.
- Bloc en début ou milieu de fiche.

---

### 4.3. `circle` (entourer) ⭐⭐⭐ (français)

> Sélectionner par discrimination dans un set d'items, sans écriture.

**Sous-variants** (9) :

Maths :
1. Par attribut visuel (entoure les disques)
2. Par valeur (entoure les nombres ≤ 10)
3. Par résultat d'opération (entoure les additions = 10)
4. Dans un set d'images (entoure 5 œufs dans la scène)

Français :
5. **Par son présent** (mots avec /a/) — **dominant P1**
6. Par lettre (entoure tous les "m")
7. Par majuscule/minuscule
8. Par début de mot (commence par "B")
9. Mots-outils (entoure les "le" dans la phrase)

**Variations visuelles** : liste linéaire, grille, scène intégrée, multi-couleurs (P2+).

**Limites pédagogiques** :
- Aucune production écrite — bon pour explorer, insuffisant pour ancrer.
- Validation visuelle ambiguë (cercle approximatif qui touche 2 voisins).
- Critère limpide obligatoire (vocabulaire connu requis).
- Variabilité limitée (3 critères sur le même set = répétitif).

**Limites pratiques** :
- Espacement entre items critique (sinon cercles qui se chevauchent).
- Cercle d'un P1 = approximatif, prévoir de l'air autour de chaque item.
- Multi-couleurs supposent 2 crayons à dispo.

**Quand c'est BON** : phonologie / sons français P1 (irremplaçable), discrimination visuelle, renforcement, enfant en difficulté graphique, pause cognitive dans une fiche calcul.

**Quand c'est MAUVAIS** : drill calcul (préfère text-blank), production écrite, notion abstraite jamais vue.

**Reco P1** :
- 1 à 2 blocs par fiche (en français P1, jusqu'à 2 sans monotonie).
- 6 à 12 items par set, max 15.
- Critère univoque (pas de combinaison ET/OU).
- Toujours un exemple résolu (item déjà entouré).

---

### 4.4. `match` (relier) ⭐⭐

> Tracer un trait entre items d'une colonne gauche et items d'une colonne droite.

**Sous-variants** (12) :

Maths (1-7) :
1. Chiffre ↔ écriture lettres (`3 ↔ trois`)
2. Chiffre ↔ doigts/dé (`5 ↔ ✋`)
3. Quantité ↔ chiffre (`🥚🥚🥚 ↔ 3`)
4. Figure ↔ nom (`△ ↔ triangle`)
5. Solide ↔ image
6. Opération ↔ résultat (`3+4 ↔ 7`)
7. Heure pile ↔ horloge

Français (8-12) :
8. **Image ↔ mot** (`🐱 ↔ "chat"`) — **exo pivot du décodage P1**
9. Majuscule ↔ minuscule
10. Cursif ↔ script
11. Mot ↔ syllabes (`chocolat ↔ cho-co-lat`)
12. Mot ↔ son initial

**Variations visuelles** : 2 colonnes parallèles, items dispersés (scène), 3 colonnes (P2+), avec couleurs.

**Limites pédagogiques** :
- Plafond cognitif vers 6-8 paires (au-delà, lignes croisées illisibles).
- Pas de production écrite.
- Risque "deviner par élimination" (5 paires faites en cascade).
- Demande motricité fine (lignes droites point-à-point).

**Limites pratiques** :
- Espacement vertical 8 mm minimum.
- Distance horizontale 30-50 mm entre colonnes.
- Items de tailles homogènes (sinon problèmes d'alignement).
- Ordre randomisé à droite (sinon trivial).

**Quand c'est BON** : décodage français P1 (image ↔ mot), multi-représentation maths, vocabulaire scolaire, P1 trim 1 (évite l'écriture).

**Quand c'est MAUVAIS** : drill calcul, plus de 8 paires, notion non vue.

**Reco P1** :
- 1 à 2 blocs par fiche.
- 4 à 6 paires (max).
- Asymétrie quand possible (1 distracteur à droite).
- Exemple résolu : 1ère paire déjà reliée.

---

### 4.5. `multiple-choice` (QCM) ⭐⭐

> Question + 3 options (rarement 4), l'enfant en choisit une (case à cocher).

**Sous-variants** (9) :

Maths :
1. Reconnaître une figure
2. Reconnaître un nombre
3. Comparer deux nombres
4. Identifier un résultat d'opération
5. Compter et choisir

Français :
6. Phonème initial (avec options en images en P1 trim 1-2)
7. Reconnaître une lettre (b/d/p/q distracteurs)
8. Mot dans la phrase (cloze)
9. Image qui correspond au mot

**Variations visuelles** : cases à cocher (☐ — la plus claire pour P1), lettres à entourer, bulle à colorier, inline dans une phrase.

**Limites pédagogiques** :
- **Possibilité de deviner** (33-50%).
- Distracteurs critiques (refléter erreurs typiques : b/d/p, 6/9, +/−).
- Pas de production.
- Demande lecture de toutes les options (P1 trim 1 → forcer images).
- Couvre mal le drill rapide.

**Limites pratiques** :
- Espacement entre options ≥ 25 mm.
- Format options homogène (tout texte ou tout image).
- Cohérence visuelle des distracteurs.
- Convention de choix : cases à cocher pour P1.

**Quand c'est BON** : reconnaissance fine (figure, nombre, lettre b/d/p), distracteurs pédagogiques, phonème initial P1, discrimination subtile.

**Quand c'est MAUVAIS** : drill calcul, production, plus de 5 questions à la suite.

**Reco P1** :
- 1 bloc par fiche maximum.
- 3 options optimum.
- En P1 trim 1-2 : options en images obligatoires.
- Distracteurs pédagogiques (refléter erreurs typiques).
- Toujours un exemple résolu.

---

### 4.6. `order` (ranger) ⭐

> Items donnés en désordre à arranger dans une séquence (numérique, chronologique, alphabétique).

**Sous-variants** (10) :

Maths :
1. **Nombres croissant** (`7, 3, 9, 1, 5 → 1, 3, 5, 7, 9`)
2. Nombres décroissant
3. Tailles / longueurs (visuel)
4. Heures pile (matin → soir)

Français / Histoires :
5. **Ordre d'une histoire** (4 images chronologiques) — classique P1
6. Lettres alphabétique
7. Lettres pour former un mot (anagram)
8. Syllabes pour former un mot

Sciences :
9. Étapes de croissance (graine → arbre)
10. Étapes d'une action (se laver les mains)

**Variations visuelles** : numérotation dans cases, réécriture en dessous, flèches (chemin), items à découper (manuel).

**Limites pédagogiques** :
- Solutions multiples possibles (ambigu à corriger).
- Erreur cumulative (intervertir 2 → tout le reste suit).
- Charge cognitive moyenne-élevée (lire critère, comparer N items, choisir le 1er, le 2e parmi N-1...).
- Pas adapté au drill (1 par fiche).

**Limites pratiques** :
- Items visuellement distinguables (espacement large).
- Numérotation > réécriture pour P1 (rapide).
- Plus de 5 items en P1 = surcharge.

**Quand c'est BON** : sens de l'ordre numérique, séquence d'histoire, ordre par grandeur, ordre alphabétique (P1 fin), notion de temporalité.

**Quand c'est MAUVAIS** : drill, plus de 5 items, ordre ambigu (plusieurs solutions valides).

**Reco P1** :
- 1 bloc max par fiche.
- 4 à 5 items.
- Numérotation dans cases plutôt que réécriture.
- Critère univoque, exemple résolu.
- Privilégier variants 1 (nombres) et 5 (histoire).

---

### 4.7. `draw-items` (zones de dessin libres) ⭐

> Zone vide bordée pointillée où l'enfant dessine ce que la consigne demande. Le format le plus chronophage.

**Sous-variants** (10) :

Maths (1-7) :
1. **Dessiner N items** (`Dessine 5 ronds`)
2. **Dessiner pour compléter** (`Il y a 3 œufs. Dessine 4 en plus.`)
3. Dessiner pour égaliser
4. **Dessiner une figure** géométrique (triangle, carré, à la latte)
5. **Dessiner pour partager** (10 œufs dans 2 nids)
6. **Dessiner la situation** d'un problème (modélisation)
7. Compléter un dessin existant

Français / Spatial (8-10) :
8. Dessiner ce que dit le mot
9. **Dessiner selon une consigne spatiale** (`un chien sous l'arbre`)
10. Tracer à la latte

**Variations visuelles** : cadre vide pointillé, cadre avec amorce, plusieurs petits cadres (partage), grande zone libre (problèmes ouverts), avec mini-texte d'amorce semi-transparent.

**Limites pédagogiques** :
- Validation très subjective (cercles imparfaits, items mal alignés).
- Compétence graphique parasite l'évaluation.
- **Très chronophage (2-5 min par bloc)**.
- Risque de fuite (variant ouvert → dessin hors-sujet).
- Pas de feedback sur le raisonnement (dessine 4 au lieu de 5 → mal compté ou mal dessiné ?).

**Limites pratiques** :
- Espace gourmand (zone 30×30 mm pour items, 50×80 mm pour situation).
- Bordure pointillée + texte d'amorce = convention claire.
- 2 blocs draw-items + 1 bloc text-blank = fiche qui paraît "vide".

**Quand c'est BON** : manipulation concrète (P1 apprend en faisant), modélisation d'un problème, géométrie élémentaire, compréhension spatiale, fractionnement, compléter un dessin (engagement narratif).

**Quand c'est MAUVAIS** : drill, précision graphique critique, plus de 2 blocs / fiche, consigne ambiguë.

**Reco P1** :
- **1 à 2 blocs maximum** par fiche.
- Zone 30-50 mm pour items, 60-80 mm pour situations.
- Bordure pointillée + texte amorce semi-transparent.
- **Privilégier les variants scaffoldés** (avec amorce ou conteneurs).
- Consigne univoque ("dessine 5 ronds" pas "quelques").
- Idéalement combiné avec un text-blank corrélé pour consolidation écrite.

---

## 5. Formats hors-scope MVP

### `complete-grid`
**Abandonné** lors du brainstorm — la plupart des cas étaient en réalité des `text-blank` stackés (dés à compléter, suite à trous, tableau D+U). Les vrais cas (pyramides, carrés magiques, multi-représentation) sont rares en P1 et seront ré-évalués pour P2-P3.

### `label-diagram`
Pas pertinent en P1 (pas d'étiquettes formelles attendues). Réapparaît en P3-P4 (côtés/sommets de figures, axes de symétrie en P4, schéma corps en sciences).

### `free-write`
Pas pertinent en P1 (pas encore d'écriture autonome de phrases). Réapparaît en P2 fin (phrases courtes) et devient central en P3+.

---

## 6. Implications pour le moteur de génération

### Modèle TypeScript proposé

```ts
type ExerciseFormat =
  | 'text-blank'
  | 'count-items'
  | 'circle'
  | 'match'
  | 'multiple-choice'
  | 'order'
  | 'draw-items';

interface Exercise {
  format: ExerciseFormat;
  variant?: string;        // sous-variant (ex: 'compute', 'phoneme-initial')
  instruction: string;
  data: unknown;           // shape dépend du format (discriminated union)
  solutions: unknown;      // shape dépend du format
  funTheme?: FunTheme;     // habillage facultatif
  estimatedTimeSec?: number; // facultatif, utile pour la mise en page
}
```

### Prompt Claude (squelette)

Le system prompt fournit à Claude :
1. Le programme FWB du niveau ciblé (extrait du `.md`)
2. Le catalogue ci-dessus pour comprendre quels formats utiliser
3. Une consigne de **distribution par fiche** (3-4 ⭐⭐⭐ + 1-2 ⭐⭐/⭐ pour la variété)
4. Les contraintes de temps total (~15-20 min par fiche en P1)
5. Les conventions JSON par format (discriminated union)

### Validation post-génération

Selon le format :
- `text-blank` (variants compute/reverse/decompose/sequence/compare) : regex math basique
- `text-blank` (word-problem) : trust Claude (validation programmatique galère)
- `count-items` : trust Claude (la quantité d'items est juste un nombre)
- `circle`, `match`, `multiple-choice` : vérifier que les bonnes réponses existent dans les options proposées
- `order` : vérifier que la séquence solution est une permutation des items
- `draw-items` : pas de validation (production graphique subjective)

### Ordre d'implémentation suggéré

1. **Sprint 1** : `text-blank` seul + Cloud Function + form Angular rebranché → première fiche P1 maths générée.
2. **Sprint 2** : `count-items` + assets Midjourney dinos (œuf + container).
3. **Sprint 3** : `circle` + `match` (couvrent le français P1).
4. **Sprint 4** : `multiple-choice` + `order` + `draw-items`.

Une fois les 7 formats stabilisés sur P1 → extension P2-P6.
