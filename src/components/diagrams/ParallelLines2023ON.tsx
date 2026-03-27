// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Two parallel lines sloping up-right, transversal from upper-left to lower-right

export function ParallelLines2023ON() {
  // Key points traced from the paper image:
  // Upper parallel line: (10,160) → (340,60)   slope up-right
  // Lower parallel line: (100,255) → (410,160)  same slope, offset down-right
  // Transversal: (80,10) → (330,265)  from upper-left to lower-right
  // Left intersection (upper line × transversal): ~(176, 106)
  // Right intersection (lower line × transversal): ~(272, 202)

  // Line slopes
  const upperLine = { x1: 10, y1: 160, x2: 340, y2: 60 };
  const lowerLine = { x1: 100, y1: 255, x2: 410, y2: 160 };
  const transversal = { x1: 80, y1: 10, x2: 330, y2: 265 };

  // Intersections (computed)
  const intUpper = { x: 176, y: 106 };
  const intLower = { x: 272, y: 202 };

  return (
    <svg viewBox="0 0 420 280" className="w-full max-w-md mx-auto">
      {/* Upper parallel line */}
      <line
        x1={upperLine.x1} y1={upperLine.y1}
        x2={upperLine.x2} y2={upperLine.y2}
        stroke="hsl(var(--foreground))" strokeWidth="2"
      />
      {/* Lower parallel line */}
      <line
        x1={lowerLine.x1} y1={lowerLine.y1}
        x2={lowerLine.x2} y2={lowerLine.y2}
        stroke="hsl(var(--foreground))" strokeWidth="2"
      />
      {/* Transversal */}
      <line
        x1={transversal.x1} y1={transversal.y1}
        x2={transversal.x2} y2={transversal.y2}
        stroke="hsl(var(--foreground))" strokeWidth="2"
      />

      {/* Parallel arrows on upper line — two chevrons pointing upper-right */}
      {(() => {
        const mx = 95, my = 137; // position ~25% along upper line
        const dx = 330, dy = -100;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        return (
          <>
            <polygon points={`${mx-ux*5+px*4},${my-uy*5+py*4} ${mx+ux*5},${my+uy*5} ${mx-ux*5-px*4},${my-uy*5-py*4}`} fill="hsl(var(--foreground))" />
            <polygon points={`${mx+ux*7+px*4-ux*5},${my+uy*7+py*4-uy*5} ${mx+ux*7+ux*5},${my+uy*7+uy*5} ${mx+ux*7-px*4-ux*5},${my+uy*7-py*4-uy*5}`} fill="hsl(var(--foreground))" />
          </>
        );
      })()}

      {/* Parallel arrows on lower line — two chevrons pointing upper-right */}
      {(() => {
        const mx = 320, my = 183;
        const dx = 310, dy = -95;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        return (
          <>
            <polygon points={`${mx-ux*5+px*4},${my-uy*5+py*4} ${mx+ux*5},${my+uy*5} ${mx-ux*5-px*4},${my-uy*5-py*4}`} fill="hsl(var(--foreground))" />
            <polygon points={`${mx+ux*7+px*4-ux*5},${my+uy*7+py*4-uy*5} ${mx+ux*7+ux*5},${my+uy*7+uy*5} ${mx+ux*7-px*4-ux*5},${my+uy*7-py*4-uy*5}`} fill="hsl(var(--foreground))" />
          </>
        );
      })()}

      {/* Arrow on transversal — pointing upward between the two lines */}
      {(() => {
        const mx = 210, my = 145; // midpoint-ish of transversal between lines
        // Transversal direction upward: from (330,265) to (80,10) = (-250,-255)
        const dx = -250, dy = -255;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len, uy = dy/len;
        const px = -uy, py = ux;
        return (
          <polygon points={`${mx-ux*6+px*4},${my-uy*6+py*4} ${mx+ux*6},${my+uy*6} ${mx-ux*6-px*4},${my-uy*6-py*4}`} fill="hsl(var(--foreground))" />
        );
      })()}

      {/* 110° angle arc at left intersection (176, 106)
          Angle is below the upper parallel line, to the left of the transversal
          Between: line going LEFT (toward x1,y1) and transversal going DOWN (toward x2,y2) */}
      {(() => {
        const cx = intUpper.x, cy = intUpper.y;
        const r = 25;
        // Direction of upper line going LEFT: toward (10,160) from intersection
        const lineLeftAngle = Math.atan2(160-106, 10-176); // ≈ 2.81 rad ≈ 161°
        // Direction of transversal going DOWN: toward (330,265) from intersection  
        const transDownAngle = Math.atan2(265-106, 330-176); // ≈ 0.79 rad ≈ 45°
        
        // Arc from transversal-down to line-left (going counterclockwise = the angle below-left)
        const startX = cx + r * Math.cos(transDownAngle);
        const startY = cy + r * Math.sin(transDownAngle);
        const endX = cx + r * Math.cos(lineLeftAngle);
        const endY = cy + r * Math.sin(lineLeftAngle);
        
        return (
          <>
            <path
              d={`M ${startX},${startY} A ${r},${r} 0 0,1 ${endX},${endY}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
            />
            <text x={cx - 38} y={cy + 32} className="text-[14px] fill-foreground font-semibold">110°</text>
          </>
        );
      })()}

      {/* x° angle at right intersection (272, 202)
          Below the lower line, LEFT of transversal */}
      {(() => {
        const cx = intLower.x, cy = intLower.y;
        const r = 22;
        // Direction of lower line going LEFT: toward (100,255) from intersection
        const lineLeftAngle = Math.atan2(255-202, 100-272); // going left-down
        // Direction of transversal going DOWN: toward (330,265) from intersection
        const transDownAngle = Math.atan2(265-202, 330-272); // going right-down

        const startX = cx + r * Math.cos(lineLeftAngle);
        const startY = cy + r * Math.sin(lineLeftAngle);
        const endX = cx + r * Math.cos(transDownAngle);
        const endY = cy + r * Math.sin(transDownAngle);

        return (
          <>
            <path
              d={`M ${startX},${startY} A ${r},${r} 0 0,1 ${endX},${endY}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
            />
            <text x={cx - 20} y={cy + 36} className="text-[14px] fill-foreground font-semibold italic">x°</text>
          </>
        );
      })()}

      {/* y° angle at right intersection (272, 202)
          Below the lower line, RIGHT of transversal */}
      {(() => {
        const cx = intLower.x, cy = intLower.y;
        const r = 22;
        // Direction of transversal going DOWN: toward (330,265)
        const transDownAngle = Math.atan2(265-202, 330-272);
        // Direction of lower line going RIGHT: toward (410,160)
        const lineRightAngle = Math.atan2(160-202, 410-272); // going right-up

        const startX = cx + r * Math.cos(transDownAngle);
        const startY = cy + r * Math.sin(transDownAngle);
        const endX = cx + r * Math.cos(lineRightAngle);
        const endY = cy + r * Math.sin(lineRightAngle);

        return (
          <>
            <path
              d={`M ${startX},${startY} A ${r},${r} 0 0,1 ${endX},${endY}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
            />
            <text x={cx + 18} y={cy + 30} className="text-[14px] fill-foreground font-semibold italic">y°</text>
          </>
        );
      })()}
    </svg>
  );
}
