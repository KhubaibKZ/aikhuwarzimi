import React from 'react';

interface RectangularBoxDiagramProps {
  ab: number;
  bc: number;
  cg: number;
  showStick?: boolean;
  stickLength?: number;
}

export function RectangularBoxDiagram({
  ab = 18.6,
  bc = 9,
  cg = 14.5,
  showStick = true,
  stickLength = 30
}: RectangularBoxDiagramProps) {
  const svgWidth = 320;
  const svgHeight = 260;
  
  const scale = 6;
  const offsetX = 50;
  const offsetY = 60;
  
  // Isometric helpers
  const isoX = (x: number, y: number) => offsetX + (x - y) * 0.75 * scale;
  const isoY = (x: number, y: number, z: number) => offsetY + (x + y) * 0.4 * scale - z * scale;

  const l = ab / 2;  // Scale down for display
  const w = bc / 2;
  const h = cg / 2;

  // Vertices
  const A = { x: isoX(0, 0), y: isoY(0, 0, 0) };
  const B = { x: isoX(l, 0), y: isoY(l, 0, 0) };
  const C = { x: isoX(l, w), y: isoY(l, w, 0) };
  const D = { x: isoX(0, w), y: isoY(0, w, 0) };
  const E = { x: isoX(0, 0), y: isoY(0, 0, h) };
  const F = { x: isoX(l, 0), y: isoY(l, 0, h) };
  const G = { x: isoX(l, w), y: isoY(l, w, h) };
  const H = { x: isoX(0, w), y: isoY(0, w, h) };

  // Stick extends beyond G
  const stickDir = { x: G.x - A.x, y: G.y - A.y };
  const stickLen = Math.sqrt(stickDir.x ** 2 + stickDir.y ** 2);
  const M = {
    x: A.x + stickDir.x * 1.2,
    y: A.y + stickDir.y * 1.2
  };

  return (
    <div className="flex justify-center">
      <svg width={svgWidth} height={svgHeight} className="bg-card rounded-lg border">
        {/* Hidden edges (dashed) */}
        <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4,4" />
        <line x1={A.x} y1={A.y} x2={E.x} y2={E.y} stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4,4" />
        <line x1={D.x} y1={D.y} x2={H.x} y2={H.y} stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4,4" />

        {/* Visible edges - bottom */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Top face */}
        <line x1={E.x} y1={E.y} x2={F.x} y2={F.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={F.x} y1={F.y} x2={G.x} y2={G.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={G.x} y1={G.y} x2={H.x} y2={H.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={H.x} y1={H.y} x2={E.x} y2={E.y} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Vertical edges */}
        <line x1={B.x} y1={B.y} x2={F.x} y2={F.y} stroke="hsl(var(--foreground))" strokeWidth={2} />
        <line x1={C.x} y1={C.y} x2={G.x} y2={G.y} stroke="hsl(var(--foreground))" strokeWidth={2} />

        {/* Stick AGM */}
        {showStick && (
          <>
            <line
              x1={A.x} y1={A.y}
              x2={M.x} y2={M.y}
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              strokeDasharray="6,3"
            />
            <circle cx={G.x} cy={G.y} r={3} fill="hsl(var(--primary))" />
            <circle cx={M.x} cy={M.y} r={3} fill="hsl(var(--primary))" />
          </>
        )}

        {/* Vertex labels */}
        <text x={A.x - 14} y={A.y + 5} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">A</text>
        <text x={B.x + 4} y={B.y + 14} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">B</text>
        <text x={C.x + 6} y={C.y + 5} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">C</text>
        <text x={D.x + 6} y={D.y + 5} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">D</text>
        <text x={E.x - 14} y={E.y - 2} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">E</text>
        <text x={F.x + 4} y={F.y - 5} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">F</text>
        <text x={G.x + 6} y={G.y - 8} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">G</text>
        <text x={H.x - 14} y={H.y - 2} fontSize={11} fontWeight="bold" fill="hsl(var(--foreground))">H</text>
        {showStick && <text x={M.x + 6} y={M.y - 5} fontSize={11} fontWeight="bold" fill="hsl(var(--primary))">M</text>}

        {/* Dimension labels */}
        <text x={(A.x + B.x) / 2} y={A.y + 22} fontSize={10} fill="hsl(var(--foreground))" textAnchor="middle">{ab} cm</text>
        <text x={(B.x + C.x) / 2 + 15} y={(B.y + C.y) / 2} fontSize={10} fill="hsl(var(--foreground))" textAnchor="start">{bc} cm</text>
        <text x={C.x + 18} y={(C.y + G.y) / 2} fontSize={10} fill="hsl(var(--foreground))" textAnchor="start">{cg} cm</text>

        {/* NOT TO SCALE */}
        <text x={svgWidth / 2} y={svgHeight - 8} fontSize={9} fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">NOT TO SCALE</text>
      </svg>
    </div>
  );
}
