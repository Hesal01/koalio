import { Component, Input } from '@angular/core';
import { DrawItemsExercise } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-draw-items-exercise',
  standalone: true,
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>
    <div class="draw-zone" [attr.data-size]="exercise.zoneSize">
      <span class="hint">✏️ dessine ici</span>
    </div>
  `,
  styleUrl: './draw-items-exercise.component.scss',
})
export class DrawItemsExerciseComponent {
  @Input({ required: true }) exercise!: DrawItemsExercise;
}
