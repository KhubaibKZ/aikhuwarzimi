// 4024/12 Oct/Nov 2021 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2021ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on21_12_q1': {
    id: 'pp_4024_on21_12_q1', questionNumber: '1', title: 'Powers and roots',
    question: '(a) Evaluate √4900\n(b) Evaluate 5³',
    marks: 2, hints: ['(a) √4900 = 70', '(b) 5³ = 125'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 1 }],
    answer: { a: '70', b: '125' }
  },
  'pp_4024_on21_12_q2': {
    id: 'pp_4024_on21_12_q2', questionNumber: '2', title: 'Negative numbers',
    question: 'Work out −8 + 7 × (−5).',
    marks: 1, hints: ['7 × (−5) = −35', '−8 + (−35) = −43'],
    type: 'calculation',
    parts: [{ label: 'Answer', key: 'answer', marks: 1 }],
    answer: { answer: '-43' }
  },
  'pp_4024_on21_12_q3': {
    id: 'pp_4024_on21_12_q3', questionNumber: '3', title: 'Rotational symmetry',
    question: 'Shade one more small triangle so that the shape has rotational symmetry of order 3.',
    marks: 1, hints: ['Rotate the pattern 120° to find the missing triangle'],
    type: 'calculation',
    parts: [{ label: 'Diagram', key: 'answer', marks: 1 }],
    answer: { answer: 'Correct triangle shaded' }
  },
  'pp_4024_on21_12_q4': {
    id: 'pp_4024_on21_12_q4', questionNumber: '4', title: 'Nets of solids',
    question: 'Write down the name of the solid formed from each net.',
    marks: 3, hints: ['Identify the shapes in the net', 'Cuboid, [Square based] pyramid, [Triangular] prism'],
    type: 'multi-part',
    parts: [{ label: 'Solid 1', key: 'a', marks: 1 }, { label: 'Solid 2', key: 'b', marks: 1 }, { label: 'Solid 3', key: 'c', marks: 1 }],
    answer: { a: 'Cuboid', b: 'Square-based pyramid', c: 'Triangular prism' }
  },
  'pp_4024_on21_12_q5': {
    id: 'pp_4024_on21_12_q5', questionNumber: '5', title: 'Angles with parallel lines',
    question: 'ABCD and EFGH are parallel lines. CF and BG intersect at X. ∠CFG = 53°, ∠BGF = 46°, ∠BXC = 81°.\n(a) Find ∠CXG\n(b) Find ∠BCX\n(c) Find ∠ABX',
    marks: 3, hints: ['(a) ∠CXG = 180° − 81° = 99°', '(b) ∠BCX = 53° (alternate angles)', '(c) ∠ABX = 180° − 46° = 134°'],
    type: 'multi-part',
    parts: [{ label: '(a) ∠CXG', key: 'a', marks: 1 }, { label: '(b) ∠BCX', key: 'b', marks: 1 }, { label: '(c) ∠ABX', key: 'c', marks: 1 }],
    answer: { a: '99', b: '53', c: '134' }
  },
  'pp_4024_on21_12_q6': {
    id: 'pp_4024_on21_12_q6', questionNumber: '6', title: 'Fractions',
    question: '(a) Work out 69 ÷ 0.3\n(b) Work out 1⁴⁄₇ ÷ ³⁄₅. Give your answer as a mixed number in its simplest form.',
    marks: 3, hints: ['(a) 69 ÷ 0.3 = 230', '(b) 11/7 ÷ 3/5 = 11/7 × 5/3 = 55/21 = 2 13/21'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '230', b: '2 13/21' }
  },
  'pp_4024_on21_12_q7': {
    id: 'pp_4024_on21_12_q7', questionNumber: '7', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of 8230 × 0.64 ÷ 18.7',
    marks: 2, hints: ['8230 ≈ 8000, 0.64 ≈ 0.6, 18.7 ≈ 20', '8000 × 0.6 ÷ 20 = 240'],
    type: 'calculation',
    parts: [{ label: 'Estimate', key: 'answer', marks: 2 }],
    answer: { answer: '240' }
  },
  'pp_4024_on21_12_q8': {
    id: 'pp_4024_on21_12_q8', questionNumber: '8', title: 'Unit conversion',
    question: '(a) Write 0.06 km in metres.\n(b) Convert 7 m² to cm².',
    marks: 2, hints: ['(a) 0.06 × 1000 = 60 m', '(b) 7 × 10000 = 70000 cm²'],
    type: 'multi-part',
    parts: [{ label: '(a) metres', key: 'a', marks: 1 }, { label: '(b) cm²', key: 'b', marks: 1 }],
    answer: { a: '60', b: '70000' }
  },
  'pp_4024_on21_12_q9': {
    id: 'pp_4024_on21_12_q9', questionNumber: '9', title: 'Prime factors, HCF and LCM',
    question: '(a) Write 216 as a product of its prime factors.\n(b) Two positive integers each greater than 25 have LCM 216 and HCF 18. Find the two integers.',
    marks: 4, hints: ['(a) 216 = 2³ × 3³', '(b) HCF = 18 = 2 × 3², factors: 54 and 72'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factorisation', key: 'a', marks: 2 }, { label: '(b) Two integers', key: 'b', marks: 2 }],
    answer: { a: '2³ × 3³', b: '54 and 72' }
  },
  'pp_4024_on21_12_q10': {
    id: 'pp_4024_on21_12_q10', questionNumber: '10', title: 'Transformations',
    question: '(a) Describe fully the single transformation that maps triangle A onto triangle B.\n(b) Triangle A is mapped onto triangle C by rotation 90° anticlockwise, centre (0, 0). Draw triangle C.\n(c) Triangle A is mapped onto triangle D by enlargement, scale factor 3, centre (5, −5). Draw triangle D.',
    marks: 6, hints: ['(a) Translation by vector (−4, 2)', '(b) Apply 90° anticlockwise rotation to each vertex', '(c) Multiply distance from centre by 3'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation', key: 'a', marks: 2 }, { label: '(b) Triangle C', key: 'b', marks: 2 }, { label: '(c) Triangle D', key: 'c', marks: 2 }],
    answer: { a: 'Translation (−4, 2)', b: 'Triangle at (4,2), (4,3), (2,3)', c: 'Triangle at (−1,−2), (−1,4), (−4,−2)' }
  },
  'pp_4024_on21_12_q11': {
    id: 'pp_4024_on21_12_q11', questionNumber: '11', title: 'Constructions and loci',
    question: '(a) Construct the perpendicular bisector of PQ.\n(b) Shade the region where a tree can be planted: nearer to Q than P and more than 18 m from Q.',
    marks: 5, hints: ['(a) Use compasses from P and Q with equal radii', '(b) Region on Q side of perpendicular bisector and outside circle radius 3 cm (18m)'],
    type: 'multi-part',
    parts: [{ label: '(a) Perpendicular bisector', key: 'a', marks: 2 }, { label: '(b) Shaded region', key: 'b', marks: 3 }],
    answer: { a: 'Perpendicular bisector with arcs', b: 'Correct region shaded' }
  },
  'pp_4024_on21_12_q12': {
    id: 'pp_4024_on21_12_q12', questionNumber: '12', title: 'Similar triangles proof',
    question: 'Rectangle ABCD. E is on diagonal AC with ∠DEC = 90°. Prove triangle ADC is similar to triangle DEC.',
    marks: 3, hints: ['∠ACD = ∠DCE (shared angle)', '∠ADC = ∠DEC = 90° (given)', 'AA similarity'],
    type: 'multi-part',
    parts: [{ label: 'Proof', key: 'answer', marks: 3 }],
    answer: { answer: '∠ACD = ∠DCE (shared); ∠ADC = ∠DEC = 90°; AA similarity' }
  },
  'pp_4024_on21_12_q13': {
    id: 'pp_4024_on21_12_q13', questionNumber: '13', title: 'Mean of five numbers',
    question: 'The mean of five numbers is 17. Listed in order, the three smallest are equal. The middle three add to 35. The largest is four times the smallest. List the five numbers.',
    marks: 3, hints: ['Total = 5 × 17 = 85', 'Let smallest = x: 3x + ... = 85, largest = 4x', '3x + (35 − 2x) + 4x = 85 → x = 10', 'Numbers: 10, 10, 10, 15, 40'],
    type: 'calculation',
    parts: [{ label: 'Five numbers', key: 'answer', marks: 3 }],
    answer: { answer: '10, 10, 10, 15, 40' }
  },
  'pp_4024_on21_12_q14': {
    id: 'pp_4024_on21_12_q14', questionNumber: '14', title: 'Speed-time graph',
    question: '(a) Find the acceleration during the first 20 seconds.\n(b) Describe the motion between t = 20 and t = 30.\n(c) Find the total distance travelled in 50 seconds.',
    marks: 5, hints: ['(a) Acceleration = change in speed / time = 15/20 = 0.75 m/s²', '(b) Constant speed', '(c) Area under graph = ½(10+30)×15 + ½(5+15)×20 = 300 + 200 = 500 m'],
    type: 'multi-part',
    parts: [{ label: '(a) Acceleration', key: 'a', marks: 1 }, { label: '(b) Description', key: 'b', marks: 1 }, { label: '(c) Distance (m)', key: 'c', marks: 3 }],
    answer: { a: '0.75', b: 'Constant speed', c: '500' }
  },
  'pp_4024_on21_12_q15': {
    id: 'pp_4024_on21_12_q15', questionNumber: '15', title: 'Percentage decrease',
    question: 'During one year the value of a bicycle decreased from $200 to $160. Calculate the percentage decrease.',
    marks: 2, hints: ['Decrease = 200 − 160 = 40', 'Percentage = (40/200) × 100 = 20%'],
    type: 'calculation',
    parts: [{ label: 'Percentage decrease', key: 'answer', marks: 2 }],
    answer: { answer: '20' }
  },
  'pp_4024_on21_12_q16': {
    id: 'pp_4024_on21_12_q16', questionNumber: '16', title: 'Solving inequality',
    question: 'Solve the inequality 23 + 2n < 5 − 6n.',
    marks: 2, hints: ['2n + 6n < 5 − 23', '8n < −18', 'n < −9/4'],
    type: 'calculation',
    parts: [{ label: 'n', key: 'answer', marks: 2 }],
    answer: { answer: 'n > −9/4' }
  },
  'pp_4024_on21_12_q17': {
    id: 'pp_4024_on21_12_q17', questionNumber: '17', title: 'Factorisation by grouping',
    question: 'Factorise 3xy − qy + 6px − 2pq.',
    marks: 2, hints: ['Group: y(3x − q) + 2p(3x − q)', '= (3x − q)(y + 2p)'],
    type: 'calculation',
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: '(3x − q)(y + 2p)' }
  },
  'pp_4024_on21_12_q18': {
    id: 'pp_4024_on21_12_q18', questionNumber: '18', title: 'Inequalities region',
    question: 'The equation of line AC is y = −½x + 5. Write down the three inequalities that define the shaded region.',
    marks: 2, hints: ['x ≥ −4, y ≥ 2, y ≤ −½x + 5'],
    type: 'multi-part',
    parts: [{ label: 'Inequalities', key: 'answer', marks: 2 }],
    answer: { answer: 'x ≥ −4, y ≥ 2, y ≤ −½x + 5' }
  },
  'pp_4024_on21_12_q19': {
    id: 'pp_4024_on21_12_q19', questionNumber: '19', title: 'Circle theorem',
    question: 'A, B and C lie on a circle, centre O. PBQ is a tangent at B. OCQ is a straight line. ∠BQO = 36° and ∠BAC = x°. Find x.',
    marks: 2, hints: ['∠OBQ = 90° (tangent-radius)', '∠BOQ = 180° − 90° − 36° = 54°', '∠BAC = ½ × ∠BOC... MS says x = 27'],
    type: 'calculation',
    parts: [{ label: 'x', key: 'answer', marks: 2 }],
    answer: { answer: '27' }
  },
  'pp_4024_on21_12_q20': {
    id: 'pp_4024_on21_12_q20', questionNumber: '20', title: 'Inverse matrix',
    question: 'Find the inverse of (3, −2; 1, 2).',
    marks: 2, hints: ['det = 3(2) − (−2)(1) = 8', 'Inverse = (1/8)(2, 2; −1, 3)'],
    type: 'calculation',
    parts: [{ label: 'Matrix', key: 'answer', marks: 2 }],
    answer: { answer: '(1/8)(2, 2; −1, 3)' }
  },
  'pp_4024_on21_12_q21': {
    id: 'pp_4024_on21_12_q21', questionNumber: '21', title: 'Cumulative frequency',
    question: '(a)(i) Estimate the median mass of 120 eggs.\n(a)(ii) Estimate the interquartile range.\n(b) Eggs with mass ≥ 63 g are "large". How many are large?',
    marks: 5, hints: ['(a)(i) Median at 60th value ≈ 58 g', '(a)(ii) Q1 at 30th ≈ 47, Q3 at 90th ≈ 62, IQR = 15... MS says 11', '(b) Read at 63 g, subtract from 120... MS says 21-24'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Median (g)', key: 'ai', marks: 1 }, { label: '(a)(ii) IQR (g)', key: 'aii', marks: 2 }, { label: '(b) Large eggs', key: 'b', marks: 2 }],
    answer: { ai: '58', aii: '11', b: '21 to 24' }
  },
  'pp_4024_on21_12_q22': {
    id: 'pp_4024_on21_12_q22', questionNumber: '22', title: 'Indices equations',
    question: '(a) Solve 27^k = 9\n(b) Simplify (x⁸)^(−1/4)',
    marks: 4, hints: ['(a) 3^(3k) = 3², so 3k = 2, k = 2/3', '(b) x^(8 × −1/4) = x^(−2) = 1/x²... MS says x²'],
    type: 'multi-part',
    parts: [{ label: '(a) k', key: 'a', marks: 2 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '2/3', b: 'x²' }
  },
  'pp_4024_on21_12_q23': {
    id: 'pp_4024_on21_12_q23', questionNumber: '23', title: 'Inverse proportion',
    question: 'y is inversely proportional to (x + 1)². When x = 1, y = 5. Find y when x = 9.',
    marks: 3, hints: ['y = k/(x + 1)²', '5 = k/4, so k = 20', 'y = 20/100 = 1/5'],
    type: 'calculation',
    parts: [{ label: 'y', key: 'answer', marks: 3 }],
    answer: { answer: '1/5' }
  },
  'pp_4024_on21_12_q24': {
    id: 'pp_4024_on21_12_q24', questionNumber: '24', title: 'Functions',
    question: 'f(x) = 2x² + 7x + 4 and g(x) = 2x + 6.\n(a)(i) Find f(3).\n(a)(ii) Find g⁻¹(x).\n(b) Solve f(x) − g(x) = 1.',
    marks: 6, hints: ['(a)(i) f(3) = 18 + 21 + 4 = 43', '(a)(ii) y = 2x + 6 → x = (y − 6)/2', '(b) 2x² + 5x − 2 = 1 → 2x² + 5x − 3 = 0 → (2x − 1)(x + 3) = 0'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) f(3)', key: 'ai', marks: 1 }, { label: '(a)(ii) g⁻¹(x)', key: 'aii', marks: 2 }, { label: '(b) x values', key: 'b', marks: 3 }],
    answer: { ai: '43', aii: '(x − 6)/2', b: '1/2 and −3' }
  },
  'pp_4024_on21_12_q25': {
    id: 'pp_4024_on21_12_q25', questionNumber: '25', title: 'Venn diagrams',
    question: '40 students do Art (A), Dancing (D) and Gardening (G). 5 do none, 12 do Art only, 4 do D and G but not A, 1 does all three.\n(a) Complete the Venn diagram.\n(b) x : y : z = 1 : 2 : 3. Find x, y and z.\n(c) Describe the subset with no students using set notation.\n(d) Find n((D ∪ G) ∩ A).',
    marks: 7, hints: ['(a) Place known values in diagram', '(b) x + y + z = 40 − 12 − 1 − 4 − 5 = 18, ratio 1:2:3, x = 3, y = 6, z = 9', '(c) A ∩ G ∩ D′', '(d) (their x) + 1 = 4'],
    type: 'multi-part',
    parts: [{ label: '(a) Venn diagram', key: 'a', marks: 2 }, { label: '(b) x, y, z', key: 'b', marks: 3 }, { label: '(c) Set notation', key: 'c', marks: 1 }, { label: '(d) n((D∪G)∩A)', key: 'd', marks: 1 }],
    answer: { a: 'Completed Venn diagram', b: 'x = 3, y = 6, z = 9', c: 'A ∩ G ∩ D′', d: '4' }
  },
};

export const sections4024_12_2021ON: PastPaperSection[] = Object.values(questions4024_12_2021ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
