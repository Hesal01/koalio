import { Component, Input, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FunTheme, Sheet } from '../../../core/models/exercise.model';
import { Decoration } from '../../../core/models/decoration.model';
import { DecorationCatalogService } from '../../../core/services/decoration-catalog.service';
import { TextBlankExerciseComponent } from './text-blank-exercise.component';
import { CircleExerciseComponent } from './circle-exercise.component';
import { DrawItemsExerciseComponent } from './draw-items-exercise.component';
import { ImageAdditionExerciseComponent } from './image-addition-exercise.component';

@Component({
  selector: 'app-sheet-layout',
  standalone: true,
  imports: [
    DatePipe,
    TextBlankExerciseComponent,
    CircleExerciseComponent,
    DrawItemsExerciseComponent,
    ImageAdditionExerciseComponent,
  ],
  template: `
    <div class="sheet sheet-{{ sheet.funTheme }} deco-{{ decoMode }}" id="sheet-pdf"
         [style.--vertical-bg]="verticalBg">
      <!-- Décorations en marges (visibles en modes 'margins' et 'rich').
           Cycle sur les 'small' du thème courant (manifest data-driven). -->
      <div class="sheet-margins-decos" aria-hidden="true">
        @for (deco of smallDecos; track deco.name; let i = $index) {
          <img [src]="decoSrc(deco)" class="margin-deco mr-pos-{{ i }}" alt="" />
        }
      </div>

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
        <span class="theme-mascot">
          @if (mascotFailed()) {
            <span class="emoji-fallback">{{ mascotEmoji() }}</span>
          } @else {
            <img
              [src]="mascotPath()"
              [alt]="sheet.funTheme"
              (error)="mascotFailed.set(true)"
            />
          }
        </span>
      </div>

      <!-- Bandeau scénique (visible en mode 'banner' uniquement) — cycle sur les 4 premiers big chars. -->
      <div class="sheet-banner" aria-hidden="true">
        @for (deco of bannerScene; track deco.name; let i = $index) {
          <img [src]="decoSrc(deco)" class="banner-figure pos-{{ i }}" alt="" />
        }
      </div>

      <div class="sheet-body">
        @for (exercise of sheet.exercises; track $index) {
          <div class="exercise-block"
               [class.has-illustration]="exerciseHasIllustration(exercise)"
               [class.has-side-illustration]="isNarrowExercise(exercise)"
               [style.--big-deco-bg]="bigDecoBgForIndex($index)"
               [style.--split-bg]="splitDecoBgForIndex($index)">
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
                <app-draw-items-exercise
                  [exercise]="exercise"
                  [funTheme]="sheet.funTheme"
                />
              }
              @case ('image-addition') {
                <app-image-addition-exercise
                  [exercise]="exercise"
                  [funTheme]="sheet.funTheme"
                  [showAnswers]="showAnswers"
                />
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
  /** Mode de disposition des illustrations sur la fiche. Toggle en preview, persisté via ?deco= */
  @Input() decoMode: 'stamps' | 'banner' | 'margins' | 'split' | 'footer' | 'rich' = 'stamps';

  private decoCatalog = inject(DecorationCatalogService);

  /** Bascule sur l'emoji si le PNG du thème n'est pas dispo. */
  readonly mascotFailed = signal(false);

  // ─── Décorations data-driven (cf. decoration.model.ts) ──────────
  /** 'small' decos pour le mode margins / rich (scattered en marges). */
  get smallDecos(): Decoration[] {
    return this.decoCatalog.bySize(this.sheet.funTheme, 'small');
  }

  /** 4 premiers 'big' chars pour la scène du mode banner. */
  get bannerScene(): Decoration[] {
    return this.decoCatalog.bySize(this.sheet.funTheme, 'big').slice(0, 4);
  }

  /** Background-image (`url(...)`) du 'vertical' asset → side-illu narrow. */
  get verticalBg(): string {
    const v = this.decoCatalog.vertical(this.sheet.funTheme);
    return v ? this.decoCatalog.bgUrl(v) : '';
  }

  /** Cycle sur les 'big' chars pour le mode rich (par index d'exo). */
  bigDecoBgForIndex(i: number): string {
    const bigs = this.decoCatalog.bySize(this.sheet.funTheme, 'big');
    return bigs.length === 0 ? '' : this.decoCatalog.bgUrl(bigs[i % bigs.length]);
  }

  /** Cycle sur tous les non-vertical pour le mode split (par index d'exo). */
  splitDecoBgForIndex(i: number): string {
    const all = this.decoCatalog.byTheme(this.sheet.funTheme).filter(d => d.size !== 'vertical');
    return all.length === 0 ? '' : this.decoCatalog.bgUrl(all[i % all.length]);
  }

  decoSrc(deco: Decoration): string {
    return this.decoCatalog.path(deco);
  }

  mascotPath(): string {
    return `/assets/sheet/themes/${this.sheet.funTheme}.png`;
  }

  mascotEmoji(): string {
    const map: Record<FunTheme, string> = {
      dinosaurs: '🦕',
      pirates: '🏴‍☠️',
      space: '🚀',
      animals: '🐨',
    };
    return map[this.sheet.funTheme];
  }

  /** True si l'exo affiche déjà sa propre illustration (pour ne pas y ajouter une déco coin redondante). */
  exerciseHasIllustration(exercise: Sheet['exercises'][number]): boolean {
    return exercise.format === 'draw-items';
  }

  /** True si l'exo n'a qu'une colonne de contenu (laisse de la place pour une grande illu à droite). */
  isNarrowExercise(exercise: Sheet['exercises'][number]): boolean {
    if (exercise.format !== 'text-blank') return false;
    return exercise.variant === 'decompose';
  }

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
