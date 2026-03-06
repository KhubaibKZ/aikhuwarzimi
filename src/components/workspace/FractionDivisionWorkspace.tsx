import { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HorizontalKeyboard } from './HorizontalKeyboard';

interface FractionDivisionWorkspaceProps {
  questionKey: string;
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

export function FractionDivisionWorkspace({
  questionKey,
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
}: FractionDivisionWorkspaceProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const k = (suffix: string) => `${questionKey}_${suffix}`;

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
        setTimeout(() => { input.focus(); input.setSelectionRange(start - 1, start - 1); }, 0);
      } else if (start !== end) {
        const newValue = currentValue.slice(0, start) + currentValue.slice(end);
        onAnswerChange(focusedInput, newValue);
        setTimeout(() => { input.focus(); input.setSelectionRange(start, start); }, 0);
      }
    } else if (key === 'Clear') {
      onAnswerChange(focusedInput, '');
      setTimeout(() => input.focus(), 0);
    } else {
      const newValue = currentValue.slice(0, start) + key + currentValue.slice(end);
      onAnswerChange(focusedInput, newValue);
      setTimeout(() => { input.focus(); input.setSelectionRange(start + key.length, start + key.length); }, 0);
    }
  }, [focusedInput, isSubmitted, answers, onAnswerChange]);

  const FractionBox = ({ id, width = 'w-10' }: { id: string; width?: string }) => (
    <Input
      ref={(el) => { inputRefs.current[id] = el; }}
      value={answers[id] || ''}
      onChange={(e) => onAnswerChange(id, e.target.value)}
      onFocus={() => setFocusedInput(id)}
      disabled={isSubmitted}
      className={cn(
        `${width} h-8 text-center font-mono text-base p-0 border-muted-foreground/40`,
        feedback[id] === 'correct' && "border-green-500 bg-green-500/5",
        feedback[id] === 'incorrect' && "border-destructive bg-destructive/5",
        focusedInput === id && "ring-2 ring-primary/30"
      )}
    />
  );

  const FractionBar = ({ num, den }: { num: string; den: string }) => (
    <div className="inline-flex flex-col items-center gap-0.5">
      <FractionBox id={num} />
      <div className="w-10 h-px bg-foreground" />
      <FractionBox id={den} />
    </div>
  );

  const stepFeedback = (stepKey: string) => {
    const fb = feedback[stepKey];
    if (fb === 'correct') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (fb === 'incorrect') return <XCircle className="h-4 w-4 text-destructive" />;
    return null;
  };

  const CheckBtn = ({ stepKey, label }: { stepKey: string; label: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onCheckWork(stepKey, label)}
      disabled={isLoading || isSubmitted}
      className="shrink-0 h-7 w-7 p-0"
      title="Check this step"
    >
      {loadingStepKey === stepKey ? (
        <span className="animate-pulse text-xs">...</span>
      ) : (
        <BookOpen className="h-3.5 w-3.5" />
      )}
    </Button>
  );

  return (
    <div className="space-y-5">
      {/* Step 1: Rewrite as multiplication */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <FractionBar num={k('s1_n1')} den={k('s1_d1')} />
          <span className="text-lg font-mono">×</span>
          <FractionBar num={k('s1_n2')} den={k('s1_d2')} />
          <CheckBtn stepKey={k('s1')} label="Rewrite as multiplication" />
          {stepFeedback(k('s1'))}
        </div>
        {aiResponse?.partKey === k('s1') && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-sm">
            <div className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="whitespace-pre-line">{aiResponse.content}</p>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Multiply numerators and denominators */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <FractionBox id={k('s2_n1')} />
              <span className="text-sm font-mono">×</span>
              <FractionBox id={k('s2_n2')} />
            </div>
            <div className="w-24 h-px bg-foreground" />
            <div className="flex items-center gap-0.5">
              <FractionBox id={k('s2_d1')} />
              <span className="text-sm font-mono">×</span>
              <FractionBox id={k('s2_d2')} />
            </div>
          </div>
          <span className="text-lg font-mono">=</span>
          <FractionBar num={k('s2_rn')} den={k('s2_rd')} />
          <CheckBtn stepKey={k('s2')} label="Multiply numerators and denominators" />
          {stepFeedback(k('s2'))}
        </div>
        {aiResponse?.partKey === k('s2') && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-sm">
            <div className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="whitespace-pre-line">{aiResponse.content}</p>
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Simplify */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <FractionBox id={k('s3_n1')} />
              <span className="text-sm font-mono">÷</span>
              <FractionBox id={k('s3_gcd')} />
            </div>
            <div className="w-24 h-px bg-foreground" />
            <div className="flex items-center gap-0.5">
              <FractionBox id={k('s3_d1')} />
              <span className="text-sm font-mono">÷</span>
              <FractionBox id={k('s3_gcd2')} />
            </div>
          </div>
          <span className="text-lg font-mono">=</span>
          <FractionBar num={k('s3_fn')} den={k('s3_fd')} />
          <CheckBtn stepKey={k('s3')} label="Simplify the fraction" />
          {stepFeedback(k('s3'))}
        </div>
        {aiResponse?.partKey === k('s3') && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-sm">
            <div className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="whitespace-pre-line">{aiResponse.content}</p>
            </div>
          </div>
        )}
      </div>

      {/* Show correct answers after submission */}
      {isSubmitted && correctAnswers && (
        <p className="text-sm text-green-600 font-medium">
          Correct: {correctAnswers[questionKey] || '4/15'}
        </p>
      )}

      {/* Keyboard */}
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
