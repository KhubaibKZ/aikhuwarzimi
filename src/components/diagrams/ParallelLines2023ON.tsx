// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Two DIAGONAL parallel lines with a roughly vertical transversal

export function ParallelLines2023ON() {
  return (
    <svg viewBox="0 0 440 300" className="w-full max-w-md mx-auto">
      {/* Upper parallel line — diagonal, going from lower-left to upper-right */}
      <line x1="30" y1="140" x2="400" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
      {/* Lower parallel line — diagonal, same slope, shifted down */}
      <line x1="80" y1="270" x2="430" y2="185" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {/* Parallel arrows on upper line (pointing upper-right) */}
      {(() => {
        // Arrow at ~30% along upper line
        const ax = 30 + 0.28 * (400 - 30);
        const ay = 140 + 0.28 * (50 - 140);
        // Direction vector of line (normalized)
        const dx = 370;
        const dy = -90;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        // Perpendicular
        const px = -uy;
        const py = ux;
        return (
          <>
            <polygon
              points={`${ax - ux * 5 + px * 4},${ay - uy * 5 + py * 4} ${ax + ux * 5},${ay + uy * 5} ${ax - ux * 5 - px * 4},${ay - uy * 5 - py * 4}`}
              fill="hsl(var(--foreground))"
            />
            <polygon
              points={`${ax - ux * 5 + px * 4 + ux * 10},${ay - uy * 5 + py * 4 + uy * 10} ${ax + ux * 5 + ux * 10},${ay + uy * 5 + uy * 10} ${ax - ux * 5 - px * 4 + ux * 10},${ay - uy * 5 - py * 4 + uy * 10}`}
              fill="hsl(var(--foreground))"
            />
          </>
        );
      })()}

      {/* Parallel arrows on lower line (pointing upper-right) */}
      {(() => {
        const ax = 80 + 0.65 * (430 - 80);
        const ay = 270 + 0.65 * (185 - 270);
        const dx = 350;
        const dy = -85;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const px = -uy;
        const py = ux;
        return (
          <>
            <polygon
              points={`${ax - ux * 5 + px * 4},${ay - uy * 5 + py * 4} ${ax + ux * 5},${ay + uy * 5} ${ax - ux * 5 - px * 4},${ay - uy * 5 - py * 4}`}
              fill="hsl(var(--foreground))"
            />
            <polygon
              points={`${ax - ux * 5 + px * 4 + ux * 10},${ay - uy * 5 + py * 4 + uy * 10} ${ax + ux * 5 + ux * 10},${ay + uy * 5 + uy * 10} ${ax - ux * 5 - px * 4 + ux * 10},${ay - uy * 5 - py * 4 + uy * 10}`}
              fill="hsl(var(--foreground))"
            />
          </>
        );
      })()}

      {/* Transversal — roughly vertical, crossing upper line on left side and lower line on right side */}
      {/* Upper intersection at about (145, 115), lower intersection at about (310, 215) */}
      <line x1="110" y1="30" x2="345" y2="290" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {/* 110° angle arc at upper-left intersection (145, 115)
          Angle is below the upper parallel line, left side of transversal */}
      <path
        d="M 125,117 A 22,22 0 0,1 147,133"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x="108" y="145" className="text-[15px] fill-foreground font-medium">110°</text>

      {/* x° angle at lower-right intersection (310, 215)
          Below the lower parallel line, left of transversal */}
      <path
        d="M 290,218 A 22,22 0 0,1 312,234"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x="280" y="252" className="text-[15px] fill-foreground font-medium italic">x°</text>

      {/* y° angle at lower-right intersection (310, 215)
          Below the lower parallel line, right of transversal */}
      <path
        d="M 312,234 A 22,22 0 0,1 333,218"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x="320" y="252" className="text-[15px] fill-foreground font-medium italic">y°</text>
    </svg>
  );
}
