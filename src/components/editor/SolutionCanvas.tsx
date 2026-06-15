import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, CheckCircle2, CheckSquare, HelpCircle, Keyboard, Plus, Send, Trash2, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HorizontalKeyboard } from '@/components/workspace/HorizontalKeyboard';
import { cn } from '@/lib/utils';
import {
  BoxSize,
  CanvasBlock,
  newBlock,
  newItem,
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
  ['√', 'π', '²', '³', '°', '±', '½', '¼', '¾', '⌫'],
];

const BOX_PX: Record<BoxSize, { w: number; h: number }> = {
  sm: { w: 64, h: 32 },
  md: { w: 112, h: 32 },
  lg: { w: 192, h: 36 },
};

export function SolutionCanvas({ value, onChange, hints = [], previewMode = false }: Props) {
  const canvas = value ?? empty;
  const { toast } = useToast();
  const [hintIdx, setHintIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [focusedRef, setFocusedRef] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const setBlocks = (blocks: CanvasBlock[]) => onChange({ ...canvas, blocks });

  const addBlock = (b: CanvasBlock) => setBlocks([...canvas.blocks, b]);
  const updateBlock = (id: string, fn: (b: CanvasBlock) => CanvasBlock) =>
    setBlocks(canvas.blocks.map((b) => (b.id === id ? fn(b) : b)));
  const removeBlock = (id: string) => setBlocks(canvas.blocks.filter((b) => b.id !== id));
  const moveBlock = (id: string, dir: -1 | 1) => {
    const i = canvas.blocks.findIndex((b) => b.id === id);
    if (i < 0) return;
    const j = i + dir;
    if (j < 0 || j >= canvas.blocks.length) return;
    const next = [...canvas.blocks];
    [next[i], next[j]] = [next[j], next[i]];
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

  return (
    <div className="flex h-full flex-col">
      {!previewMode && (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-border bg-background/95 px-3 py-2 backdrop-blur">
          <Button size="sm" variant="secondary" onClick={() => addBlock(newBlock.heading())} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Part Heading
          </Button>
          <Button size="sm" onClick={() => addBlock(newBlock.step())} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Step
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock(newBlock.text())} className="gap-1">
            <Type className="h-3.5 w-3.5" /> Text
          </Button>
          {symbolPopover}
          <div className="ml-auto text-xs text-muted-foreground">
            {canvas.blocks.length} block{canvas.blocks.length === 1 ? '' : 's'}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {canvas.blocks.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {previewMode
              ? 'No solution content has been authored yet.'
              : 'Empty canvas. Use the toolbar to add a Part Heading, Step, or Text block.'}
          </div>
        )}

        {previewMode
          ? canvas.blocks.map((b) => <PreviewBlock key={b.id} block={b} />)
          : canvas.blocks.map((b, idx) => (
              <BlockShell
                key={b.id}
                onUp={idx > 0 ? () => moveBlock(b.id, -1) : undefined}
                onDown={idx < canvas.blocks.length - 1 ? () => moveBlock(b.id, 1) : undefined}
                onDelete={() => removeBlock(b.id)}
                label={b.kind === 'heading' ? 'Heading' : b.kind === 'text' ? 'Text' : 'Step'}
              >
                {b.kind === 'heading' && (
                  <Input
                    placeholder="e.g. (a) or (b)(i)"
                    value={b.text}
                    onFocus={(e) => setFocusedRef(e.currentTarget)}
                    onChange={(e) => updateBlock(b.id, (p) => ({ ...(p as any), text: e.target.value }))}
                    className="text-lg font-bold"
                    spellCheck={false}
                    autoComplete="off"
                    data-gramm="false"
                  />
                )}
                {b.kind === 'text' && (
                  <Input
                    placeholder="Free text…"
                    value={b.text}
                    onFocus={(e) => setFocusedRef(e.currentTarget)}
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
                    setFocusedRef={setFocusedRef}
                    symbolPopover={symbolPopover}
                    insertAtCursor={insertAtCursor}
                  />
                )}
              </BlockShell>
            ))}
      </div>

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

function PreviewBlock({ block }: { block: CanvasBlock }) {
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
  return (
    <div className="rounded-md bg-card p-3">
      {block.items.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">(empty step)</p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {block.items.map((it) => (
            <PreviewItem key={it.id} item={it} getVal={getVal} setVal={setVal} />
          ))}
          <Button
            size="sm"
            variant="outline"
            className="ml-auto h-7 gap-1 px-2 text-xs"
            onClick={() => toast({ title: 'Check Work', description: 'Step checked (preview).' })}
          >
            <CheckSquare className="h-3.5 w-3.5 text-primary" /> Check
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
}: {
  item: StepItem;
  getVal: (id: string, fallback?: string) => string;
  setVal: (id: string, v: string) => void;
}) {
  if (item.kind === 'text') {
    return <span className="text-sm text-foreground">{item.text}</span>;
  }
  if (item.kind === 'box') {
    const v = getVal(item.id, item.value);
    const w = item.width ?? BOX_PX[item.size].w;
    const h = item.height ?? BOX_PX[item.size].h;
    return (
      <Input
        value={v}
        placeholder="…"
        onChange={(e) => setVal(item.id, e.target.value)}
        style={{ width: w, height: h }}
        className={cn(
          'text-center',
          v ? 'border-0 bg-muted/30' : 'border-2 border-solid border-white bg-transparent',
        )}
      />
    );
  }
  const numV = getVal(item.id + ':num', item.num);
  const denV = getVal(item.id + ':den', item.den);
  const numW = item.numW ?? 80, numH = item.numH ?? 28;
  const denW = item.denW ?? 80, denH = item.denH ?? 28;
  const fracW = Math.max(numW, denW);
  return (
    <div className="inline-flex flex-col items-center">
      <Input
        value={numV}
        onChange={(e) => setVal(item.id + ':num', e.target.value)}
        style={{ width: numW, height: numH }}
        className={cn('text-center text-xs',
          numV ? 'border-0 bg-muted/30' : 'border-2 border-solid border-white bg-transparent')}
      />
      <div className="my-0.5 h-px bg-foreground" style={{ width: fracW }} />
      <Input
        value={denV}
        onChange={(e) => setVal(item.id + ':den', e.target.value)}
        style={{ width: denW, height: denH }}
        className={cn('text-center text-xs',
          denV ? 'border-0 bg-muted/30' : 'border-2 border-solid border-white bg-transparent')}
      />
    </div>
  );
}

/**
 * 8-direction resize wrapper (Word/Paint style). Wraps a sized child.
 * Handles appear on hover. Computes new w/h from the original at drag start
 * so dragging from any side feels stable.
 */
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
}: {
  children: React.ReactNode;
  label: string;
  onUp?: () => void;
  onDown?: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group rounded-lg border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <div className="flex items-center gap-1 opacity-60 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onUp} disabled={!onUp}>
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onDown} disabled={!onDown}>
            <ArrowDown className="h-3 w-3" />
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

type FocusedFrac = { fractionId: string; part: 'num' | 'den' } | null;

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
  const [focusedFrac, setFocusedFrac] = useState<FocusedFrac>(null);
  const setItems = (items: StepItem[]) => update((b) => ({ ...b, items }));
  const addItem = (it: StepItem) => setItems([...block.items, it]);
  const updateItem = (id: string, fn: (i: StepItem) => StepItem) =>
    setItems(block.items.map((i) => (i.id === id ? fn(i) : i)));
  const removeItem = (id: string) => setItems(block.items.filter((i) => i.id !== id));

  /** If cursor is in a fraction half, "Add Box" resizes that half to the chosen
   *  box size instead of adding a separate box item. */
  const addBox = (size: BoxSize) => {
    if (focusedFrac) {
      const { w, h } = BOX_PX[size];
      updateItem(focusedFrac.fractionId, (i) => {
        const f = i as Extract<StepItem, { kind: 'fraction' }>;
        return focusedFrac.part === 'num'
          ? { ...f, numW: w, numH: h }
          : { ...f, denW: w, denH: h };
      });
      return;
    }
    addItem(newItem.box(size));
  };

  return (
    <div className="rounded-md bg-background p-3">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => addItem(newItem.text())}>
          <Plus className="h-3 w-3" /> Text
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs">
              <Plus className="h-3 w-3" /> Box{focusedFrac ? ` → ${focusedFrac.part}` : ''}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => addBox('sm')}>Small</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBox('md')}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBox('lg')}>Large</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => addItem(newItem.fraction())}>
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
          size="sm"
          variant="outline"
          className="ml-auto h-7 gap-1 px-2 text-xs"
          title="Check Work (preview)"
          onClick={() => {}}
        >
          <CheckSquare className="h-3.5 w-3.5 text-primary" /> Check
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
              setFocusedRef={setFocusedRef}
              setFocusedFrac={setFocusedFrac}
              onChange={(fn) => updateItem(it.id, fn)}
              onRemove={() => removeItem(it.id)}
            />
          ))}
        </div>
      )}

      {kbOpen && (
        <div className="mt-3 rounded-md border border-border bg-muted/40 p-2">
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
              insertAtCursor(k);
            }}
          />
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">Click a field above, then tap a key.</p>
        </div>
      )}
    </div>
  );
}

function StepItemView({
  item,
  setFocusedRef,
  setFocusedFrac,
  onChange,
  onRemove,
}: {
  item: StepItem;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  setFocusedFrac: (f: FocusedFrac) => void;
  onChange: (fn: (i: StepItem) => StepItem) => void;
  onRemove: () => void;
}) {
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
      <div className="group/item inline-flex items-start gap-0.5">
        <Input
          value={item.text}
          placeholder="text"
          onFocus={(e) => { setFocusedRef(e.currentTarget); setFocusedFrac(null); }}
          onChange={(e) => onChange((i) => ({ ...(i as any), text: e.target.value }))}
          className="h-8 min-w-[6rem] max-w-[20rem]"
          style={{ width: `${Math.max(6, item.text.length + 2)}ch` }}
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
      <div className="group/item inline-flex items-start gap-0.5">
        <Resizable
          width={w}
          height={h}
          onResize={(nw, nh) => onChange((i) => ({ ...(i as any), width: nw, height: nh }))}
        >
          <Input
            value={item.value ?? ''}
            placeholder="…"
            onFocus={(e) => { setFocusedRef(e.currentTarget); setFocusedFrac(null); }}
            onChange={(e) => onChange((i) => ({ ...(i as any), value: e.target.value }))}
            style={{ width: w, height: h }}
            className={cn(
              'text-center',
              filled ? 'border-0 bg-muted/30' : 'border-2 border-solid border-white bg-transparent',
            )}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
          />
        </Resizable>
        {removeBtn}
      </div>
    );
  }
  // fraction
  const numW = item.numW ?? 80, numH = item.numH ?? 28;
  const denW = item.denW ?? 80, denH = item.denH ?? 28;
  const fracW = Math.max(numW, denW);
  return (
    <div className="group/item inline-flex items-start gap-0.5">
      <div className="inline-flex flex-col items-center">
        <Resizable
          width={numW}
          height={numH}
          onResize={(w, h) => onChange((i) => ({ ...(i as any), numW: w, numH: h }))}
        >
          <Input
            value={item.num ?? ''}
            placeholder="num"
            onFocus={(e) => { setFocusedRef(e.currentTarget); setFocusedFrac({ fractionId: item.id, part: 'num' }); }}
            onChange={(e) => onChange((i) => ({ ...(i as any), num: e.target.value }))}
            style={{ width: numW, height: numH }}
            className={cn('text-center text-xs', item.num ? 'border-0 bg-muted/30' : 'border-2 border-solid border-white bg-transparent')}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
          />
        </Resizable>
        <div className="my-0.5 h-px bg-foreground" style={{ width: fracW }} />
        <Resizable
          width={denW}
          height={denH}
          onResize={(w, h) => onChange((i) => ({ ...(i as any), denW: w, denH: h }))}
        >
          <Input
            value={item.den ?? ''}
            placeholder="den"
            onFocus={(e) => { setFocusedRef(e.currentTarget); setFocusedFrac({ fractionId: item.id, part: 'den' }); }}
            onChange={(e) => onChange((i) => ({ ...(i as any), den: e.target.value }))}
            style={{ width: denW, height: denH }}
            className={cn('text-center text-xs', item.den ? 'border-0 bg-muted/30' : 'border-2 border-solid border-white bg-transparent')}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
          />
        </Resizable>
      </div>
      {removeBtn}
    </div>
  );
}
