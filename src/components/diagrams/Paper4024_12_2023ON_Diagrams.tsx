// Diagrams for 4024/12 Oct/Nov 2023 — visual references matching the QP
// All scaled to fit the workspace and use semantic theme tokens.

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import q6ParallelLines2023ONSrc from "@/assets/q6-parallel-lines-2023ON.png";
import q21TwoSectorsSrc from "@/assets/pp_4024_on23_12_q21_diagram.png";

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

// ───────────────────────────── Q7: Transformation grid (A, P, Q) — INTERACTIVE ─────────────────────────────
// Replicates the exam diagram with shapes A (square), P and Q (triangles).
// Students click grid intersections to mark points, then "Join points" to draw
// a closed polygon. Used to draw the image of A after a transformation.
// Correct target shape: (-7,2),(-1,2),(-1,-4),(-4,-4),(-4,-1),(-7,-1)
export function TransformGrid_4024_12_2023ON({ onScore }: { onScore?: (s: { marks: number; note: string }) => void } = {}) {
  const s = 28, pad = 32;
  const xMin = -8, xMax = 7, yMin = -7, yMax = 6;
  const w = (xMax - xMin) * s + pad * 2;
  const h = (yMax - yMin) * s + pad * 2;
  const X = (x: number) => pad + (x - xMin) * s;
  const Y = (y: number) => pad + (yMax - y) * s;

  const TARGET: [number, number][] = [
    [-7, 2], [-1, 2], [-1, -4], [-4, -4], [-4, -1], [-7, -1],
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
    const dx = Math.round((px - pad) / s + xMin);
    const dy = Math.round(yMax - (py - pad) / s);
    if (dx < xMin || dx > xMax || dy < yMin || dy > yMax) return;
    setPoints((prev) => {
      if (prev.some((p) => p.x === dx && p.y === dy)) return prev;
      return [...prev, { x: dx, y: dy }];
    });
  };

  const undo = () => setPoints((p) => p.slice(0, -1));
  const clear = () => { setPoints([]); setJoined(false); };

  const checkCorrect = () => {
    if (points.length !== TARGET.length) return false;
    // Allow any rotation/reversal of the same polygon order
    const n = TARGET.length;
    const tryMatch = (arr: [number, number][]) => {
      for (let off = 0; off < n; off++) {
        let ok = true;
        for (let i = 0; i < n; i++) {
          const [tx, ty] = TARGET[(i + off) % n];
          if (arr[i][0] !== tx || arr[i][1] !== ty) { ok = false; break; }
        }
        if (ok) return true;
      }
      return false;
    };
    const fwd: [number, number][] = points.map((p) => [p.x, p.y]);
    return tryMatch(fwd) || tryMatch([...fwd].reverse());
  };
  const correct = joined && checkCorrect();

  useEffect(() => {
    if (!onScore) return;
    if (correct) {
      onScore({ marks: 3, note: 'B3: shape B drawn at correct vertices.' });
    } else {
      onScore({ marks: 0, note: 'Diagram not drawn correctly.' });
    }
  }, [correct, onScore]);

  const grid: JSX.Element[] = [];
  for (let i = xMin; i <= xMax; i++) {
    grid.push(<line key={`v${i}`} x1={X(i)} y1={Y(yMax)} x2={X(i)} y2={Y(yMin)}
      stroke="hsl(var(--border))" strokeWidth={0.6} strokeDasharray={i === 0 ? undefined : '2 2'} />);
  }
  for (let j = yMin; j <= yMax; j++) {
    grid.push(<line key={`h${j}`} x1={X(xMin)} y1={Y(j)} x2={X(xMax)} y2={Y(j)}
      stroke="hsl(var(--border))" strokeWidth={0.6} strokeDasharray={j === 0 ? undefined : '2 2'} />);
  }

  const xLabels = [];
  for (let i = xMin; i <= xMax; i++) if (i !== 0) xLabels.push(
    <text key={`xl${i}`} x={X(i)} y={Y(0) + 14} fontSize={10} fill={mu} textAnchor="middle">{i}</text>
  );
  const yLabels = [];
  for (let j = yMin; j <= yMax; j++) if (j !== 0) yLabels.push(
    <text key={`yl${j}`} x={X(0) - 6} y={Y(j) + 3} fontSize={10} fill={mu} textAnchor="end">{j}</text>
  );

  const A = `${X(2)},${Y(2)} ${X(3)},${Y(2)} ${X(3)},${Y(4)} ${X(1)},${Y(4)} ${X(1)},${Y(3)} ${X(2)},${Y(3)}`;
  const P = `${X(5)},${Y(1)} ${X(6)},${Y(1)} ${X(6)},${Y(3)}`;
  const Q = `${X(1)},${Y(-5)} ${X(1)},${Y(-6)} ${X(3)},${Y(-6)}`;

  const drawnPts = points.map((p) => `${X(p.x)},${Y(p.y)}`).join(' ');
  const strokeCol = correct ? "hsl(142 76% 45%)" : pr;

  // Pre-drawn shapes must be dark to show up on the white SVG background
  const diagramFg = "#111827";

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setJoined((j) => !j)} disabled={points.length < 2}>
          {joined ? 'Unjoin' : 'Join points'}
        </Button>
        <Button size="sm" variant="outline" onClick={undo} disabled={!points.length}>Undo</Button>
        <Button size="sm" variant="outline" onClick={clear} disabled={!points.length && !joined}>Clear</Button>
        <span className="text-xs text-muted-foreground">
          Click grid intersections to plot vertices, then join them.
        </span>
        {correct && (
          <span className="text-xs font-semibold text-green-600 ml-auto">✓ Correct shape</span>
        )}
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full bg-white rounded-md cursor-crosshair select-none"
        onClick={handleClick}
      >
        {grid}
        <line x1={X(xMin)} y1={Y(0)} x2={X(xMax)} y2={Y(0)} stroke={diagramFg} strokeWidth={1.3} />
        <line x1={X(0)} y1={Y(yMax)} x2={X(0)} y2={Y(yMin)} stroke={diagramFg} strokeWidth={1.3} />
        <polygon points={`${X(xMax)},${Y(0)} ${X(xMax) - 7},${Y(0) - 4} ${X(xMax) - 7},${Y(0) + 4}`} fill={diagramFg} />
        <polygon points={`${X(0)},${Y(yMax)} ${X(0) - 4},${Y(yMax) + 7} ${X(0) + 4},${Y(yMax) + 7}`} fill={diagramFg} />
        <text x={X(xMax) + 8} y={Y(0) + 4} fontSize={12} fill={diagramFg}>x</text>
        <text x={X(0) + 6} y={Y(yMax) - 4} fontSize={12} fill={diagramFg}>y</text>
        <text x={X(0) - 8} y={Y(0) + 14} fontSize={10} fill={mu}>0</text>
        {xLabels}
        {yLabels}
        <polygon points={A} fill="#374151" stroke={diagramFg} strokeWidth={1.2} />
        <text x={X(2.4)} y={Y(3.4)} fontSize={12} fill={diagramFg} fontStyle="italic" fontWeight="bold">A</text>
        <polygon points={P} fill="none" stroke={diagramFg} strokeWidth={1.4} />
        <text x={X(5.85)} y={Y(1.7)} fontSize={12} fill={diagramFg} fontStyle="italic" fontWeight="bold">P</text>
        <polygon points={Q} fill="none" stroke={diagramFg} strokeWidth={1.4} />
        <text x={X(1.4)} y={Y(-5.55)} fontSize={12} fill={diagramFg} fontStyle="italic" fontWeight="bold">Q</text>
        {/* User-drawn shape */}
        {joined && points.length >= 2 && (
          <polygon
            points={drawnPts}
            fill={correct ? "hsl(142 76% 45% / 0.18)" : "hsl(var(--primary) / 0.12)"}
            stroke={strokeCol}
            strokeWidth={1.8}
          />
        )}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={X(p.x)}
            cy={Y(p.y)}
            r={4}
            fill={strokeCol}
            stroke="white"
            strokeWidth={1}
            onClick={(e) => {
              e.stopPropagation();
              setPoints((prev) => prev.filter((_, idx) => idx !== i));
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>
    </div>
  );
}


// ───────────────────────────── Q14: Triangle ABC interactive (protractor + compass) ─────────────────────────────
export function TriangleConstruct_4024_12_2023ON({ onScore }: { onScore?: (s: { b: { marks: number; note: string }; c: { marks: number; note: string } }) => void } = {}) {
  // Diagram replicating the QP image: A top, B right, C bottom-left (∠ABC ≈ 49°)
  const W = 560, H = 380;
  const A = { x: 240, y: 50 };
  const B = { x: 470, y: 200 };
  const C = { x: 50, y: 320 };
  const diagramFg = "#111827";

  type Arc = { cx: number; cy: number; r: number };
  type Line = { x1: number; y1: number; x2: number; y2: number };

  const [tool, setTool] = useState<"protractor" | "arc" | "line">("protractor");
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const PX_PER_CM = 30; // diagram scale: 1 cm = 30 px (so 6 cm matches QP "6 cm from B")
  const [arcRadiusCm, setArcRadiusCm] = useState(6);
  const arcRadius = arcRadiusCm * PX_PER_CM;

  // Protractor state
  const [pPos, setPPos] = useState({ x: 470, y: 200 });
  const [pRot, setPRot] = useState(180); // rotated so straight edge faces up by default
  const [dragMode, setDragMode] = useState<null | "drag" | "rotate">(null);
  const [dragOff, setDragOff] = useState({ x: 0, y: 0 });
  const protractorR = 90;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const toSvgCoords = (e: { clientX: number; clientY: number }) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox?.baseVal;
    const vbW = vb && vb.width ? vb.width : W;
    const vbH = vb && vb.height ? vb.height : H;
    return {
      x: ((e.clientX - rect.left) / rect.width) * vbW,
      y: ((e.clientY - rect.top) / rect.height) * vbH,
    };
  };

  // Snap helper — snap to a vertex if within 20px
  const snapToVertex = (p: { x: number; y: number }) => {
    for (const V of [A, B, C]) {
      const d = Math.hypot(p.x - V.x, p.y - V.y);
      if (d < 22) return { ...V };
    }
    return p;
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (dragMode) return;
    const p = toSvgCoords(e);
    if (tool === "arc") {
      const snapped = snapToVertex(p);
      setArcs((prev) => [...prev, { cx: snapped.x, cy: snapped.y, r: arcRadius }]);
    } else if (tool === "line") {
      const snapped = snapToVertex(p);
      if (!lineStart) setLineStart(snapped);
      else {
        setLines((prev) => [...prev, { x1: lineStart.x, y1: lineStart.y, x2: snapped.x, y2: snapped.y }]);
        setLineStart(null);
      }
    }
  };

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragMode) return;
    const p = toSvgCoords(e);
    if (dragMode === "drag") {
      setPPos({
        x: Math.max(protractorR, Math.min(W - protractorR, p.x - dragOff.x)),
        y: Math.max(protractorR, Math.min(H - 10, p.y - dragOff.y)),
      });
    } else {
      const ang = Math.atan2(p.y - pPos.y, p.x - pPos.x) * (180 / Math.PI);
      setPRot(ang);
    }
  };

  const endDrag = () => setDragMode(null);

  // Protractor reading at angle ABC: compute angle between protractor baseline and the two sides BA / BC,
  // only meaningful when protractor centre is near vertex B.
  const distToB = Math.hypot(pPos.x - B.x, pPos.y - B.y);
  const baselineDir = pRot; // baseline points along +x rotated by pRot
  const angBA = Math.atan2(A.y - B.y, A.x - B.x) * (180 / Math.PI);
  const angBC = Math.atan2(C.y - B.y, C.x - B.x) * (180 / Math.PI);
  const norm = (a: number) => ((a % 360) + 360) % 360;
  const between = (from: number, to: number) => {
    let d = norm(to - from);
    if (d > 180) d = 360 - d;
    return d;
  };
  let reading = 0;
  if (distToB < 30) {
    const dBA = between(baselineDir, angBA);
    const dBC = between(baselineDir, angBC);
    // If baseline aligned with BA or BC, show the other angle
    if (dBA < 12) reading = Math.round(dBC);
    else if (dBC < 12) reading = Math.round(dBA);
    else reading = Math.round(between(angBA, angBC)); // fallback: real angle
  }

  // Generate protractor markings
  const marks: JSX.Element[] = [];
  for (let a = 0; a <= 180; a += 1) {
    const r = (a * Math.PI) / 180;
    const isL = a % 10 === 0, isM = a % 5 === 0;
    const innerR = protractorR - (isL ? 10 : isM ? 6 : 3);
    const x1 = Math.cos(Math.PI - r) * innerR;
    const y1 = -Math.sin(Math.PI - r) * innerR;
    const x2 = Math.cos(Math.PI - r) * (protractorR - 2);
    const y2 = -Math.sin(Math.PI - r) * (protractorR - 2);
    marks.push(<line key={`m${a}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1a2e" strokeWidth={isL ? 1.1 : isM ? 0.7 : 0.4} />);
    if (isL && a > 0 && a < 180) {
      const tR = protractorR - 17;
      marks.push(
        <text key={`t${a}`} x={Math.cos(Math.PI - r) * tR} y={-Math.sin(Math.PI - r) * tR + 2} fontSize={7} fill="#1a1a2e" textAnchor="middle">{a}</text>
      );
    }
  }

  const clearAll = () => { setArcs([]); setLines([]); setLineStart(null); };
  const undo = () => {
    if (lineStart) { setLineStart(null); return; }
    if (lines.length) { setLines((p) => p.slice(0, -1)); return; }
    if (arcs.length) { setArcs((p) => p.slice(0, -1)); return; }
  };

  // ───── Diagram-derived marks for parts (b) and (c) ─────
  const AClen = Math.hypot(A.x - C.x, A.y - C.y);
  const nearVertex = (cx: number, cy: number, V: { x: number; y: number }, tol = 12) => Math.hypot(cx - V.x, cy - V.y) <= tol;
  const arcAt = (V: { x: number; y: number }, minR = 0) => arcs.find(a => nearVertex(a.cx, a.cy, V) && a.r > minR);
  const arcA_b = arcAt(A, AClen / 2 - 5);
  const arcC_b = arcAt(C, AClen / 2 - 5);
  const arcsPairOk = !!arcA_b && !!arcC_b && Math.abs(arcA_b.r - arcC_b.r) <= 8;

  // perpendicular bisector line: passes near midpoint of AC and perpendicular to AC (±15°)
  const Mx = (A.x + C.x) / 2, My = (A.y + C.y) / 2;
  const acAng = Math.atan2(C.y - A.y, C.x - A.x);
  const bisectorLine = lines.find(l => {
    const lAng = Math.atan2(l.y2 - l.y1, l.x2 - l.x1);
    const diff = Math.abs(((lAng - acAng - Math.PI / 2) * 180 / Math.PI) % 180);
    const angOk = diff < 15 || Math.abs(diff - 180) < 15;
    // distance from midpoint to line
    const dx = l.x2 - l.x1, dy = l.y2 - l.y1;
    const len = Math.hypot(dx, dy) || 1;
    const dist = Math.abs((Mx - l.x1) * dy - (My - l.y1) * dx) / len;
    return angOk && dist <= 18;
  });

  const bScore = (() => {
    if (bisectorLine && arcsPairOk) return { marks: 2, note: 'B2 — acceptable perpendicular bisector of AC with correct arcs from A and C (equal radius > ½ AC).' };
    if (bisectorLine) return { marks: 1, note: 'B1 — acceptable bisector of AC, but construction arcs from A and C are missing/incorrect.' };
    return { marks: 0, note: 'Construct the perpendicular bisector of AC: draw equal arcs from A and C with radius > ½ AC, then join the intersections.' };
  })();

  // (c) Arc of radius 6 cm at B drawn within the triangle (B1), plus correct region shaded (B1, dep)
  const arcB6 = arcs.find(a => nearVertex(a.cx, a.cy, B) && Math.abs(a.r - 6 * PX_PER_CM) <= 0.4 * PX_PER_CM);
  const cScore = (() => {
    const arcOk = !!arcB6;
    // We cannot reliably score shading, so the second B1 (region) is awarded if bisector exists AND 6 cm arc exists
    if (arcOk && bScore.marks >= 1) return { marks: 1, note: 'B1 — 6 cm arc centred at B drawn. (Second B1 for the correctly shaded region requires shading the area nearer to A AND outside the 6 cm arc — assessed manually.)' };
    if (arcOk) return { marks: 1, note: 'B1 — 6 cm arc centred at B drawn. The second B1 is dependent on a correct bisector of AC.' };
    return { marks: 0, note: 'Draw an arc of radius 6 cm centred at B within the triangle, then identify the region nearer to A and further than 6 cm from B.' };
  })();

  useEffect(() => {
    onScore?.({ b: bScore, c: cScore });
  }, [bScore.marks, cScore.marks, onScore]);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border">
        <Button size="sm" variant={tool === "protractor" ? "default" : "outline"} onClick={() => setTool("protractor")}>📐 Protractor</Button>
        <Button size="sm" variant={tool === "arc" ? "default" : "outline"} onClick={() => setTool("arc")}>🧭 Compass (arc)</Button>
        <Button size="sm" variant={tool === "line" ? "default" : "outline"} onClick={() => setTool("line")}>📏 Line</Button>
        {tool === "arc" && (
          <label className="flex items-center gap-2 text-xs text-foreground ml-2">
            radius
            <input type="range" min={1} max={8} step={0.5} value={arcRadiusCm} onChange={(e) => setArcRadiusCm(Number(e.target.value))} />
            <span className="tabular-nums w-12 text-right">{arcRadiusCm} cm</span>
          </label>
        )}
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={undo}>Undo</Button>
          <Button size="sm" variant="outline" onClick={clearAll}>Clear</Button>
        </div>
      </div>

      {/* Reading */}
      {tool === "protractor" && (
        <div className="p-2 rounded-lg bg-muted/50 border border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">∠ABC reading (place protractor centre on B and align baseline with BA or BC):</span>
          <span className="text-xl font-bold text-foreground tabular-nums">{distToB < 30 ? `${reading}°` : "—"}</span>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full bg-white rounded-lg border-2 border-border shadow-inner"
        onClick={handleSvgClick}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        style={{ cursor: tool === "arc" || tool === "line" ? "crosshair" : "default" }}
      >
        {/* Triangle ABC — replicating QP image */}
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="none" stroke={diagramFg} strokeWidth={1.6} />
        <text x={A.x - 4} y={A.y - 10} fontSize={18} fontStyle="italic" fill={diagramFg}>A</text>
        <text x={B.x + 8} y={B.y + 6} fontSize={18} fontStyle="italic" fill={diagramFg}>B</text>
        <text x={C.x - 16} y={C.y + 14} fontSize={18} fontStyle="italic" fill={diagramFg}>C</text>

        {/* User-drawn arcs (compass) */}
        {arcs.map((a, i) => (
          <circle key={`a${i}`} cx={a.cx} cy={a.cy} r={a.r} fill="none" stroke="#0a7" strokeWidth={1} strokeDasharray="4 3" />
        ))}

        {/* User-drawn lines */}
        {lines.map((l, i) => (
          <line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#c2185b" strokeWidth={1.6} />
        ))}
        {lineStart && (
          <circle cx={lineStart.x} cy={lineStart.y} r={4} fill="#c2185b" />
        )}

        {/* Protractor */}
        {tool === "protractor" && (
          <g transform={`translate(${pPos.x}, ${pPos.y}) rotate(${pRot})`}>
            <path
              d={`M ${-protractorR} 0 A ${protractorR} ${protractorR} 0 0 1 ${protractorR} 0 L 0 0 Z`}
              fill="rgba(255,224,130,0.55)"
              stroke="#d4a000"
              strokeWidth={1.5}
              style={{ cursor: dragMode === "drag" ? "grabbing" : "grab" }}
              onMouseDown={(e) => {
                e.stopPropagation();
                const p = toSvgCoords(e as any);
                setDragOff({ x: p.x - pPos.x, y: p.y - pPos.y });
                setDragMode("drag");
              }}
            />
            <line x1={-protractorR + 3} y1={0} x2={protractorR - 3} y2={0} stroke="#c62828" strokeWidth={1} />
            <line x1={-6} y1={0} x2={6} y2={0} stroke="#c62828" strokeWidth={1.5} />
            <line x1={0} y1={-6} x2={0} y2={6} stroke="#c62828" strokeWidth={1.5} />
            <circle cx={0} cy={0} r={2.5} fill="#c62828" />
            {marks}
            <g
              transform={`translate(${protractorR - 14}, -22)`}
              style={{ cursor: "pointer" }}
              onMouseDown={(e) => { e.stopPropagation(); setDragMode("rotate"); }}
            >
              <circle r={10} fill="#2196f3" stroke="#1565c0" strokeWidth={1.2} />
              <text y={3} fontSize={12} fill="white" textAnchor="middle" fontWeight="bold">↻</text>
            </g>
          </g>
        )}
      </svg>

      <p className="text-xs text-muted-foreground">
        Tip: For (a), drag the protractor so its centre crosshair sits on vertex B and align the baseline with BA (or BC); the reading shows the angle to the other side. For (b)/(c), use the compass tool to draw arcs from A, C (and B for the 6 cm region), then use the line tool to join intersection points.
      </p>
    </div>
  );
}

// ───────────────────────────── Q17: Interactive cumulative frequency workspace ─────────────────────────────
// Shows the exact data table from the question paper, plus an empty grid where
// students can click to mark points and then optionally join them. No curve is
// pre-drawn — students do the plotting themselves.
export function CumulativeFrequency_4024_12_2023ON({ onScore }: { onScore?: (s: { marks: number; note: string }) => void } = {}) {
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

  // Score: B1 for ≥5 correct upper-bound points, B2 for all 6 + joined
  useEffect(() => {
    if (!onScore) return;
    const expected = headers.map(h => ({ x: parseFloat(h.label.replace(/[^\d.]/g, '')), y: h.cf }));
    let correct = 0;
    expected.forEach(e => {
      if (points.some(p => Math.abs(p.x - e.x) <= 0.25 && Math.abs(p.y - e.y) <= 1)) correct++;
    });
    let marks = 0;
    let note = `${correct}/6 points plotted correctly`;
    if (correct >= 6 && joined) { marks = 2; note = 'B2: all 6 points correct and joined'; }
    else if (correct >= 5) { marks = 1; note = `B1: ${correct}/6 points plotted correctly` + (joined ? '' : ' (join points for B2)'); }
    onScore({ marks, note });
  }, [points, joined, onScore]);


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
  // NOT TO SCALE diagram matching exam paper exactly:
  // Cyclist A: straight line from (0,1) → (20,7)
  // Cyclist B: horizontal line at speed 5
  const ox = 70, oy = 30, w = 280, h = 220;
  const X = (t: number) => ox + (t / 20) * w;
  const Y = (s: number) => oy + h - (s / 8) * h;
  const axisBottom = oy + h;
  return (
    <svg viewBox={`0 0 ${ox + w + 100} ${oy + h + 50}`} className="w-full max-w-lg mx-auto">
      {/* Y-axis with arrow */}
      <line x1={ox} y1={oy - 5} x2={ox} y2={axisBottom} stroke={fg} strokeWidth={1.4} />
      <polygon points={`${ox - 4},${oy} ${ox + 4},${oy} ${ox},${oy - 8}`} fill={fg} />
      {/* X-axis with arrow */}
      <line x1={ox} y1={axisBottom} x2={ox + w + 10} y2={axisBottom} stroke={fg} strokeWidth={1.4} />
      <polygon points={`${ox + w + 6},${axisBottom - 4} ${ox + w + 6},${axisBottom + 4} ${ox + w + 14},${axisBottom}`} fill={fg} />

      {/* Dashed rectangle indicators at (20,7) */}
      <line x1={ox} y1={Y(7)} x2={X(20)} y2={Y(7)} stroke={fg} strokeWidth={1} strokeDasharray="4,3" />
      <line x1={X(20)} y1={Y(7)} x2={X(20)} y2={axisBottom} stroke={fg} strokeWidth={1} strokeDasharray="4,3" />

      {/* Cyclist A: (0,1) → (20,7) */}
      <line x1={X(0)} y1={Y(1)} x2={X(20)} y2={Y(7)} stroke={fg} strokeWidth={2} />
      {/* Cyclist B: horizontal at speed 5 */}
      <line x1={X(0)} y1={Y(5)} x2={X(20)} y2={Y(5)} stroke={fg} strokeWidth={2} />

      {/* Labels for cyclists */}
      <text x={X(10)} y={Y(5) - 6} fontSize={12} fill={fg} textAnchor="middle">Cyclist <tspan fontStyle="italic">B</tspan></text>
      <text x={X(11)} y={Y(3) + 4} fontSize={12} fill={fg} textAnchor="middle">Cyclist <tspan fontStyle="italic">A</tspan></text>

      {/* Y-axis ticks and labels: 0, 1, 5, 7 */}
      {[
        { v: 0, label: '0' },
        { v: 1, label: '1' },
        { v: 5, label: '5' },
        { v: 7, label: '7' },
      ].map(({ v, label }) => (
        <g key={`y${v}`}>
          <line x1={ox - 4} y1={Y(v)} x2={ox} y2={Y(v)} stroke={fg} strokeWidth={1.2} />
          <text x={ox - 8} y={Y(v) + 4} fontSize={11} fill={fg} textAnchor="end">{label}</text>
        </g>
      ))}

      {/* X-axis ticks: 0, 20 */}
      <line x1={ox} y1={axisBottom} x2={ox} y2={axisBottom + 4} stroke={fg} strokeWidth={1.2} />
      <text x={ox} y={axisBottom + 16} fontSize={11} fill={fg} textAnchor="middle">0</text>
      <line x1={X(20)} y1={axisBottom} x2={X(20)} y2={axisBottom + 4} stroke={fg} strokeWidth={1.2} />
      <text x={X(20)} y={axisBottom + 16} fontSize={11} fill={fg} textAnchor="middle">20</text>

      {/* Axis labels */}
      <text x={ox - 40} y={oy + h / 2 - 6} fontSize={11} fill={fg} textAnchor="middle">Speed</text>
      <text x={ox - 40} y={oy + h / 2 + 8} fontSize={11} fill={fg} textAnchor="middle">(m/s)</text>
      <text x={ox + w / 2} y={axisBottom + 34} fontSize={11} fill={fg} textAnchor="middle">Time (seconds)</text>

      {/* NOT TO SCALE */}
      <text x={ox + w + 30} y={oy + h / 2} fontSize={10} fill={mu}>NOT TO</text>
      <text x={ox + w + 30} y={oy + h / 2 + 12} fontSize={10} fill={mu}>SCALE</text>
    </svg>
  );
}

// ───────────────────────────── Q21: Two sectors ─────────────────────────────
export function TwoSectors_4024_12_2023ON() {
  // Sector A: centre D, radius 3y, angle 6x° (drawn obtuse ~120°)
  // Sector B: centre P, radius y, angle x° (drawn ~20°)
  return (
    <img src={q21TwoSectorsSrc} alt="Q21 diagrams: Sector A (centre D) and Sector B (centre P)" className="w-full max-w-lg mx-auto" />
  );
}

// ───────────────────────────── Q23: 3-set Venn (H, S, G) ─────────────────────────────
import q23VennSrc from '@/assets/pp_4024_on23_12_q23_venn.png';
import { cn } from '@/lib/utils';

interface VennHSGProps {
  answers?: Record<string, string>;
  onAnswerChange?: (key: string, value: string) => void;
  feedback?: Record<string, 'correct' | 'incorrect' | null>;
  isSubmitted?: boolean;
  onCheck?: () => void;
}

export function VennHSG_4024_12_2023ON({
  answers = {},
  onAnswerChange,
  feedback = {},
  isSubmitted = false,
  onCheck,
}: VennHSGProps = {}) {
  // Realigned to sit inside the correct Venn regions of the image
  const slots: { key: string; left: string; top: string; label: string }[] = [
    { key: 'a_hs',  left: '50%', top: '26%', label: 'H ∩ S only' },
    { key: 'a_hsg', left: '50%', top: '46%', label: 'H ∩ S ∩ G' },
    { key: 'a_sg',  left: '63%', top: '54%', label: 'S ∩ G only' },
    { key: 'a_g',   left: '50%', top: '74%', label: 'G only' },
  ];
  const cls = (k: string) => cn(
    'w-10 h-7 text-center text-sm font-bold rounded border bg-background text-foreground outline-none',
    feedback[k] === 'correct' && 'border-green-500 bg-green-500/10',
    feedback[k] === 'incorrect' && 'border-destructive bg-destructive/10',
    !feedback[k] && 'border-primary/50 focus:border-primary',
  );

  const expected: Record<string, string> = { a_hs: '0', a_hsg: '2', a_sg: '4', a_g: '16' };
  const hintFor = (k: string): string => {
    switch (k) {
      case 'a_hs':  return 'H ∩ S only: everyone who buys hat & scarf also buys gloves, so this region is empty.';
      case 'a_hsg': return 'H ∩ S ∩ G: the question tells you 2 people buy all three items.';
      case 'a_sg':  return 'S ∩ G only: exactly 4 people buy exactly two items, and H∩S only is 0, so this equals 4.';
      case 'a_g':   return 'G only: subtract everyone already placed (and others outside G) from 40 to find this region.';
      default: return '';
    }
  };

  const [feedbackMsg, setFeedbackMsg] = useState<{ tone: 'ok' | 'warn'; text: string } | null>(null);

  const handleCheck = () => {
    const filled = Object.keys(expected).filter(k => (answers[k] || '').trim() !== '');
    if (filled.length === 0) {
      setFeedbackMsg({ tone: 'warn', text: 'Fill in the empty regions of the Venn diagram, then tap the check icon again.' });
      onCheck?.();
      return;
    }
    const wrongKeys = Object.keys(expected).filter(k => {
      const u = (answers[k] || '').trim();
      return u !== '' && u !== expected[k];
    });
    const missingKeys = Object.keys(expected).filter(k => (answers[k] || '').trim() === '');

    if (wrongKeys.length === 0 && missingKeys.length === 0) {
      setFeedbackMsg({ tone: 'ok', text: 'All four regions are correct — well done!' });
    } else if (wrongKeys.length > 0) {
      setFeedbackMsg({ tone: 'warn', text: hintFor(wrongKeys[0]) });
    } else {
      setFeedbackMsg({ tone: 'warn', text: hintFor(missingKeys[0]) });
    }
    onCheck?.();
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-3">
      <div className="relative">
        <img src={q23VennSrc} alt="Q23 Venn diagram (H, S, G) with empty regions" className="w-full" />
        {slots.map(s => (
          <input
            key={s.key}
            type="text"
            inputMode="numeric"
            aria-label={s.label}
            value={answers[s.key] || ''}
            onChange={e => onAnswerChange?.(s.key, e.target.value)}
            disabled={isSubmitted}
            className={cn(cls(s.key), 'absolute -translate-x-1/2 -translate-y-1/2')}
            style={{ left: s.left, top: s.top }}
          />
        ))}
      </div>
      {onCheck && !isSubmitted && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCheck}
            aria-label="Check work"
            title="Check work"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-card border border-border text-foreground shadow-sm hover:bg-muted transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </button>
        </div>
      )}
      {feedbackMsg && (
        <div
          role="status"
          className={cn(
            'rounded-md border px-3 py-2 text-sm',
            feedbackMsg.tone === 'ok'
              ? 'border-green-500/40 bg-green-500/10 text-green-100'
              : 'border-amber-400/40 bg-amber-400/10 text-amber-100',
          )}
        >
          💡 {feedbackMsg.text}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────── Q24: Triangle OAB with point P ─────────────────────────────
import q24TriangleImg from '@/assets/pp_4024_on23_12_q24_triangle.png';
export function TriangleOAB_4024_12_2023ON() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-md p-2">
      <img src={q24TriangleImg} alt="Triangle OAB with point P, OA = 4a and OP = 3a + 2b" className="w-full h-auto" />
    </div>
  );
}

