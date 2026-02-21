// Q4 - Symmetry shapes for 0580/11 MJ 2020
// (a) Two shapes where students identify lines of symmetry
// (b) A wavy S-shape for rotational symmetry

interface SymmetryShapesProps {
  part: 'a' | 'b';
}

export function SymmetryShapes({ part }: SymmetryShapesProps) {
  if (part === 'a') {
    return (
      <div className="flex flex-wrap gap-6 justify-center items-center py-4">
        {/* Shape 1: Kite / inverted arrowhead — 1 line of symmetry (vertical) */}
        <svg width="140" height="140" viewBox="0 0 140 140" className="border border-border rounded-lg bg-background p-2">
          <polygon
            points="70,10 20,130 70,100 120,130"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
          />
          {/* Dashed vertical line of symmetry */}
          <line x1="70" y1="5" x2="70" y2="135" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
          <text x="70" y="145" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" className="select-none">
            1 line
          </text>
        </svg>

        {/* Shape 2: Arch/lens shape — 2 lines of symmetry */}
        <svg width="160" height="140" viewBox="0 0 160 140" className="border border-border rounded-lg bg-background p-2">
          <path
            d="M 20,70 Q 80,0 140,70 Q 80,140 20,70 Z"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
          />
          {/* Horizontal line of symmetry */}
          <line x1="10" y1="70" x2="150" y2="70" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
          {/* Vertical line of symmetry */}
          <line x1="80" y1="5" x2="80" y2="135" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
          <text x="80" y="145" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" className="select-none">
            2 lines
          </text>
        </svg>
      </div>
    );
  }

  // Part (b): Wavy S-shape with rotational symmetry order 2
  return (
    <div className="flex justify-center py-4">
      <svg width="160" height="100" viewBox="0 0 160 100" className="border border-border rounded-lg bg-background p-2">
        <path
          d="M 10,50 Q 10,10 50,10 Q 90,10 80,50 Q 70,90 110,90 Q 150,90 150,50"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        {/* Top curved edge */}
        <path
          d="M 10,50 Q 10,30 40,20 Q 70,10 80,50"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          opacity="0"
        />
        <text x="80" y="55" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" className="select-none">
          Order 2
        </text>
      </svg>
    </div>
  );
}
