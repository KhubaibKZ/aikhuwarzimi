import React, { useMemo, useState } from 'react';

// Q12 – Scale drawing for 4024/11 Oct/Nov 2023
// Inclined AB with North arrows. Interactive compass (radius in cm),
// protractor selectable at A or B, custom bearing, zoom in/out, and
// self-check buttons for angle and bisector. Conversion working area
// with add-step rows + simple fraction keyboard.

type Arc = { cx: number; cy: number; r: number; from: 'A' | 'B' };

// Map AB length on the original paper (cm). 1 cm on paper = PX_PER_CM screen px.
const AB_CM = 8.8;

export function ScaleDrawing2023ON() {
  const width = 520;
  const height = 360;

  // Inclined AB: A bottom-left, B upper-right (matches the original paper photo)
  const A = { x: 110, y: 250 };
  const B = { x: 430, y: 130 };

  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const ABlen = Math.hypot(dx, dy); // px
  const PX_PER_CM = ABlen / AB_CM;
  const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

  // Zoom
  const [zoom, setZoom] = useState(1);

  // Compass — radius is set by the student in cm
  const [radiusCm, setRadiusCm] = useState(5); // default just over half AB
  const radiusPx = radiusCm * PX_PER_CM;
  const [arcs, setArcs] = useState<Arc[]>([]);
  const hasArcA = arcs.some(a => a.from === 'A');
  const hasArcB = arcs.some(a => a.from === 'B');

  const intersections = useMemo(() => {
    const arcA = arcs.find(a => a.from === 'A');
    const arcB = arcs.find(a => a.from === 'B');
    if (!arcA || !arcB) return null;
    const d = ABlen;
    const r1 = arcA.r;
    const r2 = arcB.r;
    if (d > r1 + r2 || d < Math.abs(r1 - r2)) return null;
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h2 = r1 * r1 - a * a;
    if (h2 < 0) return null;
    const h = Math.sqrt(h2);
    const px = A.x + (a * dx) / d;
    const py = A.y + (a * dy) / d;
    const ux = -dy / d;
    const uy = dx / d;
    return [
      { x: px + h * ux, y: py + h * uy },
      { x: px - h * ux, y: py - h * uy },
    ];
  }, [arcs, A.x, A.y, dx, dy, ABlen]);

  const [showBisector, setShowBisector] = useState(false);
  const canBisect = !!intersections;

  // Protractor — the student picks at A or B (or none)
  const [protractorAt, setProtractorAt] = useState<'none' | 'A' | 'B'>('none');
  const [bearing, setBearing] = useState<number | ''>('');
  const [showBearingLine, setShowBearingLine] = useState(false);

  const bearingNum = typeof bearing === 'number' ? bearing : 0;
  const bearingRad = ((bearingNum - 90) * Math.PI) / 180;
  const bearingOrigin = protractorAt === 'B' ? B : A;
  const bearingLen = 320;
  const bearingEnd = {
    x: bearingOrigin.x + bearingLen * Math.cos(bearingRad),
    y: bearingOrigin.y + bearingLen * Math.sin(bearingRad),
  };

  const dropArc = (from: 'A' | 'B') => {
    const c = from === 'A' ? A : B;
    setArcs(prev => [...prev.filter(a => a.from !== from), { cx: c.x, cy: c.y, r: radiusPx, from }]);
  };

  const reset = () => {
    setArcs([]);
    setShowBisector(false);
    setProtractorAt('none');
    setShowBearingLine(false);
    setBearing('');
  };

  // Self-check feedback
  type CheckState = { ok: boolean; msg: string } | null;
  const [angleCheck, setAngleCheck] = useState<CheckState>(null);
  const [bisectorCheck, setBisectorCheck] = useState<CheckState>(null);

  const checkBisector = () => {
    if (!intersections || !showBisector) {
      setBisectorCheck({ ok: false, msg: 'Drop arcs from both A and B with the same radius (> ½ AB), then connect intersections.' });
      return;
    }
    const arcA = arcs.find(a => a.from === 'A')!;
    const arcB = arcs.find(a => a.from === 'B')!;
    const sameRadius = Math.abs(arcA.r - arcB.r) < 1;
    const bigEnough = arcA.r > ABlen / 2;
    if (!sameRadius) {
      setBisectorCheck({ ok: false, msg: 'Both arcs must use the SAME compass radius.' });
      return;
    }
    if (!bigEnough) {
      setBisectorCheck({ ok: false, msg: `Radius must be greater than ½ × AB (≈ ${(AB_CM / 2).toFixed(1)} cm).` });
      return;
    }
    setBisectorCheck({ ok: true, msg: 'Perpendicular bisector is correctly constructed.' });
  };

  const checkAngle = () => {
    if (protractorAt === 'none' || !showBearingLine || bearing === '') {
      setAngleCheck({ ok: false, msg: 'Place the protractor (at A), enter a bearing and mark the bearing line.' });
      return;
    }
    if (protractorAt !== 'A') {
      setAngleCheck({ ok: false, msg: 'For bearing FROM A, the protractor must be placed at A.' });
      return;
    }
    if (Math.abs(bearingNum - 105) <= 2) {
      setAngleCheck({ ok: true, msg: `Bearing ${bearingNum}° is correct (within tolerance of 105°).` });
    } else {
      setAngleCheck({ ok: false, msg: `Bearing should be 105° from North at A. You set ${bearingNum}°.` });
    }
  };

  // Conversion working area — add-step rows
  const [steps, setSteps] = useState<string[]>(['']);
  const [focused, setFocused] = useState<number>(0);
  const insert = (sym: string) => {
    setSteps(prev => prev.map((s, i) => (i === focused ? s + sym : s)));
  };
  const addStep = () => setSteps(prev => [...prev, '']);
  const removeStep = (i: number) => setSteps(prev => prev.filter((_, j) => j !== i));

  const fracKeys = ['0','1','2','3','4','5','6','7','8','9','.','×','÷','=','/','(',')','cm','km','000'];

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-sm font-semibold text-foreground">Scale drawing — 1 : 20 000</h4>
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom(z => Math.max(0.6, +(z - 0.2).toFixed(2)))} className="text-xs px-2 py-1 rounded border border-border bg-muted text-foreground hover:bg-muted/70">− Zoom</button>
          <span className="text-xs tabular-nums w-12 text-center text-foreground">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2.5, +(z + 0.2).toFixed(2)))} className="text-xs px-2 py-1 rounded border border-border bg-muted text-foreground hover:bg-muted/70">+ Zoom</button>
          <button onClick={reset} className="ml-2 text-xs px-2 py-1 rounded border border-border bg-muted text-muted-foreground hover:bg-muted/70">Reset</button>
        </div>
      </div>

      {/* Compass controls */}
      <div className="rounded border border-border bg-muted/30 p-2 space-y-2">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="font-semibold text-foreground">🧭 Compass</span>
          <label className="flex items-center gap-1 text-muted-foreground">
            Radius
            <input
              type="range"
              min={1}
              max={9}
              step={0.1}
              value={radiusCm}
              onChange={e => setRadiusCm(Number(e.target.value))}
              className="accent-primary"
            />
            <span className="tabular-nums w-14 text-foreground">{radiusCm.toFixed(1)} cm</span>
          </label>
          <button onClick={() => dropArc('A')} className={`px-2 py-1 rounded border ${hasArcA ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}>Arc from A</button>
          <button onClick={() => dropArc('B')} className={`px-2 py-1 rounded border ${hasArcB ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}>Arc from B</button>
          <button onClick={() => setShowBisector(v => !v)} disabled={!canBisect} className={`px-2 py-1 rounded border ${showBisector ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-foreground border-border'} disabled:opacity-40 disabled:cursor-not-allowed`}>Connect intersections (bisector)</button>
          <button onClick={checkBisector} className="px-2 py-1 rounded border border-amber-500 text-amber-600 hover:bg-amber-500/10">Check bisector</button>
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
            <input
              type="number"
              min={0}
              max={360}
              placeholder="—"
              value={bearing}
              onChange={e => {
                const v = e.target.value;
                if (v === '') return setBearing('');
                setBearing(Math.max(0, Math.min(360, Number(v))));
              }}
              className="w-16 px-1 py-0.5 rounded border border-border bg-background text-foreground"
            />
            °
          </label>
          <button onClick={() => setShowBearingLine(v => !v)} disabled={protractorAt === 'none' || bearing === ''} className={`px-2 py-1 rounded border ${showBearingLine ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-foreground border-border'} disabled:opacity-40 disabled:cursor-not-allowed`}>Mark bearing line</button>
          <button onClick={checkAngle} className="px-2 py-1 rounded border border-amber-500 text-amber-600 hover:bg-amber-500/10">Check angle</button>
        </div>
        {angleCheck && (
          <p className={`text-xs ${angleCheck.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{angleCheck.ok ? '✓' : '⚠'} {angleCheck.msg}</p>
        )}
      </div>

      {/* Diagram with zoom */}
      <div className="overflow-auto bg-background rounded border border-border">
        <div style={{ width: width * zoom, height: height * zoom }}>
          <svg viewBox={`0 0 ${width} ${height}`} width={width * zoom} height={height * zoom}>
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
              const ux = p2.x - p1.x;
              const uy = p2.y - p1.y;
              const len = Math.hypot(ux, uy) || 1;
              const ex = (ux / len) * 240;
              const ey = (uy / len) * 240;
              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;
              return <line x1={mx - ex} y1={my - ey} x2={mx + ex} y2={my + ey} stroke="hsl(var(--primary))" strokeWidth={2} />;
            })()}

            {/* Protractor in a prominent fuchsia/magenta colour */}
            {protractorAt !== 'none' && (() => {
              const C = protractorAt === 'A' ? A : B;
              const COL = '#e879f9'; // fuchsia-400
              const FILL = 'rgba(232,121,249,0.12)';
              return (
                <g>
                  <path d={`M ${C.x - 90} ${C.y} A 90 90 0 0 1 ${C.x + 90} ${C.y} Z`} fill={FILL} stroke={COL} strokeWidth={1.5} />
                  <path d={`M ${C.x + 90} ${C.y} A 90 90 0 0 1 ${C.x - 90} ${C.y} Z`} fill={FILL} stroke={COL} strokeWidth={1.5} />
                  {Array.from({ length: 37 }).map((_, i) => {
                    const deg = i * 10;
                    const rad = ((deg - 90) * Math.PI) / 180;
                    const r2 = deg % 30 === 0 ? 76 : 84;
                    return (
                      <g key={deg}>
                        <line x1={C.x + 90 * Math.cos(rad)} y1={C.y + 90 * Math.sin(rad)} x2={C.x + r2 * Math.cos(rad)} y2={C.y + r2 * Math.sin(rad)} stroke={COL} strokeWidth={1} />
                        {deg % 30 === 0 && deg < 360 && (
                          <text x={C.x + 68 * Math.cos(rad)} y={C.y + 68 * Math.sin(rad) + 3} fontSize="9" textAnchor="middle" fill={COL} fontWeight="bold">{deg}</text>
                        )}
                      </g>
                    );
                  })}
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

            <text x={width - 8} y={height - 8} fontSize="11" textAnchor="end" fill="hsl(var(--muted-foreground))">Scale 1 : 20 000</text>
          </svg>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/40 border border-border rounded p-2">
        <strong className="text-foreground">Line AB length = 8.8 cm</strong>
      </div>

      {/* Conversion working area */}
      <div className="rounded border border-border bg-muted/30 p-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Conversion working (optional steps)</span>
          <button onClick={addStep} className="text-xs px-2 py-1 rounded border border-border bg-background text-foreground hover:bg-muted">+ Add step</button>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
            <input
              value={s}
              onFocus={() => setFocused(i)}
              onChange={e => setSteps(prev => prev.map((v, j) => (j === i ? e.target.value : v)))}
              placeholder="e.g. 8.8 × 20000 = 176000 cm"
              className="flex-1 px-2 py-1 rounded border border-border bg-background text-foreground text-sm font-mono"
            />
            {steps.length > 1 && (
              <button onClick={() => removeStep(i)} className="text-xs text-muted-foreground hover:text-destructive">✕</button>
            )}
          </div>
        ))}
        <div className="flex flex-wrap gap-1 pt-1">
          {fracKeys.map(k => (
            <button key={k} onClick={() => insert(k)} className="px-2 py-1 text-xs rounded bg-background border border-border text-foreground font-mono hover:bg-muted">{k}</button>
          ))}
          <button onClick={() => setSteps(prev => prev.map((s, i) => i === focused ? s.slice(0, -1) : s))} className="px-2 py-1 text-xs rounded bg-background border border-border text-foreground hover:bg-muted">⌫</button>
        </div>
      </div>
    </div>
  );
}
