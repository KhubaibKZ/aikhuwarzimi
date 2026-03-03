// 4024/12 May/June 2023 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2023: Record<string, PastPaperQuestion> = {
  'pp_4024_s23_12_q1': {
    id: 'pp_4024_s23_12_q1', questionNumber: '1', title: 'Subtraction and squaring',
    question: '(a) Work out 3.25 − 1.73\n(b) Work out 1.2²',
    marks: 2, hints: ['(a) 3.25 − 1.73 = 1.52', '(b) 1.2² = 1.44'],
    type: 'multi-part',
    parts: [{ label: '(a) 3.25 − 1.73', key: 'a', marks: 1 }, { label: '(b) 1.2²', key: 'b', marks: 1 }],
    answer: { a: '1.52', b: '1.44' }
  },
  'pp_4024_s23_12_q2': {
    id: 'pp_4024_s23_12_q2', questionNumber: '2', title: 'Circle labels',
    question: 'The diagram shows a circle with centre O. A straight line touches the circle. Complete each label with the correct mathematical name.',
    marks: 2, hints: ['A line touching a circle at one point is a tangent', 'A region between two radii is a sector'],
    type: 'multi-part',
    parts: [{ label: 'Line touching circle', key: 'a', marks: 1 }, { label: 'Region', key: 'b', marks: 1 }],
    answer: { a: 'Tangent', b: 'Sector' }
  },
  'pp_4024_s23_12_q3': {
    id: 'pp_4024_s23_12_q3', questionNumber: '3', title: 'Order numbers',
    question: 'Write these numbers in order of size, starting with the smallest: 0.65, ⁵⁄₈, 62%, ¹¹⁄₂₀, 0.595',
    marks: 2, hints: ['Convert all to decimals: 5/8 = 0.625, 62% = 0.62, 11/20 = 0.55', 'Order: 0.55, 0.595, 0.62, 0.625, 0.65'],
    type: 'short', answer: '11/20, 0.595, 62%, 5/8, 0.65'
  },
  'pp_4024_s23_12_q4': {
    id: 'pp_4024_s23_12_q4', questionNumber: '4', title: 'Temperature and statistics',
    question: '(a) At midday the temperature is 8 °C. At midnight it is 12 °C lower. Find the temperature at midnight.\n(b) Shazia records temperatures for one week: 5, 2, −1, −7, −2, 5, −5.\n(i) Find the median.\n(ii) Find the range.',
    marks: 3, hints: ['(a) 8 − 12 = −4', '(b)(i) Order: −7, −5, −2, −1, 2, 5, 5 → median = −1', '(b)(ii) Range = 5 − (−7) = 12'],
    type: 'multi-part',
    parts: [{ label: '(a) Midnight temp (°C)', key: 'a', marks: 1 }, { label: '(b)(i) Median (°C)', key: 'bi', marks: 1 }, { label: '(b)(ii) Range (°C)', key: 'bii', marks: 1 }],
    answer: { a: '-4', bi: '-1', bii: '12' }
  },
  'pp_4024_s23_12_q5': {
    id: 'pp_4024_s23_12_q5', questionNumber: '5', title: 'Simple interest',
    question: 'Maya invests $480 at a rate of 2% per year simple interest. Calculate the total amount of interest she receives at the end of 5 years.',
    marks: 2, hints: ['Interest = PRT/100 = 480 × 2 × 5/100', '= $48'],
    type: 'short', answer: '48'
  },
  'pp_4024_s23_12_q6': {
    id: 'pp_4024_s23_12_q6', questionNumber: '6', title: 'Scale drawing and bearings',
    question: 'The scale drawing shows two villages A and B. Scale: 1 cm to 2 km.\n(a)(i) Find the actual distance AB.\n(a)(ii) Find the bearing of B from A.\n(b) Construct the perpendicular bisector of AB.',
    marks: 5, hints: ['(a)(i) Measure AB on diagram, multiply by 2', '(a)(ii) Measure angle from North at A clockwise to B', '(b) Use ruler and compasses'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Distance (km)', key: 'ai', marks: 2 }, { label: '(a)(ii) Bearing', key: 'aii', marks: 1 }, { label: '(b) Construction', key: 'b', marks: 2 }],
    answer: { ai: '19', aii: '240', b: 'Perpendicular bisector with arcs' }
  },
  'pp_4024_s23_12_q7': {
    id: 'pp_4024_s23_12_q7', questionNumber: '7', title: 'Scatter diagram',
    question: 'The scatter diagram shows the distance for 10 walks and the time each walk takes.\n(a) Write down the type of correlation.\n(b) Draw a line of best fit.\n(c) Use your line of best fit to estimate the time for a 5 km walk.',
    marks: 3, hints: ['(a) Points go up from left to right → positive', '(b) Draw through the middle of the data', '(c) Read off at d = 5'],
    type: 'multi-part',
    parts: [{ label: '(a) Correlation type', key: 'a', marks: 1 }, { label: '(b) Line of best fit', key: 'b', marks: 1 }, { label: '(c) Time (minutes)', key: 'c', marks: 1 }],
    answer: { a: 'Positive', b: 'Line drawn', c: '75' }
  },
  'pp_4024_s23_12_q8': {
    id: 'pp_4024_s23_12_q8', questionNumber: '8', title: 'Fraction addition',
    question: 'Work out 1³⁄₄ + ⁵⁄₆. Give your answer as a mixed number in its simplest form.',
    marks: 2, hints: ['1³⁄₄ = 7/4', '7/4 + 5/6 = 21/12 + 10/12 = 31/12 = 2⁷⁄₁₂'],
    type: 'short', answer: '2 7/12'
  },
  'pp_4024_s23_12_q9': {
    id: 'pp_4024_s23_12_q9', questionNumber: '9', title: 'Prism symmetry and volume',
    question: 'A triangular prism has a right-angled isosceles triangle cross-section. Sides 3 cm, 3 cm and length 8 cm.\n(a) Write down the number of planes of symmetry.\n(b) Work out the volume.',
    marks: 3, hints: ['(a) Isosceles triangle prism has 1 plane of symmetry', '(b) Area = ½ × 3 × 3 = 4.5 cm², Volume = 4.5 × 8 = 36 cm³'],
    type: 'multi-part',
    parts: [{ label: '(a) Planes of symmetry', key: 'a', marks: 1 }, { label: '(b) Volume (cm³)', key: 'b', marks: 2 }],
    answer: { a: '2', b: '36' }
  },
  'pp_4024_s23_12_q10': {
    id: 'pp_4024_s23_12_q10', questionNumber: '10', title: 'Simultaneous equations',
    question: 'Solve the simultaneous equations:\nx + 2y = 7\n3x + 4y = 11',
    marks: 3, hints: ['Multiply first equation by 2: 2x + 4y = 14', 'Subtract: 2x + 4y − (3x + 4y) = 14 − 11', '−x = 3, x = −3, y = 5'],
    type: 'multi-part',
    parts: [{ label: 'x', key: 'x', marks: 1 }, { label: 'y', key: 'y', marks: 2 }],
    answer: { x: '-3', y: '5' }
  },
  'pp_4024_s23_12_q11': {
    id: 'pp_4024_s23_12_q11', questionNumber: '11', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of 18/(0.2 × 0.395).',
    marks: 2, hints: ['18 ≈ 20, 0.2 stays, 0.395 ≈ 0.4', '20/(0.2 × 0.4) = 20/0.08 = 250'],
    type: 'short', answer: '250'
  },
  'pp_4024_s23_12_q12': {
    id: 'pp_4024_s23_12_q12', questionNumber: '12', title: 'Transformations',
    question: '(a) Describe fully the single transformation that maps shape A onto shape B.\n(b) Draw the image of shape A after a rotation of 180° about (0, 0).',
    marks: 5, hints: ['(a) Check if enlargement: compare sizes and find centre', '(a) Enlargement, scale factor 2, centre (1, −1)', '(b) Each point (x, y) → (−x, −y)'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation description', key: 'a', marks: 3 }, { label: '(b) Rotated image', key: 'b', marks: 2 }],
    answer: { a: 'Enlargement, scale factor 2, centre (1, -1)', b: 'Correct rotation' }
  },
  'pp_4024_s23_12_q13': {
    id: 'pp_4024_s23_12_q13', questionNumber: '13', title: 'Sequences',
    question: '(a) These are the first four terms: 1, 3, 9, 27. Find the next term.\n(b) First five terms: 35, 31, 27, 23, 19. Find the nth term.',
    marks: 3, hints: ['(a) Geometric: multiply by 3 each time → 81', '(b) Common difference = −4, nth term = 39 − 4n'],
    type: 'multi-part',
    parts: [{ label: '(a) Next term', key: 'a', marks: 1 }, { label: '(b) nth term', key: 'b', marks: 2 }],
    answer: { a: '81', b: '39-4n' }
  },
  'pp_4024_s23_12_q14': {
    id: 'pp_4024_s23_12_q14', questionNumber: '14', title: 'Prime factors and HCF',
    question: '(a) Write 325 as a product of its prime factors.\n(b) P = x^(n−1) × y and Q = x^n × y². Find the HCF of P and Q in terms of x, y and n.',
    marks: 4, hints: ['(a) 325 = 5 × 65 = 5 × 5 × 13 = 5² × 13', '(b) HCF uses lowest powers: x^(n−1) × y'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factors', key: 'a', marks: 2 }, { label: '(b) HCF', key: 'b', marks: 2 }],
    answer: { a: '5² × 13', b: 'x^(n-1) × y' }
  },
  'pp_4024_s23_12_q15': {
    id: 'pp_4024_s23_12_q15', questionNumber: '15', title: 'Inequalities and regions',
    question: 'Three lines and a shaded region are shown on a grid.\n(a) Find the three inequalities that define the shaded region.\n(b) Region R is defined by x + y ≤ 5, y ≥ 2x − 1, x ≥ 1. Find the area of R.',
    marks: 3, hints: ['(a) Identify the three boundary lines and determine which side is shaded', '(b) Plot the region and calculate the area'],
    type: 'multi-part',
    parts: [{ label: '(a) Inequalities', key: 'a', marks: 2 }, { label: '(b) Area (cm²)', key: 'b', marks: 1 }],
    answer: { a: 'x+y ≤ 5, y ≤ 2x-1, y ≥ -2', b: '1.5' }
  },
  'pp_4024_s23_12_q16': {
    id: 'pp_4024_s23_12_q16', questionNumber: '16', title: 'Speed–time graph',
    question: 'The speed–time graph shows part of a car\'s journey. Calculate the distance travelled in 150 seconds.',
    marks: 2, hints: ['Distance = area under the graph', 'Calculate the area of the trapezium/triangle shapes'],
    type: 'short', answer: '2400'
  },
  'pp_4024_s23_12_q17': {
    id: 'pp_4024_s23_12_q17', questionNumber: '17', title: 'Functions',
    question: 'f(x) = 2 − 3x and g(x) = x − 4.\n(a) Find f⁻¹(x).\n(b) Solve f(x + 5) = 3g(x).',
    marks: 5, hints: ['(a) y = 2 − 3x → x = (2 − y)/3 → f⁻¹(x) = (2 − x)/3', '(b) 2 − 3(x + 5) = 3(x − 4) → 2 − 3x − 15 = 3x − 12 → −6x = 1 → x = −1/6'],
    type: 'multi-part',
    parts: [{ label: '(a) f⁻¹(x)', key: 'a', marks: 2 }, { label: '(b) x', key: 'b', marks: 3 }],
    answer: { a: '(2-x)/3', b: '-1/6' }
  },
  'pp_4024_s23_12_q18': {
    id: 'pp_4024_s23_12_q18', questionNumber: '18', title: 'Matrices',
    question: 'Matrix C shows contents of gift bags. Large: 6 soaps, 4 candles. Small: 2 soaps, 1 candle.\n(a) How many more candles in large than small?\n(b)(i) Find N = CM where M is the mass matrix.\n(b)(ii) Explain what each element in N represents.',
    marks: 4, hints: ['(a) 4 − 1 = 3', '(b)(i) Multiply matrices', '(b)(ii) Mass of contents of each bag type'],
    type: 'multi-part',
    parts: [{ label: '(a) Difference', key: 'a', marks: 1 }, { label: '(b)(i) Matrix N', key: 'bi', marks: 2 }, { label: '(b)(ii) Meaning', key: 'bii', marks: 1 }],
    answer: { a: '3', bi: '960, 300', bii: 'Mass of contents of a large bag and small bag' }
  },
  'pp_4024_s23_12_q19': {
    id: 'pp_4024_s23_12_q19', questionNumber: '19', title: 'Venn diagrams',
    question: '(a) Shade the region (A ∩ B) ∩ (B ∩ C) on the Venn diagram.\n(b) 50 people visit a library. 35 borrow a book, 12 use a computer, 8 do neither. Find the number who use a computer but do not borrow a book.',
    marks: 3, hints: ['(b) Using Venn: 35 + 12 − x + 8 = 50', 'So x = 5 (both)', 'Computer only = 12 − 5 = 7'],
    type: 'multi-part',
    parts: [{ label: '(a) Shading', key: 'a', marks: 1 }, { label: '(b) Number', key: 'b', marks: 2 }],
    answer: { a: 'Correct shading', b: '7' }
  },
  'pp_4024_s23_12_q20': {
    id: 'pp_4024_s23_12_q20', questionNumber: '20', title: 'Expand and simplify indices',
    question: '(a) Expand and simplify (4x − y)(2x + 5y)\n(b) Simplify (x¹²/8)^(2/3)',
    marks: 4, hints: ['(a) 8x² + 20xy − 2xy − 5y² = 8x² + 18xy − 5y²', '(b) x⁸/4'],
    type: 'multi-part',
    parts: [{ label: '(a) Expanded', key: 'a', marks: 2 }, { label: '(b) Simplified', key: 'b', marks: 2 }],
    answer: { a: '8x²+18xy-5y²', b: 'x⁸/4' }
  },
  'pp_4024_s23_12_q21': {
    id: 'pp_4024_s23_12_q21', questionNumber: '21', title: 'Solve fractional equation',
    question: 'Solve: 5x/(x − 3) = x + 4',
    marks: 4, hints: ['5x = (x + 4)(x − 3)', '5x = x² + x − 12', 'x² − 4x − 12 = 0', '(x − 6)(x + 2) = 0'],
    type: 'multi-part',
    parts: [{ label: 'x (first value)', key: 'x1', marks: 2 }, { label: 'x (second value)', key: 'x2', marks: 2 }],
    answer: { x1: '6', x2: '-2' }
  },
  'pp_4024_s23_12_q22': {
    id: 'pp_4024_s23_12_q22', questionNumber: '22', title: 'Direct and inverse proportion',
    question: 'y is directly proportional to w². x is inversely proportional to w. When w = 10, y = 5 and x = 0.4. Find y in terms of x.',
    marks: 4, hints: ['y = kw² → 5 = 100k → k = 1/20', 'x = c/w → 0.4 = c/10 → c = 4', 'w = 4/x, y = (1/20)(4/x)² = 4/(5x²)'],
    type: 'short', answer: 'y = 4/(5x²)'
  },
  'pp_4024_s23_12_q23': {
    id: 'pp_4024_s23_12_q23', questionNumber: '23', title: 'Probability with and without replacement',
    question: '10 cards show squares or triangles, green or red.\n(a) Ken takes two cards with replacement. Find P(both green).\n(b) Irina takes two cards without replacement. Find P(both same shape).',
    marks: 5, hints: ['(a) Green = 7/10, P = 7/10 × 7/10 = 49/100', '(b) P(both square) = 4/10 × 3/9, P(both triangle) = 6/10 × 5/9', 'Total = 12/90 + 30/90 = 42/90'],
    type: 'multi-part',
    parts: [{ label: '(a) P(both green)', key: 'a', marks: 2 }, { label: '(b) P(same shape)', key: 'b', marks: 3 }],
    answer: { a: '49/100', b: '42/90' }
  },
  'pp_4024_s23_12_q24': {
    id: 'pp_4024_s23_12_q24', questionNumber: '24', title: 'Perpendicular bisector proof',
    question: 'A is the point (3, 11) and B is the point (−5, −5). The equation of line L is 2y + x = 5. Show that line L is the perpendicular bisector of AB.',
    marks: 5, hints: ['Midpoint = (−1, 3)', 'Gradient AB = 16/8 = 2', 'Gradient of L: 2y = −x + 5 → y = −x/2 + 5/2 → gradient = −1/2', 'Product = 2 × −1/2 = −1 ✓, midpoint on L: 2(3) + (−1) = 5 ✓'],
    type: 'short', answer: 'Midpoint (−1, 3) lies on L, gradients multiply to −1'
  },
};

export const sections4024_12_2023: PastPaperSection[] = [
  { id: 's_4024_s23_12_q1', title: 'Q1 – Subtraction and squaring', questionId: 'pp_4024_s23_12_q1' },
  { id: 's_4024_s23_12_q2', title: 'Q2 – Circle labels', questionId: 'pp_4024_s23_12_q2' },
  { id: 's_4024_s23_12_q3', title: 'Q3 – Order numbers', questionId: 'pp_4024_s23_12_q3' },
  { id: 's_4024_s23_12_q4', title: 'Q4 – Temperature & statistics', questionId: 'pp_4024_s23_12_q4' },
  { id: 's_4024_s23_12_q5', title: 'Q5 – Simple interest', questionId: 'pp_4024_s23_12_q5' },
  { id: 's_4024_s23_12_q6', title: 'Q6 – Scale drawing & bearings', questionId: 'pp_4024_s23_12_q6' },
  { id: 's_4024_s23_12_q7', title: 'Q7 – Scatter diagram', questionId: 'pp_4024_s23_12_q7' },
  { id: 's_4024_s23_12_q8', title: 'Q8 – Fraction addition', questionId: 'pp_4024_s23_12_q8' },
  { id: 's_4024_s23_12_q9', title: 'Q9 – Prism symmetry & volume', questionId: 'pp_4024_s23_12_q9' },
  { id: 's_4024_s23_12_q10', title: 'Q10 – Simultaneous equations', questionId: 'pp_4024_s23_12_q10' },
  { id: 's_4024_s23_12_q11', title: 'Q11 – Estimation', questionId: 'pp_4024_s23_12_q11' },
  { id: 's_4024_s23_12_q12', title: 'Q12 – Transformations', questionId: 'pp_4024_s23_12_q12' },
  { id: 's_4024_s23_12_q13', title: 'Q13 – Sequences', questionId: 'pp_4024_s23_12_q13' },
  { id: 's_4024_s23_12_q14', title: 'Q14 – Prime factors & HCF', questionId: 'pp_4024_s23_12_q14' },
  { id: 's_4024_s23_12_q15', title: 'Q15 – Inequalities & regions', questionId: 'pp_4024_s23_12_q15' },
  { id: 's_4024_s23_12_q16', title: 'Q16 – Speed–time graph', questionId: 'pp_4024_s23_12_q16' },
  { id: 's_4024_s23_12_q17', title: 'Q17 – Functions', questionId: 'pp_4024_s23_12_q17' },
  { id: 's_4024_s23_12_q18', title: 'Q18 – Matrices', questionId: 'pp_4024_s23_12_q18' },
  { id: 's_4024_s23_12_q19', title: 'Q19 – Venn diagrams', questionId: 'pp_4024_s23_12_q19' },
  { id: 's_4024_s23_12_q20', title: 'Q20 – Expand & indices', questionId: 'pp_4024_s23_12_q20' },
  { id: 's_4024_s23_12_q21', title: 'Q21 – Fractional equation', questionId: 'pp_4024_s23_12_q21' },
  { id: 's_4024_s23_12_q22', title: 'Q22 – Proportion', questionId: 'pp_4024_s23_12_q22' },
  { id: 's_4024_s23_12_q23', title: 'Q23 – Probability', questionId: 'pp_4024_s23_12_q23' },
  { id: 's_4024_s23_12_q24', title: 'Q24 – Perpendicular bisector', questionId: 'pp_4024_s23_12_q24' },
];
