import React from 'react';

interface ParallelogramDiagramProps {
  reflexAngle?: number;
}

export function ParallelogramDiagram({ reflexAngle = 248 }: ParallelogramDiagramProps) {
  // Use the actual past paper image for accurate representation
  return (
    <div className="flex justify-center">
      <img 
        src="/assets/parallelogram-q2d-ref.png" 
        alt={`Parallelogram ABCD with reflex angle ${reflexAngle}° at D`}
        className="max-w-full h-auto rounded-lg border bg-card"
        style={{ maxHeight: '200px' }}
      />
    </div>
  );
}
