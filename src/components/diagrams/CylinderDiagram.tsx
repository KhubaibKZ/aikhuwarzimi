interface CylinderDiagramProps {
  radius?: number;
  height?: number;
  horizontal?: boolean;
  waterDepth?: number;
  showLabels?: boolean;
}

export function CylinderDiagram({ radius = 20, height = 150, horizontal = false, waterDepth, showLabels = true }: CylinderDiagramProps) {
  if (horizontal) {
    // Horizontal cylinder (lying on side)
    const svgW = 300;
    const svgH = 160;
    const cylLen = 200;
    const cylR = 50;
    const cx = 50;
    const cy = svgH / 2;

    return (
      <div className="flex justify-center">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-full">
          {/* Ground line */}
          <line x1={30} y1={cy + cylR} x2={svgW - 20} y2={cy + cylR} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4 3" />

          {/* Back ellipse */}
          <ellipse cx={cx + cylLen} cy={cy} rx={15} ry={cylR} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Cylinder body */}
          <line x1={cx} y1={cy - cylR} x2={cx + cylLen} y2={cy - cylR} stroke="hsl(var(--foreground))" strokeWidth="2" />
          <line x1={cx} y1={cy + cylR} x2={cx + cylLen} y2={cy + cylR} stroke="hsl(var(--foreground))" strokeWidth="2" />

          {/* Front ellipse */}
          <ellipse cx={cx} cy={cy} rx={15} ry={cylR} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />

          {/* Water level */}
          {waterDepth !== undefined && (
            <>
              <rect x={cx} y={cy + cylR - waterDepth * 2.5} width={cylLen} height={waterDepth * 2.5} fill="hsl(var(--primary) / 0.2)" />
              <line x1={cx} y1={cy + cylR - waterDepth * 2.5} x2={cx + cylLen} y2={cy + cylR - waterDepth * 2.5} stroke="hsl(var(--primary))" strokeWidth="1.5" />
              {/* Water depth label */}
              <line x1={cx + cylLen + 20} y1={cy + cylR} x2={cx + cylLen + 20} y2={cy + cylR - waterDepth * 2.5} stroke="hsl(var(--primary))" strokeWidth="1" />
              <text x={cx + cylLen + 30} y={cy + cylR - waterDepth * 1.2} className="text-[10px] fill-primary">{waterDepth} cm</text>
            </>
          )}

          {/* Labels */}
          {showLabels && (
            <>
              <text x={cx + cylLen / 2} y={cy - cylR - 8} textAnchor="middle" className="text-[10px] fill-muted-foreground">{height} cm</text>
              <text x={cx - 25} y={cy + 4} className="text-[10px] fill-muted-foreground">r={radius}</text>
            </>
          )}
        </svg>
      </div>
    );
  }

  // Vertical cylinder
  const svgW = 160;
  const svgH = 200;
  const cylW = 80;
  const cylH = 120;
  const cx2 = svgW / 2;
  const topY = 30;

  return (
    <div className="flex justify-center">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="max-w-[160px]">
        {/* Back lines */}
        <line x1={cx2 - cylW / 2} y1={topY + 15} x2={cx2 - cylW / 2} y2={topY + cylH} stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1={cx2 + cylW / 2} y1={topY + 15} x2={cx2 + cylW / 2} y2={topY + cylH} stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Top ellipse */}
        <ellipse cx={cx2} cy={topY + 15} rx={cylW / 2} ry={15} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Bottom ellipse */}
        <ellipse cx={cx2} cy={topY + cylH} rx={cylW / 2} ry={15} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Radius line */}
        <line x1={cx2} y1={topY + cylH} x2={cx2 + cylW / 2} y2={topY + cylH} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={cx2 + cylW / 4} y={topY + cylH + 14} textAnchor="middle" className="text-[10px] fill-primary">x</text>

        {/* Height label */}
        <line x1={cx2 + cylW / 2 + 12} y1={topY + 15} x2={cx2 + cylW / 2 + 12} y2={topY + cylH} stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x={cx2 + cylW / 2 + 22} y={topY + cylH / 2 + 10} className="text-[10px] fill-muted-foreground">2x</text>
      </svg>
    </div>
  );
}
