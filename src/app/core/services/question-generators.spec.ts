import { expandGenerator } from './question-generators';
import {
  AdditionComputeGen,
  AdditionReverseGen,
  DecomposeDuGen,
  SequenceStepGen,
  SubtractionComputeGen,
} from '../models/exercise.model';

const ITERATIONS = 100; // nombre d'expansions pour chaque scénario

describe('question-generators', () => {
  describe('addition-compute', () => {
    const block: AdditionComputeGen = {
      generate: 'addition-compute',
      count: 6,
      min: 1,
      max: 9,
      maxResult: 10,
    };

    it('produit `count` questions par expansion', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        expect(qs.length).toBe(6);
      }
    });

    it('les contraintes sont toujours respectées', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const m = q.text.match(/(\d+)\s*\+\s*(\d+)\s*=\s*___/);
          expect(m).not.toBeNull();
          const [a, b] = [Number(m![1]), Number(m![2])];
          expect(a).toBeGreaterThanOrEqual(1);
          expect(a).toBeLessThanOrEqual(9);
          expect(b).toBeGreaterThanOrEqual(1);
          expect(b).toBeLessThanOrEqual(9);
          expect(a + b).toBeLessThanOrEqual(10);
        }
      }
    });

    it('la math est toujours correcte', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const m = q.text.match(/(\d+)\s*\+\s*(\d+)\s*=\s*___/);
          const [a, b] = [Number(m![1]), Number(m![2])];
          expect(q.answers[0]).toBe(String(a + b));
        }
      }
    });

    it('pas de doublons commutatifs dans un même bloc', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        const keys = qs.map(q => {
          const m = q.text.match(/(\d+)\s*\+\s*(\d+)/)!;
          const [a, b] = [Number(m[1]), Number(m[2])];
          return `${Math.min(a, b)}+${Math.max(a, b)}`;
        });
        expect(new Set(keys).size).toBe(keys.length);
      }
    });
  });

  describe('addition-reverse', () => {
    const block: AdditionReverseGen = {
      generate: 'addition-reverse',
      count: 4,
      min: 1,
      max: 9,
      maxResult: 10,
      position: 'both',
    };

    it('la math est correcte (résultat - opérande connu = blanc)', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          // Format : "a + ___ = c" ou "___ + b = c"
          const mLeft = q.text.match(/___\s*\+\s*(\d+)\s*=\s*(\d+)/);
          const mRight = q.text.match(/(\d+)\s*\+\s*___\s*=\s*(\d+)/);
          if (mRight) {
            const [a, c] = [Number(mRight[1]), Number(mRight[2])];
            expect(q.answers[0]).toBe(String(c - a));
          } else if (mLeft) {
            const [b, c] = [Number(mLeft[1]), Number(mLeft[2])];
            expect(q.answers[0]).toBe(String(c - b));
          } else {
            fail(`Question text malformée: ${q.text}`);
          }
        }
      }
    });

    it('le blanc est dans [min, max]', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const v = Number(q.answers[0]);
          expect(v).toBeGreaterThanOrEqual(1);
          expect(v).toBeLessThanOrEqual(9);
        }
      }
    });
  });

  describe('subtraction-compute', () => {
    const block: SubtractionComputeGen = {
      generate: 'subtraction-compute',
      count: 4,
      min: 1,
      max: 10,
    };

    it('le résultat est toujours positif (a >= b)', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const m = q.text.match(/(\d+)\s*−\s*(\d+)/);
          const [a, b] = [Number(m![1]), Number(m![2])];
          expect(a).toBeGreaterThanOrEqual(b);
          expect(Number(q.answers[0])).toBe(a - b);
        }
      }
    });
  });

  describe('decompose-DU', () => {
    const block: DecomposeDuGen = {
      generate: 'decompose-DU',
      count: 3,
      min: 10,
      max: 19,
    };

    it('n est dans [min, max] et la décomposition est correcte', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const m = q.text.match(/(\d+)\s*=/);
          const n = Number(m![1]);
          expect(n).toBeGreaterThanOrEqual(10);
          expect(n).toBeLessThanOrEqual(19);
          const [d, u] = q.answers.map(Number);
          expect(d * 10 + u).toBe(n);
        }
      }
    });

    it('pas de doublons sur n dans un même bloc', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        const ns = qs.map(q => Number(q.text.match(/(\d+)\s*=/)![1]));
        expect(new Set(ns).size).toBe(ns.length);
      }
    });
  });

  describe('sequence-step', () => {
    const block: SequenceStepGen = {
      generate: 'sequence-step',
      count: 3,
      step: 2,
      length: 5,
      blanks: 2,
      startMin: 0,
      startMax: 4,
    };

    it('produit des suites cohérentes', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const tokens = q.text.split(',').map(t => t.trim());
          expect(tokens.length).toBe(5);

          // Reconstruire la suite avec les réponses
          let answerIdx = 0;
          const values: number[] = [];
          for (const t of tokens) {
            if (t === '___') {
              values.push(Number(q.answers[answerIdx++]));
            } else {
              values.push(Number(t));
            }
          }

          // Vérifier le pas constant
          for (let j = 1; j < values.length; j++) {
            expect(values[j] - values[j - 1]).toBe(2);
          }
        }
      }
    });

    it('les blancs ne sont pas en première position', () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const qs = expandGenerator(block);
        for (const q of qs) {
          const tokens = q.text.split(',').map(t => t.trim());
          expect(tokens[0]).not.toBe('___');
        }
      }
    });
  });
});
