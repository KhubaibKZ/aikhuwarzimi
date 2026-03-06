import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, RotateCcw, Ruler, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BearingDiagramProps {
  pointA?: { x: number; y: number };
  pointB?: { x: number; y: number };
  scaleLabel?: string;
  width?: number;
  height?: number;
  correctBearingA?: number;
  correctBearingB?: number;
  onMarkC?: (correct: boolean) => void;
  bearingTolerance?: number;
}

export function BearingDiagram({
  pointA = { x: 80, y: 120 },
  pointB = { x: 340, y: 300 },
  scaleLabel = '1 cm : 5 km',
  width = 460,
  height = 420,
  correctBearingA = 60,
  correctBearingB = 320,
  onMarkC,
  bearingTolerance = 5,
}: BearingDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const [bearingA, setBearingA] = useState<number | null>(null);
  const [bearingB, setBearingB] = useState<number | null>(null);
  const [markedC, setMarkedC] = useState<{ x: number; y: number } | null>(null);
  const [activeTool, setActiveTool] = useState<'A' | 'B' | 'ruler' | null>(null);
  const [dragging, setDragging] = useState<'A' | 'B' | null>(null);
  const [measuredDist, setMeasuredDist] = useState<number | null>(null);
  const [cFeedback, setCFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const lineLength = 500;
  const northLen = 65;
  const protractorRadius = 70;

  const bearingToRad = (b: number) => ((b - 90) * Math.PI) / 180;

  const bearingEndpoint = (origin: { x: number; y: number }, bearing: number, len: number) => {
    const rad = bearingToRad(bearing);
    return { x: origin.x + Math.cos(rad) * len, y: origin.y + Math.sin(rad) * len };
  };

  // Distance between A and B in SVG units (pixels) — convert to "cm" using ~30px per cm
  const pixelDist = Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2);
  const cmDist = pixelDist / 30; // approx cm on screen

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
    if (t < 0) return null;
    const pt = { x: pointA.x + t * dxA, y: pointA.y + t * dyA };
    if (pt.x < 0 || pt.x > width || pt.y < 0 || pt.y > height) return null;
    return pt;
  }, [bearingA, bearingB, pointA, pointB, width, height]);

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
    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    return Math.round(angle);
  };

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const pt = getSvgPoint(e);
    if (!pt) return;
    if (dragging === 'A') setBearingA(calcBearing(pointA, pt));
    else if (dragging === 'B') setBearingB(calcBearing(pointB, pt));
  }, [dragging, getSvgPoint, pointA, pointB]);

  useEffect(() => {
    if (dragging) {
      const up = () => setDragging(null);
      window.addEventListener('mouseup', up);
      window.addEventListener('touchend', up);
      return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
    }
  }, [dragging]);

  const handleMarkC = () => {
    const inter = getIntersection();
    if (inter) {
      setMarkedC(inter);
      setActiveTool(null);
      // Check if bearings are within tolerance of correct values
      const aOk = bearingA !== null && Math.abs(bearingA - correctBearingA) <= bearingTolerance;
      const bOk = bearingB !== null && Math.abs(bearingB - correctBearingB) <= bearingTolerance;
      const isCorrect = aOk && bOk;
      setCFeedback(isCorrect ? 'correct' : 'incorrect');
      onMarkC?.(isCorrect);
    }
  };

  const handleMeasure = () => {
    setMeasuredDist(Math.round(cmDist * 10) / 10);
    setActiveTool(null);
  };

  const handleReset = () => {
    setBearingA(null);
    setBearingB(null);
    setMarkedC(null);
    setActiveTool(null);
    setMeasuredDist(null);
    setCFeedback(null);
  };

  // Bearing arc path
  const arcPath = (cx: number, cy: number, radius: number, endBearing: number) => {
    const startRad = bearingToRad(0);
    const endRad = bearingToRad(endBearing);
    const sx = cx + Math.cos(startRad) * radius;
    const sy = cy + Math.sin(startRad) * radius;
    const ex = cx + Math.cos(endRad) * radius;
    const ey = cy + Math.sin(endRad) * radius;
    const large = endBearing > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}`;
  };

  // Enhanced protractor with clearer markings
  const renderProtractor = (center: { x: number; y: number }) => {
    const r = protractorRadius;
    const elements: React.ReactNode[] = [];
    
    // Background circle
    elements.push(
      <circle key="bg" cx={center.x} cy={center.y} r={r} 
        fill="hsl(var(--primary) / 0.04)" stroke="hsl(var(--primary) / 0.3)" strokeWidth={1.5} />
    );
    // Inner circle
    elements.push(
      <circle key="inner" cx={center.x} cy={center.y} r={r - 18} 
        fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth={0.5} />
    );

    for (let deg = 0; deg < 360; deg += 5) {
      const rad = bearingToRad(deg);
      const isMajor = deg % 30 === 0;
      const isMid = deg % 10 === 0 && !isMajor;
      const tickLen = isMajor ? 14 : isMid ? 9 : 5;
      const inner = r - tickLen;
      
      elements.push(
        <line
          key={`t${deg}`}
          x1={center.x + Math.cos(rad) * inner}
          y1={center.y + Math.sin(rad) * inner}
          x2={center.x + Math.cos(rad) * r}
          y2={center.y + Math.sin(rad) * r}
          stroke={isMajor ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.4)"}
          strokeWidth={isMajor ? 1.5 : 0.6}
        />
      );
      
      if (isMajor) {
        const lx = center.x + Math.cos(rad) * (r + 12);
        const ly = center.y + Math.sin(rad) * (r + 12);
        elements.push(
          <text
            key={`l${deg}`}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="hsl(var(--primary))"
            fontSize="9"
            fontWeight="700"
          >
            {String(deg).padStart(3, '0')}°
          </text>
        );
      } else if (isMid) {
        const lx = center.x + Math.cos(rad) * (r + 9);
        const ly = center.y + Math.sin(rad) * (r + 9);
        elements.push(
          <text
            key={`l${deg}`}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="hsl(var(--muted-foreground))"
            fontSize="7"
            fontWeight="500"
          >
            {deg}
          </text>
        );
      }
    }

    // Cardinal labels
    const cardinals = [
      { deg: 0, label: 'N', color: 'hsl(var(--destructive))' },
      { deg: 90, label: 'E', color: 'hsl(var(--primary))' },
      { deg: 180, label: 'S', color: 'hsl(var(--primary))' },
      { deg: 270, label: 'W', color: 'hsl(var(--primary))' },
    ];
    cardinals.forEach(({ deg, label, color }) => {
      const rad = bearingToRad(deg);
      const lx = center.x + Math.cos(rad) * (r - 24);
      const ly = center.y + Math.sin(rad) * (r - 24);
      elements.push(
        <text key={`card-${label}`} x={lx} y={ly}
          textAnchor="middle" dominantBaseline="central"
          fill={color} fontSize="11" fontWeight="800">
          {label}
        </text>
      );
    });

    // Center crosshair
    elements.push(
      <circle key="center" cx={center.x} cy={center.y} r={2.5} fill="hsl(var(--primary))" />,
      <line key="ch1" x1={center.x - 6} y1={center.y} x2={center.x + 6} y2={center.y} stroke="hsl(var(--primary))" strokeWidth={0.8} />,
      <line key="ch2" x1={center.x} y1={center.y - 6} x2={center.x} y2={center.y + 6} stroke="hsl(var(--primary))" strokeWidth={0.8} />
    );

    return <g>{elements}</g>;
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
          "border border-border rounded-lg bg-background select-none w-full max-w-full",
          dragging && "cursor-crosshair"
        )}
        style={{ touchAction: 'none' }}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onMouseUp={() => setDragging(null)}
        onTouchEnd={() => setDragging(null)}
      >
        {/* Light grid */}
        {Array.from({ length: Math.floor(width / 30) + 1 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 30} y1={0} x2={i * 30} y2={height}
            stroke="hsl(var(--muted-foreground))" strokeWidth={0.3} opacity={0.15} />
        ))}
        {Array.from({ length: Math.floor(height / 30) + 1 }).map((_, j) => (
          <line key={`hg${j}`} x1={0} y1={j * 30} x2={width} y2={j * 30}
            stroke="hsl(var(--muted-foreground))" strokeWidth={0.3} opacity={0.15} />
        ))}

        {/* Line connecting A to B (the base line from QP) */}
        <line x1={pointA.x} y1={pointA.y} x2={pointB.x} y2={pointB.y}
          stroke="hsl(var(--foreground))" strokeWidth={1.2} />

        {/* North arrows */}
        {[{ pt: pointA, label: 'A', align: 'left' as const }, { pt: pointB, label: 'B', align: 'right' as const }].map(({ pt, label, align }) => (
          <g key={`n-${label}`}>
            <line x1={pt.x} y1={pt.y - 10} x2={pt.x} y2={pt.y - northLen}
              stroke="hsl(var(--foreground))" strokeWidth={1.2} />
            <polygon
              points={`${pt.x},${pt.y - northLen - 8} ${pt.x - 4},${pt.y - northLen} ${pt.x + 4},${pt.y - northLen}`}
              fill="hsl(var(--foreground))"
            />
            <text x={pt.x + (align === 'left' ? -18 : 8)} y={pt.y - northLen - 2}
              className="fill-foreground text-[11px]" fontWeight="bold">North</text>
          </g>
        ))}

        {/* Protractor overlay */}
        {activeTool === 'A' && renderProtractor(pointA)}
        {activeTool === 'B' && renderProtractor(pointB)}

        {/* Student bearing line from A */}
        {bearingA !== null && (
          <g>
            <line
              x1={pointA.x} y1={pointA.y}
              x2={bearingEndpoint(pointA, bearingA, lineLength).x}
              y2={bearingEndpoint(pointA, bearingA, lineLength).y}
              stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="6,4" opacity={0.8}
            />
            <path d={arcPath(pointA.x, pointA.y, 28, bearingA)}
              fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth={1.2} />
            <text
              x={pointA.x + 32} y={pointA.y - 32}
              fill="hsl(var(--primary))" fontSize="11" fontWeight="700">
              {String(bearingA).padStart(3, '0')}°
            </text>
          </g>
        )}

        {/* Student bearing line from B */}
        {bearingB !== null && (
          <g>
            <line
              x1={pointB.x} y1={pointB.y}
              x2={bearingEndpoint(pointB, bearingB, lineLength).x}
              y2={bearingEndpoint(pointB, bearingB, lineLength).y}
              stroke="hsl(var(--chart-2))" strokeWidth={1.5} strokeDasharray="6,4" opacity={0.8}
            />
            <path d={arcPath(pointB.x, pointB.y, 28, bearingB)}
              fill="hsl(var(--chart-2) / 0.08)" stroke="hsl(var(--chart-2))" strokeWidth={1.2} />
            <text
              x={pointB.x - 52} y={pointB.y - 32}
              fill="hsl(var(--chart-2))" fontSize="11" fontWeight="700">
              {String(bearingB).padStart(3, '0')}°
            </text>
          </g>
        )}

        {/* Marked point C */}
        {markedC && (
          <g>
            <line x1={markedC.x - 7} y1={markedC.y - 7} x2={markedC.x + 7} y2={markedC.y + 7}
              stroke={cFeedback === 'correct' ? "hsl(var(--chart-2))" : cFeedback === 'incorrect' ? "hsl(var(--destructive))" : "hsl(var(--destructive))"} strokeWidth={2.5} />
            <line x1={markedC.x + 7} y1={markedC.y - 7} x2={markedC.x - 7} y2={markedC.y + 7}
              stroke={cFeedback === 'correct' ? "hsl(var(--chart-2))" : cFeedback === 'incorrect' ? "hsl(var(--destructive))" : "hsl(var(--destructive))"} strokeWidth={2.5} />
            <text x={markedC.x + 12} y={markedC.y - 8}
              fill={cFeedback === 'correct' ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"}
              fontSize="14" fontWeight="bold">C</text>
            {cFeedback === 'correct' && (
              <text x={markedC.x + 12} y={markedC.y + 12} fill="hsl(var(--chart-2))" fontSize="10" fontWeight="600">✓</text>
            )}
          </g>
        )}

        {/* Ruler measurement display */}
        {measuredDist !== null && (
          <g>
            {/* Measurement line with ticks */}
            <line x1={pointA.x} y1={pointA.y} x2={pointB.x} y2={pointB.y}
              stroke="hsl(var(--chart-4))" strokeWidth={2} strokeDasharray="3,2" opacity={0.6} />
            {/* Midpoint label */}
            <rect 
              x={(pointA.x + pointB.x) / 2 - 28} y={(pointA.y + pointB.y) / 2 - 22} 
              width={56} height={18} rx={4}
              fill="hsl(var(--chart-4) / 0.15)" stroke="hsl(var(--chart-4))" strokeWidth={0.8} />
            <text 
              x={(pointA.x + pointB.x) / 2} y={(pointA.y + pointB.y) / 2 - 10}
              textAnchor="middle" fill="hsl(var(--chart-4))" fontSize="10" fontWeight="700">
              {measuredDist.toFixed(1)} cm
            </text>
          </g>
        )}

        {/* Village A */}
        <circle cx={pointA.x} cy={pointA.y} r={4} fill="hsl(var(--foreground))" />
        <text x={pointA.x - 18} y={pointA.y + 5}
          className="fill-foreground" fontSize="14" fontWeight="bold" fontStyle="italic">A</text>

        {/* Village B */}
        <circle cx={pointB.x} cy={pointB.y} r={4} fill="hsl(var(--foreground))" />
        <text x={pointB.x + 8} y={pointB.y + 18}
          className="fill-foreground" fontSize="14" fontWeight="bold" fontStyle="italic">B</text>

        {/* Interactive drag handles */}
        {activeTool === 'A' && (
          <circle cx={pointA.x} cy={pointA.y} r={protractorRadius}
            fill="transparent"
            className="cursor-crosshair"
            onMouseDown={() => setDragging('A')}
            onTouchStart={() => setDragging('A')}
          />
        )}
        {activeTool === 'B' && (
          <circle cx={pointB.x} cy={pointB.y} r={protractorRadius}
            fill="transparent"
            className="cursor-crosshair"
            onMouseDown={() => setDragging('B')}
            onTouchStart={() => setDragging('B')}
          />
        )}

        {/* Scale bar */}
        <g>
          <rect x={15} y={height - 40} width={80} height={24} rx={4}
            fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={0.8} />
          <line x1={22} y1={height - 25} x2={88} y2={height - 25}
            stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <line x1={22} y1={height - 30} x2={22} y2={height - 20}
            stroke="hsl(var(--foreground))" strokeWidth={1} />
          <line x1={88} y1={height - 30} x2={88} y2={height - 20}
            stroke="hsl(var(--foreground))" strokeWidth={1} />
          <text x={55} y={height - 33} textAnchor="middle"
            fill="hsl(var(--foreground))" fontSize="8" fontWeight="600">{scaleLabel}</text>
        </g>
      </svg>

      {/* Tool buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTool === 'ruler' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            if (activeTool === 'ruler') {
              setActiveTool(null);
            } else {
              setActiveTool('ruler');
              handleMeasure();
            }
          }}
          className="gap-1.5 text-xs"
        >
          <Ruler className="h-3.5 w-3.5" />
          Measure AB
        </Button>

        <Button
          variant={activeTool === 'A' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTool(activeTool === 'A' ? null : 'A')}
          className="gap-1.5 text-xs"
        >
          <Compass className="h-3.5 w-3.5" />
          Draw bearing from A
        </Button>

        <Button
          variant={activeTool === 'B' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTool(activeTool === 'B' ? null : 'B')}
          className="gap-1.5 text-xs"
        >
          <Compass className="h-3.5 w-3.5" />
          Draw bearing from B
        </Button>

        {bearingA !== null && bearingB !== null && intersection && !markedC && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleMarkC}
            className="gap-1.5 text-xs"
          >
            <Check className="h-3.5 w-3.5" />
            Mark point C
          </Button>
        )}

        {(bearingA !== null || bearingB !== null || markedC || measuredDist !== null) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-1.5 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      {/* Feedback */}
      {cFeedback === 'correct' && (
        <p className="text-xs text-chart-2 font-semibold flex items-center gap-1">
          <Check className="h-3.5 w-3.5" /> Point C marked correctly! Bearings are within tolerance.
        </p>
      )}
      {cFeedback === 'incorrect' && (
        <p className="text-xs text-destructive font-semibold">
          Bearings not quite right — check 060° from A and 320° from B. Try resetting and redrawing.
        </p>
      )}

      {/* Instructions */}
      {activeTool === 'A' && !bearingA && (
        <p className="text-xs text-muted-foreground">Drag from village A to draw the bearing line (clockwise from North)</p>
      )}
      {activeTool === 'B' && !bearingB && (
        <p className="text-xs text-muted-foreground">Drag from village B to draw the bearing line (clockwise from North)</p>
      )}
      {bearingA !== null && bearingB !== null && !markedC && intersection && (
        <p className="text-xs text-muted-foreground">Lines intersect — click "Mark point C" to label the intersection</p>
      )}
    </div>
  );
}
