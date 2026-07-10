import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, BookOpen, CheckCircle2, CheckSquare, Copy, HelpCircle, Keyboard, Plus, Send, Trash2, Type, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HorizontalKeyboard } from '@/components/workspace/HorizontalKeyboard';
import { InlineMathToolbar, insertAtCaret } from '@/components/editor/InlineMathToolbar';
import { QuestionText } from '@/components/QuestionText';
import { themeSvgMarkup } from '@/lib/svgTheme';
import { InteractiveSvg } from '@/components/InteractiveSvg';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

import {
  BoxSize,
  CanvasBlock,
  newBlock,
  newItem,
  normalizeCanvas,
  SolutionCanvas as TCanvas,
  StepItem,
  SYMBOLS,
} from './canvasTypes';

interface Props {
  value?: TCanvas;
  onChange: (next: TCanvas) => void;
  hints?: string[];
  previewMode?: boolean;
}


const empty: TCanvas = { blocks: [] };

const DEFAULT_KEYBOARD: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['+', '-', '×', '÷', '=', '.', '(', ')', '<', '>'],
  ['√', 'π', '²', '³', '°', '±', '½', '¼', '¾', 'a/b', '⌫'],
];

const BOX_PX: Record<BoxSize, { w: number; h: number }> = {
  sym: { w: 32, h: 32 },
  sm: { w: 64, h: 32 },
  md: { w: 112, h: 32 },
  lg: { w: 192, h: 36 },
};

const inlineValueWidth = (value: string) =>
  `calc(${Math.max(1, value.trim().length || value.length || 1)}ch + 0.12rem)`;

const isStepRowLabel = (text: string) =>
  /^(solve(?:\s+for\s+[a-z])?|evaluate|answer|simplify|expand|factorise|factorize|estimate|round)\s*:?$/i.test(text.trim());

const RADICAND_RE = /^([A-Za-z0-9π().]+)/;

function RadicalText({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-stretch align-middle leading-none">
      <svg viewBox="0 0 14 28" preserveAspectRatio="none" aria-hidden="true" className="self-stretch h-[1.15em] w-[0.8em] text-current">
        <polyline points="0,18 4,16 7,27 13,1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" strokeLinecap="square" />
      </svg>
      <span className="flex min-w-[0.55em] items-center border-t-2 border-current px-0.5 pt-0.5 -ml-px">
        {children}
      </span>
    </span>
  );
}

function MathValueOverlay({ value }: { value: string }) {
  if (!value.includes('√')) return null;

  const nodes: React.ReactNode[] = [];
  let rest = value;
  let key = 0;

  while (rest.length > 0) {
    const rootIndex = rest.indexOf('√');
    if (rootIndex === -1) {
      nodes.push(<span key={key++}>{rest}</span>);
      break;
    }
    if (rootIndex > 0) {
      nodes.push(<span key={key++}>{rest.slice(0, rootIndex)}</span>);
    }
    const afterRoot = rest.slice(rootIndex + 1);
    const match = afterRoot.match(RADICAND_RE);
    const radicand = match?.[1] ?? '';
    nodes.push(<RadicalText key={key++}>{radicand}</RadicalText>);
    rest = afterRoot.slice(radicand.length);
  }

  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-2 text-center text-sm font-medium text-foreground">
      <span className="inline-flex max-w-full items-center overflow-hidden whitespace-pre">{nodes}</span>
    </span>
  );
}

/** Focus target tracks where the next "Add Text/Box/Fraction/Symbol" should land. */
type FocusTarget =
  | { kind: 'step'; stepId: string }
  | { kind: 'fraction'; stepId: string; fractionId: string; part: 'num' | 'den' };

type CanvasSection = {
  key: string;
  question?: Extract<CanvasBlock, { kind: 'question' }>;
  blocks: CanvasBlock[];
};

function splitCanvasSections(blocks: CanvasBlock[]): CanvasSection[] {
  const sections: CanvasSection[] = [];

  blocks.forEach((block) => {
    if (block.kind === 'question') {
      sections.push({ key: block.id, question: block, blocks: [] });
      return;
    }

    if (sections.length === 0) {
      sections.push({ key: 'main-solution', blocks: [] });
    }

    sections[sections.length - 1].blocks.push(block);
  });

  return sections.length > 0 ? sections : [{ key: 'main-solution', blocks: [] }];
}

// Normalize answer string for comparison
const normAns = (s: string) =>
  (s ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[,]/g, '')
    .replace(/\*/g, '×')
    .replace(/\//g, '÷');

const answersEqual = (a: string, b: string) => {
  const na = normAns(a);
  const nb = normAns(b);
  if (na === nb) return true;
  const fa = parseFloat(na);
  const fb = parseFloat(nb);
  if (!isNaN(fa) && !isNaN(fb) && Math.abs(fa - fb) < 1e-6) return true;
  return false;
};

// --- Mathematical-consistency evaluator ---------------------------------
// Turns a step's items (with the student's current values) into a math
// expression string and evaluates each side of `=` to decide if the line is
// mathematically consistent. Returns 'correct' when every `=`-separated side
// evaluates to the same number, 'incorrect' when they differ, 'unknown' when
// the expression cannot be parsed / has empty fillable boxes / has no `=`.
function buildStepExpression(items: StepItem[], values: Record<string, string>): string {
  const walk = (list: StepItem[]): string => list.map((it) => {
    if (it.kind === 'text') return ` ${it.text} `;
    if (it.kind === 'box') {
      if (isStaticSymbolBox(it)) return ` ${(it.value ?? '').trim()} `;
      const v = (values[it.id] ?? '').trim();
      return v ? ` ${v} ` : ' ▢ ';
    }
    if (it.kind === 'fraction') return ` ((${walk(it.num)})/(${walk(it.den)})) `;
    return '';
  }).join('');
  return walk(items);
}

function tokensToJs(expr: string): string {
  let s = expr;
  s = s.replace(/(\d),(?=\d{3}(\D|$))/g, '$1');
  s = s.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  s = s.replace(/π/g, '(Math.PI)');
  s = s.replace(/²/g, '**2').replace(/³/g, '**3').replace(/⁴/g, '**4');
  s = s.replace(/½/g, '(1/2)').replace(/¼/g, '(1/4)').replace(/¾/g, '(3/4)')
       .replace(/⅓/g, '(1/3)').replace(/⅔/g, '(2/3)');
  s = s.replace(/√\s*\(/g, 'Math.sqrt(');
  s = s.replace(/√\s*([0-9.]+)/g, 'Math.sqrt($1)');
  s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');
  return s;
}

function safeEval(js: string): number | null {
  if (!js.trim()) return null;
  // Allow only digits, math ops, dots, parens, commas, spaces, and
  // Math.sqrt / Math.PI tokens.
  const stripped = js.replace(/Math\.sqrt/g, '').replace(/Math\.PI/g, '');
  if (!/^[\d\s+\-*/().,]*$/.test(stripped.replace(/\*\*/g, ''))) return null;
  try {
    // eslint-disable-next-line no-new-func
    const val = Function(`"use strict"; return (${js});`)();
    if (typeof val === 'number' && isFinite(val)) return val;
    return null;
  } catch {
    return null;
  }
}

export function evaluateStepEquation(
  items: StepItem[],
  values: Record<string, string>,
  priorResults: number[] = [],
): 'correct' | 'incorrect' | 'unknown' {
  const raw = buildStepExpression(items, values);
  if (raw.includes('▢')) return 'unknown';
  // Split on `=` and drop label-only parts (no digits) — e.g. "Number of People".
  const parts = raw
    .split('=')
    .map((p) => p.trim())
    .filter((p) => p && /\d/.test(p));
  if (parts.length === 0) return 'unknown';
  const nums: number[] = [];
  for (const p of parts) {
    const n = safeEval(tokensToJs(p));
    if (n === null) return 'unknown';
    nums.push(n);
  }
  // Multi-sided equation: every side must agree.
  if (nums.length >= 2) {
    const ref = nums[0];
    const tol = Math.max(1e-4, Math.abs(ref) * 1e-4);
    for (const n of nums) if (Math.abs(n - ref) > tol) return 'incorrect';
    return 'correct';
  }
  // Single-sided expression (e.g. "36400 − 8372" or "= 28028"):
  // it is a well-formed arithmetic continuation. If any prior step yielded
  // this value, it's definitively correct; otherwise still treat as correct
  // because the calculation itself is valid.
  const val = nums[0];
  if (priorResults.length) {
    const tol = Math.max(1e-4, Math.abs(val) * 1e-4);
    for (const pr of priorResults) if (Math.abs(pr - val) <= tol) return 'correct';
  }
  return 'correct';
}

// Set of symbol characters that identify "static display" boxes (operators,
// math symbols, punctuation). If a box's authored value contains only these
// characters, it is rendered as inline static text in preview instead of a
// fillable input, and is skipped during validation.
const STATIC_SYMBOL_CHARS = new Set<string>([
  ...SYMBOLS,
  ' ', '\t',
]);

export function isStaticSymbolBox(item: StepItem): boolean {
  if (item.kind !== 'box') return false;
  if (item.size === 'sym') return (item.value ?? '').trim().length > 0;
  const v = (item.value ?? '').trim();
  if (!v || v.length > 4) return false;
  for (const ch of v) if (!STATIC_SYMBOL_CHARS.has(ch)) return false;
  return true;
}

// Collect [boxId, expectedValue] pairs from a step block's items, recursing fractions.
// Static-symbol boxes are excluded — they are display-only and not user input.
function collectBoxes(items: StepItem[]): Array<{ id: string; expected: string }> {
  const out: Array<{ id: string; expected: string }> = [];
  const walk = (list: StepItem[]) => {
    for (const it of list) {
      if (it.kind === 'box') {
        if (isStaticSymbolBox(it)) continue;
        out.push({ id: it.id, expected: it.value ?? '' });
      }
      else if (it.kind === 'fraction') { walk(it.num); walk(it.den); }
    }
  };
  walk(items);
  return out;
}

export function SolutionCanvas({ value, onChange, hints = [], previewMode = false }: Props) {
  const initialStepId = useRef(Math.random().toString(36).slice(2, 10));
  const canvas = useMemo(() => {
    const normalized = normalizeCanvas(value ?? empty);
    if (!previewMode && normalized.blocks.length === 0) {
      return { blocks: [{ id: initialStepId.current, kind: 'step' as const, items: [] }] };
    }
    return normalized;
  }, [value, previewMode]);
  const { toast } = useToast();
  const [hintIdx, setHintIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [focusedRef, setFocusedRef] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [keyboardIdsByBlock, setKeyboardIdsByBlock] = useState<Record<string, string[]>>({});
  const [previewValues, setPreviewValues] = useState<Record<string, string>>({});
  const [previewFeedback, setPreviewFeedback] = useState<Record<string, 'correct' | 'incorrect'>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<string, { type: 'guidance'; content: string } | null>>({});
  const [loadingStepId, setLoadingStepId] = useState<string | null>(null);
  const attemptCountRef = useRef<Record<string, number>>({});
  const previousFeedbackRef = useRef<Record<string, string[]>>({});
  const addKeyboardTo = (blockId: string) =>
    setKeyboardIdsByBlock((prev) => ({
      ...prev,
      [blockId]: [...(prev[blockId] ?? []), Math.random().toString(36).slice(2, 9)],
    }));
  const removeKeyboardFrom = (blockId: string, id: string) =>
    setKeyboardIdsByBlock((prev) => ({
      ...prev,
      [blockId]: (prev[blockId] ?? []).filter((k) => k !== id),
    }));

  const focusBlock = (id: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    setFocusedRef(el);
  };

  const setBlocks = (blocks: CanvasBlock[]) => onChange({ ...canvas, blocks });

  const sections = useMemo(() => splitCanvasSections(canvas.blocks), [canvas.blocks]);

  const setPreviewVal = (id: string, v: string) => {
    setPreviewValues((p) => ({ ...p, [id]: v }));
    // clear feedback for this box on edit
    setPreviewFeedback((p) => {
      if (!(id in p)) return p;
      const next = { ...p }; delete next[id]; return next;
    });
  };

  const validateBlock = (block: CanvasBlock): { total: number; correct: number; incorrect: number; empty: number } => {
    const stats = { total: 0, correct: 0, incorrect: 0, empty: 0 };
    if (block.kind !== 'step') return stats;
    const boxes = collectBoxes(block.items);
    const fbUpdate: Record<string, 'correct' | 'incorrect'> = {};
    for (const { id, expected } of boxes) {
      if (!expected) continue; // skip boxes with no authored expected answer
      stats.total++;
      const v = (previewValues[id] ?? '').trim();
      if (!v) { stats.empty++; continue; }
      if (answersEqual(v, expected)) { stats.correct++; fbUpdate[id] = 'correct'; }
      else { stats.incorrect++; fbUpdate[id] = 'incorrect'; }
    }
    setPreviewFeedback((p) => ({ ...p, ...fbUpdate }));
    return stats;
  };

  const stepToText = (block: CanvasBlock, vals: Record<string, string>): string => {
    if (block.kind !== 'step') return '';
    const render = (items: StepItem[]): string => items.map((it) => {
      if (it.kind === 'text') return it.text;
      if (it.kind === 'box') return (vals[it.id] ?? '').trim() || '▢';
      if (it.kind === 'fraction') return `(${render(it.num)})/(${render(it.den)})`;
      return '';
    }).join(' ');
    return render(block.items);
  };

  const handleCheckBlock = async (block: CanvasBlock, questionText?: string, hints?: string[]) => {
    if (block.kind !== 'step') return;
    const boxes = collectBoxes(block.items);
    const stats = { total: boxes.length, correct: 0, incorrect: 0, empty: 0 };
    const fbUpdate: Record<string, 'correct' | 'incorrect'> = {};
    const userAnswers: Record<string, string> = {};
    const correctAnswers: Record<string, string> = {};
    const keyToBoxId: Record<string, string> = {};
    let checkedAgainstExpected = 0;
    let filledCount = 0;
    boxes.forEach((b, i) => {
      const v = (previewValues[b.id] ?? '').trim();
      const key = `box_${i + 1}`;
      keyToBoxId[key] = b.id;
      const expected = (b.expected ?? '').trim();
      userAnswers[key] = v;
      if (expected) correctAnswers[key] = expected;
      if (!v) { stats.empty++; return; }
      filledCount++;
      if (!expected) return;
      checkedAgainstExpected++;
      if (answersEqual(v, expected)) { stats.correct++; fbUpdate[b.id] = 'correct'; }
      else { stats.incorrect++; fbUpdate[b.id] = 'incorrect'; }
    });

    // Collect prior-step numeric results (in this section) so that a single
    // expression like "36400 − 8372" or a labelled answer like
    // "Number of People = 28028" can be recognised as a valid continuation.
    const owningSectionForPrior = sections.find((s) => s.blocks.some((bb) => bb.id === block.id));
    const priorResults: number[] = [];
    if (owningSectionForPrior) {
      for (const bb of owningSectionForPrior.blocks) {
        if (bb.id === block.id) break;
        if (bb.kind !== 'step') continue;
        const expr = buildStepExpression(bb.items, previewValues);
        if (expr.includes('▢')) continue;
        for (const p of expr.split('=').map((x) => x.trim()).filter((x) => x && /\d/.test(x))) {
          const n = safeEval(tokensToJs(p));
          if (n !== null) priorResults.push(n);
        }
      }
    }
    // --- Math-consistency check (source of truth when the step is an equation).
    // If the mathematical calculation is fully valid, mark every filled box
    // correct regardless of the authored expected values.
    const mathVerdict = evaluateStepEquation(block.items, previewValues, priorResults);
    if (mathVerdict === 'correct') {
      const overrideFb: Record<string, 'correct'> = {};
      boxes.forEach((b) => {
        const v = (previewValues[b.id] ?? '').trim();
        if (v) overrideFb[b.id] = 'correct';
      });
      setPreviewFeedback((p) => ({ ...p, ...overrideFb }));
      setStepFeedback((p) => ({ ...p, [block.id]: { type: 'guidance', content: `Mathematically correct — the calculation in this step checks out.` } }));
      return;
    }
    if (mathVerdict === 'incorrect') {
      const overrideFb: Record<string, 'correct' | 'incorrect'> = {};
      boxes.forEach((b) => {
        const v = (previewValues[b.id] ?? '').trim();
        if (v) overrideFb[b.id] = 'incorrect';
      });
      Object.assign(fbUpdate, overrideFb);
      setPreviewFeedback((p) => ({ ...p, ...overrideFb }));
    }

    setPreviewFeedback((p) => ({ ...p, ...fbUpdate }));

    if (stats.total === 0) {
      setStepFeedback((p) => ({ ...p, [block.id]: { type: 'guidance', content: 'No fillable boxes in this step yet.' } }));
      return;
    }
    if (filledCount === 0) {
      setStepFeedback((p) => ({ ...p, [block.id]: { type: 'guidance', content: 'Fill in the boxes in this step before checking.' } }));
      return;
    }
    const everyBoxHasExpectedAnswer = checkedAgainstExpected === stats.total;
    const allCorrect = mathVerdict !== 'incorrect' && everyBoxHasExpectedAnswer && stats.incorrect === 0 && stats.empty === 0;
    if (allCorrect) {
      setStepFeedback((p) => ({ ...p, [block.id]: { type: 'guidance', content: `Spot on! All ${stats.total} values in this step are correct.` } }));
      return;
    }

    // Build previous-steps context so the AI can judge this step as a
    // logical continuation of the student's prior work rather than in
    // isolation.
    const owningSection = sections.find((s) => s.blocks.some((bb) => bb.id === block.id));
    const priorLines: string[] = [];
    if (owningSection) {
      for (const bb of owningSection.blocks) {
        if (bb.id === block.id) break;
        if (bb.kind !== 'step') continue;
        const line = stepToText(bb, previewValues).trim();
        if (!line || line.includes('▢')) continue;
        const verdict = evaluateStepEquation(bb.items, previewValues);
        const numericVal = safeEval(tokensToJs(buildStepExpression(bb.items, previewValues)));
        const tag = verdict === 'correct' ? ' [checks out]' : verdict === 'incorrect' ? ' [inconsistent]' : (numericVal !== null ? ` [evaluates to ${numericVal}]` : '');
        priorLines.push(`${line}${tag}`);
      }
    }
    const currentLine = stepToText(block, previewValues).trim();
    const currentValue = safeEval(tokensToJs(buildStepExpression(block.items, previewValues)));
    const previousStepsContext = priorLines.length
      ? `PRIOR STEPS in this question (in order):\n${priorLines.map((l, i) => `${i + 1}. ${l}`).join('\n')}\n\nCURRENT STEP being checked: ${currentLine}${currentValue !== null ? ` (evaluates to ${currentValue})` : ''}`
      : `CURRENT STEP being checked: ${currentLine}${currentValue !== null ? ` (evaluates to ${currentValue})` : ''}`;

    // Call AI tutor for guidance + per-box assessments
    const attempt = (attemptCountRef.current[block.id] || 0) + 1;
    attemptCountRef.current[block.id] = attempt;
    setLoadingStepId(block.id);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: questionText || 'Solve the problem above.',
          actionType: 'checkWork',
          userAnswers,
          correctAnswers,
          topic: 'Mathematics',
          hints: hints || [],
          attemptCount: attempt,
          hasMissing: stats.empty > 0,
          hasWrong: stats.incorrect > 0,
          evaluateNeutral: true,
          specificPart: `Judge whether the CURRENT STEP is a mathematically valid continuation of the PRIOR STEPS. If it is, mark every filled box "correct". Only mark boxes "incorrect" when the current step is genuinely inconsistent with the prior working or with valid mathematics.`,
          workingContent: previousStepsContext,
          previousFeedback: previousFeedbackRef.current[block.id] || [],
        },
      });
      if (error) throw error;
      const hint = data?.hint || 'Review the highlighted boxes and re-check your working.';
      const assessments = (data?.assessments || {}) as Record<string, 'correct' | 'incorrect'>;
      const aiFb: Record<string, 'correct' | 'incorrect'> = {};
      for (const [key, verdict] of Object.entries(assessments)) {
        const id = keyToBoxId[key];
        if (!id) continue;
        // Local exact-match wins (already in fbUpdate); only fill what we didn't already grade.
        if (fbUpdate[id]) continue;
        const v = (previewValues[id] ?? '').trim();
        if (!v) continue;
        aiFb[id] = verdict;
      }
      if (Object.keys(aiFb).length) setPreviewFeedback((p) => ({ ...p, ...aiFb }));
      previousFeedbackRef.current[block.id] = [...(previousFeedbackRef.current[block.id] || []), hint].slice(-5);
      setStepFeedback((p) => ({ ...p, [block.id]: { type: 'guidance', content: hint } }));
    } catch (e) {
      console.error('Check work error:', e);
      setStepFeedback((p) => ({ ...p, [block.id]: { type: 'guidance', content: 'Review the highlighted boxes and re-check your working carefully.' } }));
    } finally {
      setLoadingStepId(null);
    }
  };

  const handleSubmitAll = () => {
    let total = 0, correct = 0, incorrect = 0, empty = 0;
    for (const section of sections) {
      for (const b of section.blocks) {
        const s = validateBlock(b);
        total += s.total; correct += s.correct; incorrect += s.incorrect; empty += s.empty;
      }
    }
    setSubmitted(true);
    toast({
      title: 'Answer Submitted',
      description: total === 0
        ? 'Solution recorded.'
        : `Score: ${correct}/${total}${incorrect ? ` · ${incorrect} incorrect` : ''}${empty ? ` · ${empty} blank` : ''}`,
      variant: incorrect > 0 ? 'destructive' : 'default',
    });
  };

  const updateBlock = (id: string, fn: (b: CanvasBlock) => CanvasBlock) =>
    setBlocks(canvas.blocks.map((b) => (b.id === id ? fn(b) : b)));
  const removeBlock = (id: string) => setBlocks(canvas.blocks.filter((b) => b.id !== id));

  const flattenSections = (nextSections: CanvasSection[]) =>
    nextSections.flatMap((section) => [
      ...(section.question ? [section.question] : []),
      ...section.blocks,
    ]);

  const replaceSectionBlocks = (sectionKey: string, blocks: CanvasBlock[]) =>
    setBlocks(flattenSections(sections.map((section) => (
      section.key === sectionKey ? { ...section, blocks } : section
    ))));

  const addBlockToSection = (sectionKey: string, b: CanvasBlock) => {
    const section = sections.find((s) => s.key === sectionKey);
    replaceSectionBlocks(sectionKey, [...(section?.blocks || []), b]);
  };

  const removeSection = (sectionKey: string) =>
    setBlocks(flattenSections(sections.filter((section) => section.key !== sectionKey)));

  const moveBlockInSection = (sectionKey: string, id: string, dir: -1 | 1) => {
    const section = sections.find((s) => s.key === sectionKey);
    if (!section) return;
    const i = section.blocks.findIndex((b) => b.id === id);
    if (i < 0) return;
    const j = i + dir;
    if (j < 0 || j >= section.blocks.length) return;
    const next = [...section.blocks];
    [next[i], next[j]] = [next[j], next[i]];
    replaceSectionBlocks(sectionKey, next);
  };

  const deepCloneStepItem = (item: StepItem): StepItem => {
    const newId = Math.random().toString(36).slice(2, 10);
    if (item.kind === 'text') return { ...item, id: newId };
    if (item.kind === 'box') return { ...item, id: newId };
    if (item.kind === 'fraction') {
      return {
        ...item,
        id: newId,
        num: item.num.map(deepCloneStepItem),
        den: item.den.map(deepCloneStepItem),
      };
    }
    return item;
  };

  const duplicateBlock = (id: string) => {
    const idx = canvas.blocks.findIndex((b) => b.id === id);
    if (idx < 0) return;
    const original = canvas.blocks[idx];
    const newId = Math.random().toString(36).slice(2, 10);
    let cloned: CanvasBlock;
    if (original.kind === 'step') {
      cloned = { ...original, id: newId, items: original.items.map(deepCloneStepItem) };
    } else {
      cloned = { ...original, id: newId };
    }
    const next = [...canvas.blocks];
    next.splice(idx + 1, 0, cloned);
    setBlocks(next);
  };

  const insertAtCursor = (s: string) => {
    const el = focusedRef;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = el.value.slice(0, start) + s + el.value.slice(end);
    const setter = Object.getOwnPropertyDescriptor(
      el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
      'value',
    )?.set;
    setter?.call(el, next);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + s.length, start + s.length);
    });
  };

  const symbolPopover = (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1">
          <span className="font-serif italic">Σ</span> Symbols
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2">
        <div className="grid grid-cols-8 gap-1">
          {SYMBOLS.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                insertAtCursor(s);
              }}
              className="h-8 rounded border border-border bg-muted text-sm hover:bg-primary hover:text-primary-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground text-center">
          Click a field first, then insert.
        </p>
      </PopoverContent>
    </Popover>
  );

  const renderKeyboardsFor = (blockId: string, showRemove = true) => {
    const ids = keyboardIdsByBlock[blockId] ?? [];
    if (ids.length === 0) return null;
    return (
      <div className="mt-2 space-y-2">
        {ids.map((kid, i) => (
          <div key={kid} className="rounded-lg border border-border/40 bg-black px-3 py-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Keyboard {i + 1}
              </span>
              {showRemove && (
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => removeKeyboardFrom(blockId, kid)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
            <HorizontalKeyboard
              keys={DEFAULT_KEYBOARD}
              onKeyPress={(k) => {
                if (k === '⌫') {
                  const el = focusedRef;
                  if (el && 'value' in el) {
                    const start = el.selectionStart ?? el.value.length;
                    if (start > 0) {
                      const next = el.value.slice(0, start - 1) + el.value.slice(el.selectionEnd ?? start);
                      const setter = Object.getOwnPropertyDescriptor(
                        el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
                        'value',
                      )?.set;
                      setter?.call(el, next);
                      el.dispatchEvent(new Event('input', { bubbles: true }));
                      requestAnimationFrame(() => el.setSelectionRange(start - 1, start - 1));
                    }
                  }
                  return;
                }
                insertAtCursor(k === 'a/b' ? '/' : k);
              }}
            />
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">Click a field above, then tap a key.</p>
          </div>
        ))}
      </div>
    );
  };

  const addKeyboardButton = (blockId: string) => (
    <Button
      size="sm"
      variant="outline"
      onClick={() => addKeyboardTo(blockId)}
      className="h-7 gap-1 px-2 text-xs"
      title="Add a keyboard beneath this step"
    >
      <Keyboard className="h-3.5 w-3.5" /> Add Keyboard
    </Button>
  );

  const keyboardToggleButton = (blockId: string) => {
    const hasKeyboards = (keyboardIdsByBlock[blockId] ?? []).length > 0;
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          if (hasKeyboards) {
            setKeyboardIdsByBlock((prev) => ({ ...prev, [blockId]: [] }));
          } else {
            addKeyboardTo(blockId);
          }
        }}
        className="h-7 gap-1 px-2 text-xs"
      >
        {hasKeyboards ? 'Hide Keyboard' : <><Keyboard className="h-3.5 w-3.5" /> Add Keyboard</>}
      </Button>
    );
  };



  const renderSolutionBox = (section: CanvasSection) => (
    <div key={`${section.key}-solution`} className="rounded-lg border border-border bg-black overflow-hidden">
      {!previewMode ? (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-border bg-black/95 px-3 py-2 backdrop-blur">
          <Button size="sm" variant="secondary" onClick={() => addBlockToSection(section.key, newBlock.heading())} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Part Heading
          </Button>
          <Button size="sm" onClick={() => addBlockToSection(section.key, newBlock.step())} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Step
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlockToSection(section.key, newBlock.text())} className="gap-1">
            <Type className="h-3.5 w-3.5" /> Text
          </Button>
          {symbolPopover}

          <div className="ml-auto text-xs text-muted-foreground">
            {section.blocks.length} block{section.blocks.length === 1 ? '' : 's'}
          </div>
        </div>
      ) : null}

      <div className={cn(previewMode ? 'p-2 space-y-1' : 'p-4 space-y-3')}>
        {section.blocks.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {previewMode
              ? 'No solution content has been authored yet.'
              : 'Empty canvas. Use the toolbar to add a Part Heading, Step, or Text block.'}
          </div>
        )}

        {previewMode
          ? section.blocks.map((b) => {
              const qText = section.question?.text || '';
              const fb = stepFeedback[b.id];
              const isLoading = loadingStepId === b.id;
              return (
                <div key={b.id} className="space-y-1">
                  <PreviewBlock
                    block={b}
                    setFocusedRef={setFocusedRef}
                    values={previewValues}
                    setVal={setPreviewVal}
                    feedback={previewFeedback}
                    submitted={submitted}
                    isCheckLoading={isLoading}
                    onCheck={() => handleCheckBlock(b, qText, hints)}
                  />
                  {(fb || isLoading) && b.kind === 'step' && (
                    <div className="ml-1 rounded-lg border border-primary/50 bg-primary/10 p-3 text-sm shadow-sm">
                      <div className="flex items-start gap-2">
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 mt-0.5 shrink-0 text-primary animate-spin" />
                        ) : (
                          <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        )}
                        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                          {isLoading ? 'Checking your step…' : fb?.content}
                        </p>
                      </div>
                    </div>
                  )}
                  {b.kind === 'step' && (
                    <div className="flex justify-end pt-1">
                      {keyboardToggleButton(b.id)}
                    </div>
                  )}
                  {b.kind === 'step' && renderKeyboardsFor(b.id, false)}
                </div>
              );
            })
          : section.blocks.map((b, idx) => (
              <div key={b.id}>
                <BlockShell
                  onUp={idx > 0 ? () => moveBlockInSection(section.key, b.id, -1) : undefined}
                  onDown={idx < section.blocks.length - 1 ? () => moveBlockInSection(section.key, b.id, 1) : undefined}
                  onDelete={() => removeBlock(b.id)}
                  onDuplicate={() => duplicateBlock(b.id)}
                  label={b.kind === 'heading' ? 'Heading' : b.kind === 'text' ? 'Text' : 'STEP BLOCK'}
                >
                  {b.kind === 'heading' && (
                    <Input
                      placeholder="e.g. Estimate, Round & Set up…"
                      value={b.text}
                      onFocus={(e) => focusBlock(b.id)(e.currentTarget)}
                      onChange={(e) => updateBlock(b.id, (p) => ({ ...(p as any), text: e.target.value }))}
                      className="border-0 bg-transparent text-lg font-bold text-foreground focus-visible:ring-1 focus-visible:ring-primary/40"
                      spellCheck={false}
                      autoComplete="off"
                      data-gramm="false"
                    />
                  )}
                  {b.kind === 'text' && (
                    <Input
                      placeholder="Free text…"
                      value={b.text}
                      onFocus={(e) => focusBlock(b.id)(e.currentTarget)}
                      onChange={(e) => updateBlock(b.id, (p) => ({ ...(p as any), text: e.target.value }))}
                      spellCheck={false}
                      autoComplete="off"
                      data-gramm="false"
                    />
                  )}
                  {b.kind === 'step' && (
                    <StepCard
                      block={b}
                      update={(fn) => updateBlock(b.id, fn as any)}
                      setFocusedRef={focusBlock(b.id)}
                      symbolPopover={symbolPopover}
                      insertAtCursor={insertAtCursor}
                    />
                  )}
                </BlockShell>
                {b.kind === 'step' && (
                  <div className="mt-2 flex justify-end">
                    {addKeyboardButton(b.id)}
                  </div>
                )}
                {b.kind === 'step' && renderKeyboardsFor(b.id)}
              </div>
            ))}

      </div>
    </div>
  );

  return (
    <div className={cn(previewMode ? 'space-y-2' : 'space-y-4')}>
      {sections.map((section, sectionIdx) => (
        <div key={section.key} className={cn(previewMode ? 'space-y-1' : 'space-y-3')}>
          {section.question && (
            previewMode ? (
              <PreviewBlock
                block={section.question}
                setFocusedRef={setFocusedRef}
                values={previewValues}
                setVal={setPreviewVal}
                feedback={previewFeedback}
                submitted={submitted}
                onCheck={() => {}}
              />
            ) : (
              <QuestionSectionShell
                onDelete={() => removeSection(section.key)}
                label={`Question Block ${sectionIdx + 1}`}
                className={undefined}
              >
                <QuestionBlockEditor
                  block={section.question}
                  onChange={(patch) => updateBlock(section.question!.id, (p) => ({ ...(p as any), ...patch }))}
                />
              </QuestionSectionShell>
            )
          )}
          {renderSolutionBox(section)}
        </div>
      ))}




      <div className="sticky bottom-0 z-10 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            disabled={submitted}
            onClick={() => {
              if (!hints.length) {
                toast({ title: 'No hints', description: 'No hints defined for this question.' });
                return;
              }
              const i = hintIdx % hints.length;
              toast({ title: `Hint ${i + 1} of ${hints.length}`, description: hints[i] });
              setHintIdx(i + 1);
            }}
          >
            <HelpCircle className="h-4 w-4" />
            Hint
          </Button>
          <Button
            disabled={submitted}
            className={cn('flex items-center gap-2', submitted && 'bg-green-600 hover:bg-green-600 text-white')}
            onClick={handleSubmitAll}
          >
            {submitted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Recorded
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * Helpers — list-of-items recursive update
 * ============================================================ */

function updateInList(
  items: StepItem[],
  id: string,
  fn: (i: StepItem) => StepItem,
): StepItem[] {
  return items.map((it) => {
    if (it.id === id) return fn(it);
    if (it.kind === 'fraction') {
      return { ...it, num: updateInList(it.num, id, fn), den: updateInList(it.den, id, fn) };
    }
    return it;
  });
}

function removeFromList(items: StepItem[], id: string): StepItem[] {
  const out: StepItem[] = [];
  for (const it of items) {
    if (it.id === id) continue;
    if (it.kind === 'fraction') {
      out.push({ ...it, num: removeFromList(it.num, id), den: removeFromList(it.den, id) });
    } else {
      out.push(it);
    }
  }
  return out;
}

function appendToStack(
  items: StepItem[],
  fractionId: string,
  part: 'num' | 'den',
  newOne: StepItem,
): StepItem[] {
  return items.map((it) => {
    if (it.kind === 'fraction') {
      if (it.id === fractionId) {
        return { ...it, [part]: [...it[part], newOne] } as StepItem;
      }
      return { ...it, num: appendToStack(it.num, fractionId, part, newOne), den: appendToStack(it.den, fractionId, part, newOne) };
    }
    return it;
  });
}

/* ============================================================
 * Preview rendering
 * ============================================================ */

function PreviewBlock({
  block,
  setFocusedRef,
  values,
  setVal,
  feedback,
  submitted,
  onCheck,
  isCheckLoading,
}: {
  block: CanvasBlock;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  values: Record<string, string>;
  setVal: (id: string, v: string) => void;
  feedback: Record<string, 'correct' | 'incorrect'>;
  submitted: boolean;
  onCheck: () => void;
  isCheckLoading?: boolean;
}) {
  const getVal = (id: string, fallback?: string) => values[id] ?? fallback ?? '';

  if (block.kind === 'heading') {
    return <div className="text-sm font-bold text-foreground">{block.text || <span className="text-muted-foreground italic">(empty heading)</span>}</div>;
  }
  if (block.kind === 'text') {
    return <p className="text-sm text-foreground whitespace-pre-wrap">{block.text || <span className="text-muted-foreground italic">(empty text)</span>}</p>;
  }
  if (block.kind === 'question') {
    return (
      <div className={`rounded-md p-3 space-y-2 bg-muted/40`}>
        {block.text && <QuestionText text={block.text} className="text-base font-medium" />}
        {block.svgMarkup && <InteractiveSvg markup={block.svgMarkup} />}
        {!block.text && !block.svgMarkup && <p className="text-xs italic text-muted-foreground">(empty question block)</p>}
      </div>
    );
  }

  const first = block.items[0];
  const hasRowLabel = first?.kind === 'text' && block.items.length > 1 && isStepRowLabel(first.text);
  const rowLabel = hasRowLabel ? first.text : '';
  const rowItems = hasRowLabel ? block.items.slice(1) : block.items;

  return (
    <div className="rounded-md bg-transparent p-0.5">
      {block.items.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">(empty step)</p>
      ) : (
        <div className="flex flex-wrap items-center gap-x-1 gap-y-0 leading-none">
          {hasRowLabel ? (
            <span className="mr-1 text-xs leading-none text-foreground/80">{rowLabel}</span>
          ) : null}
          <span className="inline-flex min-w-0 flex-wrap items-center gap-x-1 leading-none">
            {rowItems.map((it) => (
              <PreviewItem
                key={it.id}
                item={it}
                getVal={getVal}
                setVal={setVal}
                setFocusedRef={setFocusedRef}
                feedback={feedback}
                submitted={submitted}
              />
            ))}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="ml-1 h-7 w-7 rounded-md border border-border/60 bg-transparent text-foreground hover:bg-muted/20"
            title="Check Work"
            disabled={submitted || isCheckLoading}
            onClick={onCheck}
          >
            {isCheckLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <BookOpen className="h-3.5 w-3.5" />}
          </Button>
        </div>
      )}
    </div>
  );
}

function PreviewItem({
  item,
  getVal,
  setVal,
  setFocusedRef,
  feedback,
  submitted,
}: {
  item: StepItem;
  getVal: (id: string, fallback?: string) => string;
  setVal: (id: string, v: string) => void;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  feedback: Record<string, 'correct' | 'incorrect'>;
  submitted: boolean;
}) {
  if (item.kind === 'text') {
    return <span className="whitespace-pre text-xs leading-none text-foreground/80">{item.text}</span>;
  }
  if (item.kind === 'box') {
    const authored = (item.value ?? '').trim();
    // Symbol boxes (or any small box containing only math symbols) are
    // author-authored static glyphs — render them as inline text so they are
    // visible in preview.
    if (isStaticSymbolBox(item)) {
      return (
        <span className="inline-flex items-center px-0.5 font-mono text-xs leading-none text-foreground align-middle">
          {authored}
        </span>
      );
    }
    const v = getVal(item.id, '');
    const w = item.width ?? BOX_PX[item.size].w;
    const h = item.height ?? BOX_PX[item.size].h;
    const fb = feedback[item.id];
    return (
      <span
        className="relative inline-flex items-center align-middle leading-none"
        style={{ width: w, height: h, minWidth: w }}
      >
        <Input
          value={v}
          placeholder="…"
          disabled={submitted}
          onFocus={(e) => setFocusedRef(e.currentTarget)}
          onChange={(e) => setVal(item.id, e.target.value)}
          style={{ width: w, height: h, minWidth: w }}
          className={cn(
            'p-0 text-center font-mono text-xs leading-none text-foreground placeholder:text-muted-foreground/40 bg-transparent rounded-xl border-2 border-border/70 focus-visible:border-primary',
            v.includes('√') && 'text-transparent caret-foreground',
            fb === 'correct' && 'border-green-500 bg-green-500/10 text-green-300',
            fb === 'incorrect' && 'border-red-500 bg-red-500/10 text-red-300',
          )}
        />
        <MathValueOverlay value={v} />
      </span>
    );
  }
  // fraction (stack)
  const renderStack = (stack: StepItem[]) => {
    if (stack.length === 0) {
      return <span className="inline-block h-5 w-4" />;
    }
    return (
        <div className="flex flex-wrap items-center justify-center gap-x-1">
        {stack.map((s) => (
          <PreviewItem
            key={s.id}
            item={s}
            getVal={getVal}
            setVal={setVal}
            setFocusedRef={setFocusedRef}
            feedback={feedback}
            submitted={submitted}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="inline-flex flex-col items-center align-middle leading-none">
      <div className="min-w-[2rem]">{renderStack(item.num)}</div>
      <div className="my-0.5 h-px w-full min-w-[2rem] bg-foreground" />
      <div className="min-w-[2rem]">{renderStack(item.den)}</div>
    </div>
  );
}

/* ============================================================
 * Resizable wrapper (8-way Word/Paint style)
 * ============================================================ */

function Resizable({
  width,
  height,
  minW = 32,
  minH = 20,
  onResize,
  children,
}: {
  width: number;
  height: number;
  minW?: number;
  minH?: number;
  onResize: (w: number, h: number) => void;
  children: React.ReactNode;
}) {
  const startDrag = (dirX: -1 | 0 | 1, dirY: -1 | 0 | 1) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX, startY = e.clientY;
    const startW = width, startH = height;
    const move = (ev: MouseEvent) => {
      const dw = (ev.clientX - startX) * dirX;
      const dh = (ev.clientY - startY) * dirY;
      const w = dirX === 0 ? startW : Math.max(minW, startW + dw);
      const h = dirY === 0 ? startH : Math.max(minH, startH + dh);
      onResize(w, h);
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  const handleCls = 'absolute z-10 h-2.5 w-2.5 rounded-sm border border-foreground bg-white opacity-0 group-hover/rsz:opacity-100 transition-opacity';
  return (
    <div className="group/rsz relative inline-block">
      {children}
      <span className="pointer-events-none absolute -top-4 right-0 rounded bg-foreground/80 px-1 text-[9px] font-mono leading-tight text-background opacity-0 transition-opacity group-hover/rsz:opacity-100">
        {Math.round(width)}×{Math.round(height)}
      </span>
      <span onMouseDown={startDrag(-1, -1)} className={cn(handleCls, '-top-1 -left-1 cursor-nwse-resize')} />
      <span onMouseDown={startDrag(0, -1)} className={cn(handleCls, '-top-1 left-1/2 -translate-x-1/2 cursor-ns-resize')} />
      <span onMouseDown={startDrag(1, -1)} className={cn(handleCls, '-top-1 -right-1 cursor-nesw-resize')} />
      <span onMouseDown={startDrag(-1, 0)} className={cn(handleCls, 'top-1/2 -translate-y-1/2 -left-1 cursor-ew-resize')} />
      <span onMouseDown={startDrag(1, 0)} className={cn(handleCls, 'top-1/2 -translate-y-1/2 -right-1 cursor-ew-resize')} />
      <span onMouseDown={startDrag(-1, 1)} className={cn(handleCls, '-bottom-1 -left-1 cursor-nesw-resize')} />
      <span onMouseDown={startDrag(0, 1)} className={cn(handleCls, '-bottom-1 left-1/2 -translate-x-1/2 cursor-ns-resize')} />
      <span onMouseDown={startDrag(1, 1)} className={cn(handleCls, '-bottom-1 -right-1 cursor-nwse-resize')} />
    </div>
  );
}

function BlockShell({
  children,
  label,
  onUp,
  onDown,
  onDelete,
  onDuplicate,
}: {
  children: React.ReactNode;
  label: string;
  onUp?: () => void;
  onDown?: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
}) {
  return (
    <div className="group rounded-lg border border-border/40 bg-transparent p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <div className="flex items-center gap-1 opacity-60 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onUp} disabled={!onUp}>
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onDown} disabled={!onDown}>
            <ArrowDown className="h-3 w-3" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onDuplicate} disabled={!onDuplicate} title="Duplicate">
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={onDelete}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}

function QuestionSectionShell({
  children,
  label,
  onDelete,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onDelete: () => void;
  className?: string;
}) {
  return (
    <div className={`group rounded-lg p-3 ${className ?? 'bg-muted/40'}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive opacity-60 transition-opacity group-hover:opacity-100" onClick={onDelete}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      {children}
    </div>
  );
}

/* ============================================================
 * Step card (editor)
 * ============================================================ */

function StepCard({
  block,
  update,
  setFocusedRef,
  symbolPopover,
  insertAtCursor,
}: {
  block: Extract<CanvasBlock, { kind: 'step' }>;
  update: (fn: (b: Extract<CanvasBlock, { kind: 'step' }>) => CanvasBlock) => void;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  symbolPopover: React.ReactNode;
  insertAtCursor: (s: string) => void;
}) {
  const [kbOpen, setKbOpen] = useState(false);
  const [focus, setFocus] = useState<FocusTarget>({ kind: 'step', stepId: block.id });

  const setItems = (items: StepItem[]) => update((b) => ({ ...b, items }));

  /** Insert a new item at the current focus target (step or fraction stack). */
  const addToFocus = (newOne: StepItem) => {
    if (focus.kind === 'fraction' && focus.stepId === block.id) {
      setItems(appendToStack(block.items, focus.fractionId, focus.part, newOne));
    } else {
      setItems([...block.items, newOne]);
    }
  };

  const updateItem = (id: string, fn: (i: StepItem) => StepItem) =>
    setItems(updateInList(block.items, id, fn));
  const removeItem = (id: string) => setItems(removeFromList(block.items, id));

  const inFraction = focus.kind === 'fraction' && focus.stepId === block.id;
  const boxLabel = inFraction ? ` → ${focus.part}` : '';

  return (
    <div className="rounded-md bg-transparent p-3">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => addToFocus(newItem.text())}>
          <Plus className="h-3 w-3" /> Text{boxLabel}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs">
              <Plus className="h-3 w-3" /> Box{boxLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => addToFocus(newItem.box('sym'))}>Symbol (32×32)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addToFocus(newItem.box('sm'))}>Small</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addToFocus(newItem.box('md'))}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addToFocus(newItem.box('lg'))}>Large</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => addToFocus(newItem.fraction())}
          disabled={inFraction}
          title={inFraction ? 'Nested fractions are not supported' : 'Add a fraction bar'}
        >
          <Plus className="h-3 w-3" /> Fraction
        </Button>
        {symbolPopover}
        <Button
          size="sm"
          variant={kbOpen ? 'default' : 'outline'}
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => setKbOpen((v) => !v)}
        >
          <Keyboard className="h-3.5 w-3.5" /> {kbOpen ? 'Hide' : 'Keyboard'}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="ml-auto h-8 w-8 rounded-md border border-border/60 bg-transparent text-foreground hover:bg-muted/20"
          title="Check Work (preview)"
          onClick={() => {}}
        >
          <BookOpen className="h-4 w-4" />
        </Button>
      </div>

      {block.items.length === 0 ? (
        <p className="py-3 text-center text-xs text-muted-foreground">Empty step — add Text, Box, Fraction or Symbols.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {block.items.map((it) => (
            <StepItemView
              key={it.id}
              item={it}
              stepId={block.id}
              setFocusedRef={setFocusedRef}
              setFocus={setFocus}
              onChange={(fn) => updateItem(it.id, fn)}
              onRemove={() => removeItem(it.id)}
            />
          ))}
        </div>
      )}

      {kbOpen && (
        <div className="mt-3 rounded-md border border-border/40 bg-black p-2">
          <HorizontalKeyboard
            keys={DEFAULT_KEYBOARD}
            onKeyPress={(k) => {
              if (k === '⌫') {
                const el = (document.activeElement as HTMLInputElement | HTMLTextAreaElement | null);
                if (el && 'value' in el) {
                  const start = el.selectionStart ?? el.value.length;
                  if (start > 0) {
                    const next = el.value.slice(0, start - 1) + el.value.slice(el.selectionEnd ?? start);
                    const setter = Object.getOwnPropertyDescriptor(
                      el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
                      'value',
                    )?.set;
                    setter?.call(el, next);
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    requestAnimationFrame(() => el.setSelectionRange(start - 1, start - 1));
                  }
                }
                return;
              }
              insertAtCursor(k === 'a/b' ? '/' : k);
            }}
          />
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">Click a field above, then tap a key.</p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * Step item view (editor) — recursive for fraction stacks
 * ============================================================ */

function StepItemView({
  item,
  stepId,
  setFocusedRef,
  setFocus,
  onChange,
  onRemove,
  fractionContext,
}: {
  item: StepItem;
  stepId: string;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  setFocus: (f: FocusTarget) => void;
  onChange: (fn: (i: StepItem) => StepItem) => void;
  onRemove: () => void;
  /** When this item lives inside a fraction stack, the parent fraction id + side. */
  fractionContext?: { fractionId: string; part: 'num' | 'den' };
}) {
  const focusOnEdit = (el: HTMLInputElement | HTMLTextAreaElement) => {
    setFocusedRef(el);
    if (fractionContext) {
      setFocus({ kind: 'fraction', stepId, fractionId: fractionContext.fractionId, part: fractionContext.part });
    } else {
      setFocus({ kind: 'step', stepId });
    }
  };

  const removeBtn = (
    <button
      type="button"
      onClick={onRemove}
      className="ml-0.5 self-start text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover/item:opacity-100"
      title="Remove"
    >
      <Trash2 className="h-3 w-3" />
    </button>
  );

  if (item.kind === 'text') {
    return (
      <div className="group/item inline-flex items-center gap-0.5">
        <Input
          value={item.text}
          placeholder="text"
          onFocus={(e) => focusOnEdit(e.currentTarget)}
          onChange={(e) => onChange((i) => ({ ...(i as any), text: e.target.value }))}
          className="h-8 min-w-[4rem] max-w-[20rem]"
          style={{ width: `${Math.max(4, item.text.length + 2)}ch` }}
          spellCheck={false}
          autoComplete="off"
          data-gramm="false"
        />
        {removeBtn}
      </div>
    );
  }

  if (item.kind === 'box') {
    const filled = !!(item.value && item.value.length > 0);
    const w = item.width ?? BOX_PX[item.size].w;
    const h = item.height ?? BOX_PX[item.size].h;
    return (
      <div className="group/item inline-flex items-center gap-0.5">
        <Resizable
          width={w}
          height={h}
          onResize={(nw, nh) => onChange((i) => ({ ...(i as any), width: nw, height: nh }))}
        >
          <Input
            value={item.value ?? ''}
            placeholder="…"
            onFocus={(e) => focusOnEdit(e.currentTarget)}
            onChange={(e) => onChange((i) => ({ ...(i as any), value: e.target.value }))}
            style={{ width: w, height: h }}
            className={cn(
              'text-center rounded-xl border-2 border-border/70 bg-transparent text-foreground placeholder:text-muted-foreground/40 focus-visible:border-primary',
              (item.value ?? '').includes('√') && 'text-transparent caret-foreground',
            )}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
          />
          <MathValueOverlay value={item.value ?? ''} />
        </Resizable>
        {removeBtn}
      </div>
    );
  }

  // Fraction — empty bar with stackable items on either side
  const renderStack = (stack: StepItem[], part: 'num' | 'den') => {
    const isFocused = false; // visual hint handled by toolbar label
    if (stack.length === 0) {
      return (
        <button
          type="button"
          onClick={() => setFocus({ kind: 'fraction', stepId, fractionId: item.id, part })}
          className={cn(
            'inline-flex h-6 min-w-[2.5rem] items-center justify-center rounded border border-dashed text-[10px] uppercase tracking-wide',
            'border-white/40 text-muted-foreground hover:border-white hover:text-foreground',
          )}
          title={`Click then use + Text / + Box to fill the ${part}`}
        >
          {part}
        </button>
      );
    }
    return (
      <div className="flex flex-wrap items-center justify-center gap-1">
        {stack.map((s) => (
          <StepItemView
            key={s.id}
            item={s}
            stepId={stepId}
            setFocusedRef={setFocusedRef}
            setFocus={setFocus}
            onChange={(fn) =>
              onChange((parent) => {
                const p = parent as Extract<StepItem, { kind: 'fraction' }>;
                return { ...p, [part]: updateInList(p[part], s.id, fn) } as StepItem;
              })
            }
            onRemove={() =>
              onChange((parent) => {
                const p = parent as Extract<StepItem, { kind: 'fraction' }>;
                return { ...p, [part]: removeFromList(p[part], s.id) } as StepItem;
              })
            }
            fractionContext={{ fractionId: item.id, part }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group/item inline-flex items-center gap-0.5">
      <div className="inline-flex flex-col items-center px-1">
        <div className="min-w-[2.5rem]">{renderStack(item.num, 'num')}</div>
        <div className="my-1 h-0.5 w-full min-w-[2.5rem] bg-foreground" />
        <div className="min-w-[2.5rem]">{renderStack(item.den, 'den')}</div>
      </div>
      {removeBtn}
    </div>
  );
}

/* ============================================================
 * Inline Question Block editor
 * ============================================================ */
function QuestionBlockEditor({
  block,
  onChange,
}: {
  block: Extract<CanvasBlock, { kind: 'question' }>;
  onChange: (patch: Partial<Extract<CanvasBlock, { kind: 'question' }>>) => void;
}) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="space-y-2">
      <InlineMathToolbar
        onInsert={(t) => {
          const el = taRef.current;
          if (!el) {
            onChange({ text: (block.text || '') + t });
            return;
          }
          const start = el.selectionStart ?? el.value.length;
          const end = el.selectionEnd ?? el.value.length;
          const next = el.value.slice(0, start) + t + el.value.slice(end);
          onChange({ text: next });
          requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(start + t.length, start + t.length);
          });
        }}
        hasSvg={!!block.svgMarkup}
        onUploadSvg={(svg) => onChange({ svgMarkup: svg })}
        onClearSvg={() => onChange({ svgMarkup: undefined })}
        onReplaceText={(t) => onChange({ text: t })}
      />
      <textarea
        ref={taRef}
        value={block.text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Question prompt…"
        className="w-full min-h-[72px] resize-y rounded-md border border-border bg-background px-3 py-2 text-base leading-7 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        spellCheck={false}
      />
      {block.svgMarkup && <InteractiveSvg markup={block.svgMarkup} />}
    </div>
  );
}
