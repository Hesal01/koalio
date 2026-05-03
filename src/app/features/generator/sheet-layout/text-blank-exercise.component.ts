import { Component, Input } from '@angular/core';
import { TextBlankExercise } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-text-blank-exercise',
  standalone: true,
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>
    <ol class="questions">
      @if (exercise.example) {
        <li class="example-item">
          <span class="q-text">{{ exercise.example }}</span>
        </li>
      }
      @for (q of exercise.questions; track $index) {
        <li>
          <span class="q-text" [innerHTML]="renderText(q.text, $index)"></span>
          @if (showAnswers) {
            <span class="answer">→ {{ formatAnswer(q.answers) }}</span>
          }
        </li>
      }
    </ol>
  `,
  styleUrl: './text-blank-exercise.component.scss',
})
export class TextBlankExerciseComponent {
  @Input({ required: true }) exercise!: TextBlankExercise;
  @Input() showAnswers = false;

  /** Rend le texte de la question avec les ___ visibles. Pas de transformation
   *  pour l'instant : les underscores sont déjà dans le `text` source. */
  renderText(text: string, _index: number): string {
    // Échappe le HTML basique (pas de balises attendues côté contenu).
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  formatAnswer(answers: string[]): string {
    return answers.join(' / ');
  }
}
