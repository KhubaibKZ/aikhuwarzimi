import { describe, expect, it } from 'vitest';
import { analyzeStep, answersEquivalent } from './checkWorkValidation';
import type { StepItem } from './canvasTypes';

const box = (id: string, expected = ''): StepItem => ({ id, kind: 'box', size: 'sm', value: expected });
const text = (id: string, value: string): StepItem => ({ id, kind: 'text', text: value });

describe('answersEquivalent', () => {
  it('accepts equivalent fractions, decimals, and authored alternatives', () => {
    expect(answersEquivalent('1/4', '0.25')).toBe(true);
    expect(answersEquivalent('0.23', '23%')).toBe(true);
    expect(answersEquivalent('5³', '125|5^3')).toBe(true);
  });
});

describe('analyzeStep', () => {
  it('marks a correct percentage calculation green', () => {
    const items = [box('rate', '23%|0.23'), text('multiply', '×'), box('total', '36400'), text('equals', '='), box('result', '8372')];
    const evidence = analyzeStep(items, { rate: '0.23', total: '36400', result: '8372' }, undefined, 'Find 23% of 36400.');

    expect(evidence.category).toBe('correct');
    expect(Object.values(evidence.boxes).map((item) => item.verdict)).toEqual(['correct', 'correct', 'correct']);
  });

  it('identifies the percentage field when whole-number notation was used', () => {
    const items = [box('rate', '23%|0.23'), text('multiply', '×'), box('total', '36400'), text('equals', '='), box('result', '8372')];
    const evidence = analyzeStep(items, { rate: '23', total: '36400', result: '8372' }, undefined, 'Find 23% of 36400.');

    expect(evidence.category).toBe('percentage_notation');
    expect(evidence.boxes.rate.verdict).toBe('incorrect');
    expect(evidence.boxes.total.verdict).toBe('correct');
    expect(evidence.boxes.result.verdict).toBe('correct');
  });

  it('marks only a wrong result red when operands are verified', () => {
    const items = [box('rate', '0.23'), text('multiply', '×'), box('total', '36400'), text('equals', '='), box('result', '8372')];
    const evidence = analyzeStep(items, { rate: '0.23', total: '36400', result: '8000' });

    expect(evidence.category).toBe('wrong_result');
    expect(evidence.boxes.rate.verdict).toBe('correct');
    expect(evidence.boxes.total.verdict).toBe('correct');
    expect(evidence.boxes.result.verdict).toBe('incorrect');
  });

  it('uses question data to verify operands when authored answers are blank', () => {
    const items = [box('rate'), text('multiply', '×'), box('total'), text('equals', '='), box('result')];
    const evidence = analyzeStep(items, { rate: '0.23', total: '36400', result: '8000' }, undefined, '23% of a population of 36400');

    expect(evidence.category).toBe('wrong_result');
    expect(evidence.boxes.rate.verdict).toBe('correct');
    expect(evidence.boxes.total.verdict).toBe('correct');
    expect(evidence.boxes.result.verdict).toBe('incorrect');
  });

  it('rejects an internally calculable line when a question operand was copied incorrectly', () => {
    const items = [box('whole'), text('minus', '−'), box('part')];
    const evidence = analyzeStep(
      items,
      { whole: '3640', part: '8372' },
      { result: 8372, hasOriginalError: false },
      'Population 36400, 23% aged 18 and under. Find number over 18.',
    );

    expect(evidence.category).toBe('wrong_operand');
    expect(evidence.boxes.whole.verdict).toBe('incorrect');
    expect(evidence.boxes.part.verdict).toBe('correct');
  });

  it('accepts the same line when both operands come from trusted evidence', () => {
    const items = [box('whole'), text('minus', '−'), box('part')];
    const evidence = analyzeStep(
      items,
      { whole: '36400', part: '8372' },
      { result: 8372, hasOriginalError: false },
      'Population 36400, 23% aged 18 and under. Find number over 18.',
    );

    expect(evidence.category).toBe('correct');
    expect(evidence.boxes.whole.verdict).toBe('correct');
    expect(evidence.boxes.part.verdict).toBe('correct');
    expect(evidence.result).toBe(28028);
  });

  it('checks a labelled answer against only the immediately previous result', () => {
    const subtraction = [box('whole', '36400'), text('minus', '−'), box('part', '8372')];
    const prior = analyzeStep(subtraction, { whole: '36400', part: '8372' });
    const labelledAnswer = [text('label', 'Number of people ='), box('answer')];
    const evidence = analyzeStep(labelledAnswer, { answer: '20000' }, { result: prior.result, hasOriginalError: false });

    expect(prior.result).toBe(28028);
    expect(evidence.category).toBe('continuity');
    expect(evidence.boxes.answer.verdict).toBe('incorrect');
  });

  it('accepts the matching continuation from the immediately previous step', () => {
    const items = [text('label', 'Number of people ='), box('answer')];
    const evidence = analyzeStep(items, { answer: '28028' }, { result: 28028, hasOriginalError: false });

    expect(evidence.category).toBe('correct');
    expect(evidence.boxes.answer.verdict).toBe('correct');
  });

  it('keeps a valid propagated line green and points back to the original error', () => {
    const items = [box('whole'), text('minus', '−'), box('part')];
    const evidence = analyzeStep(
      items,
      { whole: '36400', part: '8000' },
      { result: 8000, hasOriginalError: true },
      'Population 36400',
    );

    expect(evidence.category).toBe('propagated_error');
    expect(evidence.verdict).toBe('correct');
    expect(evidence.affectedBoxIds).toEqual([]);
  });

  it('handles roots, powers, negatives, multiple equals, and blanks safely', () => {
    const chain = [box('root'), text('eq1', '='), box('power'), text('eq2', '='), box('number')];
    expect(analyzeStep(chain, { root: '√16', power: '2²', number: '4' }).category).toBe('correct');
    expect(analyzeStep([box('negative', '-5')], { negative: '-5' }).category).toBe('correct');
    expect(analyzeStep(chain, { root: '', power: '2²', number: '4' }).category).toBe('incomplete');
  });
});