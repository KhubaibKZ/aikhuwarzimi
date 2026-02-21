export function AngleMeasureDiagram() {
  const size = 220;
  const cx = 50;
  const cy = 170;
  const lineLen = 150;
  const angleDeg = 40;
  const angleRad = (angleDeg * Math.PI) / 180;

  const endX = cx + lineLen;
  const endY = cy;
  const topX = cx + lineLen * Math.cos(angleRad);
  const topY = cy - lineLen * Math.sin(angleRad);

  // Arc for angle marker
  const arcR = 40;
  const arcEndX = cx + arcR;
  const arcEndY = cy;
  const arcTopX = cx + arcR * Math.cos(angleRad);
  const arcTopY = cy - arcR * Math.sin(angleRad);

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-[220px]">
        {/* Bottom line (horizontal) */}
        <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="hsl(var(--foreground))" strokeWidth="2" />
        
        {/* Angled line */}
        <line x1={cx} y1={cy} x2={topX} y2={topY} stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Angle arc */}
        <path
          d={`M ${arcEndX} ${arcEndY} A ${arcR} ${arcR} 0 0 0 ${arcTopX} ${arcTopY}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Question mark at angle */}
        <text x={cx + arcR * 0.7 * Math.cos(angleRad / 2)} y={cy - arcR * 0.7 * Math.sin(angleRad / 2) + 4} textAnchor="middle" className="text-sm fill-primary font-bold">?</text>

        {/* Vertex dot */}
        <circle cx={cx} cy={cy} r={3} fill="hsl(var(--primary))" />
      </svg>
    </div>
  );
}
