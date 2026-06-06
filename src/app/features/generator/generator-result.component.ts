import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SheetLayoutComponent } from './sheet-layout/sheet-layout.component';
import { CatalogService } from '../../core/services/catalog.service';

type DecoMode = 'stamps' | 'banner' | 'margins' | 'split' | 'footer' | 'rich' | 'custom';
const DECO_MODES: DecoMode[] = ['stamps', 'banner', 'margins', 'split', 'footer', 'rich', 'custom'];
const DECO_LABELS: Record<DecoMode, string> = {
  stamps: 'Stamps',
  banner: 'Banner',
  margins: 'Margins',
  split: 'Split',
  footer: 'Footer',
  rich: 'Rich (margins + big chars side)',
  custom: 'Custom (mascotte + petites marges seulement)',
};

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

          <aside class="deco-mode-switcher">
            <span class="label">Habillage :</span>
            @for (mode of modes; track mode) {
              <button
                type="button"
                class="mode-btn"
                [class.active]="currentMode() === mode"
                (click)="setMode(mode)"
              >{{ labels[mode] }}</button>
            }
          </aside>

          <div class="sheet-wrapper">
            <app-sheet-layout [sheet]="s" [showAnswers]="showAnswers" [decoMode]="currentMode()" />
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly sheet = computed(() => this.catalog.currentSheet());
  readonly modes = DECO_MODES;
  readonly labels = DECO_LABELS;
  readonly currentMode = signal<DecoMode>('stamps');

  showAnswers = false;

  constructor() {
    const param = this.route.snapshot.queryParamMap.get('deco') as DecoMode | null;
    if (param && DECO_MODES.includes(param)) {
      this.currentMode.set(param);
    }
  }

  setMode(mode: DecoMode) {
    this.currentMode.set(mode);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { deco: mode },
      queryParamsHandling: 'merge',
    });
  }

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
