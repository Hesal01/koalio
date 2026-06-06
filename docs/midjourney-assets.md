# Midjourney — assets décorations Koalio

> Réf code : `src/app/core/models/decoration.model.ts` (taxonomie) · `src/app/features/generator/sheet-layout/sheet-layout.component.scss` (zones de pose)

## Pourquoi cette doc

Les décorations de la fiche atterrissent dans des **zones de formats très différents** (bandeau paysage, side-illu tall, mascotte carrée, margin scatter, etc.). Avant cette taxonomie, tous les assets étaient générés en 1:1 par défaut → distorsions, mauvais cadrage, gâchis d'espace dans les zones non carrées.

Cette doc lie chaque catégorie d'asset à :
- son **aspect ratio cible** (`--ar` Midjourney)
- la **zone du sheet** où il est posé
- les **prompts** dinos à utiliser pour (re)générer la bibliothèque

## 6 catégories de format

| Catégorie | Ratio | MJ `--ar` | Px cibles (ref) | Zones de pose | Sujet type |
|-----------|-------|-----------|-----------------|---------------|------------|
| **`square`** | 1:1 | `--ar 1:1` | 70–110 px | Margin scatter centré (pos-0/2/3), banner pos-3 (flying), stamp coin "neutre", prefilled draw-items, items image-addition | Sujet centré unique, petit, sans contexte |
| **`portrait`** | 2:3 | `--ar 2:3` | 80–120 px large, 120–180 haut | Banner ground (pos-0/1/2), stamps coin "perso debout" | Character debout, vue de pied |
| **`tall`** | 1:2 | `--ar 1:2` | 220 px large, ~440 px haut | Side illustration des exos étroits (variant `decompose`) | Sujet très élancé : végétal, totem, mât |
| **`landscape`** | 3:2 | `--ar 3:2` | 110–180 px large, 70–120 haut | Margin scatter horizontal (pos-1/4), split right col, rich big, footer stamps "scène" | Scène horizontale, action, paysage |
| **`banner`** | 3:1 | `--ar 3:1` | 1500 × 500 px env. | *(Réservé)* — futur mode banner avec **1 panorama unique** en remplacement du diorama 4 chars composé | Paysage multi-sujets, panoramique |
| **`silhouette`** | 1:1 | `--ar 1:1 --style raw` | 42 px | Couche ambient always-on, opacité 12 % | Silhouette noire mono, transparente, sans détail |

## Flags Midjourney communs (à mettre dans tous les prompts)

```
--style raw --no text watermark signature shadow ground frame border
```

- `--style raw` : évite l'esthétique "MJ par défaut" (trop saturée, trop "art").
- `--no text watermark signature shadow ground frame border` : pas de mots, pas d'ombre portée (la fiche gère elle-même les overlays), pas de cadre (zone CSS s'en charge).

**Style global** (à coller en début de chaque prompt) :

```
flat illustration, children's book style, soft thick outlines, friendly,
warm colours, simple shapes, white background, isolated subject,
print-friendly, palette of coral #FF6B6B and mint #4ECDC4 accents
```

## Convention de nommage + drop

- Fichier : `public/assets/sheet/decorations/{theme}-{name}.png`
- Format : PNG **transparent**, dimensions au moins 2× le `px cible` (pour rétina + impression)
- Une fois généré : ajouter l'entrée dans `DECORATIONS` (`decoration.model.ts`) avec la bonne `size`

## Inventaire dinos — état actuel + prompts

État après refonte (cf. commit en cours). Cette table est la **source of truth** pour la bibliothèque dinos.

### `square` (1:1)

| Asset | Prompt MJ |
|-------|-----------|
| `dinosaurs-ammonite.png` | `cute coiled ammonite fossil, spiral shell, beige and cream tones, [style global], --ar 1:1` |
| `dinosaurs-dragonfly.png` | `prehistoric dragonfly meganeura, large translucent wings, soft turquoise body, [style global], --ar 1:1` |
| `dinosaurs-footprint.png` | `single three-toed dinosaur footprint, top-down view, beige stamp on white, [style global], --ar 1:1` |
| `dinosaurs-plant.png` | `small prehistoric fern leaf cluster, green, simple flat shapes, [style global], --ar 1:1` |
| `dinosaurs-pterodactyl.png` | `friendly small pterodactyl in flight, wings spread, side view, coral accents, [style global], --ar 1:1` |

### `portrait` (2:3) — banner ground chars

| Asset | Statut | Prompt MJ |
|-------|--------|-----------|
| `dinosaurs-trex.png` | ⚠️ à régénérer en 2:3 | `friendly cartoon T-Rex standing, full body, big round eyes, soft coral and mint accents, [style global], --ar 2:3` |
| `dinosaurs-hatchling.png` | ⚠️ à régénérer en 2:3 | `tiny baby dinosaur hatching from an egg, standing, full body, oversized head, cute, [style global], --ar 2:3` |
| `dinosaurs-triceratops.png` | ✅ généré | `friendly cartoon triceratops standing, full body, three horns and bony frill, gentle round eyes, side view, plump body, soft mint and cream colours, coral accents on horns, [style global] --ar 2:3` |
| `dinosaurs-stegosaurus.png` | ✅ généré | `friendly cartoon stegosaurus standing, full body, row of pastel plates along the back, small head, calm closed-mouth smile, side view, plump body, soft sage green with coral plates, [style global] --ar 2:3` |

> **Note** : avec 4 portraits, `bannerScene` (3 grounds + 1 flying) tourne proprement sans tomber sur des landscapes en fallback.

### `tall` (1:2) — side illu narrow exo

| Asset | Prompt MJ |
|-------|-----------|
| `dinosaurs-frond.png` | `tall prehistoric fern frond, vertical composition, lush green, simple curved leaves, [style global], --ar 1:2` |

### `landscape` (3:2) — margin paysage + split/rich big

| Asset | Prompt MJ |
|-------|-----------|
| `dinosaurs-volcano.png` | `small smoking volcano landscape, ground level, soft orange glow, two trees, [style global], --ar 3:2` |
| `dinosaurs-bone.png` | `large dinosaur bone fossil lying horizontally on ground, beige, simple shape, [style global], --ar 3:2` |

**À ajouter** :

| Asset | Prompt MJ |
|-------|-----------|
| `dinosaurs-jungle.png` *(nouveau)* | `prehistoric jungle scene, ferns and palms, soft greens, horizontal composition, no characters, [style global], --ar 3:2` |
| `dinosaurs-egg-nest.png` *(nouveau)* | `dinosaur nest with three eggs, ground level, brown twigs, cream eggs, soft mint accents, [style global], --ar 3:2` |

> **Pourquoi** : `splitDecoBgForIndex` cycle sur tous les non-tall — avoir 4+ landscapes permet un cycle propre sur fiche de 5+ exos.

### `silhouette` (1:1 mono)

| Asset | Prompt MJ |
|-------|-----------|
| `dinosaurs-silh-footprint.png` | `single black silhouette dinosaur footprint, solid black on transparent, no outline, no details, [style global without color], --ar 1:1` |

**À ajouter (couches ambient secondaires)** :

| Asset | Prompt MJ |
|-------|-----------|
| `dinosaurs-silh-fern.png` *(nouveau)* | `single black silhouette of a fern leaf, solid black on transparent, simple shape, --ar 1:1` |
| `dinosaurs-silh-bone.png` *(nouveau)* | `single black silhouette of a dinosaur bone, solid black on transparent, simple shape, --ar 1:1` |

### `banner` (3:1) — backdrop scénique

Posé en `background-image` de `.sheet-banner` (mode `banner`). Les 4 chars premier plan (trex/triceratops/stegosaurus/pterodactyl) se posent par-dessus.

| Asset | Statut | Prompt MJ |
|-------|--------|-----------|
| `dinosaurs-banner-backdrop.png` | ✅ généré | `prehistoric jungle horizon panorama, distant smoking volcano on the right, layered fern and palm silhouettes in foreground, soft warm pale sky gradient from cream to peach, very pale and low-contrast, no foreground characters, [style global] --ar 3:1` |

## Mapping zones → assets requis

| Zone du sheet | Catégorie consommée | Combien min | Source de pose |
|---------------|---------------------|-------------|----------------|
| Mascotte header (théme global, non décoration) | — (asset à part dans `themes/`) | 1 par thème | `mascotPath()` |
| Ambient trail (10 répétitions) | `silhouette` | 1 (le même répété) | `ambientDecos` |
| Margin scatter (5 slots) | 3× `square` + 2× `landscape` | 3 squares + 2 landscapes | `marginDecos` |
| Banner diorama (4 slots) | 3× ground (`portrait` ou `landscape`) + 1× `square` flying | 3 grounds + 1 flying | `bannerScene` |
| Side illu narrow exo | `tall` | 1 par thème | `verticalBg` |
| Rich big right col (par exo, cycle) | `landscape` | 2+ | `bigDecoBgForIndex` |
| Split right col (par exo, cycle) | tous sauf `tall`/`banner`/`silhouette` | 4+ | `splitDecoBgForIndex` |
| Stamps coin (cycle 9-item via SCSS) | — *(actuellement SCSS-driven sur fichiers nommés, à harmoniser plus tard)* | — | `.exercise-block::before` |

## TL;DR — état actuel batch dinos

✅ **Bon ratio, prêts à l'emploi** : ammonite, dragonfly, footprint, plant, pterodactyl (square), frond (tall), silh-footprint (silhouette), triceratops, stegosaurus (portrait), banner-backdrop (banner 3:1).

🔁 **À régénérer** :
- `trex`, `hatchling` → 2:3 (actuellement en 1:1)
- `volcano`, `bone` → 3:2 (actuellement en 1:1)

🆕 **À créer (priorité basse)** :
- `jungle`, `egg-nest` en 3:2 (pour split/rich cycle plus riche)
- `silh-fern`, `silh-bone` en 1:1 mono (pour ambient varié au-delà des footprints)
