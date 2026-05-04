// Shared deterministic audit engine for past-paper questions.
// Encodes the 5-point audit definition:
//  1. Question fidelity   — wording / symbols / numbers exactly match QP
//  2. Diagram fidelity    — same diagram, interactive when solving needs it
//  3. Workspace scaffolding — boxes-only, no pre-filled working / hints
//  4. Check Work coverage — every step wired with a stepKey
//  5. Submit validation   — answer keys + MS alternatives + marking criteria
import type { PastPaperQuestion } from './pastPaperData';

export type AuditCheckType =
  | 'question_fidelity'
  | 'diagram_fidelity'
  | 'workspace_scaffolding'
  | 'check_work_coverage'
  | 'submit_validation';

export type AuditStatus = 'pending' | 'pass' | 'warning' | 'fail';

export interface AuditCheckResult {
  checkType: AuditCheckType;
  status: AuditStatus;
  notes: string;
  findings: Record<string, unknown>;
}

export interface AuditReport {
  paperId: string;
  questionId: string;
  results: AuditCheckResult[];
}

const CHECK_LABELS: Record<AuditCheckType, string> = {
  question_fidelity: '1. Question fidelity (wording / symbols / numbers)',
  diagram_fidelity: '2. Diagram fidelity (image + interactivity)',
  workspace_scaffolding: '3. Workspace scaffolding (boxes-only, no pre-filled work)',
  check_work_coverage: '4. Check Work coverage (every step wired & adaptive)',
  submit_validation: '5. Submit validation (MS-aligned answer keys + criteria)',
};
export function getCheckLabel(c: AuditCheckType) { return CHECK_LABELS[c]; }

// ───────── helpers ─────────
const looksLikeDiagramRef = (text: string) =>
  /diagram|chart|graph|figure|shown|grid|triangle|circle|venn|scatter|sector|parallelogram|rectangle|cylinder|histogram|net of|bar chart|frequency polygon|cumulative|pie chart|map|coordinate|axes|plot/i.test(
    text,
  );

const PROHIBITED_WORDING_PATTERNS = [
  { re: /\\frac|\\sqrt|\\cdot|\\times|\$\$|\\\(/, msg: 'LaTeX detected — use plain Unicode math symbols.' },
  { re: /\bsqrt\(/i, msg: 'ASCII "sqrt(...)" detected — use the √ character.' },
  { re: /\*\*/, msg: 'Markdown bold (**) detected in question text.' },
  { re: /\bx\s*\^\s*2\b/, msg: 'Use x² (Unicode) instead of x^2.' },
];

// ───────── 1. Question fidelity ─────────
function checkQuestionFidelity(q: PastPaperQuestion): AuditCheckResult {
  const issues: string[] = [];
  if (!q.question || q.question.trim().length < 5) issues.push('Question text missing/too short.');
  if (!q.title || q.title.length < 3) issues.push('Title missing.');
  if (typeof q.marks !== 'number' || q.marks < 0) issues.push('Marks missing/invalid.');

  for (const { re, msg } of PROHIBITED_WORDING_PATTERNS) {
    if (re.test(q.question)) issues.push(msg);
  }
  // Multi-part question text should reference each part label (a), (b)…
  if (q.parts && q.parts.length > 1) {
    for (const p of q.parts) {
      if (p.marks > 0 && !new RegExp(`\\(${p.key}\\)`, 'i').test(q.question + ' ' + p.label)) {
        // soft: only warn if both label and question lack it
        if (!new RegExp(`\\(${p.key}\\)`).test(q.question)) {
          issues.push(`Part "(${p.key})" not referenced in question text.`);
        }
      }
    }
  }
  return {
    checkType: 'question_fidelity',
    status: issues.length ? 'warning' : 'pass',
    notes: issues.length
      ? issues.join(' ')
      : 'Wording, symbols, parts and metadata pass deterministic checks. Run AI vision to confirm against QP scan.',
    findings: { issues, charCount: q.question.length, partCount: q.parts?.length ?? 0 },
  };
}

// ───────── 2. Diagram fidelity ─────────
function checkDiagramFidelity(q: PastPaperQuestion): AuditCheckResult {
  const text = q.question + ' ' + (q.title || '');
  const needsDiagram = looksLikeDiagramRef(text);
  const hasImage = !!q.image;
  const hasInteractive = !!q.diagramParts?.length;
  if (!needsDiagram && !hasImage && !hasInteractive) {
    return {
      checkType: 'diagram_fidelity', status: 'pass',
      notes: 'No diagram required.',
      findings: { needsDiagram, hasImage, hasInteractive },
    };
  }
  if (needsDiagram && !hasImage && !hasInteractive) {
    return {
      checkType: 'diagram_fidelity', status: 'fail',
      notes: 'Question references a diagram/figure but no image OR interactive diagram is wired.',
      findings: { needsDiagram, hasImage, hasInteractive },
    };
  }
  // Heuristic: if the question requires reading values off a graph/chart/scale, an interactive diagram is preferable.
  const needsInteractive = /read|measure|plot|construct|draw|mark|find from the (graph|diagram|chart)/i.test(text);
  if (needsInteractive && !hasInteractive) {
    return {
      checkType: 'diagram_fidelity', status: 'warning',
      notes: 'Question requires reading/measuring/plotting on a diagram but no interactive diagram is wired (only static image).',
      findings: { needsDiagram, hasImage, hasInteractive, needsInteractive },
    };
  }
  return {
    checkType: 'diagram_fidelity', status: 'warning',
    notes: 'Diagram hook present. Confirm scale, labels and interactivity match QP via AI vision.',
    findings: { needsDiagram, hasImage, hasInteractive },
  };
}

// ───────── 3. Workspace scaffolding ─────────
function checkWorkspaceScaffolding(q: PastPaperQuestion): AuditCheckResult {
  const issues: string[] = [];
  const stages = q.equationStages ?? [];
  const stagesMap = q.equationStagesMap ?? {};
  const allStages = [...stages, ...Object.values(stagesMap).flat()];

  // Boxes-only: no long instructional text mid-stage
  for (const s of allStages) {
    let boxCount = 0, textCount = 0;
    for (const el of s.elements ?? []) {
      if (el.type === 'box') boxCount++;
      if (el.type === 'text' && el.value) {
        textCount++;
        if (/[a-zA-Z]{6,}/.test(el.value) &&
            !/cents|dollars|km|cm|mm|mins?|hours?|minutes?|hrs?|degrees?|metres?|grams?|seconds?/i.test(el.value)) {
          issues.push(`Stage "${s.label}" contains long instructional text "${el.value}" — should be a fillable box.`);
        }
      }
    }
    if (boxCount === 0 && (s.elements?.length ?? 0) > 0) {
      issues.push(`Stage "${s.label}" has no fillable boxes — students can't enter anything.`);
    }
    if (textCount > boxCount * 4 && boxCount > 0) {
      issues.push(`Stage "${s.label}" is text-heavy (${textCount} text vs ${boxCount} boxes).`);
    }
  }

  // Hints should be brief Socratic nudges, not full solutions
  if (q.hints) {
    for (let i = 0; i < q.hints.length; i++) {
      if (q.hints[i].length > 220) issues.push(`Hint ${i + 1} is too long (${q.hints[i].length} chars) — keep nudges short.`);
    }
  }

  if (q.type === 'multi-part' && !q.parts?.length) issues.push('multi-part question has no parts[] declared.');

  // Scoring stages should have stepKey for grouped check (already enforced in #4 too)
  return {
    checkType: 'workspace_scaffolding',
    status: issues.length ? (issues.some(i => i.includes('no fillable boxes')) ? 'fail' : 'warning') : 'pass',
    notes: issues.length ? issues.join(' ') : 'Scaffolding is clean (boxes-only, concise hints).',
    findings: { issues, stageCount: allStages.length },
  };
}

// ───────── 4. Check Work coverage ─────────
function checkWorkCoverage(q: PastPaperQuestion): AuditCheckResult {
  const stages = q.equationStages ?? [];
  const stagesMap = q.equationStagesMap ?? {};
  const allStages = [...stages, ...Object.values(stagesMap).flat()];
  const issues: string[] = [];

  if (allStages.length === 0) {
    return {
      checkType: 'check_work_coverage', status: 'pass',
      notes: 'No multi-step workspace — Check Work runs against the final answer.',
      findings: {},
    };
  }
  const missingKeys = allStages.filter((s) => !s.stepKey).map((s) => s.label);
  if (missingKeys.length) issues.push(`Missing stepKey on: ${missingKeys.join(', ')}`);

  // Each stage box should have a corresponding answer key for adaptive feedback
  const ansObj = (q.answer && typeof q.answer === 'object') ? (q.answer as Record<string, string>) : {};
  for (const s of allStages) {
    for (const el of s.elements ?? []) {
      if (el.type === 'box' && el.key) {
        const partKey = q.equationSolveParts?.[0]; // primary scaffold part
        const fullKey = partKey ? `${partKey}_${el.key}` : el.key;
        if (!(fullKey in ansObj) && !(el.key in ansObj)) {
          issues.push(`Box "${el.key}" in "${s.label}" has no answer key — Check Work can't validate it.`);
        }
      }
    }
  }
  return {
    checkType: 'check_work_coverage',
    status: issues.length ? 'fail' : 'pass',
    notes: issues.length
      ? issues.join(' ')
      : `${allStages.length} stage(s); every box has a key + answer entry. Adaptive feedback delivered by ai-tutor edge function.`,
    findings: { issues, stageCount: allStages.length },
  };
}

// ───────── 5. Submit validation ─────────
function checkSubmitValidation(q: PastPaperQuestion): AuditCheckResult {
  const issues: string[] = [];
  let altCount = 0;
  if (q.answer === undefined || q.answer === null) {
    issues.push('No answer key defined.');
  } else if (typeof q.answer === 'object') {
    const ans = q.answer as Record<string, string>;
    const keys = Object.keys(ans);
    if (!keys.length) issues.push('Answer object is empty.');
    if (q.parts) {
      for (const p of q.parts) {
        if (p.marks > 0 && !(p.key in ans)) issues.push(`Missing answer for scoring part "${p.key}".`);
      }
    }
    for (const v of Object.values(ans)) if (typeof v === 'string' && v.includes('|')) altCount++;
  } else if (typeof q.answer === 'string' && q.answer.includes('|')) {
    altCount++;
  }
  if (!q.markingCriteria || !Object.keys(q.markingCriteria).length)
    issues.push('No markingCriteria — Submit feedback won\'t reflect MS rules (M1/A1/B1/oe).');
  if (q.marks >= 2 && altCount === 0)
    issues.push('No "oe" alternatives provided (no pipe-separated answers) for a multi-mark question.');

  return {
    checkType: 'submit_validation',
    status: issues.length ? (issues.some(i => i.includes('No answer key')) ? 'fail' : 'warning') : 'pass',
    notes: issues.length ? issues.join(' ') : `Answer keys, ${altCount} alternative form(s) and marking criteria present.`,
    findings: { issues, altCount },
  };
}

export function runDeterministicAudit(paperId: string, q: PastPaperQuestion): AuditReport {
  return {
    paperId,
    questionId: q.id,
    results: [
      checkQuestionFidelity(q),
      checkDiagramFidelity(q),
      checkWorkspaceScaffolding(q),
      checkWorkCoverage(q),
      checkSubmitValidation(q),
    ],
  };
}

export function summarizeAudit(report: AuditReport) {
  const counts = { pass: 0, warning: 0, fail: 0, pending: 0 };
  for (const r of report.results) counts[r.status]++;
  return counts;
}
