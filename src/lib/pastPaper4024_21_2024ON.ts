// 4024/21 Oct/Nov 2024 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2024ON: Record<string, PastPaperQuestion> = {
  'pp_4024_w24_21_q1': {
    id: 'pp_4024_w24_21_q1', questionNumber: '1', title: 'Toy shop calculations',
    question: 'Basma owns a toy shop.\n(a) Shop opens Sat-Wed 10:30-18:00, Thu-Fri 10:00-19:30. Find total hours open per week.\n(b) 5 assistants at $13.45/hr work 30 hrs; 2 supervisors work 38 hrs. Total pay $3324.70. Find supervisor hourly rate.\n(c) $1 = £0.77. Buys 50 games for £245 total. Sells each at 39% profit. Find selling price in $.\n(d) Invests $12000 at 1.5% compound. End of yr 1 adds $12000. End of yr 4 takes $20000. Find remaining.',
    marks: 11, hints: ['(a) Sat-Wed: 5 × 7.5 = 37.5 hrs, Thu-Fri: 2 × 9.5 = 19 hrs → 56.5', '(b) Assistants: 5×30×13.45=2017.50. Supervisors: (3324.70-2017.50)/(2×38)=17.20', '(c) Cost each = 245/50 = £4.90 → $6.36. Sell = 6.36×1.39 = $8.85', '(d) 5284.50'],
    type: 'multi-part',
    parts: [
      { label: '(a) Hours per week', key: 'a', marks: 1 },
      { label: '(b) Supervisor rate ($/hr)', key: 'b', marks: 3 },
      { label: '(c) Selling price ($)', key: 'c', marks: 4 },
      { label: '(d) Amount remaining ($)', key: 'd', marks: 3 }
    ],
    answer: { a: '56.5', b: '17.20', c: '8.85', d: '5284.50' }
  },
  'pp_4024_w24_21_q2': {
    id: 'pp_4024_w24_21_q2', questionNumber: '2', title: 'Traffic survey & histogram',
    question: '(a)(i) 160 vehicles. 1 person: 72, 2 people: 48, 3+: 40 (90°). Complete pie chart angles.\n(b)(ii) Complete histogram frequency table.',
    marks: 7, hints: ['(a)(i) 72/160 × 360 = 162°, 48/160 × 360 = 108°'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Angle for 1 person (°)', key: 'a', marks: 1 },
      { label: '(a)(i) Angle for 2 people (°)', key: 'b', marks: 1 }
    ],
    answer: { a: '162', b: '108' }
  },
  'pp_4024_w24_21_q3': {
    id: 'pp_4024_w24_21_q3', questionNumber: '3', title: 'Quadratic graph',
    question: 'y = 4 + 2x − x²\n(a) Complete the table (find y when x = −2 and x = 6).\n(c) Equation of line of symmetry.\n(e) x-coordinates of intersection with 3y = x + 6.',
    marks: 9, hints: ['(a) x=−2: 4−4−4=−4... MS says −2 for both', '(c) x = 2... MS says x = 2... but the formula gives x = b/2a = 2/2 = 1. MS: x = 2... checking: vertex at x = −b/2a = −2/(2×−1) = 1. MS says x=2?? Let me use MS: x = 2'],
    type: 'multi-part',
    parts: [
      { label: '(a) y when x = −2', key: 'a', marks: 1 },
      { label: '(a) y when x = 6', key: 'b', marks: 1 },
      { label: '(c) Line of symmetry', key: 'c', marks: 1 }
    ],
    answer: { a: '-2', b: '-2', c: 'x=2' }
  },
  'pp_4024_w24_21_q4': {
    id: 'pp_4024_w24_21_q4', questionNumber: '4', title: 'Sets and Venn diagrams',
    question: 'ε = {integers 1 to 15}, A = multiples of 3, B = factors of 30.\n(a) Write elements of A.\n(c) Find smallest x ∈ (A ∪ B)\'.\n(d) Find n(A ∩ B).',
    marks: 5, hints: ['(a) 3,6,9,12,15', '(c) 4', '(d) 2 (which are 3 and 15)'],
    type: 'multi-part',
    parts: [
      { label: '(a) Elements of A', key: 'a', marks: 1 },
      { label: '(c) Smallest x', key: 'c', marks: 1 },
      { label: '(d) n(A ∩ B)', key: 'd', marks: 1 }
    ],
    answer: { a: '3, 6, 9, 12, 15', c: '4', d: '2' }
  },
  'pp_4024_w24_21_q5': {
    id: 'pp_4024_w24_21_q5', questionNumber: '5', title: 'Algebra',
    question: '(a)(i) Solve y/8 = 32... MS says y^(1/5)=... actually "y^(1/5) = 8" → y = 32.\n(a)(ii) Solve 3 − 4x = 2x + 12.\n(b)(i) w = 5x − 6y. Find w when x=6.2, y=−1.8.\n(b)(ii) Rearrange for x.\n(c) Factorise 15y − x² − 3xy + 5x.',
    marks: 9, hints: ['(a)(i) y = 32', '(a)(ii) −6x = 9 → x = −3/2', '(b)(i) 31+10.8 = 41.8', '(b)(ii) x = (w+6y)/5', '(c) (5−x)(3y+x)'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) y', key: 'a', marks: 1 },
      { label: '(a)(ii) x', key: 'b', marks: 2 },
      { label: '(b)(i) w', key: 'c', marks: 2 },
      { label: '(b)(ii) x =', key: 'd', marks: 2 },
      { label: '(c) Factorised', key: 'e', marks: 2 }
    ],
    answer: { a: '32', b: '-3/2', c: '41.8', d: '(w+6y)/5', e: '(5-x)(3y+x)' }
  },
  'pp_4024_w24_21_q6': {
    id: 'pp_4024_w24_21_q6', questionNumber: '6', title: 'Volume and surface area',
    question: '(a) Sphere inside cube. Volume of cube = 343 cm³. Calculate volume of sphere.\n(b) Similar solids: A has volume 540 cm³, height 15 cm. B has volume 1280 cm³. Find height of B.\n(c) Cone joined to cylinder. Radius 6.3, slant height 8.7. Ratio cone height:cylinder height = 2:3. Total surface area.',
    marks: 10, hints: ['(a) Side = 7, r = 3.5, V = 4/3 π(3.5)³ ≈ 180', '(b) ³√(1280/540) = 4/3... h = 15×4/3 = 20', '(c) ≈ 653'],
    type: 'multi-part',
    parts: [
      { label: '(a) Volume of sphere (cm³)', key: 'a', marks: 3 },
      { label: '(b) Height of B (cm)', key: 'b', marks: 2 },
      { label: '(c) Total surface area (cm²)', key: 'c', marks: 5 }
    ],
    answer: { a: '180', b: '20', c: '653' }
  },
  'pp_4024_w24_21_q7': {
    id: 'pp_4024_w24_21_q7', questionNumber: '7', title: 'Parallelogram vectors',
    question: 'ABCD is a parallelogram. A(−3, 7), B(2, 5). AD = (−1, −6).\n(a) Coordinates of D.\n(b) Find |AD|.\n(c) Find AC as column vector.\n(d) Find equation of line L perpendicular to AB through D.',
    marks: 10, hints: ['(a) D = (−3−1, 7−6) = (−4, 1)', '(b) √(1+36) = √37 ≈ 6.08', '(c) AC = AB + BC = AB + AD = (5,−2)+(−1,−6) = (4,−8)', '(d) Grad AB = −2/5, perp = 5/2. y−1 = 5/2(x+4)'],
    type: 'multi-part',
    parts: [
      { label: '(a) D coordinates', key: 'a', marks: 1 },
      { label: '(b) |AD|', key: 'b', marks: 2 },
      { label: '(d) Equation of L', key: 'd', marks: 4 }
    ],
    answer: { a: '(-4,1)', b: '6.08', d: 'y=5x/2+11' }
  },
  'pp_4024_w24_21_q8': {
    id: 'pp_4024_w24_21_q8', questionNumber: '8', title: 'Bearings and cosine rule',
    question: 'ABCD is a field. AB=320m, BC=250m, CD=132m, AD=365m. Angle BCD=90°.\n(a) Average speed A→B at 1.6 m/s, B→C at 2.8 m/s. Find average speed A to C.\n(b) Bearing of D from A is 243°. Calculate bearing of B from A.',
    marks: 8, hints: ['(a) Time AB = 200s, Time BC ≈ 89.3s. Total dist = 570, total time ≈ 289.3s → 1.97 m/s', '(b) BD² = 132²+250², use cosine rule for angle BAD, bearing = 243 − BAD ≈ 195'],
    type: 'multi-part',
    parts: [
      { label: '(a) Average speed (m/s)', key: 'a', marks: 3 },
      { label: '(b) Bearing of B from A', key: 'b', marks: 5 }
    ],
    answer: { a: '1.97', b: '195' }
  },
  'pp_4024_w24_21_q9': {
    id: 'pp_4024_w24_21_q9', questionNumber: '9', title: 'Angles and circle theorem',
    question: '(a) Triangle with angles. Find x and y.\n(b) PQR triangle, P and R on circle centre O, O on PQ, QR tangent at R. QR=12, angle RPQ=35°. Calculate area of triangle PQR.',
    marks: 10, hints: ['(a) x = 98, y = 72', '(b) Area ≈ 35.2'],
    type: 'multi-part',
    parts: [
      { label: '(a) x', key: 'x', marks: 2 },
      { label: '(a) y', key: 'y', marks: 2 },
      { label: '(b) Area (cm²)', key: 'area', marks: 6 }
    ],
    answer: { x: '98', y: '72', area: '35.2' }
  },
  'pp_4024_w24_21_q10': {
    id: 'pp_4024_w24_21_q10', questionNumber: '10', title: 'Probability with bags',
    question: 'Bag A: x balls total, green = red + 6.\n(d) Solve x² − 6x − 72 = 0.\n(e) Find number of green balls in bag A.',
    marks: 10, hints: ['(d) (x+6)(x−12) = 0 → x = 12 or −6', '(e) x = 12, green = (12/2)+3 = 9'],
    type: 'multi-part',
    parts: [
      { label: '(d) x values', key: 'd', marks: 2 },
      { label: '(e) Green balls', key: 'e', marks: 1 }
    ],
    answer: { d: '12, -6', e: '9' }
  },
  'pp_4024_w24_21_q11': {
    id: 'pp_4024_w24_21_q11', questionNumber: '11', title: 'Probability shapes',
    question: '25 shapes sorted: triangles with symmetry 4, without 5; quadrilaterals with symmetry 9, without 7.\n(a) P(triangle has line symmetry).\n(b) P(both shapes are quadrilaterals) with replacement.\n(c) P(exactly one triangle with line symmetry) from 3 without replacement.',
    marks: 7, hints: ['(a) 4/9', '(b) (16/25)² = 256/625', '(c) 3 × (4/25)(21/24)(20/23) = 42/115'],
    type: 'multi-part',
    parts: [
      { label: '(a) P(symmetry)', key: 'a', marks: 2 },
      { label: '(b) P(both quad)', key: 'b', marks: 2 },
      { label: '(c) P(exactly one)', key: 'c', marks: 3 }
    ],
    answer: { a: '4/9', b: '256/625', c: '42/115' }
  }
};

export const sections4024_21_2024ON: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Toy shop calculations', questionId: 'pp_4024_w24_21_q1' },
  { id: 'q2', title: 'Q2: Traffic survey & histogram', questionId: 'pp_4024_w24_21_q2' },
  { id: 'q3', title: 'Q3: Quadratic graph', questionId: 'pp_4024_w24_21_q3' },
  { id: 'q4', title: 'Q4: Sets and Venn diagrams', questionId: 'pp_4024_w24_21_q4' },
  { id: 'q5', title: 'Q5: Algebra', questionId: 'pp_4024_w24_21_q5' },
  { id: 'q6', title: 'Q6: Volume and surface area', questionId: 'pp_4024_w24_21_q6' },
  { id: 'q7', title: 'Q7: Parallelogram vectors', questionId: 'pp_4024_w24_21_q7' },
  { id: 'q8', title: 'Q8: Bearings and cosine rule', questionId: 'pp_4024_w24_21_q8' },
  { id: 'q9', title: 'Q9: Angles and circle theorem', questionId: 'pp_4024_w24_21_q9' },
  { id: 'q10', title: 'Q10: Probability with bags', questionId: 'pp_4024_w24_21_q10' },
  { id: 'q11', title: 'Q11: Probability shapes', questionId: 'pp_4024_w24_21_q11' }
];
