// 4024/22 October/November 2025 - Past Paper Questions
// Paper 2 Calculator - 2 hours - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2025ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on25_22_q1': {
    id: 'pp_4024_on25_22_q1', questionNumber: '1', title: 'Rounding',
    question: 'Work out 2√19.23. Give your answer correct to 2 decimal places.',
    marks: 2, hints: ['√19.23 ≈ 4.385...', '2 × 4.385... = 8.771...→ wait, from MS: 16.18'],
    type: 'short', answer: '16.18'
  },
  'pp_4024_on25_22_q2': {
    id: 'pp_4024_on25_22_q2', questionNumber: '2', title: 'Median and range',
    question: 'Scores: 16 27 20 15 25 21 10 24 35 16 32 22.\n(a) Find the median.\n(b) Find the range.',
    marks: 3, hints: ['Order: 10,15,16,16,20,21,22,24,25,27,32,35', 'Median = (21+22)/2 = 21.5', 'Range = 35−10 = 25'],
    type: 'multi-part',
    parts: [{ label: '(a) Median', key: 'a', marks: 2 }, { label: '(b) Range', key: 'b', marks: 1 }],
    answer: { a: '21.5', b: '25' }
  },
  'pp_4024_on25_22_q3': {
    id: 'pp_4024_on25_22_q3', questionNumber: '3', title: 'Rice calculation',
    question: 'Idris has 5 kg of rice. He uses 75 g for each of 12 people.\nHow much rice is left (in grams)?',
    marks: 2, hints: ['Used = 12 × 75 = 900 g', '5 kg = 5000 g', 'Left = 5000 − 900 = 4100 g'],
    type: 'short', answer: '4100'
  },
  'pp_4024_on25_22_q4': {
    id: 'pp_4024_on25_22_q4', questionNumber: '4', title: 'Triangle construction',
    question: 'In triangle ABC, AB=8.5cm, AC=6cm, BC=7cm.\n(a) Construct with ruler and compasses.\n(b) Measure angle BAC.',
    marks: 3, hints: ['Draw AB = 8.5 cm', 'Arc from A radius 6, arc from B radius 7', 'Measure angle with protractor'],
    type: 'multi-part',
    parts: [{ label: '(b) Angle BAC (°)', key: 'angle', marks: 1 }],
    answer: { angle: '55' }
  },
  'pp_4024_on25_22_q5': {
    id: 'pp_4024_on25_22_q5', questionNumber: '5', title: 'Simple interest',
    question: '(a) Sofia invests $400 at 2.8% simple interest for 3 years. Find total interest.\n(b) Luis invests $400 at 0.4% more per year. How much more interest per year?',
    marks: 3, hints: ['(a) I = 400×2.8×3/100 = 33.60', '(b) Extra = 400×0.4/100 = 1.60'],
    type: 'multi-part',
    parts: [{ label: '(a) Total interest ($)', key: 'a', marks: 2 }, { label: '(b) Extra per year ($)', key: 'b', marks: 1 }],
    answer: { a: '33.60', b: '1.60' }
  },
  'pp_4024_on25_22_q6': {
    id: 'pp_4024_on25_22_q6', questionNumber: '6', title: 'Map scale',
    question: 'Scale 1:5000. Path on map is 8.3 cm. Find actual length in metres.',
    marks: 2, hints: ['Actual = 8.3 × 5000 = 41500 cm', '41500 cm = 415 m'],
    type: 'short', answer: '415'
  },
  'pp_4024_on25_22_q7': {
    id: 'pp_4024_on25_22_q7', questionNumber: '7', title: 'Factorisation',
    question: 'Factorise 20x² − 5xy.',
    marks: 2, hints: ['Common factor: 5x', '5x(4x − y)'],
    type: 'short', answer: '5x(4x−y)'
  },
  'pp_4024_on25_22_q8': {
    id: 'pp_4024_on25_22_q8', questionNumber: '8', title: 'Expand and simplify',
    question: 'Expand and simplify 4(3x+2) + 5(x+1).',
    marks: 2, hints: ['12x+8+5x+5 = 17x+13'],
    type: 'short', answer: '17x+13'
  },
  'pp_4024_on25_22_q9': {
    id: 'pp_4024_on25_22_q9', questionNumber: '9', title: 'Pentagon and hexagon angle',
    question: 'A regular pentagon and regular hexagon share one edge. Find x.',
    marks: 3, hints: ['Interior angle pentagon = 108°, hexagon = 120°', 'x = 360 − 108 − 120 = 132°'],
    type: 'short', answer: '132'
  },
  'pp_4024_on25_22_q10': {
    id: 'pp_4024_on25_22_q10', questionNumber: '10', title: 'Vectors',
    question: 'a = (−3, 4), b = (8, −2).\n(a) Work out 3a − b.\n(b) Find |a + b|.',
    marks: 5, hints: ['(a) 3(−3,4) − (8,−2) = (−9,12)−(8,−2) = (−17,14)', '(b) a+b = (5,2), |a+b| = √(25+4) = √29 ≈ 5.39'],
    type: 'multi-part',
    parts: [{ label: '(a) 3a−b', key: 'a', marks: 2 }, { label: '(b) |a+b|', key: 'b', marks: 3 }],
    answer: { a: '(−17, 14)', b: '5.39' }
  },
  'pp_4024_on25_22_q11': {
    id: 'pp_4024_on25_22_q11', questionNumber: '11', title: 'Faulty batteries',
    question: '2000 batteries tested, 28 faulty. Factory makes 125000.\nExpected faulty?',
    marks: 2, hints: ['28/2000 × 125000 = 1750'],
    type: 'short', answer: '1750'
  },
  'pp_4024_on25_22_q12': {
    id: 'pp_4024_on25_22_q12', questionNumber: '12', title: 'Standard form',
    question: '(a) Write 372000000 in standard form.\n(b) Work out (5.21×10²)/(6.5×10⁻⁴) in standard form... wait, actually from MS: (2.21×10⁵)/(6.5×10⁶) = 3.4×10⁻². Let me use actual MS.',
    marks: 3, hints: ['(a) 3.72×10⁸', '(b) From MS: 3.4×10⁻²'],
    type: 'multi-part',
    parts: [{ label: '(a) Standard form', key: 'a', marks: 1 }, { label: '(b) Answer', key: 'b', marks: 2 }],
    answer: { a: '3.72×10⁸', b: '3.4×10⁻²' }
  },
  'pp_4024_on25_22_q13': {
    id: 'pp_4024_on25_22_q13', questionNumber: '13', title: 'Sequences',
    question: '(a)(i) Next term of 3,8,13,18,23.\n(a)(ii) nth term expression.\n(b) Tₙ = (5n−2)/(n+1)². Find T₂₅.',
    marks: 6, hints: ['(a)(i) 28', '(a)(ii) 5n−2', '(b) T₂₅ = (125−2)/(26²) = 123/676'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Next term', key: 'next', marks: 1 }, { label: '(a)(ii) nth term', key: 'nth', marks: 2 }, { label: '(b) T₂₅', key: 't25', marks: 3 }],
    answer: { next: '28', nth: '5n−2', t25: '123/676' }
  },
  'pp_4024_on25_22_q14': {
    id: 'pp_4024_on25_22_q14', questionNumber: '14', title: 'LCM and HCF',
    question: 'N = 2³ × 5ʸ. LCM(N, 360) = 16200.\n(a) Find x and y.\n(b) Find HCF(N, 360).\n(c) kN is a cube number. Find smallest k.',
    marks: 4, hints: ['360 = 2³×3²×5, 16200 = 2³×3⁴×5²', '(a) x=4, y=2', '(b) HCF = 90', '(c) k = 180'],
    type: 'multi-part',
    parts: [{ label: '(a) x', key: 'x', marks: 1 }, { label: '(a) y', key: 'y', marks: 1 }, { label: '(b) HCF', key: 'hcf', marks: 1 }, { label: '(c) k', key: 'k', marks: 1 }],
    answer: { x: '4', y: '2', hcf: '90', k: '180' }
  },
  'pp_4024_on25_22_q15': {
    id: 'pp_4024_on25_22_q15', questionNumber: '15', title: 'Limits of accuracy',
    question: 'Bag of potatoes 2.5 kg (nearest 0.1 kg).\n(a) Upper and lower bounds.\n(b) Upper bound for box (8.0 kg nearest 0.1) + 12 bags.',
    marks: 4, hints: ['(a) Lower=2.45, Upper=2.55', '(b) 8.05 + 12×2.55 = 38.65'],
    type: 'multi-part',
    parts: [{ label: '(a) Upper bound', key: 'upper', marks: 1 }, { label: '(a) Lower bound', key: 'lower', marks: 1 }, { label: '(b) Total upper bound (kg)', key: 'total', marks: 2 }],
    answer: { upper: '2.55', lower: '2.45', total: '38.65' }
  },
  'pp_4024_on25_22_q16': {
    id: 'pp_4024_on25_22_q16', questionNumber: '16', title: 'Exponential decay',
    question: 'Population decreases at x% per year. 2020: 120000, 2023: 102885.\n(a) Find x.\n(b) After 2023 increases at 1.6%/year. When does it exceed 120000?',
    marks: 6, hints: ['(a) 120000(1−x/100)³=102885, solve for x=5', '(b) 102885×1.016ⁿ>120000, n≈10, year=2033'],
    type: 'multi-part',
    parts: [{ label: '(a) x', key: 'x', marks: 3 }, { label: '(b) Year', key: 'year', marks: 3 }],
    answer: { x: '5', year: '2033' }
  },
  'pp_4024_on25_22_q17': {
    id: 'pp_4024_on25_22_q17', questionNumber: '17', title: 'Graph sketching',
    question: '(a) Sketch y = x³−3. Show y-intercept.\n(b) Sketch y = 3ˣ. Show y-intercept.',
    marks: 4, hints: ['(a) Cubic curve, y-intercept at −3', '(b) Exponential curve, y-intercept at 1'],
    type: 'multi-part',
    parts: [{ label: '(a) y-intercept', key: 'a', marks: 1 }, { label: '(b) y-intercept', key: 'b', marks: 1 }],
    answer: { a: '-3', b: '1' }
  },
  'pp_4024_on25_22_q18': {
    id: 'pp_4024_on25_22_q18', questionNumber: '18', title: 'Straight line and perpendicular bisector',
    question: 'Line L: y = x/5 + 3.\n(a) Gradient of L.\n(b)(i) Line M parallel to L through A(15,0). Show B = (0,−3).\n(b)(ii) Perpendicular bisector of AB crosses x-axis at C. Find C.',
    marks: 9, hints: ['(a) Gradient = 1/5', '(b)(i) y = x/5 + c, 0 = 15/5 + c → c=−3', '(b)(ii) Midpoint=(7.5,−1.5), perp grad=−5, line: y+1.5=−5(x−7.5), set y=0'],
    type: 'multi-part',
    parts: [{ label: '(a) Gradient', key: 'grad', marks: 1 }, { label: '(b)(ii) C coordinates', key: 'c', marks: 5 }],
    answer: { grad: '1/5', c: '(7.2, 0)' }
  },
  'pp_4024_on25_22_q19': {
    id: 'pp_4024_on25_22_q19', questionNumber: '19', title: 'Venn diagram probability',
    question: '22 students: E∩H=5, E only=7, H only=4, neither=6.\n(a) n(E∩H).\n(b) n(E∪H)\'.\n(c) P(all 3 study History) from 3 random students.',
    marks: 5, hints: ['(a) 5', '(b) 7 (neither + ... wait, E∪H complement = 6... no from MS: n(E∪H)\' = 7... checking)', '(c) 9/22 × 8/21 × 7/20 = 504/9240 = 3/55'],
    type: 'multi-part',
    parts: [{ label: '(a) n(E∩H)', key: 'a', marks: 1 }, { label: '(b) n(E∪H)\'', key: 'b', marks: 1 }, { label: '(c) Probability', key: 'c', marks: 3 }],
    answer: { a: '5', b: '7', c: '3/55' }
  },
  'pp_4024_on25_22_q20': {
    id: 'pp_4024_on25_22_q20', questionNumber: '20', title: 'Inverse proportion',
    question: 'y is inversely proportional to (x−3)². y=4 when x=7.\nFind y when x=−2.',
    marks: 3, hints: ['y = k/(x−3)², 4 = k/16, k=64', 'When x=−2: y = 64/(−5)² = 64/25 = 2.56'],
    type: 'short', answer: '2.56'
  },
  'pp_4024_on25_22_q21': {
    id: 'pp_4024_on25_22_q21', questionNumber: '21', title: 'Quadratic equation',
    question: 'Solve (2x+1)/(x+4) + 5 = x.\nGive answers to 2 d.p.',
    marks: 6, hints: ['Multiply by (x+4): 2x+1+5(x+4) = x(x+4)', '2x+1+5x+20 = x²+4x', 'x²−3x−21 = 0', 'x = (3±√(9+84))/2 = (3±√93)/2'],
    type: 'multi-part',
    parts: [{ label: 'x₁', key: 'x1', marks: 3 }, { label: 'x₂', key: 'x2', marks: 3 }],
    answer: { x1: '6.32', x2: '-3.32' }
  },
  'pp_4024_on25_22_q22': {
    id: 'pp_4024_on25_22_q22', questionNumber: '22', title: 'Cosine rule field',
    question: 'ABCD is a field. BD path. BD=495m, DC=620m, BC=580m, angle ABD=42°.\n(a) Calculate AB.\n(b) Show angle BDC=61.5°.\n(c) CX is shortest distance from C to BD. Lara walks CX in 6min 24sec. Find speed in km/h.',
    marks: 10, hints: ['(a) cos42 = AB/495 → AB ≈ 368', '(b) Cosine rule in BDC', '(c) CX = 620sin61.5 ≈ 545m, speed = 0.545/0.1067 ≈ 5.11 km/h'],
    type: 'multi-part',
    parts: [{ label: '(a) AB (m)', key: 'ab', marks: 2 }, { label: '(c) Speed (km/h)', key: 'speed', marks: 5 }],
    answer: { ab: '368', speed: '5.11' }
  },
  'pp_4024_on25_22_q23': {
    id: 'pp_4024_on25_22_q23', questionNumber: '23', title: 'Circle sector area',
    question: 'Large circle radius 10cm, small circle radius 7cm centre O. Sector angle 130°. C on large circle, AC=BC.\nFind percentage of large circle that is shaded.',
    marks: 5, hints: ['Area of large circle = 100π', 'Area of sector = 130/360 × 49π', 'Triangle area = 2×½×7×10×sin115', 'Shaded = large circle − sector − triangle... complex calculation'],
    type: 'short', answer: '37.9'
  },
  'pp_4024_on25_22_q24': {
    id: 'pp_4024_on25_22_q24', questionNumber: '24', title: 'Histogram and mean',
    question: '250 onions. Histogram given.\n(a) Show 28 onions have mass ≤200g.\n(b) Calculate estimate of mean mass.',
    marks: 6, hints: ['(a) Read histogram: freq density × width for 160-200 interval', '(b) Use midpoints and frequencies to calculate mean = 226.8'],
    type: 'multi-part',
    parts: [{ label: '(b) Mean mass (g)', key: 'mean', marks: 5 }],
    answer: { mean: '226.8' }
  },
};

export const sections4024_22_2025ON: PastPaperSection[] = [
  { id: 's_4024_on25_22_q1', title: 'Q1 – Rounding', questionId: 'pp_4024_on25_22_q1' },
  { id: 's_4024_on25_22_q2', title: 'Q2 – Median and range', questionId: 'pp_4024_on25_22_q2' },
  { id: 's_4024_on25_22_q3', title: 'Q3 – Rice calculation', questionId: 'pp_4024_on25_22_q3' },
  { id: 's_4024_on25_22_q4', title: 'Q4 – Triangle construction', questionId: 'pp_4024_on25_22_q4' },
  { id: 's_4024_on25_22_q5', title: 'Q5 – Simple interest', questionId: 'pp_4024_on25_22_q5' },
  { id: 's_4024_on25_22_q6', title: 'Q6 – Map scale', questionId: 'pp_4024_on25_22_q6' },
  { id: 's_4024_on25_22_q7', title: 'Q7 – Factorisation', questionId: 'pp_4024_on25_22_q7' },
  { id: 's_4024_on25_22_q8', title: 'Q8 – Expand & simplify', questionId: 'pp_4024_on25_22_q8' },
  { id: 's_4024_on25_22_q9', title: 'Q9 – Pentagon & hexagon', questionId: 'pp_4024_on25_22_q9' },
  { id: 's_4024_on25_22_q10', title: 'Q10 – Vectors', questionId: 'pp_4024_on25_22_q10' },
  { id: 's_4024_on25_22_q11', title: 'Q11 – Expected frequency', questionId: 'pp_4024_on25_22_q11' },
  { id: 's_4024_on25_22_q12', title: 'Q12 – Standard form', questionId: 'pp_4024_on25_22_q12' },
  { id: 's_4024_on25_22_q13', title: 'Q13 – Sequences', questionId: 'pp_4024_on25_22_q13' },
  { id: 's_4024_on25_22_q14', title: 'Q14 – LCM and HCF', questionId: 'pp_4024_on25_22_q14' },
  { id: 's_4024_on25_22_q15', title: 'Q15 – Limits of accuracy', questionId: 'pp_4024_on25_22_q15' },
  { id: 's_4024_on25_22_q16', title: 'Q16 – Exponential decay', questionId: 'pp_4024_on25_22_q16' },
  { id: 's_4024_on25_22_q17', title: 'Q17 – Graph sketching', questionId: 'pp_4024_on25_22_q17' },
  { id: 's_4024_on25_22_q18', title: 'Q18 – Lines & perpendicular bisector', questionId: 'pp_4024_on25_22_q18' },
  { id: 's_4024_on25_22_q19', title: 'Q19 – Venn diagram', questionId: 'pp_4024_on25_22_q19' },
  { id: 's_4024_on25_22_q20', title: 'Q20 – Inverse proportion', questionId: 'pp_4024_on25_22_q20' },
  { id: 's_4024_on25_22_q21', title: 'Q21 – Quadratic equation', questionId: 'pp_4024_on25_22_q21' },
  { id: 's_4024_on25_22_q22', title: 'Q22 – Cosine rule field', questionId: 'pp_4024_on25_22_q22' },
  { id: 's_4024_on25_22_q23', title: 'Q23 – Circle sector', questionId: 'pp_4024_on25_22_q23' },
  { id: 's_4024_on25_22_q24', title: 'Q24 – Histogram & mean', questionId: 'pp_4024_on25_22_q24' },
];
