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

/**
 * Question text-blank statique : texte fixe + réponse(s) prédéfinie(s).
 * `text` peut contenir un ou plusieurs `___` ; `answers` les remplit dans l'ordre.
 */
export interface TextBlankQuestion {
  text: string;
  answers: string[];
}

// ─── Générateurs (catalogue) ─────────────────────────────────
/**
 * Bloc générateur dans le catalogue : à l'expansion, produit `count` questions
 * aléatoires respectant les contraintes. Discriminated union par `generate`.
 */
export type TextBlankGenerator =
  | AdditionComputeGen
  | AdditionReverseGen
  | SubtractionComputeGen
  | DecomposeDuGen
  | SequenceStepGen;

export interface AdditionComputeGen {
  generate: 'addition-compute';
  count: number;
  min?: number;        // défaut 1
  max?: number;        // défaut 9 (max d'un opérande)
  maxResult?: number;  // défaut 10
}

export interface AdditionReverseGen {
  generate: 'addition-reverse';
  count: number;
  min?: number;
  max?: number;
  maxResult?: number;
  position?: 'left' | 'right' | 'both'; // où va le blanc, défaut 'both'
}

export interface SubtractionComputeGen {
  generate: 'subtraction-compute';
  count: number;
  min?: number;
  max?: number;
}

export interface DecomposeDuGen {
  generate: 'decompose-DU';
  count: number;
  min: number;  // n minimum (typiquement 10)
  max: number;  // n maximum (typiquement 19 en P1)
}

export interface SequenceStepGen {
  generate: 'sequence-step';
  count: number;
  step: 1 | 2 | 5 | 10;
  length: number;          // nombre total de termes affichés
  blanks: number;          // nombre de blancs (les positions sont choisies au milieu)
  startMin?: number;       // défaut 0
  startMax?: number;       // défaut 5
}

/**
 * Item du tableau `questions` dans le catalogue : soit une question
 * statique, soit un bloc générateur à expanser au runtime.
 */
export type TextBlankItem = TextBlankQuestion | TextBlankGenerator;

export function isGeneratorBlock(item: TextBlankItem): item is TextBlankGenerator {
  return (item as TextBlankGenerator).generate !== undefined;
}

// ─── Exercice text-blank — template (catalogue) vs runtime ────
/**
 * Version catalogue : `questions` peut mélanger statiques et générateurs.
 */
export interface TextBlankExerciseTemplate {
  format: 'text-blank';
  variant: TextBlankVariant;
  instruction: string;
  example?: string;
  questions: TextBlankItem[];
}

/**
 * Version runtime (post-expansion) : `questions` est une liste plate de statiques.
 */
export interface TextBlankExercise {
  format: 'text-blank';
  variant: TextBlankVariant;
  instruction: string;
  example?: string;
  questions: TextBlankQuestion[];
}

// ─── Discriminated union (s'élargira format par format) ──────
export type ExerciseTemplate = TextBlankExerciseTemplate;
export type Exercise = TextBlankExercise;

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
  exercises: ExerciseTemplate[];
}

/**
 * Sheet : instance prête à afficher, post-personnalisation et expansion.
 * Plus de placeholders, plus de générateurs, prénom et id remplis.
 */
export interface Sheet {
  id: string;
  childName: string;
  level: Level;
  subject: Subject;
  theme: Theme;
  funTheme: FunTheme;
  exercises: Exercise[];
  createdAt: Date;
}
