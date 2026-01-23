import React from 'react';

interface ParallelogramDiagramProps {
  reflexAngle?: number;
  showReflex?: boolean;
  vertexLabels?: { A: string; B: string; C: string; D: string };
}

export function ParallelogramDiagram({
  reflexAngle = 248,
  showReflex = true,
  vertexLabels = { A: 'A', B: 'B', C: 'C', D: 'D' }
}: ParallelogramDiagramProps) {
  const width = 350;
  const height = 220;
  
  // Parallelogram vertices
  const A = { x: 60, y: 160 };   // Bottom left
  const B = { x: 120, y: 60 };   // Top left
  const C = { x: 290, y: 60 };   // Top right
  const D = { x: 230, y: 160 };  // Bottom right

  // Calculate angle arc for reflex angle at D
  const arcRadius = 35;
  
  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Parallelogram */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Vertex labels */}
        <text x={A.x - 15} y={A.y + 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.A}</text>
        <text x={B.x - 5} y={B.y - 10} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.B}</text>
        <text x={C.x + 5} y={C.y - 10} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.C}</text>
        <text x={D.x + 5} y={D.y - 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.D}</text>
        
        {/* Reflex angle arc at D */}
        {showReflex && (
          <>
            {/* Arc for reflex angle - drawn outside the parallelogram */}
            <path
              d={`M ${D.x + arcRadius} ${D.y} A ${arcRadius} ${arcRadius} 0 1 0 ${D.x - 20} ${D.y - 30}`}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={1.5}
            />
            
            {/* Angle label */}
            <text
              x={D.x + 10}
              y={D.y + 40}
              fontSize={14}
              fill="hsl(var(--foreground))"
              textAnchor="middle"
            >
              {reflexAngle}°
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
