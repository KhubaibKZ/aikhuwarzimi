// Q11 - Cone diagram for 0580/11 MJ 2020
// radius 4.5 cm, height 10.4 cm

export function ConeDiagram() {
  return (
    <div className="flex justify-center py-4">
      <svg width="200" height="200" viewBox="0 0 200 200" className="border border-border rounded-lg bg-background p-2">
        {/* Cone body - two slant lines */}
        <line x1="100" y1="20" x2="40" y2="170" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="100" y1="20" x2="160" y2="170" stroke="hsl(var(--foreground))" strokeWidth="2" />
        
        {/* Base ellipse */}
        <ellipse cx="100" cy="170" rx="60" ry="15" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
        
        {/* Height dashed line */}
        <line x1="100" y1="20" x2="100" y2="170" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="5,4" />
        
        {/* Radius line */}
        <line x1="100" y1="170" x2="160" y2="170" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="5,4" />
        
        {/* Right angle marker */}
        <rect x="100" y="160" width="8" height="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        
        {/* Labels */}
        <text x="85" y="100" fontSize="11" fill="hsl(var(--primary))" className="select-none">10.4 cm</text>
        <text x="115" y="185" fontSize="11" fill="hsl(var(--primary))" className="select-none">4.5 cm</text>
        
        {/* NOT TO SCALE */}
        <text x="145" y="25" fontSize="9" fill="hsl(var(--muted-foreground))" className="select-none">NOT TO</text>
        <text x="145" y="35" fontSize="9" fill="hsl(var(--muted-foreground))" className="select-none">SCALE</text>
      </svg>
    </div>
  );
}
