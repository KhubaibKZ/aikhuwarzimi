import React from 'react';
import { Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type LineSpec = {
  kind: 'x' | 'y' | 'linear'; // x = a   |   y = a   |   y = a*x + b
  a: string;
  b?: string;
};

export type RegionSpec = { x1: string; x2: string; y1: string; y2: string };

export type Q16Data = { lines: LineSpec[]; region: RegionSpec };

interface Props {
  data: Q16Data;
  onChange: (data: Q16Data) => void;
  disabled?: boolean;
  lineFeedback?: Array<'correct' | 'incorrect' | null>;
  regionFeedback?: 'correct' | 'incorrect' | null;
}

export const EMPTY_Q16: Q16Data = {
  lines: [{ kind: 'x', a: '' }],
  region: { x1: '', x2: '', y1: '', y2: '' },
};

const LINE_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'];

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
  const updateRegion = (patch: Partial<RegionSpec>) => {
    onChange({ ...data, region: { ...data.region, ...patch } });
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
    // linear y = a*x + b
    if (isNaN(b)) return null;
    const y1 = a * xMin + b;
    const y2 = a * xMax + b;
    return <line key={idx} x1={sx(xMin)} y1={sy(y1)} x2={sx(xMax)} y2={sy(y2)} stroke={color} strokeWidth={2.2} />;
  };

  // Region rectangle
  const rx1 = parseFloat(data.region.x1);
  const rx2 = parseFloat(data.region.x2);
  const ry1 = parseFloat(data.region.y1);
  const ry2 = parseFloat(data.region.y2);
  const regionValid = !isNaN(rx1) && !isNaN(rx2) && !isNaN(ry1) && !isNaN(ry2);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width={width} height={height} className="bg-card rounded-lg border">
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

          {/* region */}
          {regionValid && (
            <rect
              x={sx(Math.min(rx1, rx2))}
              y={sy(Math.max(ry1, ry2))}
              width={Math.abs(sx(rx2) - sx(rx1))}
              height={Math.abs(sy(ry2) - sy(ry1))}
              fill="hsl(var(--primary) / 0.25)"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              strokeDasharray="4,3"
            />
          )}
          {regionValid && (
            <text
              x={(sx(rx1) + sx(rx2)) / 2}
              y={(sy(ry1) + sy(ry2)) / 2 + 4}
              textAnchor="middle"
              fontSize={16}
              fontWeight="bold"
              fill="hsl(var(--primary))"
            >R</text>
          )}

          {/* user lines */}
          {data.lines.map((l, i) => renderLine(l, i))}
        </svg>
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

      {/* Region editor */}
      <div className={cn(
        "space-y-2 rounded-md border p-3",
        regionFeedback === 'correct' && 'border-green-500/60 bg-green-500/10',
        regionFeedback === 'incorrect' && 'border-destructive/50 bg-destructive/10',
      )}>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Region R (rectangle bounds)</p>
          {regionFeedback === 'correct' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          {regionFeedback === 'incorrect' && <XCircle className="h-4 w-4 text-destructive" />}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Input value={data.region.x1} onChange={(e) => updateRegion({ x1: e.target.value })} disabled={disabled} placeholder="x₁" className="w-16 h-8" />
          <span>≤ x ≤</span>
          <Input value={data.region.x2} onChange={(e) => updateRegion({ x2: e.target.value })} disabled={disabled} placeholder="x₂" className="w-16 h-8" />
          <span className="mx-2">|</span>
          <Input value={data.region.y1} onChange={(e) => updateRegion({ y1: e.target.value })} disabled={disabled} placeholder="y₁" className="w-16 h-8" />
          <span>≤ y ≤</span>
          <Input value={data.region.y2} onChange={(e) => updateRegion({ y2: e.target.value })} disabled={disabled} placeholder="y₂" className="w-16 h-8" />
        </div>
      </div>
    </div>
  );
}

// ---------- Validation helpers (exported) ----------

export type ExpectedLine = LineSpec; // same shape
export type ExpectedRegion = { x1: number; x2: number; y1: number; y2: number };

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
  expected: { lines: ExpectedLine[]; region: ExpectedRegion }
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

  const rx1 = parseFloat(data.region.x1);
  const rx2 = parseFloat(data.region.x2);
  const ry1 = parseFloat(data.region.y1);
  const ry2 = parseFloat(data.region.y2);
  const regionFilled = !isNaN(rx1) && !isNaN(rx2) && !isNaN(ry1) && !isNaN(ry2);
  const regionCorrect = regionFilled &&
    Math.abs(Math.min(rx1, rx2) - expected.region.x1) < 1e-6 &&
    Math.abs(Math.max(rx1, rx2) - expected.region.x2) < 1e-6 &&
    Math.abs(Math.min(ry1, ry2) - expected.region.y1) < 1e-6 &&
    Math.abs(Math.max(ry1, ry2) - expected.region.y2) < 1e-6;

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
  region: { x1: 1, x2: 3, y1: 2, y2: 3 } as ExpectedRegion,
};
