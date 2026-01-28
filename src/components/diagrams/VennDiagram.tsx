import React from 'react';

interface VennDiagramProps {
  leftLabel?: string;
  rightLabel?: string;
  leftOnly?: number | string;
  rightOnly?: number | string;
  intersection?: number | string;
  outside?: number | string;
  interactive?: boolean;
  onValueChange?: (region: 'leftOnly' | 'rightOnly' | 'intersection' | 'outside', value: string) => void;
}

export function VennDiagram({
  leftLabel = 'H',
  rightLabel = 'T',
  leftOnly = '',
  rightOnly = '',
  intersection = '',
  outside = '',
  interactive = false,
  onValueChange
}: VennDiagramProps) {
  const width = 320;
  const height = 220;
  const radius = 70;
  const leftCenterX = 110;
  const rightCenterX = 190;
  const centerY = 120;

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="bg-card rounded-lg border">
        {/* Universal set rectangle */}
        <rect
          x={10}
          y={10}
          width={width - 20}
          height={height - 20}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={2}
          rx={4}
        />
        
        {/* Universal set label */}
        <text x={20} y={30} fontSize={14} fontWeight="bold" fill="hsl(var(--foreground))">
          ξ
        </text>

        {/* Left circle (H) */}
        <circle
          cx={leftCenterX}
          cy={centerY}
          r={radius}
          fill="hsl(var(--primary) / 0.1)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
        
        {/* Right circle (T) */}
        <circle
          cx={rightCenterX}
          cy={centerY}
          r={radius}
          fill="hsl(var(--accent) / 0.1)"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth={2}
        />

        {/* Circle labels */}
        <text
          x={leftCenterX - radius - 15}
          y={centerY - radius + 10}
          fontSize={16}
          fontWeight="bold"
          fill="hsl(var(--primary))"
        >
          {leftLabel}
        </text>
        <text
          x={rightCenterX + radius + 5}
          y={centerY - radius + 10}
          fontSize={16}
          fontWeight="bold"
          fill="hsl(var(--accent-foreground))"
        >
          {rightLabel}
        </text>

        {/* Values in regions */}
        {/* Left only */}
        <text
          x={leftCenterX - 35}
          y={centerY + 5}
          fontSize={18}
          fontWeight="bold"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          {leftOnly}
        </text>

        {/* Right only */}
        <text
          x={rightCenterX + 35}
          y={centerY + 5}
          fontSize={18}
          fontWeight="bold"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          {rightOnly}
        </text>

        {/* Intersection */}
        <text
          x={(leftCenterX + rightCenterX) / 2}
          y={centerY + 5}
          fontSize={18}
          fontWeight="bold"
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          {intersection}
        </text>

        {/* Outside */}
        <text
          x={width - 35}
          y={height - 25}
          fontSize={16}
          fontWeight="bold"
          fill="hsl(var(--muted-foreground))"
          textAnchor="middle"
        >
          {outside}
        </text>
      </svg>
    </div>
  );
}
