// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Traced from the actual exam paper image
import parallelLinesImg from "@/assets/q6-parallel-lines-2023on.png";

export function ParallelLines2023ON() {
  // The source image is 251x162. We use viewBox matching that ratio.
  // Lines traced directly against the image pixels.
  return (
    <svg viewBox="0 0 502 324" className="w-full max-w-md mx-auto">
      {/* Reference image at 0 opacity for production (set to ~0.15 for debugging) */}
      <image href={parallelLinesImg} x="0" y="0" width="502" height="324" opacity="0.18" />

      {/* Upper parallel line — traced from image */}
      <line x1="16" y1="196" x2="370" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2.5" />
      
      {/* Lower parallel line — traced from image */}
      <line x1="130" y1="290" x2="486" y2="176" stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Transversal — goes from bottom-center up through both lines */}
      <line x1="220" y1="310" x2="310" y2="16" stroke="hsl(var(--foreground))" strokeWidth="2.5" />

      {/* Parallel arrows on upper line (pointing upper-right, near left end) */}
      {/* Arrow position ~25% along upper line */}
      <polygon points="95,175 109,170 99,163" fill="hsl(var(--foreground))" />
      <polygon points="107,171 121,166 111,159" fill="hsl(var(--foreground))" />

      {/* Parallel arrows on lower line (pointing upper-right, near right end) */}
      <polygon points="370,210 384,205 374,198" fill="hsl(var(--foreground))" />
      <polygon points="382,206 396,201 386,194" fill="hsl(var(--foreground))" />

      {/* Arrow on transversal pointing upward (between the two parallel lines) */}
      <polygon points="256,180 264,160 272,180" fill="hsl(var(--foreground))" />

      {/* 110° angle arc at left intersection (~240, 130) 
          Angle below the upper line, left of transversal */}
      <path
        d="M 218,138 A 28,28 0 0,1 248,148"
        fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8"
      />
      <text x="195" y="170" className="text-[16px] fill-foreground font-semibold">110°</text>

      {/* x° angle arc at right intersection (~330, 228)
          Below the lower line, left of transversal */}
      <path
        d="M 310,236 A 24,24 0 0,1 338,244"
        fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8"
      />
      <text x="300" y="270" className="text-[16px] fill-foreground font-semibold italic">x°</text>

      {/* y° angle arc at right intersection
          Below the lower line, right of transversal */}
      <path
        d="M 338,244 A 24,24 0 0,1 354,228"
        fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8"
      />
      <text x="348" y="264" className="text-[16px] fill-foreground font-semibold italic">y°</text>
    </svg>
  );
}
