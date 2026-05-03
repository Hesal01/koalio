import { Injectable, signal } from '@angular/core';
import {
  Exercise,
  FunTheme,
  Level,
  Sheet,
  SheetTemplate,
  Subject,
  TextBlankExercise,
  Theme,
} from '../models/exercise.model';
import variant1 from '../../../assets/catalog/P1/math/additions/dinosaurs/variant-1.json';

// Catalogue statique. Pour ajouter une fiche, drop un nouveau JSON
// et ajoute-le ici. Quand le catalogue grandit, on basculera sur
// import.meta.glob pour de l'auto-discovery.
const CATALOG: SheetTemplate[] = [variant1 as SheetTemplate];

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
   * Pioche une fiche du catalogue matchant les critères, applique
   * la personnalisation prénom, retourne le Sheet prêt à afficher.
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

  private personalizeExercise(ex: Exercise, childName: string): Exercise {
    if (ex.format === 'text-blank') {
      return this.personalizeTextBlank(ex, childName);
    }
    // Future formats: branches ici.
    return ex;
  }

  private personalizeTextBlank(ex: TextBlankExercise, childName: string): TextBlankExercise {
    return {
      ...ex,
      instruction: this.replaceTokens(ex.instruction, childName),
      questions: ex.questions.map(q => ({
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
