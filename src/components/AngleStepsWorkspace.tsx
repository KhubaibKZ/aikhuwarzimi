import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, BookOpen, Keyboard, ChevronDown, ChevronUp } from 'lucide-react';

interface AngleStepsWorkspacePart {
  label: string;
  key: string;
  marks: number;
}

interface AngleStepsWorkspaceProps {
  parts: AngleStepsWorkspacePart[];
  answers: Record<string, string>;
  feedback: Record<string, 'correct' | 'incorrect' | null>;
  onAnswerChange: (key: string, value: string) => void;
  onCheckWork: (partKey: string, partLabel: string) => void;
  isLoading: boolean;
  loadingPartKey: string | null;
  isSubmitted: boolean;
  correctAnswers?: Record<string, string>;
  aiResponse?: { type: 'hint' | 'guidance'; content: string; partKey?: string } | null;
}

// Custom keyboard for angle problems - includes all symbols needed for Q2(d) solution
const ANGLE_KEYBOARD_KEYS = [
  ['7', '8', '9', '°'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '=', '/', '⌫'],
  ['360', '248', '180', '112'],
];

export function AngleStepsWorkspace({
  parts,
  answers,
  feedback,
  onAnswerChange,
  onCheckWork,
  isLoading,
  loadingPartKey,
  isSubmitted,
  correctAnswers,
  aiResponse
}: AngleStepsWorkspaceProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>('working');
  const [showWorkingArea, setShowWorkingArea] = useState(true);
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const handleKeyPress = (key: string) => {
    if (!focusedInput || isSubmitted) return;
    
    const input = inputRefs.current[focusedInput];
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = answers[focusedInput] || '';

    if (key === '⌫') {
      if (start === end && start > 0) {
        const newValue = currentValue.slice(0, start - 1) + currentValue.slice(end);
        onAnswerChange(focusedInput, newValue);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start - 1, start - 1);
        }, 0);
      } else if (start !== end) {
        const newValue = currentValue.slice(0, start) + currentValue.slice(end);
        onAnswerChange(focusedInput, newValue);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start, start);
        }, 0);
      }
    } else {
      const newValue = currentValue.slice(0, start) + key + currentValue.slice(end);
      onAnswerChange(focusedInput, newValue);
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + key.length, start + key.length);
      }, 0);
    }
  };

  return (
    <div className="space-y-4">
      {/* Working Space - rough work area */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowWorkingArea(!showWorkingArea)}
          className="gap-2 text-sm font-medium w-full justify-between"
        >
          <span className="flex items-center gap-2">
            📝 Working Space (show your steps)
          </span>
          {showWorkingArea ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        {showWorkingArea && (
          <div className="space-y-3 pl-1">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Work through the problem step by step:
              </label>
              <Textarea
                ref={(el) => { inputRefs.current['working'] = el; }}
                value={answers['working'] || ''}
                onChange={(e) => onAnswerChange('working', e.target.value)}
                onFocus={() => setFocusedInput('working')}
                placeholder="Example:
Reflex angle at D = 248°
Interior angle D = 360° − 248° = 112°
Adjacent angles in parallelogram add to 180°
Angle DCB = 180° − 112° = 68°"
                disabled={isSubmitted}
                className={cn(
                  "min-h-[120px] font-mono text-sm resize-none",
                  focusedInput === 'working' && "ring-2 ring-primary/30"
                )}
              />
              
              {/* Check Work button for working space */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCheckWork('working', 'Working steps')}
                disabled={isLoading || isSubmitted || !answers['working']?.trim()}
                className="gap-2"
                title="Check your working"
              >
                {loadingPartKey === 'working' ? (
                  <span className="animate-pulse">Checking...</span>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    Check My Working
                  </>
                )}
              </Button>
              
              {/* AI Response for working area */}
              {aiResponse?.partKey === 'working' && (
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
            </div>
          </div>
        )}
      </div>

      {/* Answer fields for each part */}
      <div className="space-y-4 border-t pt-4">
        <p className="text-sm font-medium">Enter your final answers:</p>
        
        {parts.map((part, index) => (
          <div key={part.key} className="space-y-2">
            <label className="flex items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {index + 1}
                </span>
                {part.label}
              </span>
              <span className="text-xs text-muted-foreground">[{part.marks} mark{part.marks > 1 ? 's' : ''}]</span>
            </label>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={(el) => { inputRefs.current[part.key] = el; }}
                      value={answers[part.key] || ''}
                      onChange={(e) => onAnswerChange(part.key, e.target.value)}
                      onFocus={() => setFocusedInput(part.key)}
                      placeholder="?"
                      disabled={isSubmitted}
                      className={cn(
                        "transition-colors pr-16 font-mono text-lg text-center",
                        feedback[part.key] === 'correct' && "border-green-500 bg-green-500/5",
                        feedback[part.key] === 'incorrect' && "border-destructive bg-destructive/5",
                        focusedInput === part.key && "ring-2 ring-primary/30"
                      )}
                    />
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground">°</span>
                    {feedback[part.key] === 'correct' && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                    {feedback[part.key] === 'incorrect' && (
                      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Check Work button for each part */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCheckWork(part.key, part.label)}
                disabled={isLoading || isSubmitted}
                className="shrink-0"
                title="Check this answer"
              >
                {loadingPartKey === part.key ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* AI Response for this part */}
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
            {isSubmitted && feedback[part.key] === 'incorrect' && correctAnswers && (
              <p className="text-sm text-green-600 font-medium ml-8">
                Correct: {correctAnswers[part.key]}°
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Custom Keyboard - positioned near workspace */}
      <div className="border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setKeyboardOpen(!keyboardOpen)}
          className="gap-2 w-full"
          disabled={isSubmitted}
        >
          <Keyboard className="h-4 w-4" />
          {keyboardOpen ? 'Hide Keyboard' : 'Show Math Keyboard'}
        </Button>

        {keyboardOpen && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg border">
            <div className="grid gap-2">
              {ANGLE_KEYBOARD_KEYS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 justify-center">
                  {row.map((key) => (
                    <Button
                      key={key}
                      variant={key === '⌫' ? 'destructive' : (key === '360' || key === '248' || key === '180' || key === '112') ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => handleKeyPress(key)}
                      disabled={isSubmitted || !focusedInput}
                      className={cn(
                        "w-12 h-10 text-base font-medium",
                        key === '⌫' && "bg-destructive/80 hover:bg-destructive",
                        (key === '360' || key === '248' || key === '180' || key === '112') && "text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      {key}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Tap a field above, then use keyboard to enter values
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
