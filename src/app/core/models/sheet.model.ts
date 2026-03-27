export type Level = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type Subject = 'math' | 'french';
export type MathTheme = 'additions' | 'soustractions' | 'multiplications' | 'problemes';
export type FrenchTheme = 'conjugaison' | 'orthographe' | 'grammaire';
export type Theme = MathTheme | FrenchTheme;
export type FunTheme = 'dinosaurs' | 'pirates' | 'space' | 'animals';

export interface Question {
  text: string;
  answer: string;
}

export interface DrawingZone {
  type: 'division' | 'fraction' | 'addition' | 'subtraction' | 'counting' | 'comparison' | 'open';
  funTheme: FunTheme;
  params: {
    total?: number;
    groups?: number;
    numerator?: number;
    denominator?: number;
    existing?: number;
    target?: number;
  };
}

export interface Exercise {
  instruction: string;
  questions: Question[];
  drawingZone?: DrawingZone;
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
