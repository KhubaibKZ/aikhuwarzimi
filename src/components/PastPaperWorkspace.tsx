import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PastPaperQuestion, pastPapers } from '@/lib/pastPaperData';
import { getQuestionSyllabusRef } from '@/lib/questionTopicMap';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, XCircle, Lightbulb, Award, RotateCcw, Send, BookOpen, HelpCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useStudentAssignments } from '@/hooks/useStudentAssignments';
import { PrimeFactorLadder } from '@/components/PrimeFactorLadder';
import { QuestionText } from '@/components/QuestionText';
import { LCMLadder } from '@/components/LCMLadder';
import { TriangleDiagram } from '@/components/TriangleDiagram';
import { StepWorkspace, FractionDivisionWorkspace, EquationSolveWorkspace } from '@/components/workspace';
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

interface PastPaperWorkspaceProps {
  question: PastPaperQuestion;
  isOpen: boolean;
  onClose: () => void;
  workspaceMode?: 'general' | 'student';
}

export function PastPaperWorkspace({ question, isOpen, onClose, workspaceMode = 'general' }: PastPaperWorkspaceProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [storedMarksEarned, setStoredMarksEarned] = useState<Record<string, number>>({});
  const [storedMarkingNotes, setStoredMarkingNotes] = useState<Record<string, string>>({});
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
    if (!isOpen || !user) return;
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
      }
    };
    checkExistingSubmission();
  }, [isOpen, user, question.id, workspaceMode]);

  const handleAnswerChange = (key: string, value: string) => {
    if (isSubmitted) return; // Don't allow changes once submitted
    setAnswers(prev => ({ ...prev, [key]: value }));
    setFeedback(prev => ({ ...prev, [key]: null }));
    setIsChecked(false);
    // Clear AI response only if it's for this part
    if (aiResponse?.partKey === key) {
      setAiResponse(null);
    }
  };

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[²³]/g, (match) => match === '²' ? '^2' : '^3')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .trim();
  };

  const isNumericallyEqual = (a: string, b: string): boolean => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return Math.abs(numA - numB) < 1e-9;
    }
    return false;
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
    if (uFrac !== null && !isNaN(parseFloat(c)) && Math.abs(uFrac - parseFloat(c)) < 1e-9) return true;
    if (cFrac !== null && !isNaN(parseFloat(u)) && Math.abs(parseFloat(u) - cFrac) < 1e-9) return true;
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
    
    const newFeedback: Record<string, 'correct' | 'incorrect' | null> = {};
    const marksEarned: Record<string, number> = {};
    const markingNotes: Record<string, string> = {};
    let allCorrect = true;
    const eqParts = (question as any).equationSolveParts as string[] | undefined;
    const fractionParts = (question as any).fractionDivisionParts as string[] | undefined;

    if (question.parts) {
      question.parts.forEach(part => {
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

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: question.question,
          actionType: 'hint',
          topic: question.title,
          hints: question.hints,
          attemptCount,
          markingCriteria: question.markingCriteria
        }
      });

      if (error) throw error;
      setAiResponse({ type: 'hint', content: data.hint });
    } catch (error) {
      console.error('Hint error:', error);
      if (question.hints.length > 0) {
        const totalAttempts = Object.values(attemptCount).reduce((sum, count) => sum + count, 0);
        const hintIndex = Math.min(totalAttempts, question.hints.length - 1);
        setAiResponse({ type: 'hint', content: question.hints[hintIndex] });
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
    // Detect structured step keys (e.g. c_s1, c_s2, answer_s1) — collect all sub-field answers
    const isStructuredStep = /^[a-z]+_s\d+$/.test(partKey);
    
    if (isStructuredStep && typeof question.answer === 'object') {
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
          if (els[i].type === 'box' && els[i+1].type === 'text' && els[i+1].value === '×' && els[i+2].type === 'box') {
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
      aiUsageRef.current += 1;
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
            markingCriteria: question.markingCriteria
          }
        });
        if (error) throw error;
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

      // Reference: full correct answer map for this question (gives AI the target form
      // and any predefined-stage answers like "3x", "x", "1", "2", etc.)
      const referenceAnswers = typeof question.answer === 'object' ? question.answer : { answer: question.answer };

      setAttemptCount(prev => ({ ...prev, [partKey]: (prev[partKey] || 0) + 1 }));
      setIsLoading(true);
      setLoadingType('check');
      setLoadingPartKey(partKey);
      aiUsageRef.current += 1;
      if (user && matchedPaper && paperQuota) {
        await supabase.rpc('decrement_checkwork', { p_student_id: user.id, p_paper_id: matchedPaper.id });
        refetchAssignments();
      }
      try {
        const { data, error } = await supabase.functions.invoke('ai-tutor', {
          body: {
            question: question.question,
            actionType: 'checkWork',
            userAnswers: {
              [`student_step_${idx + 1}`]: studentExpression,
              ...previousSteps,
            },
            correctAnswers: referenceAnswers,
            topic: question.title,
            hints: question.hints,
            attemptCount: (attemptCount[partKey] || 0) + 1,
            hasMissing: false,
            hasWrong: true,
            specificPart: `Student's own working line ${idx + 1}: "${studentExpression}". Analyse the ALGEBRA in this expression against the original question. Identify the EXACT mathematical error (e.g. forgot to multiply RHS by the common denominator, sign error, expansion mistake). Do not give generic guidance about "common denominator" unless that IS the specific error you can verify.`,
            workingContent: '',
            markingCriteria: question.markingCriteria,
          },
        });
        if (error) throw error;
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
    aiUsageRef.current += 1;
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
          markingCriteria: question.markingCriteria
        }
      });

      if (error) throw error;
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
    if (question.parts) {
      const eqParts = (question as any).equationSolveParts as string[] | undefined;
      return question.parts
        .filter(part => part.marks > 0)
        .every(part => {
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
  };

  // Reset individual question (dashboard/general mode only)
  const handleResetQuestion = async () => {
    if (!user || workspaceMode !== 'general') return;
    try {
      await supabase
        .from('student_paper_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('question_id', question.id)
        .eq('workspace_mode', 'general');
      resetWorkspace();
      queryClient.invalidateQueries({ queryKey: ['student-progress'] });
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
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{question.questionNumber}</DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isSubmitted ? "secondary" : "outline"} className={cn("flex items-center gap-1 font-mono", !isSubmitted && "animate-pulse")}>
                <Clock className="h-3 w-3" />
                {formatTime(isSubmitted && finalTime !== null ? finalTime : elapsedSeconds)}
              </Badge>
              <Badge variant="outline">
                {question.marks} mark{question.marks > 1 ? 's' : ''}
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
            </div>
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{question.title}</p>
          {(() => {
            const syllabusRef = getQuestionSyllabusRef(question.id);
            return syllabusRef ? (
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="secondary" className="text-xs font-normal">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {syllabusRef.subtopicCode} {syllabusRef.subtopicTitle}
                </Badge>
                <span className="text-xs text-muted-foreground">• {syllabusRef.topicTitle}</span>
              </div>
            ) : null;
          })()}
        </DialogHeader>

        <div className="space-y-6">
          {/* Question */}
          <div className="rounded-lg bg-muted/50 p-4">
            <QuestionText text={question.question} />
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
                <ScaleDrawing2023ON />
              </div>
            )}
            
            {/* Q15 - Circle theorems with tangents */}
            {question.id === 'pp_4024_on23_11_q15' && (
              <div className="mt-4">
                <CircleTheorem2023ON />
              </div>
            )}
            
            {/* Q16 - Inequalities coordinate grid */}
            {question.id === 'pp_4024_on23_11_q16' && (
              <div className="mt-4">
                <CoordinateGrid
                  width={320}
                  height={320}
                  xRange={[-1, 5]}
                  yRange={[-1, 5]}
                  interactive={true}
                />
              </div>
            )}
            
            {/* Q18 - 3-set Venn diagram */}
            {question.id === 'pp_4024_on23_11_q18' && (
              <div className="mt-4">
                <VennDiagram3Set2023ON />
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
            {question.id === 'pp_4024_on23_12_q7' && (<div className="mt-4"><TransformGrid_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q14' && (<div className="mt-4"><TriangleConstruct_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q17' && (<div className="mt-4"><CumulativeFrequency_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q18' && (<div className="mt-4"><SpeedTime_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q21' && (<div className="mt-4"><TwoSectors_4024_12_2023ON /></div>)}
            {question.id === 'pp_4024_on23_12_q23' && (<div className="mt-4"><VennHSG_4024_12_2023ON /></div>)}
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
                keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
              />
            ) : question.type === 'multi-part' && question.parts ? (
              /* Multi-part questions - use StepWorkspace + optional fraction division */
              <div className="space-y-4">
                <StepWorkspace
                  steps={question.parts.filter(p => !(question as any).fractionDivisionParts?.includes(p.key) && !(question as any).equationSolveParts?.includes(p.key) && !((question as any).primeFactorParts || {})[p.key]).map(p => ({
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
                  keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
                />
                {(question as any).fractionDivisionParts?.map((partKey: string) => {
                  const part = question.parts?.find(p => p.key === partKey);
                  return part ? (
                    <div key={partKey} className="space-y-2">
                      <label className="flex items-center justify-between text-sm">
                        <span className="font-medium">{part.label}</span>
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
                {(question as any).equationSolveParts?.map((partKey: string) => {
                  const part = question.parts?.find(p => p.key === partKey);
                  const stagesMap = (question as any).equationStagesMap;
                  const stages = stagesMap?.[partKey] || (question as any).equationStages;
                  return part && stages ? (
                    <div key={partKey} className="space-y-2">
                      <label className="flex items-center justify-between text-sm">
                        <span className="font-medium">{part.label}</span>
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
                        allowCustomSteps={(question as any).allowCustomSteps}
                      />
                    </div>
                  ) : null;
                })}
              </div>
            ) : question.parts ? (
              /* Generic parts - use StepWorkspace for consistency */
              <StepWorkspace
                steps={question.parts.filter(p => !(question.diagramParts || []).includes(p.key)).map(p => ({ ...p }))}
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
                keyboardKeys={getKeyboardConfig(question.id, question.type, question.title)}
                />
            )}
          </div>

          {/* AI Response (Hint or Guidance) - only show global responses (no partKey) */}
          {aiResponse && !aiResponse.partKey && (
            <div className={cn(
              "rounded-lg border p-4",
              aiResponse.type === 'hint' 
                ? "border-amber-500/30 bg-amber-500/10" 
                : "border-blue-500/30 bg-blue-500/10"
            )}>
              <div className="flex items-start gap-3">
                {aiResponse.type === 'hint' ? (
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                ) : (
                  <BookOpen className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <p className={cn(
                    "font-medium mb-2",
                    aiResponse.type === 'hint' ? "text-amber-600" : "text-blue-600"
                  )}>
                    {aiResponse.type === 'hint' ? 'Concept Hint' : 'Teacher Guidance'}
                  </p>
                  <p className="text-sm whitespace-pre-line">{aiResponse.content}</p>
                </div>
              </div>
            </div>
          )}

          {/* Post-submission summary */}
          {isSubmitted && (
            <div className={cn(
              "rounded-lg border p-4 space-y-3",
              allCorrect ? "border-green-500/50 bg-green-500/10" : "border-primary/30 bg-primary/5"
            )}>
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
                                    <span>{p.label}: {answers[p.key] || '—'}</span>
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
                              {part.label}
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
                              {storedMarkingNotes[part.key]}
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
            </div>
          )}

          {/* Action Buttons */}
          <div className={cn("grid gap-3", isSubmitted && workspaceMode === 'general' ? "grid-cols-3" : "grid-cols-2")}>
            <Button
              variant="outline"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
