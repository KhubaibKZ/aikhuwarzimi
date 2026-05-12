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
        className="self-stretch w-[1.1em] h-auto text-foreground"
      >
        <polyline
          points="0,18 4,16 7,27 13,1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>
      <span className="flex items-center border-t-[2px] border-foreground pt-1 px-1.5 -ml-px">
        {children}
      </span>
    </span>
  );
}
