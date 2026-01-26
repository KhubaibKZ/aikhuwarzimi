import React, { useState, useRef } from 'react';

interface DigitalProtractorProps {
  onAngleMeasured?: (angle: number) => void;
}

export function DigitalProtractor({ onAngleMeasured }: DigitalProtractorProps) {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 300, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<SVGSVGElement>(null);

  const protractorRadius = 70;

  // Triangle vertices for isosceles with angle CAB = 125°
  const A = { x: 240, y: 70 };
  const sideLength = 180;
  const halfApexAngle = (125 / 2) * (Math.PI / 180); // 62.5° in radians
  
  const B = { 
    x: A.x - Math.sin(halfApexAngle) * sideLength, 
    y: A.y + Math.cos(halfApexAngle) * sideLength 
  };
  const C = { 
    x: A.x + Math.sin(halfApexAngle) * sideLength, 
    y: A.y + Math.cos(halfApexAngle) * sideLength 
  };

  // Calculate angle based on protractor position and rotation relative to triangle
  const calculateMeasuredAngle = () => {
    // Direction vectors from A to B and A to C
    const angleToB = Math.atan2(B.y - A.y, B.x - A.x) * (180 / Math.PI);
    const angleToC = Math.atan2(C.y - A.y, C.x - A.x) * (180 / Math.PI);
    
    // Protractor baseline angle (0° line direction)
    const baselineAngle = rotation;
    
    // Check if protractor is near vertex A
    const distToA = Math.sqrt((position.x - A.x) ** 2 + (position.y - A.y) ** 2);
    
    if (distToA < 25) {
      // When at vertex A, calculate the angle between protractor baseline and the triangle sides
      // Normalize angles
      const normalizedBaseline = ((baselineAngle % 360) + 360) % 360;
      const normalizedAngleToB = ((angleToB % 360) + 360) % 360;
      const normalizedAngleToC = ((angleToC % 360) + 360) % 360;
      
      // Find angle from baseline to each side
      let angleFromBaselineToB = normalizedAngleToB - normalizedBaseline;
      let angleFromBaselineToC = normalizedAngleToC - normalizedBaseline;
      
      // Normalize to 0-180 range for protractor reading
      angleFromBaselineToB = ((angleFromBaselineToB % 360) + 360) % 360;
      angleFromBaselineToC = ((angleFromBaselineToC % 360) + 360) % 360;
      
      if (angleFromBaselineToB > 180) angleFromBaselineToB = 360 - angleFromBaselineToB;
      if (angleFromBaselineToC > 180) angleFromBaselineToC = 360 - angleFromBaselineToC;
      
      // If baseline is aligned with AB (within 15°), show angle to AC
      if (angleFromBaselineToB < 15) {
        return Math.round(angleFromBaselineToC);
      }
      // If baseline is aligned with AC (within 15°), show angle to AB
      if (angleFromBaselineToC < 15) {
        return Math.round(angleFromBaselineToB);
      }
      
      // Show the smaller of the two angles being measured
      return Math.round(Math.min(angleFromBaselineToB, angleFromBaselineToC));
    }
    
    // When not at vertex, show rotation-based reading
    const displayAngle = Math.abs(Math.round(rotation % 180));
    return displayAngle > 90 ? 180 - displayAngle : displayAngle;
  };

  const displayAngle = calculateMeasuredAngle();

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
      const clampedX = Math.max(protractorRadius, Math.min(480 - protractorRadius, newX));
      const clampedY = Math.max(20, Math.min(320 - 20, newY));
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
      const innerR = protractorRadius - (isLarge ? 10 : isMedium ? 6 : 3);
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
          strokeWidth={isLarge ? 1.2 : isMedium ? 0.8 : 0.4}
        />
      );
      
      if (isLarge && angle > 0 && angle < 180) {
        const textR = protractorRadius - 16;
        const textX = Math.cos(Math.PI - radians) * textR;
        const textY = -Math.sin(Math.PI - radians) * textR;
        
        markings.push(
          <text
            key={`text-outer-${angle}`}
            x={textX}
            y={textY + 2}
            fontSize={6}
            fill="#1a1a2e"
            textAnchor="middle"
            fontWeight="500"
          >
            {angle}
          </text>
        );
        
        const innerTextR = protractorRadius - 24;
        const innerTextX = Math.cos(Math.PI - radians) * innerTextR;
        const innerTextY = -Math.sin(Math.PI - radians) * innerTextR;
        markings.push(
          <text
            key={`text-inner-${angle}`}
            x={innerTextX}
            y={innerTextY + 2}
            fontSize={5}
            fill="#888"
            textAnchor="middle"
          >
            {180 - angle}
          </text>
        );
      }
    }
    
    markings.push(
      <text key="text-0" x={protractorRadius - 12} y={2} fontSize={6} fill="#1a1a2e" textAnchor="middle" fontWeight="500">0</text>,
      <text key="text-180" x={-protractorRadius + 12} y={2} fontSize={6} fill="#1a1a2e" textAnchor="middle" fontWeight="500">180</text>,
      <text key="text-0-inner" x={protractorRadius - 20} y={2} fontSize={5} fill="#888" textAnchor="middle">180</text>,
      <text key="text-180-inner" x={-protractorRadius + 20} y={2} fontSize={5} fill="#888" textAnchor="middle">0</text>
    );
    
    return markings;
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
        width={480}
        height={320}
        className="bg-white dark:bg-slate-900 rounded-lg border-2 border-border shadow-inner"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="480" height="320" fill="url(#grid)" />

        {/* Triangle - larger */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2.5}
        />
        
        {/* Equal side marks */}
        <g transform={`translate(${(A.x + B.x) / 2}, ${(A.y + B.y) / 2}) rotate(${-62.5})`}>
          <line x1={-7} y1={0} x2={7} y2={0} stroke="hsl(var(--foreground))" strokeWidth={2} />
        </g>
        <g transform={`translate(${(A.x + C.x) / 2}, ${(A.y + C.y) / 2}) rotate(${62.5})`}>
          <line x1={-7} y1={0} x2={7} y2={0} stroke="hsl(var(--foreground))" strokeWidth={2} />
        </g>
        
        {/* Vertex labels - larger */}
        <text x={A.x} y={A.y - 15} fontSize={18} fontWeight="600" fontStyle="italic" fill="hsl(var(--foreground))" textAnchor="middle">A</text>
        <text x={B.x - 18} y={B.y + 8} fontSize={18} fontWeight="600" fontStyle="italic" fill="hsl(var(--foreground))">B</text>
        <text x={C.x + 18} y={C.y + 8} fontSize={18} fontWeight="600" fontStyle="italic" fill="hsl(var(--foreground))">C</text>
        
        {/* Small arc at A to indicate the angle */}
        <path
          d={`M ${A.x + 25 * Math.sin(halfApexAngle)} ${A.y + 25 * Math.cos(halfApexAngle)} 
              A 25 25 0 0 0 ${A.x - 25 * Math.sin(halfApexAngle)} ${A.y + 25 * Math.cos(halfApexAngle)}`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          strokeDasharray="4 2"
        />

        {/* Protractor - smaller */}
        <g transform={`translate(${position.x}, ${position.y}) rotate(${rotation})`}>
          <defs>
            <linearGradient id="protractorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#ffe082" stopOpacity="0.88" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.25" />
            </filter>
          </defs>
          
          <path
            d={`M ${-protractorRadius} 0 A ${protractorRadius} ${protractorRadius} 0 0 1 ${protractorRadius} 0 L 0 0 Z`}
            fill="url(#protractorGradient)"
            stroke="#d4a000"
            strokeWidth={1.5}
            filter="url(#shadow)"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
          />
          
          <circle cx={0} cy={0} r={28} fill="white" fillOpacity="0.4" stroke="#d4a000" strokeWidth={0.8} />
          
          {/* Center crosshair */}
          <line x1={-6} y1={0} x2={6} y2={0} stroke="#c62828" strokeWidth={1.5} />
          <line x1={0} y1={-6} x2={0} y2={6} stroke="#c62828" strokeWidth={1.5} />
          <circle cx={0} cy={0} r={2.5} fill="#c62828" />
          
          {/* Baseline */}
          <line x1={-protractorRadius + 3} y1={0} x2={protractorRadius - 3} y2={0} stroke="#c62828" strokeWidth={1} />
          
          {generateMarkings()}
          
          {/* Rotation handle */}
          <g 
            transform={`translate(${protractorRadius - 12}, -20)`}
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => handleMouseDown(e, 'rotate')}
          >
            <circle r={10} fill="#2196f3" stroke="#1565c0" strokeWidth={1.5} />
            <text y={1} fontSize={12} fill="white" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">↻</text>
          </g>
        </g>

        {/* NOT TO SCALE */}
        <text x={240} y={310} fontSize={11} fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
          NOT TO SCALE
        </text>
      </svg>
    </div>
  );
}
