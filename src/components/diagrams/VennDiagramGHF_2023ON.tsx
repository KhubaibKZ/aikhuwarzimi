// Q18(b) 4024/11 Oct/Nov 2023 — three sets F (top-left), G (top-right), H (bottom)
// Shaded region: G ∩ H ∩ F' (inside G and H, outside F)

export function VennDiagramGHF_2023ON() {
  const r = 70;
  const F = { cx: 120, cy: 110 };
  const G = { cx: 200, cy: 110 };
  const H = { cx: 160, cy: 180 };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 320 280" className="w-full">
        <defs>
          {/* Clip to G ∩ H, then knock out F using a mask */}
          <clipPath id="ghClipG">
            <circle cx={G.cx} cy={G.cy} r={r} />
          </clipPath>
          <mask id="notF" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="320" height="280" fill="white" />
            <circle cx={F.cx} cy={F.cy} r={r} fill="black" />
          </mask>
        </defs>

        {/* Universal set */}
        <rect x="10" y="10" width="300" height="260" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="22" y="28" className="text-[12px] fill-foreground font-bold">ξ</text>

        {/* Shaded region: inside G, inside H, outside F */}
        <g clipPath="url(#ghClipG)" mask="url(#notF)">
          <circle cx={H.cx} cy={H.cy} r={r} fill="hsl(var(--muted-foreground) / 0.45)" />
        </g>

        {/* Circle outlines on top */}
        <circle cx={F.cx} cy={F.cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx={G.cx} cy={G.cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx={H.cx} cy={H.cy} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Labels */}
        <text x={F.cx - r - 4} y={F.cy - r - 4} className="text-[13px] fill-foreground font-bold">F</text>
        <text x={G.cx + r - 4} y={G.cy - r - 4} className="text-[13px] fill-foreground font-bold">G</text>
        <text x={H.cx + r + 4} y={H.cy + r + 8} className="text-[13px] fill-foreground font-bold">H</text>
      </svg>
    </div>
  );
}
