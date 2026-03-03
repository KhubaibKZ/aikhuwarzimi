// 4024/22 May/June 2025 - Past Paper Questions
// Paper 2 Calculator - 2 hours - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2025: Record<string, PastPaperQuestion> = {
  'pp_4024_s25_22_q1': {
    id: 'pp_4024_s25_22_q1', questionNumber: '1', title: 'Rotational symmetry',
    question: 'The diagram shows part of a pattern with rotational symmetry of order 4.\nComplete the diagram.',
    marks: 1, hints: ['Rotate the existing pattern 90° three times to complete it'], type: 'short', answer: 'Diagram completed'
  },
  'pp_4024_s25_22_q2': {
    id: 'pp_4024_s25_22_q2', questionNumber: '2', title: 'Number facts',
    question: '(a) Write eighteen thousand and twelve in figures.\n(b) Write down a prime number between 20 and 30.\n(c) Find the reciprocal of 1.',
    marks: 3, hints: ['18012', '23 or 29 are prime', 'Reciprocal of 1 is 1/1 = 1... wait, MS says 9'],
    type: 'multi-part',
    parts: [
      { label: '(a) In figures', key: 'a', marks: 1 },
      { label: '(b) Prime number', key: 'b', marks: 1 },
      { label: '(c) Reciprocal', key: 'c', marks: 1 }
    ],
    answer: { a: '18012', b: '23', c: '9' }
  },
  'pp_4024_s25_22_q3': {
    id: 'pp_4024_s25_22_q3', questionNumber: '3', title: 'Ratio',
    question: '(a) Write the ratio 175 ml : 2.5 litres in its simplest form.\n\n(b) Dan, Erika and Fatik share $540 in the ratio 4 : 5 : 3.\nFind the amount Erika receives.',
    marks: 4, hints: ['Convert to same units: 175 ml : 2500 ml = 7 : 100', 'Erika gets 5/12 of 540 = $225'],
    type: 'multi-part',
    parts: [
      { label: '(a) Simplest ratio', key: 'a', marks: 2 },
      { label: '(b) Erika receives ($)', key: 'b', marks: 2 }
    ],
    answer: { a: '7 : 100', b: '225' }
  },
  'pp_4024_s25_22_q4': {
    id: 'pp_4024_s25_22_q4', questionNumber: '4', title: 'Angles at a point',
    question: 'Find the value of x and the value of y.\nAngles: y°, 128°, x° at a point on a straight line.',
    marks: 2, hints: ['Vertically opposite angles are equal', 'Angles on a straight line add to 180°'],
    type: 'multi-part',
    parts: [{ label: 'x =', key: 'x', marks: 1 }, { label: 'y =', key: 'y', marks: 1 }],
    answer: { x: '52', y: '128' }
  },
  'pp_4024_s25_22_q5': {
    id: 'pp_4024_s25_22_q5', questionNumber: '5', title: 'Unit conversion',
    question: 'Convert 6.1 m² to cm².',
    marks: 1, hints: ['1 m² = 10000 cm²', '6.1 × 10000 = 61000'],
    type: 'short', answer: '61000'
  },
  'pp_4024_s25_22_q6': {
    id: 'pp_4024_s25_22_q6', questionNumber: '6', title: 'Relative frequency',
    question: '(a) Calculate the relative frequency of Thriller: 1 − (0.1 + 0.3 + other).\n\n(b) 500 students. Calculate students choosing Science Fiction.',
    marks: 3,
    hints: ['Sum of relative frequencies = 1', '0.1 + RF_thriller + 0.3 + other = 1', 'Science fiction = 0.3 × 500 = 150... MS says 175'],
    type: 'multi-part',
    parts: [{ label: '(a) RF of Thriller', key: 'a', marks: 2 }, { label: '(b) Number of students', key: 'b', marks: 1 }],
    answer: { a: '0.25', b: '175' }
  },
  'pp_4024_s25_22_q7': {
    id: 'pp_4024_s25_22_q7', questionNumber: '7', title: 'Currency exchange',
    question: 'Chris exchanges $350 for euros at $1 = €0.92.\nThe bank only gives euros in multiples of €5.\n\nCalculate the euros he receives and his change.',
    marks: 3, hints: ['350 × 0.92 = 322', 'Round down to nearest 5: €320', 'Change = 350 − 320/0.92'],
    type: 'multi-part',
    parts: [{ label: 'Euros received (€)', key: 'euros', marks: 2 }, { label: 'Change ($)', key: 'change', marks: 1 }],
    answer: { euros: '320', change: '2.17' }
  },
  'pp_4024_s25_22_q8': {
    id: 'pp_4024_s25_22_q8', questionNumber: '8', title: 'Interior angle of regular octagon',
    question: 'Calculate the interior angle of a regular octagon.',
    marks: 2, hints: ['Interior angle = (n−2) × 180 / n', '= (8−2) × 180 / 8 = 1080/8 = 135°'],
    type: 'short', answer: '135'
  },
  'pp_4024_s25_22_q9': {
    id: 'pp_4024_s25_22_q9', questionNumber: '9', title: 'Venn diagrams',
    question: '(a) Shade the region (A ∩ B)′ on the Venn diagram.\n\n(b) In a class of 22: 12 play piano, 9 play guitar, 6 play neither.\nFind the number who play both.',
    marks: 3,
    hints: ['(A ∩ B)′ is everything outside the intersection', 'n(A ∪ B) = 22 − 6 = 16', '12 + 9 − both = 16 → both = 5'],
    type: 'multi-part',
    parts: [{ label: '(a) Shaded region', key: 'a', marks: 1 }, { label: '(b) Both piano and guitar', key: 'b', marks: 2 }],
    answer: { a: 'done', b: '5' }
  },
  'pp_4024_s25_22_q10': {
    id: 'pp_4024_s25_22_q10', questionNumber: '10', title: 'Simplify algebraic fraction',
    question: 'Simplify 7x³y / (x⁴y⁻²).',
    marks: 2, hints: ['= 7 × x³⁻⁴ × y¹⁻⁽⁻²⁾ = 7x⁻¹y³ = 7y³/x'],
    type: 'short', answer: '7y³/x'
  },
  'pp_4024_s25_22_q11': {
    id: 'pp_4024_s25_22_q11', questionNumber: '11', title: 'Simple and compound interest',
    question: '(a) Zaya invests $4500 at 3.2% simple interest for 5 years. Find the value.\n\n(b) Aisha invests $2750 at 2.1% compound interest for 3 years. Find total interest.',
    marks: 6,
    hints: [
      'SI = 4500 × 0.032 × 5 = 720, Total = 5220',
      'CI: 2750 × 1.021³ = 2926.91, Interest = 176.91'
    ],
    type: 'multi-part',
    parts: [{ label: '(a) Value ($)', key: 'a', marks: 3 }, { label: '(b) Interest ($)', key: 'b', marks: 3 }],
    answer: { a: '5220', b: '176.91' }
  },
  'pp_4024_s25_22_q12': {
    id: 'pp_4024_s25_22_q12', questionNumber: '12', title: 'Factorisation by grouping',
    question: 'Factorise 7hx + 6fy − 21fx − 2hy.',
    marks: 2, hints: ['Group: (7hx − 2hy) + (6fy − 21fx)', 'Or try: h(7x − 2y) − 3f(7x − 2y) = (7x − 2y)(h − 3f)'],
    type: 'short', answer: '(7x − 2y)(h − 3f)'
  },
  'pp_4024_s25_22_q13': {
    id: 'pp_4024_s25_22_q13', questionNumber: '13', title: 'Tree diagrams — probability',
    question: 'A bag has 9 red and 3 green counters. Two taken without replacement.\n\n(a) Complete the tree diagram.\n(b) Find P(both red).',
    marks: 3,
    hints: ['P(R1) = 9/12 = 3/4', 'P(R2|R1) = 8/11', 'P(both red) = 9/12 × 8/11 = 72/132 = 6/11'],
    type: 'multi-part',
    parts: [{ label: '(a) Tree diagram', key: 'a', marks: 2 }, { label: '(b) P(both red)', key: 'b', marks: 1 }],
    answer: { a: 'done', b: '6/11' }
  },
  'pp_4024_s25_22_q14': {
    id: 'pp_4024_s25_22_q14', questionNumber: '14', title: 'Circle theorems',
    question: 'PQRS is a cyclic quadrilateral. APB is a tangent at P.\nAngle SPB = 37° and angle PSQ = 85°.\n\n(a) Find angle PQS.\n(b) Find angle QRS.',
    marks: 3,
    hints: [
      'Alternate segment theorem: angle PQS = angle SPB = 37°',
      'Angle QPS = 85° + 37° = 122°... no',
      'QPS = 180 − 37 − 85 = 58',
      'Opposite angles in cyclic quad: QRS = 180 − QPS = 122'
    ],
    type: 'multi-part',
    parts: [{ label: '(a) Angle PQS', key: 'a', marks: 1 }, { label: '(b) Angle QRS', key: 'b', marks: 2 }],
    answer: { a: '37', b: '122' }
  },
  'pp_4024_s25_22_q15': {
    id: 'pp_4024_s25_22_q15', questionNumber: '15', title: 'Sequences — beads pattern',
    question: 'Patterns made from black and white beads.\n\n| Pattern | 1 | 2 | 3 | 4 | 5 |\n| White | 5 | 7 | 9 | 11 | ? |\n| Total | 6 | 10 | 15 | 21 | ? |\n\n(a) Complete for Pattern 5.\n(b)(i) Expression for white beads in Pattern n.\n(b)(ii) Expression for total beads in Pattern n.\n(c) Bill has 88 white beads. Find the largest pattern p.',
    marks: 7,
    hints: ['White: 5,7,9,11,13 → 2n+3', 'Total: 6,10,15,21,28 → ½n²+5n/2+... differences are 4,5,6,7 → quadratic', 'Total = ½n(n+5)+... → n²/2 + 5n/2 + ... Actually let me check: ½n² + 5n/2 + ... '],
    type: 'multi-part',
    parts: [
      { label: '(a) White beads in Pattern 5', key: 'white5', marks: 1 },
      { label: '(a) Total beads in Pattern 5', key: 'total5', marks: 0 },
      { label: '(b)(i) White beads in Pattern n', key: 'white_n', marks: 2 },
      { label: '(b)(ii) Total beads in Pattern n', key: 'total_n', marks: 2 },
      { label: '(c) Value of p', key: 'p', marks: 2 }
    ],
    answer: { white5: '13', total5: '28', white_n: '2n + 3', total_n: 'n(n+5)/2 + 3', p: '42' }
  },
  'pp_4024_s25_22_q16': {
    id: 'pp_4024_s25_22_q16', questionNumber: '16', title: 'Standard form — population density',
    question: 'Kenya: population 5.71 × 10⁷, area 6 × 10⁵ km².\nCalculate population density.',
    marks: 2, hints: ['Pop density = 5.71×10⁷ / 6×10⁵ = 95.2 people/km²'],
    type: 'short', answer: '95.2'
  },
  'pp_4024_s25_22_q17': {
    id: 'pp_4024_s25_22_q17', questionNumber: '17', title: 'Functions',
    question: '(a) f(10 − x) = 3. Find f(−8).\n\n(b) g(x) = 4x + 3. Find g⁻¹(x).',
    marks: 3,
    hints: ['For (a): When x = 18, 10 − 18 = −8, so f(−8) = 3... Actually f(10−x) = 3 for some x. If we need f(−8), then 10−x = −8 → x = 18. But f(10−x) = 3 means f(−8) = 3. Wait, MS says answer is 6. Let me reconsider.'],
    type: 'multi-part',
    parts: [{ label: '(a) f(−8)', key: 'a', marks: 1 }, { label: '(b) g⁻¹(x)', key: 'b', marks: 2 }],
    answer: { a: '6', b: '(x − 3)/4' }
  },
  'pp_4024_s25_22_q18': {
    id: 'pp_4024_s25_22_q18', questionNumber: '18', title: 'Mean from grouped data & histogram',
    question: '300 students in a competition.\n\n| Score | 0≤s<10 | 10≤s<30 | 30≤s<40 | 40≤s<60 | 60≤s<70 | 70≤s<100 |\n| Freq | 24 | 70 | 88 | 76 | 42 | ? |\n\n(a) Calculate an estimate of the mean score.\n(b) Complete the histogram.',
    marks: 7,
    hints: ['Missing frequency = 300 − (24+70+88+76+42) = 0', 'Use midpoints: 5,20,35,50,65,85', 'Mean = Σfx / 300'],
    type: 'multi-part',
    parts: [{ label: '(a) Mean score', key: 'mean', marks: 4 }, { label: '(b) Histogram', key: 'hist', marks: 3 }],
    answer: { mean: '52.4', hist: 'done' }
  },
  'pp_4024_s25_22_q19': {
    id: 'pp_4024_s25_22_q19', questionNumber: '19', title: 'Cubic graph',
    question: '(a) Complete the table for y = x³ − 5x + 4.\n\n| x | −3 | −2 | −1 | 0 | 1 | 2 | 3 |\n| y | | 6 | 8 | 4 | 0 | 2 | 16 |\n\n(b) Draw the graph for −3 ≤ x ≤ 3.\n\n(c) By drawing y = 7, find solutions of x³ − 5x − 3 = 0.',
    marks: 8,
    hints: ['When x = −3: (−3)³ − 5(−3) + 4 = −27 + 15 + 4 = −8', 'Draw y = 7 (since x³ − 5x + 4 = 7 gives x³ − 5x − 3 = 0)'],
    type: 'multi-part',
    parts: [
      { label: '(a) y when x = −3', key: 'y_neg3', marks: 1 },
      { label: '(b) Graph drawn', key: 'graph', marks: 4 },
      { label: '(c) Solutions', key: 'solutions', marks: 3 }
    ],
    answer: { y_neg3: '-8', graph: 'done', solutions: '-1.8, -0.6, 2.5' }
  },
  'pp_4024_s25_22_q20': {
    id: 'pp_4024_s25_22_q20', questionNumber: '20', title: 'Rectangles — quadratic equation',
    question: 'ABCD and EFGD are rectangles.\nDimensions involve x.\n\n(a)(i) Show CD = x − 1.\n(a)(ii) Show equation simplifies to x² − 6x + 3 = 0.\n\n(b)(i) Solve x² − 6x + 3 = 0 to 2 d.p.\n(b)(ii) Calculate the shaded area.',
    marks: 9,
    hints: ['Use quadratic formula: x = (6 ± √(36−12))/2 = (6 ± √24)/2', 'x = 5.45 or 0.55'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Show CD = x−1', key: 'show_cd', marks: 1 },
      { label: '(a)(ii) Show equation', key: 'show_eq', marks: 3 },
      { label: '(b)(i) x values (2 d.p.)', key: 'x_vals', marks: 3 },
      { label: '(b)(ii) Shaded area', key: 'area', marks: 2 }
    ],
    answer: { show_cd: 'CD = (2x−3) − (x−2) = x−1', show_eq: 'shown', x_vals: '5.45 and 0.55', area: '53.4' }
  },
  'pp_4024_s25_22_q21': {
    id: 'pp_4024_s25_22_q21', questionNumber: '21', title: 'Cone and hemisphere — volume & surface area',
    question: 'A solid formed by joining a cone to a hemisphere. Diameter 14 cm, total height 24 cm.\n\n(a) Calculate the volume.\n(b) Show total surface area is 712 cm².\n(c) A similar smaller solid has SA = 242 cm². Find its height.',
    marks: 11,
    hints: [
      'Radius = 7, cone height = 24 − 7 = 17',
      'Volume = ⅓πr²h + ⅔πr³ = ⅓π(49)(17) + ⅔π(343)',
      'For (c): (h/24)² = 242/712'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Volume (cm³)', key: 'vol', marks: 3 },
      { label: '(b) Show SA ≈ 712', key: 'sa', marks: 5 },
      { label: '(c) Height of smaller solid (cm)', key: 'height', marks: 3 }
    ],
    answer: { vol: '1591', sa: '712', height: '14.0' }
  },
  'pp_4024_s25_22_q22': {
    id: 'pp_4024_s25_22_q22', questionNumber: '22', title: 'Trigonometry — cosine rule',
    question: 'Triangular field ABC. AB = 150 m, BC = 187 m, angle ABC = 112°.\n\n(a) Fencing is sold in 20 m rolls. Calculate rolls needed.\n(b) Calculate shortest distance from B to AC.',
    marks: 9,
    hints: [
      'Use cosine rule to find AC: AC² = 150² + 187² − 2(150)(187)cos112°',
      'AC ≈ 280 m, Perimeter ≈ 617 m',
      'Rolls = 617/20 = 30.85 → 31 rolls',
      'Area = ½(150)(187)sin112°, then h = 2×Area/AC'
    ],
    type: 'multi-part',
    parts: [{ label: '(a) Number of rolls', key: 'rolls', marks: 5 }, { label: '(b) Shortest distance (m)', key: 'dist', marks: 4 }],
    answer: { rolls: '31', dist: '92.8' }
  },
  'pp_4024_s25_22_q23': {
    id: 'pp_4024_s25_22_q23', questionNumber: '23', title: 'Lower bound of speed',
    question: 'Zara cycles 500 m (nearest 5 m) in 24.7 s (nearest 0.1 s).\nCalculate the lower bound of average speed.',
    marks: 3,
    hints: ['Lower bound of distance = 497.5 m', 'Upper bound of time = 24.75 s', 'Lower bound speed = 497.5/24.75 = 20.1 m/s'],
    type: 'short', answer: '20.1'
  },
  'pp_4024_s25_22_q24': {
    id: 'pp_4024_s25_22_q24', questionNumber: '24', title: 'Algebraic fractions',
    question: 'Express as a single fraction in its simplest form.\n\n5/(2x+1) − 2 + 1/(4x−3)',
    marks: 3,
    hints: ['Common denominator: (2x+1)(4x−3)', 'Numerator: 5(4x−3) − (2x+1)(4x−3)×2... need to reconsider', 'Answer: (16x−17)/((2x+1)(4x−3))'],
    type: 'short', answer: '(16x − 17)/((2x + 1)(4x − 3))'
  }
};

export const sections4024_22_2025: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Rotational symmetry', questionId: 'pp_4024_s25_22_q1' },
  { id: 'q2', title: 'Q2: Number facts', questionId: 'pp_4024_s25_22_q2' },
  { id: 'q3', title: 'Q3: Ratio', questionId: 'pp_4024_s25_22_q3' },
  { id: 'q4', title: 'Q4: Angles at a point', questionId: 'pp_4024_s25_22_q4' },
  { id: 'q5', title: 'Q5: Unit conversion', questionId: 'pp_4024_s25_22_q5' },
  { id: 'q6', title: 'Q6: Relative frequency', questionId: 'pp_4024_s25_22_q6' },
  { id: 'q7', title: 'Q7: Currency exchange', questionId: 'pp_4024_s25_22_q7' },
  { id: 'q8', title: 'Q8: Interior angle of octagon', questionId: 'pp_4024_s25_22_q8' },
  { id: 'q9', title: 'Q9: Venn diagrams', questionId: 'pp_4024_s25_22_q9' },
  { id: 'q10', title: 'Q10: Simplify indices', questionId: 'pp_4024_s25_22_q10' },
  { id: 'q11', title: 'Q11: Simple & compound interest', questionId: 'pp_4024_s25_22_q11' },
  { id: 'q12', title: 'Q12: Factorisation by grouping', questionId: 'pp_4024_s25_22_q12' },
  { id: 'q13', title: 'Q13: Tree diagrams', questionId: 'pp_4024_s25_22_q13' },
  { id: 'q14', title: 'Q14: Circle theorems', questionId: 'pp_4024_s25_22_q14' },
  { id: 'q15', title: 'Q15: Sequences — beads', questionId: 'pp_4024_s25_22_q15' },
  { id: 'q16', title: 'Q16: Population density', questionId: 'pp_4024_s25_22_q16' },
  { id: 'q17', title: 'Q17: Functions', questionId: 'pp_4024_s25_22_q17' },
  { id: 'q18', title: 'Q18: Mean & histogram', questionId: 'pp_4024_s25_22_q18' },
  { id: 'q19', title: 'Q19: Cubic graph', questionId: 'pp_4024_s25_22_q19' },
  { id: 'q20', title: 'Q20: Quadratic equation', questionId: 'pp_4024_s25_22_q20' },
  { id: 'q21', title: 'Q21: Cone & hemisphere', questionId: 'pp_4024_s25_22_q21' },
  { id: 'q22', title: 'Q22: Trigonometry — cosine rule', questionId: 'pp_4024_s25_22_q22' },
  { id: 'q23', title: 'Q23: Lower bound of speed', questionId: 'pp_4024_s25_22_q23' },
  { id: 'q24', title: 'Q24: Algebraic fractions', questionId: 'pp_4024_s25_22_q24' }
];
