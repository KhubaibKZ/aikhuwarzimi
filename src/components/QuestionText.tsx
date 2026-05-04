import React from "react";

/**
 * Renders question text with inline stacked fractions.
 *
 * Markup convention inside the source string:
 *   [[numerator/denominator]]   -> rendered as a properly stacked fraction
 *
 * Numerator/denominator may contain any characters except `]]` and the top-level `/`
 * that separates them. Use parentheses inside if needed, e.g. [[3x/(x+1)]].
 *
 * Newlines (\n) are preserved as line breaks.
 */
const FRAC_RE = /\[\[([^\]]+?)\/([^\]]+?)\]\]/g;

function StackedFraction({ num, den }: { num: string; den: string }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle">
      <span className="font-mono text-base px-2">{num}</span>
      <span className="w-full border-t border-foreground" />
      <span className="font-mono text-base px-2">{den}</span>
    </span>
  );
}

export function QuestionText({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n");
  return (
    <p className={`text-foreground flex flex-wrap items-baseline gap-x-1 gap-y-2 ${className ?? ""}`}>
      {lines.map((line, li) => {
        const nodes: React.ReactNode[] = [];
        let lastIdx = 0;
        let m: RegExpExecArray | null;
        FRAC_RE.lastIndex = 0;
        while ((m = FRAC_RE.exec(line)) !== null) {
          if (m.index > lastIdx) {
            nodes.push(
              <span key={`t-${li}-${lastIdx}`}>{line.slice(lastIdx, m.index)}</span>
            );
          }
          nodes.push(
            <StackedFraction key={`f-${li}-${m.index}`} num={m[1].trim()} den={m[2].trim()} />
          );
          lastIdx = m.index + m[0].length;
        }
        if (lastIdx < line.length) {
          nodes.push(<span key={`t-${li}-end`}>{line.slice(lastIdx)}</span>);
        }
        return (
          <React.Fragment key={`l-${li}`}>
            {nodes}
            {li < lines.length - 1 && <span className="basis-full" />}
          </React.Fragment>
        );
      })}
    </p>
  );
}
