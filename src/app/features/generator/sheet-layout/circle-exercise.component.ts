import { Component, Input } from '@angular/core';
import { CircleExercise } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-circle-exercise',
  standalone: true,
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>
    <ol class="items">
      @if (exercise.example) {
        <li class="example-item" [class.is-correct]="exercise.example.correct">
          <span class="item-text">{{ exercise.example.text }}</span>
        </li>
      }
      @for (item of exercise.items; track $index) {
        <li [class.is-correct]="item.correct && showAnswers">
          <span class="item-text">{{ item.text }}</span>
        </li>
      }
    </ol>
  `,
  styleUrl: './circle-exercise.component.scss',
})
export class CircleExerciseComponent {
  @Input({ required: true }) exercise!: CircleExercise;
  /** Si true, affiche les bons items entourés (mode correction).
   *  L'exemple reste toujours entouré (c'est le modèle pédagogique). */
  @Input() showAnswers = false;
}
