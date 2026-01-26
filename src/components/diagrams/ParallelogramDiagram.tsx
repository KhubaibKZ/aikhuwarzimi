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
  const height = 260;
  
  // Parallelogram vertices - positioned to leave room for exterior angle arc
  const A = { x: 70, y: 170 };   // Bottom left
  const B = { x: 130, y: 70 };   // Top left
  const C = { x: 310, y: 70 };   // Top right
  const D = { x: 250, y: 170 };  // Bottom right

  // Calculate vectors for the exterior angle arc at D
  // Vector DC (from D to C) and extended DA (from D beyond A)
  const vecDC = { x: C.x - D.x, y: C.y - D.y };
  const vecDA = { x: A.x - D.x, y: A.y - D.y };
  
  // Angle of DC from positive x-axis
  const angleDC = Math.atan2(vecDC.y, vecDC.x);
  // Angle of extended line beyond A (opposite direction of DA)
  const vecDAExtended = { x: -(A.x - D.x), y: -(A.y - D.y) };
  const angleDAExtended = Math.atan2(vecDAExtended.y, vecDAExtended.x);
  
  // Arc radius for the reflex angle indicator
  const arcRadius = 40;
  
  // For a reflex angle of 248°, we draw an arc going the "long way" around
  // Starting from the DC direction and sweeping counterclockwise (exterior)
  const startAngle = angleDC;
  // The reflex angle is 248°, so the arc goes 248° counterclockwise from DC
  const sweepAngleDeg = reflexAngle;
  const sweepAngle = (sweepAngleDeg * Math.PI) / 180;
  
  // Calculate arc endpoints
  const arcStartX = D.x + arcRadius * Math.cos(startAngle);
  const arcStartY = D.y + arcRadius * Math.sin(startAngle);
  const arcEndX = D.x + arcRadius * Math.cos(startAngle - sweepAngle);
  const arcEndY = D.y + arcRadius * Math.sin(startAngle - sweepAngle);
  
  // Large arc flag for >180° arcs
  const largeArcFlag = sweepAngleDeg > 180 ? 1 : 0;
  
  // Position for the angle label (outside, roughly at the midpoint of the arc)
  const labelAngle = startAngle - sweepAngle / 2;
  const labelRadius = arcRadius + 25;
  const labelX = D.x + labelRadius * Math.cos(labelAngle);
  const labelY = D.y + labelRadius * Math.sin(labelAngle);

  // Extended line from D beyond A (to show exterior angle context)
  const extendLength = 35;
  const extendedAX = D.x + (vecDAExtended.x / Math.sqrt(vecDAExtended.x ** 2 + vecDAExtended.y ** 2)) * extendLength;
  const extendedAY = D.y + (vecDAExtended.y / Math.sqrt(vecDAExtended.x ** 2 + vecDAExtended.y ** 2)) * extendLength;

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
        
        {/* Extended line from D beyond A (dashed) to show exterior angle */}
        {showReflex && (
          <line
            x1={D.x}
            y1={D.y}
            x2={extendedAX}
            y2={extendedAY}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
            strokeDasharray="4,3"
          />
        )}
        
        {/* Vertex labels */}
        <text x={A.x - 18} y={A.y + 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.A}</text>
        <text x={B.x - 5} y={B.y - 12} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.B}</text>
        <text x={C.x + 8} y={C.y - 8} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.C}</text>
        <text x={D.x + 10} y={D.y - 8} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">{vertexLabels.D}</text>
        
        {/* Reflex angle arc at D - sweeping outside the parallelogram */}
        {showReflex && (
          <>
            {/* Arc path for the reflex (exterior) angle */}
            <path
              d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={1.5}
            />
            
            {/* Small tick marks at arc ends to indicate the angle being measured */}
            <circle cx={arcStartX} cy={arcStartY} r={2} fill="hsl(var(--foreground))" />
            <circle cx={arcEndX} cy={arcEndY} r={2} fill="hsl(var(--foreground))" />
            
            {/* Angle label positioned outside */}
            <text
              x={labelX}
              y={labelY}
              fontSize={14}
              fill="hsl(var(--foreground))"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {reflexAngle}°
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
