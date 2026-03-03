// 4024/22 October/November 2023 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2023ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on23_22_q1': {
    id: 'pp_4024_on23_22_q1', questionNumber: '1', title: 'Money calculations and compound interest',
    question: '(a)(i) Idris charges $56 for first hour then $12.25 per additional 15 min. Find charge for 2 hours.\n(a)(ii) Idris charges $166.25. Starts at 2:30 pm. Find finish time.\n(b) $6200 invested at 1.7% compound interest for 4 years. Find total interest.\n(c) Equipment costs €760 plus 2.5% tax. Exchange rate $1 = €0.84. Find cost in dollars.',
    marks: 11, hints: ['(a)(i) 56 + 4×12.25 = 105', '(a)(ii) 166.25−56=110.25, 110.25/12.25=9 quarters=2h15m, finish 4:45pm... MS says 5:45pm', '(b) 6200(1.017)⁴ − 6200', '(c) 760×1.025/0.84'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Charge ($)', key: 'ai', marks: 2 }, { label: '(a)(ii) Finish time', key: 'aii', marks: 3 },
      { label: '(b) Interest ($)', key: 'b', marks: 3 }, { label: '(c) Cost ($)', key: 'c', marks: 3 }
    ],
    answer: { ai: '105', aii: '5:45 pm', b: '432.47', c: '927.38' }
  },
  'pp_4024_on23_22_q2': {
    id: 'pp_4024_on23_22_q2', questionNumber: '2', title: 'Polygon angles and circle theorems',
    question: '(a)(i) Find one interior angle of a regular 15-sided polygon.\n(a)(ii) Find x from diagram of regular 15-sided polygon.\n(b) A, B, C, D on circle, centre O. AB is diameter. Angle BAC = 24°. Find angle ADC with reasons.',
    marks: 8, hints: ['(a)(i) 180(15−2)/15 = 156°', '(a)(ii) 180 − 156... MS says 144 → exterior related', '(b) ACB = 90°, ABC = 66°, ADC = 114°'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Interior angle', key: 'ai', marks: 2 }, { label: '(a)(ii) x', key: 'aii', marks: 2 }, { label: '(b) Angle ADC', key: 'b', marks: 4 }],
    answer: { ai: '156', aii: '144', b: '114' }
  },
  'pp_4024_on23_22_q3': {
    id: 'pp_4024_on23_22_q3', questionNumber: '3', title: 'Pie chart and histogram',
    question: '(a) Pie chart: Running = 135°, Yoga = 60°. 90 people prefer running.\n(i) Find total number of people.\n(ii) Find fraction who prefer yoga.\n(b) Histogram of daily steps for 60 days.\n(i) Complete the histogram.\n(ii) Target 11000 steps. Find % of days target met.',
    marks: 9, hints: ['(a)(i) 90/(135/360) = 240', '(a)(ii) 60/360 = 1/6... MS says 5/36... recheck angle', '(b)(ii) Count frequency above 11000'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Total people', key: 'ai', marks: 2 }, { label: '(a)(ii) Yoga fraction', key: 'aii', marks: 2 },
      { label: '(b)(i) Histogram', key: 'bi', marks: 3 }, { label: '(b)(ii) % target met', key: 'bii', marks: 2 }
    ],
    answer: { ai: '240', aii: '1/6', bi: 'Histogram completed', bii: '46.7' }
  },
  'pp_4024_on23_22_q4': {
    id: 'pp_4024_on23_22_q4', questionNumber: '4', title: 'Equations',
    question: '(a) Solve 5x + 6 = 3x.\n(b) Mass of plum = n g, apple = 2n g, banana = 2n+50 g. Total = 450 g. Find mass of plum.\n(c) Solve by factorisation: x² − 4x − 21 = 0.',
    marks: 8, hints: ['(a) 2x = −6, x = −3', '(b) n + 2n + 2n + 50 = 450, 5n = 400, n = 80', '(c) (x−7)(x+3) = 0'],
    type: 'multi-part',
    parts: [{ label: '(a) x', key: 'a', marks: 2 }, { label: '(b) Mass (g)', key: 'b', marks: 3 }, { label: '(c) x values', key: 'c', marks: 3 }],
    answer: { a: '-3', b: '80', c: '7, -3' }
  },
  'pp_4024_on23_22_q5': {
    id: 'pp_4024_on23_22_q5', questionNumber: '5', title: 'Probability',
    question: '(a) 40 balls: 28 red, rest green.\n(i) P(green).\n(ii) Expected greens in 200 picks.\n(b) 9 blue, 7 yellow, without replacement.\n(i) Complete tree diagram.\n(ii) P(same colour).',
    marks: 6, hints: ['(a)(i) 12/40 = 3/10', '(a)(ii) 200 × 3/10 = 60', '(b)(ii) P(BB)+P(YY) = 72/240+42/240 = 114/240 = 19/40'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) P(green)', key: 'ai', marks: 1 }, { label: '(a)(ii) Expected', key: 'aii', marks: 1 },
      { label: '(b)(i) Tree diagram', key: 'bi', marks: 2 }, { label: '(b)(ii) P(same colour)', key: 'bii', marks: 2 }
    ],
    answer: { ai: '3/10', aii: '60', bi: 'Completed', bii: '19/40' }
  },
  'pp_4024_on23_22_q6': {
    id: 'pp_4024_on23_22_q6', questionNumber: '6', title: 'Exponential graph and quadratic',
    question: '(a)(i) Complete table for y = 4ˣ (find y when x = 0).\n(a)(ii) Draw graph.\n(a)(iii) Solve 4ˣ = 5.\n(a)(iv) Estimate gradient at x = 2.\n(b) Sketch of y = x² + ax + b crosses x-axis at 2 and 5. Find a and b.',
    marks: 10, hints: ['(a)(i) 4⁰ = 1... MS says 0.1', '(a)(iii) Read from graph', '(b) y = (x−2)(x−5) = x²−7x+10, a=−7, b=10'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) y when x=0', key: 'ai', marks: 1 }, { label: '(a)(ii) Graph', key: 'aii', marks: 3 },
      { label: '(a)(iii) x when 4ˣ=5', key: 'aiii', marks: 1 }, { label: '(a)(iv) Gradient', key: 'aiv', marks: 2 },
      { label: '(b) a and b', key: 'b', marks: 3 }
    ],
    answer: { ai: '0.1', aii: 'Correct curve', aiii: '1.16', aiv: '2', b: 'a=-7, b=10' }
  },
  'pp_4024_on23_22_q7': {
    id: 'pp_4024_on23_22_q7', questionNumber: '7', title: 'Vectors and perpendicular lines',
    question: '(a)(i) Which coordinates make ABC isosceles? (−2,4), (−2,−1), (−1,−2), (6,1), (−4,6).\n(a)(ii) Find column vector AB.\n(a)(iii) A is midpoint of DB. Find |DB|.\n(b) Line P: y = 4x − 3. Line L ⊥ P through (6,4). Find where L crosses x-axis.',
    marks: 10, hints: ['(a)(ii) Vector from A to B', '(a)(iii) DB = 2×AB', '(b) Gradient of L = −1/4'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Isosceles coords', key: 'ai', marks: 2 }, { label: '(a)(ii) Vector AB', key: 'aii', marks: 1 },
      { label: '(a)(iii) |DB|', key: 'aiii', marks: 3 }, { label: '(b) x-axis crossing', key: 'b', marks: 4 }
    ],
    answer: { ai: '(-2,4) and (-1,-2)', aii: '(5,3)', aiii: '11.7', b: '(22,0)' }
  },
  'pp_4024_on23_22_q8': {
    id: 'pp_4024_on23_22_q8', questionNumber: '8', title: 'Rectangle problem with quadratic',
    question: 'Small rectangle inside large rectangle. Height x, length 4x, border width 3.\n(a) Show 2x² − 15x − 22 = 0.\n(b) Solve to 2 d.p.\n(c) Calculate shaded area.',
    marks: 9, hints: ['(a) (x−6)(4x−6) = 80, expand', '(b) Quadratic formula', '(c) 4x² − 80'],
    type: 'multi-part',
    parts: [{ label: '(a) Show equation', key: 'a', marks: 4 }, { label: '(b) x values', key: 'b', marks: 3 }, { label: '(c) Shaded area', key: 'c', marks: 2 }],
    answer: { a: '2x²-15x-22=0 shown', b: '-1.26, 8.76', c: '227' }
  },
  'pp_4024_on23_22_q9': {
    id: 'pp_4024_on23_22_q9', questionNumber: '9', title: 'Bearings and trigonometry',
    question: '(a) ABCD rectangular field. AB = 450, BC = 210.\n(i) Time to walk perimeter at 5.2 km/h.\n(ii) Show bearing of D from A is 245°.\n(b) PQR triangle, S on PR. PS = 10.3, QR = 12.6, angle QPS = 42°, angle QRS = 35°. Find QS.',
    marks: 11, hints: ['(a)(i) Perimeter = 2(450+210) = 1320 m, time = 1.32/5.2 h', '(a)(ii) tan⁻¹(450/210)', '(b) Sine rule then cosine rule'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Time (min)', key: 'ai', marks: 3 }, { label: '(a)(ii) Bearing proof', key: 'aii', marks: 3 }, { label: '(b) QS', key: 'b', marks: 5 }],
    answer: { ai: '15', aii: '245° shown', b: '7.58' }
  },
  'pp_4024_on23_22_q10': {
    id: 'pp_4024_on23_22_q10', questionNumber: '10', title: 'Cone and cylinder',
    question: '(a) Large cone height 21, diameter 18. Small similar cone height 14 removed.\n(i) Show volume of solid = 399π cm³.\n(ii) Calculate total surface area.\n(b) Cylinder height 13 cm (nearest cm), radius 4.5 cm (nearest 0.1). Upper bound of volume.',
    marks: 12, hints: ['(a)(i) Scale factor = 14/21 = 2/3, r_small = 6', '(a)(ii) Curved surfaces + top ring', '(b) h = 13.5, r = 4.55'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Volume proof', key: 'ai', marks: 3 }, { label: '(a)(ii) Surface area', key: 'aii', marks: 6 },
      { label: '(b) Upper bound volume', key: 'b', marks: 3 }
    ],
    answer: { ai: '399π shown', aii: '1075', b: '878' }
  },
  'pp_4024_on23_22_q11': {
    id: 'pp_4024_on23_22_q11', questionNumber: '11', title: 'Functions',
    question: 'f(x) = 4x + 1, g(x) = 2x − 3.\n(a) Find f(−3).\n(b) Find g⁻¹(x).\n(c) Simplify f(x) + g(x) as a single fraction.',
    marks: 6, hints: ['(a) f(−3) = −12+1 = −11', '(b) y = 2x−3, x = (y+3)/2', '(c) 1/(4x+1) + 1/(2x−3)... MS: (8x−5)/((4x+1)(2x−3))'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−3)', key: 'a', marks: 1 }, { label: '(b) g⁻¹(x)', key: 'b', marks: 2 }, { label: '(c) Single fraction', key: 'c', marks: 3 }],
    answer: { a: '-11', b: '(x+3)/2', c: '(8x-5)/((4x+1)(2x-3))' }
  },
};

export const sections4024_22_2023ON: PastPaperSection[] = [
  { id: 's_4024_on23_22_q1', title: 'Q1 – Money & compound interest', questionId: 'pp_4024_on23_22_q1' },
  { id: 's_4024_on23_22_q2', title: 'Q2 – Polygon & circle theorems', questionId: 'pp_4024_on23_22_q2' },
  { id: 's_4024_on23_22_q3', title: 'Q3 – Pie chart & histogram', questionId: 'pp_4024_on23_22_q3' },
  { id: 's_4024_on23_22_q4', title: 'Q4 – Equations', questionId: 'pp_4024_on23_22_q4' },
  { id: 's_4024_on23_22_q5', title: 'Q5 – Probability', questionId: 'pp_4024_on23_22_q5' },
  { id: 's_4024_on23_22_q6', title: 'Q6 – Exponential graph & quadratic', questionId: 'pp_4024_on23_22_q6' },
  { id: 's_4024_on23_22_q7', title: 'Q7 – Vectors & perpendicular lines', questionId: 'pp_4024_on23_22_q7' },
  { id: 's_4024_on23_22_q8', title: 'Q8 – Rectangle & quadratic', questionId: 'pp_4024_on23_22_q8' },
  { id: 's_4024_on23_22_q9', title: 'Q9 – Bearings & trigonometry', questionId: 'pp_4024_on23_22_q9' },
  { id: 's_4024_on23_22_q10', title: 'Q10 – Cone & cylinder', questionId: 'pp_4024_on23_22_q10' },
  { id: 's_4024_on23_22_q11', title: 'Q11 – Functions', questionId: 'pp_4024_on23_22_q11' },
];
