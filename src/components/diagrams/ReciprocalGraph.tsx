import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Point {
  x: number;
  y: number;
  isTableValue?: boolean;
}

interface ReciprocalGraphProps {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  k?: number; // The constant in y = k/x
  showHorizontalLine?: number | null; // y = n line to show
  interactive?: boolean;
  showTablePoints?: boolean;
  onPointPlotted?: (points: Point[]) => void;
}

export function ReciprocalGraph({
  width = 420,
  height = 420,
  xRange = [-6, 6],
  yRange = [-12, 12],
  k = 12,
  showHorizontalLine = null,
  interactive = true,
  showTablePoints = true,
  onPointPlotted
}: ReciprocalGraphProps) {
  const [plottedPoints, setPlottedPoints] = useState<Point[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [showCurve, setShowCurve] = useState(false);

  const padding = 45;
  const gridWidth = width - 2 * padding;
  const gridHeight = height - 2 * padding;

  const xMin = xRange[0];
  const xMax = xRange[1];
  const yMin = yRange[0];
  const yMax = yRange[1];

  const scaleX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * gridWidth;
  const scaleY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * gridHeight;
  
  const unscaleX = (px: number) => xMin + ((px - padding) / gridWidth) * (xMax - xMin);
  const unscaleY = (py: number) => yMax - ((py - padding) / gridHeight) * (yMax - yMin);

  // Table values for y = 12/x
  const tableValues: Point[] = [
    { x: -6, y: -2, isTableValue: true },
    { x: -4, y: -3, isTableValue: true },
    { x: -3, y: -4, isTableValue: true },
    { x: -2, y: -6, isTableValue: true },
    { x: -1, y: -12, isTableValue: true },
    { x: 1, y: 12, isTableValue: true },
    { x: 2, y: 6, isTableValue: true },
    { x: 3, y: 4, isTableValue: true },
    { x: 4, y: 3, isTableValue: true },
    { x: 6, y: 2, isTableValue: true },
  ];

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.round(unscaleX(px));
    const y = Math.round(unscaleY(py));
    
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax && x !== 0) {
      const newPoint = { x, y };
      const newPoints = [...plottedPoints, newPoint];
      setPlottedPoints(newPoints);
      onPointPlotted?.(newPoints);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.round(unscaleX(px));
    const y = Math.round(unscaleY(py));
    
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax && x !== 0) {
      setHoveredPoint({ x, y });
    } else {
      setHoveredPoint(null);
    }
  };

  // Generate smooth curve points for y = k/x
  const generateCurvePoints = (startX: number, endX: number, step: number = 0.1): string => {
    const points: string[] = [];
    for (let x = startX; x <= endX; x += step) {
      if (Math.abs(x) < 0.1) continue; // Skip near zero
      const y = k / x;
      if (y >= yMin && y <= yMax) {
        points.push(`${scaleX(x)},${scaleY(y)}`);
      }
    }
    return points.length > 1 ? `M ${points.join(' L ')}` : '';
  };

  // Grid lines
  const gridLines = [];
  for (let x = xMin; x <= xMax; x++) {
    gridLines.push(
      <line
        key={`vgrid-${x}`}
        x1={scaleX(x)}
        y1={padding}
        x2={scaleX(x)}
        y2={height - padding}
        stroke={x === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'}
        strokeWidth={x === 0 ? 2 : 0.5}
      />
    );
  }
  for (let y = yMin; y <= yMax; y += 2) {
    gridLines.push(
      <line
        key={`hgrid-${y}`}
        x1={padding}
        y1={scaleY(y)}
        x2={width - padding}
        y2={scaleY(y)}
        stroke={y === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'}
        strokeWidth={y === 0 ? 2 : 0.5}
      />
    );
  }

  // Axis labels
  const axisLabels = [];
  for (let x = xMin; x <= xMax; x++) {
    if (x !== 0) {
      axisLabels.push(
        <text
          key={`xlabel-${x}`}
          x={scaleX(x)}
          y={scaleY(0) + 14}
          textAnchor="middle"
          fontSize={9}
          fill="hsl(var(--muted-foreground))"
        >
          {x}
        </text>
      );
    }
  }
  for (let y = yMin; y <= yMax; y += 2) {
    if (y !== 0) {
      axisLabels.push(
        <text
          key={`ylabel-${y}`}
          x={scaleX(0) - 6}
          y={scaleY(y) + 3}
          textAnchor="end"
          fontSize={9}
          fill="hsl(var(--muted-foreground))"
        >
          {y}
        </text>
      );
    }
  }

  const clearPoints = () => {
    setPlottedPoints([]);
    setShowCurve(false);
    onPointPlotted?.([]);
  };

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        className={`bg-card rounded-lg border ${interactive ? 'cursor-crosshair' : ''}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Grid */}
        {gridLines}
        
        {/* Axis labels */}
        {axisLabels}
        
        {/* Axis labels */}
        <text x={width - padding + 8} y={scaleY(0) + 4} fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">x</text>
        <text x={scaleX(0) - 4} y={padding - 8} fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">y</text>
        <text x={scaleX(0) - 10} y={scaleY(0) + 14} fontSize={9} fill="hsl(var(--muted-foreground))">O</text>

        {/* Reference curve (when show curve is enabled) */}
        {showCurve && (
          <>
            <path
              d={generateCurvePoints(-6, -0.5, 0.05)}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="none"
            />
            <path
              d={generateCurvePoints(0.5, 6, 0.05)}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="none"
            />
          </>
        )}

        {/* Horizontal line y = n */}
        {showHorizontalLine !== null && (
          <>
            <line
              x1={padding}
              y1={scaleY(showHorizontalLine)}
              x2={width - padding}
              y2={scaleY(showHorizontalLine)}
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              strokeDasharray="6,4"
            />
            <text
              x={width - padding + 5}
              y={scaleY(showHorizontalLine) + 4}
              fontSize={11}
              fill="hsl(var(--destructive))"
              fontWeight="bold"
            >
              y = {showHorizontalLine}
            </text>
          </>
        )}

        {/* Table value points (pre-plotted reference) */}
        {showTablePoints && tableValues.map((point, idx) => (
          <g key={`table-${idx}`}>
            <circle
              cx={scaleX(point.x)}
              cy={scaleY(point.y)}
              r={4}
              fill="hsl(var(--primary))"
              stroke="white"
              strokeWidth={1.5}
            />
          </g>
        ))}

        {/* User plotted points */}
        {plottedPoints.map((point, idx) => (
          <g key={`plotted-${idx}`}>
            <circle
              cx={scaleX(point.x)}
              cy={scaleY(point.y)}
              r={5}
              fill="hsl(var(--accent))"
              stroke="hsl(var(--accent-foreground))"
              strokeWidth={2}
            />
            <text
              x={scaleX(point.x) + 8}
              y={scaleY(point.y) - 8}
              fontSize={9}
              fill="hsl(var(--accent-foreground))"
            >
              ({point.x}, {point.y})
            </text>
          </g>
        ))}

        {/* Hover indicator */}
        {hoveredPoint && interactive && (
          <g>
            <circle
              cx={scaleX(hoveredPoint.x)}
              cy={scaleY(hoveredPoint.y)}
              r={6}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="3,3"
            />
            <text
              x={scaleX(hoveredPoint.x) + 10}
              y={scaleY(hoveredPoint.y) - 10}
              fontSize={10}
              fill="hsl(var(--primary))"
            >
              ({hoveredPoint.x}, {hoveredPoint.y})
            </text>
          </g>
        )}

        {/* Intersection point indicator when horizontal line is shown */}
        {showHorizontalLine !== null && showCurve && (
          <g>
            <circle
              cx={scaleX(k / showHorizontalLine)}
              cy={scaleY(showHorizontalLine)}
              r={6}
              fill="hsl(var(--destructive))"
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={scaleX(k / showHorizontalLine) + 10}
              y={scaleY(showHorizontalLine) - 8}
              fontSize={10}
              fill="hsl(var(--destructive))"
              fontWeight="bold"
            >
              x = {(k / showHorizontalLine).toFixed(1)}
            </text>
          </g>
        )}
      </svg>
      
      {/* Controls */}
      {interactive && (
        <div className="flex gap-2 mt-2 justify-end">
          {plottedPoints.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearPoints}
              className="text-xs"
            >
              Clear Points
            </Button>
          )}
          <Button
            variant={showCurve ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCurve(!showCurve)}
            className="text-xs"
          >
            {showCurve ? 'Hide Curve' : 'Show Curve'}
          </Button>
        </div>
      )}
      
      {/* Instructions */}
      {interactive && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Click on the grid to plot points. The curve shows y = {k}/x
        </p>
      )}
    </div>
  );
}
