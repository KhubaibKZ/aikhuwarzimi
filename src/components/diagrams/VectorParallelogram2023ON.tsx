// Vector parallelogram for Q23 4024/11 Oct/Nov 2023
// OABC parallelogram. OA = a, OC = c. X midpoint AC. AY:YB = 2:1

export function VectorParallelogram2023ON() {
  const O = { x: 40, y: 160 };
  const A = { x: 200, y: 160 };
  const C = { x: 80, y: 40 };
  const B = { x: 240, y: 40 };

  // X = midpoint of AC
  const X = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  // Y on AB where AY:YB = 2:1 → Y = A + 2/3(B-A)
  const Y = { x: A.x + 2 / 3 * (B.x - A.x), y: A.y + 2 / 3 * (B.y - A.y) };

  return (
    <svg viewBox="0 0 290 190" className="w-full max-w-sm mx-auto">
      <defs>
        <marker id="vp-arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5Z" fill="hsl(var(--foreground))" />
        </marker>
      </defs>

      {/* Parallelogram */}
      <polygon points={`${O.x},${O.y} ${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Vector arrows OA and OC (midpoint arrows) */}
      <line x1={O.x} y1={O.y} x2={(O.x + A.x) / 2} y2={(O.y + A.y) / 2}
        stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vp-arr)" />
      <line x1={O.x} y1={O.y} x2={(O.x + C.x) / 2} y2={(O.y + C.y) / 2}
        stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vp-arr)" />

      {/* Diagonal AC */}
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4,3" />

      {/* Points X and Y */}
      <circle cx={X.x} cy={X.y} r="3" fill="hsl(var(--primary))" />
      <circle cx={Y.x} cy={Y.y} r="3" fill="hsl(var(--primary))" />

      {/* Labels */}
      <text x={O.x - 14} y={O.y + 5} className="text-[12px] fill-foreground font-bold">O</text>
      <text x={A.x + 4} y={A.y + 14} className="text-[12px] fill-foreground font-bold">A</text>
      <text x={B.x + 4} y={B.y - 4} className="text-[12px] fill-foreground font-bold">B</text>
      <text x={C.x - 16} y={C.y - 2} className="text-[12px] fill-foreground font-bold">C</text>
      <text x={X.x - 14} y={X.y - 6} className="text-[11px] fill-primary font-bold">X</text>
      <text x={Y.x + 6} y={Y.y - 4} className="text-[11px] fill-primary font-bold">Y</text>

      {/* Vector labels */}
      <text x={(O.x + A.x) / 2} y={O.y + 16} textAnchor="middle" className="text-[11px] fill-primary font-bold italic">a</text>
      <text x={(O.x + C.x) / 2 - 14} y={(O.y + C.y) / 2} className="text-[11px] fill-primary font-bold italic">c</text>
    </svg>
  );
}
