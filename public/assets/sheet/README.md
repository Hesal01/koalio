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

### Icônes de thème (1 fichier par thème, 4 au total)
Ces icônes apparaissent dans le bandeau "MONDE DES DINOSAURES / AVENTURE PIRATE / etc." en haut de chaque zone de dessin.

- `themes/dinosaurs.png` — un dinosaure (T-Rex / Tricératops / Diplodocus)
- `themes/pirates.png` — un drapeau pirate ou un pirate
- `themes/space.png` — une fusée ou un astronaute
- `themes/animals.png` — un koala (peut être différent du logo de marque)

## Total

9 fichiers PNG. Aucun n'est bloquant individuellement — le PDF se génère même si tous manquent (placeholders visibles).
