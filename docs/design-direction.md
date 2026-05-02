# Direction artistique Koalio

> Source de vérité de la DA. Si tu te demandes "à quel point doit-on être enfantin ?" ou "ce dashboard fait-il partie du système parent ou enfant ?", lis ce document avant de toucher du SCSS.

---

## 1. La vraie question

Quand on demande "Koalio doit-il avoir un style enfantin ?", on pose la mauvaise question. La bonne formulation est : **où être enfantin, et pour qui ?**

Koalio a trois surfaces avec trois publics qui ne réagissent pas au même style :

| Surface | Qui regarde | Qui décide |
|---|---|---|
| Landing + checkout | Parent / enseignant | **Parent / enseignant** |
| Dashboard app | Souvent l'enfant + parent | Parent valide |
| PDF d'exercice | **L'enfant** (sur papier) | Enfant adhère ou pas |

Mélanger les trois publics dans une seule direction visuelle est l'erreur que l'on a faite jusque-là (cf. les 8 dashboards explorés en parallèle).

---

## 2. Brainstorm — pour et contre un style enfantin

### Pour

1. **Le PDF est l'output principal.** L'enfant l'a sous les yeux 20 min. Un PDF gris = il refuse. C'est le reproche fait à IXL ("frustrant") et aux fiches Pinterest génériques ("design daté"). C'est le terrain qu'il *faut* gagner.
2. **Cohérence avec l'ADN.** Koala + corail/menthe + thèmes dinos/pirates/espace : si on bascule en Apple-sobre partout, on perd l'USP. La personnalisation thématique sans illustrations devient juste un mot dans un énoncé.
3. **Pinterest.** Canal SEO #1 prévu. L'algo récompense les visuels colorés et illustrés. Une fiche neutre ne pin pas.
4. **Vide concurrentiel.** Khan Academy = "pas assez ludique" ; Prodigy = "pay-to-win" ; IXL = "froid". Le créneau "ludique mais sérieux" est libre.
5. **Premium ≠ sobre pour enfant.** Lego, Janod, Tonies, Pomme d'Api : le premium enfant est *coloré et illustré avec goût*. La sobriété pour enfant ressemble à du low-cost.

### Contre

1. **Le payeur n'est pas l'utilisateur.** Un parent décide en 20 s sur la landing si "ça fait sérieux". Bonbons + emojis partout = "c'est un jouet, pas un outil scolaire".
2. **Cible enseignant cassée.** Les profs se méfient du ludique. Pour vendre du B2B (9,99 €/mois ou 150-500 €/an école), un dashboard avec coins et quêtes décrédibilise instantanément.
3. **Justifier le prix vs gratuit.** À 4,99 €/mois face à des PDF gratuits sur Pinterest, on vend du *sérieux pédagogique aligné programme FWB*, pas une animation. Trop kitsch = "pourquoi je paie ?"
4. **Vieillissement P5-P6.** Un visuel qui marche en P1 (6 ans) fait honte en P6 (12 ans). Risque de perdre 50 % du marché en haut de cycle.
5. **Direction artistique éclatée.** L'audit montre 3 directions parallèles (Apple-sobre, Duolingo, RPG). Chaque dashboard est une réponse différente à la même question — c'est une indécision, pas un système.

### Réponse

Le bon modèle est **Tonies / Pomme d'Api / Bayard** : packaging et site sobres et soignés côté adulte (achat = sérieux), univers riche et illustré côté enfant (usage = magie). Il y a **trois systèmes à concevoir**, pas un.

---

## 3. Audit du repo (mai 2026)

### Tokens existants — à garder partiellement
`src/app/styles/_variables.scss` est propre :
- Palette : `$corail #FF6B6B`, `$menthe #4ECDC4`, `$dark #2C3E50`, gris.
- Typo : Inter (body) + Fredoka (display).
- Spacing/radius/shadows déjà tokenisés.

**Attention** : Fredoka est **friendly/rounded**, pas éditorial. Elle n'est PAS adaptée au chrome parent (cf. décision Bayard Jeunesse en section 5). Fredoka reste pour la landing et le système enfant. Pour le parent, utiliser Inter à 600/700 weight pour les titres, ou un serif éditorial si on veut renforcer la dimension presse. De même, le corail et la menthe sont à proscrire du chrome parent — réservés aux produits affichés et aux systèmes landing/enfant.

### Landing (`features/home/home.component.ts`)
Ton sérieux pour parents. Fredoka+Inter, accents corail/menthe sur fond blanc. Quasi-zéro emoji. Copy professionnel ("votre enfant", "IA", "fiches adaptées"). **À garder comme référence du système parent.**

### 8 dashboards — synthèse

| Dashboard | Cible apparente | Verdict |
|---|---|---|
| `dashboard` (#1) | Enfant P1-P2 | Duolingo léger. Base correcte du futur système enfant. |
| `dashboard3` | Soi-disant parent | En réalité enfant + sidebar : "Salut Emma", mascotte 5rem animée, badges. **Pas un dashboard parent.** |
| `dashboard4` | Enfant | RPG (compagnons, quêtes). Trop gamifié, à ranger. |
| `dashboard5` | Mixte | Bento iOS, copy "À TOI DE JOUER". Reste enfant. |
| `dashboard6` | Enfant P1-P3 | Cahier illustré max (îles, glow, volcan 🌋). Trop chargé. À ranger. |
| `dashboard7` | Soi-disant parent | Glassmorphism dark mode mobile-first, charts, scores. **Le plus mature visuellement** mais reste enfant ("Bonjour Emma", avatar Dicebear). Bonne référence pour le hero glass parent. |
| `dashboard8` | Mixte | Sidebar + sections "Recommandé / Parcours". Variante de #3. Reste enfant-coded. |

**Constat** : le repo n'a en réalité aucun dashboard parent. Tous ouvrent par "Salut Emma". Il faut **créer** le premier vrai dashboard parent, pas trancher entre des candidats existants.

### Mock "Maths P1 Dinosaurs"
Texte pur, zéro illustration. Comparable IXL en sobriété. Pour le PDF qui sera la sortie principale : on doit largement enrichir visuellement (sprint séparé, plus tard).

---

## 4. Décisions tranchées

| # | Décision | Implication |
|---|---|---|
| 1 | **3 systèmes visuels séparés (Tonies-style)** | Parent/prof sobre · Enfant ludique mesuré · PDF richement illustré. |
| 2 | **Style enfant modulé par âge** (P1-P3 vs P4-P6) | Plus illustré et chaleureux pour les petits, plus mature et épuré pour les grands. À traiter dans un sprint dédié. |
| 3 | **Premier livrable = dashboard parent** | Cadre le reste. Voir cadrage section 5. |

---

## 5. Cadrage du dashboard parent

### Sections (dans l'ordre)

1. **Header parent + sélecteur d'enfants.** "Bonjour Jawad" + sélecteur horizontal d'enfants (avatar 40 px, prénom, niveau "P3", "+" pour ajouter). Pas de mascotte, ton calme. Top nav desktop-first.
2. **Bandeau abonnement & quota.** Gratuit : barre "2/3 fiches utilisées ce mois" + lien texte "Passer Premium → fiches illimitées". Premium/Enseignant : "Premium · prochain prélèvement 12 mai" + lien "Gérer". Jamais agressif, jamais clignotant.
3. **KPIs enfant sélectionné.** 3-4 chiffres factuels avec deltas (fiches faites ce mois, taux de réussite, matière dominante, série active). Aucun emoji.
4. **Progression par matière + points faibles IA.** Barres chiffrées par sous-thème, indicateur "À retravailler" discret quand score moyen < 60 %, cliquable pour générer une fiche ciblée. **C'est la valeur Premium.**
5. **Actions rapides.** Trois boutons larges B2B : "Créer une fiche pour [enfant]", "Programmer une fiche récurrente" (badge Premium), "Voir l'historique".
6. **Activité récente + footer admin.** Timeline 5 dernières fiches (titre, date, score, lien PDF) + footer Paramètres / Facturation / Aide / Déconnexion.

### Différences par rapport à `dashboard7` (référence visuelle, pas de contenu)

| Dashboard 7 (enfant) | Dashboard parent |
|---|---|
| "Bonjour Emma" | "Bonjour [parent], voici Léa" + sélecteur |
| Streak 🔥 + flamme animée | "Série de Léa : 4 jours" sans flamme |
| "Fiche du jour : Les fractions avec les pirates" | "Créer une fiche pour Léa" |
| Chips "🎲 Fiche surprise" | Boutons B2B "Programmer", "Cibler points faibles", "Historique" |
| Mini-charts décoratifs | Barres de progression chiffrées 78 % · 12 fiches |
| Bottom nav mobile (5 onglets) | Top nav desktop : Logo · Enfants · Abonnement · Paramètres |
| Fond dark `#0F0F1A` + blobs gradient | Fond clair `#FAFBFC`, accents couleur réservés aux CTA |

### Direction visuelle retenue : Bayard Jeunesse (chrome éditorial sobre)

Modèle : **un site éditorial pour adultes qui vend des produits pour enfants**. Le chrome (header, layout, typo, accents) est neutre presse adulte. La chaleur visuelle arrive exclusivement avec les produits affichés (prénoms d'enfants, vignettes de fiches, illustrations dans les PDF, couvertures de thèmes).

**Concrètement pour le chrome parent :**
- Fond blanc ou gris très clair (`#FFFFFF` ou `#F7F8FA`).
- Typographie : Inter 600/700 pour les titres (pas de Fredoka), Inter 400/500 pour le corps.
- Brand "Koalio" en noir/gris foncé. Pas de Fredoka, pas de corail.
- Pas de glassmorphism brand-tinted, pas de gradient décoratif corail/menthe dans le chrome.
- Cards et tables style Linear/Stripe/Notion : blanc sur blanc avec border 1 px gris clair.
- Accents couleur réservés aux *produits* (vignettes thèmes dinos/pirates, illustrations matières) ou à un seul CTA primaire si nécessaire — sinon CTA noir.

**Anti-références pour le parent** : Duolingo, Khan Kids, Prodigy, IXL — tout SaaS edtech qui parle directement aux enfants. **Références** : bayard-jeunesse.com, Notion, Linear, sections parent de Tonies.

J'avais initialement proposé un "hybride glass + sobre" avec un hero glassmorphism légèrement teinté corail/menthe — c'était un compromis qui restait perçu comme enfantin. Recadrage en mai 2026 : le glass et les accents brand n'ont pas leur place dans le chrome parent.

### Pièges spécifiques FWB

1. **Vocabulaire** : "P1-P6", "fiches". Jamais "CP/CE1/CM2" ni "exercices/worksheets".
2. **Tarifs** : `4,99 €` (virgule, espace insécable, € après).
3. **Pas de gamification parent.** Pas de badge "Super-parent niveau 3". Réserver la gamification à l'enfant.
4. **Multi-enfants dès le gratuit.** Limiter par fiches/mois global, pas par profils. Un parent avec 2 enfants P1+P4 ne doit pas devoir payer juste pour ajouter un second profil.
5. **RGPD enfant + Belgique.** Exposer "Données de Léa" + "Supprimer le profil de cet enfant" accessibles.
6. **Desktop-first.** Le parent crée le dimanche soir sur laptop. Mobile responsive ensuite, c'est l'inverse pour l'enfant.
7. **Freemium non agressif.** Belgique francophone est sensible aux pratiques perçues comme américaines (pop-ups, urgence, FOMO). Push doux.

---

## 6. Design system partagé `koa-*` (cible)

À ne **pas** implémenter dans le sprint dashboard parent — on identifie ici les composants réutilisables pour les sortir une fois la DA validée.

| Composant | Portée | Notes |
|---|---|---|
| `koa-button` (primary / secondary / ghost) | partagé | Variante `child` plus colorée + `parent` plus sobre |
| `koa-card` (flat / glass) | partagé | Glass utilisée surtout en hero |
| `koa-stat-chip` (KPI + delta) | parent + landing | Pas d'emoji décoratif |
| `koa-progress-bar` (linéaire + circulaire) | partagé | |
| `koa-avatar` | partagé | Avec fallback initiale colorée |
| `koa-empty-state` (avec illustration koala) | partagé | Le seul endroit où la mascotte apparaît côté parent |
| `koa-subject-icon` | partagé | Math, français, éveil |
| `koa-theme-chip` (dinos, pirates...) | enfant + générateur | |
| `koa-data-table` (tri, dense) | parent exclusif | Linear/Stripe style |
| `koa-quota-banner` (freemium nudge) | parent exclusif | |

Mascotte koala animée et boutons "Joue !" restent dans la bibliothèque enfant uniquement.

---

## 7. Hors scope (sprints suivants)

- **Sprint enfant P1-P3** : refonte de `dashboard` (#1) en s'appuyant sur les tokens validés.
- **Sprint enfant P4-P6** : variante plus mature (typo plus dense, moins d'emojis décoratifs, garder les thèmes).
- **Sprint PDF** : direction "richement illustré". Brief asset à reprendre dans `docs/brief-generation-assets-visuels.md`.
- **Sprint design system** : extraction des `koa-*` dans `src/app/shared/components/` une fois le parent validé.
- **Nettoyage** : suppression des dashboards 1-8 retenus comme exploration uniquement.

---

## 8. Référence rapide pour Claude

Quand on te demande de toucher un écran Koalio, demande-toi :
1. **Quel système ?** Parent (sobre) · Enfant (ludique modulé) · PDF (illustré).
2. **Quel public regarde ?** Adulte (parent/prof) ou enfant ?
3. **L'écran a-t-il besoin de la mascotte ?** Côté parent : non, sauf empty state. Côté enfant : oui, avec parcimonie.
4. **Quel ton de copy ?** Parent : "vous", factuel, action B2B. Enfant : "tu", chaleureux, ludique.
5. **Quel mode ?** Parent : light, desktop-first. Enfant : light, mobile-first.

En cas de doute sur "à quel point ludique", relire la section 1 — la question est *où*, pas *si*.
