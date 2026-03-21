// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Two parallel lines crossed by a transversal, one angle = 110°

export function ParallelLines2023ON() {
  return (
    <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto">
      {/* Parallel lines */}
      <line x1="30" y1="60" x2="250" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="30" y1="140" x2="250" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Parallel arrows */}
      <polygon points="240,56 248,60 240,64" fill="hsl(var(--foreground))" />
      <polygon points="230,56 238,60 230,64" fill="hsl(var(--foreground))" />
      <polygon points="240,136 248,140 240,144" fill="hsl(var(--foreground))" />
      <polygon points="230,136 238,140 230,144" fill="hsl(var(--foreground))" />

      {/* Transversal */}
      <line x1="100" y1="20" x2="180" y2="180" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Angle arc at top intersection (110°) */}
      <path d="M 140,60 A 25,25 0 0,0 122,45" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="118" y="42" className="text-[11px] fill-primary font-medium">110°</text>

      {/* x label at top-right of upper intersection */}
      <text x="150" y="52" className="text-[12px] fill-foreground font-bold italic">x°</text>

      {/* y label at lower intersection */}
      <text x="168" y="135" className="text-[12px] fill-foreground font-bold italic">y°</text>
    </svg>
  );
}
