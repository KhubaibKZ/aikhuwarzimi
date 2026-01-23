interface TriangleDiagramProps {
  className?: string;
}

export function TriangleDiagram({ className }: TriangleDiagramProps) {
  return (
    <svg 
      viewBox="0 0 200 180" 
      className={className}
      style={{ maxWidth: '200px', height: 'auto' }}
    >
      {/* Triangle ABC - isosceles with AB = AC */}
      {/* B at top, A at middle-left, C at bottom-right */}
      <polygon 
        points="70,20 40,100 180,160" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      
      {/* Tick mark on AB (equal side) */}
      <line x1="52" y1="55" x2="58" y2="62" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Tick mark on AC (equal side) */}
      <line x1="118" y1="82" x2="128" y2="88" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Label B - top */}
      <text x="70" y="12" textAnchor="middle" fontStyle="italic" fontSize="14" fill="currentColor">B</text>
      
      {/* Label A - left */}
      <text x="28" y="105" textAnchor="middle" fontStyle="italic" fontSize="14" fill="currentColor">A</text>
      
      {/* Label C - bottom right */}
      <text x="190" y="165" textAnchor="middle" fontStyle="italic" fontSize="14" fill="currentColor">C</text>
    </svg>
  );
}
