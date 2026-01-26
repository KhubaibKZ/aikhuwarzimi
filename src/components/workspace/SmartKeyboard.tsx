import { Button } from '@/components/ui/button';
import { Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartKeyboardProps {
  keys: string[][];
  isOpen: boolean;
  onToggle: () => void;
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

export function SmartKeyboard({ keys, isOpen, onToggle, onKeyPress, disabled }: SmartKeyboardProps) {
  // Identify special keys for styling
  const isSpecialKey = (key: string) => {
    return key === '⌫' || key === 'Clear';
  };
  
  const isQuickValue = (key: string) => {
    // Numbers longer than 2 digits or specific values are "quick values"
    return key.length > 2 && !isNaN(Number(key));
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="gap-2 w-full"
        disabled={disabled}
      >
        <Keyboard className="h-4 w-4" />
        {isOpen ? 'Hide Keyboard' : 'Show Keyboard'}
      </Button>

      {isOpen && (
        <div className="p-3 bg-muted/50 rounded-lg border">
          <div className="grid gap-2">
            {keys.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1.5 justify-center flex-wrap">
                {row.map((key) => (
                  <Button
                    key={key}
                    variant={isSpecialKey(key) ? 'destructive' : isQuickValue(key) ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => onKeyPress(key)}
                    disabled={disabled}
                    className={cn(
                      "min-w-[40px] h-9 text-sm font-medium",
                      isSpecialKey(key) && "bg-destructive/80 hover:bg-destructive",
                      isQuickValue(key) && "text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 px-2"
                    )}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Tap a field above, then use keyboard
          </p>
        </div>
      )}
    </div>
  );
}
