import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Sheet } from '../../../core/models/sheet.model';

@Component({
  selector: 'app-sheet-layout',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="sheet" id="sheet-pdf">
      <div class="sheet-header">
        <div class="sheet-header-left">
          <span class="sheet-logo">🐨 Koalio</span>
        </div>
        <div class="sheet-header-right">
          <h2 class="sheet-title">Fiche de {{ sheet.childName }}</h2>
          <div class="sheet-meta">
            <span class="meta-badge level">{{ sheet.level }}</span>
            <span class="meta-badge subject">{{ sheet.subject === 'math' ? 'Mathématiques' : 'Français' }}</span>
            <span class="meta-badge theme">{{ themeLabel }}</span>
          </div>
        </div>
      </div>

      <div class="sheet-body">
        @for (exercise of sheet.exercises; track $index) {
          <div class="exercise-block">
            <div class="exercise-header">
              <span class="exercise-number">Exercice {{ $index + 1 }}</span>
              <span class="exercise-instruction">{{ exercise.instruction }}</span>
            </div>
            <div class="questions">
              @for (question of exercise.questions; track $index) {
                <div class="question">
                  <span class="question-number">{{ $index + 1 }}.</span>
                  <span class="question-text">{{ question.text }}</span>
                  @if (showAnswers) {
                    <span class="question-answer">{{ question.answer }}</span>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>

      <div class="sheet-footer">
        <span class="footer-brand">koalio.be</span>
        <span class="footer-date">{{ sheet.createdAt | date:'dd/MM/yyyy' }}</span>
      </div>
    </div>
  `,
  styleUrl: './sheet-layout.component.scss',
})
export class SheetLayoutComponent {
  @Input({ required: true }) sheet!: Sheet;
  @Input() showAnswers = false;

  get themeLabel(): string {
    const labels: Record<string, string> = {
      additions: 'Additions',
      soustractions: 'Soustractions',
      multiplications: 'Multiplications',
      problemes: 'Problèmes',
      conjugaison: 'Conjugaison',
      orthographe: 'Orthographe',
      grammaire: 'Grammaire',
    };
    return labels[this.sheet.theme] || this.sheet.theme;
  }
}
