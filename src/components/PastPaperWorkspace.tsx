import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PastPaperQuestion } from '@/lib/pastPaperData';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, XCircle, Lightbulb, Award, RotateCcw, Send, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PrimeFactorLadder } from '@/components/PrimeFactorLadder';
import { LCMLadder } from '@/components/LCMLadder';

interface PastPaperWorkspaceProps {
  question: PastPaperQuestion;
  isOpen: boolean;
  onClose: () => void;
}

export function PastPaperWorkspace({ question, isOpen, onClose }: PastPaperWorkspaceProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'hint' | 'check' | null>(null);
  const [loadingPartKey, setLoadingPartKey] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<{ type: 'hint' | 'guidance'; content: string; partKey?: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState<Record<string, number>>({});
  const { markExampleComplete } = useProgress();
  const { toast } = useToast();

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setFeedback(prev => ({ ...prev, [key]: null }));
    setIsChecked(false);
    setIsSubmitted(false);
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

  const checkAnswersInternal = () => {
    if (!question.answer) return { allCorrect: false, newFeedback: {} };
    
    const newFeedback: Record<string, 'correct' | 'incorrect' | null> = {};
    let allCorrect = true;

    if (question.parts) {
      question.parts.forEach(part => {
        const userAnswer = normalizeAnswer(answers[part.key] || '');
        const correctAnswer = normalizeAnswer(
          typeof question.answer === 'object' ? question.answer[part.key] || '' : ''
        );
        
        if (userAnswer === correctAnswer || 
            (userAnswer && correctAnswer && userAnswer.includes(correctAnswer)) ||
            (userAnswer && correctAnswer && correctAnswer.includes(userAnswer))) {
          newFeedback[part.key] = 'correct';
        } else if (userAnswer) {
          newFeedback[part.key] = 'incorrect';
          allCorrect = false;
        } else {
          newFeedback[part.key] = null;
          allCorrect = false;
        }
      });
    } else {
      const userAnswer = normalizeAnswer(answers['answer'] || '');
      const correctAnswer = normalizeAnswer(
        typeof question.answer === 'string' ? question.answer : ''
      );
      
      if (userAnswer === correctAnswer) {
        newFeedback['answer'] = 'correct';
      } else if (userAnswer) {
        newFeedback['answer'] = 'incorrect';
        allCorrect = false;
      }
    }

    return { allCorrect, newFeedback };
  };

  // Hint: Show concept related to the question
  const handleHint = async () => {
    setIsLoading(true);
    setLoadingType('hint');
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: question.question,
          actionType: 'hint',
          topic: question.title,
          hints: question.hints,
          attemptCount
        }
      });

      if (error) throw error;
      setAiResponse({ type: 'hint', content: data.hint });
    } catch (error) {
      console.error('Hint error:', error);
      // Fallback to static hints
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
  const handleCheckWorkForPart = async (partKey: string, partLabel: string) => {
    const userAnswer = normalizeAnswer(answers[partKey] || '');
    const correctAnswer = normalizeAnswer(
      typeof question.answer === 'object' ? question.answer[partKey] || '' : 
      typeof question.answer === 'string' ? question.answer : ''
    );
    
    const isCorrect = userAnswer === correctAnswer || 
      (userAnswer && correctAnswer && userAnswer.includes(correctAnswer)) ||
      (userAnswer && correctAnswer && correctAnswer.includes(userAnswer));
    
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
          specificPart: partLabel
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

  // Check if all parts have answers
  const areAllPartsCompleted = (): boolean => {
    if (question.parts) {
      return question.parts.every(part => answers[part.key]?.trim());
    }
    return !!answers['answer']?.trim();
  };

  // Submit: Final submission with answer reveal
  const handleSubmit = () => {
    // Check if all parts are completed first
    if (!areAllPartsCompleted()) {
      toast({
        title: "Incomplete Work",
        description: "Please complete all parts of the question before submitting.",
        variant: "destructive"
      });
      return;
    }

    const { allCorrect, newFeedback } = checkAnswersInternal();
    setFeedback(newFeedback);
    setIsChecked(true);
    setIsSubmitted(true);

    // Always record progress when submitted (all parts completed)
    markExampleComplete(question.id);

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
    setIsChecked(false);
    setIsSubmitted(false);
    setAiResponse(null);
    setAttemptCount({});
    setLoadingPartKey(null);
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
            <Badge variant="outline" className="ml-2">
              {question.marks} mark{question.marks > 1 ? 's' : ''}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{question.title}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="whitespace-pre-line text-foreground">{question.question}</p>
            {question.image && (
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
            {question.parts ? (
              question.parts.map((part) => (
                <div key={part.key} className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium">
                    <span>{part.label}</span>
                    <span className="text-xs text-muted-foreground">[{part.marks} mark{part.marks > 1 ? 's' : ''}]</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      {question.type === 'proof' || part.key === 'working' || part.key === 'steps' ? (
                        <Textarea
                          value={answers[part.key] || ''}
                          onChange={(e) => handleAnswerChange(part.key, e.target.value)}
                          placeholder="Show your working..."
                          disabled={isSubmitted}
                          className={cn(
                            "min-h-[80px] transition-colors",
                            feedback[part.key] === 'correct' && "border-green-500 bg-green-500/5",
                            feedback[part.key] === 'incorrect' && "border-destructive bg-destructive/5"
                          )}
                        />
                      ) : (
                        <Input
                          value={answers[part.key] || ''}
                          onChange={(e) => handleAnswerChange(part.key, e.target.value)}
                          placeholder="Enter your answer..."
                          disabled={isSubmitted}
                          className={cn(
                            "transition-colors pr-10",
                            feedback[part.key] === 'correct' && "border-green-500 bg-green-500/5",
                            feedback[part.key] === 'incorrect' && "border-destructive bg-destructive/5"
                          )}
                        />
                      )}
                      {feedback[part.key] === 'correct' && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                      {feedback[part.key] === 'incorrect' && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCheckWorkForPart(part.key, part.label)}
                      disabled={isLoading || isSubmitted}
                      className="shrink-0"
                    >
                      {loadingPartKey === part.key ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {/* Show AI response for this specific part */}
                  {aiResponse?.partKey === part.key && (
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
                  {/* Show correct answer after submit for incorrect parts */}
                  {isSubmitted && feedback[part.key] === 'incorrect' && typeof question.answer === 'object' && (
                    <p className="text-sm text-green-600 font-medium">
                      Correct: {question.answer[part.key]}
                    </p>
                  )}
                </div>
              ))
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
                <div className="flex gap-2 items-start">
                  <div className="flex-1">
                    <LCMLadder
                      value={answers['answer'] || ''}
                      onChange={(val) => handleAnswerChange('answer', val)}
                      disabled={isSubmitted}
                      number1={question.lcmNumbers[0]}
                      number2={question.lcmNumbers[1]}
                      isCorrect={feedback['answer'] === 'correct'}
                      isIncorrect={feedback['answer'] === 'incorrect'}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckWorkForPart('answer', 'LCM')}
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={answers['answer'] || ''}
                      onChange={(e) => handleAnswerChange('answer', e.target.value)}
                      placeholder="Enter your answer..."
                      disabled={isSubmitted}
                      className={cn(
                        "transition-colors pr-10",
                        feedback['answer'] === 'correct' && "border-green-500 bg-green-500/5",
                        feedback['answer'] === 'incorrect' && "border-destructive bg-destructive/5"
                      )}
                    />
                    {feedback['answer'] === 'correct' && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                    {feedback['answer'] === 'incorrect' && (
                      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckWorkForPart('answer', 'Answer')}
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
                {/* Show AI response for single answer */}
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

          {/* Success Message */}
          {allCorrect && isSubmitted && (
            <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 flex items-center gap-3">
              <Award className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-green-600">Excellent work!</p>
                <p className="text-sm text-muted-foreground">You've completed this question correctly.</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleHint}
              disabled={isLoading || isSubmitted}
              className="flex items-center gap-2"
            >
              {loadingType === 'hint' && !loadingPartKey ? (
                <span className="animate-pulse">...</span>
              ) : (
                <HelpCircle className="h-4 w-4" />
              )}
              Hint
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Submit
            </Button>
          </div>

          {/* Reset Button */}
          <Button variant="ghost" onClick={resetWorkspace} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset & Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
