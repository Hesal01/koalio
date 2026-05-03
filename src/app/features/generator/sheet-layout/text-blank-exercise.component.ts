import { Component, Input } from '@angular/core';
import { TextBlankExercise } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-text-blank-exercise',
  standalone: true,
  template: `
    <p class="instruction">{{ exercise.instruction }}</p>
    <ol class="questions" [class.two-col]="useTwoCol()">
      @if (exercise.example) {
        <li class="example-item">
          <span class="q-text" [innerHTML]="renderExample(exercise.example)"></span>
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
    return this.escapeHtml(text);
  }

  /** Rend l'exemple en remplaçant chaque `___` par la réponse correspondante,
   *  enveloppée dans un span coloré pour visualiser la partie "déjà remplie". */
  renderExample(example: { text: string; answers: string[] }): string {
    let answerIdx = 0;
    return this.escapeHtml(example.text).replace(/___/g, () => {
      const value = this.escapeHtml(example.answers[answerIdx++] ?? '');
      return `<span class="example-answer">${value}</span>`;
    });
  }

  private escapeHtml(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  formatAnswer(answers: string[]): string {
    return answers.join(' / ');
  }

  /** Compute et reverse ont des questions courtes → 2 colonnes pour densifier.
   *  Les autres variants (decompose, sequence, compare, word-problem) restent
   *  en 1 colonne pour la lisibilité. */
  useTwoCol(): boolean {
    return this.exercise.variant === 'compute' || this.exercise.variant === 'reverse';
  }
}
