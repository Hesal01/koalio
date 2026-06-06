import {
  Component,
  Input,
  inject,
  signal,
  computed,
  afterNextRender,
  viewChild,
  ElementRef,
  DestroyRef,
  NgZone,
} from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
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
    NgTemplateOutlet,
    TextBlankExerciseComponent,
    CircleExerciseComponent,
    DrawItemsExerciseComponent,
    ImageAdditionExerciseComponent,
  ],
  template: `
    @if (paginate) {
      <!-- ═══ Conteneur de MESURE (hors écran) ═══════════════════════════
           Contient TOUS les exercices à la largeur exacte du corps d'une page
           A4 (210 − 2×16mm). On y mesure header+exos+footer via offsetHeight
           (immunisé contre le transform:scale mobile) pour calculer les pages. -->
      <div class="sheet-measure sheet-{{ sheet.funTheme }} deco-{{ decoMode }}"
           #measureRef aria-hidden="true">
        <ng-container [ngTemplateOutlet]="chromeTpl" />
        <div class="sheet-body">
          @for (exercise of sheet.exercises; track $index) {
            <ng-container
              [ngTemplateOutlet]="exoTpl"
              [ngTemplateOutletContext]="{ $implicit: exercise, index: $index }" />
          }
        </div>
        <div class="sheet-footer">
          <span class="footer-brand">koalio.be</span>
          <span class="footer-page">Page 1 / 1</span>
        </div>
      </div>

      <!-- ═══ Pages A4 réelles (écran + impression) ═══════════════════════ -->
      <div class="sheet-pages">
        @for (page of displayPages(); track $index; let pageIdx = $index, isFirst = $first) {
          <div class="sheet sheet-page sheet-{{ sheet.funTheme }} deco-{{ decoMode }}"
               [style.--vertical-bg]="verticalBg">
            <ng-container [ngTemplateOutlet]="decosTpl" />
            @if (isFirst) {
              <ng-container [ngTemplateOutlet]="chromeTpl" />
            }
            <div class="sheet-body">
              @for (gi of page; track gi) {
                <ng-container
                  [ngTemplateOutlet]="exoTpl"
                  [ngTemplateOutletContext]="{ $implicit: sheet.exercises[gi], index: gi }" />
              }
            </div>
            <div class="sheet-footer">
              <span class="footer-brand">koalio.be</span>
              <span class="footer-page">Page {{ pageIdx + 1 }} / {{ displayPages().length }}</span>
            </div>
          </div>
        }
      </div>
    } @else {
      <!-- ═══ Fiche unique non paginée (démo formats) ═════════════════════ -->
      <div class="sheet sheet-{{ sheet.funTheme }} deco-{{ decoMode }}" id="sheet-pdf"
           [style.--vertical-bg]="verticalBg">
        <ng-container [ngTemplateOutlet]="decosTpl" />
        <ng-container [ngTemplateOutlet]="chromeTpl" />
        <div class="sheet-body">
          @for (exercise of sheet.exercises; track $index) {
            <ng-container
              [ngTemplateOutlet]="exoTpl"
              [ngTemplateOutletContext]="{ $implicit: exercise, index: $index }" />
          }
        </div>
        <div class="sheet-footer">
          <span class="footer-brand">koalio.be</span>
          <span class="footer-date">{{ sheet.createdAt | date:'dd/MM/yyyy' }}</span>
        </div>
      </div>
    }

    <!-- ═══ Templates réutilisables ═══════════════════════════════════════ -->

    <!-- Décorations de fond (marges + ambient) — répétées sur chaque page. -->
    <ng-template #decosTpl>
      <!-- Décorations en marges (visibles en modes 'margins', 'rich', 'custom'). -->
      <div class="sheet-margins-decos" aria-hidden="true">
        @for (deco of marginDecos; track $index; let i = $index) {
          <img [src]="decoSrc(deco)" class="margin-deco mr-pos-{{ i }}" alt="" />
        }
      </div>
      <!-- Couche ambient (silhouettes en background, always-on). -->
      <div class="sheet-ambient" aria-hidden="true">
        @for (deco of ambientDecos; track $index; let i = $index) {
          <img [src]="decoSrc(deco)" class="ambient-deco amb-pos-{{ i }}" alt="" />
        }
      </div>
    </ng-template>

    <!-- En-tête de fiche (logo, eyebrow, mascotte, ligne d'identité, banner).
         Uniquement sur la 1re page. -->
    <ng-template #chromeTpl>
      <!-- Bandeau panorama plein-largeur (mode banner uniquement). -->
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

      <!-- Strip d'identification Nom / Prénom / Date. -->
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

      <!-- Bandeau scénique (mode 'banner' sans panorama). -->
      <div class="sheet-banner" aria-hidden="true">
        @for (deco of bannerScene; track deco.name; let i = $index) {
          <img [src]="decoSrc(deco)" class="banner-figure pos-{{ i }}" alt="" />
        }
      </div>
    </ng-template>

    <!-- Un bloc exercice. index = index GLOBAL (pour le numéro + le cycle déco). -->
    <ng-template #exoTpl let-exercise let-i="index">
      <div class="exercise-block"
           [class.has-illustration]="exerciseHasIllustration(exercise)"
           [class.has-side-illustration]="isNarrowExercise(exercise)"
           [style.--big-deco-bg]="bigDecoBgForIndex(i)"
           [style.--split-bg]="splitDecoBgForIndex(i)">
        <div class="exercise-header">
          <span class="exercise-number">Exercice {{ i + 1 }}</span>
        </div>
        @switch (exercise.format) {
          @case ('text-blank') {
            <app-text-blank-exercise [exercise]="exercise" [showAnswers]="showAnswers" />
          }
          @case ('circle') {
            <app-circle-exercise [exercise]="exercise" [showAnswers]="showAnswers" />
          }
          @case ('draw-items') {
            <app-draw-items-exercise [exercise]="exercise" [funTheme]="sheet.funTheme" />
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
    </ng-template>
  `,
  styleUrl: './sheet-layout.component.scss',
})
export class SheetLayoutComponent {
  @Input({ required: true }) sheet!: Sheet;
  @Input() showAnswers = false;
  /** Mode de disposition des illustrations sur la fiche. Toggle en preview, persisté via ?deco= */
  @Input() decoMode: 'stamps' | 'banner' | 'margins' | 'split' | 'footer' | 'rich' | 'custom' = 'stamps';
  /** Si true : découpe les exercices en vraies pages A4 (mêmes coupures écran + impression). */
  @Input() paginate = false;

  private decoCatalog = inject(DecorationCatalogService);
  private measureRef = viewChild<ElementRef<HTMLElement>>('measureRef');

  /** Bascule sur l'emoji si le PNG du thème n'est pas dispo. */
  readonly mascotFailed = signal(false);

  /** Indices d'exercices regroupés par page A4 (calculé par mesure du DOM). */
  readonly pages = signal<number[][]>([]);

  /**
   * Pages à afficher : le résultat de la mesure, ou — tant que le 1er calcul
   * n'a pas tourné — un fallback « tout sur une page » pour ne jamais afficher
   * de vide (ça se re-découpe dès la mesure).
   */
  readonly displayPages = computed(() => {
    const p = this.pages();
    if (p.length) return p;
    // Fallback robuste : `sheet` peut être lu (via #sl côté parent) avant que
    // l'input soit défini → on ne déréférence jamais un sheet undefined.
    const exercises = this.sheet?.exercises ?? [];
    return exercises.length ? [exercises.map((_, i) => i)] : [];
  });

  private resizeObserver?: ResizeObserver;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const zone = inject(NgZone);
    // En mode paginé : on observe le conteneur de mesure et on recalcule les
    // pages à chaque changement de taille (génération, réponses, mode déco…).
    // Le callback du ResizeObserver (et afterNextRender) tourne hors zone Angular
    // → on repasse dans la zone pour que la maj du signal déclenche le rendu.
    afterNextRender(() => {
      const el = this.measureRef()?.nativeElement;
      if (!el) return;
      this.resizeObserver = new ResizeObserver(() => zone.run(() => this.recomputePages()));
      this.resizeObserver.observe(el);
      zone.run(() => this.recomputePages()); // 1er calcul immédiat (évite un flash vide)
    });
    destroyRef.onDestroy(() => this.resizeObserver?.disconnect());
  }

  /**
   * Répartit les exercices en pages A4 en mesurant leur hauteur réelle dans le
   * conteneur caché. Aucun exercice n'est coupé en deux : on remplit chaque page
   * jusqu'à ce que l'exercice suivant déborde, puis on passe à la page suivante.
   * Mesures via offsetHeight/offsetTop → insensibles au transform:scale mobile.
   */
  private recomputePages(): void {
    const root = this.measureRef()?.nativeElement;
    if (!root) return;
    const body = root.querySelector('.sheet-body') as HTMLElement | null;
    const footer = root.querySelector('.sheet-footer') as HTMLElement | null;
    if (!body) return;
    const blocks = Array.from(body.children) as HTMLElement[];

    const MM = 96 / 25.4; // 1mm en px CSS de référence
    const pageH = 297 * MM;
    const pad = 16 * MM; // padding vertical d'une page (cf. .sheet-page : 16mm)
    const safety = 6 * MM; // marge anti-débordement (arrondis de mesure)
    const gap = parseFloat(getComputedStyle(body).rowGap || '0') || 0;
    const chromeH = body.offsetTop; // header + id-row + banner (page 1 uniquement)
    const footerH = footer ? footer.offsetHeight : 0;

    const firstBudget = pageH - 2 * pad - footerH - chromeH - safety;
    const otherBudget = pageH - 2 * pad - footerH - safety;
    const heights = blocks.map((b) => b.offsetHeight);

    const result: number[][] = [];
    let cur: number[] = [];
    let curH = 0;
    for (let i = 0; i < heights.length; i++) {
      const budget = result.length === 0 ? firstBudget : otherBudget;
      const need = curH + (cur.length ? gap : 0) + heights[i];
      if (cur.length && need > budget) {
        result.push(cur);
        cur = [i];
        curH = heights[i];
      } else {
        cur.push(i);
        curH = need;
      }
    }
    if (cur.length) result.push(cur);

    // Évite une mise à jour inutile (et donc un re-render superflu).
    const prev = this.pages();
    const same =
      prev.length === result.length &&
      prev.every((p, i) => p.length === result[i].length && p.every((v, j) => v === result[i][j]));
    if (!same) this.pages.set(result);
  }

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
