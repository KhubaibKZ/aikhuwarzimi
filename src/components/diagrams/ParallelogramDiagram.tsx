import React from 'react';

interface ParallelogramDiagramProps {
  reflexAngle?: number;
}

export function ParallelogramDiagram({ reflexAngle = 248 }: ParallelogramDiagramProps) {
  const width = 300;
  const height = 200;
  
  // Parallelogram vertices - matching exam paper layout exactly
  // A bottom-left, B top-left, C top-right, D bottom-right
  const A = { x: 50, y: 150 };
  const B = { x: 100, y: 55 };
  const C = { x: 250, y: 55 };
  const D = { x: 200, y: 150 };

  // Arc for the 248° reflex angle at D
  // The arc should wrap around the exterior (below and around D)
  const arcRadius = 30;
  
  // Angle calculations for the arc
  // From D going toward C (up-left)
  const angleDC = Math.atan2(C.y - D.y, C.x - D.x);
  // From D going toward A (down-left)  
  const angleDA = Math.atan2(A.y - D.y, A.x - D.x);
  
  // Arc start (from DC direction) and end (toward DA direction going the long way around - reflex)
  const arcStartX = D.x + arcRadius * Math.cos(angleDC);
  const arcStartY = D.y + arcRadius * Math.sin(angleDC);
  const arcEndX = D.x + arcRadius * Math.cos(angleDA);
  const arcEndY = D.y + arcRadius * Math.sin(angleDA);

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
        
        {/* Reflex angle arc at D - sweeps the exterior (large arc) */}
        <path
          d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 1 1 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="black"
          strokeWidth={1}
        />
        
        {/* Vertex labels - italic like exam paper */}
        <text x={A.x - 10} y={A.y + 15} fontSize={14} fontStyle="italic" fill="black">A</text>
        <text x={B.x - 5} y={B.y - 8} fontSize={14} fontStyle="italic" fill="black">B</text>
        <text x={C.x + 5} y={C.y - 8} fontSize={14} fontStyle="italic" fill="black">C</text>
        <text x={D.x + 5} y={D.y + 5} fontSize={14} fontStyle="italic" fill="black">D</text>
        
        {/* 248° label - positioned below the arc */}
        <text
          x={D.x + 20}
          y={D.y + 40}
          fontSize={13}
          fill="black"
        >
          {reflexAngle}°
        </text>
        
        {/* NOT TO SCALE */}
        <text
          x={width / 2}
          y={height - 5}
          fontSize={9}
          fill="#888"
          textAnchor="middle"
          fontStyle="italic"
        >
          NOT TO SCALE
        </text>
      </svg>
    </div>
  );
}
