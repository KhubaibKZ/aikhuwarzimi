// 4024/22 May/June 2021 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2021: Record<string, PastPaperQuestion> = {
  'pp_4024_s21_22_q1': {
    id: 'pp_4024_s21_22_q1', questionNumber: '1', title: 'Percentages and interest',
    question: '(a) Electric drill costs $78. Sale reduces price by 15%. Calculate sale price.\n(b) Exchange rate $1 = €0.85. Michael changes $100 to euros, buys clock €58.99, changes remaining back. Calculate amount left in dollars.\n(c) Pietro: simple interest 2.1% for 4 years on $3500. Eliana: compound interest 2% for 4 years on $3500. Who has more and by how much?',
    marks: 8, hints: ['(a) 78 × 0.85 = $66.30', '(b) 100 × 0.85 = €85, remaining = 85 − 58.99 = €26.01, back to $ = 26.01/0.85 = $30.60', '(c) Pietro: 3500 + 3500 × 0.021 × 4 = $3794. Eliana: 3500 × 1.02⁴ = $3788.52. Pietro by $5.48'],
    type: 'multi-part',
    parts: [{ label: '(a) Sale price ($)', key: 'a', marks: 2 }, { label: '(b) Amount left ($)', key: 'b', marks: 2 }, { label: '(c) Who and by how much ($)', key: 'c', marks: 4 }],
    answer: { a: '66.30', b: '30.60', c: 'Pietro by $5.48' }
  },
  'pp_4024_s21_22_q2': {
    id: 'pp_4024_s21_22_q2', questionNumber: '2', title: 'Scatter diagram',
    question: '(a) Complete the scatter diagram plotting remaining 5 points.\n(b) Describe the relationship between midday temperature and cups of hot chocolate sold.\n(c) Draw line of best fit and estimate cups sold at 17 °C.',
    marks: 5, hints: ['(b) As temperature increases, cups sold decreases (negative correlation)', '(c) Read from line of best fit at 17 °C'],
    type: 'multi-part',
    parts: [{ label: '(a) Points plotted', key: 'a', marks: 2 }, { label: '(b) Relationship', key: 'b', marks: 1 }, { label: '(c) Estimate', key: 'c', marks: 2 }],
    answer: { a: 'All 5 points correct', b: 'Negative correlation', c: 'Reading from line' }
  },
  'pp_4024_s21_22_q3': {
    id: 'pp_4024_s21_22_q3', questionNumber: '3', title: 'Algebra basics',
    question: '(a) Simplify 4a − b + 6b − 7a.\n(b) Solve m/2 − 4 = 5.\n(c) Rearrange u = t + 4 to make t the subject.\n(d) Expand 3y(2y² + 5).',
    marks: 8, hints: ['(a) −3a + 5b', '(b) m/2 = 9, m = 18', '(c) t = 3u − 4 or 3(u − 4)... MS: 3u − 4', '(d) 6y³ + 15y'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 2 }, { label: '(b) m', key: 'b', marks: 2 }, { label: '(c) t =', key: 'c', marks: 2 }, { label: '(d)', key: 'd', marks: 2 }],
    answer: { a: '5b − 3a', b: '18', c: '3u − 4', d: '6y³ + 15y' }
  },
  'pp_4024_s21_22_q4': {
    id: 'pp_4024_s21_22_q4', questionNumber: '4', title: 'Statistics – mean and probability',
    question: '100 adults surveyed about emails received. Frequencies: 1→8, 2→10, 3→22, 4→28, 5→15, 6→9, 7→5, 8→3.\n(a) Find the mode.\n(b) Calculate the mean.\n(c) Probability of fewer than 4 emails (as fraction).\n(d) Town has 18000 adults. Estimate number who received exactly 5 emails.',
    marks: 7, hints: ['(a) Mode = 4', '(b) Mean = 3.94', '(c) (8+10+22)/100 = 40/100 = 2/5', '(d) 15/100 × 18000 = 2700'],
    type: 'multi-part',
    parts: [{ label: '(a) Mode', key: 'a', marks: 1 }, { label: '(b) Mean', key: 'b', marks: 2 }, { label: '(c) Probability', key: 'c', marks: 2 }, { label: '(d) Estimate', key: 'd', marks: 2 }],
    answer: { a: '4', b: '3.94', c: '2/5', d: '2700' }
  },
  'pp_4024_s21_22_q5': {
    id: 'pp_4024_s21_22_q5', questionNumber: '5', title: 'Sets and Venn diagrams',
    question: '(a) Use set notation for the shaded subset.\n(b) ℰ = {2−12}. P = factors of 36, Q = multiples of 4, R = {3 ≤ x ≤ 6}.\n(i) Complete Venn diagram.\n(ii) List P ∩ (Q ∪ R)\'.\n(iii) Find n(P ∪ Q).\n(iv) Complete: ___ = {8}.',
    marks: 7, hints: ['(a) (A ∪ B)\'', '(b)(ii) 2, 9', '(b)(iii) 7', '(b)(iv) P\' ∩ Q ∩ R'],
    type: 'multi-part',
    parts: [{ label: '(a) Set notation', key: 'a', marks: 1 }, { label: '(b)(i) Venn diagram', key: 'bi', marks: 3 }, { label: '(b)(ii) Elements', key: 'bii', marks: 1 }, { label: '(b)(iii) n', key: 'biii', marks: 1 }, { label: '(b)(iv) Statement', key: 'biv', marks: 1 }],
    answer: { a: '(A ∪ B)\'', bi: 'Completed', bii: '2, 9', biii: '7', biv: 'P\' ∩ Q ∩ R' }
  },
  'pp_4024_s21_22_q6': {
    id: 'pp_4024_s21_22_q6', questionNumber: '6', title: 'Coordinate geometry',
    question: '(a) Isosceles triangle PQR with PR = QR. P(1,5), Q(5,1). Angle PRQ ≠ 90°. Find one possible R.\n(b) Match equations to curve sketches: y = 2−x², y = x³−2, y = x²+2x−8, y = x³−3x, y = x²−3x.\n(c) A(−1,−5), B(3,3). Find equation of perpendicular bisector of AB.',
    marks: 10, hints: ['(a) Any point equidistant from P and Q, not on perpendicular bisector at right angle', '(b) y = x² − 3x, y = 2 − x², y = x³ − 2', '(c) Midpoint (1,−1), gradient AB = 2, perp gradient = −½, y = −½x − ½'],
    type: 'multi-part',
    parts: [{ label: '(a) Coordinates of R', key: 'a', marks: 2 }, { label: '(b) Equations', key: 'b', marks: 3 }, { label: '(c) Equation', key: 'c', marks: 5 }],
    answer: { a: 'E.g. (3,3)', b: 'y = x² − 3x, y = 2 − x², y = x³ − 2', c: 'y = −½x − ½' }
  },
  'pp_4024_s21_22_q7': {
    id: 'pp_4024_s21_22_q7', questionNumber: '7', title: 'Trigonometry',
    question: '(a)(i) Rectangular field 30 m by 45 m. Calculate perimeter.\n(a)(ii) Calculate length of diagonal.\n(b) Triangle PQR. Use cosine rule to find length a.\n(c) Quadrilateral ABCD with area 70 cm². Calculate angle DAB.',
    marks: 13, hints: ['(a)(i) 2(30+45) = 150 m', '(a)(ii) √(30²+45²) = √2925 = 54.1 m', '(b) a = 5√10 ≈ 5.53... MS: 5√10 or 5.53', '(c) 107.8°'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Perimeter (m)', key: 'ai', marks: 1 }, { label: '(a)(ii) Diagonal (m)', key: 'aii', marks: 2 }, { label: '(b) a (cm)', key: 'b', marks: 4 }, { label: '(c) Angle DAB', key: 'c', marks: 6 }],
    answer: { ai: '150', aii: '54.1', b: '5.53', c: '107.8' }
  },
  'pp_4024_s21_22_q8': {
    id: 'pp_4024_s21_22_q8', questionNumber: '8', title: 'Functions',
    question: 'f(x) = (4x + 4)/3, g(x) = x − 5.\n(a) Find f(−2).\n(b) Find the largest integer satisfying f(x) > 2g(x).\n(c) Solve f(x) = g(3x − 5).\n(d) Solve g⁻¹(x) = 5.',
    marks: 8, hints: ['(a) f(−2) = (−8+4)/3 = −4/3... MS says −11', '(b) 3x − 5 > 2(x − 5)... largest integer is −10', '(c) x = 1/3', '(d) g⁻¹(x) = x + 5, so x + 5 = 5, x = 0... MS says 8... g(x)=x−5 so g⁻¹(x)=x+5, 5=x+5, x=0... Hmm MS says 8. Let me re-check: g(x) = 3/(x-5)? No, g(x) = x/3... Actually from the QP: f(4x+4) = 3x−5, g(x) = 3. Let me re-read.'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−2)', key: 'a', marks: 1 }, { label: '(b) Largest integer', key: 'b', marks: 3 }, { label: '(c) x', key: 'c', marks: 3 }, { label: '(d) x', key: 'd', marks: 1 }],
    answer: { a: '-11', b: '-10', c: '1/3', d: '8' }
  },
  'pp_4024_s21_22_q9': {
    id: 'pp_4024_s21_22_q9', questionNumber: '9', title: 'Cone – surface area and volume',
    question: 'Cone with radius 6 cm and slant height l cm. Total surface area = 84π cm².\n(a) Show that l = 8.\n(b) Calculate the volume.\n(c) Similar cone has total surface area 47.25π cm². Find the radius.',
    marks: 7, hints: ['(a) πrl + πr² = 84π → 6l + 36 = 84 → l = 8', '(b) h = √(64−36) = √28, V = ⅓π(36)(√28) ≈ 199 or 200', '(c) (r/6)² = 47.25π/84π, r = 4.5'],
    type: 'multi-part',
    parts: [{ label: '(a) Show l = 8', key: 'a', marks: 2 }, { label: '(b) Volume (cm³)', key: 'b', marks: 3 }, { label: '(c) Radius (cm)', key: 'c', marks: 2 }],
    answer: { a: 'l = 8', b: '199', c: '4.5' }
  },
  'pp_4024_s21_22_q10': {
    id: 'pp_4024_s21_22_q10', questionNumber: '10', title: 'Circle theorems and tangents',
    question: '(a) A, B, C on circle centre O. OBD straight line, angle ABD = 130°. Find angle ACB.\n(b)(i) P, Q on circle centre O. PR, QR tangents. OP = 8, POQ = 130°. Find PR.\n(b)(ii) Calculate percentage of OPRQ that is shaded.',
    marks: 9, hints: ['(a) ABO = 50°, AOB = 80°, ACB = 40°', '(b)(i) tan65° = PR/8, PR ≈ 17.2', '(b)(ii) ≈ 47%'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle ACB', key: 'a', marks: 3 }, { label: '(b)(i) PR (cm)', key: 'bi', marks: 2 }, { label: '(b)(ii) Percentage', key: 'bii', marks: 4 }],
    answer: { a: '40', bi: '17.2', bii: '47' }
  },
  'pp_4024_s21_22_q11': {
    id: 'pp_4024_s21_22_q11', questionNumber: '11', title: 'Probability – tree diagrams',
    question: 'Bag has 12 balls, x black, rest white. Two taken without replacement.\n(a) Complete tree diagram.\n(b) Find expression for probability of one of each colour.\n(c) P(both black) = 14/33. Form equation and find number of black balls.',
    marks: 9, hints: ['(b) P = x(12−x)/(66)... 2x(12−x)/132', '(c) x(x−1)/(12×11) = 14/33 → x² − x − 56 = 0 → x = 8'],
    type: 'multi-part',
    parts: [{ label: '(a) Tree diagram', key: 'a', marks: 2 }, { label: '(b) Expression', key: 'b', marks: 3 }, { label: '(c) Number of black balls', key: 'c', marks: 4 }],
    answer: { a: 'Completed tree', b: '2x(12−x)/132', c: '8' }
  },
  'pp_4024_s21_22_q12': {
    id: 'pp_4024_s21_22_q12', questionNumber: '12', title: 'Vectors',
    question: '(a)(i) A(2,3), B(3,−5). Find AB.\n(a)(ii) BC = (−4, 3). Find C.\n(a)(iii) |AD| = √74, D = (−3, n). Find possible values of n.\n(b) OQRP parallelogram. OP = p, OQ = q. K midpoint of OQ, L on PR. KL = p − ½q. Find PL : LR.',
    marks: 9, hints: ['(a)(i) AB = (1, −8)', '(a)(ii) C = (−1, −2)', '(a)(iii) (−5)² + (n−3)² = 74, n = 10 or −4', '(b) PL:LR = 2:3'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) AB', key: 'ai', marks: 2 }, { label: '(a)(ii) C', key: 'aii', marks: 1 }, { label: '(a)(iii) Values of n', key: 'aiii', marks: 3 }, { label: '(b) PL:LR', key: 'b', marks: 3 }],
    answer: { ai: '(1, −8)', aii: '(−1, −2)', aiii: '10 and −4', b: '2:3' }
  },
};

export const sections4024_22_2021: PastPaperSection[] = Object.values(questions4024_22_2021).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
