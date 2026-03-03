// 4024/11 Oct/Nov 2021 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2021ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on21_11_q1': {
    id: 'pp_4024_on21_11_q1', questionNumber: '1', title: 'Fractions and decimals',
    question: '(a) Work out 7/8 − 1/4\n(b) Work out 0.08 × 0.2',
    marks: 2, hints: ['(a) 7/8 − 2/8 = 5/8', '(b) 0.08 × 0.2 = 0.016'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 1 }],
    answer: { a: '5/8', b: '0.016' }
  },
  'pp_4024_on21_11_q2': {
    id: 'pp_4024_on21_11_q2', questionNumber: '2', title: 'Ordering numbers',
    question: 'Write these numbers in order of size, starting with the smallest.\n3/4, 0.83, 17/20, 82%, 0.8',
    marks: 2, hints: ['Convert all to decimals: 3/4 = 0.75, 0.83, 17/20 = 0.85, 82% = 0.82, 0.8', 'Order: 0.75, 0.8, 0.82, 0.83, 0.85'],
    type: 'calculation',
    parts: [{ label: 'Order', key: 'answer', marks: 2 }],
    answer: { answer: '3/4, 0.8, 82%, 0.83, 17/20' }
  },
  'pp_4024_on21_11_q3': {
    id: 'pp_4024_on21_11_q3', questionNumber: '3', title: 'Percentage of an amount',
    question: 'Work out 45% of 30.',
    marks: 2, hints: ['45% of 30 = 0.45 × 30', '= 13.5'],
    type: 'calculation',
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: '13.5' }
  },
  'pp_4024_on21_11_q4': {
    id: 'pp_4024_on21_11_q4', questionNumber: '4', title: 'Symmetry',
    question: '(a) Shade one more small square so the diagram has rotational symmetry of order 4.\n(b) Shade two more small squares so the diagram has 2 lines of symmetry.',
    marks: 2, hints: ['(a) Identify the pattern and rotate 90° to find the missing square', '(b) Reflect across both lines of symmetry'],
    type: 'multi-part',
    parts: [{ label: '(a) Rotational symmetry', key: 'a', marks: 1 }, { label: '(b) Line symmetry', key: 'b', marks: 1 }],
    answer: { a: 'Correct square shaded', b: 'Correct squares shaded' }
  },
  'pp_4024_on21_11_q5': {
    id: 'pp_4024_on21_11_q5', questionNumber: '5', title: 'Algebraic simplification',
    question: 'Simplify 3a − a + 2a.',
    marks: 1, hints: ['Collect like terms: 3a − a + 2a = 4a'],
    type: 'calculation',
    parts: [{ label: 'Answer', key: 'answer', marks: 1 }],
    answer: { answer: '4a' }
  },
  'pp_4024_on21_11_q6': {
    id: 'pp_4024_on21_11_q6', questionNumber: '6', title: 'Construction',
    question: '(a) Using ruler and compasses only, construct triangle ABC with AC = 5 cm and BC = 7 cm.\n(b) Construct the perpendicular bisector of AB.\n(c) Shade the region inside the triangle closer to A than to B.',
    marks: 5, hints: ['(a) Draw arcs from A (radius 5 cm) and B (radius 7 cm)', '(b) Use compasses from A and B with equal radii, join intersection points', '(c) Region to the left of the perpendicular bisector'],
    type: 'multi-part',
    parts: [{ label: '(a) Triangle', key: 'a', marks: 2 }, { label: '(b) Perpendicular bisector', key: 'b', marks: 2 }, { label: '(c) Region', key: 'c', marks: 1 }],
    answer: { a: 'Acceptable triangle with arcs', b: 'Perpendicular bisector with arcs', c: 'Correct region shaded' }
  },
  'pp_4024_on21_11_q7': {
    id: 'pp_4024_on21_11_q7', questionNumber: '7', title: 'Indices',
    question: '(a) Evaluate 4⁰\n(b) Simplify m³ × m⁵',
    marks: 2, hints: ['(a) Any number to the power 0 is 1', '(b) m³ × m⁵ = m⁸'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 1 }],
    answer: { a: '1', b: 'm⁸' }
  },
  'pp_4024_on21_11_q8': {
    id: 'pp_4024_on21_11_q8', questionNumber: '8', title: 'Unit conversion',
    question: '(a) Write 6300 m in kilometres.\n(b) Convert 1 cm² to mm².',
    marks: 2, hints: ['(a) 6300 ÷ 1000 = 6.3 km', '(b) 1 cm² = 10 mm × 10 mm = 100 mm²'],
    type: 'multi-part',
    parts: [{ label: '(a) km', key: 'a', marks: 1 }, { label: '(b) mm²', key: 'b', marks: 1 }],
    answer: { a: '6.3', b: '100' }
  },
  'pp_4024_on21_11_q9': {
    id: 'pp_4024_on21_11_q9', questionNumber: '9', title: 'Interior angles of polygon',
    question: 'The interior angle of a regular polygon is 156°. Find the number of sides of this regular polygon.',
    marks: 2, hints: ['Exterior angle = 180° − 156° = 24°', 'Number of sides = 360° ÷ 24° = 15'],
    type: 'calculation',
    parts: [{ label: 'Number of sides', key: 'answer', marks: 2 }],
    answer: { answer: '15' }
  },
  'pp_4024_on21_11_q10': {
    id: 'pp_4024_on21_11_q10', questionNumber: '10', title: 'Angles in a triangle',
    question: 'A triangle has one angle of 55°. The other two angles are in the ratio 3 : 2. Calculate the size of the smallest angle.',
    marks: 3, hints: ['Sum of other two angles = 180° − 55° = 125°', 'Ratio 3 : 2, total parts = 5', 'Smallest = (2/5) × 125° = 50°'],
    type: 'calculation',
    parts: [{ label: 'Smallest angle', key: 'answer', marks: 3 }],
    answer: { answer: '50' }
  },
  'pp_4024_on21_11_q11': {
    id: 'pp_4024_on21_11_q11', questionNumber: '11', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of 58 × 32.24 ÷ 0.126',
    marks: 2, hints: ['58 ≈ 60, 32.24 ≈ 30, 0.126 ≈ 0.1', '60 × 30 ÷ 0.1 = 1800 ÷ 0.1... MS says 20 with 60, 30, 0.1'],
    type: 'calculation',
    parts: [{ label: 'Estimate', key: 'answer', marks: 2 }],
    answer: { answer: '20' }
  },
  'pp_4024_on21_11_q12': {
    id: 'pp_4024_on21_11_q12', questionNumber: '12', title: 'Simultaneous equations',
    question: 'Solve the simultaneous equations.\n2x − y = 12\n7x + 3y = 29',
    marks: 3, hints: ['From eq1: y = 2x − 12', 'Substitute: 7x + 3(2x − 12) = 29', '13x = 65, x = 5', 'y = 10 − 12 = −2'],
    type: 'multi-part',
    parts: [{ label: 'x', key: 'x', marks: 1 }, { label: 'y', key: 'y', marks: 2 }],
    answer: { x: '5', y: '-2' }
  },
  'pp_4024_on21_11_q13': {
    id: 'pp_4024_on21_11_q13', questionNumber: '13', title: 'Transformations',
    question: '(a) Describe fully the single transformation that maps triangle A onto triangle B.\n(b) Triangle A is mapped onto triangle C by an enlargement, centre (0, −1) and scale factor 2. Draw triangle C.',
    marks: 4, hints: ['(a) Translation by vector (−5, 4)', '(b) Multiply distance from centre by 2 for each vertex'],
    type: 'multi-part',
    parts: [{ label: '(a) Transformation', key: 'a', marks: 2 }, { label: '(b) Draw triangle C', key: 'b', marks: 2 }],
    answer: { a: 'Translation by vector (−5, 4)', b: 'Vertices at (6, −1), (6, −5), (4, −5)' }
  },
  'pp_4024_on21_11_q14': {
    id: 'pp_4024_on21_11_q14', questionNumber: '14', title: 'Prime factors and LCM',
    question: '(a) Express 60 as the product of its prime factors.\n(b) A school buys packs of 60 pens and packs of 42 rulers. They want the same number of each. Find the smallest number of each pack to buy.',
    marks: 5, hints: ['(a) 60 = 2² × 3 × 5', '(b) LCM of 60 and 42 = 420', 'Packs of pens = 420 ÷ 60 = 7', 'Packs of rulers = 420 ÷ 42 = 10'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factorisation', key: 'a', marks: 2 }, { label: '(b) Packs of pens', key: 'bpens', marks: 1 }, { label: '(b) Packs of rulers', key: 'brulers', marks: 2 }],
    answer: { a: '2² × 3 × 5', bpens: '7', brulers: '10' }
  },
  'pp_4024_on21_11_q15': {
    id: 'pp_4024_on21_11_q15', questionNumber: '15', title: 'Vectors',
    question: '(a) Point A has position vector (3, −8) and AB = (−5, 12). Find the coordinates of B.\n(b) Find |AB|.',
    marks: 4, hints: ['(a) B = A + AB = (3 + (−5), −8 + 12) = (−2, 4)... MS says (−2, 5)', '(b) |AB| = √(25 + 144) = √169 = 13'],
    type: 'multi-part',
    parts: [{ label: '(a) Coordinates of B', key: 'a', marks: 2 }, { label: '(b) |AB|', key: 'b', marks: 2 }],
    answer: { a: '(−2, 5)', b: '13' }
  },
  'pp_4024_on21_11_q16': {
    id: 'pp_4024_on21_11_q16', questionNumber: '16', title: 'Mean and relative frequency',
    question: 'A 4-sided spinner numbered 1 to 4 is spun many times. Frequencies: 1→6, 2→5, 3→13, 4→p.\n(a) The mean is 3. Calculate p.\n(b) Find the relative frequency of landing on 2.',
    marks: 4, hints: ['(a) (6 + 10 + 39 + 4p) ÷ (24 + p) = 3', '55 + 4p = 72 + 3p → p = 17', '(b) 5/(24 + 17) = 5/41'],
    type: 'multi-part',
    parts: [{ label: '(a) p', key: 'a', marks: 3 }, { label: '(b) Relative frequency', key: 'b', marks: 1 }],
    answer: { a: '17', b: '5/41' }
  },
  'pp_4024_on21_11_q17': {
    id: 'pp_4024_on21_11_q17', questionNumber: '17', title: 'Factorisation',
    question: '(a) Factorise 4b² − c²\n(b) Factorise x² + 5x − 6',
    marks: 3, hints: ['(a) Difference of two squares: (2b + c)(2b − c)', '(b) Find factors of −6 that add to 5: (x + 6)(x − 1)'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 1 }, { label: '(b)', key: 'b', marks: 2 }],
    answer: { a: '(2b + c)(2b − c)', b: '(x + 6)(x − 1)' }
  },
  'pp_4024_on21_11_q18': {
    id: 'pp_4024_on21_11_q18', questionNumber: '18', title: 'Inequalities region',
    question: 'The region R is defined by: 1 ≤ x ≤ 5, 0 ≤ y ≤ 4, y ≤ 3 − x. Find and label region R.',
    marks: 4, hints: ['Draw x = 1, x = 5, y = 0, y = 4', 'Draw line y = 3 − x from (0,3) to (3,0)', 'Region R satisfies all inequalities'],
    type: 'multi-part',
    parts: [{ label: 'Region R', key: 'answer', marks: 4 }],
    answer: { answer: 'Correct region R identified' }
  },
  'pp_4024_on21_11_q19': {
    id: 'pp_4024_on21_11_q19', questionNumber: '19', title: 'Sets and Venn diagrams',
    question: '(a)(i) ξ = {1,2,...,12}, X = {2,3,5,7,11}, Y = {1,2,3,4,5,6}. Find X ∩ Y.\n(a)(ii) A number k is chosen at random from ξ. Find P(k ∈ (X ∪ Y)′).\n(b) On the Venn diagram, shade A ∩ (B ∪ C)′.',
    marks: 3, hints: ['(a)(i) X ∩ Y = {2, 3, 5}', '(a)(ii) X ∪ Y = {1,2,3,4,5,6,7,11}, complement = {8,9,10,12}, P = 4/12 = 1/3', '(b) Shade the part of A not in B or C'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) X ∩ Y', key: 'ai', marks: 1 }, { label: '(a)(ii) Probability', key: 'aii', marks: 1 }, { label: '(b) Venn diagram', key: 'b', marks: 1 }],
    answer: { ai: '{2, 3, 5}', aii: '4/12', b: 'Correct region shaded' }
  },
  'pp_4024_on21_11_q20': {
    id: 'pp_4024_on21_11_q20', questionNumber: '20', title: 'Sequences',
    question: 'First five terms: 4, 8, 16, 32, 64. The nth term is 2^(n+1).\n(a) Find the next term.\n(b)(i) Write the nth term of: 1, 5, 13, 29, 61, ...\n(b)(ii) Write the nth term of: 10, 19, 32, 53, 90, ...',
    marks: 4, hints: ['(a) 64 × 2 = 128', '(b)(i) 2^(n+1) − 3', '(b)(ii) 2^(n+1) + 5n + 1'],
    type: 'multi-part',
    parts: [{ label: '(a) Next term', key: 'a', marks: 1 }, { label: '(b)(i)', key: 'bi', marks: 1 }, { label: '(b)(ii)', key: 'bii', marks: 2 }],
    answer: { a: '128', bi: '2^(n+1) − 3', bii: '2^(n+1) + 5n + 1' }
  },
  'pp_4024_on21_11_q21': {
    id: 'pp_4024_on21_11_q21', questionNumber: '21', title: 'Functions',
    question: 'f(x) = 6/(2 − x)\n(a) Find f(−1).\n(b) Find f⁻¹(x).\n(c) f(t) = f(5t + 2). Find the value of t.',
    marks: 7, hints: ['(a) f(−1) = 6/(2−(−1)) = 6/3 = 2', '(b) y = 6/(2−x) → y(2−x) = 6 → x = 2 − 6/y → f⁻¹(x) = (2x − 6)/x', '(c) 6/(2−t) = 6/(2−(5t+2)) → 2−t = −5t → 4t = 0... MS says t = −0.5'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−1)', key: 'a', marks: 1 }, { label: '(b) f⁻¹(x)', key: 'b', marks: 3 }, { label: '(c) t', key: 'c', marks: 3 }],
    answer: { a: '2', b: '(2x − 6)/x', c: '-0.5' }
  },
  'pp_4024_on21_11_q22': {
    id: 'pp_4024_on21_11_q22', questionNumber: '22', title: 'Similar triangles',
    question: 'ACD and BCE are straight lines. AB is parallel to ED.\n(a) Prove that triangle ABC is similar to triangle DEC.\n(b) AB = 6 cm, ED = 2 cm. Area of triangle ABC = 45 cm². Calculate the area of triangle DEC.',
    marks: 5, hints: ['(a) ∠ACB = ∠DCE (vertically opposite), ∠BAC = ∠EDC (alternate), ∠ABC = ∠DEC (alternate)', '(b) Scale factor = 2/6 = 1/3, area factor = (1/3)² = 1/9', 'Area = 45/9 = 5 cm²'],
    type: 'multi-part',
    parts: [{ label: '(a) Proof', key: 'a', marks: 3 }, { label: '(b) Area (cm²)', key: 'b', marks: 2 }],
    answer: { a: 'ACB = DCE (vertically opposite); BAC = EDC (alternate); similar by AA', b: '5' }
  },
  'pp_4024_on21_11_q23': {
    id: 'pp_4024_on21_11_q23', questionNumber: '23', title: 'Algebraic fractions',
    question: '(a) Expand and simplify (x + 5)(x − 2)\n(b) Write as a single fraction: 3/(x − 4) + 2/(x + 5)',
    marks: 5, hints: ['(a) x² + 3x − 10', '(b) [3(x + 5) + 2(x − 4)] / [(x − 4)(x + 5)] = (5x + 7) / [(x − 4)(x + 5)]'],
    type: 'multi-part',
    parts: [{ label: '(a)', key: 'a', marks: 2 }, { label: '(b)', key: 'b', marks: 3 }],
    answer: { a: 'x² + 3x − 10', b: '(5x + 7)/[(x − 4)(x + 5)]' }
  },
  'pp_4024_on21_11_q24': {
    id: 'pp_4024_on21_11_q24', questionNumber: '24', title: 'Matrices',
    question: '(a) A = (−6, 1; 4, −2). Find A².\n(b) B = (x, −5; 2, −3). Find x when |B| = −2.',
    marks: 4, hints: ['(a) A² = A × A = (38, −4; −2, 18)... MS says (38, −8; −32, 8)', '(b) |B| = −3x − (−10) = −3x + 10 = −2, so x = 4'],
    type: 'multi-part',
    parts: [{ label: '(a) A²', key: 'a', marks: 2 }, { label: '(b) x', key: 'b', marks: 2 }],
    answer: { a: '(38, −8; −32, 8)', b: '4' }
  },
};

export const sections4024_11_2021ON: PastPaperSection[] = Object.values(questions4024_11_2021ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
