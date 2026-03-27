import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SheetLayoutComponent } from './sheet-layout/sheet-layout.component';
import { MOCK_SHEET_MATH } from '../../core/services/mock-data';

@Component({
  selector: 'app-generator-result',
  standalone: true,
  imports: [RouterLink, SheetLayoutComponent],
  template: `
    <div class="page">
      <div class="container">
        <div class="result-header">
          <h1>Fiche prête !</h1>
          <p class="subtitle">La fiche de {{ sheet.childName }} est prête à être imprimée</p>
        </div>

        <div class="actions-top">
          <button class="btn btn-primary btn-lg" (click)="downloadPdf()">
            📥 Télécharger le PDF
          </button>
          <button class="btn btn-secondary" (click)="toggleAnswers()">
            {{ showAnswers ? '🙈 Cacher les réponses' : '👀 Voir les réponses' }}
          </button>
          <a routerLink="/generate" class="btn btn-accent">
            ✨ Nouvelle fiche
          </a>
        </div>

        <div class="sheet-wrapper">
          <app-sheet-layout [sheet]="sheet" [showAnswers]="showAnswers" />
        </div>
      </div>
    </div>
  `,
  styleUrl: './generator-result.component.scss',
})
export class GeneratorResultComponent {
  sheet = MOCK_SHEET_MATH;
  showAnswers = false;

  toggleAnswers() {
    this.showAnswers = !this.showAnswers;
  }

  downloadPdf() {
    // Placeholder for PDF generation
    alert('PDF download — sera connecté avec jsPDF + html2canvas');
  }
}
