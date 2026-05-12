// Vector parallelogram for Q23 4024/11 Oct/Nov 2023
// OABC parallelogram. O bottom-left, A top-left, B top-right, C bottom-right.
// OA = a, OC = c. X midpoint of AC. Y placeable by student on any side at any ratio.

import { useState } from 'react';

type Side = 'OA' | 'AB' | 'BC' | 'OC';

export function VectorParallelogram2023ON() {
  // Slanted parallelogram matching exam paper
  const O = { x: 30, y: 175 };
  const A = { x: 100, y: 40 };
  const B = { x: 270, y: 40 };
  const C = { x: 200, y: 175 };

  // X = midpoint of diagonal AC
  const X = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };

  // Student controls for Y
  const [side, setSide] = useState<Side>('AB');
  const [num, setNum] = useState<number>(2);
  const [den, setDen] = useState<number>(1);

  const endpoints: Record<Side, [{ x: number; y: number }, { x: number; y: number }, string]> = {
    OA: [O, A, 'OY:YA'],
    AB: [A, B, 'AY:YB'],
    BC: [B, C, 'BY:YC'],
    OC: [O, C, 'OY:YC'],
  };
  const [P, Q, label] = endpoints[side];
  const total = Math.max(num + den, 1);
  const t = num / total;
  const Y = { x: P.x + t * (Q.x - P.x), y: P.y + t * (Q.y - P.y) };

  // Tick marks on AC for midpoint indicator
  const tickAt = (frac: number) => {
    const cx = A.x + frac * (C.x - A.x);
    const cy = A.y + frac * (C.y - A.y);
    const dx = C.x - A.x, dy = C.y - A.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len * 6, ny = dx / len * 6;
    return `M ${cx - nx} ${cy - ny} L ${cx + nx} ${cy + ny}`;
  };

  return (
    <div className="space-y-2">
      <svg viewBox="0 0 300 210" className="w-full max-w-md mx-auto">
        <defs>
          <marker id="vp-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Parallelogram */}
        <polygon points={`${O.x},${O.y} ${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Vector arrows OA and OC (midpoint arrowheads) */}
        <line x1={O.x} y1={O.y} x2={(O.x + A.x) / 2} y2={(O.y + A.y) / 2}
          stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vp-arr)" />
        <line x1={O.x} y1={O.y} x2={(O.x + C.x) / 2} y2={(O.y + C.y) / 2}
          stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vp-arr)" />

        {/* Diagonal AC */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y}
          stroke="hsl(var(--foreground))" strokeWidth="1.2" />
        {/* Midpoint tick marks on AC */}
        <path d={tickAt(0.4)} stroke="hsl(var(--foreground))" strokeWidth="1.2" />
        <path d={tickAt(0.6)} stroke="hsl(var(--foreground))" strokeWidth="1.2" />

        {/* X point */}
        <circle cx={X.x} cy={X.y} r="2.5" fill="hsl(var(--foreground))" />
        <text x={X.x + 6} y={X.y - 4} className="text-[12px] fill-foreground font-bold italic">X</text>

        {/* Y point (interactive) */}
        <circle cx={Y.x} cy={Y.y} r="4" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1" />
        <text x={Y.x + 6} y={Y.y - 6} className="text-[12px] fill-primary font-bold italic">Y</text>

        {/* Vertex labels */}
        <text x={O.x - 14} y={O.y + 6} className="text-[13px] fill-foreground font-bold italic">O</text>
        <text x={A.x - 12} y={A.y - 4} className="text-[13px] fill-foreground font-bold italic">A</text>
        <text x={B.x + 4} y={B.y - 4} className="text-[13px] fill-foreground font-bold italic">B</text>
        <text x={C.x + 4} y={C.y + 12} className="text-[13px] fill-foreground font-bold italic">C</text>

        {/* Vector labels a and c */}
        <text x={(O.x + A.x) / 2 - 14} y={(O.y + A.y) / 2} className="text-[12px] fill-primary font-bold">a</text>
        <text x={(O.x + C.x) / 2} y={O.y + 16} textAnchor="middle" className="text-[12px] fill-primary font-bold">c</text>

        {/* NOT TO SCALE */}
        <text x="295" y="100" textAnchor="end" className="text-[9px] fill-muted-foreground">NOT TO SCALE</text>
      </svg>

      {/* Student controls for Y */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs bg-muted/40 rounded-md p-2">
        <span className="font-medium text-foreground">Place Y on side:</span>
        <select value={side} onChange={(e) => setSide(e.target.value as Side)}
          className="bg-background border border-border rounded px-2 py-1 text-foreground">
          <option value="OA">OA</option>
          <option value="AB">AB</option>
          <option value="BC">BC</option>
          <option value="OC">OC</option>
        </select>
        <span className="font-medium text-foreground">{label} =</span>
        <input type="number" min={0} value={num}
          onChange={(e) => setNum(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-14 bg-background border border-border rounded px-2 py-1 text-foreground" />
        <span>:</span>
        <input type="number" min={0} value={den}
          onChange={(e) => setDen(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-14 bg-background border border-border rounded px-2 py-1 text-foreground" />
      </div>
    </div>
  );
}
