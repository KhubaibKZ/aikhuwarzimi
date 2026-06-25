import { useState, useRef, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, BookOpen, Trash2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HorizontalKeyboard } from './HorizontalKeyboard';
import { EquationStage } from '@/lib/pastPaperData';
import { Radical } from '@/components/Radical';
import { VecText } from '@/components/VecText';

interface StructuredExtraStep {
  afterStepKey: string; // insert rows after this stage
  initialBoxes: number; // e.g. 3
  hasOperators?: boolean; // if true, render small operator box between value boxes
  boxWidth?: string;
  opWidth?: string;
  noTrailingEquals?: boolean; // if true, omit "= [box]" tail
  initialRows?: number; // if set, pre-populate that many rows on mount
}

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
  allowCustomSteps?: boolean;
  structuredExtraStep?: StructuredExtraStep;
  customStepsAfterStepKey?: string; // insert "My working" block right after this stage
  customStepTemplate?: 'text' | 'fraction' | 'lhs_rhs'; // shape of each newly added custom step
  initialCustomSteps?: number; // pre-seed N custom-step rows on mount
  customStepsBefore?: boolean; // if true, render the custom steps block BEFORE the predefined stages
  hideOwnKeyboard?: boolean; // suppress this workspace's bottom keyboard (use shared one)
  onActiveKeyHandler?: (handler: ((k: string) => void) | null) => void;
}

// Custom step token model
type CustomPart =
  | { kind: 'txt'; s: string }
  | { kind: 'frac'; n: string; d: string }
  | { kind: 'sep'; v: string };
type CustomStep = CustomPart[];

// Rich keyboard used in the "My working" custom steps area
const RICH_EQ_KEYBOARD: string[][] = [
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['x', 'y', 'a', 'b', 'n', '+', '−', '×', '÷', '='],
  ['(', ')', '.', '²', '³', '√', 'π', 'a/b', '⌫', 'Clear'],
];

const newStep = (template: 'text' | 'fraction' | 'lhs_rhs' = 'text'): CustomStep => {
  if (template === 'fraction') return [{ kind: 'frac', n: '', d: '' }];
  if (template === 'lhs_rhs')
    return [
      { kind: 'txt', s: '' },
      { kind: 'sep', v: '=' },
      { kind: 'txt', s: '' },
    ];
  return [{ kind: 'txt', s: '' }];
};

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
  keyboardKeys,
  allowCustomSteps,
  structuredExtraStep,
  customStepsAfterStepKey,
  customStepTemplate = 'text',
  initialCustomSteps = 0,
  customStepsBefore = false,
  hideOwnKeyboard = false,
  onActiveKeyHandler,
}: EquationSolveWorkspaceProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Predefined-stage answer typing
  const k = (suffix: string) => `${questionKey}_${suffix}`;

  // Structured extra rows: each row is array of box counts. Boxes are removable individually.
  // Row state: array of arrays of boolean (true = present). Operator boxes mirror value-box presence.
  const [extraRows, setExtraRows] = useState<boolean[][]>(() => {
    if (structuredExtraStep?.initialRows && structuredExtraStep.initialRows > 0) {
      return Array.from({ length: structuredExtraStep.initialRows }, () =>
        Array.from({ length: structuredExtraStep.initialBoxes }, () => true),
      );
    }
    return [];
  });

  // ===== Custom steps state =====
  const [customSteps, setCustomSteps] = useState<CustomStep[]>(() =>
    initialCustomSteps > 0
      ? Array.from({ length: initialCustomSteps }, () => newStep(customStepTemplate))
      : [],
  );
  // focusedSlot identifies which buffer we are typing into:
  //  format: `cs:${stepIdx}:${partIdx}:${slot}` where slot ∈ {'txt','n','d'}
  const [focusedSlot, setFocusedSlot] = useState<string | null>(null);

  const parseSlot = (s: string | null) => {
    if (!s || !s.startsWith('cs:')) return null;
    const [, si, pi, slot] = s.split(':');
    return { si: +si, pi: +pi, slot: slot as 'txt' | 'n' | 'd' };
  };

  const updateBuffer = (mut: (buf: string) => string) => {
    const f = parseSlot(focusedSlot);
    if (!f) return;
    setCustomSteps((prev) => {
      const next = prev.map((step, i) => {
        if (i !== f.si) return step;
        return step.map((p, j) => {
          if (j !== f.pi) return p;
          if (p.kind === 'txt' && f.slot === 'txt') return { ...p, s: mut(p.s) };
          if (p.kind === 'frac' && f.slot === 'n') return { ...p, n: mut(p.n) };
          if (p.kind === 'frac' && f.slot === 'd') return { ...p, d: mut(p.d) };
          return p;
        });
      });
      return next;
    });
  };

  const insertFractionAtFocus = () => {
    const f = parseSlot(focusedSlot);
    if (!f) return;
    let newSlot = focusedSlot;
    setCustomSteps((prev) => {
      const next = prev.map((step) => step.slice());
      const step = next[f.si];
      if (!step) return prev;
      const cur = step[f.pi];
      // Case A: focused on empty txt → replace it in place with frac, ensure trailing txt
      if (cur && cur.kind === 'txt' && cur.s === '') {
        step.splice(f.pi, 1, { kind: 'frac', n: '', d: '' });
        if (!step[f.pi + 1] || step[f.pi + 1].kind !== 'txt') {
          step.splice(f.pi + 1, 0, { kind: 'txt', s: '' });
        }
        newSlot = `cs:${f.si}:${f.pi}:n`;
      } else {
        // Case B: insert after current part
        const insertAt = f.pi + 1;
        const toInsert: CustomPart[] = [{ kind: 'frac', n: '', d: '' }];
        const nextPart = step[insertAt];
        if (!nextPart || nextPart.kind !== 'txt') {
          toInsert.push({ kind: 'txt', s: '' });
        }
        step.splice(insertAt, 0, ...toInsert);
        newSlot = `cs:${f.si}:${insertAt}:n`;
      }
      return next;
    });
    setTimeout(() => setFocusedSlot(newSlot), 0);
  };

  // Serialize a custom step into a readable string for the AI tutor
  const serializeStep = (step: CustomStep): string =>
    step
      .map((p) => {
        if (p.kind === 'txt') return p.s;
        if (p.kind === 'sep') return ` ${p.v} `;
        const n = p.n || '?';
        const d = p.d || '?';
        return `(${n})/(${d})`;
      })
      .join('')
      .trim();

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isSubmitted) return;

      // Unicode fraction characters → insert as a real stacked fraction part
      const FRAC_MAP: Record<string, [string, string]> = {
        '½': ['1', '2'], '⅓': ['1', '3'], '⅔': ['2', '3'],
        '¼': ['1', '4'], '¾': ['3', '4'],
        '⅕': ['1', '5'], '⅖': ['2', '5'], '⅗': ['3', '5'], '⅘': ['4', '5'],
        '⅙': ['1', '6'], '⅚': ['5', '6'],
        '⅛': ['1', '8'], '⅜': ['3', '8'], '⅝': ['5', '8'], '⅞': ['7', '8'],
      };

      // Custom steps focused?
      if (focusedSlot?.startsWith('cs:')) {
        if (key === 'a/b') return insertFractionAtFocus();
        if (FRAC_MAP[key]) {
          // Insert a stacked fraction with the unicode value's numerator/denominator
          const [n, d] = FRAC_MAP[key];
          const f = parseSlot(focusedSlot);
          if (!f) return;
          let newSlot = focusedSlot;
          setCustomSteps((prev) => {
            const next = prev.map((step) => step.slice());
            const step = next[f.si];
            if (!step) return prev;
            const cur = step[f.pi];
            if (cur && cur.kind === 'txt' && cur.s === '') {
              step.splice(f.pi, 1, { kind: 'frac', n, d });
              if (!step[f.pi + 1] || step[f.pi + 1].kind !== 'txt') {
                step.splice(f.pi + 1, 0, { kind: 'txt', s: '' });
              }
              newSlot = `cs:${f.si}:${f.pi + 1}:txt`;
            } else {
              const insertAt = f.pi + 1;
              const toInsert: CustomPart[] = [{ kind: 'frac', n, d }];
              const nextPart = step[insertAt];
              if (!nextPart || nextPart.kind !== 'txt') toInsert.push({ kind: 'txt', s: '' });
              step.splice(insertAt, 0, ...toInsert);
              newSlot = `cs:${f.si}:${insertAt + 1}:txt`;
            }
            return next;
          });
          setTimeout(() => setFocusedSlot(newSlot), 0);
          return;
        }
        if (key === '⌫') return updateBuffer((s) => s.slice(0, -1));
        if (key === 'Clear') {
          const f = parseSlot(focusedSlot);
          if (!f) return;
          setCustomSteps((prev) =>
            prev.map((step, i) => (i === f.si ? newStep(customStepTemplate) : step)),
          );
          const initSlot = customStepTemplate === 'fraction' ? 'n' : 'txt';
          setFocusedSlot(`cs:${f.si}:0:${initSlot}`);
          return;
        }
        return updateBuffer((s) => s + key);
      }

      // Predefined-stage <Input> editing path
      if (!focusedInput) return;
      const input = inputRefs.current[focusedInput];
      if (!input) return;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const cur = answers[focusedInput] || '';
      const apply = (v: string, caret: number) => {
        onAnswerChange(focusedInput, v);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(caret, caret);
        }, 0);
      };
      if (key === '⌫') {
        if (start === end && start > 0) apply(cur.slice(0, start - 1) + cur.slice(end), start - 1);
        else if (start !== end) apply(cur.slice(0, start) + cur.slice(end), start);
      } else if (key === 'Clear') {
        apply('', 0);
      } else if (key === 'a/b') {
        // ignore in normal inputs
      } else {
        apply(cur.slice(0, start) + key + cur.slice(end), start + key.length);
      }
    },
    [focusedInput, focusedSlot, isSubmitted, answers, onAnswerChange],
  );

  const setRef = useCallback(
    (id: string) => (el: HTMLInputElement | null) => {
      inputRefs.current[id] = el;
    },
    [],
  );

  const box = (id: string, width: string = 'w-12') => (
    <Input
      ref={setRef(id)}
      value={answers[id] || ''}
      onChange={(e) => onAnswerChange(id, e.target.value)}
      onFocus={() => {
        setFocusedInput(id);
        setFocusedSlot(null);
      }}
      disabled={isSubmitted}
      className={cn(
        `${width} h-9 text-center font-mono text-base p-0 rounded-xl border-2 border-border/70 bg-transparent`,
        feedback[id] === 'correct' && 'border-green-500 bg-green-500/5',
        feedback[id] === 'incorrect' && 'border-destructive bg-destructive/5',
        focusedInput === id && 'ring-2 ring-primary/30',
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
      <div
        className={cn(
          'rounded-lg border p-2 text-sm mt-1',
          aiResponse.type === 'hint'
            ? 'border-amber-500/30 bg-amber-500/10'
            : 'border-blue-500/30 bg-blue-500/10',
        )}
      >
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="whitespace-pre-line">{aiResponse.content}</p>
        </div>
      </div>
    );
  };

  // ===== Custom step rendering =====
  const slotClasses = (slot: string, content: string, baseW: string) => {
    const focused = focusedSlot === slot;
    return cn(
      baseW,
      'inline-flex items-center justify-center px-1.5 min-h-[1.75rem] rounded border font-mono text-base cursor-text whitespace-pre',
      focused ? 'border-primary ring-2 ring-primary/30 bg-primary/5' : 'border-muted-foreground/30',
      content === '' && 'text-muted-foreground/50',
    );
  };

  const clearSlot = (slot: string) => {
    const f = parseSlot(slot);
    if (!f) return;
    setCustomSteps((prev) =>
      prev.map((step, i) => {
        if (i !== f.si) return step;
        return step.map((p, j) => {
          if (j !== f.pi) return p;
          if (p.kind === 'txt' && f.slot === 'txt') return { ...p, s: '' };
          if (p.kind === 'frac' && f.slot === 'n') return { ...p, n: '' };
          if (p.kind === 'frac' && f.slot === 'd') return { ...p, d: '' };
          return p;
        });
      }),
    );
    setFocusedSlot(slot);
  };

  const removeFracPart = (si: number, pi: number) => {
    setCustomSteps((prev) =>
      prev.map((step, i) => {
        if (i !== si) return step;
        const next = step.filter((_, j) => j !== pi);
        // Collapse adjacent txt parts
        const merged: CustomPart[] = [];
        for (const p of next) {
          const last = merged[merged.length - 1];
          if (last && last.kind === 'txt' && p.kind === 'txt') {
            merged[merged.length - 1] = { kind: 'txt', s: last.s + p.s };
          } else {
            merged.push(p);
          }
        }
        if (merged.length === 0) merged.push({ kind: 'txt', s: '' });
        return merged;
      }),
    );
    setFocusedSlot(null);
  };

  const writeSlot = (slot: string, value: string) => {
    const f = parseSlot(slot);
    if (!f) return;
    setCustomSteps((prev) =>
      prev.map((step, i) => {
        if (i !== f.si) return step;
        return step.map((p, j) => {
          if (j !== f.pi) return p;
          if (p.kind === 'txt' && f.slot === 'txt') return { ...p, s: value };
          if (p.kind === 'frac' && f.slot === 'n') return { ...p, n: value };
          if (p.kind === 'frac' && f.slot === 'd') return { ...p, d: value };
          return p;
        });
      }),
    );
  };

  const renderTxt = (text: string, slot: string, minW = 'min-w-[2rem]', _showClear = true) => {
    const isFocused = focusedSlot === slot;
    const widthCh = Math.max(2, text.length + 1);
    return (
      <span key={slot} className="relative inline-flex group/slot">
        <input
          type="text"
          value={text}
          disabled={isSubmitted}
          onChange={(e) => writeSlot(slot, e.target.value)}
          onFocus={() => {
            setFocusedSlot(slot);
            setFocusedInput(null);
          }}
          style={{ width: `${widthCh}ch` }}
          className={cn(
            minW,
            'inline-flex items-center justify-center px-1.5 min-h-[1.75rem] rounded border font-mono text-base bg-transparent text-foreground text-center outline-none',
            isFocused ? 'border-primary ring-2 ring-primary/30 bg-primary/5' : 'border-muted-foreground/30',
          )}
        />
      </span>
    );
  };

  const renderFrac = (n: string, d: string, slotN: string, slotD: string, si: number, pi: number) => {
    const isFocused = focusedSlot === slotN || focusedSlot === slotD;

    return (
    <span key={`${slotN}|${slotD}`} className="relative inline-flex flex-col items-center mx-1 align-middle group/frac">
      {renderTxt(n, slotN, 'min-w-[8rem]')}
      <span className="block w-full border-t border-foreground my-0.5" />
      {renderTxt(d, slotD, 'min-w-[8rem]')}
      {!isSubmitted && (
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFracPart(si, pi);
          }}
          className={cn(
            'absolute -top-2 -right-2 z-10 h-5 w-5 rounded-full bg-muted border border-border text-muted-foreground/90 hover:text-destructive hover:bg-destructive/10 flex items-center justify-center opacity-100 shadow-sm',
          )}
          title="Remove fraction"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
    );
  };

  const renderStage = (stage: EquationStage) => {
    const fullStepKey = k(stage.stepKey);
    const hasCheckable = stage.elements.some(
      (el) => el.type === 'box' || el.type === 'fraction' || el.type === 'sqrt',
    );
    return (
      <div key={stage.stepKey} className="space-y-0.5">
        <div className="flex items-center gap-1 flex-wrap">
          {stage.label && (
            <span className="text-sm text-foreground/80 font-medium mr-1">{stage.label}</span>
          )}
          {stage.elements.map((el, i) => {
            if (el.type === 'text') {
              return (
                <VecText key={i} value={el.value} className="font-mono text-base" />
              );
            }
            if (el.type === 'box' && el.key) {
              return <span key={i}>{box(k(el.key), el.width || 'w-12')}</span>;
            }
            if (el.type === 'fraction') {
              const renderSubElements = (elements: typeof el.numElements) => (
                <div className="flex items-center gap-0.5">
                  {elements?.map((subEl, j) => {
                    if (subEl.type === 'text')
                      return (
                        <VecText key={j} value={subEl.value} className="font-mono text-sm" />
                      );
                    if (subEl.type === 'box' && subEl.key)
                      return <span key={j}>{box(k(subEl.key), subEl.width || 'w-10')}</span>;
                    return null;
                  })}
                </div>
              );
              const frac = (
                <span className="inline-flex flex-col items-center mx-1">
                  {renderSubElements(el.numElements)}
                  <div className="w-full border-t border-foreground my-0.5" />
                  {renderSubElements(el.denElements)}
                </span>
              );
              if (el.sqrt) {
                return <Radical key={i}>{frac}</Radical>;
              }
              return <span key={i}>{frac}</span>;
            }
            if (el.type === 'sqrt') {
              return (
                <Radical key={i}>
                  <span className="flex items-center gap-1">
                    {el.innerElements?.map((subEl, j) => {
                      if (subEl.type === 'text')
                        return <VecText key={j} value={subEl.value} className="font-mono text-base" />;
                      if (subEl.type === 'box' && subEl.key)
                        return <span key={j}>{box(k(subEl.key), subEl.width || 'w-12')}</span>;
                      return null;
                    })}
                  </span>
                </Radical>
              );
            }
            return null;
          })}
          {hasCheckable && checkBtn(fullStepKey, stage.label || stage.stepKey)}
          {hasCheckable && stepFeedbackIcon(fullStepKey)}
        </div>
        {renderAiResponse(fullStepKey)}
      </div>
    );
  };

  const renderExtraRow = (rowIdx: number) => {
    if (!structuredExtraStep) return null;
    const presence = extraRows[rowIdx];
    const boxW = structuredExtraStep.boxWidth || 'w-14';
    const opW = structuredExtraStep.opWidth || 'w-8';
    const removeBox = (bi: number) => {
      setExtraRows((prev) =>
        prev.map((r, i) => (i === rowIdx ? r.map((p, j) => (j === bi ? false : p)) : r)),
      );
      onAnswerChange(k(`extra_${rowIdx}_v${bi}`), '');
      onAnswerChange(k(`extra_${rowIdx}_o${bi}`), '');
    };
    const removeRow = () => {
      setExtraRows((prev) => prev.filter((_, i) => i !== rowIdx));
    };
    // Build a serialized representation of this row's content and sync to
    // answers[`custom_${rowIdx}`] so PastPaperWorkspace's "_custom_" branch
    // (which sends the full expression to the AI tutor) handles the check.
    const customKey = k(`custom_${rowIdx}`);
    const parts: string[] = [];
    presence.forEach((present, bi) => {
      if (!present) return;
      const v = (answers[k(`extra_${rowIdx}_v${bi}`)] || '').trim();
      if (v) parts.push(v);
      const showOp = bi < presence.length - 1 && presence.slice(bi + 1).some(Boolean);
      if (showOp) {
        const o = (answers[k(`extra_${rowIdx}_o${bi}`)] || '').trim();
        if (o) parts.push(o);
      }
    });
    const serialized = parts.join(' ');
    if ((answers[customKey] || '') !== serialized) {
      setTimeout(() => onAnswerChange(customKey, serialized), 0);
    }

    return (
      <div key={`extra_${rowIdx}`} className="flex items-center gap-1.5 flex-wrap">
        {presence.map((present, bi) =>
          present ? (
            <span key={bi} className="inline-flex flex-col items-center gap-0.5">
              <button
                type="button"
                onClick={() => removeBox(bi)}
                disabled={isSubmitted}
                className="h-4 w-4 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center"
                title="Remove this box"
              >
                <X className="h-3 w-3" />
              </button>
              <span className="inline-flex items-center gap-1">
                {box(k(`extra_${rowIdx}_v${bi}`), boxW)}
                {bi < presence.length - 1 && presence.slice(bi + 1).some(Boolean) && (
                  <span>{box(k(`extra_${rowIdx}_o${bi}`), opW)}</span>
                )}
              </span>
            </span>
          ) : null,
        )}
        {!structuredExtraStep.noTrailingEquals && (
          <>
            <span className="font-mono text-base">=</span>
            {box(k(`extra_${rowIdx}_eq`), boxW)}
          </>
        )}
        {checkBtn(customKey, `Step ${rowIdx + 1}`)}
        {stepFeedbackIcon(customKey)}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isSubmitted}
          onClick={removeRow}
          className="h-7 w-7 p-0 opacity-50 hover:opacity-100"
          title="Remove step"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
        {renderAiResponse(customKey)}
      </div>
    );
  };

  const addExtraRow = () => {
    if (!structuredExtraStep) return;
    setExtraRows((prev) => [
      ...prev,
      Array.from({ length: structuredExtraStep.initialBoxes }, () => true),
    ]);
  };

  const splitAfterKey = structuredExtraStep?.afterStepKey || customStepsAfterStepKey;
  const stagesBefore: EquationStage[] = [];
  const stagesAfter: EquationStage[] = [];
  if (splitAfterKey) {
    let crossed = false;
    stages.forEach((s) => {
      if (!crossed) {
        stagesBefore.push(s);
        if (s.stepKey === splitAfterKey) crossed = true;
      } else {
        stagesAfter.push(s);
      }
    });
  }
  const useSplit = !!splitAfterKey;

  const customStepsBlock = allowCustomSteps ? (
    <div className="space-y-3 border-t pt-4">
      <div className="flex items-center justify-end">

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSubmitted}
          onClick={() => {
            setCustomSteps((prev) => {
              const next = [...prev, newStep(customStepTemplate)];
              const initSlot = customStepTemplate === 'fraction' ? 'n' : 'txt';
              setTimeout(() => setFocusedSlot(`cs:${next.length - 1}:0:${initSlot}`), 0);
              return next;
            });
          }}
          className="h-7 text-xs gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Add step
        </Button>
      </div>

      {customSteps.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          Click <span className="font-medium">+ Add step</span> to start writing your own
          equation lines.
        </p>
      )}

      {customSteps.map((step, si) => {
        const customKey = k(`custom_${si}`);
        const serialized = serializeStep(step);
        if (answers[customKey] !== serialized) {
          setTimeout(() => onAnswerChange(customKey, serialized), 0);
        }
        return (
          <div key={si} className="space-y-1">
            <div
              className="flex items-start gap-2 group"
              onClick={() => {
                if (!focusedSlot?.startsWith(`cs:${si}:`)) {
                  const initSlot = step[0]?.kind === 'frac' ? 'n' : 'txt';
                  setFocusedSlot(`cs:${si}:0:${initSlot}`);
                  setFocusedInput(null);
                }
              }}
            >
              <span className="text-xs text-muted-foreground w-6 text-right pt-2">
                {si + 1}.
              </span>
              <div
                className={cn(
                  'flex-1 flex flex-wrap items-center gap-1 rounded border bg-background/40 px-2 py-2 min-h-[2.75rem]',
                  focusedSlot?.startsWith(`cs:${si}:`) && 'border-primary/60',
                  feedback[customKey] === 'correct' && 'border-green-500 bg-green-500/5',
                  feedback[customKey] === 'incorrect' && 'border-destructive bg-destructive/5',
                )}
              >
                {step.length === 1 && step[0].kind === 'txt' ? (
                  <input
                    type="text"
                    value={step[0].s}
                    disabled={isSubmitted}
                    onChange={(e) => writeSlot(`cs:${si}:0:txt`, e.target.value)}
                    onFocus={() => {
                      setFocusedSlot(`cs:${si}:0:txt`);
                      setFocusedInput(null);
                    }}
                    placeholder="Write your step here..."
                    className="flex-1 w-full min-h-[1.75rem] bg-transparent font-mono text-base text-foreground outline-none border-0 px-1"
                  />
                ) : step.map((part, pi) => {
                  if (part.kind === 'txt') {
                    return renderTxt(part.s, `cs:${si}:${pi}:txt`, 'min-w-[8rem]');
                  }
                  if (part.kind === 'sep') {
                    return (
                      <span key={`sep-${pi}`} className="font-mono text-base px-1">
                        {part.v}
                      </span>
                    );
                  }
                  return renderFrac(
                    part.n,
                    part.d,
                    `cs:${si}:${pi}:n`,
                    `cs:${si}:${pi}:d`,
                    si,
                    pi,
                  );
                })}

              </div>
              {checkBtn(customKey, `My step ${si + 1}`)}
              {stepFeedbackIcon(customKey)}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSubmitted}
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomSteps((prev) => prev.filter((_, i) => i !== si));
                  if (focusedSlot?.startsWith(`cs:${si}:`)) setFocusedSlot(null);
                }}
                className="h-7 w-7 p-0 opacity-50 group-hover:opacity-100"
                title="Delete step"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            {renderAiResponse(customKey)}
          </div>
        );
      })}
    </div>
  ) : null;

  const customStepsInline = allowCustomSteps && !!customStepsAfterStepKey;

  // Publish/unpublish the active key-press handler so a parent can render a single shared keyboard.
  useEffect(() => {
    if (!hideOwnKeyboard || !onActiveKeyHandler) return;
    if (focusedInput || focusedSlot) {
      onActiveKeyHandler(handleKeyPress);
    }
  }, [focusedInput, focusedSlot, handleKeyPress, hideOwnKeyboard, onActiveKeyHandler]);

  return (
    <div className="space-y-5">
      {customStepsBefore && allowCustomSteps && customStepsBlock}

      {(useSplit ? stagesBefore : stages).map(renderStage)}

      {structuredExtraStep && (
        <div className="space-y-2">
          {extraRows.map((_, idx) => renderExtraRow(idx))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSubmitted}
            onClick={addExtraRow}
            className="h-7 text-xs gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            Add step
          </Button>
        </div>
      )}

      {customStepsInline && customStepsBlock}

      {useSplit && stagesAfter.map(renderStage)}

      {isSubmitted && correctAnswers && (
        <div className="text-sm text-green-600 font-medium space-y-0.5">
          {stages.map((stage) => {
            const boxElements = stage.elements.filter((el) => el.type === 'box' && el.key);
            const hasIncorrect = boxElements.some((el) => feedback[k(el.key!)] === 'incorrect');
            if (!hasIncorrect) return null;
            return (
              <p key={stage.stepKey}>
                <VecText value={stage.label || ''} />:{' '}
                {boxElements.map((el) => correctAnswers[k(el.key!)] || '').join(', ')}
              </p>
            );
          })}
        </div>
      )}

      {!customStepsInline && !customStepsBefore && customStepsBlock}

      {!hideOwnKeyboard && (
        <div className="border-t pt-3">
          <HorizontalKeyboard
            keys={keyboardKeys}
            onKeyPress={handleKeyPress}
            disabled={isSubmitted || (!focusedInput && !focusedSlot)}
          />
        </div>
      )}
    </div>
  );
}
