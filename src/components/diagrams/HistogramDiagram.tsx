import React from 'react';

// Histogram for Q3(d) 0580/43 MJ2021
// Heights of 200 plants grouped into class intervals
const bars = [
  { label: '60', width: 20, density: 1.5 },   // 60 ≤ h < 80
  { label: '80', width: 20, density: 3.5 },   // 80 ≤ h < 100
  { label: '100', width: 20, density: 2.5 },  // 100 ≤ h < 120
  { label: '120', width: 20, density: 1.0 },  // 120 ≤ h < 140
  { label: '140', width: 20, density: 0.5 },  // 140 ≤ h < 160
];

const CHART_X = 60;
const CHART_Y = 20;
const CHART_W = 260;
const CHART_H = 180;
const MAX_DENSITY = 4;

export function HistogramDiagram() {
  const scaleX = CHART_W / 100; // 60-160 = 100 range
  const scaleY = CHART_H / MAX_DENSITY;

  return (
    <svg viewBox="0 0 360 260" className="w-full max-w-md mx-auto">
      {/* Background */}
      <rect x="0" y="0" width="360" height="260" fill="none" />

      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map(d => {
        const y = CHART_Y + CHART_H - d * scaleY;
        return (
          <g key={d}>
            <line x1={CHART_X} y1={y} x2={CHART_X + CHART_W} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={CHART_X - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-muted-foreground">{d}</text>
          </g>
        );
      })}

      {/* Bars */}
      {bars.map((bar, i) => {
        const x = CHART_X + i * bar.width * scaleX;
        const barW = bar.width * scaleX;
        const barH = bar.density * scaleY;
        const y = CHART_Y + CHART_H - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          </g>
        );
      })}

      {/* X-axis */}
      <line x1={CHART_X} y1={CHART_Y + CHART_H} x2={CHART_X + CHART_W} y2={CHART_Y + CHART_H} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      {/* Y-axis */}
      <line x1={CHART_X} y1={CHART_Y} x2={CHART_X} y2={CHART_Y + CHART_H} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* X-axis labels */}
      {[60, 80, 100, 120, 140, 160].map((val, i) => {
        const x = CHART_X + (val - 60) * scaleX;
        return (
          <g key={val}>
            <line x1={x} y1={CHART_Y + CHART_H} x2={x} y2={CHART_Y + CHART_H + 5} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x={x} y={CHART_Y + CHART_H + 18} textAnchor="middle" className="text-[10px] fill-foreground">{val}</text>
          </g>
        );
      })}

      {/* Axis titles */}
      <text x={CHART_X + CHART_W / 2} y={CHART_Y + CHART_H + 38} textAnchor="middle" className="text-[11px] fill-foreground font-medium">Height (cm)</text>
      <text x={16} y={CHART_Y + CHART_H / 2} textAnchor="middle" className="text-[11px] fill-foreground font-medium" transform={`rotate(-90, 16, ${CHART_Y + CHART_H / 2})`}>Frequency density</text>
    </svg>
  );
}
