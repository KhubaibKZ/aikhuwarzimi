import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DigitalProtractorProps {
  onAngleMeasured?: (angle: number) => void;
}

export function DigitalProtractor({ onAngleMeasured }: DigitalProtractorProps) {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 220, y: 180 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<SVGSVGElement>(null);

  const protractorRadius = 90;

  // Calculate the angle the protractor is measuring
  // The protractor measures the angle at its center point
  const measuredAngle = Math.round(((360 - rotation) % 360));
  const displayAngle = measuredAngle > 180 ? 360 - measuredAngle : measuredAngle;

  const handleMouseDown = (e: React.MouseEvent, type: 'drag' | 'rotate') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'drag') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    } else {
      setIsRotating(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      // Clamp to container bounds
      const clampedX = Math.max(protractorRadius, Math.min(400 - protractorRadius, newX));
      const clampedY = Math.max(20, Math.min(300 - 20, newY));
      setPosition({ x: clampedX, y: clampedY });
    } else if (isRotating) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - position.x;
      const y = e.clientY - rect.top - position.y;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setRotation(angle);
    }
  };

  const handleMouseUp = () => {
    if (isDragging || isRotating) {
      onAngleMeasured?.(displayAngle);
    }
    setIsDragging(false);
    setIsRotating(false);
  };

  // Generate protractor markings
  const generateMarkings = () => {
    const markings = [];
    
    for (let angle = 0; angle <= 180; angle += 1) {
      const radians = (angle * Math.PI) / 180;
      const isLarge = angle % 10 === 0;
      const isMedium = angle % 5 === 0;
      const innerR = protractorRadius - (isLarge ? 12 : isMedium ? 8 : 4);
      const outerR = protractorRadius - 2;
      
      const x1 = Math.cos(Math.PI - radians) * innerR;
      const y1 = -Math.sin(Math.PI - radians) * innerR;
      const x2 = Math.cos(Math.PI - radians) * outerR;
      const y2 = -Math.sin(Math.PI - radians) * outerR;
      
      markings.push(
        <line
          key={`mark-${angle}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#1a1a2e"
          strokeWidth={isLarge ? 1.5 : isMedium ? 1 : 0.5}
        />
      );
      
      // Add numbers at major marks (every 10°)
      if (isLarge && angle > 0 && angle < 180) {
        const textR = protractorRadius - 20;
        const textX = Math.cos(Math.PI - radians) * textR;
        const textY = -Math.sin(Math.PI - radians) * textR;
        
        // Outer numbers (0-180)
        markings.push(
          <text
            key={`text-outer-${angle}`}
            x={textX}
            y={textY + 3}
            fontSize={7}
            fill="#1a1a2e"
            textAnchor="middle"
            fontWeight="500"
          >
            {angle}
          </text>
        );
        
        // Inner numbers (180-0) for reading from other direction
        const innerTextR = protractorRadius - 30;
        const innerTextX = Math.cos(Math.PI - radians) * innerTextR;
        const innerTextY = -Math.sin(Math.PI - radians) * innerTextR;
        markings.push(
          <text
            key={`text-inner-${angle}`}
            x={innerTextX}
            y={innerTextY + 3}
            fontSize={6}
            fill="#666"
            textAnchor="middle"
          >
            {180 - angle}
          </text>
        );
      }
    }
    
    // Add 0 and 180 labels
    markings.push(
      <text key="text-0" x={protractorRadius - 15} y={3} fontSize={7} fill="#1a1a2e" textAnchor="middle" fontWeight="500">0</text>,
      <text key="text-180" x={-protractorRadius + 15} y={3} fontSize={7} fill="#1a1a2e" textAnchor="middle" fontWeight="500">180</text>,
      <text key="text-0-inner" x={protractorRadius - 25} y={3} fontSize={6} fill="#666" textAnchor="middle">180</text>,
      <text key="text-180-inner" x={-protractorRadius + 25} y={3} fontSize={6} fill="#666" textAnchor="middle">0</text>
    );
    
    return markings;
  };

  // Triangle vertices for isosceles with angle CAB = 125°
  // A is at top, angle at A is 125° (obtuse)
  // Base angles B and C = (180 - 125) / 2 = 27.5° each
  const A = { x: 200, y: 60 };
  const sideLength = 140;
  const halfApexAngle = (125 / 2) * (Math.PI / 180); // 62.5° in radians
  
  const B = { 
    x: A.x - Math.sin(halfApexAngle) * sideLength, 
    y: A.y + Math.cos(halfApexAngle) * sideLength 
  };
  const C = { 
    x: A.x + Math.sin(halfApexAngle) * sideLength, 
    y: A.y + Math.cos(halfApexAngle) * sideLength 
  };

  return (
    <div className="space-y-3">
      {/* Instructions */}
      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
          📐 Measure Angle CAB
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
          Drag the protractor to vertex A. Align the baseline with one side and read where the other side crosses.
        </p>
      </div>

      {/* Measured angle display */}
      <div className="p-3 rounded-lg bg-muted/50 border border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Reading:</span>
          <span className="text-xl font-bold text-foreground tabular-nums">
            {displayAngle}°
          </span>
        </div>
      </div>

      {/* Interactive diagram */}
      <svg
        ref={containerRef}
        width={400}
        height={300}
        className="bg-white dark:bg-slate-900 rounded-lg border-2 border-border shadow-inner"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid pattern for better positioning */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#grid)" />

        {/* Triangle */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2.5}
        />
        
        {/* Equal side marks (tick marks on AB and AC) */}
        {/* Mark on AB - perpendicular to the line */}
        <g transform={`translate(${(A.x + B.x) / 2}, ${(A.y + B.y) / 2}) rotate(${-62.5})`}>
          <line x1={-6} y1={0} x2={6} y2={0} stroke="hsl(var(--foreground))" strokeWidth={2} />
        </g>
        
        {/* Mark on AC - perpendicular to the line */}
        <g transform={`translate(${(A.x + C.x) / 2}, ${(A.y + C.y) / 2}) rotate(${62.5})`}>
          <line x1={-6} y1={0} x2={6} y2={0} stroke="hsl(var(--foreground))" strokeWidth={2} />
        </g>
        
        {/* Vertex labels */}
        <text x={A.x} y={A.y - 12} fontSize={16} fontWeight="600" fontStyle="italic" fill="hsl(var(--foreground))" textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y + 5} fontSize={16} fontWeight="600" fontStyle="italic" fill="hsl(var(--foreground))">B</text>
        <text x={C.x + 15} y={C.y + 5} fontSize={16} fontWeight="600" fontStyle="italic" fill="hsl(var(--foreground))">C</text>
        
        {/* Small arc at A to indicate the angle to measure */}
        <path
          d={`M ${A.x + 20 * Math.sin(halfApexAngle)} ${A.y + 20 * Math.cos(halfApexAngle)} 
              A 20 20 0 0 0 ${A.x - 20 * Math.sin(halfApexAngle)} ${A.y + 20 * Math.cos(halfApexAngle)}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          strokeDasharray="3 2"
        />

        {/* Protractor */}
        <g
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation})`}
        >
          {/* Protractor body - semi-transparent with gradient */}
          <defs>
            <linearGradient id="protractorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffe082" stopOpacity="0.9" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>
          
          {/* Main protractor shape */}
          <path
            d={`M ${-protractorRadius} 0 A ${protractorRadius} ${protractorRadius} 0 0 1 ${protractorRadius} 0 L 0 0 Z`}
            fill="url(#protractorGradient)"
            stroke="#d4a000"
            strokeWidth={2}
            filter="url(#shadow)"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
          />
          
          {/* Inner cutout circle */}
          <circle cx={0} cy={0} r={35} fill="white" fillOpacity="0.5" stroke="#d4a000" strokeWidth={1} />
          
          {/* Center crosshair */}
          <line x1={-8} y1={0} x2={8} y2={0} stroke="#c62828" strokeWidth={1.5} />
          <line x1={0} y1={-8} x2={0} y2={8} stroke="#c62828" strokeWidth={1.5} />
          <circle cx={0} cy={0} r={3} fill="#c62828" />
          
          {/* Baseline */}
          <line
            x1={-protractorRadius + 5}
            y1={0}
            x2={protractorRadius - 5}
            y2={0}
            stroke="#c62828"
            strokeWidth={1.5}
          />
          
          {/* Degree markings */}
          {generateMarkings()}
          
          {/* Rotation handle */}
          <g 
            transform={`translate(${protractorRadius - 15}, -25)`}
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => handleMouseDown(e, 'rotate')}
          >
            <circle
              r={12}
              fill="#2196f3"
              stroke="#1565c0"
              strokeWidth={2}
            />
            <text
              y={1}
              fontSize={14}
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
            >
              ↻
            </text>
          </g>
          
          {/* Drag indicator text */}
          <text
            x={0}
            y={-protractorRadius + 15}
            fontSize={8}
            fill="#666"
            textAnchor="middle"
            fontWeight="500"
          >
            DRAG TO MOVE
          </text>
        </g>

        {/* NOT TO SCALE label */}
        <text
          x={200}
          y={290}
          fontSize={11}
          fill="hsl(var(--muted-foreground))"
          textAnchor="middle"
          fontStyle="italic"
        >
          NOT TO SCALE
        </text>
      </svg>

      {/* Helper tip */}
      <p className="text-xs text-muted-foreground text-center">
        💡 Tip: Place the red center point exactly on vertex A, align the baseline with side AB or AC
      </p>
    </div>
  );
}
