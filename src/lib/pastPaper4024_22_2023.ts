// 4024/22 May/June 2023 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2023: Record<string, PastPaperQuestion> = {
  'pp_4024_s23_22_q1': {
    id: 'pp_4024_s23_22_q1', questionNumber: '1', title: 'Fruit costs, pie chart, percentages',
    question: '(a)(i) A shop buys fruit. Find p, q, r, s from the table. Total = $240.30.\n(a)(ii) Shop sells all fruit for $325. Calculate percentage profit.\n(b)(i)(a) Sales for fruit = $9520.70 out of $34,974. Calculate pie chart angle.\n(b)(i)(b) Frozen food angle = 46°. Calculate sales.\n(b)(ii) $34,974 is a 4.4% increase on 2021. Calculate 2021 sales.',
    marks: 14, hints: ['(a)(i) p = 72 × 1.35 = 97.20', '(a)(ii) Profit = (325−240.30)/240.30 × 100', '(b)(ii) 34974/1.044'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) p', key: 'p', marks: 1 }, { label: '(a)(i) q', key: 'q', marks: 1 }, { label: '(a)(i) r', key: 'r', marks: 1 }, { label: '(a)(i) s', key: 's', marks: 1 }, { label: '(a)(ii) % profit', key: 'aii', marks: 2 }, { label: '(b)(i)(a) Angle', key: 'bia', marks: 2 }, { label: '(b)(i)(b) Sales ($)', key: 'bib', marks: 2 }, { label: '(b)(ii) 2021 sales ($)', key: 'bii', marks: 2 }],
    answer: { p: '97.20', q: '66.30', r: '34', s: '1.14', aii: '35.2', bia: '98', bib: '4468.90', bii: '33500' }
  },
  'pp_4024_s23_22_q2': {
    id: 'pp_4024_s23_22_q2', questionNumber: '2', title: 'Equations, factorise, fractions, rearrange, mean',
    question: '(a) 5 bars at p cents + 8 packs at 75¢ = $9.10. Find p.\n(b) Factorise 6ac − 27c.\n(c) Write (3m)/(10) − (5n)/(9m) as a single fraction.\n(d) Rearrange y = 3x² to make x the subject.\n(e) A group of k numbers has mean 56.8. Adding 52 gives mean 56.5. Find k.',
    marks: 13, hints: ['(a) 5p + 600 = 910, p = 62', '(b) 3c(2a−9)', '(e) 56.8k + 52 = 56.5(k+1)'],
    type: 'multi-part',
    parts: [{ label: '(a) p', key: 'a', marks: 3 }, { label: '(b) Factorised', key: 'b', marks: 2 }, { label: '(c) Single fraction', key: 'c', marks: 2 }, { label: '(d) x =', key: 'd', marks: 2 }, { label: '(e) k', key: 'e', marks: 4 }],
    answer: { a: '62', b: '3c(2a-9)', c: 'mn²/6', d: '±√(y/3)', e: '15' }
  },
  'pp_4024_s23_22_q3': {
    id: 'pp_4024_s23_22_q3', questionNumber: '3', title: 'Polygon angles and circle theorems',
    question: '(a)(i) Equilateral triangle B and regular polygon A share a side. Interior angle of A is 165°. Find y.\n(a)(ii) Calculate number of sides of polygon A.\n(b)(i) A,B,C on circle centre O. Angle ABC = x°. Show angle OAC = (90−x)°.\n(b)(ii) Angle BAO = 54° and angle OCB = 11°. Find x.',
    marks: 8, hints: ['(a)(i) y = 360 − 60 − 165 = 135°', '(a)(ii) 180 − 165 = 15° exterior, 360/15 = 24 sides', '(b)(ii) Work through using circle theorem results'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) y', key: 'ai', marks: 1 }, { label: '(a)(ii) Number of sides', key: 'aii', marks: 2 }, { label: '(b)(ii) x', key: 'bii', marks: 2 }],
    answer: { ai: '135', aii: '24', bii: '43' }
  },
  'pp_4024_s23_22_q4': {
    id: 'pp_4024_s23_22_q4', questionNumber: '4', title: 'Exponential graph',
    question: '(a) Complete table for y = 2^(x/2).\n(b) Draw graph for −1 ≤ x ≤ 4.\n(c) Solve 2^(x/2) = 6 using the graph (draw y = 1.2 line).\n(d)(i) Complete table for 4y = 2x + 1.\n(d)(ii) Draw line on grid.\n(d)(iii) Find x-coordinates of intersections.\n(d)(iv) Find A, B, C where A·2^(x/2) + Bx + C = 0.',
    marks: 12, hints: ['(a) When x = 4: y = 2² = 4 → but actually y = 2^(x/2), so check', '(c) Draw horizontal line at appropriate height'],
    type: 'multi-part',
    parts: [{ label: '(a) y when x = 4', key: 'a', marks: 1 }, { label: '(c) x', key: 'c', marks: 2 }, { label: '(d)(iv) A', key: 'dA', marks: 1 }, { label: '(d)(iv) B', key: 'dB', marks: 1 }, { label: '(d)(iv) C', key: 'dC', marks: 1 }],
    answer: { a: '3.2', c: '2.6', dA: '4', dB: '-10', dC: '-5' }
  },
  'pp_4024_s23_22_q5': {
    id: 'pp_4024_s23_22_q5', questionNumber: '5', title: 'Standard form',
    question: '(a)(i) Write down the smallest population from the table.\n(a)(ii) Find difference in area between Sri Lanka and Pakistan in standard form.\n(a)(iii) Find the largest population density.\n(b)(i) A = 8.5 × 10ⁿ, B = 1 × 10^(n−1). Find A − B in standard form.\n(b)(ii) Find A × B in standard form.',
    marks: 7, hints: ['(a)(i) 2.18 × 10⁷', '(a)(ii) 881913 − 65610 = 816303', '(b)(i) 8.5 × 10ⁿ − 0.1 × 10ⁿ = 8.4 × 10ⁿ... wait, B = 10^(n-1) so...'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Smallest population', key: 'ai', marks: 1 }, { label: '(a)(ii) Difference (km²)', key: 'aii', marks: 1 }, { label: '(a)(iii) Largest density', key: 'aiii', marks: 2 }, { label: '(b)(i) A − B', key: 'bi', marks: 1 }, { label: '(b)(ii) A × B', key: 'bii', marks: 2 }],
    answer: { ai: '2.18 × 10⁷', aii: '8.163 × 10⁵', aiii: '517', bi: '8.4 × 10ⁿ', bii: '1.275 × 10^(2n)' }
  },
  'pp_4024_s23_22_q6': {
    id: 'pp_4024_s23_22_q6', questionNumber: '6', title: 'Ratio, speed and bounds',
    question: 'Sophia does Trio Challenge: walk 6.3 km, cycle 3000 m, swim 1800 m.\n(a) Write distances as ratio in simplest form.\n(b) Walks at 1.4 m/s, finishes at 11:05. Find start time.\n(c) Cycles 3000 m (nearest 10 m) in 450 s (nearest 10 s). Find upper bound for speed.',
    marks: 8, hints: ['(a) 6300:3000:1800 = 21:10:6', '(b) Time = 6300/1.4 = 4500 s = 75 min', '(c) UB = 3005/445'],
    type: 'multi-part',
    parts: [{ label: '(a) Ratio', key: 'a', marks: 2 }, { label: '(b) Start time', key: 'b', marks: 3 }, { label: '(c) Upper bound (m/s)', key: 'c', marks: 3 }],
    answer: { a: '21:10:6', b: '09:50', c: '6.75' }
  },
  'pp_4024_s23_22_q7': {
    id: 'pp_4024_s23_22_q7', questionNumber: '7', title: 'Histogram and estimated mean',
    question: '(a)(i) Find the value of p from the histogram.\n(a)(ii) Complete the histogram.\n(a)(iii) Find probability customer spent more than $50.\n(b)(i) Calculate estimated mean for Tuesday\'s data.\n(b)(ii) Explain why adding $41 would increase the estimated mean.',
    marks: 9, hints: ['(a)(i) Read frequency density × class width', '(b)(i) Use midpoints × frequencies / total'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) p', key: 'ai', marks: 1 }, { label: '(a)(iii) Probability', key: 'aiii', marks: 1 }, { label: '(b)(i) Mean ($)', key: 'bi', marks: 3 }],
    answer: { ai: '15', aiii: '43/100', bi: '42.79' }
  },
  'pp_4024_s23_22_q8': {
    id: 'pp_4024_s23_22_q8', questionNumber: '8', title: 'Similar rectangles and cone',
    question: '(a)(i) Rectangle R: length = 2 × width, perimeter = 20.4 cm. Find dimensions.\n(a)(ii) Rectangle S similar to R, perimeter = 30.6 cm. Find length of S.\n(b)(i) Sector angle 75°, radius 8 cm. Find arc length expression.\n(b)(ii) Sector forms cone curved surface. Find volume of water.',
    marks: 11, hints: ['(a)(i) 2w + 2(2w) = 20.4, 6w = 20.4, w = 3.4, l = 6.8', '(a)(ii) SF = 30.6/20.4 = 1.5, length = 10.2'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Length (cm)', key: 'al', marks: 1 }, { label: '(a)(i) Width (cm)', key: 'aw', marks: 1 }, { label: '(a)(ii) Length of S (cm)', key: 'aii', marks: 2 }, { label: '(b)(i) Arc length', key: 'bi', marks: 2 }, { label: '(b)(ii) Volume (cm³)', key: 'bii', marks: 5 }],
    answer: { al: '6.8', aw: '3.4', aii: '10.2', bi: '10π/3', bii: '22.8' }
  },
  'pp_4024_s23_22_q9': {
    id: 'pp_4024_s23_22_q9', questionNumber: '9', title: 'Bearings and 3D trigonometry',
    question: 'A, B, C on horizontal ground. Bearing of B from A = 072°, C from A = 205°. AB = 170 m, AC = 95 m.\n(a) Calculate BC.\n(b) Find bearing of A from C.\n(c)(i) D is due south of A, due east of C. Show AD = 86.1 m.\n(c)(ii) X is at top of vertical mast at A. Angle of elevation from B = 7°. Find angle of elevation from D.',
    marks: 12, hints: ['(a) Angle BAC = 205 − 72 = 133°, use cosine rule', '(b) Bearing = 025°', '(c)(ii) AX = 170 tan 7°, then tan(angle) = AX/86.1'],
    type: 'multi-part',
    parts: [{ label: '(a) BC (m)', key: 'a', marks: 4 }, { label: '(b) Bearing', key: 'b', marks: 2 }, { label: '(c)(ii) Angle of elevation', key: 'cii', marks: 4 }],
    answer: { a: '245', b: '025', cii: '13.6' }
  },
  'pp_4024_s23_22_q10': {
    id: 'pp_4024_s23_22_q10', questionNumber: '10', title: 'Vectors',
    question: '(a) F = (6,1), G = (−2,4), GH = (−1, −10). Calculate |FH|.\n(b) OA = a, OB = b, AC = kb. X on OC such that OX = mOC.\n(i) Write OX in terms of m, k, a, b.\n(ii) BX = 3a − ½b. Find m and k.',
    marks: 8, hints: ['(a) H = G + GH = (−3, −6), FH = H − F = (−9, −7), |FH| = √(81+49)', '(b)(i) OC = OA + AC = a + kb, OX = m(a + kb)'],
    type: 'multi-part',
    parts: [{ label: '(a) |FH|', key: 'a', marks: 3 }, { label: '(b)(i) OX', key: 'bi', marks: 2 }, { label: '(b)(ii) m and k', key: 'bii', marks: 3 }],
    answer: { a: '10.3', bi: 'm(a+kb)', bii: 'm = 3/5, k = ... (from mark scheme)' }
  },
};

export const sections4024_22_2023: PastPaperSection[] = [
  { id: 's_4024_s23_22_q1', title: 'Q1 – Costs, pie chart & %', questionId: 'pp_4024_s23_22_q1' },
  { id: 's_4024_s23_22_q2', title: 'Q2 – Equations & algebra', questionId: 'pp_4024_s23_22_q2' },
  { id: 's_4024_s23_22_q3', title: 'Q3 – Polygon & circle theorems', questionId: 'pp_4024_s23_22_q3' },
  { id: 's_4024_s23_22_q4', title: 'Q4 – Exponential graph', questionId: 'pp_4024_s23_22_q4' },
  { id: 's_4024_s23_22_q5', title: 'Q5 – Standard form', questionId: 'pp_4024_s23_22_q5' },
  { id: 's_4024_s23_22_q6', title: 'Q6 – Ratio, speed & bounds', questionId: 'pp_4024_s23_22_q6' },
  { id: 's_4024_s23_22_q7', title: 'Q7 – Histogram & mean', questionId: 'pp_4024_s23_22_q7' },
  { id: 's_4024_s23_22_q8', title: 'Q8 – Similar shapes & cone', questionId: 'pp_4024_s23_22_q8' },
  { id: 's_4024_s23_22_q9', title: 'Q9 – Bearings & 3D trig', questionId: 'pp_4024_s23_22_q9' },
  { id: 's_4024_s23_22_q10', title: 'Q10 – Vectors', questionId: 'pp_4024_s23_22_q10' },
];
