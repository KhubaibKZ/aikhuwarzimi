// 4024/11 May/June 2023 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2023: Record<string, PastPaperQuestion> = {
  'pp_4024_s23_11_q1': {
    id: 'pp_4024_s23_11_q1', questionNumber: '1', title: 'Division and fractions',
    question: '(a) Work out 1234.4 ÷ 8\n(b) Work out ³⁄₇ of 56',
    marks: 2, hints: ['(a) 1234.4 ÷ 8 = 154.3', '(b) 56 ÷ 7 = 8, then 8 × 3 = 24'],
    type: 'multi-part',
    parts: [{ label: '(a) 1234.4 ÷ 8', key: 'a', marks: 1 }, { label: '(b) ³⁄₇ of 56', key: 'b', marks: 1 }],
    answer: { a: '154.3', b: '24' }
  },
  'pp_4024_s23_11_q2': {
    id: 'pp_4024_s23_11_q2', questionNumber: '2', title: 'Fractions and square roots',
    question: '(a) Write down the fraction of this 3 × 3 square that is shaded.\n(b) Evaluate √0.25.',
    marks: 2, hints: ['(a) Count shaded squares out of 9', '(b) √0.25 = 0.5'],
    type: 'multi-part',
    parts: [{ label: '(a) Fraction shaded', key: 'a', marks: 1 }, { label: '(b) √0.25', key: 'b', marks: 1 }],
    answer: { a: '1/3', b: '0.25' }
  },
  'pp_4024_s23_11_q3': {
    id: 'pp_4024_s23_11_q3', questionNumber: '3', title: 'Angles at a point and equilateral triangle',
    question: '(a) Four straight lines meet at a point. Angles are 40°, 120°, x° and another. Find x.\n(b) ABC is a straight line and BCD is an equilateral triangle. Find y.',
    marks: 2, hints: ['(a) Angles at a point sum to 360°, also use vertically opposite', '(b) Equilateral triangle has 60° angles, angles on a straight line sum to 180°'],
    type: 'multi-part',
    parts: [{ label: '(a) x', key: 'a', marks: 1 }, { label: '(b) y', key: 'b', marks: 1 }],
    answer: { a: '110', b: '120' }
  },
  'pp_4024_s23_11_q4': {
    id: 'pp_4024_s23_11_q4', questionNumber: '4', title: 'Algebraic expressions and substitution',
    question: '(a)(i) Benjamin\'s age is t years. Maryam is 5 years younger. Write an expression for Maryam\'s age.\n(a)(ii) Colin\'s age is twice Benjamin\'s age. Write an expression for Colin\'s age.\n(b) Given a = 3 and b = −2, evaluate 5a − 2b.',
    marks: 3, hints: ['(a)(i) t − 5', '(a)(ii) 2t', '(b) 5(3) − 2(−2) = 15 + 4 = 19'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Maryam\'s age', key: 'ai', marks: 1 }, { label: '(a)(ii) Colin\'s age', key: 'aii', marks: 1 }, { label: '(b) 5a − 2b', key: 'b', marks: 1 }],
    answer: { ai: 't-5', aii: '2t', b: '19' }
  },
  'pp_4024_s23_11_q5': {
    id: 'pp_4024_s23_11_q5', questionNumber: '5', title: 'Order of operations',
    question: '(a) Insert one set of brackets to make the calculation correct: 3 + 5 × 2 − 7 = 9\n(b) Insert +, − and × to make the calculation correct: 3 __ 5 __ 2 __ 7 = 20',
    marks: 2, hints: ['(a) (3 + 5) × 2 − 7 = 16 − 7 = 9', '(b) 3 × 5 − 2 + 7 = 15 − 2 + 7 = 20'],
    type: 'multi-part',
    parts: [{ label: '(a) Bracketed expression', key: 'a', marks: 1 }, { label: '(b) Operators', key: 'b', marks: 1 }],
    answer: { a: '(3+5)×2−7', b: '3×5−2+7' }
  },
  'pp_4024_s23_11_q6': {
    id: 'pp_4024_s23_11_q6', questionNumber: '6', title: 'Symmetry',
    question: '(a) Complete the pattern so that AB is the only line of symmetry.\n(b) A hexagon has rotational symmetry of order 6 and perimeter 30 cm. Draw a sketch labelling the lengths of the sides.',
    marks: 2, hints: ['(a) Reflect the pattern across line AB', '(b) Regular hexagon: 6 equal sides, each 30 ÷ 6 = 5 cm'],
    type: 'multi-part',
    parts: [{ label: '(a) Completed pattern', key: 'a', marks: 1 }, { label: '(b) Side length (cm)', key: 'b', marks: 1 }],
    answer: { a: 'Reflected pattern', b: '5' }
  },
  'pp_4024_s23_11_q7': {
    id: 'pp_4024_s23_11_q7', questionNumber: '7', title: 'Ordering negative numbers',
    question: '(a) Write these temperatures in order from coldest to hottest: −18, −21, −2, 17, −10\n(b) Work out the temperature that is 5 °C colder than −18 °C.',
    marks: 2, hints: ['(a) Most negative first', '(b) −18 − 5 = −23'],
    type: 'multi-part',
    parts: [{ label: '(a) Order (coldest first)', key: 'a', marks: 1 }, { label: '(b) Temperature (°C)', key: 'b', marks: 1 }],
    answer: { a: '-21, -18, -10, -2, 17', b: '-23' }
  },
  'pp_4024_s23_11_q8': {
    id: 'pp_4024_s23_11_q8', questionNumber: '8', title: 'Ratio',
    question: 'A rope is cut into three pieces with lengths in the ratio 3 : 5 : 4. The length of the shortest piece is 180 cm.\n(a) Find the length, in cm, of the longest piece.\n(b) Find the total length of rope in metres.',
    marks: 4, hints: ['Shortest = 3 parts = 180 cm, so 1 part = 60 cm', '(a) Longest = 5 parts = 300 cm', '(b) Total = 12 parts = 720 cm = 7.2 m'],
    type: 'multi-part',
    parts: [{ label: '(a) Longest piece (cm)', key: 'a', marks: 2 }, { label: '(b) Total length (m)', key: 'b', marks: 2 }],
    answer: { a: '300', b: '7.2' }
  },
  'pp_4024_s23_11_q9': {
    id: 'pp_4024_s23_11_q9', questionNumber: '9', title: 'Transformation',
    question: 'Describe fully the single transformation that maps triangle A onto triangle B.',
    marks: 3, hints: ['Check for rotation, reflection, translation or enlargement', 'This is a rotation', '90° clockwise about the origin'],
    type: 'short', answer: 'Rotation, 90° clockwise, centre (0, 0)'
  },
  'pp_4024_s23_11_q10': {
    id: 'pp_4024_s23_11_q10', questionNumber: '10', title: 'Fraction arithmetic',
    question: '(a) Work out 1¹⁄₃ × ⁸⁄₉. Give your answer as a mixed number in its simplest form.\n(b) Kate has a bunch of grapes. She ate ¹⁄₄ in the morning and ²⁄₃ of the rest in the afternoon. Find the fraction she has not eaten.',
    marks: 4, hints: ['(a) 4/3 × 8/9 = 32/27 = 1⁵⁄₂₇', '(b) After morning: 3/4 left. Afternoon: 2/3 × 3/4 = 1/2. Not eaten = 3/4 − 1/2 = 1/4'],
    type: 'multi-part',
    parts: [{ label: '(a) Mixed number', key: 'a', marks: 2 }, { label: '(b) Fraction not eaten', key: 'b', marks: 2 }],
    answer: { a: '1 5/27', b: '1/4' }
  },
  'pp_4024_s23_11_q11': {
    id: 'pp_4024_s23_11_q11', questionNumber: '11', title: 'Solve inequality',
    question: 'Solve the inequality x − 5 > 3x + 7.',
    marks: 2, hints: ['x − 5 > 3x + 7', '−5 − 7 > 3x − x', '−12 > 2x so x < −6'],
    type: 'short', answer: 'x < -6'
  },
  'pp_4024_s23_11_q12': {
    id: 'pp_4024_s23_11_q12', questionNumber: '12', title: 'Probability and relative frequency',
    question: '(a) Ali plays 20 games and wins 13. Find the best estimate for the probability he will not win the next game.\n(b) A spinner lands on red 14 times. The relative frequency is 0.2. Find n (total spins).',
    marks: 3, hints: ['(a) P(not win) = 7/20', '(b) 14/n = 0.2, so n = 14/0.2 = 70'],
    type: 'multi-part',
    parts: [{ label: '(a) P(not win)', key: 'a', marks: 1 }, { label: '(b) n', key: 'b', marks: 2 }],
    answer: { a: '7/20', b: '70' }
  },
  'pp_4024_s23_11_q13': {
    id: 'pp_4024_s23_11_q13', questionNumber: '13', title: 'Bearings and scale',
    question: '(a) The bearing of Mingfield from Lenton is 156°. Calculate the bearing of Lenton from Mingfield.\n(b) On a map, the distance between Lenton and Mingfield is 4.5 cm. The actual distance is 9 km. Find the scale in the form 1 : n.',
    marks: 3, hints: ['(a) Back bearing = 156 + 180 = 336°', '(b) 4.5 cm = 9 km = 900000 cm, scale = 1 : 200000'],
    type: 'multi-part',
    parts: [{ label: '(a) Bearing', key: 'a', marks: 1 }, { label: '(b) 1 : n', key: 'b', marks: 2 }],
    answer: { a: '336', b: '200000' }
  },
  'pp_4024_s23_11_q14': {
    id: 'pp_4024_s23_11_q14', questionNumber: '14', title: 'Expand brackets',
    question: 'Expand and simplify:\n(a) (3x − 2) − 3(2x − 3)\n(b) (2x + 3)(x − 7)',
    marks: 4, hints: ['(a) 3x − 2 − 6x + 9 = −3x + 7 or 9x − 1', '(b) 2x² − 14x + 3x − 21 = 2x² − 11x − 21'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) Expanded', key: 'b', marks: 2 }],
    answer: { a: '9x-1', b: '2x²-11x-21' }
  },
  'pp_4024_s23_11_q15': {
    id: 'pp_4024_s23_11_q15', questionNumber: '15', title: 'nth term of sequence',
    question: 'These are the first four terms of a sequence: 1, 7, 13, 19. Find an expression, in terms of n, for the nth term.',
    marks: 2, hints: ['Common difference = 6', 'nth term = 6n + c', 'When n = 1, 6(1) + c = 1, so c = −5'],
    type: 'short', answer: '6n-5'
  },
  'pp_4024_s23_11_q16': {
    id: 'pp_4024_s23_11_q16', questionNumber: '16', title: 'Sector area',
    question: 'OMN is a sector of a circle, centre O. ON = 20 cm and the area of the sector is 30π cm². Find the value of x (the angle).',
    marks: 3, hints: ['Area = (x/360) × π × 20²', '30π = (x/360) × 400π', 'x = 30 × 360/400 = 27'],
    type: 'short', answer: '27'
  },
  'pp_4024_s23_11_q17': {
    id: 'pp_4024_s23_11_q17', questionNumber: '17', title: 'Standard form subtraction',
    question: 'The mass of Saturn is 5.7 × 10²⁶ kg. The mass of Venus is 4.9 × 10²⁴ kg. Calculate the difference in mass. Give your answer in standard form.',
    marks: 2, hints: ['Convert to same power: 570 × 10²⁴ − 4.9 × 10²⁴', '= 565.1 × 10²⁴ = 5.651 × 10²⁶'],
    type: 'short', answer: '5.651 × 10²⁶'
  },
  'pp_4024_s23_11_q18': {
    id: 'pp_4024_s23_11_q18', questionNumber: '18', title: 'Rearrange formula',
    question: 'y = √((x + 2)/3). Rearrange the formula to make x the subject.',
    marks: 3, hints: ['Square both sides: y² = (x + 2)/3', 'Multiply by 3: 3y² = x + 2', 'x = 3y² − 2'],
    type: 'short', answer: 'x = 3y² - 2'
  },
  'pp_4024_s23_11_q19': {
    id: 'pp_4024_s23_11_q19', questionNumber: '19', title: 'Tangent congruence proof',
    question: 'A and B are points on the circumference of a circle, centre O. TA and TB are tangents. Show that triangles OBT and OAT are congruent. Give a reason for each statement.',
    marks: 3, hints: ['OA = OB (equal radii)', 'OAT = OBT = 90° (tangent perpendicular to radius)', 'OT is common, so congruent by RHS'],
    type: 'short', answer: 'OA = OB (radii), angle OAT = angle OBT = 90° (tangent ⊥ radius), OT common → RHS'
  },
  'pp_4024_s23_11_q20': {
    id: 'pp_4024_s23_11_q20', questionNumber: '20', title: 'Inverse function',
    question: 'f(x) = 10 + 7x. Find f⁻¹(x).',
    marks: 2, hints: ['Let y = 10 + 7x', 'x = (y − 10)/7', 'f⁻¹(x) = (x − 10)/7'],
    type: 'short', answer: '(x-10)/7'
  },
  'pp_4024_s23_11_q21': {
    id: 'pp_4024_s23_11_q21', questionNumber: '21', title: 'Similar rectangles area',
    question: 'Rectangle ABCD is similar to rectangle PQRS. AB = 12 cm, BC = 9 cm and PQ = 8 cm. Find the shaded area.',
    marks: 3, hints: ['Scale factor = 8/12 = 2/3', 'QR = 9 × 2/3 = 6 cm', 'Shaded = 12 × 9 − 8 × 6 = 108 − 48 = 60 cm²'],
    type: 'short', answer: '60'
  },
  'pp_4024_s23_11_q22': {
    id: 'pp_4024_s23_11_q22', questionNumber: '22', title: 'Factorisation',
    question: '(a) Factorise 7y + 2xy − 6x − 21\n(b) Factorise 3a² − 12b²',
    marks: 4, hints: ['(a) Group: (7y − 21) + (2xy − 6x) = 7(y − 3) + 2x(y − 3) = (7 + 2x)(y − 3)', '(b) 3(a² − 4b²) = 3(a + 2b)(a − 2b)'],
    type: 'multi-part',
    parts: [{ label: '(a) Factorised', key: 'a', marks: 2 }, { label: '(b) Factorised', key: 'b', marks: 2 }],
    answer: { a: '(7+2x)(y-3)', b: '3(a+2b)(a-2b)' }
  },
  'pp_4024_s23_11_q23': {
    id: 'pp_4024_s23_11_q23', questionNumber: '23', title: 'Limits of accuracy',
    question: 'The attendance at a cricket match is 36 000 correct to the nearest thousand.\n(a) Write down the minimum number of people.\n(b) The number of males is 21 000 correct to the nearest 500. Find the maximum number of females.',
    marks: 4, hints: ['(a) Lower bound = 35 500', '(b) Max total = 36 499, min males = 20 750', 'Max females = 36 499 − 20 750 = 15 749'],
    type: 'multi-part',
    parts: [{ label: '(a) Minimum', key: 'a', marks: 1 }, { label: '(b) Max females', key: 'b', marks: 3 }],
    answer: { a: '35500', b: '15749' }
  },
  'pp_4024_s23_11_q24': {
    id: 'pp_4024_s23_11_q24', questionNumber: '24', title: 'Histogram',
    question: '100 batteries are tested. The table shows results for different hour ranges. Complete the histogram.',
    marks: 3, hints: ['Calculate frequency density = frequency ÷ class width', 'Draw bars with correct heights'],
    type: 'short', answer: 'Histogram completed correctly'
  },
  'pp_4024_s23_11_q25': {
    id: 'pp_4024_s23_11_q25', questionNumber: '25', title: 'Indices equation',
    question: '(ax^b)³ = 27x⁴. Find the value of a and the value of b.',
    marks: 2, hints: ['a³x^(3b) = 27x⁴', 'a³ = 27 so a = 3', '3b = 4 so b = 4/3'],
    type: 'multi-part',
    parts: [{ label: 'a', key: 'a', marks: 1 }, { label: 'b', key: 'b', marks: 1 }],
    answer: { a: '3', b: '4/3' }
  },
  'pp_4024_s23_11_q26': {
    id: 'pp_4024_s23_11_q26', questionNumber: '26', title: 'Midpoint and perpendicular bisector',
    question: 'A is the point (−2, 3) and B is the point (4, 7).\n(a) Find the coordinates of the midpoint of AB.\n(b) Line l is the locus of points equidistant from A and B. Find the equation of line l.',
    marks: 5, hints: ['(a) Midpoint = (1, 5)', '(b) Gradient AB = 4/6 = 2/3', 'Perpendicular gradient = −3/2', 'y − 5 = −3/2(x − 1) → 2y + 3x = 13'],
    type: 'multi-part',
    parts: [{ label: '(a) Midpoint', key: 'a', marks: 1 }, { label: '(b) Equation', key: 'b', marks: 4 }],
    answer: { a: '(1, 5)', b: '2y + 3x = 13' }
  },
  'pp_4024_s23_11_q27': {
    id: 'pp_4024_s23_11_q27', questionNumber: '27', title: 'Vectors in parallelogram',
    question: 'OABC is a parallelogram. OA = 2a and OC = 3c. M is the midpoint of BC. T is the point on OB such that OT : TB = 2 : 1.\n(a) Find OB in terms of a and c.\n(b)(i) Find AM.\n(b)(ii) Find AT.\n(c) Show that ATM is a straight line.',
    marks: 6, hints: ['(a) OB = OA + AB = 2a + 3c', '(b)(i) AM = AO + OC + CM = −2a + 3c + a = 3c − a', '(b)(ii) AT = AO + OT = −2a + 2/3(2a + 3c) = −2a/3 + 2c'],
    type: 'multi-part',
    parts: [{ label: '(a) OB', key: 'a', marks: 1 }, { label: '(b)(i) AM', key: 'bi', marks: 1 }, { label: '(b)(ii) AT', key: 'bii', marks: 2 }, { label: '(c) Proof', key: 'c', marks: 2 }],
    answer: { a: '2a+3c', bi: '3c-a', bii: '-2a/3+2c', c: 'AT = 2/3 AM, so ATM is a straight line' }
  },
};

export const sections4024_11_2023: PastPaperSection[] = [
  { id: 's_4024_s23_11_q1', title: 'Q1 – Division and fractions', questionId: 'pp_4024_s23_11_q1' },
  { id: 's_4024_s23_11_q2', title: 'Q2 – Fractions and square roots', questionId: 'pp_4024_s23_11_q2' },
  { id: 's_4024_s23_11_q3', title: 'Q3 – Angles at a point', questionId: 'pp_4024_s23_11_q3' },
  { id: 's_4024_s23_11_q4', title: 'Q4 – Algebraic expressions', questionId: 'pp_4024_s23_11_q4' },
  { id: 's_4024_s23_11_q5', title: 'Q5 – Order of operations', questionId: 'pp_4024_s23_11_q5' },
  { id: 's_4024_s23_11_q6', title: 'Q6 – Symmetry', questionId: 'pp_4024_s23_11_q6' },
  { id: 's_4024_s23_11_q7', title: 'Q7 – Ordering negative numbers', questionId: 'pp_4024_s23_11_q7' },
  { id: 's_4024_s23_11_q8', title: 'Q8 – Ratio', questionId: 'pp_4024_s23_11_q8' },
  { id: 's_4024_s23_11_q9', title: 'Q9 – Transformation', questionId: 'pp_4024_s23_11_q9' },
  { id: 's_4024_s23_11_q10', title: 'Q10 – Fraction arithmetic', questionId: 'pp_4024_s23_11_q10' },
  { id: 's_4024_s23_11_q11', title: 'Q11 – Solve inequality', questionId: 'pp_4024_s23_11_q11' },
  { id: 's_4024_s23_11_q12', title: 'Q12 – Probability', questionId: 'pp_4024_s23_11_q12' },
  { id: 's_4024_s23_11_q13', title: 'Q13 – Bearings and scale', questionId: 'pp_4024_s23_11_q13' },
  { id: 's_4024_s23_11_q14', title: 'Q14 – Expand brackets', questionId: 'pp_4024_s23_11_q14' },
  { id: 's_4024_s23_11_q15', title: 'Q15 – nth term', questionId: 'pp_4024_s23_11_q15' },
  { id: 's_4024_s23_11_q16', title: 'Q16 – Sector area', questionId: 'pp_4024_s23_11_q16' },
  { id: 's_4024_s23_11_q17', title: 'Q17 – Standard form', questionId: 'pp_4024_s23_11_q17' },
  { id: 's_4024_s23_11_q18', title: 'Q18 – Rearrange formula', questionId: 'pp_4024_s23_11_q18' },
  { id: 's_4024_s23_11_q19', title: 'Q19 – Tangent congruence', questionId: 'pp_4024_s23_11_q19' },
  { id: 's_4024_s23_11_q20', title: 'Q20 – Inverse function', questionId: 'pp_4024_s23_11_q20' },
  { id: 's_4024_s23_11_q21', title: 'Q21 – Similar rectangles', questionId: 'pp_4024_s23_11_q21' },
  { id: 's_4024_s23_11_q22', title: 'Q22 – Factorisation', questionId: 'pp_4024_s23_11_q22' },
  { id: 's_4024_s23_11_q23', title: 'Q23 – Limits of accuracy', questionId: 'pp_4024_s23_11_q23' },
  { id: 's_4024_s23_11_q24', title: 'Q24 – Histogram', questionId: 'pp_4024_s23_11_q24' },
  { id: 's_4024_s23_11_q25', title: 'Q25 – Indices equation', questionId: 'pp_4024_s23_11_q25' },
  { id: 's_4024_s23_11_q26', title: 'Q26 – Midpoint & perpendicular bisector', questionId: 'pp_4024_s23_11_q26' },
  { id: 's_4024_s23_11_q27', title: 'Q27 – Vectors', questionId: 'pp_4024_s23_11_q27' },
];
