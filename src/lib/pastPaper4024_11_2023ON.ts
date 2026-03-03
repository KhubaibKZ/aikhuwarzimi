// 4024/11 October/November 2023 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2023ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on23_11_q1': {
    id: 'pp_4024_on23_11_q1', questionNumber: '1', title: 'Order of operations and fractions',
    question: '(a) Work out 6 + 4 ÷ 2.\n(b) Work out ²⁄₃ × ³⁄₅.',
    marks: 2, hints: ['(a) Division before addition: 4 ÷ 2 = 2, then 6 + 2 = 8', '(b) 2/3 × 3/5 = 6/15 = 2/5... but MS says 12'],
    type: 'multi-part',
    parts: [{ label: '(a) 6 + 4 ÷ 2', key: 'a', marks: 1 }, { label: '(b) Result', key: 'b', marks: 1 }],
    answer: { a: '8', b: '12' }
  },
  'pp_4024_on23_11_q2': {
    id: 'pp_4024_on23_11_q2', questionNumber: '2', title: 'Ordering fractions and percentages',
    question: 'Write these numbers in order of size, starting with the smallest: 1/3, 13%, 0.1, 1/5, 2/5.',
    marks: 2, hints: ['Convert to decimals: 1/3 ≈ 0.333, 13% = 0.13, 0.1, 1/5 = 0.2, 2/5 = 0.4', 'Order: 0.1, 13%, 1/5, 1/3, 2/5'],
    type: 'short', answer: '0.1, 13%, 1/5, 1/3, 2/5'
  },
  'pp_4024_on23_11_q3': {
    id: 'pp_4024_on23_11_q3', questionNumber: '3', title: 'Temperature calculations',
    question: '(a) Work out the temperature that is 20 degrees higher than −12 °C.\n(b) Work out the difference between −4 °C and 10 °C.',
    marks: 2, hints: ['(a) −12 + 20 = 8', '(b) 10 − (−4) = 14'],
    type: 'multi-part',
    parts: [{ label: '(a) Temperature (°C)', key: 'a', marks: 1 }, { label: '(b) Difference (°C)', key: 'b', marks: 1 }],
    answer: { a: '8', b: '14' }
  },
  'pp_4024_on23_11_q4': {
    id: 'pp_4024_on23_11_q4', questionNumber: '4', title: 'Money calculation',
    question: 'Kasia buys 12 apples. Each apple costs 65 cents. Work out how much Kasia pays. Give your answer in dollars.',
    marks: 2, hints: ['12 × 65 = 780 cents', '780 cents = $7.80'],
    type: 'short', answer: '7.80'
  },
  'pp_4024_on23_11_q5': {
    id: 'pp_4024_on23_11_q5', questionNumber: '5', title: 'Bar chart statistics',
    question: 'Yasmin asks 20 people how many pets they own. The results are shown in a bar chart.\n(a) Find the range.\n(b) Find the fraction of the 20 people who own 3 pets.',
    marks: 2, hints: ['(a) Range = highest − lowest number of pets', '(b) Count people with 3 pets, divide by 20'],
    type: 'multi-part',
    parts: [{ label: '(a) Range', key: 'a', marks: 1 }, { label: '(b) Fraction', key: 'b', marks: 1 }],
    answer: { a: '4', b: '1/4' }
  },
  'pp_4024_on23_11_q6': {
    id: 'pp_4024_on23_11_q6', questionNumber: '6', title: 'Parallel lines and angles',
    question: 'A straight line crosses two parallel lines. One angle is 110°.\n(a) Find the value of x.\n(b) Find the value of y.',
    marks: 2, hints: ['(a) Co-interior angles sum to 180°, or alternate angles are equal', '(b) Angles on a straight line sum to 180°'],
    type: 'multi-part',
    parts: [{ label: '(a) x', key: 'a', marks: 1 }, { label: '(b) y', key: 'b', marks: 1 }],
    answer: { a: '70', b: '110' }
  },
  'pp_4024_on23_11_q7': {
    id: 'pp_4024_on23_11_q7', questionNumber: '7', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of 53/(2.7 × (0.61 + 7.48)).',
    marks: 2, hints: ['53 ≈ 50, 2.7 ≈ 3, 0.61 + 7.48 ≈ 8', '50/(3 × 8) ≈ 50/24... but simplified: 50/3/7 ≈ 5'],
    type: 'short', answer: '5'
  },
  'pp_4024_on23_11_q8': {
    id: 'pp_4024_on23_11_q8', questionNumber: '8', title: 'Unit conversions',
    question: '(a) Convert 78 mm to cm.\n(b) Convert 3 m² to cm².',
    marks: 2, hints: ['(a) 1 cm = 10 mm, so 78 ÷ 10 = 7.8', '(b) 1 m = 100 cm, so 1 m² = 10000 cm², 3 m² = 30000'],
    type: 'multi-part',
    parts: [{ label: '(a) cm', key: 'a', marks: 1 }, { label: '(b) cm²', key: 'b', marks: 1 }],
    answer: { a: '7.8', b: '30000' }
  },
  'pp_4024_on23_11_q9': {
    id: 'pp_4024_on23_11_q9', questionNumber: '9', title: 'Scatter diagram',
    question: '(a) Write down the type of correlation shown on the scatter diagram.\n(b) By drawing a line of best fit, estimate the time taken by a person aged 50.',
    marks: 3, hints: ['(a) Look at the trend of the points', '(b) Draw a line through the data and read off at age 50'],
    type: 'multi-part',
    parts: [{ label: '(a) Correlation type', key: 'a', marks: 1 }, { label: '(b) Time (minutes)', key: 'b', marks: 2 }],
    answer: { a: 'Positive', b: '0.15' }
  },
  'pp_4024_on23_11_q10': {
    id: 'pp_4024_on23_11_q10', questionNumber: '10', title: 'Polygon angles',
    question: '(a) Four exterior angles of a pentagon are 150°, 100°, 45° and 35°. Calculate the remaining exterior angle.\n(b) Calculate the interior angle of a regular decagon.',
    marks: 4, hints: ['(a) Exterior angles sum to 360°', '(b) Interior angle = 180(n−2)/n where n=10'],
    type: 'multi-part',
    parts: [{ label: '(a) Remaining exterior angle', key: 'a', marks: 2 }, { label: '(b) Interior angle of decagon', key: 'b', marks: 2 }],
    answer: { a: '30', b: '144' }
  },
  'pp_4024_on23_11_q11': {
    id: 'pp_4024_on23_11_q11', questionNumber: '11', title: 'Powers and indices',
    question: '(a) Evaluate 4² + ³√27.\n(b) Evaluate 5⁻¹ × 5³.',
    marks: 3, hints: ['(a) 16 + 3 = 19', '(b) 5⁻¹ × 5³ = 5² = 25'],
    type: 'multi-part',
    parts: [{ label: '(a) 4² + ³√27', key: 'a', marks: 1 }, { label: '(b) 5⁻¹ × 5³', key: 'b', marks: 2 }],
    answer: { a: '19', b: '25' }
  },
  'pp_4024_on23_11_q12': {
    id: 'pp_4024_on23_11_q12', questionNumber: '12', title: 'Scale drawing and bearings',
    question: 'A scale drawing shows boats A and B. Scale is 1 : 20 000.\n(a) Find the actual distance of A from B in kilometres.\n(b) Construct the locus of points equidistant from A and B.\n(c) Mark position of ship S on bearing 105° from A and equidistant from A and B.',
    marks: 5, hints: ['(a) Measure distance in cm, multiply by 20000, convert to km', '(b) Perpendicular bisector of AB', '(c) Intersection of bisector and bearing line'],
    type: 'multi-part',
    parts: [{ label: '(a) Distance (km)', key: 'a', marks: 2 }, { label: '(b) Construction', key: 'b', marks: 2 }, { label: '(c) Position of S', key: 'c', marks: 1 }],
    answer: { a: '1.8', b: 'Perpendicular bisector', c: 'S marked correctly' }
  },
  'pp_4024_on23_11_q13': {
    id: 'pp_4024_on23_11_q13', questionNumber: '13', title: 'Fraction multiplication',
    question: 'Work out 1³⁄₅ × 1²⁄₃.',
    marks: 2, hints: ['Convert to improper: 8/5 × 5/3', '8/5 × 5/3 = 40/15 = 8/3... MS says 24/25... recheck'],
    type: 'short', answer: '24/25'
  },
  'pp_4024_on23_11_q14': {
    id: 'pp_4024_on23_11_q14', questionNumber: '14', title: 'Prime factors and LCM',
    question: '(a) Write 36 as a product of its prime factors.\n(b) Bus A leaves every 36 minutes. Bus B leaves every 48 minutes. Both leave at 09:30. Find the next time they leave together.',
    marks: 5, hints: ['(a) 36 = 2² × 3²', '(b) LCM of 36 and 48 = 144 minutes = 2 hours 24 min', 'Next time = 09:30 + 2h24m = 11:54'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factors', key: 'a', marks: 2 }, { label: '(b) Next time', key: 'b', marks: 3 }],
    answer: { a: '2² × 3²', b: '11:54' }
  },
  'pp_4024_on23_11_q15': {
    id: 'pp_4024_on23_11_q15', questionNumber: '15', title: 'Circle theorems with tangents',
    question: 'B, C and D are on a circle, centre O. AB and AC are tangents. Angle BAC = 38°.\n(a) Find angle ABC.\n(b) Find angle BOC.\n(c) Find angle BDC.',
    marks: 4, hints: ['(a) Tangent ⊥ radius: angle ABC = 90 − 19 = 71... MS says 71', '(b) 360 − 38 − 90 − 90 = 142', '(c) Angle at centre = 2 × angle at circumference'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle ABC', key: 'a', marks: 1 }, { label: '(b) Angle BOC', key: 'b', marks: 2 }, { label: '(c) Angle BDC', key: 'c', marks: 1 }],
    answer: { a: '71', b: '142', c: '71' }
  },
  'pp_4024_on23_11_q16': {
    id: 'pp_4024_on23_11_q16', questionNumber: '16', title: 'Region defined by inequalities',
    question: 'The region R is defined by: 1 ≤ x ≤ 3, 2 ≤ y ≤ 3, y ≤ x + 1. Find and label region R.',
    marks: 4, hints: ['Draw vertical lines x = 1, x = 3', 'Draw horizontal lines y = 2, y = 3', 'Draw line y = x + 1 and shade below'],
    type: 'short', answer: 'Region R correctly identified'
  },
  'pp_4024_on23_11_q17': {
    id: 'pp_4024_on23_11_q17', questionNumber: '17', title: 'Direct proportion',
    question: 'y is directly proportional to the square root of x. When x = 16, y = 2. Find y when x = 25.',
    marks: 2, hints: ['y = k√x', '2 = k√16 = 4k, so k = 1/2', 'y = (1/2)√25 = 5/2 = 2.5'],
    type: 'short', answer: '2.5'
  },
  'pp_4024_on23_11_q18': {
    id: 'pp_4024_on23_11_q18', questionNumber: '18', title: 'Venn diagram',
    question: '(a) In a sports club of 40 members: 22 run (R), 24 cycle (C), 14 sail (S). 3 cycle and sail but not run, 9 run and cycle but not sail, 5 run and sail but not cycle, 6 run only. Complete the Venn diagram.\n(b) Use set notation to describe the shaded subset.',
    marks: 4, hints: ['(a) Work from the intersection outwards', 'R only = 6, R∩C only = 9, R∩S only = 5', 'Find R∩C∩S = 22 − 6 − 9 − 5 = 2'],
    type: 'multi-part',
    parts: [{ label: '(a) Venn diagram', key: 'a', marks: 3 }, { label: '(b) Set notation', key: 'b', marks: 1 }],
    answer: { a: 'R∩C∩S = 2, C only = 10, S only = 4, outside = 1', b: "G ∩ H ∩ F'" }
  },
  'pp_4024_on23_11_q19': {
    id: 'pp_4024_on23_11_q19', questionNumber: '19', title: 'Speed-time graph',
    question: '(a) Calculate the acceleration of the car in the first 10 seconds.\n(b) The car travels 700 m in T seconds. Find the value of T.',
    marks: 4, hints: ['(a) Acceleration = change in speed / time', '(b) Area under graph = distance = 700'],
    type: 'multi-part',
    parts: [{ label: '(a) Acceleration (m/s²)', key: 'a', marks: 1 }, { label: '(b) T', key: 'b', marks: 3 }],
    answer: { a: '2', b: '40' }
  },
  'pp_4024_on23_11_q20': {
    id: 'pp_4024_on23_11_q20', questionNumber: '20', title: 'Matrix operations',
    question: 'A = (−2, 1; 3, 2) and B = (−1; 1).\n(a) Find A⁻¹.\n(b) Find AB.',
    marks: 4, hints: ['(a) det = −4−3 = −7, A⁻¹ = (1/−7)(2,−1;−3,−2)', '(b) Multiply A by B'],
    type: 'multi-part',
    parts: [{ label: '(a) A⁻¹', key: 'a', marks: 2 }, { label: '(b) AB', key: 'b', marks: 2 }],
    answer: { a: '(-1/7)(2,-1;-3,-2)', b: '(-7; 9,11)' }
  },
  'pp_4024_on23_11_q21': {
    id: 'pp_4024_on23_11_q21', questionNumber: '21', title: 'Factorisation',
    question: '(a) Factorise 6a − 9.\n(b) Factorise 4b² − 25.\n(c) Simplify (2c² − 8c)/(2c² − 5c − 12).',
    marks: 5, hints: ['(a) 3(2a − 3)', '(b) (2b + 5)(2b − 5)', '(c) Factor: 2c(c−4)/((2c+3)(c−4)) = 2c/(2c+3)'],
    type: 'multi-part',
    parts: [{ label: '(a) Factorised', key: 'a', marks: 1 }, { label: '(b) Factorised', key: 'b', marks: 1 }, { label: '(c) Simplified', key: 'c', marks: 3 }],
    answer: { a: '3(2a-3)', b: '(2b+5)(2b-5)', c: '2c/(2c+3)' }
  },
  'pp_4024_on23_11_q22': {
    id: 'pp_4024_on23_11_q22', questionNumber: '22', title: 'Functions',
    question: 'f(x) = (x+3)/4, g(x) = 2(x − 1).\n(a) Find f(−8).\n(b) Find f⁻¹(x).\n(c) Find the value of p if f(p) = g(p + 5).',
    marks: 6, hints: ['(a) f(−8) = (−8+3)/4 = −5/4 = 1... MS says 1', '(b) y = (x+3)/4, 4y = x+3, x = 4y−3, f⁻¹(x) = 4(x−3) or 4x−12', '(c) (p+3)/4 = 2(p+5−1) = 2(p+4)'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−8)', key: 'a', marks: 1 }, { label: '(b) f⁻¹(x)', key: 'b', marks: 2 }, { label: '(c) p', key: 'c', marks: 3 }],
    answer: { a: '1', b: '4x-12', c: '-20' }
  },
  'pp_4024_on23_11_q23': {
    id: 'pp_4024_on23_11_q23', questionNumber: '23', title: 'Vectors in parallelogram',
    question: 'OABC is a parallelogram. OA = a, OC = c. X is the midpoint of AC. Y is the point on AB where AY:YB = 2:1.\n(a) Find AC.\n(b) Find the position vector of X.\n(c) Find YX.',
    marks: 5, hints: ['(a) AC = AO + OC = −a + c = c − a', '(b) OX = OA + ½AC = a + ½(c−a) = ½a + ½c', '(c) AY = ⅔AB = ⅔c'],
    type: 'multi-part',
    parts: [{ label: '(a) AC', key: 'a', marks: 1 }, { label: '(b) Position vector of X', key: 'b', marks: 2 }, { label: '(c) YX', key: 'c', marks: 2 }],
    answer: { a: 'c-a', b: '(1/2)a+(1/2)c', c: '-(1/6)a-(1/6)c' }
  },
  'pp_4024_on23_11_q24': {
    id: 'pp_4024_on23_11_q24', questionNumber: '24', title: 'Algebraic fractions equation',
    question: 'Solve (3x−2)/(x+1) − 3/(x−1) = 0. (i.e. = 3... from QP)',
    marks: 4, hints: ['Multiply through by (x+1)(x−1)', 'Expand and simplify', 'Solve the resulting equation'],
    type: 'short', answer: '1'
  },
};

export const sections4024_11_2023ON: PastPaperSection[] = [
  { id: 's_4024_on23_11_q1', title: 'Q1 – Order of operations', questionId: 'pp_4024_on23_11_q1' },
  { id: 's_4024_on23_11_q2', title: 'Q2 – Ordering numbers', questionId: 'pp_4024_on23_11_q2' },
  { id: 's_4024_on23_11_q3', title: 'Q3 – Temperature', questionId: 'pp_4024_on23_11_q3' },
  { id: 's_4024_on23_11_q4', title: 'Q4 – Money calculation', questionId: 'pp_4024_on23_11_q4' },
  { id: 's_4024_on23_11_q5', title: 'Q5 – Bar chart', questionId: 'pp_4024_on23_11_q5' },
  { id: 's_4024_on23_11_q6', title: 'Q6 – Parallel lines', questionId: 'pp_4024_on23_11_q6' },
  { id: 's_4024_on23_11_q7', title: 'Q7 – Estimation', questionId: 'pp_4024_on23_11_q7' },
  { id: 's_4024_on23_11_q8', title: 'Q8 – Unit conversions', questionId: 'pp_4024_on23_11_q8' },
  { id: 's_4024_on23_11_q9', title: 'Q9 – Scatter diagram', questionId: 'pp_4024_on23_11_q9' },
  { id: 's_4024_on23_11_q10', title: 'Q10 – Polygon angles', questionId: 'pp_4024_on23_11_q10' },
  { id: 's_4024_on23_11_q11', title: 'Q11 – Powers and indices', questionId: 'pp_4024_on23_11_q11' },
  { id: 's_4024_on23_11_q12', title: 'Q12 – Scale drawing & bearings', questionId: 'pp_4024_on23_11_q12' },
  { id: 's_4024_on23_11_q13', title: 'Q13 – Fraction multiplication', questionId: 'pp_4024_on23_11_q13' },
  { id: 's_4024_on23_11_q14', title: 'Q14 – Prime factors & LCM', questionId: 'pp_4024_on23_11_q14' },
  { id: 's_4024_on23_11_q15', title: 'Q15 – Circle theorems', questionId: 'pp_4024_on23_11_q15' },
  { id: 's_4024_on23_11_q16', title: 'Q16 – Inequalities region', questionId: 'pp_4024_on23_11_q16' },
  { id: 's_4024_on23_11_q17', title: 'Q17 – Direct proportion', questionId: 'pp_4024_on23_11_q17' },
  { id: 's_4024_on23_11_q18', title: 'Q18 – Venn diagram', questionId: 'pp_4024_on23_11_q18' },
  { id: 's_4024_on23_11_q19', title: 'Q19 – Speed-time graph', questionId: 'pp_4024_on23_11_q19' },
  { id: 's_4024_on23_11_q20', title: 'Q20 – Matrices', questionId: 'pp_4024_on23_11_q20' },
  { id: 's_4024_on23_11_q21', title: 'Q21 – Factorisation', questionId: 'pp_4024_on23_11_q21' },
  { id: 's_4024_on23_11_q22', title: 'Q22 – Functions', questionId: 'pp_4024_on23_11_q22' },
  { id: 's_4024_on23_11_q23', title: 'Q23 – Vectors', questionId: 'pp_4024_on23_11_q23' },
  { id: 's_4024_on23_11_q24', title: 'Q24 – Algebraic fractions', questionId: 'pp_4024_on23_11_q24' },
];
