export function TransformationGrid() {
  const width = 350;
  const height = 350;
  const padding = 30;
  const gridW = width - 2 * padding;
  const gridH = height - 2 * padding;
  const xMin = -8, xMax = 10, yMin = -6, yMax = 8;
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;

  const toX = (x: number) => padding + ((x - xMin) / xRange) * gridW;
  const toY = (y: number) => padding + ((yMax - y) / yRange) * gridH;

  // Triangle A vertices (example from typical 0580/22 transformations)
  const triA = [
    { x: 2, y: 2 },
    { x: 6, y: 2 },
    { x: 6, y: 4 },
  ];

  // Triangle B (enlargement of A, scale factor 1/2, centre (9, -1))
  const triB = [
    { x: 5.5, y: 0.5 },
    { x: 7.5, y: 0.5 },
    { x: 7.5, y: 1.5 },
  ];

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full">
        {/* Grid lines */}
        {Array.from({ length: xRange + 1 }, (_, i) => xMin + i).map(x => (
          <line key={`vx${x}`} x1={toX(x)} y1={padding} x2={toX(x)} y2={height - padding}
            stroke={x === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'}
            strokeWidth={x === 0 ? 1.5 : 0.5} />
        ))}
        {Array.from({ length: yRange + 1 }, (_, i) => yMin + i).map(y => (
          <line key={`hy${y}`} x1={padding} y1={toY(y)} x2={width - padding} y2={toY(y)}
            stroke={y === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--border))'}
            strokeWidth={y === 0 ? 1.5 : 0.5} />
        ))}

        {/* Axis labels */}
        {Array.from({ length: xRange + 1 }, (_, i) => xMin + i).filter(x => x !== 0 && x % 2 === 0).map(x => (
          <text key={`xl${x}`} x={toX(x)} y={toY(0) + 14} textAnchor="middle" className="text-[9px] fill-muted-foreground">{x}</text>
        ))}
        {Array.from({ length: yRange + 1 }, (_, i) => yMin + i).filter(y => y !== 0 && y % 2 === 0).map(y => (
          <text key={`yl${y}`} x={toX(0) - 10} y={toY(y) + 3} textAnchor="middle" className="text-[9px] fill-muted-foreground">{y}</text>
        ))}

        {/* Triangle A */}
        <polygon
          points={triA.map(p => `${toX(p.x)},${toY(p.y)}`).join(' ')}
          fill="hsl(var(--primary) / 0.3)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <text x={toX(4.5)} y={toY(2.8)} textAnchor="middle" className="text-xs fill-primary font-bold">A</text>

        {/* Triangle B */}
        <polygon
          points={triB.map(p => `${toX(p.x)},${toY(p.y)}`).join(' ')}
          fill="hsl(var(--accent) / 0.3)"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth="2"
        />
        <text x={toX(6.5)} y={toY(0.8)} textAnchor="middle" className="text-xs fill-accent-foreground font-bold">B</text>

        {/* Origin label */}
        <text x={toX(0) - 8} y={toY(0) + 14} className="text-[9px] fill-foreground">O</text>
        <text x={width - padding + 5} y={toY(0) + 4} className="text-[10px] fill-foreground">x</text>
        <text x={toX(0) + 5} y={padding - 5} className="text-[10px] fill-foreground">y</text>
      </svg>
    </div>
  );
}
