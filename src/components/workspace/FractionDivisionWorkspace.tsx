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

  const setRef = useCallback((id: string) => (el: HTMLInputElement | null) => {
    inputRefs.current[id] = el;
  }, []);

  const getBoxClass = (id: string) => cn(
    "w-10 h-8 text-center font-mono text-base p-0 border-muted-foreground/40",
    feedback[id] === 'correct' && "border-green-500 bg-green-500/5",
    feedback[id] === 'incorrect' && "border-destructive bg-destructive/5",
    focusedInput === id && "ring-2 ring-primary/30"
  );

  const stepFeedbackIcon = (stepKey: string) => {
    const fb = feedback[stepKey];
    if (fb === 'correct') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (fb === 'incorrect') return <XCircle className="h-4 w-4 text-destructive" />;
    return null;
  };

  const renderAiResponse = (stepKey: string) => {
    if (aiResponse?.partKey !== stepKey) return null;
    return (
      <div className={cn(
        "rounded-lg border p-2 text-sm",
        aiResponse.type === 'hint' ? "border-amber-500/30 bg-amber-500/10" : "border-blue-500/30 bg-blue-500/10"
      )}>
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="whitespace-pre-line">{aiResponse.content}</p>
        </div>
      </div>
    );
  };

  // All box IDs for this workspace
  const s1_n1 = k('s1_n1'); const s1_n2 = k('s1_n2');
  const s1_d1 = k('s1_d1'); const s1_d2 = k('s1_d2');
  const s1_rn = k('s1_rn'); const s1_rd = k('s1_rd');
  const s2_n1 = k('s2_n1'); const s2_gcd = k('s2_gcd');
  const s2_d1 = k('s2_d1'); const s2_gcd2 = k('s2_gcd2');
  const s2_fn = k('s2_fn'); const s2_fd = k('s2_fd');

  return (
    <div className="space-y-5">
      {/* Step 1: Multiply numerators and denominators */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <Input ref={setRef(s1_n1)} value={answers[s1_n1] || ''} onChange={(e) => onAnswerChange(s1_n1, e.target.value)} onFocus={() => setFocusedInput(s1_n1)} disabled={isSubmitted} className={getBoxClass(s1_n1)} />
              <span className="text-sm font-mono">×</span>
              <Input ref={setRef(s1_n2)} value={answers[s1_n2] || ''} onChange={(e) => onAnswerChange(s1_n2, e.target.value)} onFocus={() => setFocusedInput(s1_n2)} disabled={isSubmitted} className={getBoxClass(s1_n2)} />
            </div>
            <div className="w-24 h-px bg-foreground" />
            <div className="flex items-center gap-0.5">
              <Input ref={setRef(s1_d1)} value={answers[s1_d1] || ''} onChange={(e) => onAnswerChange(s1_d1, e.target.value)} onFocus={() => setFocusedInput(s1_d1)} disabled={isSubmitted} className={getBoxClass(s1_d1)} />
              <span className="text-sm font-mono">×</span>
              <Input ref={setRef(s1_d2)} value={answers[s1_d2] || ''} onChange={(e) => onAnswerChange(s1_d2, e.target.value)} onFocus={() => setFocusedInput(s1_d2)} disabled={isSubmitted} className={getBoxClass(s1_d2)} />
            </div>
          </div>
          <span className="text-lg font-mono">=</span>
          <div className="inline-flex flex-col items-center gap-0.5">
            <Input ref={setRef(s1_rn)} value={answers[s1_rn] || ''} onChange={(e) => onAnswerChange(s1_rn, e.target.value)} onFocus={() => setFocusedInput(s1_rn)} disabled={isSubmitted} className={getBoxClass(s1_rn)} />
            <div className="w-10 h-px bg-foreground" />
            <Input ref={setRef(s1_rd)} value={answers[s1_rd] || ''} onChange={(e) => onAnswerChange(s1_rd, e.target.value)} onFocus={() => setFocusedInput(s1_rd)} disabled={isSubmitted} className={getBoxClass(s1_rd)} />
          </div>
          <Button variant="outline" size="sm" onClick={() => onCheckWork(k('s1'), 'Multiply numerators and denominators')} disabled={isLoading || isSubmitted} className="shrink-0 h-7 w-7 p-0" title="Check this step">
            {loadingStepKey === k('s1') ? <span className="animate-pulse text-xs">...</span> : <BookOpen className="h-3.5 w-3.5" />}
          </Button>
          {stepFeedbackIcon(k('s1'))}
        </div>
        {renderAiResponse(k('s1'))}
      </div>

      {/* Step 2: Simplify */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <Input ref={setRef(s2_n1)} value={answers[s2_n1] || ''} onChange={(e) => onAnswerChange(s2_n1, e.target.value)} onFocus={() => setFocusedInput(s2_n1)} disabled={isSubmitted} className={getBoxClass(s2_n1)} />
              <span className="text-sm font-mono">÷</span>
              <Input ref={setRef(s2_gcd)} value={answers[s2_gcd] || ''} onChange={(e) => onAnswerChange(s2_gcd, e.target.value)} onFocus={() => setFocusedInput(s2_gcd)} disabled={isSubmitted} className={getBoxClass(s2_gcd)} />
            </div>
            <div className="w-24 h-px bg-foreground" />
            <div className="flex items-center gap-0.5">
              <Input ref={setRef(s2_d1)} value={answers[s2_d1] || ''} onChange={(e) => onAnswerChange(s2_d1, e.target.value)} onFocus={() => setFocusedInput(s2_d1)} disabled={isSubmitted} className={getBoxClass(s2_d1)} />
              <span className="text-sm font-mono">÷</span>
              <Input ref={setRef(s2_gcd2)} value={answers[s2_gcd2] || ''} onChange={(e) => onAnswerChange(s2_gcd2, e.target.value)} onFocus={() => setFocusedInput(s2_gcd2)} disabled={isSubmitted} className={getBoxClass(s2_gcd2)} />
            </div>
          </div>
          <span className="text-lg font-mono">=</span>
          <div className="inline-flex flex-col items-center gap-0.5">
            <Input ref={setRef(s2_fn)} value={answers[s2_fn] || ''} onChange={(e) => onAnswerChange(s2_fn, e.target.value)} onFocus={() => setFocusedInput(s2_fn)} disabled={isSubmitted} className={getBoxClass(s2_fn)} />
            <div className="w-10 h-px bg-foreground" />
            <Input ref={setRef(s2_fd)} value={answers[s2_fd] || ''} onChange={(e) => onAnswerChange(s2_fd, e.target.value)} onFocus={() => setFocusedInput(s2_fd)} disabled={isSubmitted} className={getBoxClass(s2_fd)} />
          </div>
          <Button variant="outline" size="sm" onClick={() => onCheckWork(k('s2'), 'Simplify the fraction')} disabled={isLoading || isSubmitted} className="shrink-0 h-7 w-7 p-0" title="Check this step">
            {loadingStepKey === k('s2') ? <span className="animate-pulse text-xs">...</span> : <BookOpen className="h-3.5 w-3.5" />}
          </Button>
          {stepFeedbackIcon(k('s2'))}
        </div>
        {renderAiResponse(k('s2'))}
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
