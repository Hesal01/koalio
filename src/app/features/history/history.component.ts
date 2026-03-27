import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MOCK_SHEETS } from '../../core/services/mock-data';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="page">
      <div class="container">
        <div class="history-header">
          <h1>Mes fiches</h1>
          <div class="usage-badge">
            <span class="usage-dot"></span>
            2/3 fiches ce mois-ci
          </div>
        </div>

        <div class="sheets-grid">
          @for (sheet of sheets; track sheet.id) {
            <a [routerLink]="['/result', sheet.id]" class="sheet-card">
              <div class="card-icon">
                {{ sheet.subject === 'math' ? '🔢' : '📖' }}
              </div>
              <div class="card-content">
                <h3 class="card-name">{{ sheet.childName }}</h3>
                <div class="card-meta">
                  <span class="badge level">{{ sheet.level }}</span>
                  <span class="badge theme">{{ getThemeLabel(sheet.theme) }}</span>
                </div>
                <p class="card-date">{{ sheet.createdAt | date:'dd MMMM yyyy' }}</p>
              </div>
              <div class="card-arrow">→</div>
            </a>
          }
        </div>

        @if (sheets.length === 0) {
          <div class="empty-state">
            <span class="empty-icon">🐨</span>
            <h2>Aucune fiche générée</h2>
            <p>Créez votre première fiche d'exercices !</p>
            <a routerLink="/generate" class="btn btn-primary btn-lg">
              ✨ Créer une fiche
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  sheets = MOCK_SHEETS;

  getThemeLabel(theme: string): string {
    const labels: Record<string, string> = {
      additions: 'Additions',
      soustractions: 'Soustractions',
      multiplications: 'Multiplications',
      problemes: 'Problèmes',
      conjugaison: 'Conjugaison',
      orthographe: 'Orthographe',
      grammaire: 'Grammaire',
    };
    return labels[theme] || theme;
  }
}
