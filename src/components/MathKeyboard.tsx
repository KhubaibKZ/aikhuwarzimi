import { Button } from '@/components/ui/button';
import { Keyboard, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MathKeyboardProps {
  isOpen: boolean;
  onToggle: () => void;
  onInsert: (symbol: string) => void;
}

const keyboardRows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['+', '-', '×', '÷', '=', '<', '>', '≤', '≥', '≠'],
  ['π', '√', '∛', '²', '³', 'ⁿ', '½', '¼', '¾', '⅓'],
  ['ℕ', 'ℤ', 'ℚ', 'ℝ', '∈', '∉', '∪', '∩', '⊂', '∅'],
  ['{', '}', '(', ')', '[', ']', ',', '.', '±', '∞'],
];

export function MathKeyboard({ isOpen, onToggle, onInsert }: MathKeyboardProps) {
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="gap-2"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Keyboard className="h-4 w-4" />}
        {isOpen ? 'Hide Keyboard' : 'Math Keyboard'}
      </Button>

      {isOpen && (
        <div className="rounded-xl border border-border bg-card p-3 shadow-lg animate-scale-in">
          <div className="space-y-2">
            {keyboardRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 justify-center">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => onInsert(key)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      "bg-muted text-foreground font-mono text-lg",
                      "transition-all duration-150",
                      "hover:bg-primary hover:text-primary-foreground hover:scale-105",
                      "active:scale-95",
                      "focus:outline-none focus:ring-2 focus:ring-primary"
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Click a symbol to insert it at cursor position
          </p>
        </div>
      )}
    </div>
  );
}
