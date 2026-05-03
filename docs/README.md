# Documentation Koalio

Sommaire de la documentation interne du projet Koalio.

## Contenu

- [Programme scolaire FWB 2025-2026](./programme-scolaire-fwb-2025-2026.md) — Référentiels officiels du tronc commun P1-P6, détaillés par matière et par année. Base pour l'alignement pédagogique des exercices générés.
- [Banque d'exemples d'exercices](./banque-exemples-exercices.md) — 100 exercices types P1-P6 couvrant maths, français, sciences, formation humaine, EPC et ECA. Sert de référence pour la génération IA.
- [Concept : Zones de dessin thématiques](./concept-zones-dessin.md) — Zones de dessin avec amorces visuelles dans les PDF. Type d'exo → format, thème fun → univers. Différenciateur clé de Koalio.
- [Brief : Génération assets visuels](./brief-generation-assets-visuels.md) — Brief à donner à un outil IA pour générer les illustrations des zones de dessin (objets, conteneurs, personnages × 4 thèmes).
- [Direction artistique](./design-direction.md) — Source de vérité du design. 3 systèmes visuels (parent sobre Bayard / enfant ludique modulé / PDF illustré), chrome parent éditorial, anti-références.
- [Stratégie PDF](./pdf-strategy.md) — Génération via `window.print()` en MVP, migration prévue vers Puppeteer Cloud Function. État courant + cible production.
- [Catalogue des formats d'exercices](./formats-exercices.md) — 7 formats P1-pertinents (text-blank, count-items, circle, match, MCQ, order, draw-items) avec sous-variants, limites, métriques quantitatives, reco par fiche.
- [Stratégie produit & roadmap](./strategie-produit.md) — North Star, architecture 3 couches (catalogue / perso / IA à la demande), feature héro "Préparer le contrôle", bilan post-contrôle, stratégie pub UGC, partage social, roadmap MVP→v3, principes directeurs.
