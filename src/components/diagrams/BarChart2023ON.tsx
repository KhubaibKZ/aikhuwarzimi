// Bar chart for Q5 4024/11 Oct/Nov 2023
// Yasmin asks 20 people how many pets they own
// Frequencies: 0 pets→3, 1→4, 2→7, 3→5, 4→1

const bars = [
  { pets: 0, freq: 3 },
  { pets: 1, freq: 4 },
  { pets: 2, freq: 7 },
  { pets: 3, freq: 5 },
  { pets: 4, freq: 1 },
];

const CX = 70;
const CY = 15;
const CW = 240;
const CH = 200;
const MAX_F = 8;

export function BarChart2023ON() {
  const barW = CW / 5 * 0.55;
  const gap = CW / 5;
  const scaleY = CH / MAX_F;

  return (
    <svg viewBox="0 0 350 280" className="w-full max-w-md mx-auto">
      {/* Background */}
      <rect x="0" y="0" width="350" height="280" fill="hsl(var(--card))" rx="4" />

      {/* Horizontal grid lines and Y-axis labels */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(v => {
        const y = CY + CH - v * scaleY;
        return (
          <g key={v}>
            <line x1={CX} y1={y} x2={CX + CW} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4,3" />
            <text x={CX - 10} y={y + 4} textAnchor="end" className="text-[12px] fill-foreground font-medium">{v}</text>
          </g>
        );
      })}

      {/* Bars — filled grey to match paper */}
      {bars.map((b, i) => {
        const x = CX + i * gap + (gap - barW) / 2;
        const h = b.freq * scaleY;
        const y = CY + CH - h;
        return (
          <rect key={i} x={x} y={y} width={barW} height={h}
            fill="hsl(var(--muted-foreground) / 0.25)" stroke="hsl(var(--foreground))" strokeWidth="1.2" />
        );
      })}

      {/* Y-axis */}
      <line x1={CX} y1={CY} x2={CX} y2={CY + CH} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      {/* Arrow on Y-axis */}
      <polygon points={`${CX},${CY - 6} ${CX - 4},${CY + 2} ${CX + 4},${CY + 2}`} fill="hsl(var(--foreground))" />

      {/* X-axis */}
      <line x1={CX} y1={CY + CH} x2={CX + CW + 8} y2={CY + CH} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Tick marks and X-axis labels */}
      {bars.map((b, i) => {
        const xCenter = CX + i * gap + gap / 2;
        return (
          <g key={i}>
            <line x1={xCenter} y1={CY + CH} x2={xCenter} y2={CY + CH + 5} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x={xCenter} y={CY + CH + 20} textAnchor="middle" className="text-[13px] fill-foreground font-medium">{b.pets}</text>
          </g>
        );
      })}

      {/* Axis titles */}
      <text x={CX + CW / 2} y={CY + CH + 40} textAnchor="middle" className="text-[13px] fill-foreground font-semibold">Number of pets</text>
      <text x={18} y={CY + CH / 2} textAnchor="middle" className="text-[13px] fill-foreground font-semibold" transform={`rotate(-90, 18, ${CY + CH / 2})`}>Frequency</text>
    </svg>
  );
}
