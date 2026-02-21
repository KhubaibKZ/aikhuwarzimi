// Q7 - Composite shape made of 5 rectangles (3cm × 8cm)
// Layout: 3 vertical rectangles on top, 2 horizontal rectangles on bottom
// Matching the exam paper diagram

export function CompositeRectangles() {
  const scale = 12; // pixels per cm
  const w = 8 * scale; // 8cm = width of rectangle
  const h = 3 * scale; // 3cm = height of rectangle

  return (
    <div className="flex justify-center py-4">
      <svg width="320" height="240" viewBox="0 0 320 240" className="border border-border rounded-lg bg-background p-2">
        {/* 3 vertical rectangles on top row */}
        <rect x="20" y="20" width={h} height={w} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x={20 + h} y="20" width={h} height={w} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <rect x={20 + 2 * h} y="20" width={h} height={w} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* 2 horizontal rectangles on bottom row */}
        <rect x="20" y={20 + w} width={w} height={h} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <rect x={20 + w} y={20 + w} width={w} height={h} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Dimension labels */}
        <text x={20 + h / 2} y="15" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" className="select-none">3 cm</text>
        <text x="12" y={20 + w / 2} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" className="select-none" transform={`rotate(-90, 12, ${20 + w / 2})`}>8 cm</text>

        {/* NOT TO SCALE label */}
        <text x="270" y="30" fontSize="9" fill="hsl(var(--muted-foreground))" className="select-none">NOT TO</text>
        <text x="270" y="42" fontSize="9" fill="hsl(var(--muted-foreground))" className="select-none">SCALE</text>
      </svg>
    </div>
  );
}
