import React from 'react';

interface NumberLineDiagramProps {
  min: number;
  max: number;
  leftBound: number;
  rightBound: number;
  leftInclusive: boolean;
  rightInclusive: boolean;
}

export function NumberLineDiagram({
  min,
  max,
  leftBound,
  rightBound,
  leftInclusive,
  rightInclusive
}: NumberLineDiagramProps) {
  const width = 300;
  const height = 60;
  const padding = 30;
  const lineY = 35;
  
  const range = max - min;
  const scale = (width - 2 * padding) / range;
  
  const toX = (value: number) => padding + (value - min) * scale;

  // Generate tick marks
  const ticks = [];
  for (let i = min; i <= max; i++) {
    ticks.push(i);
  }

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Main line */}
        <line
          x1={padding - 10}
          y1={lineY}
          x2={width - padding + 10}
          y2={lineY}
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Arrow heads */}
        <polygon
          points={`${padding - 15},${lineY} ${padding - 5},${lineY - 5} ${padding - 5},${lineY + 5}`}
          fill="hsl(var(--foreground))"
        />
        <polygon
          points={`${width - padding + 15},${lineY} ${width - padding + 5},${lineY - 5} ${width - padding + 5},${lineY + 5}`}
          fill="hsl(var(--foreground))"
        />

        {/* Tick marks and labels */}
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={toX(tick)}
              y1={lineY - 5}
              x2={toX(tick)}
              y2={lineY + 5}
              stroke="hsl(var(--foreground))"
              strokeWidth={1}
            />
            <text
              x={toX(tick)}
              y={lineY + 18}
              fontSize={10}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Highlighted region */}
        <line
          x1={toX(leftBound)}
          y1={lineY}
          x2={toX(rightBound)}
          y2={lineY}
          stroke="hsl(var(--primary))"
          strokeWidth={4}
        />

        {/* Left bound circle */}
        <circle
          cx={toX(leftBound)}
          cy={lineY}
          r={6}
          fill={leftInclusive ? "hsl(var(--primary))" : "hsl(var(--background))"}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />

        {/* Right bound circle */}
        <circle
          cx={toX(rightBound)}
          cy={lineY}
          r={6}
          fill={rightInclusive ? "hsl(var(--primary))" : "hsl(var(--background))"}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
