import React from "react";

/**
 * Renders a proper square-root symbol whose vinculum (top bar)
 * connects seamlessly to the radical's hook, like in printed exam papers.
 *
 * Uses an inline SVG for the hook so the bar always meets the top of the √.
 */
export function Radical({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-stretch align-middle ${className ?? ""}`}>
      <svg
        viewBox="0 0 14 28"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="self-stretch w-[0.7em] h-auto text-foreground"
      >
        {/* Hook of the radical, ending exactly at top-right corner so the
            vinculum continues from there with zero gap. */}
        <polyline
          points="0,18 4,16 7,27 13,1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>
      <span className="flex items-center border-t-[1.5px] border-foreground pt-0.5 px-1 -ml-px">
        {children}
      </span>
    </span>
  );
}
