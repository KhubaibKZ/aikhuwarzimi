import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DigitalProtractorProps {
  size?: number;
  onAngleChange?: (angle: number) => void;
  targetAngle?: number;
  tolerance?: number;
}

export function DigitalProtractor({ 
  size = 200, 
  onAngleChange,
  targetAngle = 125,
  tolerance = 2
}: DigitalProtractorProps) {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 150, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);
  const protractorRef = useRef<SVGGElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  // Calculate measured angle based on rotation
  const measuredAngle = Math.round((180 - rotation + 360) % 360);
  const displayAngle = measuredAngle > 180 ? 360 - measuredAngle : measuredAngle;
  
  // Check if angle is correct (within tolerance)
  const isCorrect = Math.abs(displayAngle - targetAngle) <= tolerance;

  useEffect(() => {
    onAngleChange?.(displayAngle);
  }, [displayAngle, onAngleChange]);

  const handleMouseDown = (e: React.MouseEvent, type: 'drag' | 'rotate') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'drag') {
      setIsDragging(true);
    } else {
      setIsRotating(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      setPosition({ x, y });
    } else if (isRotating) {
      const centerX = position.x;
      const centerY = position.y;
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      setRotation(angle + 90);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
  };

  const handlePlaceOnVertex = () => {
    // Position at vertex A (top of triangle)
    setPosition({ x: 150, y: 40 });
    setRotation(-55); // Align with the angle CAB
    setIsPlaced(true);
  };

  // Generate protractor arc markings
  const generateMarkings = () => {
    const markings = [];
    const radius = size / 2 - 10;
    
    for (let angle = 0; angle <= 180; angle += 10) {
      const radians = (angle * Math.PI) / 180;
      const isLarge = angle % 30 === 0;
      const innerR = radius - (isLarge ? 15 : 8);
      const outerR = radius;
      
      const x1 = Math.cos(Math.PI - radians) * innerR;
      const y1 = Math.sin(Math.PI - radians) * innerR;
      const x2 = Math.cos(Math.PI - radians) * outerR;
      const y2 = Math.sin(Math.PI - radians) * outerR;
      
      markings.push(
        <line
          key={`mark-${angle}`}
          x1={x1}
          y1={-y1}
          x2={x2}
          y2={-y2}
          stroke="hsl(var(--foreground))"
          strokeWidth={isLarge ? 1.5 : 0.5}
          opacity={0.7}
        />
      );
      
      // Add numbers at major marks
      if (isLarge) {
        const textR = radius - 22;
        const textX = Math.cos(Math.PI - radians) * textR;
        const textY = Math.sin(Math.PI - radians) * textR;
        markings.push(
          <text
            key={`text-${angle}`}
            x={textX}
            y={-textY}
            fontSize={8}
            fill="hsl(var(--foreground))"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={0.8}
          >
            {angle}
          </text>
        );
      }
    }
    return markings;
  };

  return (
    <div className="relative">
      {/* Instructions */}
      <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-primary font-medium mb-2">📐 Digital Protractor</p>
        <p className="text-xs text-muted-foreground">
          Drag the protractor to position it on vertex A. Use the rotation handle (blue circle) to align it with the sides of the angle.
        </p>
      </div>

      {/* Quick place button */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={handlePlaceOnVertex}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
        >
          📍 Place on Vertex A
        </button>
        <button
          onClick={() => {
            setPosition({ x: 150, y: 100 });
            setRotation(0);
            setIsPlaced(false);
          }}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted hover:bg-muted/80 transition-colors"
        >
          🔄 Reset
        </button>
      </div>

      {/* Measured angle display */}
      <div className={cn(
        "mb-3 p-3 rounded-lg border text-center transition-all",
        isCorrect 
          ? "bg-green-500/10 border-green-500/30" 
          : "bg-muted/50 border-border"
      )}>
        <p className="text-sm text-muted-foreground">Measured Angle:</p>
        <p className={cn(
          "text-2xl font-bold",
          isCorrect ? "text-green-600 dark:text-green-400" : "text-foreground"
        )}>
          {displayAngle}°
          {isCorrect && <span className="ml-2">✓</span>}
        </p>
      </div>

      {/* Interactive diagram area */}
      <svg
        ref={containerRef}
        width={300}
        height={250}
        className="bg-card rounded-lg border cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Triangle - Isosceles with angle CAB = 125° */}
        <polygon
          points="150,40 60,200 240,200"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
        />
        
        {/* Vertex labels */}
        <text x={150} y={28} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))" textAnchor="middle">A</text>
        <text x={45} y={210} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">B</text>
        <text x={250} y={210} fontSize={14} fontStyle="italic" fill="hsl(var(--foreground))">C</text>
        
        {/* Equal side marks */}
        <line x1={100} y1={115} x2={110} y2={125} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={190} y1={125} x2={200} y2={115} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Protractor group */}
        <g
          ref={protractorRef}
          transform={`translate(${position.x}, ${position.y}) rotate(${rotation})`}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Semi-transparent protractor background */}
          <path
            d={`M ${-size/2} 0 A ${size/2} ${size/2} 0 0 1 ${size/2} 0 L 0 0 Z`}
            fill="hsla(var(--primary), 0.15)"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
          />
          
          {/* Center point */}
          <circle
            cx={0}
            cy={0}
            r={4}
            fill="hsl(var(--primary))"
          />
          
          {/* Base line */}
          <line
            x1={-size/2}
            y1={0}
            x2={size/2}
            y2={0}
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
          />
          
          {/* Angle markings */}
          {generateMarkings()}
          
          {/* Rotation handle */}
          <circle
            cx={size/2 - 10}
            cy={-20}
            r={8}
            fill="hsl(var(--accent))"
            stroke="hsl(var(--accent-foreground))"
            strokeWidth={2}
            className="cursor-pointer"
            onMouseDown={(e) => handleMouseDown(e, 'rotate')}
          />
          <text
            x={size/2 - 10}
            y={-17}
            fontSize={10}
            fill="hsl(var(--accent-foreground))"
            textAnchor="middle"
          >
            ↻
          </text>
        </g>

        {/* NOT TO SCALE label */}
        <text
          x={150}
          y={242}
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
