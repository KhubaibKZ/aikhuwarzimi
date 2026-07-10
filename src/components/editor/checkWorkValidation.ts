import { StepItem, SYMBOLS } from './canvasTypes';

export type BoxVerdict = 'correct' | 'incorrect' | 'empty' | 'unverified';

export type CheckWorkCategory =
  | 'correct'
  | 'incomplete'
  | 'wrong_result'
  | 'wrong_operand'
  | 'percentage_notation'
  | 'arithmetic'
  | 'continuity'
  | 'propagated_error'
  | 'unverified';

export interface BoxEvidence {
  id: string;
  value: string;
  expected: string;
  verdict: BoxVerdict;
  sideIndex: number;
}

export interface StepEvidence {
  verdict: 'correct' | 'incorrect' | 'incomplete' | 'unverified';
  category: CheckWorkCategory;
  boxes: Record<string, BoxEvidence>;
  sideValues: Array<number | null>;
  result: number | null;
  internallyConsistent: boolean | null;
  hasOriginalError: boolean;
  affectedBoxIds: string[];
  summary: string;
}

export interface PreviousStepEvidence {
  result: number | null;
  hasOriginalError: boolean;
}

const STATIC_SYMBOL_CHARS = new Set<string>([...SYMBOLS, ' ', '\t']);

export function isStaticSymbolBox(item: StepItem): boolean {
  if (item.kind !== 'box') return false;
  if (item.size === 'sym') return (item.value ?? '').trim().length > 0;
  const value = (item.value ?? '').trim();
  if (!value || value.length > 4) return false;
  for (const char of value) if (!STATIC_SYMBOL_CHARS.has(char)) return false;
  return true;
}

export function normalizeAnswer(value: string): string {
  return (value ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/,(?=\d{3}(?:\D|$))/g, '')
    .replace(/\*/g, '×')
    .replace(/−/g, '-')
    .replace(/\//g, '÷');
}

export function tokensToJs(expression: string): string {
  let result = expression;
  result = result.replace(/(\d),(?=\d{3}(\D|$))/g, '$1');
  result = result.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  result = result.replace(/π/g, '(Math.PI)');
  result = result.replace(/²/g, '**2').replace(/³/g, '**3').replace(/⁴/g, '**4');
  result = result.replace(/\^\s*([+-]?\d+(?:\.\d+)?)/g, '**$1');
  result = result.replace(/½/g, '(1/2)').replace(/¼/g, '(1/4)').replace(/¾/g, '(3/4)')
    .replace(/⅓/g, '(1/3)').replace(/⅔/g, '(2/3)');
  result = result.replace(/√\s*\(/g, 'Math.sqrt(');
  result = result.replace(/√\s*([0-9.]+)/g, 'Math.sqrt($1)');
  result = result.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');
  return result;
}

export function safeEval(expression: string): number | null {
  if (!expression.trim()) return null;
  const js = tokensToJs(expression);
  const stripped = js.replace(/Math\.sqrt/g, '').replace(/Math\.PI/g, '');
  if (!/^[\d\s+\-*/().,]*$/.test(stripped.replace(/\*\*/g, ''))) return null;
  try {
    // The whitelist above limits evaluation to numeric arithmetic.
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict"; return (${js});`)();
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function approximatelyEqual(a: number, b: number): boolean {
  const tolerance = Math.max(1e-8, Math.max(Math.abs(a), Math.abs(b)) * 1e-8);
  return Math.abs(a - b) <= tolerance;
}

function contextNumbers(questionText: string, previous?: PreviousStepEvidence): number[] {
  const values: number[] = [];
  const matches = questionText.matchAll(/-?\d[\d,]*(?:\.\d+)?\s*%?/g);
  for (const match of matches) {
    const token = match[0].replace(/,/g, '').trim();
    const isPercentage = token.endsWith('%');
    const number = Number(token.replace('%', ''));
    if (!Number.isFinite(number)) continue;
    values.push(number);
    if (isPercentage) values.push(number / 100);
  }
  if (previous?.result !== null && previous?.result !== undefined) values.push(previous.result);
  return values;
}

export function answersEquivalent(student: string, expectedAlternatives: string): boolean {
  const studentNormalized = normalizeAnswer(student);
  if (!studentNormalized) return false;
  return expectedAlternatives.split('|').some((expected) => {
    const expectedNormalized = normalizeAnswer(expected);
    if (studentNormalized === expectedNormalized) return true;
    const studentNumber = safeEval(studentNormalized);
    const expectedNumber = safeEval(expectedNormalized);
    return studentNumber !== null && expectedNumber !== null && approximatelyEqual(studentNumber, expectedNumber);
  });
}

export function collectStepBoxes(items: StepItem[]): Array<{ id: string; expected: string }> {
  const boxes: Array<{ id: string; expected: string }> = [];
  const visit = (list: StepItem[]) => {
    for (const item of list) {
      if (item.kind === 'box' && !isStaticSymbolBox(item)) {
        boxes.push({ id: item.id, expected: item.value ?? '' });
      } else if (item.kind === 'fraction') {
        visit(item.num);
        visit(item.den);
      }
    }
  };
  visit(items);
  return boxes;
}

function renderItems(items: StepItem[], values: Record<string, string>, overrides: Record<string, string> = {}): string {
  return items.map((item) => {
    if (item.kind === 'text') return ` ${item.text} `;
    if (item.kind === 'box') {
      if (isStaticSymbolBox(item)) return ` ${(item.value ?? '').trim()} `;
      const value = (overrides[item.id] ?? values[item.id] ?? '').trim();
      return value ? ` ${value} ` : ' ▢ ';
    }
    return ` ((${renderItems(item.num, values, overrides)})/(${renderItems(item.den, values, overrides)})) `;
  }).join('');
}

export function buildStepExpression(items: StepItem[], values: Record<string, string>): string {
  return renderItems(items, values);
}

interface StepSide {
  items: StepItem[];
  boxIds: string[];
  expression: string;
  value: number | null;
}

function idsIn(items: StepItem[]): string[] {
  return collectStepBoxes(items).map((box) => box.id);
}

function splitItemsOnEquals(items: StepItem[]): StepItem[][] {
  const sides: StepItem[][] = [[]];
  for (const item of items) {
    const separatorText = item.kind === 'text'
      ? item.text
      : item.kind === 'box' && isStaticSymbolBox(item)
        ? item.value ?? ''
        : '';
    if (!separatorText.includes('=')) {
      sides[sides.length - 1].push(item);
      continue;
    }
    const segments = separatorText.split('=');
    segments.forEach((segment, index) => {
      if (segment.trim()) {
        if (item.kind === 'text') sides[sides.length - 1].push({ ...item, text: segment });
        else if (item.kind === 'box') sides[sides.length - 1].push({ ...item, value: segment });
      }
      if (index < segments.length - 1) sides.push([]);
    });
  }
  return sides;
}

function evaluateSides(items: StepItem[], values: Record<string, string>, overrides: Record<string, string> = {}): StepSide[] {
  return splitItemsOnEquals(items).map((sideItems) => {
    const expression = renderItems(sideItems, values, overrides).trim();
    return {
      items: sideItems,
      boxIds: idsIn(sideItems),
      expression,
      value: expression.includes('▢') ? null : safeEval(expression),
    };
  });
}

function hasCalculationOperator(expression: string): boolean {
  const compact = expression.replace(/\s+/g, '');
  return /[×÷+*/]|√|[²³⁴^]/.test(compact) || /\d[-−]\d/.test(compact) || /^[-−]\d/.test(compact);
}

function allNumericSidesAgree(sides: StepSide[]): boolean | null {
  const numeric = sides.filter((side) => side.value !== null);
  if (numeric.length < 2) return null;
  return numeric.every((side) => approximatelyEqual(side.value as number, numeric[0].value as number));
}

function percentageCulprit(
  items: StepItem[],
  values: Record<string, string>,
  boxes: Array<{ id: string; expected: string }>,
  questionText: string,
): string | null {
  const percentageContext = questionText.includes('%') || boxes.some((box) => box.expected.includes('%'));
  for (const box of boxes) {
    const raw = (values[box.id] ?? '').trim();
    if (!/^\d+(?:\.\d+)?$/.test(raw) || raw.includes('%')) continue;
    const number = Number(raw);
    if (!(number > 0 && number <= 100)) continue;
    const adjusted = evaluateSides(items, values, { [box.id]: `${raw}%` });
    if (allNumericSidesAgree(adjusted) === true && (percentageContext || box.expected.length > 0)) return box.id;
  }
  return null;
}

function summaryFor(category: CheckWorkCategory): string {
  switch (category) {
    case 'correct': return 'The current step is mathematically valid and follows the available evidence.';
    case 'incomplete': return 'One or more required fields in the current step are empty.';
    case 'wrong_result': return 'The stated result does not equal the calculation shown before the equals sign.';
    case 'wrong_operand': return 'At least one value used in the calculation does not match the authored mathematical setup.';
    case 'percentage_notation': return 'A percentage has been used as a whole number instead of percentage or decimal notation.';
    case 'arithmetic': return 'The two sides of the current equation are not numerically equal.';
    case 'continuity': return 'The current stated value does not follow from the immediately preceding completed step.';
    case 'propagated_error': return 'This step follows the preceding student result, but that result contains an earlier error.';
    default: return 'There is not enough deterministic mathematical evidence to verify this step.';
  }
}

export function analyzeStep(
  items: StepItem[],
  values: Record<string, string>,
  previous?: PreviousStepEvidence,
  questionText = '',
): StepEvidence {
  const sourceBoxes = collectStepBoxes(items);
  const sides = evaluateSides(items, values);
  const trustedContextValues = contextNumbers(questionText, previous);
  const isSingleSideCalculation = sides.length === 1 && hasCalculationOperator(sides[0]?.expression ?? '');
  const boxes: Record<string, BoxEvidence> = {};
  sourceBoxes.forEach((box) => {
    const value = (values[box.id] ?? '').trim();
    const sideIndex = Math.max(0, sides.findIndex((side) => side.boxIds.includes(box.id)));
    boxes[box.id] = {
      ...box,
      value,
      sideIndex,
      verdict: !value ? 'empty' : box.expected
        ? (answersEquivalent(value, box.expected) ? 'correct' : 'incorrect')
        : 'unverified',
    };
  });

  const finalSideIndex = Math.max(0, sides.length - 1);
  Object.values(boxes).forEach((box) => {
    const isOperand = isSingleSideCalculation || box.sideIndex < finalSideIndex;
    if (box.verdict !== 'unverified' || !isOperand) return;
    const number = safeEval(box.value);
    if (number !== null) {
      box.verdict = trustedContextValues.some((trusted) => approximatelyEqual(number, trusted))
        ? 'correct'
        : 'incorrect';
    }
  });

  const filled = Object.values(boxes).filter((box) => box.verdict !== 'empty');
  const empty = Object.values(boxes).filter((box) => box.verdict === 'empty');
  const directWrong = filled.filter((box) => box.verdict === 'incorrect');
  const sideValues = sides.map((side) => side.value);
  const numericSides = sides.filter((side) => side.value !== null);
  const internallyConsistent = allNumericSidesAgree(sides);
  const lastNumericSide = [...sides].reverse().find((side) => side.value !== null);
  const result = internallyConsistent === false
    ? (lastNumericSide?.value ?? null)
    : sides.length === 1
      ? (sides[0].value ?? null)
      : (lastNumericSide?.value ?? null);

  let category: CheckWorkCategory = 'unverified';
  let affected = new Set(directWrong.map((box) => box.id));

  if (filled.length === 0 || empty.length > 0) {
    category = 'incomplete';
  } else {
    const percentBoxId = internallyConsistent === false
      ? percentageCulprit(items, values, sourceBoxes, questionText)
      : null;

    if (percentBoxId) {
      category = 'percentage_notation';
      affected = new Set([percentBoxId]);
      Object.values(boxes).forEach((box) => {
        if (box.id === percentBoxId) box.verdict = 'incorrect';
        else if (box.expected && answersEquivalent(box.value, box.expected)) box.verdict = 'correct';
      });
    } else if (internallyConsistent === false) {
      const wrongBeforeResult = directWrong.some((box) => box.sideIndex < sides.length - 1);
      if (wrongBeforeResult) {
        category = 'wrong_operand';
      } else {
        category = sides.length >= 2 ? 'wrong_result' : 'arithmetic';
        const resultSide = sides[sides.length - 1];
        if (affected.size === 0) resultSide.boxIds.forEach((id) => affected.add(id));
        resultSide.boxIds.forEach((id) => {
          if (boxes[id]?.verdict === 'unverified') boxes[id].verdict = 'incorrect';
        });
      }
    } else if (numericSides.length === 1 && !hasCalculationOperator(numericSides[0].expression) && previous?.result !== null && previous?.result !== undefined) {
      if (approximatelyEqual(numericSides[0].value as number, previous.result)) {
        if (previous.hasOriginalError) {
          category = 'propagated_error';
          affected = new Set();
          Object.values(boxes).forEach((box) => { if (box.value) box.verdict = 'correct'; });
        } else {
          category = 'correct';
          Object.values(boxes).forEach((box) => { if (box.value) box.verdict = 'correct'; });
        }
      } else {
        category = 'continuity';
        affected = new Set(Object.keys(boxes));
        Object.values(boxes).forEach((box) => { if (box.value) box.verdict = 'incorrect'; });
      }
    } else if (
      previous?.hasOriginalError
      && directWrong.length === 0
      && numericSides.length === 1
      && hasCalculationOperator(numericSides[0].expression)
    ) {
      category = 'propagated_error';
      affected = new Set();
      Object.values(boxes).forEach((box) => { if (box.value && box.verdict === 'unverified') box.verdict = 'correct'; });
    } else if (directWrong.length > 0) {
      category = isSingleSideCalculation
        || directWrong.some((box) => box.sideIndex < Math.max(0, sides.length - 1))
        ? 'wrong_operand'
        : 'wrong_result';
    } else if (
      internallyConsistent === true
      || filled.every((box) => box.verdict === 'correct')
    ) {
      category = 'correct';
      if (internallyConsistent === true) {
        const resultSide = sides[sides.length - 1];
        resultSide.boxIds.forEach((id) => {
          if (boxes[id]?.verdict === 'unverified') boxes[id].verdict = 'correct';
        });
      }
    }
  }

  const incorrect = Object.values(boxes).filter((box) => box.verdict === 'incorrect');
  const hasOriginalError = category !== 'propagated_error' && incorrect.length > 0;
  const verdict: StepEvidence['verdict'] = category === 'incomplete'
    ? 'incomplete'
    : incorrect.length > 0
      ? 'incorrect'
      : category === 'correct' || category === 'propagated_error'
        ? 'correct'
        : 'unverified';

  return {
    verdict,
    category,
    boxes,
    sideValues,
    result,
    internallyConsistent,
    hasOriginalError,
    affectedBoxIds: [...affected],
    summary: summaryFor(category),
  };
}

export function localGuidance(category: CheckWorkCategory, attempt: number): string {
  const direct = attempt >= 3;
  switch (category) {
    case 'correct':
      return 'This step is mathematically consistent. Keep using the same careful reasoning in the next line.';
    case 'incomplete':
      return 'This step is not complete yet. Fill each required box, then check the mathematical relationship again.';
    case 'percentage_notation':
      return direct
        ? 'The percentage is being treated as a whole number here. Rewrite it in percentage or decimal form before applying the operation.'
        : 'Check how you have written the percentage in this step. Ask whether the value should include a percent sign or be expressed as a decimal.';
    case 'wrong_result':
      return direct
        ? 'The result box does not match the operation shown. Recalculate that operation while keeping the verified values unchanged.'
        : 'The issue is in the result of this line, not the verified values before it. Estimate first, then repeat the calculation to catch the slip.';
    case 'wrong_operand':
      return direct
        ? 'A value used before the equals sign does not match the required setup. Return to the question or preceding line and verify that input before calculating.'
        : 'One of the values used in this operation needs another look. Trace each value back to the question or the preceding step.';
    case 'continuity':
      return direct
        ? 'This value does not follow from the immediately preceding completed calculation. Use that line’s result as the starting point and check the required operation.'
        : 'This line breaks the connection with your previous step. Compare what this box represents with the result you had just established.';
    case 'propagated_error':
      return 'This line follows your previous result consistently. The original issue is earlier, so revisit the first highlighted step rather than changing this line at random.';
    case 'arithmetic':
      return 'The two sides of this equation are not equal. Check the operation one part at a time and use an inverse operation to verify it.';
    default:
      return 'This step cannot be verified reliably from the available mathematical information. Check the setup against the question and make your reasoning explicit.';
  }
}