import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LadderRow {
  prime: string;
  quotient: string;
}

interface PrimeFactorLadderProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  targetNumber: number;
  isCorrect?: boolean | null;
  isIncorrect?: boolean | null;
}

export function PrimeFactorLadder({ 
  value, 
  onChange, 
  disabled, 
  targetNumber,
  isCorrect,
  isIncorrect
}: PrimeFactorLadderProps) {
  const [rows, setRows] = useState<LadderRow[]>([
    { prime: '', quotient: targetNumber.toString() }
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
        // If not JSON, it's the final answer format - don't modify rows
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
    }
  }, [rows, onChange]);

  const addRow = () => {
    const lastRow = rows[rows.length - 1];
    const lastQuotient = lastRow?.quotient ? parseInt(lastRow.quotient) : targetNumber;
    const lastPrime = lastRow?.prime ? parseInt(lastRow.prime) : 2;
    const newQuotient = lastPrime && lastQuotient ? Math.floor(lastQuotient / lastPrime) : '';
    
    setRows([...rows, { prime: '', quotient: newQuotient.toString() }]);
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const updateRow = (index: number, field: 'prime' | 'quotient', val: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: val };
    
    // Auto-calculate next quotient when prime is entered
    if (field === 'prime' && val && index < newRows.length - 1) {
      const currentQuotient = index === 0 ? targetNumber : parseInt(newRows[index - 1]?.quotient || '0');
      const prime = parseInt(val);
      if (prime && currentQuotient) {
        newRows[index].quotient = Math.floor(currentQuotient / prime).toString();
      }
    }
    
    setRows(newRows);
  };

  return (
    <div className="space-y-2">
      <div className={cn(
        "border rounded-lg p-3 bg-background",
        isCorrect && "border-green-500 bg-green-500/5",
        isIncorrect && "border-destructive bg-destructive/5"
      )}>
        {/* Header */}
        <div className="flex items-center mb-2 text-xs text-muted-foreground font-medium">
          <div className="w-16 text-center">Prime</div>
          <div className="w-px h-4 bg-border mx-2"></div>
          <div className="flex-1">Quotient</div>
        </div>
        
        {/* First row with target number */}
        <div className="flex items-center border-b border-border pb-1 mb-1">
          <div className="w-16">
            <Input
              type="text"
              value={rows[0]?.prime || ''}
              onChange={(e) => updateRow(0, 'prime', e.target.value)}
              disabled={disabled}
              className="h-8 text-center text-red-600 font-bold"
              placeholder=""
            />
          </div>
          <div className="w-px h-8 bg-border mx-2"></div>
          <div className="flex-1 font-medium text-lg pl-2">{targetNumber}</div>
        </div>

        {/* Dynamic rows */}
        {rows.slice(1).map((row, idx) => {
          const actualIndex = idx + 1;
          const previousQuotient = rows[actualIndex - 1]?.quotient;
          const previousPrime = rows[actualIndex - 1]?.prime;
          const expectedQuotient = previousQuotient && previousPrime 
            ? Math.floor(parseInt(previousQuotient) / parseInt(previousPrime)) 
            : '';
          
          return (
            <div key={actualIndex} className="flex items-center border-b border-border pb-1 mb-1">
              <div className="w-16">
                <Input
                  type="text"
                  value={row.prime}
                  onChange={(e) => updateRow(actualIndex, 'prime', e.target.value)}
                  disabled={disabled}
                  className="h-8 text-center text-red-600 font-bold"
                  placeholder=""
                />
              </div>
              <div className="w-px h-8 bg-border mx-2"></div>
              <div className="flex-1 pl-2">
                <Input
                  type="text"
                  value={row.quotient || expectedQuotient.toString()}
                  onChange={(e) => updateRow(actualIndex, 'quotient', e.target.value)}
                  disabled={disabled}
                  className="h-8"
                  placeholder=""
                />
              </div>
            </div>
          );
        })}

        {/* Final row showing 1 */}
        {rows.length > 0 && rows[rows.length - 1]?.quotient === '1' && (
          <div className="flex items-center pt-1">
            <div className="w-16"></div>
            <div className="w-px h-6 bg-border mx-2"></div>
            <div className="flex-1 font-bold pl-2">1</div>
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
              Add Row
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
