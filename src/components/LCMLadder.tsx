import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LCMStep {
  prime: string;
  quotient1: string;
  quotient2: string;
  feedback?: 'correct' | 'incorrect' | null;
}

interface LCMLadderProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  number1: number;
  number2: number;
  isCorrect?: boolean | null;
  isIncorrect?: boolean | null;
}

export function LCMLadder({ 
  value, 
  onChange, 
  disabled, 
  number1,
  number2,
  isCorrect,
  isIncorrect
}: LCMLadderProps) {
  const [steps, setSteps] = useState<LCMStep[]>([
    { prime: '', quotient1: '', quotient2: '' }
  ]);
  const [stepMessages, setStepMessages] = useState<Record<number, string>>({});
  const [finalAnswer, setFinalAnswer] = useState('');

  // Parse value from parent if provided
  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.steps && Array.isArray(parsed.steps)) {
          setSteps(parsed.steps);
        }
        if (parsed.finalAnswer) {
          setFinalAnswer(parsed.finalAnswer);
        }
      } catch {
        // If not JSON, check if it's just the final answer
        if (!isNaN(Number(value))) {
          setFinalAnswer(value);
        }
      }
    }
  }, []);

  // Update parent whenever steps or final answer change
  useEffect(() => {
    if (finalAnswer) {
      onChange(finalAnswer);
    } else {
      onChange(JSON.stringify({ steps, finalAnswer }));
    }
  }, [steps, finalAnswer, onChange]);

  const addStep = () => {
    setSteps([...steps, { prime: '', quotient1: '', quotient2: '' }]);
  };

  const removeStep = () => {
    if (steps.length > 1) {
      const newSteps = steps.slice(0, -1);
      setSteps(newSteps);
      const newMessages = { ...stepMessages };
      delete newMessages[steps.length - 1];
      setStepMessages(newMessages);
    }
  };

  const updateStep = (index: number, field: 'prime' | 'quotient1' | 'quotient2', val: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: val, feedback: null };
    setSteps(newSteps);
    setStepMessages(prev => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const checkStep = (index: number) => {
    const step = steps[index];
    const prevQuotient1 = index === 0 ? number1 : parseInt(steps[index - 1]?.quotient1 || '0');
    const prevQuotient2 = index === 0 ? number2 : parseInt(steps[index - 1]?.quotient2 || '0');
    
    if (!step.prime || !step.quotient1 || !step.quotient2) return;
    
    const prime = parseInt(step.prime);
    const quotient1 = parseInt(step.quotient1);
    const quotient2 = parseInt(step.quotient2);
    
    const primeCorrect = isPrime(prime);
    
    // For LCM ladder, the prime should divide at least one of the numbers
    const divides1 = prevQuotient1 % prime === 0;
    const divides2 = prevQuotient2 % prime === 0;
    const primeDividesSomething = divides1 || divides2;
    
    // Check quotients: if prime divides, result should be division; otherwise, carry forward
    const expectedQ1 = divides1 ? prevQuotient1 / prime : prevQuotient1;
    const expectedQ2 = divides2 ? prevQuotient2 / prime : prevQuotient2;
    
    const q1Correct = quotient1 === expectedQ1;
    const q2Correct = quotient2 === expectedQ2;
    
    const stepCorrect = primeCorrect && primeDividesSomething && q1Correct && q2Correct;
    
    const newSteps = [...steps];
    newSteps[index] = { 
      ...newSteps[index], 
      feedback: stepCorrect ? 'correct' : 'incorrect' 
    };
    setSteps(newSteps);

    // Generate feedback message
    if (stepCorrect) {
      setStepMessages(prev => ({ ...prev, [index]: `✓ Correct!` }));
    } else if (!primeCorrect) {
      setStepMessages(prev => ({ 
        ...prev, 
        [index]: `${prime} is not a prime number. Use the smallest prime that divides at least one number.` 
      }));
    } else if (!primeDividesSomething) {
      setStepMessages(prev => ({ 
        ...prev, 
        [index]: `${prime} doesn't divide either ${prevQuotient1} or ${prevQuotient2}. Choose a different prime.` 
      }));
    } else if (!q1Correct || !q2Correct) {
      let msg = 'Check your quotients: ';
      if (!q1Correct && divides1) msg += `${prevQuotient1} ÷ ${prime} = ${expectedQ1}. `;
      else if (!q1Correct) msg += `${prevQuotient1} is not divisible by ${prime}, carry it down. `;
      if (!q2Correct && divides2) msg += `${prevQuotient2} ÷ ${prime} = ${expectedQ2}.`;
      else if (!q2Correct) msg += `${prevQuotient2} is not divisible by ${prime}, carry it down.`;
      setStepMessages(prev => ({ ...prev, [index]: msg }));
    }
  };

  // Check if factorization is complete (both quotients are 1)
  const lastStep = steps[steps.length - 1];
  const isComplete = lastStep?.quotient1 === '1' && lastStep?.quotient2 === '1';

  return (
    <div className="space-y-3">
      <div className={cn(
        "border rounded-lg p-4 bg-background",
        isCorrect && "border-green-500 bg-green-500/5",
        isIncorrect && "border-destructive bg-destructive/5"
      )}>
        {/* Ladder Structure */}
        <div className="flex">
          {/* Prime column */}
          <div className="flex flex-col items-center">
            {steps.map((step, index) => (
              <div key={`prime-${index}`} className="h-12 flex items-center justify-center">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={step.prime}
                  onChange={(e) => updateStep(index, 'prime', e.target.value)}
                  disabled={disabled}
                  className={cn(
                    "w-14 h-10 text-center font-bold text-lg",
                    step.feedback === 'correct' && "border-green-500 text-green-600 bg-green-500/5",
                    step.feedback === 'incorrect' && "border-destructive text-destructive bg-destructive/5"
                  )}
                  placeholder=""
                />
              </div>
            ))}
            {/* Empty space for final row */}
            <div className="h-12 w-14"></div>
          </div>

          {/* Vertical divider line */}
          <div className="w-0.5 bg-foreground mx-3 self-stretch"></div>

          {/* Two quotient columns */}
          <div className="flex flex-col flex-1">
            {/* Starting numbers row */}
            <div className="h-12 flex items-center border-b-2 border-foreground gap-4">
              <span className="font-bold text-lg w-20 text-center">{number1}</span>
              <span className="font-bold text-lg w-20 text-center">{number2}</span>
            </div>
            
            {/* Quotient rows */}
            {steps.map((step, index) => (
              <div key={`quotients-${index}`} className="h-12 flex items-center gap-2 border-b-2 border-foreground">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={step.quotient1}
                  onChange={(e) => updateStep(index, 'quotient1', e.target.value)}
                  disabled={disabled}
                  className={cn(
                    "w-20 h-10 font-bold text-lg text-center",
                    step.feedback === 'correct' && "border-green-500 bg-green-500/5",
                    step.feedback === 'incorrect' && "border-destructive bg-destructive/5"
                  )}
                  placeholder=""
                />
                <Input
                  type="text"
                  inputMode="numeric"
                  value={step.quotient2}
                  onChange={(e) => updateStep(index, 'quotient2', e.target.value)}
                  disabled={disabled}
                  className={cn(
                    "w-20 h-10 font-bold text-lg text-center",
                    step.feedback === 'correct' && "border-green-500 bg-green-500/5",
                    step.feedback === 'incorrect' && "border-destructive bg-destructive/5"
                  )}
                  placeholder=""
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => checkStep(index)}
                  disabled={disabled || !step.prime || !step.quotient1 || !step.quotient2}
                  className="h-8 px-2"
                  title="Check this step"
                >
                  {step.feedback === 'correct' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : step.feedback === 'incorrect' ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Step feedback messages */}
        {Object.entries(stepMessages).map(([idx, message]) => (
          <div 
            key={idx}
            className={cn(
              "mt-2 rounded-md px-3 py-2 text-sm",
              steps[parseInt(idx)]?.feedback === 'correct' 
                ? "bg-green-500/10 text-green-700 border border-green-500/30" 
                : "bg-blue-500/10 text-blue-700 border border-blue-500/30"
            )}
          >
            Step {parseInt(idx) + 1}: {message}
          </div>
        ))}

        {/* Completion indicator */}
        {isComplete && (
          <div className="flex items-center text-green-600 text-sm font-medium mt-3">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Factorization complete! Now calculate the LCM.
          </div>
        )}

        {/* Add/Remove buttons */}
        {!disabled && (
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStep}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeStep}
              disabled={steps.length <= 1}
              className="flex-1"
            >
              <Minus className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        )}

        {/* LCM Final Answer */}
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center gap-2">
            <span className="font-medium">LCM =</span>
            <Input
              type="text"
              inputMode="numeric"
              value={finalAnswer}
              onChange={(e) => setFinalAnswer(e.target.value)}
              disabled={disabled}
              className="w-32 h-10 font-bold text-lg"
              placeholder="Answer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
