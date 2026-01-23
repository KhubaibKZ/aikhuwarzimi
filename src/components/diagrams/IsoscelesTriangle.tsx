import React from 'react';

interface IsoscelesTriangleDiagramProps {
  showEqualMarks?: boolean;
  showAngleToMeasure?: boolean;
  angleLabel?: string;
}

export function IsoscelesTriangleDiagram({
  showEqualMarks = true,
  showAngleToMeasure = true,
  angleLabel = 'Measure this angle'
}: IsoscelesTriangleDiagramProps) {
  const width = 300;
  const height = 220;
  
  // Triangle vertices for an isosceles triangle
  const A = { x: 150, y: 40 };   // Top vertex (apex)
  const B = { x: 60, y: 180 };   // Bottom left
  const C = { x: 240, y: 180 };  // Bottom right

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Triangle */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Vertex labels */}
        <text x={A.x} y={A.y - 10} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))" textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y + 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">B</text>
        <text x={C.x + 10} y={C.y + 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">C</text>
        
        {/* Equal side marks (tick marks on AB and AC) */}
        {showEqualMarks && (
          <>
            {/* Mark on AB */}
            <line
              x1={(A.x + B.x) / 2 - 5}
              y1={(A.y + B.y) / 2 - 8}
              x2={(A.x + B.x) / 2 + 5}
              y2={(A.y + B.y) / 2 + 2}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
            />
            
            {/* Mark on AC */}
            <line
              x1={(A.x + C.x) / 2 - 5}
              y1={(A.y + C.y) / 2 + 2}
              x2={(A.x + C.x) / 2 + 5}
              y2={(A.y + C.y) / 2 - 8}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
            />
          </>
        )}
        
        {/* Angle arc at A (CAB) */}
        {showAngleToMeasure && (
          <>
            <path
              d={`M ${A.x - 25} ${A.y + 30} A 30 30 0 0 1 ${A.x + 25} ${A.y + 30}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <text
              x={A.x}
              y={A.y + 55}
              fontSize={11}
              fill="hsl(var(--primary))"
              textAnchor="middle"
              fontWeight="bold"
            >
              {angleLabel}
            </text>
          </>
        )}
        
        {/* NOT TO SCALE label */}
        <text
          x={width / 2}
          y={height - 8}
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
