import React, { useState } from 'react';

// Q9 – Scatter diagram for 4024/11 Oct/Nov 2023
// Age (years) vs Time (minutes) with interactive line-of-best-fit reading

export function ScatterDiagram2023ON() {
  const [xLine, setXLine] = useState<number | null>(null);
  const [yLine, setYLine] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Data points from the exam paper scatter plot
  const points = [
    { x: 10, y: 0.07 },
    { x: 15, y: 0.08 },
    { x: 20, y: 0.09 },
    { x: 25, y: 0.10 },
    { x: 25, y: 0.12 },
    { x: 30, y: 0.12 },
    { x: 30, y: 0.13 },
    { x: 35, y: 0.14 },
    { x: 40, y: 0.15 },
    { x: 45, y: 0.16 },
    { x: 50, y: 0.17 },
    { x: 55, y: 0.18 },
    { x: 60, y: 0.19 },
    { x: 60, y: 0.21 },
    { x: 65, y: 0.20 },
    { x: 70, y: 0.22 },
    { x: 75, y: 0.21 },
    { x: 80, y: 0.24 },
    { x: 85, y: 0.25 },
  ];

  // Line of best fit: approximate from (10, 0.065) to (85, 0.25)
  const lineStart = { x: 5, y: 0.05 };
  const lineEnd = { x: 90, y: 0.27 };
  const lineSlope = (lineEnd.y - lineStart.y) / (lineEnd.x - lineStart.x);
  const lineIntercept = lineStart.y - lineSlope * lineStart.x;

  const padding = { left: 60, right: 20, top: 15, bottom: 45 };
  const width = 440;
  const height = 340;
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const xMin = 0, xMax = 90;
  const yMin = 0, yMax = 0.25;

  const scaleX = (v: number) => padding.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const scaleY = (v: number) => padding.top + ((yMax - v) / (yMax - yMin)) * plotH;
  const unscaleX = (px: number) => xMin + ((px - padding.left) / plotW) * (xMax - xMin);

  const getYOnLine = (x: number) => lineSlope * x + lineIntercept;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const xVal = unscaleX(px);
    
    if (xVal >= xMin && xVal <= xMax) {
      const snappedX = Math.round(xVal);
      const yOnLine = getYOnLine(snappedX);
      if (yOnLine >= yMin && yOnLine <= yMax) {
        setXLine(snappedX);
        setYLine(yOnLine);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    handleClick(e);
  };

  const xTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const yTicks = [0, 0.05, 0.10, 0.15, 0.20, 0.25];

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="border border-border rounded-lg bg-background cursor-crosshair select-none"
        onClick={handleClick}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Grid lines */}
        {xTicks.map(v => (
          <line key={`xg${v}`} x1={scaleX(v)} y1={scaleY(yMin)} x2={scaleX(v)} y2={scaleY(yMax)}
            stroke="hsl(var(--border))" strokeWidth="0.5" />
        ))}
        {yTicks.map(v => (
          <line key={`yg${v}`} x1={scaleX(xMin)} y1={scaleY(v)} x2={scaleX(xMax)} y2={scaleY(v)}
            stroke="hsl(var(--border))" strokeWidth="0.5" />
        ))}

        {/* Minor grid */}
        {Array.from({ length: 18 }, (_, i) => (i + 1) * 5).filter(v => !xTicks.includes(v)).map(v => (
          <line key={`xmg${v}`} x1={scaleX(v)} y1={scaleY(yMin)} x2={scaleX(v)} y2={scaleY(yMax)}
            stroke="hsl(var(--border))" strokeWidth="0.25" opacity={0.5} />
        ))}

        {/* Axes */}
        <line x1={scaleX(xMin)} y1={scaleY(yMin)} x2={scaleX(xMax)} y2={scaleY(yMin)}
          stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1={scaleX(xMin)} y1={scaleY(yMin)} x2={scaleX(xMin)} y2={scaleY(yMax)}
          stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* X-axis labels */}
        {xTicks.map(v => (
          <text key={`xl${v}`} x={scaleX(v)} y={scaleY(yMin) + 16} textAnchor="middle"
            fontSize="10" fill="hsl(var(--muted-foreground))">{v}</text>
        ))}

        {/* Y-axis labels */}
        {yTicks.map(v => (
          <text key={`yl${v}`} x={padding.left - 8} y={scaleY(v) + 4} textAnchor="end"
            fontSize="10" fill="hsl(var(--muted-foreground))">{v.toFixed(2)}</text>
        ))}

        {/* Axis titles */}
        <text x={width / 2} y={height - 4} textAnchor="middle" fontSize="12"
          fill="hsl(var(--foreground))" fontWeight="500">Age (years)</text>
        <text x="14" y={height / 2} textAnchor="middle" fontSize="12"
          fill="hsl(var(--foreground))" fontWeight="500"
          transform={`rotate(-90, 14, ${height / 2})`}>Time (minutes)</text>

        {/* Line of best fit */}
        <line
          x1={scaleX(Math.max(xMin, lineStart.x))}
          y1={scaleY(getYOnLine(Math.max(xMin, lineStart.x)))}
          x2={scaleX(Math.min(xMax, lineEnd.x))}
          y2={scaleY(getYOnLine(Math.min(xMax, lineEnd.x)))}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity={0.6}
        />

        {/* Data points as × marks */}
        {points.map((p, i) => (
          <g key={i}>
            <line x1={scaleX(p.x) - 4} y1={scaleY(p.y) - 4} x2={scaleX(p.x) + 4} y2={scaleY(p.y) + 4}
              stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <line x1={scaleX(p.x) + 4} y1={scaleY(p.y) - 4} x2={scaleX(p.x) - 4} y2={scaleY(p.y) + 4}
              stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          </g>
        ))}

        {/* Interactive reading lines */}
        {xLine !== null && yLine !== null && (
          <g>
            {/* Vertical line from x-axis to line of best fit */}
            <line
              x1={scaleX(xLine)} y1={scaleY(yMin)}
              x2={scaleX(xLine)} y2={scaleY(yLine)}
              stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="6,3"
            />
            {/* Horizontal line from y-axis to line of best fit */}
            <line
              x1={scaleX(xMin)} y1={scaleY(yLine)}
              x2={scaleX(xLine)} y2={scaleY(yLine)}
              stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="6,3"
            />
            {/* Point on line */}
            <circle
              cx={scaleX(xLine)} cy={scaleY(yLine)}
              r={5} fill="hsl(var(--destructive))" stroke="white" strokeWidth="2"
            />
            {/* Coordinate label */}
            <rect
              x={scaleX(xLine) + 8} y={scaleY(yLine) - 22}
              width={90} height={18} rx={4}
              fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1"
            />
            <text
              x={scaleX(xLine) + 12} y={scaleY(yLine) - 8}
              fontSize="10" fontWeight="600" fill="hsl(var(--foreground))"
            >
              ({xLine}, {yLine.toFixed(2)})
            </text>
          </g>
        )}
      </svg>

      <p className="text-xs text-muted-foreground">
        Click on the diagram to draw reading lines on the line of best fit
      </p>

      {xLine !== null && yLine !== null && (
        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
          At age <span className="font-bold">{xLine}</span> → Time ≈ <span className="font-bold">{yLine.toFixed(2)}</span> minutes
        </div>
      )}
    </div>
  );
}
