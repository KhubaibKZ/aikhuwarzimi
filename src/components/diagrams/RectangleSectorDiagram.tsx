export function RectangleSectorDiagram() {
  // Rectangle OPQR: 11cm × 4cm with sector OPX
  const scale = 22;
  const w = 11 * scale; // 242
  const h = 4 * scale;  // 88
  const padding = 30;
  const svgW = w + padding * 2;
  const svgH = h + padding * 2 + 20;

  // Points
  const O = { x: padding, y: padding + h };
  const P = { x: padding + w, y: padding + h };
  const Q = { x: padding + w, y: padding };
  const R = { x: padding, y: padding };

  // Diagonal OQ
  const diagAngle = Math.atan2(Q.y - O.y, Q.x - O.x);
  const diagLength = Math.sqrt((Q.x - O.x) ** 2 + (Q.y - O.y) ** 2);

  // Sector angle from OP to OQ
  const angleOP = 0; // OP is horizontal to the right
  const angleOQ = Math.atan2(-(Q.y - O.y), Q.x - O.x); // SVG y inverted
  const sectorAngleDeg = (angleOQ * 180) / Math.PI;

  // Arc for sector: from P direction to Q direction
  const arcR = diagLength;
  const arcEndX = O.x + arcR * Math.cos(-angleOQ);
  const arcEndY = O.y - arcR * Math.sin(angleOQ);

  // Shaded region: rectangle minus sector
  // Sector arc path from P to X (point on OQ extended to circle)
  const arcPath = `M ${P.x} ${P.y} A ${arcR} ${arcR} 0 0 1 ${Q.x} ${Q.y}`;

  return (
    <div className="flex justify-center">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-full">
        {/* Shaded region (rectangle minus sector) */}
        <path
          d={`M ${O.x} ${O.y} L ${P.x} ${P.y} A ${arcR} ${arcR} 0 0 1 ${Q.x} ${Q.y} L ${R.x} ${R.y} Z`}
          fill="hsl(var(--primary) / 0.15)"
          stroke="none"
        />
        
        {/* Sector (unshaded) */}
        <path
          d={`M ${O.x} ${O.y} L ${P.x} ${P.y} A ${arcR} ${arcR} 0 0 1 ${Q.x} ${Q.y} Z`}
          fill="hsl(var(--background))"
          stroke="none"
        />

        {/* Rectangle outline */}
        <polygon
          points={`${O.x},${O.y} ${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />

        {/* Diagonal OQ */}
        <line x1={O.x} y1={O.y} x2={Q.x} y2={Q.y} stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Sector arc */}
        <path
          d={`M ${P.x} ${P.y} A ${arcR} ${arcR} 0 0 1 ${Q.x} ${Q.y}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Labels */}
        <text x={O.x - 12} y={O.y + 5} className="text-xs fill-foreground font-medium">O</text>
        <text x={P.x + 5} y={P.y + 5} className="text-xs fill-foreground font-medium">P</text>
        <text x={Q.x + 5} y={Q.y + 2} className="text-xs fill-foreground font-medium">Q</text>
        <text x={R.x - 12} y={R.y + 2} className="text-xs fill-foreground font-medium">R</text>

        {/* X label on arc */}
        <text x={(P.x + Q.x) / 2 + 12} y={(P.y + Q.y) / 2} className="text-xs fill-primary font-medium">X</text>

        {/* Dimension labels */}
        <text x={(O.x + P.x) / 2} y={O.y + 18} textAnchor="middle" className="text-xs fill-muted-foreground">11 cm</text>
        <text x={P.x + 18} y={(P.y + Q.y) / 2 + 4} textAnchor="middle" className="text-xs fill-muted-foreground">4 cm</text>

        {/* "Shaded" label */}
        <text x={R.x + 30} y={R.y + 25} className="text-[10px] fill-muted-foreground italic">shaded</text>
      </svg>
    </div>
  );
}
