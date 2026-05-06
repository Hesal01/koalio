import { Injectable } from '@angular/core';
import { FunTheme } from '../models/exercise.model';
import { DECORATIONS, Decoration, DecorationSize } from '../models/decoration.model';

/**
 * Service d'accès au catalogue des décorations thématiques.
 * Le composant `sheet-layout` consomme ce service pour récupérer les décos
 * du thème courant, segmentées par size (small/big/vertical) selon l'usage.
 */
@Injectable({ providedIn: 'root' })
export class DecorationCatalogService {
  /** Toutes les décos d'un thème, dans l'ordre du manifest. */
  byTheme(theme: FunTheme): Decoration[] {
    return DECORATIONS.filter(d => d.theme === theme);
  }

  /** Décos filtrées par size pour un thème donné. */
  bySize(theme: FunTheme, size: DecorationSize): Decoration[] {
    return DECORATIONS.filter(d => d.theme === theme && d.size === size);
  }

  /** Le 1er asset vertical du thème (un seul attendu — la "vedette" pour side-illu narrow). */
  vertical(theme: FunTheme): Decoration | undefined {
    return DECORATIONS.find(d => d.theme === theme && d.size === 'vertical');
  }

  /** Path absolu vers le PNG d'une décoration. */
  path(deco: Decoration): string {
    return `/assets/sheet/decorations/${deco.theme}-${deco.name}.png`;
  }

  /** Forme `url('...')` directement utilisable dans `background-image` ou `--var`. */
  bgUrl(deco: Decoration): string {
    return `url('${this.path(deco)}')`;
  }
}
