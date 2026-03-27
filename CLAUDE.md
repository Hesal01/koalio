# Koalio

## Concept
App web de génération de fiches d'exercices PDF personnalisées pour les enfants du primaire (P1–P6), propulsée par l'IA. Le parent ou l'enseignant choisit le niveau, la matière, un thème (dinosaures, pirates, espace…) et le prénom de l'enfant est intégré directement dans les exercices. Le résultat est un PDF imprimable.

## Branding
- **Nom** : Koalio (retenu après : Taskido → Check → Génio → Exo Factory → Maître Hibou → Koalio)
- **Couleurs** : corail / menthe
- **Mascotte** : koala
- **Contrainte** : nom bilingue FR/NL pour cibler aussi les Flamands

## Marché & Cible
- **Marché principal** : Belgique francophone (FWB), extension possible vers Flandre et France
- **Cibles** : parents (contenu personnalisé) + enseignants (alignés programme belge, tronc commun)
- **Alignement pédagogique** : programme FWB, niveaux P1 à P6, matières maths et français

## Stack Technique
- **Frontend** : Angular 17+
- **Backend** : Firebase (Firestore, Auth, Functions, Hosting)
- **Génération exercices** : Claude API (via Cloud Functions)
- **PDF** : jsPDF + html2canvas
- **Paiements** : Stripe

## Modèle Économique (Freemium)

| Plan | Prix | Contenu |
|------|------|---------|
| Gratuit | 0€ | 3 fiches/mois, 2 thèmes |
| Premium | 4,99€/mois ou 39€/an | Illimité, tous les thèmes |
| Enseignant | ~9,99€/mois | 30 élèves |
| École | 150–500€/an | Licence structure |

## Fonctionnalités Validées
- Génération par matière : calcul, problèmes, conjugaison, orthographe, grammaire
- Suivi de progression de l'élève
- Badges et récompenses pour l'enfant
- Mode révision avant contrôle : J-3, J-2, J-1
- Historique des erreurs avec répétition espacée
- Fiche surprise quotidienne
- Export récapitulatif pour le prof

## SEO & Acquisition
- Pages statiques d'exercices (pas des articles de blog) avec PDF téléchargeables
- Pinterest comme canal fort
- Mots-clés prioritaires : "exercices [matière] [niveau] à imprimer"
- Checklist de 30 premières actions SEO établie

## Analyse Concurrentielle
Faiblesses exploitées :
- **IXL** : scoring qui frustre
- **Khan Academy** : pas assez ludique
- **Prodigy** : pay-to-win, pubs
- **iTooch** : trop long
- **Sites de fiches génériques** : pas alignés programme belge, design daté

**Positionnement unique** : personnalisé + thématisé + programme belge + PDF premium. Aucun concurrent n'occupe ce créneau.

## Avancement (mars 2026)
- Plan d'implémentation en 6 phases (~22–30 jours de dev)
- Prompts Claude optimisés pour chaque type d'exercice
- Landing page HTML complète générée
- Repo initialisé
