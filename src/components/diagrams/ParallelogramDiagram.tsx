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
  const width = 380;
  const height = 180;
  
  // Parallelogram vertices - matching the reference image layout
  const A = { x: 40, y: 130 };    // Bottom left
  const B = { x: 90, y: 40 };     // Top left
  const C = { x: 320, y: 40 };    // Top right
  const D = { x: 270, y: 130 };   // Bottom right

  // Extended line from D beyond the parallelogram (continuing from AD)
  const vecAD = { x: D.x - A.x, y: D.y - A.y };
  const vecADLen = Math.sqrt(vecAD.x ** 2 + vecAD.y ** 2);
  const extendLength = 40;
  const extendedX = D.x + (vecAD.x / vecADLen) * extendLength;
  const extendedY = D.y + (vecAD.y / vecADLen) * extendLength;

  // Small arc for the exterior angle at D
  // The arc should curve from the DC direction around to the extended AD direction (exterior)
  const arcRadius = 25;
  
  // Angle from D to C (upward-left direction)
  const angleDC = Math.atan2(C.y - D.y, C.x - D.x);
  // Angle along extended AD line (rightward direction)
  const angleExtended = Math.atan2(vecAD.y, vecAD.x);
  
  // Arc endpoints
  const arcStartX = D.x + arcRadius * Math.cos(angleDC);
  const arcStartY = D.y + arcRadius * Math.sin(angleDC);
  const arcEndX = D.x + arcRadius * Math.cos(angleExtended);
  const arcEndY = D.y + arcRadius * Math.sin(angleExtended);

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
        
        {/* Extended line from D (continuing the AD side) */}
        {showReflex && (
          <line
            x1={D.x}
            y1={D.y}
            x2={extendedX}
            y2={extendedY}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
        )}
        
        {/* Vertex labels */}
        <text x={A.x - 15} y={A.y + 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.A}</text>
        <text x={B.x - 5} y={B.y - 10} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.B}</text>
        <text x={C.x + 8} y={C.y - 8} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.C}</text>
        <text x={D.x + 5} y={D.y + 18} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.D}</text>
        
        {/* Exterior angle arc at D - small arc curving outside */}
        {showReflex && (
          <>
            {/* Arc sweeping the exterior/reflex angle */}
            <path
              d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 1 1 ${arcEndX} ${arcEndY}`}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={1.5}
            />
          </>
        )}
        
        {/* 248° label - positioned below and to the right of the diagram */}
        {showReflex && (
          <text
            x={width - 40}
            y={height - 8}
            fontSize={14}
            fill="hsl(var(--foreground))"
            textAnchor="middle"
          >
            {reflexAngle}°
          </text>
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