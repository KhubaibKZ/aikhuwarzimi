// 3-set Venn diagram for Q18 4024/11 Oct/Nov 2023
// R (Run), C (Cycle), S (Sail) — 40 members
// Interactive: students fill in the 4 unknown regions

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
  const cx = 150, cy = 120;
  const r = 55;
  const dx = 35, dy = 20;

  const circles = [
    { cx: cx - dx, cy: cy - dy, label: 'R' },
    { cx: cx + dx, cy: cy - dy, label: 'C' },
    { cx: cx, cy: cy + dy + 10, label: 'S' },
  ];

  const inputClass = (key: string) =>
    cn(
      'w-10 h-7 text-center text-sm font-bold rounded border bg-background text-foreground outline-none transition-colors',
      feedback[key] === 'correct' && 'border-green-500 bg-green-500/10',
      feedback[key] === 'incorrect' && 'border-destructive bg-destructive/10',
      !feedback[key] && 'border-primary/40 focus:border-primary',
    );

  const renderInput = (key: string, leftPct: number, topPct: number) => (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
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
    <div className="relative w-full max-w-sm mx-auto">
      <svg viewBox="0 0 300 240" className="w-full">
        {/* Universal set rectangle */}
        <rect x="10" y="10" width="280" height="220" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="22" y="28" className="text-[11px] fill-foreground font-bold">ξ</text>

        {/* Circles */}
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={r} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        ))}

        {/* Set Labels */}
        <text x={cx - dx - r - 8} y={cy - dy - r + 10} className="text-[13px] fill-foreground font-bold">R</text>
        <text x={cx + dx + r - 4} y={cy - dy - r + 10} className="text-[13px] fill-foreground font-bold">C</text>
        <text x={cx + r - 4} y={cy + dy + 10 + r + 14} className="text-[13px] fill-foreground font-bold">S</text>

        {/* Given values (fixed) */}
        {/* R only = 6 */}
        <text x={cx - dx - 28} y={cy - dy + 5} textAnchor="middle" className="text-[14px] fill-foreground font-bold">6</text>
        {/* R∩C not S = 9 */}
        <text x={cx} y={cy - dy - 8} textAnchor="middle" className="text-[14px] fill-foreground font-bold">9</text>
        {/* R∩S not C = 5 */}
        <text x={cx - 18} y={cy + 24} textAnchor="middle" className="text-[14px] fill-foreground font-bold">5</text>
        {/* C∩S not R = 3 */}
        <text x={cx + 18} y={cy + 24} textAnchor="middle" className="text-[14px] fill-foreground font-bold">3</text>
      </svg>

      {/* Interactive input fields positioned over SVG (percentages of container) */}
      {/* R∩C∩S center (≈ cx=150, cy=130 → 50%, 54%) */}
      {renderInput('rcs', 50, 54)}
      {/* C only (≈ cx=210, cy=110 → 70%, 46%) */}
      {renderInput('conly', 70, 46)}
      {/* S only (≈ cx=150, cy=180 → 50%, 75%) */}
      {renderInput('sonly', 50, 78)}
      {/* Outside (≈ cx=265, cy=210 → 88%, 88%) */}
      {renderInput('outside', 88, 88)}
    </div>
  );
}
