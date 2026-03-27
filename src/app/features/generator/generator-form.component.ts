import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Theme } from '../../core/models/sheet.model';
import { THEMES_BY_SUBJECT, LEVELS } from '../../core/models/theme-config';

@Component({
  selector: 'app-generator-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="page">
      <div class="container">
        <div class="form-header">
          <h1>Créer une fiche d'exercices</h1>
          <p class="subtitle">Koalio génère des exercices personnalisés pour ton enfant</p>
          <div class="usage-badge">
            <span class="usage-dot"></span>
            2/3 fiches utilisées ce mois-ci
          </div>
        </div>

        <div class="form-layout">
          <div class="form-card">
            <div class="form-group">
              <label for="childName">Prénom de l'enfant</label>
              <input
                id="childName"
                type="text"
                [(ngModel)]="childName"
                placeholder="Ex : Emma, Lucas..."
                maxlength="30"
                class="input"
              />
            </div>

            <div class="form-group">
              <label>Niveau</label>
              <div class="level-grid">
                @for (level of levels; track level.value) {
                  <button
                    class="level-btn"
                    [class.active]="selectedLevel === level.value"
                    (click)="selectedLevel = level.value"
                  >
                    <span class="level-value">{{ level.value }}</span>
                    <span class="level-label">{{ level.label.split('—')[1] }}</span>
                  </button>
                }
              </div>
            </div>

            <div class="form-group">
              <label>Matière</label>
              <div class="subject-toggle">
                <button
                  class="subject-btn"
                  [class.active]="selectedSubject === 'math'"
                  (click)="selectSubject('math')"
                >
                  <span class="subject-icon">🔢</span>
                  Mathématiques
                </button>
                <button
                  class="subject-btn"
                  [class.active]="selectedSubject === 'french'"
                  (click)="selectSubject('french')"
                >
                  <span class="subject-icon">📖</span>
                  Français
                </button>
              </div>
            </div>

            @if (selectedSubject) {
              <div class="form-group">
                <label>Thème</label>
                <div class="theme-grid">
                  @for (theme of availableThemes; track theme.value) {
                    <button
                      class="theme-btn"
                      [class.active]="selectedTheme === theme.value"
                      (click)="selectedTheme = theme.value"
                    >
                      {{ theme.label }}
                    </button>
                  }
                </div>
              </div>
            }

            <button
              class="btn btn-primary btn-lg generate-btn"
              [disabled]="!isFormValid()"
              (click)="generate()"
            >
              @if (loading) {
                <span class="spinner"></span>
                Koalio prépare les exercices de {{ childName }}...
              } @else {
                ✨ Générer la fiche
              }
            </button>
          </div>

          <!-- Live preview -->
          <div class="preview-panel">
            <div class="preview-label">Aperçu</div>
            <div class="preview-sheet">
              <div class="preview-header">
                <span class="preview-logo">🐨 Koalio</span>
                <div class="preview-title">Fiche de {{ childName || '...' }}</div>
                <div class="preview-badges">
                  <span class="preview-badge level" [class.filled]="selectedLevel">{{ selectedLevel || '?' }}</span>
                  <span class="preview-badge subject" [class.filled]="selectedSubject">{{ selectedSubject === 'math' ? 'Maths' : selectedSubject === 'french' ? 'Français' : '?' }}</span>
                  @if (selectedTheme) {
                    <span class="preview-badge theme filled">{{ getThemeLabel(selectedTheme) }}</span>
                  }
                </div>
              </div>
              <div class="preview-divider"></div>
              <div class="preview-body">
                @for (ex of previewExercises; track $index) {
                  <div class="preview-exercise">
                    <div class="preview-ex-header">
                      <span class="preview-ex-num">Exercice {{ $index + 1 }}</span>
                      <span class="preview-ex-instr">{{ ex.instruction }}</span>
                    </div>
                    @for (q of ex.questions; track $index) {
                      <div class="preview-question">
                        <span class="preview-q-num">{{ $index + 1 }}.</span>
                        <span class="preview-q-text">{{ q }}</span>
                        <span class="preview-q-blank">______</span>
                      </div>
                    }
                  </div>
                }
                @if (!selectedSubject || !selectedTheme) {
                  <div class="preview-placeholder">
                    <span class="preview-placeholder-icon">🐨</span>
                    <p>Choisis une matière et un thème pour voir l'aperçu</p>
                  </div>
                }
              </div>
              <div class="preview-footer">
                <span>koalio.be</span>
                <span>{{ today }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './generator-form.component.scss',
})
export class GeneratorFormComponent {
  levels = LEVELS;
  childName = '';
  selectedLevel = '';
  selectedSubject: Subject | null = null;
  selectedTheme: Theme | null = null;
  loading = false;
  today = new Date().toLocaleDateString('fr-BE');

  private previewData: Record<string, { instruction: string; questions: string[] }[]> = {
    additions: [
      { instruction: 'Calcule.', questions: ['24 + 13 =', '56 + 32 =', '145 + 230 ='] },
      { instruction: 'Complète.', questions: [`${this.nameOr('...')} a 12 billes, on lui en donne 8.`] },
    ],
    soustractions: [
      { instruction: 'Calcule.', questions: ['48 - 15 =', '93 - 27 =', '500 - 184 ='] },
      { instruction: 'Problème.', questions: [`${this.nameOr('...')} avait 50 bonbons, il en mange 13.`] },
    ],
    multiplications: [
      { instruction: 'Calcule.', questions: ['6 × 4 =', '8 × 7 =', '12 × 5 ='] },
      { instruction: 'Complète.', questions: [`${this.nameOr('...')} achète 3 paquets de 8 gâteaux.`] },
    ],
    problemes: [
      { instruction: 'Résous.', questions: [`${this.nameOr('...')} a 3 sacs de 12 billes.`, 'Un train roule 45 km puis 38 km.'] },
    ],
    conjugaison: [
      { instruction: 'Conjugue au présent.', questions: [`${this.nameOr('...')} (manger) une pomme.`, 'Nous (finir) nos devoirs.', 'Tu (être) courageux.'] },
    ],
    orthographe: [
      { instruction: 'Complète avec le bon mot.', questions: ['Le chat dort (sur/sous) le canapé.', `${this.nameOr('...')} (a/à) un chien.`, 'Ils (son/sont) partis.'] },
    ],
    grammaire: [
      { instruction: 'Souligne le sujet.', questions: ['Le petit chat dort.', `${this.nameOr('...')} joue dans le jardin.`, 'Les oiseaux chantent.'] },
    ],
  };

  get availableThemes() {
    return this.selectedSubject ? THEMES_BY_SUBJECT[this.selectedSubject] : [];
  }

  get previewExercises(): { instruction: string; questions: string[] }[] {
    if (!this.selectedTheme) return [];
    const base = this.previewData[this.selectedTheme] || [];
    // Inject the child's name dynamically
    const name = this.childName.trim() || '...';
    return base.map(ex => ({
      instruction: ex.instruction,
      questions: ex.questions.map(q => q.replace('...', name)),
    }));
  }

  constructor(private router: Router) {}

  private nameOr(fallback: string): string {
    return fallback;
  }

  getThemeLabel(theme: Theme): string {
    const labels: Record<string, string> = {
      additions: 'Additions', soustractions: 'Soustractions',
      multiplications: 'Multiplications', problemes: 'Problèmes',
      conjugaison: 'Conjugaison', orthographe: 'Orthographe', grammaire: 'Grammaire',
    };
    return labels[theme] || theme;
  }

  selectSubject(subject: Subject) {
    this.selectedSubject = subject;
    this.selectedTheme = null;
  }

  isFormValid(): boolean {
    return !!(this.childName.trim() && this.selectedLevel && this.selectedSubject && this.selectedTheme && !this.loading);
  }

  generate() {
    if (!this.isFormValid()) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/result', '1']);
    }, 2500);
  }
}
