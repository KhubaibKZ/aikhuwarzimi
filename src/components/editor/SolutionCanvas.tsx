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
import { ArrowDown, ArrowUp, BookOpen, CheckCircle2, CheckSquare, Copy, HelpCircle, Keyboard, Plus, Send, Trash2, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HorizontalKeyboard } from '@/components/workspace/HorizontalKeyboard';
import { InlineMathToolbar, insertAtCaret } from '@/components/editor/InlineMathToolbar';
import { QuestionText } from '@/components/QuestionText';
import { themeSvgMarkup } from '@/lib/svgTheme';
import { InteractiveSvg } from '@/components/InteractiveSvg';
import { cn } from '@/lib/utils';

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
  const [keyboardIds, setKeyboardIds] = useState<string[]>([]);
  const addKeyboard = () => setKeyboardIds((prev) => [...prev, Math.random().toString(36).slice(2, 9)]);
  const removeKeyboard = (id: string) => setKeyboardIds((prev) => prev.filter((k) => k !== id));

  const focusBlock = (id: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    setFocusedRef(el);
  };

  const setBlocks = (blocks: CanvasBlock[]) => onChange({ ...canvas, blocks });

  const sections = useMemo(() => splitCanvasSections(canvas.blocks), [canvas.blocks]);

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

  const keyboardButton = (
    <Button
      size="sm"
      variant="outline"
      onClick={addKeyboard}
      className="gap-1"
    >
      <Keyboard className="h-3.5 w-3.5" /> Add Keyboard
    </Button>
  );


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
          {keyboardButton}
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
          ? section.blocks.map((b) => <PreviewBlock key={b.id} block={b} setFocusedRef={setFocusedRef} />)
          : section.blocks.map((b, idx) => (
              <BlockShell
                key={b.id}
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
              <PreviewBlock block={section.question} setFocusedRef={setFocusedRef} />
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

      {keyboardIds.map((kid, i) => (
        <div key={kid} className="rounded-lg border border-border/40 bg-black px-3 py-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Keyboard {i + 1}
            </span>
            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => removeKeyboard(kid)}>
              <Trash2 className="h-3 w-3" />
            </Button>
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
            onClick={() => {
              setSubmitted(true);
              toast({ title: 'Answer Submitted', description: 'Solution canvas submitted (preview).' });
            }}
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

function PreviewBlock({ block, setFocusedRef }: { block: CanvasBlock; setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void }) {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const getVal = (id: string, fallback?: string) => values[id] ?? fallback ?? '';
  const setVal = (id: string, v: string) => setValues((p) => ({ ...p, [id]: v }));

  if (block.kind === 'heading') {
    return <div className="text-lg font-bold text-foreground">{block.text || <span className="text-muted-foreground italic">(empty heading)</span>}</div>;
  }
  if (block.kind === 'text') {
    return <p className="text-sm text-foreground whitespace-pre-wrap">{block.text || <span className="text-muted-foreground italic">(empty text)</span>}</p>;
  }
  if (block.kind === 'question') {
    return (
      <div className={`rounded-md p-3 space-y-2 bg-muted/40`}>
        {block.text && <QuestionText text={block.text} className="text-sm font-medium" />}
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
            <span className="mr-0.5 text-xs leading-none text-foreground/80">{rowLabel}</span>
          ) : null}
          <span className="inline-flex min-w-0 flex-wrap items-center gap-x-1 leading-none">
            {rowItems.map((it) => (
              <PreviewItem key={it.id} item={it} getVal={getVal} setVal={setVal} setFocusedRef={setFocusedRef} />
            ))}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="ml-1 h-7 w-7 rounded-md border border-border/60 bg-transparent text-foreground hover:bg-muted/20"
            title="Check Work"
            onClick={() => toast({ title: 'Check Work', description: 'Step checked (preview).' })}
          >
            <BookOpen className="h-3.5 w-3.5" />
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
}: {
  item: StepItem;
  getVal: (id: string, fallback?: string) => string;
  setVal: (id: string, v: string) => void;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
}) {
  if (item.kind === 'text') {
    return <span className="whitespace-pre text-xs leading-none text-foreground/80">{item.text}</span>;
  }
  if (item.kind === 'box') {
    const v = getVal(item.id, item.value);
    const w = item.width ?? BOX_PX[item.size].w;
    const h = item.height ?? BOX_PX[item.size].h;
    const filled = v.trim().length > 0;
    return (
      <span
        className="relative inline-flex items-center align-middle leading-none"
        style={{ width: filled ? inlineValueWidth(v) : w, height: filled ? '0.9rem' : h, minWidth: filled ? inlineValueWidth(v) : w }}
      >
        <Input
          value={v}
          placeholder="…"
          onFocus={(e) => setFocusedRef(e.currentTarget)}
          onChange={(e) => setVal(item.id, e.target.value)}
          style={{ width: filled ? inlineValueWidth(v) : w, height: filled ? '0.9rem' : h, minWidth: filled ? inlineValueWidth(v) : w }}
          className={cn(
            'p-0 text-center font-mono text-xs leading-none text-foreground placeholder:text-muted-foreground/40',
            filled
              ? 'h-3.5 min-h-0 border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
              : 'rounded-xl border-2 border-border/70 bg-transparent focus-visible:border-primary',
            v.includes('√') && 'text-transparent caret-foreground',
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
        <div className="flex flex-wrap items-center justify-center gap-0">
        {stack.map((s) => (
          <PreviewItem key={s.id} item={s} getVal={getVal} setVal={setVal} setFocusedRef={setFocusedRef} />
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
