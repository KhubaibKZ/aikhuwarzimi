export type BoxSize = 'sm' | 'md' | 'lg';

export type StepItem =
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'box'; size: BoxSize; value?: string; width?: number; height?: number }
  | {
      id: string;
      kind: 'fraction';
      /** Inline items rendered above the fraction bar. */
      num: StepItem[];
      /** Inline items rendered below the fraction bar. */
      den: StepItem[];
    };

export type CanvasBlock =
  | { id: string; kind: 'heading'; text: string }
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'step'; items: StepItem[] }
  | { id: string; kind: 'question'; text: string; svgMarkup?: string };

export interface SolutionCanvas {
  blocks: CanvasBlock[];
}

const rid = () => Math.random().toString(36).slice(2, 10);

export const newBlock = {
  heading: (): CanvasBlock => ({ id: rid(), kind: 'heading', text: '' }),
  text: (): CanvasBlock => ({ id: rid(), kind: 'text', text: '' }),
  step: (): CanvasBlock => ({ id: rid(), kind: 'step', items: [] }),
  question: (): CanvasBlock => ({ id: rid(), kind: 'question', text: '' }),
};


export const newItem = {
  text: (): StepItem => ({ id: rid(), kind: 'text', text: '' }),
  box: (size: BoxSize): StepItem => ({ id: rid(), kind: 'box', size, value: '' }),
  fraction: (): StepItem => ({ id: rid(), kind: 'fraction', num: [], den: [] }),
};

/**
 * Backward-compat normaliser: older canvases stored fraction `num`/`den` as
 * plain strings (+ optional width/height). Convert those to the new stack form.
 */
export function normalizeItem(it: any): StepItem {
  if (!it || typeof it !== 'object') return it;
  if (it.kind !== 'fraction') return it;
  const wrap = (v: any): StepItem[] => {
    if (Array.isArray(v)) return v.map(normalizeItem);
    if (typeof v === 'string' && v.length > 0) {
      return [{ id: rid(), kind: 'text', text: v }];
    }
    return [];
  };
  return { id: it.id ?? rid(), kind: 'fraction', num: wrap(it.num), den: wrap(it.den) };
}

export function normalizeCanvas(c: SolutionCanvas | undefined | null): SolutionCanvas {
  if (!c || !Array.isArray(c.blocks)) return { blocks: [] };
  return {
    blocks: c.blocks.map((b) =>
      b.kind === 'step' ? { ...b, items: b.items.map(normalizeItem) } : b,
    ),
  };
}

export const SYMBOLS: string[] = [
  '+', '-', '×', '÷', '=', '≠', '≈', '<', '>', '≤', '≥',
  '(', ')', '[', ']', '{', '}', '.', ',', '°', '±',
  '√', '∛', 'π', '∞', '²', '³', 'ⁿ', '½', '¼', '¾', '⅓', '⅔',
];
