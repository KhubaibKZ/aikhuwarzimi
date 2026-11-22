import { describe, expect, it } from 'vitest';
import { pastPapers, pastPaperQuestions } from './pastPaperData';
import { getQuestionSyllabusRef } from './questionTopicMap';

describe('Pre Test – Linear Inequalities', () => {
  it('is registered as a Test paper with 9 questions totaling 25 marks and 40 minutes', () => {
    const paper = pastPapers.find((p) => p.id === 'test_linear_inequalities_pre');
    expect(paper).toBeDefined();
    expect(paper?.category).toBe('Test');
    expect(paper?.duration).toBe('40 minutes');
    expect(paper?.totalMarks).toBe(25);
    expect(paper?.sections).toHaveLength(9);

    const sumMarks = paper!.sections.reduce((sum, s) => {
      const q = pastPaperQuestions[s.questionId];
      expect(q).toBeDefined();
      return sum + q.marks;
    }, 0);
    expect(sumMarks).toBe(25);
  });

  it('maps every question to Topic 2.8 Inequalities', () => {
    const paper = pastPapers.find((p) => p.id === 'test_linear_inequalities_pre')!;
    for (const s of paper.sections) {
      const ref = getQuestionSyllabusRef(s.questionId);
      expect(ref?.subtopicCode).toBe('2.8');
      expect(ref?.subtopicTitle).toBe('Inequalities');
    }
  });
});