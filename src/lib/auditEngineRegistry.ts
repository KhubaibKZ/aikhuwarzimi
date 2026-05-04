// Question IDs whose interactive diagrams are wired EXTERNALLY (in
// PastPaperWorkspace.tsx via question.id === '...' branches), so they
// don't appear on the question's own `diagramParts`/`image` fields.
// Keep this in sync with the per-question diagram switch in PastPaperWorkspace.tsx.
export const EXTERNAL_DIAGRAM_QUESTIONS = new Set<string>([
  // 4024/11 Oct/Nov 2023
  'pp_4024_on23_11_q5',
  'pp_4024_on23_11_q6',
  'pp_4024_on23_11_q9',
  'pp_4024_on23_11_q12',
  'pp_4024_on23_11_q15',
  'pp_4024_on23_11_q16',
  'pp_4024_on23_11_q18',
  'pp_4024_on23_11_q19',
  'pp_4024_on23_11_q23',
]);

// A box "key" is treated as an intermediate working step (not a graded final
// answer) when it has a sub-suffix like "_a", "_b", "_num", "_den" — these are
// intentional zero-mark scaffolding (see project memory: "Workspace Working Steps").
// The graded box for a stage is "<stepKey>_ans" or matches a part key directly.
export function isWorkingStepBoxKey(key: string): boolean {
  return /_(a|b|c|d|e|f|g|h|i|j|num|den|mul)$/.test(key);
}
