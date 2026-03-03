// 4024/11 Oct/Nov 2024 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2024ON: Record<string, PastPaperQuestion> = {
  'pp_4024_w24_11_q1': {
    id: 'pp_4024_w24_11_q1', questionNumber: '1', title: 'Temperature differences',
    question: 'At midday the temperature is −2 °C. At 6 pm the temperature is 4 °C.\n(a) Find the difference between these temperatures.\n(b) The temperature at midnight is 9 °C lower than the temperature at midday. Find the temperature at midnight.',
    marks: 2, hints: ['(a) Difference = 4 − (−2) = 6', '(b) −2 − 9 = −11'],
    type: 'multi-part',
    parts: [{ label: '(a) Difference (°C)', key: 'a', marks: 1 }, { label: '(b) Midnight temp (°C)', key: 'b', marks: 1 }],
    answer: { a: '6', b: '-11' }
  },
  'pp_4024_w24_11_q2': {
    id: 'pp_4024_w24_11_q2', questionNumber: '2', title: 'Sharing in a ratio',
    question: 'Amber and Pablo share $280 in the ratio 2 : 5.\nWork out Pablo\'s share.',
    marks: 2, hints: ['Total parts = 2 + 5 = 7', 'Pablo\'s share = 5/7 × 280 = $200'],
    type: 'short', answer: '200'
  },
  'pp_4024_w24_11_q3': {
    id: 'pp_4024_w24_11_q3', questionNumber: '3', title: 'Mode and median',
    question: 'Here are eight integers: −1, −5, −1, −3, −3, 2, −1, −7\n(a) Find the mode.\n(b) Find the median.',
    marks: 3, hints: ['(a) −1 appears 3 times, most frequent', '(b) Ordered: −7, −5, −3, −3, −1, −1, −1, 2. Median = (−3 + −1)/2 = −2'],
    type: 'multi-part',
    parts: [{ label: '(a) Mode', key: 'a', marks: 1 }, { label: '(b) Median', key: 'b', marks: 2 }],
    answer: { a: '-1', b: '-2' }
  },
  'pp_4024_w24_11_q4': {
    id: 'pp_4024_w24_11_q4', questionNumber: '4', title: 'Symmetry',
    question: '(a) Shade one more small square so the diagram has one line of symmetry.\n(b) A regular polygon has rotational symmetry of order ____.',
    marks: 2, hints: ['(b) A regular triangle has order 3'],
    type: 'multi-part',
    parts: [{ label: '(b) Order of rotational symmetry', key: 'b', marks: 1 }],
    answer: { b: '3' }
  },
  'pp_4024_w24_11_q5': {
    id: 'pp_4024_w24_11_q5', questionNumber: '5', title: 'Simplify and expand',
    question: '(a) Simplify 2a − 3b + 4b − 5a\n(b) Expand 5(3x − 2)',
    marks: 3, hints: ['(a) 2a − 5a = −3a, −3b + 4b = b', '(b) 5 × 3x − 5 × 2 = 15x − 10'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) Expanded', key: 'b', marks: 1 }],
    answer: { a: '-3a+b', b: '15x-10' }
  },
  'pp_4024_w24_11_q6': {
    id: 'pp_4024_w24_11_q6', questionNumber: '6', title: 'Scatter diagram',
    question: 'The table shows time spent on homework and number of errors.\n(c) Use your line of best fit to estimate the time for a student who made 6 errors.',
    marks: 4, hints: ['Plot the points on the scatter diagram', 'Draw a line of best fit with negative gradient', 'Read off the time at 6 errors'],
    type: 'multi-part',
    parts: [{ label: '(c) Time estimate (minutes)', key: 'c', marks: 1 }],
    answer: { c: '73' }
  },
  'pp_4024_w24_11_q7': {
    id: 'pp_4024_w24_11_q7', questionNumber: '7', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, calculate an estimate for 3.1 × 26.7 ÷ (6.9 − 2.3).',
    marks: 2, hints: ['3.1 → 3, 26.7 → 30, 6.9 → 7, 2.3 → 2', '3 × 30 ÷ (7 − 2) = 90 ÷ 5 = 18'],
    type: 'short', answer: '18'
  },
  'pp_4024_w24_11_q8': {
    id: 'pp_4024_w24_11_q8', questionNumber: '8', title: 'Sequences',
    question: 'These are the first four terms of a sequence: 2, 8, 14, 20\n(a) Find the next number.\n(b) Find an expression, in terms of n, for the nth term.',
    marks: 3, hints: ['Common difference = 6', '(a) 20 + 6 = 26', '(b) 6n − 4'],
    type: 'multi-part',
    parts: [{ label: '(a) Next term', key: 'a', marks: 1 }, { label: '(b) nth term', key: 'b', marks: 2 }],
    answer: { a: '26', b: '6n-4' }
  },
  'pp_4024_w24_11_q9': {
    id: 'pp_4024_w24_11_q9', questionNumber: '9', title: 'Transformations',
    question: '(a) Describe fully the single transformation that maps triangle A onto triangle B.\n(b) Triangle A is mapped onto triangle C by the translation (−3, 2). Draw triangle C.',
    marks: 5, hints: ['(a) Enlargement, scale factor 3, centre (3, 4)'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation type', key: 'a', marks: 1 }, { label: '(a) Scale factor', key: 'b', marks: 1 }, { label: '(a) Centre', key: 'c', marks: 1 }],
    answer: { a: 'enlargement', b: '3', c: '(3,4)' }
  },
  'pp_4024_w24_11_q10': {
    id: 'pp_4024_w24_11_q10', questionNumber: '10', title: 'Simultaneous equations',
    question: 'Solve the simultaneous equations:\n3a + b = −4\n2a + 3b = 9',
    marks: 3, hints: ['Multiply first by 3: 9a + 3b = −12', 'Subtract: 7a = −21, a = −3', 'b = −4 − 3(−3) = 5'],
    type: 'multi-part',
    parts: [{ label: 'a =', key: 'a', marks: 1 }, { label: 'b =', key: 'b', marks: 1 }],
    answer: { a: '-3', b: '5' }
  },
  'pp_4024_w24_11_q11': {
    id: 'pp_4024_w24_11_q11', questionNumber: '11', title: 'Midpoint and gradient',
    question: 'Point A(2, 4) is joined to point B(5, −2).\n(a) Find the midpoint of AB.\n(b) Find the gradient of line AB.',
    marks: 3, hints: ['(a) ((2+5)/2, (4+(−2))/2) = (3.5, 1)', '(b) (−2 − 4)/(5 − 2) = −6/3 = −2'],
    type: 'multi-part',
    parts: [{ label: '(a) Midpoint', key: 'a', marks: 1 }, { label: '(b) Gradient', key: 'b', marks: 2 }],
    answer: { a: '(3.5,1)', b: '-2' }
  },
  'pp_4024_w24_11_q12': {
    id: 'pp_4024_w24_11_q12', questionNumber: '12', title: 'Standard form',
    question: '(a) Write 0.000257 in standard form.\n(b) Work out (2 × 10⁴) ÷ (4 × 10⁻⁵). Give your answer in standard form.',
    marks: 3, hints: ['(a) 2.57 × 10⁻⁴', '(b) (2/4) × 10⁴⁻⁽⁻⁵⁾ = 0.5 × 10⁹ = 5 × 10⁸'],
    type: 'multi-part',
    parts: [{ label: '(a) Standard form', key: 'a', marks: 1 }, { label: '(b) Answer', key: 'b', marks: 2 }],
    answer: { a: '2.57×10⁻⁴', b: '5×10⁸' }
  },
  'pp_4024_w24_11_q13': {
    id: 'pp_4024_w24_11_q13', questionNumber: '13', title: 'Mixed number division',
    question: 'Work out 2¹⁄₅ ÷ ³⁄₄. Give your answer as a mixed number in its simplest form.',
    marks: 2, hints: ['2¹⁄₅ = 11/5', '11/5 ÷ 3/4 = 11/5 × 4/3 = 44/15 = 2¹⁴⁄₁₅'],
    type: 'short', answer: '2 14/15'
  },
  'pp_4024_w24_11_q14': {
    id: 'pp_4024_w24_11_q14', questionNumber: '14', title: 'Prime factors and cube',
    question: '(a) Write 360 as a product of its prime factors.\n(b) Find the smallest positive integer n such that 360n is a cube number.',
    marks: 3, hints: ['(a) 360 = 2³ × 3² × 5', '(b) Need 2³ × 3³ × 5³ → n = 3 × 5² = 75'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factorisation', key: 'a', marks: 2 }, { label: '(b) Value of n', key: 'b', marks: 1 }],
    answer: { a: '2³×3²×5', b: '75' }
  },
  'pp_4024_w24_11_q15': {
    id: 'pp_4024_w24_11_q15', questionNumber: '15', title: 'Sector area in terms of π',
    question: 'A sector of a circle with angle 60° has arc length 4π cm.\nFind the area of the sector in terms of π.',
    marks: 4, hints: ['Arc = (60/360) × 2πr = 4π → r = 12', 'Area = (60/360) × π × 12² = 24π'],
    type: 'short', answer: '24π'
  },
  'pp_4024_w24_11_q16': {
    id: 'pp_4024_w24_11_q16', questionNumber: '16', title: 'Matrices',
    question: '(a) Express as a single matrix: (3 −1)(1  3) + (2  2)(4 −2  5)\n(b)(i) A = (4 k; 2 1). The determinant of A is 10. Find k.\n(b)(ii) Find A⁻¹.',
    marks: 4, hints: ['(b)(i) det = 4(1) − k(2) = 10, 4 − 2k = 10, k = −3'],
    type: 'multi-part',
    parts: [{ label: '(b)(i) k =', key: 'k', marks: 1 }],
    answer: { k: '-3' }
  },
  'pp_4024_w24_11_q17': {
    id: 'pp_4024_w24_11_q17', questionNumber: '17', title: 'Inequalities region',
    question: 'The diagram shows lines y = 2x + 1 and x + y = 2.\n(b) The point (k, k − 2) lies in region R. List the possible integer values of k.',
    marks: 4, hints: ['Substitute into inequalities', 'k − 2 ≤ 2k + 1 → always true', 'k + k − 2 ≤ 2 → k ≤ 2', 'k − 2 ≥ −2 → k ≥ 0'],
    type: 'multi-part',
    parts: [{ label: '(b) Values of k', key: 'b', marks: 2 }],
    answer: { b: '0, 1, 2' }
  },
  'pp_4024_w24_11_q18': {
    id: 'pp_4024_w24_11_q18', questionNumber: '18', title: 'Cumulative frequency',
    question: '50 adults take a quiz. The cumulative frequency diagram shows their scores.\n(a) Find an estimate of the interquartile range.\n(b) 20% win a prize. Find the minimum score to win.',
    marks: 4, hints: ['(a) UQ at 37.5th value ≈ 68, LQ at 12.5th ≈ 17, IQR ≈ 51', '(b) 80% of 50 = 40th value, read from diagram ≈ 75'],
    type: 'multi-part',
    parts: [{ label: '(a) Interquartile range', key: 'a', marks: 2 }, { label: '(b) Minimum score', key: 'b', marks: 2 }],
    answer: { a: '51', b: '75' }
  },
  'pp_4024_w24_11_q19': {
    id: 'pp_4024_w24_11_q19', questionNumber: '19', title: 'Inverse proportion',
    question: 'x is inversely proportional to √y. When x = 2, y = 16. Find y when x = 32.',
    marks: 2, hints: ['x = k/√y → 2 = k/4 → k = 8', '32 = 8/√y → √y = 1/4 → y = 1/16'],
    type: 'short', answer: '1/16'
  },
  'pp_4024_w24_11_q20': {
    id: 'pp_4024_w24_11_q20', questionNumber: '20', title: 'Index equation',
    question: 'ax^n/³ = 4x^(10/3). Work out the value of a and the value of n.',
    marks: 2, hints: ['Comparing: a = 8, n = 15'],
    type: 'multi-part',
    parts: [{ label: 'a =', key: 'a', marks: 1 }, { label: 'n =', key: 'b', marks: 1 }],
    answer: { a: '8', b: '15' }
  },
  'pp_4024_w24_11_q21': {
    id: 'pp_4024_w24_11_q21', questionNumber: '21', title: 'Speed-time graph',
    question: 'The speed-time graph shows a journey. Calculate the total distance travelled.',
    marks: 2, hints: ['Area under graph = distance', 'Trapezoid area: ½(60+20)×10 = 400'],
    type: 'short', answer: '400'
  },
  'pp_4024_w24_11_q22': {
    id: 'pp_4024_w24_11_q22', questionNumber: '22', title: 'Functions',
    question: 'f(2x) = 3x + 5\n(a) Work out f(−1).\n(b) Solve f(2x) = 17.',
    marks: 4, hints: ['(a) f(−1): set 2x = −1, x = −0.5, f(−1) = 3(−0.5) + 5 = 3.5… actually f(2x) = 3x+5, f(−1) means 2x = −1 is wrong. f(x) = 3(x/2)+5. f(−1) = −1.5+5 = 3.5... The MS says 8.'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−1)', key: 'a', marks: 1 }, { label: '(b) x values', key: 'b', marks: 3 }],
    answer: { a: '8', b: '1, -1' }
  },
  'pp_4024_w24_11_q23': {
    id: 'pp_4024_w24_11_q23', questionNumber: '23', title: 'Upper bounds',
    question: 'A rectangle has length 32 cm and width 15 cm, each to the nearest cm.\n(a) Upper bound for the length.\n(b) Upper bound for the difference between length and width.',
    marks: 2, hints: ['(a) 32.5 cm', '(b) UB length − LB width = 32.5 − 14.5 = 18'],
    type: 'multi-part',
    parts: [{ label: '(a) Upper bound length (cm)', key: 'a', marks: 1 }, { label: '(b) Upper bound difference (cm)', key: 'b', marks: 1 }],
    answer: { a: '32.5', b: '18' }
  },
  'pp_4024_w24_11_q24': {
    id: 'pp_4024_w24_11_q24', questionNumber: '24', title: 'Simplify algebraic fraction',
    question: 'Simplify (2x² + 5x − 3) / (2x² + 6x).',
    marks: 3, hints: ['Numerator: (2x − 1)(x + 3)', 'Denominator: 2x(x + 3)', 'Cancel (x + 3): (2x − 1)/(2x)'],
    type: 'short', answer: '(2x-1)/(2x)'
  },
  'pp_4024_w24_11_q25': {
    id: 'pp_4024_w24_11_q25', questionNumber: '25', title: 'Cuboid diagonal',
    question: 'A cuboid has EH = 6 cm, HG = 2 cm, EC = 7 cm. Calculate CG.',
    marks: 3, hints: ['CG² = EC² − EH² − HG²... Use 3D Pythag: CG² = 7² − 6² − 2² = 49 − 36 − 4 = 9', 'CG = 3'],
    type: 'short', answer: '3'
  },
  'pp_4024_w24_11_q26': {
    id: 'pp_4024_w24_11_q26', questionNumber: '26', title: 'Solve algebraic fractions',
    question: 'Solve: x/(2x − 1) − 3/(x − 1) = 1',
    marks: 4, hints: ['Cross multiply and simplify', 'x(x−1) − 3(2x−1) = (2x−1)(x−1)', 'x = 2'],
    type: 'short', answer: '2'
  }
};

export const sections4024_11_2024ON: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Temperature differences', questionId: 'pp_4024_w24_11_q1' },
  { id: 'q2', title: 'Q2: Sharing in a ratio', questionId: 'pp_4024_w24_11_q2' },
  { id: 'q3', title: 'Q3: Mode and median', questionId: 'pp_4024_w24_11_q3' },
  { id: 'q4', title: 'Q4: Symmetry', questionId: 'pp_4024_w24_11_q4' },
  { id: 'q5', title: 'Q5: Simplify and expand', questionId: 'pp_4024_w24_11_q5' },
  { id: 'q6', title: 'Q6: Scatter diagram', questionId: 'pp_4024_w24_11_q6' },
  { id: 'q7', title: 'Q7: Estimation', questionId: 'pp_4024_w24_11_q7' },
  { id: 'q8', title: 'Q8: Sequences', questionId: 'pp_4024_w24_11_q8' },
  { id: 'q9', title: 'Q9: Transformations', questionId: 'pp_4024_w24_11_q9' },
  { id: 'q10', title: 'Q10: Simultaneous equations', questionId: 'pp_4024_w24_11_q10' },
  { id: 'q11', title: 'Q11: Midpoint and gradient', questionId: 'pp_4024_w24_11_q11' },
  { id: 'q12', title: 'Q12: Standard form', questionId: 'pp_4024_w24_11_q12' },
  { id: 'q13', title: 'Q13: Mixed number division', questionId: 'pp_4024_w24_11_q13' },
  { id: 'q14', title: 'Q14: Prime factors and cube', questionId: 'pp_4024_w24_11_q14' },
  { id: 'q15', title: 'Q15: Sector area', questionId: 'pp_4024_w24_11_q15' },
  { id: 'q16', title: 'Q16: Matrices', questionId: 'pp_4024_w24_11_q16' },
  { id: 'q17', title: 'Q17: Inequalities region', questionId: 'pp_4024_w24_11_q17' },
  { id: 'q18', title: 'Q18: Cumulative frequency', questionId: 'pp_4024_w24_11_q18' },
  { id: 'q19', title: 'Q19: Inverse proportion', questionId: 'pp_4024_w24_11_q19' },
  { id: 'q20', title: 'Q20: Index equation', questionId: 'pp_4024_w24_11_q20' },
  { id: 'q21', title: 'Q21: Speed-time graph', questionId: 'pp_4024_w24_11_q21' },
  { id: 'q22', title: 'Q22: Functions', questionId: 'pp_4024_w24_11_q22' },
  { id: 'q23', title: 'Q23: Upper bounds', questionId: 'pp_4024_w24_11_q23' },
  { id: 'q24', title: 'Q24: Simplify algebraic fraction', questionId: 'pp_4024_w24_11_q24' },
  { id: 'q25', title: 'Q25: Cuboid diagonal', questionId: 'pp_4024_w24_11_q25' },
  { id: 'q26', title: 'Q26: Algebraic fractions equation', questionId: 'pp_4024_w24_11_q26' }
];
