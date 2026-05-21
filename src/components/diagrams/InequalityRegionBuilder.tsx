import React from 'react';
import { Plus, Trash2, CheckCircle2, XCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type LineSpec = {
  kind: 'x' | 'y' | 'linear'; // x = a   |   y = a   |   y = a*x + b
  a: string;
  b?: string;
};

export type RegionPoint = { x: number; y: number } | null;

export type Q16Data = { lines: LineSpec[]; point: RegionPoint };

interface Props {
  data: Q16Data;
  onChange: (data: Q16Data) => void;
  disabled?: boolean;
  lineFeedback?: Array<'correct' | 'incorrect' | null>;
  regionFeedback?: 'correct' | 'incorrect' | null;
}

export const EMPTY_Q16: Q16Data = {
  lines: [{ kind: 'x', a: '' }],
  point: null,
};

const LINE_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];

// Correct region polygon vertices (in plot coords), ordered around the perimeter.
// Vertices: (1,2), (2,2), (3,2.5), (3,3), (1,3)
export const REGION_POLYGON: Array<[number, number]> = [
  [1, 2],
  [2, 2],
  [3, 2.5],
  [3, 3],
  [1, 3],
];

export function pointInRegion(px: number, py: number, poly = REGION_POLYGON): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = ((yi > py) !== (yj > py)) &&
      (px < ((xj - xi) * (py - yi)) / (yj - yi + 1e-12) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export function InequalityRegionBuilder({
  data,
  onChange,
  disabled,
  lineFeedback = [],
  regionFeedback = null,
}: Props) {
  const width = 360;
  const height = 360;
  const padding = 36;
  const xMin = 0, xMax = 6, yMin = 0, yMax = 6;
  const gw = width - 2 * padding;
  const gh = height - 2 * padding;
  const sx = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * gw;
  const sy = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * gh;
  const unsx = (px: number) => xMin + ((px - padding) / gw) * (xMax - xMin);
  const unsy = (py: number) => yMax - ((py - padding) / gh) * (yMax - yMin);

  const updateLine = (i: number, patch: Partial<LineSpec>) => {
    const lines = data.lines.map((l, j) => (j === i ? { ...l, ...patch } : l));
    onChange({ ...data, lines });
  };
  const addLine = () => {
    if (data.lines.length >= 5) return;
    onChange({ ...data, lines: [...data.lines, { kind: 'x', a: '' }] });
  };
  const removeLine = (i: number) => {
    onChange({ ...data, lines: data.lines.filter((_, j) => j !== i) });
  };
  const clearPoint = () => onChange({ ...data, point: null });

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (width / rect.width);
    const py = (e.clientY - rect.top) * (height / rect.height);
    let xv = unsx(px);
    let yv = unsy(py);
    if (xv < xMin || xv > xMax || yv < yMin || yv > yMax) return;
    // Snap to nearest 0.1 for precision
    xv = Math.round(xv * 10) / 10;
    yv = Math.round(yv * 10) / 10;
    onChange({ ...data, point: { x: xv, y: yv } });
  };

  const renderLine = (l: LineSpec, idx: number) => {
    const a = parseFloat(l.a);
    const b = parseFloat(l.b || '0');
    if (isNaN(a)) return null;
    const color = LINE_COLORS[idx % LINE_COLORS.length];
    if (l.kind === 'x') {
      return <line key={idx} x1={sx(a)} y1={sy(yMin)} x2={sx(a)} y2={sy(yMax)} stroke={color} strokeWidth={2.2} />;
    }
    if (l.kind === 'y') {
      return <line key={idx} x1={sx(xMin)} y1={sy(a)} x2={sx(xMax)} y2={sy(a)} stroke={color} strokeWidth={2.2} />;
    }
    if (isNaN(b)) return null;
    const y1 = a * xMin + b;
    const y2 = a * xMax + b;
    return <line key={idx} x1={sx(xMin)} y1={sy(y1)} x2={sx(xMax)} y2={sy(y2)} stroke={color} strokeWidth={2.2} />;
  };

  const polyPoints = REGION_POLYGON.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ');
  const pt = data.point;
  const showRegionOverlay = regionFeedback !== null; // reveal correct region after Check Work / submission

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground text-center">
          Click on the grid to place a point inside the region <span className="font-semibold text-foreground">R</span>.
        </p>
        <svg
          width={width}
          height={height}
          className={cn(
            "bg-card rounded-lg border",
            !disabled && "cursor-crosshair",
          )}
          onClick={handleSvgClick}
        >
          {/* grid */}
          {Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i).map(x => (
            <line key={`vx${x}`} x1={sx(x)} y1={padding} x2={sx(x)} y2={height - padding}
              stroke={x === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'} strokeWidth={x === 0 ? 1.5 : 0.5} />
          ))}
          {Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i).map(y => (
            <line key={`hy${y}`} x1={padding} y1={sy(y)} x2={width - padding} y2={sy(y)}
              stroke={y === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'} strokeWidth={y === 0 ? 1.5 : 0.5} />
          ))}
          {/* labels */}
          {Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i).map(x => (
            <text key={`xl${x}`} x={sx(x)} y={sy(0) + 14} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">{x}</text>
          ))}
          {Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i).filter(y => y !== 0).map(y => (
            <text key={`yl${y}`} x={sx(0) - 8} y={sy(y) + 4} textAnchor="end" fontSize={10} fill="hsl(var(--muted-foreground))">{y}</text>
          ))}
          <text x={width - padding + 8} y={sy(0) + 4} fontSize={12} fill="hsl(var(--foreground))">x</text>
          <text x={sx(0) - 4} y={padding - 8} fontSize={12} fill="hsl(var(--foreground))">y</text>

          {/* user lines */}
          {data.lines.map((l, i) => renderLine(l, i))}

          {/* Correct region overlay — only shown after feedback */}
          {showRegionOverlay && (
            <>
              <polygon
                points={polyPoints}
                fill="hsl(var(--primary) / 0.22)"
                stroke="hsl(var(--primary))"
                strokeWidth={1.5}
                strokeDasharray="4,3"
                pointerEvents="none"
              />
              <text
                x={(sx(1) + sx(3)) / 2}
                y={(sy(2) + sy(3)) / 2 + 4}
                textAnchor="middle"
                fontSize={16}
                fontWeight="bold"
                fill="hsl(var(--primary))"
                pointerEvents="none"
              >R</text>
            </>
          )}

          {/* User-placed point */}
          {pt && (
            <g pointerEvents="none">
              <circle
                cx={sx(pt.x)}
                cy={sy(pt.y)}
                r={6}
                fill={
                  regionFeedback === 'correct' ? '#10b981'
                    : regionFeedback === 'incorrect' ? 'hsl(var(--destructive))'
                    : 'hsl(var(--primary))'
                }
                stroke="white"
                strokeWidth={2}
              />
              <text
                x={sx(pt.x) + 10}
                y={sy(pt.y) - 8}
                fontSize={11}
                fontWeight={600}
                fill="hsl(var(--foreground))"
              >R ({pt.x}, {pt.y})</text>
            </g>
          )}
        </svg>

        <div className="flex items-center gap-2 text-xs">
          {pt ? (
            <span className="inline-flex items-center gap-1 text-foreground">
              <MapPin className="h-3.5 w-3.5" /> Point placed at ({pt.x}, {pt.y})
            </span>
          ) : (
            <span className="text-muted-foreground">No point placed yet.</span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearPoint}
            disabled={disabled || !pt}
            className="h-7 px-2"
          >
            Clear point
          </Button>
          {regionFeedback === 'correct' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          {regionFeedback === 'incorrect' && <XCircle className="h-4 w-4 text-destructive" />}
        </div>
      </div>

      {/* Lines editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Lines (up to 5)</p>
          <Button type="button" variant="outline" size="sm" onClick={addLine} disabled={disabled || data.lines.length >= 5}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add line
          </Button>
        </div>
        {data.lines.map((l, i) => {
          const fb = lineFeedback[i];
          return (
            <div key={i} className={cn(
              "flex items-center gap-2 rounded-md border p-2",
              fb === 'correct' && 'border-green-500/60 bg-green-500/10',
              fb === 'incorrect' && 'border-destructive/50 bg-destructive/10',
            )}>
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: LINE_COLORS[i % LINE_COLORS.length] }} />
              <select
                value={l.kind}
                onChange={(e) => updateLine(i, { kind: e.target.value as LineSpec['kind'], a: '', b: '' })}
                disabled={disabled}
                className="bg-background border rounded px-2 py-1 text-sm"
              >
                <option value="x">x = a (vertical)</option>
                <option value="y">y = a (horizontal)</option>
                <option value="linear">y = a·x + b</option>
              </select>
              {l.kind === 'linear' ? (
                <>
                  <span className="text-sm">y =</span>
                  <Input value={l.a} onChange={(e) => updateLine(i, { a: e.target.value })} disabled={disabled}
                    placeholder="a" className="w-16 h-8 text-sm" />
                  <span className="text-sm">x +</span>
                  <Input value={l.b || ''} onChange={(e) => updateLine(i, { b: e.target.value })} disabled={disabled}
                    placeholder="b" className="w-16 h-8 text-sm" />
                </>
              ) : (
                <>
                  <span className="text-sm">{l.kind} =</span>
                  <Input value={l.a} onChange={(e) => updateLine(i, { a: e.target.value })} disabled={disabled}
                    placeholder="value" className="w-20 h-8 text-sm" />
                </>
              )}
              {fb === 'correct' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {fb === 'incorrect' && <XCircle className="h-4 w-4 text-destructive" />}
              <Button type="button" variant="ghost" size="sm" onClick={() => removeLine(i)}
                disabled={disabled || data.lines.length <= 1} className="ml-auto">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Validation helpers (exported) ----------

export type ExpectedLine = LineSpec;

export function lineMatches(user: LineSpec, expected: ExpectedLine): boolean {
  if (user.kind !== expected.kind) return false;
  const ua = parseFloat(user.a);
  const ea = parseFloat(expected.a);
  if (isNaN(ua) || isNaN(ea) || Math.abs(ua - ea) > 1e-6) return false;
  if (expected.kind === 'linear') {
    const ub = parseFloat(user.b || '0');
    const eb = parseFloat(expected.b || '0');
    if (isNaN(ub) || isNaN(eb) || Math.abs(ub - eb) > 1e-6) return false;
  }
  return true;
}

export function evaluateQ16(
  data: Q16Data,
  expected: { lines: ExpectedLine[] }
): {
  lineFeedback: Array<'correct' | 'incorrect' | null>;
  regionFeedback: 'correct' | 'incorrect' | null;
  correctLineCount: number;
  regionCorrect: boolean;
} {
  const usedExpected = new Set<number>();
  const lineFeedback = data.lines.map(ul => {
    if (!ul.a) return null as 'correct' | 'incorrect' | null;
    for (let i = 0; i < expected.lines.length; i++) {
      if (usedExpected.has(i)) continue;
      if (lineMatches(ul, expected.lines[i])) {
        usedExpected.add(i);
        return 'correct' as const;
      }
    }
    return 'incorrect' as const;
  });

  const pt = data.point;
  const regionFilled = !!pt;
  const regionCorrect = !!pt && pointInRegion(pt.x, pt.y);

  return {
    lineFeedback,
    regionFeedback: regionFilled ? (regionCorrect ? 'correct' : 'incorrect') : null,
    correctLineCount: lineFeedback.filter(f => f === 'correct').length,
    regionCorrect,
  };
}

export const Q16_EXPECTED = {
  lines: [
    { kind: 'x', a: '1' },
    { kind: 'x', a: '3' },
    { kind: 'y', a: '2' },
    { kind: 'y', a: '3' },
    { kind: 'linear', a: '0.5', b: '1' },
  ] as ExpectedLine[],
};
