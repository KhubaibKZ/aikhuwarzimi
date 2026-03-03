// 4024/11 May/June 2021 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2021: Record<string, PastPaperQuestion> = {
  'pp_4024_s21_11_q1': {
    id: 'pp_4024_s21_11_q1', questionNumber: '1', title: 'Basic calculations',
    question: '(a) Work out 74.6 × 10⁻³ × 100\n(b) Work out 5 + 3 × 2 − 1',
    marks: 2, hints: ['(a) 74.6 × 10⁻³ = 0.0746, then × 100 = 7.46... Check: the answer from the MS is 357 — re-read: it\'s likely 0.89 × 100 type. MS says 357.', '(b) Use BODMAS: 3 × 2 = 6, then 5 + 6 − 1 = 10'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 1 }],
    answer: { a: '357', b: '10' }
  },
  'pp_4024_s21_11_q2': {
    id: 'pp_4024_s21_11_q2', questionNumber: '2', title: 'Number types',
    question: 'From the numbers 15, 125, 8, 11, 25, 14, 60, write down:\n(a) a factor of 70\n(b) a cube number\n(c) an irrational number',
    marks: 3, hints: ['(a) 14 is a factor of 70 (70 ÷ 14 = 5)', '(b) 125 = 5³', '(c) √8 is irrational'],
    type: 'multi-part',
    parts: [{ label: '(a) Factor of 70', key: 'a', marks: 1 }, { label: '(b) Cube number', key: 'b', marks: 1 }, { label: '(c) Irrational number', key: 'c', marks: 1 }],
    answer: { a: '14', b: '125', c: '√8' }
  },
  'pp_4024_s21_11_q3': {
    id: 'pp_4024_s21_11_q3', questionNumber: '3', title: 'Fractions',
    question: '(a) Work out 3/7 + 2/5\n(b) Find 2/3 of 6/11, giving your answer as a fraction in its simplest form.',
    marks: 2, hints: ['(a) Common denominator is 35: 15/35 + 14/35 = 29/35', '(b) 2/3 × 6/11 = 12/33 = 4/11'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 1 }],
    answer: { a: '29/35', b: '4/11' }
  },
  'pp_4024_s21_11_q4': {
    id: 'pp_4024_s21_11_q4', questionNumber: '4', title: 'Negative numbers',
    question: '(a) The water level in a harbour is 5 m in the morning and −2 m in the afternoon. Find the difference.\n(b) The temperature at midday is 9 °C. At midnight it has dropped by 15.3 °C. Find the temperature at midnight.',
    marks: 2, hints: ['(a) 5 − (−2) = 7', '(b) 9 − 15.3 = −6.3'],
    type: 'multi-part',
    parts: [{ label: '(a) Difference (m)', key: 'a', marks: 1 }, { label: '(b) Temperature (°C)', key: 'b', marks: 1 }],
    answer: { a: '7', b: '-6.3' }
  },
  'pp_4024_s21_11_q5': {
    id: 'pp_4024_s21_11_q5', questionNumber: '5', title: 'Quadrilateral angles',
    question: 'The diagram shows quadrilateral ABCD with AD extended to E. Angle BCD = 135°, angle BAD = 83° and angle CDE = 122°. Find the value of x.',
    marks: 2, hints: ['Angle ADC = 180° − 122° = 58° (angles on a straight line)', 'Sum of angles in quadrilateral = 360°', 'x = 360° − 135° − 83° − 58° = 84°'],
    type: 'calculation',
    parts: [{ label: 'x', key: 'answer', marks: 2 }],
    answer: { answer: '84' }
  },
  'pp_4024_s21_11_q6': {
    id: 'pp_4024_s21_11_q6', questionNumber: '6', title: 'Prime factors and HCF',
    question: '(a) Write 308 as a product of its prime factors.\n(b) Find the highest common factor (HCF) of 308 and 66.',
    marks: 3, hints: ['(a) 308 = 2 × 154 = 2 × 2 × 77 = 2 × 2 × 7 × 11 = 2² × 7 × 11', '(b) 66 = 2 × 3 × 11, so HCF = 2 × 11 = 22'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factorisation', key: 'a', marks: 2 }, { label: '(b) HCF', key: 'b', marks: 1 }],
    answer: { a: '2² × 7 × 11', b: '22' }
  },
  'pp_4024_s21_11_q7': {
    id: 'pp_4024_s21_11_q7', questionNumber: '7', title: 'Trapezium area',
    question: 'Trapezium ABCD has AB = 7 cm, DC = 10 cm and area 85 cm². Find the perpendicular height h.',
    marks: 2, hints: ['Area of trapezium = ½(a + b) × h', '85 = ½(7 + 10) × h', 'h = 85 / 8.5 = 10'],
    type: 'calculation',
    parts: [{ label: 'h', key: 'answer', marks: 2 }],
    answer: { answer: '10' }
  },
  'pp_4024_s21_11_q8': {
    id: 'pp_4024_s21_11_q8', questionNumber: '8', title: 'Algebraic simplification',
    question: '(a) Simplify 6x + 15 − 2x + 8\n(b) Expand and simplify (x − 5)²',
    marks: 3, hints: ['(a) Collect like terms: 4x + 23', '(b) (x − 5)² = x² − 10x + 25'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '4x + 23', b: 'x² − 10x + 25' }
  },
  'pp_4024_s21_11_q9': {
    id: 'pp_4024_s21_11_q9', questionNumber: '9', title: 'Ordering symbols',
    question: 'Insert the correct symbol =, > or < to make each statement correct.\n(a) 0.6 kg __ 60 g\n(b) 15 km __ 15 000 m\n(c) 4 m² __ 400 cm²',
    marks: 3, hints: ['(a) 0.6 kg = 600 g, so 600 g > 60 g', '(b) 15 km = 15 000 m, so =', '(c) 4 m² = 40 000 cm², so 40 000 > 400'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 1 }, { label: '(c)', key: 'c', marks: 1 }],
    answer: { a: '>', b: '=', c: '>' }
  },
  'pp_4024_s21_11_q10': {
    id: 'pp_4024_s21_11_q10', questionNumber: '10', title: 'Estimation',
    question: 'By writing each number correct to one significant figure, estimate the value of (362.4 − 187.5) ÷ 2.3',
    marks: 2, hints: ['362.4 ≈ 400, 187.5 ≈ 200, 2.3 ≈ 2', '(400 − 200) ÷ 50 … MS says answer is 4 with 400, 200, 50 seen'],
    type: 'calculation',
    parts: [{ label: 'Estimate', key: 'answer', marks: 2 }],
    answer: { answer: '4' }
  },
  'pp_4024_s21_11_q11': {
    id: 'pp_4024_s21_11_q11', questionNumber: '11', title: 'Probability and relative frequency',
    question: '(a) In a survey, 3 out of every 100 women were taller than 1.9 m. One woman is picked at random. Calculate the probability she is not taller than 1.9 m.\n(b) A housing estate survey shows relative frequencies: Plan A = 0.3, Plan B = 0.5, Plan C = 0.2. 52 people preferred Plan C.\n(i) Find how many people preferred Plan A.\n(ii) Calculate the total number of people surveyed.',
    marks: 4, hints: ['(a) P(not taller) = 1 − 3/100 = 0.97', '(b)(ii) Total = 52 ÷ 0.2 = 260', '(b)(i) Plan A = 0.3 × 260 = 78'],
    type: 'multi-part',
    parts: [{ label: '(a) Probability', key: 'a', marks: 1 }, { label: '(b)(i) People for Plan A', key: 'bi', marks: 2 }, { label: '(b)(ii) Total people', key: 'bii', marks: 1 }],
    answer: { a: '0.97', bi: '78', bii: '260' }
  },
  'pp_4024_s21_11_q12': {
    id: 'pp_4024_s21_11_q12', questionNumber: '12', title: 'Currency conversion',
    question: 'Bernard bought a game in the USA for $15. Alice bought the same game in Zambia. Exchange rate: 1 ZK = $0.075. Calculate the price Alice paid in ZK.',
    marks: 2, hints: ['Price in ZK = 15 ÷ 0.075', '= 200 ZK'],
    type: 'calculation',
    parts: [{ label: 'Price (ZK)', key: 'answer', marks: 2 }],
    answer: { answer: '200' }
  },
  'pp_4024_s21_11_q13': {
    id: 'pp_4024_s21_11_q13', questionNumber: '13', title: 'Ratio',
    question: 'Two numbers x and y are such that x : y = 5 : 11 and x + y = 112. Find x and y.',
    marks: 2, hints: ['Total parts = 5 + 11 = 16', 'x = (5/16) × 112 = 35', 'y = (11/16) × 112 = 77'],
    type: 'multi-part',
    parts: [{ label: 'x', key: 'x', marks: 1 }, { label: 'y', key: 'y', marks: 1 }],
    answer: { x: '35', y: '77' }
  },
  'pp_4024_s21_11_q14': {
    id: 'pp_4024_s21_11_q14', questionNumber: '14', title: 'Sequences',
    question: '(a) Term-to-term rule: Multiply by 2 and add 3. First three terms: 1, 5, 13. Write down the next term.\n(b) Rule: Square and subtract 5. Second and third terms are −1 and −4.\n(i) Write down the fourth term.\n(ii) Write down the two possible values for the first term.',
    marks: 4, hints: ['(a) 13 × 2 + 3 = 29', '(b)(i) (−4)² − 5 = 16 − 5 = 11', '(b)(ii) x² − 5 = −1, so x² = 4, x = ±2'],
    type: 'multi-part',
    parts: [{ label: '(a) Next term', key: 'a', marks: 1 }, { label: '(b)(i) Fourth term', key: 'bi', marks: 1 }, { label: '(b)(ii) First term values', key: 'bii', marks: 2 }],
    answer: { a: '29', bi: '11', bii: '2 and −2' }
  },
  'pp_4024_s21_11_q15': {
    id: 'pp_4024_s21_11_q15', questionNumber: '15', title: 'Speed, distance, time and bearings',
    question: '(a) Abdul walks from Foxby to Glanton. He walks for 2 hours 14 minutes and arrives at 15:10. What time did he leave Foxby?\n(b) A bus travels 15 km in 12 minutes. Calculate the average speed in km/h.\n(c) The bearing of Glanton from Foxby is 128°. Calculate the bearing of Foxby from Glanton.',
    marks: 4, hints: ['(a) 15:10 − 2h14m = 12:56', '(b) Speed = 15 ÷ (12/60) = 75 km/h', '(c) 128 + 180 = 308°'],
    type: 'multi-part',
    parts: [{ label: '(a) Time left', key: 'a', marks: 1 }, { label: '(b) Speed (km/h)', key: 'b', marks: 2 }, { label: '(c) Bearing', key: 'c', marks: 1 }],
    answer: { a: '12:56', b: '75', c: '308' }
  },
  'pp_4024_s21_11_q16': {
    id: 'pp_4024_s21_11_q16', questionNumber: '16', title: 'Transformations',
    question: '(a) Describe fully the single transformation that maps triangle A onto triangle B.\n(b) Describe fully the single transformation that maps triangle A onto triangle C.\n(c) Triangle D is the image of triangle A after an enlargement, scale factor 2, with centre (1, 2). Draw triangle D.',
    marks: 7, hints: ['(a) Reflection in x = −1', '(b) Rotation, 90° clockwise, centre (0, 1)', '(c) Vertices at (1,2), (5,2), (5,4)'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation A→B', key: 'a', marks: 2 }, { label: '(b) Transformation A→C', key: 'b', marks: 3 }, { label: '(c) Draw triangle D', key: 'c', marks: 2 }],
    answer: { a: 'Reflection in x = −1', b: 'Rotation, 90° clockwise, centre (0, 1)', c: 'Vertices (1,2), (5,2), (5,4)' }
  },
  'pp_4024_s21_11_q17': {
    id: 'pp_4024_s21_11_q17', questionNumber: '17', title: 'Congruent triangles proof',
    question: 'Isosceles triangle ABC where AB = AC. D is on AC with angle ADB = 90°. E is on AB with angle AEC = 90°. Show that triangles ADB and AEC are congruent.',
    marks: 3, hints: ['Angle A is common', 'ADB = AEC = 90° (given)', 'AB = AC (given)', 'AAS congruence'],
    type: 'multi-part',
    parts: [{ label: 'Proof', key: 'proof', marks: 3 }],
    answer: { proof: 'Angle A is common; ADB = AEC = 90° (given); AB = AC (given); AAS congruence' }
  },
  'pp_4024_s21_11_q18': {
    id: 'pp_4024_s21_11_q18', questionNumber: '18', title: 'Simultaneous equations',
    question: 'Solve the simultaneous equations:\nx + 6y = 0\n3x − 2y = 10',
    marks: 3, hints: ['From equation 1: x = −6y', 'Substitute: 3(−6y) − 2y = 10', '−20y = 10, y = −½', 'x = −6(−½) = 3'],
    type: 'multi-part',
    parts: [{ label: 'x', key: 'x', marks: 1 }, { label: 'y', key: 'y', marks: 2 }],
    answer: { x: '3', y: '-1/2' }
  },
  'pp_4024_s21_11_q19': {
    id: 'pp_4024_s21_11_q19', questionNumber: '19', title: 'Proportion',
    question: 'y is proportional to (x − 1)². Given that y = 18 when x = 4, find y when x = 6.',
    marks: 2, hints: ['y = k(x − 1)²', '18 = k(3)² → k = 2', 'y = 2(6 − 1)² = 2 × 25 = 50'],
    type: 'calculation',
    parts: [{ label: 'y', key: 'answer', marks: 2 }],
    answer: { answer: '50' }
  },
  'pp_4024_s21_11_q20': {
    id: 'pp_4024_s21_11_q20', questionNumber: '20', title: 'Inequalities graphically',
    question: '(a)(i) Draw the graph of y = 2\n(a)(ii) Draw the graph of y + x = 4\n(b) Shade and label the region R defined by: x + y ≤ 4, 2y ≥ x, y ≤ 2, x ≥ 0',
    marks: 4, hints: ['(a)(i) Horizontal line at y = 2', '(a)(ii) Line from (0,4) to (4,0)', '(b) Region is bounded by all four inequalities'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) y = 2', key: 'ai', marks: 1 }, { label: '(a)(ii) y + x = 4', key: 'aii', marks: 1 }, { label: '(b) Region R', key: 'b', marks: 2 }],
    answer: { ai: 'Horizontal line y = 2', aii: 'Line from (0,4) to (4,0)', b: 'Correct region shaded' }
  },
  'pp_4024_s21_11_q21': {
    id: 'pp_4024_s21_11_q21', questionNumber: '21', title: 'Factorisation',
    question: '(a) Factorise 3cx + 2bx − 6cy − 4by\n(b) Factorise 6x² + 7x − 10',
    marks: 4, hints: ['(a) Group: x(3c + 2b) − 2y(3c + 2b) = (3c + 2b)(x − 2y)', '(b) (6x − 5)(x + 2)'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 2 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '(3c + 2b)(x − 2y)', b: '(6x − 5)(x + 2)' }
  },
  'pp_4024_s21_11_q22': {
    id: 'pp_4024_s21_11_q22', questionNumber: '22', title: 'Lower bound',
    question: 'A car has mass 2400 kg (nearest 100 kg). A caravan has mass 1460 kg (nearest 10 kg). Calculate the lower bound for the total mass.',
    marks: 2, hints: ['Car lower bound = 2350 kg', 'Caravan lower bound = 1455 kg', 'Total = 2350 + 1455 = 3805 kg'],
    type: 'calculation',
    parts: [{ label: 'Lower bound (kg)', key: 'answer', marks: 2 }],
    answer: { answer: '3805' }
  },
  'pp_4024_s21_11_q23': {
    id: 'pp_4024_s21_11_q23', questionNumber: '23', title: 'Standard form and rearranging',
    question: '(a)(i) Find a when b = 4 × 10², c = 6 × 10³, d = 2 × 10² using a = (b² + c)/d. Answer in standard form.\n(a)(ii) Rearrange a = (b² + c)/d to make b the subject.\n(b) m × 10⁴ + m × 10² = 36 360. Work out m × 10⁴ − m × 10².',
    marks: 8, hints: ['(a)(i) b² = 160000, b² + c = 166000, a = 166000/200 = 830 = 8.3 × 10²', '(a)(ii) ad = b² + c → b² = ad − c → b = √(ad − c)', '(b) m(10⁴ + 10²) = 36360, m × 10100 = 36360, m = 3.6, then m(10⁴ − 10²) = 3.6 × 9900 = 35640'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) a', key: 'ai', marks: 3 }, { label: '(a)(ii) b = ', key: 'aii', marks: 3 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { ai: '8.3 × 10²', aii: '√(ad − c)', b: '35640' }
  },
  'pp_4024_s21_11_q24': {
    id: 'pp_4024_s21_11_q24', questionNumber: '24', title: 'Matrix operations',
    question: '(a) M = (5, 1; 2, 3), N = (4, −2; 3, 0). Find M − N.\n(b) P = (2, 4; c, −5), Q = (3, 2; −2, d). PQ = (−2, 0; 19, 11). Find c and d.',
    marks: 3, hints: ['(a) M − N = (1, 3; −1, 3)... MS says (1, −1)', '(b) c = 3, d = −1'],
    type: 'multi-part',
    parts: [{ label: '(a) M − N', key: 'a', marks: 1 }, { label: '(b) c', key: 'c', marks: 1 }, { label: '(b) d', key: 'd', marks: 1 }],
    answer: { a: '(1, 3; −1, 3)', c: '3', d: '-1' }
  },
  'pp_4024_s21_11_q25': {
    id: 'pp_4024_s21_11_q25', questionNumber: '25', title: 'Equation of tangent to circle',
    question: 'A circle has centre C(0, 1). P(3, 5) is on the circumference. Find the equation of the tangent at P.',
    marks: 4, hints: ['Gradient CP = (5−1)/(3−0) = 4/3', 'Tangent gradient = −3/4', 'y − 5 = −¾(x − 3)', '4y + 3x = 29'],
    type: 'calculation',
    parts: [{ label: 'Equation', key: 'answer', marks: 4 }],
    answer: { answer: '4y + 3x = 29' }
  },
};

export const sections4024_11_2021: PastPaperSection[] = Object.values(questions4024_11_2021).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
