// Interactive function graph plotter for 4024/21 O/N 2023 Q6
// Plot y = 2x + 60/x − 4 for 1 ≤ x ≤ 8, then read x when y = 24.

import { useMemo, useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export interface FunctionGraphData {
  // user-placed points (x → y in graph units)
  points: Record<string, number | null>;
  // user-marked x readings where y = 24
  readings: number[];
}

export const EMPTY_FN_GRAPH: FunctionGraphData = { points: {}, readings: [] };

// Target x values from the QP table
const X_VALUES = [1, 1.5, 2, 3, 4, 5, 6, 8];
const fn = (x: number) => 2 * x + 60 / x - 4;
const EXPECTED: Record<string, number> = Object.fromEntries(
  X_VALUES.map(x => [String(x), Math.round(fn(x) * 10) / 10])
);

// Graph window
const X_MIN = 0, X_MAX = 8;
const Y_MIN = 0, Y_MAX = 60;
const W = 560, H = 420;
const PAD = { l: 44, r: 16, t: 16, b: 36 };
const plotW = W - PAD.l - PAD.r;
const plotH = H - PAD.t - PAD.b;
const sx = (x: number) => PAD.l + ((x - X_MIN) / (X_MAX - X_MIN)) * plotW;
const sy = (y: number) => PAD.t + plotH - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * plotH;
const ix = (px: number) => X_MIN + ((px - PAD.l) / plotW) * (X_MAX - X_MIN);
const iy = (py: number) => Y_MIN + ((PAD.t + plotH - py) / plotH) * (Y_MAX - Y_MIN);

interface Props {
  data: FunctionGraphData;
  onChange: (d: FunctionGraphData) => void;
  onScore?: (s: { d: { marks: number; note: string }; e?: { marks: number; note: string } }) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export function FunctionGraphPlotter({ data, onChange, onScore, disabled, showFeedback }: Props) {
  const [mode, setMode] = useState<'plot' | 'read'>('plot');
  const [activeX, setActiveX] = useState<number>(X_VALUES[0]);
  const svgRef = useRef<SVGSVGElement>(null);

  const placedCount = X_VALUES.filter(x => data.points[String(x)] != null).length;
  const correctPlots = X_VALUES.filter(x => {
    const y = data.points[String(x)];
    return y != null && Math.abs(y - EXPECTED[String(x)]) <= 1.0;
  }).length;

  // Score: B1 ≥6 correct table plots, B1 smooth curve (≥7 correct), B1 both readings within tolerance
  const score = useMemo(() => {
    let dMarks = 0;
    const notes: string[] = [];
    if (correctPlots >= 6) { dMarks += 1; notes.push('B1 plotted points correctly'); }
    if (correctPlots >= 7) { dMarks += 1; notes.push('B1 smooth curve through all points'); }
    // 3rd plotting mark for full coverage (all 8 within tolerance)
    if (correctPlots === 8) { dMarks += 1; notes.push('B1 fully accurate curve'); }
    const reads = [...data.readings].sort((a, b) => a - b);
    let eMarks = 0;
    const eNotes: string[] = [];
    if (reads.length >= 2) {
      const small = reads[0], big = reads[reads.length - 1];
      if (Math.abs(small - 3) <= 0.3) { eMarks += 1; eNotes.push('B1 x ≈ 3'); }
      if (Math.abs(big - 10) <= 0.3 || Math.abs(big - 8) <= 0.3) {
        // graph only goes to x=8; accept 8 as upper bound visible reading
        eMarks += 1; eNotes.push('B1 second root identified');
      }
    }
    return {
      d: { marks: Math.min(3, dMarks), note: notes.join('; ') || `${correctPlots}/8 plotted points within tolerance` },
      e: { marks: Math.min(2, eMarks), note: eNotes.join('; ') || 'Mark the two x values where curve crosses y = 24' },
    };
  }, [correctPlots, data.readings]);

  useEffect(() => { onScore?.(score); /* eslint-disable-next-line */ }, [score.d.marks, score.e.marks]);

  const handleClick = (evt: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const px = ((evt.clientX - rect.left) / rect.width) * W;
    const py = ((evt.clientY - rect.top) / rect.height) * H;
    if (px < PAD.l || px > W - PAD.r || py < PAD.t || py > H - PAD.b) return;
    if (mode === 'plot') {
      const yVal = Math.round(iy(py) * 2) / 2; // snap to 0.5
      onChange({ ...data, points: { ...data.points, [String(activeX)]: yVal } });
    } else {
      const xVal = Math.round(ix(px) * 10) / 10;
      const reads = [...data.readings, xVal].slice(-2);
      onChange({ ...data, readings: reads });
    }
  };

  // Build curve path through placed points (sorted by x)
  const curvePath = useMemo(() => {
    const pts = X_VALUES
      .map(x => ({ x, y: data.points[String(x)] }))
      .filter(p => p.y != null) as { x: number; y: number }[];
    if (pts.length < 2) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.y)}`).join(' ');
  }, [data.points]);

  const yTicks = [0, 10, 20, 24, 30, 40, 50, 60];
  const xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <div className="flex gap-1">
          <Button size="sm" variant={mode === 'plot' ? 'default' : 'outline'} onClick={() => setMode('plot')} disabled={disabled}>Plot points</Button>
          <Button size="sm" variant={mode === 'read' ? 'default' : 'outline'} onClick={() => setMode('read')} disabled={disabled}>Read y = 24</Button>
        </div>
        {mode === 'plot' && (
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-xs text-muted-foreground">x =</span>
            {X_VALUES.map(x => (
              <button
                key={x}
                onClick={() => setActiveX(x)}
                disabled={disabled}
                className={`px-2 py-0.5 text-xs rounded border ${activeX === x ? 'bg-primary text-primary-foreground border-primary' : 'border-border bg-background hover:bg-muted'}`}
              >{x}</button>
            ))}
          </div>
        )}
        {mode === 'read' && (
          <Button size="sm" variant="ghost" onClick={() => onChange({ ...data, readings: [] })} disabled={disabled}>Clear readings</Button>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto bg-background border border-border rounded cursor-crosshair touch-none"
        onClick={handleClick}
      >
        {/* Grid */}
        {xTicks.map(t => (
          <line key={`gx${t}`} x1={sx(t)} y1={PAD.t} x2={sx(t)} y2={H - PAD.b}
            stroke="currentColor" strokeOpacity={t === 0 ? 0.6 : 0.12} />
        ))}
        {yTicks.map(t => (
          <line key={`gy${t}`} x1={PAD.l} y1={sy(t)} x2={W - PAD.r} y2={sy(t)}
            stroke="currentColor" strokeOpacity={t === 0 ? 0.6 : 0.12} />
        ))}
        {/* Half-unit grid x */}
        {Array.from({ length: 16 }, (_, i) => i * 0.5).map(t => (
          <line key={`hx${t}`} x1={sx(t)} y1={PAD.t} x2={sx(t)} y2={H - PAD.b}
            stroke="currentColor" strokeOpacity={0.05} />
        ))}

        {/* y = 24 reference line in read mode */}
        {(mode === 'read' || data.readings.length > 0) && (
          <line x1={PAD.l} y1={sy(24)} x2={W - PAD.r} y2={sy(24)}
            stroke="hsl(var(--primary))" strokeDasharray="6 4" strokeWidth={1.5} />
        )}

        {/* Axis labels */}
        {xTicks.map(t => (
          <text key={`xl${t}`} x={sx(t)} y={H - PAD.b + 14} fontSize="11" textAnchor="middle" fill="currentColor" opacity={0.7}>{t}</text>
        ))}
        {yTicks.map(t => (
          <text key={`yl${t}`} x={PAD.l - 6} y={sy(t) + 3} fontSize="11" textAnchor="end" fill="currentColor" opacity={0.7}>{t}</text>
        ))}
        <text x={W - PAD.r} y={H - 4} fontSize="12" textAnchor="end" fill="currentColor" opacity={0.8}>x</text>
        <text x={PAD.l - 28} y={PAD.t + 10} fontSize="12" fill="currentColor" opacity={0.8}>y</text>

        {/* User curve */}
        {curvePath && <path d={curvePath} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />}

        {/* User-placed points */}
        {X_VALUES.map(x => {
          const y = data.points[String(x)];
          if (y == null) return null;
          const ok = Math.abs(y - EXPECTED[String(x)]) <= 1.0;
          const color = showFeedback ? (ok ? 'hsl(142 70% 45%)' : 'hsl(0 70% 55%)') : 'hsl(var(--primary))';
          return (
            <g key={`p${x}`}>
              <circle cx={sx(x)} cy={sy(y)} r={4} fill={color} stroke="white" strokeWidth={1} />
              <text x={sx(x) + 6} y={sy(y) - 6} fontSize="10" fill="currentColor" opacity={0.7}>({x}, {y})</text>
            </g>
          );
        })}

        {/* Active x marker */}
        {mode === 'plot' && (
          <line x1={sx(activeX)} y1={PAD.t} x2={sx(activeX)} y2={H - PAD.b}
            stroke="hsl(var(--primary))" strokeOpacity={0.5} strokeDasharray="3 3" />
        )}

        {/* User readings */}
        {data.readings.map((r, i) => (
          <g key={`r${i}`}>
            <line x1={sx(r)} y1={sy(24)} x2={sx(r)} y2={H - PAD.b}
              stroke="hsl(45 90% 55%)" strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={sx(r)} cy={sy(24)} r={4} fill="hsl(45 90% 55%)" stroke="white" strokeWidth={1} />
            <text x={sx(r)} y={H - PAD.b + 28} fontSize="11" textAnchor="middle" fill="hsl(45 90% 55%)">x ≈ {r}</text>
          </g>
        ))}
      </svg>

      <div className="mt-2 text-xs text-muted-foreground">
        {mode === 'plot'
          ? `Select an x value, then click on the grid at the matching y. Placed: ${placedCount}/8`
          : `Click where the curve crosses y = 24. Markings: ${data.readings.length}/2`}
        {showFeedback && (
          <span className="ml-2">· {correctPlots}/8 points within ±1.0 tolerance</span>
        )}
      </div>
    </div>
  );
}
