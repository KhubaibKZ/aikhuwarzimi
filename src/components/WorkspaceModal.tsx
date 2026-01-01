import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MathKeyboard } from './MathKeyboard';
import { QuestionData } from '@/lib/questionData';
import { useProgress } from '@/context/ProgressContext';
import { Lightbulb, CheckCircle, Send, X, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  
  const { markExampleComplete, markExerciseComplete, isCompleted } = useProgress();

  useEffect(() => {
    if (isOpen) {
      setAnswers({});
      setHintIndex(0);
      setFeedback(null);
      setIsSubmitted(isCompleted(question.id));
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

  const handleCheckWork = () => {
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

    const correctAnswers = question.answer as Record<string, string>;
    const feedbackMessages: string[] = [];
    let correctCount = 0;

    // Only give feedback for filled parts
    filledAnswers.forEach(([key, userAnswer]) => {
      const part = question.parts?.find(p => p.key === key);
      if (!part) return;
      
      const correctAnswer = correctAnswers[key];
      const result = checkAnswerMatch(userAnswer, correctAnswer);

      if (result.isCorrect) {
        feedbackMessages.push(`✅ **${part.label}**: Excellent! That's correct!`);
        correctCount++;
      } else if (result.missing.length > 0 && result.extra.length === 0) {
        feedbackMessages.push(`🔍 **${part.label}**: Good start, but you're missing ${result.missing.length} item(s). Look at the original list again carefully.`);
      } else if (result.extra.length > 0 && result.missing.length === 0) {
        feedbackMessages.push(`🤔 **${part.label}**: Almost there! You included ${result.extra.length} item(s) that don't belong. Review the definitions.`);
      } else if (result.missing.length > 0 && result.extra.length > 0) {
        feedbackMessages.push(`💡 **${part.label}**: Some items are correct, but there are mistakes. Remember: ${question.hints[0] || 'Review the definitions carefully.'}`);
      } else {
        feedbackMessages.push(`❌ **${part.label}**: This needs more work. Try using the hints!`);
      }
    });

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
        message: feedbackMessages.join('\n\n') + "\n\n💪 Don't give up! Use the hints if you need help."
      });
    }
  };

  const handleSubmit = () => {
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

    const correctAnswers = question.answer as Record<string, string>;
    const feedbackMessages: string[] = [];
    let allCorrect = true;
    let correctCount = 0;
    const totalParts = question.parts.length;

    // Give feedback for ALL parts
    question.parts.forEach((part) => {
      const userAnswer = answers[part.key]?.trim() || '';
      const correctAnswer = correctAnswers[part.key];

      if (!userAnswer) {
        feedbackMessages.push(`📝 **${part.label}**: You haven't answered this yet. Give it a try!`);
        allCorrect = false;
        return;
      }

      const result = checkAnswerMatch(userAnswer, correctAnswer);

      if (result.isCorrect) {
        feedbackMessages.push(`✅ **${part.label}**: Excellent! That's correct!`);
        correctCount++;
      } else if (result.missing.length > 0 && result.extra.length === 0) {
        feedbackMessages.push(`🔍 **${part.label}**: Good start, but you're missing ${result.missing.length} item(s). Look at the original list again carefully.`);
        allCorrect = false;
      } else if (result.extra.length > 0 && result.missing.length === 0) {
        feedbackMessages.push(`🤔 **${part.label}**: Almost there! You included ${result.extra.length} item(s) that don't belong. Review the definitions.`);
        allCorrect = false;
      } else if (result.missing.length > 0 && result.extra.length > 0) {
        feedbackMessages.push(`💡 **${part.label}**: Some items are correct, but there are mistakes. Remember: ${question.hints[0] || 'Review the definitions carefully.'}`);
        allCorrect = false;
      } else {
        feedbackMessages.push(`❌ **${part.label}**: This needs more work. Try using the hints!`);
        allCorrect = false;
      }
    });

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
        message: `**${correctCount} of ${totalParts} parts correct.** Please fix the errors before submitting.\n\n` + feedbackMessages.join('\n\n')
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
                  feedback.type === 'success' && "bg-success/10 border-success/30 text-success",
                  feedback.type === 'error' && "bg-destructive/10 border-destructive/30 text-destructive",
                  feedback.type === 'hint' && "bg-warning/10 border-warning/30 text-warning-foreground"
                )}>
                  <div className="flex items-start gap-3">
                    {feedback.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-success" />}
                    {feedback.type === 'error' && <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-destructive" />}
                    {feedback.type === 'hint' && <Lightbulb className="h-5 w-5 shrink-0 mt-0.5 text-warning" />}
                    <div className="text-sm space-y-2 flex-1">
                      {feedback.message.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
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
                  disabled={isSubmitted}
                  className="gap-2 bg-warning/10 border-warning/30 text-warning hover:bg-warning/20"
                >
                  <Lightbulb className="h-4 w-4" />
                  Get Hint ({question.hints.length - hintIndex} left)
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCheckWork}
                  disabled={isSubmitted}
                  className="gap-2 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                >
                  <CheckCircle className="h-4 w-4" />
                  Check Work
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="gap-2 bg-success text-success-foreground hover:bg-success/90"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitted ? 'Submitted!' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
