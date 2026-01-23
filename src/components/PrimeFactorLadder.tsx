import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LadderRow {
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
  onCheckStep?: (stepIndex: number, prime: string, quotient: string, previousQuotient: number) => void;
  stepFeedback?: Record<number, { type: 'correct' | 'incorrect'; message: string }>;
}

export function PrimeFactorLadder({ 
  value, 
  onChange, 
  disabled, 
  targetNumber,
  isCorrect,
  isIncorrect,
  onCheckStep,
  stepFeedback = {}
}: PrimeFactorLadderProps) {
  const [rows, setRows] = useState<LadderRow[]>([
    { prime: '', quotient: '' }
  ]);

  // Parse value from parent if provided
  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRows(parsed);
        }
      } catch {
        // If not JSON, ignore
      }
    }
  }, []);

  // Update parent whenever rows change
  useEffect(() => {
    const validRows = rows.filter(r => r.prime && r.quotient);
    if (validRows.length > 0) {
      // Generate the index notation answer
      const primeCount: Record<string, number> = {};
      validRows.forEach(row => {
        const prime = row.prime.trim();
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
      
      onChange(answer || JSON.stringify(rows));
    } else {
      onChange(JSON.stringify(rows));
    }
  }, [rows, onChange]);

  const addRow = () => {
    setRows([...rows, { prime: '', quotient: '' }]);
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const updateRow = (index: number, field: 'prime' | 'quotient', val: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: val, feedback: null };
    setRows(newRows);
  };

  const checkStep = (index: number) => {
    const row = rows[index];
    const previousQuotient = index === 0 ? targetNumber : parseInt(rows[index - 1]?.quotient || '0');
    
    if (!row.prime || !row.quotient) return;
    
    const prime = parseInt(row.prime);
    const quotient = parseInt(row.quotient);
    
    // Check if the division is correct
    const expectedQuotient = previousQuotient / prime;
    const isCorrect = expectedQuotient === quotient && previousQuotient % prime === 0;
    
    // Check if the prime is actually prime
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    
    const newRows = [...rows];
    newRows[index] = { 
      ...newRows[index], 
      feedback: isCorrect && isPrime(prime) ? 'correct' : 'incorrect' 
    };
    setRows(newRows);

    // Notify parent if callback provided
    if (onCheckStep) {
      onCheckStep(index, row.prime, row.quotient, previousQuotient);
    }
  };

  // Check if final quotient is 1 (complete factorization)
  const lastQuotient = rows[rows.length - 1]?.quotient;
  const isComplete = lastQuotient === '1';

  return (
    <div className="space-y-2">
      <div className={cn(
        "border rounded-lg p-3 bg-background",
        isCorrect && "border-green-500 bg-green-500/5",
        isIncorrect && "border-destructive bg-destructive/5"
      )}>
        {/* Header */}
        <div className="flex items-center mb-2 text-xs text-muted-foreground font-medium">
          <div className="w-14 text-center">Prime</div>
          <div className="w-px h-4 bg-border mx-1"></div>
          <div className="flex-1">Number</div>
          <div className="w-8"></div>
        </div>
        
        {/* First row with target number display */}
        <div className="flex items-center border-b border-border pb-2 mb-2">
          <div className="w-14">
            <Input
              type="text"
              inputMode="numeric"
              value={rows[0]?.prime || ''}
              onChange={(e) => updateRow(0, 'prime', e.target.value)}
              disabled={disabled}
              className={cn(
                "h-9 text-center font-bold",
                rows[0]?.feedback === 'correct' && "border-green-500 text-green-600",
                rows[0]?.feedback === 'incorrect' && "border-destructive text-destructive"
              )}
              placeholder=""
            />
          </div>
          <div className="w-px h-9 bg-foreground mx-1"></div>
          <div className="flex-1 font-bold text-lg pl-2">{targetNumber}</div>
          <div className="w-8"></div>
        </div>

        {/* First quotient row */}
        <div className="flex items-center border-b border-border pb-2 mb-2">
          <div className="w-14">
            {rows.length > 1 ? (
              <Input
                type="text"
                inputMode="numeric"
                value={rows[1]?.prime || ''}
                onChange={(e) => updateRow(1, 'prime', e.target.value)}
                disabled={disabled}
                className={cn(
                  "h-9 text-center font-bold",
                  rows[1]?.feedback === 'correct' && "border-green-500 text-green-600",
                  rows[1]?.feedback === 'incorrect' && "border-destructive text-destructive"
                )}
                placeholder=""
              />
            ) : null}
          </div>
          <div className="w-px h-9 bg-foreground mx-1"></div>
          <div className="flex-1 pl-2">
            <Input
              type="text"
              inputMode="numeric"
              value={rows[0]?.quotient || ''}
              onChange={(e) => updateRow(0, 'quotient', e.target.value)}
              disabled={disabled}
              className={cn(
                "h-9",
                rows[0]?.feedback === 'correct' && "border-green-500 bg-green-500/5",
                rows[0]?.feedback === 'incorrect' && "border-destructive bg-destructive/5"
              )}
              placeholder="Result..."
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => checkStep(0)}
            disabled={disabled || !rows[0]?.prime || !rows[0]?.quotient}
            className="w-8 h-8 p-0 shrink-0"
          >
            {rows[0]?.feedback === 'correct' ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : rows[0]?.feedback === 'incorrect' ? (
              <XCircle className="h-4 w-4 text-destructive" />
            ) : (
              <BookOpen className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Additional rows */}
        {rows.slice(1).map((row, idx) => {
          const actualIndex = idx + 1;
          const nextIndex = actualIndex + 1;
          const hasNextRow = nextIndex < rows.length;
          
          return (
            <div key={actualIndex} className="flex items-center border-b border-border pb-2 mb-2">
              <div className="w-14">
                {hasNextRow ? (
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={rows[nextIndex]?.prime || ''}
                    onChange={(e) => updateRow(nextIndex, 'prime', e.target.value)}
                    disabled={disabled}
                    className={cn(
                      "h-9 text-center font-bold",
                      rows[nextIndex]?.feedback === 'correct' && "border-green-500 text-green-600",
                      rows[nextIndex]?.feedback === 'incorrect' && "border-destructive text-destructive"
                    )}
                    placeholder=""
                  />
                ) : null}
              </div>
              <div className="w-px h-9 bg-foreground mx-1"></div>
              <div className="flex-1 pl-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={row.quotient}
                  onChange={(e) => updateRow(actualIndex, 'quotient', e.target.value)}
                  disabled={disabled}
                  className={cn(
                    "h-9",
                    row.feedback === 'correct' && "border-green-500 bg-green-500/5",
                    row.feedback === 'incorrect' && "border-destructive bg-destructive/5"
                  )}
                  placeholder="Result..."
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => checkStep(actualIndex)}
                disabled={disabled || !row.prime || !row.quotient}
                className="w-8 h-8 p-0 shrink-0"
              >
                {row.feedback === 'correct' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : row.feedback === 'incorrect' ? (
                  <XCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
              </Button>
            </div>
          );
        })}

        {/* Completion indicator */}
        {isComplete && (
          <div className="flex items-center text-green-600 text-sm font-medium pt-1">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Factorization complete!
          </div>
        )}

        {/* Add/Remove buttons */}
        {!disabled && (
          <div className="flex gap-2 mt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRow}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeRow}
              disabled={rows.length <= 1}
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
