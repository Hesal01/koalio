import { Subject, Theme } from './sheet.model';

export const THEMES_BY_SUBJECT: Record<Subject, { value: Theme; label: string }[]> = {
  math: [
    { value: 'additions', label: 'Additions' },
    { value: 'soustractions', label: 'Soustractions' },
    { value: 'multiplications', label: 'Multiplications' },
    { value: 'problemes', label: 'Problèmes' },
  ],
  french: [
    { value: 'conjugaison', label: 'Conjugaison' },
    { value: 'orthographe', label: 'Orthographe' },
    { value: 'grammaire', label: 'Grammaire' },
  ],
};

export const LEVELS = [
  { value: 'P1', label: 'P1 — 1ère primaire' },
  { value: 'P2', label: 'P2 — 2e primaire' },
  { value: 'P3', label: 'P3 — 3e primaire' },
  { value: 'P4', label: 'P4 — 4e primaire' },
  { value: 'P5', label: 'P5 — 5e primaire' },
  { value: 'P6', label: 'P6 — 6e primaire' },
] as const;
