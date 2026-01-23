import React from 'react';

interface PrismDiagramProps {
  baseWidth?: number;
  baseHeight?: number;
  length?: number;
  showLabels?: boolean;
  labels?: {
    base?: string;
    height?: string;
    length?: string;
  };
}

export function PrismDiagram({
  baseWidth = 4,
  baseHeight = 3,
  length = 7,
  showLabels = true,
  labels = { base: '4 cm', height: '3 cm', length: '7 cm' }
}: PrismDiagramProps) {
  const width = 350;
  const height = 250;
  
  // 3D perspective points for triangular prism
  const offsetX = 80;
  const offsetY = 40;
  
  // Front triangle vertices
  const frontA = { x: 80, y: 180 };  // Bottom left
  const frontB = { x: 200, y: 180 }; // Bottom right
  const frontC = { x: 80, y: 80 };   // Top (right angle corner)
  
  // Back triangle vertices (offset for 3D effect)
  const backA = { x: frontA.x + offsetX, y: frontA.y - offsetY };
  const backB = { x: frontB.x + offsetX, y: frontB.y - offsetY };
  const backC = { x: frontC.x + offsetX, y: frontC.y - offsetY };

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Back face (triangle) - lighter */}
        <polygon
          points={`${backA.x},${backA.y} ${backB.x},${backB.y} ${backC.x},${backC.y}`}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth={1}
          strokeDasharray="4,4"
        />
        
        {/* Top face (parallelogram) */}
        <polygon
          points={`${frontC.x},${frontC.y} ${backC.x},${backC.y} ${backB.x},${backB.y} ${frontB.x},${frontB.y}`}
          fill="hsl(var(--accent) / 0.3)"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Bottom face (parallelogram) */}
        <polygon
          points={`${frontA.x},${frontA.y} ${backA.x},${backA.y} ${backB.x},${backB.y} ${frontB.x},${frontB.y}`}
          fill="hsl(var(--muted) / 0.5)"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Front face (triangle) */}
        <polygon
          points={`${frontA.x},${frontA.y} ${frontB.x},${frontB.y} ${frontC.x},${frontC.y}`}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Left edge */}
        <line
          x1={frontA.x}
          y1={frontA.y}
          x2={backA.x}
          y2={backA.y}
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Right angle marker */}
        <path
          d={`M ${frontC.x + 12} ${frontC.y} L ${frontC.x + 12} ${frontC.y + 12} L ${frontC.x} ${frontC.y + 12}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={1.5}
        />
        
        {showLabels && (
          <>
            {/* Height label (vertical side) */}
            <text
              x={frontA.x - 20}
              y={(frontA.y + frontC.y) / 2}
              fontSize={14}
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
            >
              {labels.height}
            </text>
            
            {/* Base label (bottom side) */}
            <text
              x={(frontA.x + frontB.x) / 2}
              y={frontA.y + 25}
              fontSize={14}
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
            >
              {labels.base}
            </text>
            
            {/* Length label (depth) */}
            <text
              x={(frontB.x + backB.x) / 2 + 15}
              y={(frontB.y + backB.y) / 2}
              fontSize={14}
              fontWeight="bold"
              fill="hsl(var(--primary))"
              textAnchor="middle"
            >
              {labels.length}
            </text>
          </>
        )}
        
        {/* NOT TO SCALE label */}
        <text
          x={width / 2}
          y={height - 10}
          fontSize={10}
          fill="hsl(var(--muted-foreground))"
          textAnchor="middle"
          fontStyle="italic"
        >
          NOT TO SCALE
        </text>
      </svg>
    </div>
  );
}
