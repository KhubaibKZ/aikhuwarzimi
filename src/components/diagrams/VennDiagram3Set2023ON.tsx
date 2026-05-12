// 3-set Venn diagram for Q18 4024/11 Oct/Nov 2023
// R (Run), C (Cycle), S (Sail) — 40 members
// Interactive: students fill in ALL 8 region counts

import { cn } from '@/lib/utils';

interface Props {
  answers?: Record<string, string>;
  onAnswerChange?: (key: string, value: string) => void;
  feedback?: Record<string, 'correct' | 'incorrect' | null>;
  isSubmitted?: boolean;
  correctAnswers?: Record<string, string>;
}

export function VennDiagram3Set2023ON({
  answers = {},
  onAnswerChange,
  feedback = {},
  isSubmitted = false,
  correctAnswers,
}: Props) {
  // SVG geometry (viewBox 320x280)
  // Larger spacing so input boxes fit cleanly inside each region without
  // overlapping circle borders.
  const r = 70;
  const R = { cx: 120, cy: 110 };
  const C = { cx: 200, cy: 110 };
  const S = { cx: 160, cy: 180 };

  const inputClass = (key: string) =>
    cn(
      'w-9 h-6 text-center text-xs font-bold rounded border bg-background text-foreground outline-none transition-colors',
      feedback[key] === 'correct' && 'border-green-500 bg-green-500/10',
      feedback[key] === 'incorrect' && 'border-destructive bg-destructive/10',
      !feedback[key] && 'border-primary/40 focus:border-primary',
    );

  // Position is given in SVG units; converted to % of the 320x280 viewBox.
  const renderInput = (key: string, sx: number, sy: number) => (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
      style={{ left: `${(sx / 320) * 100}%`, top: `${(sy / 280) * 100}%` }}
    >
      <input
        type="text"
        inputMode="numeric"
        value={answers[key] || ''}
        onChange={(e) => onAnswerChange?.(key, e.target.value)}
        disabled={isSubmitted}
        className={inputClass(key)}
        aria-label={key}
      />
      {isSubmitted && feedback[key] === 'incorrect' && correctAnswers?.[key] && (
        <span className="text-[10px] text-green-600 font-semibold">
          ({correctAnswers[key]})
        </span>
      )}
    </div>
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 320 280" className="w-full">
        {/* Universal set rectangle */}
        <rect x="10" y="10" width="300" height="260" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="22" y="28" className="text-[12px] fill-foreground font-bold">ξ</text>

        {/* Circles */}
        <circle cx={R.cx} cy={R.cy} r={r} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx={C.cx} cy={C.cy} r={r} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx={S.cx} cy={S.cy} r={r} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Set Labels — placed clearly outside the circles */}
        <text x={R.cx - r - 4} y={R.cy - r - 4} className="text-[13px] fill-foreground font-bold">R</text>
        <text x={C.cx + r - 4} y={C.cy - r - 4} className="text-[13px] fill-foreground font-bold">C</text>
        <text x={S.cx + r + 4} y={S.cy + r + 8} className="text-[13px] fill-foreground font-bold">S</text>
      </svg>

      {/* Interactive input fields — positioned in each region, away from arcs */}
      {/* R only — left lobe of R */}
      {renderInput('ronly', 78, 100)}
      {/* C only — right lobe of C */}
      {renderInput('conly', 242, 100)}
      {/* R ∩ C only (top intersection, above S) */}
      {renderInput('rcOnly', 160, 78)}
      {/* R ∩ C ∩ S center */}
      {renderInput('rcs', 160, 130)}
      {/* R ∩ S only (lower-left intersection) */}
      {renderInput('rsOnly', 122, 168)}
      {/* C ∩ S only (lower-right intersection) */}
      {renderInput('csOnly', 198, 168)}
      {/* S only — bottom lobe of S */}
      {renderInput('sonly', 160, 220)}
      {/* Outside all sets */}
      {renderInput('outside', 285, 250)}
    </div>
  );
}
