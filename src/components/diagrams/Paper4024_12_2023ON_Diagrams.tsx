// Diagrams for 4024/12 Oct/Nov 2023 — visual references matching the QP
// All scaled to fit the workspace and use semantic theme tokens.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import q6ParallelLines2023ONSrc from "@/assets/q6-parallel-lines-2023ON.png";

const fg = "hsl(var(--foreground))";
const mu = "hsl(var(--muted-foreground))";
const pr = "hsl(var(--primary))";
const ac = "hsl(var(--accent))";

// ───────────────────────────── Q2: Rectangle split into squares ─────────────────────────────
// Big rectangle is 3 large squares wide × 2 large squares tall (each large = 4 small units).
// Some squares of two sizes; 5 small units shaded out of 21 small units total area equivalent.
export function RectangleSquares_4024_12_2023ON() {
  // 7 unit cols × 3 unit rows. Composition (matches QP figure):
  //  Row 0: [1×1][1×1][--2×2 white--][1×1 SHADED][1×1][1×1]
  //  Row 1: [--2×2 SHADED--][ 2×2 white cont. ][1×1 white][--2×2 white--]
  //  Row 2: [  2×2 SHADED cont.  ][1×1][1×1][1×1][ 2×2 white cont. ]
  // Total small-unit area = 21. Shaded units = 5 (grey 1×1 + shaded 2×2). Answer = 5/21.
  const u = 38;
  const W = 7 * u, H = 3 * u;
  const sw = 1.6;
  const shade = "hsl(var(--muted-foreground) / 0.55)";
  return (
    <svg viewBox={`0 0 ${W + 20} ${H + 20}`} className="w-full max-w-md mx-auto">
      <g transform="translate(10,10)">
        {/* Shaded cells first (so borders sit on top) */}
        {/* Top single grey square (col 4, row 0) */}
        <rect x={4 * u} y={0} width={u} height={u} fill={shade} />
        {/* Big 2×2 shaded square (cols 0-1, rows 1-2) */}
        <rect x={0} y={u} width={2 * u} height={2 * u} fill={shade} />

        {/* Outer rectangle */}
        <rect x={0} y={0} width={W} height={H} fill="none" stroke={fg} strokeWidth={sw} />

        {/* Row 0 dividers between the two 1×1 squares on the left */}
        <line x1={u} y1={0} x2={u} y2={u} stroke={fg} strokeWidth={sw} />
        {/* divider between second small square and the 2×2 white */}
        <line x1={2 * u} y1={0} x2={2 * u} y2={u} stroke={fg} strokeWidth={sw} />
        {/* divider between 2×2 white and grey square (top) */}
        <line x1={4 * u} y1={0} x2={4 * u} y2={u} stroke={fg} strokeWidth={sw} />
        {/* divider between grey square and the two small squares on the right */}
        <line x1={5 * u} y1={0} x2={5 * u} y2={u} stroke={fg} strokeWidth={sw} />
        {/* divider between the two top-right small squares */}
        <line x1={6 * u} y1={0} x2={6 * u} y2={u} stroke={fg} strokeWidth={sw} />
        {/* horizontal line under the row of small squares (cols 0-1 and 4-6) */}
        <line x1={0} y1={u} x2={2 * u} y2={u} stroke={fg} strokeWidth={sw} />
        <line x1={4 * u} y1={u} x2={W} y2={u} stroke={fg} strokeWidth={sw} />

        {/* 2×2 white top-middle: outline (cols 2-3, rows 0-1) — already implied by outer + above lines */}
        {/* Right side: separator between the small 1×1 (col 4 row 1) and the right 2×2 white */}
        <line x1={5 * u} y1={u} x2={5 * u} y2={H} stroke={fg} strokeWidth={sw} />
        {/* boundary of top 2×2 white at bottom (y = 2u, cols 2-5) */}
        <line x1={2 * u} y1={2 * u} x2={5 * u} y2={2 * u} stroke={fg} strokeWidth={sw} />
        {/* bottom row 1×1 dividers (cols 2,3,4 row 2): vertical lines at x=3u and x=4u from 2u to 3u */}
        <line x1={3 * u} y1={2 * u} x2={3 * u} y2={H} stroke={fg} strokeWidth={sw} />
        <line x1={4 * u} y1={2 * u} x2={4 * u} y2={H} stroke={fg} strokeWidth={sw} />
        {/* divider between shaded 2×2 (cols 0-1) and the column-2 small square (also defines top 2×2 left edge) */}
        <line x1={2 * u} y1={u} x2={2 * u} y2={H} stroke={fg} strokeWidth={sw} />
      </g>
    </svg>
  );
}

// ───────────────────────────── Q6: Parallel lines ABF=73° ─────────────────────────────
export function ParallelLines_4024_12_2023ON() {
  return (
    <img
      src={q6ParallelLines2023ONSrc}
      alt="Parallel lines diagram for question 6 with points A, B, C, D, E, F and angles x, y, and 73 degrees"
      className="w-full max-w-2xl mx-auto bg-white p-2"
    />
  );
}

// ───────────────────────────── Q7: Transformation grid (A, P, Q) ─────────────────────────────
export function TransformGrid_4024_12_2023ON() {
  const s = 22, pad = 28;
  const xMin = -8, xMax = 7, yMin = -7, yMax = 6;
  const w = (xMax - xMin) * s + pad * 2;
  const h = (yMax - yMin) * s + pad * 2;
  const X = (x: number) => pad + (x - xMin) * s;
  const Y = (y: number) => pad + (yMax - y) * s;

  const grid: JSX.Element[] = [];
  for (let i = xMin; i <= xMax; i++) {
    grid.push(<line key={`v${i}`} x1={X(i)} y1={Y(yMax)} x2={X(i)} y2={Y(yMin)}
      stroke="hsl(var(--border))" strokeWidth={0.6} strokeDasharray={i === 0 ? undefined : '2 2'} />);
  }
  for (let j = yMin; j <= yMax; j++) {
    grid.push(<line key={`h${j}`} x1={X(xMin)} y1={Y(j)} x2={X(xMax)} y2={Y(j)}
      stroke="hsl(var(--border))" strokeWidth={0.6} strokeDasharray={j === 0 ? undefined : '2 2'} />);
  }

  // Axes
  const axes = (
    <>
      <line x1={X(xMin)} y1={Y(0)} x2={X(xMax)} y2={Y(0)} stroke={fg} strokeWidth={1.3} />
      <line x1={X(0)} y1={Y(yMax)} x2={X(0)} y2={Y(yMin)} stroke={fg} strokeWidth={1.3} />
      {/* arrows */}
      <polygon points={`${X(xMax)},${Y(0)} ${X(xMax) - 7},${Y(0) - 4} ${X(xMax) - 7},${Y(0) + 4}`} fill={fg} />
      <polygon points={`${X(0)},${Y(yMax)} ${X(0) - 4},${Y(yMax) + 7} ${X(0) + 4},${Y(yMax) + 7}`} fill={fg} />
      <text x={X(xMax) + 8} y={Y(0) + 4} fontSize={12} fill={fg}>x</text>
      <text x={X(0) + 6} y={Y(yMax) - 4} fontSize={12} fill={fg}>y</text>
      <text x={X(0) - 8} y={Y(0) + 14} fontSize={10} fill={mu}>0</text>
    </>
  );

  // Axis number labels
  const xLabels = [];
  for (let i = xMin; i <= xMax; i++) if (i !== 0) xLabels.push(
    <text key={`xl${i}`} x={X(i)} y={Y(0) + 14} fontSize={10} fill={mu} textAnchor="middle">{i}</text>
  );
  const yLabels = [];
  for (let j = yMin; j <= yMax; j++) if (j !== 0) yLabels.push(
    <text key={`yl${j}`} x={X(0) - 6} y={Y(j) + 3} fontSize={10} fill={mu} textAnchor="end">{j}</text>
  );

  // Shape A: square (1,2)-(3,4) shaded
  const A = `${X(1)},${Y(2)} ${X(3)},${Y(2)} ${X(3)},${Y(4)} ${X(1)},${Y(4)}`;
  // Triangle P: (5,1),(6,1),(6,3) — right angle at (6,1)
  const P = `${X(5)},${Y(1)} ${X(6)},${Y(1)} ${X(6)},${Y(3)}`;
  // Triangle Q: (1,-5),(1,-6),(3,-6) — right angle at (1,-6)
  const Q = `${X(1)},${Y(-5)} ${X(1)},${Y(-6)} ${X(3)},${Y(-6)}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto bg-white rounded-md">
      {grid}
      {axes}
      {xLabels}
      {yLabels}
      <polygon points={A} fill="hsl(var(--muted-foreground)/0.45)" stroke={fg} strokeWidth={1.2} />
      <text x={X(2.4)} y={Y(3.4)} fontSize={12} fill={fg} fontStyle="italic" fontWeight="bold">A</text>
      <polygon points={P} fill="none" stroke={fg} strokeWidth={1.4} />
      <text x={X(5.85)} y={Y(1.7)} fontSize={12} fill={fg} fontStyle="italic" fontWeight="bold">P</text>
      <polygon points={Q} fill="none" stroke={fg} strokeWidth={1.4} />
      <text x={X(1.4)} y={Y(-5.55)} fontSize={12} fill={fg} fontStyle="italic" fontWeight="bold">Q</text>
    </svg>
  );
}


// ───────────────────────────── Q14: Triangle ABC for measure/construct ─────────────────────────────
export function TriangleConstruct_4024_12_2023ON() {
  // ABC with AB ~ 8cm, BC ~ 7cm, angle ABC ≈ 49°
  const A = { x: 40, y: 220 };
  const C = { x: 280, y: 220 };
  const B = { x: 90, y: 60 };
  return (
    <svg viewBox="0 0 320 260" className="w-full max-w-md mx-auto">
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke={fg} strokeWidth={1.6} />
      <text x={A.x - 14} y={A.y + 4} fontSize={13} fill={fg} fontWeight="bold">A</text>
      <text x={B.x - 4} y={B.y - 6} fontSize={13} fill={fg} fontWeight="bold">B</text>
      <text x={C.x + 4} y={C.y + 4} fontSize={13} fill={fg} fontWeight="bold">C</text>
      {/* Angle B marker */}
      <path d={`M ${B.x + 14} ${B.y + 6} A 18 18 0 0 0 ${B.x + 6} ${B.y + 22}`} fill="none" stroke={pr} strokeWidth={1.4} />
      <text x={B.x + 18} y={B.y + 22} fontSize={11} fill={pr} fontWeight="bold">?</text>
      <text x={150} y={250} fontSize={10} fill={mu} textAnchor="middle">(measure ∠ABC; construct ⊥ bisector of AC)</text>
    </svg>
  );
}

// ───────────────────────────── Q17: Interactive cumulative frequency workspace ─────────────────────────────
// Shows the exact data table from the question paper, plus an empty grid where
// students can click to mark points and then optionally join them. No curve is
// pre-drawn — students do the plotting themselves.
export function CumulativeFrequency_4024_12_2023ON() {
  const ox = 50, oy = 20, w = 360, h = 240;
  const xMax = 12, yMax = 80;
  const X = (v: number) => ox + (v / xMax) * w;
  const Y = (v: number) => oy + h - (v / yMax) * h;
  // Snap clicks to nearest 0.5 cm on x and nearest 2 on y
  const snap = (raw: number, step: number) => Math.round(raw / step) * step;

  const headers: Array<{ label: string; cf: number }> = [
    { label: "h ⩽ 2", cf: 4 },
    { label: "h ⩽ 4", cf: 18 },
    { label: "h ⩽ 6", cf: 42 },
    { label: "h ⩽ 8", cf: 60 },
    { label: "h ⩽ 10", cf: 72 },
    { label: "h ⩽ 12", cf: 80 },
  ];

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [joined, setJoined] = useState(false);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const sx = vb.width / rect.width;
    const sy = vb.height / rect.height;
    const px = (e.clientX - rect.left) * sx;
    const py = (e.clientY - rect.top) * sy;
    // Convert back to data coords
    const dx = ((px - ox) / w) * xMax;
    const dy = ((oy + h - py) / h) * yMax;
    if (dx < 0 || dx > xMax || dy < 0 || dy > yMax) return;
    const nx = snap(dx, 0.5);
    const ny = snap(dy, 2);
    setPoints((prev) => [...prev, { x: nx, y: ny }]);
  };

  const removePoint = (i: number) => {
    setPoints((prev) => prev.filter((_, idx) => idx !== i));
  };

  const clearAll = () => {
    setPoints([]);
    setJoined(false);
  };

  const sorted = [...points].sort((a, b) => a.x - b.x);
  const pathD = sorted
    .map((p, i) => `${i === 0 ? "M" : "L"} ${X(p.x)} ${Y(p.y)}`)
    .join(" ");

  // Gridlines: x every 1 cm (minor 0.5), y every 10 (minor 2)
  const xMajor = Array.from({ length: xMax + 1 }, (_, i) => i);
  const xMinor: number[] = [];
  for (let i = 0; i <= xMax * 2; i++) {
    const v = i / 2;
    if (!xMajor.includes(v)) xMinor.push(v);
  }
  const yMajor = [0, 10, 20, 30, 40, 50, 60, 70, 80];
  const yMinor: number[] = [];
  for (let i = 0; i <= yMax; i += 2) {
    if (!yMajor.includes(i)) yMinor.push(i);
  }

  return (
    <div className="space-y-3">
      {/* Data table — matches QP exactly */}
      <div className="overflow-x-auto">
        <table className="border-collapse mx-auto text-sm">
          <tbody>
            <tr>
              <th className="border border-foreground px-3 py-2 text-left font-normal align-middle">
                Height
                <br />(<em>h</em> centimetres)
              </th>
              {headers.map((c) => (
                <th key={c.label} className="border border-foreground px-4 py-2 font-normal italic">
                  {c.label}
                </th>
              ))}
            </tr>
            <tr>
              <th className="border border-foreground px-3 py-2 text-left font-normal align-middle">
                Cumulative
                <br />frequency
              </th>
              {headers.map((c) => (
                <td key={c.label} className="border border-foreground px-4 py-2 text-center">
                  {c.cf}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" variant={joined ? "default" : "outline"} onClick={() => setJoined((j) => !j)} disabled={points.length < 2}>
          {joined ? "Hide line" : "Join points"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setPoints((p) => p.slice(0, -1))} disabled={points.length === 0}>
          Undo
        </Button>
        <Button size="sm" variant="outline" onClick={clearAll} disabled={points.length === 0}>
          Clear
        </Button>
        <span className="text-xs text-muted-foreground">{points.length} point{points.length === 1 ? "" : "s"} • tap a point to remove</span>
      </div>

      {/* Interactive grid */}
      <svg
        viewBox={`0 0 ${ox + w + 20} ${oy + h + 50}`}
        className="w-full max-w-2xl mx-auto bg-white rounded-md cursor-crosshair touch-none"
        onClick={handleClick}
      >
        {/* Minor gridlines */}
        {xMinor.map((v) => (
          <line key={`gxm${v}`} x1={X(v)} y1={oy} x2={X(v)} y2={oy + h} stroke="hsl(var(--border))" strokeWidth={0.4} />
        ))}
        {yMinor.map((v) => (
          <line key={`gym${v}`} x1={ox} y1={Y(v)} x2={ox + w} y2={Y(v)} stroke="hsl(var(--border))" strokeWidth={0.4} />
        ))}
        {/* Major gridlines */}
        {xMajor.map((v) => (
          <line key={`gx${v}`} x1={X(v)} y1={oy} x2={X(v)} y2={oy + h} stroke="hsl(var(--border))" strokeWidth={0.9} />
        ))}
        {yMajor.map((v) => (
          <line key={`gy${v}`} x1={ox} y1={Y(v)} x2={ox + w} y2={Y(v)} stroke="hsl(var(--border))" strokeWidth={0.9} />
        ))}
        {/* Axes */}
        <line x1={ox} y1={oy} x2={ox} y2={oy + h} stroke={fg} strokeWidth={1.5} />
        <line x1={ox} y1={oy + h} x2={ox + w} y2={oy + h} stroke={fg} strokeWidth={1.5} />
        {/* Axis labels */}
        {xMajor.map((v) => (
          <text key={`xl${v}`} x={X(v)} y={oy + h + 14} fontSize={11} fill={mu} textAnchor="middle">{v}</text>
        ))}
        {yMajor.map((v) => (
          <text key={`yl${v}`} x={ox - 6} y={Y(v) + 4} fontSize={11} fill={mu} textAnchor="end">{v}</text>
        ))}
        <text x={ox + w / 2} y={oy + h + 36} fontSize={12} fill={fg} textAnchor="middle">Height (cm)</text>
        <text x={16} y={oy + h / 2} fontSize={12} fill={fg} textAnchor="middle" transform={`rotate(-90 16 ${oy + h / 2})`}>
          Cumulative frequency
        </text>
        {/* Joined line */}
        {joined && sorted.length >= 2 && (
          <path d={pathD} fill="none" stroke={pr} strokeWidth={2} />
        )}
        {/* Plotted points */}
        {points.map((p, i) => (
          <g key={`pt${i}`} onClick={(e) => { e.stopPropagation(); removePoint(i); }} className="cursor-pointer">
            <circle cx={X(p.x)} cy={Y(p.y)} r={6} fill="transparent" />
            <circle cx={X(p.x)} cy={Y(p.y)} r={3.5} fill={pr} stroke={fg} strokeWidth={0.8} />
          </g>
        ))}
      </svg>
    </div>
  );
}


// ───────────────────────────── Q18: Speed-time graph (cyclists A, B) ─────────────────────────────
export function SpeedTime_4024_12_2023ON() {
  const ox = 50, oy = 20, w = 300, h = 180;
  const X = (t: number) => ox + (t / 20) * w;
  const Y = (s: number) => oy + h - (s / 8) * h;
  // A: (0,0) → (20,6) straight
  // B: (0,1) → (20,7)
  return (
    <svg viewBox={`0 0 ${ox + w + 20} ${oy + h + 50}`} className="w-full max-w-lg mx-auto">
      {[0, 4, 8, 12, 16, 20].map(t => <line key={`gx${t}`} x1={X(t)} y1={oy} x2={X(t)} y2={oy + h} stroke="hsl(var(--border))" strokeWidth={0.6} />)}
      {[0, 2, 4, 6, 8].map(s => <line key={`gy${s}`} x1={ox} y1={Y(s)} x2={ox + w} y2={Y(s)} stroke="hsl(var(--border))" strokeWidth={0.6} />)}
      <line x1={ox} y1={oy} x2={ox} y2={oy + h} stroke={fg} strokeWidth={1.4} />
      <line x1={ox} y1={oy + h} x2={ox + w} y2={oy + h} stroke={fg} strokeWidth={1.4} />
      {/* Cyclist A */}
      <line x1={X(0)} y1={Y(0)} x2={X(20)} y2={Y(6)} stroke={pr} strokeWidth={2} />
      <text x={X(20) + 4} y={Y(6) + 4} fontSize={11} fill={pr} fontWeight="bold">A</text>
      {/* Cyclist B */}
      <line x1={X(0)} y1={Y(1)} x2={X(20)} y2={Y(7)} stroke={ac} strokeWidth={2} />
      <text x={X(20) + 4} y={Y(7) + 4} fontSize={11} fill={ac} fontWeight="bold">B</text>
      {[0, 4, 8, 12, 16, 20].map(t => <text key={`xl${t}`} x={X(t)} y={oy + h + 14} fontSize={10} fill={mu} textAnchor="middle">{t}</text>)}
      {[0, 2, 4, 6, 8].map(s => <text key={`yl${s}`} x={ox - 6} y={Y(s) + 4} fontSize={10} fill={mu} textAnchor="end">{s}</text>)}
      <text x={ox + w / 2} y={oy + h + 32} fontSize={11} fill={fg} textAnchor="middle">Time (s)</text>
      <text x={14} y={oy + h / 2} fontSize={11} fill={fg} textAnchor="middle" transform={`rotate(-90 14 ${oy + h / 2})`}>Speed (m/s)</text>
    </svg>
  );
}

// ───────────────────────────── Q21: Two sectors ─────────────────────────────
export function TwoSectors_4024_12_2023ON() {
  // Sector A: centre D, radius 3y, angle 6x° (drawn obtuse ~120°)
  // Sector B: centre P, radius y, angle x° (drawn ~20°)
  return (
    <svg viewBox="0 0 360 220" className="w-full max-w-lg mx-auto">
      {/* Sector A circle */}
      <g transform="translate(90,110)">
        <circle r={70} fill="hsl(var(--primary)/0.06)" stroke={fg} strokeWidth={1.4} />
        {/* Sector lines DE, DF — angle 6x° */}
        <line x1={0} y1={0} x2={70} y2={0} stroke={fg} strokeWidth={1.5} />
        <line x1={0} y1={0} x2={-35} y2={-60.6} stroke={fg} strokeWidth={1.5} />
        {/* Major arc shading */}
        <path d="M 70 0 A 70 70 0 1 0 -35 -60.6 L 0 0 Z" fill={pr} fillOpacity={0.18} />
        <text x={0} y={5} fontSize={11} fill={fg} fontWeight="bold" textAnchor="middle">D</text>
        <text x={76} y={4} fontSize={11} fill={fg} fontWeight="bold">E</text>
        <text x={-46} y={-62} fontSize={11} fill={fg} fontWeight="bold">F</text>
        <text x={36} y={-30} fontSize={10} fill={pr} fontWeight="bold">3y</text>
        <text x={20} y={-10} fontSize={10} fill={pr} fontWeight="bold">6x°</text>
      </g>
      {/* Sector B */}
      <g transform="translate(260,110)">
        <circle r={50} fill="hsl(var(--accent)/0.06)" stroke={fg} strokeWidth={1.4} />
        <line x1={0} y1={0} x2={50} y2={0} stroke={fg} strokeWidth={1.5} />
        <line x1={0} y1={0} x2={47} y2={-17} stroke={fg} strokeWidth={1.5} />
        <path d="M 50 0 A 50 50 0 0 0 47 -17 L 0 0 Z" fill={ac} fillOpacity={0.25} />
        <text x={0} y={14} fontSize={11} fill={fg} fontWeight="bold" textAnchor="middle">P</text>
        <text x={56} y={4} fontSize={11} fill={fg} fontWeight="bold">R</text>
        <text x={50} y={-22} fontSize={11} fill={fg} fontWeight="bold">Q</text>
        <text x={28} y={-4} fontSize={10} fill={ac} fontWeight="bold">y</text>
        <text x={28} y={-12} fontSize={10} fill={ac} fontWeight="bold">x°</text>
      </g>
    </svg>
  );
}

// ───────────────────────────── Q23: 3-set Venn (H, S, G) ─────────────────────────────
export function VennHSG_4024_12_2023ON() {
  const cx = 160, cy = 130, r = 60;
  return (
    <svg viewBox="0 0 320 250" className="w-full max-w-md mx-auto">
      <rect x={10} y={10} width={300} height={230} rx={6} fill="none" stroke={fg} strokeWidth={1.4} />
      <text x={22} y={28} fontSize={11} fill={fg} fontWeight="bold">ξ = 40</text>
      <circle cx={cx - 32} cy={cy - 18} r={r} fill="hsl(var(--primary)/0.06)" stroke={fg} strokeWidth={1.4} />
      <circle cx={cx + 32} cy={cy - 18} r={r} fill="hsl(var(--primary)/0.06)" stroke={fg} strokeWidth={1.4} />
      <circle cx={cx} cy={cy + 28} r={r} fill="hsl(var(--primary)/0.06)" stroke={fg} strokeWidth={1.4} />
      <text x={cx - 32 - r - 4} y={cy - 18 - r + 8} fontSize={13} fill={fg} fontWeight="bold">H</text>
      <text x={cx + 32 + r - 6} y={cy - 18 - r + 8} fontSize={13} fill={fg} fontWeight="bold">S</text>
      <text x={cx + r - 6} y={cy + 28 + r + 14} fontSize={13} fill={fg} fontWeight="bold">G</text>
      {/* Centre = 2 (all three) */}
      <text x={cx} y={cy + 8} fontSize={12} fill={pr} fontWeight="bold" textAnchor="middle">2</text>
      <text x={cx} y={cy - 28} fontSize={12} fill={mu} textAnchor="middle">0</text>
    </svg>
  );
}

// ───────────────────────────── Q24: Triangle OAB with point P ─────────────────────────────
export function TriangleOAB_4024_12_2023ON() {
  const O = { x: 40, y: 200 };
  const A = { x: 240, y: 200 };
  const B = { x: 140, y: 40 };
  // P on AB with AP:PB = 2:3 → P = A + (2/5)(B-A)
  const P = { x: A.x + (2 / 5) * (B.x - A.x), y: A.y + (2 / 5) * (B.y - A.y) };
  return (
    <svg viewBox="0 0 280 240" className="w-full max-w-md mx-auto">
      <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke={fg} strokeWidth={1.6} />
      <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke={fg} strokeWidth={1.6} />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={fg} strokeWidth={1.6} />
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke={pr} strokeWidth={1.4} strokeDasharray="4 3" />
      <circle cx={O.x} cy={O.y} r={3} fill={fg} />
      <circle cx={A.x} cy={A.y} r={3} fill={fg} />
      <circle cx={B.x} cy={B.y} r={3} fill={fg} />
      <circle cx={P.x} cy={P.y} r={3} fill={pr} />
      <text x={O.x - 14} y={O.y + 6} fontSize={13} fill={fg} fontWeight="bold">O</text>
      <text x={A.x + 6} y={A.y + 6} fontSize={13} fill={fg} fontWeight="bold">A</text>
      <text x={B.x - 4} y={B.y - 6} fontSize={13} fill={fg} fontWeight="bold">B</text>
      <text x={P.x + 6} y={P.y} fontSize={12} fill={pr} fontWeight="bold">P</text>
      <text x={(O.x + A.x) / 2} y={A.y + 16} fontSize={10} fill={mu} textAnchor="middle">4a</text>
      <text x={(O.x + P.x) / 2 - 8} y={(O.y + P.y) / 2} fontSize={10} fill={pr}>3a + 2b</text>
      <text x={(A.x + B.x) / 2 + 6} y={(A.y + B.y) / 2} fontSize={10} fill={mu}>AP:PB = 2:3</text>
    </svg>
  );
}
