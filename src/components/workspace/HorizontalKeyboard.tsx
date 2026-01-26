import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HorizontalKeyboardProps {
  keys: string[][];
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

export function HorizontalKeyboard({ keys, onKeyPress, disabled }: HorizontalKeyboardProps) {
  const isSpecialKey = (key: string) => key === '⌫' || key === 'Clear';

  // Flatten all keys into a single horizontal row for compact display
  const allKeys = keys.flat();

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {allKeys.map((key, index) => (
        <Button
          key={`${key}-${index}`}
          variant={isSpecialKey(key) ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => onKeyPress(key)}
          disabled={disabled}
          className={cn(
            "h-8 px-2.5 text-sm font-medium",
            isSpecialKey(key) && "bg-destructive/80 hover:bg-destructive",
          )}
        >
          {key}
        </Button>
      ))}
    </div>
  );
}
