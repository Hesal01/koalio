import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Sheet, DrawingZone } from '../../../core/models/sheet.model';

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

            <!-- Drawing zone -->
            @if (exercise.drawingZone) {
              <div class="drawing-zone" [class]="'dz-' + exercise.drawingZone.funTheme">
                <div class="dz-theme-label">
                  {{ getThemeEmoji(exercise.drawingZone.funTheme) }}
                  {{ getThemeTitle(exercise.drawingZone.funTheme) }}
                </div>

                @if (exercise.drawingZone.type === 'division') {
                  <!-- Items to distribute -->
                  <div class="dz-items">
                    @for (item of getItems(exercise.drawingZone.params.total || 0); track $index) {
                      <span class="dz-item">{{ getItemEmoji(exercise.drawingZone.funTheme) }}</span>
                    }
                  </div>
                  <!-- Containers -->
                  <div class="dz-containers">
                    @for (container of getItems(exercise.drawingZone.params.groups || 0); track $index) {
                      <div class="dz-container">
                        <div class="dz-container-label">{{ getContainerName(exercise.drawingZone.funTheme) }} {{ $index + 1 }}</div>
                        <div class="dz-container-space"></div>
                      </div>
                    }
                  </div>
                }

                @if (exercise.drawingZone.type === 'addition') {
                  <div class="dz-addition">
                    <div class="dz-add-group">
                      <div class="dz-add-label">Déjà trouvées :</div>
                      <div class="dz-items">
                        @for (item of getItems(exercise.drawingZone.params.existing || 0); track $index) {
                          <span class="dz-item">{{ getItemEmoji(exercise.drawingZone.funTheme) }}</span>
                        }
                      </div>
                    </div>
                    <div class="dz-add-group">
                      <div class="dz-add-label">Dessine les {{ exercise.drawingZone.params.target }} nouvelles :</div>
                      <div class="dz-draw-area">
                        @for (item of getItems(exercise.drawingZone.params.target || 0); track $index) {
                          <span class="dz-item-ghost">{{ getItemEmoji(exercise.drawingZone.funTheme) }}</span>
                        }
                      </div>
                    </div>
                  </div>
                }

                @if (exercise.drawingZone.type === 'fraction') {
                  <div class="dz-fraction">
                    <div class="dz-fraction-grid" [style.grid-template-columns]="getFractionCols(exercise.drawingZone)">
                      @for (part of getItems(exercise.drawingZone.params.denominator || 4); track $index) {
                        <div class="dz-fraction-part" [class.dz-fraction-fill]="$index < (exercise.drawingZone.params.numerator || 0)">
                          {{ $index < (exercise.drawingZone.params.numerator || 0) ? '?' : '' }}
                        </div>
                      }
                    </div>
                  </div>
                }

                @if (exercise.drawingZone.type === 'counting') {
                  <div class="dz-counting">
                    <div class="dz-items">
                      @for (item of getItems(exercise.drawingZone.params.existing || 0); track $index) {
                        <span class="dz-item">{{ getItemEmoji(exercise.drawingZone.funTheme) }}</span>
                      }
                    </div>
                  </div>
                }

                @if (exercise.drawingZone.type === 'open') {
                  <div class="dz-open">
                    <div class="dz-open-label">Dessine la situation :</div>
                    <div class="dz-open-space"></div>
                  </div>
                }
              </div>
            }

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

  getItems(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  getThemeEmoji(theme: string): string {
    const map: Record<string, string> = {
      dinosaurs: '🦕', pirates: '🏴‍☠️', space: '🚀', animals: '🐨',
    };
    return map[theme] || '✏️';
  }

  getThemeTitle(theme: string): string {
    const map: Record<string, string> = {
      dinosaurs: 'Monde des dinosaures', pirates: 'Aventure pirate',
      space: 'Mission spatiale', animals: 'Royaume des animaux',
    };
    return map[theme] || '';
  }

  getItemEmoji(theme: string): string {
    const map: Record<string, string> = {
      dinosaurs: '🥚', pirates: '💰', space: '⭐', animals: '🌿',
    };
    return map[theme] || '●';
  }

  getContainerName(theme: string): string {
    const map: Record<string, string> = {
      dinosaurs: 'Nid', pirates: 'Coffre', space: 'Cratère', animals: 'Terrier',
    };
    return map[theme] || 'Groupe';
  }

  getFractionCols(dz: DrawingZone): string {
    const cols = dz.params.denominator || 4;
    return `repeat(${cols > 4 ? Math.ceil(cols / 2) : cols}, 1fr)`;
  }
}
