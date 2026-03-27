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
      ],
    },
    {
      instruction: 'Le Tricératops a pondu 12 œufs. Il doit les répartir dans 3 nids. Dessine les œufs dans les nids, puis complète.',
      questions: [
        { text: 'Opération : 12 ÷ 3 = ___', answer: '4' },
        { text: 'Chaque nid contient ___ œufs.', answer: '4' },
      ],
      drawingZone: {
        type: 'division',
        funTheme: 'dinosaurs',
        params: { total: 12, groups: 3 },
      },
    },
    {
      instruction: 'Emma l\'astronaute a trouvé 7 étoiles. Elle en trouve encore 5. Dessine les étoiles, puis calcule.',
      questions: [
        { text: 'Opération : 7 + 5 = ___', answer: '12' },
        { text: 'Emma a ___ étoiles en tout.', answer: '12' },
      ],
      drawingZone: {
        type: 'addition',
        funTheme: 'space',
        params: { existing: 7, target: 5 },
      },
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
