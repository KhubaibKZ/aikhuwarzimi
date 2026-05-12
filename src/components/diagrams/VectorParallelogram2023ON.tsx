// Vector parallelogram for Q23 4024/11 Oct/Nov 2023
// OABC parallelogram. O bottom-left, A top-left, B top-right, C bottom-right.
// OA = a, OC = c. X midpoint of AC. Y placeable by student on any side at any ratio.

import { useState } from 'react';

type Side = '' | 'OA' | 'AB' | 'BC' | 'OC';

export function VectorParallelogram2023ON() {
  // Slanted parallelogram matching exam paper
  const O = { x: 30, y: 175 };
  const A = { x: 100, y: 40 };
  const B = { x: 270, y: 40 };
  const C = { x: 200, y: 175 };

  // X = midpoint of diagonal AC (given in the question)
  const X = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };

  // Student controls for Y — start empty so nothing is placed automatically.
  const [side, setSide] = useState<Side>('');
  const [num, setNum] = useState<string>('');
  const [den, setDen] = useState<string>('');

  const endpoints: Record<Exclude<Side, ''>, [{ x: number; y: number }, { x: number; y: number }, string]> = {
    OA: [O, A, 'OY:YA'],
    AB: [A, B, 'AY:YB'],
    BC: [B, C, 'BY:YC'],
    OC: [O, C, 'OY:YC'],
  };

  const nNum = parseInt(num) || 0;
  const nDen = parseInt(den) || 0;
  const showY = side !== '' && (nNum + nDen) > 0;
  let Y: { x: number; y: number } | null = null;
  let label = '';
  if (showY) {
    const [P, Q, lbl] = endpoints[side as Exclude<Side, ''>];
    const t = nNum / (nNum + nDen);
    Y = { x: P.x + t * (Q.x - P.x), y: P.y + t * (Q.y - P.y) };
    label = lbl;
  }

  // Tick marks on AC for midpoint indicator
  const tickAt = (frac: number) => {
    const cx = A.x + frac * (C.x - A.x);
    const cy = A.y + frac * (C.y - A.y);
    const dx = C.x - A.x, dy = C.y - A.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len * 6, ny = dx / len * 6;
    return `M ${cx - nx} ${cy - ny} L ${cx + nx} ${cy + ny}`;
  };

  // Arrow above text (small "→") rendered as SVG text
  const ArrowOver = ({ x, y, fill = 'hsl(var(--primary))' }: { x: number; y: number; fill?: string }) => (
    <text x={x} y={y} textAnchor="middle" className="text-[8px]" fill={fill}>⟶</text>
  );

  return (
    <div className="space-y-2">
      <svg viewBox="0 0 300 215" className="w-full max-w-md mx-auto">
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

        {/* X point (given in question) */}
        <circle cx={X.x} cy={X.y} r="2.5" fill="hsl(var(--foreground))" />
        <text x={X.x + 6} y={X.y - 4} className="text-[12px] fill-foreground font-bold italic">X</text>

        {/* Y point (only after student places it) */}
        {showY && Y && (
          <>
            <circle cx={Y.x} cy={Y.y} r="4" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1" />
            <text x={Y.x + 6} y={Y.y - 6} className="text-[12px] fill-primary font-bold italic">Y</text>
          </>
        )}

        {/* Vertex labels */}
        <text x={O.x - 14} y={O.y + 6} className="text-[13px] fill-foreground font-bold italic">O</text>
        <text x={A.x - 12} y={A.y - 4} className="text-[13px] fill-foreground font-bold italic">A</text>
        <text x={B.x + 4} y={B.y - 4} className="text-[13px] fill-foreground font-bold italic">B</text>
        <text x={C.x + 4} y={C.y + 12} className="text-[13px] fill-foreground font-bold italic">C</text>

        {/* Vector labels a and c with arrow above */}
        <ArrowOver x={(O.x + A.x) / 2 - 10} y={(O.y + A.y) / 2 - 6} />
        <text x={(O.x + A.x) / 2 - 14} y={(O.y + A.y) / 2 + 2} className="text-[12px] fill-primary font-bold">a</text>
        <ArrowOver x={(O.x + C.x) / 2} y={O.y + 10} />
        <text x={(O.x + C.x) / 2} y={O.y + 18} textAnchor="middle" className="text-[12px] fill-primary font-bold">c</text>

        {/* NOT TO SCALE */}
        <text x="295" y="100" textAnchor="end" className="text-[9px] fill-muted-foreground">NOT TO SCALE</text>
      </svg>

      {/* Student controls for Y */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs bg-muted/40 rounded-md p-2">
        <span className="font-medium text-foreground">Place Y on side:</span>
        <select value={side} onChange={(e) => setSide(e.target.value as Side)}
          className="bg-background border border-border rounded px-2 py-1 text-foreground">
          <option value="">— select —</option>
          <option value="OA">OA</option>
          <option value="AB">AB</option>
          <option value="BC">BC</option>
          <option value="OC">OC</option>
        </select>
        <span className="font-medium text-foreground">{label || 'ratio'} =</span>
        <input type="number" min={0} value={num} placeholder="?"
          onChange={(e) => setNum(e.target.value)}
          className="w-14 bg-background border border-border rounded px-2 py-1 text-foreground" />
        <span>:</span>
        <input type="number" min={0} value={den} placeholder="?"
          onChange={(e) => setDen(e.target.value)}
          className="w-14 bg-background border border-border rounded px-2 py-1 text-foreground" />
        {showY && (
          <button type="button"
            onClick={() => { setSide(''); setNum(''); setDen(''); }}
            className="ml-1 px-2 py-1 rounded border border-border bg-background hover:bg-muted text-foreground">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
