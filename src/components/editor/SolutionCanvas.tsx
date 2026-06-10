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
import { ArrowDown, ArrowUp, CheckSquare, Keyboard, Lightbulb, Plus, Send, Trash2, Type } from 'lucide-react';
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
}

const empty: TCanvas = { blocks: [] };

const DEFAULT_KEYBOARD: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['+', '-', '×', '÷', '=', '.', '(', ')', '<', '>'],
  ['√', 'π', '²', '³', '°', '±', '½', '¼', '¾', '⌫'],
];

const boxWidth: Record<BoxSize, string> = {
  sm: 'w-16',
  md: 'w-28',
  lg: 'w-48',
};

export function SolutionCanvas({ value, onChange, hints = [] }: Props) {
  const canvas = value ?? empty;
  const { toast } = useToast();
  const [hintIdx, setHintIdx] = useState(0);
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
    // Fire native input event so React picks it up
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
      {/* Top toolbar */}
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

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {canvas.blocks.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Empty canvas. Use the toolbar to add a Part Heading, Step, or Text block.
          </div>
        )}

        {canvas.blocks.map((b, idx) => (
          <BlockShell
            key={b.id}
            onUp={idx > 0 ? () => moveBlock(b.id, -1) : undefined}
            onDown={idx < canvas.blocks.length - 1 ? () => moveBlock(b.id, 1) : undefined}
            onDelete={() => removeBlock(b.id)}
            label={
              b.kind === 'heading' ? 'Heading' : b.kind === 'text' ? 'Text' : 'Step'
            }
          >
            {b.kind === 'heading' && (
              <Input
                placeholder="e.g. (a) or (b)(i)"
                value={b.text}
                onFocus={(e) => setFocusedRef(e.currentTarget)}
                onChange={(e) => updateBlock(b.id, (p) => ({ ...(p as any), text: e.target.value }))}
                className="text-lg font-bold"
              />
            )}
            {b.kind === 'text' && (
              <Input
                placeholder="Free text…"
                value={b.text}
                onFocus={(e) => setFocusedRef(e.currentTarget)}
                onChange={(e) => updateBlock(b.id, (p) => ({ ...(p as any), text: e.target.value }))}
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

      {/* Bottom action bar — Hint + Submit (matches regular interface) */}
      <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-end gap-2 border-t border-border bg-background/95 px-3 py-2 backdrop-blur">
        <Button
          size="sm"
          variant="outline"
          className="gap-1"
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
          <Lightbulb className="h-4 w-4" /> Hint
        </Button>
        <Button
          size="sm"
          className="gap-1"
          onClick={() => toast({ title: 'Submitted', description: 'Solution canvas submitted (preview).' })}
        >
          <Send className="h-4 w-4" /> Submit
        </Button>
      </div>
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
  const setItems = (items: StepItem[]) => update((b) => ({ ...b, items }));
  const addItem = (it: StepItem) => setItems([...block.items, it]);
  const updateItem = (id: string, fn: (i: StepItem) => StepItem) =>
    setItems(block.items.map((i) => (i.id === id ? fn(i) : i)));
  const removeItem = (id: string) => setItems(block.items.filter((i) => i.id !== id));

  return (
    <div className="rounded-md border border-dashed border-border bg-background p-3">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => addItem(newItem.text())}>
          <Plus className="h-3 w-3" /> Text
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs">
              <Plus className="h-3 w-3" /> Box
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => addItem(newItem.box('sm'))}>Small</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addItem(newItem.box('md'))}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addItem(newItem.box('lg'))}>Large</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => addItem(newItem.fraction())}>
          <Plus className="h-3 w-3" /> Fraction
        </Button>
        {symbolPopover}
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
        <div className="flex flex-wrap items-end gap-2">
          {block.items.map((it) => (
            <StepItemView
              key={it.id}
              item={it}
              setFocusedRef={setFocusedRef}
              onChange={(fn) => updateItem(it.id, fn)}
              onRemove={() => removeItem(it.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StepItemView({
  item,
  setFocusedRef,
  onChange,
  onRemove,
}: {
  item: StepItem;
  setFocusedRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
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
          onFocus={(e) => setFocusedRef(e.currentTarget)}
          onChange={(e) => onChange((i) => ({ ...(i as any), text: e.target.value }))}
          className="h-8 min-w-[6rem] max-w-[20rem]"
          style={{ width: `${Math.max(6, item.text.length + 2)}ch` }}
        />
        {removeBtn}
      </div>
    );
  }
  if (item.kind === 'box') {
    return (
      <div className="group/item inline-flex items-start gap-0.5">
        <Input
          value={item.value ?? ''}
          placeholder="…"
          onFocus={(e) => setFocusedRef(e.currentTarget)}
          onChange={(e) => onChange((i) => ({ ...(i as any), value: e.target.value }))}
          className={cn('h-8 border-2 border-dashed text-center', boxWidth[item.size])}
        />
        {removeBtn}
      </div>
    );
  }
  // fraction
  return (
    <div className="group/item inline-flex items-start gap-0.5">
      <div className="inline-flex flex-col items-center">
        <Input
          value={item.num ?? ''}
          placeholder="num"
          onFocus={(e) => setFocusedRef(e.currentTarget)}
          onChange={(e) => onChange((i) => ({ ...(i as any), num: e.target.value }))}
          className="h-7 w-20 border-2 border-dashed text-center text-xs"
        />
        <div className="my-0.5 h-px w-20 bg-foreground" />
        <Input
          value={item.den ?? ''}
          placeholder="den"
          onFocus={(e) => setFocusedRef(e.currentTarget)}
          onChange={(e) => onChange((i) => ({ ...(i as any), den: e.target.value }))}
          className="h-7 w-20 border-2 border-dashed text-center text-xs"
        />
      </div>
      {removeBtn}
    </div>
  );
}
