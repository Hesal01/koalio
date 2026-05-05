import { Component, Input, signal } from '@angular/core';
import {
  FunTheme,
  ImageAdditionExercise,
  ImageAdditionQuestion,
} from '../../../core/models/exercise.model';

@Component({
  selector: 'app-image-addition-exercise',
  standalone: true,
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>
    <div class="grid">
      @for (q of allQuestions; track $index; let i = $index; let isFirst = $first) {
        <div class="card" [class.example]="isFirst && hasExample">
          <span class="letter">{{ letter(i) }})</span>
          <div class="zones">
            <div class="zone left">
              @for (_ of array(q.left); track $index) {
                <span class="item-wrap">
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
            </div>
            <div class="zone right">
              @for (_ of array(q.right); track $index) {
                <span class="item-wrap">
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
            </div>
          </div>
          <div class="equation">
            <span class="op">{{ q.left }} + {{ q.right }} =</span>
            @if ((isFirst && hasExample) || showAnswers) {
              <span class="answer">{{ q.left + q.right }}</span>
            } @else {
              <span class="blank"></span>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './image-addition-exercise.component.scss',
})
export class ImageAdditionExerciseComponent {
  @Input({ required: true }) exercise!: ImageAdditionExercise;
  @Input() funTheme: FunTheme = 'dinosaurs';
  @Input() showAnswers = false;

  readonly imageFailed = signal(false);

  get hasExample(): boolean {
    return !!this.exercise.example;
  }

  get allQuestions(): ImageAdditionQuestion[] {
    return this.exercise.example
      ? [this.exercise.example, ...this.exercise.questions]
      : this.exercise.questions;
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
