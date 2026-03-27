// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Traced from actual pixel data of the exam paper image
// Image: 251x162px. Using viewBox scaled 2x for quality.

export function ParallelLines2023ON() {
  // All coordinates are in 2x scale (original * 2)
  // Traced lines from pixel analysis:
  // Upper parallel line: y = 65.8 + 0.167x → scaled: y = 131.6 + 0.167x
  // Lower parallel line: y = 122.1 + 0.167x → scaled: y = 244.2 + 0.167x
  // Left transversal: y = 151.4 - 1.36x → scaled: y = 302.8 - 1.36x
  // Right transversal: y = 271 - 1.4x → scaled: y = 542 - 1.4x

  return (
    <svg viewBox="0 0 502 324" className="w-full max-w-md mx-auto">
      {/* Upper parallel line */}
      <line x1="0" y1="132" x2="502" y2="216" stroke="hsl(var(--foreground))" strokeWidth="2.5" />
      
      {/* Lower parallel line */}
      <line x1="0" y1="244" x2="480" y2="324" stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Left transversal: from bottom-left to top-right, steep */}
      <line x1="0" y1="303" x2="222" y2="0" stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Right transversal: from bottom to top-right, steep */}
      <line x1="156" y1="324" x2="387" y2="0" stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Parallel arrows on upper line — double chevrons pointing right-down */}
      {/* At ~x=160 on upper line, y ≈ 132 + 0.167*160 = 159 */}
      {(() => {
        const dx = 502, dy = 84; // direction of upper line
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        const cx = 160, cy = 159;
        return (
          <>
            <polygon points={`${cx-ux*6+px*5},${cy-uy*6+py*5} ${cx+ux*6},${cy+uy*6} ${cx-ux*6-px*5},${cy-uy*6-py*5}`} fill="hsl(var(--foreground))" />
            <polygon points={`${cx+ux*8-ux*6+px*5},${cy+uy*8-uy*6+py*5} ${cx+ux*8+ux*6},${cy+uy*8+uy*6} ${cx+ux*8-ux*6-px*5},${cy+uy*8-uy*6-py*5}`} fill="hsl(var(--foreground))" />
          </>
        );
      })()}

      {/* Parallel arrows on lower line — at ~x=380, y ≈ 244 + 0.167*380 = 307 */}
      {(() => {
        const dx = 480, dy = 80;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        const cx = 380, cy = 307;
        return (
          <>
            <polygon points={`${cx-ux*6+px*5},${cy-uy*6+py*5} ${cx+ux*6},${cy+uy*6} ${cx-ux*6-px*5},${cy-uy*6-py*5}`} fill="hsl(var(--foreground))" />
            <polygon points={`${cx+ux*8-ux*6+px*5},${cy+uy*8-uy*6+py*5} ${cx+ux*8+ux*6},${cy+uy*8+uy*6} ${cx+ux*8-ux*6-px*5},${cy+uy*8-uy*6-py*5}`} fill="hsl(var(--foreground))" />
          </>
        );
      })()}

      {/* Arrow on left transversal — between the two parallel lines, pointing up-right */}
      {(() => {
        const dx = 222, dy = -303; // direction upward
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        // Midpoint between intersections: left trans crosses upper line at (112, 150), lower line at (38, 251)
        // Arrow around (75, 200)
        const cx = 78, cy = 197;
        return (
          <polygon points={`${cx-ux*7+px*5},${cy-uy*7+py*5} ${cx+ux*7},${cy+uy*7} ${cx-ux*7-px*5},${cy-uy*7-py*5}`} fill="hsl(var(--foreground))" />
        );
      })()}

      {/* Arrow on right transversal — between the two parallel lines, pointing up-right */}
      {(() => {
        const dx = 231, dy = -324;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        // Right trans crosses upper line at (262, 176), lower line at (190, 276)
        // Arrow around (226, 226)
        const cx = 226, cy = 226;
        return (
          <polygon points={`${cx-ux*7+px*5},${cy-uy*7+py*5} ${cx+ux*7},${cy+uy*7} ${cx-ux*7-px*5},${cy-uy*7-py*5}`} fill="hsl(var(--foreground))" />
        );
      })()}

      {/* 110° angle arc at left transversal × upper line intersection
          Intersection at approximately (112, 150)
          Angle below the upper line, between line going left and transversal going down */}
      {(() => {
        const cx = 112, cy = 150;
        const r = 30;
        // Upper line going LEFT direction: angle = atan2(dy, dx) for going left
        const lineLeftAngle = Math.atan2(84, -502); // toward x=0
        // Transversal going DOWN direction: toward (0, 303)
        const transDownAngle = Math.atan2(303, -222); // toward bottom-left

        const startX = cx + r * Math.cos(transDownAngle);
        const startY = cy + r * Math.sin(transDownAngle);
        const endX = cx + r * Math.cos(lineLeftAngle);
        const endY = cy + r * Math.sin(lineLeftAngle);

        return (
          <>
            <path
              d={`M ${startX.toFixed(1)},${startY.toFixed(1)} A ${r},${r} 0 0,0 ${endX.toFixed(1)},${endY.toFixed(1)}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
            />
            <text x={cx - 50} y={cy + 30} className="text-[15px] fill-foreground font-semibold">110°</text>
          </>
        );
      })()}

      {/* x° angle at right transversal × upper line intersection
          Intersection at approximately (262, 176)
          Angle below the upper line, left of transversal */}
      {(() => {
        const cx = 262, cy = 176;
        const r = 26;
        // Upper line going LEFT: atan2(-84, -502)
        const lineLeftAngle = Math.atan2(84, -502);
        // Transversal going DOWN: toward (156, 324)
        const transDownAngle = Math.atan2(324 - 176, 156 - 262);

        const startX = cx + r * Math.cos(lineLeftAngle);
        const startY = cy + r * Math.sin(lineLeftAngle);
        const endX = cx + r * Math.cos(transDownAngle);
        const endY = cy + r * Math.sin(transDownAngle);

        return (
          <>
            <path
              d={`M ${startX.toFixed(1)},${startY.toFixed(1)} A ${r},${r} 0 0,0 ${endX.toFixed(1)},${endY.toFixed(1)}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
            />
            <text x={cx - 30} y={cy + 35} className="text-[14px] fill-foreground font-semibold italic">x°</text>
          </>
        );
      })()}

      {/* y° angle at right transversal × upper line intersection
          Below the upper line, right of transversal */}
      {(() => {
        const cx = 262, cy = 176;
        const r = 26;
        // Transversal going DOWN-LEFT: toward (156, 324)
        const transDownAngle = Math.atan2(324 - 176, 156 - 262);
        // Upper line going RIGHT: toward (502, 216)
        const lineRightAngle = Math.atan2(216 - 176, 502 - 262);

        const startX = cx + r * Math.cos(transDownAngle);
        const startY = cy + r * Math.sin(transDownAngle);
        const endX = cx + r * Math.cos(lineRightAngle);
        const endY = cy + r * Math.sin(lineRightAngle);

        return (
          <>
            <path
              d={`M ${startX.toFixed(1)},${startY.toFixed(1)} A ${r},${r} 0 0,1 ${endX.toFixed(1)},${endY.toFixed(1)}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
            />
            <text x={cx + 15} y={cy + 32} className="text-[14px] fill-foreground font-semibold italic">y°</text>
          </>
        );
      })()}
    </svg>
  );
}
