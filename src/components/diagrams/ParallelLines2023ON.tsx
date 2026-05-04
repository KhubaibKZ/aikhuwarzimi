// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// "A straight line crosses two parallel lines. One angle is 110°."
// Two parallel lines (with arrowheads) + one transversal.
// 110° at upper intersection; x° and y° (adjacent angles on a straight line) at lower intersection.

export function ParallelLines2023ON() {
  // Two parallel lines, sloping slightly down to the right
  // Upper:   from (20, 90)  to (480, 150)
  // Lower:   from (20, 230) to (480, 290)
  // Transversal: from (120, 30) to (380, 340), crosses both

  // Compute intersections
  // Upper line param: P1=(20,90), dir=(460,60)
  // Lower line param: P2=(20,230), dir=(460,60)
  // Transversal: T1=(120,30), Tdir=(260,310)

  // Solve upper ∩ trans:  (20+460u, 90+60u) = (120+260t, 30+310t)
  // 460u - 260t = 100   ;  60u - 310t = -60
  // Solve quickly numerically:
  // From eq2: u = (-60 + 310t)/60 = -1 + 5.1667t
  // Sub: 460(-1+5.1667t) - 260t = 100 => -460 + 2376.67t - 260t = 100 => 2116.67t = 560 => t=0.2645
  // u = -1 + 5.1667*0.2645 = 0.366
  // Upper intersection: x=20+460*0.366=188.4, y=90+60*0.366=111.9 → (188, 112)
  // Lower ∩ trans: 460u - 260t = 100 ; 60u - 310t = 80
  // u = (80 + 310t)/60 = 1.333 + 5.1667t
  // 460(1.333+5.1667t) - 260t = 100 => 613.33 + 2116.67t = 100 => t = -0.2426
  // Hmm negative — adjust transversal direction.
  // Use transversal: T1=(80, 20) to (420, 360); Tdir=(340, 340)
  // Upper ∩: 460u - 340t = 60 ; 60u - 340t = -70 → 400u = 130 → u=0.325, t = (60u+70)/340 = 0.2618
  // Upper int: (20+460*0.325, 90+60*0.325) = (169.5, 109.5)
  // Lower ∩: 460u - 340t = 60 ; 60u - 340t = 70 → 400u = -10 → u=-0.025 negative.
  // Try transversal: T1=(120, 20), Tdir=(220, 340)
  // Upper: 460u - 220t = 100 ; 60u - 340t = -70
  // Multiply: 460u - 220t = 100 ; 60u - 340t = -70
  // From 1: u = (100 + 220t)/460
  // Sub: 60*(100+220t)/460 - 340t = -70
  // (6000 + 13200t)/460 - 340t = -70
  // 13.04 + 28.7t - 340t = -70
  // -311.3t = -83.04 → t=0.2668; u=(100+220*0.2668)/460=0.345
  // Upper int: (20+460*0.345, 90+60*0.345) = (178.7, 110.7)
  // Lower: 460u - 220t = 100 ; 60u - 340t = 70
  // 60(100+220t)/460 - 340t = 70 → 13.04 + 28.7t - 340t = 70 → -311.3t = 56.96 → t=-0.183 neg
  // Transversal must extend upper-right to lower-left actually for both crossings.
  // Use T1=(380, 20), Tdir=(-260, 340) → ends at (120, 360)
  // Upper ∩: 20+460u = 380 - 260t ; 90+60u = 20+340t
  // 460u + 260t = 360 ; 60u - 340t = -70
  // From eq2: u = (-70+340t)/60
  // 460(-70+340t)/60 + 260t = 360 → (-32200+156400t)/60 + 260t = 360
  // -536.67 + 2606.67t + 260t = 360 → 2866.67t = 896.67 → t=0.3128
  // u=(-70+340*0.3128)/60 = (-70+106.35)/60 = 0.606
  // Upper int: (20+460*0.606, 90+60*0.606) = (298.8, 126.4)
  // Lower ∩: 60u - 340t = 80 → u=(80+340t)/60
  // 460(80+340t)/60 + 260t = 360 → (36800+156400t)/60 + 260t = 360
  // 613.33 + 2606.67t + 260t = 360 → 2866.67t = -253.33 → t=-0.0884 neg.

  // Easier: Make parallel lines horizontal-ish and transversal cross both.
  // Parallel lines: y=110 and y=250 (slight slope: from (20,100) to (480,140) and (20,240) to (480,280))
  // Transversal from (380, 30) to (140, 340) — definitely crosses both.

  const upper = { x1: 20, y1: 100, x2: 480, y2: 140 };
  const lower = { x1: 20, y1: 240, x2: 480, y2: 280 };
  const trans = { x1: 380, y1: 30, x2: 140, y2: 340 };

  // Compute intersection of two segments (line equations)
  const intersect = (a: typeof upper, b: typeof trans) => {
    const x1 = a.x1, y1 = a.y1, x2 = a.x2, y2 = a.y2;
    const x3 = b.x1, y3 = b.y1, x4 = b.x2, y4 = b.y2;
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
  };

  const Ptop = intersect(upper, trans);
  const Pbot = intersect(lower, trans);

  // Direction unit vectors
  const upDir = { x: upper.x2 - upper.x1, y: upper.y2 - upper.y1 };
  const upLen = Math.hypot(upDir.x, upDir.y);
  const upU = { x: upDir.x / upLen, y: upDir.y / upLen };

  const trDir = { x: trans.x2 - trans.x1, y: trans.y2 - trans.y1 };
  const trLen = Math.hypot(trDir.x, trDir.y);
  const trU = { x: trDir.x / trLen, y: trDir.y / trLen };

  // 110° angle at Ptop — between upper line going RIGHT and transversal going DOWN (toward Pbot)
  // (the obtuse angle on the lower-right of intersection)
  const a110_start = Math.atan2(upU.y, upU.x); // upper right
  const a110_end = Math.atan2(trU.y, trU.x); // transversal down (toward bottom)
  // Arc from upper-right sweeping to transversal-down (clockwise = sweep 1)
  const r1 = 26;
  const s1x = Ptop.x + r1 * Math.cos(a110_start);
  const s1y = Ptop.y + r1 * Math.sin(a110_start);
  const e1x = Ptop.x + r1 * Math.cos(a110_end);
  const e1y = Ptop.y + r1 * Math.sin(a110_end);

  // x° at Pbot — angle between transversal coming from above (UP direction) and lower line going LEFT
  // (acute angle on the upper-left, alternate-interior with 110° supplement = 70°)
  const r2 = 22;
  const lowDir = { x: lower.x2 - lower.x1, y: lower.y2 - lower.y1 };
  const lowLen = Math.hypot(lowDir.x, lowDir.y);
  const lowU = { x: lowDir.x / lowLen, y: lowDir.y / lowLen };
  const aXstart = Math.atan2(-trU.y, -trU.x); // transversal up
  const aXend = Math.atan2(-lowU.y, -lowU.x); // lower line going left
  const sxX = Pbot.x + r2 * Math.cos(aXstart);
  const sxY = Pbot.y + r2 * Math.sin(aXstart);
  const exX = Pbot.x + r2 * Math.cos(aXend);
  const exY = Pbot.y + r2 * Math.sin(aXend);

  // y° at Pbot — adjacent to x°, between lower line going RIGHT and transversal going UP
  const aYstart = Math.atan2(lowU.y, lowU.x); // lower right
  const aYend = Math.atan2(-trU.y, -trU.x); // trans up
  const syX = Pbot.x + r2 * Math.cos(aYstart);
  const syY = Pbot.y + r2 * Math.sin(aYstart);
  const eyX = Pbot.x + r2 * Math.cos(aYend);
  const eyY = Pbot.y + r2 * Math.sin(aYend);

  // Arrow markers along a line
  const arrow = (cx: number, cy: number, ux: number, uy: number, key: string) => {
    const px = -uy, py = ux;
    return (
      <polygon
        key={key}
        points={`${cx - ux * 7 + px * 5},${cy - uy * 7 + py * 5} ${cx + ux * 7},${cy + uy * 7} ${cx - ux * 7 - px * 5},${cy - uy * 7 - py * 5}`}
        fill="hsl(var(--foreground))"
      />
    );
  };

  return (
    <svg viewBox="0 0 500 360" className="w-full max-w-md mx-auto">
      {/* Upper parallel line */}
      <line x1={upper.x1} y1={upper.y1} x2={upper.x2} y2={upper.y2} stroke="hsl(var(--foreground))" strokeWidth="2.5" />
      {/* Lower parallel line */}
      <line x1={lower.x1} y1={lower.y1} x2={lower.x2} y2={lower.y2} stroke="hsl(var(--foreground))" strokeWidth="2.5" />
      {/* Transversal */}
      <line x1={trans.x1} y1={trans.y1} x2={trans.x2} y2={trans.y2} stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Single arrow markers (one per parallel line, indicating they're parallel) */}
      {arrow(upper.x1 + (upper.x2 - upper.x1) * 0.25, upper.y1 + (upper.y2 - upper.y1) * 0.25, upU.x, upU.y, 'a1')}
      {arrow(lower.x1 + (lower.x2 - lower.x1) * 0.25, lower.y1 + (lower.y2 - lower.y1) * 0.25, lowU.x, lowU.y, 'a2')}

      {/* 110° arc */}
      <path
        d={`M ${s1x.toFixed(1)},${s1y.toFixed(1)} A ${r1},${r1} 0 0,1 ${e1x.toFixed(1)},${e1y.toFixed(1)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x={Ptop.x + 18} y={Ptop.y + 38} className="text-[15px] fill-foreground font-semibold">110°</text>

      {/* x° arc */}
      <path
        d={`M ${sxX.toFixed(1)},${sxY.toFixed(1)} A ${r2},${r2} 0 0,1 ${exX.toFixed(1)},${exY.toFixed(1)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x={Pbot.x - 38} y={Pbot.y - 8} className="text-[14px] fill-foreground font-semibold italic">x°</text>

      {/* y° arc */}
      <path
        d={`M ${syX.toFixed(1)},${syY.toFixed(1)} A ${r2},${r2} 0 0,1 ${eyX.toFixed(1)},${eyY.toFixed(1)}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <text x={Pbot.x + 16} y={Pbot.y - 8} className="text-[14px] fill-foreground font-semibold italic">y°</text>
    </svg>
  );
}
