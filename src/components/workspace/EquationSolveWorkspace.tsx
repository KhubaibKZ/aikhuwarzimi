import { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HorizontalKeyboard } from './HorizontalKeyboard';

interface EquationSolveWorkspaceProps {
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

export function EquationSolveWorkspace({
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
}: EquationSolveWorkspaceProps) {
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

  const setRef = useCallback((id: string) => (el: HTMLInputElement | null) => {
    inputRefs.current[id] = el;
  }, []);

  const box = (id: string, width: string = 'w-12') => (
    <Input
      ref={setRef(id)}
      value={answers[id] || ''}
      onChange={(e) => onAnswerChange(id, e.target.value)}
      onFocus={() => setFocusedInput(id)}
      disabled={isSubmitted}
      className={cn(
        `${width} h-9 text-center font-mono text-base p-0 border-muted-foreground/40`,
        feedback[id] === 'correct' && "border-green-500 bg-green-500/5",
        feedback[id] === 'incorrect' && "border-destructive bg-destructive/5",
        focusedInput === id && "ring-2 ring-primary/30"
      )}
    />
  );

  const stepFeedbackIcon = (stepKey: string) => {
    const fb = feedback[stepKey];
    if (fb === 'correct') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (fb === 'incorrect') return <XCircle className="h-4 w-4 text-destructive" />;
    return null;
  };

  const checkBtn = (stepKey: string, label: string) => (
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

  const renderAiResponse = (stepKey: string) => {
    if (aiResponse?.partKey !== stepKey) return null;
    return (
      <div className={cn(
        "rounded-lg border p-2 text-sm mt-1",
        aiResponse.type === 'hint' ? "border-amber-500/30 bg-amber-500/10" : "border-blue-500/30 bg-blue-500/10"
      )}>
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="whitespace-pre-line">{aiResponse.content}</p>
        </div>
      </div>
    );
  };

  // Keys for this equation: 5(4 − x) = 35
  // Step 1 (Expand): □ − □x = 35
  const s1_a = k('s1_a');   // 20
  const s1_b = k('s1_b');   // 5
  // Step 2 (Rearrange): −□x = □
  const s2_a = k('s2_a');   // 5
  const s2_b = k('s2_b');   // 15
  // Step 3 (Solve): x = □
  const s3 = k('s3');       // -3

  return (
    <div className="space-y-5">
      {/* Step 1: Expand */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium mr-1">Expand</span>
          {box(s1_a)}
          <span className="font-mono text-base">−</span>
          {box(s1_b)}
          <span className="font-mono text-base italic">x</span>
          <span className="font-mono text-base">=</span>
          <span className="font-mono text-base">35</span>
          {checkBtn(k('s1'), 'Expand the brackets')}
          {stepFeedbackIcon(k('s1'))}
        </div>
        {renderAiResponse(k('s1'))}
      </div>

      {/* Step 2: Rearrange */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium mr-1">Rearrange</span>
          <span className="font-mono text-base">−</span>
          {box(s2_a)}
          <span className="font-mono text-base italic">x</span>
          <span className="font-mono text-base">=</span>
          {box(s2_b)}
          {checkBtn(k('s2'), 'Rearrange the equation')}
          {stepFeedbackIcon(k('s2'))}
        </div>
        {renderAiResponse(k('s2'))}
      </div>

      {/* Step 3: Solve */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium mr-1">Solve</span>
          <span className="font-mono text-base italic">x</span>
          <span className="font-mono text-base">=</span>
          {box(s3, 'w-14')}
          {checkBtn(k('s3'), 'Solve for x')}
          {stepFeedbackIcon(k('s3'))}
        </div>
        {renderAiResponse(k('s3'))}
      </div>

      {/* Show correct answer after submission */}
      {isSubmitted && correctAnswers && (
        <p className="text-sm text-green-600 font-medium">
          Correct: x = {correctAnswers[questionKey] || '-3'}
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
