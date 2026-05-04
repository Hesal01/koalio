# Assets visuels du PDF

Ces images sont chargées par `pdf-renderer.ts` et embarquées dans chaque fiche PDF générée. Tant qu'un fichier manque, son emplacement est rendu sous forme de rectangle gris pointillé dans le PDF (placeholder visible mais non bloquant).

## Format attendu

- **PNG** avec fond transparent
- **Carré**, idéalement **256×256 px** (pour les items) et **512×512 px** (pour les théme icons + koala) — ces tailles donnent une marge confortable en cas de zoom ; en sortie A4 elles s'affichent à 6-8 mm.
- Style cohérent entre tous les assets d'un même thème (illustration plate, traits doux, palette koalio).

## Fichiers à fournir

### Logo de marque (1 fichier)
- `koala.png` — la mascotte koala. Affiché en haut à gauche de chaque fiche, à côté du mot "Koalio".

### Items à dénombrer (1 fichier par thème, 4 au total)
Ces icônes apparaissent en série dans les zones de dessin (compter, additionner, partager). Idéalement reconnaissables même très petites (~5-6 mm).

- `items/dinosaurs.png` — œuf de dinosaure
- `items/pirates.png` — pièce d'or
- `items/space.png` — étoile
- `items/animals.png` — feuille

**Format recommandé** : PNG carré 256×256 px, fond transparent. Affiché à 40×40 px dans le rendu actuel. Si un PNG manque, le moteur fallback automatiquement sur une emoji équivalente — la fiche reste fonctionnelle.

### Icônes/mascottes de thème (1 fichier par thème, 4 au total)
Ces illustrations apparaissent **en haut à droite de chaque fiche** pour matérialiser visuellement le thème dès le premier coup d'œil.

- `themes/dinosaurs.png` — un dinosaure cartoon (T-Rex / Tricératops / Diplodocus)
- `themes/pirates.png` — un drapeau pirate ou un pirate cartoon
- `themes/space.png` — une fusée ou un astronaute
- `themes/animals.png` — un koala (peut être différent du logo de marque)

**Format recommandé** : PNG carré 512×512 px, fond transparent ou blanc (le moteur applique `mix-blend-mode: multiply` pour neutraliser le blanc). Affiché à 120×120 px dans le header. Fallback emoji automatique si le PNG manque.

## Total

9 fichiers PNG. Aucun n'est bloquant individuellement — le PDF se génère même si tous manquent (placeholders visibles).
