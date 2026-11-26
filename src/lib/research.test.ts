import { describe, expect, it } from 'vitest';
import { researchCurrent, researchMetrics, type ResearchSubmission } from './research';
import type { SubmitProgressPayload } from '@/components/PastPaperWorkspace';

const attempt = (id: string, question: string, reset: string | null = null): ResearchSubmission => ({
  id, question_id: question, paper_id: 'test_linear_inequalities_pre', submitted_at: '2026-11-26T14:14:00Z', reset_at: reset,
  payload: { questionId: question, marksObtained: 2, marksAvailable: 2, timeSpentSeconds: 60, aiUsageCount: 2, checkworkCount: 1 } as SubmitProgressPayload,
});
describe('Research participant progress', () => {
  it('preserves all attempts but uses only the current submission after a per-question reset', () => {
    const rows = [attempt('old', 'q1', '2026-11-26T14:15:00Z'), attempt('new', 'q1'), attempt('other', 'q2')];
    expect(researchCurrent(rows).q1.id).toBe('new');
    expect(researchMetrics(rows).attempts).toBe(3);
    expect(researchMetrics(rows).solved).toBe(2);
  });
  it('computes marks, accuracy, time and AI usage from stored participant submissions', () => {
    const m = researchMetrics([attempt('1', 'q1'), attempt('2', 'q2')]);
    expect(m.marks).toBe(4); expect(m.accuracy).toBe(100);
    expect(m.time).toBe(120); expect(m.averageTime).toBe(60);
    expect(m.hints).toBe(4); expect(m.checks).toBe(2);
    expect(m.adi).toBeCloseTo(2 / Math.log10(11));
  });
});