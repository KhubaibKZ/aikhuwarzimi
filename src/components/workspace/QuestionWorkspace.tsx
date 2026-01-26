import { useState, useRef, useCallback } from 'react';
import { RoughWorkArea } from './RoughWorkArea';
import { FinalAnswerField } from './FinalAnswerField';
import { SmartKeyboard } from './SmartKeyboard';

export interface AnswerPart {
  key: string;
  label: string;
  marks: number;
  suffix?: string; // e.g., "°" for angles
}

export interface QuestionWorkspaceProps {
  parts: AnswerPart[];
  answers: Record<string, string>;
  feedback: Record<string, 'correct' | 'incorrect' | null>;
  onAnswerChange: (key: string, value: string) => void;
  onCheckWork: (partKey: string, partLabel: string) => void;
  isLoading: boolean;
  loadingPartKey: string | null;
  isSubmitted: boolean;
  correctAnswers?: Record<string, string>;
  aiResponse?: { type: 'hint' | 'guidance'; content: string; partKey?: string } | null;
  keyboardKeys: string[][];
  roughWorkPlaceholder?: string;
  showRoughWork?: boolean;
}

export function QuestionWorkspace({
  parts,
  answers,
  feedback,
  onAnswerChange,
  onCheckWork,
  isLoading,
  loadingPartKey,
  isSubmitted,
  correctAnswers,
  aiResponse,
  keyboardKeys,
  roughWorkPlaceholder,
  showRoughWork = true
}: QuestionWorkspaceProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(showRoughWork ? 'working' : parts[0]?.key);
  const [showWorkingArea, setShowWorkingArea] = useState(true);
  
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const handleKeyPress = useCallback((key: string) => {
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
    } else if (key === 'Clear') {
      onAnswerChange(focusedInput, '');
      setTimeout(() => input.focus(), 0);
    } else {
      const newValue = currentValue.slice(0, start) + key + currentValue.slice(end);
      onAnswerChange(focusedInput, newValue);
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + key.length, start + key.length);
      }, 0);
    }
  }, [focusedInput, isSubmitted, answers, onAnswerChange]);

  const setInputRef = useCallback((key: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    inputRefs.current[key] = el;
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. Rough Work Area */}
      {showRoughWork && (
        <RoughWorkArea
          ref={setInputRef('working') as any}
          value={answers['working'] || ''}
          onChange={(value) => onAnswerChange('working', value)}
          onFocus={() => setFocusedInput('working')}
          onCheckWork={() => onCheckWork('working', 'Rough work')}
          isLoading={loadingPartKey === 'working'}
          isSubmitted={isSubmitted}
          isFocused={focusedInput === 'working'}
          isExpanded={showWorkingArea}
          onToggleExpand={() => setShowWorkingArea(!showWorkingArea)}
          placeholder={roughWorkPlaceholder}
          aiResponse={aiResponse?.partKey === 'working' ? aiResponse : null}
        />
      )}

      {/* 2. Final Answers */}
      <div className="space-y-4 border-t pt-4">
        <p className="text-sm font-medium">📋 Final Answers</p>
        
        {parts.map((part, index) => (
          <FinalAnswerField
            key={part.key}
            ref={setInputRef(part.key) as any}
            partKey={part.key}
            label={part.label}
            marks={part.marks}
            value={answers[part.key] || ''}
            onChange={(value) => onAnswerChange(part.key, value)}
            onFocus={() => setFocusedInput(part.key)}
            onCheckWork={() => onCheckWork(part.key, part.label)}
            feedback={feedback[part.key]}
            isLoading={loadingPartKey === part.key}
            isSubmitted={isSubmitted}
            isFocused={focusedInput === part.key}
            correctAnswer={correctAnswers?.[part.key]}
            suffix={part.suffix}
            aiResponse={aiResponse?.partKey === part.key ? aiResponse : null}
            index={index}
          />
        ))}
      </div>

      {/* 3. Smart Keyboard */}
      <div className="border-t pt-4">
        <SmartKeyboard
          keys={keyboardKeys}
          isOpen={keyboardOpen}
          onToggle={() => setKeyboardOpen(!keyboardOpen)}
          onKeyPress={handleKeyPress}
          disabled={isSubmitted || !focusedInput}
        />
      </div>
    </div>
  );
}
