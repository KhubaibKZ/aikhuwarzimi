// Circle theorem diagram for Q15 4024/11 Oct/Nov 2023
// B, C, D on circle centre O. AB, AC tangents. Angle BAC = 38°

export function CircleTheorem2023ON() {
  const cx = 150, cy = 130, r = 80;
  // Points on circle
  const B = { x: cx - r * Math.sin(0.7), y: cy - r * Math.cos(0.7) };
  const C = { x: cx - r * Math.sin(-0.7), y: cy - r * Math.cos(-0.7) };
  const D = { x: cx + r, y: cy };
  // Tangent point A (external)
  const A = { x: cx - 180, y: cy };

  return (
    <svg viewBox="0 0 300 260" className="w-full max-w-sm mx-auto">
      {/* Circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Centre O */}
      <circle cx={cx} cy={cy} r="2.5" fill="hsl(var(--foreground))" />
      <text x={cx + 6} y={cy + 4} className="text-[11px] fill-foreground font-bold">O</text>

      {/* Tangent lines AB and AC */}
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Lines on circle: BC, BD, CD */}
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="4,3" />
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="4,3" />

      {/* Radii OB and OC */}
      <line x1={cx} y1={cy} x2={B.x} y2={B.y} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3,3" />
      <line x1={cx} y1={cy} x2={C.x} y2={C.y} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3,3" />

      {/* Right angle marks at B and C (tangent ⊥ radius) */}
      <rect x={B.x - 1} y={B.y + 2} width="8" height="8" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" transform={`rotate(-40, ${B.x}, ${B.y})`} />
      <rect x={C.x - 1} y={C.y - 10} width="8" height="8" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" transform={`rotate(40, ${C.x}, ${C.y})`} />

      {/* Angle arc at A */}
      <path d={`M ${A.x + 35},${A.y - 12} A 30,30 0 0,1 ${A.x + 35},${A.y + 12}`} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x={A.x + 40} y={A.y + 5} className="text-[10px] fill-primary font-medium">38°</text>

      {/* Labels */}
      <text x={A.x - 10} y={A.y + 5} className="text-[12px] fill-foreground font-bold">A</text>
      <text x={B.x - 14} y={B.y - 4} className="text-[12px] fill-foreground font-bold">B</text>
      <text x={C.x - 14} y={C.y + 16} className="text-[12px] fill-foreground font-bold">C</text>
      <text x={D.x + 6} y={D.y + 5} className="text-[12px] fill-foreground font-bold">D</text>
    </svg>
  );
}
