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
           Mix de squares (mr-pos-0/2/3) et landscapes (mr-pos-1/4) selon la
           position du slot (cf. layout SCSS). -->
      <div class="sheet-margins-decos" aria-hidden="true">
        @for (deco of marginDecos; track $index; let i = $index) {
          <img [src]="decoSrc(deco)" class="margin-deco mr-pos-{{ i }}" alt="" />
        }
      </div>

      <!-- Couche ambient (silhouettes noires en background, always-on quel que soit le mode).
           Cycle sur les 'silhouette' du thème pour remplir 6 slots scattered. -->
      <div class="sheet-ambient" aria-hidden="true">
        @for (deco of ambientDecos; track $index; let i = $index) {
          <img [src]="decoSrc(deco)" class="ambient-deco amb-pos-{{ i }}" alt="" />
        }
      </div>

      <!-- Bandeau panorama plein-largeur (mode banner uniquement). Posé
           AVANT le header pour qu'il s'étale d'un bord à l'autre de la fiche. -->
      <div class="sheet-banner-strip" aria-hidden="true"></div>

      <div class="sheet-header">
        <div class="sheet-header-left">
          <span class="sheet-logo">🐨 Koalio</span>
        </div>
        <div class="sheet-header-right">
          <div class="sheet-eyebrow">
            <span>{{ sheet.level }}</span>
            <span class="sep">·</span>
            <span>{{ subjectLabel }}</span>
            <span class="sep">·</span>
            <span>{{ themeLabel }}</span>
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

      <!-- Strip d'identification Nom / Prénom / Date — pleine largeur sous
           le header, façon vraie fiche imprimable. Présente dans tous les modes. -->
      <div class="sheet-id-row">
        <span class="sheet-field">
          <span class="sheet-field-label">Nom :</span>
          <span class="sheet-field-value sheet-field-blank"></span>
        </span>
        <span class="sheet-field">
          <span class="sheet-field-label">Prénom :</span>
          <span class="sheet-field-value">{{ sheet.childName }}</span>
        </span>
        <span class="sheet-field">
          <span class="sheet-field-label">Date :</span>
          <span class="sheet-field-value">{{ sheet.createdAt | date:'dd/MM/yyyy' }}</span>
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
  @Input() decoMode: 'stamps' | 'banner' | 'margins' | 'split' | 'footer' | 'rich' | 'custom' = 'stamps';

  private decoCatalog = inject(DecorationCatalogService);

  /** Bascule sur l'emoji si le PNG du thème n'est pas dispo. */
  readonly mascotFailed = signal(false);

  // ─── Décorations data-driven (cf. decoration.model.ts) ──────────
  /**
   * 5 slots de marges :
   * - modes `margins` / `rich` : mix squares (pos-0/2/3) + landscapes (pos-1/4)
   *   pour exploiter les 2 ratios différents des slots SCSS.
   * - mode `custom` : que des squares partout (l'utilisateur trouve les
   *   landscapes type volcan trop "lourds" en marge — on garde le délicat).
   */
  get marginDecos(): Decoration[] {
    const squares = this.decoCatalog.bySize(this.sheet.funTheme, 'square');
    if (this.decoMode === 'custom') {
      // Mode délicat : 4 emplacements le long des marges latérales, remplis
      // avec des illustrations DISTINCTES (jamais deux fois la même). Créatures
      // volantes en priorité (dragonfly, pterodactyl), puis les autres squares
      // les plus fins en complément. Si on ajoute des assets volants au
      // catalogue, ils prendront naturellement les premiers slots.
      const flyers = squares.filter(d =>
        d.name === 'dragonfly' || d.name === 'pterodactyl',
      );
      const others = squares.filter(d => !flyers.includes(d));
      return [...flyers, ...others].slice(0, 4);
    }
    const landscapes = this.decoCatalog.bySize(this.sheet.funTheme, 'landscape');
    return [
      squares[0],
      landscapes[0],
      squares[1],
      squares[2],
      landscapes[1],
    ].filter((d): d is Decoration => !!d);
  }

  /**
   * Couche ambient : trail d'empreintes (le même asset répété 10× pour
   * simuler des pas qui se suivent dans la marge gauche).
   * Quand d'autres silhouettes arriveront (fougère, os, patterns), on ajoutera
   * une 2e couche scattered ailleurs (le trail garde uniquement les footprints).
   */
  get ambientDecos(): Decoration[] {
    const footprint = this.decoCatalog
      .bySize(this.sheet.funTheme, 'silhouette')
      .find(d => d.name.includes('footprint'));
    return footprint ? Array(10).fill(footprint) : [];
  }

  /**
   * Mode banner — deux stratégies de rendu, exclusives :
   *
   * 1. Si le thème a un asset `banner` (panorama 3:1 avec chars intégrés),
   *    on l'utilise tel quel comme background de `.sheet-banner` et on ne
   *    superpose rien — le panorama EST le banner.
   * 2. Sinon, on compose un diorama de 4 figures : 3 grounds (portrait ou
   *    landscape) + 1 flying (square).
   *
   * Ce getter retourne le diorama du cas 2, ou [] dans le cas 1.
   */
  get bannerScene(): Decoration[] {
    const hasPanorama = this.decoCatalog.bySize(this.sheet.funTheme, 'banner').length > 0;
    if (hasPanorama) return [];

    const grounds = [
      ...this.decoCatalog.bySize(this.sheet.funTheme, 'portrait'),
      ...this.decoCatalog.bySize(this.sheet.funTheme, 'landscape'),
    ].slice(0, 3);
    const flying = this.decoCatalog.bySize(this.sheet.funTheme, 'square').slice(0, 1);
    return [...grounds, ...flying];
  }

  /** Background-image (`url(...)`) de l'asset `tall` → side-illu narrow (decompose). */
  get verticalBg(): string {
    const v = this.decoCatalog.tall(this.sheet.funTheme);
    return v ? this.decoCatalog.bgUrl(v) : '';
  }

  /** Cycle sur les `landscape` pour le mode rich (par index d'exo). */
  bigDecoBgForIndex(i: number): string {
    const ls = this.decoCatalog.bySize(this.sheet.funTheme, 'landscape');
    return ls.length === 0 ? '' : this.decoCatalog.bgUrl(ls[i % ls.length]);
  }

  /**
   * Cycle pour le mode split : tous formats sauf `tall`, `banner` et `silhouette`
   * (réservés à leurs zones dédiées). Donne du portrait / landscape / square en
   * alternance par index d'exo.
   */
  splitDecoBgForIndex(i: number): string {
    const all = this.decoCatalog
      .byTheme(this.sheet.funTheme)
      .filter(d => d.size !== 'tall' && d.size !== 'banner' && d.size !== 'silhouette');
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
