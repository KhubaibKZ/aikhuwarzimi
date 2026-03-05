import { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HorizontalKeyboard } from './HorizontalKeyboard';

export interface AnswerStep {
  key: string;
  label: string;
  marks: number;
  suffix?: string;
}

export interface StepWorkspaceProps {
  steps: AnswerStep[];
  answers: Record<string, string>;
  feedback: Record<string, 'correct' | 'incorrect' | null>;
  onAnswerChange: (key: string, value: string) => void;
  onCheckWork: (stepKey: string, stepLabel: string) => void;
  isLoading: boolean;
  loadingStepKey: string | null;
  isSubmitted: boolean;
  correctAnswers?: Record<string, string>;
  aiResponse?: { type: 'hint' | 'guidance'; content: string; partKey?: string } | null;
  keyboardKeys: string[][];
}

export function StepWorkspace({
  steps,
  answers,
  feedback,
  onAnswerChange,
  onCheckWork,
  isLoading,
  loadingStepKey,
  isSubmitted,
  correctAnswers,
  aiResponse,
  keyboardKeys
}: StepWorkspaceProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(steps[0]?.key);
  
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const handleKeyPress = useCallback((key: string) => {
    if (!focusedInput || isSubmitted) return;
    
    const input = inputRefs.current[focusedInput];
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = answers[focusedInput] || '';

    if (key === '⌫') {
      if (start === end && start > 0) {
        const newValue = currentValue.slice(0, start - 1) + currentValue.slice(end);
        onAnswerChange(focusedInput, newValue);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start - 1, start - 1);
        }, 0);
      } else if (start !== end) {
        const newValue = currentValue.slice(0, start) + currentValue.slice(end);
        onAnswerChange(focusedInput, newValue);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start, start);
        }, 0);
      }
    } else if (key === 'Clear') {
      onAnswerChange(focusedInput, '');
      setTimeout(() => input.focus(), 0);
    } else {
      const newValue = currentValue.slice(0, start) + key + currentValue.slice(end);
      onAnswerChange(focusedInput, newValue);
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + key.length, start + key.length);
      }, 0);
    }
  }, [focusedInput, isSubmitted, answers, onAnswerChange]);

  const setInputRef = useCallback((key: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    inputRefs.current[key] = el;
  }, []);

  return (
    <div className="space-y-4">
      {/* Step-by-step answer fields */}
      {steps.map((step, index) => (
        <div key={step.key} className="space-y-2">
          <label className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {index + 1}
              </span>
              <span className="font-medium">{step.label}</span>
            </span>
            {step.marks > 0 && (
              <span className="text-xs text-muted-foreground">[{step.marks} mark{step.marks > 1 ? 's' : ''}]</span>
            )}
          </label>
          
          <div className="flex gap-2 ml-7">
            <div className="relative flex-1">
              <Input
                ref={setInputRef(step.key) as any}
                value={answers[step.key] || ''}
                onChange={(e) => onAnswerChange(step.key, e.target.value)}
                onFocus={() => setFocusedInput(step.key)}
                placeholder="?"
                disabled={isSubmitted}
                className={cn(
                  "transition-colors font-mono text-lg text-center",
                  step.suffix && "pr-14",
                  feedback[step.key] === 'correct' && "border-green-500 bg-green-500/5",
                  feedback[step.key] === 'incorrect' && "border-destructive bg-destructive/5",
                  focusedInput === step.key && "ring-2 ring-primary/30"
                )}
              />
              {step.suffix && (
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{step.suffix}</span>
              )}
              {feedback[step.key] === 'correct' && (
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
              )}
              {feedback[step.key] === 'incorrect' && (
                <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCheckWork(step.key, step.label)}
              disabled={isLoading || isSubmitted}
              className="shrink-0"
              title="Check this answer"
            >
              {loadingStepKey === step.key ? (
                <span className="animate-pulse">...</span>
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {aiResponse?.partKey === step.key && (
            <div className={cn(
              "rounded-lg border p-3 text-sm ml-7",
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
          
          {isSubmitted && feedback[step.key] === 'incorrect' && correctAnswers?.[step.key] && (
            <p className="text-sm text-green-600 font-medium ml-7">
              Correct: {correctAnswers[step.key]}{step.suffix || ''}
            </p>
          )}
        </div>
      ))}

      {/* Horizontal Keyboard */}
      <div className="border-t pt-3">
        <HorizontalKeyboard
          keys={keyboardKeys}
          onKeyPress={handleKeyPress}
          disabled={isSubmitted || !focusedInput}
        />
      </div>
    </div>
  );
}
