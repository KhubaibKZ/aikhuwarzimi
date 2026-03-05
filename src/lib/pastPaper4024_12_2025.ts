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
      { label: '(a) Step: 2 × (−4) =', key: 'a_s1', marks: 0 },
      { label: '(a) 6 − (−8) =', key: 'a', marks: 1 },
      { label: '(b) 4 × 4 =', key: 'b', marks: 1 },
      { label: '(c) Step: Reciprocal of 5/6 =', key: 'c_s1', marks: 0 },
      { label: '(c) 2/9 × 6/5 =', key: 'c', marks: 2 }
    ],
    answer: { a_s1: '-8', a: '14', b: '16', c_s1: '6/5', c: '4/15' }
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
      { label: '(a) P(yellow) = yellow/total =', key: 'a', marks: 1 },
      { label: '(b) Step: Number of green balls =', key: 'b_s1', marks: 0 },
      { label: '(b) Step: Not blue = yellow + green =', key: 'b_s2', marks: 0 },
      { label: '(b) P(not blue) =', key: 'b', marks: 1 }
    ],
    answer: { a: '4/11', b_s1: '2', b_s2: '6', b: '6/11' }
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
      { label: 'Step: Side length = √9 =', key: 'side', marks: 0 },
      { label: 'Step: Number of faces on a cube =', key: 'faces', marks: 0 },
      { label: 'Net drawn (6 squares of 3×3)', key: 'net', marks: 3 }
    ],
    answer: { side: '3', faces: '6', net: 'done' }
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
      { label: 'Step: Angle EDC = (isosceles, ED=EC)', key: 's1', marks: 0 },
      { label: 'Step: Angle DEC = 180° − 35° − 35° =', key: 's2', marks: 0 },
      { label: 'Step: Angle BEC = 180° − 110° =', key: 's3', marks: 0 },
      { label: 'x = 180° − 48° − 70° − ... =', key: 'x', marks: 3 }
    ],
    answer: { s1: '35', s2: '110', s3: '70', x: '22' }
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
      { label: 'Step: Expand 5(4 − x) =', key: 's1', marks: 0 },
      { label: 'Step: Rearrange −5x =', key: 's2', marks: 0 },
      { label: 'x =', key: 'x', marks: 2 }
    ],
    answer: { s1: '20 − 5x', s2: '15', x: '-3' }
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
      { label: '(a) Step: AB on map (cm) =', key: 'a_s1', marks: 0 },
      { label: '(a) Actual distance = map × 5 =', key: 'a', marks: 2 },
      { label: '(b) Position of C marked', key: 'b', marks: 2 }
    ],
    answer: { a_s1: '6', a: '30', b: 'C marked correctly' }
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
      { label: '(a) ∛125 =', key: 'a', marks: 1 },
      { label: '(b) Step: 4² =', key: 'b_s1', marks: 0 },
      { label: '(b) 4⁻² = 1/4² =', key: 'b', marks: 2 }
    ],
    answer: { a: '5', b_s1: '16', b: '1/16' }
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
      { label: 'Step: 87.1 to 1 s.f. =', key: 's1', marks: 0 },
      { label: 'Step: 23.6 to 1 s.f. =', key: 's2', marks: 0 },
      { label: 'Estimated area = ... × ... =', key: 'area', marks: 2 }
    ],
    answer: { s1: '90', s2: '20', area: '1800' }
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
      { label: '(a) Step: 228 ÷ 2 =', key: 'a_s1', marks: 0 },
      { label: '(a) Step: 114 ÷ 2 =', key: 'a_s2', marks: 0 },
      { label: '(a) Step: 57 ÷ 3 =', key: 'a_s3', marks: 0 },
      { label: '(a) 228 as product of primes =', key: 'a', marks: 2 },
      { label: '(b) Step: Square each prime factor', key: 'b_s1', marks: 0 },
      { label: '(b) 51984 as product of primes =', key: 'b', marks: 1 }
    ],
    answer: { a_s1: '114', a_s2: '57', a_s3: '19', a: '2² × 3 × 19', b_s1: '2⁴ × 3² × 19²', b: '2⁴ × 3² × 19²' }
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
      { label: '(a) Step: Write equation: 4x + 6y =', key: 'a_s1', marks: 0 },
      { label: '(a) Divide by 2: 2x + 3y =', key: 'a', marks: 1 },
      { label: '(b) Second equation: 6x + y =', key: 'b', marks: 1 },
      { label: '(c) Step: Rearrange for y = 13 − ...', key: 'c_s1', marks: 0 },
      { label: '(c) Step: Substitute: 2x + 3(13−6x) =', key: 'c_s2', marks: 0 },
      { label: '(c) Step: Simplify: −16x =', key: 'c_s3', marks: 0 },
      { label: '(c) x (small box mass) =', key: 'small', marks: 2 },
      { label: '(c) y (large box mass) =', key: 'large', marks: 1 }
    ],
    answer: { a_s1: '30', a: '15', b: '13', c_s1: '6x', c_s2: '15', c_s3: '-24', small: '1.5', large: '4' }
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
      { label: '(c)(i) Step: Original vertex corresponding to (12,3) =', key: 'k_s1', marks: 0 },
      { label: '(c)(i) k = 12 ÷ original x =', key: 'k', marks: 1 },
      { label: '(c)(ii) Other vertices (multiply each by k)', key: 'vertices', marks: 2 }
    ],
    answer: {
      type: 'Rotation',
      angle: '90° clockwise',
      centre: '(-2, 1)',
      reflect: '(-6,1), (-3,1), (-5,2)',
      k_s1: '(4, 1)',
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
      { label: '(a) Step: 100% − 20% =', key: 'a_s1', marks: 0 },
      { label: '(a) Sale price = 80% × $85 =', key: 'a', marks: 2 },
      { label: '(b) Step: $40 represents what % of original?', key: 'b_s1', marks: 0 },
      { label: '(b) Original price = $40 ÷ 0.80 =', key: 'b', marks: 2 }
    ],
    answer: { a_s1: '80', a: '68', b_s1: '80', b: '50' }
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
      { label: '(a) Step: B − A = (6−(−4), 1−5) =', key: 'ab_s1', marks: 0 },
      { label: '(a) AB =', key: 'ab', marks: 2 },
      { label: '(b) Step: C = B + BC = (6+(−3), 1+(−4)) =', key: 'c_s1', marks: 0 },
      { label: '(b) C =', key: 'c', marks: 2 },
      { label: '(c)(i) Step: DC = ½AB =', key: 'd_s1', marks: 0 },
      { label: '(c)(i) D = C − DC =', key: 'd', marks: 2 },
      { label: '(c)(ii) Step: (xD−xA)² + (yD−yA)² =', key: 'ad_s1', marks: 0 },
      { label: '(c)(ii) AD =', key: 'ad', marks: 3 }
    ],
    answer: { ab_s1: '(10, -4)', ab: '(10, -4)', c_s1: '(3, -3)', c: '(3, -3)', d_s1: '(5, -2)', d: '(-2, -1)', ad_s1: '4 + 36', ad: '2√10' }
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
      { label: '(a) Step: √175 = √(25×7) =', key: 'a_s1', marks: 0 },
      { label: '(a) Step: √28 = √(4×7) =', key: 'a_s2', marks: 0 },
      { label: '(a) √175 − √28 =', key: 'a', marks: 2 },
      { label: '(b) Step: Multiply by √5/√5', key: 'b_s1', marks: 0 },
      { label: '(b) 1/√5 =', key: 'b', marks: 1 }
    ],
    answer: { a_s1: '5√7', a_s2: '2√7', a: '3√7', b_s1: '√5/5', b: '√5/5' }
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
      { label: '(a)(i) Step: Read CF at n/2 = 40 →', key: 'median_s1', marks: 0 },
      { label: '(a)(i) Median (minutes)', key: 'median', marks: 1 },
      { label: '(a)(ii) Step: Q1 at CF=20 =', key: 'q1', marks: 0 },
      { label: '(a)(ii) Step: Q3 at CF=60 =', key: 'q3', marks: 0 },
      { label: '(a)(ii) IQR = Q3 − Q1 =', key: 'iqr', marks: 2 },
      { label: '(a)(iii) Step: CF at 40 min =', key: 'count_s1', marks: 0 },
      { label: '(a)(iii) Number ≥ 40 min = 80 − CF =', key: 'count', marks: 2 },
      { label: '(b) Is Jay correct? Explain', key: 'explain', marks: 1 }
    ],
    answer: { median_s1: '32', median: '32', q1: '27', q3: '37', iqr: '10', count_s1: '72', count: '8', explain: 'Yes, IQR is lower for home to work' }
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
      { label: '(a) Step: 5y = 10 − 3x', key: 'a_s1', marks: 0 },
      { label: '(a) y =', key: 'a', marks: 2 },
      { label: '(b) Step: Gradient of L =', key: 'b_s1', marks: 0 },
      { label: '(b) Step: Perpendicular gradient =', key: 'b_s2', marks: 0 },
      { label: '(b) Step: y − 7 = m(x − 6)', key: 'b_s3', marks: 0 },
      { label: '(b) Equation of line P', key: 'b', marks: 3 }
    ],
    answer: { a_s1: '10 − 3x', a: '2 − 3x/5', b_s1: '-3/5', b_s2: '5/3', b_s3: 'y − 7 = 5/3(x − 6)', b: 'y = 5x/3 − 3' }
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
      { label: '(b) Step: v = acceleration × time =', key: 'b_s1', marks: 0 },
      { label: '(b) v =', key: 'b', marks: 1 },
      { label: '(c) Step: 1.4 km = ... m', key: 'c_s1', marks: 0 },
      { label: '(c) Step: Area under graph formula', key: 'c_s2', marks: 0 },
      { label: '(c) T =', key: 'c', marks: 3 }
    ],
    answer: { a: 'Constant speed', b_s1: '0.25 × 40', b: '10', c_s1: '1400', c_s2: '½ × 10 × (T + 60)', c: '220' }
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
      { label: 'Step: Factorise numerator: 3x²−12 = 3(...) =', key: 's1', marks: 0 },
      { label: 'Step: Factorise denominator: 2x²+11x+14 =', key: 's2', marks: 0 },
      { label: 'Step: Common factor to cancel =', key: 's3', marks: 0 },
      { label: 'Simplified fraction =', key: 'ans', marks: 4 }
    ],
    answer: { s1: '3(x+2)(x−2)', s2: '(2x+7)(x+2)', s3: '(x+2)', ans: '3(x−2)/(2x+7)' }
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
      { label: 'Step: Let x = 0.17̄, then 100x =', key: 's1', marks: 0 },
      { label: 'Step: 100x − x = 99x =', key: 's2', marks: 0 },
      { label: 'Step: 0.17̄ as fraction =', key: 's3', marks: 0 },
      { label: 'Step: 5/9 with denominator 99 =', key: 's4', marks: 0 },
      { label: 'Step: 17/99 + 55/99 =', key: 's5', marks: 0 },
      { label: 'Answer (simplest form) =', key: 'ans', marks: 4 }
    ],
    answer: { s1: '17.1717...', s2: '17', s3: '17/99', s4: '55/99', s5: '72/99', ans: '8/11' }
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
      { label: '(a) Step: AB = OB − OA =', key: 'a_s1', marks: 0 },
      { label: '(a) AX = 3/5 × AB =', key: 'a', marks: 2 },
      { label: '(b) Step: OX = OA + AX =', key: 'b_s1', marks: 0 },
      { label: '(b) Step: AC = kb (parallel to OB), find k', key: 'b_s2', marks: 0 },
      { label: '(b) XC =', key: 'b', marks: 3 }
    ],
    answer: { a_s1: 'b − a', a: '3(b − a)/5', b_s1: 'a + 3(b−a)/5', b_s2: '3b/2', b: '3a/5 + 9b/10' }
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
      { label: '(a) Step: Half of 4 =', key: 'a_s1', marks: 0 },
      { label: '(a) Step: (x+2)² = x² + 4x + ...', key: 'a_s2', marks: 0 },
      { label: '(a) (x+a)² + b =', key: 'a', marks: 2 },
      { label: '(b) Turning point =', key: 'b', marks: 1 },
      { label: '(c) Step: (x+2)² = 16 → x+2 = ±', key: 'c_s1', marks: 0 },
      { label: '(c) x-intercepts', key: 'xint', marks: 2 },
      { label: '(c) y-intercept', key: 'yint', marks: 1 },
      { label: '(c) U-shape curve', key: 'curve', marks: 1 }
    ],
    answer: { a_s1: '2', a_s2: '4', a: '(x + 2)² − 16', b: '(-2, -16)', c_s1: '4', xint: '-6 and 2', yint: '-12', curve: 'done' }
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
      { label: 'Step: Arc AB = (θ/360) × 2π × 9 = 5π → θ =', key: 's1', marks: 0 },
      { label: 'Step: Major angle = 360° − θ =', key: 's2', marks: 0 },
      { label: 'Step: Area = (major angle/360) × π × 6² =', key: 's3', marks: 0 },
      { label: 'Area of major sector OCD =', key: 'ans', marks: 5 }
    ],
    answer: { s1: '100', s2: '260', s3: '26π', ans: '26π' }
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
