import React from "react";
import { Radical } from "@/components/Radical";

/**
 * Renders question text with inline stacked fractions and proper √ vinculum.
 *
 *   [[num/den]]    -> stacked fraction
 *   √[[num/den]]   -> stacked fraction under a connected square-root vinculum
 */
const FRAC_RE = /(√)?\[\[([^\]]+?)\/([^\]]+?)\]\]/g;

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
    <p className={`text-foreground flex flex-wrap items-center gap-x-1 gap-y-2 ${className ?? ""}`}>
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
          const frac = <StackedFraction num={m[2].trim()} den={m[3].trim()} />;
          nodes.push(
            m[1] ? (
              <Radical key={`f-${li}-${m.index}`}>{frac}</Radical>
            ) : (
              <React.Fragment key={`f-${li}-${m.index}`}>{frac}</React.Fragment>
            )
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
