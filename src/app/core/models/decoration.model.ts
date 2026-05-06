import { FunTheme } from './exercise.model';

/**
 * Catégorie de taille d'une décoration. Détermine où elle est utilisée :
 * - `small` : éléments d'ambiance scattered dans les marges du sheet
 * - `big` : characters showcase utilisés en side-illu (mode rich) ou banner
 * - `vertical` : illustration tall et étroite réservée au side-illu des exos étroits (decompose, etc.)
 */
export type DecorationSize = 'small' | 'big' | 'vertical';

export interface Decoration {
  theme: FunTheme;
  /** Nom de fichier sans extension ni préfixe thème. Le path est `/assets/sheet/decorations/{theme}-{name}.png`. */
  name: string;
  size: DecorationSize;
}

/**
 * Manifest central des décorations. Pour ajouter une nouvelle illustration :
 * 1. Drop le PNG dans `public/assets/sheet/decorations/{theme}-{name}.png`
 * 2. Ajouter une entrée ici avec sa size category
 * 3. Optionnellement documenter le prompt MJ dans `PROMPTS.md`
 */
export const DECORATIONS: readonly Decoration[] = [
  // ─── Dinosaures ──────────────────────────────────────────────
  { theme: 'dinosaurs', name: 'ammonite', size: 'small' },
  { theme: 'dinosaurs', name: 'dragonfly', size: 'small' },
  { theme: 'dinosaurs', name: 'footprint', size: 'small' },
  { theme: 'dinosaurs', name: 'plant', size: 'small' },
  { theme: 'dinosaurs', name: 'bone', size: 'small' },
  // Ordre important : utilisé tel quel par bannerScene (pos-0..3) et le cycle rich.
  // pos-3 doit idéalement être un sujet "volant/flottant" (le ptérodactyle ici).
  { theme: 'dinosaurs', name: 'trex', size: 'big' },
  { theme: 'dinosaurs', name: 'volcano', size: 'big' },
  { theme: 'dinosaurs', name: 'hatchling', size: 'big' },
  { theme: 'dinosaurs', name: 'pterodactyl', size: 'big' },
  { theme: 'dinosaurs', name: 'frond', size: 'vertical' },
  // ─── Pirates / Space / Animals : à venir ─────────────────────
];
