// 4024/11 October/November 2023 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2023ON: Record<string, PastPaperQuestion> = {
  // ========== Question 1 ==========
  'pp_4024_on23_11_q1': {
    id: 'pp_4024_on23_11_q1', questionNumber: '1', title: 'Order of operations and multiplication',
    question: '(a) Work out 6 + 4 ÷ 2.\n(b) Work out 40 × 0.3.',
    marks: 2,
    hints: ['(a) Division before addition: 4 ÷ 2 = 2, then 6 + 2 = 8', '(b) 40 × 0.3 = 12'],
    type: 'multi-part',
    parts: [{ label: '(a) 6 + 4 ÷ 2', key: 'a', marks: 1 }, { label: '(b) 40 × 0.3', key: 'b', marks: 1 }],
    answer: { a: '8', b: '12' },
    markingCriteria: { a: 'B1', b: 'B1' }
  },

  // ========== Question 2 ==========
  'pp_4024_on23_11_q2': {
    id: 'pp_4024_on23_11_q2', questionNumber: '2', title: 'Ordering fractions and percentages',
    question: 'Write these numbers in order of size, starting with the smallest: 1/5, 3/25, 13%, 0.1.',
    marks: 2,
    hints: ['Convert to decimals: 1/5 = 0.2, 3/25 = 0.12, 13% = 0.13, 0.1', 'Order: 0.1, 3/25, 13%, 1/5'],
    type: 'multi-part',
    parts: [
      { label: '1st (smallest)', key: 'p1', marks: 0 },
      { label: '2nd', key: 'p2', marks: 0 },
      { label: '3rd', key: 'p3', marks: 0 },
      { label: '4th (largest)', key: 'p4', marks: 2 }
    ],
    answer: { p1: '0.1', p2: '3/25', p3: '13%', p4: '1/5' },
    markingCriteria: { _question: 'B2 for all four correct in order. B1 for three correct (when one is covered up) OR for correct order but reversed.' }
  },

  // ========== Question 3 ==========
  'pp_4024_on23_11_q3': {
    id: 'pp_4024_on23_11_q3', questionNumber: '3', title: 'Temperature calculations',
    question: '(a) Work out the temperature that is 20 degrees higher than −12 °C.\n(b) Work out the difference between −4 °C and 10 °C.',
    marks: 2,
    hints: ['(a) −12 + 20 = 8', '(b) 10 − (−4) = 14'],
    type: 'multi-part',
    parts: [{ label: '(a) Temperature (°C)', key: 'a', marks: 1 }, { label: '(b) Difference (°C)', key: 'b', marks: 1 }],
    answer: { a: '8', b: '14' },
    markingCriteria: { a: 'B1', b: 'B1' }
  },

  // ========== Question 4 ==========
  'pp_4024_on23_11_q4': {
    id: 'pp_4024_on23_11_q4', questionNumber: '4', title: 'Money calculation',
    question: 'Kasia buys 12 apples. Each apple costs 65 cents. Work out how much Kasia pays. Give your answer in dollars.',
    marks: 2,
    hints: ['12 × 65 = 780 cents', '780 cents = $7.80'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Total cents', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-14' }, { type: 'text', value: 'cents' }
      ]},
      { label: 'Convert', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-14' }, { type: 'text', value: '÷' }, { type: 'box', key: 's2_b', width: 'w-12' }, { type: 'text', value: '= $' }, { type: 'box', key: 's2_c', width: 'w-14' }
      ]}
    ],
    parts: [{ label: '$ Answer', key: 'answer', marks: 2 }],
    answer: {
      answer: '7.80',
      answer_s1_a: '12', answer_s1_b: '65', answer_s1_c: '780',
      answer_s2_a: '780', answer_s2_b: '100', answer_s2_c: '7.80'
    },
    markingCriteria: { answer: 'M1 for 12 × 65 or 780 seen. A1 for $7.80 (must have dollars or $ sign implied). Accept 7.8 only if working shows cents conversion.' }
  },


  // ========== Question 5 ==========
  'pp_4024_on23_11_q5': {
    id: 'pp_4024_on23_11_q5', questionNumber: '5', title: 'Bar chart statistics',
    question: 'Yasmin asks 20 people how many pets they own. The results are shown in the bar chart.\n(a) Find the range.\n(b) Find the fraction of the 20 people who own 3 pets.\n     Give your answer in its simplest form.',
    marks: 2,
    hints: ['(a) Range = highest value − lowest value of number of pets that have non-zero frequency', '(b) Read frequency for 3 pets from chart, write as fraction of 20 in simplest form'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: '', stepKey: 's1', elements: [
          { type: 'text', value: 'Range =' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-12' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_ans', width: 'w-12' }
        ]}
      ],
      'b': [
        { label: '', stepKey: 's1', elements: [
          { type: 'text', value: 'Fraction =' },
          { type: 'box', key: 's1_num', width: 'w-10' },
          { type: 'text', value: '/' },
          { type: 'box', key: 's1_den', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Range', key: 'a', marks: 1 }, { label: '(b) Fraction (simplest form)', key: 'b', marks: 1 }],
    answer: { a: '4', b: '1/4', a_s1_a: '4', a_s1_b: '0', a_s1_ans: '4', b_s1_num: '1', b_s1_den: '4' },
    markingCriteria: { a: 'B1', b: 'B1 for 5/20 or equivalent fraction in simplest form 1/4' }
  },

  // ========== Question 6 ==========
  'pp_4024_on23_11_q6': {
    id: 'pp_4024_on23_11_q6', questionNumber: '6', title: 'Parallel lines and angles',
    question: 'A straight line crosses two parallel lines. One angle is 110°.\n(a) Find the value of x.\n(b) Find the value of y.',
    marks: 2,
    hints: ['(a) Co-interior angles sum to 180°', '(b) Corresponding or alternate angles'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Co-interior', stepKey: 's1', elements: [
          { type: 'text', value: 'x =' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-12' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'x =' }, { type: 'box', key: 's2', width: 'w-12' }
        ]}
      ],
      'b': [
        { label: 'Straight line', stepKey: 's1', elements: [
          { type: 'text', value: 'y =' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-12' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'y =' }, { type: 'box', key: 's2', width: 'w-12' }
        ]}
      ]
    },
    parts: [{ label: '(a) x', key: 'a', marks: 1 }, { label: '(b) y', key: 'b', marks: 1 }],
    answer: {
      a: '70', b: '110',
      a_s1_a: '180', a_s1_b: '110', a_s2: '70',
      b_s1_a: '180', b_s1_b: '70', b_s2: '110'
    },
    markingCriteria: { a: 'B1 for 70', b: 'B1 for 110' }
  },

  // ========== Question 7 ==========
  'pp_4024_on23_11_q7': {
    id: 'pp_4024_on23_11_q7', questionNumber: '7', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of',
    questionFraction: { numerator: '53.7', denominator: '2.61 + 7.48' },
    marks: 2,
    hints: ['53.7 ≈ 50, 2.61 ≈ 3, 7.48 ≈ 7', '50/(3 + 7) = 50/10 = 5'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Round & Set up', stepKey: 's1', elements: [
        { type: 'fraction', 
          numElements: [{ type: 'box', key: 's1_a', width: 'w-12' }],
          denElements: [{ type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: ' + ' }, { type: 'box', key: 's1_c', width: 'w-10' }]
        }
      ]},
      { label: 'Simplify', stepKey: 's2', elements: [
        { type: 'text', value: '=' },
        { type: 'fraction',
          numElements: [{ type: 'box', key: 's2_a', width: 'w-12' }],
          denElements: [{ type: 'box', key: 's2_b', width: 'w-12' }]
        }
      ]},
      { label: 'Answer', stepKey: 's3', elements: [
        { type: 'text', value: '=' }, { type: 'box', key: 's3', width: 'w-12' }
      ]}
    ],
    parts: [{ label: 'Estimate', key: 'answer', marks: 2 }],
    answer: {
      answer: '5',
      answer_s1_a: '50', answer_s1_b: '3', answer_s1_c: '7',
      answer_s2_a: '50', answer_s2_b: '10',
      answer_s3: '5'
    },
    markingCriteria: { answer: 'M1 for correctly rounding all three values to 1 s.f. (50, 3, 7). A1 for 5.' }
  },

  // ========== Question 8 ==========
  'pp_4024_on23_11_q8': {
    id: 'pp_4024_on23_11_q8', questionNumber: '8', title: 'Unit conversions',
    question: '(a) Convert 78 mm to cm.\n(b) Convert 3 m² to cm².',
    marks: 2,
    hints: ['(a) 1 cm = 10 mm, so 78 ÷ 10 = 7.8', '(b) 1 m = 100 cm, so 1 m² = 10000 cm², 3 m² = 30000'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Divide', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '÷' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-12' }, { type: 'text', value: 'cm' }
        ]}
      ],
      'b': [
        { label: '1 m = ? cm', stepKey: 's1', elements: [
          { type: 'text', value: '1 m² = (' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: ')² cm²' }
        ]},
        { label: 'Calculate', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's2_b', width: 'w-14' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_c', width: 'w-16' }, { type: 'text', value: 'cm²' }
        ]}
      ]
    },
    parts: [{ label: '(a) cm', key: 'a', marks: 1 }, { label: '(b) cm²', key: 'b', marks: 1 }],
    answer: {
      a: '7.8', b: '30000',
      a_s1_a: '78', a_s1_b: '10', a_s1_c: '7.8',
      b_s1_a: '100',
      b_s2_a: '3', b_s2_b: '10000', b_s2_c: '30000'
    },
    markingCriteria: { a: 'B1', b: 'B1' }
  },

  // ========== Question 9 ==========
  'pp_4024_on23_11_q9': {
    id: 'pp_4024_on23_11_q9', questionNumber: '9', title: 'Scatter diagram',
    question: '(a) Write down the type of correlation shown on the scatter diagram.\n(b) By drawing a line of best fit, estimate the time taken by a person aged 50.',
    marks: 3,
    hints: ['(a) Look at the trend of the points', '(b) Draw a line through the data and read off at age 50'],
    type: 'multi-part',
    parts: [{ label: '(a) Correlation type', key: 'a', marks: 1 }, { label: '(b) Time (minutes)', key: 'b', marks: 2 }],
    answer: { a: 'Positive', b: '0.17' },
    markingCriteria: { a: 'B1 for Positive', b: 'B1 for correct line of best fit drawn. B1 ft for reading at age 50 from their line (accept 0.15 to 0.19).' }
  },

  // ========== Question 10 ==========
  'pp_4024_on23_11_q10': {
    id: 'pp_4024_on23_11_q10', questionNumber: '10', title: 'Polygon angles',
    question: '(a) Four exterior angles of a pentagon are 150°, 100°, 45° and 35°. Calculate the remaining exterior angle.\n(b) Calculate the interior angle of a regular decagon.',
    marks: 4,
    hints: ['(a) Exterior angles sum to 360°', '(b) Interior angle = 180(n−2)/n where n=10'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Sum given', stepKey: 's1', elements: [
          { type: 'text', value: '360 − (' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '+' },
          { type: 'box', key: 's1_b', width: 'w-12' }, { type: 'text', value: '+' },
          { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: '+' },
          { type: 'box', key: 's1_d', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Calculate', stepKey: 's2', elements: [
          { type: 'text', value: '= 360 −' }, { type: 'box', key: 's2_a', width: 'w-12' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_b', width: 'w-12' }
        ]}
      ],
      'b': [
        { label: 'Formula', stepKey: 's1', elements: [
          { type: 'text', value: '180 × (' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '− 2) /' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Calculate', stepKey: 's2', elements: [
          { type: 'text', value: '= 180 ×' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '/' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_c', width: 'w-12' }
        ]}
      ]
    },
    parts: [{ label: '(a) Remaining exterior angle', key: 'a', marks: 2 }, { label: '(b) Interior angle of decagon', key: 'b', marks: 2 }],
    answer: {
      a: '30', b: '144',
      a_s1_a: '150', a_s1_b: '100', a_s1_c: '45', a_s1_d: '35',
      a_s2_a: '330', a_s2_b: '30',
      b_s1_a: '10', b_s1_b: '10',
      b_s2_a: '8', b_s2_b: '10', b_s2_c: '144'
    },
    markingCriteria: { a: 'M1 for 360 − (150 + 100 + 45 + 35) or 360 − 330. A1 for 30.', b: 'M1 for 180(10−2)/10 or 180×8/10. A1 for 144.' }
  },

  // ========== Question 11 ==========
  'pp_4024_on23_11_q11': {
    id: 'pp_4024_on23_11_q11', questionNumber: '11', title: 'Powers and indices',
    question: '(a) Evaluate 4² + ³√27.\n(b) Evaluate 5⁻¹ × 5³.',
    marks: 3,
    hints: ['(a) 4² = 16, ³√27 = 3, 16 + 3 = 19', '(b) 5⁻¹ × 5³ = 5² = 25'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Evaluate each', stepKey: 's1', elements: [
          { type: 'text', value: '=' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: '=' }, { type: 'box', key: 's2', width: 'w-12' }
        ]}
      ],
      'b': [
        { label: 'Index law', stepKey: 's1', elements: [
          { type: 'text', value: '= 5^(' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Simplify', stepKey: 's2', elements: [
          { type: 'text', value: '= 5' }, { type: 'box', key: 's2_a', width: 'w-8' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_b', width: 'w-12' }
        ]}
      ]
    },
    parts: [{ label: '(a) 4² + ³√27', key: 'a', marks: 1 }, { label: '(b) 5⁻¹ × 5³', key: 'b', marks: 2 }],
    answer: {
      a: '19', b: '25',
      a_s1_a: '16', a_s1_b: '3', a_s2: '19',
      b_s1_a: '-1', b_s1_b: '3', b_s2_a: '²', b_s2_b: '25'
    },
    markingCriteria: { a: 'B1', b: 'M1 for 5^(−1+3) or 5². A1 for 25.' }
  },

  // ========== Question 12 ==========
  'pp_4024_on23_11_q12': {
    id: 'pp_4024_on23_11_q12', questionNumber: '12', title: 'Scale drawing and bearings',
    question: 'A scale drawing shows boats A and B. Scale is 1 : 20 000.\n(a) Find the actual distance of A from B in kilometres.\n(b) Construct the locus of points equidistant from A and B.\n(c) Mark position of ship S on bearing 105° from A and equidistant from A and B.',
    marks: 5,
    hints: ['(a) Measure distance in cm, multiply by 20000, convert to km', '(b) Perpendicular bisector of AB', '(c) Intersection of bisector and bearing line'],
    type: 'multi-part',
    parts: [
      { label: 'Map distance (cm)', key: 'map', marks: 0 },
      { label: '(a) Distance (km)', key: 'a', marks: 2 },
      { label: '(b) Construction', key: 'b', marks: 2 },
      { label: '(c) Position of S', key: 'c', marks: 1 }
    ],
    answer: { map: '9', a: '1.8', b: 'Perpendicular bisector', c: 'S marked correctly' },
    markingCriteria: { a: 'M1 for measurement ×20000 or ÷100000 seen. A1 for 1.8 km.', b: 'B1 for correct perpendicular bisector with arcs. B1 for line extending full width.', c: 'B1 for S at intersection of bisector and 105° bearing.' }
  },

  // ========== Question 13 ==========
  'pp_4024_on23_11_q13': {
    id: 'pp_4024_on23_11_q13', questionNumber: '13', title: 'Fraction division',
    question: 'Work out 1³⁄₅ ÷ 1²⁄₃.\nGive your answer as a fraction in its simplest form.',
    marks: 2,
    hints: ['Convert to improper: 8/5 ÷ 5/3', 'Flip and multiply: 8/5 × 3/5 = 24/25'],
    type: 'multi-part',
    fractionDivisionParts: ['answer'],
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: {
      answer: '24/25',
      answer_s1_n1: '8', answer_s1_n2: '3', answer_s1_d1: '5', answer_s1_d2: '5',
      answer_s1_rn: '24', answer_s1_rd: '25',
      answer_s2_n1: '24', answer_s2_gcd: '1', answer_s2_d1: '25', answer_s2_gcd2: '1',
      answer_s2_fn: '24', answer_s2_fd: '25'
    },
    markingCriteria: { answer: 'M1 for 8/5 × 3/5 or 8/5 ÷ 5/3 seen. A1 for 24/25.' }
  },

  // ========== Question 14 ==========
  'pp_4024_on23_11_q14': {
    id: 'pp_4024_on23_11_q14', questionNumber: '14', title: 'Prime factors and LCM',
    question: '(a) Write 36 as a product of its prime factors.\n(b) Bus A leaves every 36 minutes. Bus B leaves every 48 minutes. Both leave at 09:30. Find the next time they leave together.',
    marks: 5,
    hints: ['(a) 36 = 2² × 3²', '(b) LCM of 36 and 48 = 144 minutes = 2 hours 24 min', 'Next time = 09:30 + 2h24m = 11:54'],
    type: 'multi-part',
    equationSolveParts: ['b'],
    equationStages: [
      { label: 'Factors of 36', stepKey: 's1', elements: [
        { type: 'text', value: '36 =' }, { type: 'box', key: 's1_a', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's1_b', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's1_c', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's1_d', width: 'w-8' }
      ]},
      { label: 'Factors of 48', stepKey: 's2', elements: [
        { type: 'text', value: '48 =' }, { type: 'box', key: 's2_a', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's2_b', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's2_c', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's2_d', width: 'w-8' }, { type: 'text', value: '×' },
        { type: 'box', key: 's2_e', width: 'w-8' }
      ]},
      { label: 'LCM', stepKey: 's3', elements: [
        { type: 'text', value: 'LCM =' }, { type: 'box', key: 's3', width: 'w-16' }, { type: 'text', value: 'min' }
      ]},
      { label: 'Convert', stepKey: 's4', elements: [
        { type: 'text', value: '=' }, { type: 'box', key: 's4_a', width: 'w-10' }, { type: 'text', value: 'h' },
        { type: 'box', key: 's4_b', width: 'w-10' }, { type: 'text', value: 'min' }
      ]},
      { label: 'Add to 09:30', stepKey: 's5', elements: [
        { type: 'text', value: '09:30 +' }, { type: 'box', key: 's5_a', width: 'w-10' }, { type: 'text', value: 'h' },
        { type: 'box', key: 's5_b', width: 'w-10' }, { type: 'text', value: 'min =' },
        { type: 'box', key: 's5_c', width: 'w-16' }
      ]}
    ],
    parts: [
      { label: '(a) Prime factors of 36', key: 'a', marks: 2 },
      { label: '(b) Next time', key: 'b', marks: 3 }
    ],
    answer: {
      a: '2² × 3²', b: '11:54',
      b_s1_a: '2', b_s1_b: '2', b_s1_c: '3', b_s1_d: '3',
      b_s2_a: '2', b_s2_b: '2', b_s2_c: '2', b_s2_d: '2', b_s2_e: '3',
      b_s3: '144',
      b_s4_a: '2', b_s4_b: '24',
      b_s5_a: '2', b_s5_b: '24', b_s5_c: '11:54'
    },
    markingCriteria: { a: 'B1 for 2 × 2 × 3 × 3 or any correct factor tree. B1 for 2² × 3² in index form.', b: 'M1 for attempt at LCM using prime factors. A1 for 144. A1 for 11:54.' }
  },

  // ========== Question 15 ==========
  'pp_4024_on23_11_q15': {
    id: 'pp_4024_on23_11_q15', questionNumber: '15', title: 'Circle theorems with tangents',
    question: 'B, C and D are on a circle, centre O. AB and AC are tangents. Angle BAC = 38°.\n(a) Find angle ABC.\n(b) Find angle BOC.\n(c) Find angle BDC.',
    marks: 4,
    hints: ['(a) Tangent ⊥ radius: angle ABO = 90°; triangle ABO → angle BAO = 19°; angle ABC = 90 − 19 = 71', '(b) 360 − 38 − 90 − 90 = 142', '(c) Angle at centre = 2 × angle at circumference'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b', 'c'],
    equationStagesMap: {
      'a': [
        { label: 'Tangent property', stepKey: 's1', elements: [
          { type: 'text', value: 'ABO = 90°, BAO =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '/ 2 =' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'ABC =' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_c', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: 'Quadrilateral ABOC', stepKey: 's1', elements: [
          { type: 'text', value: 'BOC = 360 −' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '−' },
          { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_c', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'BOC =' }, { type: 'box', key: 's2', width: 'w-12' }
        ]}
      ],
      'c': [
        { label: 'Angle at circumference', stepKey: 's1', elements: [
          { type: 'text', value: 'BDC =' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '/ 2 =' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [
      { label: '(a) Angle ABC', key: 'a', marks: 1 },
      { label: '(b) Angle BOC', key: 'b', marks: 2 },
      { label: '(c) Angle BDC', key: 'c', marks: 1 }
    ],
    answer: {
      a: '71', b: '142', c: '71',
      a_s1_a: '38', a_s1_b: '19', a_s2_a: '90', a_s2_b: '19', a_s2_c: '71',
      b_s1_a: '38', b_s1_b: '90', b_s1_c: '90', b_s2: '142',
      c_s1_a: '142', c_s1_b: '71'
    },
    markingCriteria: { a: 'B1 for 71', b: 'M1 for 360 − 38 − 90 − 90 or equivalent. A1 for 142.', c: 'B1 ft for half their (b).' }
  },

  // ========== Question 16 ==========
  'pp_4024_on23_11_q16': {
    id: 'pp_4024_on23_11_q16', questionNumber: '16', title: 'Region defined by inequalities',
    question: 'The region R is defined by: 1 ≤ x ≤ 3, 2 ≤ y ≤ 3, y ≥ x/2 + 1. Find and label region R.',
    marks: 4,
    hints: ['Draw vertical lines x = 1, x = 3', 'Draw horizontal lines y = 2, y = 3', 'Draw line y = x/2 + 1 and shade above'],
    type: 'short', answer: 'Region R correctly identified',
    markingCriteria: { _question: 'B1 for x = 1. B1 for x = 3. B1 for y = 2 and y = 3. B1 for y = x/2 + 1 and R correctly labelled.' }
  },

  // ========== Question 17 ==========
  'pp_4024_on23_11_q17': {
    id: 'pp_4024_on23_11_q17', questionNumber: '17', title: 'Direct proportion',
    question: 'y is directly proportional to the square root of x. When x = 16, y = 2. Find y when x = 25.',
    marks: 2,
    hints: ['y = k√x', '2 = k√16 = 4k, so k = 0.5', 'y = 0.5√25 = 0.5 × 5 = 2.5'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Set up', stepKey: 's1', elements: [
        { type: 'text', value: 'y = k√x →' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '= k√' }, { type: 'box', key: 's1_b', width: 'w-10' }
      ]},
      { label: 'Find k', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '= k ×' }, { type: 'box', key: 's2_b', width: 'w-10' },
        { type: 'text', value: ', k =' }, { type: 'box', key: 's2_c', width: 'w-12' }
      ]},
      { label: 'Find y', stepKey: 's3', elements: [
        { type: 'text', value: 'y =' }, { type: 'box', key: 's3_a', width: 'w-12' }, { type: 'text', value: '× √' },
        { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's3_c', width: 'w-12' }
      ]}
    ],
    parts: [{ label: 'y =', key: 'answer', marks: 2 }],
    answer: {
      answer: '2.5',
      answer_s1_a: '2', answer_s1_b: '16',
      answer_s2_a: '2', answer_s2_b: '4', answer_s2_c: '0.5',
      answer_s3_a: '0.5', answer_s3_b: '25', answer_s3_c: '2.5'
    },
    markingCriteria: { answer: 'M1 for y = k√x and k = ½ or 0.5 seen. A1 for 2.5.' }
  },

  // ========== Question 18 ==========
  'pp_4024_on23_11_q18': {
    id: 'pp_4024_on23_11_q18', questionNumber: '18', title: 'Venn diagram',
    question: '(a) In a sports club of 40 members: 22 run (R), 24 cycle (C), 14 sail (S). 3 cycle and sail but not run, 9 run and cycle but not sail, 5 run and sail but not cycle, 6 run only. Complete the Venn diagram.\n(b) Use set notation to describe the shaded subset.',
    marks: 4,
    hints: ['(a) R∩C∩S = 22 − 6 − 9 − 5 = 2', 'C only = 24 − 9 − 2 − 3 = 10', 'S only = 14 − 5 − 2 − 3 = 4', 'Outside = 40 − (6+9+5+2+10+3+4) = 1'],
    type: 'multi-part',
    parts: [
      { label: 'R∩C∩S (all three)', key: 'rcs', marks: 0 },
      { label: 'C only', key: 'conly', marks: 0 },
      { label: 'S only', key: 'sonly', marks: 0 },
      { label: 'Outside', key: 'outside', marks: 0 },
      { label: '(a) Venn complete', key: 'a', marks: 3 },
      { label: "(b) Set notation", key: 'b', marks: 1 }
    ],
    answer: { rcs: '2', conly: '10', sonly: '4', outside: '1', a: 'done', b: "G ∩ H ∩ F'" },
    markingCriteria: { a: 'B1 for 2 in centre. B1 for 10 and 4 correct. B1 for 1 outside.', b: "B1 for (E ∩ F) ∩ G' or equivalent correct set notation." }
  },

  // ========== Question 19 ==========
  'pp_4024_on23_11_q19': {
    id: 'pp_4024_on23_11_q19', questionNumber: '19', title: 'Speed-time graph',
    question: '(a) Calculate the acceleration of the car in the first 10 seconds.\n(b) The car travels 700 m in T seconds. Find the value of T.',
    marks: 4,
    hints: ['(a) Acceleration = change in speed / time = 20/10', '(b) Area under graph = distance = 700'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Formula', stepKey: 's1', elements: [
          { type: 'text', value: 'a =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '/' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'a =' }, { type: 'box', key: 's2', width: 'w-12' }, { type: 'text', value: 'm/s²' }
        ]}
      ],
      'b': [
        { label: 'Area = distance', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-14' }, { type: 'text', value: '= ½ ×' },
          { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: '+' },
          { type: 'box', key: 's1_d', width: 'w-10' }, { type: 'text', value: '(T −' },
          { type: 'box', key: 's1_e', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Simplify', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-14' }, { type: 'text', value: '=' },
          { type: 'box', key: 's2_b', width: 'w-12' }, { type: 'text', value: '+ 20(T −' },
          { type: 'box', key: 's2_c', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Solve', stepKey: 's3', elements: [
          { type: 'text', value: 'T =' }, { type: 'box', key: 's3', width: 'w-12' }
        ]}
      ]
    },
    parts: [{ label: '(a) Acceleration (m/s²)', key: 'a', marks: 1 }, { label: '(b) T', key: 'b', marks: 3 }],
    answer: {
      a: '2', b: '40',
      a_s1_a: '20', a_s1_b: '10', a_s2: '2',
      b_s1_a: '700', b_s1_b: '10', b_s1_c: '20', b_s1_d: '20', b_s1_e: '10',
      b_s2_a: '700', b_s2_b: '100', b_s2_c: '10',
      b_s3: '40'
    },
    markingCriteria: { a: 'B1 for 2', b: 'M1 for area of triangle (½ × 10 × 20 = 100). M1 for 700 = 100 + 20(T − 10) or equivalent area equation. A1 for 40.' }
  },

  // ========== Question 20 ==========
  'pp_4024_on23_11_q20': {
    id: 'pp_4024_on23_11_q20', questionNumber: '20', title: 'Matrix operations',
    question: 'A = (−2, 1; 4, 3), B = (3, 2; −1, 1).\n(a) Find A⁻¹.\n(b) Find AB.',
    marks: 4,
    hints: ['(a) det = (−2)(3) − (1)(4) = −6−4 = −10', '(a) A⁻¹ = (1/−10)(3,−1;−4,−2)', '(b) AB: multiply row by column'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: '|A|', stepKey: 's1', elements: [
          { type: 'text', value: '|A| =' },
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '−' },
          { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_d', width: 'w-10' }
        ]},
        { label: 'det value', stepKey: 's2', elements: [
          { type: 'text', value: '=' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '−' },
          { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_c', width: 'w-12' }
        ]},
        { label: 'Adj A', stepKey: 's3', elements: [
          { type: 'text', value: 'Adj =' },
          { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: ',' },
          { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: ';' },
          { type: 'box', key: 's3_c', width: 'w-10' }, { type: 'text', value: ',' },
          { type: 'box', key: 's3_d', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: 'Row 1', stepKey: 's1', elements: [
          { type: 'text', value: '(' },
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: ') + (' },
          { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's1_d', width: 'w-10' }, { type: 'text', value: ') =' },
          { type: 'box', key: 's1_e', width: 'w-10' },
          { type: 'text', value: ', (' },
          { type: 'box', key: 's1_f', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's1_g', width: 'w-10' }, { type: 'text', value: ') + (' },
          { type: 'box', key: 's1_h', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's1_i', width: 'w-10' }, { type: 'text', value: ') =' },
          { type: 'box', key: 's1_j', width: 'w-10' }
        ]},
        { label: 'Row 2', stepKey: 's2', elements: [
          { type: 'text', value: '(' },
          { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: ') + (' },
          { type: 'box', key: 's2_c', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's2_d', width: 'w-10' }, { type: 'text', value: ') =' },
          { type: 'box', key: 's2_e', width: 'w-10' },
          { type: 'text', value: ', (' },
          { type: 'box', key: 's2_f', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's2_g', width: 'w-10' }, { type: 'text', value: ') + (' },
          { type: 'box', key: 's2_h', width: 'w-10' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's2_i', width: 'w-10' }, { type: 'text', value: ') =' },
          { type: 'box', key: 's2_j', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) A⁻¹', key: 'a', marks: 2 }, { label: '(b) AB', key: 'b', marks: 2 }],
    answer: {
      a: '(-1/10)(3,-1;-4,-2)', b: '(-7,-3;9,11)',
      a_s1_a: '-2', a_s1_b: '3', a_s1_c: '1', a_s1_d: '4',
      a_s2_a: '-6', a_s2_b: '4', a_s2_c: '-10',
      a_s3_a: '3', a_s3_b: '-1', a_s3_c: '-4', a_s3_d: '-2',
      b_s1_a: '-2', b_s1_b: '3', b_s1_c: '1', b_s1_d: '-1', b_s1_e: '-7',
      b_s1_f: '-2', b_s1_g: '2', b_s1_h: '1', b_s1_i: '1', b_s1_j: '-3',
      b_s2_a: '4', b_s2_b: '3', b_s2_c: '3', b_s2_d: '-1', b_s2_e: '9',
      b_s2_f: '4', b_s2_g: '2', b_s2_h: '3', b_s2_i: '1', b_s2_j: '11'
    },
    markingCriteria: { a: 'M1 for |A| = −10 or correct adjugate matrix. A1 for correct inverse (1/−10)(3,−1;−4,−2).', b: 'M1 for at least one correct element from multiplication. A1 for all four elements correct (−7,−3;9,11).' }
  },

  // ========== Question 21 ==========
  'pp_4024_on23_11_q21': {
    id: 'pp_4024_on23_11_q21', questionNumber: '21', title: 'Factorisation',
    question: '(a) Factorise 6a − 9.\n(b) Factorise 4b² − 25.\n(c) Simplify (2c² − 8c)/(2c² − 5c − 12).',
    marks: 5,
    hints: ['(a) 3(2a − 3)', '(b) (2b + 5)(2b − 5)', '(c) Factor: 2c(c−4)/((2c+3)(c−4)) = 2c/(2c+3)'],
    type: 'multi-part',
    equationSolveParts: ['c'],
    equationStagesMap: {
      'c': [
        { label: 'Factorise num', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '(' },
          { type: 'box', key: 's1_b', width: 'w-14' }, { type: 'text', value: ')' }
        ]},
        { label: 'Factorise den', stepKey: 's2', elements: [
          { type: 'text', value: '(' }, { type: 'box', key: 's2_a', width: 'w-14' }, { type: 'text', value: ')(' },
          { type: 'box', key: 's2_b', width: 'w-14' }, { type: 'text', value: ')' }
        ]},
        { label: 'Simplify', stepKey: 's3', elements: [
          { type: 'text', value: '=' }, { type: 'box', key: 's3_a', width: 'w-14' }, { type: 'text', value: '/' },
          { type: 'text', value: '(' }, { type: 'box', key: 's3_b', width: 'w-14' }, { type: 'text', value: ')' }
        ]}
      ]
    },
    parts: [
      { label: '(a) Factorise 6a − 9', key: 'a', marks: 1 },
      { label: '(b) Factorise 4b² − 25', key: 'b', marks: 1 },
      { label: '(c) Simplified', key: 'c', marks: 3 }
    ],
    answer: {
      a: '3(2a-3)', b: '(2b+5)(2b-5)', c: '2c/(2c+3)',
      c_s1_a: '2c', c_s1_b: 'c-4',
      c_s2_a: '2c+3', c_s2_b: 'c-4',
      c_s3_a: '2c', c_s3_b: '2c+3'
    },
    markingCriteria: { a: 'B1 for 3(2a − 3)', b: 'B1 for (2b + 5)(2b − 5)', c: 'B1 for numerator correctly factorised as 2c(c − 4). B1 for denominator correctly factorised as (2c + 3)(c − 4). B1 for simplified 2c/(2c + 3).' }
  },

  // ========== Question 22 ==========
  'pp_4024_on23_11_q22': {
    id: 'pp_4024_on23_11_q22', questionNumber: '22', title: 'Functions',
    question: 'f(x) = x/4 + 3, g(x) = 2(x − 1).\n(a) Find f(−8).\n(b) Find f⁻¹(x).\n(c) Find the value of p if f(p) = g(p + 5).',
    marks: 6,
    hints: ['(a) f(−8) = −8/4 + 3 = −2 + 3 = 1', '(b) y = x/4 + 3, x/4 = y−3, x = 4(y−3) = 4y−12, f⁻¹(x) = 4x−12', '(c) p/4+3 = 2(p+5−1) = 2(p+4)'],
    type: 'multi-part',
    equationSolveParts: ['a_calc', 'b_calc', 'c_calc'],
    equationStagesMap: {
      'a_calc': [
        { label: 'Substitute', stepKey: 's1', elements: [
          { type: 'text', value: 'f(−8) = −8/4 + 3' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'f(−8) =' }, { type: 'box', key: 's2', width: 'w-14' }
        ]}
      ],
      'b_calc': [
        { label: 'Let y = f(x)', stepKey: 's1', elements: [
          { type: 'text', value: 'y = x/4 + 3 → x =' }, { type: 'box', key: 's1', width: 'w-20' }
        ]},
        { label: 'f⁻¹(x)', stepKey: 's2', elements: [
          { type: 'text', value: 'f⁻¹(x) =' }, { type: 'box', key: 's2', width: 'w-20' }
        ]}
      ],
      'c_calc': [
        { label: 'f(p)', stepKey: 's1', elements: [
          { type: 'text', value: 'f(p) = p/4 + 3' }
        ]},
        { label: 'g(p+5)', stepKey: 's2', elements: [
          { type: 'text', value: 'g(p+5) = 2(p+5−1) = 2(p+' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Equation', stepKey: 's3', elements: [
          { type: 'text', value: 'p/4 + 3 = 2(p +' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Multiply by 4', stepKey: 's4', elements: [
          { type: 'text', value: 'p + 12 =' }, { type: 'box', key: 's4_a', width: 'w-10' }, { type: 'text', value: 'p +' }, { type: 'box', key: 's4_b', width: 'w-10' }
        ]},
        { label: 'Solve', stepKey: 's5', elements: [
          { type: 'box', key: 's5_a', width: 'w-10' }, { type: 'text', value: 'p =' }, { type: 'box', key: 's5_b', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's6', elements: [
          { type: 'text', value: 'p =' }, { type: 'box', key: 's6', width: 'w-16' }
        ]}
      ]
    },
    parts: [
      { label: '(a) f(−8)', key: 'a_calc', marks: 1 },
      { label: '(b) f⁻¹(x)', key: 'b_calc', marks: 2 },
      { label: '(c) Value of p', key: 'c_calc', marks: 3 }
    ],
    answer: {
      a_calc: '1', b_calc: '4x-12', c_calc: '-20/7',
      a_calc_s2: '1',
      b_calc_s1: '4(y-3)', b_calc_s2: '4x-12',
      c_calc_s2_a: '4',
      c_calc_s3_a: '4',
      c_calc_s4_a: '8', c_calc_s4_b: '32',
      c_calc_s5_a: '-7', c_calc_s5_b: '20',
      c_calc_s6: '-20/7'
    },
    markingCriteria: { a_calc: 'B1 for 1', b_calc: 'M1 for correct rearrangement x = 4(y − 3). A1 for 4x − 12.', c_calc: 'M1 for setting f(p) = g(p + 5). M1 for correct expansion and collection. A1 for −20/7.' }
  },

  // ========== Question 23 ==========
  'pp_4024_on23_11_q23': {
    id: 'pp_4024_on23_11_q23', questionNumber: '23', title: 'Vectors in parallelogram',
    question: 'OABC is a parallelogram. OA = a, OC = c. X is the midpoint of AC. Y is the point on AB where AY:YB = 2:1.\n(a) Find AC.\n(b) Find the position vector of X.\n(c) Find YX.',
    marks: 5,
    hints: ['(a) AC = AO + OC = −a + c = c − a', '(b) OX = OA + ½AC = a + ½(c−a) = ½a + ½c', '(c) AY = ⅔AB = ⅔c, OY = a + ⅔c, YX = OX − OY'],
    type: 'multi-part',
    equationSolveParts: ['b_calc', 'c_calc'],
    equationStagesMap: {
      'b_calc': [
        { label: 'OX = OA + AX', stepKey: 's1', elements: [
          { type: 'text', value: 'OX = a + ½(' }, { type: 'box', key: 's1', width: 'w-16' }, { type: 'text', value: ')' }
        ]},
        { label: 'Expand', stepKey: 's2', elements: [
          { type: 'text', value: 'OX = a +' }, { type: 'box', key: 's2_a', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's2_b', width: 'w-12' }
        ]},
        { label: 'Simplify', stepKey: 's3', elements: [
          { type: 'text', value: 'OX =' }, { type: 'box', key: 's3', width: 'w-20' }
        ]}
      ],
      'c_calc': [
        { label: 'Find OY', stepKey: 's1', elements: [
          { type: 'text', value: 'AY = ⅔AB = ⅔c → OY = a +' }, { type: 'box', key: 's1', width: 'w-14' }
        ]},
        { label: 'YX = OX − OY', stepKey: 's2', elements: [
          { type: 'text', value: 'YX = (½a+½c) − (a+' }, { type: 'box', key: 's2', width: 'w-14' }, { type: 'text', value: ')' }
        ]},
        { label: 'Simplify', stepKey: 's3', elements: [
          { type: 'text', value: 'YX =' }, { type: 'box', key: 's3', width: 'w-24' }
        ]}
      ]
    },
    parts: [
      { label: '(a) AC', key: 'a', marks: 1 },
      { label: '(b) Position vector of X', key: 'b_calc', marks: 2 },
      { label: '(c) YX', key: 'c_calc', marks: 2 }
    ],
    answer: {
      a: 'c-a', b_calc: '½a+½c', c_calc: '-½a-⅙c',
      b_calc_s1: 'c-a', b_calc_s2_a: '½c', b_calc_s2_b: '½a', b_calc_s3: '½a+½c',
      c_calc_s1: '⅔c', c_calc_s2: '⅔c', c_calc_s3: '-½a-⅙c'
    },
    markingCriteria: { a: 'B1 for c − a', b_calc: 'M1 for OA + ½AC or a + ½(c − a). A1 for ½a + ½c.', c_calc: 'M1 for finding OY = a + ⅔c and attempting YX = OX − OY. A1 for −½a − ⅙c.' }
  },

  // ========== Question 24 ==========
  'pp_4024_on23_11_q24': {
    id: 'pp_4024_on23_11_q24', questionNumber: '24', title: 'Algebraic fractions equation',
    question: 'Solve 3x/(x+1) − 2/(x−1) = 3.',
    marks: 4,
    hints: ['Multiply through by (x+1)(x−1)', 'Expand: 3x(x−1) − 2(x+1) = 3(x+1)(x−1)', 'Simplify and solve'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Multiply out', stepKey: 's1', elements: [
        { type: 'text', value: '3x(x−1) − 2(x+1) = 3(x+1)(x−1)' }
      ]},
      { label: 'Expand LHS', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-20' }, { type: 'text', value: '−' },
        { type: 'box', key: 's2_b', width: 'w-16' }
      ]},
      { label: 'Expand RHS', stepKey: 's3', elements: [
        { type: 'text', value: '= 3(' }, { type: 'box', key: 's3_a', width: 'w-16' }, { type: 'text', value: ')' },
        { type: 'text', value: '=' }, { type: 'box', key: 's3_b', width: 'w-16' }
      ]},
      { label: 'Simplify', stepKey: 's4', elements: [
        { type: 'box', key: 's4_a', width: 'w-20' }, { type: 'text', value: '=' },
        { type: 'box', key: 's4_b', width: 'w-20' }
      ]},
      { label: 'Solve', stepKey: 's5', elements: [
        { type: 'text', value: 'x =' }, { type: 'box', key: 's5', width: 'w-14' }
      ]}
    ],
    parts: [{ label: 'x =', key: 'answer', marks: 4 }],
    answer: {
      answer: '1/5',
      answer_s2_a: '3x²-3x', answer_s2_b: '2x+2',
      answer_s3_a: 'x²-1', answer_s3_b: '3x²-3',
      answer_s4_a: '3x²-5x-2', answer_s4_b: '3x²-3',
      answer_s5: '1/5'
    },
    markingCriteria: { answer: 'M1 for multiplying through by (x+1)(x−1). M1 for correct expansion of LHS: 3x²−3x−2x−2. M1 for simplifying to −5x = −1 or equivalent. A1 for x = 1/5 or 0.2.' }
  },
};

export const sections4024_11_2023ON: PastPaperSection[] = [
  { id: 's_4024_on23_11_q1', title: 'Q1 – Order of operations', questionId: 'pp_4024_on23_11_q1' },
  { id: 's_4024_on23_11_q2', title: 'Q2 – Ordering numbers', questionId: 'pp_4024_on23_11_q2' },
  { id: 's_4024_on23_11_q3', title: 'Q3 – Temperature', questionId: 'pp_4024_on23_11_q3' },
  { id: 's_4024_on23_11_q4', title: 'Q4 – Money calculation', questionId: 'pp_4024_on23_11_q4' },
  { id: 's_4024_on23_11_q5', title: 'Q5 – Bar chart', questionId: 'pp_4024_on23_11_q5' },
  { id: 's_4024_on23_11_q6', title: 'Q6 – Parallel lines', questionId: 'pp_4024_on23_11_q6' },
  { id: 's_4024_on23_11_q7', title: 'Q7 – Estimation', questionId: 'pp_4024_on23_11_q7' },
  { id: 's_4024_on23_11_q8', title: 'Q8 – Unit conversions', questionId: 'pp_4024_on23_11_q8' },
  { id: 's_4024_on23_11_q9', title: 'Q9 – Scatter diagram', questionId: 'pp_4024_on23_11_q9' },
  { id: 's_4024_on23_11_q10', title: 'Q10 – Polygon angles', questionId: 'pp_4024_on23_11_q10' },
  { id: 's_4024_on23_11_q11', title: 'Q11 – Powers and indices', questionId: 'pp_4024_on23_11_q11' },
  { id: 's_4024_on23_11_q12', title: 'Q12 – Scale drawing & bearings', questionId: 'pp_4024_on23_11_q12' },
  { id: 's_4024_on23_11_q13', title: 'Q13 – Fraction division', questionId: 'pp_4024_on23_11_q13' },
  { id: 's_4024_on23_11_q14', title: 'Q14 – Prime factors & LCM', questionId: 'pp_4024_on23_11_q14' },
  { id: 's_4024_on23_11_q15', title: 'Q15 – Circle theorems', questionId: 'pp_4024_on23_11_q15' },
  { id: 's_4024_on23_11_q16', title: 'Q16 – Inequalities region', questionId: 'pp_4024_on23_11_q16' },
  { id: 's_4024_on23_11_q17', title: 'Q17 – Direct proportion', questionId: 'pp_4024_on23_11_q17' },
  { id: 's_4024_on23_11_q18', title: 'Q18 – Venn diagram', questionId: 'pp_4024_on23_11_q18' },
  { id: 's_4024_on23_11_q19', title: 'Q19 – Speed-time graph', questionId: 'pp_4024_on23_11_q19' },
  { id: 's_4024_on23_11_q20', title: 'Q20 – Matrices', questionId: 'pp_4024_on23_11_q20' },
  { id: 's_4024_on23_11_q21', title: 'Q21 – Factorisation', questionId: 'pp_4024_on23_11_q21' },
  { id: 's_4024_on23_11_q22', title: 'Q22 – Functions', questionId: 'pp_4024_on23_11_q22' },
  { id: 's_4024_on23_11_q23', title: 'Q23 – Vectors', questionId: 'pp_4024_on23_11_q23' },
  { id: 's_4024_on23_11_q24', title: 'Q24 – Algebraic fractions', questionId: 'pp_4024_on23_11_q24' },
];
