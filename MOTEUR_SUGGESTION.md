# Koalio — Moteur de suggestion et de suivi

*Document de design produit — comment fonctionne le cœur du système*

---

## 1. Onboarding — les premières 90 secondes

L'objectif : capturer le strict nécessaire pour personnaliser, et amener le parent au moment magique avant qu'il décroche.

### Les 4 questions essentielles

**Q1. Année scolaire** *(obligatoire)*
P1, P2, P3, P4, P5, P6. Sélection visuelle (gros boutons, pas de menu déroulant). C'est la donnée structurante : elle conditionne tout le programme FWB chargé.

**Q2. Prénom de l'enfant** *(obligatoire)*
Champ libre. Le déclencheur du moment magique. À mettre AVANT la création de compte si techniquement possible — pour montrer la perso avant le formulaire d'inscription, pas après.

**Q3. Le thème qui passionne ton enfant** *(obligatoire)*
Sélection visuelle parmi 6-8 thèmes (dinosaures, espace, princesses, animaux, foot, licornes, super-héros, nature). Pas de champ libre — sinon tu dois gérer "Pokémon" puis "Minecraft" puis "Bluey" et c'est infini. Une grille fermée = catalogue gérable.

**Q4. Comment se débrouille ton enfant en maths et en français ?** *(optionnelle, mais fortement encouragée)*
Pour chaque matière, 3 boutons : "Très bien" / "Ça va" / "Difficile". C'est subjectif, mais c'est exactement ce qu'on veut : le **ressenti du parent**, qui est le meilleur calibreur initial avant qu'on ait des données réelles.

### Une question stratégique cachée

**Q5. Pourquoi tu utilises Koalio ?** *(une seule réponse)*
- "Préparer une interro proche"
- "Faire travailler régulièrement"
- "Combler une difficulté précise"
- "Découvrir / pas sûr"

**Cette question est centrale** parce qu'elle route le parent vers un parcours différent dans la home. Sans la poser, tu fais un compromis qui ne plaît à personne. Avec elle, le parent stressé arrive sur "Interro express" et le parent ambitieux sur "Plan d'entraînement". Le ressenti de l'app devient sur-mesure dès la première session.

### Ce qu'on n'ajoute PAS

- Pas de "test diagnostic" (5 minutes = perte du parent)
- Pas de questionnaire pédagogique (DYS, HPI, etc.) au début (intrusif, pas nécessaire pour démarrer)
- Pas d'email avant le moment magique si possible (ou alors juste pour sauvegarder, pas pour bloquer)

**Total : ~60 secondes pour ces 5 questions.**

---

## 2. Le moteur de suggestion — 3 fiches, pas plus, pas moins

### Pourquoi exactement 3

- 1 fiche = pas de choix, le parent a l'impression qu'on lui impose
- 5+ fiches = paralysie de décision, le parent reporte
- 3 = vrai choix, décidable en 10 secondes

### Comment composer les 3 fiches

Les 3 fiches ne sont **jamais** trois variantes du même exercice. Elles diffèrent sur **3 axes** :

**Axe 1 — Sous-thème** : trois compétences distinctes mais cohérentes avec le profil. Pour un P3 en maths : par exemple multiplications / problèmes additifs / géométrie.

**Axe 2 — Difficulté** : une fiche "calibration" (sous le niveau déclaré, succès quasi-garanti, motivation), une fiche "centre" (au niveau exact), une fiche "challenge" (un cran au-dessus).

**Axe 3 — Format** : varier entre calcul direct, problème en mots, énigme/devinette. Évite la lassitude.

Chaque fiche est présentée avec :
- **Titre personnalisé** : *"Léo et les multiplications spatiales"* plutôt que *"Multiplications par 2-5"*
- **Niveau** : pastille P3 visible
- **Durée estimée** : "≈ 8 minutes"
- **Statut** : "Nouvelle" / "Déjà essayée le 15 oct." / "Tu l'avais trouvée difficile"
- **Pictogramme du thème** dominant

### Pour un nouveau profil (première session)

Sans données, l'algo se base uniquement sur les déclarations d'onboarding (niveau + ressenti matière). Il propose :
- 1 fiche **calibration confiante** (un cran sous le niveau si "Difficile" déclaré, au niveau si "Très bien")
- 1 fiche **centre** sur la compétence canoniquement à travailler ce mois en P3 (selon programme FWB)
- 1 fiche **exploration** sur un sous-thème différent pour "balayer"

### Pour un profil avec historique

L'algo croise plusieurs signaux pour décider quoi proposer :

- **Compétences en cours** (commencées mais pas maîtrisées) → priorité 1
- **Compétences "difficiles"** signalées par feedback → priorité 2
- **Compétences à introduire** selon le programme FWB et l'avancée → priorité 3
- **Sujets à rafraîchir** (maîtrisés il y a > 4 semaines) → priorité 4

Le mix : 1 fiche priorité 1, 1 fiche priorité 2 ou 3, 1 fiche priorité 4 (ou exploration). Toujours 3 angles différents.

### Le bouton "Pas convaincu, montre-moi 3 autres"

Sous les 3 fiches, un lien discret pour rejeter et regénérer. Limite : 2 rejets consécutifs, puis l'app demande "Tu cherches quelque chose de précis ?" et passe en mode recherche par sous-thème. Évite la frustration sans laisser tourner en boucle.

---

## 3. Le feedback loop — deux boutons, c'est la bonne intuition

### Quand poser la question

**Au retour suivant**, pas pendant la session active. Le parent lance l'app après quelques jours, et avant de générer une nouvelle fiche, l'app affiche en haut :

> *"Comment ça s'est passé pour Léo avec '[Titre de la dernière fiche]' ?"*
> 👍 Bien    😓 Difficile    ⏭ Pas faite

### Pourquoi 3 boutons et pas 2

**"Pas faite"** est crucial. Sans ce bouton, le parent qui n'a pas eu le temps clique au pif "Bien" ou ne répond pas. Avec ce bouton, tu obtiens une donnée honnête (la fiche n'a pas été utilisée) et tu peux la re-suggérer plus tard.

### Pas de notation 5 étoiles, pas d'échelle

Tentation classique du designer : *"Et si on mettait 5 étoiles ?"* Non. Plus tu donnes d'options, moins les gens répondent. Deux boutons positifs/négatifs c'est le sweet spot. Tout le monde sait répondre en 1 seconde.

### Ce que l'algo fait avec ces 3 réponses

| Feedback | Ajustement immédiat | Effet sur le profil |
|---|---|---|
| **Bien** | La compétence avance vers "maîtrisée". On peut suggérer le niveau au-dessus ou un sous-thème connexe. | Confiance +1 sur le sous-thème. Au bout de 3 "Bien" = "maîtrisé" |
| **Difficile** | Renforcement du sous-thème, à un niveau égal ou plus simple. Pas de nouveau sous-thème introduit. | Confiance -1. Au bout de 2 "Difficile" consécutifs = mode soutien sur ce sous-thème |
| **Pas faite** | Pas d'ajustement de difficulté. La fiche peut être resuggérée dans 2-3 sessions. | Aucun effet sur le profil de compétence |

### Détections proactives intelligentes

Au-delà du feedback brut, l'app détecte des patterns et **parle au parent** quand c'est utile :

- **3 "Difficile" consécutifs sur le même sous-thème** → message : *"Léo a l'air en difficulté avec les multiplications. Tu veux qu'on revienne aux bases (additions répétées) ou qu'on continue ?"* + 2 boutons.
- **5 "Bien" consécutifs sur le même sous-thème** → *"Léo maîtrise bien les multiplications par 2-5 ! On passe aux multiplications par 6-9 ?"*
- **Streak de 7 fiches "Bien"** → *"Léo a réussi 7 fiches d'affilée ! 👏"* (motivation, capture d'écran à partager).
- **Pas de feedback sur 5 fiches** → message gentil : *"Quelques retours nous aideraient à mieux aider Léo. C'est rapide, promis."*

Ces messages doivent être **rares** — un par session max. Sinon ça devient du bruit.

### Le feedback enrichi optionnel

Pour les parents qui veulent aller plus loin, sous le bouton "Difficile" qu'ils viennent de cliquer, un sous-menu apparaît :
- "Notion pas comprise"
- "Distrait, pas concentré"
- "Manque de temps"
- "Trop dur globalement"

Ces sous-catégories ne sont **pas** obligatoires. Mais si elles sont remplies, elles affinent énormément. "Notion pas comprise" → renforcement. "Distrait" → on ne change rien à la difficulté, on resuggère plus tard.

---

## 4. Le modèle de progression — sous le capot

C'est ton vrai actif. Le user le voit pas, mais c'est ce qui fait que l'app suggère bien.

### Représentation : un graphe de compétences, pas une liste

Une compétence n'est pas indépendante. Elle a des pré-requis et débloque d'autres compétences. Exemple pour P3 maths :

```
Addition simple → Addition à retenue → Addition à 3 chiffres
                ↓
           Soustraction simple → Soustraction à retenue
                ↓
           Multiplication par 2-5 → Multiplication par 6-9 → Tables complètes
                ↓                       ↓
           Problèmes additifs ←————— Problèmes multiplicatifs
```

Chaque compétence est un nœud du graphe. Tu construis ce graphe **une fois pour la FWB, P1 à P6, maths + français**. C'est probablement 200-300 nœuds total. C'est du travail de design pédagogique, mais c'est fait une fois.

### Le profil de l'enfant = un état du graphe

Pour Léo (P3), l'app maintient pour chaque compétence du graphe un statut :

| Statut | Signification | Critère |
|---|---|---|
| **Non vu** | L'enfant n'a jamais fait de fiche sur ce sujet | Aucune fiche générée |
| **Découverte** | A fait 1-2 fiches, on apprend son niveau | < 3 fiches |
| **En cours** | En apprentissage actif | 3-5 fiches, mix de feedbacks |
| **Maîtrisé** | Réussit régulièrement | 3+ "Bien" consécutifs ou 5+ fiches dont 80% "Bien" |
| **En difficulté** | Bloque | 2+ "Difficile" consécutifs sur cette compétence |
| **À rafraîchir** | Maîtrisé mais pas vu depuis longtemps | Maîtrisé + 4+ semaines sans pratique |

### L'algorithme de suggestion en pseudo-code (simple)

```
fonction suggérer_3_fiches(profil_enfant, programme_FWB) :
    candidats = []

    # Priorité 1 : compétences "en difficulté" (renforcement)
    candidats += compétences_en_difficulté(profil_enfant)

    # Priorité 2 : compétences "en cours" (continuité)
    candidats += compétences_en_cours(profil_enfant)

    # Priorité 3 : compétences à introduire (avancement programme)
    candidats += compétences_à_débloquer(profil_enfant, programme_FWB)

    # Priorité 4 : compétences à rafraîchir (rétention long terme)
    candidats += compétences_à_rafraîchir(profil_enfant)

    # On choisit 3 fiches diversifiées
    fiches = []
    fiches.append(prendre_dans(priorité_1_ou_2))   # une fiche de continuité
    fiches.append(prendre_dans(priorité_3))         # une fiche de progression
    fiches.append(prendre_dans(toutes_priorités))   # une fiche d'exploration

    # On varie le format et la difficulté
    fiches = diversifier(fiches)

    return fiches
```

C'est **bête mais ça marche**. Pas besoin d'IA, pas besoin de machine learning, pas besoin de rien de sophistiqué pour la v1. Une logique de règles bien pensée fait 95% du travail. Tu pourras toujours ajouter du ML plus tard quand tu auras 10 000 utilisateurs et de la donnée.

### Là où l'IA générative est vraiment utile

Pas pour décider **quoi** suggérer (la logique de règles suffit). Mais pour **générer le contenu** :
- Variantes de la même fiche (énoncés différents, mêmes objectifs pédagogiques)
- Personnalisation contextuelle (Léo + dinosaures + multiplications = exercices avec dinosaures qui multiplient leurs trésors)
- Génération à la demande pour les cas que tu n'as pas pré-générés ("Mon enfant a une interro sur les triangles isocèles")

**Distinction clé** : l'IA génère le contenu, mais c'est ta logique de progression qui décide quand et quoi.

---

## 5. Les modes spéciaux

### Mode "Préparer une interro"

Différent du drill régulier. Le parent clique "Interro à préparer" depuis la home :

1. **Sélection rapide** du sujet : autocomplete avec les compétences du programme FWB pour le niveau de l'enfant. Exemples : "Multiplications par 2 chiffres", "Conjugaison du présent", "Mesures de longueur".
2. **L'app génère un parcours** de 3-5 fiches, du plus simple au plus difficile, **toutes sur le même sujet**.
3. **Suivi de préparation** : *"Léo a fait 2 fiches sur 5, il a réussi les 2. Estimation : prêt à 60% pour son interro."*
4. **Bilan** quand tout est fait : *"Léo a complété sa préparation. Bonne chance demain !"*

Les feedbacks de ce mode nourrissent le profil global aussi.

### Mode "Combler une lacune précise"

Activé quand le parent clique "Mon enfant a du mal avec…" :

1. Liste hiérarchique des compétences du programme FWB pour son niveau
2. Le parent coche le sujet
3. L'app génère un mini-parcours de 4-6 fiches, du facile au standard
4. Feedback à chaque fiche, avec adaptation
5. Le statut de cette compétence passe automatiquement en "En difficulté" → priorité 1 dans les suggestions futures aussi

### Mode "Drill du jour" (pour les parents engagés)

Pour les parents qui veulent faire travailler 30 minutes / jour. La home affiche un bouton unique : "Lancer la séance du jour". L'app propose **automatiquement** 1 ou 2 fiches sans demander le sous-thème, basées sur le profil. Zéro choix demandé. Pour les parents qui ne veulent pas réfléchir.

---

## 6. Les pièges à éviter

### Ne pas surcharger d'options
Mode "Drill du jour" devrait être **par défaut**. Les options avancées (choisir le sujet, voir l'historique, modifier le profil) sont disponibles en 2 clics, mais pas en première page.

### Ne pas montrer de courbes complexes au parent
Pas de "graphique de progression" la première semaine. Pas de "score" la première session. **Surveille bien :** ces visualisations donnent une fausse impression de précision et stressent les parents (*"mon enfant n'est qu'à 47% en maths ?"*). Donne juste une phrase synthétique : *"Léo progresse bien en maths, doit consolider la conjugaison."*

### Ne pas changer la suggestion radicalement à chaque feedback
Si le parent dit "Difficile" une fois, ne bascule pas tout le profil en panique. Le système est **stable** : il faut 2 ou 3 signaux convergents pour changer un statut. Sinon le parent perd confiance ("hier ça suggérait des trucs durs, aujourd'hui c'est trop facile").

### Ne jamais rendre le feedback obligatoire
Bouton "Pas faite" toujours visible, "Skip" toujours possible. Forcer le feedback = abandon de l'app.

### Ne pas faire planter le système quand l'enfant change de niveau
En septembre, quand Léo passe de P3 à P4, l'app détecte (via la date) ou demande au parent. Le profil est **migré** intelligemment : compétences P3 maîtrisées → marquées "à rafraîchir occasionnellement", focus sur les nouvelles compétences P4.

### Ne pas oublier le frère/la sœur
Sur le tier Famille, gérer les profils en parallèle. L'app détecte automatiquement quel enfant est concerné quand on lance une session ("Tu travailles avec qui aujourd'hui : Léo ou Emma ?").

### Ne pas faire d'IA "boîte noire"
Quand l'app suggère une fiche, donne brièvement le **pourquoi** : *"Pour consolider les multiplications que Léo trouvait difficiles la semaine dernière."* Ça crée de la confiance dans le système. Sinon le parent a l'impression que l'app suggère au pif.

---

## 7. Roadmap d'implémentation

Décomposition en 3 phases de complexité croissante.

### Phase 1 — MVP (lancement)
- Onboarding 5 questions
- Mode "Drill du jour" et mode "Préparer interro"
- Suggestion de 3 fiches avec règles simples (priorité 1+2+3)
- Feedback 3 boutons
- Profil de compétences avec 5 statuts
- Le graphe FWB pour P3-P5 maths + français

### Phase 2 — 6 mois après le lancement
- Mode "Lacune" complet
- Détections proactives (les messages du système après 3 difficiles, 5 bien, etc.)
- Multi-enfants (offre Famille)
- Élargissement P1-P2 et P6
- Sous-menu de feedback enrichi (notion / distrait / temps)

### Phase 3 — année 2
- Photo du cahier (OCR + classification)
- Suggestions plus sophistiquées (utiliser les patterns inter-utilisateurs anonymisés)
- Tableau de bord parent plus riche
- Export PDF du "rapport mensuel" pour les parents engagés

### Phase 4 — quand tu auras du volume
- ML léger pour affiner la calibration
- Recommandations personnalisées basées sur des cohortes similaires
- Adaptation fine par sous-profil (DYS, HPI, etc.)

---

## En résumé

C'est ton vrai produit, et c'est ce qui justifie ton pricing premium et ta défense face à un éventuel arrivant. Le contenu peut être copié, la perso peut être copiée. **Mais 18 mois de raffinement sur ce moteur de suggestion + le graphe FWB construit avec rigueur, c'est très dur à rattraper.**

Les 3 piliers à exécuter avec rigueur :
1. **Le graphe de compétences FWB** — du travail pédagogique fait une fois, base de tout le reste
2. **L'algorithme de suggestion** — logique de règles simple, pas d'IA, mais pensée juste
3. **Le feedback loop** — frictionless, 3 boutons, données honnêtes plutôt que parfaites

*Document à itérer au fur et à mesure des décisions produit.*
