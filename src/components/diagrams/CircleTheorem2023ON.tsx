// Circle theorem diagram for Q15 4024/11 Oct/Nov 2023
// A external point, tangents from A touch circle (centre O) at B (top) and C (bottom).
// D on the circle to the right. Chords BD, CD, BC drawn. Radii OB, OC. Angle BAC = 38°.

export function CircleTheorem2023ON() {
  const halfA = (38 / 2) * Math.PI / 180; // 19°
  const r = 70;
  const AO = r / Math.sin(halfA); // ≈ 215
  // Place A near left edge, O = A + AO to the right
  const A = { x: 30, y: 180 };
  const cx = A.x + AO;
  const cy = A.y;

  // Tangent points (symmetric about line AO which is horizontal)
  // Angle from O: OB makes angle (90° - halfA) with OA-direction (which points -x from O)
  const phi = Math.PI / 2 - halfA;
  const B = { x: cx - r * Math.cos(phi), y: cy - r * Math.sin(phi) };
  const C = { x: cx - r * Math.cos(phi), y: cy + r * Math.sin(phi) };
  const D = { x: cx + r, y: cy };

  // Extend tangent lines past tangent points
  const extend = (P: {x:number;y:number}, Q: {x:number;y:number}, t: number) => ({
    x: Q.x + (Q.x - P.x) * t,
    y: Q.y + (Q.y - P.y) * t,
  });
  const Bext = extend(A, B, 0.30);
  const Cext = extend(A, C, 0.30);

  const W = Math.max(Bext.x, Cext.x, D.x) + 70;
  const H = Math.max(Cext.y, cy + r) + 30;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md mx-auto">
      {/* Circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Tangent lines from A through B and C, extended past */}
      <line x1={A.x} y1={A.y} x2={Bext.x} y2={Bext.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={A.x} y1={A.y} x2={Cext.x} y2={Cext.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Chords BC, BD, CD */}
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Radii OB and OC */}
      <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth="1.2" />
      <line x1={cx} y1={cy} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth="1.2" />

      {/* Centre O */}
      <circle cx={cx} cy={cy} r="2.5" fill="hsl(var(--foreground))" />
      <text x={cx + 6} y={cy - 4} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">O</text>

      {/* Angle arc at A (38°) */}
      <path
        d={`M ${A.x + 28} ${A.y - 28 * Math.tan(halfA)} A 28 28 0 0 1 ${A.x + 28} ${A.y + 28 * Math.tan(halfA)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.2"
      />
      <text x={A.x + 14} y={A.y + 4} fontSize="12" fill="hsl(var(--foreground))">38°</text>

      {/* Labels */}
      <text x={A.x - 14} y={A.y + 5} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">A</text>
      <text x={B.x - 4} y={B.y - 8} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">B</text>
      <text x={C.x - 4} y={C.y + 18} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">C</text>
      <text x={D.x + 6} y={D.y + 5} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">D</text>

      {/* NOT TO SCALE */}
      <text x={D.x + 22} y={cy - 10} fontSize="10" fill="hsl(var(--muted-foreground))">NOT TO</text>
      <text x={D.x + 22} y={cy + 3} fontSize="10" fill="hsl(var(--muted-foreground))">SCALE</text>
    </svg>
  );
}
