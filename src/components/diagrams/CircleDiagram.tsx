interface CircleDiagramProps {
  radius: number;
  label?: string;
}

export function CircleDiagram({ radius, label }: CircleDiagramProps) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-[200px]">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
        {/* Radius line */}
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={3} fill="hsl(var(--primary))" />
        {/* Radius label */}
        <text x={cx + r / 2} y={cy - 8} textAnchor="middle" className="text-xs fill-primary font-medium">
          {label || `${radius} cm`}
        </text>
      </svg>
    </div>
  );
}
