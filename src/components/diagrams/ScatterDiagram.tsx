// Q18 - Scatter diagram for 0580/11 MJ 2020
// Shows Test 1 (x-axis) vs Test 2 (y-axis) marks

export function ScatterDiagram() {
  // Data points extracted from the exam paper scatter plot
  const points = [
    { x: 10, y: 25 },
    { x: 15, y: 20 },
    { x: 20, y: 23 },
    { x: 25, y: 28 },
    { x: 25, y: 30 },
    { x: 30, y: 38 },
    { x: 35, y: 40 },
    { x: 35, y: 45 },
    { x: 40, y: 48 },
    { x: 40, y: 52 },
    { x: 42, y: 50 },
    { x: 45, y: 50 },
    { x: 45, y: 53 },
    { x: 48, y: 55 },
    { x: 50, y: 60 },
    { x: 50, y: 58 },
    { x: 52, y: 62 },
    { x: 55, y: 60 },
    { x: 55, y: 63 },
    { x: 58, y: 65 },
    { x: 60, y: 60 },
    { x: 60, y: 68 },
    { x: 62, y: 68 },
    { x: 65, y: 70 },
    { x: 65, y: 68 },
    { x: 66, y: 72 },
  ];

  const padding = 50;
  const width = 380;
  const height = 340;
  const plotW = width - padding - 20;
  const plotH = height - padding - 20;

  const xScale = (v: number) => padding + (v / 70) * plotW;
  const yScale = (v: number) => height - padding - (v / 80) * plotH;

  return (
    <div className="flex justify-center py-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="border border-border rounded-lg bg-background p-1">
        {/* Grid lines */}
        {[0, 10, 20, 30, 40, 50, 60, 70].map(v => (
          <g key={`x${v}`}>
            <line x1={xScale(v)} y1={yScale(0)} x2={xScale(v)} y2={yScale(70)} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={xScale(v)} y={height - padding + 16} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}
        {[0, 10, 20, 30, 40, 50, 60, 70].map(v => (
          <g key={`y${v}`}>
            <line x1={xScale(0)} y1={yScale(v)} x2={xScale(70)} y2={yScale(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={padding - 8} y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}

        {/* Axes */}
        <line x1={xScale(0)} y1={yScale(0)} x2={xScale(70)} y2={yScale(0)} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1={xScale(0)} y1={yScale(0)} x2={xScale(0)} y2={yScale(70)} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Axis labels */}
        <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" className="select-none">Test 1</text>
        <text x="12" y={height / 2} textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" className="select-none" transform={`rotate(-90, 12, ${height / 2})`}>Test 2</text>

        {/* Data points as × marks */}
        {points.map((p, i) => (
          <g key={i}>
            <line x1={xScale(p.x) - 4} y1={yScale(p.y) - 4} x2={xScale(p.x) + 4} y2={yScale(p.y) + 4} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <line x1={xScale(p.x) + 4} y1={yScale(p.y) - 4} x2={xScale(p.x) - 4} y2={yScale(p.y) + 4} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
