import { Sheet } from '../models/sheet.model';

export const MOCK_SHEET_MATH: Sheet = {
  id: '1',
  childName: 'Emma',
  level: 'P3',
  subject: 'math',
  theme: 'additions',
  createdAt: new Date('2026-03-27'),
  exercises: [
    {
      instruction: 'Calcule les additions suivantes.',
      questions: [
        { text: '24 + 13 = ___', answer: '37' },
        { text: '56 + 32 = ___', answer: '88' },
        { text: '145 + 230 = ___', answer: '375' },
        { text: '367 + 128 = ___', answer: '495' },
        { text: 'Emma a 256 billes. Son ami lui en donne 189. Combien a-t-elle de billes en tout ? ___', answer: '445' },
      ],
    },
    {
      instruction: 'Complète les additions à trous.',
      questions: [
        { text: '___ + 15 = 42', answer: '27' },
        { text: '63 + ___ = 91', answer: '28' },
        { text: '___ + 124 = 300', answer: '176' },
        { text: '205 + ___ = 483', answer: '278' },
      ],
    },
    {
      instruction: 'Résous les problèmes suivants.',
      questions: [
        { text: 'Emma va au marché avec 5 euros. Elle achète des pommes à 2 euros et du pain à 1 euro. Combien lui reste-t-il ? ___', answer: '2 euros' },
        { text: 'Dans la classe, il y a 14 filles et 12 garçons. Combien y a-t-il d\'élèves en tout ? ___', answer: '26' },
        { text: 'Un train part avec 234 passagers. Au premier arrêt, 87 personnes montent. Combien y a-t-il de passagers maintenant ? ___', answer: '321' },
        { text: 'Emma lit 45 pages lundi et 67 pages mardi. Combien de pages a-t-elle lues en tout ? ___', answer: '112' },
      ],
    },
  ],
};

export const MOCK_SHEET_FRENCH: Sheet = {
  id: '2',
  childName: 'Lucas',
  level: 'P4',
  subject: 'french',
  theme: 'conjugaison',
  createdAt: new Date('2026-03-26'),
  exercises: [
    {
      instruction: 'Conjugue les verbes entre parenthèses au présent de l\'indicatif.',
      questions: [
        { text: 'Lucas (manger) ___ une pomme.', answer: 'mange' },
        { text: 'Les enfants (jouer) ___ dans la cour.', answer: 'jouent' },
        { text: 'Nous (finir) ___ nos devoirs.', answer: 'finissons' },
        { text: 'Tu (être) ___ très courageux.', answer: 'es' },
        { text: 'Vous (avoir) ___ de la chance.', answer: 'avez' },
      ],
    },
    {
      instruction: 'Conjugue les verbes au futur simple.',
      questions: [
        { text: 'Demain, Lucas (aller) ___ à l\'école.', answer: 'ira' },
        { text: 'Nous (chanter) ___ une chanson.', answer: 'chanterons' },
        { text: 'Les oiseaux (voler) ___ vers le sud.', answer: 'voleront' },
        { text: 'Je (prendre) ___ le bus.', answer: 'prendrai' },
      ],
    },
    {
      instruction: 'Conjugue les verbes à l\'imparfait.',
      questions: [
        { text: 'Quand il était petit, Lucas (aimer) ___ les dinosaures.', answer: 'aimait' },
        { text: 'Nous (regarder) ___ la télévision.', answer: 'regardions' },
        { text: 'Les chats (dormir) ___ sur le canapé.', answer: 'dormaient' },
        { text: 'Tu (faire) ___ du vélo.', answer: 'faisais' },
      ],
    },
  ],
};

export const MOCK_SHEETS: Sheet[] = [
  MOCK_SHEET_MATH,
  MOCK_SHEET_FRENCH,
  {
    id: '3',
    childName: 'Emma',
    level: 'P3',
    subject: 'math',
    theme: 'soustractions',
    createdAt: new Date('2026-03-25'),
    exercises: [],
  },
];
