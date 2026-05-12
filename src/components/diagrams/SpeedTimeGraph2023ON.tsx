// Speed-time graph for Q19 4024/11 Oct/Nov 2023
// Car accelerates from 0 to 20 m/s in 10 seconds, then constant speed until time T
// NOT TO SCALE — matches exam paper diagram

const CX = 70;          // x of y-axis
const CY = 30;          // top padding
const CW = 260;         // chart width
const CH = 160;         // chart height

export function SpeedTimeGraph2023ON() {
  // Layout positions (visual, not to scale)
  const x10 = CX + 80;          // x position for t = 10
  const xT  = CX + CW - 20;     // x position for t = T
  const y20 = CY + 50;          // y position for speed = 20
  const yAxisBottom = CY + CH;  // y = 0 baseline
  const yAxisTop = CY - 10;     // top of y-axis (above 20 line)

  return (
    <svg viewBox="0 0 380 230" className="w-full max-w-md mx-auto">
      {/* Y-axis */}
      <line x1={CX} y1={yAxisTop} x2={CX} y2={yAxisBottom}
        stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      {/* Y-axis arrow */}
      <polygon points={`${CX - 4},${yAxisTop + 6} ${CX + 4},${yAxisTop + 6} ${CX},${yAxisTop - 4}`}
        fill="hsl(var(--foreground))" />

      {/* X-axis */}
      <line x1={CX} y1={yAxisBottom} x2={CX + CW} y2={yAxisBottom}
        stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      {/* X-axis arrow */}
      <polygon points={`${CX + CW - 6},${yAxisBottom - 4} ${CX + CW - 6},${yAxisBottom + 4} ${CX + CW + 4},${yAxisBottom}`}
        fill="hsl(var(--foreground))" />

      {/* Tick at 20 on y-axis */}
      <line x1={CX - 5} y1={y20} x2={CX} y2={y20}
        stroke="hsl(var(--foreground))" strokeWidth="1.2" />
      <text x={CX - 9} y={y20 + 4} textAnchor="end"
        className="text-[12px] fill-foreground">20</text>

      {/* Tick at 0 (origin) */}
      <line x1={CX - 5} y1={yAxisBottom} x2={CX} y2={yAxisBottom}
        stroke="hsl(var(--foreground))" strokeWidth="1.2" />
      <text x={CX - 9} y={yAxisBottom + 4} textAnchor="end"
        className="text-[12px] fill-foreground">0</text>

      {/* Tick at 10 on x-axis */}
      <line x1={x10} y1={yAxisBottom} x2={x10} y2={yAxisBottom + 5}
        stroke="hsl(var(--foreground))" strokeWidth="1.2" />
      <text x={x10} y={yAxisBottom + 18} textAnchor="middle"
        className="text-[12px] fill-foreground">10</text>

      {/* Tick at T on x-axis */}
      <line x1={xT} y1={yAxisBottom} x2={xT} y2={yAxisBottom + 5}
        stroke="hsl(var(--foreground))" strokeWidth="1.2" />
      <text x={xT} y={yAxisBottom + 18} textAnchor="middle"
        className="text-[12px] fill-foreground italic font-semibold">T</text>

      {/* Origin '0' under axes */}
      <text x={CX} y={yAxisBottom + 18} textAnchor="middle"
        className="text-[12px] fill-foreground">0</text>

      {/* Dotted line from (0,20) to (10,20) */}
      <line x1={CX} y1={y20} x2={x10} y2={y20}
        stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="4,3" />
      {/* Dotted line from (10,20) down to x-axis */}
      <line x1={x10} y1={y20} x2={x10} y2={yAxisBottom}
        stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="4,3" />
      {/* Dotted line from (T,20) down to x-axis */}
      <line x1={xT} y1={y20} x2={xT} y2={yAxisBottom}
        stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="4,3" />

      {/* Speed-time graph: solid line from (0,0) → (10,20) → (T,20) */}
      <polyline
        points={`${CX},${yAxisBottom} ${x10},${y20} ${xT},${y20}`}
        fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8"
      />

      {/* Axis labels */}
      <text x={CX - 50} y={CY + 70} textAnchor="middle"
        className="text-[12px] fill-foreground">Speed</text>
      <text x={CX - 50} y={CY + 86} textAnchor="middle"
        className="text-[12px] fill-foreground">(m/s)</text>

      <text x={CX + CW / 2} y={yAxisBottom + 38} textAnchor="middle"
        className="text-[12px] fill-foreground">Time (seconds)</text>

      {/* NOT TO SCALE label */}
      <text x={CX + CW + 10} y={CY + CH / 2} textAnchor="start"
        className="text-[10px] fill-muted-foreground">NOT TO</text>
      <text x={CX + CW + 10} y={CY + CH / 2 + 12} textAnchor="start"
        className="text-[10px] fill-muted-foreground">SCALE</text>
    </svg>
  );
}
