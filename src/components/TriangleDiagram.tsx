interface TriangleDiagramProps {
  className?: string;
}

export function TriangleDiagram({ className }: TriangleDiagramProps) {
  // Triangle matching original exam paper:
  // B at top-left, A at middle-left, C at far bottom-right
  // Angle CAB ≈ 125° (obtuse)
  // AB = AC (isosceles)
  return (
    <svg 
      viewBox="0 0 220 240" 
      className={className}
      style={{ maxWidth: '180px', height: 'auto' }}
    >
      {/* Triangle ABC - B(80,15), A(50,130), C(200,220) */}
      <polygon 
        points="80,15 50,130 200,220" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      
      {/* Tick mark on AB (equal side) - perpendicular to line */}
      <line x1="60" y1="68" x2="70" y2="76" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Tick mark on AC (equal side) - perpendicular to line */}
      <line x1="120" y1="172" x2="130" y2="178" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Label B - top */}
      <text x="80" y="10" textAnchor="middle" fontStyle="italic" fontSize="16" fill="currentColor">B</text>
      
      {/* Label A - left of vertex */}
      <text x="35" y="135" textAnchor="middle" fontStyle="italic" fontSize="16" fill="currentColor">A</text>
      
      {/* Label C - right of vertex */}
      <text x="212" y="228" textAnchor="start" fontStyle="italic" fontSize="16" fill="currentColor">C</text>
    </svg>
  );
}
