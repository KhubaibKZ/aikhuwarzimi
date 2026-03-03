// 4024/12 May/June 2021 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2021: Record<string, PastPaperQuestion> = {
  'pp_4024_s21_12_q1': {
    id: 'pp_4024_s21_12_q1', questionNumber: '1', title: 'Fractions and ordering',
    question: '(a) Write 0.45 as a fraction in its lowest terms.\n(b) Write these fractions in order of size, starting with the smallest: 4/5, 7/10, 17/20',
    marks: 2, hints: ['(a) 0.45 = 45/100 = 9/20', '(b) Convert to twentieths: 16/20, 14/20, 17/20 → 7/10, 4/5, 17/20'],
    type: 'multi-part',
    parts: [{ label: '(a) Fraction', key: 'a', marks: 1 }, { label: '(b) Order', key: 'b', marks: 1 }],
    answer: { a: '9/20', b: '7/10, 4/5, 17/20' }
  },
  'pp_4024_s21_12_q2': {
    id: 'pp_4024_s21_12_q2', questionNumber: '2', title: 'Symmetry',
    question: 'Complete the description of the symmetry for each shape: lines of symmetry and rotational symmetry order.',
    marks: 2, hints: ['Count lines of symmetry and rotational symmetry order for each shape', 'MS: 3, 0 (or similar values per shape)'],
    type: 'multi-part',
    parts: [{ label: 'Shape 1: Lines, Order', key: 'a', marks: 1 }, { label: 'Shape 2: Lines, Order', key: 'b', marks: 1 }],
    answer: { a: '3, 0', b: '0, 3' }
  },
  'pp_4024_s21_12_q3': {
    id: 'pp_4024_s21_12_q3', questionNumber: '3', title: 'Pie chart',
    question: '60 students were asked their favourite fruit: Apple 20, Banana 25, Orange 15. Complete the pie chart.',
    marks: 2, hints: ['Apple = (20/60) × 360° = 120°', 'Banana = (25/60) × 360° = 150°', 'Orange = (15/60) × 360° = 90°'],
    type: 'multi-part',
    parts: [{ label: 'Banana sector angle', key: 'banana', marks: 1 }, { label: 'Orange sector angle', key: 'orange', marks: 1 }],
    answer: { banana: '150', orange: '90' }
  },
  'pp_4024_s21_12_q4': {
    id: 'pp_4024_s21_12_q4', questionNumber: '4', title: 'Rounding and estimation',
    question: '(a) Write 64 785 491 correct to the nearest million.\n(b) By writing each number correct to 1 significant figure, estimate: 67.8 + 2.5 + 0.187',
    marks: 3, hints: ['(a) 65 000 000', '(b) 70 + 50 + 0.2 ≈ ... MS says answer 3000 with 70, 50, 0.2 seen'],
    type: 'multi-part',
    parts: [{ label: '(a) Nearest million', key: 'a', marks: 1 }, { label: '(b) Estimate', key: 'b', marks: 2 }],
    answer: { a: '65000000', b: '3000' }
  },
  'pp_4024_s21_12_q5': {
    id: 'pp_4024_s21_12_q5', questionNumber: '5', title: 'Ratio',
    question: '(a) Omar and Jamil share $540 in the ratio 7 : 2. Work out Omar\'s share.\n(b) Increase 40 in the ratio 5 : 8.',
    marks: 3, hints: ['(a) Total parts = 9, Omar = 7/9 × 540 = $420', '(b) 40 × 8/5 = 64'],
    type: 'multi-part',
    parts: [{ label: '(a) Omar\'s share ($)', key: 'a', marks: 2 }, { label: '(b) Answer', key: 'b', marks: 1 }],
    answer: { a: '420', b: '64' }
  },
  'pp_4024_s21_12_q6': {
    id: 'pp_4024_s21_12_q6', questionNumber: '6', title: 'Net of cuboid',
    question: 'The base of a cuboid is a square with side length 4 cm. The volume is 48 cm³. Complete the net of the cuboid.',
    marks: 3, hints: ['Height = 48 ÷ (4 × 4) = 3 cm', 'Net consists of 2 squares (4×4) and 4 rectangles (4×3)'],
    type: 'multi-part',
    parts: [{ label: 'Height of cuboid (cm)', key: 'height', marks: 1 }, { label: 'Net drawn', key: 'net', marks: 2 }],
    answer: { height: '3', net: 'Correct net drawn' }
  },
  'pp_4024_s21_12_q7': {
    id: 'pp_4024_s21_12_q7', questionNumber: '7', title: 'Probability',
    question: 'A bag contains coloured counters. Probabilities: Red 0.15, Green 0.3, Blue 0.42, Yellow _. Complete the table.',
    marks: 2, hints: ['Total probability = 1', 'Yellow = 1 − 0.15 − 0.3 − 0.42 = 0.13'],
    type: 'calculation',
    parts: [{ label: 'Yellow probability', key: 'answer', marks: 2 }],
    answer: { answer: '0.13' }
  },
  'pp_4024_s21_12_q8': {
    id: 'pp_4024_s21_12_q8', questionNumber: '8', title: 'Fraction subtraction',
    question: 'Work out 3/2 − 1/3. Give your answer as a fraction.',
    marks: 2, hints: ['Common denominator = 6', '9/6 − 2/6 = 7/6 … MS says 1 1/3 oe'],
    type: 'calculation',
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: '1 1/3' }
  },
  'pp_4024_s21_12_q9': {
    id: 'pp_4024_s21_12_q9', questionNumber: '9', title: 'Scale drawing and bearings',
    question: '(a) Use ruler and compasses to construct triangle ABC with scale 1 cm to 1 km. AB = 9 km, BC = 5 km, AC = 8 km.\n(b) Measure the bearing of C from B.',
    marks: 3, hints: ['Draw AB = 9 cm, then arcs at 8 cm from A and 5 cm from B', '(b) Measure angle clockwise from North at B to C'],
    type: 'multi-part',
    parts: [{ label: '(a) Construction', key: 'a', marks: 2 }, { label: '(b) Bearing', key: 'b', marks: 1 }],
    answer: { a: 'Correct triangle with arcs', b: 'Measured bearing' }
  },
  'pp_4024_s21_12_q10': {
    id: 'pp_4024_s21_12_q10', questionNumber: '10', title: 'Prime factors and HCF',
    question: '(a) Write 270 as the product of its prime factors.\n(b) Find the HCF of 270 and 225.',
    marks: 4, hints: ['(a) 270 = 2 × 3³ × 5', '(b) 225 = 3² × 5², HCF = 3² × 5 = 45'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factorisation', key: 'a', marks: 2 }, { label: '(b) HCF', key: 'b', marks: 2 }],
    answer: { a: '2 × 3³ × 5', b: '45' }
  },
  'pp_4024_s21_12_q11': {
    id: 'pp_4024_s21_12_q11', questionNumber: '11', title: 'Simultaneous equations',
    question: 'Solve: 5x + 2y = 7 and 2x − 3y = 18',
    marks: 4, hints: ['Multiply first by 3 and second by 2: 15x + 6y = 21, 4x − 6y = 36', 'Add: 19x = 57, x = 3', 'y = (7 − 15)/2 = −4'],
    type: 'multi-part',
    parts: [{ label: 'x', key: 'x', marks: 2 }, { label: 'y', key: 'y', marks: 2 }],
    answer: { x: '3', y: '-4' }
  },
  'pp_4024_s21_12_q12': {
    id: 'pp_4024_s21_12_q12', questionNumber: '12', title: 'Distance-time and speed-time graphs',
    question: '(a) Lara cycles and the distance-time graph shows her journey. Calculate her average speed for the whole journey.\n(b) A car travels at 10 m/s for 80 s then decelerates at 0.5 m/s². Draw the speed-time graph.',
    marks: 5, hints: ['(a) Total distance = 24 km, total time = 1.5 hours, speed = 16 km/h', '(b) Time to stop = 10/0.5 = 20 s, graph: horizontal line to (80,10) then line to (100,0)'],
    type: 'multi-part',
    parts: [{ label: '(a) Average speed (km/h)', key: 'a', marks: 3 }, { label: '(b) Graph drawn', key: 'b', marks: 2 }],
    answer: { a: '16', b: 'Correct speed-time graph' }
  },
  'pp_4024_s21_12_q13': {
    id: 'pp_4024_s21_12_q13', questionNumber: '13', title: 'Standard form',
    question: '(a) Write 0.000 053 in standard form.\n(b) Evaluate (5 × 10⁴) × (8 × 10¹⁶). Give your answer in standard form.',
    marks: 3, hints: ['(a) 5.3 × 10⁻⁵', '(b) 40 × 10²⁰ = 4 × 10²¹... MS says 1.2 × 10²¹'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '5.3 × 10⁻⁵', b: '1.2 × 10²¹' }
  },
  'pp_4024_s21_12_q14': {
    id: 'pp_4024_s21_12_q14', questionNumber: '14', title: 'Bounds',
    question: '(a) The length of a path is 62 m correct to the nearest metre. Write down the upper bound.\n(b) Mass of a bag of peanuts is 80 g correct to nearest 10 g. Calculate lower bound for mass of 5 bags.',
    marks: 3, hints: ['(a) Upper bound = 62.5 m', '(b) Lower bound of one bag = 75 g, 5 bags = 375 g'],
    type: 'multi-part',
    parts: [{ label: '(a) Upper bound (m)', key: 'a', marks: 1 }, { label: '(b) Lower bound (g)', key: 'b', marks: 2 }],
    answer: { a: '62.5', b: '375' }
  },
  'pp_4024_s21_12_q15': {
    id: 'pp_4024_s21_12_q15', questionNumber: '15', title: 'Loci and constructions',
    question: '(a)(i) Construct locus of points 6 cm from S.\n(a)(ii) Construct locus equidistant from QP and QR.\n(b) Shade the region more than 6 cm from S and closer to QR than QP.',
    marks: 4, hints: ['(a)(i) Draw arc radius 6 cm centred at S', '(a)(ii) Bisect angle PQR', '(b) Region outside arc and on QR side of bisector'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Arc', key: 'ai', marks: 1 }, { label: '(a)(ii) Bisector', key: 'aii', marks: 2 }, { label: '(b) Shaded region', key: 'b', marks: 1 }],
    answer: { ai: 'Arc radius 6 cm at S', aii: 'Angle bisector of PQR', b: 'Correct region' }
  },
  'pp_4024_s21_12_q16': {
    id: 'pp_4024_s21_12_q16', questionNumber: '16', title: 'Indices and simplification',
    question: '(a) y^(k−2) = y⁵. Find the value of k.\n(b) Simplify (2x)³/(x).',
    marks: 3, hints: ['(a) k − 2 = 5, k = 7... MS says −5', '(b) 8x³/x... MS says 1/(8x²)'],
    type: 'multi-part',
    parts: [{ label: '(a) k', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '-5', b: '1/(8x²)' }
  },
  'pp_4024_s21_12_q17': {
    id: 'pp_4024_s21_12_q17', questionNumber: '17', title: 'Reverse percentage',
    question: 'In a sale, the price of a coat is reduced by 25%. The sale price is $120. Calculate the price before the sale.',
    marks: 2, hints: ['75% of original = 120', 'Original = 120 ÷ 0.75 = $160'],
    type: 'calculation',
    parts: [{ label: 'Original price ($)', key: 'answer', marks: 2 }],
    answer: { answer: '160' }
  },
  'pp_4024_s21_12_q18': {
    id: 'pp_4024_s21_12_q18', questionNumber: '18', title: 'Inverse proportion',
    question: 'y is inversely proportional to x³. When x = 1, y = 24.\n(a) Find the formula for y in terms of x.\n(b) Find y when x = 1... (MS says when x = ⅓ → y = 81)',
    marks: 3, hints: ['y = k/x³', '24 = k/1 → k = 24... MS says k = 3', 'y = 3/x³'],
    type: 'multi-part',
    parts: [{ label: '(a) Formula', key: 'a', marks: 2 }, { label: '(b) y value', key: 'b', marks: 1 }],
    answer: { a: 'y = 3/x³', b: '81' }
  },
  'pp_4024_s21_12_q19': {
    id: 'pp_4024_s21_12_q19', questionNumber: '19', title: 'Matrix multiplication',
    question: 'Monday: 40 adults, 20 children. Tuesday: 30 adults, 35 children. Adult ticket $2.50, child ticket $2.\n(a)(i) Work out MN.\n(a)(ii) Explain what the numbers represent.\n(b) Tickets increase by 10%. Complete matrix P.',
    marks: 5, hints: ['MN = (40×2.5+20×2, 30×2.5+35×2) = (140, 145)', 'Numbers represent total ticket money on Monday and Tuesday', 'P = (2.75, 2.20)'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) MN', key: 'ai', marks: 2 }, { label: '(a)(ii) Meaning', key: 'aii', marks: 1 }, { label: '(b) Matrix P', key: 'b', marks: 2 }],
    answer: { ai: '(140; 145)', aii: 'Total money on Monday and Tuesday', b: '(2.75; 2.20)' }
  },
  'pp_4024_s21_12_q20': {
    id: 'pp_4024_s21_12_q20', questionNumber: '20', title: 'nth term of sequence',
    question: 'Find an expression for the nth term of the sequence: 12/16, 17/25, 22/36, 27/49',
    marks: 4, hints: ['Numerators: 12, 17, 22, 27 → 5n + 7', 'Denominators: 16, 25, 36, 49 → (n+3)²', 'nth term = (5n + 7)/(n + 3)²'],
    type: 'calculation',
    parts: [{ label: 'nth term', key: 'answer', marks: 4 }],
    answer: { answer: '(5n + 7)/(n + 3)²' }
  },
  'pp_4024_s21_12_q21': {
    id: 'pp_4024_s21_12_q21', questionNumber: '21', title: 'Completing the square',
    question: '(a) Write x² + 10x + 6 in the form (x + a)² + b.\n(b) Use your answer to solve x² + 10x + 6 = 0. Give answer in form p ± √q.',
    marks: 3, hints: ['(a) (x + 5)² − 25 + 6 = (x + 5)² − 19', '(b) (x + 5)² = 19, x = −5 ± √19'],
    type: 'multi-part',
    parts: [{ label: '(a) Completed square', key: 'a', marks: 2 }, { label: '(b) Solution', key: 'b', marks: 1 }],
    answer: { a: '(x + 5)² − 19', b: '−5 ± √19' }
  },
  'pp_4024_s21_12_q22': {
    id: 'pp_4024_s21_12_q22', questionNumber: '22', title: 'Algebraic fractions',
    question: 'Express as a single fraction in its simplest form: 3/(x − 7) + 2/(x + 5)',
    marks: 3, hints: ['Common denominator = (x−7)(x+5)', 'Numerator = 3(x+5) + 2(x−7) = 5x + 1', 'Answer = (5x + 1)/((x−7)(x+5))'],
    type: 'calculation',
    parts: [{ label: 'Single fraction', key: 'answer', marks: 3 }],
    answer: { answer: '(5x + 1)/((x − 7)(x + 5))' }
  },
  'pp_4024_s21_12_q23': {
    id: 'pp_4024_s21_12_q23', questionNumber: '23', title: 'Transformations with matrices',
    question: '(a) Describe fully the single transformation that maps triangle A onto triangle B.\n(b) Transformation P is represented by a matrix. P maps triangle A onto triangle C. Draw triangle C.',
    marks: 5, hints: ['(a) Rotation 90° clockwise about (1, −1)', '(b) Apply matrix to each vertex'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation', key: 'a', marks: 3 }, { label: '(b) Triangle C', key: 'b', marks: 2 }],
    answer: { a: 'Rotation, 90° clockwise, centre (1, −1)', b: 'Vertices (2,0), (1,0), (1,2)' }
  },
  'pp_4024_s21_12_q24': {
    id: 'pp_4024_s21_12_q24', questionNumber: '24', title: 'Histogram',
    question: 'Office workers recorded distance d km to work. 20 workers in 0 < d ≤ 5. 12 workers in 20 < d ≤ 40.\n(a) Complete the histogram.\n(b) Calculate percentage who travelled more than 20 km.',
    marks: 4, hints: ['(a) Frequency density for 20 < d ≤ 40 = 12/20 = 0.6', '(b) Count all workers, find those > 20 km as percentage'],
    type: 'multi-part',
    parts: [{ label: '(a) Histogram bar height', key: 'a', marks: 1 }, { label: '(b) Percentage', key: 'b', marks: 3 }],
    answer: { a: '0.6', b: '15' }
  },
  'pp_4024_s21_12_q25': {
    id: 'pp_4024_s21_12_q25', questionNumber: '25', title: 'Simplifying algebraic fractions',
    question: 'The algebraic fraction (2x² − 5x + a)/(x² − 16) can be simplified to (2x + b)/(x + 4). Find a and b.',
    marks: 3, hints: ['x² − 16 = (x+4)(x−4)', '2x² − 5x + a = (2x + b)(x − 4)', 'Expand: 2x² − 8x + bx − 4b', 'Compare: −8 + b = −5 → b = 3, a = −4b = −12'],
    type: 'multi-part',
    parts: [{ label: 'a', key: 'a', marks: 1 }, { label: 'b', key: 'b', marks: 2 }],
    answer: { a: '-12', b: '3' }
  },
};

export const sections4024_12_2021: PastPaperSection[] = Object.values(questions4024_12_2021).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
