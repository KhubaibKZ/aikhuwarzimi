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
  BearingDiagram
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

  // Find paper for this question to get quota
  const matchedPaper = pastPapers.find(p => p.sections.some(s => s.questionId === question.id));
  const paperQuota = matchedPaper ? getPaperQuota(matchedPaper.id) : null;

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
        if (data.submitted_answers && typeof data.submitted_answers === 'object') {
          setAnswers(data.submitted_answers as Record<string, string>);
        }
        if (data.submitted_feedback && typeof data.submitted_feedback === 'object') {
          setFeedback(data.submitted_feedback as Record<string, 'correct' | 'incorrect' | null>);
        }
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
    // Try direct float comparison
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

  const checkAnswersInternal = () => {
    if (!question.answer) return { allCorrect: false, newFeedback: {}, marksEarned: {} };
    
    const newFeedback: Record<string, 'correct' | 'incorrect' | null> = {};
    const marksEarned: Record<string, number> = {};
    let allCorrect = true;
    const eqParts = (question as any).equationSolveParts as string[] | undefined;
    const stagesMap = (question as any).equationStagesMap;
    const eqStages = (question as any).equationStages;

    if (question.parts) {
      question.parts.forEach(part => {
        // For equation-solve parts, check all box keys
        if (eqParts?.includes(part.key)) {
          const stages = stagesMap?.[part.key] || eqStages;
          if (stages && stages.length > 0) {
            // Collect all box keys from stages
            const allBoxKeys: string[] = [];
            stages.forEach((stage: any) => {
              stage.elements.forEach((el: any) => {
                if (el.type === 'box' && el.key) {
                  allBoxKeys.push(`${part.key}_${el.key}`);
                }
              });
            });

            // Check each box and set per-box feedback
            let correctBoxes = 0;
            let totalBoxes = allBoxKeys.length;
            allBoxKeys.forEach(boxKey => {
              const userVal = answers[boxKey] || '';
              const correctVal = typeof question.answer === 'object' ? question.answer[boxKey] || '' : '';
              if (correctVal && answersMatch(userVal, correctVal)) {
                newFeedback[boxKey] = 'correct';
                correctBoxes++;
              } else if (userVal) {
                newFeedback[boxKey] = 'incorrect';
              } else {
                newFeedback[boxKey] = null;
              }
            });

            // Determine part-level feedback from the LAST box (final answer)
            const lastBoxKey = allBoxKeys[allBoxKeys.length - 1];
            const lastCorrect = newFeedback[lastBoxKey] === 'correct';
            
            // Calculate partial marks based on marking criteria
            const totalMarks = part.marks;
            if (correctBoxes === totalBoxes) {
              // All boxes correct — full marks
              marksEarned[part.key] = totalMarks;
              newFeedback[part.key] = 'correct';
            } else if (lastCorrect) {
              // Final answer correct — full marks (method implied)
              marksEarned[part.key] = totalMarks;
              newFeedback[part.key] = 'correct';
            } else if (correctBoxes > 0 && totalMarks > 1) {
              // Partial credit: some intermediate steps correct
              // M1 for method (intermediate boxes) + A1 for final answer
              // If method boxes are correct but final answer wrong → earn method marks
              const methodBoxes = allBoxKeys.slice(0, -1);
              const methodCorrect = methodBoxes.every(k => newFeedback[k] === 'correct');
              if (methodCorrect && methodBoxes.length > 0) {
                marksEarned[part.key] = totalMarks - 1; // M marks without A mark
              } else {
                // Some steps correct — give 1 mark for partial working
                marksEarned[part.key] = Math.min(totalMarks - 1, Math.max(1, Math.floor(correctBoxes / totalBoxes * totalMarks)));
              }
              newFeedback[part.key] = 'incorrect';
              allCorrect = false;
            } else {
              marksEarned[part.key] = 0;
              newFeedback[part.key] = 'incorrect';
              allCorrect = false;
            }
            return;
          }
        }

        // Skip helper parts (marks = 0) — they'll be evaluated as part of composite scoring below
        if (part.marks === 0) {
          const userAnswer = answers[part.key] || '';
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
        const userAnswer = answers[part.key] || '';
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
            
            // Check for reversed order
            let isReversed = false;
            if (typeof question.answer === 'object') {
              const answerVals = orderKeys.map(k => question.answer[k] || '');
              const userVals = orderKeys.map(k => answers[k] || '');
              const reversedCorrect = answerVals.slice().reverse();
              isReversed = reversedCorrect.every((v, i) => answersMatch(userVals[i], v));
            }
            
            if (correctCount === totalParts) {
              marksEarned[scoredPart.key] = totalMarks;
              newFeedback[scoredPart.key] = 'correct';
            } else if (isReversed) {
              // Correct order but reversed — B1
              marksEarned[scoredPart.key] = 1;
              newFeedback[scoredPart.key] = 'incorrect';
              allCorrect = false;
            } else if (correctCount >= totalParts - 1 && totalMarks >= 2) {
              // Three correct when one is covered up — B1
              marksEarned[scoredPart.key] = 1;
              newFeedback[scoredPart.key] = 'incorrect';
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
      const userAnswer = answers['answer'] || '';
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

    return { allCorrect, newFeedback, marksEarned };
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

    const { allCorrect, newFeedback, marksEarned } = checkAnswersInternal();
    setFeedback(newFeedback);
    setStoredMarksEarned(marksEarned);
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
            <p className="whitespace-pre-line text-foreground">{question.question}</p>
            
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
                  steps={question.parts.filter(p => !(question as any).fractionDivisionParts?.includes(p.key) && !(question as any).equationSolveParts?.includes(p.key)).map(p => ({
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
                      
                      // Build detail: show which positions were correct/incorrect
                      const allParts = [...helperParts, sp];
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
                              {isPartial && <p className="text-xs text-amber-600 mt-1">B1 awarded for partial correct ordering</p>}
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
                        <div key={part.key} className="flex items-center justify-between text-sm">
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
