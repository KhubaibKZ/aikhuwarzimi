// CLI: deterministic audit runner.
// Usage:
//   bun scripts/audit.ts --paper pp_4024_on23_11
//   bun scripts/audit.ts --paper pp_4024_on23_11 --question pp_4024_on23_11_q5
//   bun scripts/audit.ts --paper pp_4024_on23_11 --out docs/audits/p11.md
import { pastPapers, pastPaperQuestions } from '../src/lib/pastPaperData';
import { runDeterministicAudit, summarizeAudit, getCheckLabel } from '../src/lib/auditEngine';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const paperId = arg('paper');
const questionId = arg('question');
const out = arg('out');

if (!paperId) {
  console.error('Usage: bun scripts/audit.ts --paper <paperId> [--question <qid>] [--out <file.md>]');
  process.exit(1);
}
const paper = pastPapers.find((p) => p.id === paperId);
if (!paper) { console.error(`Paper not found: ${paperId}`); process.exit(2); }

const qIds = questionId
  ? [questionId]
  : Array.from(new Set(paper.sections.map((s) => s.questionId)));

const lines: string[] = [];
lines.push(`# Audit Report — ${paper.title}`);
lines.push(`_${new Date().toISOString()}_`);
lines.push('');
let totals = { pass: 0, warning: 0, fail: 0, pending: 0 };

for (const qid of qIds) {
  const q = pastPaperQuestions[qid];
  if (!q) { lines.push(`## ${qid} — MISSING\n`); continue; }
  const report = runDeterministicAudit(paperId, q);
  const counts = summarizeAudit(report);
  totals = {
    pass: totals.pass + counts.pass,
    warning: totals.warning + counts.warning,
    fail: totals.fail + counts.fail,
    pending: totals.pending + counts.pending,
  };
  lines.push(`## Q${q.questionNumber} — ${q.title}`);
  lines.push(`\`${q.id}\` · pass:${counts.pass} warn:${counts.warning} fail:${counts.fail}`);
  for (const r of report.results) {
    const icon = r.status === 'pass' ? '✅' : r.status === 'warning' ? '⚠️' : r.status === 'fail' ? '❌' : '⏳';
    lines.push(`- ${icon} **${getCheckLabel(r.checkType)}** — ${r.notes}`);
  }
  lines.push('');
}
lines.unshift(`Totals — ✅ ${totals.pass}  ⚠️ ${totals.warning}  ❌ ${totals.fail}\n`);

const md = lines.join('\n');
if (out) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, md);
  console.log(`Wrote ${out}`);
} else {
  console.log(md);
}
