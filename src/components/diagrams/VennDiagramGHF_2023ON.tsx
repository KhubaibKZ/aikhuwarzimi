// Q18(b) 4024/11 Oct/Nov 2023 — three sets G, H, F
// Shaded region = G ∩ H ∩ F' (inside G and H, outside F)

export function VennDiagramGHF_2023ON() {
  const r = 70;
  const G = { cx: 120, cy: 110 };
  const H = { cx: 200, cy: 110 };
  const F = { cx: 160, cy: 180 };

  // Build a clip path for G ∩ H ∩ F' using SVG masks.
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 320 280" className="w-full">
        <defs>
          {/* Mask: white = visible, black = hidden.
              We want G ∩ H minus F. So start from intersection of G and H (white),
              then subtract F (black). */}
          <mask id="ghMinusF">
            {/* G ∩ H : draw both circles in black, then their intersection in white
                via two clipPaths. Simpler: draw G in white, then keep only inside H
                using a second mask layer. We'll instead use filter approach:
                draw both filled white with multiply via mask-type=luminance is complex.
                Easier: hand-build with path arcs for the lens. */}
            <rect x="0" y="0" width="320" height="280" fill="black" />
            {/* Lens of G ∩ H: two circular arcs between the two circle intersections */}
            {(() => {
              // Compute intersection points of circles G and H
              const dx = H.cx - G.cx;
              const dy = H.cy - G.cy;
              const d = Math.hypot(dx, dy);
              const a = (d * d) / (2 * d); // since radii equal
              const h = Math.sqrt(r * r - a * a);
              const px = G.cx + (a * dx) / d;
              const py = G.cy + (a * dy) / d;
              const rx = -dy * (h / d);
              const ry = dx * (h / d);
              const p1 = { x: px + rx, y: py + ry };
              const p2 = { x: px - rx, y: py - ry };
              const dPath = `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} A ${r} ${r} 0 0 1 ${p1.x} ${p1.y} Z`;
              return <path d={dPath} fill="white" />;
            })()}
            {/* Subtract F */}
            <circle cx={F.cx} cy={F.cy} r={r} fill="black" />
          </mask>
        </defs>

        {/* Universal set */}
        <rect x="10" y="10" width="300" height="260" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="22" y="28" className="text-[12px] fill-foreground font-bold">ξ</text>

        {/* Shaded region (G ∩ H) \ F */}
        <rect x="0" y="0" width="320" height="280" fill="hsl(var(--primary) / 0.55)" mask="url(#ghMinusF)" />

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
