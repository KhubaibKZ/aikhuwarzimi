import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VecText } from '@/components/VecText';

interface FinalAnswerFieldProps {
  partKey: string;
  label: string;
  marks: number;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onCheckWork: () => void;
  feedback: 'correct' | 'incorrect' | null;
  isLoading: boolean;
  isSubmitted: boolean;
  isFocused: boolean;
  correctAnswer?: string;
  suffix?: string;
  aiResponse?: { type: 'hint' | 'guidance'; content: string } | null;
  index: number;
}

export const FinalAnswerField = forwardRef<HTMLInputElement, FinalAnswerFieldProps>(
  ({ 
    label, 
    marks, 
    value, 
    onChange, 
    onFocus, 
    onCheckWork, 
    feedback, 
    isLoading, 
    isSubmitted, 
    isFocused,
    correctAnswer,
    suffix = '',
    aiResponse,
    index
  }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {index + 1}
            </span>
            {label}
          </span>
          <span className="text-xs text-muted-foreground">[{marks} mark{marks > 1 ? 's' : ''}]</span>
        </label>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              placeholder="?"
              disabled={isSubmitted}
              className={cn(
                "transition-colors font-mono text-lg text-center",
                suffix && "pr-16",
                feedback === 'correct' && "border-green-500 bg-green-500/5",
                feedback === 'incorrect' && "border-destructive bg-destructive/5",
                isFocused && "ring-2 ring-primary/30"
              )}
            />
            {suffix && (
              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground">{suffix}</span>
            )}
            {feedback === 'correct' && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
            {feedback === 'incorrect' && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onCheckWork}
            disabled={isLoading || isSubmitted}
            className="shrink-0"
            title="Check this answer"
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <BookOpen className="h-4 w-4" />
            )}
          </Button>
        </div>
        
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
        
        {isSubmitted && feedback === 'incorrect' && correctAnswer && (
          <p className="text-sm text-green-600 font-medium ml-8">
            Correct: {correctAnswer}{suffix}
          </p>
        )}
      </div>
    );
  }
);

FinalAnswerField.displayName = 'FinalAnswerField';
