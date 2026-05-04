import React, { useState } from 'react';

// Q12 – Scale drawing for 4024/11 Oct/Nov 2023
// Two boats A and B with North arrows. Scale 1 : 20 000.
// Original paper line AB = 9.0 cm → 1.8 km in real life.
// Interactive helpers: toggle perpendicular bisector (b) and 105° bearing line from A (c).

export function ScaleDrawing2023ON() {
  const [showBisector, setShowBisector] = useState(false);
  const [showBearing, setShowBearing] = useState(false);

  const width = 480;
  const height = 280;

  // Position A and B horizontally with a span representing 9 cm on the original paper.
  // Note: pixel-to-cm cannot be guaranteed on screen, so the measured length is provided as a labelled fact.
  const A = { x: 90, y: 160 };
  const B = { x: 390, y: 160 };

  // Bearing 105° from A is measured clockwise from North → angle from +x axis = 90° - 105° = -15° below horizontal
  const bearingDeg = 105;
  const theta = (90 - bearingDeg) * Math.PI / 180; // standard math angle
  const bearingLen = 320;
  const bearingEnd = {
    x: A.x + bearingLen * Math.cos(theta),
    y: A.y - bearingLen * Math.sin(theta), // SVG y inverted
  };

  // Perpendicular bisector of AB → vertical line through midpoint
  const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

  // Intersection of perpendicular bisector (x = mid.x) with bearing line from A
  // Param: P(t) = A + t*(cos θ, -sin θ). Find t such that A.x + t cos θ = mid.x
  const tIntersect = (mid.x - A.x) / Math.cos(theta);
  const S = {
    x: A.x + tIntersect * Math.cos(theta),
    y: A.y - tIntersect * Math.sin(theta),
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-sm font-semibold text-foreground">Scale drawing — 1 : 20 000</h4>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setShowBisector(v => !v)}
            className={`px-2 py-1 rounded border ${showBisector ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border'}`}
          >
            (b) Perpendicular bisector
          </button>
          <button
            onClick={() => setShowBearing(v => !v)}
            className={`px-2 py-1 rounded border ${showBearing ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border'}`}
          >
            (c) Bearing 105° from A
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full bg-background rounded border border-border">
        {/* North arrow at A */}
        <g>
          <line x1={A.x} y1={A.y} x2={A.x} y2={A.y - 60} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <polygon points={`${A.x - 5},${A.y - 55} ${A.x + 5},${A.y - 55} ${A.x},${A.y - 65}`} fill="hsl(var(--foreground))" />
          <text x={A.x - 4} y={A.y - 70} fontSize="11" fill="hsl(var(--foreground))">N</text>
        </g>
        {/* North arrow at B */}
        <g>
          <line x1={B.x} y1={B.y} x2={B.x} y2={B.y - 60} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <polygon points={`${B.x - 5},${B.y - 55} ${B.x + 5},${B.y - 55} ${B.x},${B.y - 65}`} fill="hsl(var(--foreground))" />
          <text x={B.x - 4} y={B.y - 70} fontSize="11" fill="hsl(var(--foreground))">N</text>
        </g>

        {/* Line AB */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth={1.5} />

        {/* Perpendicular bisector with construction arcs */}
        {showBisector && (
          <g stroke="hsl(var(--primary))" strokeWidth={1.5} fill="none">
            {/* Construction arcs from A and B (radius > AB/2) */}
            <path d={`M ${A.x + 200} ${A.y - 110} A 200 200 0 0 1 ${A.x + 200} ${A.y + 110}`} strokeDasharray="3 3" opacity={0.7} />
            <path d={`M ${B.x - 200} ${B.y - 110} A 200 200 0 0 0 ${B.x - 200} ${B.y + 110}`} strokeDasharray="3 3" opacity={0.7} />
            {/* The bisector line */}
            <line x1={mid.x} y1={20} x2={mid.x} y2={height - 20} stroke="hsl(var(--primary))" strokeWidth={2} />
          </g>
        )}

        {/* 105° bearing line from A */}
        {showBearing && (
          <g>
            <line x1={A.x} y1={A.y} x2={bearingEnd.x} y2={bearingEnd.y} stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 4" />
            <text x={A.x + 30} y={A.y + 16} fontSize="11" fill="hsl(var(--accent))">105°</text>
            {/* Arc showing angle from N at A */}
            <path d={`M ${A.x} ${A.y - 32} A 32 32 0 0 1 ${A.x + 32 * Math.cos(theta)} ${A.y - 32 * Math.sin(theta)}`}
                  fill="none" stroke="hsl(var(--accent))" strokeWidth={1} />
          </g>
        )}

        {/* Mark S at intersection if both helpers shown */}
        {showBisector && showBearing && (
          <g>
            <circle cx={S.x} cy={S.y} r={4} fill="hsl(var(--primary))" />
            <text x={S.x + 8} y={S.y + 4} fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">S</text>
          </g>
        )}

        {/* Points A and B */}
        <circle cx={A.x} cy={A.y} r={3.5} fill="hsl(var(--foreground))" />
        <text x={A.x - 14} y={A.y + 5} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">A</text>
        <circle cx={B.x} cy={B.y} r={3.5} fill="hsl(var(--foreground))" />
        <text x={B.x + 8} y={B.y + 5} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">B</text>

        {/* Scale label */}
        <text x={width / 2} y={height - 8} fontSize="11" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          Scale 1 : 20 000
        </text>
      </svg>

      <div className="text-xs text-muted-foreground bg-muted/40 border border-border rounded p-2 space-y-1">
        <p><strong className="text-foreground">Measured length on the original paper:</strong> AB = 9.0 cm (accept 8.8 – 9.2 cm).</p>
        <p>Use this with the scale 1 : 20 000 to find the real distance for part (a). Then use the toggles above to construct your bisector and bearing for parts (b) and (c).</p>
      </div>
    </div>
  );
}
