import { FunTheme } from './exercise.model';

/**
 * Catégorie de format d'une décoration, basée sur son aspect ratio cible.
 * Chaque catégorie correspond à un ratio Midjourney `--ar` et à un type de
 * zone précis sur la fiche (cf. `docs/midjourney-assets.md`).
 *
 * - `square`     : 1:1 — margin scatter centré, banner air (flying), stamp coin "neutre", prefilled, items
 * - `portrait`   : 2:3 — banner ground (chars debout), stamps "perso"
 * - `tall`       : 1:2 — side illustration des exos étroits (decompose), végétal/totem élancé
 * - `landscape`  : 3:2 — margin scatter horizontal, split right col, rich big, scènes larges
 * - `banner`     : 3:1 — panorama unique pour mode banner (réservé, non utilisé encore)
 * - `silhouette` : 1:1 mono noir — couche ambient (always-on, opacité ~12%)
 */
export type DecorationSize =
  | 'square'
  | 'portrait'
  | 'tall'
  | 'landscape'
  | 'banner'
  | 'silhouette';

export interface Decoration {
  theme: FunTheme;
  /** Nom de fichier sans extension ni préfixe thème. Le path est `/assets/sheet/decorations/{theme}-{name}.png`. */
  name: string;
  size: DecorationSize;
}

/**
 * Manifest central des décorations. Pour ajouter une nouvelle illustration :
 * 1. Drop le PNG dans `public/assets/sheet/decorations/{theme}-{name}.png`
 * 2. Ajouter une entrée ici avec sa catégorie de format
 * 3. Le prompt Midjourney associé (avec le bon `--ar`) est documenté dans
 *    `docs/midjourney-assets.md`.
 */
export const DECORATIONS: readonly Decoration[] = [
  // ─── Dinosaures ──────────────────────────────────────────────
  // Carrés 1:1 — margin scatter centrés (mr-pos-0/2/3) + flying air banner pos-3.
  // ⚠️ Le 1er square est consommé par `bannerScene` comme sujet flying → doit
  // impérativement être une créature en vol (sinon : fossile qui flotte 😬).
  { theme: 'dinosaurs', name: 'pterodactyl', size: 'square' },
  { theme: 'dinosaurs', name: 'ammonite', size: 'square' },
  { theme: 'dinosaurs', name: 'dragonfly', size: 'square' },
  { theme: 'dinosaurs', name: 'footprint', size: 'square' },
  { theme: 'dinosaurs', name: 'plant', size: 'square' },

  // Portraits 2:3 — banner ground chars (debout, vue de pied)
  { theme: 'dinosaurs', name: 'trex', size: 'portrait' },
  { theme: 'dinosaurs', name: 'stegosaurus', size: 'portrait' },
  { theme: 'dinosaurs', name: 'hatchling', size: 'portrait' },

  // Landscapes 3:2 — margin scatter horizontal (mr-pos-1/4) + split/rich right col
  { theme: 'dinosaurs', name: 'volcano', size: 'landscape' },
  { theme: 'dinosaurs', name: 'bone', size: 'landscape' },

  // Tall 1:2 — side illu des exos étroits (decompose)
  { theme: 'dinosaurs', name: 'frond', size: 'tall' },

  // Banner 3:1 — backdrop panorama pour le mode banner (posé en
  // background-image de `.sheet-banner`, les 4 chars se posent par-dessus)
  { theme: 'dinosaurs', name: 'banner-backdrop', size: 'banner' },

  // ─── Silhouettes (couche ambient noire en fond, opacité ~12%) ─
  { theme: 'dinosaurs', name: 'silh-footprint', size: 'silhouette' },

  // ─── Pirates / Space / Animals : à venir ─────────────────────
];
