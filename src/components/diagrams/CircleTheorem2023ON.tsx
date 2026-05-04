// Circle theorem diagram for Q15 4024/11 Oct/Nov 2023
// A external point, tangents from A touch circle (centre O) at B (top) and C (bottom).
// D is on the circle to the right. Lines BD, CD drawn (chord BC also). Angle BAC = 38°.

export function CircleTheorem2023ON() {
  const cx = 200, cy = 170, r = 90;
  // Angle BAC = 38°, tangents from A. Distance AO computed so tangent length is sensible.
  // Half-angle at A = 19°. sin(19°) = r / AO  => AO = r / sin(19°)
  const halfA = (38 / 2) * Math.PI / 180;
  const AO = r / Math.sin(halfA);
  const A = { x: cx - AO, y: cy };

  // Tangent points B and C: OB ⊥ AB. Angle of OB from O measured from line OA (pointing -x).
  // The tangent point lies at angle (90° - halfA) from OA direction.
  // OA direction from O = (-1, 0). Rotate by ±(90° - halfA).
  const phi = Math.PI / 2 - halfA; // angle between OA and OB
  // B is upper tangent point
  const B = {
    x: cx + r * Math.cos(Math.PI - phi),
    y: cy - r * Math.sin(Math.PI - phi),
  };
  const C = {
    x: cx + r * Math.cos(Math.PI - phi),
    y: cy + r * Math.sin(Math.PI - phi),
  };
  // D on the right of the circle
  const D = { x: cx + r, y: cy };

  // Extend tangent lines a bit past B and C
  const extend = (P: {x:number;y:number}, Q: {x:number;y:number}, t: number) => ({
    x: Q.x + (Q.x - P.x) * t,
    y: Q.y + (Q.y - P.y) * t,
  });
  const Bext = extend(A, B, 0.25);
  const Cext = extend(A, C, 0.25);

  return (
    <svg viewBox="0 0 460 340" className="w-full max-w-md mx-auto">
      {/* Circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Tangent lines from A through B and C, extended */}
      <line x1={A.x} y1={A.y} x2={Bext.x} y2={Bext.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={A.x} y1={A.y} x2={Cext.x} y2={Cext.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Chords */}
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Radii OB and OC */}
      <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth="1.2" />
      <line x1={cx} y1={cy} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth="1.2" />

      {/* Centre O */}
      <circle cx={cx} cy={cy} r="2.5" fill="hsl(var(--foreground))" />
      <text x={cx + 6} y={cy - 4} fontStyle="italic" fontSize="13" fill="hsl(var(--foreground))">O</text>

      {/* Angle arc at A (38°) */}
      <path
        d={`M ${A.x + 26} ${A.y - 26 * Math.tan(halfA)} A 26 26 0 0 1 ${A.x + 26} ${A.y + 26 * Math.tan(halfA)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1"
      />
      <text x={A.x + 18} y={A.y + 5} fontSize="12" fill="hsl(var(--foreground))">38°</text>

      {/* Labels */}
      <text x={A.x - 14} y={A.y + 5} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">A</text>
      <text x={B.x - 4} y={B.y - 8} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">B</text>
      <text x={C.x - 4} y={C.y + 18} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">C</text>
      <text x={D.x + 6} y={D.y + 5} fontStyle="italic" fontSize="14" fill="hsl(var(--foreground))">D</text>

      {/* NOT TO SCALE */}
      <text x={400} y={150} fontSize="10" fill="hsl(var(--muted-foreground))">NOT TO</text>
      <text x={400} y={163} fontSize="10" fill="hsl(var(--muted-foreground))">SCALE</text>
    </svg>
  );
}
