import { Component, Input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  CountItemsExercise,
  CountQuestion,
  CountSet,
  FunTheme,
} from '../../../core/models/exercise.model';

/**
 * Renderer du format `count-items` (compter une collection et écrire le nombre).
 * 3 variants :
 *  - `simple`       : une rangée d'items → un blanc.
 *  - `pre-grouped`  : items en paquets de 5 (pédagogie base-10) → total.
 *  - `compare`      : 2 sets, écrire chaque nombre + entourer le plus grand.
 * La quantité affichée EST la réponse (pas de flags séparés).
 */
@Component({
  selector: 'app-count-items-exercise',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>

    @switch (exercise.variant) {
      @case ('compare') {
        <div class="ci-list">
          @for (q of allQuestions; track $index; let i = $index; let isFirst = $first) {
            <div class="ci-row ci-compare" [class.example]="isFirst && hasExample">
              <span class="ci-letter">{{ letter(i) }})</span>
              <div class="ci-pair">
                @for (set of q.sets; track $index; let si = $index) {
                  @if (si > 0) { <span class="ci-vs">vs</span> }
                  <div class="ci-set" [class.bigger]="solved(isFirst) && biggerIndex(q) === si">
                    <div class="ci-items">
                      @for (_ of array(set.count); track $index) {
                        <ng-container [ngTemplateOutlet]="item" />
                      }
                    </div>
                    @if (solved(isFirst)) {
                      <span class="ci-answer">{{ set.count }}</span>
                    } @else {
                      <span class="ci-blank"></span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
      @default {
        <div class="ci-list">
          @for (q of allQuestions; track $index; let i = $index; let isFirst = $first) {
            <div class="ci-row" [class.example]="isFirst && hasExample">
              <span class="ci-letter">{{ letter(i) }})</span>
              @if (exercise.variant === 'pre-grouped') {
                <div class="ci-items grouped">
                  @for (g of groups(q.sets[0]); track $index) {
                    <div class="ci-group">
                      @for (_ of array(g); track $index) {
                        <ng-container [ngTemplateOutlet]="item" />
                      }
                    </div>
                  }
                </div>
              } @else {
                <div class="ci-items">
                  @for (_ of array(q.sets[0].count); track $index) {
                    <ng-container [ngTemplateOutlet]="item" />
                  }
                </div>
              }
              <span class="ci-arrow">→</span>
              @if (solved(isFirst)) {
                <span class="ci-answer">{{ q.sets[0].count }}</span>
              } @else {
                <span class="ci-blank"></span>
              }
            </div>
          }
        </div>
      }
    }

    <ng-template #item>
      <span class="ci-item-wrap">
        @if (imageFailed()) {
          <span class="ci-emoji">{{ itemEmoji }}</span>
        } @else {
          <img [src]="itemAsset" [alt]="funTheme" (error)="imageFailed.set(true)" />
        }
      </span>
    </ng-template>
  `,
  styleUrl: './count-items-exercise.component.scss',
})
export class CountItemsExerciseComponent {
  @Input({ required: true }) exercise!: CountItemsExercise;
  @Input() funTheme: FunTheme = 'dinosaurs';
  @Input() showAnswers = false;

  readonly imageFailed = signal(false);

  get hasExample(): boolean {
    return !!this.exercise.example;
  }

  get allQuestions(): CountQuestion[] {
    return this.exercise.example
      ? [this.exercise.example, ...this.exercise.questions]
      : this.exercise.questions;
  }

  /** Réponse visible ? (mode correction, ou l'exemple en 1re position). */
  solved(isFirst: boolean): boolean {
    return this.showAnswers || (isFirst && this.hasExample);
  }

  /** Index du set le plus grand — pour entourer la bonne réponse en `compare`. */
  biggerIndex(q: CountQuestion): number {
    return q.sets[0].count >= q.sets[1].count ? 0 : 1;
  }

  /** Découpe un count en paquets (ex : 7 avec groupBy 5 → [5, 2]). */
  groups(set: CountSet): number[] {
    const g = set.groupBy && set.groupBy > 0 ? set.groupBy : set.count;
    const full = Math.floor(set.count / g);
    const rem = set.count % g;
    const arr: number[] = Array(full).fill(g);
    if (rem) arr.push(rem);
    return arr;
  }

  array(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  letter(i: number): string {
    return String.fromCharCode(97 + i);
  }

  get itemAsset(): string {
    return `/assets/sheet/items/${this.funTheme}.png`;
  }

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
