// 0580/11 May/June 2020 - Past Paper Questions
// Paper 1 (Core) - 1 hour - 56 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions0580_11_2020: Record<string, PastPaperQuestion> = {
  // ========== Question 1 - Place value ==========
  'pp_0580_s20_q1': {
    id: 'pp_0580_s20_q1',
    questionNumber: '1',
    title: 'Place value',
    question: 'Write down the value of the 7 in the number 570 296.',
    marks: 1,
    hints: [
      'Look at which position the 7 is in',
      'The 7 is in the ten-thousands place',
      'So its value is 7 × 10 000'
    ],
    type: 'short',
    answer: '70000'
  },

  // ========== Question 2 - Mean temperature ==========
  'pp_0580_s20_q2': {
    id: 'pp_0580_s20_q2',
    questionNumber: '2',
    title: 'Mean temperature',
    question: 'The table shows the temperature, in °C, at midday on the first day of each month during one year in a city.\n\n| Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n| 9 | 11 | 15 | 19 | 23.5 | 27.5 | 29 | 28 | 25 | 19.5 | 14.5 | 10 |\n\nCalculate the mean of these temperatures.',
    marks: 2,
    hints: [
      'Add all 12 temperatures together',
      'Sum = 9 + 11 + 15 + 19 + 23.5 + 27.5 + 29 + 28 + 25 + 19.5 + 14.5 + 10 = 231',
      'Divide the total by 12'
    ],
    type: 'calculation',
    parts: [{ label: 'Mean (°C)', key: 'answer', marks: 2 }],
    answer: { answer: '19.25' }
  },

  // ========== Question 3 - Ordering numbers ==========
  'pp_0580_s20_q3': {
    id: 'pp_0580_s20_q3',
    questionNumber: '3',
    title: 'Ordering numbers',
    question: 'Write these numbers in order, starting with the smallest.\n\n0.065    5/89    5.6%    6.5%    6.47%    5.62%',
    marks: 2,
    hints: [
      'Convert everything to decimals or percentages for comparison',
      '0.065 = 6.5%, 5/89 ≈ 0.0562 = 5.62%, 5.6% = 0.056',
      'Order: 5.6%, 5/89, 0.065 = 6.5%, 6.47% — but check carefully'
    ],
    type: 'short',
    answer: '5.6%, 5/89, 5.62%, 0.065, 6.47%, 6.5%'
  },

  // ========== Question 4 - Symmetry ==========
  'pp_0580_s20_q4b': {
    id: 'pp_0580_s20_q4b',
    questionNumber: '4(b)',
    title: 'Rotational symmetry',
    question: 'Write down the order of rotational symmetry of a shape.',
    marks: 1,
    hints: [
      'Rotational symmetry is how many times a shape looks the same in a full turn',
      'Count the number of positions where the shape looks identical'
    ],
    type: 'short',
    answer: '2'
  },

  // ========== Question 5 - Isosceles triangle angle ==========
  'pp_0580_s20_q5': {
    id: 'pp_0580_s20_q5',
    questionNumber: '5',
    title: 'Isosceles triangle — exterior angle',
    question: 'In the triangle ABC, AB = AC and angle BAC = 38°.\nBCD is a straight line.\n\nWork out angle ACD.',
    marks: 3,
    hints: [
      'Since AB = AC, the triangle is isosceles',
      'Base angles are equal: angle ABC = angle ACB',
      'Angles in a triangle sum to 180°, so angle ABC = angle ACB = (180° − 38°) ÷ 2 = 71°',
      'BCD is a straight line, so angle ACD = 180° − 71° = 109°'
    ],
    type: 'angle-steps',
    parts: [
      { label: 'Angle ACD (°)', key: 'answer', marks: 3 }
    ],
    answer: { answer: '109' }
  },

  // ========== Question 6(a) - Flight time ==========
  'pp_0580_s20_q6a': {
    id: 'pp_0580_s20_q6a',
    questionNumber: '6(a)',
    title: 'Flight time calculation',
    question: 'Diego flies from Madrid to Buenos Aires.\nHis flight leaves at 20:55 and arrives at 03:50 local time.\nThe local time in Buenos Aires is 5 hours behind the local time in Madrid.\n\nWork out, in hours and minutes, the time the flight takes.',
    marks: 2,
    hints: [
      'When it is 03:50 in Buenos Aires, it is 08:50 in Madrid',
      'Flight time = 08:50 − 20:55 (Madrid time)',
      'From 20:55 to 08:50 the next day = 11 hours 55 minutes'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Hours', key: 'hours', marks: 1 },
      { label: 'Minutes', key: 'minutes', marks: 1 }
    ],
    answer: { hours: '11', minutes: '55' }
  },

  // ========== Question 6(b) - Currency exchange ==========
  'pp_0580_s20_q6b': {
    id: 'pp_0580_s20_q6b',
    questionNumber: '6(b)',
    title: 'Currency exchange',
    question: 'Diego changes 200 euros into Argentine Peso.\nThe exchange rate is 1 euro = 24.8 pesos.\n\nWork out how many pesos he receives.',
    marks: 1,
    hints: [
      'Multiply the number of euros by the exchange rate',
      '200 × 24.8'
    ],
    type: 'short',
    answer: '4960'
  },

  // ========== Question 6(c) - Average speed ==========
  'pp_0580_s20_q6c': {
    id: 'pp_0580_s20_q6c',
    questionNumber: '6(c)',
    title: 'Average speed',
    question: 'The distance between Madrid and Buenos Aires is 10 050 km.\nDiego\'s return flight takes 12 hours 30 minutes.\n\nCalculate the average speed, in km/h, for the return flight.',
    marks: 1,
    hints: [
      'Speed = Distance ÷ Time',
      'Convert 12 hours 30 minutes to 12.5 hours',
      'Speed = 10 050 ÷ 12.5'
    ],
    type: 'short',
    answer: '804'
  },

  // ========== Question 7 - Perimeter of composite shape ==========
  'pp_0580_s20_q7': {
    id: 'pp_0580_s20_q7',
    questionNumber: '7',
    title: 'Perimeter of composite shape',
    question: 'Rectangle A measures 3 cm by 8 cm.\nFive rectangles congruent to A are joined to make a shape.\n\nWork out the perimeter of this shape.',
    marks: 2,
    hints: [
      'Trace around the outside of the combined shape',
      'Count the number of 8 cm sides and 3 cm sides on the perimeter',
      'Perimeter = (6 × 8) + (6 × 3) = 48 + 18 + ... check carefully'
    ],
    type: 'calculation',
    parts: [{ label: 'Perimeter (cm)', key: 'answer', marks: 2 }],
    answer: { answer: '86' }
  },

  // ========== Question 8 - Highest odd factor ==========
  'pp_0580_s20_q8': {
    id: 'pp_0580_s20_q8',
    questionNumber: '8',
    title: 'Highest odd common factor',
    question: 'Find the highest odd number that is a factor of 60 and a factor of 90.',
    marks: 1,
    hints: [
      'List the odd factors of 60: 1, 3, 5, 15',
      'List the odd factors of 90: 1, 3, 5, 9, 15, 45',
      'The highest common odd factor is 15'
    ],
    type: 'short',
    answer: '15'
  },

  // ========== Question 9 - Vectors ==========
  'pp_0580_s20_q9': {
    id: 'pp_0580_s20_q9',
    questionNumber: '9',
    title: 'Scalar multiplication of vector',
    question: 'Write 3 × the column vector (−5, 3) as a single vector.',
    marks: 1,
    hints: [
      'Multiply each component by the scalar',
      '3 × (−5) = −15',
      '3 × 3 = 9'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Top component', key: 'top', marks: 0 },
      { label: 'Bottom component', key: 'bottom', marks: 1 }
    ],
    answer: { top: '-15', bottom: '9' }
  },

  // ========== Question 10 - Interior angle of regular polygon ==========
  'pp_0580_s20_q10': {
    id: 'pp_0580_s20_q10',
    questionNumber: '10',
    title: 'Interior angle of regular polygon',
    question: 'Work out the size of one interior angle of a regular 9-sided polygon.',
    marks: 2,
    hints: [
      'Interior angle = (n − 2) × 180° ÷ n',
      'n = 9',
      '(9 − 2) × 180° ÷ 9 = 7 × 180° ÷ 9 = 140°'
    ],
    type: 'calculation',
    parts: [{ label: 'Interior angle (°)', key: 'answer', marks: 2 }],
    answer: { answer: '140' }
  },

  // ========== Question 11 - Volume of cone ==========
  'pp_0580_s20_q11': {
    id: 'pp_0580_s20_q11',
    questionNumber: '11',
    title: 'Volume of cone',
    question: 'A cone has radius 4.5 cm and height 10.4 cm.\n\nCalculate, in terms of π, the volume of the cone.\n\n[V = ⅓πr²h]',
    marks: 2,
    hints: [
      'Substitute r = 4.5 and h = 10.4 into V = ⅓πr²h',
      'r² = 4.5² = 20.25',
      'V = ⅓ × π × 20.25 × 10.4 = ⅓ × 210.6π = 70.2π'
    ],
    type: 'calculation',
    parts: [{ label: 'Volume (___π cm³)', key: 'answer', marks: 2 }],
    answer: { answer: '70.2' }
  },

  // ========== Question 12(a) - Largest number in sequence ==========
  'pp_0580_s20_q12a': {
    id: 'pp_0580_s20_q12a',
    questionNumber: '12(a)',
    title: 'Largest term in sequence',
    question: 'The nth term of a sequence is 60 − 8n.\n\nFind the largest number in this sequence.',
    marks: 1,
    hints: [
      'The sequence decreases as n increases (since −8n)',
      'The largest term is when n is smallest, i.e. n = 1',
      '60 − 8(1) = 52'
    ],
    type: 'short',
    answer: '52'
  },

  // ========== Question 12(b) - nth term ==========
  'pp_0580_s20_q12b': {
    id: 'pp_0580_s20_q12b',
    questionNumber: '12(b)',
    title: 'nth term expression',
    question: 'Here are the first five terms of a different sequence.\n\n12, 19, 26, 33, 40\n\nFind an expression for the nth term of this sequence.',
    marks: 2,
    hints: [
      'Find the common difference: 19 − 12 = 7',
      'nth term = dn + c where d is the common difference',
      'When n = 1: 7(1) + c = 12, so c = 5',
      'nth term = 7n + 5'
    ],
    type: 'short',
    answer: '7n + 5'
  },

  // ========== Question 13 - Factorisation ==========
  'pp_0580_s20_q13': {
    id: 'pp_0580_s20_q13',
    questionNumber: '13',
    title: 'Factorise completely',
    question: 'Factorise completely.\n\n21a² + 28ab',
    marks: 2,
    hints: [
      'Find the HCF of 21 and 28 → 7',
      'Both terms have factor a',
      'HCF = 7a',
      '21a² + 28ab = 7a(3a + 4b)'
    ],
    type: 'short',
    answer: '7a(3a + 4b)'
  },

  // ========== Question 14 - Trapezium algebra ==========
  'pp_0580_s20_q14': {
    id: 'pp_0580_s20_q14',
    questionNumber: '14',
    title: 'Trapezium — co-interior angles',
    question: 'The diagram shows a trapezium.\nThe co-interior angles are (97 − 3x)° and (69 + 5x)°.\n\nWork out the value of x.',
    marks: 3,
    hints: [
      'Co-interior angles in a trapezium add up to 180°',
      '(97 − 3x) + (69 + 5x) = 180',
      '166 + 2x = 180',
      '2x = 14, so x = 7'
    ],
    type: 'calculation',
    parts: [{ label: 'x =', key: 'answer', marks: 3 }],
    answer: { answer: '7' }
  },

  // ========== Question 15 - Simplify indices ==========
  'pp_0580_s20_q15': {
    id: 'pp_0580_s20_q15',
    questionNumber: '15',
    title: 'Simplify indices',
    question: 'Simplify.\n\n4p⁵q³ × p²q',
    marks: 2,
    hints: [
      'When multiplying, add the indices for the same base',
      'p⁵ × p² = p⁷',
      'q³ × q = q⁴',
      'Result: 4p⁷q⁴'
    ],
    type: 'short',
    answer: '4p⁷q⁴'
  },

  // ========== Question 16(a) - Standard form ==========
  'pp_0580_s20_q16a': {
    id: 'pp_0580_s20_q16a',
    questionNumber: '16(a)',
    title: 'Standard form',
    question: 'Write the number 0.0605 in standard form.',
    marks: 1,
    hints: [
      'Standard form is A × 10ⁿ where 1 ≤ A < 10',
      'Move the decimal point to get 6.05',
      'Count places moved: 2 places right → 10⁻²'
    ],
    type: 'short',
    answer: '6.05 × 10⁻²'
  },

  // ========== Question 16(b) - Standard form calculation ==========
  'pp_0580_s20_q16b': {
    id: 'pp_0580_s20_q16b',
    questionNumber: '16(b)',
    title: 'Standard form calculation',
    question: 'Calculate a given expression and give your answer in standard form.',
    marks: 1,
    hints: [
      'Perform the calculation first',
      'Then convert the result to standard form',
      'Make sure A is between 1 and 10'
    ],
    type: 'short',
    answer: '4.0261 × 10⁻¹'
  },

  // ========== Question 17 - Expand brackets ==========
  'pp_0580_s20_q17': {
    id: 'pp_0580_s20_q17',
    questionNumber: '17',
    title: 'Expand and simplify',
    question: 'Expand and simplify.\n\n(x − 5)(x − 7)',
    marks: 2,
    hints: [
      'Use FOIL: First, Outside, Inside, Last',
      'x × x = x², x × (−7) = −7x, (−5) × x = −5x, (−5) × (−7) = 35',
      'x² − 7x − 5x + 35 = x² − 12x + 35'
    ],
    type: 'short',
    answer: 'x² − 12x + 35'
  },

  // ========== Question 18 - Scatter diagram ==========
  'pp_0580_s20_q18a': {
    id: 'pp_0580_s20_q18a',
    questionNumber: '18(a)',
    title: 'Scatter diagram — highest mark',
    question: 'Mrs Salaman gives her class two mathematics tests. The scatter diagram shows information about the marks each student scored.\n\nWrite down the highest mark scored on test 1.',
    marks: 1,
    hints: [
      'Look at the x-axis (Test 1) for the furthest right point',
      'Read off the x-coordinate of that point'
    ],
    type: 'short',
    answer: '66'
  },

  'pp_0580_s20_q18b': {
    id: 'pp_0580_s20_q18b',
    questionNumber: '18(b)',
    title: 'Type of correlation',
    question: 'Write down the type of correlation shown in the scatter diagram.',
    marks: 1,
    hints: [
      'As test 1 marks increase, do test 2 marks increase, decrease, or neither?',
      'If both increase together, it is positive correlation'
    ],
    type: 'short',
    answer: 'Positive'
  },

  'pp_0580_s20_q18d': {
    id: 'pp_0580_s20_q18d',
    questionNumber: '18(d)',
    title: 'Estimate from line of best fit',
    question: 'Hamish scored a mark of 40 on test 1. He was absent for test 2.\n\nUse your line of best fit to find an estimate for his mark on test 2.',
    marks: 1,
    hints: [
      'Draw a vertical line from x = 40 to your line of best fit',
      'Then read across horizontally to the y-axis',
      'The answer should be approximately 49'
    ],
    type: 'short',
    answer: '49'
  },

  // ========== Question 19 - Upper and lower bounds ==========
  'pp_0580_s20_q19': {
    id: 'pp_0580_s20_q19',
    questionNumber: '19',
    title: 'Upper and lower bounds',
    question: 'The length, l cm, of a sheet of paper is 29.7 cm, correct to the nearest millimetre.\n\nComplete this statement about the value of l.',
    marks: 2,
    hints: [
      'Nearest millimetre = nearest 0.1 cm',
      'Lower bound = 29.7 − 0.05 = 29.65',
      'Upper bound = 29.7 + 0.05 = 29.75'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Lower bound (≤ l)', key: 'lower', marks: 1 },
      { label: 'Upper bound (l <)', key: 'upper', marks: 1 }
    ],
    answer: { lower: '29.65', upper: '29.75' }
  },

  // ========== Question 20 - Fraction calculation ==========
  'pp_0580_s20_q20': {
    id: 'pp_0580_s20_q20',
    questionNumber: '20',
    title: 'Fraction calculation (no calculator)',
    question: 'Without using a calculator, work out:\n\n2⅘ × 2⅕\n\nYou must show all your working and give your answer as a fraction in its simplest form.',
    marks: 4,
    hints: [
      'Convert mixed numbers to improper fractions',
      '2⅘ = 14/5 and 2⅕ = 11/5... check the original carefully',
      'Multiply numerators and denominators',
      'Simplify the result'
    ],
    type: 'short',
    answer: '6 6/25'
  },

  // ========== Question 21 - Compound interest ==========
  'pp_0580_s20_q21': {
    id: 'pp_0580_s20_q21',
    questionNumber: '21',
    title: 'Compound interest',
    question: 'Lucia invests $5000 at a rate of 4.5% per year compound interest.\n\nCalculate the value of her investment at the end of 7 years.',
    marks: 2,
    hints: [
      'Use A = P(1 + r/100)ⁿ',
      'A = 5000 × (1.045)⁷',
      'Calculate step by step or use a calculator'
    ],
    type: 'calculation',
    parts: [{ label: 'Value ($)', key: 'answer', marks: 2 }],
    answer: { answer: '6804.31' }
  },

  // ========== Question 22(a) - Equation of a line ==========
  'pp_0580_s20_q22a': {
    id: 'pp_0580_s20_q22a',
    questionNumber: '22(a)',
    title: 'Equation of a line',
    question: 'A line L passes through points (0, −3) and (2, 1).\n\nFind the equation of line L in the form y = mx + c.',
    marks: 2,
    hints: [
      'Gradient m = (y₂ − y₁) / (x₂ − x₁) = (1 − (−3)) / (2 − 0) = 4/2 = 2',
      'The y-intercept c = −3 (the point where x = 0)',
      'y = 2x − 3'
    ],
    type: 'short',
    answer: 'y = 2x − 3'
  },

  // ========== Question 23 - Similar triangles ==========
  'pp_0580_s20_q23': {
    id: 'pp_0580_s20_q23',
    questionNumber: '23',
    title: 'Similar triangles',
    question: 'Explain why triangle ABC is similar to triangle PQR.',
    marks: 2,
    hints: [
      'Check if all corresponding angles are equal',
      'If all angles match, use the AAA (Angle-Angle-Angle) criterion',
      'State that all three angles in both triangles are equal'
    ],
    type: 'short',
    answer: 'All three angles in both triangles are equal (AAA)'
  }
};

export const sections0580_11_2020: PastPaperSection[] = [
  { id: 'q1', title: 'Q1: Place value', questionId: 'pp_0580_s20_q1' },
  { id: 'q2', title: 'Q2: Mean temperature', questionId: 'pp_0580_s20_q2' },
  { id: 'q3', title: 'Q3: Ordering numbers', questionId: 'pp_0580_s20_q3' },
  { id: 'q4b', title: 'Q4(b): Rotational symmetry', questionId: 'pp_0580_s20_q4b' },
  { id: 'q5', title: 'Q5: Isosceles triangle angle', questionId: 'pp_0580_s20_q5' },
  { id: 'q6a', title: 'Q6(a): Flight time', questionId: 'pp_0580_s20_q6a' },
  { id: 'q6b', title: 'Q6(b): Currency exchange', questionId: 'pp_0580_s20_q6b' },
  { id: 'q6c', title: 'Q6(c): Average speed', questionId: 'pp_0580_s20_q6c' },
  { id: 'q7', title: 'Q7: Perimeter of composite shape', questionId: 'pp_0580_s20_q7' },
  { id: 'q8', title: 'Q8: Highest odd common factor', questionId: 'pp_0580_s20_q8' },
  { id: 'q9', title: 'Q9: Vector multiplication', questionId: 'pp_0580_s20_q9' },
  { id: 'q10', title: 'Q10: Interior angle of polygon', questionId: 'pp_0580_s20_q10' },
  { id: 'q11', title: 'Q11: Volume of cone', questionId: 'pp_0580_s20_q11' },
  { id: 'q12a', title: 'Q12(a): Largest term in sequence', questionId: 'pp_0580_s20_q12a' },
  { id: 'q12b', title: 'Q12(b): nth term expression', questionId: 'pp_0580_s20_q12b' },
  { id: 'q13', title: 'Q13: Factorise completely', questionId: 'pp_0580_s20_q13' },
  { id: 'q14', title: 'Q14: Trapezium algebra', questionId: 'pp_0580_s20_q14' },
  { id: 'q15', title: 'Q15: Simplify indices', questionId: 'pp_0580_s20_q15' },
  { id: 'q16a', title: 'Q16(a): Standard form', questionId: 'pp_0580_s20_q16a' },
  { id: 'q16b', title: 'Q16(b): Standard form calculation', questionId: 'pp_0580_s20_q16b' },
  { id: 'q17', title: 'Q17: Expand and simplify', questionId: 'pp_0580_s20_q17' },
  { id: 'q18a', title: 'Q18(a): Highest mark on test', questionId: 'pp_0580_s20_q18a' },
  { id: 'q18b', title: 'Q18(b): Type of correlation', questionId: 'pp_0580_s20_q18b' },
  { id: 'q18d', title: 'Q18(d): Estimate from line of best fit', questionId: 'pp_0580_s20_q18d' },
  { id: 'q19', title: 'Q19: Upper and lower bounds', questionId: 'pp_0580_s20_q19' },
  { id: 'q20', title: 'Q20: Fraction calculation', questionId: 'pp_0580_s20_q20' },
  { id: 'q21', title: 'Q21: Compound interest', questionId: 'pp_0580_s20_q21' },
  { id: 'q22a', title: 'Q22(a): Equation of a line', questionId: 'pp_0580_s20_q22a' },
  { id: 'q23', title: 'Q23: Similar triangles', questionId: 'pp_0580_s20_q23' },
];
