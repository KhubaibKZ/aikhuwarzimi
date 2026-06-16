import { RefObject } from 'react';
import { Button } from '@/components/ui/button';

type FieldRef = RefObject<HTMLInputElement | HTMLTextAreaElement | null>;

interface Props {
  targetRef: FieldRef;
  value: string;
  onChange: (next: string) => void;
  compact?: boolean;
}

const SYMBOLS = [
  '×', '÷', '−', '±', '·',
  '²', '³', '⁴', 'ⁿ',
  '√', 'π', '°', '∞',
  '≤', '≥', '≠', '≈',
  '→', '↔', '∠', '△',
  '(', ')', '°C', '%',
];

/**
 * Math symbol + stacked-fraction inserter for question-edit inputs.
 * Inserts the QuestionText markup `[[num/den]]` for stacked fractions.
 */
export function MathInputToolbar({ targetRef, value, onChange, compact }: Props) {
  const insert = (text: string, selectInside?: { from: number; to: number }) => {
    const el = targetRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const next = value.slice(0, start) + text + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      const node = targetRef.current;
      if (!node) return;
      node.focus();
      if (selectInside) {
        const a = start + selectInside.from;
        const b = start + selectInside.to;
        node.setSelectionRange(a, b);
      } else {
        const pos = start + text.length;
        node.setSelectionRange(pos, pos);
      }
    });
  };

  const insertFraction = () => {
    const el = targetRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const selected = value.slice(start, end);
    if (selected) {
      // wrap selection as numerator, prompt denominator with "den"
      const text = `[[${selected}/den]]`;
      const next = value.slice(0, start) + text + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        const node = targetRef.current;
        if (!node) return;
        node.focus();
        const denStart = start + text.indexOf('den');
        node.setSelectionRange(denStart, denStart + 3);
      });
    } else {
      insert('[[num/den]]', { from: 2, to: 5 });
    }
  };

  const insertSqrt = () => insert('√[[num/den]]', { from: 3, to: 6 });

  return (
    <div className={`flex flex-wrap gap-1 rounded-md border border-border bg-muted/40 p-1.5 ${compact ? 'mb-1' : 'mb-2'}`}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="h-7 px-2 text-xs font-semibold"
        onClick={insertFraction}
        title="Insert stacked fraction"
      >
        a⁄b Fraction
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={insertSqrt}
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
          onClick={() => insert(s)}
        >
          {s}
        </Button>
      ))}
    </div>
  );
}
