import { useState, useRef, useEffect, useCallback, forwardRef, type ReactNode, type MutableRefObject } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PastPaperQuestion, pastPapers } from '@/lib/pastPaperData';
import { getQuestionSyllabusRef } from '@/lib/questionTopicMap';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, XCircle, Lightbulb, Award, RotateCcw, Send, BookOpen, HelpCircle, Clock, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useStudentAssignments } from '@/hooks/useStudentAssignments';
import { VecText } from '@/components/VecText';
import { PrimeFactorLadder } from '@/components/PrimeFactorLadder';
import { QuestionText } from '@/components/QuestionText';
import { LCMLadder } from '@/components/LCMLadder';
import { TriangleDiagram } from '@/components/TriangleDiagram';
import { StepWorkspace, FractionDivisionWorkspace, EquationSolveWorkspace } from '@/components/workspace';
import { HorizontalKeyboard } from '@/components/workspace/HorizontalKeyboard';
import { getKeyboardConfig } from '@/lib/keyboardConfigs';
import { 
  CoordinateGrid, 
  PrismDiagram, 
  CirclesInRectangle, 
  ParallelogramDiagram,
  IsoscelesTriangleDiagram,
  DigitalProtractor,
  ReciprocalGraph,
  VennDiagram,
  CuboidDiagram,
  CubeDiagram,
  NumberLineDiagram,
  TrapeziumDiagram,
  IsoscelesExteriorDiagram,
  RectangularBoxDiagram,
  SymmetryShapes,
  CompositeRectangles,
  ScatterDiagram,
  SimilarTriangles,
  ConeDiagram,
  CircleDiagram,
  RectangleSectorDiagram,
  VectorTrapeziumDiagram,
  TransformationGrid,
  AngleMeasureDiagram,
  CylinderDiagram,
  VectorTriangleDiagram,
  QuadrilateralDiagram,
  HistogramDiagram,
  BearingDiagram,
  BarChart2023ON,
  ParallelLines2023ON,
  CircleTheorem2023ON,
  SpeedTimeGraph2023ON,
  VectorParallelogram2023ON,
  VennDiagram3Set2023ON,
  VennDiagramGHF_2023ON,
  ScatterDiagram2023ON,
  ScaleDrawing2023ON,
  RectangleSquares_4024_12_2023ON,
  ParallelLines_4024_12_2023ON,
  TransformGrid_4024_12_2023ON,
  TriangleConstruct_4024_12_2023ON,
  CumulativeFrequency_4024_12_2023ON,
  SpeedTime_4024_12_2023ON,
  TwoSectors_4024_12_2023ON,
  VennHSG_4024_12_2023ON,
  TriangleOAB_4024_12_2023ON
} from '@/components/diagrams';
import { InequalityRegionBuilder, evaluateQ16, Q16_EXPECTED, EMPTY_Q16, type Q16Data } from '@/components/diagrams/InequalityRegionBuilder';
import { FunctionGraphPlotter, EMPTY_FN_GRAPH, type FunctionGraphData } from '@/components/diagrams/FunctionGraphPlotter';
import { themeSvgMarkup } from '@/lib/svgTheme';
import { InlineMathToolbar, insertAtCaret } from '@/components/editor/InlineMathToolbar';

export interface SubmitProgressPayload {
  questionId: string;
  paperId: string;
  isCorrect: boolean;
  accuracyScore: number;
  speedScore: number;
  aiUsageCount: number;
  checkworkCount: number;
  timeSpentSeconds: number;
  totalSteps: number;
  completedSteps: number;
  marksObtained: number;
  marksAvailable: number;
  submittedAt: string;
  submittedAnswers?: Record<string, string>;
}

interface PastPaperWorkspaceProps {
  question: PastPaperQuestion;
  isOpen: boolean;
  onClose: () => void;
  workspaceMode?: 'general' | 'student';
  onSubmitProgress?: (payload: SubmitProgressPayload) => void;
  restoredSubmission?: { answers: Record<string, string>; timeSpentSeconds: number } | null;
  onResetExternal?: () => void;
  editMode?: boolean;
  onEditField?: (field: 'title' | 'question' | 'topicTitle' | 'subtopicCode' | 'subtopicTitle' | 'marks' | 'diagramSvgMarkup' | 'extraQuestionBlocks' | `hint:${number}`, value: string | any[]) => void;
  onAddHint?: () => void;
  onRemoveHint?: (index: number) => void;
  headerActions?: ReactNode;
  topCenterToggle?: ReactNode;
  solutionOverride?: ReactNode;
  onAddQuestionSection?: () => void;
}

const InlineEditableText = forwardRef<HTMLDivElement, {
  value: string;
  onCommit: (value: string) => void;
  className?: string;
  multiline?: boolean;
}>(function InlineEditableText({ value, onCommit, className, multiline = false }, forwardedRef) {
  const innerRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (typeof forwardedRef === 'function') forwardedRef(innerRef.current);
    else if (forwardedRef) (forwardedRef as MutableRefObject<HTMLDivElement | null>).current = innerRef.current;
  });

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.innerText !== value) el.innerText = value;
    lastValueRef.current = value;
  }, [value]);

  return (
    <div
      ref={innerRef}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline={multiline}
      onInput={(e) => {
        const next = e.currentTarget.innerText.replace(/\u00a0/g, ' ');
        lastValueRef.current = next;
        onCommit(next);
      }}
      onKeyDown={(e) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      className={cn(
        'rounded-md border border-dashed border-transparent bg-transparent px-2 py-1 outline-none transition-colors hover:border-border focus:border-primary focus:bg-muted/40 whitespace-pre-wrap',
        className,
      )}
    />
  );
});

/**
 * Additional editable question blocks. Each block has its own text (with
 * symbol/fraction toolbar) and an optional uploaded SVG diagram.
 * In preview / student mode, rendered read-only as QuestionText + SVG.
 */
type ExtraQB = { id: string; text: string; svgMarkup?: string };
const newExtraQB = (): ExtraQB => ({ id: Math.random().toString(36).slice(2, 10), text: '' });

function ExtraQuestionBlocks({
  blocks,
  editMode,
  onChange,
  showAddButton = true,
}: {
  blocks: ExtraQB[];
  editMode: boolean;
  onChange: (next: ExtraQB[]) => void;
  showAddButton?: boolean;
}) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const update = (id: string, patch: Partial<ExtraQB>) =>
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const remove = (id: string) => onChange(blocks.filter((b) => b.id !== id));
  const move = (id: string, dir: -1 | 1) => {
    const i = blocks.findIndex((b) => b.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  if (!editMode) {
    if (!blocks.length) return null;
    return (
      <div className="mt-4 space-y-4">
        {blocks.map((b) => (
          <div key={b.id} className="space-y-2">
            {b.text && <QuestionText text={b.text} />}
            {b.svgMarkup && (
              <div
                className="flex justify-center text-foreground [&_svg]:max-w-full [&_svg]:max-h-[60vh] [&_svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: themeSvgMarkup(b.svgMarkup) }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {blocks.map((b, idx) => (
        <div key={b.id} className="group rounded-lg border border-dashed border-border bg-background/40 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Question Block {idx + 2}
            </span>
            <div className="flex items-center gap-1 opacity-60 transition-opacity group-hover:opacity-100">
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(b.id, -1)} disabled={idx === 0}>
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(b.id, 1)} disabled={idx === blocks.length - 1}>
                <ArrowDown className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => remove(b.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <InlineMathToolbar
            onInsert={(t) => insertAtCaret(refs.current[b.id] || null, t)}
            hasSvg={!!b.svgMarkup}
            onUploadSvg={(svg) => update(b.id, { svgMarkup: svg })}
            onClearSvg={() => update(b.id, { svgMarkup: undefined })}
            onReplaceText={(t) => update(b.id, { text: t })}
          />

          <InlineEditableText
            ref={(el) => { refs.current[b.id] = el; }}
            value={b.text}
            onCommit={(v) => update(b.id, { text: v })}
            multiline
            className="text-foreground flex min-h-[72px] items-start px-0 py-0 text-base leading-7 hover:border-primary/40 focus:border-primary"
          />
          {b.svgMarkup && (
            <div
              className="mt-3 flex justify-center text-foreground [&_svg]:max-w-full [&_svg]:max-h-[60vh] [&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: themeSvgMarkup(b.svgMarkup) }}
            />
          )}
        </div>
      ))}
      {showAddButton && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange([...blocks, newExtraQB()])}
          className="gap-1"
        >
          <Plus className="h-3.5 w-3.5" /> Add question block
        </Button>
      )}
    </div>
  );
}

export function PastPaperWorkspace({
  question,
  isOpen,
  onClose,
  workspaceMode = 'general',
  onSubmitProgress,
  restoredSubmission,
  onResetExternal,
  editMode = false,
  onEditField,
  onAddHint,
  onRemoveHint,
  headerActions,
  topCenterToggle,
  solutionOverride,
  onAddQuestionSection,
}: PastPaperWorkspaceProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [storedMarksEarned, setStoredMarksEarned] = useState<Record<string, number>>({});
  const [storedMarkingNotes, setStoredMarkingNotes] = useState<Record<string, string>>({});
  const [diagramScores, setDiagramScores] = useState<Record<string, { marks: number; note: string }>>({});
  const questionEditableRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'hint' | 'check' | null>(null);
  const [loadingPartKey, setLoadingPartKey] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<{ type: 'hint' | 'guidance'; content: string; partKey?: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState<Record<string, number>>({});
  const { markExampleComplete } = useProgress();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { getPaperQuota, refetch: refetchAssignments } = useStudentAssignments();
  const startTimeRef = useRef(Date.now());
  const aiUsageRef = useRef(0);
  const checkworkUsageRef = useRef(0);
  const previousFeedbackRef = useRef<Record<string, string[]>>({});
  const activeKeyHandlerRef = useRef<((k: string) => void) | null>(null);
  const publishActiveKeyHandler = useCallback((h: ((k: string) => void) | null) => {
    activeKeyHandlerRef.current = h;
  }, []);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalTime, setFinalTime] = useState<number | null>(null);

  // Find paper for this question to get quota (only enforce in student mode)
  const matchedPaper = pastPapers.find(p => p.sections.some(s => s.questionId === question.id));
  const paperQuota = workspaceMode === 'student' && matchedPaper ? getPaperQuota(matchedPaper.id) : null;

  // Live timer
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Check if this question was already submitted when opening — restore answers & feedback
  useEffect(() => {
    if (!isOpen) return;

    // Demo / unauth path: restore from prop if provided, otherwise fresh
    if (!user) {
      if (restoredSubmission && restoredSubmission.answers) {
        const restoredAnswers = restoredSubmission.answers;
        setAnswers(restoredAnswers);
        const evaluation = checkAnswersInternal(restoredAnswers);
        setFeedback(evaluation.newFeedback);
        setStoredMarksEarned(evaluation.marksEarned);
        setStoredMarkingNotes(evaluation.markingNotes);
        setFinalTime(restoredSubmission.timeSpentSeconds ?? null);
        setIsSubmitted(true);
        setIsChecked(true);
      } else {
        setIsSubmitted(false);
        setIsChecked(false);
        setAnswers({});
        setFeedback({});
        setStoredMarksEarned({});
        setStoredMarkingNotes({});
        setAiResponse(null);
        setAttemptCount({});
        setFinalTime(null);
        startTimeRef.current = Date.now();
        aiUsageRef.current = 0;
        checkworkUsageRef.current = 0;
      }
      return;
    }

    const checkExistingSubmission = async () => {
      const { data } = await supabase
        .from('student_paper_progress')
        .select('id, submitted_answers, submitted_feedback, time_spent_seconds')
        .eq('user_id', user.id)
        .eq('question_id', question.id)
        .eq('workspace_mode', workspaceMode)
        .maybeSingle();
      if (data) {
        // Restore submitted state — read-only until paper reset
        const restoredAnswers = data.submitted_answers && typeof data.submitted_answers === 'object'
          ? data.submitted_answers as Record<string, string>
          : {};

        if (data.submitted_answers && typeof data.submitted_answers === 'object') {
          setAnswers(restoredAnswers);
        }

        const evaluation = checkAnswersInternal(restoredAnswers);
        setFeedback(evaluation.newFeedback);
        setStoredMarksEarned(evaluation.marksEarned);
        setStoredMarkingNotes(evaluation.markingNotes);

        if (data.time_spent_seconds != null) {
          setFinalTime(data.time_spent_seconds as number);
        }
        setIsSubmitted(true);
        setIsChecked(true);
      } else {
        // Fresh question — reset state
        setIsSubmitted(false);
        setIsChecked(false);
        setAnswers({});
        setFeedback({});
        setStoredMarksEarned({});
        setStoredMarkingNotes({});
        setAiResponse(null);
        setAttemptCount({});
        setFinalTime(null);
        startTimeRef.current = Date.now();
        aiUsageRef.current = 0;
        checkworkUsageRef.current = 0;
      }
    };
    checkExistingSubmission();
  }, [isOpen, user, question.id, workspaceMode, restoredSubmission]);

  const handleAnswerChange = (key: string, value: string) => {
    if (isSubmitted) return; // Don't allow changes once submitted
    setAnswers(prev => ({ ...prev, [key]: value }));
    setFeedback(prev => ({ ...prev, [key]: null }));
    setIsChecked(false);
    // Clear AI response only if it's for this part
    const q18RegionKeys = ['ronly', 'conly', 'sonly', 'rcOnly', 'rsOnly', 'csOnly', 'rcs', 'outside'];
    if (
      aiResponse?.partKey === key ||
      (question.id === 'pp_4024_on23_11_q18' && aiResponse?.partKey === 'a' && q18RegionKeys.includes(key))
    ) {
      setAiResponse(null);
    }
  };

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[²³]/g, (match) => match === '²' ? '^2' : '^3')
      .replace(/×/g, '*')
      .replace(/·/g, '*')
      .replace(/÷/g, '/')
      .replace(/[−–—]/g, '-')
      .trim();
  };

  const isPureNumber = (s: string): boolean => /^-?\d+(\.\d+)?$/.test(s);
  const isNumericallyEqual = (a: string, b: string): boolean => {
    if (!isPureNumber(a) || !isPureNumber(b)) return false;
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    return Math.abs(numA - numB) < 1e-9;
  };

  const evaluateFraction = (s: string): number | null => {
    const match = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
    if (match) {
      const num = parseFloat(match[1]);
      const den = parseFloat(match[2]);
      if (den !== 0) return num / den;
    }
    return null;
  };

  const toEvaluableMath = (expr: string): string => {
    let s = expr
      .replace(/\s+/g, '')
      .replace(/[−–—]/g, '-')
      .replace(/[×·]/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/²/g, '**2')
      .replace(/³/g, '**3')
      .replace(/\^/g, '**');

    s = s
      .replace(/(\d)([a-zA-Z(])/g, '$1*$2')
      .replace(/([a-zA-Z])\(/g, '$1*(')
      .replace(/\)([a-zA-Z0-9(])/g, ')*$1');

    return s;
  };

  const evaluateMathExpression = (expr: string, vars: Record<string, number>): number | null => {
    try {
      const keys = Object.keys(vars);
      const fn = new Function(...keys, `return ${toEvaluableMath(expr)};`);
      const value = fn(...keys.map((key) => vars[key]));
      return typeof value === 'number' && Number.isFinite(value) ? value : null;
    } catch {
      return null;
    }
  };

  const evaluateEquationDifference = (equation: string, vars: Record<string, number>): number | null => {
    const parts = equation.split('=').map((part) => part.trim());
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
    const left = evaluateMathExpression(parts[0], vars);
    const right = evaluateMathExpression(parts[1], vars);
    if (left === null || right === null) return null;
    return left - right;
  };

  const compareEquationFlow = (
    previousLine: string,
    studentLine: string,
    variableNames: string[],
  ): { verdict: 'correct' | 'wrong' | 'unknown'; ratio?: number } => {
    if (!previousLine.includes('=') || !studentLine.includes('=')) {
      return { verdict: 'unknown' };
    }

    const seeds = [1.7, 2.3, -1.5, 4.1, 0.6];
    const testVars = seeds.map((seed, idx) =>
      Object.fromEntries(
        variableNames.map((name, varIdx) => [name, seeds[(idx + varIdx) % seeds.length] + varIdx * 0.37]),
      ) as Record<string, number>,
    );

    const ratios: number[] = [];
    let sawComparablePoint = false;

    for (const vars of testVars) {
      const previousDiff = evaluateEquationDifference(previousLine, vars);
      const studentDiff = evaluateEquationDifference(studentLine, vars);

      if (previousDiff === null || studentDiff === null) {
        return { verdict: 'unknown' };
      }

      if (Math.abs(studentDiff) < 1e-9 && Math.abs(previousDiff) < 1e-9) {
        continue;
      }

      sawComparablePoint = true;

      if (Math.abs(studentDiff) < 1e-9) {
        return { verdict: 'wrong' };
      }

      ratios.push(previousDiff / studentDiff);
    }

    if (!sawComparablePoint) {
      return { verdict: 'correct', ratio: 1 };
    }

    if (ratios.length === 0) {
      return { verdict: 'unknown' };
    }

    const k0 = ratios[0];
    const equivalent = Math.abs(k0) > 1e-9 && ratios.every((ratio) => Math.abs(ratio - k0) < 1e-6);

    if (equivalent) return { verdict: 'correct', ratio: k0 };

    // Try the reverse direction (in case studentDiff is a polynomial multiple
    // of previousDiff rather than the other way around).
    const invRatios = ratios.map((r) => (Math.abs(r) > 1e-9 ? 1 / r : NaN)).filter((r) => Number.isFinite(r));
    if (invRatios.length === ratios.length && invRatios.length > 0) {
      const i0 = invRatios[0];
      const invEquivalent = Math.abs(i0) > 1e-9 && invRatios.every((r) => Math.abs(r - i0) < 1e-6);
      if (invEquivalent) return { verdict: 'correct', ratio: 1 / i0 };
    }

    // Ratio is non-constant. This is legitimate when the student multiplied
    // both sides by a polynomial (e.g. clearing a fractional denominator like
    // (x²-1) — a valid algebraic move). We cannot reliably distinguish this
    // from a real error using a constant-ratio test, so defer to the AI tutor
    // instead of false-flagging the line as wrong.
    return { verdict: 'unknown' };
  };

  const answersMatch = (userRaw: string, correctRaw: string): boolean => {
    const u = normalizeAnswer(userRaw);
    const c = normalizeAnswer(correctRaw);
    // Support pipe-separated alternatives e.g. '125|5^3'
    if (c.includes('|')) {
      return c.split('|').some(alt => answersMatch(userRaw, alt.trim()));
    }
    // Support comma-separated multi-value answers e.g. '0, 3' (both roots required, any order)
    if (c.includes(',') && u.includes(',')) {
      const cParts = c.split(',').map(s => s.trim()).filter(Boolean);
      const uParts = u.split(',').map(s => s.trim()).filter(Boolean);
      if (cParts.length !== uParts.length) return false;
      const used = new Array(cParts.length).fill(false);
      return cParts.every(cp => {
        const idx = uParts.findIndex((up, i) => !used[i] && answersMatch(up, cp));
        if (idx === -1) return false;
        used[idx] = true;
        return true;
      });
    }
    // If correct expects multiple comma-separated values but user gave only one → not a match
    if (c.includes(',') && !u.includes(',')) return false;
    if (u === c) return true;
    if (isNumericallyEqual(u, c)) return true;
    // Fraction equivalence: 5/20 = 1/4
    const uFrac = evaluateFraction(u);
    const cFrac = evaluateFraction(c);
    if (uFrac !== null && cFrac !== null && Math.abs(uFrac - cFrac) < 1e-9) return true;
    // Mixed: one is fraction, other is decimal
    if (uFrac !== null && isPureNumber(c) && Math.abs(uFrac - parseFloat(c)) < 1e-9) return true;
    if (cFrac !== null && isPureNumber(u) && Math.abs(parseFloat(u) - cFrac) < 1e-9) return true;
    // Commutative addition: accept terms in any order (e.g. a+b == b+a, 2x+2+12x-5x == 12x-5x+2x+2)
    const splitAdditiveTerms = (s: string): string[] | null => {
      const terms: string[] = [];
      let depth = 0;
      let cur = '';
      let sign = '+';
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        if (depth === 0 && (ch === '+' || ch === '-') && i > 0) {
          if (cur) terms.push(sign + cur);
          sign = ch;
          cur = '';
          continue;
        }
        cur += ch;
      }
      if (cur) terms.push(sign + cur);
      // Only meaningful if there are 2+ top-level additive terms
      return terms.length >= 2 ? terms : null;
    };
    const uTerms = splitAdditiveTerms(u);
    const cTerms = splitAdditiveTerms(c);
    if (uTerms && cTerms && uTerms.length === cTerms.length) {
      const used = new Array(cTerms.length).fill(false);
      const allMatch = uTerms.every((ut) => {
        const idx = cTerms.findIndex((ct, i) => !used[i] && ct === ut);
        if (idx === -1) return false;
        used[idx] = true;
        return true;
      });
      if (allMatch) return true;
    }
    return false;
  };

  const getLongestOrderedMatchCount = (userValues: string[], expectedValues: string[]): number => {
    const dp = Array.from({ length: userValues.length + 1 }, () => Array(expectedValues.length + 1).fill(0));

    for (let i = 1; i <= userValues.length; i++) {
      for (let j = 1; j <= expectedValues.length; j++) {
        if (userValues[i - 1] && expectedValues[j - 1] && answersMatch(userValues[i - 1], expectedValues[j - 1])) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[userValues.length][expectedValues.length];
  };

  const getOrderingPartialReason = (userValues: string[], expectedValues: string[]) => {
    const isFullyReversed =
      userValues.length === expectedValues.length &&
      expectedValues.length > 0 &&
      expectedValues.every((value, index) => answersMatch(userValues[index] || '', expectedValues[expectedValues.length - 1 - index] || ''));

    if (isFullyReversed) {
      return 'reversed' as const;
    }

    const orderedMatchCount = getLongestOrderedMatchCount(userValues, expectedValues);
    if (orderedMatchCount >= Math.max(1, expectedValues.length - 1)) {
      return 'three-correct' as const;
    }

    return null;
  };

  const getStructuredStageGroups = (partKey: string): string[][] => {
    const eqParts = (question as any).equationSolveParts as string[] | undefined;
    const stagesMap = (question as any).equationStagesMap;
    const eqStages = (question as any).equationStages;

    if (eqParts?.includes(partKey)) {
      const stages = stagesMap?.[partKey] || eqStages;
      if (stages?.length) {
        const extractBoxKeys = (elements: any[]): string[] => {
          const keys: string[] = [];
          elements.forEach((el: any) => {
            if (el.type === 'box' && el.key) keys.push(`${partKey}_${el.key}`);
            if (el.type === 'fraction') {
              if (el.numElements) keys.push(...extractBoxKeys(el.numElements));
              if (el.denElements) keys.push(...extractBoxKeys(el.denElements));
            }
          });
          return keys;
        };
        return stages
          .map((stage: any) => extractBoxKeys(stage.elements))
          .filter((keys: string[]) => keys.length > 0);
      }
    }

    if (typeof question.answer !== 'object') return [];

    const grouped = new Map<string, string[]>();
    Object.keys(question.answer)
      .filter((key) => key.startsWith(`${partKey}_`))
      .forEach((key) => {
        const stageMatch = key.match(new RegExp(`^${partKey}_(s\\d+)`));
        const stageKey = stageMatch?.[1] ?? 's1';
        grouped.set(stageKey, [...(grouped.get(stageKey) ?? []), key]);
      });

    return Array.from(grouped.entries())
      .sort((a, b) => Number(a[0].slice(1)) - Number(b[0].slice(1)))
      .map(([, keys]) => keys);
  };

  const getQ4PartialScore = (partKey: string, currentAnswers: Record<string, string>) => {
    if (question.id !== 'pp_4024_on23_11_q4' || partKey !== 'answer') return null;

    const finalValue = currentAnswers[`${partKey}_s2_c`] || currentAnswers[partKey] || '';
    const digitsOnly = finalValue.replace(/[^\d]/g, '');
    const finalIsCorrect = answersMatch(finalValue, '7.80');

    const usedCentsMethod =
      answersMatch(currentAnswers[`${partKey}_s1_a`] || '', '12') &&
      answersMatch(currentAnswers[`${partKey}_s1_b`] || '', '65') &&
      answersMatch(currentAnswers[`${partKey}_s1_c`] || '', '780');

    const usedDecimalMethod = (
      (answersMatch(currentAnswers[`${partKey}_s1_a`] || '', '12') && answersMatch(currentAnswers[`${partKey}_s1_b`] || '', '0.65')) ||
      (answersMatch(currentAnswers[`${partKey}_s1_a`] || '', '0.65') && answersMatch(currentAnswers[`${partKey}_s1_b`] || '', '12'))
    );

    const convertA = parseFloat(currentAnswers[`${partKey}_s2_a`] || '');
    const convertB = parseFloat(currentAnswers[`${partKey}_s2_b`] || '');
    const convertC = parseFloat(currentAnswers[`${partKey}_s2_c`] || '');
    const convertedOwnAnswerToDollars =
      !Number.isNaN(convertA) &&
      !Number.isNaN(convertB) &&
      !Number.isNaN(convertC) &&
      Math.abs(convertB - 100) < 1e-9 &&
      Math.abs((convertA / convertB) - convertC) < 1e-9;

    const hasDigits78 = digitsOnly === '78' || digitsOnly === '780';
    const methodEarned = usedCentsMethod || usedDecimalMethod || convertedOwnAnswerToDollars || hasDigits78;

    if (finalIsCorrect) {
      return {
        marks: 2,
        note: methodEarned
          ? 'M1 earned for correct working/conversion and A1 for the final dollar answer.'
          : 'A1 awarded with the correct final dollar answer.'
      };
    }

    if (methodEarned) {
      return {
        marks: 1,
        note: hasDigits78
          ? 'B1 awarded because the digits 78 were seen, matching the specimen partial-mark rule.'
          : 'M1 awarded for valid method/conversion, even though the final dollar answer is not yet correct.'
      };
    }

    return {
      marks: 0,
      note: 'No specimen method mark was seen yet for this part.'
    };
  };

  const checkAnswersInternal = (currentAnswers: Record<string, string> = answers) => {
    if (!question.answer) return { allCorrect: false, newFeedback: {}, marksEarned: {}, markingNotes: {} };

    // Q16: custom region+lines scoring
    if (question.id === 'pp_4024_on23_11_q16') {
      let data: Q16Data = EMPTY_Q16;
      try { data = JSON.parse(currentAnswers['q16_data'] || ''); } catch { /* ignore */ }
      const r = evaluateQ16(data, Q16_EXPECTED);
      // Expected line order: 0:x=1, 1:x=3, 2:y=2, 3:y=3, 4:y=x/2+1
      // To award B marks for line PAIRS, recompute matches against expected indices directly.
      const lf = r.lineFeedback;
      // r.lineFeedback is indexed by user-line order; instead reuse correctLineCount per expected slot by re-evaluating:
      // Build a per-expected-index correctness map by replaying lineMatches.
      const expectedHit = [false, false, false, false, false];
      const used = new Set<number>();
      for (const ul of data.lines) {
        if (!ul.a) continue;
        for (let i = 0; i < Q16_EXPECTED.lines.length; i++) {
          if (used.has(i)) continue;
          // inline match
          const e = Q16_EXPECTED.lines[i];
          if (ul.kind !== e.kind) continue;
          const ua = parseFloat(ul.a), ea = parseFloat(e.a);
          if (isNaN(ua) || isNaN(ea) || Math.abs(ua - ea) > 1e-6) continue;
          if (e.kind === 'linear') {
            const ub = parseFloat(ul.b || '0'), eb = parseFloat(e.b || '0');
            if (isNaN(ub) || isNaN(eb) || Math.abs(ub - eb) > 1e-6) continue;
          }
          used.add(i); expectedHit[i] = true; break;
        }
      }
      const xPairMark = (expectedHit[0] && expectedHit[1]) ? 1 : 0;
      const yPairMark = (expectedHit[2] && expectedHit[3]) ? 1 : 0;
      const linearMark = expectedHit[4] ? 1 : 0;
      const allLines = xPairMark === 1 && yPairMark === 1 && linearMark === 1;
      const regionB = r.regionCorrect ? 1 : 0;
      const total = (allLines && r.regionCorrect)
        ? question.marks
        : Math.min(question.marks, xPairMark + yPairMark + linearMark + regionB);
      const newFeedback: Record<string, 'correct' | 'incorrect' | null> = {
        answer: total === question.marks ? 'correct' : 'incorrect',
      };
      const noteParts = [
        `x = 1 and x = 3: ${xPairMark ? 'B1 awarded' : 'not awarded'}`,
        `y = 2 and y = 3: ${yPairMark ? 'B1 awarded' : 'not awarded'}`,
        `y = x/2 + 1: ${linearMark ? 'B1 awarded' : 'not awarded'}`,
        `Region R: ${r.regionCorrect ? 'correctly labelled (B1)' : `${r.matchedVertexCount}/${r.totalExpectedVertices} vertices${r.hasExtraPoints ? ' + extra points' : ''}`}`,
      ];
      return {
        allCorrect: total === question.marks,
        newFeedback,
        marksEarned: { answer: total },
        markingNotes: { answer: `${noteParts.join('. ')}. Total: ${total}/${question.marks}.` },
      };
    }

    const newFeedback: Record<string, 'correct' | 'incorrect' | null> = {};
    const marksEarned: Record<string, number> = {};
    const markingNotes: Record<string, string> = {};
    let allCorrect = true;
    const eqParts = (question as any).equationSolveParts as string[] | undefined;
    const fractionParts = (question as any).fractionDivisionParts as string[] | undefined;

    if (question.parts) {
      question.parts.forEach(part => {
        // Diagram-scored parts: handled after the loop using diagramScores state
        if ((part as any).diagramScored) {
          let ds = diagramScores[part.key];
          if (!ds && question.id === 'pp_4024_on23_12_q23' && part.key === 'a') {
            const expected: Record<string,string> = { a_hs:'0', a_hsg:'2', a_sg:'4', a_g:'16' };
            let correct = 0;
            Object.entries(expected).forEach(([k,v]) => {
              const u = (currentAnswers[k] || '').trim();
              if (u === v) { newFeedback[k] = 'correct'; correct++; }
              else newFeedback[k] = u ? 'incorrect' : null;
            });
            const marks = correct === 4 ? 2 : correct >= 2 ? 1 : 0;
            ds = { marks, note: `${correct}/4 regions correct` };
          }
          const earned = ds?.marks ?? 0;
          marksEarned[part.key] = earned;
          if (ds?.note) markingNotes[part.key] = ds.note;
          newFeedback[part.key] = earned === part.marks ? 'correct' : 'incorrect';
          if (earned < part.marks) allCorrect = false;
          return;
        }
        const isStructuredPart = eqParts?.includes(part.key) || fractionParts?.includes(part.key);

        if (isStructuredPart) {
          const stageGroups = getStructuredStageGroups(part.key);

          if (stageGroups.length > 0) {
            const allBoxKeys = stageGroups.flat();

            // Check for fraction-pair boxes (num/den pattern) — evaluate as fraction equivalence
            const fractionPairKeys = allBoxKeys.filter(k => k.match(/_(num|den|snum|sden)$/));
            let fractionCorrect = false;
            if (fractionPairKeys.length >= 2) {
              // Find num/den pairs and check if user fraction equals expected fraction
              const numKey = fractionPairKeys.find(k => k.endsWith('_num') || k.endsWith('_snum'));
              const denKey = fractionPairKeys.find(k => k.endsWith('_den') || k.endsWith('_sden'));
              if (numKey && denKey) {
                const userNum = parseFloat(currentAnswers[numKey] || '');
                const userDen = parseFloat(currentAnswers[denKey] || '');
                const correctPartAnswer = typeof question.answer === 'object' ? question.answer[part.key] : '';
                if (!isNaN(userNum) && !isNaN(userDen) && userDen !== 0 && correctPartAnswer) {
                  const userFracVal = userNum / userDen;
                  // Parse correct answer as fraction if it contains /
                  const fracMatch = correctPartAnswer.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
                  if (fracMatch) {
                    const correctFracVal = parseFloat(fracMatch[1]) / parseFloat(fracMatch[2]);
                    if (Math.abs(userFracVal - correctFracVal) < 1e-9) {
                      fractionCorrect = true;
                      fractionPairKeys.forEach(k => { newFeedback[k] = 'correct'; });
                    }
                  }
                }
              }
            }

            const correctBoxes = allBoxKeys.reduce((count, boxKey) => {
              if (newFeedback[boxKey] === 'correct') return count + 1; // already set by fraction check
              const userVal = currentAnswers[boxKey] || '';
              const correctVal = typeof question.answer === 'object' ? question.answer[boxKey] || '' : '';

              if (correctVal && answersMatch(userVal, correctVal)) {
                newFeedback[boxKey] = 'correct';
                return count + 1;
              }

              newFeedback[boxKey] = userVal ? 'incorrect' : null;
              return count;
            }, 0);

            const lastGroup = stageGroups[stageGroups.length - 1] || [];
            const lastBoxKey = lastGroup[lastGroup.length - 1] || allBoxKeys[allBoxKeys.length - 1];
            const lastCorrect = lastBoxKey ? newFeedback[lastBoxKey] === 'correct' : false;
            const correctStageCount = stageGroups.filter((group) => group.length > 0 && group.every((key) => newFeedback[key] === 'correct')).length;
            const nonFinalGroups = stageGroups.slice(0, -1);
            const hasAnyCorrectNonFinalBox = nonFinalGroups.some((group) => group.some((key) => newFeedback[key] === 'correct'));
            const partCriteria = question.markingCriteria?.[part.key] || '';
            const specialScore = getQ4PartialScore(part.key, currentAnswers);
            const hasAnyMethodOrBMark = /\bM1\b|\bB1\b/i.test(partCriteria);

            if (specialScore) {
              marksEarned[part.key] = Math.min(part.marks, specialScore.marks);
              if (specialScore.note) markingNotes[part.key] = specialScore.note;
            } else if (fractionCorrect || lastCorrect) {
              marksEarned[part.key] = part.marks;
            } else if (part.marks > 1) {
              const stageBasedPartial = Math.min(part.marks - 1, correctStageCount);
              if (stageBasedPartial > 0) {
                marksEarned[part.key] = stageBasedPartial;
              } else if (hasAnyMethodOrBMark && (hasAnyCorrectNonFinalBox || correctBoxes > 0)) {
                marksEarned[part.key] = 1;
              } else {
                marksEarned[part.key] = 0;
              }
            } else {
              marksEarned[part.key] = fractionCorrect ? part.marks : 0;
            }

            // === Q21(c) override: count B1 per criterion (num factorisation, den factorisation, simplified) ===
            if (question.id === 'pp_4024_on23_11_q21' && part.key === 'c') {
              const numOk = newFeedback['c_s1_num'] === 'correct';
              const denOk = newFeedback['c_s1_den'] === 'correct';
              const finalOk = newFeedback['c_final_num'] === 'correct' && newFeedback['c_final_den'] === 'correct';
              marksEarned['c'] = (numOk ? 1 : 0) + (denOk ? 1 : 0) + (finalOk ? 1 : 0);
            }

            // === Q7(b) override: diagram drives full marks; linear SF = 3 fallback awards B1 ===
            if (question.id === 'pp_4024_on23_12_q7' && part.key === 'b') {
              const diagramOk = (diagramScores['b']?.marks ?? 0) >= 3;
              const linearSFOk = newFeedback['b_s2_b'] === 'correct';
              if (diagramOk) {
                marksEarned['b'] = 3;
                markingNotes['b'] = 'B3: shape B drawn at the correct vertices (−7,2),(−1,2),(−1,−4),(−4,−4),(−4,−1),(−7,−1).';
              } else if (linearSFOk) {
                marksEarned['b'] = 1;
                markingNotes['b'] = 'B1: linear scale factor = 3 seen, but the image of shape B is missing or drawn incorrectly.';
              } else {
                marksEarned['b'] = 0;
                markingNotes['b'] = 'No marks: linear scale factor not established and diagram not drawn correctly.';
              }
            }

            if (!markingNotes[part.key] && marksEarned[part.key] > 0 && marksEarned[part.key] < part.marks) {
              markingNotes[part.key] = `Partial marks awarded using the specimen rule: ${partCriteria}`;
            }

            newFeedback[part.key] = marksEarned[part.key] === part.marks ? 'correct' : 'incorrect';
            if (marksEarned[part.key] < part.marks) {
              allCorrect = false;
            }
            return;
          }
        }

        // Skip helper parts (marks = 0) — they'll be evaluated as part of composite scoring below
        if (part.marks === 0) {
          const userAnswer = currentAnswers[part.key] || '';
          const correctAnswer = typeof question.answer === 'object' ? question.answer[part.key] || '' : '';
          if (correctAnswer && answersMatch(userAnswer, correctAnswer)) {
            newFeedback[part.key] = 'correct';
          } else if (userAnswer) {
            newFeedback[part.key] = 'incorrect';
          } else {
            newFeedback[part.key] = null;
          }
          marksEarned[part.key] = 0;
          return;
        }

        // Standard part check
        const userAnswer = currentAnswers[part.key] || '';
        const correctAnswer = typeof question.answer === 'object' ? question.answer[part.key] || '' : '';
        
        // Check for range-based acceptance in markingCriteria (e.g., "accept 0.15 to 0.19")
        const partCriteria = question.markingCriteria?.[part.key] || '';
        const rangeMatch = partCriteria.match(/accept\s+([\d.]+)\s+to\s+([\d.]+)/i);
        
        if (answersMatch(userAnswer, correctAnswer)) {
          newFeedback[part.key] = 'correct';
          marksEarned[part.key] = part.marks;
        } else if (rangeMatch && userAnswer) {
          // Range acceptance — check if answer falls within accepted range
          const rangeMin = parseFloat(rangeMatch[1]);
          const rangeMax = parseFloat(rangeMatch[2]);
          const userNum = parseFloat(normalizeAnswer(userAnswer));
          if (!isNaN(userNum) && userNum >= rangeMin && userNum <= rangeMax) {
            newFeedback[part.key] = 'correct';
            marksEarned[part.key] = part.marks;
          } else {
            newFeedback[part.key] = 'incorrect';
            marksEarned[part.key] = 0;
            allCorrect = false;
          }
        } else if (userAnswer) {
          newFeedback[part.key] = 'incorrect';
          marksEarned[part.key] = 0;
          allCorrect = false;
        } else {
          newFeedback[part.key] = null;
          marksEarned[part.key] = 0;
          allCorrect = false;
        }
      });

      // === Q15 (4024/11 ON 2023) part (b) SC1: answer = 2 × their (a) when 0 scored ===
      if (question.id === 'pp_4024_on23_11_q15') {
        const bPart = question.parts.find(p => p.key === 'b');
        if (bPart && (marksEarned['b'] ?? 0) === 0) {
          const aAnsStr = (currentAnswers['a_s2'] || currentAnswers['a_s1_d'] || '').trim();
          const aAns = parseFloat(normalizeAnswer(aAnsStr));
          const bFinalStr = (currentAnswers['b_s2'] || currentAnswers['b_s1_d'] || '').trim();
          const bFinal = parseFloat(normalizeAnswer(bFinalStr));
          if (!isNaN(aAns) && !isNaN(bFinal) && Math.abs(bFinal - 2 * aAns) < 1e-6 && Math.abs(aAns - 71) > 1e-6) {
            marksEarned['b'] = 1;
            newFeedback['b'] = 'incorrect';
            markingNotes['b'] = `SC1 awarded: your answer equals 2 × your part (a) (2 × ${aAns} = ${2 * aAns}). The correct answer is 142° (angle at centre = 360 − 38 − 90 − 90).`;
            allCorrect = false;
          }
        }
      }

      // === Q15 (4024/11 ON 2023) part (c) follow-through: B1 ft for their (b) ÷ 2 ===
      if (question.id === 'pp_4024_on23_11_q15') {
        const cPart = question.parts.find(p => p.key === 'c');
        if (cPart && (marksEarned['c'] ?? 0) < cPart.marks) {
          // Pull the user's part (b) final answer — prefer b_s2, fallback to b_s1_d
          const bAnsStr = (currentAnswers['b_s2'] || currentAnswers['b_s1_d'] || '').trim();
          const bAns = parseFloat(normalizeAnswer(bAnsStr));
          // Pull the user's part (c) final answer (s2) or numerator (s1_n) / explicit fraction
          const cFinalStr = (currentAnswers['c_s2'] || '').trim();
          const cFinal = parseFloat(normalizeAnswer(cFinalStr));
          const cNumStr = (currentAnswers['c_s1_n'] || '').trim();
          const cDenStr = (currentAnswers['c_s1_d'] || '').trim();
          const cNum = parseFloat(normalizeAnswer(cNumStr));
          const cDen = parseFloat(normalizeAnswer(cDenStr));

          let ftCorrect = false;
          if (!isNaN(bAns) && !isNaN(cFinal) && Math.abs(cFinal - bAns / 2) < 1e-6) {
            ftCorrect = true;
          }
          // Also accept the fraction stage: their (b) / 2
          if (!ftCorrect && !isNaN(bAns) && !isNaN(cNum) && !isNaN(cDen) && cDen !== 0
              && Math.abs(cNum - bAns) < 1e-6 && Math.abs(cDen - 2) < 1e-6 && !isNaN(cFinal)
              && Math.abs(cFinal - bAns / 2) < 1e-6) {
            ftCorrect = true;
          }

          if (ftCorrect) {
            marksEarned['c'] = cPart.marks;
            newFeedback['c'] = 'correct';
            if (cFinalStr) newFeedback['c_s2'] = 'correct';
            // Mark FT note only if their (b) wasn't the exact correct 142
            if (Math.abs(bAns - 142) > 1e-6) {
              markingNotes['c'] = `B1 follow-through awarded: your answer equals your part (b) ÷ 2 (${bAns} ÷ 2 = ${bAns / 2}).`;
            }
            // Recompute allCorrect
            allCorrect = question.parts.every(p => (marksEarned[p.key] ?? 0) >= p.marks);
          }
        }
      }

      // === Q12 (4024/12 ON 2023) — Simultaneous equations: SC scoring when no working shown ===
      // Rule: +1 mark per correct final answer (x or y), -1 mark per wrong final answer.
      // Total clamped at 0. Applied only when no intermediate working boxes are filled.
      if (question.id === 'pp_4024_on23_12_q12') {
        // Working = intermediate steps only (exclude the final-answer boxes x_s3_a / y_s3_a)
        const xWorkKeys = ['x_s1_a','x_s1_b','x_s1_c','x_s1b_a','x_s1b_b','x_s1b_c','x_s2_a','x_s2_b'];
        const yWorkKeys = ['y_s1_a','y_s2_a','y_s2_b'];
        const anyWorking = [...xWorkKeys, ...yWorkKeys].some(k => (currentAnswers[k] || '').trim().length > 0);
        // Final answers live in the last-stage boxes
        const xFinal = (currentAnswers['x_s3_a'] || currentAnswers['x'] || '').trim();
        const yFinal = (currentAnswers['y_s3_a'] || currentAnswers['y'] || '').trim();
        if (!anyWorking && (xFinal || yFinal)) {
          const xCorrect = !!xFinal && answersMatch(xFinal, '4');
          const yCorrect = !!yFinal && (answersMatch(yFinal, '-3/2') || answersMatch(yFinal, '-1.5') || answersMatch(yFinal, '-6/4'));
          const rawX = xCorrect ? 1 : -1;
          const rawY = yCorrect ? 1 : -1;
          const total = Math.max(0, rawX + rawY);
          let mX = 0, mY = 0;
          if (xCorrect && yCorrect) { mX = 1; mY = 1; }
          else if (total > 0 && xCorrect) { mX = total; }
          else if (total > 0 && yCorrect) { mY = total; }
          marksEarned['x'] = mX;
          marksEarned['y'] = mY;
          newFeedback['x'] = mX >= 1 ? 'correct' : 'incorrect';
          newFeedback['y'] = mY >= 1 ? 'correct' : 'incorrect';
          if (xFinal) newFeedback['x_s3_a'] = xCorrect ? 'correct' : 'incorrect';
          if (yFinal) newFeedback['y_s3_a'] = yCorrect ? 'correct' : 'incorrect';
          const note = `No working shown — special case scoring: +1 per correct final value, −1 per wrong (total ≥ 0). x ${xCorrect ? 'correct (+1)' : 'wrong (−1)'}, y ${yCorrect ? 'correct (+1)' : 'wrong (−1)'} → ${total}/3.`;
          markingNotes['x'] = note;
          markingNotes['y'] = note;
          allCorrect = question.parts.every(p => (marksEarned[p.key] ?? 0) >= p.marks);
        }
      }

      // === Q18 (4024/12 ON 2023) part (b) — MS-aligned ===
      // B1 "B, 20" nfww = full 3 marks. Else M1 for distance B = 5×20 oe, M1 for distance A = (1+7)×20/2 oe.
      if (question.id === 'pp_4024_on23_12_q18') {
        const bPart = question.parts.find(p => p.key === 'b');
        if (bPart) {
          const s1Keys = ['b_s1_a', 'b_s1_b', 'b_s1_c', 'b_s1_d'];
          const s2Keys = ['b_s2_a', 'b_s2_b', 'b_s2_c'];
          const s3Keys = ['b_s3_a', 'b_s3_b'];
          const distanceA = s1Keys.every(k => answersMatch(currentAnswers[k] || '', (question.answer as Record<string, string>)[k] || ''));
          const distanceB = s2Keys.every(k => answersMatch(currentAnswers[k] || '', (question.answer as Record<string, string>)[k] || ''));
          const finalAns = s3Keys.every(k => answersMatch(currentAnswers[k] || '', (question.answer as Record<string, string>)[k] || ''));
          let earned = 0;
          const notes: string[] = [];
          if (distanceB) { earned += 1; notes.push('M1 for distance B = 5×20'); }
          if (distanceA) { earned += 1; notes.push('M1 for distance A = (1+7)×20/2'); }
          if (finalAns && distanceA && distanceB) {
            earned += 1;
            notes.push('A1 for final answer "B, 20"');
          } else if (finalAns) {
            notes.push('A1 for final answer withheld — both distances A and B must be correct');
          }
          marksEarned['b'] = Math.min(bPart.marks, earned);
          newFeedback['b'] = earned >= bPart.marks ? 'correct' : 'incorrect';
          if (earned < bPart.marks) allCorrect = false;
          if (notes.length) markingNotes['b'] = notes.join('. ') + '.';
        }
      }

      // === Q19 (4024/12 ON 2023) — M1 for step 1 (combined fraction over LCM), A1 for final answer ===
      if (question.id === 'pp_4024_on23_12_q19') {
        const ansPart = question.parts.find(p => p.key === 'answer');
        if (ansPart) {
          const ansObj = question.answer as Record<string, string>;
          const s1NumOk = answersMatch(currentAnswers['answer_s1_num'] || '', ansObj['answer_s1_num'] || '');
          const s1DenOk = answersMatch(currentAnswers['answer_s1_den'] || '', ansObj['answer_s1_den'] || '');
          const step1Correct = s1NumOk && s1DenOk;
          const s3NumOk = answersMatch(currentAnswers['answer_s3_num'] || '', ansObj['answer_s3_num'] || '');
          const s3DenOk = answersMatch(currentAnswers['answer_s3_den'] || '', ansObj['answer_s3_den'] || '');
          const combinedFinal = `(${(currentAnswers['answer_s3_num'] || '').trim()})/${(currentAnswers['answer_s3_den'] || '').trim()}`;
          const finalCorrect = (s3NumOk && s3DenOk) || answersMatch(currentAnswers['answer'] || '', ansObj['answer'] || '') || answersMatch(combinedFinal, ansObj['answer'] || '');
          let earned = 0;
          const notes: string[] = [];
          if (step1Correct) { earned += 1; notes.push('M1 for combined fraction over common denominator (Take LCM step)'); }
          if (finalCorrect) { earned += 1; notes.push('A1 for final answer (9x + 2)/16'); }
          marksEarned['answer'] = Math.min(ansPart.marks, earned);
          newFeedback['answer'] = earned >= ansPart.marks ? 'correct' : 'incorrect';
          if (earned < ansPart.marks) allCorrect = false;
          if (notes.length) markingNotes['answer'] = notes.join('. ') + '.';
        }
      }

      // === Q20(a) (4024/12 ON 2023) — B1 partial factorisation, B2 final answer ===
      if (question.id === 'pp_4024_on23_12_q20') {
        const aPart = question.parts.find(p => p.key === 'a');
        if (aPart) {
          const ansObj = question.answer as Record<string, string>;
          const s1Val = (currentAnswers['a_s1_work'] || '').trim();
          const s2Val = (currentAnswers['a_s2_work'] || '').trim();
          const aVal = (currentAnswers['a'] || '').trim();
          // Accept partial factorisations: c(2d+e) − 3(2d+e), or equivalent groupings like d(2c-6)+e(c-3) etc.
          const norm = (s: string) => s.replace(/\s+/g, '').replace(/−/g, '-').replace(/×/g, '*').toLowerCase();
          const partialOptions = ['c(2d+e)-3(2d+e)', '(2d+e)(c-3)', '(c-3)(2d+e)', '(2d+e)c-3(2d+e)', 'c(2d+e)+(-3)(2d+e)'];
          const finalOptions = ['(c-3)(2d+e)', '(2d+e)(c-3)'];
          const containsPartial = (v: string) => {
            const n = norm(v);
            return partialOptions.some(o => n.includes(norm(o)));
          };
          const isFinal = (v: string) => {
            const n = norm(v);
            return finalOptions.some(o => n === norm(o));
          };
          const finalSeen = isFinal(s2Val) || isFinal(aVal) || isFinal(s1Val);
          const partialSeen = containsPartial(s1Val) || containsPartial(s2Val) || containsPartial(aVal);
          let earned = 0;
          const notes: string[] = [];
          if (finalSeen) {
            earned = 2;
            notes.push('B2 awarded for (c − 3)(2d + e) as final answer.');
          } else if (partialSeen) {
            earned = 1;
            notes.push('B1 awarded for one correct partial factorisation seen, e.g. c(2d + e) − 3(2d + e).');
          }
          marksEarned['a'] = Math.min(aPart.marks, earned);
          newFeedback['a'] = earned >= aPart.marks ? 'correct' : 'incorrect';
          if (earned < aPart.marks) allCorrect = false;
          if (notes.length) markingNotes['a'] = notes.join(' ');
        }
      }

      // === Q17 (4024/11 ON 2023) — k box + follow-through final answer ===
      if (question.id === 'pp_4024_on23_11_q17') {
        const ansPart = question.parts.find(p => p.key === 'answer');
        if (ansPart) {
          const userK = (currentAnswers['answer_k'] || '').trim();
          const userFinal = (currentAnswers['answer_final_y'] || '').trim();
          const kCorrect = answersMatch(userK, '0.5') || answersMatch(userK, '1/2');
          const finalCorrect = answersMatch(userFinal, '2.5');
          const kNum = parseFloat(normalizeAnswer(userK));
          const finalNum = parseFloat(normalizeAnswer(userFinal));
          let earned = 0;
          const notes: string[] = [];
          if (kCorrect) {
            earned += 1;
            newFeedback['answer_k'] = 'correct';
          } else if (userK) {
            newFeedback['answer_k'] = 'incorrect';
          }
          if (finalCorrect) {
            earned += 1;
            newFeedback['answer_final_y'] = 'correct';
          } else if (!isNaN(kNum) && !isNaN(finalNum) && !kCorrect &&
                     Math.abs(finalNum - kNum * 5) < 1e-6) {
            // Follow-through: final = (their k) × √25
            earned += 1;
            newFeedback['answer_final_y'] = 'correct';
            notes.push(`B1 follow-through awarded for the final answer using your k = ${userK} (${userK} × √25 = ${kNum * 5}).`);
          } else if (userFinal) {
            newFeedback['answer_final_y'] = 'incorrect';
          }
          marksEarned['answer'] = earned;
          newFeedback['answer'] = earned === ansPart.marks ? 'correct' : 'incorrect';
          if (earned < ansPart.marks) {
            allCorrect = false;
            if (notes.length === 0 && earned > 0) {
              notes.push(`Partial marks awarded: ${question.markingCriteria?.answer || ''}`);
            }
          }
          if (notes.length) markingNotes['answer'] = notes.join(' ');
        }
      }

      // === Q18 (4024/11 ON 2023) — Venn diagram (a) banded marking ===
      if (question.id === 'pp_4024_on23_11_q18' && typeof question.answer === 'object') {
        const aPart = question.parts.find(p => p.key === 'a');
        if (aPart) {
          const regionKeys = ['ronly', 'conly', 'sonly', 'rcOnly', 'rsOnly', 'csOnly', 'rcs', 'outside'];
          const correctMap = question.answer as Record<string, string>;
          let correctCount = 0;
          for (const k of regionKeys) {
            const ok = answersMatch(currentAnswers[k] || '', correctMap[k] || '');
            newFeedback[k] = (currentAnswers[k] || '') ? (ok ? 'correct' : 'incorrect') : null;
            if (ok) correctCount++;
          }
          const rcsCorrect = answersMatch(currentAnswers['rcs'] || '', correctMap['rcs'] || '');
          let earned = 0;
          const notes: string[] = [];
          if (correctCount === 8) earned = 3;
          else if (correctCount >= 6) { earned = 2; notes.push(`B2 awarded: ${correctCount} of 8 regions correct.`); }
          else if (correctCount >= 4) { earned = 1; notes.push(`B1 awarded: ${correctCount} of 8 regions correct.`); }
          else if (rcsCorrect) { earned = 1; notes.push('B1 awarded for the correct value 2 in the R∩C∩S intersection.'); }
          marksEarned['a'] = earned;
          newFeedback['a'] = earned === aPart.marks ? 'correct' : 'incorrect';
          if (earned < aPart.marks) allCorrect = false;
          if (notes.length) markingNotes['a'] = notes.join(' ');
        }
      }

      // === Q22 (4024/11 ON 2023) — Functions: per-step partial marks per MS ===
      if (question.id === 'pp_4024_on23_11_q22') {
        const toJs = (s: string) => s
          .replace(/\s+/g, '')
          .replace(/−/g, '-')
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/(\d)([a-z(])/gi, '$1*$2')
          .replace(/([a-z)])\(/gi, '$1*(')
          .replace(/\)([a-z(])/gi, ')*$1');
        const evalSide = (expr: string, vars: Record<string, number>): number | null => {
          try {
            const keys = Object.keys(vars);
            const fn = new Function(...keys, `return ${toJs(expr)};`);
            const v = fn(...keys.map(k => vars[k]));
            return typeof v === 'number' && isFinite(v) ? v : null;
          } catch { return null; }
        };
        const evalEq = (eq: string, vars: Record<string, number>): number | null => {
          const [l, r] = eq.split('=').map(s => s.trim());
          if (!l || !r) return null;
          const lv = evalSide(l, vars);
          const rv = evalSide(r, vars);
          if (lv === null || rv === null) return null;
          return lv - rv;
        };
        const isEquivEquation = (eq: string, target: string, testVars: Record<string, number>[]) => {
          let ratio: number | null = null;
          for (const v of testVars) {
            const a = evalEq(eq, v);
            const b = evalEq(target, v);
            if (a === null || b === null) return false;
            if (Math.abs(b) < 1e-9) {
              if (Math.abs(a) > 1e-6) return false;
              continue;
            }
            const r = a / b;
            if (ratio === null) ratio = r;
            else if (Math.abs(r - ratio) > 1e-6) return false;
          }
          return ratio !== null && Math.abs(ratio) > 1e-9;
        };

        // (b) — B1 per MS for any of: x = y/4 + 3, y − 3 = x/4, 4y = x + 12 (or better/equivalent)
        const bPart = question.parts.find(p => p.key === 'b_calc');
        if (bPart && (marksEarned['b_calc'] ?? 0) < bPart.marks) {
          const acceptableTargets = [
            'x = y/4 + 3',
            'y - 3 = x/4',
            '4*y = x + 12',
            '4*(x - 3) = y',
            'y = 4*x - 12',
            'y = 4*(x - 3)',
          ];
          const testVars = [{ x: 2, y: 3 }, { x: 5, y: -1.7 }, { x: -3, y: 4.2 }, { x: 1.1, y: 2.4 }];
          let awarded = false;
          for (let i = 0; i < 12 && !awarded; i++) {
            const v = (currentAnswers[`b_calc_custom_${i}`] || '').trim();
            if (!v || !v.includes('=')) continue;
            for (const target of acceptableTargets) {
              if (isEquivEquation(v, target, testVars)) { awarded = true; break; }
            }
          }
          if (awarded) {
            marksEarned['b_calc'] = Math.max(marksEarned['b_calc'] ?? 0, 1);
            markingNotes['b_calc'] = 'B1 (MS): correct rearrangement seen — e.g. x = y/4 + 3, y − 3 = x/4, or 4y = x + 12 (or better).';
          }
        }

        // (c) — B1 for original equation; M1 for expansion + isolation of p
        const cPart = question.parts.find(p => p.key === 'c_calc');
        if (cPart && (marksEarned['c_calc'] ?? 0) < cPart.marks) {
          const target = 'p/4 + 3 = 2*(p + 5 - 1)';
          const testVars = [{ p: 2 }, { p: -1.5 }, { p: 3.7 }];
          let b1 = false, m1 = false;
          for (let i = 0; i < 12; i++) {
            const v = (currentAnswers[`c_calc_custom_${i}`] || '').trim();
            if (!v || !v.includes('=')) continue;
            if (!isEquivEquation(v, target, testVars)) continue;
            b1 = true;
            // M1: brackets expanded (no parens) — line still equivalent to original
            if (!v.includes('(') && !v.includes(')')) m1 = true;
          }
          let earned = marksEarned['c_calc'] ?? 0;
          if (b1) earned = Math.max(earned, 1);
          if (m1) earned = Math.max(earned, 2);
          if (earned > (marksEarned['c_calc'] ?? 0)) {
            marksEarned['c_calc'] = Math.min(cPart.marks, earned);
            const parts: string[] = [];
            if (b1) parts.push('B1 for the correct equation p/4 + 3 = 2(p + 5 − 1)');
            if (m1) parts.push('M1 for expansion of brackets and isolation of terms in p');
            markingNotes['c_calc'] = `Partial marks awarded — ${parts.join('; ')}.`;
          }
        }

        allCorrect = question.parts.every(p => (marksEarned[p.key] ?? 0) >= p.marks);
      }

      // === Q24 (4024/11 ON 2023) — Algebraic fractions equation: MS-aligned partial marks ===
      // MS: M2 elimination of fractions / common denominator (LHS may be two fractions)
      //     OR M1 for 3x(x−1) − 2(x+1) or denominator (x+1)(x−1) soi
      //     AND M1 for expansion of all brackets in clearing fractions
      //     A1 for x = 1/5 (oe 0.2)
      if (question.id === 'pp_4024_on23_11_q24') {
        const ansPart = question.parts.find(p => p.key === 'answer');
        if (ansPart) {
          const toJs = (s: string) => s
            .replace(/\s+/g, '')
            .replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/')
            .replace(/²/g, '**2').replace(/³/g, '**3').replace(/\^/g, '**')
            .replace(/(\d)([a-z(])/gi, '$1*$2')
            .replace(/([a-z)])\(/gi, '$1*(')
            .replace(/\)([a-z(])/gi, ')*$1');
          const evalSide = (expr: string, vars: Record<string, number>): number | null => {
            try {
              const keys = Object.keys(vars);
              const fn = new Function(...keys, `return ${toJs(expr)};`);
              const v = fn(...keys.map(k => vars[k]));
              return typeof v === 'number' && isFinite(v) ? v : null;
            } catch { return null; }
          };
          const evalEq = (eq: string, vars: Record<string, number>): number | null => {
            const [l, r] = eq.split('=').map(s => s.trim());
            if (!l || !r) return null;
            const lv = evalSide(l, vars);
            const rv = evalSide(r, vars);
            if (lv === null || rv === null) return null;
            return lv - rv;
          };
          // Algebraic equivalence allowing polynomial multipliers (zero-set match)
          const sameZeroSet = (lineA: string, lineB: string, testVars: Record<string, number>[]) => {
            let sawA = false, sawB = false;
            for (const v of testVars) {
              const a = evalEq(lineA, v);
              const b = evalEq(lineB, v);
              if (a === null || b === null) return false;
              // Generic test points should not zero either side for a valid equation
              if (Math.abs(a) > 1e-9) sawA = true;
              if (Math.abs(b) > 1e-9) sawB = true;
              // If one is ~0 but the other isn't, they aren't equivalent
              if (Math.abs(a) < 1e-9 && Math.abs(b) > 1e-6) return false;
              if (Math.abs(b) < 1e-9 && Math.abs(a) > 1e-6) return false;
            }
            return sawA && sawB;
          };
          const testVars = [{ x: 2 }, { x: 3 }, { x: -1.5 }, { x: 0.7 }, { x: 4.3 }];
          // Cleared form: 3x(x-1) - 2(x+1) = 3(x+1)(x-1)  (i.e. 3x² - 5x - 2 = 3x² - 3)
          const clearedTargets = [
            '3*x*(x-1) - 2*(x+1) = 3*(x+1)*(x-1)',
            '3*x**2 - 5*x - 2 = 3*x**2 - 3',
            '-5*x - 2 = -3',
            '-5*x = -1',
            '5*x = 1',
            'x = 1/5',
          ];

          let m2 = false;       // full elimination of fractions
          let m1Combine = false; // M1 alternative: combined numerator / common denominator seen
          let m1Expand = false;  // M1 expansion of all brackets after clearing

          for (let i = 0; i < 12; i++) {
            const raw = (currentAnswers[`answer_custom_${i}`] || '').trim();
            if (!raw || !raw.includes('=')) continue;

            // M2: fraction-free line equivalent to the cleared equation
            const noFraction = !/\/\s*[a-z(]/i.test(raw);
            if (noFraction) {
              for (const t of clearedTargets) {
                if (sameZeroSet(raw, t, testVars)) { m2 = true; break; }
              }
            }
            // M1 (combine): numerator-combined fraction, e.g. "(3x(x-1) - 2(x+1))/((x+1)(x-1)) = 3"
            //   Detect mention of both 3x(x-1) and 2(x+1), or the expanded numerator 3x²-5x-2,
            //   together with denominator (x+1)(x-1) or x²-1.
            const r = raw.replace(/\s+/g, '');
            const numOK = /3\*?x\(x-1\)/.test(r) && /2\(x\+1\)/.test(r);
            const numExpanded = /3x[²^]?2?-5x-2/.test(r) || /3\*?x\*\*2-5\*?x-2/.test(r);
            const denOK = /\(x\+1\)\(x-1\)/.test(r) || /\(x-1\)\(x\+1\)/.test(r) || /x[²^]?2?-1/.test(r);
            if (denOK && (numOK || numExpanded)) m1Combine = true;

            // M1 (expand): bracket-free line equivalent to cleared form
            if (noFraction && !raw.includes('(') && !raw.includes(')')) {
              for (const t of clearedTargets) {
                if (sameZeroSet(raw, t, testVars)) { m1Expand = true; break; }
              }
            }
          }

          const finalStr = (currentAnswers['answer_final'] || '').trim();
          const a1 = answersMatch(finalStr, '1/5') || answersMatch(finalStr, '0.2');

          let earned = 0;
          const notes: string[] = [];
          if (m2) { earned += 2; notes.push('M2 awarded for elimination of fractions (correct cleared equation seen).'); }
          else if (m1Combine) { earned += 1; notes.push('M1 awarded for the combined numerator / correct common denominator (no full elimination shown).'); }
          if (m1Expand) { earned += 1; notes.push('M1 awarded for expansion of all brackets after clearing the fractions.'); }
          if (a1) { earned += 1; notes.push('A1 awarded for the final answer x = 1/5.'); newFeedback['answer_final'] = 'correct'; }
          else if (finalStr) { newFeedback['answer_final'] = 'incorrect'; }

          earned = Math.min(earned, ansPart.marks);
          marksEarned['answer'] = earned;
          newFeedback['answer'] = earned >= ansPart.marks ? 'correct' : 'incorrect';
          if (notes.length) markingNotes['answer'] = notes.join(' ');
          if (earned < ansPart.marks) allCorrect = false;
        }
        allCorrect = question.parts.every(p => (marksEarned[p.key] ?? 0) >= p.marks);
      }




      // === Post-pass: Composite scoring for ordering/grouped questions ===
      // For questions with helper parts (marks=0) that feed into a scored part,
      // count how many helpers are correct and award partial marks on the scored part
      if (question.parts) {
        const helperParts = question.parts.filter(p => p.marks === 0);
        const scoredParts = question.parts.filter(p => p.marks > 0 && !eqParts?.includes(p.key));
        
        if (helperParts.length > 0 && scoredParts.length > 0) {
          // Check if this is an ordering question (all helpers feed into one scored part)
          const questionCriteria = question.markingCriteria?.['_question'] || '';
          const isOrderingQuestion = questionCriteria.includes('correct in order') || questionCriteria.includes('correct order');
          
          if (isOrderingQuestion && helperParts.length >= 2) {
            // Count all ordering parts correct (helpers + scored)
            const allOrderParts = [...helperParts, ...scoredParts.filter(p => !eqParts?.includes(p.key))];
            const orderKeys = allOrderParts.map(p => p.key);
            const correctCount = orderKeys.filter(k => newFeedback[k] === 'correct').length;
            const totalParts = orderKeys.length;
            const scoredPart = scoredParts[scoredParts.length - 1]; // Last scored part gets the marks
            const totalMarks = scoredPart.marks;

            const answerVals = typeof question.answer === 'object'
              ? orderKeys.map(k => question.answer[k] || '')
              : [];
            const userVals = orderKeys.map(k => currentAnswers[k] || '');
            const partialReason = getOrderingPartialReason(userVals, answerVals);
            
            if (correctCount === totalParts) {
              marksEarned[scoredPart.key] = totalMarks;
              newFeedback[scoredPart.key] = 'correct';
            } else if (partialReason === 'reversed') {
              // Correct order but reversed — B1
              marksEarned[scoredPart.key] = 1;
              newFeedback[scoredPart.key] = 'incorrect';
              markingNotes[scoredPart.key] = 'B1 awarded because the full order is correct but reversed.';
              allCorrect = false;
            } else if (partialReason === 'three-correct' && totalMarks >= 2) {
              // Three values in the correct relative order — B1
              marksEarned[scoredPart.key] = 1;
              newFeedback[scoredPart.key] = 'incorrect';
              markingNotes[scoredPart.key] = 'B1 awarded because three values are in the correct order.';
              allCorrect = false;
            } else {
              marksEarned[scoredPart.key] = 0;
              newFeedback[scoredPart.key] = 'incorrect';
              allCorrect = false;
            }
          } else if (helperParts.length > 0) {
            // Generic composite: Venn diagram style — count correct helpers for partial marks
            // Find the scored part that groups the helpers
            scoredParts.forEach(sp => {
              if (eqParts?.includes(sp.key)) return;
              const criteria = question.markingCriteria?.[sp.key] || '';
              if (!criteria) return;
              
              // Count B1 marks in criteria to determine per-helper mark value
              const b1Count = (criteria.match(/B1/g) || []).length;
              if (b1Count > 0 && sp.marks > 1) {
                const correctHelpers = helperParts.filter(h => newFeedback[h.key] === 'correct').length;
                const earnedFromHelpers = Math.min(sp.marks, Math.floor(correctHelpers / helperParts.length * sp.marks));
                if (earnedFromHelpers > marksEarned[sp.key]) {
                  marksEarned[sp.key] = earnedFromHelpers;
                  if (earnedFromHelpers > 0 && earnedFromHelpers < sp.marks) {
                    markingNotes[sp.key] = `Partial marks awarded using the specimen rule: ${criteria}`;
                  }
                }
                if (marksEarned[sp.key] < sp.marks) {
                  allCorrect = false;
                  if (marksEarned[sp.key] === 0) {
                    newFeedback[sp.key] = 'incorrect';
                  }
                }
              }
            });
          }
        }
      }
    } else {
      const userAnswer = currentAnswers['answer'] || '';
      const correctAnswer = typeof question.answer === 'string' ? question.answer : '';
      
      if (answersMatch(userAnswer, correctAnswer)) {
        newFeedback['answer'] = 'correct';
        marksEarned['answer'] = question.marks;
      } else if (userAnswer) {
        newFeedback['answer'] = 'incorrect';
        marksEarned['answer'] = 0;
        allCorrect = false;
      }
    }

    // === Q9 (4024/11 ON23) — split (b)'s 2 marks: B1 line of best fit + B1 reading ===
    if (question.id === 'pp_4024_on23_11_q9') {
      const lineDrawn = !!(window as any).__pp_q9_lineDrawn;
      const userB = (currentAnswers['b'] || '').trim();
      const correctB = typeof question.answer === 'object' ? (question.answer as any).b || '' : '';
      const readingCorrect = !!userB && answersMatch(userB, correctB);
      let bMarks = 0;
      const notes: string[] = [];
      if (lineDrawn) {
        bMarks += 1;
        notes.push('B1 awarded for drawing a line of best fit.');
        if (readingCorrect) {
          bMarks += 1;
          notes.push('B1 awarded for the correct time reading at age 50.');
        } else if (userB) {
          notes.push('The reading at age 50 is not correct.');
        }
      } else {
        notes.push('Incomplete submission: line of best fit not drawn. Both marks for part (b) are withheld.');
      }
      marksEarned['b'] = bMarks;
      newFeedback['b'] = bMarks === 2 ? 'correct' : 'incorrect';
      markingNotes['b'] = notes.join(' ');
      if (bMarks < 2) allCorrect = false;
    }

    return { allCorrect, newFeedback, marksEarned, markingNotes };
  };

  // Hint: Show concept related to the question
  const handleHint = async () => {
    // Check quota
    if (paperQuota && paperQuota.hints <= 0) {
      toast({ title: 'No hints remaining', description: 'You have used all your hint quota for this paper.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setLoadingType('hint');
    aiUsageRef.current += 1;

    // Decrement hint in DB if quota exists
    if (user && matchedPaper && paperQuota) {
      await supabase.rpc('decrement_hint', { p_student_id: user.id, p_paper_id: matchedPaper.id });
      refetchAssignments();
    }

    // Detect multi-part hints (e.g. each hint starts with "(a)", "(b)", ...) so the AI
    // covers EVERY part — including diagram-scored parts like (b) and (c).
    const partMarkerRegex = /^\s*\(([a-z])\)/i;
    const isMultiPartHints = (question.hints?.filter(h => partMarkerRegex.test(h)).length || 0) >= 2;
    const partLabels = (question.parts || []).map((p: any) => p.label || p.key);

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: question.question,
          actionType: 'hint',
          topic: question.title,
          hints: question.hints,
          attemptCount,
          markingCriteria: question.markingCriteria,
          multiPart: isMultiPartHints,
          partLabels,
          diagramParts: (question as any).diagramParts || []
        }
      });

      if (error) throw error;
      setAiResponse({ type: 'hint', content: data.hint });
    } catch (error) {
      console.error('Hint error:', error);
      if (question.hints.length > 0) {
        // For multi-part questions show ALL hints so b/c are covered; otherwise cycle by attempt.
        if (isMultiPartHints) {
          setAiResponse({ type: 'hint', content: question.hints.join('\n') });
        } else {
          const totalAttempts = Object.values(attemptCount).reduce((sum, count) => sum + count, 0);
          const hintIndex = Math.min(totalAttempts, question.hints.length - 1);
          setAiResponse({ type: 'hint', content: question.hints[hintIndex] });
        }
      }
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  // Check Work for individual part: Analyze specific answer and provide targeted guidance
  // Optionally accepts a direct answer value (for LCM ladder where state may not be updated yet)
  const handleCheckWorkForPart = async (partKey: string, partLabel: string, directAnswer?: string) => {
    // Check checkwork quota
    if (paperQuota && paperQuota.checkwork <= 0) {
      toast({ title: 'No check work remaining', description: 'You have used all your check work quota for this paper.', variant: 'destructive' });
      return;
    }
    // Detect structured step keys (e.g. c_s1, c_s2, answer_s1) — collect all sub-field answers.
    // Also handle named stages (e.g. answer_final, b_final) that have sub-field boxes like answer_final_y.
    const isStructuredStep = /^[a-z]+_s\d+$/.test(partKey);
    const hasSubFieldsInAnswers = typeof question.answer === 'object' &&
      Object.keys(question.answer).some(k => k.startsWith(partKey + '_'));
    const hasSubFieldsInState = Object.keys(answers).some(k => k.startsWith(partKey + '_'));
    const treatAsMultiField = isStructuredStep || hasSubFieldsInAnswers || hasSubFieldsInState;

    if (treatAsMultiField && typeof question.answer === 'object') {
      // Gather all sub-keys for this step (e.g. c_s1_n1, c_s1_n2, ...)
      const subKeys = Object.keys(question.answer).filter(k => k.startsWith(partKey + '_'));
      
      // If no sub-keys, this step key is itself a direct answer — fall through to standard check
      if (subKeys.length === 0) {
        // Fall through to standard single-value check below
      } else {
      const userSubAnswers: Record<string, string> = {};
      const correctSubAnswers: Record<string, string> = {};
      let hasEmpty = false;
      let allCorrect = true;

      // Detect commutative multiplication pairs from stage elements
      // Find the stage matching this partKey to check for × operators
      const allStages = question.equationStages || 
        (question.equationStagesMap ? Object.values(question.equationStagesMap).flat() : []);
      const matchingStage = allStages.find((s: any) => {
        const prefix = partKey.split('_s')[0];
        const stepNum = partKey.split('_s')[1];
        return s.stepKey === `s${stepNum}` || s.stepKey === partKey.replace(`${prefix}_`, '');
      });
      
      // Build list of commutative box pairs (boxes on either side of ×)
      const commutativePairs: [string, string][] = [];
      if (matchingStage?.elements) {
        const els = matchingStage.elements;
        for (let i = 0; i < els.length - 2; i++) {
          if (els[i].type === 'box' && els[i+1].type === 'text' && (els[i+1].value === '×' || els[i+1].value === '+') && els[i+2].type === 'box') {
            const prefix = partKey + '_';
            const keyA = prefix + els[i].key?.split('_').pop();
            const keyB = prefix + els[i+2].key?.split('_').pop();
            // Only if both keys are in subKeys
            if (subKeys.includes(keyA) && subKeys.includes(keyB)) {
              commutativePairs.push([keyA, keyB]);
            }
            // Also try with full key format
            const fullKeyA = partKey.replace(/^([a-z]+)_s(\d+)$/, '$1_') + els[i].key;
            const fullKeyB = partKey.replace(/^([a-z]+)_s(\d+)$/, '$1_') + els[i+2].key;
            if (fullKeyA !== keyA && subKeys.includes(fullKeyA) && subKeys.includes(fullKeyB)) {
              commutativePairs.push([fullKeyA, fullKeyB]);
            }
          }
        }
      }

      // Build effective correct answers allowing commutative swaps
      const effectiveCorrect: Record<string, string> = {};
      for (const sk of subKeys) {
        effectiveCorrect[sk] = question.answer[sk] || '';
      }
      
      // For each commutative pair, if swapping makes both match, apply the swap
      for (const [keyA, keyB] of commutativePairs) {
        const uA = normalizeAnswer(answers[keyA] || '');
        const uB = normalizeAnswer(answers[keyB] || '');
        const cA = normalizeAnswer(effectiveCorrect[keyA] || '');
        const cB = normalizeAnswer(effectiveCorrect[keyB] || '');
        if ((!answersMatch(answers[keyA] || '', effectiveCorrect[keyA] || '') || !answersMatch(answers[keyB] || '', effectiveCorrect[keyB] || '')) && answersMatch(answers[keyA] || '', effectiveCorrect[keyB] || '') && answersMatch(answers[keyB] || '', effectiveCorrect[keyA] || '')) {
          effectiveCorrect[keyA] = question.answer[keyB] || '';
          effectiveCorrect[keyB] = question.answer[keyA] || '';
        }
      }

      for (const sk of subKeys) {
        userSubAnswers[sk] = answers[sk] || '';
        correctSubAnswers[sk] = effectiveCorrect[sk] || '';
        if (!normalizeAnswer(answers[sk] || '')) hasEmpty = true;
        if (!answersMatch(answers[sk] || '', effectiveCorrect[sk] || '')) allCorrect = false;
      }

      if (hasEmpty) {
        setAiResponse({
          type: 'guidance',
          content: `Fill in all the boxes for this step before checking.`,
          partKey
        });
        return;
      }

      // Set feedback per sub-key and overall step
      const newFeedback = { ...feedback };
      for (const sk of subKeys) {
        const correct = answersMatch(answers[sk] || '', effectiveCorrect[sk] || '');
        newFeedback[sk] = correct ? 'correct' : 'incorrect';
      }
      newFeedback[partKey] = allCorrect ? 'correct' : 'incorrect';
      setFeedback(newFeedback);
      setIsChecked(true);
      setAttemptCount(prev => ({ ...prev, [partKey]: (prev[partKey] || 0) + 1 }));

      if (allCorrect) {
        setAiResponse({ type: 'guidance', content: `Excellent work on this step! All values are correct.`, partKey });
        return;
      }

      // Get AI guidance for incorrect fraction step
      setIsLoading(true);
      setLoadingType('check');
      setLoadingPartKey(partKey);
      checkworkUsageRef.current += 1;
      if (user && matchedPaper && paperQuota) {
        await supabase.rpc('decrement_checkwork', { p_student_id: user.id, p_paper_id: matchedPaper.id });
        refetchAssignments();
      }
      try {
        const { data, error } = await supabase.functions.invoke('ai-tutor', {
          body: {
            question: question.question,
            actionType: 'checkWork',
            userAnswers: userSubAnswers,
            correctAnswers: correctSubAnswers,
            topic: question.title,
            hints: question.hints,
            attemptCount: (attemptCount[partKey] || 0) + 1,
            hasMissing: false,
            hasWrong: true,
            specificPart: partLabel,
            workingContent: '',
            markingCriteria: question.markingCriteria,
            previousFeedback: previousFeedbackRef.current[partKey] || []
          }
        });
        if (error) throw error;
        if (data?.hint) {
          previousFeedbackRef.current[partKey] = [...(previousFeedbackRef.current[partKey] || []), data.hint].slice(-5);
        }
        setAiResponse({ type: 'guidance', content: data.hint, partKey });
      } catch (error) {
        console.error('Check work error:', error);
        setAiResponse({ type: 'guidance', content: `Review your values for ${partLabel}. Check each number carefully.`, partKey });
      } finally {
        setIsLoading(false);
        setLoadingType(null);
        setLoadingPartKey(null);
      }
      return;
      } // end else (has sub-keys)
    }

    // ===== Q18 (4024/11 ON 2023) — Venn diagram part (a) special check =====
    if (question.id === 'pp_4024_on23_11_q18' && partKey === 'a' && typeof question.answer === 'object') {
      const regionKeys = ['ronly', 'conly', 'sonly', 'rcOnly', 'rsOnly', 'csOnly', 'rcs', 'outside'];
      const correctMap = question.answer as Record<string, string>;
      const newFeedback = { ...feedback };
      let correctCount = 0;
      let hasEmpty = false;
      for (const k of regionKeys) {
        const u = answers[k] || '';
        if (!normalizeAnswer(u)) hasEmpty = true;
        const ok = answersMatch(u, correctMap[k] || '');
        newFeedback[k] = u ? (ok ? 'correct' : 'incorrect') : null;
        if (ok) correctCount++;
      }
      if (hasEmpty) {
        setAiResponse({ type: 'guidance', content: 'Fill in every region of the Venn diagram before checking.', partKey });
        return;
      }
      const rcsCorrect = answersMatch(answers['rcs'] || '', correctMap['rcs'] || '');
      let earned = 0;
      let msg = '';
      if (correctCount === 8) {
        earned = 3; msg = 'Excellent — all 8 regions are correct (3 marks).';
        newFeedback['a'] = 'correct';
      } else if (correctCount >= 6) {
        earned = 2; msg = `B2 awarded: ${correctCount} of 8 regions correct.`;
        newFeedback['a'] = 'incorrect';
      } else if (correctCount >= 4) {
        earned = 1; msg = `B1 awarded: ${correctCount} of 8 regions correct.`;
        newFeedback['a'] = 'incorrect';
      } else if (rcsCorrect) {
        earned = 1; msg = 'B1 awarded for the correct value 2 in the R∩C∩S intersection.';
        newFeedback['a'] = 'incorrect';
      } else {
        msg = 'No marks yet — carefully recount the members in each region.';
        newFeedback['a'] = 'incorrect';
      }
      setFeedback(newFeedback);
      setIsChecked(true);
      setAttemptCount(prev => ({ ...prev, a: (prev.a || 0) + 1 }));
      setAiResponse({ type: 'guidance', content: `${msg} (Provisional — final marks confirmed on submit.)`, partKey });
      return;
    }

    // ===== Custom student-built step (My working) =====
    // partKey looks like `${rootPart}_custom_${i}` — there is no expected answer for it,
    // so we send rich context (original question, ALL reference answers, marking criteria,
    // and any previous custom steps) to the AI so it can analyse the actual algebra.
    const customMatch = partKey.match(/^(.*)_custom_(\d+)$/);
    if (customMatch) {
      const [, rootPart, idxStr] = customMatch;
      const studentExpression = answers[partKey] || '';
      if (!normalizeAnswer(studentExpression)) {
        setAiResponse({
          type: 'guidance',
          content: `Build at least one expression in this step before checking.`,
          partKey,
        });
        return;
      }

      // Collect previous custom steps (so AI sees the chain of working)
      const previousSteps: Record<string, string> = {};
      const idx = parseInt(idxStr, 10);
      for (let i = 0; i < idx; i++) {
        const k = `${rootPart}_custom_${i}`;
        if (answers[k]) previousSteps[`step_${i + 1}`] = answers[k];
      }

      // ===== Deterministic algebraic verification =====
      // A valid algebraic step must produce an equation EQUIVALENT to the previous line.
      // We test by computing f(x) = lhs - rhs at multiple values of the variable for
      // both the previous line and the student's line, and check that f_prev = k * f_stud
      // for some constant k (i.e. the equations have the same solution set).
      let deterministicVerdict: 'correct' | 'wrong' | 'unknown' = 'unknown';
      let deterministicNote = '';
      try {
        let prevLine = '';
        for (let i = idx - 1; i >= 0; i--) {
          const candidate = (answers[`${rootPart}_custom_${i}`] || '').trim();
          if (candidate) {
            prevLine = candidate;
            break;
          }
        }

        if (prevLine && studentExpression.includes('=') && prevLine.includes('=')) {
          const variableNames = Array.from(new Set((prevLine + studentExpression).match(/[a-zA-Z]/g) || ['x']));
          const flowCheck = compareEquationFlow(prevLine, studentExpression, variableNames);
          deterministicVerdict = flowCheck.verdict;
          deterministicNote = flowCheck.verdict === 'correct'
            ? `Verified: this line follows correctly from the previous line (equivalent equation${typeof flowCheck.ratio === 'number' ? `, multiplier ≈ ${flowCheck.ratio.toFixed(3)}` : ''}).`
            : flowCheck.verdict === 'wrong'
            ? 'Verified: this line does NOT follow logically from the previous line; the equations are not equivalent.'
            : '';
        }
      } catch (e) {
        console.warn('Deterministic check failed, falling back to AI only:', e);
      }

      // Reference: full correct answer map for this question (gives AI the target form
      // and any predefined-stage answers like "3x", "x", "1", "2", etc.)
      const referenceAnswers = typeof question.answer === 'object' ? question.answer : { answer: question.answer };

      setAttemptCount(prev => ({ ...prev, [partKey]: (prev[partKey] || 0) + 1 }));
      setIsLoading(true);
      setLoadingType('check');
      setLoadingPartKey(partKey);
      checkworkUsageRef.current += 1;
      if (user && matchedPaper && paperQuota) {
        await supabase.rpc('decrement_checkwork', { p_student_id: user.id, p_paper_id: matchedPaper.id });
        refetchAssignments();
      }
      try {
        const { data, error } = await supabase.functions.invoke('ai-tutor', {
          body: {
            question: question.question,
            actionType: 'checkWork',
            evaluateNeutral: deterministicVerdict === 'unknown',
            userAnswers: {
              [`student_step_${idx + 1}`]: studentExpression,
              ...previousSteps,
            },
            correctAnswers: referenceAnswers,
            topic: question.title,
            hints: question.hints,
            attemptCount: (attemptCount[partKey] || 0) + 1,
            hasMissing: false,
            hasWrong: deterministicVerdict === 'wrong',
            specificPart: deterministicVerdict === 'correct'
              ? `DETERMINISTIC VERIFICATION: ${deterministicNote} The student's line "${studentExpression}" is CORRECT. Give a brief warm confirmation (1-2 sentences) explaining what they did right (e.g. multiplied both sides, distributed, combined like terms). Do NOT hint at the next step. Do NOT contradict this verdict.`
              : deterministicVerdict === 'wrong'
              ? `DETERMINISTIC VERIFICATION: ${deterministicNote} The student's line "${studentExpression}" is WRONG — it is not equivalent to the previous non-empty line in their working. Identify the specific arithmetic/algebraic error (e.g. forgot to multiply a term on one side, wrong distribution, sign error) WITHOUT revealing the corrected value or final answer. Do NOT mark it as correct. Do NOT contradict this verdict.`
              : `Student's working line ${idx + 1}: "${studentExpression}". First, VERIFY the algebra of THIS line yourself: compute whether it follows correctly from the previous line shown (if any) and whether both sides are equivalent. If it is mathematically correct, confirm it briefly and warmly. If it is wrong, point out the specific error in THIS line. Do NOT assume it is wrong by default. Do NOT suggest, hint at, or guide toward the next step.`,
            workingContent: '',
            markingCriteria: question.markingCriteria,
            previousFeedback: previousFeedbackRef.current[partKey] || []
          },
        });
        if (error) throw error;
        if (data?.hint) {
          previousFeedbackRef.current[partKey] = [...(previousFeedbackRef.current[partKey] || []), data.hint].slice(-5);
        }
        setAiResponse({ type: 'guidance', content: data.hint, partKey });
      } catch (error) {
        console.error('Check work error:', error);
        setAiResponse({
          type: 'guidance',
          content: `Re-check this line against the original equation. Make sure every term — including the right-hand side — has been multiplied through correctly.`,
          partKey,
        });
      } finally {
        setIsLoading(false);
        setLoadingType(null);
        setLoadingPartKey(null);
      }
      return;
    }

    // Standard single-value check
    const rawAnswer = directAnswer !== undefined ? directAnswer : (answers[partKey] || '');
    const correctRaw = typeof question.answer === 'object' ? question.answer[partKey] || '' : 
      typeof question.answer === 'string' ? question.answer : '';
    
    const isCorrect = answersMatch(rawAnswer, correctRaw);
    
    const userAnswer = normalizeAnswer(rawAnswer);
    const newFeedback: Record<string, 'correct' | 'incorrect' | null> = { ...feedback, [partKey]: userAnswer ? (isCorrect ? 'correct' : 'incorrect') : null };
    setFeedback(newFeedback);
    setIsChecked(true);
    setAttemptCount(prev => ({ ...prev, [partKey]: (prev[partKey] || 0) + 1 }));

    if (isCorrect && userAnswer) {
      setAiResponse({ 
        type: 'guidance', 
        content: `Excellent work on ${partLabel}! Your answer is correct.`,
        partKey
      });
      return;
    }

    if (!userAnswer) {
      setAiResponse({ 
        type: 'guidance', 
        content: `Please enter your answer for ${partLabel} before checking.`,
        partKey
      });
      return;
    }

    // Get AI guidance for this specific part
    setIsLoading(true);
    setLoadingType('check');
    setLoadingPartKey(partKey);
    checkworkUsageRef.current += 1;
    if (user && matchedPaper && paperQuota) {
      await supabase.rpc('decrement_checkwork', { p_student_id: user.id, p_paper_id: matchedPaper.id });
      refetchAssignments();
    }
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: question.question,
          actionType: 'checkWork',
          userAnswers: { [partKey]: answers[partKey] },
          correctAnswers: typeof question.answer === 'object' ? { [partKey]: question.answer[partKey] } : question.answer,
          topic: question.title,
          hints: question.hints,
          attemptCount: (attemptCount[partKey] || 0) + 1,
          hasMissing: false,
          hasWrong: true,
          specificPart: partLabel,
          workingContent: answers['working'] || '',
          markingCriteria: question.markingCriteria,
          previousFeedback: previousFeedbackRef.current[partKey] || []
        }
      });

      if (error) throw error;
      if (data?.hint) {
        previousFeedbackRef.current[partKey] = [...(previousFeedbackRef.current[partKey] || []), data.hint].slice(-5);
      }
      setAiResponse({ type: 'guidance', content: data.hint, partKey });
    } catch (error) {
      console.error('Check work error:', error);
      setAiResponse({ 
        type: 'guidance', 
        content: `Review your answer for ${partLabel}. Check your calculation and make sure you've applied the correct method.`,
        partKey
      });
    } finally {
      setIsLoading(false);
      setLoadingType(null);
      setLoadingPartKey(null);
    }
  };

  // Check if all marking-scheme parts have answers (only parts with marks > 0 are required)
  // For equationSolveParts, check the last box of the last stage instead of the part key
  const areAllPartsCompleted = (): boolean => {
    // Q16: requires at least one point placed on the diagram to mark region R
    if (question.id === 'pp_4024_on23_11_q16') {
      try {
        const d = JSON.parse(answers['q16_data'] || '{}');
        return Array.isArray(d?.points) && d.points.length > 0;
      } catch { return false; }
    }
    if (question.parts) {
      const eqParts = (question as any).equationSolveParts as string[] | undefined;
      const fracParts = (question as any).fractionDivisionParts as string[] | undefined;
      const correctAns = typeof question.answer === 'object' ? (question.answer as Record<string, string>) : undefined;
      return question.parts
        .filter(part => part.marks > 0)
        .every(part => {
          if (question.id === 'pp_4024_on23_11_q18' && part.key === 'a') {
            const regionKeys = ['ronly', 'conly', 'sonly', 'rcOnly', 'rsOnly', 'csOnly', 'rcs', 'outside'];
            return regionKeys.every(regionKey => !!answers[regionKey]?.trim());
          }
          // Diagram-scored parts have no text inputs to fill — completion is implicit
          if ((part as any).diagramScored) return true;
          // Fraction-division workspace: final answer lives in s2_fn/s2_fd or s1_rn/s1_rd
          if (fracParts?.includes(part.key)) {
            const hasSimplify = correctAns && (`${part.key}_s2_fn` in correctAns);
            if (hasSimplify) {
              return !!answers[`${part.key}_s2_fn`]?.trim() && !!answers[`${part.key}_s2_fd`]?.trim();
            }
            return !!answers[`${part.key}_s1_rn`]?.trim() && !!answers[`${part.key}_s1_rd`]?.trim();
          }
          // If this part is rendered as an equation-solve workspace, check its stage boxes
          if (eqParts?.includes(part.key)) {
            const stagesMap = (question as any).equationStagesMap;
            const stages = stagesMap?.[part.key] || (question as any).equationStages;
            if (stages && stages.length > 0) {
              // Find the last box element in the last stage
              const lastStage = stages[stages.length - 1];
              const boxElements = lastStage.elements.filter((el: any) => el.type === 'box' && el.key);
              if (boxElements.length > 0) {
                const lastBoxKey = `${part.key}_${boxElements[boxElements.length - 1].key}`;
                return !!answers[lastBoxKey]?.trim();
              }
            }
            return true; // No stages means nothing to check
          }
          return !!answers[part.key]?.trim();
        });
    }
    return !!answers['answer']?.trim();
  };

  // Submit: Final submission with answer reveal
  const handleSubmit = async () => {
    // Check if all parts are completed first
    if (!areAllPartsCompleted()) {
      toast({
        title: "Incomplete Work",
        description: "Please complete all parts of the question before submitting.",
        variant: "destructive"
      });
      return;
    }

    const { allCorrect, newFeedback, marksEarned, markingNotes } = checkAnswersInternal();
    setFeedback(newFeedback);
    setStoredMarksEarned(marksEarned);
    setStoredMarkingNotes(markingNotes);
    setIsChecked(true);
    setIsSubmitted(true);
    const timeSpentNow = Math.round((Date.now() - startTimeRef.current) / 1000);
    setFinalTime(timeSpentNow);

    // Always record progress when submitted (all parts completed)
    markExampleComplete(question.id);

    // Save progress to database
    if (user) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      const correctCount = Object.values(newFeedback).filter(f => f === 'correct').length;
      const totalCount = Object.values(newFeedback).length;
      const accuracyScore = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      const speedScore = Math.round(Math.max(0, Math.min(100, 100 - (timeSpent - 60) / 3)));

      // Find the correct paper ID by looking up which paper contains this question
      const matchedPaper = pastPapers.find(p => p.sections.some(s => s.questionId === question.id));
      const paperId = matchedPaper?.id || 'pp_0580_s22_31';

      await supabase.from('student_paper_progress').upsert({
        user_id: user.id,
        paper_id: paperId,
        question_id: question.id,
        workspace_mode: workspaceMode,
        is_correct: allCorrect,
        accuracy_score: accuracyScore,
        speed_score: speedScore,
        ai_usage_count: aiUsageRef.current,
        checkwork_count: checkworkUsageRef.current,
        time_spent_seconds: timeSpent,
        total_steps: totalCount,
        completed_steps: correctCount,
        submitted_at: new Date().toISOString(),
        submitted_answers: answers,
        submitted_feedback: newFeedback,
      }, { onConflict: 'user_id,paper_id,question_id,workspace_mode' });

      // Invalidate progress queries
      queryClient.invalidateQueries({ queryKey: ['student-progress'] });
    }

    // Always notify external listeners (e.g. demo mode) regardless of auth
    if (onSubmitProgress) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      const correctCount = Object.values(newFeedback).filter(f => f === 'correct').length;
      const totalCount = Object.values(newFeedback).length;
      const accuracyScore = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      const speedScore = Math.round(Math.max(0, Math.min(100, 100 - (timeSpent - 60) / 3)));
      const matchedPaper = pastPapers.find(p => p.sections.some(s => s.questionId === question.id));
      const marksAvailable = question.marks || 0;
      const marksObtained = Math.round(Object.values(marksEarned).reduce((s, v) => s + (v || 0), 0));
      onSubmitProgress({
        questionId: question.id,
        paperId: matchedPaper?.id || '',
        isCorrect: allCorrect,
        accuracyScore,
        speedScore,
        aiUsageCount: aiUsageRef.current,
        checkworkCount: checkworkUsageRef.current,
        timeSpentSeconds: timeSpent,
        totalSteps: totalCount,
        completedSteps: correctCount,
        marksObtained,
        marksAvailable,
        submittedAt: new Date().toISOString(),
        submittedAnswers: answers,
      });
    }

    if (allCorrect && Object.keys(newFeedback).length > 0) {
      toast({
        title: "Excellent! 🎉",
        description: "You got it right!",
      });
    } else {
      toast({
        title: "Answer Submitted",
        description: "Your progress has been recorded. Review the correct answers below.",
      });
    }
  };

  const resetWorkspace = () => {
    setAnswers({});
    setFeedback({});
    setStoredMarksEarned({});
    setStoredMarkingNotes({});
    setIsChecked(false);
    setIsSubmitted(false);
    setAiResponse(null);
    setAttemptCount({});
    setLoadingPartKey(null);
    setFinalTime(null);
    setElapsedSeconds(0);
    startTimeRef.current = Date.now();
    aiUsageRef.current = 0;
    checkworkUsageRef.current = 0;
  };

  const dismissAiResponse = useCallback(() => {
    setAiResponse(null);
  }, []);

  const feedbackAction = aiResponse
    ? {
        label: aiResponse.type === 'hint' ? 'OK' : feedback[aiResponse.partKey || ''] === 'incorrect' ? 'Try again' : 'Continue',
        onClick: dismissAiResponse,
        tourData:
          aiResponse.type === 'hint'
            ? 'hint-ok-btn'
            : feedback[aiResponse.partKey || ''] === 'incorrect'
              ? aiResponse.partKey === 'a'
                ? 'try-again-btn-a'
                : aiResponse.partKey === 'b'
                  ? 'try-again-btn-b'
                  : 'try-again-btn'
              : aiResponse.partKey === 'a'
                ? 'continue-btn-a'
                : aiResponse.partKey === 'b'
                  ? 'continue-btn-b'
                  : 'continue-btn',
      }
    : undefined;

  // Reset individual question (dashboard/general mode only)
  const handleResetQuestion = async () => {
    if (workspaceMode !== 'general') return;
    try {
      if (user) {
        await supabase
          .from('student_paper_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('question_id', question.id)
          .eq('workspace_mode', 'general');
        queryClient.invalidateQueries({ queryKey: ['student-progress'] });
      }
      if (onResetExternal) onResetExternal();
      resetWorkspace();
      toast({ title: 'Question reset', description: 'You can now re-attempt this question.' });
    } catch {
      toast({ title: 'Reset failed', variant: 'destructive' });
    }
  };

  const allCorrect = Object.values(feedback).length > 0 && 
    Object.values(feedback).every(f => f === 'correct');

  const getCorrectAnswerDisplay = () => {
    if (typeof question.answer === 'string') {
      return question.answer;
    }
    return Object.entries(question.answer)
      .map(([key, val]) => `${key}: ${val}`)
      .join('\n');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {topCenterToggle && (
            <div className="flex justify-center mb-3">{topCenterToggle}</div>
          )}
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{question.questionNumber}</DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isSubmitted ? "secondary" : "outline"} className={cn("flex items-center gap-1 font-mono", !isSubmitted && "animate-pulse")}>
                <Clock className="h-3 w-3" />
                {formatTime(isSubmitted && finalTime !== null ? finalTime : elapsedSeconds)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                {editMode && onEditField ? (
                  <input
                    type="number"
                    min={0}
                    value={question.marks}
                    onChange={(e) => onEditField('marks', e.target.value)}
                    className="w-10 bg-transparent border-b border-dashed border-border focus:border-primary outline-none text-center"
                  />
                ) : (
                  question.marks
                )}
                {' '}mark{question.marks > 1 ? 's' : ''}
              </Badge>
              {paperQuota && (
                <>
                  <Badge variant="secondary" className="text-xs">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    {paperQuota.hints}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {paperQuota.checkwork}
                  </Badge>
                </>
              )}
              {headerActions}
            </div>
          </div>
          {editMode && onEditField ? (
            <InlineEditableText
              value={question.title}
              onCommit={(value) => onEditField('title', value)}
              className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
            />
          ) : (
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{question.title}</p>
          )}
          {(() => {
            const baseRef = getQuestionSyllabusRef(question.id);
            const ov = (question as any).syllabusOverride as { topicTitle?: string; subtopicCode?: string; subtopicTitle?: string } | undefined;
            const subtopicCode = ov?.subtopicCode ?? baseRef?.subtopicCode ?? '';
            const subtopicTitle = ov?.subtopicTitle ?? baseRef?.subtopicTitle ?? '';
            const topicTitle = ov?.topicTitle ?? baseRef?.topicTitle ?? '';
            const hasAny = subtopicCode || subtopicTitle || topicTitle;
            if (!hasAny && !editMode) return null;
            if (editMode && onEditField) {
              return (
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <Badge variant="secondary" className="text-xs font-normal gap-1 py-0.5">
                    <BookOpen className="w-3 h-3" />
                    <InlineEditableText
                      value={subtopicCode}
                      onCommit={(v) => onEditField('subtopicCode', v)}
                      className="px-1 py-0 text-xs min-w-[2rem]"
                    />
                    <InlineEditableText
                      value={subtopicTitle}
                      onCommit={(v) => onEditField('subtopicTitle', v)}
                      className="px-1 py-0 text-xs min-w-[4rem]"
                    />
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <InlineEditableText
                    value={topicTitle}
                    onCommit={(v) => onEditField('topicTitle', v)}
                    className="text-xs text-muted-foreground px-1 py-0 min-w-[4rem]"
                  />
                </div>
              );
            }
            return (
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="secondary" className="text-xs font-normal">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {subtopicCode} {subtopicTitle}
                </Badge>
                {topicTitle && <span className="text-xs text-muted-foreground">• {topicTitle}</span>}
              </div>
            );
          })()}

        </DialogHeader>

        <div className="space-y-6">
        <>

          {/* Question */}
          <div className="rounded-md border border-dashed border-border bg-background/40 p-3">
            {editMode && onEditField ? (
              <>
                <InlineMathToolbar
                  onInsert={(t) => insertAtCaret(questionEditableRef.current, t)}
                  hasSvg={!!(question as any).diagramSvgMarkup}
                  onUploadSvg={(svg) => onEditField('diagramSvgMarkup', svg)}
                  onClearSvg={() => onEditField('diagramSvgMarkup', '')}
                  onReplaceText={(t) => onEditField('question', t)}
                />

                <InlineEditableText
                  ref={questionEditableRef}
                  value={question.question}
                  onCommit={(value) => onEditField('question', value)}
                  multiline
                  className="text-foreground flex min-h-[96px] items-start px-0 py-0 text-base leading-7 hover:border-primary/40 focus:border-primary"
                />
              </>

            ) : (
              <QuestionText text={question.question} />
            )}
            {question.questionFraction && (
              <p className="text-foreground flex flex-wrap items-center gap-1 mt-2">
                <span className="inline-flex flex-col items-center mx-2 align-middle">
                  <span className="font-mono text-base px-2">{question.questionFraction.numerator}</span>
                  <span className="w-full border-t border-foreground" />
                  <span className="font-mono text-base px-2">{question.questionFraction.denominator}</span>
                </span>
                <span>.</span>
              </p>
            )}

            {/* Admin-uploaded diagram override (from PaperEditor) */}
            {(question as any).diagramSvgMarkup ? (
              <div
                className="mt-4 flex justify-center text-foreground [&_svg]:max-w-full [&_svg]:max-h-[60vh] [&_svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: themeSvgMarkup((question as any).diagramSvgMarkup) }}
              />
            ) : (question as any).diagramImageUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={(question as any).diagramImageUrl}
                  alt="Question diagram"
                  className="max-w-full rounded-lg border border-border bg-white"
                />
              </div>
            )}

            {/* Extra question blocks — additional question prompts with their own SVG + symbols */}
            {!solutionOverride && (
              <ExtraQuestionBlocks
                blocks={((question as any).extraQuestionBlocks as Array<{ id: string; text: string; svgMarkup?: string }> | undefined) || []}
                editMode={!!(editMode && onEditField)}
                onChange={(next) => onEditField && onEditField('extraQuestionBlocks', next)}
              />
            )}









            {/* Interactive Diagrams based on question ID */}
            {question.id === 'pp_0580_s22_q2b' && (
              <div className="mt-4">
                <DigitalProtractor />
              </div>
            )}
            
            {question.id === 'pp_0580_s22_q2d' && (
              <div className="mt-4">
                <ParallelogramDiagram reflexAngle={248} />
              </div>
            )}
            
            {question.id === 'pp_0580_s22_q4a' && (
              <div className="mt-4">
                <PrismDiagram 
                  baseWidth={4} 
                  baseHeight={3} 
                  length={7}
                  labels={{ base: '4 cm', height: '3 cm', length: '7 cm' }}
                />
              </div>
            )}
            
            {question.id === 'pp_0580_s22_q4b' && (
              <div className="mt-4">
                <CirclesInRectangle rows={2} cols={3} radius={8} showLabels={true} showShading={true} />
              </div>
            )}
            
            {question.id === 'pp_0580_s22_q8a' && (
              <div className="mt-4">
                <CoordinateGrid
                  width={350}
                  height={350}
                  xRange={[-6, 4]}
                  yRange={[-2, 6]}
                  lines={[
                    {
                      points: [{ x: -4, y: 4 }, { x: 2, y: 1 }],
                      color: 'hsl(var(--primary))',
                      label: 'L'
                    }
                  ]}
                  showPoints={[
                    { x: -4, y: 4, label: '(-4, 4)' },
                    { x: 2, y: 1, label: '(2, 1)' }
                  ]}
                  interactive={true}
                />
              </div>
            )}
            
            {(question.id === 'pp_0580_s22_q8b' || question.id === 'pp_0580_s22_q8c' || question.id === 'pp_0580_s22_q8d') && (
              <div className="mt-4">
                <CoordinateGrid
                  width={350}
                  height={350}
                  xRange={[-6, 4]}
                  yRange={[-6, 6]}
                  lines={[
                    {
                      points: [{ x: -4, y: 4 }, { x: 2, y: 1 }],
                      color: 'hsl(var(--primary))',
                      label: 'L'
                    },
                    {
                      points: [{ x: -5, y: -5 }, { x: 0, y: 5 }],
                      color: 'hsl(var(--accent-foreground))',
                      label: 'y = 2x + 5',
                      dashed: true
                    }
                  ]}
                  interactive={true}
                />
              </div>
            )}
            
            {/* Q9 - Unified Reciprocal Graph workspace */}
            {question.id === 'pp_0580_s22_q9' && (
              <div className="mt-4 space-y-4">
                {/* Part (a) - Table */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-2">(a) Complete the table for y = 12/x [3 marks]</p>
                  <div className="overflow-x-auto">
                    <table className="text-sm border-collapse w-full">
                      <thead>
                        <tr>
                          <td className="border border-border px-2 py-1.5 font-medium bg-muted text-xs">x</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−6</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−4</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−3</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−2</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−1</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">1</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">2</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">3</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">4</td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">6</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-2 py-1.5 font-medium bg-muted text-xs">y</td>
                          <td className="border border-border p-0">
                            <Input
                              value={answers['y_neg6'] || ''}
                              onChange={(e) => handleAnswerChange('y_neg6', e.target.value)}
                              disabled={isSubmitted}
                              className={cn(
                                "h-7 w-full text-center text-xs border-0 rounded-none",
                                feedback['y_neg6'] === 'correct' && "bg-green-500/10",
                                feedback['y_neg6'] === 'incorrect' && "bg-destructive/10"
                              )}
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−3</td>
                          <td className="border border-border p-0">
                            <Input
                              value={answers['y_neg3'] || ''}
                              onChange={(e) => handleAnswerChange('y_neg3', e.target.value)}
                              disabled={isSubmitted}
                              className={cn(
                                "h-7 w-full text-center text-xs border-0 rounded-none",
                                feedback['y_neg3'] === 'correct' && "bg-green-500/10",
                                feedback['y_neg3'] === 'incorrect' && "bg-destructive/10"
                              )}
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">−6</td>
                          <td className="border border-border p-0">
                            <Input
                              value={answers['y_neg1'] || ''}
                              onChange={(e) => handleAnswerChange('y_neg1', e.target.value)}
                              disabled={isSubmitted}
                              className={cn(
                                "h-7 w-full text-center text-xs border-0 rounded-none",
                                feedback['y_neg1'] === 'correct' && "bg-green-500/10",
                                feedback['y_neg1'] === 'incorrect' && "bg-destructive/10"
                              )}
                            />
                          </td>
                          <td className="border border-border p-0">
                            <Input
                              value={answers['y_1'] || ''}
                              onChange={(e) => handleAnswerChange('y_1', e.target.value)}
                              disabled={isSubmitted}
                              className={cn(
                                "h-7 w-full text-center text-xs border-0 rounded-none",
                                feedback['y_1'] === 'correct' && "bg-green-500/10",
                                feedback['y_1'] === 'incorrect' && "bg-destructive/10"
                              )}
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">6</td>
                          <td className="border border-border p-0">
                            <Input
                              value={answers['y_3'] || ''}
                              onChange={(e) => handleAnswerChange('y_3', e.target.value)}
                              disabled={isSubmitted}
                              className={cn(
                                "h-7 w-full text-center text-xs border-0 rounded-none",
                                feedback['y_3'] === 'correct' && "bg-green-500/10",
                                feedback['y_3'] === 'incorrect' && "bg-destructive/10"
                              )}
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5 text-center text-xs">3</td>
                          <td className="border border-border p-0">
                            <Input
                              value={answers['y_6'] || ''}
                              onChange={(e) => handleAnswerChange('y_6', e.target.value)}
                              disabled={isSubmitted}
                              className={cn(
                                "h-7 w-full text-center text-xs border-0 rounded-none",
                                feedback['y_6'] === 'correct' && "bg-green-500/10",
                                feedback['y_6'] === 'incorrect' && "bg-destructive/10"
                              )}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Parts (b), (c), (d) - Graph */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">(b) Draw the graph of y = 12/x [4 marks]</p>
                  <p className="text-sm font-medium mb-1">(c) Draw the line y = 5 [1 mark]</p>
                  <p className="text-sm font-medium mb-3">(d) Use your graph to solve 12/x = 5 [1 mark]</p>
                  
                  <ReciprocalGraph
                    width={380}
                    height={380}
                    xRange={[-6, 6]}
                    yRange={[-12, 12]}
                    k={12}
                    showHorizontalLine={5}
                    interactive={true}
                    showTablePoints={false}
                  />
                  
                  {/* Part (d) answer input */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium">(d) x =</span>
                    <Input
                      value={answers['solution'] || ''}
                      onChange={(e) => handleAnswerChange('solution', e.target.value)}
                      disabled={isSubmitted}
                      className={cn(
                        "w-20 h-8 text-center",
                        feedback['solution'] === 'correct' && "border-green-500 bg-green-500/10",
                        feedback['solution'] === 'incorrect' && "border-destructive bg-destructive/10"
                      )}
                      placeholder="?"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* ========== 0580/43 May/June 2021 Diagrams ========== */}
            
            {/* Q3(d) - Histogram */}
            {question.id === 'pp_0580_s21_q3d' && (
              <div className="mt-4">
                <HistogramDiagram />
              </div>
            )}
            
            {/* Q4 - Coordinates & Vectors */}
            {(question.id === 'pp_0580_s21_q4a' || question.id === 'pp_0580_s21_q4b') && (
              <div className="mt-4">
                <CoordinateGrid
                  width={320}
                  height={320}
                  xRange={[-2, 10]}
                  yRange={[-8, 10]}
                  showPoints={[
                    { x: 1, y: 5, label: 'A(1,5)' },
                    { x: 3, y: 9, label: 'B(3,9)' },
                    { x: 3, y: 5, label: 'P(3,5)' }
                  ]}
                  interactive={true}
                />
              </div>
            )}
            
            {/* Q6 - Venn Diagrams */}
            {(question.id === 'pp_0580_s21_q6a' || question.id === 'pp_0580_s21_q6e' || question.id === 'pp_0580_s21_q6f') && (
              <div className="mt-4">
                <VennDiagram
                  leftLabel="H"
                  rightLabel="T"
                  leftOnly={8}
                  rightOnly={5}
                  intersection={10}
                  outside={1}
                />
              </div>
            )}
            
            {/* Q7 - Number Line */}
            {question.id === 'pp_0580_s21_q7a' && (
              <div className="mt-4">
                <NumberLineDiagram
                  min={-4}
                  max={3}
                  leftBound={-2}
                  rightBound={1}
                  leftInclusive={false}
                  rightInclusive={true}
                />
              </div>
            )}
            
            {/* Q8 - Cuboid */}
            {question.id === 'pp_0580_s21_q8a' && (
              <div className="mt-4">
                <CuboidDiagram
                  length={20}
                  width={12}
                  height={5}
                  labels={{ length: '20 cm', width: '12 cm', height: '5 cm' }}
                />
              </div>
            )}
            
            {/* Q9 - Cube with diagonal for 3D geometry */}
            {question.id === 'pp_0580_s21_q9b' && (
              <div className="mt-4">
                <CubeDiagram diagonalLength={8.5} />
              </div>
            )}
            
            {/* ========== 0580/11 May/June 2020 Diagrams ========== */}
            
            {/* Q4(a) - Symmetry shapes */}
            {question.id === 'pp_0580_s20_q4a' && (
              <div className="mt-4">
                <SymmetryShapes part="a" />
              </div>
            )}
            
            {/* Q4(b) - Rotational symmetry shape */}
            {question.id === 'pp_0580_s20_q4b' && (
              <div className="mt-4">
                <SymmetryShapes part="b" />
              </div>
            )}
            
            {/* Q5 - Isosceles triangle with exterior angle */}
            {question.id === 'pp_0580_s20_q5' && (
              <div className="mt-4">
                <IsoscelesExteriorDiagram angleBAC={38} />
              </div>
            )}
            
            {/* Q7 - Composite rectangles */}
            {question.id === 'pp_0580_s20_q7' && (
              <div className="mt-4">
                <CompositeRectangles />
              </div>
            )}
            
            {/* Q9(a) & Q9(b) - Vector grid with P and Q */}
            {(question.id === 'pp_0580_s20_q9a' || question.id === 'pp_0580_s20_q9b') && (
              <div className="mt-4">
                <CoordinateGrid
                  width={300}
                  height={300}
                  xRange={[-4, 4]}
                  yRange={[-4, 4]}
                  showPoints={[
                    { x: 2, y: -1, label: 'P' },
                    { x: -3, y: 2, label: 'Q' }
                  ]}
                  interactive={false}
                />
              </div>
            )}
            
            {/* Q11 - Cone diagram */}
            {question.id === 'pp_0580_s20_q11' && (
              <div className="mt-4">
                <ConeDiagram />
              </div>
            )}
            
            {/* Q14 - Trapezium with co-interior angles */}
            {question.id === 'pp_0580_s20_q14' && (
              <div className="mt-4">
                <TrapeziumDiagram angleLeft="(97 − 3x)°" angleRight="(69 + 5x)°" />
              </div>
            )}
            
            {/* Q18 - Scatter diagram */}
            {question.id === 'pp_0580_s20_q18' && (
              <div className="mt-4">
                <ScatterDiagram />
              </div>
            )}
            
            {/* Q22 - Coordinate grid with line L */}
            {question.id === 'pp_0580_s20_q22' && (
              <div className="mt-4">
                <CoordinateGrid
                  width={320}
                  height={320}
                  xRange={[-3, 4]}
                  yRange={[-5, 5]}
                  lines={[
                    {
                      points: [{ x: 0, y: -3 }, { x: 2, y: 1 }],
                      color: 'hsl(var(--primary))',
                      label: 'L'
                    }
                  ]}
                  showPoints={[
                    { x: 0, y: -3, label: '(0, −3)' },
                    { x: 2, y: 1, label: '(2, 1)' }
                  ]}
                  interactive={true}
                />
              </div>
            )}
            
            {/* Q23 - Similar triangles */}
            {question.id === 'pp_0580_s20_q23' && (
              <div className="mt-4">
                <SimilarTriangles />
              </div>
            )}
            
            {/* ========== 0580/22 Feb/March 2022 Diagrams ========== */}
            
            {/* Q1 - Angle to measure */}
            {question.id === 'pp_0580_fm22_q1' && (
              <div className="mt-4">
                <AngleMeasureDiagram />
              </div>
            )}
            
            {/* Q4 - Cuboid 7×4×5 */}
            {question.id === 'pp_0580_fm22_q4' && (
              <div className="mt-4">
                <CuboidDiagram
                  length={7}
                  width={4}
                  height={5}
                  labels={{ length: '7 cm', width: '4 cm', height: '5 cm' }}
                />
              </div>
            )}
            
            {/* Q7 - Number line for n > -1 */}
            {question.id === 'pp_0580_fm22_q7' && (
              <div className="mt-4">
                <NumberLineDiagram
                  min={-3}
                  max={3}
                  leftBound={-1}
                  rightBound={3}
                  leftInclusive={false}
                  rightInclusive={false}
                />
              </div>
            )}
            
            {/* Q8 - Transformations grid with triangles */}
            {question.id === 'pp_0580_fm22_q8' && (
              <div className="mt-4">
                <TransformationGrid />
              </div>
            )}
            
            {/* Q14 - Circle with radius 4.7cm */}
            {question.id === 'pp_0580_fm22_q14' && (
              <div className="mt-4">
                <CircleDiagram radius={4.7} />
              </div>
            )}
            
            {/* Q16 - Coordinate grid with line through (-6,5) and (-2,-3) */}
            {question.id === 'pp_0580_fm22_q16' && (
              <div className="mt-4">
                <CoordinateGrid
                  width={350}
                  height={350}
                  xRange={[-8, 4]}
                  yRange={[-6, 8]}
                  lines={[
                    {
                      points: [{ x: -6, y: 5 }, { x: -2, y: -3 }],
                      color: 'hsl(var(--primary))',
                      label: 'l'
                    }
                  ]}
                  showPoints={[
                    { x: -6, y: 5, label: 'A(−6, 5)' },
                    { x: -2, y: -3, label: 'B(−2, −3)' }
                  ]}
                  interactive={true}
                />
              </div>
            )}
            
            {/* Q17 - Rectangle OPQR with sector */}
            {question.id === 'pp_0580_fm22_q17' && (
              <div className="mt-4">
                <RectangleSectorDiagram />
              </div>
            )}
            
            {/* Q21 - 3D rectangular box with stick */}
            {question.id === 'pp_0580_fm22_q21' && (
              <div className="mt-4">
                <RectangularBoxDiagram ab={18.6} bc={9} cg={14.5} showStick={true} stickLength={30} />
              </div>
            )}
            
            {/* Q22 - Vector trapezium OPQR */}
            {question.id === 'pp_0580_fm22_q22' && (
              <div className="mt-4">
                <VectorTrapeziumDiagram />
              </div>
            )}
            
            {/* ========== 0580/43 Additional Diagrams ========== */}
            
            {/* Q4(c) - Vector triangle OTU */}
            {question.id === 'pp_0580_s21_q4c' && (
              <div className="mt-4">
                <VectorTriangleDiagram />
              </div>
            )}
            
            {/* Q7(b) - Quadratic graph coordinate grid */}
            {question.id === 'pp_0580_s21_q7b' && (
              <div className="mt-4">
                <CoordinateGrid
                  width={320}
                  height={320}
                  xRange={[-6, 4]}
                  yRange={[-5, 8]}
                  interactive={true}
                />
              </div>
            )}
            
            {/* Q8(b) - Cylinder to sphere */}
            {question.id === 'pp_0580_s21_q8b' && (
              <div className="mt-4">
                <CylinderDiagram radius={0} height={0} />
              </div>
            )}
            
            {/* Q8(c) - Horizontal cylinder with water */}
            {question.id === 'pp_0580_s21_q8c' && (
              <div className="mt-4">
                <CylinderDiagram radius={20} height={150} horizontal={true} waterDepth={5} />
              </div>
            )}
            
            {/* Q9(a) - Quadrilateral with trigonometry */}
            {question.id === 'pp_0580_s21_q9a' && (
              <div className="mt-4">
                <QuadrilateralDiagram />
              </div>
            )}
            
            {/* Q6 - Scale drawing and bearings (4024/12 2025) */}
            {question.id === 'pp_4024_s25_12_q6' && (
              <div className="mt-4">
                <BearingDiagram
                  pointA={{ x: 80, y: 120 }}
                  pointB={{ x: 340, y: 300 }}
                  scaleLabel="1 cm : 5 km"
                  correctBearingA={60}
                  correctBearingB={320}
                  onMarkC={(correct) => {
                    handleAnswerChange('b', correct ? 'diagram' : 'incorrect');
                  }}
                />
              </div>
            )}
            
            {/* ========== 4024/11 Oct/Nov 2023 Diagrams ========== */}
            
            {/* Q5 - Bar chart */}
            {question.id === 'pp_4024_on23_11_q5' && (
              <div className="mt-4">
                <BarChart2023ON />
              </div>
            )}
            
            {/* Q6 - Parallel lines */}
            {question.id === 'pp_4024_on23_11_q6' && (
              <div className="mt-4">
                <ParallelLines2023ON />
              </div>
            )}
            
            {/* Q9 - Scatter diagram */}
            {question.id === 'pp_4024_on23_11_q9' && (
              <div className="mt-4">
                <ScatterDiagram2023ON />
              </div>
            )}

            {/* Q12 - Scale drawing & bearings */}
            {question.id === 'pp_4024_on23_11_q12' && (
              <div className="mt-4">
                <ScaleDrawing2023ON onScore={(s) => setDiagramScores({ b: s.b, c: s.c })} />
              </div>
            )}
            
            {/* Q15 - Circle theorems with tangents */}
            {question.id === 'pp_4024_on23_11_q15' && (
              <div className="mt-4">
                <CircleTheorem2023ON />
              </div>
            )}
            
            {/* Q16 - Inequalities coordinate grid */}
            {question.id === 'pp_4024_on23_11_q16' && (() => {
              const raw = answers['q16_data'];
              let data: Q16Data = EMPTY_Q16;
              try { if (raw) data = JSON.parse(raw); } catch { /* ignore */ }
              const evalRes = evaluateQ16(data, Q16_EXPECTED);
              const showFeedback = isChecked || isSubmitted;
              return (
                <div className="mt-4">
                  <InequalityRegionBuilder
                    data={data}
                    onChange={(d) => handleAnswerChange('q16_data', JSON.stringify(d))}
                    disabled={isSubmitted}
                    lineFeedback={showFeedback ? evalRes.lineFeedback : []}
                    pointFeedback={showFeedback ? evalRes.pointFeedback : []}
                    regionFeedback={showFeedback ? evalRes.regionFeedback : null}
                  />
                  <div className="mt-3 flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const r = evaluateQ16(data, Q16_EXPECTED);
                        const lineMsg = `${r.correctLineCount}/5 lines correctly placed`;
                        const vertexMsg = `${r.matchedVertexCount}/${r.totalExpectedVertices} region vertices marked` +
                          (r.hasExtraPoints ? ' (some marked points are not vertices of R)' : '');
                        const regionMsg = r.regionCorrect
                          ? 'Region R is fully marked correctly.'
                          : (r.regionFeedback === null ? 'No points placed for region R yet.' : vertexMsg);
                        toast({ title: 'Check Work', description: `${lineMsg}. ${regionMsg}` });
                        setIsChecked(true);
                      }}
                      disabled={isSubmitted}
                    >
                      Check Work
                    </Button>
                  </div>
                </div>
              );
            })()}

            {/* Q6 (4024/21 ON 2023) — Interactive function graph y = 2x + 60/x − 4 */}
            {question.id === 'pp_4024_on23_21_q6' && (() => {
              const raw = answers['q6_graph_data'];
              let data: FunctionGraphData = EMPTY_FN_GRAPH;
              try { if (raw) data = JSON.parse(raw); } catch { /* ignore */ }
              const showFeedback = isChecked || isSubmitted;
              return (
                <div className="mt-4">
                  <FunctionGraphPlotter
                    data={data}
                    onChange={(d) => handleAnswerChange('q6_graph_data', JSON.stringify(d))}
                    onScore={(s) => setDiagramScores(prev => ({ ...prev, d: s.d, ...(s.e ? { e: s.e } : {}) }))}
                    disabled={isSubmitted}
                    showFeedback={showFeedback}
                  />
                  <div className="mt-3 flex justify-end">
                    <Button type="button" variant="outline" size="sm"
                      onClick={() => { setIsChecked(true); toast({ title: 'Check Work', description: 'Graph evaluated — see point colours and tolerance count below the plot.' }); }}
                      disabled={isSubmitted}>
                      Check Work
                    </Button>
                  </div>
                </div>
              );
            })()}



            
            {/* Q18 - 3-set Venn diagram (interactive) */}
            {question.id === 'pp_4024_on23_11_q18' && (
              <div className="mt-4 space-y-6">
                <div className="relative">
                  <VennDiagram3Set2023ON
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    feedback={feedback}
                    isSubmitted={isSubmitted}
                    correctAnswers={typeof question.answer === 'object' ? question.answer as Record<string, string> : undefined}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCheckWorkForPart('a', '(a) Venn diagram')}
                      disabled={isLoading || isSubmitted}
                      className="shrink-0"
                      title="Check Work"
                    >
                      {loadingPartKey === 'a' ? <span className="animate-pulse">...</span> : <BookOpen className="h-4 w-4" />}
                    </Button>
                  </div>
                  {aiResponse?.partKey === 'a' && (
                    <div className={cn(
                      "mt-3 rounded-lg border p-3 text-sm",
                      aiResponse.type === 'hint'
                        ? "border-amber-500/30 bg-amber-500/10"
                        : "border-blue-500/30 bg-blue-500/10"
                    )}>
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <p className="whitespace-pre-line"><VecText value={aiResponse.content} /></p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-4 border-t border-border/40 space-y-2">
                  <p className="text-foreground">
                    (b) Use set notation to describe the shaded subset in the Venn diagram below.
                  </p>
                  <VennDiagramGHF_2023ON />
                </div>
              </div>
            )}
            
            {/* Q19 - Speed-time graph */}
            {question.id === 'pp_4024_on23_11_q19' && (
              <div className="mt-4">
                <SpeedTimeGraph2023ON />
              </div>
            )}
            
            {/* Q23 - Vector parallelogram */}
            {question.id === 'pp_4024_on23_11_q23' && (
              <div className="mt-4">
                <VectorParallelogram2023ON />
              </div>
            )}
            
            {/* ========== 4024/12 Oct/Nov 2023 Diagrams ========== */}
            {question.id === 'pp_4024_on23_12_q2' && (<div className="mt-4"><RectangleSquares_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q6' && (<div className="mt-4"><ParallelLines_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q7' && (<div className="mt-4"><TransformGrid_4024_12_2023ON onScore={(s) => setDiagramScores(prev => ({ ...prev, b: s }))} /></div>)}
            {question.id === 'pp_4024_on23_12_q14' && (<div className="mt-4"><TriangleConstruct_4024_12_2023ON onScore={(s) => setDiagramScores({ b: s.b, c: s.c })} /></div>)}
            {question.id === 'pp_4024_on23_12_q17' && (<div className="mt-4"><CumulativeFrequency_4024_12_2023ON onScore={(s) => setDiagramScores(prev => ({ ...prev, a: s }))} /></div>)}
            {question.id === 'pp_4024_on23_12_q18' && (<div className="mt-4"><SpeedTime_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q21' && (<div className="mt-4"><TwoSectors_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q23' && (<div className="mt-4"><VennHSG_4024_12_2023ON answers={answers} onAnswerChange={handleAnswerChange} feedback={feedback} isSubmitted={isSubmitted} onCheck={() => {
              const expected: Record<string,string> = { a_hs:'0', a_hsg:'2', a_sg:'4', a_g:'16' };
              const fb: Record<string, 'correct'|'incorrect'|null> = { ...feedback };
              let correct = 0;
              Object.entries(expected).forEach(([k,v]) => {
                const u = (answers[k] || '').trim();
                if (u === v) { fb[k] = 'correct'; correct++; }
                else fb[k] = u ? 'incorrect' : null;
              });
              setFeedback(fb);
              const marks = correct === 4 ? 2 : correct >= 2 ? 1 : 0;
              setDiagramScores(prev => ({ ...prev, a: { marks, note: `${correct}/4 regions correct` } }));
              toast({ title: 'Check Work', description: `${correct}/4 regions correct (${marks}/2 marks)` });
            }} /></div>)}
            {question.id === 'pp_4024_on23_12_q24' && (<div className="mt-4"><TriangleOAB_4024_12_2023ON /></div>)}

            {/* Fallback to static image if no interactive diagram and image exists */}
            {question.image && 
             !['pp_0580_s22_q2b', 'pp_0580_s22_q2d', 'pp_0580_s22_q4a', 'pp_0580_s22_q4b', 'pp_0580_s22_q8a', 'pp_0580_s22_q8b', 'pp_0580_s22_q8c', 'pp_0580_s22_q8d', 'pp_0580_s22_q9',
               'pp_0580_s21_q4a', 'pp_0580_s21_q4b', 'pp_0580_s21_q4c', 'pp_0580_s21_q6a', 'pp_0580_s21_q6e', 'pp_0580_s21_q6f', 'pp_0580_s21_q7a', 'pp_0580_s21_q7b', 'pp_0580_s21_q8a', 'pp_0580_s21_q8b', 'pp_0580_s21_q8c', 'pp_0580_s21_q9a', 'pp_0580_s21_q9b',
               'pp_0580_s20_q4a', 'pp_0580_s20_q4b', 'pp_0580_s20_q5', 'pp_0580_s20_q7', 'pp_0580_s20_q9a', 'pp_0580_s20_q9b', 'pp_0580_s20_q11', 'pp_0580_s20_q14', 'pp_0580_s20_q18', 'pp_0580_s20_q22', 'pp_0580_s20_q23',
               'pp_0580_fm22_q1', 'pp_0580_fm22_q4', 'pp_0580_fm22_q7', 'pp_0580_fm22_q8', 'pp_0580_fm22_q14', 'pp_0580_fm22_q16', 'pp_0580_fm22_q17', 'pp_0580_fm22_q21', 'pp_0580_fm22_q22'
             ].includes(question.id) && (
              <div className="mt-4 flex justify-center">
                <img 
                  src={question.image} 
                  alt={`Diagram for ${question.questionNumber}`}
                  className="max-w-[200px] h-auto"
                />
              </div>
            )}
          </div>

          {solutionOverride ? (
            <>
              {solutionOverride}
              {editMode && onAddQuestionSection && (
                <Button size="sm" variant="outline" onClick={onAddQuestionSection} className="gap-1">
                  <Plus className="h-3.5 w-3.5" /> Add question block
                </Button>
              )}
            </>
          ) : (<>
          {/* Answer Fields */}
          <div className="space-y-4">

            {question.type === 'formula-fraction' && question.formulaTemplate ? (
              /* Formula Fraction Layout - Single unified formula shape */
              <div className="space-y-4">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Show your working</span>
                  <span className="text-xs text-muted-foreground">[{question.marks} marks]</span>
                </label>
                
                {/* Single unified formula block with Check Work button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 py-4 text-xl font-medium overflow-x-auto flex-1">
                    <span>=</span>
                    
                    {/* Fraction: (n-2) × 180 / n */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <span>(</span>
                        <Input
                          value={answers['n1'] || ''}
                          onChange={(e) => handleAnswerChange('n1', e.target.value)}
                          disabled={isSubmitted}
                          className={cn(
                            "w-8 h-8 text-center text-xl font-medium border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent p-0",
                            feedback['n1'] === 'correct' && "border-green-500",
                            feedback['n1'] === 'incorrect' && "border-destructive"
                          )}
                        />
                        <span>- 2) ×</span>
                        <Input
                          value={answers['mult'] || ''}
                          onChange={(e) => handleAnswerChange('mult', e.target.value)}
                          disabled={isSubmitted}
                          className={cn(
                            "w-12 h-8 text-center text-xl font-medium border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent p-0",
                            feedback['mult'] === 'correct' && "border-green-500",
                            feedback['mult'] === 'incorrect' && "border-destructive"
                          )}
                        />
                      </div>
                      <div className="w-36 h-[2px] bg-foreground" />
                      <Input
                        value={answers['d1'] || ''}
                        onChange={(e) => handleAnswerChange('d1', e.target.value)}
                        disabled={isSubmitted}
                        className={cn(
                          "w-8 h-8 text-center text-xl font-medium border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent p-0",
                          feedback['d1'] === 'correct' && "border-green-500",
                          feedback['d1'] === 'incorrect' && "border-destructive"
                        )}
                      />
                    </div>
                    
                    <span>=</span>
                    
                    {/* Final answer */}
                    <Input
                      value={answers['answer'] || ''}
                      onChange={(e) => handleAnswerChange('answer', e.target.value)}
                      disabled={isSubmitted}
                      className={cn(
                        "w-14 h-10 text-center text-xl font-medium border-2 rounded",
                        feedback['answer'] === 'correct' && "border-green-500 bg-green-500/5",
                        feedback['answer'] === 'incorrect' && "border-destructive bg-destructive/5"
                      )}
                    />
                    <span>°</span>
                  </div>
                  
                  {/* Check Work button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckWorkForPart('answer', 'Interior angle calculation')}
                    disabled={isLoading || isSubmitted}
                    className="shrink-0"
                  >
                    {loadingPartKey === 'answer' ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <BookOpen className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {/* Show AI response */}
                {aiResponse?.partKey === 'answer' && (
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
                
                {/* Show correct answer after submit */}
                {isSubmitted && Object.values(feedback).some(f => f === 'incorrect') && (
                  <div className="text-sm text-green-600 font-medium">
                    Correct: (5-2) × 180 ÷ 5 = 108°
                  </div>
                )}
              </div>
            ) : question.type === 'angle-steps' && question.parts ? (
              /* Angle Steps Workspace - uses StepWorkspace with horizontal keyboard */
              <StepWorkspace
                steps={question.parts.map(p => ({
                    ...p,
                    suffix: '°'
                  }))
                }
                answers={answers}
                feedback={feedback}
                onAnswerChange={handleAnswerChange}
                onCheckWork={handleCheckWorkForPart}
                isLoading={isLoading}
                loadingStepKey={loadingPartKey}
                isSubmitted={isSubmitted}
                correctAnswers={typeof question.answer === 'object' ? question.answer : undefined}
                aiResponse={aiResponse}
                feedbackAction={feedbackAction}
                keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
              />
            ) : question.type === 'calculation' && question.parts ? (
              /* Calculation questions - use StepWorkspace */
              <StepWorkspace
                steps={question.parts.map(p => ({
                    ...p,
                    suffix: p.label.includes('°') || p.label.includes('degree') ? '°' : 
                            p.label.includes('$') ? '' :
                            p.label.includes('cm³') ? ' cm³' :
                            p.label.includes('cm²') ? ' cm²' :
                            p.label.includes('%') ? '%' : ''
                  }))
                }
                answers={answers}
                feedback={feedback}
                onAnswerChange={handleAnswerChange}
                onCheckWork={handleCheckWorkForPart}
                isLoading={isLoading}
                loadingStepKey={loadingPartKey}
                isSubmitted={isSubmitted}
                correctAnswers={typeof question.answer === 'object' ? question.answer : undefined}
                aiResponse={aiResponse}
                feedbackAction={feedbackAction}
                keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
              />
            ) : question.type === 'multi-part' && question.parts ? (
              /* Multi-part questions - use StepWorkspace + optional fraction division */
              <div className="space-y-4">
                <StepWorkspace
                  steps={question.parts.filter(p => !(p as any).diagramScored && !(question.diagramParts || []).includes(p.key) && !(question as any).fractionDivisionParts?.includes(p.key) && !(question as any).equationSolveParts?.includes(p.key) && !((question as any).primeFactorParts || {})[p.key] && !(question.id === 'pp_4024_on23_11_q18' && ['a', 'rcs', 'conly', 'sonly', 'outside', 'ronly', 'rcOnly', 'rsOnly', 'csOnly'].includes(p.key))).map(p => ({
                      ...p,
                      suffix: p.label.includes('°') || p.label.includes('degree') ? '°' :
                              p.label.includes('hour') ? ' hr' :
                              p.label.includes('minute') ? ' min' :
                              p.label.includes('%') ? '%' : ''
                    }))
                  }
                  answers={answers}
                  feedback={feedback}
                  onAnswerChange={handleAnswerChange}
                  onCheckWork={handleCheckWorkForPart}
                  isLoading={isLoading}
                  loadingStepKey={loadingPartKey}
                  isSubmitted={isSubmitted}
                  correctAnswers={typeof question.answer === 'object' ? question.answer : undefined}
                  aiResponse={aiResponse}
                  feedbackAction={feedbackAction}
                  keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
                  hideOwnKeyboard={!!(question as any).singleKeyboard}
                  onActiveKeyHandler={!!(question as any).singleKeyboard ? publishActiveKeyHandler : undefined}

                />
                {(question as any).fractionDivisionParts?.map((partKey: string) => {
                  const part = question.parts?.find(p => p.key === partKey);
                  return part ? (
                    <div key={partKey} className="space-y-2">
                      <label className="flex items-center justify-between text-sm">
                        <VecText value={part.label} className="font-medium" />
                        <span className="text-xs text-muted-foreground">[{part.marks} mark{part.marks > 1 ? 's' : ''}]</span>
                      </label>
                      <FractionDivisionWorkspace
                        questionKey={partKey}
                        answers={answers}
                        feedback={feedback}
                        onAnswerChange={handleAnswerChange}
                        onCheckWork={handleCheckWorkForPart}
                        isLoading={isLoading}
                        loadingStepKey={loadingPartKey}
                        isSubmitted={isSubmitted}
                        correctAnswers={typeof question.answer === 'object' ? question.answer : undefined}
                        aiResponse={aiResponse}
                        keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
                      />
                    </div>
                  ) : null;
                })}
                {Object.entries(((question as any).primeFactorParts || {}) as Record<string, number>).map(([pKey, target]) => {
                  const part = question.parts?.find(p => p.key === pKey);
                  const label = part ? part.label : `Prime factors of ${target}`;
                  const marks = part?.marks;
                  return (
                    <div key={`pf-${pKey}`} className="space-y-2">
                      <label className="flex items-center justify-between text-sm">
                        <span className="font-medium">{label} (ladder method)</span>
                        {marks !== undefined && <span className="text-xs text-muted-foreground">[{marks} mark{marks > 1 ? 's' : ''}]</span>}
                      </label>
                      <div className="flex gap-2 items-start">
                        <div className="flex-1">
                          <PrimeFactorLadder
                            value={answers[pKey] || ''}
                            onChange={(val) => handleAnswerChange(pKey, val)}
                            disabled={isSubmitted}
                            targetNumber={target}
                            isCorrect={feedback[pKey] === 'correct'}
                            isIncorrect={feedback[pKey] === 'incorrect'}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCheckWorkForPart(pKey, label)}
                          disabled={isLoading || isSubmitted}
                          className="shrink-0 mt-1"
                        >
                          {loadingPartKey === pKey ? <span className="animate-pulse">...</span> : <BookOpen className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {(() => {
                  const eqParts: string[] | undefined = (question as any).equationSolveParts;
                  if (!eqParts) return null;
                  const allowMap = (question as any).allowCustomStepsMap as Record<string, boolean> | undefined;
                  const beforeMap = (question as any).customStepsBeforeMap as Record<string, boolean> | undefined;
                  const useSingleKeyboard: boolean = !!(question as any).singleKeyboard;
                  return (
                    <>
                      {eqParts.map((partKey: string) => {
                        const part = question.parts?.find(p => p.key === partKey);
                        const stagesMap = (question as any).equationStagesMap;
                        const stages = stagesMap?.[partKey] || (question as any).equationStages;
                        if (!part || !stages) return null;
                        const partAllowCustom = allowMap
                          ? !!allowMap[partKey]
                          : !!(question as any).allowCustomSteps;
                        return (
                          <div key={partKey} className="space-y-2">
                            <label className="flex items-center justify-between text-sm">
                              <VecText value={part.label} className="font-medium" />
                              <span className="text-xs text-muted-foreground">[{part.marks} mark{part.marks > 1 ? 's' : ''}]</span>
                            </label>
                            <EquationSolveWorkspace
                              questionKey={partKey}
                              stages={stages}
                              answers={answers}
                              feedback={feedback}
                              onAnswerChange={handleAnswerChange}
                              onCheckWork={handleCheckWorkForPart}
                              isLoading={isLoading}
                              loadingStepKey={loadingPartKey}
                              isSubmitted={isSubmitted}
                              correctAnswers={typeof question.answer === 'object' ? question.answer : undefined}
                              aiResponse={aiResponse}
                              keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
                              allowCustomSteps={partAllowCustom}
                              structuredExtraStep={((question as any).structuredExtraStepMap || {})[partKey]}
                              customStepsAfterStepKey={((question as any).customStepsAfterStepKeyMap || {})[partKey]}
                              customStepTemplate={((question as any).customStepTemplateMap || {})[partKey]}
                              initialCustomSteps={((question as any).initialCustomStepsMap || {})[partKey]}
                              customStepsBefore={!!(beforeMap && beforeMap[partKey])}
                              hideOwnKeyboard={useSingleKeyboard}
                              onActiveKeyHandler={useSingleKeyboard ? publishActiveKeyHandler : undefined}

                            />
                          </div>
                        );
                      })}
                      {useSingleKeyboard && (
                        <div className="border-t pt-3">
                          <HorizontalKeyboard
                            keys={getKeyboardConfig(question.id, question.type, question.title)}
                            onKeyPress={(k) => activeKeyHandlerRef.current?.(k)}
                            disabled={isSubmitted}
                          />
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : question.parts ? (
              /* Generic parts - use StepWorkspace for consistency */
              <StepWorkspace
                steps={question.parts.filter(p => !(question.diagramParts || []).includes(p.key) && !(p as any).diagramScored).map(p => ({ ...p }))}
                answers={answers}
                feedback={feedback}
                onAnswerChange={handleAnswerChange}
                onCheckWork={handleCheckWorkForPart}
                isLoading={isLoading}
                loadingStepKey={loadingPartKey}
                isSubmitted={isSubmitted}
                correctAnswers={typeof question.answer === 'object' ? question.answer : undefined}
                aiResponse={aiResponse}
                feedbackAction={feedbackAction}
                keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
              />
            ) : question.type === 'prime-factor' && question.targetNumber ? (
              /* Prime Factorization Ladder */
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Prime factorization (use the ladder method)</span>
                  <span className="text-xs text-muted-foreground">[{question.marks} marks]</span>
                </label>
                <div className="flex gap-2 items-start">
                  <div className="flex-1">
                    <PrimeFactorLadder
                      value={answers['answer'] || ''}
                      onChange={(val) => handleAnswerChange('answer', val)}
                      disabled={isSubmitted}
                      targetNumber={question.targetNumber}
                      isCorrect={feedback['answer'] === 'correct'}
                      isIncorrect={feedback['answer'] === 'incorrect'}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckWorkForPart('answer', 'Prime factorization')}
                    disabled={isLoading || isSubmitted}
                    className="shrink-0 mt-1"
                  >
                    {loadingPartKey === 'answer' ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <BookOpen className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {/* Show AI response for prime factor */}
                {aiResponse?.partKey === 'answer' && (
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
                {/* Show correct answer after submit */}
                {isSubmitted && feedback['answer'] === 'incorrect' && typeof question.answer === 'string' && (
                  <p className="text-sm text-green-600 font-medium">
                    Correct: {question.answer}
                  </p>
                )}
              </div>
            ) : question.type === 'lcm-ladder' && question.lcmNumbers ? (
              /* LCM Ladder */
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Find LCM using the ladder method</span>
                  <span className="text-xs text-muted-foreground">[{question.marks} marks]</span>
                </label>
                <LCMLadder
                  value={answers['answer'] || ''}
                  onChange={(val) => handleAnswerChange('answer', val)}
                  disabled={isSubmitted}
                  number1={question.lcmNumbers[0]}
                  number2={question.lcmNumbers[1]}
                  isCorrect={feedback['answer'] === 'correct'}
                  isIncorrect={feedback['answer'] === 'incorrect'}
                  correctAnswer={typeof question.answer === 'string' ? question.answer : undefined}
                  onCheckFinalAnswer={(ans) => {
                    setAnswers(prev => ({ ...prev, answer: ans }));
                    handleCheckWorkForPart('answer', 'LCM', ans);
                  }}
                  isCheckingFinal={loadingPartKey === 'answer' && loadingType === 'check'}
                />
                {/* Show AI response for LCM */}
                {aiResponse?.partKey === 'answer' && (
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
                {/* Show correct answer after submit */}
                {isSubmitted && feedback['answer'] === 'incorrect' && typeof question.answer === 'string' && (
                  <p className="text-sm text-green-600 font-medium">
                    Correct: {question.answer}
                  </p>
                )}
              </div>
            ) : question.id === 'pp_4024_on23_11_q16' ? (
              /* Q16 has no extra answer field — region builder above handles all input */
              null
            ) : (
              /* Short/single answer questions - also use StepWorkspace for consistency */
              <StepWorkspace
                steps={[{ key: 'answer', label: 'Answer', marks: question.marks }]}
                answers={answers}
                feedback={feedback}
                onAnswerChange={handleAnswerChange}
                onCheckWork={handleCheckWorkForPart}
                isLoading={isLoading}
                loadingStepKey={loadingPartKey}
                isSubmitted={isSubmitted}
                correctAnswers={typeof question.answer === 'string' ? { answer: question.answer } : question.answer}
                aiResponse={aiResponse}
                feedbackAction={feedbackAction}
                keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
                />
            )}
          </div>

          {/* AI Response (Hint or Guidance) - only show global responses (no partKey) */}
          {aiResponse && !aiResponse.partKey && (
            <div
              data-tour={aiResponse.type === 'hint' ? 'hint-feedback' : undefined}
              className={cn(
                "rounded-lg border p-4 shadow-sm",
                aiResponse.type === 'hint'
                  ? "border-warning/50 bg-warning/20 text-foreground"
                  : "border-primary/50 bg-primary/10 text-foreground"
              )}
            >

              <div className="flex items-start gap-3">
                {aiResponse.type === 'hint' ? (
                  <Lightbulb className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                ) : (
                  <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <p className={cn(
                    "font-medium mb-2",
                    aiResponse.type === 'hint' ? "text-warning" : "text-primary"
                  )}>
                    {aiResponse.type === 'hint' ? 'Concept Hint' : 'Teacher Guidance'}
                  </p>
                  {editMode && onEditField && aiResponse.type === 'hint' ? (
                    <InlineEditableText
                      value={aiResponse.content}
                      onCommit={(v) => {
                        const hints = question.hints || [];
                        const joined = hints.join('\n');
                        if (aiResponse.content === joined) {
                          // Multi-part display: split lines back into hints
                          const lines = v.split('\n');
                          const max = Math.max(lines.length, hints.length);
                          for (let i = 0; i < max; i++) {
                            const next = lines[i] ?? '';
                            const prev = hints[i] ?? '';
                            if (next !== prev) onEditField(`hint:${i}` as const, next);
                          }
                        } else {
                          // Single hint display: find which index is currently shown
                          const idx = hints.findIndex(h => h === aiResponse.content);
                          const targetIdx = idx >= 0 ? idx : 0;
                          onEditField(`hint:${targetIdx}` as const, v);
                        }
                        setAiResponse({ type: 'hint', content: v });
                      }}
                      multiline
                      className="text-sm leading-relaxed text-foreground bg-background/30 whitespace-pre-line"
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-line leading-relaxed text-foreground">{aiResponse.content}</p>
                  )}

                  {feedbackAction && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        data-tour={feedbackAction.tourData}
                        onClick={feedbackAction.onClick}
                      >
                        {feedbackAction.label}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Post-submission summary */}
          {isSubmitted && (
            <div className={cn(
              "rounded-lg border p-4 space-y-3",
              allCorrect ? "border-green-500/50 bg-green-500/10" : "border-primary/30 bg-primary/5"
            )}
            data-tour="submit-feedback">
              <div className="flex items-center gap-3">
                {allCorrect ? <Award className="h-6 w-6 text-green-500" /> : <Clock className="h-6 w-6 text-primary" />}
                <div className="flex-1">
                  <p className={cn("font-medium", allCorrect ? "text-green-600" : "text-foreground")}>
                    {allCorrect ? 'Excellent work!' : 'Answer Submitted'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time taken: <span className="font-mono font-semibold text-foreground">{formatTime(finalTime ?? 0)}</span>
                    {allCorrect && ' • All correct!'}
                  </p>
                </div>
              </div>
              {/* Per-part marks breakdown */}
              {question.parts && question.parts.filter(p => p.marks > 0).length > 0 && (
                <div className="border-t pt-2 space-y-1">
                  {(() => {
                    // Detect ordering questions: helper parts (marks=0) + single scored part
                    const questionCriteria = question.markingCriteria?.['_question'] || '';
                    const isOrderingQ = questionCriteria.includes('correct in order') || questionCriteria.includes('correct order');
                    const helperParts = question.parts!.filter(p => p.marks === 0);
                    const scoredParts = question.parts!.filter(p => p.marks > 0);
                    
                    if (isOrderingQ && helperParts.length >= 2 && scoredParts.length === 1) {
                      // Show as single "Ordering" row with composite marks
                      const sp = scoredParts[0];
                      const earned = storedMarksEarned[sp.key] ?? 0;
                      const isPartCorrect = earned === sp.marks;
                      const isPartial = earned > 0 && earned < sp.marks;
                      const allParts = [...helperParts, sp];
                      const orderKeys = allParts.map(p => p.key);
                      const answerVals = typeof question.answer === 'object'
                        ? orderKeys.map(k => question.answer[k] || '')
                        : [];
                      const userVals = orderKeys.map(k => answers[k] || '');
                      const partialReason = getOrderingPartialReason(userVals, answerVals);
                      
                      // Build detail: show which positions were correct/incorrect
                      return (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1.5">
                              {isPartCorrect ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : 
                               isPartial ? <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> :
                               <XCircle className="h-3.5 w-3.5 text-destructive" />}
                              Ordering
                            </span>
                            <span className={cn(
                              "font-mono font-semibold text-xs",
                              isPartCorrect ? "text-green-600" : isPartial ? "text-amber-600" : "text-destructive"
                            )}>
                              {earned}/{sp.marks}
                            </span>
                          </div>
                          {!isPartCorrect && (
                            <div className="ml-6 space-y-0.5">
                              {allParts.map(p => {
                                const correct = feedback[p.key] === 'correct';
                                const correctVal = typeof question.answer === 'object' ? question.answer[p.key] : '';
                                return (
                                  <div key={p.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    {correct ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <XCircle className="h-3 w-3 text-destructive" />}
                                    <span><VecText value={p.label} />: {answers[p.key] || '—'}</span>
                                    {!correct && correctVal && <span className="text-green-600 ml-1">(correct: {correctVal})</span>}
                                  </div>
                                );
                              })}
                              {isPartial && partialReason === 'three-correct' && (
                                <p className="text-xs text-amber-600 mt-1">B1 awarded because 3 values are in the correct order, matching the specimen rule.</p>
                              )}
                              {isPartial && partialReason === 'reversed' && (
                                <p className="text-xs text-amber-600 mt-1">B1 awarded because the full order is correct but reversed.</p>
                              )}
                            </div>
                          )}
                        </>
                      );
                    }
                    
                    // Standard per-part display
                    return scoredParts.map(part => {
                      const earned = storedMarksEarned[part.key] ?? 0;
                      const isPartCorrect = earned === part.marks;
                      const isPartial = earned > 0 && earned < part.marks;
                      return (
                        <div key={part.key} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1.5">
                              {isPartCorrect ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : 
                               isPartial ? <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> :
                               <XCircle className="h-3.5 w-3.5 text-destructive" />}
                              <VecText value={part.label} />
                            </span>
                            <span className={cn(
                              "font-mono font-semibold text-xs",
                              isPartCorrect ? "text-green-600" : isPartial ? "text-amber-600" : "text-destructive"
                            )}>
                              {earned}/{part.marks}
                            </span>
                          </div>
                          {storedMarkingNotes[part.key] && (
                            <p className="ml-5 text-xs text-muted-foreground">
                              <VecText value={storedMarkingNotes[part.key]} />
                            </p>
                          )}
                        </div>
                      );
                    });
                  })()}
                  <div className="flex items-center justify-between text-sm font-semibold border-t pt-1">
                    <span>Total</span>
                    <span className="font-mono">
                      {question.parts.filter(p => p.marks > 0).reduce((sum, part) => sum + (storedMarksEarned[part.key] ?? 0), 0)}/{question.parts.filter(p => p.marks > 0).reduce((s, p) => s + p.marks, 0)}
                    </span>
                  </div>
                </div>
              )}
              {/* Q16 custom marks breakdown (no parts array) */}
              {!question.parts && question.id === 'pp_4024_on23_11_q16' && (
                <div className="border-t pt-2 space-y-1">
                  {(() => {
                    const earned = storedMarksEarned['answer'] ?? 0;
                    const total = question.marks;
                    const isCorrect = earned === total;
                    const isPartial = earned > 0 && earned < total;
                    return (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5">
                            {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> :
                             isPartial ? <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> :
                             <XCircle className="h-3.5 w-3.5 text-destructive" />}
                            Region R
                          </span>
                          <span className={cn(
                            "font-mono font-semibold text-xs",
                            isCorrect ? "text-green-600" : isPartial ? "text-amber-600" : "text-destructive"
                          )}>
                            {earned}/{total}
                          </span>
                        </div>
                        {storedMarkingNotes['answer'] && (
                          <p className="ml-5 text-xs text-muted-foreground">
                            <VecText value={storedMarkingNotes['answer']} />
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm font-semibold border-t pt-1">
                          <span>Total</span>
                          <span className="font-mono">{earned}/{total}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className={cn("grid gap-3", isSubmitted && workspaceMode === 'general' ? "grid-cols-3" : "grid-cols-2")}>
            <Button
              variant="outline"
              data-tour="hint-btn"
              onClick={handleHint}
              disabled={isLoading || isSubmitted || (paperQuota !== null && paperQuota.hints <= 0)}
              className="flex items-center gap-2"
            >
              {loadingType === 'hint' && !loadingPartKey ? (
                <span className="animate-pulse">...</span>
              ) : (
                <HelpCircle className="h-4 w-4" />
              )}
              Hint{paperQuota !== null ? ` (${paperQuota.hints})` : ''}
            </Button>
            <Button
              onClick={handleSubmit}
              data-tour="submit-btn"
              disabled={isSubmitted}
              className={cn("flex items-center gap-2", isSubmitted && "bg-green-600 hover:bg-green-600 text-white")}
            >

              {isSubmitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Recorded
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit
                </>
              )}
            </Button>
            {isSubmitted && workspaceMode === 'general' && (
              <Button
                variant="outline"
                onClick={handleResetQuestion}
                className="flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </>)}
        </>
        </div>
      </DialogContent>
    </Dialog>
  );
}
