import React from 'react';

interface CuboidDiagramProps {
  length: number;
  width: number;
  height: number;
  showDiagonal?: boolean;
  diagonalLength?: number;
  labels?: {
    length?: string;
    width?: string;
    height?: string;
    diagonal?: string;
  };
}

export function CuboidDiagram({
  length,
  width,
  height,
  showDiagonal = false,
  diagonalLength,
  labels = {}
}: CuboidDiagramProps) {
  const svgWidth = 280;
  const svgHeight = 220;
  
  // Scale factors
  const scale = 8;
  const offsetX = 60;
  const offsetY = 40;
  
  // Isometric projection helpers
  const isoX = (x: number, y: number) => offsetX + (x - y) * 0.866 * scale;
  const isoY = (x: number, y: number, z: number) => offsetY + (x + y) * 0.5 * scale - z * scale;

  // Define the 8 vertices of the cuboid
  const vertices = {
    // Bottom face
    A: { x: isoX(0, 0), y: isoY(0, 0, 0) },           // front-left
    B: { x: isoX(length, 0), y: isoY(length, 0, 0) }, // front-right
    C: { x: isoX(length, width), y: isoY(length, width, 0) }, // back-right
    D: { x: isoX(0, width), y: isoY(0, width, 0) },   // back-left
    // Top face
    E: { x: isoX(0, 0), y: isoY(0, 0, height) },
    F: { x: isoX(length, 0), y: isoY(length, 0, height) },
    G: { x: isoX(length, width), y: isoY(length, width, height) },
    H: { x: isoX(0, width), y: isoY(0, width, height) },
  };

  return (
    <div className="flex justify-center">
      <svg width={svgWidth} height={svgHeight} className="bg-card rounded-lg border">
        {/* Hidden edges (dashed) */}
        <line
          x1={vertices.A.x} y1={vertices.A.y}
          x2={vertices.D.x} y2={vertices.D.y}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1}
          strokeDasharray="4,4"
        />
        <line
          x1={vertices.A.x} y1={vertices.A.y}
          x2={vertices.E.x} y2={vertices.E.y}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1}
          strokeDasharray="4,4"
        />
        <line
          x1={vertices.D.x} y1={vertices.D.y}
          x2={vertices.H.x} y2={vertices.H.y}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1}
          strokeDasharray="4,4"
        />

        {/* Visible edges */}
        {/* Bottom face - visible edges */}
        <line x1={vertices.A.x} y1={vertices.A.y} x2={vertices.B.x} y2={vertices.B.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={vertices.B.x} y1={vertices.B.y} x2={vertices.C.x} y2={vertices.C.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={vertices.C.x} y1={vertices.C.y} x2={vertices.D.x} y2={vertices.D.y} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Top face */}
        <line x1={vertices.E.x} y1={vertices.E.y} x2={vertices.F.x} y2={vertices.F.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={vertices.F.x} y1={vertices.F.y} x2={vertices.G.x} y2={vertices.G.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={vertices.G.x} y1={vertices.G.y} x2={vertices.H.x} y2={vertices.H.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={vertices.H.x} y1={vertices.H.y} x2={vertices.E.x} y2={vertices.E.y} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Vertical edges - visible */}
        <line x1={vertices.B.x} y1={vertices.B.y} x2={vertices.F.x} y2={vertices.F.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={vertices.C.x} y1={vertices.C.y} x2={vertices.G.x} y2={vertices.G.y} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Space diagonal if shown */}
        {showDiagonal && (
          <line
            x1={vertices.A.x} y1={vertices.A.y}
            x2={vertices.G.x} y2={vertices.G.y}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            strokeDasharray="6,3"
          />
        )}

        {/* Labels */}
        <text
          x={(vertices.A.x + vertices.B.x) / 2}
          y={(vertices.A.y + vertices.B.y) / 2 + 18}
          fontSize={11}
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          {labels.length || `${length} cm`}
        </text>
        <text
          x={(vertices.B.x + vertices.C.x) / 2 + 15}
          y={(vertices.B.y + vertices.C.y) / 2}
          fontSize={11}
          fill="hsl(var(--foreground))"
          textAnchor="middle"
        >
          {labels.width || `${width} cm`}
        </text>
        <text
          x={vertices.F.x + 15}
          y={(vertices.B.y + vertices.F.y) / 2}
          fontSize={11}
          fill="hsl(var(--foreground))"
          textAnchor="start"
        >
          {labels.height || `${height} cm`}
        </text>

        {showDiagonal && diagonalLength && (
          <text
            x={(vertices.A.x + vertices.G.x) / 2 - 20}
            y={(vertices.A.y + vertices.G.y) / 2}
            fontSize={11}
            fontWeight="bold"
            fill="hsl(var(--primary))"
            textAnchor="middle"
          >
            {labels.diagonal || `${diagonalLength} cm`}
          </text>
        )}

        {/* Vertex labels if diagonal shown */}
        {showDiagonal && (
          <>
            <text x={vertices.A.x - 10} y={vertices.A.y + 5} fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">A</text>
            <text x={vertices.G.x + 5} y={vertices.G.y - 5} fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">B</text>
          </>
        )}
      </svg>
    </div>
  );
}

// Cube variant for Q9(b)
interface CubeDiagramProps {
  diagonalLength: number;
}

export function CubeDiagram({ diagonalLength }: CubeDiagramProps) {
  return (
    <CuboidDiagram
      length={10}
      width={10}
      height={10}
      showDiagonal={true}
      diagonalLength={diagonalLength}
      labels={{
        length: '',
        width: '',
        height: '',
        diagonal: `${diagonalLength} cm`
      }}
    />
  );
}
