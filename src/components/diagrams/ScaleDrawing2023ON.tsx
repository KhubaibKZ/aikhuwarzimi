import React, { useMemo, useState } from 'react';

// Q12 – Scale drawing for 4024/11 Oct/Nov 2023
// Two boats A (lower-left) and B (upper-right) with North arrows, line AB inclined as in the original paper.
// Interactive tools: a "compass" to drop arcs from A and B (then connect intersections → perpendicular bisector),
// and a "protractor" at A to mark a bearing of 105°.

type Arc = { cx: number; cy: number; r: number; from: 'A' | 'B' };

export function ScaleDrawing2023ON() {
  const width = 520;
  const height = 360;

  // Inclined AB: A bottom-left, B upper-right (matches the original paper photo)
  const A = { x: 110, y: 250 };
  const B = { x: 430, y: 130 };

  // Geometry helpers
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const ABlen = Math.hypot(dx, dy);
  const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

  // Compass state
  const [radius, setRadius] = useState(180); // > AB/2 by default
  const [arcs, setArcs] = useState<Arc[]>([]);
  const hasArcA = arcs.some(a => a.from === 'A');
  const hasArcB = arcs.some(a => a.from === 'B');

  // Intersection of two circles centred at A and B with given radii
  const intersections = useMemo(() => {
    const arcA = arcs.find(a => a.from === 'A');
    const arcB = arcs.find(a => a.from === 'B');
    if (!arcA || !arcB) return null;
    const d = ABlen;
    const r1 = arcA.r;
    const r2 = arcB.r;
    if (d > r1 + r2 || d < Math.abs(r1 - r2)) return null;
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h2 = r1 * r1 - a * a;
    if (h2 < 0) return null;
    const h = Math.sqrt(h2);
    const px = A.x + (a * dx) / d;
    const py = A.y + (a * dy) / d;
    const ux = -dy / d;
    const uy = dx / d;
    return [
      { x: px + h * ux, y: py + h * uy },
      { x: px - h * ux, y: py - h * uy },
    ];
  }, [arcs, A.x, A.y, dx, dy, ABlen]);

  const [showBisector, setShowBisector] = useState(false);
  const canBisect = !!intersections;

  // Protractor state (centre at A, 0° = North)
  const [showProtractor, setShowProtractor] = useState(false);
  const [bearing, setBearing] = useState(105);
  const [showBearingLine, setShowBearingLine] = useState(false);

  // Convert bearing (0=N clockwise) to SVG endpoint from A
  const bearingRad = ((bearing - 90) * Math.PI) / 180;
  const bearingLen = 320;
  const bearingEnd = {
    x: A.x + bearingLen * Math.cos(bearingRad),
    y: A.y + bearingLen * Math.sin(bearingRad),
  };

  // S = intersection of bearing line and perpendicular bisector of AB
  const S = useMemo(() => {
    if (!showBisector || !showBearingLine || !intersections) return null;
    // Perpendicular bisector passes through mid with direction (-dy, dx)
    const px = mid.x;
    const py = mid.y;
    const vx = -dy;
    const vy = dx;
    // Bearing line: A + t*(cos,sin)
    const cx = Math.cos(bearingRad);
    const cy = Math.sin(bearingRad);
    // Solve A + t*(cx,cy) = mid + s*(vx,vy)
    const det = cx * vy - cy * vx;
    if (Math.abs(det) < 1e-6) return null;
    const t = ((px - A.x) * vy - (py - A.y) * vx) / det;
    return { x: A.x + t * cx, y: A.y + t * cy };
  }, [showBisector, showBearingLine, intersections, mid.x, mid.y, dx, dy, bearingRad, A.x, A.y]);

  const dropArc = (from: 'A' | 'B') => {
    const c = from === 'A' ? A : B;
    setArcs(prev => [...prev.filter(a => a.from !== from), { cx: c.x, cy: c.y, r: radius, from }]);
  };

  const reset = () => {
    setArcs([]);
    setShowBisector(false);
    setShowProtractor(false);
    setShowBearingLine(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-sm font-semibold text-foreground">Scale drawing — 1 : 20 000</h4>
        <button
          onClick={reset}
          className="text-xs px-2 py-1 rounded border border-border bg-muted text-muted-foreground hover:bg-muted/70"
        >
          Reset construction
        </button>
      </div>

      {/* Compass controls */}
      <div className="rounded border border-border bg-muted/30 p-2 space-y-2">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="font-semibold text-foreground">🧭 Compass</span>
          <label className="flex items-center gap-1 text-muted-foreground">
            Radius
            <input
              type="range"
              min={Math.ceil(ABlen / 2) + 5}
              max={260}
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              className="accent-primary"
            />
            <span className="tabular-nums w-10 text-foreground">{radius}px</span>
          </label>
          <button
            onClick={() => dropArc('A')}
            className={`px-2 py-1 rounded border ${hasArcA ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}
          >
            Arc from A
          </button>
          <button
            onClick={() => dropArc('B')}
            className={`px-2 py-1 rounded border ${hasArcB ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}
          >
            Arc from B
          </button>
          <button
            onClick={() => setShowBisector(v => !v)}
            disabled={!canBisect}
            className={`px-2 py-1 rounded border ${showBisector ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-foreground border-border'} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Connect intersections (bisector)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="font-semibold text-foreground">📐 Protractor</span>
          <button
            onClick={() => setShowProtractor(v => !v)}
            className={`px-2 py-1 rounded border ${showProtractor ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}
          >
            {showProtractor ? 'Hide protractor at A' : 'Show protractor at A'}
          </button>
          <label className="flex items-center gap-1 text-muted-foreground">
            Bearing
            <input
              type="number"
              min={0}
              max={360}
              value={bearing}
              onChange={e => setBearing(Math.max(0, Math.min(360, Number(e.target.value))))}
              className="w-16 px-1 py-0.5 rounded border border-border bg-background text-foreground"
            />
            °
          </label>
          <button
            onClick={() => setShowBearingLine(v => !v)}
            className={`px-2 py-1 rounded border ${showBearingLine ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-foreground border-border'}`}
          >
            Mark bearing line
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full bg-background rounded border border-border">
        {/* North arrows */}
        {[A, B].map((P, i) => (
          <g key={i}>
            <line x1={P.x} y1={P.y} x2={P.x} y2={P.y - 70} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
            <polygon points={`${P.x - 5},${P.y - 65} ${P.x + 5},${P.y - 65} ${P.x},${P.y - 75}`} fill="hsl(var(--foreground))" />
            <text x={P.x - 18} y={P.y - 80} fontSize="11" fill="hsl(var(--foreground))">North</text>
          </g>
        ))}

        {/* Inclined line AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth={1.5} />

        {/* Construction arcs (full circles, dashed) */}
        {arcs.map((a, i) => (
          <circle
            key={i}
            cx={a.cx}
            cy={a.cy}
            r={a.r}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.7}
          />
        ))}

        {/* Intersection markers */}
        {intersections && intersections.map((p, i) => (
          <g key={i}>
            <line x1={p.x - 5} y1={p.y - 5} x2={p.x + 5} y2={p.y + 5} stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <line x1={p.x - 5} y1={p.y + 5} x2={p.x + 5} y2={p.y - 5} stroke="hsl(var(--primary))" strokeWidth={1.5} />
          </g>
        ))}

        {/* Perpendicular bisector through intersections */}
        {showBisector && intersections && (() => {
          const [p1, p2] = intersections;
          const ux = p2.x - p1.x;
          const uy = p2.y - p1.y;
          const len = Math.hypot(ux, uy) || 1;
          const ex = (ux / len) * 240;
          const ey = (uy / len) * 240;
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          return (
            <line
              x1={mx - ex}
              y1={my - ey}
              x2={mx + ex}
              y2={my + ey}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          );
        })()}

        {/* Protractor at A (semicircle with degree ticks, 0° aligned to North) */}
        {showProtractor && (
          <g opacity={0.85}>
            <circle cx={A.x} cy={A.y} r={90} fill="hsl(var(--accent) / 0.08)" stroke="hsl(var(--accent))" strokeWidth={1} />
            {/* Tick marks every 10°, labels every 30° */}
            {Array.from({ length: 37 }).map((_, i) => {
              const deg = i * 10;
              const rad = ((deg - 90) * Math.PI) / 180;
              const r1 = 90;
              const r2 = deg % 30 === 0 ? 78 : 84;
              const x1 = A.x + r1 * Math.cos(rad);
              const y1 = A.y + r1 * Math.sin(rad);
              const x2 = A.x + r2 * Math.cos(rad);
              const y2 = A.y + r2 * Math.sin(rad);
              return (
                <g key={deg}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--accent))" strokeWidth={0.8} />
                  {deg % 30 === 0 && deg < 360 && (
                    <text
                      x={A.x + 70 * Math.cos(rad)}
                      y={A.y + 70 * Math.sin(rad) + 3}
                      fontSize="8"
                      textAnchor="middle"
                      fill="hsl(var(--accent))"
                    >
                      {deg}
                    </text>
                  )}
                </g>
              );
            })}
            {/* Pointer at current bearing */}
            <line
              x1={A.x}
              y1={A.y}
              x2={A.x + 90 * Math.cos(bearingRad)}
              y2={A.y + 90 * Math.sin(bearingRad)}
              stroke="hsl(var(--accent))"
              strokeWidth={1.5}
            />
          </g>
        )}

        {/* Bearing line drawn from A */}
        {showBearingLine && (
          <g>
            <line
              x1={A.x}
              y1={A.y}
              x2={bearingEnd.x}
              y2={bearingEnd.y}
              stroke="hsl(var(--accent))"
              strokeWidth={2}
            />
            <text
              x={A.x + 50 * Math.cos(bearingRad - 0.2)}
              y={A.y + 50 * Math.sin(bearingRad - 0.2)}
              fontSize="11"
              fill="hsl(var(--accent))"
            >
              {bearing}°
            </text>
          </g>
        )}

        {/* Mark S at intersection if both bisector and bearing shown */}
        {S && (
          <g>
            <circle cx={S.x} cy={S.y} r={4} fill="hsl(var(--primary))" />
            <text x={S.x + 8} y={S.y + 4} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">S</text>
          </g>
        )}

        {/* Points A and B */}
        <circle cx={A.x} cy={A.y} r={3.5} fill="hsl(var(--foreground))" />
        <text x={A.x - 14} y={A.y + 14} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">A</text>
        <circle cx={B.x} cy={B.y} r={3.5} fill="hsl(var(--foreground))" />
        <text x={B.x + 8} y={B.y + 5} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">B</text>

        {/* Scale label */}
        <text x={width - 8} y={height - 8} fontSize="11" textAnchor="end" fill="hsl(var(--muted-foreground))">
          Scale 1 : 20 000
        </text>
      </svg>

      <div className="text-xs text-muted-foreground bg-muted/40 border border-border rounded p-2 space-y-1">
        <p><strong className="text-foreground">Measured length on the original paper:</strong> AB = 8.8 – 9.2 cm.</p>
        <p>(b) Choose a radius greater than ½ AB, drop an arc from A and an arc from B, then connect the two intersection points to draw the perpendicular bisector.</p>
        <p>(c) Show the protractor at A (0° points North), set the bearing to 105°, then mark the bearing line. S is where it meets the bisector.</p>
      </div>
    </div>
  );
}
