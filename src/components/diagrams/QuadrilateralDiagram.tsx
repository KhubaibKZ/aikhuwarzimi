export function QuadrilateralDiagram() {
  // Quadrilateral ABCD for Q9a trigonometry
  const w = 260;
  const h = 220;
  const padding = 25;

  const A = { x: padding, y: h - padding - 30 };
  const B = { x: padding + 100, y: h - padding };
  const C = { x: w - padding, y: h - padding - 20 };
  const D = { x: w - padding - 40, y: padding };

  return (
    <div className="flex justify-center">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="max-w-full">
        {/* Quadrilateral */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="hsl(var(--primary) / 0.05)"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />

        {/* Diagonal AC */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4 3" />

        {/* Right angle at B */}
        <rect x={B.x - 10} y={B.y - 13} width="10" height="10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" />

        {/* Labels */}
        <text x={A.x - 14} y={A.y + 5} className="text-xs fill-foreground font-bold">A</text>
        <text x={B.x - 5} y={B.y + 16} className="text-xs fill-foreground font-bold">B</text>
        <text x={C.x + 5} y={C.y + 5} className="text-xs fill-foreground font-bold">C</text>
        <text x={D.x + 5} y={D.y - 5} className="text-xs fill-foreground font-bold">D</text>

        {/* Side labels */}
        <text x={(A.x + B.x) / 2 - 20} y={(A.y + B.y) / 2 + 5} className="text-[10px] fill-primary font-medium">11.5 cm</text>
        <text x={(B.x + C.x) / 2} y={B.y + 16} textAnchor="middle" className="text-[10px] fill-primary font-medium">10.25 cm</text>

        {/* Angle labels */}
        <text x={A.x + 18} y={A.y - 8} className="text-[10px] fill-muted-foreground">35°</text>
        <text x={C.x - 28} y={C.y - 12} className="text-[10px] fill-muted-foreground">105°</text>
      </svg>
    </div>
  );
}
