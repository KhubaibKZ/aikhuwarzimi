import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LadderStep {
  prime: string;
  quotient: string;
  feedback?: 'correct' | 'incorrect' | null;
}

interface PrimeFactorLadderProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  targetNumber: number;
  isCorrect?: boolean | null;
  isIncorrect?: boolean | null;
  onCheckStep?: (stepIndex: number, prime: string, quotient: string, previousQuotient: number) => Promise<string | null>;
}

export function PrimeFactorLadder({ 
  value, 
  onChange, 
  disabled, 
  targetNumber,
  isCorrect,
  isIncorrect,
  onCheckStep
}: PrimeFactorLadderProps) {
  const [steps, setSteps] = useState<LadderStep[]>([
    { prime: '', quotient: '' }
  ]);
  const [stepMessages, setStepMessages] = useState<Record<number, string>>({});
  const [loadingStep, setLoadingStep] = useState<number | null>(null);

  // Parse value from parent if provided
  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSteps(parsed);
        }
      } catch {
        // If not JSON, ignore
      }
    }
  }, []);

  // Update parent whenever steps change
  useEffect(() => {
    const validSteps = steps.filter(s => s.prime && s.quotient);
    if (validSteps.length > 0) {
      // Generate the index notation answer
      const primeCount: Record<string, number> = {};
      validSteps.forEach(step => {
        const prime = step.prime.trim();
        if (prime && !isNaN(Number(prime))) {
          primeCount[prime] = (primeCount[prime] || 0) + 1;
        }
      });
      
      // Sort primes and format with index notation
      const sortedPrimes = Object.keys(primeCount)
        .map(Number)
        .sort((a, b) => a - b);
      
      const answer = sortedPrimes
        .map(p => {
          const count = primeCount[p.toString()];
          if (count === 1) return p.toString();
          if (count === 2) return `${p}²`;
          if (count === 3) return `${p}³`;
          return `${p}^${count}`;
        })
        .join(' × ');
      
      onChange(answer || JSON.stringify(steps));
    } else {
      onChange(JSON.stringify(steps));
    }
  }, [steps, onChange]);

  const addStep = () => {
    setSteps([...steps, { prime: '', quotient: '' }]);
  };

  const removeStep = () => {
    if (steps.length > 1) {
      const newSteps = steps.slice(0, -1);
      setSteps(newSteps);
      // Clear message for removed step
      const newMessages = { ...stepMessages };
      delete newMessages[steps.length - 1];
      setStepMessages(newMessages);
    }
  };

  const updateStep = (index: number, field: 'prime' | 'quotient', val: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: val, feedback: null };
    setSteps(newSteps);
    // Clear message when editing
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

  const checkStep = async (index: number) => {
    const step = steps[index];
    const previousQuotient = index === 0 ? targetNumber : parseInt(steps[index - 1]?.quotient || '0');
    
    if (!step.prime || !step.quotient) return;
    
    const prime = parseInt(step.prime);
    const quotient = parseInt(step.quotient);
    
    // Check if the division is correct
    const expectedQuotient = previousQuotient / prime;
    const divisionCorrect = expectedQuotient === quotient && previousQuotient % prime === 0;
    const primeCorrect = isPrime(prime);
    const stepCorrect = divisionCorrect && primeCorrect;
    
    const newSteps = [...steps];
    newSteps[index] = { 
      ...newSteps[index], 
      feedback: stepCorrect ? 'correct' : 'incorrect' 
    };
    setSteps(newSteps);

    // Generate feedback message
    if (stepCorrect) {
      setStepMessages(prev => ({ ...prev, [index]: `✓ Correct! ${prime} is prime and ${previousQuotient} ÷ ${prime} = ${quotient}` }));
    } else {
      // Get AI feedback if available
      if (onCheckStep) {
        setLoadingStep(index);
        const aiMessage = await onCheckStep(index, step.prime, step.quotient, previousQuotient);
        setLoadingStep(null);
        if (aiMessage) {
          setStepMessages(prev => ({ ...prev, [index]: aiMessage }));
          return;
        }
      }
      
      // Fallback feedback
      if (!primeCorrect) {
        setStepMessages(prev => ({ 
          ...prev, 
          [index]: `${prime} is not a prime number. What are the factors of ${prime}?` 
        }));
      } else if (!divisionCorrect) {
        setStepMessages(prev => ({ 
          ...prev, 
          [index]: `Check your division: does ${previousQuotient} ÷ ${prime} = ${quotient}?` 
        }));
      }
    }
  };

  // Check if final quotient is 1 (complete factorization)
  const lastQuotient = steps[steps.length - 1]?.quotient;
  const isComplete = lastQuotient === '1';

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
            {/* Empty space for final quotient row */}
            <div className="h-12 w-14"></div>
          </div>

          {/* Vertical divider line */}
          <div className="w-0.5 bg-foreground mx-3 self-stretch"></div>

          {/* Quotient column with lines */}
          <div className="flex flex-col flex-1">
            {/* Starting number */}
            <div className="h-12 flex items-center border-b-2 border-foreground">
              <span className="font-bold text-lg pl-2">{targetNumber}</span>
            </div>
            
            {/* Quotient rows */}
            {steps.map((step, index) => (
              <div key={`quotient-${index}`} className="h-12 flex items-center gap-2 border-b-2 border-foreground">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={step.quotient}
                  onChange={(e) => updateStep(index, 'quotient', e.target.value)}
                  disabled={disabled}
                  className={cn(
                    "w-20 h-10 font-bold text-lg",
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
                  disabled={disabled || !step.prime || !step.quotient || loadingStep === index}
                  className="h-8 px-2"
                  title="Check this step"
                >
                  {loadingStep === index ? (
                    <span className="animate-pulse text-xs">...</span>
                  ) : step.feedback === 'correct' ? (
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
            Factorization complete!
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
      </div>
      
      {/* Show generated answer */}
      {value && !value.startsWith('[') && (
        <p className="text-sm text-muted-foreground">
          Your answer: <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </div>
  );
}
