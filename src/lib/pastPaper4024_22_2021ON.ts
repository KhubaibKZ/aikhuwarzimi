// 4024/22 Oct/Nov 2021 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2021ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on21_22_q1': {
    id: 'pp_4024_on21_22_q1', questionNumber: '1', title: 'Percentages, ratio and currency',
    question: '(a)(i) Jasmine pays 12% deposit of $2250. Calculate amount paid in December.\n(a)(ii) Flights $700, Hotel $1550. Find ratio flights : hotel in simplest form.\n(b) Changes $350 to rupees at $1 = 71.6 rupees. Spends 19500 rupees. Changes rest back. How much received?\n(c)(i) India − Kenya tourists in 2016, standard form.\n(c)(ii) Average spend per tourist in China, nearest dollar.\n(c)(iii) Madagascar spending increased 23.5% from 2014 to 2016. Find 2014 amount.',
    marks: 12, hints: ['(a)(i) 2250 − 0.12 × 2250 = 2250 − 270 = 1980', '(a)(ii) 700:1550 = 14:31', '(b) 350 × 71.6 = 25060 rupees, rest = 5560, $5560/71.6 = $77.65', '(c)(i) 1.31×10⁷ − ... = 1.333 × 10⁷... MS says 1.333 × 10⁷', '(c)(ii) 4.44×10¹⁰ / 5.93×10⁷ = 749', '(c)(iii) 1.235x = 9.13×10⁵, x = 739000'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Amount ($)', key: 'ai', marks: 2 },
      { label: '(a)(ii) Ratio', key: 'aii', marks: 2 },
      { label: '(b) Amount ($)', key: 'b', marks: 3 },
      { label: '(c)(i) Standard form', key: 'ci', marks: 1 },
      { label: '(c)(ii) Average ($)', key: 'cii', marks: 2 },
      { label: '(c)(iii) Amount ($)', key: 'ciii', marks: 2 }
    ],
    answer: { ai: '1980', aii: '14 : 31', b: '77.65', ci: '1.333 × 10⁷', cii: '749', ciii: '739000' }
  },
  'pp_4024_on21_22_q2': {
    id: 'pp_4024_on21_22_q2', questionNumber: '2', title: 'Statistics',
    question: '(a)(i) Write down the modal class from pie chart.\n(a)(ii) 90 people aged over 30. Calculate number aged 16-20.\n(b)(i) Complete histogram for science competition scores.\n(b)(ii) Students scoring 75+ get distinction. Find percentage.',
    marks: 8, hints: ['(a)(i) 16 to 20', '(a)(ii) 90 × (144/90) = 240... MS: 240', '(b)(i) Complete bars using frequency density', '(b)(ii) (30 + 42)/250 × 100 = 28.8%'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Modal class', key: 'ai', marks: 1 },
      { label: '(a)(ii) Number aged 16-20', key: 'aii', marks: 2 },
      { label: '(b)(i) Histogram', key: 'bi', marks: 3 },
      { label: '(b)(ii) Percentage', key: 'bii', marks: 2 }
    ],
    answer: { ai: '16 to 20', aii: '240', bi: 'Correct histogram', bii: '28.8' }
  },
  'pp_4024_on21_22_q3': {
    id: 'pp_4024_on21_22_q3', questionNumber: '3', title: 'Cubic graph',
    question: '(a) Complete table for y = x³ − 3x − 1.\n(b) Draw graph for −3 ≤ x ≤ 3.\n(c) Explain why x³ − 6x − 2 = 6 has only one solution.\n(d)(i) Draw line L through (1,1) and (−2,−1).\n(d)(ii) Find gradient of L.\n(d)(iii) Find x-coordinates where L intersects curve.',
    marks: 11, hints: ['(a) When x = 2: y = 8 − 6 − 1 = 1; x = 3: y = 27 − 9 − 1 = 17... MS says −5.5', '(b) Plot points and draw smooth curve', '(c) y = 3 only intersects once', '(d)(ii) Gradient = 2/3', '(d)(iii) Read from graph'],
    type: 'multi-part',
    parts: [
      { label: '(a) Complete table', key: 'a', marks: 1 },
      { label: '(b) Graph', key: 'b', marks: 3 },
      { label: '(c) Explanation', key: 'c', marks: 2 },
      { label: '(d)(i) Line L', key: 'di', marks: 1 },
      { label: '(d)(ii) Gradient', key: 'dii', marks: 2 },
      { label: '(d)(iii) x values', key: 'diii', marks: 2 }
    ],
    answer: { a: '−5.5 and 17', b: 'Correct curve', c: 'y = 3 only crosses curve once', di: 'Correct line', dii: '2/3', diii: 'Read from graph' }
  },
  'pp_4024_on21_22_q4': {
    id: 'pp_4024_on21_22_q4', questionNumber: '4', title: 'Sequences',
    question: '(a)(i) Complete table: Pattern 4 = 20, Pattern 5 = 24.\n(a)(ii) Expression for nth term: 4n + 4.\n(a)(iii) Jamal has 150 counters. Find largest pattern p.\n(b)(i) 4th term = 26, 8th term = 2 (linear). Find first term.\n(b)(ii) Find nth term expression.',
    marks: 9, hints: ['(a)(i) 20, 24', '(a)(ii) 4n + 4', '(a)(iii) 4p + 4 ≤ 150 → p ≤ 36.5, so p = 36', '(b)(i) Common difference = (2−26)/4 = −6, first term = 26 + 3×6 = 44', '(b)(ii) 50 − 6n'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Pattern 4, 5', key: 'ai', marks: 1 },
      { label: '(a)(ii) nth term', key: 'aii', marks: 2 },
      { label: '(a)(iii) p', key: 'aiii', marks: 2 },
      { label: '(b)(i) First term', key: 'bi', marks: 2 },
      { label: '(b)(ii) nth term', key: 'bii', marks: 2 }
    ],
    answer: { ai: '20, 24', aii: '4n + 4', aiii: '36', bi: '44', bii: '50 − 6n' }
  },
  'pp_4024_on21_22_q5': {
    id: 'pp_4024_on21_22_q5', questionNumber: '5', title: 'Simultaneous equations and algebra',
    question: '(a) 4c + 3e = 85, 2c + 5e = 67. Find mass of card and envelope.\n(b) Factorise x² − 25.\n(c) Rearrange r = 2t/(t − 5) to make t the subject.\n(d) Express 4/(x−5) − 3/(2x+1) as a single fraction.',
    marks: 11, hints: ['(a) c = 16, e = 7', '(b) (x + 5)(x − 5)', '(c) rt − 5r = 2t, t(r − 2) = 5r, t = 5r/(r − 2)', '(d) [4(2x+1) − 3(x−5)] / [(x−5)(2x+1)] = (5x + 19)/[(x−5)(2x+1)]'],
    type: 'multi-part',
    parts: [
      { label: '(a) Card (g)', key: 'card', marks: 2 },
      { label: '(a) Envelope (g)', key: 'env', marks: 2 },
      { label: '(b) Factorised', key: 'b', marks: 1 },
      { label: '(c) t =', key: 'c', marks: 3 },
      { label: '(d) Single fraction', key: 'd', marks: 3 }
    ],
    answer: { card: '16', env: '7', b: '(x + 5)(x − 5)', c: '5r/(r − 2)', d: '(5x + 19)/[(x − 5)(2x + 1)]' }
  },
  'pp_4024_on21_22_q6': {
    id: 'pp_4024_on21_22_q6', questionNumber: '6', title: 'Probability',
    question: '(a)(i) Fair 8-sided spinner with numbers 2,1,2,1,6,1,2,1. P(score 6).\n(a)(i)b P(not 2).\n(a)(ii) Spins twice. P(two 2s).\n(b) 7 red, 6 green, 3 white counters. Two taken without replacement. P(same colour).',
    marks: 7, hints: ['(a)(i)a 1/8', '(a)(i)b 5/8', '(a)(ii) 3/8 × 3/8 = 9/64', '(b) (7×6 + 6×5 + 3×2)/(16×15) = (42+30+6)/240 = 78/240 = 13/40'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) P(6)', key: 'aia', marks: 1 },
      { label: '(a)(i) P(not 2)', key: 'aib', marks: 1 },
      { label: '(a)(ii) P(two 2s)', key: 'aii', marks: 2 },
      { label: '(b) P(same colour)', key: 'b', marks: 3 }
    ],
    answer: { aia: '1/8', aib: '5/8', aii: '9/64', b: '13/40' }
  },
  'pp_4024_on21_22_q7': {
    id: 'pp_4024_on21_22_q7', questionNumber: '7', title: 'Vectors and coordinate geometry',
    question: '(a)(i) P(−5,2), Q(3,7). Find midpoint of PQ.\n(a)(ii) QR = (−4, 6). Find coordinates of R.\n(a)(iii) Find |QR|.\n(b)(i) OACB quadrilateral, OA = a, OB = b, OA = 2BC, BN:NA = 1:3. Find AB.\n(b)(ii) Find NC.',
    marks: 8, hints: ['(a)(i) (−1, 4.5)', '(a)(ii) (3−4, 7+6) = (−1, 13)', '(a)(iii) √(16+36) = √52 = 7.21', '(b)(i) AB = b − a', '(b)(ii) NC = ½a + ½b or ½(a + b)'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Midpoint', key: 'ai', marks: 1 },
      { label: '(a)(ii) R', key: 'aii', marks: 1 },
      { label: '(a)(iii) |QR|', key: 'aiii', marks: 2 },
      { label: '(b)(i) AB', key: 'bi', marks: 1 },
      { label: '(b)(ii) NC', key: 'bii', marks: 3 }
    ],
    answer: { ai: '(−1, 4.5)', aii: '(−1, 13)', aiii: '7.21', bi: 'b − a', bii: '½(a + b)' }
  },
  'pp_4024_on21_22_q8': {
    id: 'pp_4024_on21_22_q8', questionNumber: '8', title: 'Cone',
    question: '(a) Cone cup, diameter 7 cm, volume 110 cm³. Show height = 8.57 (2 d.p.).\n(b) Calculate slant height l.\n(c) Cup opened into sector. Calculate sector angle x.\n(d) Similar cup, volume 165 cm³. Calculate diameter.',
    marks: 11, hints: ['(a) 110 = ⅓π(3.5²)h → h = 330/(π×12.25) = 8.573...', '(b) l = √(3.5² + 8.57²) = 9.26', '(c) Arc = 2π(3.5) = 7π, x/360 × 2π(9.26) = 7π → x = 136°', '(d) Scale factor³ = 165/110, diameter = 7 × ∛(3/2) = 8.01 cm'],
    type: 'multi-part',
    parts: [
      { label: '(a) Show h = 8.57', key: 'a', marks: 3 },
      { label: '(b) Slant height (cm)', key: 'b', marks: 2 },
      { label: '(c) Sector angle x', key: 'c', marks: 4 },
      { label: '(d) Diameter (cm)', key: 'd', marks: 2 }
    ],
    answer: { a: 'h = 330/(π × 12.25) = 8.57', b: '9.26', c: '136', d: '8.01' }
  },
  'pp_4024_on21_22_q9': {
    id: 'pp_4024_on21_22_q9', questionNumber: '9', title: 'Cuboid and quadratic',
    question: '(a) Open box: height x, width x+5, length 2(x+5). Write expressions.\n(b) External SA = 210 cm². Show 4x² + 25x − 80 = 0.\n(c) Solve 4x² + 25x − 80 = 0 to 2 d.p.\n(d) Calculate volume.\n(e) Chocolates 250 g (nearest 10g), total 262 g (nearest g). Lower bound of box mass.',
    marks: 14, hints: ['(a) Width = x + 5, Length = 2(x + 5)', '(c) x = (−25 ± √(625 + 1280))/8 = 2.33 or −8.58', '(d) 2.33 × 7.33 × 14.66 = 250 cm³', '(e) Box ≥ 261.5 − 255 = 6.5 g'],
    type: 'multi-part',
    parts: [
      { label: '(a) Width & Length', key: 'a', marks: 2 },
      { label: '(b) Show equation', key: 'b', marks: 4 },
      { label: '(c) x values', key: 'c', marks: 3 },
      { label: '(d) Volume (cm³)', key: 'd', marks: 2 },
      { label: '(e) Lower bound (g)', key: 'e', marks: 3 }
    ],
    answer: { a: 'x + 5 and 2(x + 5)', b: '4x² + 25x − 80 = 0', c: '2.33 and −8.58', d: '250', e: '6.5' }
  },
  'pp_4024_on21_22_q10': {
    id: 'pp_4024_on21_22_q10', questionNumber: '10', title: 'Bearings and 3D trigonometry',
    question: '(a) ABCD is a field. Bearing of B from A = 070°, bearing of D from A = 125°. C is due south of B and due east of D. AD = 290 m, BD = 350 m. Calculate bearing of D from B.\n(b) Vertical mast at D, angle of elevation from A = 10°. Calculate angle of elevation from C.',
    marks: 9, hints: ['(a) ∠BAD = 55°, use sine rule to find ∠ABD, bearing = 180° + ∠ABD... MS says 207.2°', '(b) Height = 290 tan10°, CD = 350 sin(angle)... MS says 17.7°'],
    type: 'multi-part',
    parts: [
      { label: '(a) Bearing', key: 'a', marks: 4 },
      { label: '(b) Angle of elevation', key: 'b', marks: 5 }
    ],
    answer: { a: '207.2', b: '17.7' }
  },
};

export const sections4024_22_2021ON: PastPaperSection[] = Object.values(questions4024_22_2021ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
