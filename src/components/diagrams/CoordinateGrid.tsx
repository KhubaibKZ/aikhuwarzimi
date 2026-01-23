import React, { useState } from 'react';

interface Point {
  x: number;
  y: number;
  label?: string;
}

interface Line {
  points: Point[];
  color: string;
  label?: string;
  dashed?: boolean;
}

interface CoordinateGridProps {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  lines?: Line[];
  showPoints?: Point[];
  interactive?: boolean;
  onPointClick?: (x: number, y: number) => void;
}

export function CoordinateGrid({
  width = 400,
  height = 400,
  xRange = [-6, 6],
  yRange = [-6, 6],
  lines = [],
  showPoints = [],
  interactive = false,
  onPointClick
}: CoordinateGridProps) {
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [clickedPoints, setClickedPoints] = useState<Point[]>([]);

  const padding = 40;
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

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.round(unscaleX(px));
    const y = Math.round(unscaleY(py));
    
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      const newPoint = { x, y };
      setClickedPoints(prev => [...prev, newPoint]);
      onPointClick?.(x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.round(unscaleX(px));
    const y = Math.round(unscaleY(py));
    
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      setHoveredPoint({ x, y });
    } else {
      setHoveredPoint(null);
    }
  };

  // Generate grid lines
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
        strokeWidth={x === 0 ? 2 : 1}
      />
    );
  }
  for (let y = yMin; y <= yMax; y++) {
    gridLines.push(
      <line
        key={`hgrid-${y}`}
        x1={padding}
        y1={scaleY(y)}
        x2={width - padding}
        y2={scaleY(y)}
        stroke={y === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'}
        strokeWidth={y === 0 ? 2 : 1}
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
          y={scaleY(0) + 16}
          textAnchor="middle"
          fontSize={10}
          fill="hsl(var(--muted-foreground))"
        >
          {x}
        </text>
      );
    }
  }
  for (let y = yMin; y <= yMax; y++) {
    if (y !== 0) {
      axisLabels.push(
        <text
          key={`ylabel-${y}`}
          x={scaleX(0) - 8}
          y={scaleY(y) + 4}
          textAnchor="end"
          fontSize={10}
          fill="hsl(var(--muted-foreground))"
        >
          {y}
        </text>
      );
    }
  }

  // Draw lines
  const lineElements = lines.map((line, idx) => {
    const pathData = line.points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`)
      .join(' ');
    
    return (
      <g key={`line-${idx}`}>
        <path
          d={pathData}
          stroke={line.color}
          strokeWidth={2}
          fill="none"
          strokeDasharray={line.dashed ? '5,5' : undefined}
        />
        {line.label && line.points.length > 0 && (
          <text
            x={scaleX(line.points[line.points.length - 1].x) + 8}
            y={scaleY(line.points[line.points.length - 1].y)}
            fontSize={12}
            fontWeight="bold"
            fill={line.color}
          >
            {line.label}
          </text>
        )}
      </g>
    );
  });

  // Draw show points
  const pointElements = showPoints.map((point, idx) => (
    <g key={`point-${idx}`}>
      <circle
        cx={scaleX(point.x)}
        cy={scaleY(point.y)}
        r={5}
        fill="hsl(var(--primary))"
        stroke="white"
        strokeWidth={2}
      />
      {point.label && (
        <text
          x={scaleX(point.x) + 10}
          y={scaleY(point.y) - 10}
          fontSize={11}
          fontWeight="bold"
          fill="hsl(var(--primary))"
        >
          {point.label}
        </text>
      )}
    </g>
  ));

  // Draw clicked points
  const clickedPointElements = clickedPoints.map((point, idx) => (
    <g key={`clicked-${idx}`}>
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
        fontSize={10}
        fill="hsl(var(--accent-foreground))"
      >
        ({point.x}, {point.y})
      </text>
    </g>
  ));

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
        
        {/* Axis arrows and labels */}
        <text x={width - padding + 10} y={scaleY(0) + 4} fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">x</text>
        <text x={scaleX(0) - 4} y={padding - 10} fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">y</text>
        
        {/* Origin label */}
        <text x={scaleX(0) - 12} y={scaleY(0) + 16} fontSize={10} fill="hsl(var(--muted-foreground))">O</text>
        
        {/* Lines */}
        {lineElements}
        
        {/* Points */}
        {pointElements}
        
        {/* Clicked points */}
        {clickedPointElements}
        
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
              fontSize={11}
              fill="hsl(var(--primary))"
            >
              ({hoveredPoint.x}, {hoveredPoint.y})
            </text>
          </g>
        )}
      </svg>
      
      {interactive && clickedPoints.length > 0 && (
        <button
          onClick={() => setClickedPoints([])}
          className="absolute top-2 right-2 text-xs px-2 py-1 bg-muted rounded hover:bg-muted/80"
        >
          Clear Points
        </button>
      )}
    </div>
  );
}
