import React from 'react';

interface CirclesInRectangleProps {
  rows?: number;
  cols?: number;
  radius?: number;
  showLabels?: boolean;
  showShading?: boolean;
}

export function CirclesInRectangle({
  rows = 2,
  cols = 3,
  radius = 8,
  showLabels = true,
  showShading = true
}: CirclesInRectangleProps) {
  const scale = 4; // pixels per cm
  const padding = 60;
  
  const rectWidth = cols * radius * 2 * scale;
  const rectHeight = rows * radius * 2 * scale;
  
  const svgWidth = rectWidth + padding * 2;
  const svgHeight = rectHeight + padding * 2 + 30;
  
  const circles = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = padding + radius * scale + col * radius * 2 * scale;
      const cy = padding + radius * scale + row * radius * 2 * scale;
      circles.push({ cx, cy, key: `${row}-${col}` });
    }
  }

  return (
    <div className="flex justify-center">
      <svg width={svgWidth} height={svgHeight} className="bg-card rounded-lg border">
        {/* Rectangle background (shaded area) */}
        <rect
          x={padding}
          y={padding}
          width={rectWidth}
          height={rectHeight}
          fill={showShading ? "hsl(var(--primary) / 0.15)" : "none"}
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Circles */}
        {circles.map(({ cx, cy, key }) => (
          <circle
            key={key}
            cx={cx}
            cy={cy}
            r={radius * scale}
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
        ))}
        
        {/* Center dots for circles */}
        {circles.map(({ cx, cy, key }) => (
          <circle
            key={`dot-${key}`}
            cx={cx}
            cy={cy}
            r={2}
            fill="hsl(var(--foreground))"
          />
        ))}
        
        {showLabels && (
          <>
            {/* Radius label on first circle */}
            <line
              x1={circles[0].cx}
              y1={circles[0].cy}
              x2={circles[0].cx + radius * scale}
              y2={circles[0].cy}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <text
              x={circles[0].cx + radius * scale / 2}
              y={circles[0].cy - 8}
              fontSize={12}
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
            >
              {radius} cm
            </text>
            
            {/* Width dimension */}
            <line
              x1={padding}
              y1={padding + rectHeight + 20}
              x2={padding + rectWidth}
              y2={padding + rectHeight + 20}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <line
              x1={padding}
              y1={padding + rectHeight + 15}
              x2={padding}
              y2={padding + rectHeight + 25}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <line
              x1={padding + rectWidth}
              y1={padding + rectHeight + 15}
              x2={padding + rectWidth}
              y2={padding + rectHeight + 25}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <text
              x={padding + rectWidth / 2}
              y={padding + rectHeight + 35}
              fontSize={11}
              fill="hsl(var(--muted-foreground))"
              textAnchor="middle"
            >
              Length = ?
            </text>
            
            {/* Height dimension */}
            <line
              x1={padding - 20}
              y1={padding}
              x2={padding - 20}
              y2={padding + rectHeight}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <line
              x1={padding - 25}
              y1={padding}
              x2={padding - 15}
              y2={padding}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <line
              x1={padding - 25}
              y1={padding + rectHeight}
              x2={padding - 15}
              y2={padding + rectHeight}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <text
              x={padding - 30}
              y={padding + rectHeight / 2}
              fontSize={11}
              fill="hsl(var(--muted-foreground))"
              textAnchor="middle"
              transform={`rotate(-90, ${padding - 30}, ${padding + rectHeight / 2})`}
            >
              Width = ?
            </text>
          </>
        )}
        
        {/* Shaded area indicator */}
        {showShading && (
          <text
            x={svgWidth / 2}
            y={svgHeight - 5}
            fontSize={10}
            fill="hsl(var(--muted-foreground))"
            textAnchor="middle"
            fontStyle="italic"
          >
            Shaded region = Rectangle area − Circles area
          </text>
        )}
      </svg>
    </div>
  );
}
