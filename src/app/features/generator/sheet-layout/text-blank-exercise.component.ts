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
          <span class="q-text">
            @for (seg of exampleSegments(exercise.example); track $index) {
              @if (seg.kind === 'answer') {
                <span class="example-answer">{{ seg.value }}</span>
              } @else {
                <span>{{ seg.value }}</span>
              }
            }
          </span>
        </li>
      }
      @for (q of exercise.questions; track $index) {
        <li>
          @if (exercise.variant === 'word-problem') {
            @let parts = wordProblemParts(q.text);
            @if (parts.narrative) {
              <span class="wp-narrative">{{ parts.narrative }}</span>
            }
            <span class="q-text wp-question" [innerHTML]="renderText(parts.question, $index)"></span>
          } @else {
            <span class="q-text" [innerHTML]="renderText(q.text, $index)"></span>
          }
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

  /** Découpe le texte de l'exemple en segments alternés texte / réponse,
   *  pour permettre au template Angular de styler chaque réponse via un span
   *  natif (vs innerHTML qui pose des soucis d'encapsulation des styles). */
  exampleSegments(example: { text: string; answers: string[] }): Array<{ kind: 'text' | 'answer'; value: string }> {
    const segments: Array<{ kind: 'text' | 'answer'; value: string }> = [];
    const parts = example.text.split('___');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) segments.push({ kind: 'text', value: parts[i] });
      if (i < parts.length - 1) {
        segments.push({ kind: 'answer', value: example.answers[i] ?? '' });
      }
    }
    return segments;
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

  /** Pour un word-problem, sépare la narration (les phrases déclaratives
   *  d'introduction) de la phrase interrogative finale + son blank.
   *  Heuristique : on prend la dernière phrase se terminant par "?" comme
   *  question, tout ce qui précède devient la narration. */
  wordProblemParts(text: string): { narrative: string; question: string } {
    const lastQ = text.lastIndexOf('?');
    if (lastQ === -1) return { narrative: '', question: text };
    // remonte jusqu'à la fin de la phrase précédente (., !, ?)
    let cut = -1;
    for (let i = lastQ - 1; i >= 0; i--) {
      if (text[i] === '.' || text[i] === '!') {
        cut = i + 1;
        break;
      }
    }
    if (cut === -1) return { narrative: '', question: text };
    return {
      narrative: text.slice(0, cut).trim(),
      question: text.slice(cut).trim(),
    };
  }

  /** Compute et reverse ont des questions courtes → 2 colonnes pour densifier.
   *  Les autres variants (decompose, sequence, compare, word-problem) restent
   *  en 1 colonne pour la lisibilité. */
  useTwoCol(): boolean {
    return this.exercise.variant === 'compute' || this.exercise.variant === 'reverse';
  }
}
