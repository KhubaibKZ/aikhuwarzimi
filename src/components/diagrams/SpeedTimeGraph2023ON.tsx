// Speed-time graph for Q19 4024/11 Oct/Nov 2023
// Car accelerates from 0 to 20 m/s in 10 seconds, then constant speed

const CX = 60;
const CY = 20;
const CW = 240;
const CH = 160;

export function SpeedTimeGraph2023ON() {
  // Scale: x: 0-T (show up to 50s), y: 0-25
  const maxT = 50;
  const maxV = 25;
  const sx = CW / maxT;
  const sy = CH / maxV;

  const p0 = { x: CX, y: CY + CH };
  const p1 = { x: CX + 10 * sx, y: CY + CH - 20 * sy };
  const p2 = { x: CX + 45 * sx, y: CY + CH - 20 * sy };

  return (
    <svg viewBox="0 0 340 240" className="w-full max-w-sm mx-auto">
      {/* Grid */}
      {[5, 10, 15, 20, 25].map(v => {
        const y = CY + CH - v * sy;
        return (
          <g key={v}>
            <line x1={CX} y1={y} x2={CX + CW} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={CX - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-muted-foreground">{v}</text>
          </g>
        );
      })}
      {[10, 20, 30, 40, 50].map(t => {
        const x = CX + t * sx;
        return (
          <g key={t}>
            <line x1={x} y1={CY} x2={x} y2={CY + CH} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1={x} y1={CY + CH} x2={x} y2={CY + CH + 5} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x={x} y={CY + CH + 16} textAnchor="middle" className="text-[10px] fill-foreground">{t}</text>
          </g>
        );
      })}

      {/* Speed-time line */}
      <polyline
        points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`}
        fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
      />

      {/* T label on x-axis */}
      <text x={p2.x} y={CY + CH + 16} textAnchor="middle" className="text-[11px] fill-foreground font-bold italic">T</text>

      {/* Axes */}
      <line x1={CX} y1={CY + CH} x2={CX + CW} y2={CY + CH} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={CX} y1={CY} x2={CX} y2={CY + CH} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      <text x={CX - 8} y={CY + CH + 4} textAnchor="end" className="text-[10px] fill-muted-foreground">0</text>

      {/* Axis titles */}
      <text x={CX + CW / 2} y={CY + CH + 34} textAnchor="middle" className="text-[11px] fill-foreground font-medium">Time (seconds)</text>
      <text x={14} y={CY + CH / 2} textAnchor="middle" className="text-[11px] fill-foreground font-medium" transform={`rotate(-90, 14, ${CY + CH / 2})`}>Speed (m/s)</text>
    </svg>
  );
}
