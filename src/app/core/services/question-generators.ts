import {
  AdditionComputeGen,
  AdditionReverseGen,
  CountItemsGen,
  CountItemsVariant,
  CountQuestion,
  DecomposeDuGen,
  ImageAdditionPairGen,
  ImageAdditionQuestion,
  SequenceStepGen,
  SubtractionComputeGen,
  TextBlankGenerator,
  TextBlankQuestion,
} from '../models/exercise.model';

// ─── Helpers ─────────────────────────────────────────────────
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Tire au hasard `count` éléments uniques en appelant `produce()`.
 * `keyOf` extrait une clé canonique pour dédoublonner (ex : `min(a,b)+max(a,b)` pour additions).
 * Limite le nombre d'essais pour éviter les boucles infinies sur contraintes trop strictes.
 */
function pickUnique<T>(
  count: number,
  produce: () => T,
  keyOf: (item: T) => string,
  maxAttempts = 500,
): T[] {
  const items: T[] = [];
  const seen = new Set<string>();
  let attempts = 0;
  while (items.length < count && attempts < maxAttempts) {
    attempts++;
    const item = produce();
    const key = keyOf(item);
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(item);
  }
  return items;
}

// ─── Dispatcher ──────────────────────────────────────────────
export function expandGenerator(block: TextBlankGenerator): TextBlankQuestion[] {
  switch (block.generate) {
    case 'addition-compute':
      return genAdditionCompute(block);
    case 'addition-reverse':
      return genAdditionReverse(block);
    case 'subtraction-compute':
      return genSubtractionCompute(block);
    case 'decompose-DU':
      return genDecomposeDu(block);
    case 'sequence-step':
      return genSequenceStep(block);
  }
}

// ─── addition-compute : a + b = ___ ──────────────────────────
function genAdditionCompute(g: AdditionComputeGen): TextBlankQuestion[] {
  const min = g.min ?? 1;
  const max = g.max ?? 9;
  const maxResult = g.maxResult ?? 10;

  return pickUnique(
    g.count,
    () => {
      // a dans [min, max], b dans [min, min(max, maxResult-a)]
      const a = randomInt(min, max);
      const bMax = Math.min(max, maxResult - a);
      const b = randomInt(min, Math.max(min, bMax));
      return { a, b };
    },
    ({ a, b }) => `${Math.min(a, b)}+${Math.max(a, b)}`, // dédoublonne commutatif
  )
    .filter(({ a, b }) => a + b <= maxResult)
    .map(({ a, b }) => ({
      text: `${a} + ${b} = ___`,
      answers: [String(a + b)],
    }));
}

// ─── addition-reverse : a + ___ = c (ou ___ + b = c) ─────────
function genAdditionReverse(g: AdditionReverseGen): TextBlankQuestion[] {
  const min = g.min ?? 1;
  const max = g.max ?? 9;
  const maxResult = g.maxResult ?? 10;
  const position = g.position ?? 'both';

  return pickUnique(
    g.count,
    () => {
      const known = randomInt(min, max);
      const result = randomInt(known + min, Math.min(maxResult, known + max));
      const blank = result - known;
      const onLeft =
        position === 'both' ? Math.random() < 0.5 : position === 'left';
      return { known, result, blank, onLeft };
    },
    ({ known, result, onLeft }) => `${known}_${result}_${onLeft}`,
  )
    .filter(({ blank }) => blank >= min && blank <= max)
    .map(({ known, result, onLeft }) => ({
      text: onLeft
        ? `___ + ${known} = ${result}`
        : `${known} + ___ = ${result}`,
      answers: [String(result - known)],
    }));
}

// ─── subtraction-compute : a − b = ___ (a >= b) ─────────────
function genSubtractionCompute(g: SubtractionComputeGen): TextBlankQuestion[] {
  const min = g.min ?? 1;
  const max = g.max ?? 10;

  return pickUnique(
    g.count,
    () => {
      const a = randomInt(min + 1, max); // a > b possible
      const b = randomInt(min, a); // b <= a
      return { a, b };
    },
    ({ a, b }) => `${a}-${b}`,
  ).map(({ a, b }) => ({
    text: `${a} − ${b} = ___`,
    answers: [String(a - b)],
  }));
}

// ─── decompose-DU : n = ___ D + ___ U ────────────────────────
function genDecomposeDu(g: DecomposeDuGen): TextBlankQuestion[] {
  return pickUnique(
    g.count,
    () => randomInt(g.min, g.max),
    n => String(n),
  ).map(n => {
    const d = Math.floor(n / 10);
    const u = n % 10;
    return {
      text: `${n} = ___ D + ___ U`,
      answers: [String(d), String(u)],
    };
  });
}

// ─── sequence-step : a, a+s, ___, a+3s, ___ ──────────────────
function genSequenceStep(g: SequenceStepGen): TextBlankQuestion[] {
  const startMin = g.startMin ?? 0;
  const startMax = g.startMax ?? 5;

  if (g.blanks >= g.length) {
    throw new Error(
      `sequence-step: blanks (${g.blanks}) doit être < length (${g.length})`,
    );
  }

  return pickUnique(
    g.count,
    () => {
      const start = randomInt(startMin, startMax);
      // Positions des blancs : on choisit dans [1, length-2] (jamais 1ère ni dernière sauf 1 cas extrême).
      // Si length = 5 et blanks = 2, positions possibles : indices 1, 2, 3 → on en prend 2 différents.
      const candidatePositions: number[] = [];
      for (let i = 1; i < g.length - 1; i++) candidatePositions.push(i);
      // Si pas assez de positions internes, on autorise la dernière.
      if (candidatePositions.length < g.blanks) {
        candidatePositions.push(g.length - 1);
      }
      const blankPositions = shuffle(candidatePositions).slice(0, g.blanks).sort((a, b) => a - b);
      return { start, blankPositions };
    },
    ({ start, blankPositions }) => `${start}_${blankPositions.join(',')}`,
  ).map(({ start, blankPositions }) => {
    const fullSequence = Array.from({ length: g.length }, (_, i) => start + i * g.step);
    const displayed = fullSequence.map((v, i) =>
      blankPositions.includes(i) ? '___' : String(v),
    );
    const answers = blankPositions.map(i => String(fullSequence[i]));
    return {
      text: displayed.join(', '),
      answers,
    };
  });
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Dispatcher image-addition ───────────────────────────────
export function expandImageAdditionGenerator(
  block: ImageAdditionPairGen,
): ImageAdditionQuestion[] {
  return genImageAdditionPair(block);
}

// ─── image-addition-pair : (left, right) avec left+right ≤ sumMax ──
function genImageAdditionPair(g: ImageAdditionPairGen): ImageAdditionQuestion[] {
  const sumMax = g.sumMax ?? 10;

  return pickUnique(
    g.count,
    () => {
      const sum = randomInt(2, sumMax);
      const left = randomInt(1, sum - 1);
      const right = sum - left;
      return { left, right };
    },
    ({ left, right }) => `${left}+${right}`,
  );
}

// ─── Dispatcher count-items ──────────────────────────────────
/**
 * Le variant (porté par l'exercice) décide de la forme : `compare` → 2 sets de
 * quantités distinctes ; `simple` / `pre-grouped` → 1 set (paquets de 5 pour
 * pre-grouped). La quantité affichée EST la réponse.
 */
export function expandCountItemsGenerator(
  g: CountItemsGen,
  variant: CountItemsVariant,
): CountQuestion[] {
  const min = g.min ?? 4;
  const max = g.max ?? 12;

  if (variant === 'compare') {
    return pickUnique(
      g.count,
      () => {
        const a = randomInt(min, max);
        let b = randomInt(min, max);
        while (b === a) b = randomInt(min, max); // distinct → un plus grand net
        return { sets: [{ count: a }, { count: b }] };
      },
      q => q.sets.map(s => s.count).sort((x, y) => x - y).join('-'),
    );
  }

  const groupBy = variant === 'pre-grouped' ? 5 : undefined;
  return pickUnique(
    g.count,
    () => ({
      sets: [groupBy ? { count: randomInt(min, max), groupBy } : { count: randomInt(min, max) }],
    }),
    q => String(q.sets[0].count),
  );
}
