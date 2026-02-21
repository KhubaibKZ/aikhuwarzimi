// Q23 - Similar triangles for 0580/11 MJ 2020
// Triangle ABC: A=37°, B=78°, C=65° (small, left)
// Triangle PQR: Q=78°, R=65°, P=37° (large, right)

export function SimilarTriangles() {
  return (
    <div className="flex justify-center py-4">
      <svg width="380" height="220" viewBox="0 0 380 220" className="border border-border rounded-lg bg-background p-2">
        {/* Triangle ABC (smaller, left) */}
        <polygon
          points="30,170 130,170 80,60"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        {/* Labels for ABC */}
        <text x="25" y="185" fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold" className="select-none">A</text>
        <text x="132" y="185" fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold" className="select-none">C</text>
        <text x="75" y="52" fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold" className="select-none">B</text>
        
        {/* Angle arcs for ABC */}
        {/* Angle A = 37° */}
        <path d="M 45,170 Q 47,158 55,152" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="50" y="163" fontSize="10" fill="hsl(var(--primary))" className="select-none">37°</text>
        
        {/* Angle B = 78° */}
        <path d="M 72,72 Q 80,80 88,72" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="72" y="85" fontSize="10" fill="hsl(var(--primary))" className="select-none">78°</text>
        
        {/* NOT TO SCALE */}
        <text x="290" y="30" fontSize="10" fill="hsl(var(--muted-foreground))" className="select-none">NOT TO</text>
        <text x="290" y="42" fontSize="10" fill="hsl(var(--muted-foreground))" className="select-none">SCALE</text>

        {/* Triangle PQR (larger, right) */}
        <polygon
          points="180,190 350,190 280,30"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        {/* Labels for PQR */}
        <text x="350" y="205" fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold" className="select-none">P</text>
        <text x="170" y="205" fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold" className="select-none">Q</text>
        <text x="278" y="22" fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold" className="select-none">R</text>
        
        {/* Angle Q = 78° */}
        <path d="M 195,190 Q 200,175 210,170" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="195" y="180" fontSize="10" fill="hsl(var(--primary))" className="select-none">78°</text>
        
        {/* Angle R = 65° */}
        <path d="M 270,42 Q 280,48 290,42" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="270" y="55" fontSize="10" fill="hsl(var(--primary))" className="select-none">65°</text>
      </svg>
    </div>
  );
}
