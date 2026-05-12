import React from "react";

/**
 * Renders text containing <v>...</v> tokens by drawing a vector arrow above
 * the wrapped letters (e.g. <v>OA</v> -> OA with → above).
 */
const VEC_RE = /<v>([^<]+)<\/v>/g;

export function VecText({ value, className }: { value: string; className?: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  VEC_RE.lastIndex = 0;
  while ((m = VEC_RE.exec(value)) !== null) {
    if (m.index > last) nodes.push(<span key={`t${last}`}>{value.slice(last, m.index)}</span>);
    nodes.push(
      <span key={`v${m.index}`} className="relative inline-block px-0.5 italic font-semibold">
        <span className="absolute left-0 right-0 -top-2 text-[0.6em] leading-none text-center pointer-events-none select-none">⟶</span>
        {m[1]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < value.length) nodes.push(<span key="end">{value.slice(last)}</span>);
  return <span className={className}>{nodes}</span>;
}
