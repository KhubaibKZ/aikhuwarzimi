// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Two parallel lines crossed by ONE transversal
// 110° at upper-left intersection, x° and y° at lower-right intersection

export function ParallelLines2023ON() {
  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-md mx-auto">
      {/* Upper parallel line */}
      <line x1="30" y1="80" x2="390" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
      {/* Lower parallel line */}
      <line x1="30" y1="180" x2="390" y2="180" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {/* Parallel arrows on upper line (right-pointing, near left end) */}
      <polygon points="68,76 78,80 68,84" fill="hsl(var(--foreground))" />
      <polygon points="80,76 90,80 80,84" fill="hsl(var(--foreground))" />

      {/* Parallel arrows on lower line (right-pointing, near right end) */}
      <polygon points="338,176 348,180 338,184" fill="hsl(var(--foreground))" />
      <polygon points="350,176 360,180 350,184" fill="hsl(var(--foreground))" />

      {/* Single transversal crossing both lines
          Upper intersection at (130, 80), lower intersection at (280, 180)
          Extends above and below */}
      <line x1="95" y1="15" x2="315" y2="215" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {/* 110° angle arc at upper-left intersection
          Angle is between the line going LEFT and the transversal going UP-LEFT
          Arc from the left ray (~180°) sweeping to the transversal going up (~110° from horizontal = ~70° direction)
          So the arc is the obtuse angle on the upper-left side */}
      <path
        d="M 108,80 A 22,22 0 0,1 120,61"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.8"
      />
      <text x="100" y="68" className="text-[14px] fill-primary font-semibold">110°</text>

      {/* x° angle at lower-right intersection
          Angle between the transversal going down-right and the line going right
          This is the acute angle on the lower-right, below the line, between transversal (going down) and line (going left) */}
      <path
        d="M 260,180 A 20,20 0 0,0 270,196"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.8"
      />
      <text x="250" y="204" className="text-[14px] fill-foreground font-bold italic">x°</text>

      {/* y° angle at lower-right intersection
          Angle between transversal going down-right and line going right */}
      <path
        d="M 270,196 A 20,20 0 0,0 300,180"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.8"
      />
      <text x="290" y="204" className="text-[14px] fill-foreground font-bold italic">y°</text>
    </svg>
  );
}
