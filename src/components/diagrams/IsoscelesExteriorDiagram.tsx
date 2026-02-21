import React from 'react';

interface IsoscelesExteriorDiagramProps {
  angleBAC?: number;
}

export function IsoscelesExteriorDiagram({ angleBAC = 38 }: IsoscelesExteriorDiagramProps) {
  const width = 320;
  const height = 220;
  
  // Triangle vertices
  const A = { x: 160, y: 40 };   // Top (apex)
  const B = { x: 60, y: 160 };   // Bottom left
  const C = { x: 220, y: 160 };  // Bottom right (on line BCD)
  const D = { x: 300, y: 160 };  // Extension point

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
        
        {/* Extended line BCD */}
        <line
          x1={C.x}
          y1={C.y}
          x2={D.x}
          y2={D.y}
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Equal side marks on AB */}
        <line
          x1={(A.x + B.x) / 2 - 5}
          y1={(A.y + B.y) / 2 - 6}
          x2={(A.x + B.x) / 2 + 5}
          y2={(A.y + B.y) / 2 + 4}
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Equal side marks on AC */}
        <line
          x1={(A.x + C.x) / 2 - 5}
          y1={(A.y + C.y) / 2 + 4}
          x2={(A.x + C.x) / 2 + 5}
          y2={(A.y + C.y) / 2 - 6}
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Angle arc at A (BAC) */}
        <path
          d={`M ${A.x - 20} ${A.y + 25} A 25 25 0 0 1 ${A.x + 20} ${A.y + 25}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.5}
        />
        <text
          x={A.x}
          y={A.y + 45}
          fontSize={12}
          fill="hsl(var(--primary))"
          textAnchor="middle"
          fontWeight="bold"
        >
          {angleBAC}°
        </text>
        
        {/* Angle arc at C (ACD) - the one to find */}
        <path
          d={`M ${C.x - 15} ${C.y - 20} A 22 22 0 0 1 ${C.x + 25} ${C.y}`}
          fill="none"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <text
          x={C.x + 10}
          y={C.y - 25}
          fontSize={11}
          fill="hsl(var(--accent-foreground))"
          textAnchor="middle"
        >
          ?
        </text>
        
        {/* Vertex labels */}
        <text x={A.x} y={A.y - 10} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))" textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y + 5} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">B</text>
        <text x={C.x} y={C.y + 18} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))" textAnchor="middle">C</text>
        <text x={D.x + 5} y={D.y + 18} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">D</text>
        
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
