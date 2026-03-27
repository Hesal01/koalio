# Brief : Génération des assets visuels pour les zones de dessin Koalio

## Contexte

**Koalio** est une app web qui génère des fiches d'exercices PDF personnalisées pour enfants du primaire (P1-P6, 6-12 ans) en Belgique. Les fiches sont imprimées par les parents — l'enfant travaille au crayon sur papier.

Notre différenciateur clé : chaque fiche contient des **zones de dessin avec amorces visuelles**. Ce ne sont pas des espaces vides — ce sont des structures pré-dessinées que l'enfant complète à la main (dessiner des objets dans des conteneurs, colorier des fractions, barrer des éléments...).

**Deux axes se combinent :**
- Le **type d'exercice** (division, fraction, addition...) dicte le FORMAT de la zone
- Le **thème fun** (dinosaures, pirates, espace, animaux) habille l'UNIVERS visuel

## Ce dont on a besoin

Des **illustrations/icônes** en style enfantin, chaleureux et imprimable (traits nets, peu de détails, fonctionne en noir et blanc comme en couleur) pour les éléments suivants, déclinés par thème :

### 4 thèmes × 6 types d'éléments

| Élément | 🦕 Dinosaures | 🏴‍☠️ Pirates | 🚀 Espace | 🐨 Animaux |
|---------|--------------|-------------|-----------|------------|
| **Objet unitaire** (ce qu'on compte/répartit) | Œuf de dino | Pièce d'or | Étoile | Feuille d'eucalyptus |
| **Conteneur** (où on répartit) | Nid | Coffre au trésor | Cratère lunaire | Terrier |
| **Forme à fractionner** (qu'on découpe en parts) | Volcan (vue du dessus, sections) | Carte au trésor | Planète | Ruche (alvéoles) |
| **Personnage** (apparaît dans les consignes) | Tricératops amical | Capitaine sympa | Astronaute enfant | Koala souriant |
| **Décor de fond** (pour zones "problème ouvert") | Jungle préhistorique | Île au trésor | Station spatiale | Forêt |
| **Bordure décorative** (entoure les zones de dessin) | Petites empreintes de dino | Ancres et vagues | Étoiles et fusées | Pattes d'animaux |

### Contraintes visuelles

- **Style** : illustration enfantine, friendly, rondeurs, pas réaliste — pense cahier d'activités Usborne / Auzou
- **Trait** : contours nets et épais (doit rester lisible imprimé en A4)
- **Couleurs** : palette douce, pas saturée. Corail (#FF6B6B) et menthe (#4ECDC4) sont les couleurs de la marque Koalio
- **Format** : SVG ou PNG transparent, chaque élément individuel (pas de scènes composées)
- **Taille cible** : les objets unitaires font ~40-60px à l'écran, les conteneurs ~120-160px, les personnages ~80-100px
- **Impression** : doit fonctionner imprimé en noir et blanc (les contours suffisent)

### Comment c'est utilisé dans le PDF

**Exemple — Division, thème dinosaures, P3 :**

```
┌─ 🦕 Monde des dinosaures ─────────────────────┐
│                                                │
│  [œuf] [œuf] [œuf] [œuf] [œuf] [œuf]          │
│  [œuf] [œuf] [œuf] [œuf] [œuf] [œuf]          │
│                                                │
│   ╭─[nid]──╮   ╭─[nid]──╮   ╭─[nid]──╮       │
│   │ Nid 1  │   │ Nid 2  │   │ Nid 3  │       │
│   │        │   │        │   │        │       │
│   │dessine │   │dessine │   │dessine │       │
│   │  ici   │   │  ici   │   │  ici   │       │
│   ╰────────╯   ╰────────╯   ╰────────╯       │
│                                                │
│  Opération : 12 ÷ 3 = ___                     │
│  Réponse : Chaque nid contient ___ œufs.       │
└────────────────────────────────────────────────┘
```

L'enfant imprime la fiche, prend son crayon, dessine les œufs dans les nids, puis écrit l'opération et la réponse.

**Exemple — Addition, thème espace, P1 :**

Les étoiles déjà trouvées sont affichées normalement. Les nouvelles à dessiner sont en version très pâle/pointillée (comme un guide), l'enfant repasse dessus ou dessine à côté.

**Exemple — Fractions, thème pirates, P3 :**

La carte au trésor est découpée en 4 sections égales. La consigne dit "Colorie 3/4 de la carte". 3 sections ont un petit crayon pâle pour inviter à colorier.

### Priorité

Pour le MVP, on a besoin en priorité de :
1. Les **objets unitaires** (4 thèmes) — utilisés dans quasi tous les exercices
2. Les **conteneurs** (4 thèmes) — pour division/partage
3. Les **personnages** (4 thèmes) — pour les consignes
4. Les bordures et décors sont secondaires (un simple encadré coloré suffit au début)
