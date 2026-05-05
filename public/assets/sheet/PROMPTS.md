# Prompts Midjourney pour les assets

Tous les assets visuels de Koalio sont générés via **Midjourney v7** selon un template commun. L'objectif : garder une cohérence visuelle entre tous les fichiers (mascots, items, décorations) et entre les différents thèmes (dinosaures, pirates, espace, animaux).

## Style commun

- Illustration **plate (flat 2D), cartoon doux** — type livre pour enfants
- **Palette pastel** douce, dans la mouvance corail/menthe de Koalio
- **Fond blanc plat** (le moteur applique `mix-blend-mode: multiply` au rendu pour neutraliser le blanc)
- **Composition carrée**, sujet centré, sans texte
- Sortie **512×512 px** (résolution généreuse pour print)

## Template

```
flat 2D cartoon illustration of [SUJET], [DETAILS], soft pastel palette, white background, kids book illustration style, no text, centered composition --ar 1:1 --v 7
```

## Thème : Dinosaures

### Mascotte (`themes/dinosaurs.png`) — header de fiche, 120×120 px
> flat 2D cartoon illustration of a friendly triceratops dinosaur, soft blue-teal body, gentle expression, side view, soft pastel palette, white background, kids book illustration style, no text, centered composition --ar 1:1 --v 7

### Œuf (`items/dinosaurs.png`) — zone à dessiner, 100×100 px
> flat 2D cartoon illustration of a single dinosaur egg, beige with soft brown speckles, gentle highlights, soft pastel palette, white background, kids book illustration style, no text, centered composition --ar 1:1 --v 7

### Plantes — deux variantes (même prompt, deux générations différentes)

Le prompt ci-dessous a produit deux assets utilisables, dans le même style painterly chaleureux que la mascotte et l'œuf. Les deux sont intégrés à la fiche.

- `decorations/dinosaurs-plant.png` — **cycadale lush** (ronde, base avec champignons et herbe), affichée en haut-gauche, 70×70 px
- `decorations/dinosaurs-frond.png` — **fougère verticale élancée**, affichée en bas-droite, 70×130 px

> flat 2D cartoon illustration of a single curling prehistoric fern frond, fresh sage green, gentle outline, soft pastel palette, white background, kids book illustration style, no text, centered composition --ar 1:1 --v 7

### Trace de pas (`decorations/dinosaurs-footprint.png`) — décoration marges, 40×40 px

Empreinte vue du dessus, 4 doigts pointus, coussinet brun avec un cœur orange-corail (joli rappel de la palette Koalio). Style painterly cohérent avec le reste.

> flat 2D cartoon illustration of a single dinosaur footprint viewed from above, four toe pads with pointed claws, soft warm brown color, coral-orange central pad, painterly hand-drawn texture, soft pastel palette, white background, kids book illustration style, no text, centered composition --ar 1:1 --v 7

## Pipeline d'intégration

1. Générer le PNG dans Midjourney (Discord ou web app)
2. Télécharger l'image (souvent en `.webp`) dans `~/Downloads`
3. Convertir en PNG si nécessaire :
   ```bash
   sips -s format png "~/Downloads/img.webp" --out public/assets/sheet/<dossier>/<thème>-<nom>.png
   ```
4. Le composant Angular charge automatiquement l'image au prochain hot-reload (sinon redémarrer `ng serve` si le sous-dossier est nouveau).

## TODO — autres thèmes

- **pirates** : drapeau pirate (`themes/`), pièce d'or (`items/`), palmier (`decorations/`), perroquet (`decorations/`)
- **space** : fusée (`themes/`), étoile (`items/`), planète (`decorations/`), comète (`decorations/`)
- **animals** : koala (`themes/`), feuille (`items/`), empreinte de patte (`decorations/`), papillon (`decorations/`)
