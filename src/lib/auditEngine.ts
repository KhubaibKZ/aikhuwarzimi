// Shared deterministic audit engine for past-paper questions.
// Used by both the admin Audit UI and the CLI script.
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
  question_fidelity: 'Question fidelity (wording / symbols / numbers)',
  diagram_fidelity: 'Diagram fidelity (image / interactivity)',
  workspace_scaffolding: 'Workspace scaffolding (boxes-only, no pre-filled work)',
  check_work_coverage: 'Check Work coverage (every step wired)',
  submit_validation: 'Submit validation (answer keys + MS alternatives)',
};

export function getCheckLabel(c: AuditCheckType) {
  return CHECK_LABELS[c];
}

// Deterministic question-fidelity heuristics.
function checkQuestionFidelity(q: PastPaperQuestion): AuditCheckResult {
  const issues: string[] = [];
  if (!q.question || q.question.trim().length < 5) issues.push('Question text missing or too short.');
  if (/[$₹€£]/.test(q.question) && !/dollars?|cents?|\$/i.test(q.question + (q.title || '')))
    issues.push('Currency symbol present without context.');
  if (/\\frac|\\sqrt|\\cdot|\$\$/.test(q.question))
    issues.push('LaTeX detected — must use plain Unicode math symbols.');
  if (!q.title || q.title.length < 3) issues.push('Title missing.');
  if (typeof q.marks !== 'number' || q.marks < 0) issues.push('Marks missing/invalid.');
  return {
    checkType: 'question_fidelity',
    status: issues.length ? 'warning' : 'pass',
    notes: issues.length ? issues.join(' ') : 'Wording, symbols and metadata pass deterministic checks. Confirm against QP scan via AI vision.',
    findings: { issues },
  };
}

function checkDiagramFidelity(q: PastPaperQuestion): AuditCheckResult {
  const needsDiagram = /diagram|chart|graph|figure|shown|grid|triangle|circle|venn|scatter|sector|parallelogram|rectangle|cylinder/i.test(
    q.question + ' ' + (q.title || ''),
  );
  const hasDiagramHook = !!q.image || !!q.diagramParts?.length;
  if (!needsDiagram && !hasDiagramHook) {
    return {
      checkType: 'diagram_fidelity',
      status: 'pass',
      notes: 'No diagram required.',
      findings: { needsDiagram, hasDiagramHook },
    };
  }
  if (needsDiagram && !hasDiagramHook) {
    return {
      checkType: 'diagram_fidelity',
      status: 'fail',
      notes: 'Question references a diagram/figure but no image or interactive diagram is wired.',
      findings: { needsDiagram, hasDiagramHook },
    };
  }
  return {
    checkType: 'diagram_fidelity',
    status: 'warning',
    notes: 'Diagram hook present. Confirm scale/labels/interactivity match QP via AI vision.',
    findings: { needsDiagram, hasDiagramHook },
  };
}

function checkWorkspaceScaffolding(q: PastPaperQuestion): AuditCheckResult {
  const issues: string[] = [];
  const stages = q.equationStages ?? [];
  const stagesMap = q.equationStagesMap ?? {};
  const allStages = [...stages, ...Object.values(stagesMap).flat()];
  for (const s of allStages) {
    for (const el of s.elements ?? []) {
      if (el.type === 'text' && el.value && /[a-zA-Z]{6,}/.test(el.value) && !/cents|dollars|km|cm|mm|mins?|hours?|minutes?|hrs?/i.test(el.value)) {
        issues.push(`Stage "${s.label}" contains long instructional text "${el.value}" — should be a fillable box.`);
      }
    }
  }
  if (q.type === 'multi-part' && !q.parts?.length)
    issues.push('multi-part question has no parts[] declared.');
  return {
    checkType: 'workspace_scaffolding',
    status: issues.length ? 'warning' : 'pass',
    notes: issues.length ? issues.join(' ') : 'Scaffolding looks clean (boxes-only).',
    findings: { issues, stageCount: allStages.length },
  };
}

function checkWorkCoverage(q: PastPaperQuestion): AuditCheckResult {
  const stages = q.equationStages ?? [];
  const stagesMap = q.equationStagesMap ?? {};
  const allStages = [...stages, ...Object.values(stagesMap).flat()];
  // Check Work is wired automatically per stepKey by EquationSolveWorkspace.
  if (allStages.length === 0) {
    return {
      checkType: 'check_work_coverage',
      status: 'pass',
      notes: 'No multi-step workspace — Check Work runs against the final answer.',
      findings: {},
    };
  }
  const missingKeys = allStages.filter((s) => !s.stepKey).map((s) => s.label);
  if (missingKeys.length) {
    return {
      checkType: 'check_work_coverage',
      status: 'fail',
      notes: `Stages missing stepKey (Check Work won't trigger): ${missingKeys.join(', ')}`,
      findings: { missingKeys },
    };
  }
  return {
    checkType: 'check_work_coverage',
    status: 'pass',
    notes: `${allStages.length} stage(s) all carry a stepKey — Check Work wired everywhere.`,
    findings: { stageCount: allStages.length },
  };
}

function checkSubmitValidation(q: PastPaperQuestion): AuditCheckResult {
  const issues: string[] = [];
  if (q.answer === undefined || q.answer === null) {
    issues.push('No answer key defined.');
  } else if (typeof q.answer === 'object') {
    const keys = Object.keys(q.answer);
    if (!keys.length) issues.push('Answer object is empty.');
    if (q.parts) {
      for (const p of q.parts) {
        if (!(p.key in (q.answer as Record<string, string>))) {
          issues.push(`Missing answer for part "${p.key}".`);
        }
      }
    }
  }
  if (!q.markingCriteria || !Object.keys(q.markingCriteria).length) {
    issues.push('No markingCriteria — Submit feedback will not reflect MS rules.');
  }
  return {
    checkType: 'submit_validation',
    status: issues.length ? 'warning' : 'pass',
    notes: issues.length ? issues.join(' ') : 'Answer keys and marking criteria present.',
    findings: { issues },
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
