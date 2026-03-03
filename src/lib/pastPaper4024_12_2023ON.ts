// 4024/12 October/November 2023 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2023ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on23_12_q1': {
    id: 'pp_4024_on23_12_q1', questionNumber: '1', title: 'Basic calculations',
    question: '(a) Work out 0.05 × 0.3.\n(b) Work out 600 ÷ 0.2.\n(c) Work out 20 − 12 ÷ (8 − 6).',
    marks: 3, hints: ['(a) 0.05 × 0.3 = 0.015', '(b) 600 ÷ 0.2 = 3000', '(c) 8−6=2, 12÷2=6, 20−6=14'],
    type: 'multi-part',
    parts: [{ label: '(a) 0.05 × 0.3', key: 'a', marks: 1 }, { label: '(b) 600 ÷ 0.2', key: 'b', marks: 1 }, { label: '(c) 20 − 12 ÷ (8−6)', key: 'c', marks: 1 }],
    answer: { a: '0.015', b: '3000', c: '14' }
  },
  'pp_4024_on23_12_q2': {
    id: 'pp_4024_on23_12_q2', questionNumber: '2', title: 'Fraction of rectangle',
    question: 'A rectangle is split into squares of two different sizes. Find the fraction of the rectangle that is shaded grey.',
    marks: 1, hints: ['Count shaded squares as fraction of total area'],
    type: 'short', answer: '5/21'
  },
  'pp_4024_on23_12_q3': {
    id: 'pp_4024_on23_12_q3', questionNumber: '3', title: 'Decimals and cube root',
    question: '(a) Find the decimal exactly halfway between 3/5 and 68%.\n(b) Write 4.07382 correct to 3 decimal places.\n(c) Evaluate ³√64.',
    marks: 3, hints: ['(a) 3/5 = 0.6, 68% = 0.68, halfway = 0.64', '(b) Look at 4th decimal place', '(c) 4³ = 64'],
    type: 'multi-part',
    parts: [{ label: '(a) Halfway decimal', key: 'a', marks: 1 }, { label: '(b) Rounded', key: 'b', marks: 1 }, { label: '(c) ³√64', key: 'c', marks: 1 }],
    answer: { a: '0.64', b: '4.074', c: '4' }
  },
  'pp_4024_on23_12_q4': {
    id: 'pp_4024_on23_12_q4', questionNumber: '4', title: 'Temperature statistics',
    question: 'Sonu records temperatures for 12 days: −6, −5, −3, −2, −1, −1, T, 5, 5, 6, 6, 7.\n(a) Find the range.\n(b) The median is 1°C. Find T.',
    marks: 2, hints: ['(a) Range = 7 − (−6) = 13', '(b) Median of 12 values is average of 6th and 7th: (−1+T)/2 = 1, T = 3'],
    type: 'multi-part',
    parts: [{ label: '(a) Range (°C)', key: 'a', marks: 1 }, { label: '(b) T', key: 'b', marks: 1 }],
    answer: { a: '13', b: '3' }
  },
  'pp_4024_on23_12_q5': {
    id: 'pp_4024_on23_12_q5', questionNumber: '5', title: 'Ratio',
    question: 'Anna and Ria share money in the ratio 5:9. Ria receives $8 more than Anna. Work out the total amount shared.',
    marks: 2, hints: ['Difference in parts = 9−5 = 4 parts = $8', '1 part = $2, total = 14 parts = $28'],
    type: 'short', answer: '28'
  },
  'pp_4024_on23_12_q6': {
    id: 'pp_4024_on23_12_q6', questionNumber: '6', title: 'Parallel lines angles',
    question: 'AB and CD are parallel. EC and FB are parallel. Angle ABF = 73°.\n(a) Find x.\n(b) Find y.',
    marks: 2, hints: ['(a) Alternate angles: x = 73', '(b) Co-interior angles: y = 180 − 73 = 107'],
    type: 'multi-part',
    parts: [{ label: '(a) x', key: 'a', marks: 1 }, { label: '(b) y', key: 'b', marks: 1 }],
    answer: { a: '73', b: '107' }
  },
  'pp_4024_on23_12_q7': {
    id: 'pp_4024_on23_12_q7', questionNumber: '7', title: 'Transformations',
    question: '(a) Describe fully the transformation that maps triangle P onto triangle Q.\n(b) Shape B is an enlargement of shape A, centre (5,5), area of B is 27 cm². Draw shape B.',
    marks: 6, hints: ['(a) Check rotation, reflection, translation', '(b) Area scale factor = 27/3 = 9, linear SF = 3'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation', key: 'a', marks: 3 }, { label: '(b) Shape B drawn', key: 'b', marks: 3 }],
    answer: { a: 'Rotation, 90° clockwise, centre (0,0)', b: 'Enlargement SF 3 from (5,5)' }
  },
  'pp_4024_on23_12_q8': {
    id: 'pp_4024_on23_12_q8', questionNumber: '8', title: 'Standard form',
    question: '(a) Write 0.00493 in standard form.\n(b) Evaluate (4 × 10⁹) × (2 × 10⁻²). Give your answer in standard form.',
    marks: 2, hints: ['(a) 4.93 × 10⁻³', '(b) 8 × 10⁷'],
    type: 'multi-part',
    parts: [{ label: '(a) Standard form', key: 'a', marks: 1 }, { label: '(b) Standard form', key: 'b', marks: 1 }],
    answer: { a: '4.93 × 10⁻³', b: '8 × 10⁷' }
  },
  'pp_4024_on23_12_q9': {
    id: 'pp_4024_on23_12_q9', questionNumber: '9', title: 'Prime factors and LCM',
    question: '(a) Write 180 as a product of its prime factors.\n(b) 36 = 2² × 3² and N = 2² × 3 × k (k ≥ 3). The LCM of 36 and N is 180. Find k.',
    marks: 3, hints: ['(a) 180 = 2² × 3² × 5', '(b) LCM needs factor of 5, so k = 5'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factors', key: 'a', marks: 2 }, { label: '(b) k', key: 'b', marks: 1 }],
    answer: { a: '2² × 3² × 5', b: '5' }
  },
  'pp_4024_on23_12_q10': {
    id: 'pp_4024_on23_12_q10', questionNumber: '10', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of 1240 × 3.8 / 11.2.',
    marks: 2, hints: ['1240 ≈ 1000, 3.8 ≈ 4, 11.2 ≈ 10', '1000 × 4 / 10 = 400... MS says 20'],
    type: 'short', answer: '20'
  },
  'pp_4024_on23_12_q11': {
    id: 'pp_4024_on23_12_q11', questionNumber: '11', title: 'Solve inequality',
    question: 'Solve 7m − 13 ≤ 8.',
    marks: 2, hints: ['7m ≤ 21', 'm ≤ 3'],
    type: 'short', answer: 'm ≤ 3'
  },
  'pp_4024_on23_12_q12': {
    id: 'pp_4024_on23_12_q12', questionNumber: '12', title: 'Simultaneous equations',
    question: 'Solve: 5x + 4y = 14 and 3x − 2y = 15.',
    marks: 3, hints: ['Multiply 2nd equation by 2: 6x − 4y = 30', 'Add: 11x = 44, x = 4', 'y = (14 − 20)/4 = −3/2... MS says y = −3/2'],
    type: 'multi-part',
    parts: [{ label: 'x', key: 'x', marks: 2 }, { label: 'y', key: 'y', marks: 1 }],
    answer: { x: '4', y: '-3/2' }
  },
  'pp_4024_on23_12_q13': {
    id: 'pp_4024_on23_12_q13', questionNumber: '13', title: 'Mean calculation',
    question: 'A list of eight numbers has a mean of 12. The first five numbers have a mean of 9. Find the sum of the three remaining numbers.',
    marks: 2, hints: ['Total of 8 numbers = 8 × 12 = 96', 'Total of first 5 = 5 × 9 = 45', 'Sum of remaining 3 = 96 − 45 = 51'],
    type: 'short', answer: '51'
  },
  'pp_4024_on23_12_q14': {
    id: 'pp_4024_on23_12_q14', questionNumber: '14', title: 'Angle measurement and construction',
    question: '(a) Measure angle ABC.\n(b) Construct the perpendicular bisector of AC.\n(c) Shade the region inside triangle ABC nearer to A than C and more than 6 cm from B.',
    marks: 5, hints: ['(a) Use protractor', '(b) Compasses and straight edge', '(c) Intersection of conditions'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle ABC', key: 'a', marks: 1 }, { label: '(b) Construction', key: 'b', marks: 2 }, { label: '(c) Shaded region', key: 'c', marks: 2 }],
    answer: { a: '49', b: 'Perpendicular bisector drawn', c: 'Correct region shaded' }
  },
  'pp_4024_on23_12_q15': {
    id: 'pp_4024_on23_12_q15', questionNumber: '15', title: 'Sequences',
    question: '(a) The 2nd term of a linear sequence is 28, the 5th term is 16. Find the 1st, 3rd, and 4th terms.\n(b) Find the nth term of: 3, 9, 19, 33, 51.',
    marks: 4, hints: ['(a) Common difference = (16−28)/3 = −4', '(b) Second differences = 4, so quadratic: 2n² + 1'],
    type: 'multi-part',
    parts: [{ label: '(a) 1st, 3rd, 4th terms', key: 'a', marks: 2 }, { label: '(b) nth term', key: 'b', marks: 2 }],
    answer: { a: '32, 24, 20', b: '2n²+1' }
  },
  'pp_4024_on23_12_q16': {
    id: 'pp_4024_on23_12_q16', questionNumber: '16', title: 'Rearrange formula',
    question: 'T = √(P − 4).\n(a) Find T when P = 40.\n(b) Rearrange to make P the subject.',
    marks: 3, hints: ['(a) T = √(40−4) = √36 = 6', '(b) T² = P − 4, P = T² + 4'],
    type: 'multi-part',
    parts: [{ label: '(a) T', key: 'a', marks: 1 }, { label: '(b) P =', key: 'b', marks: 2 }],
    answer: { a: '6', b: 'T²+4' }
  },
  'pp_4024_on23_12_q17': {
    id: 'pp_4024_on23_12_q17', questionNumber: '17', title: 'Cumulative frequency',
    question: 'Heights of 80 plants measured.\n(a) Draw a cumulative frequency diagram.\n(b) Find the interquartile range.\n(c) Plants taller than H cm are sold. 28 plants are sold. Find H.',
    marks: 6, hints: ['(a) Plot cumulative frequencies against upper bounds', '(b) IQR = Q3 − Q1', '(c) 80 − 28 = 52 on CF, read H'],
    type: 'multi-part',
    parts: [{ label: '(a) CF diagram', key: 'a', marks: 2 }, { label: '(b) IQR (cm)', key: 'b', marks: 2 }, { label: '(c) H', key: 'c', marks: 2 }],
    answer: { a: 'Correct CF diagram', b: '4', c: '7' }
  },
  'pp_4024_on23_12_q18': {
    id: 'pp_4024_on23_12_q18', questionNumber: '18', title: 'Speed-time graph',
    question: 'Speed-time graph for cyclists A and B over 20 seconds.\n(a) Find the acceleration of cyclist A.\n(b) Which cyclist travelled further and by how many metres?',
    marks: 4, hints: ['(a) Acceleration = change in speed / time', '(b) Compare areas under graphs'],
    type: 'multi-part',
    parts: [{ label: '(a) Acceleration (m/s²)', key: 'a', marks: 1 }, { label: '(b) Cyclist and difference (m)', key: 'b', marks: 3 }],
    answer: { a: '6/20', b: 'B, 20' }
  },
  'pp_4024_on23_12_q19': {
    id: 'pp_4024_on23_12_q19', questionNumber: '19', title: 'Algebraic fractions',
    question: 'Express as a single fraction: (x+1)/8 + 3x/4 − 5x/16.',
    marks: 2, hints: ['Common denominator = 16', '2(x+1)/16 + 12x/16 − 5x/16 = (9x+2)/16'],
    type: 'short', answer: '(9x+2)/16'
  },
  'pp_4024_on23_12_q20': {
    id: 'pp_4024_on23_12_q20', questionNumber: '20', title: 'Factorisation',
    question: '(a) Factorise 2cd + ce − 6d − 3e.\n(b) Factorise 3v² − 27t².',
    marks: 4, hints: ['(a) Group: c(2d+e) − 3(2d+e) = (c−3)(2d+e)', '(b) 3(v²−9t²) = 3(v+3t)(v−3t)'],
    type: 'multi-part',
    parts: [{ label: '(a) Factorised', key: 'a', marks: 2 }, { label: '(b) Factorised', key: 'b', marks: 2 }],
    answer: { a: '(c-3)(2d+e)', b: '3(v+3t)(v-3t)' }
  },
  'pp_4024_on23_12_q21': {
    id: 'pp_4024_on23_12_q21', questionNumber: '21', title: 'Sector and arc length',
    question: 'Diagram A: sector centre D, radius 3y, angle 6x° (obtuse). Diagram B: sector centre P, radius y, angle x°. Major arc EF = 9 × arc QR.\n(a) Show x = 20.\n(b) Find y when area of sector QPR = 2π cm².',
    marks: 5, hints: ['(a) Set up equation using arc lengths', '(b) Area = (x/360)πy² = 2π'],
    type: 'multi-part',
    parts: [{ label: '(a) Show x = 20', key: 'a', marks: 3 }, { label: '(b) y', key: 'b', marks: 2 }],
    answer: { a: 'x = 20 shown', b: '6' }
  },
  'pp_4024_on23_12_q22': {
    id: 'pp_4024_on23_12_q22', questionNumber: '22', title: 'Matrix equation',
    question: 'Matrix equation: (x, 3)(x−1, 2) = (2x+6, 2y).\n(a) Show that x² − 3x = 0.\n(b)(i) Solve x² − 3x = 0.\n(b)(ii) Find y when x ≠ 0.',
    marks: 6, hints: ['(a) Expand matrix multiplication', '(b)(i) x(x−3) = 0, x = 0 or 3', '(b)(ii) Sub x = 3'],
    type: 'multi-part',
    parts: [{ label: '(a) Proof', key: 'a', marks: 2 }, { label: '(b)(i) x values', key: 'bi', marks: 2 }, { label: '(b)(ii) y', key: 'bii', marks: 2 }],
    answer: { a: 'x²-3x=0 shown', bi: '0, 3', bii: '12' }
  },
  'pp_4024_on23_12_q23': {
    id: 'pp_4024_on23_12_q23', questionNumber: '23', title: 'Venn diagram',
    question: 'A shop sells hats (H), scarves (S), gloves (G). 40 people surveyed.\n(a) 2 buy all three. Those buying hat and scarf also buy gloves. 4 buy exactly two items. Complete the Venn diagram.\n(b) Find n(S ∩ (H ∪ G)′).',
    marks: 3, hints: ['(a) H∩S∩G = 2, H∩S only = 0', '(b) S only = people in S but not H or G'],
    type: 'multi-part',
    parts: [{ label: '(a) Venn diagram', key: 'a', marks: 2 }, { label: '(b) n(S ∩ (H∪G)′)', key: 'b', marks: 1 }],
    answer: { a: 'Completed correctly', b: '10' }
  },
  'pp_4024_on23_12_q24': {
    id: 'pp_4024_on23_12_q24', questionNumber: '24', title: 'Vectors in triangle',
    question: 'OAB is a triangle. P lies on AB, AP:PB = 2:3. OA = 4a, OP = 3a + 2b.\n(a)(i) Find AP.\n(a)(ii) Find OB.\n(b) Q is on OA such that QP is parallel to OB. Find QP.',
    marks: 5, hints: ['(a)(i) AP = OP − OA = 3a+2b − 4a = 2b−a', '(a)(ii) AB = 5/2 × AP, OB = OA + AB', '(b) QP parallel to OB'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) AP', key: 'ai', marks: 1 }, { label: '(a)(ii) OB', key: 'aii', marks: 3 }, { label: '(b) QP', key: 'b', marks: 1 }],
    answer: { ai: '2b-a', aii: '-a+5b', b: '(3/5)a+2b' }
  },
};

export const sections4024_12_2023ON: PastPaperSection[] = [
  { id: 's_4024_on23_12_q1', title: 'Q1 – Basic calculations', questionId: 'pp_4024_on23_12_q1' },
  { id: 's_4024_on23_12_q2', title: 'Q2 – Fraction of shape', questionId: 'pp_4024_on23_12_q2' },
  { id: 's_4024_on23_12_q3', title: 'Q3 – Decimals & cube root', questionId: 'pp_4024_on23_12_q3' },
  { id: 's_4024_on23_12_q4', title: 'Q4 – Temperature statistics', questionId: 'pp_4024_on23_12_q4' },
  { id: 's_4024_on23_12_q5', title: 'Q5 – Ratio', questionId: 'pp_4024_on23_12_q5' },
  { id: 's_4024_on23_12_q6', title: 'Q6 – Parallel lines', questionId: 'pp_4024_on23_12_q6' },
  { id: 's_4024_on23_12_q7', title: 'Q7 – Transformations', questionId: 'pp_4024_on23_12_q7' },
  { id: 's_4024_on23_12_q8', title: 'Q8 – Standard form', questionId: 'pp_4024_on23_12_q8' },
  { id: 's_4024_on23_12_q9', title: 'Q9 – Prime factors & LCM', questionId: 'pp_4024_on23_12_q9' },
  { id: 's_4024_on23_12_q10', title: 'Q10 – Estimation', questionId: 'pp_4024_on23_12_q10' },
  { id: 's_4024_on23_12_q11', title: 'Q11 – Inequality', questionId: 'pp_4024_on23_12_q11' },
  { id: 's_4024_on23_12_q12', title: 'Q12 – Simultaneous equations', questionId: 'pp_4024_on23_12_q12' },
  { id: 's_4024_on23_12_q13', title: 'Q13 – Mean', questionId: 'pp_4024_on23_12_q13' },
  { id: 's_4024_on23_12_q14', title: 'Q14 – Construction', questionId: 'pp_4024_on23_12_q14' },
  { id: 's_4024_on23_12_q15', title: 'Q15 – Sequences', questionId: 'pp_4024_on23_12_q15' },
  { id: 's_4024_on23_12_q16', title: 'Q16 – Rearrange formula', questionId: 'pp_4024_on23_12_q16' },
  { id: 's_4024_on23_12_q17', title: 'Q17 – Cumulative frequency', questionId: 'pp_4024_on23_12_q17' },
  { id: 's_4024_on23_12_q18', title: 'Q18 – Speed-time graph', questionId: 'pp_4024_on23_12_q18' },
  { id: 's_4024_on23_12_q19', title: 'Q19 – Algebraic fractions', questionId: 'pp_4024_on23_12_q19' },
  { id: 's_4024_on23_12_q20', title: 'Q20 – Factorisation', questionId: 'pp_4024_on23_12_q20' },
  { id: 's_4024_on23_12_q21', title: 'Q21 – Sector & arc', questionId: 'pp_4024_on23_12_q21' },
  { id: 's_4024_on23_12_q22', title: 'Q22 – Matrix equation', questionId: 'pp_4024_on23_12_q22' },
  { id: 's_4024_on23_12_q23', title: 'Q23 – Venn diagram', questionId: 'pp_4024_on23_12_q23' },
  { id: 's_4024_on23_12_q24', title: 'Q24 – Vectors', questionId: 'pp_4024_on23_12_q24' },
];
