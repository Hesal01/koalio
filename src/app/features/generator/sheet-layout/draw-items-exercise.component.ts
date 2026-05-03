import { Component, Input, signal } from '@angular/core';
import { DrawItemsExercise, FunTheme } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-draw-items-exercise',
  standalone: true,
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>
    <div
      class="draw-zone"
      [attr.data-size]="exercise.zoneSize"
      [class.has-prefilled]="prefilledCount > 0"
    >
      @if (prefilledCount > 0) {
        @for (_ of prefilledArray; track $index) {
          <span class="prefilled-item">
            @if (imageFailed()) {
              <span class="emoji-fallback">{{ itemEmoji }}</span>
            } @else {
              <img
                [src]="itemAsset"
                [alt]="funTheme"
                (error)="imageFailed.set(true)"
              />
            }
          </span>
        }
      } @else {
        <span class="hint">✏️ dessine ici</span>
      }
    </div>
  `,
  styleUrl: './draw-items-exercise.component.scss',
})
export class DrawItemsExerciseComponent {
  @Input({ required: true }) exercise!: DrawItemsExercise;
  /** Vient de Sheet.funTheme — détermine l'asset utilisé pour les items. */
  @Input() funTheme: FunTheme = 'dinosaurs';

  /** Bascule vers l'emoji si l'image ne charge pas (404, etc.). */
  readonly imageFailed = signal(false);

  get prefilledCount(): number {
    return this.exercise.prefilled ?? 0;
  }

  get prefilledArray(): number[] {
    return Array.from({ length: this.prefilledCount }, (_, i) => i);
  }

  /** Path vers le PNG Midjourney à déposer dans `public/assets/sheet/items/`. */
  get itemAsset(): string {
    return `/assets/sheet/items/${this.funTheme}.png`;
  }

  /** Fallback emoji si le PNG n'est pas dispo. */
  get itemEmoji(): string {
    const map: Record<FunTheme, string> = {
      dinosaurs: '🥚',
      pirates: '💰',
      space: '⭐',
      animals: '🌿',
    };
    return map[this.funTheme];
  }
}
