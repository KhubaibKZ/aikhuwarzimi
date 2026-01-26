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
  const width = 400;
  const height = 200;
  
  // Parallelogram vertices - matching the reference image layout
  // A is bottom left, B is top left, C is top right, D is bottom right
  const A = { x: 50, y: 150 };   // Bottom left
  const B = { x: 100, y: 50 };   // Top left
  const C = { x: 340, y: 50 };   // Top right
  const D = { x: 290, y: 150 };  // Bottom right

  // Extended line from A through D and beyond (for exterior angle)
  const vecAD = { x: D.x - A.x, y: D.y - A.y };
  const vecADLen = Math.sqrt(vecAD.x ** 2 + vecAD.y ** 2);
  const extendLength = 50;
  const extendedDX = D.x + (vecAD.x / vecADLen) * extendLength;
  const extendedDY = D.y + (vecAD.y / vecADLen) * extendLength;

  // Arc for the exterior reflex angle at D (248°)
  // The arc should be drawn outside the parallelogram
  const arcRadius = 30;
  
  // Calculate angles for the arc
  // Direction from D to C
  const vecDC = { x: C.x - D.x, y: C.y - D.y };
  const angleDC = Math.atan2(vecDC.y, vecDC.x);
  
  // Direction from D along extended AD line (exterior)
  const angleExtended = Math.atan2(vecAD.y, vecAD.x);
  
  // Arc start and end points
  const arcStartX = D.x + arcRadius * Math.cos(angleDC);
  const arcStartY = D.y + arcRadius * Math.sin(angleDC);
  const arcEndX = D.x + arcRadius * Math.cos(angleExtended);
  const arcEndY = D.y + arcRadius * Math.sin(angleExtended);
  
  // Position for the angle label (below and to the right of D)
  const labelX = D.x + 15;
  const labelY = D.y + 50;

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Parallelogram shape */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Extended line from D beyond the parallelogram (to show exterior angle) */}
        {showReflex && (
          <line
            x1={D.x}
            y1={D.y}
            x2={extendedDX}
            y2={extendedDY}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
        )}
        
        {/* Vertex labels */}
        <text x={A.x - 15} y={A.y + 5} fontSize={16} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.A}</text>
        <text x={B.x - 5} y={B.y - 10} fontSize={16} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.B}</text>
        <text x={C.x + 8} y={C.y - 8} fontSize={16} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.C}</text>
        <text x={D.x + 10} y={D.y + 5} fontSize={16} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.D}</text>
        
        {/* Exterior angle arc at D */}
        {showReflex && (
          <>
            {/* Arc for the reflex angle - drawn below the parallelogram */}
            <path
              d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 1 1 ${arcEndX} ${arcEndY}`}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={1.5}
            />
            
            {/* Angle label positioned below D */}
            <text
              x={labelX}
              y={labelY}
              fontSize={16}
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
          y={height - 5}
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