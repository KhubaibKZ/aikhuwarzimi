// 4024/21 May/June 2021 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2021: Record<string, PastPaperQuestion> = {
  'pp_4024_s21_21_q1': {
    id: 'pp_4024_s21_21_q1', questionNumber: '1', title: 'Percentages and compound interest',
    question: '(a) Nicole\'s annual income is $22 000. She spent $7200 on accommodation. Calculate the percentage spent on accommodation.\n(b) Her income increased by 4% in 2020. Calculate her income in 2020.\n(c)(i) She invests $2000. At end of year 1, she has $2036. Show that K = 1.8.\n(c)(ii) Find the number of complete years before she has at least $2150.',
    marks: 9, hints: ['(a) 7200/22000 × 100 = 32.7%', '(b) 22000 × 1.04 = $22 880', '(c)(i) 2036/2000 = 1.018, K = 1.8', '(c)(ii) 2000 × 1.018^n ≥ 2150, n = 5 years'],
    type: 'multi-part',
    parts: [{ label: '(a) Percentage', key: 'a', marks: 2 }, { label: '(b) Income ($)', key: 'b', marks: 2 }, { label: '(c)(i) Show K = 1.8', key: 'ci', marks: 2 }, { label: '(c)(ii) Years', key: 'cii', marks: 3 }],
    answer: { a: '32.7', b: '22880', ci: 'K = 1.8', cii: '5' }
  },
  'pp_4024_s21_21_q2': {
    id: 'pp_4024_s21_21_q2', questionNumber: '2', title: 'Bar chart statistics',
    question: 'A survey recorded people in 50 houses.\n(a) Find the mode.\n(b) Find the median.\n(c) Calculate the mean.\n(d) Find the probability that exactly 3 people live in a randomly chosen house.\n(e) Two houses chosen at random. Find probability only one has exactly 5 people.',
    marks: 9, hints: ['(a) Mode = 4', '(b) Median = 3', '(c) Mean = 3.22', '(d) P = 10/50 = 1/5', '(e) P = 264/1225'],
    type: 'multi-part',
    parts: [{ label: '(a) Mode', key: 'a', marks: 1 }, { label: '(b) Median', key: 'b', marks: 1 }, { label: '(c) Mean', key: 'c', marks: 3 }, { label: '(d) Probability', key: 'd', marks: 1 }, { label: '(e) Probability', key: 'e', marks: 3 }],
    answer: { a: '4', b: '3', c: '3.22', d: '10/50', e: '264/1225' }
  },
  'pp_4024_s21_21_q3': {
    id: 'pp_4024_s21_21_q3', questionNumber: '3', title: 'Algebra and indices',
    question: '(a) p = (3q + 5)/r². Calculate p when q = 15 and r = −4.\n(b) Expand and simplify (2x + 1) + 4(x − 5).\n(c) Solve (3 − k)/4 = 1.\n(d) x⁶ ÷ xᵐ = x⁻³. Find m.\n(e)(i) Form equation: 24 × 30 − 4x² = 576. Solve for x.\n(e)(ii) The net makes an open box. 1000 cm³ of sand is placed inside. Find the fraction of the box filled.',
    marks: 13, hints: ['(a) p = (45+5)/16 = 50/16 = 3.125', '(b) 6x − 17... MS: 10x − 17', '(c) 3 − k = 4, k = −1', '(d) 6 − m = −3, m = 9', '(e)(i) x² = 36, x = 6', '(e)(ii) Box = 18 × 12 × 6 = 1296, fraction = 1000/1296 = 125/162'],
    type: 'multi-part',
    parts: [{ label: '(a) p', key: 'a', marks: 2 }, { label: '(b)', key: 'b', marks: 2 }, { label: '(c) k', key: 'c', marks: 2 }, { label: '(d) m', key: 'd', marks: 1 }, { label: '(e)(i) x', key: 'ei', marks: 3 }, { label: '(e)(ii) Fraction', key: 'eii', marks: 3 }],
    answer: { a: '3.125', b: '10x − 17', c: '-1', d: '9', ei: '6', eii: '125/162' }
  },
  'pp_4024_s21_21_q4': {
    id: 'pp_4024_s21_21_q4', questionNumber: '4', title: 'Construction and 3D Pythagoras',
    question: '(a)(i) Construct quadrilateral ABCD accurately.\n(a)(ii) Measure angle ADC.\n(a)(iii) Find the perimeter of ABCD.\n(b)(i) Cuboid TW = 15, WV = 10, RV = 8. Show TR = 19.7 cm.\n(b)(ii) X is midpoint of PQ. Calculate angle TRX.',
    marks: 13, hints: ['(b)(i) TR² = 15² + 10² + 8² = 225 + 100 + 64 = 389, TR = 19.7', '(b)(ii) 28.0° to 28.2°'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Construction', key: 'ai', marks: 3 }, { label: '(a)(ii) Angle ADC', key: 'aii', marks: 1 }, { label: '(a)(iii) Perimeter (cm)', key: 'aiii', marks: 1 }, { label: '(b)(i) Show TR = 19.7', key: 'bi', marks: 3 }, { label: '(b)(ii) Angle TRX', key: 'bii', marks: 5 }],
    answer: { ai: 'Correct construction', aii: 'Measured angle', aiii: '18.5 + DC', bi: 'TR = 19.7', bii: '28.1' }
  },
  'pp_4024_s21_21_q5': {
    id: 'pp_4024_s21_21_q5', questionNumber: '5', title: 'Sets and Venn diagrams',
    question: '(a) Shade A ∩ B ∩ C.\n(b) ℰ = {A,C,E,G,H,J,N,R,T,Z}. W = rotational symmetry order 2, X = line symmetry, Y = {R,A,N,G,E}.\n(i) Complete Venn diagram.\n(ii) List elements of X ∩ (W ∪ Y)\'.\n(iii) Find n(W ∪ X ∪ Y)\'.\n(iv) Complete: ___ = ∅.',
    marks: 7, hints: ['(b)(ii) C, T', '(b)(iii) 1', '(b)(iv) W ∩ X ∩ Y = ∅'],
    type: 'multi-part',
    parts: [{ label: '(a) Shade', key: 'a', marks: 1 }, { label: '(b)(i) Venn diagram', key: 'bi', marks: 3 }, { label: '(b)(ii) Elements', key: 'bii', marks: 1 }, { label: '(b)(iii) n', key: 'biii', marks: 1 }, { label: '(b)(iv) Set notation', key: 'biv', marks: 1 }],
    answer: { a: 'Shaded', bi: 'Completed diagram', bii: 'C, T', biii: '1', biv: 'W ∩ X ∩ Y' }
  },
  'pp_4024_s21_21_q6': {
    id: 'pp_4024_s21_21_q6', questionNumber: '6', title: 'Functions',
    question: 'f(x) = (12 − 3x)/5, g(x) = 3/x.\n(a) Find g(−1).\n(b) Solve f(x) = 2.\n(c) Find g⁻¹(x).\n(d) Find x when f(x) is 4 more than g(x).',
    marks: 10, hints: ['(a) g(−1) = 3/(−1) = −3... MS says 3', '(b) (12−3x)/5 = 2 → x = −1 or −0.5... MS: −1 or −0.5', '(c) g⁻¹(x) = (12−5x)/3 or 4 − 5x/3', '(d) x = 17/5 or 1 4/5... MS: 17/5'],
    type: 'multi-part',
    parts: [{ label: '(a) g(−1)', key: 'a', marks: 1 }, { label: '(b) x', key: 'b', marks: 2 }, { label: '(c) g⁻¹(x)', key: 'c', marks: 3 }, { label: '(d) x', key: 'd', marks: 4 }],
    answer: { a: '3', b: '-0.5', c: '(12 − 5x)/3', d: '17/5' }
  },
  'pp_4024_s21_21_q7': {
    id: 'pp_4024_s21_21_q7', questionNumber: '7', title: 'Sketching graphs',
    question: '(a) Match equations to sketches: y = 2x − 1, y = −2x + 1.\n(b) Sketch of y = x² + ax + b with roots −3 and 2. Find a and b.\n(c)(i) y = x³ − 2x² − 5x + 6. Find values of k where x³ − 2x² − 5x + 6 = k has exactly 2 solutions.\n(c)(ii) By drawing y = 2x + 1, find solutions of x³ − 2x² − 7x + 5 = 0.',
    marks: 10, hints: ['(a) y = 2x − 1 and y = −2x + 1', '(b) a = 1, b = −6', '(c)(i) k ≈ 8 to 8.5 or −4.3 to −3.8'],
    type: 'multi-part',
    parts: [{ label: '(a) Equations', key: 'a', marks: 2 }, { label: '(b) a and b', key: 'b', marks: 2 }, { label: '(c)(i) Values of k', key: 'ci', marks: 2 }, { label: '(c)(ii) Solutions', key: 'cii', marks: 4 }],
    answer: { a: 'y = 2x − 1, y = −2x + 1', b: 'a = 1, b = −6', ci: '8 to 8.5, −4.3 to −3.8', cii: 'Three x-values from graph' }
  },
  'pp_4024_s21_21_q8': {
    id: 'pp_4024_s21_21_q8', questionNumber: '8', title: 'Circle theorems and similarity',
    question: '(a) P, Q, R on circle centre O. Angle POQ = 8x°, angle RPO = x°, angle OQR = 24°. Calculate angle PQO.\n(b) Triangle KLM similar to KNJ. KL = 6, KM = 10.5, KN = 10. Area of JKN = 75 cm². Calculate y.',
    marks: 9, hints: ['(a) Angle PQO = 58°', '(b) y ≈ 59°'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle PQO', key: 'a', marks: 4 }, { label: '(b) y', key: 'b', marks: 5 }],
    answer: { a: '58', b: '59' }
  },
  'pp_4024_s21_21_q9': {
    id: 'pp_4024_s21_21_q9', questionNumber: '9', title: 'Cumulative frequency and mean',
    question: '(a)(i) Use cumulative frequency diagram to estimate the median for 80 students.\n(a)(ii) 60% passed. Find the pass mark.\n(a)(iii) Complete the frequency table.\n(b) Frequency table for Science test times. Estimate mean = 67.625 min. Find p and q.',
    marks: 11, hints: ['(a)(i) Median ≈ 48', '(a)(ii) Pass mark ≈ 43 to 45', '(a)(iii) 18, 32, 16, 6', '(b) p = 24, q = 15'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Median', key: 'ai', marks: 1 }, { label: '(a)(ii) Pass mark', key: 'aii', marks: 2 }, { label: '(a)(iii) Frequencies', key: 'aiii', marks: 2 }, { label: '(b) p and q', key: 'b', marks: 5 }],
    answer: { ai: '48', aii: '43-45', aiii: '18, 32, 16, 6', b: 'p = 24, q = 15' }
  },
  'pp_4024_s21_21_q10': {
    id: 'pp_4024_s21_21_q10', questionNumber: '10', title: 'Vectors',
    question: '(a)(i) AB = (−3, 5). Calculate |AB|.\n(a)(ii) AC = (6, 2) and C = (10, −1). Find coordinates of A. B is midpoint of AD. Find D.\n(b) Triangle OPQ. OP = p, OQ = q. R on OQ with OR = 2RQ. S is midpoint of PQ.\n(i) Find PQ. (ii) Find OS. (iii) Find SR.',
    marks: 10, hints: ['(a)(i) √(9+25) = √34 ≈ 5.83', '(a)(ii)(a) A = (4, −3)', '(a)(ii)(b) D = (−2, 7)', '(b)(i) q − p', '(b)(ii) ½p + ½q', '(b)(iii) ⅓q − ½p'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) |AB|', key: 'ai', marks: 2 }, { label: '(a)(ii)(a) A', key: 'aiia', marks: 1 }, { label: '(a)(ii)(b) D', key: 'aiib', marks: 2 }, { label: '(b)(i) PQ', key: 'bi', marks: 1 }, { label: '(b)(ii) OS', key: 'bii', marks: 2 }, { label: '(b)(iii) SR', key: 'biii', marks: 2 }],
    answer: { ai: '5.83', aiia: '(4, −3)', aiib: '(−2, 7)', bi: 'q − p', bii: '½p + ½q', biii: '⅓q − ½p' }
  },
};

export const sections4024_21_2021: PastPaperSection[] = Object.values(questions4024_21_2021).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
