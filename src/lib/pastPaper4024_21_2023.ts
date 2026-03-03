// 4024/21 May/June 2023 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2023: Record<string, PastPaperQuestion> = {
  'pp_4024_s23_21_q1': {
    id: 'pp_4024_s23_21_q1', questionNumber: '1', title: 'Cuboid volume and graph',
    question: 'A cuboid has dimensions x cm, (5 − x) cm and 15 cm.\n(a) Show that y = 75x − 15x².\n(b) Complete the table for y = 75x − 15x².\n(c) Draw the graph for 1 ≤ x ≤ 4.\n(d)(i) Show the volume of a pyramid is y = 27x.\n(d)(ii) By drawing y = 27x, find the height when volumes are equal.',
    marks: 9, hints: ['(a) V = x(5−x)(15) = 75x − 15x²', '(b) When x = 4: y = 300 − 240 = 60', '(d)(ii) Draw y = 27x and find intersection'],
    type: 'multi-part',
    parts: [{ label: '(b) y when x = 4', key: 'b', marks: 1 }, { label: '(d)(ii) Height (cm)', key: 'dii', marks: 3 }],
    answer: { b: '60', dii: '3.2' }
  },
  'pp_4024_s23_21_q2': {
    id: 'pp_4024_s23_21_q2', questionNumber: '2', title: 'Time, rates and percentages',
    question: '(a) Filomena starts at 10:45 am and works for 2 hours 50 minutes. Find the time she finishes.\n(b)(i) Xavier works 4½ hours/day for 5 days, earning $261/week. Find hourly rate.\n(b)(ii) One day his time decreases by 20%. Find new time.\n(c) Miguel\'s income increased from $32,000 to $33,408. Find % increase.\n(d) Miguel invests $x at 1.2% simple interest. After 3 years he has $890.96. Find x.',
    marks: 8, hints: ['(a) 10:45 + 2h50m = 13:35', '(b)(i) 261 ÷ 22.5 = $11.60', '(c) (1408/32000) × 100 = 4.4%'],
    type: 'multi-part',
    parts: [{ label: '(a) Finish time', key: 'a', marks: 1 }, { label: '(b)(i) Hourly rate ($)', key: 'bi', marks: 1 }, { label: '(b)(ii) Time', key: 'bii', marks: 2 }, { label: '(c) % increase', key: 'c', marks: 2 }, { label: '(d) x', key: 'd', marks: 2 }],
    answer: { a: '13:35', bi: '11.60', bii: '3 hours 36 minutes', c: '4.4', d: '860' }
  },
  'pp_4024_s23_21_q3': {
    id: 'pp_4024_s23_21_q3', questionNumber: '3', title: 'Angles and circle theorems',
    question: '(a) PQ is parallel to RS. ABCD is straight line. BE = CE and angle ABE = 110°. Calculate angle ECQ with reasons.\n(b) U,V,W,X,Y on circle centre O. UY diameter. ZX tangent. VUX = 35°, XZY = a°, VWY = b°. Find b in terms of a.',
    marks: 7, hints: ['(a) CBE = 70°, BCE = 70° (isosceles), BCQ = 110° (corresponding), ECQ = 40°', '(b) OXZ = 90°, work through circle theorems'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle ECQ', key: 'a', marks: 3 }, { label: '(b) b in terms of a', key: 'b', marks: 4 }],
    answer: { a: '40', b: '(100+a)/2' }
  },
  'pp_4024_s23_21_q4': {
    id: 'pp_4024_s23_21_q4', questionNumber: '4', title: 'Cumulative frequency',
    question: '100 customers buy fuel. Use the cumulative frequency diagram:\n(a)(i) Estimate the median.\n(a)(ii) Estimate the interquartile range.\n(b) Price is $1.75/litre. Find fraction spending more than $91.\n(c) Complete the frequency table.',
    marks: 7, hints: ['(a)(i) Read at 50th value', '(a)(ii) Q3 − Q1', '(b) $91 ÷ $1.75 = 52 litres, read from graph'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Median (litres)', key: 'ai', marks: 1 }, { label: '(a)(ii) IQR (litres)', key: 'aii', marks: 2 }, { label: '(b) Fraction', key: 'b', marks: 3 }, { label: '(c) Frequencies', key: 'c', marks: 1 }],
    answer: { ai: '29', aii: '18', b: '12/100', c: '14, 8, 4, 2' }
  },
  'pp_4024_s23_21_q5': {
    id: 'pp_4024_s23_21_q5', questionNumber: '5', title: 'Sets and prime factors',
    question: '(a) ξ = {1,...,12}, P = multiples of 3, Q = odd numbers, R = factors of 24.\n(i) Complete Venn diagram. (ii) Find n(R\'). (iii) List (P∪R)∩Q. (iv) Describe P∩R∩Q\'. (v) P(multiple of 3 from R).\n(b) M = 2^(2x) × 3⁴ × 5 × 7, N = 2³ × 3^(x−y) × 5². LCM = 2⁸ × 3⁶ × 5² × 7.\n(i) Find x and y. (ii) Largest square factor of M. (iii) HCF.',
    marks: 11, hints: ['(a) P = {3,6,9,12}, Q = {1,3,5,7,9,11}, R = {1,2,3,4,6,8,12,24→limited to 12}'],
    type: 'multi-part',
    parts: [{ label: '(a)(ii) n(R\')', key: 'aii', marks: 1 }, { label: '(a)(v) Probability', key: 'av', marks: 2 }, { label: '(b)(i) x', key: 'bix', marks: 1 }, { label: '(b)(i) y', key: 'biy', marks: 1 }, { label: '(b)(ii) Largest square', key: 'bii', marks: 1 }, { label: '(b)(iii) HCF', key: 'biii', marks: 1 }],
    answer: { aii: '5', av: '3/7', bix: '4', biy: '-2', bii: '20736', biii: '2³×3⁴×5' }
  },
  'pp_4024_s23_21_q6': {
    id: 'pp_4024_s23_21_q6', questionNumber: '6', title: 'Algebra',
    question: '(a) Simplify 3u − 6w − 5u + 9w.\n(b) Emilio buys m pencils at 40¢ each and 12 pens at 85¢. Pays $20, gets $2.20 change. Find m.\n(c) y ∝ (x−2)³. When y = 12, x = 4. Find y when x = 5.\n(d) Write as single fraction: 3/(x−1) − 4/(2x+1).',
    marks: 11, hints: ['(a) −2u + 3w', '(b) 40m + 1020 = 1780, m = 19', '(c) k = 12/8 = 3/2, y = (3/2)(27) = 40.5'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) Pencils', key: 'b', marks: 4 }, { label: '(c) y', key: 'c', marks: 2 }, { label: '(d) Single fraction', key: 'd', marks: 3 }],
    answer: { a: '3w-2u', b: '19', c: '40.5', d: '(2x+7)/((x-1)(2x+1))' }
  },
  'pp_4024_s23_21_q7': {
    id: 'pp_4024_s23_21_q7', questionNumber: '7', title: 'Trigonometry',
    question: '(a)(i) Construct triangle ABC with AC = 8.3 cm and angle BAC = 105°.\n(a)(ii) Calculate the perimeter.\n(b)(i) In PQRS: SQ = 15 cm, SPQ = 67°, PQS = 74°. Calculate PS.\n(b)(ii) PSR = 96° and area of triangle QRS = 63 cm². Find QR.',
    marks: 10, hints: ['(b)(i) Use sine rule: PS/sin74 = 15/sin67', '(b)(ii) Use area formula: ½ × QR × SR × sin(angle)'],
    type: 'multi-part',
    parts: [{ label: '(a)(ii) Perimeter (cm)', key: 'aii', marks: 2 }, { label: '(b)(i) PS (cm)', key: 'bi', marks: 3 }, { label: '(b)(ii) QR (cm)', key: 'bii', marks: 3 }],
    answer: { aii: '31', bi: '15.7', bii: '12.7' }
  },
  'pp_4024_s23_21_q8': {
    id: 'pp_4024_s23_21_q8', questionNumber: '8', title: 'Distance–time graphs',
    question: '(a)(i) Maya leaves office at 10:00. She stays at factory 1½ hours then returns at 35 km/h. Complete the graph.\n(a)(ii) Find time Maya arrives back.\n(b) Cyclist travels d metres. At 08:36 is (d−7200) m from home. Average speed 08:00–08:36 is 4/5 of 09:10–09:55. Find d.',
    marks: 6, hints: ['(a)(ii) Read from graph', '(b) Set up equation with d: (d−7200)/36 = (4/5)(d/45)'],
    type: 'multi-part',
    parts: [{ label: '(a)(ii) Return time', key: 'aii', marks: 1 }, { label: '(b) d', key: 'b', marks: 3 }],
    answer: { aii: '13:42', b: '20000' }
  },
  'pp_4024_s23_21_q9': {
    id: 'pp_4024_s23_21_q9', questionNumber: '9', title: 'Matrices and simultaneous equations',
    question: 'Bukhari: 2 adults, 3 children. Garcia: 4 adults, 1 child.\n(a) Complete matrix M.\n(b)(i) MN = (525, 575). Find cost per adult (x) and per child (y).\n(b)(ii) Explain what each element in P represents.',
    marks: 7, hints: ['(b)(i) 2x + 3y = 525 and 4x + y = 575', 'Solve: x = 120, y = 95'],
    type: 'multi-part',
    parts: [{ label: '(b)(i) x ($)', key: 'x', marks: 3 }, { label: '(b)(i) y ($)', key: 'y', marks: 2 }, { label: '(b)(ii) Meaning', key: 'meaning', marks: 1 }],
    answer: { x: '120', y: '95', meaning: 'Total flight cost for each family' }
  },
  'pp_4024_s23_21_q10': {
    id: 'pp_4024_s23_21_q10', questionNumber: '10', title: 'Mean and probability quadratic',
    question: '(a)(i) Explain why total bags cannot be 87.\n(a)(ii) Mean = 12.8. Find p.\n(b)(i) Show r² + 175r − 2046 = 0.\n(b)(ii) Solve to find r.',
    marks: 10, hints: ['(a)(ii) Set up mean equation with p', '(b)(ii) Factorise: (r−11)(r+186) = 0, r = 11'],
    type: 'multi-part',
    parts: [{ label: '(a)(ii) p', key: 'aii', marks: 3 }, { label: '(b)(ii) r', key: 'bii', marks: 3 }],
    answer: { aii: '17', bii: '11' }
  },
  'pp_4024_s23_21_q11': {
    id: 'pp_4024_s23_21_q11', questionNumber: '11', title: 'Prism and 3D trigonometry',
    question: 'Open container is a prism with trapezium ABCD cross-section. AB = 28, DC = 24, AD = 16, BF = 29.\n(a) Calculate angle DCB.\n(b) Khalil pours water at 4000 cm³/min for 2 min. Is it more than ⅔ full?\n(c) Calculate angle DFH.',
    marks: 9, hints: ['(a) Use trig: tan(angle) = (28−24)/16, then add 90°', '(b) Volume = ½(24+28)×16×29', '(c) 3D trigonometry using Pythagoras'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle DCB', key: 'a', marks: 3 }, { label: '(b) More than ⅔ full?', key: 'b', marks: 3 }, { label: '(c) Angle DFH', key: 'c', marks: 3 }],
    answer: { a: '104', b: 'No', c: '42' }
  },
};

export const sections4024_21_2023: PastPaperSection[] = [
  { id: 's_4024_s23_21_q1', title: 'Q1 – Cuboid volume & graph', questionId: 'pp_4024_s23_21_q1' },
  { id: 's_4024_s23_21_q2', title: 'Q2 – Time, rates & percentages', questionId: 'pp_4024_s23_21_q2' },
  { id: 's_4024_s23_21_q3', title: 'Q3 – Angles & circle theorems', questionId: 'pp_4024_s23_21_q3' },
  { id: 's_4024_s23_21_q4', title: 'Q4 – Cumulative frequency', questionId: 'pp_4024_s23_21_q4' },
  { id: 's_4024_s23_21_q5', title: 'Q5 – Sets & prime factors', questionId: 'pp_4024_s23_21_q5' },
  { id: 's_4024_s23_21_q6', title: 'Q6 – Algebra', questionId: 'pp_4024_s23_21_q6' },
  { id: 's_4024_s23_21_q7', title: 'Q7 – Trigonometry', questionId: 'pp_4024_s23_21_q7' },
  { id: 's_4024_s23_21_q8', title: 'Q8 – Distance–time graphs', questionId: 'pp_4024_s23_21_q8' },
  { id: 's_4024_s23_21_q9', title: 'Q9 – Matrices', questionId: 'pp_4024_s23_21_q9' },
  { id: 's_4024_s23_21_q10', title: 'Q10 – Mean & quadratic', questionId: 'pp_4024_s23_21_q10' },
  { id: 's_4024_s23_21_q11', title: 'Q11 – Prism & 3D trig', questionId: 'pp_4024_s23_21_q11' },
];
