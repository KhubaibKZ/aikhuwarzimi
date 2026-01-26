import React from 'react';

interface ParallelogramDiagramProps {
  reflexAngle?: number;
}

export function ParallelogramDiagram({ reflexAngle = 248 }: ParallelogramDiagramProps) {
  const width = 340;
  const height = 180;
  
  // Parallelogram vertices - matching exam paper layout
  // A bottom-left, B top-left, C top-right, D bottom-right
  const A = { x: 30, y: 140 };
  const B = { x: 80, y: 45 };
  const C = { x: 290, y: 45 };
  const D = { x: 240, y: 140 };

  // Extended line from A through D (for exterior angle)
  const vecAD = { x: D.x - A.x, y: D.y - A.y };
  const vecADLen = Math.sqrt(vecAD.x ** 2 + vecAD.y ** 2);
  const extendLength = 50;
  const extendedX = D.x + (vecAD.x / vecADLen) * extendLength;
  const extendedY = D.y + (vecAD.y / vecADLen) * extendLength;

  // Arc for the 248° exterior/reflex angle at D
  const arcRadius = 28;
  
  // Calculate angles for the arc
  // Start: from D toward C (going up-right)
  const angleDC = Math.atan2(C.y - D.y, C.x - D.x);
  // End: along the extended line from A through D
  const angleExtended = Math.atan2(vecAD.y, vecAD.x);
  
  // Arc sweeps clockwise from DC direction around (exterior) to extended line
  // For a reflex angle, we use large-arc-flag = 1
  const arcStartX = D.x + arcRadius * Math.cos(angleDC);
  const arcStartY = D.y + arcRadius * Math.sin(angleDC);
  const arcEndX = D.x + arcRadius * Math.cos(angleExtended);
  const arcEndY = D.y + arcRadius * Math.sin(angleExtended);

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-white rounded-lg border">
        {/* Parallelogram shape */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="none"
          stroke="black"
          strokeWidth={1.5}
        />
        
        {/* Extended line from D continuing past the parallelogram */}
        <line
          x1={D.x}
          y1={D.y}
          x2={extendedX}
          y2={extendedY}
          stroke="black"
          strokeWidth={1.5}
        />
        
        {/* Exterior angle arc at D */}
        <path
          d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 1 1 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="black"
          strokeWidth={1}
        />
        
        {/* Vertex labels - italic like exam paper */}
        <text x={A.x - 12} y={A.y + 4} fontSize={14} fontStyle="italic" fill="black">A</text>
        <text x={B.x - 4} y={B.y - 8} fontSize={14} fontStyle="italic" fill="black">B</text>
        <text x={C.x + 6} y={C.y - 8} fontSize={14} fontStyle="italic" fill="black">C</text>
        <text x={D.x + 2} y={D.y + 16} fontSize={14} fontStyle="italic" fill="black">D</text>
        
        {/* 248° label - positioned near the arc at D */}
        <text
          x={D.x + 45}
          y={D.y + 30}
          fontSize={13}
          fill="black"
        >
          {reflexAngle}°
        </text>
        
        {/* NOT TO SCALE - small text at bottom */}
        <text
          x={width / 2}
          y={height - 5}
          fontSize={9}
          fill="#666"
          textAnchor="middle"
          fontStyle="italic"
        >
          NOT TO SCALE
        </text>
      </svg>
    </div>
  );
}
