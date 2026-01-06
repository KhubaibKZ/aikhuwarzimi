import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MathKeyboard } from './MathKeyboard';
import { QuestionData } from '@/lib/questionData';
import { useProgress } from '@/context/ProgressContext';
import { Lightbulb, CheckCircle, Send, X, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuestionData;
  sectionType: 'example' | 'exercise';
}

type FeedbackType = 'success' | 'error' | 'hint' | null;

interface Feedback {
  type: FeedbackType;
  message: string;
}

export function WorkspaceModal({ isOpen, onClose, question, sectionType }: WorkspaceModalProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  
  const { markExampleComplete, markExerciseComplete, isCompleted } = useProgress();

  useEffect(() => {
    if (isOpen) {
      setAnswers({});
      setHintIndex(0);
      setFeedback(null);
      setIsSubmitted(isCompleted(question.id));
      setAttemptCounts({});
    }
  }, [isOpen, question.id, isCompleted]);

  const handleInsertSymbol = (symbol: string) => {
    if (focusedInput && inputRefs.current[focusedInput]) {
      const input = inputRefs.current[focusedInput];
      if (input) {
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const currentValue = answers[focusedInput] || '';
        const newValue = currentValue.slice(0, start) + symbol + currentValue.slice(end);
        setAnswers(prev => ({ ...prev, [focusedInput]: newValue }));
        
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start + symbol.length, start + symbol.length);
        }, 0);
      }
    }
  };

  const handleGetHint = () => {
    if (hintIndex < question.hints.length) {
      setFeedback({
        type: 'hint',
        message: question.hints[hintIndex]
      });
      setHintIndex(prev => prev + 1);
    } else {
      setFeedback({
        type: 'hint',
        message: "No more hints available. Try your best!"
      });
    }
  };

  const normalizeAnswer = (str: string): string[] => {
    return str
      .toLowerCase()
      .replace(/[{}]/g, '')
      .split(/[,\s]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .sort();
  };

  const checkAnswerMatch = (userAnswer: string, correctAnswer: string): { isCorrect: boolean; missing: string[]; extra: string[] } => {
    const userParts = normalizeAnswer(userAnswer);
    const correctParts = normalizeAnswer(correctAnswer);
    
    const missing = correctParts.filter(c => !userParts.includes(c));
    const extra = userParts.filter(u => !correctParts.includes(u));
    
    return {
      isCorrect: missing.length === 0 && extra.length === 0,
      missing,
      extra
    };
  };

  // Get AI-powered adaptive hint - never sends actual answers, only error patterns
  const getAIHint = async (partKey: string, partLabel: string, userAnswer: string, missing: string[], extra: string[]): Promise<string> => {
    const currentAttempt = (attemptCounts[partKey] || 0) + 1;
    setAttemptCounts(prev => ({ ...prev, [partKey]: currentAttempt }));
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          question: question.question,
          partLabel,
          userAnswer,
          attemptCount: currentAttempt,
          // Only send boolean flags about error types, NEVER the actual values
          hasErrors: missing.length > 0 || extra.length > 0,
          hasMissing: missing.length > 0,
          hasExtra: extra.length > 0
        }
      });

      if (error) {
        console.error('AI tutor error:', error);
        return getFallbackHint(partKey, partLabel, missing.length > 0, extra.length > 0);
      }

      return data.hint || getFallbackHint(partKey, partLabel, missing.length > 0, extra.length > 0);
    } catch (err) {
      console.error('Failed to get AI hint:', err);
      return getFallbackHint(partKey, partLabel, missing.length > 0, extra.length > 0);
    }
  };

  // Fallback hints when AI is unavailable - never reveals answers
  const getFallbackHint = (partKey: string, partLabel: string, hasMissing: boolean, hasExtra: boolean): string => {
    const lowerKey = partKey.toLowerCase();
    const lowerLabel = partLabel.toLowerCase();
    
    // Context-aware hints based on error type
    const errorContext = hasMissing && hasExtra 
      ? "Check each number carefully against the definition." 
      : hasMissing 
        ? "Are you sure you've found all the numbers that fit?" 
        : "Does every number in your answer truly belong?";
    
    if (lowerKey === 'natural' || lowerLabel.includes('natural')) {
      return `💡 Natural numbers are the counting numbers starting from 1. ${errorContext}`;
    }
    if (lowerKey === 'integers' || lowerLabel.includes('integer')) {
      return `🤔 Integers are whole numbers (no fractions or decimals) - positive, negative, or zero. ${errorContext}`;
    }
    if (lowerKey === 'rational' || lowerLabel.includes('rational')) {
      return `💡 Can each number be written as a fraction p/q? That's what makes it rational. ${errorContext}`;
    }
    if (lowerKey === 'irrational' || lowerLabel.includes('irrational')) {
      return `🤔 Irrational numbers have infinite, non-repeating decimals and can't be fractions. ${errorContext}`;
    }
    if (lowerKey === 'real' || lowerLabel.includes('real')) {
      return `💡 Real numbers include every point on the number line. ${errorContext}`;
    }
    
    return `🤔 Review the definition of ${partLabel}. ${errorContext}`;
  };

  const handleCheckWork = async () => {
    // Only check parts that have been filled in
    const filledAnswers = Object.entries(answers).filter(([_, v]) => v.trim().length > 0);
    
    if (filledAnswers.length === 0) {
      setFeedback({
        type: 'error',
        message: "Please enter at least one answer before checking."
      });
      return;
    }

    if (!question.answer || !question.parts) {
      setFeedback({
        type: 'hint',
        message: "Keep working on your solution. When you're confident, click Submit!"
      });
      return;
    }

    setIsLoadingAI(true);
    setFeedback({
      type: 'hint',
      message: "🤖 Analyzing your work..."
    });

    const correctAnswers = question.answer as Record<string, string>;
    const feedbackMessages: string[] = [];
    let correctCount = 0;

    // Process answers with AI hints
    for (const [key, userAnswer] of filledAnswers) {
      const part = question.parts?.find(p => p.key === key);
      if (!part) continue;
      
      const correctAnswer = correctAnswers[key];
      const result = checkAnswerMatch(userAnswer, correctAnswer);

      if (result.isCorrect) {
        feedbackMessages.push(`✅ **${part.label}**: Excellent! That's correct!`);
        correctCount++;
      } else {
        // Get AI-powered adaptive hint
        const aiHint = await getAIHint(key, part.label, userAnswer, result.missing, result.extra);
        feedbackMessages.push(`**${part.label}**: ${aiHint}`);
      }
    }

    setIsLoadingAI(false);

    if (correctCount === filledAnswers.length) {
      setFeedback({
        type: 'success',
        message: feedbackMessages.join('\n\n')
      });
    } else if (correctCount > 0) {
      setFeedback({
        type: 'hint',
        message: feedbackMessages.join('\n\n')
      });
    } else {
      setFeedback({
        type: 'error',
        message: feedbackMessages.join('\n\n')
      });
    }
  };

  const handleSubmit = async () => {
    // Check ALL parts on submit
    if (!question.answer || !question.parts) {
      const hasAttempt = Object.values(answers).some(v => v.trim().length > 0);
      if (!hasAttempt) {
        setFeedback({
          type: 'error',
          message: "Please complete your work before submitting."
        });
        return;
      }
      
      setIsSubmitted(true);
      setFeedback({
        type: 'success',
        message: "Excellent work! Your answer has been submitted successfully. 🎉"
      });

      if (sectionType === 'example') {
        markExampleComplete(question.id);
      } else {
        markExerciseComplete(question.id);
      }
      return;
    }

    setIsLoadingAI(true);
    setFeedback({
      type: 'hint',
      message: "🤖 Reviewing your submission..."
    });

    const correctAnswers = question.answer as Record<string, string>;
    const feedbackMessages: string[] = [];
    let allCorrect = true;
    let correctCount = 0;
    const totalParts = question.parts.length;

    // Give feedback for ALL parts
    for (const part of question.parts) {
      const userAnswer = answers[part.key]?.trim() || '';
      const correctAnswer = correctAnswers[part.key];

      if (!userAnswer) {
        feedbackMessages.push(`📝 **${part.label}**: You haven't answered this yet. Give it a try!`);
        allCorrect = false;
        continue;
      }

      const result = checkAnswerMatch(userAnswer, correctAnswer);

      if (result.isCorrect) {
        feedbackMessages.push(`✅ **${part.label}**: Excellent! That's correct!`);
        correctCount++;
      } else {
        // Get AI-powered adaptive hint
        const aiHint = await getAIHint(part.key, part.label, userAnswer, result.missing, result.extra);
        feedbackMessages.push(`**${part.label}**: ${aiHint}`);
        allCorrect = false;
      }
    }

    setIsLoadingAI(false);

    if (allCorrect) {
      setIsSubmitted(true);
      setFeedback({
        type: 'success',
        message: `🎉 **Perfect! All ${totalParts} parts are correct!**\n\n` + feedbackMessages.join('\n\n')
      });

      if (sectionType === 'example') {
        markExampleComplete(question.id);
      } else {
        markExerciseComplete(question.id);
      }
    } else {
      setFeedback({
        type: 'error',
        message: `**${correctCount} of ${totalParts} parts correct.** Keep trying!\n\n` + feedbackMessages.join('\n\n')
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {question.title}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side - Question */}
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Question
                </h3>
                <div className="rounded-xl bg-secondary/50 p-4 border border-border">
                  <p className="text-foreground whitespace-pre-line math-input">
                    {question.question}
                  </p>
                </div>
              </div>

              <MathKeyboard
                isOpen={keyboardOpen}
                onToggle={() => setKeyboardOpen(!keyboardOpen)}
                onInsert={handleInsertSymbol}
              />

              {feedback && (
                <div className={cn(
                  "rounded-xl p-4 border animate-scale-in",
                  feedback.type === 'success' && "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800",
                  feedback.type === 'error' && "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800",
                  feedback.type === 'hint' && "bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800"
                )}>
                  <div className="flex items-start gap-3">
                    {feedback.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />}
                    {feedback.type === 'error' && <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />}
                    {feedback.type === 'hint' && <Lightbulb className="h-5 w-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />}
                    <div className={cn(
                      "text-sm space-y-2 flex-1",
                      feedback.type === 'success' && "text-emerald-800 dark:text-emerald-200",
                      feedback.type === 'error' && "text-red-800 dark:text-red-200",
                      feedback.type === 'hint' && "text-amber-800 dark:text-amber-200"
                    )}>
                      {feedback.message.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Work Area */}
          <div className="lg:w-1/2 flex flex-col overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Your Work
              </h3>

              <div className="space-y-4">
                {question.parts ? (
                  question.parts.map((part) => (
                    <div key={part.key} className="space-y-2">
                      <Label htmlFor={part.key} className="text-foreground font-medium">
                        {part.label}
                      </Label>
                      {question.type === 'factorization' && part.key === 'steps' ? (
                        <Textarea
                          id={part.key}
                          ref={(el) => { inputRefs.current[part.key] = el; }}
                          placeholder="Show your division steps here..."
                          value={answers[part.key] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [part.key]: e.target.value }))}
                          onFocus={() => setFocusedInput(part.key)}
                          disabled={isSubmitted}
                          className="min-h-[100px] font-mono resize-none"
                        />
                      ) : (
                        <Input
                          id={part.key}
                          ref={(el) => { inputRefs.current[part.key] = el; }}
                          placeholder="Enter your answer..."
                          value={answers[part.key] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [part.key]: e.target.value }))}
                          onFocus={() => setFocusedInput(part.key)}
                          disabled={isSubmitted}
                          className="font-mono"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="work" className="text-foreground font-medium">
                      Show your working
                    </Label>
                    <Textarea
                      id="work"
                      ref={(el) => { inputRefs.current['work'] = el; }}
                      placeholder="Write your complete solution here..."
                      value={answers['work'] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, work: e.target.value }))}
                      onFocus={() => setFocusedInput('work')}
                      disabled={isSubmitted}
                      className="min-h-[200px] font-mono resize-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-border bg-muted/30 shrink-0">
              <div className="flex flex-wrap gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleGetHint}
                  disabled={isSubmitted || isLoadingAI}
                  className="gap-2 bg-warning/10 border-warning/30 text-warning hover:bg-warning/20"
                >
                  <Lightbulb className="h-4 w-4" />
                  Get Hint ({question.hints.length - hintIndex} left)
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCheckWork}
                  disabled={isSubmitted || isLoadingAI}
                  className="gap-2 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                >
                  {isLoadingAI ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {isLoadingAI ? 'Thinking...' : 'Check Work'}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitted || isLoadingAI}
                  className="gap-2 bg-success text-success-foreground hover:bg-success/90"
                >
                  {isLoadingAI ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {isSubmitted ? 'Submitted!' : isLoadingAI ? 'Analyzing...' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
