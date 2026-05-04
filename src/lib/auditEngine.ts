// Shared deterministic audit engine for past-paper questions.
import type { PastPaperQuestion } from './pastPaperData';

export type AuditCheckType =
  | 'question_fidelity'
  | 'diagram_fidelity'
  | 'workspace_scaffolding'
  | 'check_work_coverage'
  | 'submit_validation';

export type AuditStatus = 'pending' | 'pass' | 'warning' | 'fail';

export interface AuditIssue {
  message: string;
  ref?: string;        // human-readable location
  path?: string;       // dotted path into the question object
  suggestion?: string; // concrete fix hint
}

export interface AuditCheckResult {
  checkType: AuditCheckType;
  status: AuditStatus;
  notes: string;
  issues: AuditIssue[];
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

const looksLikeDiagramRef = (text: string) =>
  /diagram|chart|graph|figure|shown|grid|triangle|circle|venn|scatter|sector|parallelogram|rectangle|cylinder|histogram|net of|bar chart|frequency polygon|cumulative|pie chart|map|coordinate|axes|plot/i.test(text);

const PROHIBITED_WORDING_PATTERNS: { re: RegExp; msg: string; suggestion: string }[] = [
  { re: /\\frac|\\sqrt|\\cdot|\\times|\$\$|\\\(/, msg: 'LaTeX detected in question text.', suggestion: 'Replace with plain Unicode math symbols (e.g. √, ×, ÷, ²).' },
  { re: /\bsqrt\(/i, msg: 'ASCII "sqrt(...)" detected.', suggestion: 'Replace sqrt(x) with √x.' },
  { re: /\*\*/, msg: 'Markdown bold (**) detected in question text.', suggestion: 'Remove ** — use plain text only.' },
  { re: /\bx\s*\^\s*2\b/, msg: 'ASCII exponent "x^2" detected.', suggestion: 'Use the Unicode superscript x².' },
];

function mkResult(
  checkType: AuditCheckType,
  issues: AuditIssue[],
  passNote: string,
  failOn: (m: string) => boolean = () => false,
  findings: Record<string, unknown> = {},
): AuditCheckResult {
  const status: AuditStatus = !issues.length
    ? 'pass'
    : issues.some((i) => failOn(i.message)) ? 'fail' : 'warning';
  return {
    checkType,
    status,
    notes: issues.length ? issues.map((i) => i.message).join(' ') : passNote,
    issues,
    findings: { ...findings, issues: issues.map((i) => i.message) },
  };
}

function checkQuestionFidelity(q: PastPaperQuestion): AuditCheckResult {
  const issues: AuditIssue[] = [];
  if (!q.question || q.question.trim().length < 5) {
    issues.push({ message: 'Question text missing/too short.', ref: 'question', path: 'question', suggestion: 'Paste the exact wording from the QP.' });
  }
  if (!q.title || q.title.length < 3) {
    issues.push({ message: 'Title missing.', ref: 'title', path: 'title' });
  }
  if (typeof q.marks !== 'number' || q.marks < 0) {
    issues.push({ message: 'Marks missing/invalid.', ref: 'marks', path: 'marks' });
  }
  for (const { re, msg, suggestion } of PROHIBITED_WORDING_PATTERNS) {
    const m = q.question?.match(re);
    if (m) issues.push({ message: msg, ref: `question text ("…${m[0]}…")`, path: 'question', suggestion });
  }
  if (q.parts && q.parts.length > 1) {
    for (const p of q.parts) {
      if (p.marks > 0 && !new RegExp(`\\(${p.key}\\)`).test(q.question)) {
        issues.push({
          message: `Part "(${p.key})" not referenced in question text.`,
          ref: `parts[${p.key}]`,
          path: `question`,
          suggestion: `Add "(${p.key})" prefix where this sub-question begins.`,
        });
      }
    }
  }
  return mkResult(
    'question_fidelity',
    issues,
    'Wording, symbols, parts and metadata pass deterministic checks. Run AI vision to confirm against QP scan.',
    () => false,
    { charCount: q.question?.length ?? 0, partCount: q.parts?.length ?? 0 },
  );
}

function checkDiagramFidelity(q: PastPaperQuestion): AuditCheckResult {
  const text = (q.question ?? '') + ' ' + (q.title ?? '');
  const needsDiagram = looksLikeDiagramRef(text);
  const hasImage = !!q.image;
  const hasInteractive = !!q.diagramParts?.length;
  const findings = { needsDiagram, hasImage, hasInteractive };

  if (!needsDiagram && !hasImage && !hasInteractive) {
    return { checkType: 'diagram_fidelity', status: 'pass', notes: 'No diagram required.', issues: [], findings };
  }
  if (needsDiagram && !hasImage && !hasInteractive) {
    const issue: AuditIssue = {
      message: 'Question references a diagram/figure but no image OR interactive diagram is wired.',
      ref: 'diagramParts / image',
      path: 'diagramParts',
      suggestion: 'Wire an SVG diagram component or attach an image matching the QP figure.',
    };
    return { checkType: 'diagram_fidelity', status: 'fail', notes: issue.message, issues: [issue], findings };
  }
  const needsInteractive = /read|measure|plot|construct|draw|mark|find from the (graph|diagram|chart)/i.test(text);
  if (needsInteractive && !hasInteractive) {
    const issue: AuditIssue = {
      message: 'Question requires reading/measuring/plotting on a diagram but only a static image is wired.',
      ref: 'diagramParts',
      path: 'diagramParts',
      suggestion: 'Add an interactive diagram component (clickable points / draggable line / measurable axes).',
    };
    return { checkType: 'diagram_fidelity', status: 'warning', notes: issue.message, issues: [issue], findings };
  }
  const issue: AuditIssue = {
    message: 'Diagram hook present. Confirm scale, labels and interactivity match QP via AI vision.',
    ref: 'diagram',
  };
  return { checkType: 'diagram_fidelity', status: 'warning', notes: issue.message, issues: [issue], findings };
}

function checkWorkspaceScaffolding(q: PastPaperQuestion): AuditCheckResult {
  const issues: AuditIssue[] = [];
  const stages = q.equationStages ?? [];
  const stagesMap = q.equationStagesMap ?? {};
  const allStages: { stage: any; partKey?: string; idx: number }[] = [
    ...stages.map((s, idx) => ({ stage: s, idx })),
    ...Object.entries(stagesMap).flatMap(([partKey, arr]) =>
      (arr as any[]).map((s, idx) => ({ stage: s, partKey, idx })),
    ),
  ];

  for (const { stage: s, partKey, idx } of allStages) {
    const refBase = partKey ? `equationStagesMap.${partKey}[${idx}] "${s.label}"` : `equationStages[${idx}] "${s.label}"`;
    const pathBase = partKey ? `equationStagesMap.${partKey}[${idx}]` : `equationStages[${idx}]`;
    let boxCount = 0, textCount = 0;
    (s.elements ?? []).forEach((el: any, eIdx: number) => {
      if (el.type === 'box') boxCount++;
      if (el.type === 'text' && el.value) {
        textCount++;
        if (/[a-zA-Z]{6,}/.test(el.value) &&
            !/cents|dollars|km|cm|mm|mins?|hours?|minutes?|hrs?|degrees?|metres?|grams?|seconds?/i.test(el.value)) {
          issues.push({
            message: `Stage "${s.label}" contains long instructional text "${el.value}" — should be a fillable box.`,
            ref: `${refBase} → text element [${eIdx}]`,
            path: `${pathBase}.elements[${eIdx}]`,
            suggestion: 'Replace this text element with a {type:"box", key:"…"} so the student fills it in.',
          });
        }
      }
    });
    if (boxCount === 0 && (s.elements?.length ?? 0) > 0) {
      issues.push({
        message: `Stage "${s.label}" has no fillable boxes — students can't enter anything.`,
        ref: refBase,
        path: pathBase,
        suggestion: 'Add at least one {type:"box", key:"…"} element so the step is interactive.',
      });
    }
    if (textCount > boxCount * 4 && boxCount > 0) {
      issues.push({
        message: `Stage "${s.label}" is text-heavy (${textCount} text vs ${boxCount} boxes).`,
        ref: refBase,
        path: pathBase,
        suggestion: 'Reduce instructional text and convert to additional fillable boxes.',
      });
    }
  }

  if (q.hints) {
    q.hints.forEach((h, i) => {
      if (h.length > 220)
        issues.push({
          message: `Hint ${i + 1} is too long (${h.length} chars) — keep nudges short.`,
          ref: `hints[${i}]`,
          path: `hints[${i}]`,
          suggestion: 'Trim to a single Socratic nudge (≤2 sentences).',
        });
    });
  }
  if (q.type === 'multi-part' && !q.parts?.length) {
    issues.push({ message: 'multi-part question has no parts[] declared.', ref: 'parts', path: 'parts' });
  }
  return mkResult(
    'workspace_scaffolding',
    issues,
    'Scaffolding is clean (boxes-only, concise hints).',
    (m) => m.includes('no fillable boxes'),
    { stageCount: allStages.length },
  );
}

function checkWorkCoverage(q: PastPaperQuestion): AuditCheckResult {
  const stages = q.equationStages ?? [];
  const stagesMap = q.equationStagesMap ?? {};
  const allStages: { stage: any; partKey?: string; idx: number }[] = [
    ...stages.map((s, idx) => ({ stage: s, idx })),
    ...Object.entries(stagesMap).flatMap(([partKey, arr]) =>
      (arr as any[]).map((s, idx) => ({ stage: s, partKey, idx })),
    ),
  ];
  const issues: AuditIssue[] = [];

  if (allStages.length === 0) {
    return {
      checkType: 'check_work_coverage', status: 'pass',
      notes: 'No multi-step workspace — Check Work runs against the final answer.',
      issues: [], findings: {},
    };
  }

  for (const { stage: s, partKey, idx } of allStages) {
    const refBase = partKey ? `equationStagesMap.${partKey}[${idx}] "${s.label}"` : `equationStages[${idx}] "${s.label}"`;
    const pathBase = partKey ? `equationStagesMap.${partKey}[${idx}]` : `equationStages[${idx}]`;
    if (!s.stepKey) {
      issues.push({
        message: `Missing stepKey on stage "${s.label}".`,
        ref: refBase,
        path: `${pathBase}.stepKey`,
        suggestion: 'Add stepKey:"…" so Check Work can scope adaptive feedback to this step.',
      });
    }
  }

  const ansObj = (q.answer && typeof q.answer === 'object') ? (q.answer as Record<string, string>) : {};
  for (const { stage: s, partKey, idx } of allStages) {
    const pathBase = partKey ? `equationStagesMap.${partKey}[${idx}]` : `equationStages[${idx}]`;
    (s.elements ?? []).forEach((el: any, eIdx: number) => {
      if (el.type === 'box' && el.key) {
        const primary = q.equationSolveParts?.[0];
        const fullKey = primary ? `${primary}_${el.key}` : el.key;
        if (!(fullKey in ansObj) && !(el.key in ansObj)) {
          issues.push({
            message: `Box "${el.key}" in "${s.label}" has no answer key — Check Work can't validate it.`,
            ref: `${pathBase}.elements[${eIdx}] (key="${el.key}")`,
            path: `answer.${fullKey}`,
            suggestion: `Add an entry "${fullKey}": "<expected>" to the answer object.`,
          });
        }
      }
    });
  }
  return mkResult(
    'check_work_coverage',
    issues,
    `${allStages.length} stage(s); every box has a key + answer entry.`,
    () => true, // any missing wiring = fail
    { stageCount: allStages.length },
  );
}

function checkSubmitValidation(q: PastPaperQuestion): AuditCheckResult {
  const issues: AuditIssue[] = [];
  let altCount = 0;
  if (q.answer === undefined || q.answer === null) {
    issues.push({ message: 'No answer key defined.', ref: 'answer', path: 'answer', suggestion: 'Add an answer key matching the marking scheme.' });
  } else if (typeof q.answer === 'object') {
    const ans = q.answer as Record<string, string>;
    if (!Object.keys(ans).length) {
      issues.push({ message: 'Answer object is empty.', ref: 'answer', path: 'answer' });
    }
    if (q.parts) {
      for (const p of q.parts) {
        if (p.marks > 0 && !(p.key in ans)) {
          issues.push({
            message: `Missing answer for scoring part "${p.key}".`,
            ref: `parts[${p.key}]`,
            path: `answer.${p.key}`,
            suggestion: `Add "${p.key}": "<MS answer>" to the answer object.`,
          });
        }
      }
    }
    for (const v of Object.values(ans)) if (typeof v === 'string' && v.includes('|')) altCount++;
  } else if (typeof q.answer === 'string' && q.answer.includes('|')) {
    altCount++;
  }
  if (!q.markingCriteria || !Object.keys(q.markingCriteria).length) {
    issues.push({
      message: 'No markingCriteria — Submit feedback won\'t reflect MS rules (M1/A1/B1/oe).',
      ref: 'markingCriteria',
      path: 'markingCriteria',
      suggestion: 'Add markingCriteria mirroring the MS mark allocation (M1, A1, B1, oe alternatives).',
    });
  }
  if (q.marks >= 2 && altCount === 0) {
    issues.push({
      message: 'No "oe" alternatives provided (no pipe-separated answers) for a multi-mark question.',
      ref: 'answer',
      path: 'answer',
      suggestion: 'Use "primary|alt1|alt2" to allow equivalent forms accepted by the MS.',
    });
  }
  return mkResult(
    'submit_validation',
    issues,
    `Answer keys, ${altCount} alternative form(s) and marking criteria present.`,
    (m) => m.includes('No answer key'),
    { altCount },
  );
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
