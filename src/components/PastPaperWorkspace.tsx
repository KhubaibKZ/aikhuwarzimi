import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PastPaperQuestion } from '@/lib/pastPaperData';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, XCircle, Lightbulb, Award, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PastPaperWorkspaceProps {
  question: PastPaperQuestion;
  isOpen: boolean;
  onClose: () => void;
}

export function PastPaperWorkspace({ question, isOpen, onClose }: PastPaperWorkspaceProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const { markExampleComplete, isCompleted: checkCompleted } = useProgress();
  const { toast } = useToast();

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setFeedback(prev => ({ ...prev, [key]: null }));
    setIsChecked(false);
    setAiHint(null);
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

  const checkAnswers = () => {
    if (!question.answer) return;
    
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

    setFeedback(newFeedback);
    setIsChecked(true);
    setAttemptCount(prev => prev + 1);

    if (allCorrect && Object.keys(newFeedback).length > 0) {
      markExampleComplete(question.id);
      toast({
        title: "Excellent! 🎉",
        description: "You got it right!",
      });
    }
  };

  const getAIHint = async () => {
    setIsLoading(true);
    try {
      const hasWrong = Object.values(feedback).some(f => f === 'incorrect');
      const hasMissing = question.parts 
        ? question.parts.some(p => !answers[p.key] || answers[p.key].trim() === '')
        : !answers['answer'] || answers['answer'].trim() === '';

      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: question.question,
          userAnswers: answers,
          correctAnswers: question.answer,
          hints: question.hints,
          attemptCount,
          hasMissing,
          hasWrong
        }
      });

      if (error) throw error;
      setAiHint(data.hint);
    } catch (error) {
      console.error('AI hint error:', error);
      // Fallback hint
      if (currentHintIndex < question.hints.length) {
        setAiHint(question.hints[currentHintIndex]);
        setCurrentHintIndex(prev => Math.min(prev + 1, question.hints.length - 1));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetWorkspace = () => {
    setAnswers({});
    setFeedback({});
    setIsChecked(false);
    setAiHint(null);
    setShowHint(false);
    setCurrentHintIndex(0);
    setAttemptCount(0);
  };

  const allCorrect = Object.values(feedback).length > 0 && 
    Object.values(feedback).every(f => f === 'correct');

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
                  <div className="relative">
                    {question.type === 'proof' || part.key === 'working' || part.key === 'steps' ? (
                      <Textarea
                        value={answers[part.key] || ''}
                        onChange={(e) => handleAnswerChange(part.key, e.target.value)}
                        placeholder="Show your working..."
                        className={cn(
                          "min-h-[80px] transition-colors",
                          feedback[part.key] === 'correct' && "border-success bg-success/5",
                          feedback[part.key] === 'incorrect' && "border-destructive bg-destructive/5"
                        )}
                      />
                    ) : (
                      <Input
                        value={answers[part.key] || ''}
                        onChange={(e) => handleAnswerChange(part.key, e.target.value)}
                        placeholder="Enter your answer..."
                        className={cn(
                          "transition-colors",
                          feedback[part.key] === 'correct' && "border-success bg-success/5",
                          feedback[part.key] === 'incorrect' && "border-destructive bg-destructive/5"
                        )}
                      />
                    )}
                    {feedback[part.key] === 'correct' && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-success" />
                    )}
                    {feedback[part.key] === 'incorrect' && (
                      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <div className="relative">
                  <Input
                    value={answers['answer'] || ''}
                    onChange={(e) => handleAnswerChange('answer', e.target.value)}
                    placeholder="Enter your answer..."
                    className={cn(
                      "transition-colors",
                      feedback['answer'] === 'correct' && "border-success bg-success/5",
                      feedback['answer'] === 'incorrect' && "border-destructive bg-destructive/5"
                    )}
                  />
                  {feedback['answer'] === 'correct' && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-success" />
                  )}
                  {feedback['answer'] === 'incorrect' && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Hints Section */}
          {showHint && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-primary mb-2">Hint {currentHintIndex + 1}/{question.hints.length}</p>
                  <p className="text-sm">{question.hints[currentHintIndex]}</p>
                  {currentHintIndex < question.hints.length - 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setCurrentHintIndex(prev => prev + 1)}
                    >
                      Next Hint
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AI Hint */}
          {aiHint && (
            <div className="rounded-lg border border-secondary/50 bg-secondary/10 p-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-secondary-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-secondary-foreground mb-2">AI Tutor</p>
                  <p className="text-sm whitespace-pre-line">{aiHint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {allCorrect && (
            <div className="rounded-lg border border-success/50 bg-success/10 p-4 flex items-center gap-3">
              <Award className="h-6 w-6 text-success" />
              <div>
                <p className="font-medium text-success">Excellent work!</p>
                <p className="text-sm text-muted-foreground">You've completed this question correctly.</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={checkAnswers} className="flex-1">
              Check Answer
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHint ? 'Hide Hints' : 'Show Hint'}
            </Button>
            {isChecked && !allCorrect && (
              <Button
                variant="secondary"
                onClick={getAIHint}
                disabled={isLoading}
              >
                {isLoading ? 'Getting help...' : 'Get AI Help'}
              </Button>
            )}
            <Button variant="ghost" onClick={resetWorkspace}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
