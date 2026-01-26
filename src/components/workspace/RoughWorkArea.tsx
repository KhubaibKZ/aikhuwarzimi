import { forwardRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoughWorkAreaProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onCheckWork: () => void;
  isLoading: boolean;
  isSubmitted: boolean;
  isFocused: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  placeholder?: string;
  aiResponse?: { type: 'hint' | 'guidance'; content: string } | null;
}

export const RoughWorkArea = forwardRef<HTMLTextAreaElement, RoughWorkAreaProps>(
  ({ 
    value, 
    onChange, 
    onFocus, 
    onCheckWork, 
    isLoading, 
    isSubmitted, 
    isFocused,
    isExpanded,
    onToggleExpand,
    placeholder,
    aiResponse
  }, ref) => {
    return (
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="gap-2 text-sm font-medium w-full justify-between"
        >
          <span className="flex items-center gap-2">
            📝 Rough Work
          </span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        {isExpanded && (
          <div className="space-y-3 pl-1">
            <Textarea
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              placeholder={placeholder || "Show your working here..."}
              disabled={isSubmitted}
              className={cn(
                "min-h-[100px] font-mono text-sm resize-none",
                isFocused && "ring-2 ring-primary/30"
              )}
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={onCheckWork}
              disabled={isLoading || isSubmitted || !value?.trim()}
              className="gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Checking...</span>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Check My Working
                </>
              )}
            </Button>
            
            {aiResponse && (
              <div className={cn(
                "rounded-lg border p-3 text-sm",
                aiResponse.type === 'hint' 
                  ? "border-amber-500/30 bg-amber-500/10" 
                  : "border-blue-500/30 bg-blue-500/10"
              )}>
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <p className="whitespace-pre-line">{aiResponse.content}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

RoughWorkArea.displayName = 'RoughWorkArea';
