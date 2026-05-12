import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HorizontalKeyboardProps {
  keys: string[][];
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

const FRAC_MAP: Record<string, [string, string]> = {
  '½': ['1', '2'], '⅓': ['1', '3'], '⅔': ['2', '3'],
  '¼': ['1', '4'], '¾': ['3', '4'],
  '⅕': ['1', '5'], '⅖': ['2', '5'], '⅗': ['3', '5'], '⅘': ['4', '5'],
  '⅙': ['1', '6'], '⅚': ['5', '6'],
  '⅛': ['1', '8'], '⅜': ['3', '8'], '⅝': ['5', '8'], '⅞': ['7', '8'],
};

// Vector token: any uppercase letter + combining arrow (U+20D7) + more letters,
// e.g. "O⃗A", "Y⃗X". Render as letters with a single arrow above the whole group.
const COMBINING_ARROW = '\u20D7';
function isVectorToken(key: string) {
  return key.includes(COMBINING_ARROW);
}
function vectorLetters(key: string) {
  return key.replace(new RegExp(COMBINING_ARROW, 'g'), '');
}

function renderKeyContent(key: string) {
  if (FRAC_MAP[key]) {
    const [n, d] = FRAC_MAP[key];
    return (
      <span className="inline-flex flex-col items-center leading-none text-[0.78rem]">
        <span className="px-1">{n}</span>
        <span className="border-t border-current w-full" />
        <span className="px-1">{d}</span>
      </span>
    );
  }
  if (isVectorToken(key)) {
    return (
      <span className="relative inline-block px-0.5 italic font-semibold">
        <span className="absolute left-0 right-0 -top-1.5 text-[0.6em] leading-none text-center pointer-events-none select-none">⟶</span>
        {vectorLetters(key)}
      </span>
    );
  }
  if (key === 'a/b' || key === '□/□') {
    return (
      <span className="inline-flex flex-col items-center leading-none text-[0.78rem]">
        <span className="px-1">a</span>
        <span className="border-t border-current w-full" />
        <span className="px-1">b</span>
      </span>
    );
  }
  return key;
}

function keyInsertValue(key: string): string {
  if (key === 'a/b' || key === '□/□') return '/';
  return key;
}

export function HorizontalKeyboard({ keys, onKeyPress, disabled }: HorizontalKeyboardProps) {
  const isSpecialKey = (key: string) => key === '⌫' || key === 'Clear';
  const allKeys = keys.flat();

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {allKeys.map((key, index) => (
        <Button
          key={`${key}-${index}`}
          variant={isSpecialKey(key) ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => onKeyPress(keyInsertValue(key))}
          disabled={disabled}
          className={cn(
            "h-9 min-w-[2.25rem] px-2 text-sm font-medium",
            isSpecialKey(key) && "bg-destructive/80 hover:bg-destructive",
          )}
        >
          {renderKeyContent(key)}
        </Button>
      ))}
    </div>
  );
}
