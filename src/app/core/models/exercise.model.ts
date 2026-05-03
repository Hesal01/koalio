// ─── Énumérations partagées ──────────────────────────────────
export type Level = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type Subject = 'math' | 'french';
export type FunTheme = 'dinosaurs' | 'pirates' | 'space' | 'animals';

export type MathTheme = 'additions' | 'soustractions' | 'multiplications' | 'problemes';
export type FrenchTheme = 'conjugaison' | 'orthographe' | 'grammaire';
export type Theme = MathTheme | FrenchTheme;

// ─── Formats d'exercices (cf. docs/formats-exercices.md) ─────
export type ExerciseFormat =
  | 'text-blank'
  | 'count-items'
  | 'circle'
  | 'match'
  | 'multiple-choice'
  | 'order'
  | 'draw-items';

// ─── Format text-blank ───────────────────────────────────────
export type TextBlankVariant =
  | 'compute'
  | 'reverse'
  | 'decompose'
  | 'sequence'
  | 'compare'
  | 'word-problem';

export interface TextBlankQuestion {
  /** Texte de la question, contient un ou plusieurs `___` */
  text: string;
  /** Réponse pour chaque `___`, dans l'ordre d'apparition */
  answers: string[];
}

export interface TextBlankExercise {
  format: 'text-blank';
  variant: TextBlankVariant;
  instruction: string;
  /** Exemple résolu affiché avant la liste des questions, pour montrer ce qu'on attend.
   *  Optionnel — typiquement absent sur les word-problems (l'énoncé est déjà compréhensible). */
  example?: string;
  questions: TextBlankQuestion[];
}

// ─── Discriminated union (s'élargira format par format) ──────
export type Exercise = TextBlankExercise;
// | CountItemsExercise
// | CircleExercise
// | MatchExercise
// | MultipleChoiceExercise
// | OrderExercise
// | DrawItemsExercise;

// ─── Sheet (template = JSON catalogue, instance = post-perso) ─
/**
 * SheetTemplate : ce qu'on stocke dans le catalogue JSON.
 * Pas de prénom, pas d'id, pas de date — ces champs sont injectés
 * par le CatalogService au moment de la génération.
 * Les textes contiennent des placeholders comme `{{prenom}}`.
 */
export interface SheetTemplate {
  level: Level;
  subject: Subject;
  theme: Theme;
  funTheme: FunTheme;
  exercises: Exercise[];
}

/**
 * Sheet : instance prête à afficher, post-personnalisation.
 * Plus de placeholders, prénom et id remplis.
 */
export interface Sheet extends SheetTemplate {
  id: string;
  childName: string;
  createdAt: Date;
}
