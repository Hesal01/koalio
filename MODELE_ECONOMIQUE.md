# Koalio — Modèle économique

*Document de synthèse — version après itérations*

---

## 1. Vision et positionnement

**Koalio est un compagnon de progression scolaire pour parents d'élèves du primaire en Fédération Wallonie-Bruxelles.**

Pas un générateur de fiches imprimables. Pas une plateforme interactive type Wiloki. Pas un site de fiches gratuites comme MaMaternelle.

**Une promesse simple, deux portes d'entrée :**

- **Porte "stress"** : *"Interro demain ? Préparez votre enfant en 2 clics."*
- **Porte "ambition"** : *"Faites de votre enfant un bon en maths et en français, simplement."*

**Le produit en une phrase :** une app qui suit le programme officiel FWB, propose des exercices personnalisés (prénom + thème de l'enfant), s'adapte au niveau, et permet à un parent occupé de faire travailler son enfant 30 minutes sans aucune préparation.

---

## 2. Cible

### Cible primaire
Parents en FWB d'enfants en primaire (P1 à P6), qui :
- veulent que leur enfant soit **bon** (pas juste "correct") en maths et français
- n'ont pas le temps ni l'envie de chercher des fiches sur internet
- préfèrent le format papier (impression) au tout-numérique
- sont prêts à payer pour la **simplicité** plutôt que pour le contenu en soi

### Cibles secondaires (réceptifs au produit, à long terme)
- Parents IEF (instruction en famille) — petite niche très engagée
- Parents d'enfants à besoins spécifiques (DYS, HPI, TDAH)
- Grands-parents impliqués dans le suivi scolaire
- Orthopédagogues et profs particuliers (canal prescripteur)

### Cibles à éviter dans le marketing
- Parents "lâche-prise" / pédagogie nouvelle qui rejettent le drill
- Parents recherchant uniquement de l'interactif ludique (cible Wiloki)

---

## 3. Marché et concurrence

### Taille du marché
- ~310 000 enfants en primaire FWB
- ~217 000 foyers cibles théoriques (70% pénétration numérique)
- **Marché adressable réaliste sur 36 mois** : 5 000 à 15 000 inscriptions cumulées

### Concurrents directs
| Acteur | Positionnement | Prix | Faiblesse vs Koalio |
|---|---|---|---|
| **Wiloki** | Plateforme interactive ludique | ~25 €/an | Programme français, pas FWB, pas imprimable |
| **Pass Education / sites gratuits** | Bibliothèque de fiches PDF gratuites | 0 € | Pas de workflow, pas de progression, programme français |
| **MaMaternelle, Phifix, Alloprof** | Fiches gratuites | 0 € | Idem |
| **Lutin Bazar, Maîtresse Aurel** | Marketplace prof, packs PDF unitaires | 5–15 € le pack | Pas de progression, pas de perso, programme français |
| **IXL Learning** (US/UK) | Drill structuré progressif | ~120 €/an | N'existe pas pour la FWB, pas de français |
| **Plantyn / De Boeck** | Manuels papier officiels FWB | 25–40 €/matière | Statiques, pas d'app, pas pour parents directs |

### L'espace vide
**Personne ne propose un compagnon de progression structuré, calé sur le programme officiel FWB, avec génération personnalisée et imprimable.** C'est l'opportunité.

---

## 4. Différenciation

Par ordre d'importance pour le marketing :

1. **Programme FWB officiel** (Socles de compétences, préparation CEB) — *le différenciateur n°1, sous-couvert par tous les acteurs établis*
2. **Workflow simple en 2 clics** — *le parent stressé ne cherche pas, il génère*
3. **Personnalisation prénom + thème** — *moment magique d'engagement*
4. **Parcours adaptatif** — *l'app suggère, ajuste selon facile/difficile*
5. **Format imprimable + numérique** — *pour parents anti-écran*

**Le vrai produit défendable, c'est l'algorithme de progression**, pas le contenu (qui peut être copié) ni la perso (gimmick). C'est le point sur lequel investir le plus de temps de développement.

---

## 5. Modèle commercial

### Décision tranchée : pas d'abonnement mensuel récurrent

**Pourquoi pas de mensuel ?**
- Le cycle d'usage est annuel (programme scolaire FWB se déroule sur 1 année)
- Le churn mensuel B2C éducation est de 8–10%/mois → ~70–80% annuel équivalent (vs 30–40% en annuel)
- Économie unitaire dégradée : ARPU effectif beaucoup plus bas
- Friction de désabonnement, support utilisateur, gestion comptable plus lourdes
- Wiloki et la majorité du marché vendent uniquement en annuel

**Mais un besoin réel de "porte d'entrée sans engagement" existe**, notamment pour :
- Les parents qui veulent tester avant
- Les parents en mode "interro express" qui n'ont besoin que de 30 jours

**Solution : essai gratuit + pack one-shot, pas mensuel récurrent.**

### Grille tarifaire proposée

| Offre | Prix | Cible | Renouvellement |
|---|---|---|---|
| **Catalogue gratuit** (limité) | 0 € | Acquisition, SEO | — |
| **Essai gratuit 14 jours** | 0 € | Réduire friction d'entrée vers l'annuel | — |
| **Pack Express 30 jours** | 9,99 € | Parents stress ponctuel, "interro la semaine prochaine" | One-shot, **non auto-renouvelable** |
| **Koalio Préparation** (annuel, 1 enfant) | 39 €/an | Parents occasionnels, focus interros | Auto-renouvelable |
| **Koalio Progression** (annuel, 1 enfant) | 79 €/an | Parents engagés, drill + interro + suivi adaptatif | Auto-renouvelable |
| **Koalio Famille** (annuel, multi-enfants) | 119 €/an | Familles 2-3 enfants | Auto-renouvelable |

**Logique de la grille :**
- Le **Pack Express** capte les parents qui ne s'engageraient jamais sur 12 mois → conversion via panique pré-interro
- Les **deux tiers annuels** créent un effet d'ancrage : à côté du Progression à 79 €, le Préparation à 39 € paraît raisonnable
- **Famille** maximise l'ARPU sur les fratries (avantage économique évident pour le parent)

### Pourquoi ces niveaux de prix
- 39 € = aligné marché (~10–20% au-dessus de Wiloki, justifié par le caractère FWB)
- 79 € = positionnement premium défendu par la promesse "drill structuré + adaptatif"
- 119 € = ~50% de remise par enfant pour le multi, encourage l'upsell familles

---

## 6. Économie unitaire

### Coûts variables par abonné premium par mois
| Poste | Coût mensuel |
|---|---|
| IA (génération à la demande, catalogue pré-généré) | 0,10 € |
| Stripe + commissions stores (App Store / Play à 15% Small Business) | 0,50 € |
| Hébergement variable (Firebase) | 0,10 € |
| **Total coût variable** | **0,70 €/mois** |

### Coûts fixes mensuels
| Poste | Coût |
|---|---|
| Hébergement de base (Firebase Blaze min) | 50 € |
| Outils (Notion, Figma, GitHub, etc.) | 30 € |
| Comptable / admin (BE) | 50 € |
| Marketing minimal | 30 € |
| Domaine, mailing, divers | 20 € |
| **Total coûts fixes** | **180 €/mois (~2 160 €/an)** |

### ARPU et marge brute
**Hypothèse de mix** : 50% Préparation à 39 €, 35% Progression à 79 €, 10% Famille à 119 €, 5% Pack Express à 9,99 €.

- **ARPU mensuel pondéré** : ~5,40 €/mois
- **Marge brute par abonné** : ~4,70 €/mois
- **Seuil de breakeven** : ~38 abonnés actifs en moyenne

---

## 7. Projection 36 mois — scénario réaliste

### Hypothèses opérationnelles
- Inscriptions M1 : 30 (démarrage modeste, 5–10h/sem disponible)
- Croissance mensuelle inscriptions : 11% (1 article SEO/sem)
- Saisonnalité : x1.8 en septembre, x1.3 décembre/mars/juin, x0.4 été
- Conversion gratuit → premium : 4% (avec essai 14 jours et onboarding soigné)
- Churn annuel : 25% (rétention dopée par mode drill + multi-niveaux)
- Coûts variables : 0,70 €/mois par abonné
- Coûts fixes : 180 €/mois

### Résultats projetés

| Métrique | An 1 | An 2 | An 3 |
|---|---:|---:|---:|
| Inscriptions cumulées | ~650 | ~3 000 | ~10 000 |
| Abonnés premium fin | ~20 | ~95 | ~300 |
| Abonnés moyens (année) | ~8 | ~50 | ~180 |
| Revenu annuel | ~520 € | ~3 200 € | ~11 700 € |
| Résultat net | -2 100 € | +400 € | +5 800 € |
| Cumul net | -2 100 € | -1 700 € | **+4 100 €** |

### Lecture
- **Année 1** : phase d'investissement, ~2 100 € à sortir de sa poche, étalés sur 12 mois (~175 €/mois)
- **Année 2** : équilibre, projet ne coûte plus
- **Année 3** : ~480 €/mois nets, side-project rentable atteint

### À l'horizon 4–5 ans (extrapolation)
Si le rythme se maintient : 700–1 200 abonnés actifs, revenu de 35 000–60 000 €/an, bénéfice net 25 000–45 000 €/an. **À ce stade, transition possible vers activité principale**.

---

## 8. Plan d'exécution priorisé

### Avant lancement (mois -3 à 0)
1. **Construire le catalogue initial FWB** : 500 fiches templates de qualité (P1-P6 × maths + français × ~12 sous-thèmes par matière). Pas 1 500 médiocres.
2. **Faire valider par 2-3 instits FWB** ou conseillers pédagogiques. Caution explicite sur le site.
3. **Coder l'algorithme de progression** : suggestion de fiche suivante en fonction du niveau, du feedback facile/difficile, et de la position dans le programme. C'est le vrai produit.
4. **Onboarding qui prouve la valeur en 90 secondes** : prénom de l'enfant + 1 thème + 1 fiche générée immédiatement. Le moment magique doit être visible avant la création de compte si possible.
5. **Stripe + intégration App Store / Play** avec inscription au Small Business Program (commission à 15%).

### Année 1 — focus exécution & SEO
- 1 article SEO par semaine, ciblant des longue-traîne FWB ("exercices CEB maths", "fiche multiplication P3 belgique", etc.)
- Capture email sur chaque article via freebie PDF
- Drip email 4-6 messages sur 8 semaines pour convertir en payant
- Itération continue sur l'onboarding (le seul levier conversion qui dépend de toi)
- Un post Insta organique par semaine, sans pression

### Année 2 — focus rétention & preuve sociale
- Récolter 5–10 témoignages de progression mesurable
- Page "Avis parents" + page "Validé par des enseignants"
- Commencer à pousser l'offre Famille (lever d'ARPU important)
- Tester un partenariat avec 1-2 orthopédagogues pour bouche-à-oreille

### Année 3 — focus consolidation & élargissement
- Multi-niveaux opérationnel (l'enfant grandit, on garde la famille)
- Intégrer fonctionnalité "photo du cahier" pour catégorisation (v2)
- Évaluer l'ouverture à d'autres marchés francophones (Suisse romande, Luxembourg)

---

## 9. Risques principaux

### Risques produit (les plus critiques)
- **L'algo de progression est mauvais** → suggestions répétitives, parents perdent confiance, churn explose
- **Couverture FWB incomplète ou mal alignée** → la promesse n°1 ne tient pas
- **Qualité pédagogique des fiches insuffisante** → les parents "ambition" partent
- **UX qui dévie en complexité** → la promesse "2 clics" ne tient plus

### Risques marché
- Wiloki (ou autre concurrent) lance une version FWB → bataille frontale, ils ont les ressources
- Plantyn ou De Boeck lance une app pour parents → ils ont la légitimité institutionnelle
- Le marché parents FWB se révèle plus petit ou moins solvable qu'estimé

### Risques exécution (solo bootstrap, 5–10h/sem)
- Lâcher le rythme SEO en cours de route → croissance s'effondre
- Burnout / vie perso qui prend le dessus en année 1-2
- Sous-estimer le temps réel de production du catalogue initial

### Risques techniques
- Coût IA explose si modèle de base augmente ses prix → impact sur marge unitaire
- Apple / Google modifient leurs commissions → impact direct sur ARPU
- Bug rédhibitoire à l'inscription → perte massive de conversion

---

## 10. Métriques à suivre dès le mois 1

### Acquisition
- Visiteurs uniques site / semaine
- Inscriptions gratuites / semaine
- Taux de capture email sur articles SEO

### Activation
- % d'inscrits qui génèrent au moins 1 fiche
- Temps moyen entre inscription et 1ère fiche
- % qui activent l'essai gratuit

### Conversion
- Taux essai gratuit → payant
- Distribution par tier (Préparation / Progression / Famille / Express)
- Délai moyen entre inscription et conversion

### Rétention & engagement
- % d'abonnés qui génèrent au moins 1 fiche / mois
- Nombre moyen de fiches générées / abonné / mois
- Churn mensuel et annuel
- NPS à 30 et 90 jours

### Économique
- ARPU mensuel pondéré
- Marge brute par abonné
- Cumul net mensuel
- Mois de breakeven

---

## 11. Décisions à valider

Pour passer de "stratégie" à "exécution", il faut trancher :

1. **Lancement initial : un seul tier (Progression à 79 €) ou la grille complète dès le départ ?**
   *Recommandation : un seul tier au lancement pour simplifier le produit et le marketing. Ajouter Préparation et Famille en mois 6.*

2. **Inclure le Pack Express 30 jours dès le départ ?**
   *Recommandation : oui, c'est la porte d'entrée la plus accessible et ça ne complexifie pas le produit (juste une variante de durée).*

3. **Couverture matières au lancement : maths + français P1-P6 d'emblée ou démarrer plus restreint ?**
   *Recommandation : démarrer avec P3-P5 maths + français (cycle où la pression scolaire est forte), élargir P1-P2 et P6 ensuite.*

4. **Date de lancement : viser septembre (rentrée FWB) ou plus tôt ?**
   *Recommandation : viser un soft launch en mai-juin avec 50-100 bêta-testeurs (préparation CEB), puis lancement public début septembre. L'effet rentrée scolaire est massif sur les inscriptions.*

5. **Caution pédagogique : nécessaire avant lancement ou peut-on lancer sans ?**
   *Recommandation : nécessaire. Trouver 2-3 instits FWB prêts à apparaître sur le site avant le lancement public, même si c'est juste leur prénom + niveau enseigné.*

---

*Document à itérer au fur et à mesure des validations terrain.*
