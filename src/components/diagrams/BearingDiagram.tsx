import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BearingDiagramProps {
  /** Position of village A in SVG coords */
  pointA?: { x: number; y: number };
  /** Position of village B in SVG coords */
  pointB?: { x: number; y: number };
  /** Scale label e.g. "1 cm : 5 km" */
  scaleLabel?: string;
  /** Width of the SVG */
  width?: number;
  /** Height of the SVG */
  height?: number;
  /** Show bearing lines from A and B for part (b) */
  showBearingGuides?: boolean;
  /** Bearing from A in degrees (clockwise from North) */
  bearingFromA?: number;
  /** Bearing from B in degrees (clockwise from North) */
  bearingFromB?: number;
}

export function BearingDiagram({
  pointA = { x: 120, y: 260 },
  pointB = { x: 300, y: 260 },
  scaleLabel = '1 cm : 5 km',
  width = 400,
  height = 380,
  showBearingGuides = true,
  bearingFromA = 60,
  bearingFromB = 320,
}: BearingDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showBearings, setShowBearings] = useState(false);

  // Convert bearing (degrees clockwise from North) to SVG angle (radians, 0 = right)
  const bearingToRad = (bearing: number) => ((bearing - 90) * Math.PI) / 180;

  // Calculate bearing line endpoint
  const bearingEndpoint = (origin: { x: number; y: number }, bearing: number, length: number) => {
    const rad = bearingToRad(bearing);
    return {
      x: origin.x + Math.cos(rad) * length,
      y: origin.y + Math.sin(rad) * length,
    };
  };

  // Find intersection of two bearing lines
  const findIntersection = useCallback(() => {
    const radA = bearingToRad(bearingFromA);
    const radB = bearingToRad(bearingFromB);
    
    // Direction vectors
    const dxA = Math.cos(radA), dyA = Math.sin(radA);
    const dxB = Math.cos(radB), dyB = Math.sin(radB);
    
    // Solve: A + t * dA = B + s * dB
    const det = dxA * (-dyB) - (-dxB) * dyA;
    if (Math.abs(det) < 0.0001) return null;
    
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    const t = (dx * (-dyB) - (-dxB) * dy) / det;
    
    return {
      x: pointA.x + t * dxA,
      y: pointA.y + t * dyA,
    };
  }, [bearingFromA, bearingFromB, pointA, pointB]);

  const intersection = findIntersection();
  const lineLength = 350;

  // North arrow lines from each point
  const northLineLen = 50;

  // Bearing arc helpers
  const describeArc = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number) => {
    // Angles in SVG coordinates (0 = up/north, clockwise)
    const toSvg = (deg: number) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
    };
    const start = toSvg(0); // North
    const end = toSvg(endAngle);
    const largeArc = endAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className="space-y-2">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="border border-border rounded-lg bg-muted/20"
      >
        {/* Grid dots */}
        {Array.from({ length: Math.floor(width / 30) }).map((_, i) =>
          Array.from({ length: Math.floor(height / 30) }).map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={15 + i * 30}
              cy={15 + j * 30}
              r={0.8}
              className="fill-muted-foreground/20"
            />
          ))
        )}

        {/* North arrows at A and B */}
        {[pointA, pointB].map((pt, idx) => (
          <g key={`north-${idx}`}>
            <line
              x1={pt.x} y1={pt.y}
              x2={pt.x} y2={pt.y - northLineLen}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
              strokeDasharray="4,3"
              opacity={0.5}
            />
            <polygon
              points={`${pt.x},${pt.y - northLineLen - 6} ${pt.x - 3},${pt.y - northLineLen} ${pt.x + 3},${pt.y - northLineLen}`}
              fill="hsl(var(--muted-foreground))"
              opacity={0.5}
            />
            <text
              x={pt.x + 6}
              y={pt.y - northLineLen - 2}
              className="fill-muted-foreground text-[10px]"
              fontWeight="bold"
            >
              N
            </text>
          </g>
        ))}

        {/* Bearing lines (shown when toggled) */}
        {showBearings && (
          <>
            {/* Line from A at bearing */}
            <line
              x1={pointA.x} y1={pointA.y}
              x2={bearingEndpoint(pointA, bearingFromA, lineLength).x}
              y2={bearingEndpoint(pointA, bearingFromA, lineLength).y}
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              strokeDasharray="6,4"
              opacity={0.7}
            />
            {/* Bearing arc at A */}
            <path
              d={describeArc(pointA.x, pointA.y, 25, 0, bearingFromA)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1}
              opacity={0.6}
            />
            <text
              x={pointA.x + 18}
              y={pointA.y - 28}
              className="fill-primary text-[9px]"
              fontWeight="600"
            >
              {bearingFromA}°
            </text>

            {/* Line from B at bearing */}
            <line
              x1={pointB.x} y1={pointB.y}
              x2={bearingEndpoint(pointB, bearingFromB, lineLength).x}
              y2={bearingEndpoint(pointB, bearingFromB, lineLength).y}
              stroke="hsl(var(--accent-foreground))"
              strokeWidth={1.5}
              strokeDasharray="6,4"
              opacity={0.7}
            />
            {/* Bearing arc at B */}
            <path
              d={describeArc(pointB.x, pointB.y, 25, 0, bearingFromB)}
              fill="none"
              stroke="hsl(var(--accent-foreground))"
              strokeWidth={1}
              opacity={0.6}
            />
            <text
              x={pointB.x - 40}
              y={pointB.y - 28}
              className="fill-accent-foreground text-[9px]"
              fontWeight="600"
            >
              {bearingFromB}°
            </text>

            {/* Intersection point C */}
            {intersection && intersection.x > 0 && intersection.x < width && intersection.y > 0 && intersection.y < height && (
              <>
                <circle
                  cx={intersection.x}
                  cy={intersection.y}
                  r={4}
                  fill="hsl(var(--destructive))"
                  opacity={0.8}
                />
                <text
                  x={intersection.x + 8}
                  y={intersection.y - 6}
                  className="fill-destructive text-xs"
                  fontWeight="bold"
                >
                  C
                </text>
              </>
            )}
          </>
        )}

        {/* Line AB */}
        <line
          x1={pointA.x} y1={pointA.y}
          x2={pointB.x} y2={pointB.y}
          stroke="hsl(var(--foreground))"
          strokeWidth={1.5}
          opacity={0.4}
          strokeDasharray="3,3"
        />

        {/* Village A */}
        <circle cx={pointA.x} cy={pointA.y} r={4} className="fill-primary" />
        <text
          x={pointA.x - 14}
          y={pointA.y + 16}
          className="fill-foreground text-xs"
          fontWeight="bold"
        >
          A
        </text>

        {/* Village B */}
        <circle cx={pointB.x} cy={pointB.y} r={4} className="fill-primary" />
        <text
          x={pointB.x + 8}
          y={pointB.y + 16}
          className="fill-foreground text-xs"
          fontWeight="bold"
        >
          B
        </text>

        {/* Distance label */}
        <text
          x={(pointA.x + pointB.x) / 2}
          y={pointA.y + 30}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          6 cm on map
        </text>

        {/* Scale bar */}
        <g>
          <line x1={20} y1={height - 25} x2={80} y2={height - 25} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <line x1={20} y1={height - 30} x2={20} y2={height - 20} stroke="hsl(var(--foreground))" strokeWidth={1} />
          <line x1={80} y1={height - 30} x2={80} y2={height - 20} stroke="hsl(var(--foreground))" strokeWidth={1} />
          <text x={50} y={height - 12} textAnchor="middle" className="fill-foreground text-[10px]" fontWeight="600">
            {scaleLabel}
          </text>
        </g>
      </svg>

      {/* Toggle bearing lines button */}
      {showBearingGuides && (
        <button
          onClick={() => setShowBearings(!showBearings)}
          className={cn(
            "text-xs px-3 py-1.5 rounded-md border transition-colors",
            showBearings
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-muted border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {showBearings ? '✓ Bearing lines shown' : 'Show bearing lines for part (b)'}
        </button>
      )}
    </div>
  );
}
