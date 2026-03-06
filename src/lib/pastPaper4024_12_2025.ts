// 4024/12 May/June 2025 - Past Paper Questions
// Paper 1 Non-calculator - 2 hours - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2025: Record<string, PastPaperQuestion> = {
  // ========== Question 1 ==========
  'pp_4024_s25_12_q1': {
    id: 'pp_4024_s25_12_q1',
    questionNumber: '1',
    title: 'Basic arithmetic',
    question: 'Work out.\n\n(a) 6 − 2 × (−4)\n\n(b) 4²\n\n(c) 2/9 ÷ 5/6',
    marks: 4,
    hints: [
      'For (a): Use BODMAS — do multiplication before subtraction',
      '2 × (−4) = −8, then 6 − (−8) = 6 + 8',
      'For (b): 4² means 4 × 4',
      'For (c): To divide fractions, multiply by the reciprocal: 2/9 × 6/5'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) 6 − 2 × (−4)', key: 'a', marks: 1 },
      { label: '(b) 4²', key: 'b', marks: 1 },
      { label: '(c) 2/9 ÷ 5/6', key: 'c', marks: 2 }
    ],
    fractionDivisionParts: ['c'],
    answer: { a: '14', b: '16', c: '4/15',
      c_s1_n1: '2', c_s1_n2: '6', c_s1_d1: '9', c_s1_d2: '5', c_s1_rn: '12', c_s1_rd: '45',
      c_s2_n1: '12', c_s2_gcd: '3', c_s2_d1: '45', c_s2_gcd2: '3', c_s2_fn: '4', c_s2_fd: '15'
    }
  },

  // ========== Question 2 ==========
  'pp_4024_s25_12_q2': {
    id: 'pp_4024_s25_12_q2',
    questionNumber: '2',
    title: 'Probability from a bag',
    question: 'A bag contains 11 balls.\nThere are 5 blue balls and 4 yellow balls.\nThe rest of the balls are green.\n\nA ball is taken from the bag at random.\n\nFind the probability that the ball is\n(a) yellow\n(b) not blue.',
    marks: 2,
    hints: [
      'There are 11 balls total, 4 are yellow',
      'P(yellow) = number of yellow / total',
      'Not blue means yellow or green. Green = 11 − 5 − 4 = 2',
      'P(not blue) = (4 + 2) / 11'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Number of green balls', key: 'green', marks: 0 },
      { label: '(a) P(yellow)', key: 'a', marks: 1 },
      { label: '(b) P(not blue)', key: 'b', marks: 1 }
    ],
    answer: { green: '2', a: '4/11', b: '6/11' }
  },

  // ========== Question 3 ==========
  'pp_4024_s25_12_q3': {
    id: 'pp_4024_s25_12_q3',
    questionNumber: '3',
    title: 'Net of a cube',
    question: 'The area of one face of a cube is 9 cm².\n\nOn the 1 cm grid, draw an accurate net of the cube.',
    marks: 3,
    hints: [
      'If the area of one face is 9 cm², what is the side length?',
      'Area = side² so side = √9 = 3 cm',
      'A cube net has 6 connected squares, each 3 cm × 3 cm',
      'Draw a cross-shaped net or T-shaped net'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Side length (cm)', key: 'side', marks: 0 },
      { label: 'Number of faces in a net', key: 'faces', marks: 0 },
      { label: 'Net drawn correctly', key: 'answer', marks: 3 }
    ],
    answer: { side: '3', faces: '6', answer: 'done' }
  },

  // ========== Question 4 ==========
  'pp_4024_s25_12_q4': {
    id: 'pp_4024_s25_12_q4',
    questionNumber: '4',
    title: 'Angles in triangles',
    question: 'AEC and BED are straight lines.\nED = EC.\nAngle DCE = 35° and angle ABE = 48°.\n\nFind the value of x.',
    marks: 3,
    hints: [
      'Since ED = EC, triangle DEC is isosceles',
      'Angle DCE = 35°, so angle EDC = 35° (base angles)',
      'Angle DEC = 180° − 35° − 35° = 110°',
      'Angle BEC = 180° − 110° = 70° (angles on a straight line)',
      'In triangle ABE: x + 48 + angle BEA = 180°'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Angle EDC (isosceles)', key: 'edc', marks: 0 },
      { label: 'Angle DEC (triangle sum)', key: 'dec', marks: 0 },
      { label: 'Angle BEC (straight line)', key: 'bec', marks: 0 },
      { label: 'x =', key: 'x', marks: 3 }
    ],
    answer: { edc: '35', dec: '110', bec: '70', x: '22' }
  },

  // ========== Question 5 ==========
  'pp_4024_s25_12_q5': {
    id: 'pp_4024_s25_12_q5',
    questionNumber: '5',
    title: 'Solve a linear equation',
    question: 'Solve.\n\n5(4 − x) = 35',
    marks: 2,
    hints: [
      'Expand: 20 − 5x = 35',
      'Subtract 20 from both sides: −5x = 15',
      'Divide by −5: x = −3'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Expand: constant term', key: 's1_const', marks: 0 },
      { label: 'Expand: coefficient of x', key: 's1_coeff', marks: 0 },
      { label: 'x =', key: 'answer', marks: 2 }
    ],
    answer: { s1_const: '20', s1_coeff: '-5', answer: '-3' }
  },

  // ========== Question 6 ==========
  'pp_4024_s25_12_q6': {
    id: 'pp_4024_s25_12_q6',
    questionNumber: '6',
    title: 'Scale drawing and bearings',
    question: 'The scale drawing shows the positions of two villages, A and B.\nThe scale is 1 cm to 5 km.\n\n(a) Find the actual distance between village A and village B.\n\n(b) Village C is on a bearing of 060° from village A.\nVillage C is on a bearing of 320° from village B.\nFind and label the position of village C on the scale drawing.',
    marks: 4,
    hints: [
      'For (a): Measure the distance AB on the diagram in cm',
      'Then multiply by the scale factor of 5 km/cm',
      'For (b): Draw a line from A at bearing 060°',
      'Draw a line from B at bearing 320°',
      'Where the two lines cross is village C'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Map distance AB (cm)', key: 'map_dist', marks: 0 },
      { label: '(a) Actual distance (km)', key: 'a', marks: 2 },
      { label: '(b) Position of C marked', key: 'b', marks: 2 }
    ],
    answer: { map_dist: '6', a: '30', b: 'C marked correctly' }
  },

  // ========== Question 7 ==========
  'pp_4024_s25_12_q7': {
    id: 'pp_4024_s25_12_q7',
    questionNumber: '7',
    title: 'Evaluate indices',
    question: 'Evaluate.\n\n(a) ∛125\n\n(b) 4⁻²',
    marks: 3,
    hints: [
      'For (a): What number cubed gives 125?',
      '5 × 5 × 5 = 125, so ∛125 = 5',
      'For (b): 4⁻² = 1/4² = 1/16',
      'A negative power means the reciprocal'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) ∛125', key: 'a', marks: 1 },
      { label: '(b) 4² =', key: 'b_sq', marks: 0 },
      { label: '(b) 4⁻²', key: 'b', marks: 2 }
    ],
    answer: { a: '5', b_sq: '16', b: '1/16' }
  },

  // ========== Question 8 ==========
  'pp_4024_s25_12_q8': {
    id: 'pp_4024_s25_12_q8',
    questionNumber: '8',
    title: 'Scatter diagram',
    question: 'Asha records the distance she walks and the time she takes for each of 10 walks.\n\n| Distance (km) | 4.5 | 4.6 | 7.2 | 8.4 | 5.5 | 7.5 | 4.2 | 9.0 | 3.8 | 5.6 |\n| Time (min) | 52 | 60 | 93 | 105 | 65 | 100 | 52 | 116 | 49 | 62 |\n\n(a) Complete the scatter diagram (last 4 points).\n(b) Draw a line of best fit.\n(c) Use your line to estimate the time for a 6.8 km walk.',
    marks: 4,
    hints: [
      'For (a): Plot the last 4 data points on the scatter diagram',
      'For (b): Draw a straight line through the middle of the points',
      'The line should follow the general trend',
      'For (c): Read across from 6.8 km on x-axis to the line, then down to y-axis'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Points plotted', key: 'a', marks: 2 },
      { label: '(b) Line of best fit', key: 'b', marks: 1 },
      { label: '(c) Estimated time (minutes)', key: 'c', marks: 1 }
    ],
    answer: { a: 'done', b: 'done', c: '87' }
  },

  // ========== Question 9 ==========
  'pp_4024_s25_12_q9': {
    id: 'pp_4024_s25_12_q9',
    questionNumber: '9',
    title: 'Estimation',
    question: 'The diagram shows a rectangle.\nDimensions: 87.1 mm by 23.6 mm.\n\nBy writing each number correct to 1 significant figure, find an estimate for the area of the rectangle.',
    marks: 2,
    hints: [
      '87.1 rounded to 1 s.f. = 90',
      '23.6 rounded to 1 s.f. = 20',
      'Estimated area = 90 × 20 = 1800 mm²'
    ],
    type: 'multi-part',
    parts: [
      { label: '87.1 to 1 s.f.', key: 'round1', marks: 0 },
      { label: '23.6 to 1 s.f.', key: 'round2', marks: 0 },
      { label: 'Estimated area (mm²)', key: 'answer', marks: 2 }
    ],
    answer: { round1: '90', round2: '20', answer: '1800' }
  },

  // ========== Question 10 ==========
  'pp_4024_s25_12_q10': {
    id: 'pp_4024_s25_12_q10',
    questionNumber: '10',
    title: 'Prime factorisation',
    question: '(a) Write 228 as a product of its prime factors.\n\n(b) 228² = 51 984\n\nWrite 51 984 as a product of its prime factors.',
    marks: 3,
    hints: [
      'For (a): Start dividing by 2: 228 ÷ 2 = 114, 114 ÷ 2 = 57',
      '57 ÷ 3 = 19, and 19 is prime',
      'So 228 = 2² × 3 × 19',
      'For (b): Since 51984 = 228², square each factor: 2⁴ × 3² × 19²'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) 228 as product of primes', key: 'a', marks: 2 },
      { label: '(b) 51 984 as product of primes', key: 'b', marks: 1 }
    ],
    answer: { a: '2² × 3 × 19', b: '2⁴ × 3² × 19²' }
  },

  // ========== Question 11 ==========
  'pp_4024_s25_12_q11': {
    id: 'pp_4024_s25_12_q11',
    questionNumber: '11',
    title: 'Simultaneous equations',
    question: 'The mass of a small box is x kg. The mass of a large box is y kg.\n\n(a) The total mass of 4 small boxes and 6 large boxes is 30 kg.\nShow that 2x + 3y = 15.\n\n(b) The total mass of 6 small boxes and 1 large box is 13 kg.\nWrite down an equation in terms of x and y.\n\n(c) Solve the simultaneous equations to find the mass of each box.',
    marks: 5,
    hints: [
      'For (a): 4x + 6y = 30, divide by 2 → 2x + 3y = 15',
      'For (b): 6x + y = 13',
      'For (c): From 6x + y = 13, get y = 13 − 6x',
      'Substitute into 2x + 3(13 − 6x) = 15',
      'Solve: 2x + 39 − 18x = 15 → −16x = −24 → x = 1.5'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Equation before simplifying', key: 'a_eq', marks: 0 },
      { label: '(a) Simplified equation', key: 'a', marks: 1 },
      { label: '(b) Second equation', key: 'b', marks: 1 },
      { label: '(c) y in terms of x', key: 'c_y_sub', marks: 0 },
      { label: '(c) x =', key: 'small', marks: 2 },
      { label: '(c) y =', key: 'large', marks: 1 }
    ],
    answer: { a_eq: '4x + 6y = 30', a: '2x + 3y = 15', b: '6x + y = 13', c_y_sub: '13 − 6x', small: '1.5', large: '4' }
  },

  // ========== Question 12 ==========
  'pp_4024_s25_12_q12': {
    id: 'pp_4024_s25_12_q12',
    questionNumber: '12',
    title: 'Transformations',
    question: 'Triangle A and triangle B are drawn on the grid.\n\n(a) Describe fully the single transformation that maps triangle A onto triangle B.\n\n(b) Draw the image of triangle A after a reflection in the line x = −1.\n\n(c) Triangle A is enlarged with scale factor k and centre (0, 0). Triangle C is the image.\nThe coordinates of one vertex of triangle C are (12, 3).\n(i) Find the value of k.\n(ii) Find the coordinates of the other two vertices of triangle C.',
    marks: 8,
    hints: [
      'For (a): Check if it is a rotation, reflection, translation or enlargement',
      'The transformation is a rotation — check the angle, direction and centre',
      'For (b): Reflect each vertex of A in the line x = −1',
      'For (c)(i): Compare the vertex (12, 3) with the corresponding vertex of A',
      'Scale factor k = new coordinate / original coordinate'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Transformation type', key: 'type', marks: 1 },
      { label: '(a) Angle and direction', key: 'angle', marks: 1 },
      { label: '(a) Centre of rotation', key: 'centre', marks: 1 },
      { label: '(b) Reflected triangle vertices', key: 'reflect', marks: 2 },
      { label: '(c)(i) Value of k', key: 'k', marks: 1 },
      { label: '(c)(ii) Other vertices', key: 'vertices', marks: 2 }
    ],
    answer: {
      type: 'Rotation',
      angle: '90° clockwise',
      centre: '(-2, 1)',
      reflect: '(-6,1), (-3,1), (-5,2)',
      k: '3',
      vertices: '(3,3) and (9,6)'
    }
  },

  // ========== Question 13 ==========
  'pp_4024_s25_12_q13': {
    id: 'pp_4024_s25_12_q13',
    questionNumber: '13',
    title: 'Percentage — sale prices',
    question: 'In a sale, a shop reduces all prices by 20%.\n\n(a) A coat costs $85 before the sale.\nWork out the sale price of the coat.\n\n(b) The sale price of a shirt is $40.\nWork out the cost of the shirt before the sale.',
    marks: 4,
    hints: [
      'For (a): Sale price = 80% of $85',
      '0.80 × 85 = 68',
      'For (b): $40 is 80% of the original price',
      'Original = 40 ÷ 0.80 = 50'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) % remaining after discount', key: 'a_pct', marks: 0 },
      { label: '(a) Sale price of coat ($)', key: 'a', marks: 2 },
      { label: '(b) $40 represents what %?', key: 'b_pct', marks: 0 },
      { label: '(b) Original price of shirt ($)', key: 'b', marks: 2 }
    ],
    answer: { a_pct: '80', a: '68', b_pct: '80', b: '50' }
  },

  // ========== Question 14 ==========
  'pp_4024_s25_12_q14': {
    id: 'pp_4024_s25_12_q14',
    questionNumber: '14',
    title: 'Vectors and coordinates',
    question: 'A is the point (−4, 5) and B is the point (6, 1).\nBC = (−3, −4)\n\n(a) Find the column vector AB.\n\n(b) Find the coordinates of point C.\n\n(c) ABCD is a trapezium. AB is parallel to DC and AB = 2DC.\n(i) Find the coordinates of point D.\n(ii) Find the length of line AD. Give your answer as a surd in its simplest form.',
    marks: 9,
    hints: [
      'For (a): AB = B − A = (6−(−4), 1−5) = (10, −4)',
      'For (b): C = B + BC = (6+(−3), 1+(−4)) = (3, −3)',
      'For (c)(i): DC = ½AB = (5, −2), so D = C − DC',
      'For (c)(ii): AD = √((xD−xA)² + (yD−yA)²)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) AB x-component', key: 'ab_x', marks: 0 },
      { label: '(a) AB y-component', key: 'ab_y', marks: 0 },
      { label: '(a) AB column vector', key: 'ab', marks: 2 },
      { label: '(b) Coordinates of C', key: 'c', marks: 2 },
      { label: '(c)(i) DC column vector', key: 'dc', marks: 0 },
      { label: '(c)(i) Coordinates of D', key: 'd', marks: 2 },
      { label: '(c)(ii) AD² value', key: 'ad_sq', marks: 0 },
      { label: '(c)(ii) Length AD (surd form)', key: 'ad', marks: 3 }
    ],
    answer: { ab_x: '10', ab_y: '-4', ab: '(10, -4)', c: '(3, -3)', dc: '(5, -2)', d: '(-2, -1)', ad_sq: '40', ad: '2√10' }
  },

  // ========== Question 15 ==========
  'pp_4024_s25_12_q15': {
    id: 'pp_4024_s25_12_q15',
    questionNumber: '15',
    title: 'Surds',
    question: '(a) Simplify √175 − √28\n\n(b) Rationalise the denominator: 1/√5',
    marks: 3,
    hints: [
      'For (a): √175 = √(25×7) = 5√7',
      '√28 = √(4×7) = 2√7',
      '5√7 − 2√7 = 3√7',
      'For (b): Multiply top and bottom by √5: √5/5'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) √175 simplified', key: 'a_s1', marks: 0 },
      { label: '(a) √28 simplified', key: 'a_s2', marks: 0 },
      { label: '(a) √175 − √28', key: 'a', marks: 2 },
      { label: '(b) Multiply by', key: 'b_mult', marks: 0 },
      { label: '(b) Rationalised form', key: 'b', marks: 1 }
    ],
    answer: { a_s1: '5√7', a_s2: '2√7', a: '3√7', b_mult: '√5', b: '√5/5' }
  },

  // ========== Question 16 ==========
  'pp_4024_s25_12_q16': {
    id: 'pp_4024_s25_12_q16',
    questionNumber: '16',
    title: 'Cumulative frequency',
    question: 'A group of 80 people each record their journey time from home to work one day. The cumulative frequency diagram shows the results.\n\n(a) Use the diagram to find an estimate of:\n(i) the median\n(ii) the interquartile range\n(iii) the number of people who had a journey time of 40 minutes or more.\n\n(b) The journey times from work to home have median 35 min and IQR 15 min.\nJay says the journey times from home to work are more consistent.\nIs Jay correct? Explain.',
    marks: 6,
    hints: [
      'For median: Read at cumulative frequency = 40 (half of 80)',
      'For IQR: Q1 at CF=20, Q3 at CF=60, IQR = Q3 − Q1',
      'For (iii): Read CF at 40 minutes, subtract from 80',
      'For (b): Lower IQR means more consistent'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) CF for median', key: 'cf_med', marks: 0 },
      { label: '(a)(i) Median (minutes)', key: 'median', marks: 1 },
      { label: '(a)(ii) Q1 (minutes)', key: 'q1', marks: 0 },
      { label: '(a)(ii) Q3 (minutes)', key: 'q3', marks: 0 },
      { label: '(a)(ii) IQR (minutes)', key: 'iqr', marks: 2 },
      { label: '(a)(iii) CF at 40 min', key: 'cf40', marks: 0 },
      { label: '(a)(iii) Number ≥40 min', key: 'count', marks: 2 },
      { label: '(b) Is Jay correct? Explain', key: 'explain', marks: 1 }
    ],
    answer: { cf_med: '40', median: '32', q1: '27', q3: '37', iqr: '10', cf40: '72', count: '8', explain: 'Yes, IQR is lower for home to work' }
  },

  // ========== Question 17 ==========
  'pp_4024_s25_12_q17': {
    id: 'pp_4024_s25_12_q17',
    questionNumber: '17',
    title: 'Equation of a line',
    question: 'The equation of line L is 5y + 3x = 10.\n\n(a) Rearrange to make y the subject.\n\n(b) Line P is perpendicular to line L.\nLine P passes through the point (6, 7).\nFind the equation of line P.',
    marks: 5,
    hints: [
      'For (a): 5y = 10 − 3x → y = 2 − 3x/5',
      'For (b): Gradient of L = −3/5',
      'Perpendicular gradient = 5/3',
      'Use y − 7 = 5/3(x − 6)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) y = ...', key: 'a', marks: 2 },
      { label: '(b) Gradient of L', key: 'b_grad_l', marks: 0 },
      { label: '(b) Perpendicular gradient', key: 'b_grad_p', marks: 0 },
      { label: '(b) Equation of line P', key: 'b', marks: 3 }
    ],
    answer: { a: 'y = 2 − 3x/5', b_grad_l: '-3/5', b_grad_p: '5/3', b: 'y = 5x/3 − 3' }
  },

  // ========== Question 18 ==========
  'pp_4024_s25_12_q18': {
    id: 'pp_4024_s25_12_q18',
    questionNumber: '18',
    title: 'Speed–time graph',
    question: 'The diagram shows the speed–time graph for a cyclist\'s journey.\n\n(a) Describe the motion between t = 40 and t = 100.\n\n(b) The acceleration between t = 0 and t = 40 is 0.25 m/s².\nShow that v = 10.\n\n(c) The total distance travelled between t = 0 and t = T is 1.4 km.\nFind the value of T.',
    marks: 5,
    hints: [
      'For (a): Between t=40 and t=100 the speed is constant',
      'For (b): v = acceleration × time = 0.25 × 40',
      'For (c): Total area under graph = 1400 m',
      'Area = ½ × v × (T + 60) = ½ × 10 × (T + 60)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Motion description', key: 'a', marks: 1 },
      { label: '(b) v = a × t =', key: 'b', marks: 1 },
      { label: '(c) 1.4 km in metres', key: 'c_dist', marks: 0 },
      { label: '(c) Value of T', key: 'c', marks: 3 }
    ],
    answer: { a: 'Constant speed', b: '10', c_dist: '1400', c: '220' }
  },

  // ========== Question 19 ==========
  'pp_4024_s25_12_q19': {
    id: 'pp_4024_s25_12_q19',
    questionNumber: '19',
    title: 'Simplify algebraic fraction',
    question: 'Simplify.\n\n(3x² − 12) / (2x² + 11x + 14)',
    marks: 4,
    hints: [
      'Factorise the numerator: 3x² − 12 = 3(x² − 4) = 3(x + 2)(x − 2)',
      'Factorise the denominator: 2x² + 11x + 14 = (2x + 7)(x + 2)',
      'Cancel common factor (x + 2)',
      'Answer = 3(x − 2) / (2x + 7)'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Numerator: common factor out', key: 'num_cf', marks: 0 },
      { label: 'Numerator: fully factorised', key: 'num', marks: 0 },
      { label: 'Denominator: factorised', key: 'den', marks: 0 },
      { label: 'Common factor to cancel', key: 'common', marks: 0 },
      { label: 'Simplified fraction', key: 'answer', marks: 4 }
    ],
    answer: { num_cf: '3(x² − 4)', num: '3(x + 2)(x − 2)', den: '(2x + 7)(x + 2)', common: 'x + 2', answer: '3(x − 2)/(2x + 7)' }
  },

  // ========== Question 20 ==========
  'pp_4024_s25_12_q20': {
    id: 'pp_4024_s25_12_q20',
    questionNumber: '20',
    title: 'Recurring decimals',
    question: 'Work out 0.1̄7̄ + 5/9.\n\nGive your answer as a fraction in its simplest form.',
    marks: 4,
    hints: [
      'Let x = 0.171717... then 100x = 17.171717...',
      '100x − x = 17 → 99x = 17 → x = 17/99',
      '5/9 = 55/99',
      '17/99 + 55/99 = 72/99 = 8/11'
    ],
    type: 'multi-part',
    parts: [
      { label: '0.1̄7̄ as a fraction', key: 'recurring', marks: 0 },
      { label: '5/9 with common denominator', key: 'common_den', marks: 0 },
      { label: 'Sum (unsimplified)', key: 'sum', marks: 0 },
      { label: 'Answer (simplified)', key: 'answer', marks: 4 }
    ],
    answer: { recurring: '17/99', common_den: '55/99', sum: '72/99', answer: '8/11' }
  },

  // ========== Question 21 ==========
  'pp_4024_s25_12_q21': {
    id: 'pp_4024_s25_12_q21',
    questionNumber: '21',
    title: 'Vectors — ratio and parallel lines',
    question: 'OA = a and OB = b.\nX is a point on AB where AX : XB = 3 : 2.\nOXC is a straight line.\nAC is parallel to OB.\n\n(a) Find AX in terms of a and b.\n\n(b) Find XC in terms of a and b.',
    marks: 5,
    hints: [
      'For (a): AB = b − a, so AX = 3/5 × AB = 3/5(b − a)',
      'For (b): Since AC is parallel to OB, AC = kb for some k',
      'OX = OA + AX, and OXC is straight so XC = tOX for some t',
      'Use the parallel condition to find XC'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) AB =', key: 'ab', marks: 0 },
      { label: '(a) AX =', key: 'a', marks: 2 },
      { label: '(b) OX =', key: 'ox', marks: 0 },
      { label: '(b) XC =', key: 'b', marks: 3 }
    ],
    answer: { ab: 'b − a', a: '3(b − a)/5', ox: '2a/5 + 3b/5', b: '3a/5 + 9b/10' }
  },

  // ========== Question 22 ==========
  'pp_4024_s25_12_q22': {
    id: 'pp_4024_s25_12_q22',
    questionNumber: '22',
    title: 'Completing the square and sketching',
    question: '(a) Write x² + 4x − 12 in the form (x + a)² + b.\n\n(b) Use your answer to find the coordinates of the turning point of the graph y = x² + 4x − 12.\n\n(c) Sketch the graph of y = x² + 4x − 12 indicating the values where the graph crosses the axes.',
    marks: 7,
    hints: [
      'For (a): x² + 4x = (x + 2)² − 4, so x² + 4x − 12 = (x + 2)² − 16',
      'For (b): The turning point is at (−a, b) = (−2, −16)',
      'For (c): Find x-intercepts: (x + 2)² = 16, x + 2 = ±4, x = 2 or x = −6',
      'y-intercept: when x = 0, y = −12'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Value of a', key: 'a_val', marks: 0 },
      { label: '(a) Value of b', key: 'b_val', marks: 0 },
      { label: '(a) Completed square form', key: 'a', marks: 2 },
      { label: '(b) Turning point', key: 'b', marks: 1 },
      { label: '(c) x-intercepts', key: 'xint', marks: 2 },
      { label: '(c) y-intercept', key: 'yint', marks: 1 },
      { label: '(c) U-shape curve', key: 'curve', marks: 1 }
    ],
    answer: { a_val: '2', b_val: '-16', a: '(x + 2)² − 16', b: '(-2, -16)', xint: '-6 and 2', yint: '-12', curve: 'done' }
  },

  // ========== Question 23 ==========
  'pp_4024_s25_12_q23': {
    id: 'pp_4024_s25_12_q23',
    questionNumber: '23',
    title: 'Sectors of circles',
    question: 'OAB is a minor sector of a circle, centre O.\nOCD is a major sector of a different circle, centre O.\nOCA and ODB are straight lines.\nOC = 6 cm and OA = 9 cm.\nThe length of the minor arc AB is 5π cm.\n\nWork out the area of the major sector OCD.\nGive your answer in terms of π.',
    marks: 5,
    hints: [
      'Arc length = (θ/360) × 2πr',
      '5π = (θ/360) × 2π × 9 → θ = 100°',
      'Major sector angle of OCD = 360° − 100° = 260°',
      'Area = (260/360) × π × 6² = 26π'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Angle of sector OAB (°)', key: 'theta', marks: 0 },
      { label: 'Major sector angle OCD (°)', key: 'major_angle', marks: 0 },
      { label: 'Area of major sector OCD', key: 'answer', marks: 5 }
    ],
    answer: { theta: '100', major_angle: '260', answer: '26π' }
  }
};

export const sections4024_12_2025: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Basic arithmetic', questionId: 'pp_4024_s25_12_q1' },
  { id: 'q2', title: 'Q2: Probability from a bag', questionId: 'pp_4024_s25_12_q2' },
  { id: 'q3', title: 'Q3: Net of a cube', questionId: 'pp_4024_s25_12_q3' },
  { id: 'q4', title: 'Q4: Angles in triangles', questionId: 'pp_4024_s25_12_q4' },
  { id: 'q5', title: 'Q5: Solve a linear equation', questionId: 'pp_4024_s25_12_q5' },
  { id: 'q6', title: 'Q6: Scale drawing and bearings', questionId: 'pp_4024_s25_12_q6' },
  { id: 'q7', title: 'Q7: Evaluate indices', questionId: 'pp_4024_s25_12_q7' },
  { id: 'q8', title: 'Q8: Scatter diagram', questionId: 'pp_4024_s25_12_q8' },
  { id: 'q9', title: 'Q9: Estimation', questionId: 'pp_4024_s25_12_q9' },
  { id: 'q10', title: 'Q10: Prime factorisation', questionId: 'pp_4024_s25_12_q10' },
  { id: 'q11', title: 'Q11: Simultaneous equations', questionId: 'pp_4024_s25_12_q11' },
  { id: 'q12', title: 'Q12: Transformations', questionId: 'pp_4024_s25_12_q12' },
  { id: 'q13', title: 'Q13: Percentage — sale prices', questionId: 'pp_4024_s25_12_q13' },
  { id: 'q14', title: 'Q14: Vectors and coordinates', questionId: 'pp_4024_s25_12_q14' },
  { id: 'q15', title: 'Q15: Surds', questionId: 'pp_4024_s25_12_q15' },
  { id: 'q16', title: 'Q16: Cumulative frequency', questionId: 'pp_4024_s25_12_q16' },
  { id: 'q17', title: 'Q17: Equation of a line', questionId: 'pp_4024_s25_12_q17' },
  { id: 'q18', title: 'Q18: Speed–time graph', questionId: 'pp_4024_s25_12_q18' },
  { id: 'q19', title: 'Q19: Simplify algebraic fraction', questionId: 'pp_4024_s25_12_q19' },
  { id: 'q20', title: 'Q20: Recurring decimals', questionId: 'pp_4024_s25_12_q20' },
  { id: 'q21', title: 'Q21: Vectors — ratio and parallel', questionId: 'pp_4024_s25_12_q21' },
  { id: 'q22', title: 'Q22: Completing the square', questionId: 'pp_4024_s25_12_q22' },
  { id: 'q23', title: 'Q23: Sectors of circles', questionId: 'pp_4024_s25_12_q23' }
];
