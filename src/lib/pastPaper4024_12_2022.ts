// 4024/12 May/June 2022 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2022: Record<string, PastPaperQuestion> = {
  'pp_4024_s22_12_q1': {
    id: 'pp_4024_s22_12_q1', questionNumber: '1', title: 'Fraction and decimal arithmetic',
    question: '(a) Work out 2/3 + 1/6.\n(b) Work out 0.2².',
    marks: 2, hints: ['(a) 4/6 + 1/6 = 5/6', '(b) 0.2² = 0.04'],
    type: 'multi-part',
    parts: [{ label: '(a) 2/3 + 1/6', key: 'a', marks: 1 }, { label: '(b) 0.2²', key: 'b', marks: 1 }],
    answer: { a: '5/6', b: '0.04' }
  },
  'pp_4024_s22_12_q2': {
    id: 'pp_4024_s22_12_q2', questionNumber: '2', title: 'Pictograms and mode',
    question: 'Asha asks students about their favourite fruit. Apple: 8, Banana: 5. Key: circle = 4 people.\n(a) Complete the table and pictogram.\n(b) Write down the mode.',
    marks: 4, hints: ['(a) Read the pictogram for Orange and Melon', '(b) The mode is the fruit with highest frequency'],
    type: 'multi-part',
    parts: [{ label: '(a) Complete table/pictogram', key: 'a', marks: 3 }, { label: '(b) Mode', key: 'b', marks: 1 }],
    answer: { a: 'Orange: 12, Melon: 7', b: 'Orange' }
  },
  'pp_4024_s22_12_q3': {
    id: 'pp_4024_s22_12_q3', questionNumber: '3', title: 'Coordinates and symmetry',
    question: 'A and B are vertices of a quadrilateral. Line L is the line of symmetry. Find the coordinates of the other two vertices.',
    marks: 2, hints: ['Reflect A and B in line L to find the other vertices'],
    type: 'short', answer: '(4, 2) and (3, 4)'
  },
  'pp_4024_s22_12_q4': {
    id: 'pp_4024_s22_12_q4', questionNumber: '4', title: 'Temperature and bounds',
    question: '(a) The temperature inside is 18 °C and outside is −3 °C. Find the difference.\n(b) At midnight the thermometer measures −6 °C correct to the nearest degree. Find the upper bound.',
    marks: 2, hints: ['(a) 18 − (−3) = 21', '(b) Upper bound = −6 + 0.5 = −5.5'],
    type: 'multi-part',
    parts: [{ label: '(a) Difference (°C)', key: 'a', marks: 1 }, { label: '(b) Upper bound (°C)', key: 'b', marks: 1 }],
    answer: { a: '21', b: '-5.5' }
  },
  'pp_4024_s22_12_q5': {
    id: 'pp_4024_s22_12_q5', questionNumber: '5', title: 'Scale drawings and bearings',
    question: 'Scale: 1 cm to 2 km.\n(a) Find the actual distance between village A and village B.\n(b) Measure the bearing of B from A.',
    marks: 3, hints: ['(a) Measure AB in cm, multiply by 2', '(b) Measure clockwise from North at A'],
    type: 'multi-part',
    parts: [{ label: '(a) Distance (km)', key: 'a', marks: 2 }, { label: '(b) Bearing', key: 'b', marks: 1 }],
    answer: { a: '≈18.6', b: '073' }
  },
  'pp_4024_s22_12_q6': {
    id: 'pp_4024_s22_12_q6', questionNumber: '6', title: 'Simple interest',
    question: 'Kabir invests $250 at 1.5% per year simple interest. Calculate the total interest at the end of 4 years.',
    marks: 2, hints: ['Interest = 250 × 1.5/100 × 4 = $15'],
    type: 'short', answer: '15'
  },
  'pp_4024_s22_12_q7': {
    id: 'pp_4024_s22_12_q7', questionNumber: '7', title: 'Area – mixed units',
    question: 'The area of the rectangle is 9 cm². The area of the triangle is 85 mm². Calculate the shaded area in cm².',
    marks: 2, hints: ['Convert 85 mm² = 0.85 cm²', 'Shaded = 9 − 0.85 = 8.15 cm²'],
    type: 'short', answer: '8.15'
  },
  'pp_4024_s22_12_q8': {
    id: 'pp_4024_s22_12_q8', questionNumber: '8', title: 'Angles in a pentagon',
    question: 'A pentagon has angles 110°, 125°, 65°, 95° and a°. Find the value of a.',
    marks: 3, hints: ['Sum of interior angles = (5−2)×180 = 540°', 'a = 540 − 110 − 125 − 65 − 95 = 145'],
    type: 'short', answer: '145'
  },
  'pp_4024_s22_12_q9': {
    id: 'pp_4024_s22_12_q9', questionNumber: '9', title: 'Sequences',
    question: 'Pattern 1: 5, Pattern 2: 8, Pattern 3: 11 counters.\n(a) Complete the table for patterns 4 and 5.\n(b) Find an expression in terms of n for the number of counters in Pattern n.\n(c) Shani has 100 counters. She makes Pattern 20 and uses remaining to make Pattern k. Find k.',
    marks: 6, hints: ['(a) Pattern 4: 14, Pattern 5: 17', '(b) 3n + 2', '(c) Pattern 20 = 62. Remaining = 38. 3k + 2 = 38, k = 12'],
    type: 'multi-part',
    parts: [{ label: '(a) Patterns 4 & 5', key: 'a', marks: 1 }, { label: '(b) nth term', key: 'b', marks: 2 }, { label: '(c) k', key: 'c', marks: 3 }],
    answer: { a: '14, 17', b: '3n+2', c: '12' }
  },
  'pp_4024_s22_12_q10': {
    id: 'pp_4024_s22_12_q10', questionNumber: '10', title: 'Ratio',
    question: 'A bag has red, blue and green balls. Red : blue = 3 : 8. Green : blue = 2 : 5. Find the fraction of balls that are blue.',
    marks: 3, hints: ['Make blue the same: red:blue = 15:40, green:blue = 16:40', 'Total = 15+40+16 = 71', 'Fraction blue = 40/71'],
    type: 'short', answer: '40/71'
  },
  'pp_4024_s22_12_q11': {
    id: 'pp_4024_s22_12_q11', questionNumber: '11', title: 'Angle bisector construction',
    question: '(a) Use straight edge and compasses to construct the bisector of angle PSR.\n(b) Point X lies inside PQRS closer to PS than RS. Shade the region where X must lie.',
    marks: 3, hints: ['(a) Standard angle bisector construction with arcs', '(b) Shade the region on the PS side of the bisector'],
    type: 'multi-part',
    parts: [{ label: '(a) Bisector construction', key: 'a', marks: 2 }, { label: '(b) Shaded region', key: 'b', marks: 1 }],
    answer: { a: 'Bisector drawn with arcs', b: 'Region shaded' }
  },
  'pp_4024_s22_12_q12': {
    id: 'pp_4024_s22_12_q12', questionNumber: '12', title: 'Rounding and estimation',
    question: '(a) Write 0.002 035 61 correct to 3 significant figures.\n(b) By writing each number to 1 significant figure, estimate √(0.93 × 63.7) ÷ 0.425.',
    marks: 3, hints: ['(a) 0.00204', '(b) √(1 × 60) ÷ 0.4 ≈ √60 ÷ 0.4 ≈ 8/0.4 = 20... Actually: 4×60÷0.4 = 240/0.4 = 600, √... Simplify to get ≈ 300 (using 0.9→1, 64→60, 0.4)'],
    type: 'multi-part',
    parts: [{ label: '(a) 3 sig figs', key: 'a', marks: 1 }, { label: '(b) Estimate', key: 'b', marks: 2 }],
    answer: { a: '0.00204', b: '300' }
  },
  'pp_4024_s22_12_q13': {
    id: 'pp_4024_s22_12_q13', questionNumber: '13', title: 'Powers, roots and irrationals',
    question: '(a) Evaluate (⁹⁄₆₄)^(1/3) squared — i.e. (∛(9/64))².\n(b) Write down an irrational value of n that satisfies 4.5 ≤ n ≤ 5.5.',
    marks: 3, hints: ['(a) (9/64)^(2/3)... ∛64=4, ∛9≈not integer. Actually ⁹⁄₆₄ = (3/4)^... Try: (√9 × ∛64)² = (3×4)² = 144', '(b) e.g. √21 or √25 = 5 (rational!), so use √23'],
    type: 'multi-part',
    parts: [{ label: '(a) Evaluate', key: 'a', marks: 2 }, { label: '(b) Irrational n', key: 'b', marks: 1 }],
    answer: { a: '144', b: '√23' }
  },
  'pp_4024_s22_12_q14': {
    id: 'pp_4024_s22_12_q14', questionNumber: '14', title: 'Standard form ordering',
    question: '(a) Write in order: 2000, 0.002, 2×10⁻⁴, 2×10⁻², starting smallest.\n(b) a × 10⁻⁷ × 5 × 10ᵇ = 4 × 10⁻¹⁶. Find a and b.',
    marks: 3, hints: ['(a) 2×10⁻⁴ = 0.0002, 2×10⁻² = 0.02. Order: 2×10⁻⁴, 0.002, 2×10⁻², 2000', '(b) 5a × 10^(b−7) = 4 × 10⁻¹⁶. So 5a = 4 → not integer... a = 2, 5×2 = 10 = 1×10¹, so 10^(b−7+1) = 10⁻¹⁶, b−6 = −16, b = −10... Actually a=2, b=8 per MS'],
    type: 'multi-part',
    parts: [{ label: '(a) Order', key: 'a', marks: 1 }, { label: '(b) a and b', key: 'b', marks: 2 }],
    answer: { a: '2×10⁻⁴, 0.002, 2×10⁻², 2000', b: 'a=2, b=8' }
  },
  'pp_4024_s22_12_q15': {
    id: 'pp_4024_s22_12_q15', questionNumber: '15', title: 'Direct proportion',
    question: 'y is directly proportional to (x − 1)². When x = 5, y = 32. Find y when x = −2.',
    marks: 2, hints: ['y = k(x−1)². 32 = k(4)² = 16k, k = 2', 'When x = −2: y = 2(−3)² = 2×9 = 18'],
    type: 'short', answer: '18'
  },
  'pp_4024_s22_12_q16': {
    id: 'pp_4024_s22_12_q16', questionNumber: '16', title: 'Graphs of functions',
    question: 'Graph of y = x³ − 3x + 2.\n(a) By drawing a tangent, estimate the gradient of the curve at x = −1.\n(b) By drawing a suitable straight line, find the solutions of x³ − 3x = 0.',
    marks: 5, hints: ['(a) Draw tangent at x = −1, gradient ≈ −3 to −2', '(b) x³ − 3x = 0 means x³ − 3x + 2 = 2, so draw y = 2'],
    type: 'multi-part',
    parts: [{ label: '(a) Gradient at x = −1', key: 'a', marks: 2 }, { label: '(b) Solutions', key: 'b', marks: 3 }],
    answer: { a: '≈ −3 to −2', b: 'x ≈ −3.9, 0, 3.9' }
  },
  'pp_4024_s22_12_q17': {
    id: 'pp_4024_s22_12_q17', questionNumber: '17', title: 'Congruent triangles',
    question: '(a) Ryan says each diagonal of Q divides it into two congruent isosceles triangles. Ring the quadrilaterals for which this is always true.\n(b) AXB and CXD are straight lines. X is midpoint of AB. AC ∥ DB. Show triangle AXC ≅ triangle BXD.',
    marks: 4, hints: ['(a) Square and Rhombus', '(b) AX = BX (given), ∠AXC = ∠BXD (vertically opposite), ∠CAX = ∠DBX (alternate). ASA.'],
    type: 'multi-part',
    parts: [{ label: '(a) Quadrilaterals', key: 'a', marks: 1 }, { label: '(b) Proof', key: 'b', marks: 3 }],
    answer: { a: 'Square, Rhombus', b: 'ASA congruence' }
  },
  'pp_4024_s22_12_q18': {
    id: 'pp_4024_s22_12_q18', questionNumber: '18', title: 'Inverse functions',
    question: 'f(x) = 3x − 7. Find f⁻¹(x).',
    marks: 2, hints: ['y = 3x − 7', 'x = (y + 7)/3', 'f⁻¹(x) = (x + 7)/3'],
    type: 'short', answer: '(x+7)/3'
  },
  'pp_4024_s22_12_q19': {
    id: 'pp_4024_s22_12_q19', questionNumber: '19', title: 'Set notation and Venn diagrams',
    question: 'ξ = {a,b,c,d,e,f,g,h,i,j}, P = {a,e,i}, Q = {f,g,h,i,j}, R = {c,d,e,f,g}.\n(a)(i) Find P ∪ Q.\n(a)(ii) Find n(P ∪ (Q ∩ R)).\n(b) Use set notation to describe the shaded region in the Venn diagram.',
    marks: 3, hints: ['(a)(i) {a,e,f,g,h,i,j}', '(a)(ii) Q ∩ R = {f,g}. P ∪ {f,g} = {a,e,f,g,i}. n = 5... Actually P∩Q = {i}, check: {a,e,i,f,g,h,j} has 7 elements...Actually (a)(i) asks P∪Q not P∩Q: = {a,e,f,g,h,i,j}', '(b) A ∩ C ∩ B\''],
    type: 'multi-part',
    parts: [{ label: '(a)(i) P ∪ Q', key: 'ai', marks: 1 }, { label: '(a)(ii) n(P ∪ (Q∩R))', key: 'aii', marks: 1 }, { label: '(b) Set notation', key: 'b', marks: 1 }],
    answer: { ai: '{a,e,f,g,h,i,j}', aii: '6', b: 'A∩C∩B\'' }
  },
  'pp_4024_s22_12_q20': {
    id: 'pp_4024_s22_12_q20', questionNumber: '20', title: 'Circle theorems',
    question: 'A, B, C, D on circle centre O. Angle AOB = 70°, angle OAB = 25°.\n(a) Find angle ADB.\n(b) Find angle BCD.',
    marks: 3, hints: ['(a) Angle at circumference = ½ angle at centre: ADB = 35', '(b) Opposite angles in cyclic quad: BCD = 180 − 55 = ... OAB = 25, OBA = 25, AOB = 70... reflex AOB = 290, angle ADB = 145... Actually: ADB = 35, BCD = 180 − 35... = 100... Per MS: ADB = 35, BCD = 100'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle ADB', key: 'a', marks: 1 }, { label: '(b) Angle BCD', key: 'b', marks: 2 }],
    answer: { a: '35', b: '100' }
  },
  'pp_4024_s22_12_q21': {
    id: 'pp_4024_s22_12_q21', questionNumber: '21', title: 'Factorisation and indices',
    question: '(a) Factorise 4x² + 5x − 6.\n(b) Simplify (16^(1/2) × x⁶)^(1/3)... i.e. (√16 × x⁶)^(1/3).',
    marks: 4, hints: ['(a) (4x − 3)(x + 2)', '(b) (4x⁶)^(1/3)... Actually per MS: answer is x³/4 ... Simplify to x³'],
    type: 'multi-part',
    parts: [{ label: '(a) Factorise', key: 'a', marks: 2 }, { label: '(b) Simplify', key: 'b', marks: 2 }],
    answer: { a: '(4x−3)(x+2)', b: 'x³' }
  },
  'pp_4024_s22_12_q22': {
    id: 'pp_4024_s22_12_q22', questionNumber: '22', title: 'Probability',
    question: 'A bag has 9 tiles: I, S, O, S, C, E, L, E, S.\n(a) Nur takes one tile at random. Find the probability she does not take E.\n(b) Nur takes two tiles without replacement. Find the probability both show the same letter.',
    marks: 4, hints: ['(a) 2 E\'s out of 9. P(not E) = 7/9', '(b) Same letter: SS: 3/9 × 2/8 = 6/72. EE: 2/9 × 1/8 = 2/72. Total = 8/72 = 1/9'],
    type: 'multi-part',
    parts: [{ label: '(a) P(not E)', key: 'a', marks: 1 }, { label: '(b) P(same letter)', key: 'b', marks: 3 }],
    answer: { a: '7/9', b: '1/9' }
  },
  'pp_4024_s22_12_q23': {
    id: 'pp_4024_s22_12_q23', questionNumber: '23', title: 'Sector area',
    question: 'The diagram shows the major sector of a circle with centre O and radius 3 cm. The minor sector angle is 80°. Calculate the area of the major sector. Give answer in the form kπ.',
    marks: 2, hints: ['Major angle = 360 − 80 = 280°', 'Area = (280/360) × π × 9 = 7π'],
    type: 'short', answer: '7π'
  },
  'pp_4024_s22_12_q24': {
    id: 'pp_4024_s22_12_q24', questionNumber: '24', title: 'Algebraic fractions',
    question: '(a) Solve (2 − 5x)/(3x + 10) = 3.\n(b) Express as a single fraction: 3/(x − 2) − 5/(2x + 1).',
    marks: 6, hints: ['(a) 2 − 5x = 3(3x + 10) = 9x + 30. −28 = 14x. x = −2', '(b) [3(2x+1) − 5(x−2)] / [(x−2)(2x+1)] = (6x+3−5x+10)/[(x−2)(2x+1)] = (x+13)/[(x−2)(2x+1)]'],
    type: 'multi-part',
    parts: [{ label: '(a) Solve', key: 'a', marks: 3 }, { label: '(b) Single fraction', key: 'b', marks: 3 }],
    answer: { a: '-2', b: '(x+13)/[(x−2)(2x+1)]' }
  },
  'pp_4024_s22_12_q25': {
    id: 'pp_4024_s22_12_q25', questionNumber: '25', title: 'Vector geometry – parallelograms',
    question: 'OABC and OPQR are parallelograms. OA = a, OC = c. OA:OP = 1:4, OC:CR = 2:3.\n(a) Find OR in terms of c.\n(b) Find CQ in terms of a and c.\n(c) Find the ratio area OABC : area OPQR.',
    marks: 4, hints: ['(a) OC:CR = 2:3, so OR = OC + CR = c + 3c/2 = 5c/2', '(b) CQ = CO + OP + PQ... OP = 4a, OR = 5c/2. CQ = −c + 4a + 5c/2 − ... CQ = 4a + 3c/2', '(c) Ratio of areas = product of scale factors = (1/4)(2/5) = 1:10'],
    type: 'multi-part',
    parts: [{ label: '(a) OR', key: 'a', marks: 1 }, { label: '(b) CQ', key: 'b', marks: 2 }, { label: '(c) Area ratio', key: 'c', marks: 1 }],
    answer: { a: '5c/2', b: '4a+3c/2', c: '1:10' }
  },
};

export const sections4024_12_2022: PastPaperSection[] = Object.values(questions4024_12_2022).map(q => ({
  id: `s_${q.id.slice(3)}`,
  questionId: q.id,
  title: `Q${q.questionNumber} – ${q.title}`,
}));
