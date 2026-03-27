// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Two parallel lines crossed by TWO transversals
// 110° at left intersection (upper line), x° and y° at right intersection (lower line)

export function ParallelLines2023ON() {
  return (
    <svg viewBox="0 0 360 220" className="w-full max-w-sm mx-auto">
      {/* Upper parallel line */}
      <line x1="20" y1="70" x2="340" y2="70" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      {/* Lower parallel line */}
      <line x1="20" y1="160" x2="340" y2="160" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Parallel arrows on upper line */}
      <polygon points="46,66 54,70 46,74" fill="hsl(var(--foreground))" />
      <polygon points="56,66 64,70 56,74" fill="hsl(var(--foreground))" />
      {/* Parallel arrows on lower line */}
      <polygon points="286,156 294,160 286,164" fill="hsl(var(--foreground))" />
      <polygon points="296,156 304,160 296,164" fill="hsl(var(--foreground))" />

      {/* Left transversal — crosses upper line at ~(100,70), goes up-left and down-right */}
      <line x1="60" y1="15" x2="140" y2="200" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Right transversal — crosses lower line at ~(230,160), goes up-right and down-left */}
      <line x1="200" y1="210" x2="270" y2="15" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* 110° angle arc at left intersection (upper line, between transversal going up-left and line going left) */}
      <path d="M 80,70 A 22,22 0 0,0 91,51" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="72" y="58" className="text-[11px] fill-primary font-medium">110°</text>

      {/* x° angle arc at right intersection (lower line) — angle between line going left and transversal going down */}
      <path d="M 218,160 A 22,22 0 0,1 228,177" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="210" y="182" className="text-[12px] fill-foreground font-bold italic">x°</text>

      {/* y° angle arc at right intersection (lower line) — angle between transversal going down and line going right */}
      <path d="M 228,177 A 22,22 0 0,1 252,160" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="242" y="182" className="text-[12px] fill-foreground font-bold italic">y°</text>
    </svg>
  );
}
