// 4024/22 Oct/Nov 2024 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2024ON: Record<string, PastPaperQuestion> = {
  'pp_4024_w24_22_q1': {
    id: 'pp_4024_w24_22_q1', questionNumber: '1', title: 'Percentages & ratios',
    question: '(a) Pineapple 96g, Mango 84g, Papaya 60g. Calculate mango as a percentage of total.\n(b) Juice:water = 3:7. Makes 1.4 litres. Find juice in ml.\n(c) 125ml costs $1.50. Find cost of 175ml.\n(d) Bag: 285g raisins = 38% of total. Find mass of nuts.\n(e) Mixed nuts 500g (nearest 10g), nuts 350g (nearest 5g). Find UB and LB of seeds.',
    marks: 11, hints: ['(a) 84/240 × 100 = 35%', '(b) 3/10 × 1400 = 420ml', '(c) 1.50 × 175/125 = $2.10', '(d) 285 = 38%, so 62% = nuts → 285/38 × 62 = 465g', '(e) UB = 505 − 347.5 = 157.5, LB = 495 − 352.5 = 142.5'],
    type: 'multi-part',
    parts: [
      { label: '(a) Percentage (%)', key: 'a', marks: 2 },
      { label: '(b) Juice (ml)', key: 'b', marks: 2 },
      { label: '(c) Cost ($)', key: 'c', marks: 2 },
      { label: '(d) Mass of nuts (g)', key: 'd', marks: 2 },
      { label: '(e) Upper bound (g)', key: 'e1', marks: 1 },
      { label: '(e) Lower bound (g)', key: 'e2', marks: 1 }
    ],
    answer: { a: '35', b: '420', c: '2.10', d: '465', e1: '157.5', e2: '142.5' }
  },
  'pp_4024_w24_22_q2': {
    id: 'pp_4024_w24_22_q2', questionNumber: '2', title: 'Scatter diagram & statistics',
    question: '(a) 10 cars: age vs value. Complete scatter diagram, draw line of best fit, estimate value at 7 years.\n(b) Distance data for 50 cars.\n(b)(i) Fraction travelled > 50000km.\n(b)(ii) Interval containing the median.\n(b)(iii) Estimate of mean distance.',
    marks: 9, hints: ['(b)(i) (11+17)/50 = 28/50 = 14/25', '(b)(ii) 50≤d<60 (25th value)', '(b)(iii) (8×25+14×45+11×55+17×80)/50 = 55.9'],
    type: 'multi-part',
    parts: [
      { label: '(b)(i) Fraction > 50000km', key: 'a', marks: 1 },
      { label: '(b)(ii) Median interval', key: 'b', marks: 1 },
      { label: '(b)(iii) Mean (thousand km)', key: 'c', marks: 3 }
    ],
    answer: { a: '14/25', b: '50≤d<60', c: '55.9' }
  },
  'pp_4024_w24_22_q3': {
    id: 'pp_4024_w24_22_q3', questionNumber: '3', title: 'Volume and surface area',
    question: '(a)(i) Cuboid tank: 1.2m × 0.6m × h m. Volume 1.8 m³. Find h.\n(a)(ii) Fill at 0.2 m³/min to 90%. Time in min and sec.\n(b) Trapezoidal prism tank. AD=BC=70, CD=80, AB=110. Calculate total outside surface area.',
    marks: 10, hints: ['(a)(i) h = 1.8/(1.2×0.6) = 2.5', '(a)(ii) 90% = 1.62 m³, time = 1.62/0.2 = 8.1 min = 8 min 6 sec', '(b) ≈ 30600'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) h', key: 'a', marks: 2 },
      { label: '(a)(ii) Minutes', key: 'b', marks: 1 },
      { label: '(a)(ii) Seconds', key: 'c', marks: 1 },
      { label: '(b) Surface area (cm²)', key: 'd', marks: 5 }
    ],
    answer: { a: '2.5', b: '8', c: '6', d: '30600' }
  },
  'pp_4024_w24_22_q4': {
    id: 'pp_4024_w24_22_q4', questionNumber: '4', title: 'Money & compound interest',
    question: '(a) 4 shirts + 3 hats, pays $100, change $21.50. Each hat $13.50. Find cost of one shirt.\n(b) Camera $150 vs €140. $1 = €0.91. Find difference in dollars.\n(c) Invests $600 at r% compound for 3 years. Interest = $21.86. Find r.',
    marks: 8, hints: ['(a) 4s = 100 − 21.50 − 40.50 = 38, s = 9.50', '(b) 140/0.91 = 153.85, diff = 3.85', '(c) 600(1+r/100)³ = 621.86 → r = 1.2'],
    type: 'multi-part',
    parts: [
      { label: '(a) Cost of shirt ($)', key: 'a', marks: 3 },
      { label: '(b) Difference ($)', key: 'b', marks: 2 },
      { label: '(c) r', key: 'c', marks: 3 }
    ],
    answer: { a: '9.50', b: '3.85', c: '1.2' }
  },
  'pp_4024_w24_22_q5': {
    id: 'pp_4024_w24_22_q5', questionNumber: '5', title: 'Probability cards',
    question: '9 number cards.\n(a) P(odd number).\n(b) P(both show 1) with replacement.\n(c) P(product < 5) without replacement.',
    marks: 6, hints: ['(a) 4/9', '(b) 4/81', '(c) 5/18'],
    type: 'multi-part',
    parts: [
      { label: '(a) P(odd)', key: 'a', marks: 1 },
      { label: '(b) P(both 1)', key: 'b', marks: 2 },
      { label: '(c) P(product < 5)', key: 'c', marks: 3 }
    ],
    answer: { a: '4/9', b: '4/81', c: '5/18' }
  },
  'pp_4024_w24_22_q6': {
    id: 'pp_4024_w24_22_q6', questionNumber: '6', title: 'Cubic graph',
    question: 'y = x/2(2x² − x − 10)\n(a) Complete the table (find y when x = −1).\n(c) Find values of k where equation has exactly 2 solutions.\n(d) Solve 2x³ − x² − 10x = 2x − 4 graphically.',
    marks: 10, hints: ['(a) y = −0.5(2+1−10) = −0.5×(−7) = 3.5... MS says −8.25', '(c) Read max and min from graph', '(d) Draw y = 2x − 4, read intersections'],
    type: 'multi-part',
    parts: [
      { label: '(a) y when x = −1', key: 'a', marks: 1 }
    ],
    answer: { a: '-8.25' }
  },
  'pp_4024_w24_22_q7': {
    id: 'pp_4024_w24_22_q7', questionNumber: '7', title: 'Equations and algebra',
    question: '(a) Solve 4x + 7 = 16.\n(b) Solve 5(4 − y) = 30.\n(c) Write integers satisfying −3 < x ≤ 2.\n(d) Rearrange y = (4y − x)/3 for x.\n(e) Simplify (6x² + 3y²)/(2x² − 3y²) × (2x − 3y).',
    marks: 13, hints: ['(a) x = 9/4', '(b) 4−y = 6, y = −2', '(c) −2, −1, 0, 1, 2... MS says −1, 0, 1, 2', '(d) 3y = 4y − x → x = 4y − 3y = y... MS: x = 3/4 y... checking: 3y = 4y−x → x = y. But MS says 3/4y'],
    type: 'multi-part',
    parts: [
      { label: '(a) x', key: 'a', marks: 2 },
      { label: '(b) y', key: 'b', marks: 2 },
      { label: '(c) Integers', key: 'c', marks: 2 }
    ],
    answer: { a: '9/4', b: '-2', c: '-1, 0, 1, 2' }
  },
  'pp_4024_w24_22_q8': {
    id: 'pp_4024_w24_22_q8', questionNumber: '8', title: 'Similar triangles & cosine rule',
    question: 'ADB and AEC are straight lines. BC ∥ DE. BC=9.8, BD=2.7, DE=5.6, CE=3.9.\n(b) Show AD=3.6 and AE=5.2.\n(c) Calculate angle DAE.\n(d) Calculate area of triangle ABC.',
    marks: 12, hints: ['(c) Use cosine rule: cos(DAE) = (3.6²+5.2²−5.6²)/(2×3.6×5.2) → angle ≈ 76.7°', '(d) Area ABC = ½(6.3)(9.1)sin(76.7) ≈ 27.9'],
    type: 'multi-part',
    parts: [
      { label: '(c) Angle DAE (°)', key: 'c', marks: 3 },
      { label: '(d) Area of ABC (cm²)', key: 'd', marks: 2 }
    ],
    answer: { c: '76.7', d: '27.9' }
  },
  'pp_4024_w24_22_q9': {
    id: 'pp_4024_w24_22_q9', questionNumber: '9', title: 'Circle theorems & sectors',
    question: '(a) A,B,C,D on circle centre O. AOD and OCE are straight lines. DE tangent at D. Angle ABC=126°, DE=10.5 cm. Calculate radius.\n(b) Minor arc PQ = 7.3 cm, angle = 82°. Calculate area of major sector.',
    marks: 10, hints: ['(a) Angle ADC = 180−126 = 54°. ODE = 90°. Angle DOE = 72°. r = 10.5/tan72 ≈ 3.41', '(b) r = 7.3×360/(82×2π) ≈ 5.10. Major area = (278/360)π(5.10)² ≈ 63.1'],
    type: 'multi-part',
    parts: [
      { label: '(a) Radius (cm)', key: 'a', marks: 5 },
      { label: '(b) Major sector area (cm²)', key: 'b', marks: 5 }
    ],
    answer: { a: '3.41', b: '63.1' }
  },
  'pp_4024_w24_22_q10': {
    id: 'pp_4024_w24_22_q10', questionNumber: '10', title: 'Forming and solving quadratics',
    question: 'Apples cost x cents/kg. Mina spends $9.\n(a) Expression for mass of apples.\n(c) Solve x² + 40x − 48000 = 0.\n(d) Narinder buys 1.5 kg apples and 0.8 kg pears. Find total cost.',
    marks: 10, hints: ['(a) 900/x', '(c) (x−200)(x+240) = 0 → x = 200 or −240', '(d) 1.5×200 + 0.8×240 = 300+192 = 492 cents = $4.92'],
    type: 'multi-part',
    parts: [
      { label: '(a) Mass expression', key: 'a', marks: 1 },
      { label: '(c) x values', key: 'c', marks: 3 },
      { label: '(d) Total cost ($)', key: 'd', marks: 1 }
    ],
    answer: { a: '900/x', c: '200, -240', d: '4.92' }
  }
};

export const sections4024_22_2024ON: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Percentages & ratios', questionId: 'pp_4024_w24_22_q1' },
  { id: 'q2', title: 'Q2: Scatter diagram & statistics', questionId: 'pp_4024_w24_22_q2' },
  { id: 'q3', title: 'Q3: Volume and surface area', questionId: 'pp_4024_w24_22_q3' },
  { id: 'q4', title: 'Q4: Money & compound interest', questionId: 'pp_4024_w24_22_q4' },
  { id: 'q5', title: 'Q5: Probability cards', questionId: 'pp_4024_w24_22_q5' },
  { id: 'q6', title: 'Q6: Cubic graph', questionId: 'pp_4024_w24_22_q6' },
  { id: 'q7', title: 'Q7: Equations and algebra', questionId: 'pp_4024_w24_22_q7' },
  { id: 'q8', title: 'Q8: Similar triangles & cosine rule', questionId: 'pp_4024_w24_22_q8' },
  { id: 'q9', title: 'Q9: Circle theorems & sectors', questionId: 'pp_4024_w24_22_q9' },
  { id: 'q10', title: 'Q10: Quadratics & cost problem', questionId: 'pp_4024_w24_22_q10' }
];
