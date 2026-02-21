export function VectorTrapeziumDiagram() {
  // Trapezium OPQR with O at origin
  const padding = 30;
  const w = 300;
  const h = 180;

  const O = { x: padding, y: h - padding };
  const P = { x: padding + 200, y: h - padding };
  const R = { x: padding + 40, y: padding };
  // RQ = 1/3 OP, so RQ length = 200/3 ≈ 67
  const Q = { x: R.x + 67, y: padding };

  return (
    <div className="flex justify-center">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="max-w-full">
        {/* Trapezium fill */}
        <polygon
          points={`${O.x},${O.y} ${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`}
          fill="hsl(var(--primary) / 0.08)"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />

        {/* Arrow on OR */}
        <line x1={O.x} y1={O.y} x2={R.x} y2={R.y} stroke="hsl(var(--foreground))" strokeWidth="2" />
        {/* Arrow on OP */}
        <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Arrow markers */}
        <defs>
          <marker id="vt-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M 0 0 L 8 3 L 0 6 Z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Vector arrows (midpoint) */}
        <line x1={O.x} y1={O.y} x2={(O.x + R.x) / 2} y2={(O.y + R.y) / 2} stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#vt-arrow)" />
        <line x1={O.x} y1={O.y} x2={(O.x + P.x) / 2} y2={(O.y + P.y) / 2} stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#vt-arrow)" />

        {/* Labels */}
        <text x={O.x - 14} y={O.y + 5} className="text-xs fill-foreground font-bold">O</text>
        <text x={P.x + 5} y={P.y + 5} className="text-xs fill-foreground font-bold">P</text>
        <text x={Q.x + 5} y={Q.y - 5} className="text-xs fill-foreground font-bold">Q</text>
        <text x={R.x - 14} y={R.y - 5} className="text-xs fill-foreground font-bold">R</text>

        {/* Vector labels */}
        <text x={(O.x + R.x) / 2 - 18} y={(O.y + R.y) / 2} className="text-xs fill-primary font-bold italic">a</text>
        <text x={(O.x + P.x) / 2} y={O.y + 18} textAnchor="middle" className="text-xs fill-primary font-bold italic">b</text>

        {/* RQ label */}
        <text x={(R.x + Q.x) / 2} y={R.y - 8} textAnchor="middle" className="text-[10px] fill-muted-foreground">RQ = ⅓OP</text>
      </svg>
    </div>
  );
}
