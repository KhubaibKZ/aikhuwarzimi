import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ImageOff } from 'lucide-react';

const SYMBOLS = [
  '×', '÷', '−', '±', '·',
  '²', '³', '⁴', 'ⁿ',
  '√', 'π', '°', '∞',
  '≤', '≥', '≠', '≈',
  '→', '↔', '∠', '△',
];

interface Props {
  /** Called with text to insert at caret (the parent must have a focused contentEditable). */
  onInsert: (text: string) => void;
  /** Optional SVG markup upload. If provided, shows an upload/remove button. */
  hasSvg?: boolean;
  onUploadSvg?: (markup: string) => void;
  onClearSvg?: () => void;
}

/**
 * Compact symbol + stacked-fraction toolbar for inline-edit (contentEditable)
 * question text inside the workspace dialog.
 */
export function InlineMathToolbar({ onInsert, hasSvg, onUploadSvg, onClearSvg }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-2 flex flex-wrap items-center gap-1 rounded-md border border-border bg-muted/40 p-1.5">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="h-7 px-2 text-xs font-semibold"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onInsert('[[num/den]]')}
        title="Insert stacked fraction"
      >
        a⁄b Fraction
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="h-7 px-2 text-xs"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onInsert('√[[num/den]]')}
        title="Insert √ over stacked fraction"
      >
        √(a⁄b)
      </Button>
      <span className="mx-1 self-center h-5 w-px bg-border" />
      {SYMBOLS.map((s) => (
        <Button
          key={s}
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 min-w-[28px] px-1.5 text-xs"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onInsert(s)}
        >
          {s}
        </Button>
      ))}

      {onUploadSvg && (
        <>
          <span className="mx-1 self-center h-5 w-px bg-border" />
          <input
            ref={fileRef}
            type="file"
            accept=".svg,image/svg+xml"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.currentTarget.value = '';
              if (!f) return;
              const text = await f.text();
              if (!text.includes('<svg')) return;
              onUploadSvg(text);
            }}
          />
          {hasSvg ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-destructive"
              onClick={() => onClearSvg?.()}
            >
              <ImageOff className="h-3.5 w-3.5 mr-1" /> Remove SVG
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5 mr-1" /> Upload SVG
            </Button>
          )}
        </>
      )}
    </div>
  );
}

/** Insert text at the current caret inside a focused contentEditable element. */
export function insertAtCaret(target: HTMLElement | null, text: string) {
  if (!target) return;
  target.focus();
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    target.append(text);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  const range = sel.getRangeAt(0);
  // Ensure caret is inside target
  if (!target.contains(range.commonAncestorContainer)) {
    target.append(text);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.setEndAfter(node);
  sel.removeAllRanges();
  sel.addRange(range);
  target.dispatchEvent(new Event('input', { bubbles: true }));
}
