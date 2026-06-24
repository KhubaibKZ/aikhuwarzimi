import React from "react";
import { Radical } from "@/components/Radical";
import { VecText } from "@/components/VecText";

/**
 * Renders question text with inline stacked fractions, √ vinculum, and Markdown tables.
 *
 *   [[num/den]]    -> stacked fraction
 *   √[[num/den]]   -> stacked fraction under a square-root vinculum
 *   | a | b | c |  -> rendered as an HTML table (with optional |---|---| separator row)
 */
const FRAC_RE = /(√)?\[\[([^\]]+?)\/([^\]]+?)\]\]/g;

function normalizeQuestionMarkup(text: string) {
  return text
    .replace(/^```(?:text|markdown)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "[[$1/$2]]")
    .replace(/\[\[\s*\[\[([^\]]+?)\]\]\s*\]\]/g, "[[$1]]");
}

function StackedFraction({ num, den }: { num: string; den: string }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle">
      <span className="font-mono text-base px-2">{num}</span>
      <span className="w-full border-t border-foreground" />
      <span className="font-mono text-base px-2">{den}</span>
    </span>
  );
}

function renderInline(line: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  FRAC_RE.lastIndex = 0;
  while ((m = FRAC_RE.exec(line)) !== null) {
    if (m.index > lastIdx) {
      nodes.push(<VecText key={`${keyPrefix}-t-${lastIdx}`} value={line.slice(lastIdx, m.index)} />);
    }
    const frac = <StackedFraction num={m[2].trim()} den={m[3].trim()} />;
    nodes.push(
      m[1] ? (
        <Radical key={`${keyPrefix}-f-${m.index}`}>{frac}</Radical>
      ) : (
        <React.Fragment key={`${keyPrefix}-f-${m.index}`}>{frac}</React.Fragment>
      )
    );
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < line.length) {
    nodes.push(<VecText key={`${keyPrefix}-t-end`} value={line.slice(lastIdx)} />);
  }
  return nodes;
}

function isTableRow(line: string) {
  const t = line.trim();
  if (t.length <= 2) return false;
  const pipeCount = (t.match(/\|/g) || []).length;
  return pipeCount >= 2 && splitRow(t).length >= 2;
}
function isSeparatorRow(line: string) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line.trim());
}
function splitRow(line: string): string[] {
  const t = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return t.split("|").map((c) => c.trim());
}

function TableBlock({ rows, keyPrefix }: { rows: string[][]; keyPrefix: string }) {
  return (
    <div className="w-full my-2 overflow-x-auto">
      <table className="border-collapse border border-foreground/60 text-foreground">
        <tbody>
          {rows.map((cells, ri) => (
            <tr key={`${keyPrefix}-r-${ri}`}>
              {cells.map((cell, ci) => (
                <td
                  key={`${keyPrefix}-r-${ri}-c-${ci}`}
                  className="border border-foreground/60 px-3 py-1.5 text-center align-middle"
                >
                  {renderInline(cell, `${keyPrefix}-r-${ri}-c-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QuestionText({ text, className }: { text: string; className?: string }) {
  const lines = normalizeQuestionMarkup(text).split("\n");

  // Group lines into blocks: contiguous table rows vs prose lines.
  type Block =
    | { kind: "table"; rows: string[][] }
    | { kind: "line"; text: string };
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (isTableRow(l)) {
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        if (!isSeparatorRow(lines[i])) rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ kind: "table", rows });
    } else {
      blocks.push({ kind: "line", text: l });
      i++;
    }
  }

  return (
    <div className={`text-foreground ${className ?? ""}`}>
      {blocks.map((b, bi) =>
        b.kind === "table" ? (
          <TableBlock key={`b-${bi}`} rows={b.rows} keyPrefix={`b-${bi}`} />
        ) : (
          <p key={`b-${bi}`} className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {renderInline(b.text, `b-${bi}`)}
          </p>
        )
      )}
    </div>
  );
}
