import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BearingDiagramProps {
  pointA?: { x: number; y: number };
  pointB?: { x: number; y: number };
  scaleLabel?: string;
  width?: number;
  height?: number;
  correctBearingA?: number;
  correctBearingB?: number;
}

export function BearingDiagram({
  pointA = { x: 120, y: 240 },
  pointB = { x: 300, y: 240 },
  scaleLabel = '1 cm : 5 km',
  width = 420,
  height = 400,
  correctBearingA = 60,
  correctBearingB = 320,
}: BearingDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Student-drawn bearing angles (null = not yet drawn)
  const [bearingA, setBearingA] = useState<number | null>(null);
  const [bearingB, setBearingB] = useState<number | null>(null);
  const [markedC, setMarkedC] = useState<{ x: number; y: number } | null>(null);
  const [activeTool, setActiveTool] = useState<'A' | 'B' | 'C' | null>(null);
  const [dragging, setDragging] = useState<'A' | 'B' | null>(null);
  
  // Protractor visibility
  const [showProtractorAt, setShowProtractorAt] = useState<'A' | 'B' | null>(null);

  const lineLength = 400;
  const northLen = 55;

  // Convert bearing (clockwise from North) to SVG math angle (radians)
  const bearingToRad = (b: number) => ((b - 90) * Math.PI) / 180;

  const bearingEndpoint = (origin: { x: number; y: number }, bearing: number, len: number) => {
    const rad = bearingToRad(bearing);
    return { x: origin.x + Math.cos(rad) * len, y: origin.y + Math.sin(rad) * len };
  };

  // Get intersection of two bearing lines
  const getIntersection = useCallback(() => {
    if (bearingA === null || bearingB === null) return null;
    const radA = bearingToRad(bearingA);
    const radB = bearingToRad(bearingB);
    const dxA = Math.cos(radA), dyA = Math.sin(radA);
    const dxB = Math.cos(radB), dyB = Math.sin(radB);
    const det = dxA * (-dyB) - (-dxB) * dyA;
    if (Math.abs(det) < 0.0001) return null;
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    const t = (dx * (-dyB) - (-dxB) * dy) / det;
    if (t < 0) return null; // behind A
    const pt = { x: pointA.x + t * dxA, y: pointA.y + t * dyA };
    if (pt.x < 0 || pt.x > width || pt.y < 0 || pt.y > height) return null;
    return pt;
  }, [bearingA, bearingB, pointA, pointB, width, height]);

  // Mouse/touch handler for rotating bearing lines
  const getSvgPoint = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * width,
      y: ((clientY - rect.top) / rect.height) * height,
    };
  }, [width, height]);

  const calcBearing = (origin: { x: number; y: number }, target: { x: number; y: number }) => {
    const dx = target.x - origin.x;
    const dy = target.y - origin.y;
    // atan2 gives angle from positive x-axis, we want from North (up = negative y)
    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    return Math.round(angle);
  };

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const pt = getSvgPoint(e);
    if (!pt) return;
    
    if (dragging === 'A') {
      setBearingA(calcBearing(pointA, pt));
    } else if (dragging === 'B') {
      setBearingB(calcBearing(pointB, pt));
    }
  }, [dragging, getSvgPoint, pointA, pointB]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      const up = () => setDragging(null);
      window.addEventListener('mouseup', up);
      window.addEventListener('touchend', up);
      return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
    }
  }, [dragging]);

  // Mark C at intersection
  const handleMarkC = () => {
    const inter = getIntersection();
    if (inter) {
      setMarkedC(inter);
      setActiveTool(null);
    }
  };

  // Bearing arc path
  const arcPath = (cx: number, cy: number, radius: number, endBearing: number) => {
    const startRad = bearingToRad(0); // North
    const endRad = bearingToRad(endBearing);
    const sx = cx + Math.cos(startRad) * radius;
    const sy = cy + Math.sin(startRad) * radius;
    const ex = cx + Math.cos(endRad) * radius;
    const ey = cy + Math.sin(endRad) * radius;
    const large = endBearing > 180 ? 1 : 0;
    // Determine sweep: bearings go clockwise
    return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}`;
  };

  // Protractor ring (compass rose)
  const renderProtractor = (center: { x: number; y: number }, label: string) => {
    const r = 50;
    const ticks = [];
    for (let deg = 0; deg < 360; deg += 10) {
      const rad = bearingToRad(deg);
      const inner = deg % 30 === 0 ? r - 10 : r - 5;
      ticks.push(
        <line
          key={deg}
          x1={center.x + Math.cos(rad) * inner}
          y1={center.y + Math.sin(rad) * inner}
          x2={center.x + Math.cos(rad) * r}
          y2={center.y + Math.sin(rad) * r}
          stroke="hsl(var(--primary))"
          strokeWidth={deg % 30 === 0 ? 1.2 : 0.5}
          opacity={0.6}
        />
      );
      if (deg % 30 === 0) {
        const lx = center.x + Math.cos(rad) * (r + 10);
        const ly = center.y + Math.sin(rad) * (r + 10);
        ticks.push(
          <text
            key={`l${deg}`}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-primary text-[7px]"
            fontWeight="600"
          >
            {String(deg).padStart(3, '0')}
          </text>
        );
      }
    }
    return (
      <g>
        <circle cx={center.x} cy={center.y} r={r} fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth={0.8} opacity={0.5} />
        {ticks}
      </g>
    );
  };

  const intersection = getIntersection();

  return (
    <div className="space-y-3">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn(
          "border border-border rounded-lg bg-background select-none",
          dragging && "cursor-crosshair"
        )}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchEnd={handlePointerUp}
      >
        {/* Grid - light 1cm squares */}
        {Array.from({ length: Math.floor(width / 30) + 1 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 30} y1={0} x2={i * 30} y2={height}
            stroke="hsl(var(--muted-foreground))" strokeWidth={0.3} opacity={0.2} />
        ))}
        {Array.from({ length: Math.floor(height / 30) + 1 }).map((_, j) => (
          <line key={`hg${j}`} x1={0} y1={j * 30} x2={width} y2={j * 30}
            stroke="hsl(var(--muted-foreground))" strokeWidth={0.3} opacity={0.2} />
        ))}

        {/* North arrows */}
        {[{ pt: pointA, label: 'A' }, { pt: pointB, label: 'B' }].map(({ pt, label }) => (
          <g key={`n-${label}`}>
            <line x1={pt.x} y1={pt.y - 8} x2={pt.x} y2={pt.y - northLen}
              stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4,3" opacity={0.4} />
            <polygon
              points={`${pt.x},${pt.y - northLen - 7} ${pt.x - 3.5},${pt.y - northLen} ${pt.x + 3.5},${pt.y - northLen}`}
              fill="hsl(var(--foreground))" opacity={0.4}
            />
            <text x={pt.x + 7} y={pt.y - northLen - 1}
              className="fill-foreground text-[10px]" fontWeight="bold" opacity={0.5}>N</text>
          </g>
        ))}

        {/* Protractor at active point */}
        {showProtractorAt === 'A' && renderProtractor(pointA, 'A')}
        {showProtractorAt === 'B' && renderProtractor(pointB, 'B')}

        {/* Student-drawn bearing line from A */}
        {bearingA !== null && (
          <g>
            <line
              x1={pointA.x} y1={pointA.y}
              x2={bearingEndpoint(pointA, bearingA, lineLength).x}
              y2={bearingEndpoint(pointA, bearingA, lineLength).y}
              stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="8,4" opacity={0.7}
            />
            <path d={arcPath(pointA.x, pointA.y, 22, bearingA)}
              fill="none" stroke="hsl(var(--primary))" strokeWidth={1} opacity={0.5} />
            <text
              x={pointA.x + 26} y={pointA.y - 26}
              className="fill-primary text-[9px]" fontWeight="700">
              {String(bearingA).padStart(3, '0')}°
            </text>
          </g>
        )}

        {/* Student-drawn bearing line from B */}
        {bearingB !== null && (
          <g>
            <line
              x1={pointB.x} y1={pointB.y}
              x2={bearingEndpoint(pointB, bearingB, lineLength).x}
              y2={bearingEndpoint(pointB, bearingB, lineLength).y}
              stroke="hsl(var(--accent-foreground))" strokeWidth={1.5} strokeDasharray="8,4" opacity={0.7}
            />
            <path d={arcPath(pointB.x, pointB.y, 22, bearingB)}
              fill="none" stroke="hsl(var(--accent-foreground))" strokeWidth={1} opacity={0.5} />
            <text
              x={pointB.x - 42} y={pointB.y - 26}
              className="fill-accent-foreground text-[9px]" fontWeight="700">
              {String(bearingB).padStart(3, '0')}°
            </text>
          </g>
        )}

        {/* Marked point C */}
        {markedC && (
          <g>
            <line x1={markedC.x - 6} y1={markedC.y - 6} x2={markedC.x + 6} y2={markedC.y + 6}
              stroke="hsl(var(--destructive))" strokeWidth={2} />
            <line x1={markedC.x + 6} y1={markedC.y - 6} x2={markedC.x - 6} y2={markedC.y + 6}
              stroke="hsl(var(--destructive))" strokeWidth={2} />
            <text x={markedC.x + 10} y={markedC.y - 6}
              className="fill-destructive text-xs" fontWeight="bold">C</text>
          </g>
        )}

        {/* Village A — solid dot + label */}
        <circle cx={pointA.x} cy={pointA.y} r={4} fill="hsl(var(--foreground))" />
        <text x={pointA.x - 16} y={pointA.y + 18}
          className="fill-foreground text-sm" fontWeight="bold">A</text>

        {/* Village B — solid dot + label */}
        <circle cx={pointB.x} cy={pointB.y} r={4} fill="hsl(var(--foreground))" />
        <text x={pointB.x + 8} y={pointB.y + 18}
          className="fill-foreground text-sm" fontWeight="bold">B</text>

        {/* Interactive drag handles when tool is active */}
        {activeTool === 'A' && (
          <circle cx={pointA.x} cy={pointA.y} r={16}
            fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2}
            className="cursor-crosshair"
            onMouseDown={() => { setDragging('A'); setShowProtractorAt('A'); }}
            onTouchStart={() => { setDragging('A'); setShowProtractorAt('A'); }}
          />
        )}
        {activeTool === 'B' && (
          <circle cx={pointB.x} cy={pointB.y} r={16}
            fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2}
            className="cursor-crosshair"
            onMouseDown={() => { setDragging('B'); setShowProtractorAt('B'); }}
            onTouchStart={() => { setDragging('B'); setShowProtractorAt('B'); }}
          />
        )}

        {/* Scale bar */}
        <g>
          <rect x={15} y={height - 38} width={66} height={22} rx={3}
            fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={0.8} />
          <line x1={22} y1={height - 24} x2={74} y2={height - 24}
            stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <line x1={22} y1={height - 28} x2={22} y2={height - 20}
            stroke="hsl(var(--foreground))" strokeWidth={1} />
          <line x1={74} y1={height - 28} x2={74} y2={height - 20}
            stroke="hsl(var(--foreground))" strokeWidth={1} />
          <text x={48} y={height - 31} textAnchor="middle"
            className="fill-foreground text-[8px]" fontWeight="600">{scaleLabel}</text>
        </g>
      </svg>

      {/* Tool buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveTool(activeTool === 'A' ? null : 'A');
            setShowProtractorAt(activeTool === 'A' ? null : 'A');
          }}
          className={cn(
            "text-xs px-3 py-1.5 rounded-md border transition-colors",
            activeTool === 'A'
              ? "bg-primary/10 border-primary/40 text-primary font-semibold"
              : "bg-muted border-border text-muted-foreground hover:text-foreground"
          )}
        >
          📐 Draw bearing from A
        </button>
        <button
          onClick={() => {
            setActiveTool(activeTool === 'B' ? null : 'B');
            setShowProtractorAt(activeTool === 'B' ? null : 'B');
          }}
          className={cn(
            "text-xs px-3 py-1.5 rounded-md border transition-colors",
            activeTool === 'B'
              ? "bg-primary/10 border-primary/40 text-primary font-semibold"
              : "bg-muted border-border text-muted-foreground hover:text-foreground"
          )}
        >
          📐 Draw bearing from B
        </button>
        {bearingA !== null && bearingB !== null && intersection && !markedC && (
          <button
            onClick={handleMarkC}
            className="text-xs px-3 py-1.5 rounded-md border bg-destructive/10 border-destructive/30 text-destructive font-semibold transition-colors hover:bg-destructive/20"
          >
            ✕ Mark point C
          </button>
        )}
        {(bearingA !== null || bearingB !== null || markedC) && (
          <button
            onClick={() => {
              setBearingA(null);
              setBearingB(null);
              setMarkedC(null);
              setActiveTool(null);
              setShowProtractorAt(null);
            }}
            className="text-xs px-3 py-1.5 rounded-md border bg-muted border-border text-muted-foreground hover:text-foreground"
          >
            ↺ Reset
          </button>
        )}
      </div>

      {/* Instructions */}
      {activeTool === 'A' && (
        <p className="text-xs text-primary animate-pulse">Click and drag from village A to draw the bearing line</p>
      )}
      {activeTool === 'B' && (
        <p className="text-xs text-primary animate-pulse">Click and drag from village B to draw the bearing line</p>
      )}
      {bearingA !== null && bearingB !== null && !markedC && intersection && (
        <p className="text-xs text-destructive">Lines intersect — click "Mark point C" to label the intersection</p>
      )}
    </div>
  );
}
