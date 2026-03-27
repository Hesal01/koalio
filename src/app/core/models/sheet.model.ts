export type Level = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type Subject = 'math' | 'french';
export type MathTheme = 'additions' | 'soustractions' | 'multiplications' | 'problemes';
export type FrenchTheme = 'conjugaison' | 'orthographe' | 'grammaire';
export type Theme = MathTheme | FrenchTheme;

export interface Question {
  text: string;
  answer: string;
}

export interface Exercise {
  instruction: string;
  questions: Question[];
}

export interface Sheet {
  id: string;
  childName: string;
  level: Level;
  subject: Subject;
  theme: Theme;
  exercises: Exercise[];
  createdAt: Date;
}
