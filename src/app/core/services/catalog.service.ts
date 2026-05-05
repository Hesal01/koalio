import { Injectable, signal } from '@angular/core';
import {
  CircleExercise,
  DrawItemsExercise,
  Exercise,
  ExerciseTemplate,
  FunTheme,
  ImageAdditionExercise,
  ImageAdditionExerciseTemplate,
  ImageAdditionQuestion,
  isGeneratorBlock,
  isImageAdditionGenerator,
  Level,
  Sheet,
  SheetTemplate,
  Subject,
  TextBlankExercise,
  TextBlankExerciseTemplate,
  TextBlankQuestion,
  Theme,
} from '../models/exercise.model';
import { expandGenerator, expandImageAdditionGenerator } from './question-generators';
import variant1 from '../../../assets/catalog/P1/math/additions/dinosaurs/variant-1.json';

// Catalogue statique. Pour ajouter une fiche, drop un nouveau JSON
// et ajoute-le ici. Quand le catalogue grandit, on basculera sur
// import.meta.glob pour de l'auto-discovery.
const CATALOG: SheetTemplate[] = [variant1 as unknown as SheetTemplate];

export interface GenerateInput {
  childName: string;
  level: Level;
  subject: Subject;
  theme: Theme;
  funTheme?: FunTheme;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  /** Dernière fiche générée — lue par /result/:id. */
  readonly currentSheet = signal<Sheet | null>(null);

  /**
   * Pioche une fiche du catalogue matchant les critères, expanse les
   * générateurs, applique la personnalisation prénom, retourne le Sheet
   * prêt à afficher.
   */
  generate(input: GenerateInput): Sheet {
    const matching = CATALOG.filter(
      t =>
        t.level === input.level &&
        t.subject === input.subject &&
        t.theme === input.theme &&
        (input.funTheme === undefined || t.funTheme === input.funTheme),
    );

    if (matching.length === 0) {
      throw new Error(
        `Aucune fiche dans le catalogue pour ${input.level} / ${input.subject} / ${input.theme}.`,
      );
    }

    const template = matching[Math.floor(Math.random() * matching.length)];
    const sheet = this.personalize(template, input.childName);
    this.currentSheet.set(sheet);
    return sheet;
  }

  // ─── Personnalisation ──────────────────────────────────────
  private personalize(template: SheetTemplate, childName: string): Sheet {
    return {
      ...template,
      id: this.makeId(),
      childName,
      createdAt: new Date(),
      exercises: template.exercises.map(ex => this.personalizeExercise(ex, childName)),
    };
  }

  private personalizeExercise(ex: ExerciseTemplate, childName: string): Exercise {
    if (ex.format === 'text-blank') return this.personalizeTextBlank(ex, childName);
    if (ex.format === 'circle') return this.personalizeCircle(ex, childName);
    if (ex.format === 'draw-items') return this.personalizeDrawItems(ex, childName);
    if (ex.format === 'image-addition') return this.personalizeImageAddition(ex, childName);
    return ex as unknown as Exercise;
  }

  private personalizeImageAddition(
    template: ImageAdditionExerciseTemplate,
    childName: string,
  ): ImageAdditionExercise {
    const flatQuestions: ImageAdditionQuestion[] = [];
    for (const item of template.questions) {
      if (isImageAdditionGenerator(item)) {
        flatQuestions.push(...expandImageAdditionGenerator(item));
      } else {
        flatQuestions.push(item);
      }
    }
    return {
      format: 'image-addition',
      instruction: this.replaceTokens(template.instruction, childName),
      example: template.example,
      questions: flatQuestions,
    };
  }

  private personalizeCircle(template: CircleExercise, childName: string): CircleExercise {
    return {
      format: 'circle',
      instruction: this.replaceTokens(template.instruction, childName),
      example: template.example
        ? { ...template.example, text: this.replaceTokens(template.example.text, childName) }
        : undefined,
      items: template.items.map(it => ({
        ...it,
        text: this.replaceTokens(it.text, childName),
      })),
    };
  }

  private personalizeDrawItems(template: DrawItemsExercise, childName: string): DrawItemsExercise {
    return {
      format: 'draw-items',
      instruction: this.replaceTokens(template.instruction, childName),
      zoneSize: template.zoneSize,
      prefilled: template.prefilled,
    };
  }

  private personalizeTextBlank(
    template: TextBlankExerciseTemplate,
    childName: string,
  ): TextBlankExercise {
    // 1. Expander les générateurs en questions statiques
    const flatQuestions: TextBlankQuestion[] = [];
    for (const item of template.questions) {
      if (isGeneratorBlock(item)) {
        flatQuestions.push(...expandGenerator(item));
      } else {
        flatQuestions.push(item);
      }
    }

    // 2. Substituer {{prenom}} dans l'instruction et les questions
    return {
      format: 'text-blank',
      variant: template.variant,
      instruction: this.replaceTokens(template.instruction, childName),
      example: template.example,
      questions: flatQuestions.map(q => ({
        ...q,
        text: this.replaceTokens(q.text, childName),
      })),
    };
  }

  private replaceTokens(text: string, prenom: string): string {
    return text.replace(/\{\{prenom\}\}/g, prenom);
  }

  private makeId(): string {
    return `sheet-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
