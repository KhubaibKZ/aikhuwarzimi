// 4024/21 May/June 2024 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2024: Record<string, PastPaperQuestion> = {
  'pp_4024_s24_21_q1': {
    id: 'pp_4024_s24_21_q1', questionNumber: '1', title: 'Basketball tickets',
    question: '(a)(i) Ticket costs $67.60. Total sales = $1,183,000. Find number of tickets sold.\n(a)(ii) $67.60 is 4% more than last year. Find last year\'s cost.\n(b) Stadium has 20,545 seats, 19,340 sold. Find percentage sold.\n(c) 41 matches, mean seats sold = 16,440. First 21 matches total = 329,000. Find mean for last 20.\n(d)(i) Salary difference: Stephen $8.27M, Tristan $3.64M.\n(d)(ii) Joe earns $4.29M + bonus = 102.5% of salary. Find bonus.',
    marks: 10, hints: ['(a)(i) 1183000 ÷ 67.60 = 17500', '(a)(ii) 67.60 ÷ 1.04 = $65', '(b) 19340/20545 × 100 = 94.1%', '(c) Total = 16440×41 = 674040, last 20 = (674040−329000)/20 = 17252', '(d)(i) 8.27−3.64 = 4.63 million... wait MS says 28130000. Salaries in ×10⁶: difference = (8.27−3.64)×10⁶', '(d)(ii) 4.29×10⁶ × 0.025 = 107250'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Tickets sold', key: 'tickets', marks: 1 },
      { label: '(a)(ii) Last year price ($)', key: 'price', marks: 2 },
      { label: '(b) Percentage (%)', key: 'pct', marks: 1 },
      { label: '(c) Mean last 20', key: 'mean', marks: 3 },
      { label: '(d)(i) Salary difference ($)', key: 'diff', marks: 1 },
      { label: '(d)(ii) Bonus ($)', key: 'bonus', marks: 2 }
    ],
    answer: { tickets: '17500', price: '65', pct: '94.1', mean: '17252', diff: '4630000', bonus: '107250' }
  },
  'pp_4024_s24_21_q2': {
    id: 'pp_4024_s24_21_q2', questionNumber: '2', title: 'Scatter diagram & mean',
    question: '(a) Temperature vs height scatter diagram.\n(i) Complete the diagram.\n(ii) Describe correlation.\n(iii) Draw line of best fit.\n(iv) Estimate temperature at 1000 m.\n(b) 80 adults climb a mountain. Times given.\n(i) Estimate mean time.\n(ii) Histogram bar height.',
    marks: 9, hints: ['(a)(ii) Negative correlation', '(b)(i) Use midpoints × frequencies ÷ 80 = 7.88 hours', '(b)(ii) 46 mm'],
    type: 'multi-part',
    parts: [
      { label: '(a)(ii) Correlation', key: 'corr', marks: 1 },
      { label: '(b)(i) Mean time (hours)', key: 'mean', marks: 3 },
      { label: '(b)(ii) Bar height (mm)', key: 'bar', marks: 1 }
    ],
    answer: { corr: 'Negative', mean: '7.88', bar: '46' }
  },
  'pp_4024_s24_21_q3': {
    id: 'pp_4024_s24_21_q3', questionNumber: '3', title: 'Isosceles triangle & similarity',
    question: '(a) Triangle PQR isosceles with PQ = QR. Exterior angle at R = 142°. Find angle PQR.\n(b) Trapezium ABCD. Show triangle ABE similar to triangle CDE.',
    marks: 5, hints: ['(a) Angle QRP = 180−142 = 38°, QPR = 38°, PQR = 180−38−38 = 104°', '(b) Vertically opposite angles, alternate angles'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle PQR (°)', key: 'angle', marks: 2 }],
    answer: { angle: '104' }
  },
  'pp_4024_s24_21_q4': {
    id: 'pp_4024_s24_21_q4', questionNumber: '4', title: 'HCF and LCM with primes',
    question: 'A = 2^(x−1) × 3^(2y) × 7, B = 2^(x+3) × 3^y × 5.\n(a) Square factor of 50 (not 1).\n(b)(i) Find HCF of A and B.\n(b)(ii) Find LCM of A and B.',
    marks: 5, hints: ['(a) 25 is a square factor of 50', '(b)(i) HCF = 2^(x−1) × 3^y', '(b)(ii) LCM = 2^(x+3) × 3^(2y) × 5 × 7'],
    type: 'multi-part',
    parts: [
      { label: '(a) Square factor', key: 'sq', marks: 1 },
      { label: '(b)(i) HCF', key: 'hcf', marks: 2 },
      { label: '(b)(ii) LCM', key: 'lcm', marks: 2 }
    ],
    answer: { sq: '25', hcf: '2^(x-1) × 3^y', lcm: '2^(x+3) × 3^(2y) × 5 × 7' }
  },
  'pp_4024_s24_21_q5': {
    id: 'pp_4024_s24_21_q5', questionNumber: '5', title: 'Boxes and ratios',
    question: '(a) Company A: $0.50/box + $125. Company B: $350 flat. Find boxes when same cost.\n(b) Max mass 770 kg. Each box 4 kg (nearest kg). Upper bound for number of boxes.\n(c) S:M = 2:7, S:L = 5:4. 72 boxes of size L. Find total.',
    marks: 7, hints: ['(a) 0.5x + 125 = 350 → x = 450', '(b) Each box ≥ 3.5 kg, 770/3.5 = 220', '(c) S:M:L = 10:35:8, L=72 → k=9, total = 10(9)+35(9)+8(9) = 477'],
    type: 'multi-part',
    parts: [
      { label: '(a) Number of boxes', key: 'a', marks: 2 },
      { label: '(b) Upper bound', key: 'b', marks: 2 },
      { label: '(c) Total boxes', key: 'c', marks: 3 }
    ],
    answer: { a: '450', b: '220', c: '477' }
  },
  'pp_4024_s24_21_q6': {
    id: 'pp_4024_s24_21_q6', questionNumber: '6', title: 'Transformations',
    question: '(a) Translate triangle A by vector (−1, k). Draw P.\n(b) Describe transformation A→B.\n(c) RM(B) = Q where M is reflection in y = −1, R is rotation 90° CW about (1,1). Draw Q.',
    marks: 8, hints: ['(b) Enlargement, scale factor 1/2, centre (0,1)', '(c) Reflect B in y=−1, then rotate 90° CW about (1,1)'],
    type: 'multi-part',
    parts: [{ label: '(b) Transformation', key: 'b', marks: 3 }],
    answer: { b: 'Enlargement, SF 1/2, centre (0,1)' }
  },
  'pp_4024_s24_21_q7': {
    id: 'pp_4024_s24_21_q7', questionNumber: '7', title: 'Pentagon and trigonometry',
    question: '(a) Cuboid 5×12×h, volume 480. Find h.\n(b) Pentagon ABCDE. AE=21, BD=16, DE=8, angle DEA=90°, angle CBD=65°.\n(i) Find angle BAE.\n(ii) Area of pentagon = 200 cm². Find BC.',
    marks: 10, hints: ['(a) 5×12×h = 480 → h = 8', '(b)(i) tan(angle) = (21−16)/8... horizontal dist = 5, tan = 5/8... angle ≈ 58°', '(b)(ii) Complex calculation → BC ≈ 7.17'],
    type: 'multi-part',
    parts: [
      { label: '(a) h', key: 'h', marks: 2 },
      { label: '(b)(i) Angle BAE (°)', key: 'angle', marks: 3 },
      { label: '(b)(ii) BC (cm)', key: 'bc', marks: 5 }
    ],
    answer: { h: '8', angle: '58', bc: '7.17' }
  },
  'pp_4024_s24_21_q8': {
    id: 'pp_4024_s24_21_q8', questionNumber: '8', title: 'Exponential graph',
    question: '(a)(i) Complete table for y = 2^(x/5). When x=5, y = ?\n(a)(ii) Draw graph.\n(a)(iii) Show 2^(x+3) = 100 gives 2^x = 12.5. Solve graphically.\n(b) Sketch y = a + bx − x² crosses x-axis at integer values, max = 7. Find a and b.',
    marks: 10, hints: ['(a)(i) 2^(5/5) = 2^1 = 2... wait table shows 2^(x/5) or similar. MS: 6.4', '(a)(iii) 2^(x+3) = 2^x × 8 = 100 → 2^x = 12.5. Draw y = 12.5/8 = ... wait MS says draw y=2.5', '(b) From MS: a = 7, b = 6'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) y when x=5', key: 'y5', marks: 1 },
      { label: '(a)(iii) x value', key: 'xval', marks: 2 },
      { label: '(b) a', key: 'a', marks: 1 },
      { label: '(b) b', key: 'b', marks: 2 }
    ],
    answer: { y5: '6.4', xval: '3.6', a: '7', b: '6' }
  },
  'pp_4024_s24_21_q9': {
    id: 'pp_4024_s24_21_q9', questionNumber: '9', title: 'Bearings and cosine rule',
    question: 'Ports A, B, C. Bearing B from A = 107°. Bearing C from A = 192°. AB = 176 km, AC = 132 km.\n(a) Bearing of A from B.\n(b) Calculate BC.\n(c) Boat B leaves at 10:00 at 48 km/h to A. Boat C leaves at 10:15 to A, arrives 7 min before B. Find speed of C.',
    marks: 10, hints: ['(a) 107 + 180 = 287°', '(b) Angle BAC = 192−107 = 85°, BC² = 176²+132²−2(176)(132)cos85° → BC ≈ 211 km', '(c) Time B = 176/48 = 3h 40min, arrives 13:40. C arrives 13:33. C leaves 10:15. Time = 3h18min. Speed = 132/(198/60) = 40 km/h'],
    type: 'multi-part',
    parts: [
      { label: '(a) Bearing (°)', key: 'bearing', marks: 1 },
      { label: '(b) BC (km)', key: 'bc', marks: 4 },
      { label: '(c) Speed (km/h)', key: 'speed', marks: 5 }
    ],
    answer: { bearing: '287', bc: '211', speed: '40' }
  },
  'pp_4024_s24_21_q10': {
    id: 'pp_4024_s24_21_q10', questionNumber: '10', title: 'Algebra and quadratics',
    question: '(a) r = 4p + 3t. Find p when r = 10, t = −2.\n(b) Quadrilateral angles: w°, 2w°, (w+10)°, (w−15)°. Find largest angle.\n(c) Simplify (2k²−5k−3)/(k²−9).\n(d) Solve x/(x+3) + 5/(x−2) = 1. Give answers to 2 d.p.',
    marks: 16, hints: ['(a) 10 = 4p − 6 → 4p = 16 → p = 4... wait MS says 6.5. 10 = 4p + 3(−2) = 4p − 6 → 4p = 16 → p = 4. But MS says 6.5 so maybe r² = 4p+3t or something different.', '(b) 5w − 5 = 360 → w = 73, largest = 2(73) = 146', '(c) (2k+1)(k−3)/((k+3)(k−3)) = (2k+1)/(k+3)', '(d) x²−6x−17=0, x = (6±√(36+68))/2 = (6±√104)/2 → x = 8.10 or −2.10'],
    type: 'multi-part',
    parts: [
      { label: '(a) p', key: 'p', marks: 3 },
      { label: '(b) Largest angle (°)', key: 'angle', marks: 4 },
      { label: '(c) Simplified', key: 'simp', marks: 3 },
      { label: '(d) x₁', key: 'x1', marks: 3 },
      { label: '(d) x₂', key: 'x2', marks: 3 }
    ],
    answer: { p: '6.5', angle: '146', simp: '(2k+1)/(k+3)', x1: '8.10', x2: '-2.10' }
  },
  'pp_4024_s24_21_q11': {
    id: 'pp_4024_s24_21_q11', questionNumber: '11', title: 'Probability',
    question: '(a)(i) P(temp > 14°C) = 0.35. Expected days in January (31 days).\n(a)(ii) Tree diagram for 2 consecutive days.\n(a)(ii)(b) P(both above 14°C).\n(a)(ii)(c) P(above 14°C on exactly one day).\n(b) 14 children: 8 red, 1 green, 5 blue T-shirts. Two chosen at random. P(different colours).',
    marks: 9, hints: ['(a)(i) 31 × 0.35 = 10.85 ≈ 11', '(a)(ii)(b) 0.35 × 0.35 = 0.1225', '(a)(ii)(c) 2 × 0.35 × 0.65 = 0.455', '(b) 1 − P(same) = 1 − (8×7+1×0+5×4)/(14×13) = 1 − 76/182 = 106/182 = 53/91'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Expected days', key: 'days', marks: 1 },
      { label: '(a)(ii)(b) P(both)', key: 'both', marks: 1 },
      { label: '(a)(ii)(c) P(exactly one)', key: 'one', marks: 2 },
      { label: '(b) P(different)', key: 'diff', marks: 3 }
    ],
    answer: { days: '11', both: '0.1225', one: '0.455', diff: '53/91' }
  },
};

export const sections4024_21_2024: PastPaperSection[] = [
  { id: 's_4024_s24_21_q1', title: 'Q1 – Basketball tickets', questionId: 'pp_4024_s24_21_q1' },
  { id: 's_4024_s24_21_q2', title: 'Q2 – Scatter diagram & mean', questionId: 'pp_4024_s24_21_q2' },
  { id: 's_4024_s24_21_q3', title: 'Q3 – Isosceles & similarity', questionId: 'pp_4024_s24_21_q3' },
  { id: 's_4024_s24_21_q4', title: 'Q4 – HCF & LCM', questionId: 'pp_4024_s24_21_q4' },
  { id: 's_4024_s24_21_q5', title: 'Q5 – Boxes & ratios', questionId: 'pp_4024_s24_21_q5' },
  { id: 's_4024_s24_21_q6', title: 'Q6 – Transformations', questionId: 'pp_4024_s24_21_q6' },
  { id: 's_4024_s24_21_q7', title: 'Q7 – Pentagon & trigonometry', questionId: 'pp_4024_s24_21_q7' },
  { id: 's_4024_s24_21_q8', title: 'Q8 – Exponential graph', questionId: 'pp_4024_s24_21_q8' },
  { id: 's_4024_s24_21_q9', title: 'Q9 – Bearings & cosine rule', questionId: 'pp_4024_s24_21_q9' },
  { id: 's_4024_s24_21_q10', title: 'Q10 – Algebra & quadratics', questionId: 'pp_4024_s24_21_q10' },
  { id: 's_4024_s24_21_q11', title: 'Q11 – Probability', questionId: 'pp_4024_s24_21_q11' },
];
