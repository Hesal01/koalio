import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SheetLayoutComponent } from './sheet-layout/sheet-layout.component';
import { CatalogService } from '../../core/services/catalog.service';

@Component({
  selector: 'app-generator-result',
  standalone: true,
  imports: [RouterLink, SheetLayoutComponent],
  template: `
    <div class="page">
      <div class="container">
        @if (sheet(); as s) {
          <div class="result-header">
            <h1>Fiche prête !</h1>
            <p class="subtitle">
              La fiche de {{ s.childName }} est prête à être imprimée
            </p>
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
            <app-sheet-layout [sheet]="s" [showAnswers]="showAnswers" />
          </div>
        } @else {
          <div class="empty">
            <h1>Aucune fiche en cours</h1>
            <p>La fiche a peut-être été perdue lors d'un rechargement. Génère-en une nouvelle.</p>
            <a routerLink="/generate" class="btn btn-primary">Générer une fiche</a>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './generator-result.component.scss',
})
export class GeneratorResultComponent {
  private catalog = inject(CatalogService);
  readonly sheet = computed(() => this.catalog.currentSheet());

  showAnswers = false;

  toggleAnswers() {
    this.showAnswers = !this.showAnswers;
  }

  downloadPdf() {
    const s = this.sheet();
    if (!s) return;

    const previousTitle = document.title;
    document.title = this.buildFilename(s).replace(/\.pdf$/, '');
    window.print();
    setTimeout(() => { document.title = previousTitle; }, 500);
  }

  private buildFilename(s: NonNullable<ReturnType<typeof this.sheet>>): string {
    const subject = s.subject === 'math' ? 'Maths' : 'Francais';
    const date = new Date().toISOString().slice(0, 10);
    const safeName = s.childName.replace(/[^\p{L}\p{N}-]+/gu, '-');
    return `Koalio_${safeName}_${s.level}_${subject}_${date}.pdf`;
  }
}
