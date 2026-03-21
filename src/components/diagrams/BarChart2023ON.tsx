// Bar chart for Q5 4024/11 Oct/Nov 2023
// Yasmin asks 20 people how many pets they own
// Frequencies: 0 pets→2, 1→5, 2→4, 3→5, 4→4

const bars = [
  { pets: 0, freq: 2 },
  { pets: 1, freq: 5 },
  { pets: 2, freq: 4 },
  { pets: 3, freq: 5 },
  { pets: 4, freq: 4 },
];

const CX = 60;
const CY = 20;
const CW = 220;
const CH = 160;
const MAX_F = 6;

export function BarChart2023ON() {
  const barW = CW / 5 * 0.6;
  const gap = CW / 5;
  const scaleY = CH / MAX_F;

  return (
    <svg viewBox="0 0 320 230" className="w-full max-w-sm mx-auto">
      {/* Grid lines */}
      {[1, 2, 3, 4, 5, 6].map(v => {
        const y = CY + CH - v * scaleY;
        return (
          <g key={v}>
            <line x1={CX} y1={y} x2={CX + CW} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={CX - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-muted-foreground">{v}</text>
          </g>
        );
      })}
      <text x={CX - 8} y={CY + CH + 4} textAnchor="end" className="text-[10px] fill-muted-foreground">0</text>

      {/* Bars */}
      {bars.map((b, i) => {
        const x = CX + i * gap + (gap - barW) / 2;
        const h = b.freq * scaleY;
        const y = CY + CH - h;
        return (
          <rect key={i} x={x} y={y} width={barW} height={h}
            fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        );
      })}

      {/* Axes */}
      <line x1={CX} y1={CY + CH} x2={CX + CW} y2={CY + CH} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1={CX} y1={CY} x2={CX} y2={CY + CH} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* X labels */}
      {bars.map((b, i) => (
        <text key={i} x={CX + i * gap + gap / 2} y={CY + CH + 16} textAnchor="middle" className="text-[10px] fill-foreground">{b.pets}</text>
      ))}

      {/* Axis titles */}
      <text x={CX + CW / 2} y={CY + CH + 34} textAnchor="middle" className="text-[11px] fill-foreground font-medium">Number of pets</text>
      <text x={14} y={CY + CH / 2} textAnchor="middle" className="text-[11px] fill-foreground font-medium" transform={`rotate(-90, 14, ${CY + CH / 2})`}>Frequency</text>
    </svg>
  );
}
