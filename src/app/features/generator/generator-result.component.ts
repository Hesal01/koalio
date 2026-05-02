import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SheetLayoutComponent } from './sheet-layout/sheet-layout.component';
import { MOCK_SHEET_DINO_P1 } from '../../core/services/mock-data';

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
  sheet = MOCK_SHEET_DINO_P1;
  showAnswers = false;

  toggleAnswers() {
    this.showAnswers = !this.showAnswers;
  }

  downloadPdf() {
    // Set the document title so browsers use it as the default PDF filename
    // when the user picks "Save as PDF" in the print dialog.
    const previousTitle = document.title;
    document.title = this.buildFilename().replace(/\.pdf$/, '');
    window.print();
    // Restore after the dialog closes (Safari is lazy — give it some breathing room).
    setTimeout(() => { document.title = previousTitle; }, 500);
  }

  private buildFilename(): string {
    const subject = this.sheet.subject === 'math' ? 'Maths' : 'Francais';
    const date = new Date().toISOString().slice(0, 10);
    const safeName = this.sheet.childName.replace(/[^\p{L}\p{N}-]+/gu, '-');
    return `Koalio_${safeName}_${this.sheet.level}_${subject}_${date}.pdf`;
  }
}
