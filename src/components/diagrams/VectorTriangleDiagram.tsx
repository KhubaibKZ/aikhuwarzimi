export function VectorTriangleDiagram() {
  const w = 240;
  const h = 180;
  const padding = 25;

  const O = { x: padding, y: h - padding };
  const T = { x: w - padding, y: h - padding };
  const U = { x: padding + 60, y: padding };

  // Y = U + 2/3 * UT
  const Yx = U.x + (2 / 3) * (T.x - U.x);
  const Yy = U.y + (2 / 3) * (T.y - U.y);

  // Z on OT such that YZ || UO
  const Zx = O.x + (2 / 3) * (T.x - O.x);
  const Zy = O.y;

  return (
    <div className="flex justify-center">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="max-w-full">
        <defs>
          <marker id="vtri-arrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M 0 0 L 7 2.5 L 0 5 Z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Triangle OTU */}
        <polygon
          points={`${O.x},${O.y} ${T.x},${T.y} ${U.x},${U.y}`}
          fill="hsl(var(--primary) / 0.05)"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />

        {/* OT arrow */}
        <line x1={O.x} y1={O.y} x2={(O.x + T.x) / 2} y2={(O.y + T.y) / 2} stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#vtri-arrow)" />

        {/* OU arrow */}
        <line x1={O.x} y1={O.y} x2={(O.x + U.x) / 2} y2={(O.y + U.y) / 2} stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#vtri-arrow)" />

        {/* Y point */}
        <circle cx={Yx} cy={Yy} r={3} fill="hsl(var(--primary))" />

        {/* Z point */}
        <circle cx={Zx} cy={Zy} r={3} fill="hsl(var(--primary))" />

        {/* UY line */}
        <line x1={U.x} y1={U.y} x2={Yx} y2={Yy} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* YZ line (parallel to UO) */}
        <line x1={Yx} y1={Yy} x2={Zx} y2={Zy} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Labels */}
        <text x={O.x - 12} y={O.y + 5} className="text-xs fill-foreground font-bold">O</text>
        <text x={T.x + 5} y={T.y + 5} className="text-xs fill-foreground font-bold">T</text>
        <text x={U.x - 5} y={U.y - 8} className="text-xs fill-foreground font-bold">U</text>
        <text x={Yx + 5} y={Yy - 5} className="text-xs fill-primary font-bold">Y</text>
        <text x={Zx} y={Zy + 16} textAnchor="middle" className="text-xs fill-primary font-bold">Z</text>

        {/* Vector labels */}
        <text x={(O.x + T.x) / 2} y={O.y + 18} textAnchor="middle" className="text-xs fill-foreground font-bold italic">t</text>
        <text x={(O.x + U.x) / 2 - 14} y={(O.y + U.y) / 2} className="text-xs fill-foreground font-bold italic">u</text>
      </svg>
    </div>
  );
}
