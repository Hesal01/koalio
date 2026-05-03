# 🐨 Koalio — Stratégie Produit & Roadmap

> Document de synthèse stratégique
> Cible : générateur de fiches d'exercices PDF personnalisées pour le primaire belge (P1–P6)

---

## 🎯 La phrase qui résume tout (North Star)

> **"Il ouvre Koalio, clique 🎯 Préparer un contrôle, et en 4 clics il a un plan de révision sur 3 jours, sur-mesure, avec le prénom et le thème préféré de son enfant."**

C'est la phrase de référence du projet. Elle aligne toutes les décisions produit et marketing : si une feature ne sert pas cette promesse, on la repousse. Si une décision la renforce, on fonce.

**Pourquoi elle fonctionne :**
- *"Il ouvre Koalio"* → action simple, immédiate
- *"clique 🎯 Préparer un contrôle"* → bouton clair et identifiable
- *"en 4 clics"* → promesse de rapidité (parent stressé n'a pas 30 min)
- *"un plan de révision sur 3 jours"* → solution structurée, pas improvisée
- *"sur-mesure"* → mot magique pour les parents
- *"avec le prénom et le thème préféré"* → différenciation émotionnelle vs concurrence

---

## 🏗️ Architecture produit en 3 couches

### Le contexte qui rend l'approche évidente

Trois éléments structurent les choix techniques et économiques :

1. **Programme cible ultra-standardisé** : FWB, P1-P6, maths/français, types d'exercices définis (calcul, problèmes, conjugaison, orthographe, grammaire). C'est un référentiel fini.
2. **Stratégie SEO basée sur des pages statiques avec PDF imprimables** ("exercices multiplication CE2 à imprimer"). Un catalogue est de toute façon nécessaire.
3. **Valeur unique = personnalisation prénom + thème ludique**, pas la génération from scratch à chaque fois.

À 4,99€/mois, si chaque fiche coûte 1-2 centimes en API Claude et qu'un user fait 100 fiches/mois, on mange 40% de marge. La pré-génération devient indispensable.

### Couche 1 — Banque pré-générée (le socle)

- Pour chaque combinaison **niveau × matière × type d'exercice × thème**, pré-générer 10-20 variantes
- Stocké en JSON dans Firestore (pas en PDF)
- Génération unique avec Claude + relecture/QA, qualité garantie
- Estimation : ~5 400 fiches (6 niveaux × 2 matières × 5 types × 6 thèmes × 15 variantes)
- Coût total de génération : 50-100€ une seule fois

### Couche 2 — Personnalisation à la volée (le cœur du produit)

Quand un user demande une fiche, **dans 95% des cas aucun appel IA** :
1. On prend une variante du catalogue qui matche ses critères
2. On injecte le prénom dans le JSON (find/replace dans les énoncés)
3. On rend le template HTML thématisé → PDF

Astuce : Claude génère les exercices avec un placeholder `{{prenom}}` directement dans les énoncés ("Lucas a 3 dinosaures, il en trouve 5 de plus...") et on fait le remplacement côté serveur.

**Coût marginal : quasi zéro. Vitesse : instantanée. Marge premium : excellente.**

### Couche 3 — Génération à la demande (feature premium)

Réservée aux cas où le user veut quelque chose hors catalogue :
- Thème custom ("mon enfant adore les Pokémon")
- Combo spécifique de notions ("révision avant contrôle : tables de 6, 7 et 8 uniquement")
- Mode "régénérer une variante"

→ **Quota mensuel** sur cette couche uniquement (ex. 20 générations IA/mois en Premium). Le reste = illimité depuis le catalogue.

### Bonus : alignement avec la stratégie SEO

Les 60-80 pages SEO statiques type "Exercices multiplication P3 à imprimer" = **le catalogue rendu public en mode neutre** (sans prénom). Une page SEO = une variante du catalogue + un PDF générique. Le parent atterrit depuis Google, télécharge le PDF générique gratos, puis voit "Tu veux la version au prénom de ton enfant avec le thème dinosaures ? → Crée ton compte Koalio".

Le même contenu sous-jacent sert :
- **Le SEO** (gratuit, neutre)
- **Le freemium** (3 fiches/mois personnalisées depuis le catalogue)
- **Le premium** (fiches illimitées personnalisées + 20 générations IA/mois custom)

---

## 🚫 Anti-abus de l'abonnement (avec impression autorisée)

Avec l'architecture en 3 couches, le scénario "je m'abonne 1 mois et j'imprime tout" devient un non-problème économique :

1. **Le catalogue est ton produit, pas un coût** : qu'un user télécharge 10 ou 1000 fiches, ça coûte la même chose (rien). On peut être généreux.
2. **La couche IA à la demande a un quota** : 20/mois max → impossible d'extraire "des milliers" de fiches uniques.
3. **Pricing annuel à 39€** (vs 4,99€ × 12 = 60€) : la majorité prend l'annuel naturellement.
4. **Filigrane discret en pied de page** ("Généré pour la famille Dupont sur Koalio.be") : invisible à l'usage, dissuasif au partage public.
5. **Rate limiting** : max 10 générations/jour pour bloquer les bots/scripts.
6. **Détection de patterns anormaux** : génération de 30 prénoms différents en 1h = alerte automatique.

---

## 📈 Système de suivi & progression

### Le concept "Chemin d'apprentissage"

Au lieu de générer des fiches au hasard, l'enfant a une **carte de progression visuelle** de son année scolaire, alignée sur le programme FWB. Type *Duolingo des devoirs*.

Écran principal du compte enfant : carte type *jeu vidéo* avec un chemin sinueux, des étapes, des badges débloqués, et le koala mascotte qui avance dessus. Chaque étape = une compétence à maîtriser.

### Modélisation des compétences

Pour chaque niveau (P1-P6) et chaque matière, on s'appuie sur les **socles de compétences FWB**. Exemple P3 maths :

- Numération jusqu'à 1000
- Tables de multiplication (×2, ×5, ×10 puis ×3, ×4, ×6...)
- Addition/soustraction posée à 3 chiffres
- Notion de fraction simple
- Mesures (longueur, masse)
- Géométrie (angles, polygones)

Modélisation Firestore en **arbre de compétences** :

```
P3-Maths
├── Numération
│   ├── compter-jusqua-1000
│   ├── decomposer-nombres
│   └── ranger-comparer
├── Calcul
│   ├── tables-x2-x5-x10  ← prérequis
│   ├── tables-x3-x4
│   ├── tables-x6-x7-x8-x9
│   └── multiplication-posee  ← débloqué après les tables
└── ...
```

Chaque nœud a ses **prérequis** : on ne peut pas attaquer "multiplication posée" tant que "tables x2-x5-x10" n'est pas validée.

### Niveaux de maîtrise (à la Duolingo)

- **🥚 Découverte** — 1-2 fiches faites
- **🐣 En cours** — 3-5 fiches avec >70% de réussite
- **🌟 Maîtrisé** — 5+ fiches avec >85% de réussite + une "fiche de validation" passée

**Important** : pas d'auto-correction au MVP. Le **parent valide** après que l'enfant a fait la fiche. Trois boutons : "✅ Tout bon" / "🤔 Quelques erreurs" / "❌ À retravailler". Suffit largement.

### Structure Firestore

```
competences/{niveau}_{matiere}_{slug}
  ├── nom: "Tables de 7"
  ├── niveau: "P3"
  ├── matiere: "maths"
  ├── prerequis: ["tables-x2-x5-x10"]
  └── ordre_curriculum: 12

eleves/{eleveId}/progression/{competenceId}
  ├── statut: "en_cours" | "maitrise" | "decouverte"
  ├── nb_fiches_faites: 3
  ├── taux_reussite: 0.75
  └── derniere_pratique: timestamp

fiches_catalogue/{ficheId}
  ├── ... (les champs existants)
  └── competences_couvertes: ["tables-x7", "calcul-mental"]
```

### Le tagging des compétences

Chaque fiche du catalogue est taguée avec les compétences qu'elle entraîne (1-3 par fiche). Le tagging peut être fait **par Claude au moment de la pré-génération** avec une liste contrôlée de compétences.

### Algorithme de recommandation

Quand l'enfant clique "prochaine fiche recommandée" :
1. Identifier sa compétence la plus prioritaire (en retard sur le programme, ou échouée récemment)
2. Filtrer le catalogue sur les fiches taguées avec cette compétence + son niveau
3. Piocher une variante qu'il n'a pas encore vue
4. Injecter son prénom et son thème préféré

**Aucun appel IA nécessaire** pour le flux principal.

### Le moat concurrentiel

Le vrai gros chantier : modéliser proprement le programme FWB en arbre de compétences. Pour P1-P6 × 2 matières = **~500 compétences à structurer**. C'est 2-3 semaines de travail pédagogique, pas de code.

C'est **le moat le plus fort** : une fois cette base bien faite, c'est très dur à copier rapidement.

Sources d'aide :
- Programmes officiels FWB (publics)
- Manuels scolaires
- Validation par 2-3 instits

---

## 🎯 Feature héro : "Préparer le contrôle"

### Le moment de vérité

Le parcours réel d'un parent stressé :
- Lundi soir, l'enfant rentre : "j'ai interro vendredi sur les fractions"
- Le parent panique légèrement, ne sait pas ce qu'il a vu en classe
- Il cherche sur Google "exercices fractions CE2", tombe sur 15 PDF aléatoires
- Il imprime au pif, l'enfant fait, pas de structure

**Avec Koalio** : il ouvre l'app, clique "🎯 Préparer un contrôle", et en 4 clics il a un plan de révision sur 3 jours sur-mesure.

### Flow utilisateur

**Étape 1 — Setup en 30 secondes**
- Date du contrôle (calendrier)
- Matière
- Compétences au programme (cases à cocher : "tables de 7", "additions à 3 chiffres", "problèmes simples")
- Niveau de stress de l'enfant 😅😐😎 (ajuste le ton du plan)

**Étape 2 — Plan généré automatiquement**

> 🦕 **Plan de révision pour Lucas — Contrôle vendredi**
>
> **J-3 (mardi) — Échauffement** : 1 fiche découverte
> *"On revoit tranquillement les bases. 10 min."*
>
> **J-2 (mercredi) — Entraînement** : 1 fiche complète
> *"On approfondit. On note les erreurs. 15 min."*
>
> **J-1 (jeudi) — Mini-contrôle blanc** : 1 fiche format "interro"
> *"On simule l'interro. Tu chronomètres. 20 min."*
>
> **Jour J (vendredi) — Boost matin** : 5 questions flash
> *"Réveil cerveau pendant le petit-déj. 5 min."*

**Étape 3 — Notifications & rappels**
Mail/notif chaque jour : *"Bonjour ! C'est mardi, jour 1 de la révision interro de Lucas. Sa fiche est prête, tu peux l'imprimer ici 👉"*

### Pédagogie

Le plan suit les **principes scientifiques de la révision efficace** :

- **Pratique espacée** : étalée sur plusieurs jours plutôt que la veille (vs bachotage)
- **Difficulté progressive** : J-3 plus simple, J-1 conditions de contrôle
- **Test final court** : 5 questions flash le matin = effet d'amorçage cognitif
- **Feedback intégré** : à la fin de chaque jour, le parent valide → si erreurs, le plan du lendemain s'adapte

→ Le plan est **dynamique**, pas figé.

### Implémentation technique

Utilise directement le catalogue + le système de compétences :

1. Le parent coche les compétences au programme du contrôle
2. Query Firestore : `fiches WHERE competences_couvertes IN [compétences cochées] AND niveau == eleve.niveau`
3. Pour chaque jour, l'algo pioche une fiche avec le bon niveau de difficulté (tag `difficulte: facile|moyen|difficile`)
4. Personnalisation prénom + thème
5. Stockage dans `eleves/{id}/plans_revision/{id}` avec `etat: en_cours`

**Aucun appel IA pour 95% du flow.** Optionnel : un message du koala personnalisé via Claude pour le coaching émotionnel.

### Raffinements

**Mode "panique" (J-1 ou jour J)** : si activé la veille au soir, l'app reconnaît qu'il n'y a plus le temps. Propose un **"Pack express interro"** : 1 fiche condensée + checklist "Demain matin, vérifie qu'il sait ✅ X, ✅ Y, ✅ Z". Pas culpabilisant, opérationnel.

---

## 💝 Bilan post-contrôle

### Le concept

Quelques jours après le contrôle, notification au parent :

> 🐨 Hello ! Comment s'est passée l'interro de Lucas vendredi ?
>
> 🎉 Super !     😊 Plutôt bien     😕 Mitigé

Un seul tap. Pas de formulaire. Pas de friction.

### Pourquoi c'est probablement la feature avec le meilleur ROI

**1. Boucle d'attachement émotionnel**
Le parent passe de "j'utilise un outil" à "Koalio s'intéresse à mon enfant". Différence entre un logiciel et un compagnon de scolarité. Massif sur la rétention.

**2. Données de qualité produit que personne n'a**
Pass Education, Wiloki ne savent pas si leurs fiches "marchent". Toi, tu auras un dataset précieux : *"Pour la compétence X en P3, taux de réussite après plan de révision Koalio = 87%"*. Mine d'or marketing : *"94% des enfants qui suivent un plan Koalio ont une meilleure note"*.

**3. Personnalisation prédictive**
Si Lucas échoue 2 contrôles maths d'affilée malgré le plan, l'app détecte et propose *"Les fractions sont compliquées pour Lucas. On a un parcours de remédiation, on te le programme ?"*. Tu deviens **proactif**.

**4. Témoignages organiques**
Réponse 🎉 → *"Tu accepterais de partager ton expérience en 2 phrases ?"*. Pipeline auto-alimentée de témoignages clients.

**5. Signal de churn précoce**
3 réponses 😕 d'affilée = signal de désabonnement imminent. Email *"Notre équipe peut t'aider à ajuster le plan, tu veux qu'on en parle ?"*. **Save de churn = LTV qui explose**.

**6. Métrique nord-stoile**
Le ratio 🎉/😊/😕 devient ta **métrique produit principale**. Bien plus parlant que "rétention" abstrait.

### Suivi conditionnel selon la réponse

- **🎉** → *"Trop bien ! Bravo à Lucas 🌟. Tu veux nous laisser un mot ? On affiche les retours des parents (anonymisés si tu veux) sur notre site."*
- **😊** → *"Super ! On met à jour le suivi de Lucas. Tu veux préparer son prochain contrôle ?"* + CTA "Préparer un contrôle"
- **😕** → *"Désolé que ce soit pas top. Parcours de remédiation ou parler à un humain ?"* (les 6 premiers mois, c'est toi qui réponds personnellement)

### Bonus : protection de réputation

Le bouton "Parler à un humain" sur 😕 désamorce 80% des avis publics négatifs. Parent frustré → contact rapide → mois gratuit offert → pas d'avis assassin sur Trustpilot. **Gestion de crise préventive intégrée au produit**.

---

## 📱 Stratégie pub vidéo (UGC)

### Le format gagnant en 3 temps

**Problème vécu → Solution démontrée → Bénéfice émotionnel**

Le format est si efficace qu'il faut en faire **une série, pas une seule pub**. Chaque déclinaison touche un persona différent.

### Les 5 pubs à produire

**Pub 1 — La maman stressée (la pub originelle)**
*(Maman stressée la veille de l'interro)* "Demain il a contrôle de maths, j'ai pas eu le temps de l'aider de la semaine..."
*(Cut Koalio)* "Avec Koalio, en 30 secondes tu lances un plan de révision sur-mesure. Aligné sur le programme. Avec le prénom et les thèmes préférés de ton enfant. Imprimable en un clic."
*(Maman qui sourit, enfant qui fait sa fiche dinosaure)* "Et la veille, il dort tranquille."

**Pub 2 — Le papa qui galère à expliquer**
*(Papa devant le cahier, perplexe)* "Les fractions, c'est plus comme dans mon temps... j'comprends même plus comment lui expliquer."
*(Cut)* "Avec Koalio, plus besoin d'être expert. Fiches alignées sur le programme actuel, explications claires, prénom de ton enfant dans les exercices."
*(Père et fils qui rigolent)* "Tu redeviens un papa, plus un prof improvisé."

**Pub 3 — La mère célibataire débordée**
*(Le soir, elle vient de finir le travail, l'enfant lui tend son cahier)* "Maman, j'ai des devoirs..."
*(Soupir)* "J'ai juste pas l'énergie de chercher des exercices ce soir."
*(Cut)* "Koalio, c'est 30 secondes. Imprimée. Prête. Pendant que tu prépares le dîner."
*(Elle dépose la fiche, enfant sourit en voyant son prénom)* "Le temps, c'est ton bien le plus précieux. On te le rend."

**Pub 4 — Les grands-parents qui gardent**
*(Mamie devant la tablette, perdue)* "Je voudrais bien faire travailler Léa, mais je sais pas par où commencer..."
*(Cut)* "Avec Koalio, même mamie peut générer une fiche en 4 clics."
*(Mamie et Léa complices, fiche princesses)* "Le mercredi, c'est devenu leur moment."

**Pub 5 — L'enfant qui rechigne**
*(Enfant grognon)* "J'veux paaas faire mes devoirs, c'est nul..."
*(Cut, parent qui génère une fiche thème dinosaures avec le prénom)*
*(Enfant étonné)* "Y a mon prénom ! Et c'est des T-Rex !"
*(Il s'y met avec entrain)* "Quand les exercices parlent d'eux, ils ont envie."

### Méthode d'optimisation pub

Même format pour les 5 pubs (juste casting/situation qui changent). 50€ de budget par pub pour identifier les 2 gagnantes, puis 500€ sur les winners.

### Production : 3 niveaux

**Budget zéro — UGC fait main**
Amis parents avec enfants, smartphone récent, son externe à 30€, montage CapCut gratuit. Format 9:16 pour Reels/TikTok, 1:1 ou 4:5 pour Feed. **L'authenticité UGC convertit souvent mieux** qu'une pub léchée pour les produits familiaux.

**Mid-range — Créateurs UGC** (200-400€/vidéo)
Plateformes : Brief (FR), TRIBE, Insense. Ou créatrices "mamans lifestyle" Belgique sur Insta. Brief + script → vidéo en 7-10 jours.

**Pro — Boîte de prod locale** (1500-3000€/vidéo)
Quand le message est validé et qu'on scale.

**Recommandation** : commencer en UGC fait main → valider quel script convertit le mieux pendant 2-3 mois → puis investir dans des créateurs UGC pros pour scaler le winner.

### Déclinaisons de la phrase héro

**Hero subtitle landing page :**
> *Demain il a interro ? En 4 clics, Koalio crée un plan de révision sur 3 jours, avec le prénom et le thème préféré de votre enfant.*

**Slogan court :**
> **4 clics. 3 jours. 0 stress.**
> *Koalio prépare l'interro de ton enfant.*

**Variante punchy :**
> **Demain il a interro. Toi tu dors tranquille.**

---

## 🔗 Partage social : à activer en v2 avec garde-fous

### La crainte légitime

"Les gens utiliseront les fiches des autres au lieu de payer chez moi."

→ **Cette crainte est fondée pour du contenu non personnalisé.** C'est exactement le business model Pass Education (PDF génériques téléchargeables gratos).

→ **Mais ta valeur unique = personnalisation prénom.** Une fiche partagée "Les multiplications de Lucas, thème dinosaures" n'a aucune utilité directe pour un autre parent. La fiche partagée = **une pub**, pas un produit substituable.

### Les vrais risques à anticiper

1. **Scraping organisé** : un mec s'abonne, génère 100 fiches sur 100 prénoms (Léa, Tom, Emma...), les partage en lot.
   → Parade : quota mensuel + rate limiting + détection patterns anormaux.

2. **Pinterest qui rank tes fiches au lieu de ton site** : le parent télécharge depuis Pinterest, ne vient jamais sur Koalio.
   → Parade : CTA fort intégré dans le PDF + lien dans la description Pinterest.

3. **Le partage tue l'urgence d'achat** : "je peux trouver ces fiches gratuitement quelque part" → le parent diffère son achat.
   → Parade : ne jamais partager **la version premium complète** sans friction.

4. **La fatigue de partage** : pression au partage = expérience intrusive.
   → Parade : opt-in jamais forcé, présenté comme un bénéfice pour l'enfant.

### Le design du partage : 4 garde-fous

**1. Tout PDF partagé est marqué visuellement**
Bandeau coloré clair en haut : *🐨 Fiche personnalisée pour Lucas • Créée sur **koalio.be** • Crée la fiche au prénom de ton enfant en 4 clics →*

C'est un **élément de design assumé**, pas un filigrane laid. Les autres parents qui voient ça se disent "comment je fais pareil pour ma fille ?", pas "je télécharge".

**2. Le partage social génère une image teaser, pas le PDF**
Quand le parent clique "Partager sur Instagram", **on ne donne pas le PDF**. On génère une **belle image carrée** type story :
- Preview floutée/stylisée de la fiche
- Le prénom de l'enfant en gros
- Le thème (dinosaures avec illustrations mignonnes)
- Logo Koalio
- Sticker "✨ Fiche perso de Lucas ✨"

Le parent partage **l'image promo**, pas la ressource. Conversion sans cannibalisation.

**3. Le PDF brut, jamais "shareable" en 1 clic**
Le parent peut télécharger le PDF et faire ce qu'il veut, mais **pas de bouton "Partager le PDF"** dans l'app. Friction = limite la diffusion massive.

**4. "Wall of fame" Koalio (opt-in)**
Photo de **l'enfant en train de faire la fiche** (visage flouté ou pas) sur le Wall of Fame. Social proof sur le site. Pas le PDF, mais **l'enfant vivant ce moment**. Beaucoup plus puissant en marketing.

### Cas spécial : enseignants

Risque de cannibalisation plus élevé (profs partagent entre collègues).
→ Sur le plan Enseignant : interdire le partage public via CGU + filigrane discret avec leur nom. S'ils veulent en parler, partager un screenshot du dashboard ("voilà comment je gère mes 25 élèves") plutôt que les fiches elles-mêmes.

### Verdict

**OUI au partage si** :
1. On partage des images promo, pas des PDF utilisables
2. Toute fiche imprimable a un CTA visible vers koalio.be
3. Quotas + rate limiting empêchent la génération en masse

**NON au partage si** :
- Export du PDF brut sur Pinterest en 1 clic
- Pas de CTA dans le PDF
- Pas de quota strict côté premium

→ **Pas dans le MVP. Mettre en v2** après avoir validé la conversion en achat direct. Une feature à la fois.

---

## 📅 Roadmap de séquencement

### MVP (v1) — Valider la demande

**Ce qu'on construit :**
- Auth basique (Firebase Auth, email + Google)
- Générateur de fiches avec catalogue pré-généré (3 thèmes × 6 niveaux × 2 matières × 3 types × 10 variantes ≈ 1080 fiches)
- Couche personnalisation à la volée (injection prénom + thématisation CSS)
- Génération PDF (jsPDF + html2canvas)
- Dashboard historique simple
- Stripe + freemium (3 fiches gratuites/mois, illimité Premium)

**Question clé à valider :** "Est-ce qu'un parent paie pour une fiche perso de qualité ?"

**Ce qu'on met de côté :** badges, suivi de progression, mode révision, fiche surprise quotidienne, historique des erreurs avec répétition espacée, export prof, partage social.

### v1.1 — Système de progression basique

- Tagging des compétences sur les fiches du catalogue
- Compteur de fiches par compétence
- % de complétion du programme par enfant
- Pas encore de prérequis ni de carte visuelle

### v1.5 — La feature héro "Préparer le contrôle"

- Setup en 30 secondes (date, matière, compétences)
- Génération automatique du plan sur 3-5 jours
- Notifications/rappels quotidiens
- Adaptation dynamique selon les retours parent
- Mode "panique" (J-1)
- **Bilan post-contrôle** (🎉/😊/😕) avec suivi conditionnel
- → C'est à ce moment qu'on lance le push marketing pub vidéo

### v2 — Communauté & viralité

- Carte visuelle façon Duolingo (badges, chemin sinueux)
- Recommandations intelligentes "prochaine fiche"
- Partage social (avec garde-fous décrits plus haut)
- Wall of Fame Koalio
- Témoignages parents intégrés au site

### v3 — Sophistication

- Auto-correction de certains exercices (calcul mental, QCM)
- Mode collaboration parent-enfant-prof
- Plan École (licences structures)
- Extension à la Flandre (NL)

---

## 💰 Modèle économique consolidé

| Plan | Prix | Contenu |
|------|------|---------|
| **Gratuit** | 0€ | 3 fiches/mois, 2 thèmes (parcours SEO d'entrée) |
| **Premium** | 4,99€/mois ou 39€/an | Fiches illimitées du catalogue + 20 générations IA custom/mois + suivi progression + "Préparer le contrôle" |
| **Enseignant** | ~9,99€/mois | 30 élèves, fonctions classe |
| **École** | 150–500€/an | Licence structure |

### Évolution du prix dans le temps

L'écosystème complet (catalogue + perso + progression + "Préparer le contrôle" + bilan) **justifie progressivement** :
- 4,99€/mois au lancement (positionnement entrée de gamme)
- 7,99€/mois après v1.5 (feature héro lancée)
- 9,99€/mois après v2 (plateforme d'accompagnement complète)

→ Le prix devient **justifiable** parce que Koalio passe d'un *outil utilitaire* à un *partenaire de scolarité* qui accompagne **avant, pendant et après** chaque contrôle.

---

## 🧠 Principes directeurs

### Le principe d'unicité

> Plus la personnalisation est poussée, moins le partage cannibalise.

Garder la personnalisation prénom + thème **au cœur de la valeur perçue** = protection naturelle contre la cannibalisation.

### Le principe du cercle émotionnel complet

Koalio accompagne le parent **avant** (stress de l'interro), **pendant** (plan de révision), **après** (bilan post-contrôle). Très peu de produits couvrent tout le cycle. C'est ce qui crée l'attachement à la marque.

### Le principe d'une feature à la fois

Ne jamais lancer 2 mécaniques en même temps. Sinon impossible de savoir laquelle convertit. MVP → validation → v1.1 → validation → v1.5 → validation → v2.

### Le principe du moat pédagogique

L'arbre des compétences FWB (~500 nœuds, P1-P6 × 2 matières) est le **moat le plus dur à copier**. C'est 2-3 semaines de travail pédagogique, pas de code, mais c'est ce qui rend Koalio impossible à reproduire en un week-end.

### Le principe d'authenticité UGC

Pour une marque familiale, **l'authenticité UGC convertit souvent mieux** qu'une pub léchée. Commencer en mode amateur avec entourage → valider scripts → puis scaler en pro.

---

## 🎬 Et après ?

Prochaines décisions à prendre :

1. **Modélisation pédagogique** : choisir un niveau (ex. P3 maths) et structurer son arbre de compétences complet pour avoir un template à dupliquer
2. **Wireframes "Préparer un contrôle"** : préciser écran par écran le flow pour le backlog v1.5
3. **Script storyboard pub n°1** : finaliser la pub "maman stressée" prête à shooter en UGC
4. **Structure Firestore détaillée** : finaliser le schéma `plan_revision` + `progression` + `competences`
5. **Pré-génération du catalogue MVP** : script de génération en batch (3 thèmes × 6 niveaux × 2 matières × 3 types × 10 variantes)

---

*Document de synthèse — à mettre à jour au fil des décisions produit.*
