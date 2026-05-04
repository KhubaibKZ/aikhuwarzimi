// Automated workspace audit: checks each past-paper question for
//   1) Missing interactive diagram component (when the question text
//      references a diagram/chart/graph/figure)
//   2) Missing or duplicated step labels in equationStages /
//      equationStagesMap
//   3) Missing final-answer keys for every declared `parts[*].key`
//
// Run with:  bun scripts/auditWorkspace.ts
// Writes:    /mnt/documents/workspace_audit.md

import { readFileSync } from 'node:fs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { pastPaperQuestions, pastPapers } from '../src/lib/pastPaperData';
import type { PastPaperQuestion } from '../src/lib/pastPaperData';

// --- Load the set of question IDs that actually have a diagram wired ---
const workspaceSrc = readFileSync('src/components/PastPaperWorkspace.tsx', 'utf8');
const wiredIds = new Set<string>();
for (const m of workspaceSrc.matchAll(/question\.id\s*===\s*['"](pp_[a-z0-9_]+)['"]/g)) {
  wiredIds.add(m[1]);
}

// --- Build reverse map: questionId -> paper code ---
const qToPaper = new Map<string, string>();
for (const p of pastPapers) {
  for (const s of p.sections) {
    qToPaper.set(s.questionId, `${p.code} ${p.session} ${p.year}`);
  }
}

// --- Heuristic: does the question text imply a visual is required? ---
const VISUAL_RX =
  /\b(diagram|chart|graph|figure|scatter|venn|histogram|bar chart|cumulative frequency|number line|grid|net|frustum|prism|cylinder|cone|sphere|cuboid|trapezium|parallelogram|polygon|sector|circle (?:above|below|opposite)|triangle (?:above|below|opposite|abc)|shown(?: in| on| above| below| opposite)?|line of best fit|speed[- ]time|distance[- ]time|coordinate|axes|protractor|bearing|construct|construction)\b/i;

const NEGATION_RX = /no diagram|without (?:a )?diagram|not (?:to )?scale only/i;

interface Issue {
  qid: string;
  paper: string;
  category: 'diagram' | 'step-label' | 'answer-key';
  detail: string;
}
const issues: Issue[] = [];

const allQs = Object.values(pastPaperQuestions) as PastPaperQuestion[];

for (const q of allQs) {
  const paper = qToPaper.get(q.id) ?? 'unknown';

  // 1) Diagram check
  const text = q.question || '';
  const looksVisual = VISUAL_RX.test(text) && !NEGATION_RX.test(text);
  if (looksVisual && !wiredIds.has(q.id) && !q.image) {
    // find the matched keyword for context
    const kw = text.match(VISUAL_RX)?.[0] ?? '';
    issues.push({
      qid: q.id,
      paper,
      category: 'diagram',
      detail: `text mentions “${kw}” but no diagram component or image is wired`,
    });
  }

  // 2) Step-label check
  const stageGroups: Array<{ partKey: string; stages: any[] }> = [];
  if (q.equationStages) stageGroups.push({ partKey: '(shared)', stages: q.equationStages });
  if (q.equationStagesMap) {
    for (const [pk, st] of Object.entries(q.equationStagesMap)) {
      stageGroups.push({ partKey: pk, stages: st as any[] });
    }
  }
  for (const g of stageGroups) {
    const seen = new Set<string>();
    g.stages.forEach((stg, i) => {
      if (!stg.stepKey) {
        issues.push({
          qid: q.id, paper, category: 'step-label',
          detail: `part "${g.partKey}" stage #${i + 1} missing stepKey`,
        });
      } else if (seen.has(stg.stepKey)) {
        issues.push({
          qid: q.id, paper, category: 'step-label',
          detail: `part "${g.partKey}" duplicate stepKey "${stg.stepKey}"`,
        });
      }
      seen.add(stg.stepKey);
    });
  }

  // 3) Final-answer keys
  if (q.parts && q.parts.length > 0) {
    if (!q.answer) {
      issues.push({ qid: q.id, paper, category: 'answer-key',
        detail: `has parts but no answer object` });
    } else if (typeof q.answer === 'object') {
      const ans = q.answer as Record<string, string>;
      for (const part of q.parts) {
        if (!(part.key in ans) || !String(ans[part.key]).trim()) {
          issues.push({
            qid: q.id, paper, category: 'answer-key',
            detail: `missing/empty answer for part key "${part.key}" (${part.label})`,
          });
        }
      }
    }
  }
}

// --- Group + write report ---
const byPaper = new Map<string, Issue[]>();
for (const i of issues) {
  if (!byPaper.has(i.paper)) byPaper.set(i.paper, []);
  byPaper.get(i.paper)!.push(i);
}

const lines: string[] = [];
lines.push(`# Workspace Audit Report`);
lines.push(``);
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push(``);
lines.push(`- Total questions audited: **${allQs.length}**`);
lines.push(`- Total issues found: **${issues.length}**`);
const counts = issues.reduce<Record<string, number>>((a, i) => {
  a[i.category] = (a[i.category] ?? 0) + 1; return a;
}, {});
for (const [k, v] of Object.entries(counts)) lines.push(`  - ${k}: ${v}`);
lines.push(``);

const sortedPapers = [...byPaper.keys()].sort();
for (const p of sortedPapers) {
  lines.push(`## ${p}`);
  lines.push(``);
  for (const i of byPaper.get(p)!) {
    lines.push(`- **[${i.category}]** \`${i.qid}\` — ${i.detail}`);
  }
  lines.push(``);
}

mkdirSync('/mnt/documents', { recursive: true });
writeFileSync('/mnt/documents/workspace_audit.md', lines.join('\n'));
console.log(`Audited ${allQs.length} questions, ${issues.length} issues.`);
console.log(`Wrote /mnt/documents/workspace_audit.md`);
