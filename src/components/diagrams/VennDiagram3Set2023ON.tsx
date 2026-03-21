// 3-set Venn diagram for Q18 4024/11 Oct/Nov 2023
// R (Run), C (Cycle), S (Sail) — 40 members

export function VennDiagram3Set2023ON() {
  const cx = 150, cy = 120;
  const r = 55;
  const dx = 35, dy = 20;

  const circles = [
    { cx: cx - dx, cy: cy - dy, label: 'R' },
    { cx: cx + dx, cy: cy - dy, label: 'C' },
    { cx: cx, cy: cy + dy + 10, label: 'S' },
  ];

  return (
    <svg viewBox="0 0 300 240" className="w-full max-w-sm mx-auto">
      {/* Universal set rectangle */}
      <rect x="10" y="10" width="280" height="220" rx="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <text x="22" y="28" className="text-[11px] fill-foreground font-bold">ξ</text>

      {/* Circles */}
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={r} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      ))}

      {/* Labels outside circles */}
      <text x={cx - dx - r - 8} y={cy - dy - r + 10} className="text-[13px] fill-foreground font-bold">R</text>
      <text x={cx + dx + r - 4} y={cy - dy - r + 10} className="text-[13px] fill-foreground font-bold">C</text>
      <text x={cx + r - 4} y={cy + dy + 10 + r + 14} className="text-[13px] fill-foreground font-bold">S</text>

      {/* Region labels (to be filled by student) */}
      {/* R only */}
      <text x={cx - dx - 30} y={cy - dy - 5} textAnchor="middle" className="text-[11px] fill-muted-foreground">R only</text>
      {/* C only */}
      <text x={cx + dx + 30} y={cy - dy - 5} textAnchor="middle" className="text-[11px] fill-muted-foreground">C only</text>
      {/* S only */}
      <text x={cx} y={cy + dy + 40} textAnchor="middle" className="text-[11px] fill-muted-foreground">S only</text>

      {/* Given values in regions */}
      {/* R only = 6 */}
      <text x={cx - dx - 28} y={cy - dy + 10} textAnchor="middle" className="text-[12px] fill-primary font-bold">6</text>
      {/* R∩C not S = 9 */}
      <text x={cx} y={cy - dy - 10} textAnchor="middle" className="text-[12px] fill-primary font-bold">9</text>
      {/* R∩S not C = 5 */}
      <text x={cx - dx - 5} y={cy + 18} textAnchor="middle" className="text-[12px] fill-primary font-bold">5</text>
      {/* C∩S not R = 3 */}
      <text x={cx + dx + 5} y={cy + 18} textAnchor="middle" className="text-[12px] fill-primary font-bold">3</text>
    </svg>
  );
}
