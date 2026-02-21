import React from 'react';

interface TrapeziumDiagramProps {
  angleLeft?: string;
  angleRight?: string;
}

export function TrapeziumDiagram({ 
  angleLeft = '(97 − 3x)°', 
  angleRight = '(69 + 5x)°' 
}: TrapeziumDiagramProps) {
  const width = 300;
  const height = 180;
  
  // Trapezium vertices
  const A = { x: 40, y: 140 };   // Bottom left
  const B = { x: 260, y: 140 };  // Bottom right
  const C = { x: 220, y: 50 };   // Top right
  const D = { x: 80, y: 50 };    // Top left

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Trapezium shape */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Angle arc at bottom-left (A) */}
        <path
          d={`M ${A.x + 30} ${A.y} A 25 25 0 0 0 ${A.x + 18} ${A.y - 22}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.5}
        />
        
        {/* Angle arc at bottom-right (B) */}
        <path
          d={`M ${B.x - 30} ${B.y} A 25 25 0 0 1 ${B.x - 18} ${B.y - 22}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.5}
        />
        
        {/* Parallel marks on top */}
        <line x1={145} y1={47} x2={155} y2={47} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
        <line x1={145} y1={53} x2={155} y2={53} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
        
        {/* Parallel marks on bottom */}
        <line x1={145} y1={137} x2={155} y2={137} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
        <line x1={145} y1={143} x2={155} y2={143} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
        
        {/* Angle labels */}
        <text
          x={A.x + 40}
          y={A.y - 8}
          fontSize={12}
          fill="hsl(var(--foreground))"
        >
          {angleLeft}
        </text>
        <text
          x={B.x - 110}
          y={B.y - 8}
          fontSize={12}
          fill="hsl(var(--foreground))"
        >
          {angleRight}
        </text>
        
        {/* NOT TO SCALE */}
        <text
          x={width / 2}
          y={height - 5}
          fontSize={9}
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
