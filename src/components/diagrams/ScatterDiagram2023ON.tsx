import React, { useState, useEffect } from 'react';

// Q9 – Scatter diagram for 4024/11 Oct/Nov 2023
// Student draws their own line of best fit by clicking two endpoints,
// then can click anywhere along the X-axis to read the corresponding Y.

type Pt = { x: number; y: number };

export function ScatterDiagram2023ON() {
  const points: Pt[] = [
    { x: 10, y: 0.07 }, { x: 15, y: 0.08 }, { x: 20, y: 0.09 },
    { x: 25, y: 0.10 }, { x: 25, y: 0.12 }, { x: 30, y: 0.12 },
    { x: 30, y: 0.13 }, { x: 35, y: 0.14 }, { x: 40, y: 0.15 },
    { x: 45, y: 0.16 }, { x: 50, y: 0.17 }, { x: 55, y: 0.18 },
    { x: 60, y: 0.19 }, { x: 60, y: 0.21 }, { x: 65, y: 0.20 },
    { x: 70, y: 0.22 }, { x: 75, y: 0.21 }, { x: 80, y: 0.24 },
    { x: 85, y: 0.25 },
  ];

  const padding = { left: 60, right: 20, top: 15, bottom: 45 };
  const width = 440, height = 340;
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const xMin = 0, xMax = 90, yMin = 0, yMax = 0.25;

  const scaleX = (v: number) => padding.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const scaleY = (v: number) => padding.top + ((yMax - v) / (yMax - yMin)) * plotH;
  const unscaleX = (px: number) => xMin + ((px - padding.left) / plotW) * (xMax - xMin);
  const unscaleY = (py: number) => yMax - ((py - padding.top) / plotH) * (yMax - yMin);

  // Drawing mode: 'line' to set two endpoints, 'read' to read values
  const [mode, setMode] = useState<'line' | 'read'>('line');
  const [linePts, setLinePts] = useState<Pt[]>([]);
  const [reading, setReading] = useState<Pt | null>(null);

  const lineReady = linePts.length === 2;
  const slope = lineReady ? (linePts[1].y - linePts[0].y) / (linePts[1].x - linePts[0].x) : 0;
  const intercept = lineReady ? linePts[0].y - slope * linePts[0].x : 0;
  const getYOnLine = (x: number) => slope * x + intercept;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (width / rect.width);
    const py = (e.clientY - rect.top) * (height / rect.height);
    const xVal = unscaleX(px);
    const yVal = unscaleY(py);
    if (xVal < xMin || xVal > xMax) return;

    if (mode === 'line') {
      if (linePts.length >= 2) return;
      const next = [...linePts, { x: xVal, y: yVal }];
      setLinePts(next);
      if (next.length === 2) setMode('read');
    } else {
      if (!lineReady) return;
      const sx = Math.round(xVal);
      const sy = getYOnLine(sx);
      if (sy < yMin || sy > yMax) return;
      setReading({ x: sx, y: sy });
    }
  };

  const resetLine = () => { setLinePts([]); setReading(null); setMode('line'); };

  const xTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const yTicks = [0, 0.05, 0.10, 0.15, 0.20, 0.25];

  // Clip line to plot area
  const lineEnds = (() => {
    if (!lineReady) return null;
    const xs: Pt[] = [];
    const tryX = (x: number) => {
      const y = getYOnLine(x);
      if (y >= yMin && y <= yMax) xs.push({ x, y });
    };
    tryX(xMin); tryX(xMax);
    const tryY = (y: number) => {
      if (slope === 0) return;
      const x = (y - intercept) / slope;
      if (x >= xMin && x <= xMax) xs.push({ x, y });
    };
    tryY(yMin); tryY(yMax);
    if (xs.length < 2) return null;
    xs.sort((a, b) => a.x - b.x);
    return [xs[0], xs[xs.length - 1]];
  })();

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <div className="flex items-center gap-2 text-xs">
        <span className={`px-2 py-1 rounded ${mode === 'line' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          {linePts.length === 0 ? 'Click 1st point of your line' : linePts.length === 1 ? 'Click 2nd point of your line' : 'Line drawn — click on graph to read'}
        </span>
        <button onClick={resetLine} className="px-2 py-1 rounded border border-border bg-background text-foreground hover:bg-muted">
          {lineReady ? 'Redraw line' : 'Reset'}
        </button>
      </div>

      <svg
        width={width} height={height} viewBox={`0 0 ${width} ${height}`}
        className="border border-border rounded-lg bg-background cursor-crosshair select-none"
        onClick={handleClick}
      >
        {xTicks.map(v => (
          <line key={`xg${v}`} x1={scaleX(v)} y1={scaleY(yMin)} x2={scaleX(v)} y2={scaleY(yMax)}
            stroke="hsl(var(--border))" strokeWidth="0.5" />
        ))}
        {yTicks.map(v => (
          <line key={`yg${v}`} x1={scaleX(xMin)} y1={scaleY(v)} x2={scaleX(xMax)} y2={scaleY(v)}
            stroke="hsl(var(--border))" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 18 }, (_, i) => (i + 1) * 5).filter(v => !xTicks.includes(v)).map(v => (
          <line key={`xmg${v}`} x1={scaleX(v)} y1={scaleY(yMin)} x2={scaleX(v)} y2={scaleY(yMax)}
            stroke="hsl(var(--border))" strokeWidth="0.25" opacity={0.5} />
        ))}

        <line x1={scaleX(xMin)} y1={scaleY(yMin)} x2={scaleX(xMax)} y2={scaleY(yMin)}
          stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1={scaleX(xMin)} y1={scaleY(yMin)} x2={scaleX(xMin)} y2={scaleY(yMax)}
          stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {xTicks.map(v => (
          <text key={`xl${v}`} x={scaleX(v)} y={scaleY(yMin) + 16} textAnchor="middle"
            fontSize="10" fill="hsl(var(--muted-foreground))">{v}</text>
        ))}
        {yTicks.map(v => (
          <text key={`yl${v}`} x={padding.left - 8} y={scaleY(v) + 4} textAnchor="end"
            fontSize="10" fill="hsl(var(--muted-foreground))">{v.toFixed(2)}</text>
        ))}

        <text x={width / 2} y={height - 4} textAnchor="middle" fontSize="12"
          fill="hsl(var(--foreground))" fontWeight="500">Age (years)</text>
        <text x="14" y={height / 2} textAnchor="middle" fontSize="12"
          fill="hsl(var(--foreground))" fontWeight="500"
          transform={`rotate(-90, 14, ${height / 2})`}>Time (minutes)</text>

        {/* Data points as × marks */}
        {points.map((p, i) => (
          <g key={i}>
            <line x1={scaleX(p.x) - 4} y1={scaleY(p.y) - 4} x2={scaleX(p.x) + 4} y2={scaleY(p.y) + 4}
              stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <line x1={scaleX(p.x) + 4} y1={scaleY(p.y) - 4} x2={scaleX(p.x) - 4} y2={scaleY(p.y) + 4}
              stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          </g>
        ))}

        {/* Endpoints chosen by student */}
        {linePts.map((p, i) => (
          <circle key={`ep${i}`} cx={scaleX(p.x)} cy={scaleY(p.y)} r={5}
            fill="hsl(var(--primary))" stroke="white" strokeWidth="1.5" />
        ))}

        {/* Student's line of best fit */}
        {lineEnds && (
          <line
            x1={scaleX(lineEnds[0].x)} y1={scaleY(lineEnds[0].y)}
            x2={scaleX(lineEnds[1].x)} y2={scaleY(lineEnds[1].y)}
            stroke="hsl(var(--primary))" strokeWidth="2"
          />
        )}

        {/* Reading lines */}
        {reading && lineReady && (
          <g>
            <line x1={scaleX(reading.x)} y1={scaleY(yMin)} x2={scaleX(reading.x)} y2={scaleY(reading.y)}
              stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="6,3" />
            <line x1={scaleX(xMin)} y1={scaleY(reading.y)} x2={scaleX(reading.x)} y2={scaleY(reading.y)}
              stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="6,3" />
            <circle cx={scaleX(reading.x)} cy={scaleY(reading.y)} r={5}
              fill="hsl(var(--destructive))" stroke="white" strokeWidth="2" />
            <rect x={scaleX(reading.x) + 8} y={scaleY(reading.y) - 22} width={90} height={18} rx={4}
              fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x={scaleX(reading.x) + 12} y={scaleY(reading.y) - 8}
              fontSize="10" fontWeight="600" fill="hsl(var(--foreground))">
              ({reading.x}, {reading.y.toFixed(2)})
            </text>
          </g>
        )}
      </svg>

      {reading && lineReady && (
        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
          At age <span className="font-bold">{reading.x}</span> → Time ≈ <span className="font-bold">{reading.y.toFixed(2)}</span> minutes
        </div>
      )}
    </div>
  );
}
