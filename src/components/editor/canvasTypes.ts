export type BoxSize = 'sm' | 'md' | 'lg';

export type StepItem =
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'box'; size: BoxSize; value?: string }
  | { id: string; kind: 'fraction'; num?: string; den?: string };

export type CanvasBlock =
  | { id: string; kind: 'heading'; text: string }
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'step'; items: StepItem[] };

export interface SolutionCanvas {
  blocks: CanvasBlock[];
}

const rid = () => Math.random().toString(36).slice(2, 10);

export const newBlock = {
  heading: (): CanvasBlock => ({ id: rid(), kind: 'heading', text: '' }),
  text: (): CanvasBlock => ({ id: rid(), kind: 'text', text: '' }),
  step: (): CanvasBlock => ({ id: rid(), kind: 'step', items: [] }),
};

export const newItem = {
  text: (): StepItem => ({ id: rid(), kind: 'text', text: '' }),
  box: (size: BoxSize): StepItem => ({ id: rid(), kind: 'box', size, value: '' }),
  fraction: (): StepItem => ({ id: rid(), kind: 'fraction', num: '', den: '' }),
};

export const SYMBOLS: string[] = [
  '+', '-', '×', '÷', '=', '≠', '≈', '<', '>', '≤', '≥',
  '(', ')', '[', ']', '{', '}', '.', ',', '°', '±',
  '√', '∛', 'π', '∞', '²', '³', 'ⁿ', '½', '¼', '¾', '⅓', '⅔',
];
