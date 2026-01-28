// 0580/43 May/June 2021 - Past Paper Questions
// Paper 4 (Extended) - 2 hours 30 minutes - 130 marks
// Structure follows 0580/31 pattern: separate workspaces unless parts are connected

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions0580_43_2021: Record<string, PastPaperQuestion> = {
  // ========== Question 1 - Ratio, Percentages, Compound Interest ==========
  
  // Q1(a)(i) - Ratio problem
  'pp_0580_s21_q1a1': {
    id: 'pp_0580_s21_q1a1',
    questionNumber: '1(a)(i)',
    title: 'Ratio problem',
    question: 'Yasmin and Zak share an amount of money in the ratio 21 : 19.\nYasmin receives $6 more than Zak.\n\nCalculate the total amount of money shared by Yasmin and Zak.',
    marks: 2,
    hints: [
      'Difference in ratio = 21 - 19 = 2 parts',
      'This difference of 2 parts = $6',
      'So 1 part = $3',
      'Total = 40 parts × $3'
    ],
    type: 'calculation',
    parts: [{ label: 'Total shared ($)', key: 'answer', marks: 2 }],
    answer: { answer: '120' }
  },

  // Q1(a)(ii) - Sale price calculation
  'pp_0580_s21_q1a2': {
    id: 'pp_0580_s21_q1a2',
    questionNumber: '1(a)(ii)',
    title: 'Sale price calculation',
    question: 'In a sale, all prices are reduced by 15%.\nYasmin buys a blouse with an original price of $40.\n\nCalculate the sale price of the blouse.',
    marks: 2,
    hints: [
      'Reduction = 15% of $40',
      'Sale price = Original × (100% - 15%)',
      'Sale price = $40 × 0.85'
    ],
    type: 'calculation',
    parts: [{ label: 'Sale price ($)', key: 'answer', marks: 2 }],
    answer: { answer: '34' }
  },

  // Q1(a)(iii) - Reverse percentage
  'pp_0580_s21_q1a3': {
    id: 'pp_0580_s21_q1a3',
    questionNumber: '1(a)(iii)',
    title: 'Reverse percentage',
    question: 'Zak buys a shirt with a sale price of $29.75.\nThe sale gives 15% off.\n\nCalculate the original price of the shirt.',
    marks: 2,
    hints: [
      'Sale price = 85% of original',
      '$29.75 = 0.85 × Original',
      'Original = $29.75 ÷ 0.85'
    ],
    type: 'calculation',
    parts: [{ label: 'Original price ($)', key: 'answer', marks: 2 }],
    answer: { answer: '35' }
  },

  // Q1(b) - Compound growth (connected parts - salary calculation and year)
  'pp_0580_s21_q1b': {
    id: 'pp_0580_s21_q1b',
    questionNumber: '1(b)',
    title: 'Compound growth',
    question: 'Xavier\'s salary increases by 2% each year.\nIn 2010, his salary was $40,100.\n\n(i) Calculate his salary in 2015. Give your answer correct to the nearest dollar.\n(ii) In which year is Xavier\'s salary first greater than $47,500?',
    marks: 6,
    hints: [
      'Compound growth: A = P(1 + r)^n',
      '2015 is 5 years after 2010',
      'Salary in 2015 = $40,100 × 1.02^5',
      'For (ii), find n where 40,100 × 1.02^n > 47,500'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Salary in 2015 ($)', key: 'b1', marks: 3 },
      { label: '(ii) Year salary > $47,500', key: 'b2', marks: 3 }
    ],
    answer: { b1: '44274', b2: '2019' }
  },

  // Q1(c) - Population percentage change
  'pp_0580_s21_q1c': {
    id: 'pp_0580_s21_q1c',
    questionNumber: '1(c)',
    title: 'Population percentage change',
    question: 'In January 2020, the population of a town was 5% more than its population in January 2018.\nIn January 2021, the population was 2% less than its population in January 2020.\n\nCalculate the overall percentage increase in the population from January 2018 to January 2021.',
    marks: 3,
    hints: [
      'Let 2018 population = 100 (or P)',
      '2020 = 100 × 1.05 = 105',
      '2021 = 105 × 0.98 = 102.9',
      'Overall increase = 2.9%'
    ],
    type: 'calculation',
    parts: [{ label: 'Overall % increase', key: 'answer', marks: 3 }],
    answer: { answer: '2.9' }
  },

  // ========== Question 2 - Algebra ==========
  
  // Q2(a) - Substitution
  'pp_0580_s21_q2a': {
    id: 'pp_0580_s21_q2a',
    questionNumber: '2(a)',
    title: 'Substitution',
    question: 'y = px² + t\n\nFind the value of y when p = 3, x = 2 and t = −13.',
    marks: 2,
    hints: [
      'Substitute values: y = 3(2)² + (−13)',
      'y = 3(4) − 13',
      'y = 12 − 13'
    ],
    type: 'calculation',
    parts: [{ label: 'Value of y', key: 'answer', marks: 2 }],
    answer: { answer: '-1' }
  },

  // Q2(b) - Rearranging formula
  'pp_0580_s21_q2b': {
    id: 'pp_0580_s21_q2b',
    questionNumber: '2(b)',
    title: 'Rearranging formula',
    question: 'y = px² + t\n\nRearrange the formula to write x in terms of p, t and y.',
    marks: 2,
    hints: [
      'Isolate x² first: y − t = px²',
      'Divide by p: (y − t)/p = x²',
      'Take square root: x = ±√((y − t)/p)'
    ],
    type: 'short',
    answer: '√((y-t)/p)'
  },

  // Q2(c) - Factorising quadratic (connected - factorising then solving)
  'pp_0580_s21_q2c': {
    id: 'pp_0580_s21_q2c',
    questionNumber: '2(c)',
    title: 'Factorising quadratic',
    question: '(i) Factorise: 15x² − 2x − 8\n\n(ii) Solve the equation: 15x² − 2x − 8 = 0',
    marks: 5,
    hints: [
      'Product = 15 × (−8) = −120',
      'Find factors of −120 that sum to −2: 10 and −12',
      'Rewrite: 15x² + 10x − 12x − 8',
      'Factor by grouping: 5x(3x + 2) − 4(3x + 2)',
      'Final: (5x − 4)(3x + 2)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Factorised form', key: 'c1', marks: 2 },
      { label: '(ii) x = (first value)', key: 'c2a', marks: 2 },
      { label: '(ii) x = (second value)', key: 'c2b', marks: 1 }
    ],
    answer: { c1: '(5x-4)(3x+2)', c2a: '4/5', c2b: '-2/3' }
  },

  // Q2(d) - Factorising with difference of squares
  'pp_0580_s21_q2d': {
    id: 'pp_0580_s21_q2d',
    questionNumber: '2(d)',
    title: 'Factorising completely',
    question: 'Factorise completely: x³ − 16xy²',
    marks: 3,
    hints: [
      'Factor out common factor x: x(x² − 16y²)',
      'Recognise difference of squares: a² − b² = (a−b)(a+b)',
      'x² − 16y² = (x − 4y)(x + 4y)'
    ],
    type: 'short',
    answer: 'x(x-4y)(x+4y)'
  },

  // Q2(e) - Simplifying algebraic fraction
  'pp_0580_s21_q2e': {
    id: 'pp_0580_s21_q2e',
    questionNumber: '2(e)',
    title: 'Simplifying algebraic fraction',
    question: 'Simplify: (2x − 1 − 4ax + 2a)/(2x² − x)',
    marks: 4,
    hints: [
      'Factorise numerator by grouping',
      '2x − 1 − 4ax + 2a = (2x − 1) − 2a(2x − 1) = (2x − 1)(1 − 2a)',
      'Factorise denominator: x(2x − 1)',
      'Cancel common factor (2x − 1)'
    ],
    type: 'short',
    answer: '(1-2a)/x'
  },

  // ========== Question 3 - Statistics ==========
  
  // Q3(a) - Range, mode, median (connected - same data set)
  'pp_0580_s21_q3a': {
    id: 'pp_0580_s21_q3a',
    questionNumber: '3(a)',
    title: 'Range, mode, median',
    question: 'Zoe\'s test scores last term were: 6, 7, 7, 8, 9, 9, 10, 10.\n\nFind:\n(i) the range\n(ii) the mode\n(iii) the median',
    marks: 3,
    hints: [
      'Range = Highest − Lowest = 10 − 6',
      'Mode = Most common value (7, 9 and 10 each appear twice)',
      'Median = Middle value (average of 4th and 5th for 8 values)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Range', key: 'a1', marks: 1 },
      { label: '(ii) Mode', key: 'a2', marks: 1 },
      { label: '(iii) Median', key: 'a3', marks: 1 }
    ],
    answer: { a1: '4', a2: '7', a3: '8.5' }
  },

  // Q3(b) - Cumulative frequency (connected - reading from same diagram)
  'pp_0580_s21_q3b': {
    id: 'pp_0580_s21_q3b',
    questionNumber: '3(b)',
    title: 'Cumulative frequency',
    question: 'The cumulative frequency diagram shows information about the time taken by each of 200 students to solve a problem.\n\nUse the diagram to find an estimate of:\n(i) the median\n(ii) the interquartile range',
    marks: 3,
    hints: [
      'Median at n/2 = 100th student',
      'Lower quartile at n/4 = 50th student',
      'Upper quartile at 3n/4 = 150th student',
      'IQR = UQ − LQ'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Median (minutes)', key: 'b1', marks: 1 },
      { label: '(ii) Interquartile range', key: 'b2', marks: 2 }
    ],
    answer: { b1: '14', b2: '4' }
  },

  // Q3(c) - Mean from frequency table
  'pp_0580_s21_q3c': {
    id: 'pp_0580_s21_q3c',
    questionNumber: '3(c)',
    title: 'Mean from frequency table',
    question: 'The test scores of 200 students are shown in the table:\nScore: 5, 6, 7, 8, 9, 10\nFrequency: 3, 10, 43, 75, 48, 21\n\nCalculate the mean.',
    marks: 3,
    hints: [
      'Mean = Σfx / Σf',
      'Σfx = 5×3 + 6×10 + 7×43 + 8×75 + 9×48 + 10×21',
      'Σf = 200'
    ],
    type: 'calculation',
    parts: [{ label: 'Mean score', key: 'answer', marks: 3 }],
    answer: { answer: '8.09' }
  },

  // Q3(d) - Mean from histogram
  'pp_0580_s21_q3d': {
    id: 'pp_0580_s21_q3d',
    questionNumber: '3(d)',
    title: 'Mean from histogram',
    question: 'The histogram shows heights of 200 plants.\n\nCalculate an estimate of the mean height.',
    marks: 6,
    hints: [
      'Read frequency from histogram: Frequency = Frequency density × Class width',
      'Find midpoint of each class',
      'Mean = Σ(midpoint × frequency) / Σfrequency'
    ],
    type: 'calculation',
    parts: [{ label: 'Mean height (cm)', key: 'answer', marks: 6 }],
    answer: { answer: '99.75' }
  },

  // ========== Question 4 - Coordinates & Vectors ==========
  
  // Q4(a) - Midpoint and perpendicular line (connected)
  'pp_0580_s21_q4a': {
    id: 'pp_0580_s21_q4a',
    questionNumber: '4(a)',
    title: 'Midpoint and perpendicular',
    question: 'A is the point (1, 5) and B is the point (3, 9).\nM is the midpoint of AB.\n\n(i) Find the coordinates of M.\n(ii) Find the equation of the line that is perpendicular to AB and passes through M.\nGive your answer in the form y = mx + c.',
    marks: 5,
    hints: [
      'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)',
      'Gradient of AB = (9−5)/(3−1) = 2',
      'Perpendicular gradient = −1/2',
      'Use y − y₁ = m(x − x₁) with M'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) M = (x, y)', key: 'a1', marks: 1 },
      { label: '(ii) y = mx + c', key: 'a2', marks: 4 }
    ],
    answer: { a1: '(2, 7)', a2: 'y = -1/2 x + 8' }
  },

  // Q4(b) - Position vectors (connected)
  'pp_0580_s21_q4b': {
    id: 'pp_0580_s21_q4b',
    questionNumber: '4(b)',
    title: 'Position vectors',
    question: 'The position vector of P is (3, 5). PQ = (6, −7).\n\n(i) Find the vector OP.\n(ii) Find the position vector of R, given that PR = 3PQ.',
    marks: 5,
    hints: [
      'OP is the position vector of P = (3, 5)',
      'Position of Q = OP + PQ',
      'PR = 3PQ means multiply PQ by 3',
      'Position of R = OP + PR'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) OP', key: 'b1', marks: 2 },
      { label: '(ii) Position vector of R', key: 'b2', marks: 3 }
    ],
    answer: { b1: '(3, 5)', b2: '(21, -16)' }
  },

  // Q4(c) - Vectors with t and u (connected)
  'pp_0580_s21_q4c': {
    id: 'pp_0580_s21_q4c',
    questionNumber: '4(c)',
    title: 'Vectors in terms of t and u',
    question: 'In the diagram, OT = t, OU = u and UY = (2/3)UT.\n\n(i) Find OY in terms of t and u.\n(ii) Z is on OT and YZ is parallel to UO. Find OZ in terms of t.',
    marks: 4,
    hints: [
      'UT = OT − OU = t − u',
      'UY = (2/3)(t − u)',
      'OY = OU + UY = u + (2/3)(t − u)',
      'For parallel lines, use similar triangles'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) OY in terms of t and u', key: 'c1', marks: 2 },
      { label: '(ii) OZ in terms of t', key: 'c2', marks: 2 }
    ],
    answer: { c1: '(1/3)u + (2/3)t', c2: '(2/3)t' }
  },

  // ========== Question 5 - Simultaneous Equations ==========
  
  // Q5(a) - Linear simultaneous equations
  'pp_0580_s21_q5a': {
    id: 'pp_0580_s21_q5a',
    questionNumber: '5(a)',
    title: 'Linear simultaneous equations',
    question: 'Solve the simultaneous equations:\nx + 2y = 13\nx + 5y = 22',
    marks: 3,
    hints: [
      'Subtract first from second to eliminate x',
      '(x + 5y) − (x + 2y) = 22 − 13',
      '3y = 9, so y = 3',
      'Substitute back: x + 6 = 13'
    ],
    type: 'multi-part',
    parts: [
      { label: 'x = ', key: 'x', marks: 1 },
      { label: 'y = ', key: 'y', marks: 2 }
    ],
    answer: { x: '7', y: '3' }
  },

  // Q5(b) - Linear-quadratic simultaneous equations
  'pp_0580_s21_q5b': {
    id: 'pp_0580_s21_q5b',
    questionNumber: '5(b)',
    title: 'Linear-quadratic equations',
    question: 'Solve the simultaneous equations:\ny = 2 − x\ny = x² + 2x + 2',
    marks: 4,
    hints: [
      'Substitute y = 2 − x into second equation',
      '2 − x = x² + 2x + 2',
      '0 = x² + 3x',
      'x(x + 3) = 0'
    ],
    type: 'multi-part',
    parts: [
      { label: 'x = (first solution)', key: 'x1', marks: 2 },
      { label: 'y = (first solution)', key: 'y1', marks: 0 },
      { label: 'x = (second solution)', key: 'x2', marks: 2 },
      { label: 'y = (second solution)', key: 'y2', marks: 0 }
    ],
    answer: { x1: '0', y1: '2', x2: '-3', y2: '5' }
  },

  // ========== Question 6 - Venn Diagrams & Probability ==========
  
  // Q6(a-d) - Connected Venn diagram parts
  'pp_0580_s21_q6a': {
    id: 'pp_0580_s21_q6a',
    questionNumber: '6(a-d)',
    title: 'Venn diagram setup and probability',
    question: 'In a class of 24 students:\n• 18 students like homework (H)\n• 15 students like tests (T)\n• 1 student does not like homework and does not like tests\n\n(a) Complete the Venn diagram to show this information.\n(b) Write down the number of students who like both homework and tests.\n(c) Find n(H′ ∩ T).\n(d) A student is picked at random from the class.\nWrite down the probability that this student likes tests but does not like homework.',
    marks: 5,
    hints: [
      'Use: n(H only) + n(T only) + n(H∩T) + n(neither) = 24',
      'Set up: (18−x) + x + (15−x) + 1 = 24',
      'Solve: 34 − x = 24, so x = 10',
      'H′ ∩ T means "not H" AND "T" = T only'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) H ∩ T (both)', key: 'both', marks: 2 },
      { label: '(b) Both like H and T', key: 'b', marks: 1 },
      { label: '(c) n(H′ ∩ T)', key: 'c', marks: 1 },
      { label: '(d) P(T but not H)', key: 'd', marks: 1 }
    ],
    answer: { both: '10', b: '10', c: '5', d: '5/24' }
  },

  // Q6(e) - Probability without replacement
  'pp_0580_s21_q6e': {
    id: 'pp_0580_s21_q6e',
    questionNumber: '6(e)',
    title: 'Probability without replacement',
    question: 'From the Venn diagram (24 students, 1 likes neither H nor T):\n\nTwo students are picked at random from the class.\nFind the probability that both students do not like homework and do not like tests.',
    marks: 2,
    hints: [
      'Only 1 student doesn\'t like either',
      'P(first doesn\'t like either) = 1/24',
      'P(second doesn\'t like either) = 0/23',
      'Impossible to pick two such students!'
    ],
    type: 'calculation',
    parts: [{ label: 'Probability', key: 'answer', marks: 2 }],
    answer: { answer: '0' }
  },

  // Q6(f) - Conditional probability
  'pp_0580_s21_q6f': {
    id: 'pp_0580_s21_q6f',
    questionNumber: '6(f)',
    title: 'Conditional probability',
    question: 'From the Venn diagram (18 like homework, 10 like both H and T):\n\nTwo of the students who like homework are picked at random.\nFind the probability that both students also like tests.',
    marks: 3,
    hints: [
      '18 students like homework, 10 of these also like tests',
      'P(first likes T | likes H) = 10/18',
      'P(second likes T | likes H) = 9/17',
      'Multiply for both'
    ],
    type: 'calculation',
    parts: [{ label: 'Probability', key: 'answer', marks: 3 }],
    answer: { answer: '5/17' }
  },

  // ========== Question 7 - Inequalities & Completing the Square ==========
  
  // Q7(a) - Inequality from number line
  'pp_0580_s21_q7a': {
    id: 'pp_0580_s21_q7a',
    questionNumber: '7(a)',
    title: 'Inequality from number line',
    question: 'Write down the inequality in x shown by the number line.\n[Number line shows: open circle at −2, closed circle at 1, region between is shaded]',
    marks: 2,
    hints: [
      'Open circle means < or > (not included)',
      'Closed circle means ≤ or ≥ (included)',
      'Shaded region is between −2 and 1'
    ],
    type: 'short',
    answer: '-2 < x ≤ 1'
  },

  // Q7(b) - Completing the square (connected parts)
  'pp_0580_s21_q7b': {
    id: 'pp_0580_s21_q7b',
    questionNumber: '7(b)',
    title: 'Completing the square',
    question: '(i) Write x² + 4x + 1 in the form (x + p)² + q.\n\n(ii) Use your answer to part (b)(i) to solve the equation x² + 4x + 1 = 0.\nGive your answers correct to 2 decimal places.\n\n(iii) Use your answer to part (b)(i) to write down the coordinates of the minimum point on the graph of y = x² + 4x + 1.\n\n(iv) On the diagram, sketch the graph of y = x² + 4x + 1.',
    marks: 9,
    hints: [
      'Completing the square: (x + b/2)² − (b/2)² + c',
      '(x + 2)² = x² + 4x + 4, so subtract 3',
      'Result: (x + 2)² − 3',
      'Solve: (x + 2)² = 3, x = −2 ± √3',
      'Minimum at (−p, q) = (−2, −3)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) p = ', key: 'p', marks: 1 },
      { label: '(i) q = ', key: 'q', marks: 1 },
      { label: '(ii) x = (first value)', key: 'x1', marks: 2 },
      { label: '(ii) x = (second value)', key: 'x2', marks: 1 },
      { label: '(iii) Minimum point (x, y)', key: 'min', marks: 2 },
      { label: '(iv) Graph sketched', key: 'sketch', marks: 2 }
    ],
    answer: { p: '2', q: '-3', x1: '-0.27', x2: '-3.73', min: '(-2, -3)', sketch: 'done' }
  },

  // ========== Question 8 - Surface Area & Volume ==========
  
  // Q8(a) - Cuboid calculations (connected)
  'pp_0580_s21_q8a': {
    id: 'pp_0580_s21_q8a',
    questionNumber: '8(a)',
    title: 'Cuboid calculations',
    question: 'A solid cuboid measures 20 cm by 12 cm by 5 cm.\n\n(i) Calculate the volume of the cuboid.\n(ii) Calculate the total surface area of the cuboid.\n(iii) The surface of the cuboid is painted. The cost of the paint used is $1.52.\nFind the cost to paint 1 cm² of the cuboid. Give your answer in cents.',
    marks: 5,
    hints: [
      'Volume = l × w × h = 20 × 12 × 5',
      'Surface area = 2(lw + wh + hl)',
      'SA = 2(20×12 + 12×5 + 5×20)',
      'Cost per cm² = $1.52 ÷ surface area'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Volume (cm³)', key: 'a1', marks: 1 },
      { label: '(ii) Surface area (cm²)', key: 'a2', marks: 3 },
      { label: '(iii) Cost per cm² (cents)', key: 'a3', marks: 1 }
    ],
    answer: { a1: '1200', a2: '800', a3: '0.19' }
  },

  // Q8(b) - Cylinder to sphere
  'pp_0580_s21_q8b': {
    id: 'pp_0580_s21_q8b',
    questionNumber: '8(b)',
    title: 'Cylinder to sphere',
    question: 'A solid metal cylinder with radius x and height 2x is melted.\nAll the metal is used to make a sphere with radius r.\n\nFind r in terms of x.\n[The volume of a sphere with radius r is (4/3)πr³.]',
    marks: 3,
    hints: [
      'Volume of cylinder = πr²h = πx² × 2x = 2πx³',
      'Volume of sphere = (4/3)πr³',
      'Equate: 2πx³ = (4/3)πr³',
      'Solve for r: r³ = 1.5x³'
    ],
    type: 'short',
    answer: '∛(1.5)x'
  },

  // Q8(c) - Water in cylinder
  'pp_0580_s21_q8c': {
    id: 'pp_0580_s21_q8c',
    questionNumber: '8(c)',
    title: 'Water in cylinder',
    question: 'A cylinder of length 150 cm lies on horizontal ground.\nThe cylinder has radius 20 cm and contains water to a depth of 5 cm.\n\nCalculate the volume of water in the cylinder.\nGive your answer in litres.',
    marks: 7,
    hints: [
      'This requires the segment area formula',
      'Depth 5 cm from bottom means h = 5',
      'Use sector area − triangle area for segment',
      'Multiply by length for volume',
      '1 litre = 1000 cm³'
    ],
    type: 'calculation',
    parts: [{ label: 'Volume of water (litres)', key: 'answer', marks: 7 }],
    answer: { answer: '13.6' }
  },

  // ========== Question 9 - Trigonometry & 3D Geometry ==========
  
  // Q9(a) - Perimeter using trigonometry
  'pp_0580_s21_q9a': {
    id: 'pp_0580_s21_q9a',
    questionNumber: '9(a)',
    title: 'Perimeter with trigonometry',
    question: 'Calculate the perimeter of the quadrilateral ABCD where:\n• AB = 11.5 cm\n• Angle DAB = 35°\n• Angle ABC = 90°\n• AD connects to BC with angle BCD = 105°\n• BC = 10.25 cm',
    marks: 7,
    hints: [
      'Use right-angle trigonometry in triangle ABC',
      'Use sine rule for remaining sides',
      'Add all four sides for perimeter'
    ],
    type: 'calculation',
    parts: [{ label: 'Perimeter (cm)', key: 'answer', marks: 7 }],
    answer: { answer: '42.3' }
  },

  // Q9(b) - Cube diagonal (connected parts)
  'pp_0580_s21_q9b': {
    id: 'pp_0580_s21_q9b',
    questionNumber: '9(b)',
    title: 'Cube diagonal',
    question: 'The diagram shows a cube. The length of the diagonal AB is 8.5 cm.\n\n(i) Calculate the length of an edge of the cube.\n(ii) Calculate the angle between AB and the base of the cube.',
    marks: 6,
    hints: [
      'For a cube with edge a, space diagonal = a√3',
      'So a = 8.5/√3',
      'Base diagonal = a√2',
      'Angle uses tan θ = vertical/horizontal = a/(a√2)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Edge length (cm)', key: 'b1', marks: 3 },
      { label: '(ii) Angle with base (°)', key: 'b2', marks: 3 }
    ],
    answer: { b1: '4.91', b2: '35.3' }
  },

  // ========== Question 10 - Functions ==========
  
  // Q10(a) - Function evaluation (connected)
  'pp_0580_s21_q10a': {
    id: 'pp_0580_s21_q10a',
    questionNumber: '10(a)',
    title: 'Function evaluation',
    question: 'f(x) = 3x − 2\ng(x) = 5x − 7\n\nFind:\n(i) f(2)\n(ii) g(2)\n(iii) gf(2)',
    marks: 3,
    hints: [
      'f(2) = 3(2) − 2 = 4',
      'g(2) = 5(2) − 7 = 3',
      'gf(2) = g(f(2)) = g(4) = 5(4) − 7'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) f(2)', key: 'a1', marks: 1 },
      { label: '(ii) g(2)', key: 'a2', marks: 1 },
      { label: '(iii) gf(2)', key: 'a3', marks: 1 }
    ],
    answer: { a1: '4', a2: '3', a3: '13' }
  },

  // Q10(b) - Inverse function
  'pp_0580_s21_q10b': {
    id: 'pp_0580_s21_q10b',
    questionNumber: '10(b)',
    title: 'Inverse function',
    question: 'f(x) = 3x − 2\n\nFind f⁻¹(x).',
    marks: 2,
    hints: [
      'Let y = 3x − 2',
      'Swap x and y: x = 3y − 2',
      'Solve for y: y = (x + 2)/3'
    ],
    type: 'short',
    answer: '(x+2)/3'
  },

  // Q10(c) - Composite function
  'pp_0580_s21_q10c': {
    id: 'pp_0580_s21_q10c',
    questionNumber: '10(c)',
    title: 'Composite function',
    question: 'f(x) = 3x − 2\nh(x) = x² + 1\n\nFind hf(x), giving your answer in the form ax² + bx + c.',
    marks: 3,
    hints: [
      'hf(x) = h(f(x)) = h(3x − 2)',
      '= (3x − 2)² + 1',
      '= 9x² − 12x + 4 + 1'
    ],
    type: 'short',
    answer: '9x² - 12x + 5'
  },

  // Q10(d) - Derivative
  'pp_0580_s21_q10d': {
    id: 'pp_0580_s21_q10d',
    questionNumber: '10(d)',
    title: 'Derivative',
    question: 'h(x) = x² + 1\n\nFind the derivative of h(x).',
    marks: 1,
    hints: [
      'd/dx(x²) = 2x',
      'd/dx(1) = 0'
    ],
    type: 'short',
    answer: '2x'
  },

  // Q10(e) - Inverse of exponential
  'pp_0580_s21_q10e': {
    id: 'pp_0580_s21_q10e',
    questionNumber: '10(e)',
    title: 'Inverse of exponential',
    question: 'j(x) = 3^x\n\nFind x when j⁻¹(x) = 4.',
    marks: 1,
    hints: [
      'j⁻¹(x) = 4 means j(4) = x',
      'x = 3⁴ = 81'
    ],
    type: 'short',
    answer: '81'
  },

  // Q10(f) - Inverse composition
  'pp_0580_s21_q10f': {
    id: 'pp_0580_s21_q10f',
    questionNumber: '10(f)',
    title: 'Inverse composition',
    question: 'j(x) = 3^x\n\nSimplify j⁻¹j(x).',
    marks: 1,
    hints: [
      'j⁻¹(j(x)) always equals x',
      'A function composed with its inverse gives the identity'
    ],
    type: 'short',
    answer: 'x'
  },

  // ========== Question 11 - Sequences ==========
  
  // Q11(a) - Arithmetic sequence (connected)
  'pp_0580_s21_q11a': {
    id: 'pp_0580_s21_q11a',
    questionNumber: '11(a)',
    title: 'Arithmetic sequence',
    question: 'These are the first four terms of a sequence:\n11, 7, 3, −1\n\n(i) Write down the next term.\n(ii) Write down the term to term rule for this sequence.\n(iii) Find the nth term of this sequence.',
    marks: 4,
    hints: [
      'Common difference = 7 − 11 = −4',
      'Next term = −1 + (−4) = −5',
      'Term to term: Subtract 4',
      'nth term: a + (n−1)d = 11 + (n−1)(−4) = 15 − 4n'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Next term', key: 'a1', marks: 1 },
      { label: '(ii) Term to term rule', key: 'a2', marks: 1 },
      { label: '(iii) nth term', key: 'a3', marks: 2 }
    ],
    answer: { a1: '-5', a2: 'Subtract 4', a3: '15 - 4n' }
  },

  // Q11(b) - nth term formula (connected)
  'pp_0580_s21_q11b': {
    id: 'pp_0580_s21_q11b',
    questionNumber: '11(b)',
    title: 'nth term formula',
    question: 'The nth term of a different sequence is 2n/(n+1).\n\n(i) Find the difference between the 5th term and the 6th term of this sequence.\nGive your answer as a fraction.\n\n(ii) Is 3/8 a term in this sequence?\nShow how you decide.',
    marks: 6,
    hints: [
      '5th term: 2(5)/(5+1) = 10/6 = 5/3',
      '6th term: 2(6)/(6+1) = 12/7',
      'Difference = 12/7 − 5/3 = (36−35)/21 = 1/21',
      'For 3/8: solve 2n/(n+1) = 3/8'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Difference (fraction)', key: 'b1', marks: 2 },
      { label: '(ii) Is 3/8 a term? (Yes/No)', key: 'b2a', marks: 1 },
      { label: '(ii) Reason/working', key: 'b2b', marks: 3 }
    ],
    answer: { b1: '1/21', b2a: 'No', b2b: 'n = 0.6 which is not a positive integer' }
  }
};

// Section definitions for 0580/43 2021 - Split by question parts
export const sections0580_43_2021: PastPaperSection[] = [
  // Question 1
  { id: 'q1a1', title: 'Q1(a)(i): Ratio problem', questionId: 'pp_0580_s21_q1a1' },
  { id: 'q1a2', title: 'Q1(a)(ii): Sale price', questionId: 'pp_0580_s21_q1a2' },
  { id: 'q1a3', title: 'Q1(a)(iii): Original price', questionId: 'pp_0580_s21_q1a3' },
  { id: 'q1b', title: 'Q1(b): Compound growth', questionId: 'pp_0580_s21_q1b' },
  { id: 'q1c', title: 'Q1(c): Population change', questionId: 'pp_0580_s21_q1c' },
  
  // Question 2
  { id: 'q2a', title: 'Q2(a): Substitution', questionId: 'pp_0580_s21_q2a' },
  { id: 'q2b', title: 'Q2(b): Rearranging', questionId: 'pp_0580_s21_q2b' },
  { id: 'q2c', title: 'Q2(c): Factorising quadratic', questionId: 'pp_0580_s21_q2c' },
  { id: 'q2d', title: 'Q2(d): Difference of squares', questionId: 'pp_0580_s21_q2d' },
  { id: 'q2e', title: 'Q2(e): Algebraic fraction', questionId: 'pp_0580_s21_q2e' },
  
  // Question 3
  { id: 'q3a', title: 'Q3(a): Range, mode, median', questionId: 'pp_0580_s21_q3a' },
  { id: 'q3b', title: 'Q3(b): Cumulative frequency', questionId: 'pp_0580_s21_q3b' },
  { id: 'q3c', title: 'Q3(c): Mean from frequency table', questionId: 'pp_0580_s21_q3c' },
  { id: 'q3d', title: 'Q3(d): Mean from histogram', questionId: 'pp_0580_s21_q3d' },
  
  // Question 4
  { id: 'q4a', title: 'Q4(a): Midpoint & perpendicular', questionId: 'pp_0580_s21_q4a' },
  { id: 'q4b', title: 'Q4(b): Position vectors', questionId: 'pp_0580_s21_q4b' },
  { id: 'q4c', title: 'Q4(c): Vectors with t and u', questionId: 'pp_0580_s21_q4c' },
  
  // Question 5
  { id: 'q5a', title: 'Q5(a): Linear simultaneous', questionId: 'pp_0580_s21_q5a' },
  { id: 'q5b', title: 'Q5(b): Linear-quadratic', questionId: 'pp_0580_s21_q5b' },
  
  // Question 6
  { id: 'q6a', title: 'Q6(a-d): Venn diagram & probability', questionId: 'pp_0580_s21_q6a' },
  { id: 'q6e', title: 'Q6(e): Probability (neither)', questionId: 'pp_0580_s21_q6e' },
  { id: 'q6f', title: 'Q6(f): Conditional probability', questionId: 'pp_0580_s21_q6f' },
  
  // Question 7
  { id: 'q7a', title: 'Q7(a): Inequality from number line', questionId: 'pp_0580_s21_q7a' },
  { id: 'q7b', title: 'Q7(b): Completing the square', questionId: 'pp_0580_s21_q7b' },
  
  // Question 8
  { id: 'q8a', title: 'Q8(a): Cuboid calculations', questionId: 'pp_0580_s21_q8a' },
  { id: 'q8b', title: 'Q8(b): Cylinder to sphere', questionId: 'pp_0580_s21_q8b' },
  { id: 'q8c', title: 'Q8(c): Water in cylinder', questionId: 'pp_0580_s21_q8c' },
  
  // Question 9
  { id: 'q9a', title: 'Q9(a): Perimeter with trigonometry', questionId: 'pp_0580_s21_q9a' },
  { id: 'q9b', title: 'Q9(b): Cube diagonal', questionId: 'pp_0580_s21_q9b' },
  
  // Question 10
  { id: 'q10a', title: 'Q10(a): Function evaluation', questionId: 'pp_0580_s21_q10a' },
  { id: 'q10b', title: 'Q10(b): Inverse function', questionId: 'pp_0580_s21_q10b' },
  { id: 'q10c', title: 'Q10(c): Composite function', questionId: 'pp_0580_s21_q10c' },
  { id: 'q10d', title: 'Q10(d): Derivative', questionId: 'pp_0580_s21_q10d' },
  { id: 'q10e', title: 'Q10(e): Inverse exponential', questionId: 'pp_0580_s21_q10e' },
  { id: 'q10f', title: 'Q10(f): Inverse composition', questionId: 'pp_0580_s21_q10f' },
  
  // Question 11
  { id: 'q11a', title: 'Q11(a): Arithmetic sequence', questionId: 'pp_0580_s21_q11a' },
  { id: 'q11b', title: 'Q11(b): nth term formula', questionId: 'pp_0580_s21_q11b' }
];
