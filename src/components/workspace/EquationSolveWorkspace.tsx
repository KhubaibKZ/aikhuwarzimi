import { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HorizontalKeyboard } from './HorizontalKeyboard';
import { EquationStage } from '@/lib/pastPaperData';

interface EquationSolveWorkspaceProps {
  questionKey: string;
  stages: EquationStage[];
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
  stages,
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

  return (
    <div className="space-y-5">
      {stages.map((stage) => {
        const fullStepKey = k(stage.stepKey);
        return (
          <div key={stage.stepKey} className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-muted-foreground font-medium mr-1">{stage.label}</span>
              {stage.elements.map((el, i) => {
                if (el.type === 'text') {
                  return <span key={i} className="font-mono text-base">{el.value}</span>;
                }
                if (el.type === 'box' && el.key) {
                  return <span key={i}>{box(k(el.key), el.width || 'w-12')}</span>;
                }
                if (el.type === 'fraction') {
                  const renderSubElements = (elements: typeof el.numElements) => (
                    <div className="flex items-center gap-0.5">
                      {elements?.map((subEl, j) => {
                        if (subEl.type === 'text') return <span key={j} className="font-mono text-sm">{subEl.value}</span>;
                        if (subEl.type === 'box' && subEl.key) return <span key={j}>{box(k(subEl.key), subEl.width || 'w-10')}</span>;
                        return null;
                      })}
                    </div>
                  );
                  return (
                    <span key={i} className="inline-flex flex-col items-center mx-1">
                      {renderSubElements(el.numElements)}
                      <div className="w-full border-t border-foreground my-0.5" />
                      {renderSubElements(el.denElements)}
                    </span>
                  );
                }
                return null;
              })}
              {checkBtn(fullStepKey, stage.label)}
              {stepFeedbackIcon(fullStepKey)}
            </div>
            {renderAiResponse(fullStepKey)}
          </div>
        );
      })}

      {/* Show correct answer after submission */}
      {isSubmitted && correctAnswers && (
        <div className="text-sm text-green-600 font-medium space-y-0.5">
          {stages.map(stage => {
            const boxElements = stage.elements.filter(el => el.type === 'box' && el.key);
            const hasIncorrect = boxElements.some(el => feedback[k(el.key!)] === 'incorrect');
            if (!hasIncorrect) return null;
            return (
              <p key={stage.stepKey}>
                {stage.label}: {boxElements.map(el => correctAnswers[k(el.key!)] || '').join(', ')}
              </p>
            );
          })}
        </div>
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
