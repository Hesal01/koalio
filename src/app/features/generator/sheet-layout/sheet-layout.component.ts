import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Sheet } from '../../../core/models/exercise.model';
import { TextBlankExerciseComponent } from './text-blank-exercise.component';
import { CircleExerciseComponent } from './circle-exercise.component';
import { DrawItemsExerciseComponent } from './draw-items-exercise.component';

@Component({
  selector: 'app-sheet-layout',
  standalone: true,
  imports: [DatePipe, TextBlankExerciseComponent, CircleExerciseComponent, DrawItemsExerciseComponent],
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
            <span class="meta-badge subject">{{ subjectLabel }}</span>
            <span class="meta-badge theme">{{ themeLabel }}</span>
          </div>
        </div>
      </div>

      <div class="sheet-body">
        @for (exercise of sheet.exercises; track $index) {
          <div class="exercise-block">
            <div class="exercise-header">
              <span class="exercise-number">Exercice {{ $index + 1 }}</span>
            </div>
            @switch (exercise.format) {
              @case ('text-blank') {
                <app-text-blank-exercise
                  [exercise]="exercise"
                  [showAnswers]="showAnswers"
                />
              }
              @case ('circle') {
                <app-circle-exercise [exercise]="exercise" [showAnswers]="showAnswers" />
              }
              @case ('draw-items') {
                <app-draw-items-exercise [exercise]="exercise" />
              }
            }
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

  get subjectLabel(): string {
    return this.sheet.subject === 'math' ? 'Mathématiques' : 'Français';
  }

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
    return labels[this.sheet.theme] ?? this.sheet.theme;
  }
}
