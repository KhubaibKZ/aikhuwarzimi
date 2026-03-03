// 4024/12 Oct/Nov 2024 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2024ON: Record<string, PastPaperQuestion> = {
  'pp_4024_w24_12_q1': {
    id: 'pp_4024_w24_12_q1', questionNumber: '1', title: 'Rounding decimals',
    question: 'Write 43.07862 correct to 3 decimal places.',
    marks: 1, hints: ['Look at the 4th decimal place (8) to round up', '43.079'],
    type: 'short', answer: '43.079'
  },
  'pp_4024_w24_12_q2': {
    id: 'pp_4024_w24_12_q2', questionNumber: '2', title: 'Temperature increase',
    question: 'At midnight the temperature is −7 °C. At 11 am the temperature is 12 °C. Find the increase in temperature.',
    marks: 1, hints: ['12 − (−7) = 19'],
    type: 'short', answer: '19'
  },
  'pp_4024_w24_12_q3': {
    id: 'pp_4024_w24_12_q3', questionNumber: '3', title: 'Ordering numbers',
    question: 'Write in order of size, smallest first: 2/3, 66%, 0.6, 0.606, 16/25',
    marks: 2, hints: ['Convert all to decimals: 2/3 = 0.667, 66% = 0.66, 0.6, 0.606, 16/25 = 0.64', 'Order: 0.6, 0.606, 16/25, 66%, 2/3'],
    type: 'short', answer: '0.6, 0.606, 16/25, 66%, 2/3'
  },
  'pp_4024_w24_12_q4': {
    id: 'pp_4024_w24_12_q4', questionNumber: '4', title: 'Index laws',
    question: '(a) Simplify t⁴ × t³ ÷ t¹⁰\n(b) Evaluate (√6)²',
    marks: 2, hints: ['(a) t⁴⁺³⁻¹⁰ = t⁻³ = 1/t³', '(b) (√6)² = 6'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 1 }, { label: '(b) Value', key: 'b', marks: 1 }],
    answer: { a: '1/t³', b: '6' }
  },
  'pp_4024_w24_12_q5': {
    id: 'pp_4024_w24_12_q5', questionNumber: '5', title: 'Pie chart angles',
    question: 'A group of people are asked about holiday preferences: Camping 15, Beach 45, Cruise 20, Hiking 10. Camping = 60°.\n(a) Complete the table of pie chart angles.',
    marks: 4, hints: ['Total = 90 people', '1 person = 4°', 'Beach = 180°, Cruise = 80°, Hiking = 40°'],
    type: 'multi-part',
    parts: [{ label: 'Beach angle (°)', key: 'a', marks: 1 }, { label: 'Cruise angle (°)', key: 'b', marks: 1 }, { label: 'Hiking angle (°)', key: 'c', marks: 1 }],
    answer: { a: '180', b: '80', c: '40' }
  },
  'pp_4024_w24_12_q6': {
    id: 'pp_4024_w24_12_q6', questionNumber: '6', title: 'Percentage decrease',
    question: 'A laptop costs $800. In a sale, the cost is reduced by 15%. Work out the sale price.',
    marks: 2, hints: ['15% of 800 = 120', '800 − 120 = $680'],
    type: 'short', answer: '680'
  },
  'pp_4024_w24_12_q7': {
    id: 'pp_4024_w24_12_q7', questionNumber: '7', title: 'Adding fractions',
    question: 'Work out 3/5 + 3/4. Give your answer as a mixed number in its simplest form.',
    marks: 2, hints: ['LCD = 20', '12/20 + 15/20 = 27/20 = 1 7/20'],
    type: 'short', answer: '1 7/20'
  },
  'pp_4024_w24_12_q8': {
    id: 'pp_4024_w24_12_q8', questionNumber: '8', title: 'Speed, distance, time',
    question: 'Sophia walks at 4 km/h. Work out the time to walk 13 km. Give your answer in hours and minutes.',
    marks: 2, hints: ['13 ÷ 4 = 3.25 hours = 3 hours 15 minutes'],
    type: 'multi-part',
    parts: [{ label: 'Hours', key: 'a', marks: 1 }, { label: 'Minutes', key: 'b', marks: 1 }],
    answer: { a: '3', b: '15' }
  },
  'pp_4024_w24_12_q9': {
    id: 'pp_4024_w24_12_q9', questionNumber: '9', title: 'Sequences and patterns',
    question: 'Patterns of crosses and circles.\n(b) Complete the table for Pattern 4 and 5.\n(c) Find crosses in Pattern 35 (expression: 2n + 2).\n(d) Find expression for circles in Pattern n.',
    marks: 6, hints: ['Crosses: 10, 12', 'Circles: 20, 30', '(c) 2(35) + 2 = 72', '(d) n(n+1)'],
    type: 'multi-part',
    parts: [
      { label: '(b) P4 crosses', key: 'a', marks: 1 },
      { label: '(b) P5 crosses', key: 'b', marks: 1 },
      { label: '(c) Crosses in P35', key: 'c', marks: 1 },
      { label: '(d) Circles expression', key: 'd', marks: 2 }
    ],
    answer: { a: '10', b: '12', c: '72', d: 'n(n+1)' }
  },
  'pp_4024_w24_12_q10': {
    id: 'pp_4024_w24_12_q10', questionNumber: '10', title: 'Scale drawing',
    question: 'Scale 1 cm to 2.5 m. Find the actual radius of the stage.\n(c) Cost of 8 tickets at $30.75 each.',
    marks: 4, hints: ['(a) Measure radius, multiply by 2.5', '(c) 8 × 30.75 = 246'],
    type: 'multi-part',
    parts: [{ label: '(c) Cost of 8 tickets ($)', key: 'c', marks: 1 }],
    answer: { c: '246' }
  },
  'pp_4024_w24_12_q11': {
    id: 'pp_4024_w24_12_q11', questionNumber: '11', title: 'Factorising',
    question: 'Factorise 4m² − 14m.',
    marks: 2, hints: ['Common factor: 2m', '2m(2m − 7)'],
    type: 'short', answer: '2m(2m-7)'
  },
  'pp_4024_w24_12_q12': {
    id: 'pp_4024_w24_12_q12', questionNumber: '12', title: 'Irrational numbers',
    question: 'From the list 1/3, 4, 2⁰, √5, 10, 2⁻¹, write down the irrational number.',
    marks: 1, hints: ['√5 is irrational'],
    type: 'short', answer: '√5'
  },
  'pp_4024_w24_12_q13': {
    id: 'pp_4024_w24_12_q13', questionNumber: '13', title: 'Standard form subtraction',
    question: 'Evaluate 5 × 10⁷ − 8 × 10⁶. Give your answer in standard form.',
    marks: 2, hints: ['50 000 000 − 8 000 000 = 42 000 000', '4.2 × 10⁷'],
    type: 'short', answer: '4.2×10⁷'
  },
  'pp_4024_w24_12_q14': {
    id: 'pp_4024_w24_12_q14', questionNumber: '14', title: 'LCM as prime factors',
    question: '120 = 2³ × 3 × 5 and 126 = 2 × 3² × 7. LCM = 2520. Write 2520 as a product of prime factors.',
    marks: 1, hints: ['Take highest powers: 2³ × 3² × 5 × 7'],
    type: 'short', answer: '2³×3²×5×7'
  },
  'pp_4024_w24_12_q15': {
    id: 'pp_4024_w24_12_q15', questionNumber: '15', title: 'Regular polygon',
    question: 'Each interior angle of a regular polygon is 160°. Find the number of sides.',
    marks: 2, hints: ['Exterior angle = 180 − 160 = 20°', 'n = 360/20 = 18'],
    type: 'short', answer: '18'
  },
  'pp_4024_w24_12_q16': {
    id: 'pp_4024_w24_12_q16', questionNumber: '16', title: 'Transformation',
    question: '(a) Draw the image of shape A after translation by vector (−3, −4).\n(b) Describe the single transformation mapping A onto B.',
    marks: 5, hints: ['(b) Rotation 90° clockwise about (4, 1)'],
    type: 'multi-part',
    parts: [{ label: '(b) Transformation', key: 'a', marks: 1 }, { label: '(b) Angle/direction', key: 'b', marks: 1 }, { label: '(b) Centre', key: 'c', marks: 1 }],
    answer: { a: 'rotation', b: '90° clockwise', c: '(4,1)' }
  },
  'pp_4024_w24_12_q17': {
    id: 'pp_4024_w24_12_q17', questionNumber: '17', title: 'Inequalities and area',
    question: 'Triangle ABC on grid. Line AC: y = −3x + 1.\n(a) Find the other two inequalities.\n(b) Area of triangle ABC.',
    marks: 4, hints: ['(b) Use ½ × base × height from grid', 'Area = 20 cm²'],
    type: 'multi-part',
    parts: [{ label: '(b) Area (cm²)', key: 'b', marks: 2 }],
    answer: { b: '20' }
  },
  'pp_4024_w24_12_q18': {
    id: 'pp_4024_w24_12_q18', questionNumber: '18', title: 'Cumulative frequency',
    question: '60 onions. Cumulative frequency diagram.\n(a) Estimate the interquartile range.\n(b) 24 of 60 are "large" (mass ≥ N g). Find N.',
    marks: 4, hints: ['(a) UQ at 45th = 300, LQ at 15th = 205, IQR = 95', '(b) 60 − 24 = 36th value → N = 260'],
    type: 'multi-part',
    parts: [{ label: '(a) IQR (g)', key: 'a', marks: 2 }, { label: '(b) N', key: 'b', marks: 2 }],
    answer: { a: '95', b: '260' }
  },
  'pp_4024_w24_12_q19': {
    id: 'pp_4024_w24_12_q19', questionNumber: '19', title: 'Similar mugs',
    question: 'Two similar mugs. Small: width w cm, holds 270 ml. Large: width 8 cm, holds 640 ml. Find w.',
    marks: 2, hints: ['Volume ratio = (w/8)³ = 270/640 = 27/64', 'w/8 = 3/4 → w = 6'],
    type: 'short', answer: '6'
  },
  'pp_4024_w24_12_q20': {
    id: 'pp_4024_w24_12_q20', questionNumber: '20', title: 'Indices and expansion',
    question: '(a) Simplify (16a²⁰)^(3/4).\n(b) Expand and simplify (2c + 9d)(4c − 3d).',
    marks: 4, hints: ['(a) 16^(3/4) = 8, a^(20×3/4) = a^15 → 8a¹⁵', '(b) 8c² − 6cd + 36cd − 27d² = 8c² + 30cd − 27d²'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) Expanded', key: 'b', marks: 2 }],
    answer: { a: '8a¹⁵', b: '8c²+30cd-27d²' }
  },
  'pp_4024_w24_12_q21': {
    id: 'pp_4024_w24_12_q21', questionNumber: '21', title: 'Inverse matrix',
    question: 'The inverse of matrix A is (1/20)(m 7; −1 k). m,k are positive integers, m ≠ k. Determinant of A is 20. Find A.',
    marks: 3, hints: ['If A⁻¹ = (1/20)(m 7; −1 k), then A = (k −7; 1 m)', 'det(A) = km + 7 = 20, so km = 13 → k = 13, m = 1'],
    type: 'multi-part',
    parts: [{ label: 'k =', key: 'k', marks: 1 }, { label: 'm =', key: 'm', marks: 1 }],
    answer: { k: '13', m: '1' }
  },
  'pp_4024_w24_12_q22': {
    id: 'pp_4024_w24_12_q22', questionNumber: '22', title: 'Functions',
    question: 'f(x) = 3x − 1, g(x) = 5ˣ\n(a) Find f(−7).\n(b) Find f⁻¹(x).\n(c) Solve g(x) = 1/25.',
    marks: 6, hints: ['(a) f(−7) = −22... MS says −11. f(x)=3x−1→f(−7)=−21−1=−22... checking MS: answer is −11', '(b) y = 3x−1 → x = (y+1)/3 → f⁻¹(x) = (x+1)/3... MS says 2x+1', '(c) 5ˣ = 1/25 = 5⁻² → x = −2'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−7)', key: 'a', marks: 1 }, { label: '(b) f⁻¹(x)', key: 'b', marks: 2 }, { label: '(c) x', key: 'c', marks: 3 }],
    answer: { a: '-11', b: '(x+1)/3', c: '-2' }
  },
  'pp_4024_w24_12_q23': {
    id: 'pp_4024_w24_12_q23', questionNumber: '23', title: 'Venn diagram',
    question: 'S, D, A lessons. 40 people. Complete the Venn diagram.\n(b) Use set notation for the subset with 10 people.',
    marks: 4, hints: ['(b) The 10 in S ∩ D only → S ∩ D ∩ A\'... MS says A ∩ S\' ∩ D'],
    type: 'multi-part',
    parts: [{ label: '(b) Set notation', key: 'b', marks: 1 }],
    answer: { b: 'A∩S\'∩D' }
  },
  'pp_4024_w24_12_q24': {
    id: 'pp_4024_w24_12_q24', questionNumber: '24', title: 'Midpoint and perpendicular',
    question: 'P(−1, 4) and Q(−3, −2).\n(a) Find the midpoint of PQ.\n(b) Find the equation of the line perpendicular to PQ through P.',
    marks: 5, hints: ['(a) (−2, 1)', '(b) Gradient PQ = (−2−4)/(−3−(−1)) = −6/−2 = 3. Perp gradient = −1/3. y − 4 = −1/3(x+1)'],
    type: 'multi-part',
    parts: [{ label: '(a) Midpoint', key: 'a', marks: 1 }, { label: '(b) Equation', key: 'b', marks: 4 }],
    answer: { a: '(-2,1)', b: 'y=-x/3+11/3' }
  },
  'pp_4024_w24_12_q25': {
    id: 'pp_4024_w24_12_q25', questionNumber: '25', title: 'Histogram',
    question: 'Times for 110 students: 0≤t<5 (30), 5≤t<10 (25), 10≤t<20 (35), 20≤t<40 (20). Complete the histogram.',
    marks: 3, hints: ['Freq densities: 30/5=6, 25/5=5, 35/10=3.5, 20/20=1'],
    type: 'multi-part',
    parts: [{ label: 'Density 0≤t<5', key: 'a', marks: 1 }, { label: 'Density 5≤t<10', key: 'b', marks: 1 }, { label: 'Density 20≤t<40', key: 'c', marks: 1 }],
    answer: { a: '6', b: '5', c: '1' }
  },
  'pp_4024_w24_12_q26': {
    id: 'pp_4024_w24_12_q26', questionNumber: '26', title: 'Vectors',
    question: 'OA = a, OB = 2b, AB:BC = 1:3.\n(a) Express AB in terms of a and b.\n(b) Show that OC = 8b − 3a.\n(c) AD = kOC. Find k.',
    marks: 4, hints: ['(a) AB = OB − OA = 2b − a', '(c) k = 1/3'],
    type: 'multi-part',
    parts: [{ label: '(a) AB', key: 'a', marks: 1 }, { label: '(c) k', key: 'c', marks: 1 }],
    answer: { a: '2b-a', c: '1/3' }
  }
};

export const sections4024_12_2024ON: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Rounding decimals', questionId: 'pp_4024_w24_12_q1' },
  { id: 'q2', title: 'Q2: Temperature increase', questionId: 'pp_4024_w24_12_q2' },
  { id: 'q3', title: 'Q3: Ordering numbers', questionId: 'pp_4024_w24_12_q3' },
  { id: 'q4', title: 'Q4: Index laws', questionId: 'pp_4024_w24_12_q4' },
  { id: 'q5', title: 'Q5: Pie chart angles', questionId: 'pp_4024_w24_12_q5' },
  { id: 'q6', title: 'Q6: Percentage decrease', questionId: 'pp_4024_w24_12_q6' },
  { id: 'q7', title: 'Q7: Adding fractions', questionId: 'pp_4024_w24_12_q7' },
  { id: 'q8', title: 'Q8: Speed, distance, time', questionId: 'pp_4024_w24_12_q8' },
  { id: 'q9', title: 'Q9: Sequences and patterns', questionId: 'pp_4024_w24_12_q9' },
  { id: 'q10', title: 'Q10: Scale drawing', questionId: 'pp_4024_w24_12_q10' },
  { id: 'q11', title: 'Q11: Factorising', questionId: 'pp_4024_w24_12_q11' },
  { id: 'q12', title: 'Q12: Irrational numbers', questionId: 'pp_4024_w24_12_q12' },
  { id: 'q13', title: 'Q13: Standard form', questionId: 'pp_4024_w24_12_q13' },
  { id: 'q14', title: 'Q14: LCM prime factors', questionId: 'pp_4024_w24_12_q14' },
  { id: 'q15', title: 'Q15: Regular polygon', questionId: 'pp_4024_w24_12_q15' },
  { id: 'q16', title: 'Q16: Transformation', questionId: 'pp_4024_w24_12_q16' },
  { id: 'q17', title: 'Q17: Inequalities and area', questionId: 'pp_4024_w24_12_q17' },
  { id: 'q18', title: 'Q18: Cumulative frequency', questionId: 'pp_4024_w24_12_q18' },
  { id: 'q19', title: 'Q19: Similar mugs', questionId: 'pp_4024_w24_12_q19' },
  { id: 'q20', title: 'Q20: Indices and expansion', questionId: 'pp_4024_w24_12_q20' },
  { id: 'q21', title: 'Q21: Inverse matrix', questionId: 'pp_4024_w24_12_q21' },
  { id: 'q22', title: 'Q22: Functions', questionId: 'pp_4024_w24_12_q22' },
  { id: 'q23', title: 'Q23: Venn diagram', questionId: 'pp_4024_w24_12_q23' },
  { id: 'q24', title: 'Q24: Perpendicular lines', questionId: 'pp_4024_w24_12_q24' },
  { id: 'q25', title: 'Q25: Histogram', questionId: 'pp_4024_w24_12_q25' },
  { id: 'q26', title: 'Q26: Vectors', questionId: 'pp_4024_w24_12_q26' }
];
