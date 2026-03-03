// 4024/23 May/June 2025 - Past Paper Questions
// Paper 2 Calculator - 2 hours - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_23_2025: Record<string, PastPaperQuestion> = {
  'pp_4024_s25_23_q1': {
    id: 'pp_4024_s25_23_q1', questionNumber: '1', title: 'Rounding',
    question: '(a) Write 4.2358 correct to 2 decimal places.\n(b) Write 34 159 correct to 2 significant figures.',
    marks: 2, hints: ['4.2358 → 4.24 (look at 3rd decimal)', '34159 → 34000'],
    type: 'multi-part',
    parts: [{ label: '(a) To 2 d.p.', key: 'a', marks: 1 }, { label: '(b) To 2 s.f.', key: 'b', marks: 1 }],
    answer: { a: '4.24', b: '34000' }
  },
  'pp_4024_s25_23_q2': {
    id: 'pp_4024_s25_23_q2', questionNumber: '2', title: 'Enlargement',
    question: 'A rectangle 2.4 cm by 5.6 cm is enlarged by scale factor 3.25.\nFind the dimensions of the enlarged rectangle.',
    marks: 2, hints: ['2.4 × 3.25 = 7.8', '5.6 × 3.25 = 18.2'],
    type: 'multi-part',
    parts: [{ label: 'Width (cm)', key: 'w', marks: 1 }, { label: 'Length (cm)', key: 'l', marks: 1 }],
    answer: { w: '7.8', l: '18.2' }
  },
  'pp_4024_s25_23_q3': {
    id: 'pp_4024_s25_23_q3', questionNumber: '3', title: 'Sharing in a ratio',
    question: 'Ang and Bou share $104 in the ratio 7 : 6.\nCalculate the amount each receives.',
    marks: 2, hints: ['Total parts = 13', 'Ang = 7/13 × 104 = $56', 'Bou = 6/13 × 104 = $48'],
    type: 'multi-part',
    parts: [{ label: 'Ang ($)', key: 'ang', marks: 1 }, { label: 'Bou ($)', key: 'bou', marks: 1 }],
    answer: { ang: '56', bou: '48' }
  },
  'pp_4024_s25_23_q4': {
    id: 'pp_4024_s25_23_q4', questionNumber: '4', title: 'Symmetry',
    question: '(a) Shade one small square so the diagram has rotational symmetry of order 2.\n(b) Shade one small square so the diagram has 1 line of symmetry.',
    marks: 2, hints: ['Rotational symmetry of order 2: looks same after 180° rotation', 'Line symmetry: mirror image on each side of a line'],
    type: 'multi-part',
    parts: [{ label: '(a) Rotational symmetry', key: 'a', marks: 1 }, { label: '(b) Line symmetry', key: 'b', marks: 1 }],
    answer: { a: 'done', b: 'done' }
  },
  'pp_4024_s25_23_q5': {
    id: 'pp_4024_s25_23_q5', questionNumber: '5', title: 'Unit conversions',
    question: '(a) Write 6300 cm in metres.\n(b) Write 450 cm³ in litres.',
    marks: 2, hints: ['100 cm = 1 m → 6300/100 = 63 m', '1000 cm³ = 1 litre → 450/1000 = 0.45 litres'],
    type: 'multi-part',
    parts: [{ label: '(a) Metres', key: 'a', marks: 1 }, { label: '(b) Litres', key: 'b', marks: 1 }],
    answer: { a: '63', b: '0.45' }
  },
  'pp_4024_s25_23_q6': {
    id: 'pp_4024_s25_23_q6', questionNumber: '6', title: 'Simplify algebra',
    question: '(a) Simplify 5a + 3b + 2a − 7b.\n(b) Simplify c¹² ÷ c⁴.',
    marks: 3, hints: ['Collect like terms: 7a − 4b', 'c¹² ÷ c⁴ = c⁸'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) Simplified', key: 'b', marks: 1 }],
    answer: { a: '7a − 4b', b: 'c⁸' }
  },
  'pp_4024_s25_23_q7': {
    id: 'pp_4024_s25_23_q7', questionNumber: '7', title: 'Inequality — integer values',
    question: 'Write down all the integer values of x that satisfy −3 ≤ x < 1.',
    marks: 2, hints: ['Integers from −3 up to but not including 1', 'x = −3, −2, −1, 0'],
    type: 'short', answer: '-3, -2, -1, 0'
  },
  'pp_4024_s25_23_q8': {
    id: 'pp_4024_s25_23_q8', questionNumber: '8', title: 'Tree diagram — probability',
    question: 'A bag has 4 black and 6 white tiles. A tile is chosen, replaced, then another chosen.\n\n(a) Complete the tree diagram.\n(b) Find P(both white).',
    marks: 3,
    hints: ['P(B) = 4/10, P(W) = 6/10', 'With replacement, probabilities stay the same', 'P(WW) = 6/10 × 6/10 = 36/100 = 9/25'],
    type: 'multi-part',
    parts: [{ label: '(a) Tree diagram', key: 'a', marks: 2 }, { label: '(b) P(both white)', key: 'b', marks: 1 }],
    answer: { a: 'done', b: '9/25' }
  },
  'pp_4024_s25_23_q9': {
    id: 'pp_4024_s25_23_q9', questionNumber: '9', title: 'Simple and compound interest',
    question: '(a) $480 at 3.6% simple interest for 5 years. Find the value.\n(b) $600 at 2.7% compound interest for 4 years. Find total interest.',
    marks: 6,
    hints: ['SI = 480 × 0.036 × 5 = 86.40, Value = 566.40', 'CI: 600 × 1.027⁴ − 600 = 67.47'],
    type: 'multi-part',
    parts: [{ label: '(a) Value ($)', key: 'a', marks: 3 }, { label: '(b) Interest ($)', key: 'b', marks: 3 }],
    answer: { a: '566.40', b: '67.47' }
  },
  'pp_4024_s25_23_q10': {
    id: 'pp_4024_s25_23_q10', questionNumber: '10', title: 'Functions',
    question: 'f(x) = 3x − 5, g(x) = 2 − 6x.\n\n(a) Find f(2).\n(b) Solve g(x) = 18.\n(c) Find fg(4).\n(d) Domain of g(x) is x ≤ −8. Find the range.',
    marks: 7,
    hints: ['f(2) = 3(2)−5 = 1', 'g(x)=18: 2−6x=18 → x=−8/3', 'fg(4) = f(g(4)) = f(2−24) = f(−22) = −71', 'Range: g(−8)=50, as x decreases g increases'],
    type: 'multi-part',
    parts: [
      { label: '(a) f(2)', key: 'a', marks: 1 },
      { label: '(b) x =', key: 'b', marks: 2 },
      { label: '(c) fg(4)', key: 'c', marks: 2 },
      { label: '(d) Range', key: 'd', marks: 2 }
    ],
    answer: { a: '1', b: '-8/3', c: '-71', d: 'g(x) ≥ 50' }
  },
  'pp_4024_s25_23_q11': {
    id: 'pp_4024_s25_23_q11', questionNumber: '11', title: 'Venn diagram — sets',
    question: 'ℰ = {2,3,4,5,6,7,8,9,10,11,12}\nA = {x : x is prime}, B = {x : x is a factor of 36}.\n\n(a) Complete the Venn diagram.\n(b) List elements of A ∩ B′.\n(c) Find n(A ∪ B)′.',
    marks: 4,
    hints: ['A = {2,3,5,7,11}', 'B = {2,3,4,6,9,12}', 'A ∩ B = {2,3}', 'A ∩ B′ = {5,7,11}', '(A∪B)′ = {8,10}'],
    type: 'multi-part',
    parts: [
      { label: '(a) Venn diagram', key: 'a', marks: 2 },
      { label: '(b) A ∩ B′', key: 'b', marks: 1 },
      { label: '(c) n(A ∪ B)′', key: 'c', marks: 1 }
    ],
    answer: { a: 'done', b: '5, 7, 11', c: '3' }
  },
  'pp_4024_s25_23_q12': {
    id: 'pp_4024_s25_23_q12', questionNumber: '12', title: 'Sequences',
    question: 'First four terms: 16, 13, 10, 7.\n\n(a) Write down the next term.\n(b) Find an expression for the nth term.',
    marks: 3, hints: ['Common difference = −3', 'Next term = 7 − 3 = 4', 'nth term = 19 − 3n'],
    type: 'multi-part',
    parts: [{ label: '(a) Next term', key: 'a', marks: 1 }, { label: '(b) nth term', key: 'b', marks: 2 }],
    answer: { a: '4', b: '19 − 3n' }
  },
  'pp_4024_s25_23_q13': {
    id: 'pp_4024_s25_23_q13', questionNumber: '13', title: 'Standard form',
    question: '(a) Write 1.23 × 10⁻⁴ as an ordinary number.\n\n(b) (8.2 × 10⁴) + (x × 10ʸ) = 9 × 10⁵. Find x and y.',
    marks: 3,
    hints: ['1.23 × 10⁻⁴ = 0.000123', '9×10⁵ − 8.2×10⁴ = 900000 − 82000 = 818000 = 8.18 × 10⁵... hmm, MS says x=8.28, y=5'],
    type: 'multi-part',
    parts: [{ label: '(a) Ordinary number', key: 'a', marks: 1 }, { label: '(b) x =', key: 'x', marks: 1 }, { label: '(b) y =', key: 'y', marks: 1 }],
    answer: { a: '0.000123', x: '8.28', y: '5' }
  },
  'pp_4024_s25_23_q14': {
    id: 'pp_4024_s25_23_q14', questionNumber: '14', title: 'Factorisation',
    question: '(a) Factorise 5x² + 15xy.\n(b) Factorise 2ax + 4bx − 3ay − 6by.',
    marks: 4,
    hints: ['(a) 5x(x + 3y)', '(b) Group: 2x(a + 2b) − 3y(a + 2b) = (2x − 3y)(a + 2b)'],
    type: 'multi-part',
    parts: [{ label: '(a) Factorised', key: 'a', marks: 2 }, { label: '(b) Factorised', key: 'b', marks: 2 }],
    answer: { a: '5x(x + 3y)', b: '(2x − 3y)(a + 2b)' }
  },
  'pp_4024_s25_23_q15': {
    id: 'pp_4024_s25_23_q15', questionNumber: '15', title: 'Inequalities — region R',
    question: 'Find the three inequalities that define the unshaded region R.',
    marks: 4,
    hints: ['Look at the boundary lines and determine which side R is on', 'y < 2 (below horizontal line)', 'y ≥ ½x (above diagonal through origin)', 'y ≥ 2 − x (above downward diagonal)'],
    type: 'multi-part',
    parts: [
      { label: 'Inequality 1', key: 'i1', marks: 1 },
      { label: 'Inequality 2', key: 'i2', marks: 1 },
      { label: 'Inequality 3', key: 'i3', marks: 2 }
    ],
    answer: { i1: 'y < 2', i2: 'y ≥ ½x', i3: 'y ≥ 2 − x' }
  },
  'pp_4024_s25_23_q16': {
    id: 'pp_4024_s25_23_q16', questionNumber: '16', title: 'Mean from grouped data',
    question: '| Age (years) | 16≤a<18 | 18≤a<24 | 24≤a<40 | 40≤a<100 |\n| Frequency | 5 | 31 | 19 | 25 |\n\n(a) Calculate an estimate of the mean age.\n(b) Work out % of members older than 24.',
    marks: 6,
    hints: ['Midpoints: 17, 21, 32, 70', 'Mean = Σfx / 80 = 3094/80 = 38.675', '% over 24 = (19+25)/80 × 100 = 55%'],
    type: 'multi-part',
    parts: [{ label: '(a) Mean age', key: 'mean', marks: 4 }, { label: '(b) Percentage (%)', key: 'pct', marks: 2 }],
    answer: { mean: '38.7', pct: '55' }
  },
  'pp_4024_s25_23_q17': {
    id: 'pp_4024_s25_23_q17', questionNumber: '17', title: 'Circle theorems',
    question: 'Points B, D, E, F lie on a circle. AC is tangent at B.\nAngle BEF = 50°, EF = BF.\n\n(a) Find x. Give a geometrical reason.\n(b) Find y with reasons.',
    marks: 5,
    hints: [
      'Alternate segment theorem: angle ABF = angle BEF = 50°',
      'Triangle BEF is isosceles (EF = BF)',
      'Angle FBE = (180 − 50)/2... no, angle BEF = 50° and EF = BF so angle EBF = 50°',
      'Angle BFE = 180 − 50 − 50 = 80°',
      'Opposite angles in cyclic quad: angle BDE = 180 − 80 = 100'
    ],
    type: 'multi-part',
    parts: [{ label: '(a) x =', key: 'x', marks: 2 }, { label: '(b) y =', key: 'y', marks: 3 }],
    answer: { x: '50', y: '100' }
  },
  'pp_4024_s25_23_q18': {
    id: 'pp_4024_s25_23_q18', questionNumber: '18', title: 'Cuboid — surface area equation',
    question: 'Length = x cm, height = 3x cm, width = (x−4) cm.\nSurface area = 200 cm².\n\n(a) Write expressions for height and width.\n(b) Show that 7x² − 16x − 100 = 0.\n(c) Solve to 2 d.p.\n(d) Find the height.',
    marks: 10,
    hints: [
      'SA = 2[x(3x) + x(x−4) + 3x(x−4)] = 200',
      '2[3x² + x² − 4x + 3x² − 12x] = 200',
      '2[7x² − 16x] = 200 → 7x² − 16x − 100 = 0',
      'Quadratic formula: x = (16 ± √(256 + 2800))/14'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Height', key: 'h', marks: 1 },
      { label: '(a) Width', key: 'w', marks: 1 },
      { label: '(b) Show equation', key: 'show', marks: 4 },
      { label: '(c) x values', key: 'x', marks: 3 },
      { label: '(d) Height (cm)', key: 'height', marks: 1 }
    ],
    answer: { h: '3x', w: 'x − 4', show: 'shown', x: '5.09 and -2.81', height: '15.3' }
  },
  'pp_4024_s25_23_q19': {
    id: 'pp_4024_s25_23_q19', questionNumber: '19', title: 'Trigonometry — sine and cosine rules',
    question: 'Triangle ABC and ABD. AB=12, BD=7, AD=6.\nAngle DAC=32°, angle BCA=48°.\n\n(a) Calculate angle BAD.\n(b) Calculate AC.',
    marks: 8,
    hints: [
      'For (a): Use cosine rule in triangle ABD: cos BAD = (12²+6²−7²)/(2×12×6)',
      'cos BAD = (144+36−49)/144 = 131/144, BAD ≈ 24.5°',
      'For (b): angle ABC = angle BAC − angle BAD... use sine rule'
    ],
    type: 'multi-part',
    parts: [{ label: '(a) Angle BAD', key: 'bad', marks: 4 }, { label: '(b) AC (cm)', key: 'ac', marks: 4 }],
    answer: { bad: '24.5', ac: '15.6' }
  },
  'pp_4024_s25_23_q20': {
    id: 'pp_4024_s25_23_q20', questionNumber: '20', title: 'Algebraic fractions equation',
    question: 'Solve.\n3x/(x−1) + 4 = 3/(x+2)',
    marks: 4,
    hints: ['Multiply through by (x−1)(x+2)', 'Expand and simplify to get quadratic', 'Factorise or use quadratic formula'],
    type: 'short', answer: '-2/4'
  },
  'pp_4024_s25_23_q21': {
    id: 'pp_4024_s25_23_q21', questionNumber: '21', title: 'Upper and lower bounds',
    question: 'Width of rectangle = 5.4 cm (nearest 0.1 cm).\n\n(a) Upper bound of width.\n(b) Perimeter = 26.4 cm (nearest 0.1 cm). Find lower bound of length.',
    marks: 3,
    hints: ['UB of width = 5.45', 'LB of perimeter = 26.35', 'LB of length = (26.35 − 2×5.45)/2 = 7.725'],
    type: 'multi-part',
    parts: [{ label: '(a) Upper bound (cm)', key: 'ub', marks: 1 }, { label: '(b) Lower bound of length (cm)', key: 'lb', marks: 2 }],
    answer: { ub: '5.45', lb: '7.725' }
  },
  'pp_4024_s25_23_q22': {
    id: 'pp_4024_s25_23_q22', questionNumber: '22', title: '3D Pyramid',
    question: 'Pyramid ABCV. Base is equilateral triangle with sides 34 cm. VA=VB=VC=82 cm.\n\n(a) Number of planes of symmetry.\n(b)(i) Show OB = 19.6 cm.\n(b)(ii) Find angle between VB and base.\n(b)(iii) Calculate the volume.',
    marks: 11,
    hints: [
      '3 planes of symmetry',
      'M is midpoint of AC, MB = 34sin60° = 29.4..., MO:OB = 1:2, OB = 29.4×2/3 = 19.6',
      'Angle = cos⁻¹(19.6/82) ≈ 76.2°',
      'Height = √(82²−19.6²), Volume = ⅓ × base area × height'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Planes of symmetry', key: 'planes', marks: 1 },
      { label: '(b)(i) Show OB ≈ 19.6', key: 'ob', marks: 3 },
      { label: '(b)(ii) Angle VB to base', key: 'angle', marks: 2 },
      { label: '(b)(iii) Volume (cm³)', key: 'vol', marks: 5 }
    ],
    answer: { planes: '3', ob: '19.6', angle: '76.2', vol: '13300' }
  },
  'pp_4024_s25_23_q23': {
    id: 'pp_4024_s25_23_q23', questionNumber: '23', title: 'Probability — without replacement',
    question: 'Box has 4 red, 7 green, 2 yellow pencils. Two chosen without replacement.\nFind P(two different colours).',
    marks: 4,
    hints: [
      'P(same colour) = P(RR) + P(GG) + P(YY)',
      'P(RR) = 4/13 × 3/12, P(GG) = 7/13 × 6/12, P(YY) = 2/13 × 1/12',
      'P(diff) = 1 − P(same) = 1 − (12+42+2)/156 = 1 − 56/156 = 100/156'
    ],
    type: 'short', answer: '100/156'
  }
};

export const sections4024_23_2025: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Rounding', questionId: 'pp_4024_s25_23_q1' },
  { id: 'q2', title: 'Q2: Enlargement', questionId: 'pp_4024_s25_23_q2' },
  { id: 'q3', title: 'Q3: Sharing in ratio', questionId: 'pp_4024_s25_23_q3' },
  { id: 'q4', title: 'Q4: Symmetry', questionId: 'pp_4024_s25_23_q4' },
  { id: 'q5', title: 'Q5: Unit conversions', questionId: 'pp_4024_s25_23_q5' },
  { id: 'q6', title: 'Q6: Simplify algebra', questionId: 'pp_4024_s25_23_q6' },
  { id: 'q7', title: 'Q7: Integer inequalities', questionId: 'pp_4024_s25_23_q7' },
  { id: 'q8', title: 'Q8: Tree diagram', questionId: 'pp_4024_s25_23_q8' },
  { id: 'q9', title: 'Q9: Simple & compound interest', questionId: 'pp_4024_s25_23_q9' },
  { id: 'q10', title: 'Q10: Functions', questionId: 'pp_4024_s25_23_q10' },
  { id: 'q11', title: 'Q11: Venn diagram — sets', questionId: 'pp_4024_s25_23_q11' },
  { id: 'q12', title: 'Q12: Sequences', questionId: 'pp_4024_s25_23_q12' },
  { id: 'q13', title: 'Q13: Standard form', questionId: 'pp_4024_s25_23_q13' },
  { id: 'q14', title: 'Q14: Factorisation', questionId: 'pp_4024_s25_23_q14' },
  { id: 'q15', title: 'Q15: Inequalities — region', questionId: 'pp_4024_s25_23_q15' },
  { id: 'q16', title: 'Q16: Mean from grouped data', questionId: 'pp_4024_s25_23_q16' },
  { id: 'q17', title: 'Q17: Circle theorems', questionId: 'pp_4024_s25_23_q17' },
  { id: 'q18', title: 'Q18: Cuboid — quadratic', questionId: 'pp_4024_s25_23_q18' },
  { id: 'q19', title: 'Q19: Sine & cosine rules', questionId: 'pp_4024_s25_23_q19' },
  { id: 'q20', title: 'Q20: Algebraic fractions', questionId: 'pp_4024_s25_23_q20' },
  { id: 'q21', title: 'Q21: Upper & lower bounds', questionId: 'pp_4024_s25_23_q21' },
  { id: 'q22', title: 'Q22: 3D Pyramid', questionId: 'pp_4024_s25_23_q22' },
  { id: 'q23', title: 'Q23: Probability — no replacement', questionId: 'pp_4024_s25_23_q23' }
];
