// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Layout: one horizontal transversal crosses two parallel diagonal lines (going up-right with arrows).
// 110° marked at left intersection (below transversal, right side of parallel = obtuse angle).
// x° and y° marked at right intersection (below transversal: x° left of parallel, y° right of parallel).

export function ParallelLines2023ON() {
  // Horizontal transversal
  const trans = { x1: 20, y1: 180, x2: 480, y2: 180 };

  // Two parallel lines, slope ~ -2 (steep up-right). They go from lower-left to upper-right.
  // Left parallel: passes through (140, 180) — i.e. crosses transversal at x=140
  // Right parallel: passes through (300, 180)
  const slope = -2.2; // dy/dx
  const makeParallel = (xCross: number) => ({
    x1: xCross - 70,
    y1: 180 - slope * 70, // = 180 + 2.2*70 = 334 (lower)
    x2: xCross + 70,
    y2: 180 + slope * 70, // = 180 - 154 = 26 (upper)
  });
  const leftP = makeParallel(140);
  const rightP = makeParallel(300);

  // Direction unit vector for parallel lines, pointing UP-RIGHT (toward arrowhead)
  const pdx = 70, pdy = slope * 70;
  const plen = Math.hypot(pdx, pdy);
  const pUx = pdx / plen, pUy = pdy / plen; // up-right direction

  // Transversal unit vector (going right)
  const tUx = 1, tUy = 0;

  // ---- 110° arc at LEFT intersection (140, 180) ----
  // Obtuse angle in the wedge: BELOW transversal (going right) & to the LEFT of parallel-up direction.
  // i.e. between transversal-right (angle 0) and parallel-down (opposite of up-right).
  // Sweep clockwise from transversal-right downward to parallel-down-left.
  const L = { x: 140, y: 180 };
  const r1 = 30;
  // Start: transversal going right (angle 0)
  const a1s = Math.atan2(0, 1); // 0
  // End: parallel going DOWN-LEFT (opposite of up-right unit)
  const a1e = Math.atan2(-pUy, -pUx); // since pUy is negative, -pUy positive → down direction
  // SVG arc: large-arc=0, sweep=1 goes clockwise in screen coords
  const s1x = L.x + r1 * Math.cos(a1s);
  const s1y = L.y + r1 * Math.sin(a1s);
  const e1x = L.x + r1 * Math.cos(a1e);
  const e1y = L.y + r1 * Math.sin(a1e);

  // ---- x° arc at RIGHT intersection (300, 180) ----
  // x° sits below transversal, on the LEFT side of parallel line (between parallel-down and transversal-left)
  const R = { x: 300, y: 180 };
  const r2 = 22;
  // Start: parallel going DOWN-LEFT
  const axs = Math.atan2(-pUy, -pUx);
  // End: transversal going LEFT (angle π)
  const axe = Math.PI;
  const sxX = R.x + r2 * Math.cos(axs);
  const sxY = R.y + r2 * Math.sin(axs);
  const exX = R.x + r2 * Math.cos(axe);
  const exY = R.y + r2 * Math.sin(axe);

  // ---- y° arc at RIGHT intersection ----
  // y° sits below transversal, on the RIGHT side of parallel line (between transversal-right and parallel-down)
  const ays = 0; // transversal right
  const aye = Math.atan2(-pUy, -pUx); // parallel down-left
  const syX = R.x + r2 * Math.cos(ays);
  const syY = R.y + r2 * Math.sin(ays);
  const eyX = R.x + r2 * Math.cos(aye);
  const eyY = R.y + r2 * Math.sin(aye);

  // Arrowhead on a parallel line, placed near the upper end, pointing up-right
  const arrowOnParallel = (line: { x1: number; y1: number; x2: number; y2: number }, key: string) => {
    // Place at 75% along the line toward upper end (x2,y2)
    const cx = line.x1 + (line.x2 - line.x1) * 0.75;
    const cy = line.y1 + (line.y2 - line.y1) * 0.75;
    const ux = pUx, uy = pUy;
    const px = -uy, py = ux;
    return (
      <polygon
        key={key}
        points={`${cx - ux * 8 + px * 5},${cy - uy * 8 + py * 5} ${cx + ux * 6},${cy + uy * 6} ${cx - ux * 8 - px * 5},${cy - uy * 8 - py * 5}`}
        fill="hsl(var(--foreground))"
      />
    );
  };

  return (
    <svg viewBox="0 0 500 360" className="w-full max-w-md mx-auto">
      {/* Transversal (horizontal) */}
      <line
        x1={trans.x1}
        y1={trans.y1}
        x2={trans.x2}
        y2={trans.y2}
        stroke="hsl(var(--foreground))"
        strokeWidth="2.5"
      />
      {/* Two parallel diagonal lines */}
      <line x1={leftP.x1} y1={leftP.y1} x2={leftP.x2} y2={leftP.y2} stroke="hsl(var(--foreground))" strokeWidth="2.5" />
      <line x1={rightP.x1} y1={rightP.y1} x2={rightP.x2} y2={rightP.y2} stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Single arrowhead on each parallel line (indicating they're parallel) */}
      {arrowOnParallel(leftP, 'arr-l')}
      {arrowOnParallel(rightP, 'arr-r')}

      {/* 110° arc — sweep through the obtuse wedge (large-arc=1 not needed; angle < 180) */}
      <path
        d={`M ${s1x.toFixed(1)},${s1y.toFixed(1)} A ${r1},${r1} 0 0,0 ${e1x.toFixed(1)},${e1y.toFixed(1)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x={L.x - 20} y={L.y + 24} className="text-[15px] fill-foreground font-semibold">
        110°
      </text>

      {/* x° arc */}
      <path
        d={`M ${sxX.toFixed(1)},${sxY.toFixed(1)} A ${r2},${r2} 0 0,0 ${exX.toFixed(1)},${exY.toFixed(1)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x={R.x - 22} y={R.y + 22} className="text-[14px] fill-foreground font-semibold italic">
        x°
      </text>

      {/* y° arc */}
      <path
        d={`M ${syX.toFixed(1)},${syY.toFixed(1)} A ${r2},${r2} 0 0,1 ${eyX.toFixed(1)},${eyY.toFixed(1)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x={R.x + 8} y={R.y + 22} className="text-[14px] fill-foreground font-semibold italic">
        y°
      </text>
    </svg>
  );
}
