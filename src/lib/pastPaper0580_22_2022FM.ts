// 0580/22 February/March 2022 - Past Paper Questions
// Paper 2 (Extended) - 1 hour 30 minutes - 70 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions0580_22_2022FM: Record<string, PastPaperQuestion> = {
  // ========== Question 1 - Measure angle ==========
  'pp_0580_fm22_q1': {
    id: 'pp_0580_fm22_q1',
    questionNumber: '1',
    title: 'Measure an angle',
    question: 'Measure the marked angle.',
    marks: 1,
    hints: [
      'Use a protractor to measure the angle',
      'Place the centre of the protractor on the vertex',
      'Read the scale carefully'
    ],
    type: 'short',
    answer: '40'
  },

  // ========== Question 2 - Calculator calculation ==========
  'pp_0580_fm22_q2': {
    id: 'pp_0580_fm22_q2',
    questionNumber: '2',
    title: 'Calculator — roots and powers',
    question: 'Work out √5 × 6².\n\nGive your answer correct to 2 decimal places.',
    marks: 2,
    hints: [
      '6² = 36',
      '√5 ≈ 2.2360...',
      '2.2360... × 36 = 80.498...',
      'Round to 2 decimal places'
    ],
    type: 'short',
    answer: '80.50'
  },

  // ========== Question 3 - Time calculation ==========
  'pp_0580_fm22_q3': {
    id: 'pp_0580_fm22_q3',
    questionNumber: '3',
    title: 'Time calculation',
    question: 'A journey starts at 21:15 one day and ends at 04:33 the next day.\n\nCalculate the time taken, in hours and minutes.',
    marks: 2,
    hints: [
      'From 21:15 to midnight = 2 hours 45 minutes',
      'From midnight to 04:33 = 4 hours 33 minutes',
      'Total = 2h45m + 4h33m = 7h18m'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Hours', key: 'hours', marks: 1 },
      { label: 'Minutes', key: 'minutes', marks: 1 }
    ],
    answer: { hours: '7', minutes: '18' }
  },

  // ========== Question 4 - Surface area of cuboid ==========
  'pp_0580_fm22_q4': {
    id: 'pp_0580_fm22_q4',
    questionNumber: '4',
    title: 'Surface area of cuboid',
    question: 'A cuboid has dimensions 7 cm × 4 cm × 5 cm.\n\nCalculate the total surface area of this cuboid.',
    marks: 3,
    hints: [
      'Surface area = 2(lw + lh + wh)',
      '= 2(7×4 + 7×5 + 4×5)',
      '= 2(28 + 35 + 20) = 2(83) = 166'
    ],
    type: 'calculation',
    parts: [{ label: 'Surface area (cm²)', key: 'answer', marks: 3 }],
    answer: { answer: '166' }
  },

  // ========== Question 5 - Straight line ==========
  'pp_0580_fm22_q5': {
    id: 'pp_0580_fm22_q5',
    questionNumber: '5',
    title: 'Gradient and y-intercept',
    question: '(a) Write down the gradient of the line y = 5x + 7.\n\n(b) Find the coordinates of the point where the line y = 5x + 7 crosses the y-axis.',
    marks: 2,
    hints: [
      'For y = mx + c, the gradient is m',
      'The line crosses the y-axis when x = 0',
      'When x = 0, y = 7, so the point is (0, 7)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Gradient', key: 'gradient', marks: 1 },
      { label: '(b) y-coordinate of crossing', key: 'yIntercept', marks: 1 }
    ],
    answer: { gradient: '5', yIntercept: '7' }
  },

  // ========== Question 6 - Construction ==========
  'pp_0580_fm22_q6': {
    id: 'pp_0580_fm22_q6',
    questionNumber: '6',
    title: 'Construct a triangle',
    question: 'Using a ruler and compasses only, construct a triangle with sides 9.5 cm, 8 cm and 12 cm.\n\nThe side of length 12 cm has been drawn for you. Leave in your construction arcs.',
    marks: 2,
    hints: [
      'Set your compasses to 9.5 cm and draw an arc from one end of the 12 cm line',
      'Set your compasses to 8 cm and draw an arc from the other end',
      'The triangle vertex is where the two arcs intersect'
    ],
    type: 'short',
    answer: 'Construction with arcs shown'
  },

  // ========== Question 7 - Inequality ==========
  'pp_0580_fm22_q7': {
    id: 'pp_0580_fm22_q7',
    questionNumber: '7',
    title: 'Inequality from number line',
    question: 'Write down the inequality, in terms of n, shown by the number line.\n\nThe number line shows an open circle at −1 with an arrow pointing to the right.',
    marks: 1,
    hints: [
      'An open circle means "not equal to" (strict inequality)',
      'Arrow pointing right means n is greater than that value'
    ],
    type: 'short',
    answer: 'n > -1'
  },

  // ========== Question 8 - Transformations ==========
  'pp_0580_fm22_q8': {
    id: 'pp_0580_fm22_q8',
    questionNumber: '8',
    title: 'Transformations',
    question: '(a) Draw the image of triangle A after a reflection in the y-axis.\n(b) Draw the image of triangle A after a translation by a given vector.\n(c) Describe fully the single transformation that maps triangle A onto triangle B.',
    marks: 6,
    hints: [
      'For reflection in y-axis: (x, y) → (−x, y)',
      'For translation: add the vector to each coordinate',
      'For (c): Compare sizes and positions of A and B to identify the transformation'
    ],
    type: 'multi-part',
    parts: [
      { label: '(c) Transformation type', key: 'type', marks: 2 },
      { label: '(c) Scale factor', key: 'scale', marks: 1 },
      { label: '(c) Centre', key: 'centre', marks: 1 }
    ],
    answer: { type: 'Enlargement', scale: '1/2', centre: '(9, -1)' }
  },

  // ========== Question 9 - Factorisation ==========
  'pp_0580_fm22_q9': {
    id: 'pp_0580_fm22_q9',
    questionNumber: '9',
    title: 'Factorise completely',
    question: 'Factorise completely.\n\n12a³ − 21a',
    marks: 2,
    hints: [
      'Find the HCF of 12 and 21 → 3',
      'Both terms have factor a',
      'HCF = 3a',
      '12a³ − 21a = 3a(4a² − 7)'
    ],
    type: 'short',
    answer: '3a(4a² − 7)'
  },

  // ========== Question 10 - Sequences ==========
  'pp_0580_fm22_q10': {
    id: 'pp_0580_fm22_q10',
    questionNumber: '10',
    title: 'Sequences',
    question: '(a) The nth term of a sequence is n² + 7. Find the first three terms of this sequence.\n\n(b) Here are the first four terms of a different sequence: 15, 7, −1, −9. Find the nth term of this sequence.',
    marks: 4,
    hints: [
      'For (a): Substitute n = 1, 2, 3 into n² + 7',
      'n=1: 1+7=8, n=2: 4+7=11, n=3: 9+7=16',
      'For (b): Common difference = 7−15 = −8',
      'nth term = 15 + (n−1)(−8) = 23 − 8n'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) 1st term', key: 'term1', marks: 0 },
      { label: '(a) 2nd term', key: 'term2', marks: 1 },
      { label: '(a) 3rd term', key: 'term3', marks: 1 },
      { label: '(b) nth term expression', key: 'nth', marks: 2 }
    ],
    answer: { term1: '8', term2: '11', term3: '16', nth: '23 - 8n' }
  },

  // ========== Question 11 - Correlation ==========
  'pp_0580_fm22_q11': {
    id: 'pp_0580_fm22_q11',
    questionNumber: '11',
    title: 'Type of correlation',
    question: 'As the temperature increases, people eat more ice cream.\n\nWhat type of correlation does this statement describe?',
    marks: 1,
    hints: [
      'When one variable increases and the other also increases, it is positive correlation'
    ],
    type: 'short',
    answer: 'Positive'
  },

  // ========== Question 12 - Interest ==========
  'pp_0580_fm22_q12': {
    id: 'pp_0580_fm22_q12',
    questionNumber: '12',
    title: 'Simple and compound interest',
    question: '(a) Ali invests $700 at a rate of 2.5% per year simple interest. Calculate the value of his investment at the end of 6 years.\n\n(b) Meera invests $700 in an account paying compound interest at a rate of r% per year. At the end of 17 years the value of her investment is $1030.35. Find the value of r.',
    marks: 6,
    hints: [
      'For (a): Simple interest I = PRT/100 = 700 × 2.5 × 6 / 100 = $105',
      'Total = 700 + 105 = $805',
      'For (b): 1030.35 = 700(1 + r/100)¹⁷',
      'Solve for r: (1030.35/700)^(1/17) − 1 = r/100'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Value after 6 years ($)', key: 'simple', marks: 3 },
      { label: '(b) Rate r (%)', key: 'rate', marks: 3 }
    ],
    answer: { simple: '805', rate: '2.30' }
  },

  // ========== Question 13 - Indices ==========
  'pp_0580_fm22_q13': {
    id: 'pp_0580_fm22_q13',
    questionNumber: '13',
    title: 'Indices',
    question: '(a) Simplify h² × h⁵.\n\n(b) Simplify (1/7)³.\n\n(c) a⁸ ÷ aᵖ = a². Find the value of p.',
    marks: 3,
    hints: [
      'For (a): When multiplying with same base, add indices: h²⁺⁵ = h⁷',
      'For (b): (1/7)³ = 1/7³ = 1/343',
      'For (c): a⁸ ÷ aᵖ = a⁸⁻ᵖ = a², so 8 − p = 2, p = 6'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) h² × h⁵', key: 'partA', marks: 1 },
      { label: '(b) (1/7)³', key: 'partB', marks: 1 },
      { label: '(c) Value of p', key: 'partC', marks: 1 }
    ],
    answer: { partA: 'h⁷', partB: '1/343', partC: '6' }
  },

  // ========== Question 14 - Circumference ==========
  'pp_0580_fm22_q14': {
    id: 'pp_0580_fm22_q14',
    questionNumber: '14',
    title: 'Circumference of circle',
    question: 'A circle has radius 4.7 cm.\n\nCalculate the circumference of the circle.',
    marks: 2,
    hints: [
      'Circumference = 2πr',
      'C = 2 × π × 4.7',
      'C = 29.5 cm (3 s.f.)'
    ],
    type: 'calculation',
    parts: [{ label: 'Circumference (cm)', key: 'answer', marks: 2 }],
    answer: { answer: '29.5' }
  },

  // ========== Question 15 - Fraction without calculator ==========
  'pp_0580_fm22_q15': {
    id: 'pp_0580_fm22_q15',
    questionNumber: '15',
    title: 'Fraction calculation (no calculator)',
    question: 'Without using a calculator, work out 2⅓ × 1⅕.\n\nYou must show all your working and give your answer as a mixed number in its simplest form.',
    marks: 3,
    hints: [
      'Convert to improper fractions: 2⅓ = 7/3, 1⅕ = 6/5',
      'Multiply: 7/3 × 6/5 = 42/15',
      'Simplify: 42/15 = 14/5 = 2⅘'
    ],
    type: 'short',
    answer: '2⅘'
  },

  // ========== Question 16 - Straight line equation ==========
  'pp_0580_fm22_q16': {
    id: 'pp_0580_fm22_q16',
    questionNumber: '16',
    title: 'Equation of line and perpendicular',
    question: 'A is the point (−6, 5) and B is the point (−2, −3).\n\n(a) Find the equation of the straight line l that passes through A and B. Give your answer in the form y = mx + c.\n\n(b) Find the equation of the line that is perpendicular to l and passes through the origin.',
    marks: 4,
    hints: [
      'For (a): m = (5−(−3))/(−6−(−2)) = 8/(−4) = −2',
      'y = −2x + c, substitute (−2, −3): −3 = −2(−2) + c → c = −7',
      'For (b): Perpendicular gradient = 1/2, passes through (0,0) → y = ½x'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Equation of line l', key: 'lineL', marks: 2 },
      { label: '(b) Perpendicular line equation', key: 'perpLine', marks: 2 }
    ],
    answer: { lineL: 'y = -2x - 7', perpLine: 'y = ½x' }
  },

  // ========== Question 17 - Rectangle with sector ==========
  'pp_0580_fm22_q17': {
    id: 'pp_0580_fm22_q17',
    questionNumber: '17',
    title: 'Rectangle with sector — percentage shaded',
    question: 'The diagram shows a rectangle OPQR with length 11 cm and width 4 cm. OQ is a diagonal and OPX is a sector of a circle, centre O.\n\nCalculate the percentage of the rectangle that is shaded.',
    marks: 5,
    hints: [
      'Find angle POQ using tan θ = 4/11',
      'θ = tan⁻¹(4/11) ≈ 20.0°',
      'Area of sector = (θ/360) × π × r² where r = √(11²+4²)',
      'Shaded = Rectangle area − Sector area',
      'Percentage = (Shaded / Rectangle) × 100'
    ],
    type: 'calculation',
    parts: [{ label: 'Percentage shaded (%)', key: 'answer', marks: 5 }],
    answer: { answer: '77.0' }
  },

  // ========== Question 18 - Percentage shaded (alternate) ==========
  'pp_0580_fm22_q18': {
    id: 'pp_0580_fm22_q18',
    questionNumber: '18',
    title: 'Percentage problem',
    question: 'A shop sells a jacket for $63.75.\nThis is a reduction of 15% on the original price.\n\nCalculate the original price.',
    marks: 3,
    hints: [
      'The sale price is 85% of the original price',
      '$63.75 = 0.85 × original',
      'Original = 63.75 ÷ 0.85'
    ],
    type: 'calculation',
    parts: [{ label: 'Original price ($)', key: 'answer', marks: 3 }],
    answer: { answer: '75' }
  },


  // ========== Question 19 - Inverse proportion ==========
  'pp_0580_fm22_q19': {
    id: 'pp_0580_fm22_q19',
    questionNumber: '19',
    title: 'Inverse proportion',
    question: 'y is inversely proportional to the square root of (x + 4).\nWhen x = 5, y = 2.\n\nFind y when x = 77.',
    marks: 3,
    hints: [
      'y = k / √(x + 4)',
      'When x = 5: 2 = k / √9 = k/3, so k = 6',
      'When x = 77: y = 6 / √81 = 6/9 = 2/3'
    ],
    type: 'short',
    answer: '2/3'
  },

  // ========== Question 20 - Simultaneous equations ==========
  'pp_0580_fm22_q20': {
    id: 'pp_0580_fm22_q20',
    questionNumber: '20',
    title: 'Simultaneous equations (linear & quadratic)',
    question: 'Solve the simultaneous equations. You must show all your working.\n\n3x + y = 11\nx² − 2y = 18',
    marks: 5,
    hints: [
      'From equation 1: y = 11 − 3x',
      'Substitute into equation 2: x² − 2(11 − 3x) = 18',
      'x² + 6x − 40 = 0',
      '(x + 10)(x − 4) = 0, so x = −10 or x = 4'
    ],
    type: 'multi-part',
    parts: [
      { label: 'x (first solution)', key: 'x1', marks: 1 },
      { label: 'y (first solution)', key: 'y1', marks: 1 },
      { label: 'x (second solution)', key: 'x2', marks: 1 },
      { label: 'y (second solution)', key: 'y2', marks: 2 }
    ],
    answer: { x1: '4', y1: '-1', x2: '-10', y2: '41' }
  },

  // ========== Question 21 - 3D Trigonometry ==========
  'pp_0580_fm22_q21': {
    id: 'pp_0580_fm22_q21',
    questionNumber: '21',
    title: '3D trigonometry',
    question: 'The diagram shows an open rectangular box ABCDEFGH. AB = 18.6 cm, BC = 9 cm and CG = 14.5 cm. A straight stick AGM rests against A and G and extends outside the box to M.\n\n(a) Calculate the angle between the stick and the base of the box.\n(b) AM = 30 cm. Show that GM = 4.8 cm, correct to 1 decimal place.',
    marks: 7,
    hints: [
      'For (a): First find AC using Pythagoras: AC = √(18.6² + 9²)',
      'Then tan θ = CG/AC = 14.5/AC',
      'For (b): Find AG using sin θ = 14.5/AG',
      'GM = AM − AG = 30 − AG'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Angle (°)', key: 'angle', marks: 4 },
      { label: '(b) AG length (cm)', key: 'ag', marks: 3 }
    ],
    answer: { angle: '35.1', ag: '25.2' }
  },

  // ========== Question 22 - Vectors ==========
  'pp_0580_fm22_q22': {
    id: 'pp_0580_fm22_q22',
    questionNumber: '22',
    title: 'Vectors — trapezium',
    question: 'The diagram shows a trapezium OPQR. O is the origin, OR = a and OP = b.\nRQ = ⅓OP.\n\n(a) Find PQ in terms of a and b in its simplest form.\n(b) When PQ and OR are extended, they intersect at W. Find the position vector of W.',
    marks: 4,
    hints: [
      'For (a): PQ = PO + OR + RQ = −b + a + ⅓b = a − ⅔b',
      'For (b): Use the ratio to find where the lines intersect',
      'OW = λa for some scalar λ',
      'OW = 2.5a'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) PQ in terms of a and b', key: 'pq', marks: 2 },
      { label: '(b) Position vector of W', key: 'ow', marks: 2 }
    ],
    answer: { pq: 'a − ⅔b', ow: '2.5a' }
  }
};

export const sections0580_22_2022FM: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Measure an angle', questionId: 'pp_0580_fm22_q1' },
  { id: 'q2', title: 'Q2: Roots and powers', questionId: 'pp_0580_fm22_q2' },
  { id: 'q3', title: 'Q3: Time calculation', questionId: 'pp_0580_fm22_q3' },
  { id: 'q4', title: 'Q4: Surface area of cuboid', questionId: 'pp_0580_fm22_q4' },
  { id: 'q5', title: 'Q5: Gradient and y-intercept', questionId: 'pp_0580_fm22_q5' },
  { id: 'q6', title: 'Q6: Construct a triangle', questionId: 'pp_0580_fm22_q6' },
  { id: 'q7', title: 'Q7: Inequality', questionId: 'pp_0580_fm22_q7' },
  { id: 'q8', title: 'Q8: Transformations', questionId: 'pp_0580_fm22_q8' },
  { id: 'q9', title: 'Q9: Factorise completely', questionId: 'pp_0580_fm22_q9' },
  { id: 'q10', title: 'Q10: Sequences', questionId: 'pp_0580_fm22_q10' },
  { id: 'q11', title: 'Q11: Correlation', questionId: 'pp_0580_fm22_q11' },
  { id: 'q12', title: 'Q12: Simple and compound interest', questionId: 'pp_0580_fm22_q12' },
  { id: 'q13', title: 'Q13: Indices', questionId: 'pp_0580_fm22_q13' },
  { id: 'q14', title: 'Q14: Circumference', questionId: 'pp_0580_fm22_q14' },
  { id: 'q15', title: 'Q15: Fraction calculation', questionId: 'pp_0580_fm22_q15' },
  { id: 'q16', title: 'Q16: Straight line and perpendicular', questionId: 'pp_0580_fm22_q16' },
  { id: 'q17', title: 'Q17: Rectangle with sector', questionId: 'pp_0580_fm22_q17' },
  { id: 'q18', title: 'Q18: Percentage problem', questionId: 'pp_0580_fm22_q18' },
  { id: 'q19', title: 'Q19: Inverse proportion', questionId: 'pp_0580_fm22_q19' },
  { id: 'q20', title: 'Q20: Simultaneous equations', questionId: 'pp_0580_fm22_q20' },
  { id: 'q21', title: 'Q21: 3D trigonometry', questionId: 'pp_0580_fm22_q21' },
  { id: 'q22', title: 'Q22: Vectors', questionId: 'pp_0580_fm22_q22' },
];
