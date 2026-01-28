// 0580/43 May/June 2021 - Past Paper Questions
// Paper 4 (Extended) - 2 hours 30 minutes - 130 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions0580_43_2021: Record<string, PastPaperQuestion> = {
  // ========== Question 1 - Ratio, Percentages, Compound Interest ==========
  'pp_0580_s21_q1': {
    id: 'pp_0580_s21_q1',
    questionNumber: '1',
    title: 'Ratio, percentages & compound growth',
    question: '(a) Yasmin and Zak share an amount of money in the ratio 21 : 19.\nYasmin receives $6 more than Zak.\n\n(i) Calculate the total amount of money shared by Yasmin and Zak.\n(ii) In a sale, all prices are reduced by 15%. Yasmin buys a blouse with an original price of $40.\nCalculate the sale price of the blouse.\n(iii) Zak buys a shirt with a sale price of $29.75.\nCalculate the original price of the shirt.\n\n(b) Xavier\'s salary increases by 2% each year. In 2010, his salary was $40,100.\n(i) Calculate his salary in 2015. Give your answer correct to the nearest dollar.\n(ii) In which year is Xavier\'s salary first greater than $47,500?\n\n(c) In January 2020, the population of a town was 5% more than its population in January 2018.\nIn January 2021, the population was 2% less than its population in January 2020.\nCalculate the overall percentage increase in the population from January 2018 to January 2021.',
    marks: 15,
    hints: [
      'For ratio problems: difference in ratio = difference in amount',
      'Ratio 21:19 means difference of 2 parts = $6, so 1 part = $3',
      'Sale price = Original × (100% - 15%) = Original × 0.85',
      'To find original: Original = Sale price ÷ 0.85',
      'Compound growth: A = P(1 + r)^n',
      'For percentage change: (Final - Initial)/Initial × 100'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Total shared ($)', key: 'a1', marks: 2 },
      { label: '(a)(ii) Sale price of blouse ($)', key: 'a2', marks: 2 },
      { label: '(a)(iii) Original price of shirt ($)', key: 'a3', marks: 2 },
      { label: '(b)(i) Salary in 2015 ($)', key: 'b1', marks: 3 },
      { label: '(b)(ii) Year salary > $47,500', key: 'b2', marks: 3 },
      { label: '(c) Overall % increase', key: 'c1', marks: 3 }
    ],
    answer: {
      a1: '120',
      a2: '34',
      a3: '35',
      b1: '44274',
      b2: '2019',
      c1: '2.9'
    }
  },

  // ========== Question 2 - Algebra: Substitution, Rearranging, Factorising ==========
  'pp_0580_s21_q2': {
    id: 'pp_0580_s21_q2',
    questionNumber: '2',
    title: 'Algebra: Substitution & Factorising',
    question: '(a) y = px² + t\nFind the value of y when p = 3, x = 2 and t = −13.\n\n(b) Rearrange the formula y = px² + t to write x in terms of p, t and y.\n\n(c)(i) Factorise: 15x² − 2x − 8\n(ii) Solve the equation: 15x² − 2x − 8 = 0\n\n(d) Factorise completely: x³ − 16x y²\n\n(e) Simplify: (2x − 1 − 4ax + 2a)/(2x² − x)',
    marks: 17,
    hints: [
      'Substitute values carefully: y = 3(2)² + (−13) = 3(4) − 13',
      'To rearrange: Isolate x² first, then take square root',
      'For factorising quadratics, find two numbers that multiply to give ac and add to give b',
      '15x² − 2x − 8: product = −120, find factors that sum to −2',
      'For difference of squares: a² − b² = (a−b)(a+b)',
      'Factor out common terms first'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Value of y', key: 'a', marks: 2 },
      { label: '(b) x = ', key: 'b', marks: 2 },
      { label: '(c)(i) Factorised form', key: 'c1', marks: 2 },
      { label: '(c)(ii) x = (first value)', key: 'c2a', marks: 1 },
      { label: '(c)(ii) x = (second value)', key: 'c2b', marks: 0 },
      { label: '(d) Factorised form', key: 'd', marks: 3 },
      { label: '(e) Simplified form', key: 'e', marks: 4 }
    ],
    answer: {
      a: '-1',
      b: '√((y-t)/p)',
      c1: '(5x-4)(3x+2)',
      c2a: '4/5',
      c2b: '-2/3',
      d: 'x(x-4y)(x+4y)',
      e: '(1-2a)/x'
    }
  },

  // ========== Question 3 - Statistics: Mean, Mode, Median, Histograms ==========
  'pp_0580_s21_q3': {
    id: 'pp_0580_s21_q3',
    questionNumber: '3',
    title: 'Statistics: Averages & Cumulative Frequency',
    question: '(a) Zoe\'s test scores last term were: 6, 7, 7, 8, 9, 9, 10, 10.\nFind:\n(i) the range\n(ii) the mode\n(iii) the median\n\n(b) The cumulative frequency diagram shows information about the time taken by each of 200 students to solve a problem.\nUse the diagram to find an estimate of:\n(i) the median\n(ii) the interquartile range\n\n(c) The test scores of 200 students are shown in the table:\nScore: 5, 6, 7, 8, 9, 10\nFrequency: 3, 10, 43, 75, 48, 21\nCalculate the mean.\n\n(d) The histogram shows heights of 200 plants.\nCalculate an estimate of the mean height.',
    marks: 15,
    hints: [
      'Range = Highest − Lowest',
      'Mode = Most common value',
      'Median = Middle value (for 8 values, average of 4th and 5th)',
      'For cumulative frequency: median at n/2, LQ at n/4, UQ at 3n/4',
      'Mean = Σfx / Σf',
      'For histograms: Frequency = Frequency density × Class width'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Range', key: 'a1', marks: 1 },
      { label: '(a)(ii) Mode', key: 'a2', marks: 1 },
      { label: '(a)(iii) Median', key: 'a3', marks: 1 },
      { label: '(b)(i) Median (minutes)', key: 'b1', marks: 1 },
      { label: '(b)(ii) Interquartile range', key: 'b2', marks: 2 },
      { label: '(c) Mean score', key: 'c', marks: 3 },
      { label: '(d) Mean height (cm)', key: 'd', marks: 6 }
    ],
    answer: {
      a1: '4',
      a2: '7',
      a3: '8.5',
      b1: '14',
      b2: '4',
      c: '8.09',
      d: '99.75'
    }
  },

  // ========== Question 4 - Coordinates & Vectors ==========
  'pp_0580_s21_q4': {
    id: 'pp_0580_s21_q4',
    questionNumber: '4',
    title: 'Coordinates & Vectors',
    question: '(a) A is the point (1, 5) and B is the point (3, 9).\nM is the midpoint of AB.\n(i) Find the coordinates of M.\n(ii) Find the equation of the line that is perpendicular to AB and passes through M.\nGive your answer in the form y = mx + c.\n\n(b) The position vector of P is (3, 5). PQ = (6, −7).\nFind:\n(i) the vector OP\n(ii) the position vector of R, given that PR = 3PQ\n\n(c) In the diagram, OT = t, OU = u and UY = (2/3)UT.\n(i) Find OY in terms of t and u.\n(ii) Z is on OT and YZ is parallel to UO. Find OZ in terms of t.',
    marks: 14,
    hints: [
      'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)',
      'Gradient of AB = (y₂−y₁)/(x₂−x₁)',
      'Perpendicular gradient = −1/m',
      'Use point-slope form: y − y₁ = m(x − x₁)',
      'Position vector of Q = OP + PQ',
      'For similar triangles, use ratio properties'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) M = (x, y)', key: 'a1', marks: 1 },
      { label: '(a)(ii) y = mx + c', key: 'a2', marks: 4 },
      { label: '(b)(i) OP', key: 'b1', marks: 2 },
      { label: '(b)(ii) Position vector of R', key: 'b2', marks: 3 },
      { label: '(c)(i) OY in terms of t and u', key: 'c1', marks: 2 },
      { label: '(c)(ii) OZ in terms of t', key: 'c2', marks: 2 }
    ],
    answer: {
      a1: '(2, 7)',
      a2: 'y = -1/2 x + 8',
      b1: '(3, 5)',
      b2: '(21, -16)',
      c1: '(1/3)u + (2/3)t',
      c2: '(2/3)t'
    }
  },

  // ========== Question 5 - Simultaneous Equations ==========
  'pp_0580_s21_q5': {
    id: 'pp_0580_s21_q5',
    questionNumber: '5',
    title: 'Simultaneous Equations',
    question: '(a) Solve the simultaneous equations:\nx + 2y = 13\nx + 5y = 22\n\n(b) Solve the simultaneous equations:\ny = 2 − x\ny = x² + 2x + 2',
    marks: 7,
    hints: [
      'For linear equations: Subtract to eliminate one variable',
      'For linear-quadratic: Substitute the linear equation into the quadratic',
      'Rearrange to form a quadratic equation and solve',
      'Remember to find both x and y values'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) x = ', key: 'a_x', marks: 1 },
      { label: '(a) y = ', key: 'a_y', marks: 2 },
      { label: '(b) x = (first solution)', key: 'b_x1', marks: 2 },
      { label: '(b) y = (first solution)', key: 'b_y1', marks: 0 },
      { label: '(b) x = (second solution)', key: 'b_x2', marks: 2 },
      { label: '(b) y = (second solution)', key: 'b_y2', marks: 0 }
    ],
    answer: {
      a_x: '7',
      a_y: '3',
      b_x1: '0',
      b_y1: '2',
      b_x2: '-3',
      b_y2: '5'
    }
  },

  // ========== Question 6 - Venn Diagrams & Probability ==========
  'pp_0580_s21_q6': {
    id: 'pp_0580_s21_q6',
    questionNumber: '6',
    title: 'Venn Diagrams & Probability',
    question: 'In a class of 24 students:\n• 18 students like homework (H)\n• 15 students like tests (T)\n• 1 student does not like homework and does not like tests\n\n(a) Complete the Venn diagram to show this information.\n\n(b) Write down the number of students who like both homework and tests.\n\n(c) Find n(H′ ∩ T).\n\n(d) A student is picked at random from the class.\nWrite down the probability that this student likes tests but does not like homework.\n\n(e) Two students are picked at random from the class.\nFind the probability that both students do not like homework and do not like tests.\n\n(f) Two of the students who like homework are picked at random.\nFind the probability that both students also like tests.',
    marks: 10,
    hints: [
      'Use: n(H only) + n(T only) + n(H∩T) + n(neither) = 24',
      'n(H) = n(H only) + n(H∩T) = 18',
      'n(T) = n(T only) + n(H∩T) = 15',
      'Set up equation: (18−x) + x + (15−x) + 1 = 24',
      'H′ means "not H"',
      'For probability without replacement: P(A then B) = P(A) × P(B|A)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) H only', key: 'h_only', marks: 0 },
      { label: '(a) T only', key: 't_only', marks: 0 },
      { label: '(a) H ∩ T (both)', key: 'both', marks: 2 },
      { label: '(b) Both like H and T', key: 'b', marks: 1 },
      { label: '(c) n(H′ ∩ T)', key: 'c', marks: 1 },
      { label: '(d) P(T but not H)', key: 'd', marks: 1 },
      { label: '(e) P(both don\'t like H or T)', key: 'e', marks: 2 },
      { label: '(f) P(both like T | both like H)', key: 'f', marks: 3 }
    ],
    answer: {
      h_only: '8',
      t_only: '5',
      both: '10',
      b: '10',
      c: '5',
      d: '5/24',
      e: '0',
      f: '5/17'
    }
  },

  // ========== Question 7 - Inequalities & Completing the Square ==========
  'pp_0580_s21_q7': {
    id: 'pp_0580_s21_q7',
    questionNumber: '7',
    title: 'Inequalities & Quadratics',
    question: '(a) Write down the inequality in x shown by the number line.\n[Number line shows: −2 < x ≤ 1]\n\n(b)(i) Write x² + 4x + 1 in the form (x + p)² + q.\n\n(ii) Use your answer to part (b)(i) to solve the equation x² + 4x + 1 = 0.\nGive your answers correct to 2 decimal places.\n\n(iii) Use your answer to part (b)(i) to write down the coordinates of the minimum point on the graph of y = x² + 4x + 1.\n\n(iv) On the diagram, sketch the graph of y = x² + 4x + 1.',
    marks: 11,
    hints: [
      'Open circle means < or >, closed circle means ≤ or ≥',
      'Completing the square: x² + bx + c = (x + b/2)² − (b/2)² + c',
      'For x² + 4x + 1: (x + 2)² = x² + 4x + 4, so subtract 3',
      'Solve: (x + 2)² = 3, so x + 2 = ±√3',
      'Minimum point is at (−p, q) for (x + p)² + q',
      'Parabola opens upward, crosses x-axis at solutions'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Inequality', key: 'a', marks: 2 },
      { label: '(b)(i) (x + p)² + q: p = ', key: 'b1_p', marks: 1 },
      { label: '(b)(i) (x + p)² + q: q = ', key: 'b1_q', marks: 1 },
      { label: '(b)(ii) x = (first value)', key: 'b2_x1', marks: 2 },
      { label: '(b)(ii) x = (second value)', key: 'b2_x2', marks: 0 },
      { label: '(b)(iii) Minimum point (x, y)', key: 'b3', marks: 2 },
      { label: '(b)(iv) Graph sketched', key: 'b4', marks: 3 }
    ],
    answer: {
      a: '-2 < x ≤ 1',
      b1_p: '2',
      b1_q: '-3',
      b2_x1: '-0.27',
      b2_x2: '-3.73',
      b3: '(-2, -3)',
      b4: 'done'
    }
  },

  // ========== Question 8 - Surface Area & Volume ==========
  'pp_0580_s21_q8': {
    id: 'pp_0580_s21_q8',
    questionNumber: '8',
    title: 'Surface Area & Volume',
    question: '(a) A solid cuboid measures 20 cm by 12 cm by 5 cm.\n(i) Calculate the volume of the cuboid.\n(ii) Calculate the total surface area of the cuboid.\n(iii) The surface of the cuboid is painted. The cost of the paint used is $1.52.\nFind the cost to paint 1 cm² of the cuboid. Give your answer in cents.\n\n(b) A solid metal cylinder with radius x and height 2x is melted.\nAll the metal is used to make a sphere with radius r.\nFind r in terms of x.\n[The volume of a sphere with radius r is (4/3)πr³.]\n\n(c) A cylinder of length 150 cm lies on horizontal ground.\nThe cylinder has radius 20 cm and contains water to a depth of 5 cm.\nCalculate the volume of water in the cylinder.\nGive your answer in litres.',
    marks: 15,
    hints: [
      'Volume of cuboid = l × w × h',
      'Surface area = 2(lw + wh + hl)',
      'Cost per cm² = Total cost ÷ Surface area',
      'Volume of cylinder = πr²h',
      'Equate cylinder volume to sphere volume and solve for r',
      'For water in cylinder: Use segment area formula'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Volume (cm³)', key: 'a1', marks: 1 },
      { label: '(a)(ii) Surface area (cm²)', key: 'a2', marks: 3 },
      { label: '(a)(iii) Cost per cm² (cents)', key: 'a3', marks: 1 },
      { label: '(b) r in terms of x', key: 'b', marks: 3 },
      { label: '(c) Volume of water (litres)', key: 'c', marks: 7 }
    ],
    answer: {
      a1: '1200',
      a2: '800',
      a3: '0.19',
      b: '∛(1.5)x',
      c: '13.6'
    }
  },

  // ========== Question 9 - Trigonometry & 3D Geometry ==========
  'pp_0580_s21_q9': {
    id: 'pp_0580_s21_q9',
    questionNumber: '9',
    title: 'Trigonometry & 3D Geometry',
    question: '(a) Calculate the perimeter of the quadrilateral ABCD where:\n• AB = 11.5 cm\n• Angle DAB = 35°\n• Angle ABC = 90°\n• AD connects to BC with angle BCD = 105°\n• BC = 10.25 cm\n\n(b) The diagram shows a cube. The length of the diagonal AB is 8.5 cm.\n(i) Calculate the length of an edge of the cube.\n(ii) Calculate the angle between AB and the base of the cube.',
    marks: 13,
    hints: [
      'Use right-angle trigonometry: sin θ = opp/hyp, cos θ = adj/hyp',
      'Use sine rule: a/sin A = b/sin B',
      'For a cube with edge a, diagonal = a√3',
      'So a = diagonal/√3',
      'Angle with base uses tan θ = vertical/horizontal'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Perimeter (cm)', key: 'a', marks: 7 },
      { label: '(b)(i) Edge length (cm)', key: 'b1', marks: 3 },
      { label: '(b)(ii) Angle with base (°)', key: 'b2', marks: 3 }
    ],
    answer: {
      a: '42.3',
      b1: '4.91',
      b2: '35.3'
    }
  },

  // ========== Question 10 - Functions ==========
  'pp_0580_s21_q10': {
    id: 'pp_0580_s21_q10',
    questionNumber: '10',
    title: 'Functions',
    question: 'f(x) = 3x − 2\ng(x) = 5x − 7\nh(x) = x² + 1\nj(x) = 3^x\n\n(a) Find:\n(i) f(2)\n(ii) g(2)\n(iii) gf(2)\n\n(b) Find f⁻¹(x).\n\n(c) Find hf(x), giving your answer in the form ax² + bx + c.\n\n(d) Find the derivative of h(x).\n\n(e) Find x when j⁻¹(x) = 4.\n\n(f) Simplify j⁻¹j(x).',
    marks: 12,
    hints: [
      'f(2) means substitute x = 2 into f(x)',
      'gf(2) means first find f(2), then apply g to that result',
      'For inverse: let y = f(x), swap x and y, solve for y',
      'hf(x) = h(f(x)) = h(3x − 2) = (3x − 2)² + 1',
      'Derivative of x²: d/dx(x²) = 2x',
      'j⁻¹(x) = 4 means j(4) = x, so x = 3⁴ = 81',
      'j⁻¹j(x) = x for any function with inverse'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) f(2)', key: 'a1', marks: 1 },
      { label: '(a)(ii) g(2)', key: 'a2', marks: 1 },
      { label: '(a)(iii) gf(2)', key: 'a3', marks: 1 },
      { label: '(b) f⁻¹(x) = ', key: 'b', marks: 2 },
      { label: '(c) hf(x) = ', key: 'c', marks: 3 },
      { label: '(d) h\'(x) = ', key: 'd', marks: 1 },
      { label: '(e) x when j⁻¹(x) = 4', key: 'e', marks: 1 },
      { label: '(f) j⁻¹j(x) = ', key: 'f', marks: 1 }
    ],
    answer: {
      a1: '4',
      a2: '3',
      a3: '13',
      b: '(x+2)/3',
      c: '9x² - 12x + 5',
      d: '2x',
      e: '81',
      f: 'x'
    }
  },

  // ========== Question 11 - Sequences ==========
  'pp_0580_s21_q11': {
    id: 'pp_0580_s21_q11',
    questionNumber: '11',
    title: 'Sequences',
    question: '(a) These are the first four terms of a sequence:\n11, 7, 3, −1\n\n(i) Write down the next term.\n(ii) Write down the term to term rule for this sequence.\n(iii) Find the nth term of this sequence.\n\n(b) The nth term of a different sequence is 2n/(n+1).\n(i) Find the difference between the 5th term and the 6th term of this sequence.\nGive your answer as a fraction.\n(ii) Is 3/8 a term in this sequence?\nShow how you decide.',
    marks: 10,
    hints: [
      'Find the common difference: 7 − 11 = −4',
      'Term to term rule describes how to get from one term to the next',
      'nth term of arithmetic sequence: a + (n−1)d where a = first term, d = common difference',
      'For 2n/(n+1): 5th term when n=5, 6th term when n=6',
      'To check if 3/8 is a term: solve 2n/(n+1) = 3/8',
      'If n is a positive integer, 3/8 is a term; if not, it isn\'t'
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Next term', key: 'a1', marks: 1 },
      { label: '(a)(ii) Term to term rule', key: 'a2', marks: 1 },
      { label: '(a)(iii) nth term', key: 'a3', marks: 2 },
      { label: '(b)(i) Difference (fraction)', key: 'b1', marks: 2 },
      { label: '(b)(ii) Is 3/8 a term? (Yes/No)', key: 'b2a', marks: 1 },
      { label: '(b)(ii) Reason', key: 'b2b', marks: 2 }
    ],
    answer: {
      a1: '-5',
      a2: 'Subtract 4',
      a3: '15 - 4n',
      b1: '1/21',
      b2a: 'No',
      b2b: 'n = 0.6 which is not a positive integer'
    }
  }
};

// Section definitions for 0580/43 2021
export const sections0580_43_2021: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Ratio, percentages & compound growth', questionId: 'pp_0580_s21_q1' },
  { id: 'q2', title: 'Q2: Algebra: Substitution & Factorising', questionId: 'pp_0580_s21_q2' },
  { id: 'q3', title: 'Q3: Statistics: Averages & Cumulative Frequency', questionId: 'pp_0580_s21_q3' },
  { id: 'q4', title: 'Q4: Coordinates & Vectors', questionId: 'pp_0580_s21_q4' },
  { id: 'q5', title: 'Q5: Simultaneous Equations', questionId: 'pp_0580_s21_q5' },
  { id: 'q6', title: 'Q6: Venn Diagrams & Probability', questionId: 'pp_0580_s21_q6' },
  { id: 'q7', title: 'Q7: Inequalities & Quadratics', questionId: 'pp_0580_s21_q7' },
  { id: 'q8', title: 'Q8: Surface Area & Volume', questionId: 'pp_0580_s21_q8' },
  { id: 'q9', title: 'Q9: Trigonometry & 3D Geometry', questionId: 'pp_0580_s21_q9' },
  { id: 'q10', title: 'Q10: Functions', questionId: 'pp_0580_s21_q10' },
  { id: 'q11', title: 'Q11: Sequences', questionId: 'pp_0580_s21_q11' }
];
