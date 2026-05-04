// Shared deterministic audit engine for past-paper questions.
import type { PastPaperQuestion } from './pastPaperData';
import { EXTERNAL_DIAGRAM_QUESTIONS, isWorkingStepBoxKey } from './auditEngineRegistry';

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

// Strip phrases where "figure(s)" / "figs" mean sig-figs / decimals, not a diagram.
const stripNonDiagramPhrases = (text: string) =>
  text
    .replace(/\b\d+\s*(significant\s+figures?|sig\.?\s*figs?|s\.?f\.?)\b/gi, '')
    .replace(/\bsignificant\s+figures?\b/gi, '')
    .replace(/\bto\s+\d+\s+(decimal\s+places?|d\.?p\.?|figures?|figs?)\b/gi, '')
    .replace(/\bcorrect\s+to\s+\d+\s+(decimal\s+places?|d\.?p\.?|figures?|figs?)\b/gi, '')
    .replace(/\bnearest\s+(whole\s+number|integer|ten|hundred|thousand)\b/gi, '');

const looksLikeDiagramRef = (raw: string) => {
  const text = stripNonDiagramPhrases(raw);
  // "figure"/"figures" alone is ambiguous — require an explicit visual noun.
  return /diagram|chart|graph|shown (above|below|in the)|grid\b|triangle|circle|venn|scatter|sector|parallelogram|rectangle\b|cylinder|histogram|net of|bar chart|frequency polygon|cumulative|pie chart|\bmap\b|coordinate|axes|plot|sketch|construction|number line/i.test(text);
};

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
      // Internal-only keys (e.g. "p4", "a_calc", "b_calc", "*_num", "*_den") are
      // helper compute slots, not user-facing part labels — don't expect them in
      // the question text.
      const isInternalKey = /^(p\d+|.*_(calc|num|den|mul|ans|a|b|c|d|e|f|g|h|i|j))$/.test(p.key);
      if (isInternalKey) continue;
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
  const hasInteractive = !!q.diagramParts?.length || EXTERNAL_DIAGRAM_QUESTIONS.has(q.id);
  const findings = { needsDiagram, hasImage, hasInteractive, externallyWired: EXTERNAL_DIAGRAM_QUESTIONS.has(q.id) };

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

  // Count boxes/text recursively so nested fraction/numElements/denElements count too.
  const tally = (els: any[] | undefined, acc: { box: number; text: number }) => {
    (els ?? []).forEach((el) => {
      if (!el || typeof el !== 'object') return;
      if (el.type === 'box') acc.box++;
      if (el.type === 'fraction') {
        tally(el.numElements, acc);
        tally(el.denElements, acc);
      }
      if (el.type === 'text' && el.value) acc.text++;
    });
  };

  for (const { stage: s, partKey, idx } of allStages) {
    const refBase = partKey ? `equationStagesMap.${partKey}[${idx}] "${s.label}"` : `equationStages[${idx}] "${s.label}"`;
    const pathBase = partKey ? `equationStagesMap.${partKey}[${idx}]` : `equationStages[${idx}]`;
    const counts = { box: 0, text: 0 };
    tally(s.elements, counts);
    (s.elements ?? []).forEach((el: any, eIdx: number) => {
      if (el.type === 'text' && el.value) {
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
    if (counts.box === 0 && (s.elements?.length ?? 0) > 0) {
      issues.push({
        message: `Stage "${s.label}" has no fillable boxes — students can't enter anything.`,
        ref: refBase,
        path: pathBase,
        suggestion: 'Add at least one {type:"box", key:"…"} element so the step is interactive.',
      });
    }
    if (counts.text > counts.box * 4 && counts.box > 0) {
      issues.push({
        message: `Stage "${s.label}" is text-heavy (${counts.text} text vs ${counts.box} boxes).`,
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
  // Recursively walk fraction/numElements/denElements too — those nested boxes
  // also need answer-key entries.
  const walkBoxes = (els: any[] | undefined, fn: (el: any, eIdx: number) => void) => {
    (els ?? []).forEach((el, eIdx) => {
      if (!el || typeof el !== 'object') return;
      fn(el, eIdx);
      if (el.type === 'fraction') {
        walkBoxes(el.numElements, fn);
        walkBoxes(el.denElements, fn);
      }
    });
  };

  for (const { stage: s, partKey, idx } of allStages) {
    const pathBase = partKey ? `equationStagesMap.${partKey}[${idx}]` : `equationStages[${idx}]`;
    walkBoxes(s.elements, (el, eIdx) => {
      if (el.type === 'box' && el.key) {
        // Intermediate working-step boxes ("_a", "_b", "_num"…) are intentional
        // zero-mark scaffolding — Check Work targets the stage's final answer.
        if (isWorkingStepBoxKey(el.key)) return;
        // The answer-key prefix must be the CURRENT part key for stagesMap entries,
        // not equationSolveParts[0] (which is just the first part).
        const prefix = partKey ?? q.equationSolveParts?.[0];
        const fullKey = prefix ? `${prefix}_${el.key}` : el.key;
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
  // markingCriteria are only required when the MS awards method marks (M1/B1).
  // Pure answer-only parts (typical 1-mark Qs where MS just lists the final answer)
  // do not need markingCriteria — flagging them creates noise.
  const partsArr = q.parts ?? [];
  const hasMethodMarkPart = partsArr.some((p) => p.marks >= 2);
  const isAnswerOnlyQuestion =
    !partsArr.length ? q.marks <= 1 : !hasMethodMarkPart;
  if (!isAnswerOnlyQuestion && (!q.markingCriteria || !Object.keys(q.markingCriteria).length)) {
    issues.push({
      message: 'No markingCriteria — Submit feedback won\'t reflect MS rules (M1/A1/B1/oe).',
      ref: 'markingCriteria',
      path: 'markingCriteria',
      suggestion: 'Add markingCriteria mirroring the MS mark allocation (M1, A1, B1, oe alternatives). Skip if MS lists answer-only.',
    });
  }
  if (q.marks >= 3 && altCount === 0 && hasMethodMarkPart) {
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
