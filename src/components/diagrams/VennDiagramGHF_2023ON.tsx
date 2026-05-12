// Q18(b) 4024/11 Oct/Nov 2023 — three sets G, H, F (no shading)

export function VennDiagramGHF_2023ON() {
  const r = 70;
  const G = { cx: 120, cy: 110 };
  const H = { cx: 200, cy: 110 };
  const F = { cx: 160, cy: 180 };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 320 280" className="w-full">
        {/* Universal set */}
        <rect x="10" y="10" width="300" height="260" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="22" y="28" className="text-[12px] fill-foreground font-bold">ξ</text>

        {/* Circles outline */}
        <circle cx={G.cx} cy={G.cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx={H.cx} cy={H.cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx={F.cx} cy={F.cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Labels */}
        <text x={G.cx - r - 4} y={G.cy - r - 4} className="text-[13px] fill-foreground font-bold">G</text>
        <text x={H.cx + r - 4} y={H.cy - r - 4} className="text-[13px] fill-foreground font-bold">H</text>
        <text x={F.cx + r + 4} y={F.cy + r + 8} className="text-[13px] fill-foreground font-bold">F</text>
      </svg>
    </div>
  );
}
