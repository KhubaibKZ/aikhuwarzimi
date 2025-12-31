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

  const handleCheckWork = () => {
    const hasAttempt = Object.values(answers).some(v => v.trim().length > 0);
    if (!hasAttempt) {
      setFeedback({
        type: 'error',
        message: "Please enter your answers before checking."
      });
      return;
    }
    
    setFeedback({
      type: 'hint',
      message: "Your work looks good! Review your answers and submit when ready."
    });
  };

  const handleSubmit = () => {
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
                  feedback.type === 'hint' && "bg-warning/10 border-warning/30 text-warning"
                )}>
                  <div className="flex items-start gap-3">
                    {feedback.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                    {feedback.type === 'error' && <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                    {feedback.type === 'hint' && <Lightbulb className="h-5 w-5 shrink-0 mt-0.5" />}
                    <p className="text-sm">{feedback.message}</p>
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
