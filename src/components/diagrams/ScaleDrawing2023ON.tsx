import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';

// Q12 – Scale drawing for 4024/11 Oct/Nov 2023

type Arc = { cx: number; cy: number; r: number; from: 'A' | 'B' };
const AB_CM = 8.8;

export type ScaleDrawingScore = {
  b: { marks: number; note: string };
  c: { marks: number; note: string };
};

export function ScaleDrawing2023ON({ onScore }: { onScore?: (s: ScaleDrawingScore) => void } = {}) {
  const width = 520;
  const height = 360;

  const A = { x: 110, y: 250 };
  const B = { x: 430, y: 130 };
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const ABlen = Math.hypot(dx, dy);
  const PX_PER_CM = ABlen / AB_CM;

  // Pan + zoom state (applied as SVG viewBox transform)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.px + (e.clientX - dragRef.current.x) / zoom,
      y: dragRef.current.py + (e.clientY - dragRef.current.y) / zoom,
    });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
  };

  // Compass
  const [radiusCm, setRadiusCm] = useState(5);
  const radiusPx = radiusCm * PX_PER_CM;
  const [arcs, setArcs] = useState<Arc[]>([]);
  const hasArcA = arcs.some(a => a.from === 'A');
  const hasArcB = arcs.some(a => a.from === 'B');

  const intersections = useMemo(() => {
    const arcA = arcs.find(a => a.from === 'A');
    const arcB = arcs.find(a => a.from === 'B');
    if (!arcA || !arcB) return null;
    const d = ABlen, r1 = arcA.r, r2 = arcB.r;
    if (d > r1 + r2 || d < Math.abs(r1 - r2)) return null;
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h2 = r1 * r1 - a * a;
    if (h2 < 0) return null;
    const h = Math.sqrt(h2);
    const px = A.x + (a * dx) / d, py = A.y + (a * dy) / d;
    const ux = -dy / d, uy = dx / d;
    return [
      { x: px + h * ux, y: py + h * uy },
      { x: px - h * ux, y: py - h * uy },
    ];
  }, [arcs, ABlen]);

  const [showBisector, setShowBisector] = useState(false);
  const canBisect = !!intersections;

  const [protractorAt, setProtractorAt] = useState<'none' | 'A' | 'B'>('none');
  const [bearing, setBearing] = useState<number | ''>('');
  const [showBearingLine, setShowBearingLine] = useState(false);

  const bearingNum = typeof bearing === 'number' ? bearing : 0;
  const bearingRad = ((bearingNum - 90) * Math.PI) / 180;
  const bearingOrigin = protractorAt === 'B' ? B : A;
  const bearingEnd = {
    x: bearingOrigin.x + 320 * Math.cos(bearingRad),
    y: bearingOrigin.y + 320 * Math.sin(bearingRad),
  };

  const dropArc = (from: 'A' | 'B') => {
    const c = from === 'A' ? A : B;
    setArcs(prev => [...prev.filter(a => a.from !== from), { cx: c.x, cy: c.y, r: radiusPx, from }]);
  };

  const reset = () => {
    setArcs([]); setShowBisector(false); setProtractorAt('none');
    setShowBearingLine(false); setBearing(''); setPan({ x: 0, y: 0 }); setZoom(1);
    setAngleCheck(null); setBisectorCheck(null);
  };

  type CheckState = { ok: boolean; msg: string } | null;
  const [angleCheck, setAngleCheck] = useState<CheckState>(null);
  const [bisectorCheck, setBisectorCheck] = useState<CheckState>(null);

  const checkBisector = () => {
    if (!intersections || !showBisector) {
      setBisectorCheck({ ok: false, msg: 'Drop arcs from both A and B (same radius > ½ AB), then connect intersections.' });
      return;
    }
    const arcA = arcs.find(a => a.from === 'A')!;
    const arcB = arcs.find(a => a.from === 'B')!;
    if (Math.abs(arcA.r - arcB.r) > 1) { setBisectorCheck({ ok: false, msg: 'Both arcs must use the SAME radius.' }); return; }
    if (arcA.r <= ABlen / 2) { setBisectorCheck({ ok: false, msg: `Radius must be > ½ × AB (≈ ${(AB_CM/2).toFixed(1)} cm).` }); return; }
    setBisectorCheck({ ok: true, msg: 'Perpendicular bisector correctly constructed.' });
  };

  const checkAngle = () => {
    if (protractorAt === 'none' || !showBearingLine || bearing === '') {
      setAngleCheck({ ok: false, msg: 'Place protractor at A, enter a bearing and mark the bearing line.' }); return;
    }
    if (protractorAt !== 'A') { setAngleCheck({ ok: false, msg: 'Bearing FROM A — protractor must be at A.' }); return; }
    if (Math.abs(bearingNum - 105) <= 2) setAngleCheck({ ok: true, msg: `Bearing ${bearingNum}° is correct.` });
    else setAngleCheck({ ok: false, msg: `Bearing should be 105° at A. You set ${bearingNum}°.` });
  };

  // ----- Diagram-derived marks for parts (b) and (c) -----
  const arcA = arcs.find(a => a.from === 'A');
  const arcB = arcs.find(a => a.from === 'B');
  const sameRadius = !!arcA && !!arcB && Math.abs(arcA.r - arcB.r) <= 1;
  const radiusOk = !!arcA && arcA.r > ABlen / 2;
  const bScore: { marks: number; note: string } = (() => {
    if (showBisector && intersections && sameRadius && radiusOk) {
      return { marks: 2, note: 'B2 — acceptable bisector of AB with correct arcs.' };
    }
    if (showBisector && intersections) {
      return { marks: 1, note: 'B1 — acceptable bisector but arcs missing/incorrect (different radii or radius ≤ ½ AB).' };
    }
    return { marks: 0, note: 'Construct the perpendicular bisector of AB on the diagram.' };
  })();
  const bearingOk = showBearingLine && bearing !== '' && protractorAt === 'A' && Math.abs(bearingNum - 105) <= 2;
  const cScore: { marks: number; note: string } = (() => {
    if (bearingOk && bScore.marks >= 1) {
      return { marks: 1, note: 'B1 — S marked on a bearing of 105° from A and on their bisector (dependent on bisector crossing AB).' };
    }
    if (bearingOk && bScore.marks === 0) {
      return { marks: 0, note: 'Bearing 105° drawn, but dependent on a bisector crossing AB — construct the bisector first.' };
    }
    return { marks: 0, note: 'Place the protractor at A, set bearing 105°, and mark S on the bisector.' };
  })();

  useEffect(() => {
    onScore?.({ b: bScore, c: cScore });
  }, [bScore.marks, cScore.marks, onScore]);

  // Working steps with fraction support

  type Step = { type: 'text'; value: string } | { type: 'frac'; num: string; den: string };
  const [steps, setSteps] = useState<Step[]>([{ type: 'text', value: '' }]);
  const [focused, setFocused] = useState<{ i: number; field: 'value' | 'num' | 'den' }>({ i: 0, field: 'value' });

  const insert = (sym: string) => {
    setSteps(prev => prev.map((s, i) => {
      if (i !== focused.i) return s;
      if (s.type === 'text' && focused.field === 'value') return { ...s, value: s.value + sym };
      if (s.type === 'frac') {
        if (focused.field === 'num') return { ...s, num: s.num + sym };
        if (focused.field === 'den') return { ...s, den: s.den + sym };
      }
      return s;
    }));
  };
  const addStep = () => { setSteps(prev => [...prev, { type: 'text', value: '' }]); };
  const addFraction = () => { setSteps(prev => [...prev, { type: 'frac', num: '', den: '' }]); };
  const removeStep = (i: number) => setSteps(prev => prev.filter((_, j) => j !== i));

  const keys = ['0','1','2','3','4','5','6','7','8','9','.','×','÷','=','+','−','(',')','cm','km','000'];

  const vbW = width / zoom;
  const vbH = height / zoom;
  const vbX = -pan.x + (width - vbW) / 2;
  const vbY = -pan.y + (height - vbH) / 2;

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-sm font-semibold text-foreground">Scale drawing — 1 : 20 000</h4>
        <button onClick={reset} className="text-xs px-2 py-1 rounded border border-border bg-muted text-muted-foreground hover:bg-muted/70 inline-flex items-center gap-1">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Compass */}
      <div className="rounded border border-border bg-muted/30 p-2 space-y-2">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="font-semibold text-foreground">🧭 Compass</span>
          <label className="flex items-center gap-1 text-muted-foreground">
            Radius
            <input type="range" min={1} max={9} step={0.1} value={radiusCm}
              onChange={e => setRadiusCm(Number(e.target.value))} className="accent-primary" />
            <span className="tabular-nums w-14 text-foreground">{radiusCm.toFixed(1)} cm</span>
          </label>
          <button onClick={() => dropArc('A')} className={`px-2 py-1 rounded border ${hasArcA ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}>Arc from A</button>
          <button onClick={() => dropArc('B')} className={`px-2 py-1 rounded border ${hasArcB ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}>Arc from B</button>
          <button onClick={() => setShowBisector(v => !v)} disabled={!canBisect}
            className={`px-2 py-1 rounded border ${showBisector ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-foreground border-border'} disabled:opacity-40`}>
            Connect intersections (bisector)
          </button>
          <button onClick={checkBisector} title="Check bisector"
            className="ml-auto p-1.5 rounded border border-amber-500 text-amber-600 hover:bg-amber-500/10" aria-label="Check bisector">
            <Check className="h-3.5 w-3.5" />
          </button>
        </div>
        {bisectorCheck && (
          <p className={`text-xs ${bisectorCheck.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{bisectorCheck.ok ? '✓' : '⚠'} {bisectorCheck.msg}</p>
        )}

        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="font-semibold text-foreground">📐 Protractor</span>
          <button onClick={() => setProtractorAt(p => p === 'A' ? 'none' : 'A')} className={`px-2 py-1 rounded border ${protractorAt === 'A' ? 'bg-fuchsia-500 text-white border-fuchsia-500' : 'bg-background text-foreground border-border'}`}>Protractor at A</button>
          <button onClick={() => setProtractorAt(p => p === 'B' ? 'none' : 'B')} className={`px-2 py-1 rounded border ${protractorAt === 'B' ? 'bg-fuchsia-500 text-white border-fuchsia-500' : 'bg-background text-foreground border-border'}`}>Protractor at B</button>
          <label className="flex items-center gap-1 text-muted-foreground">
            Bearing
            <input type="number" min={0} max={360} placeholder="—" value={bearing}
              onChange={e => { const v = e.target.value; if (v === '') return setBearing(''); setBearing(Math.max(0, Math.min(360, Number(v)))); }}
              className="w-16 px-1 py-0.5 rounded border border-border bg-background text-foreground" />°
          </label>
          <button onClick={() => setShowBearingLine(v => !v)} disabled={protractorAt === 'none' || bearing === ''}
            className={`px-2 py-1 rounded border ${showBearingLine ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-foreground border-border'} disabled:opacity-40`}>
            Mark bearing line
          </button>
          <button onClick={checkAngle} title="Check angle"
            className="ml-auto p-1.5 rounded border border-amber-500 text-amber-600 hover:bg-amber-500/10" aria-label="Check angle">
            <Check className="h-3.5 w-3.5" />
          </button>
        </div>
        {angleCheck && (
          <p className={`text-xs ${angleCheck.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{angleCheck.ok ? '✓' : '⚠'} {angleCheck.msg}</p>
        )}
      </div>

      {/* Diagram with in-canvas zoom + pan */}
      <div className="relative bg-background rounded border border-border overflow-hidden" style={{ height }}>
        <svg
          viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
          width="100%" height={height}
          className="cursor-grab active:cursor-grabbing select-none touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {[A, B].map((P, i) => (
            <g key={i}>
              <line x1={P.x} y1={P.y} x2={P.x} y2={P.y - 70} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
              <polygon points={`${P.x - 5},${P.y - 65} ${P.x + 5},${P.y - 65} ${P.x},${P.y - 75}`} fill="hsl(var(--foreground))" />
              <text x={P.x - 18} y={P.y - 80} fontSize="11" fill="hsl(var(--foreground))">North</text>
            </g>
          ))}

          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth={1.5} />

          {arcs.map((a, i) => (
            <circle key={i} cx={a.cx} cy={a.cy} r={a.r} fill="none" stroke="hsl(var(--primary))" strokeWidth={1} strokeDasharray="4 3" opacity={0.8} />
          ))}

          {intersections && intersections.map((p, i) => (
            <g key={i}>
              <line x1={p.x - 5} y1={p.y - 5} x2={p.x + 5} y2={p.y + 5} stroke="hsl(var(--primary))" strokeWidth={1.5} />
              <line x1={p.x - 5} y1={p.y + 5} x2={p.x + 5} y2={p.y - 5} stroke="hsl(var(--primary))" strokeWidth={1.5} />
            </g>
          ))}

          {showBisector && intersections && (() => {
            const [p1, p2] = intersections;
            const ux = p2.x - p1.x, uy = p2.y - p1.y;
            const len = Math.hypot(ux, uy) || 1;
            const ex = (ux / len) * 240, ey = (uy / len) * 240;
            const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
            return <line x1={mx - ex} y1={my - ey} x2={mx + ex} y2={my + ey} stroke="hsl(var(--primary))" strokeWidth={2} />;
          })()}

          {/* Clean protractor: outer ring + ticks only every 10°, labels every 30° */}
          {protractorAt !== 'none' && (() => {
            const C = protractorAt === 'A' ? A : B;
            const COL = '#e879f9';
            const FILL = 'rgba(232,121,249,0.08)';
            return (
              <g>
                <circle cx={C.x} cy={C.y} r={90} fill={FILL} stroke={COL} strokeWidth={1.5} />
                <line x1={C.x - 90} y1={C.y} x2={C.x + 90} y2={C.y} stroke={COL} strokeWidth={1} opacity={0.5} />
                {Array.from({ length: 36 }).map((_, i) => {
                  const deg = i * 10;
                  const rad = ((deg - 90) * Math.PI) / 180;
                  const isMajor = deg % 30 === 0;
                  const r1 = 90, r2 = isMajor ? 78 : 84;
                  return (
                    <g key={deg}>
                      <line
                        x1={C.x + r1 * Math.cos(rad)} y1={C.y + r1 * Math.sin(rad)}
                        x2={C.x + r2 * Math.cos(rad)} y2={C.y + r2 * Math.sin(rad)}
                        stroke={COL} strokeWidth={isMajor ? 1.2 : 0.7}
                      />
                      {isMajor && (
                        <text
                          x={C.x + 70 * Math.cos(rad)} y={C.y + 70 * Math.sin(rad) + 3}
                          fontSize="8" textAnchor="middle" fill={COL} fontWeight="600"
                        >{deg}</text>
                      )}
                    </g>
                  );
                })}
                <circle cx={C.x} cy={C.y} r={2.5} fill={COL} />
                {bearing !== '' && (
                  <line x1={C.x} y1={C.y} x2={C.x + 90 * Math.cos(bearingRad)} y2={C.y + 90 * Math.sin(bearingRad)} stroke={COL} strokeWidth={2} />
                )}
              </g>
            );
          })()}

          {showBearingLine && bearing !== '' && (
            <g>
              <line x1={bearingOrigin.x} y1={bearingOrigin.y} x2={bearingEnd.x} y2={bearingEnd.y} stroke="#e879f9" strokeWidth={2} />
              <text x={bearingOrigin.x + 50 * Math.cos(bearingRad - 0.2)} y={bearingOrigin.y + 50 * Math.sin(bearingRad - 0.2)} fontSize="11" fill="#e879f9" fontWeight="bold">{bearingNum}°</text>
            </g>
          )}

          <circle cx={A.x} cy={A.y} r={3.5} fill="hsl(var(--foreground))" />
          <text x={A.x - 14} y={A.y + 14} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">A</text>
          <circle cx={B.x} cy={B.y} r={3.5} fill="hsl(var(--foreground))" />
          <text x={B.x + 8} y={B.y + 5} fontSize="13" fill="hsl(var(--foreground))" fontWeight="bold">B</text>
        </svg>

        {/* In-canvas controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 bg-background/80 backdrop-blur rounded border border-border p-1">
          <button onClick={() => setZoom(z => Math.min(3, +(z + 0.2).toFixed(2)))} className="p-1 rounded hover:bg-muted" title="Zoom in"><ZoomIn className="h-4 w-4 text-foreground" /></button>
          <span className="text-[10px] tabular-nums text-center text-muted-foreground">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.max(0.5, +(z - 0.2).toFixed(2)))} className="p-1 rounded hover:bg-muted" title="Zoom out"><ZoomOut className="h-4 w-4 text-foreground" /></button>
        </div>
        <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground bg-background/80 backdrop-blur rounded px-2 py-0.5 border border-border inline-flex items-center gap-1">
          <Move className="h-3 w-3" /> drag to pan
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/40 border border-border rounded p-2">
        <strong className="text-foreground">Line AB length = 8.8 cm</strong>
      </div>

      {/* Working area */}
      <div className="rounded border border-border bg-muted/30 p-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Working (optional steps)</span>
          <div className="flex gap-1">
            <button onClick={addStep} className="text-xs px-2 py-1 rounded border border-border bg-background text-foreground hover:bg-muted">+ Step</button>
            <button onClick={addFraction} className="text-xs px-2 py-1 rounded border border-border bg-background text-foreground hover:bg-muted">+ Fraction</button>
          </div>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
            {s.type === 'text' ? (
              <input
                value={s.value}
                onFocus={() => setFocused({ i, field: 'value' })}
                onChange={e => setSteps(prev => prev.map((v, j) => (j === i ? { ...(v as any), value: e.target.value } : v)))}
                className="flex-1 px-2 py-1 rounded border border-border bg-background text-foreground text-sm font-mono"
              />
            ) : (
              <div className="flex-1 flex items-center gap-2 font-mono text-sm">
                <div className="inline-flex flex-col items-center">
                  <input
                    value={s.num}
                    onFocus={() => setFocused({ i, field: 'num' })}
                    onChange={e => setSteps(prev => prev.map((v, j) => (j === i && v.type === 'frac' ? { ...v, num: e.target.value } : v)))}
                    className="w-24 px-1 py-0.5 rounded border border-border bg-background text-foreground text-center"
                  />
                  <div className="w-24 h-px bg-foreground my-0.5" />
                  <input
                    value={s.den}
                    onFocus={() => setFocused({ i, field: 'den' })}
                    onChange={e => setSteps(prev => prev.map((v, j) => (j === i && v.type === 'frac' ? { ...v, den: e.target.value } : v)))}
                    className="w-24 px-1 py-0.5 rounded border border-border bg-background text-foreground text-center"
                  />
                </div>
              </div>
            )}
            {steps.length > 1 && (
              <button onClick={() => removeStep(i)} className="text-xs text-muted-foreground hover:text-destructive">✕</button>
            )}
          </div>
        ))}
        <div className="flex flex-wrap gap-1 pt-1">
          {keys.map(k => (
            <button key={k} onClick={() => insert(k)} className="px-2 py-1 text-xs rounded bg-background border border-border text-foreground font-mono hover:bg-muted">{k}</button>
          ))}
          <button onClick={() => setSteps(prev => prev.map((s, i) => {
            if (i !== focused.i) return s;
            if (s.type === 'text') return { ...s, value: s.value.slice(0, -1) };
            if (focused.field === 'num') return { ...s, num: s.num.slice(0, -1) };
            if (focused.field === 'den') return { ...s, den: s.den.slice(0, -1) };
            return s;
          }))} className="px-2 py-1 text-xs rounded bg-background border border-border text-foreground hover:bg-muted">⌫</button>
        </div>
      </div>
    </div>
  );
}
