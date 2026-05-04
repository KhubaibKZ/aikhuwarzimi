// 4024/12 October/November 2023 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_12_2023ON: Record<string, PastPaperQuestion> = {
  // ========== Question 1 ==========
  'pp_4024_on23_12_q1': {
    id: 'pp_4024_on23_12_q1', questionNumber: '1', title: 'Basic calculations',
    question: '(a) Work out 0.05 × 0.3.\n(b) Work out 600 ÷ 0.2.\n(c) Work out 20 − 12 ÷ (8 − 6).',
    marks: 3,
    hints: ['(a) 0.05 × 0.3 = 0.015', '(b) 600 ÷ 0.2 = 3000', '(c) 8−6=2, 12÷2=6, 20−6=14'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b', 'c'],
    equationStagesMap: {
      'a': [
        { label: 'Multiply', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-14' }, { type: 'text', value: '×' }, { type: 'box', key: 's1_b', width: 'w-12' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-16' }
        ]}
      ],
      'b': [
        { label: 'Divide', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '÷' }, { type: 'box', key: 's1_b', width: 'w-12' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-14' }
        ]}
      ],
      'c': [
        { label: 'Bracket first', stepKey: 's1', elements: [
          { type: 'text', value: '8 − 6 =' }, { type: 'box', key: 's1_a', width: 'w-10' }
        ]},
        { label: 'Division', stepKey: 's2', elements: [
          { type: 'text', value: '12 ÷' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]},
        { label: 'Subtract', stepKey: 's3', elements: [
          { type: 'text', value: '20 −' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's3_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) 0.05 × 0.3', key: 'a', marks: 1 }, { label: '(b) 600 ÷ 0.2', key: 'b', marks: 1 }, { label: '(c) 20 − 12 ÷ (8−6)', key: 'c', marks: 1 }],
    answer: {
      a: '0.015', b: '3000', c: '14',
      a_s1_a: '0.05', a_s1_b: '0.3', a_s1_c: '0.015',
      b_s1_a: '600', b_s1_b: '0.2', b_s1_c: '3000',
      c_s1_a: '2', c_s2_a: '2', c_s2_b: '6', c_s3_a: '6', c_s3_b: '14'
    }
  },

  // ========== Question 2 ==========
  'pp_4024_on23_12_q2': {
    id: 'pp_4024_on23_12_q2', questionNumber: '2', title: 'Fraction of rectangle',
    question: 'A rectangle is split into squares of two different sizes. Find the fraction of the rectangle that is shaded grey.',
    marks: 1,
    hints: ['Count shaded squares as fraction of total area'],
    type: 'short', answer: '5/21'
  },

  // ========== Question 3 ==========
  'pp_4024_on23_12_q3': {
    id: 'pp_4024_on23_12_q3', questionNumber: '3', title: 'Decimals and cube root',
    question: '(a) Find the decimal exactly halfway between [[3/5]] and 68%.\n(b) Write 4.07382 correct to 3 decimal places.\n(c) Evaluate ³√64.',
    marks: 3,
    hints: ['(a) 3/5 = 0.6, 68% = 0.68, halfway = 0.64', '(b) Look at 4th decimal place to round', '(c) 4³ = 64'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b', 'c'],
    equationStagesMap: {
      'a': [
        { label: 'Convert', stepKey: 's1', elements: [
          { type: 'text', value: '3/5 =' }, { type: 'box', key: 's1_a', width: 'w-12' },
          { type: 'text', value: ', 68% =' }, { type: 'box', key: 's1_b', width: 'w-12' }
        ]},
        { label: 'Halfway', stepKey: 's2', elements: [
          { type: 'text', value: '(' }, { type: 'box', key: 's2_a', width: 'w-12' }, { type: 'text', value: '+' },
          { type: 'box', key: 's2_b', width: 'w-12' }, { type: 'text', value: ') ÷ 2 =' }, { type: 'box', key: 's2_c', width: 'w-12' }
        ]}
      ],
      'b': [
        { label: 'Round', stepKey: 's1', elements: [
          { type: 'text', value: '4.07382 → 3 d.p. =' }, { type: 'box', key: 's1_a', width: 'w-16' }
        ]}
      ],
      'c': [
        { label: 'Cube root', stepKey: 's1', elements: [
          { type: 'text', value: '³√64 =' }, { type: 'box', key: 's1_a', width: 'w-10' },
          { type: 'text', value: 'since' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '³ = 64' }
        ]}
      ]
    },
    parts: [{ label: '(a) Halfway decimal', key: 'a', marks: 1 }, { label: '(b) Rounded', key: 'b', marks: 1 }, { label: '(c) ³√64', key: 'c', marks: 1 }],
    answer: {
      a: '0.64', b: '4.074', c: '4',
      a_s1_a: '0.6', a_s1_b: '0.68',
      a_s2_a: '0.6', a_s2_b: '0.68', a_s2_c: '0.64',
      b_s1_a: '4.074',
      c_s1_a: '4', c_s1_b: '4'
    }
  },

  // ========== Question 4 ==========
  'pp_4024_on23_12_q4': {
    id: 'pp_4024_on23_12_q4', questionNumber: '4', title: 'Temperature statistics',
    question: 'Sonu records temperatures for 12 days: −6, −5, −3, −2, −1, −1, T, 5, 5, 6, 6, 7.\n(a) Find the range.\n(b) The median is 1°C. Find T.',
    marks: 2,
    hints: ['(a) Range = 7 − (−6) = 13', '(b) Median of 12 values is average of 6th and 7th: (−1+T)/2 = 1, T = 3'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Range', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '− (' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: ') =' }, { type: 'box', key: 's1_c', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: 'Median position', stepKey: 's1', elements: [
          { type: 'text', value: '6th value =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ', 7th value = T' }
        ]},
        { label: 'Solve', stepKey: 's2', elements: [
          { type: 'text', value: '(' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '+ T) ÷ 2 = 1' }
        ]},
        { label: 'Answer', stepKey: 's3', elements: [
          { type: 'text', value: 'T =' }, { type: 'box', key: 's3_a', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Range (°C)', key: 'a', marks: 1 }, { label: '(b) T', key: 'b', marks: 1 }],
    answer: {
      a: '13', b: '3',
      a_s1_a: '7', a_s1_b: '-6', a_s1_c: '13',
      b_s1_a: '-1', b_s2_a: '-1', b_s3_a: '3'
    }
  },

  // ========== Question 5 ==========
  'pp_4024_on23_12_q5': {
    id: 'pp_4024_on23_12_q5', questionNumber: '5', title: 'Ratio',
    question: 'Anna and Ria share money in the ratio 5:9. Ria receives $8 more than Anna. Work out the total amount shared.',
    marks: 2,
    hints: ['Difference in parts = 9−5 = 4 parts = $8', '1 part = $2, total = 14 parts = $28'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Difference in parts', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: 'parts = $8' }
      ]},
      { label: '1 part', stepKey: 's2', elements: [
        { type: 'text', value: '1 part = $8 ÷' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '= $' }, { type: 'box', key: 's2_b', width: 'w-10' }
      ]},
      { label: 'Total', stepKey: 's3', elements: [
        { type: 'text', value: 'Total parts =' }, { type: 'box', key: 's3_a', width: 'w-10' },
        { type: 'text', value: ', Total = $' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: '×' },
        { type: 'box', key: 's3_c', width: 'w-10' }, { type: 'text', value: '= $' }, { type: 'box', key: 's3_d', width: 'w-10' }
      ]}
    ],
    parts: [{ label: 'Total ($)', key: 'answer', marks: 2 }],
    answer: {
      answer: '28',
      answer_s1_a: '9', answer_s1_b: '5', answer_s1_c: '4',
      answer_s2_a: '4', answer_s2_b: '2',
      answer_s3_a: '14', answer_s3_b: '14', answer_s3_c: '2', answer_s3_d: '28'
    }
  },

  // ========== Question 6 ==========
  'pp_4024_on23_12_q6': {
    id: 'pp_4024_on23_12_q6', questionNumber: '6', title: 'Parallel lines angles',
    question: 'AB and CD are parallel. EC and FB are parallel. Angle ABF = 73°.\n(a) Find x.\n(b) Find y.',
    marks: 2,
    hints: ['(a) Alternate angles: x = 73', '(b) Co-interior angles: y = 180 − 73 = 107'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Alternate angles', stepKey: 's1', elements: [
          { type: 'text', value: 'x =' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '° (alternate angles)' }
        ]}
      ],
      'b': [
        { label: 'Co-interior angles', stepKey: 's1', elements: [
          { type: 'text', value: 'y =' }, { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-12' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'y =' }, { type: 'box', key: 's2_a', width: 'w-12' }
        ]}
      ]
    },
    parts: [{ label: '(a) x', key: 'a', marks: 1 }, { label: '(b) y', key: 'b', marks: 1 }],
    answer: {
      a: '73', b: '107',
      a_s1_a: '73',
      b_s1_a: '180', b_s1_b: '73', b_s2_a: '107'
    }
  },

  // ========== Question 7 ==========
  'pp_4024_on23_12_q7': {
    id: 'pp_4024_on23_12_q7', questionNumber: '7', title: 'Transformations',
    question: '(a) Describe fully the transformation that maps triangle P onto triangle Q.\n(b) Shape B is an enlargement of shape A, centre (5,5), area of B is 27 cm². Draw shape B.',
    marks: 6,
    hints: ['(a) Rotation, 90° clockwise, centre (0,0)', '(b) Area of A = 3 cm², area SF = 27/3 = 9, linear SF = 3'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Type', stepKey: 's1', elements: [
          { type: 'text', value: 'Transformation:' }, { type: 'box', key: 's1_a', width: 'w-24' }
        ]},
        { label: 'Angle & direction', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-12' }, { type: 'text', value: '°' }, { type: 'box', key: 's2_b', width: 'w-20' }
        ]},
        { label: 'Centre', stepKey: 's3', elements: [
          { type: 'text', value: 'Centre: (' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: ',' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: ')' }
        ]}
      ],
      'b': [
        { label: 'Area SF', stepKey: 's1', elements: [
          { type: 'text', value: 'Area SF =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '÷' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-10' }
        ]},
        { label: 'Linear SF', stepKey: 's2', elements: [
          { type: 'text', value: 'Linear SF = √' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Transformation', key: 'a', marks: 3 }, { label: '(b) Scale factor', key: 'b', marks: 3 }],
    answer: {
      a: 'Rotation, 90° clockwise, centre (0,0)', b: '3',
      a_s1_a: 'Rotation', a_s2_a: '90', a_s2_b: 'clockwise', a_s3_a: '0', a_s3_b: '0',
      b_s1_a: '27', b_s1_b: '3', b_s1_c: '9', b_s2_a: '9', b_s2_b: '3'
    }
  },

  // ========== Question 8 ==========
  'pp_4024_on23_12_q8': {
    id: 'pp_4024_on23_12_q8', questionNumber: '8', title: 'Standard form',
    question: '(a) Write 0.00493 in standard form.\n(b) Evaluate (4 × 10⁹) × (2 × 10⁻²). Give your answer in standard form.',
    marks: 2,
    hints: ['(a) 4.93 × 10⁻³', '(b) 4×2 = 8, 10⁹ × 10⁻² = 10⁷, answer = 8 × 10⁷'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Standard form', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '× 10^' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: 'Multiply numbers', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-10' }
        ]},
        { label: 'Add indices', stepKey: 's2', elements: [
          { type: 'text', value: '10^(' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: ') = 10^' }, { type: 'box', key: 's2_c', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's3', elements: [
          { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '× 10^' }, { type: 'box', key: 's3_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Standard form', key: 'a', marks: 1 }, { label: '(b) Standard form', key: 'b', marks: 1 }],
    answer: {
      a: '4.93 × 10⁻³', b: '8 × 10⁷',
      a_s1_a: '4.93', a_s1_b: '-3',
      b_s1_a: '4', b_s1_b: '2', b_s1_c: '8',
      b_s2_a: '9', b_s2_b: '-2', b_s2_c: '7',
      b_s3_a: '8', b_s3_b: '7'
    }
  },

  // ========== Question 9 ==========
  'pp_4024_on23_12_q9': {
    id: 'pp_4024_on23_12_q9', questionNumber: '9', title: 'Prime factors and LCM',
    question: '(a) Write 180 as a product of its prime factors.\n(b) 36 = 2² × 3² and N = 2² × 3 × k (k > 3). The LCM of 36 and N is 180. Find k.',
    marks: 3,
    hints: ['(a) 180 = 2² × 3² × 5', '(b) LCM = 2² × 3² × 5 = 180, N must contribute factor 5, so k = 5'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Factor tree', stepKey: 's1', elements: [
          { type: 'text', value: '180 =' }, { type: 'box', key: 's1_a', width: 'w-8' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_b', width: 'w-8' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_c', width: 'w-8' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_d', width: 'w-8' }, { type: 'text', value: '×' },
          { type: 'box', key: 's1_e', width: 'w-8' }
        ]},
        { label: 'Index form', stepKey: 's2', elements: [
          { type: 'text', value: '=' }, { type: 'box', key: 's2_a', width: 'w-20' }
        ]}
      ],
      'b': [
        { label: 'Compare LCM', stepKey: 's1', elements: [
          { type: 'text', value: 'LCM needs factor' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ', so k =' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Prime factors', key: 'a', marks: 2 }, { label: '(b) k', key: 'b', marks: 1 }],
    answer: {
      a: '2² × 3² × 5', b: '5',
      a_s1_a: '2', a_s1_b: '2', a_s1_c: '3', a_s1_d: '3', a_s1_e: '5',
      a_s2_a: '2² × 3² × 5',
      b_s1_a: '5', b_s1_b: '5'
    }
  },

  // ========== Question 10 ==========
  'pp_4024_on23_12_q10': {
    id: 'pp_4024_on23_12_q10', questionNumber: '10', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of √[[(1240 × 3.8)/11.2]].',
    marks: 2,
    hints: ['1240 ≈ 1000, 3.8 ≈ 4, 11.2 ≈ 10', '√((1000 × 4)/10) = √400 = 20'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Round to 1 s.f.', stepKey: 's1', elements: [
        {
          type: 'fraction',
          sqrt: true,
          numElements: [
            { type: 'box', key: 's1_a', width: 'w-12' },
            { type: 'text', value: '×' },
            { type: 'box', key: 's1_b', width: 'w-10' },
          ],
          denElements: [
            { type: 'box', key: 's1_c', width: 'w-10' },
          ],
        },
        { type: 'text', value: '=' },
        { type: 'box', key: 's1_d', width: 'w-14' },
      ]},
    ],
    parts: [{ label: 'Estimate', key: 'answer', marks: 2 }],
    answer: {
      answer: '20',
      answer_s1_a: '1000', answer_s1_b: '4', answer_s1_c: '10', answer_s1_d: '20',
    }
  },

  // ========== Question 11 ==========
  'pp_4024_on23_12_q11': {
    id: 'pp_4024_on23_12_q11', questionNumber: '11', title: 'Solve inequality',
    question: 'Solve 7m − 13 ≤ 8.',
    marks: 2,
    hints: ['7m ≤ 8 + 13 = 21', 'm ≤ 3'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Add 13', stepKey: 's1', elements: [
        { type: 'text', value: '7m ≤' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_b', width: 'w-10' }
      ]},
      { label: 'Simplify', stepKey: 's2', elements: [
        { type: 'text', value: '7m ≤' }, { type: 'box', key: 's2_a', width: 'w-10' }
      ]},
      { label: 'Divide', stepKey: 's3', elements: [
        { type: 'text', value: 'm ≤' }, { type: 'box', key: 's3_a', width: 'w-10' }
      ]}
    ],
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: {
      answer: 'm ≤ 3',
      answer_s1_a: '8', answer_s1_b: '13',
      answer_s2_a: '21',
      answer_s3_a: '3'
    }
  },

  // ========== Question 12 ==========
  'pp_4024_on23_12_q12': {
    id: 'pp_4024_on23_12_q12', questionNumber: '12', title: 'Simultaneous equations',
    question: 'Solve: 5x + 4y = 14 and 3x − 2y = 15.',
    marks: 3,
    hints: ['Multiply 2nd equation by 2: 6x − 4y = 30', 'Add: 11x = 44, x = 4', 'Sub back: 5(4) + 4y = 14, 4y = −6, y = −3/2'],
    type: 'multi-part',
    equationSolveParts: ['x', 'y'],
    equationStagesMap: {
      'x': [
        { label: 'Multiply eq2 by 2', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: 'x −' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: 'y =' }, { type: 'box', key: 's1_c', width: 'w-10' }
        ]},
        { label: 'Add equations', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: 'x =' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]},
        { label: 'Solve for x', stepKey: 's3', elements: [
          { type: 'text', value: 'x =' }, { type: 'box', key: 's3_a', width: 'w-10' }
        ]}
      ],
      'y': [
        { label: 'Substitute', stepKey: 's1', elements: [
          { type: 'text', value: '5(' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ') + 4y = 14' }
        ]},
        { label: 'Solve for y', stepKey: 's2', elements: [
          { type: 'text', value: '4y =' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: ', y =' }, { type: 'box', key: 's2_b', width: 'w-12' }
        ]}
      ]
    },
    parts: [{ label: 'x', key: 'x', marks: 2 }, { label: 'y', key: 'y', marks: 1 }],
    answer: {
      x: '4', y: '-3/2',
      x_s1_a: '6', x_s1_b: '4', x_s1_c: '30',
      x_s2_a: '11', x_s2_b: '44',
      x_s3_a: '4',
      y_s1_a: '4',
      y_s2_a: '-6', y_s2_b: '-3/2'
    }
  },

  // ========== Question 13 ==========
  'pp_4024_on23_12_q13': {
    id: 'pp_4024_on23_12_q13', questionNumber: '13', title: 'Mean calculation',
    question: 'A list of eight numbers has a mean of 12. The first five numbers have a mean of 9. Find the sum of the three remaining numbers.',
    marks: 2,
    hints: ['Total of 8 numbers = 8 × 12 = 96', 'Total of first 5 = 5 × 9 = 45', 'Sum of remaining 3 = 96 − 45 = 51'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Total of 8', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-12' }
      ]},
      { label: 'Total of 5', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_c', width: 'w-12' }
      ]},
      { label: 'Remaining', stepKey: 's3', elements: [
        { type: 'box', key: 's3_a', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's3_b', width: 'w-12' }, { type: 'text', value: '=' }, { type: 'box', key: 's3_c', width: 'w-12' }
      ]}
    ],
    parts: [{ label: 'Sum of remaining 3', key: 'answer', marks: 2 }],
    answer: {
      answer: '51',
      answer_s1_a: '8', answer_s1_b: '12', answer_s1_c: '96',
      answer_s2_a: '5', answer_s2_b: '9', answer_s2_c: '45',
      answer_s3_a: '96', answer_s3_b: '45', answer_s3_c: '51'
    }
  },

  // ========== Question 14 ==========
  'pp_4024_on23_12_q14': {
    id: 'pp_4024_on23_12_q14', questionNumber: '14', title: 'Angle measurement and construction',
    question: '(a) Measure angle ABC.\n(b) Construct the perpendicular bisector of AC.\n(c) Shade the region inside triangle ABC nearer to A than C and more than 6 cm from B.',
    marks: 5,
    hints: ['(a) Use protractor — answer between 47° and 51°', '(b) Use compasses and straight edge', '(c) Intersection of perpendicular bisector side (nearer A) and outside arc of 6 cm from B'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle ABC (°)', key: 'a', marks: 1 }, { label: '(b) Construction', key: 'b', marks: 2 }, { label: '(c) Shaded region', key: 'c', marks: 2 }],
    answer: { a: '49', b: 'Perpendicular bisector drawn', c: 'Correct region shaded' }
  },

  // ========== Question 15 ==========
  'pp_4024_on23_12_q15': {
    id: 'pp_4024_on23_12_q15', questionNumber: '15', title: 'Sequences',
    question: '(a) The 2nd term of a linear sequence is 28, the 5th term is 16. Find the 1st, 3rd, and 4th terms.\n(b) Find the nth term of: 3, 9, 19, 33, 51.',
    marks: 4,
    hints: ['(a) Common difference = (16−28)/3 = −4, 1st = 32, 3rd = 24, 4th = 20', '(b) Second differences = 4, quadratic: 2n² + 1'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Common difference', stepKey: 's1', elements: [
          { type: 'text', value: 'd = (' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: ') ÷ 3 =' }, { type: 'box', key: 's1_c', width: 'w-10' }
        ]},
        { label: 'Terms', stepKey: 's2', elements: [
          { type: 'text', value: '1st =' }, { type: 'box', key: 's2_a', width: 'w-10' },
          { type: 'text', value: ', 3rd =' }, { type: 'box', key: 's2_b', width: 'w-10' },
          { type: 'text', value: ', 4th =' }, { type: 'box', key: 's2_c', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: '2nd differences', stepKey: 's1', elements: [
          { type: 'text', value: '2nd diff =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ', a =' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'nth term', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: 'n² +' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) 1st, 3rd, 4th terms', key: 'a', marks: 2 }, { label: '(b) nth term', key: 'b', marks: 2 }],
    answer: {
      a: '32, 24, 20', b: '2n²+1',
      a_s1_a: '16', a_s1_b: '28', a_s1_c: '-4',
      a_s2_a: '32', a_s2_b: '24', a_s2_c: '20',
      b_s1_a: '4', b_s1_b: '2',
      b_s2_a: '2', b_s2_b: '1'
    }
  },

  // ========== Question 16 ==========
  'pp_4024_on23_12_q16': {
    id: 'pp_4024_on23_12_q16', questionNumber: '16', title: 'Rearrange formula',
    question: 'T = √(P − 4).\n(a) Find T when P = 40.\n(b) Rearrange to make P the subject.',
    marks: 3,
    hints: ['(a) T = √(40−4) = √36 = 6', '(b) T² = P − 4, P = T² + 4'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Substitute', stepKey: 's1', elements: [
          { type: 'text', value: 'T = √(' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '− 4) = √' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Answer', stepKey: 's2', elements: [
          { type: 'text', value: 'T =' }, { type: 'box', key: 's2_a', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: 'Square both sides', stepKey: 's1', elements: [
          { type: 'text', value: 'T² =' }, { type: 'box', key: 's1_a', width: 'w-16' }
        ]},
        { label: 'Rearrange', stepKey: 's2', elements: [
          { type: 'text', value: 'P =' }, { type: 'box', key: 's2_a', width: 'w-16' }
        ]}
      ]
    },
    parts: [{ label: '(a) T', key: 'a', marks: 1 }, { label: '(b) P =', key: 'b', marks: 2 }],
    answer: {
      a: '6', b: 'T²+4',
      a_s1_a: '40', a_s1_b: '36', a_s2_a: '6',
      b_s1_a: 'P − 4', b_s2_a: 'T² + 4'
    }
  },

  // ========== Question 17 ==========
  'pp_4024_on23_12_q17': {
    id: 'pp_4024_on23_12_q17', questionNumber: '17', title: 'Cumulative frequency',
    question: 'Heights of 80 plants measured.\n(a) Draw a cumulative frequency diagram.\n(b) Find the interquartile range.\n(c) Plants taller than H cm are sold. 28 plants are sold. Find H.',
    marks: 6,
    hints: ['(a) Plot cumulative frequencies against upper bounds', '(b) Q1 at 20th value, Q3 at 60th value, IQR = Q3 − Q1', '(c) 80 − 28 = 52 on CF axis, read across to H'],
    type: 'multi-part',
    equationSolveParts: ['b', 'c'],
    equationStagesMap: {
      'b': [
        { label: 'Q1 position', stepKey: 's1', elements: [
          { type: 'text', value: 'Q1 at' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: 'th value → Q1 =' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Q3 position', stepKey: 's2', elements: [
          { type: 'text', value: 'Q3 at' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: 'th value → Q3 =' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]},
        { label: 'IQR', stepKey: 's3', elements: [
          { type: 'text', value: 'IQR =' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's3_c', width: 'w-10' }
        ]}
      ],
      'c': [
        { label: 'CF value', stepKey: 's1', elements: [
          { type: 'text', value: '80 −' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Read H', stepKey: 's2', elements: [
          { type: 'text', value: 'H =' }, { type: 'box', key: 's2_a', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) CF diagram', key: 'a', marks: 2 }, { label: '(b) IQR (cm)', key: 'b', marks: 2 }, { label: '(c) H', key: 'c', marks: 2 }],
    answer: {
      a: 'Correct CF diagram', b: '4', c: '7',
      b_s1_a: '20', b_s1_b: '3.5',
      b_s2_a: '60', b_s2_b: '7.5',
      b_s3_a: '7.5', b_s3_b: '3.5', b_s3_c: '4',
      c_s1_a: '28', c_s1_b: '52', c_s2_a: '7'
    }
  },

  // ========== Question 18 ==========
  'pp_4024_on23_12_q18': {
    id: 'pp_4024_on23_12_q18', questionNumber: '18', title: 'Speed-time graph',
    question: 'Speed-time graph for cyclists A and B over 20 seconds.\n(a) Find the acceleration of cyclist A.\n(b) Which cyclist travelled further and by how many metres?',
    marks: 4,
    hints: ['(a) Acceleration = change in speed / time = 6/20 = 0.3 m/s²', '(b) Compare areas under graphs: A = ½×20×6 = 60, B = ½×(1+7)×20 = 80, B by 20m'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Acceleration', stepKey: 's1', elements: [
          { type: 'text', value: 'a =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '÷' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-12' }, { type: 'text', value: 'm/s²' }
        ]}
      ],
      'b': [
        { label: 'Distance A', stepKey: 's1', elements: [
          { type: 'text', value: '½ ×' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: 'm' }
        ]},
        { label: 'Distance B', stepKey: 's2', elements: [
          { type: 'text', value: '½ × (' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: ') ×' }, { type: 'box', key: 's2_c', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's2_d', width: 'w-10' }, { type: 'text', value: 'm' }
        ]},
        { label: 'Difference', stepKey: 's3', elements: [
          { type: 'box', key: 's3_a', width: 'w-12' }, { type: 'text', value: 'by' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: 'm' }
        ]}
      ]
    },
    parts: [{ label: '(a) Acceleration (m/s²)', key: 'a', marks: 1 }, { label: '(b) Cyclist and difference (m)', key: 'b', marks: 3 }],
    answer: {
      a: '0.3', b: 'B, 20',
      a_s1_a: '6', a_s1_b: '20', a_s1_c: '0.3',
      b_s1_a: '20', b_s1_b: '6', b_s1_c: '60',
      b_s2_a: '1', b_s2_b: '7', b_s2_c: '20', b_s2_d: '80',
      b_s3_a: 'B', b_s3_b: '20'
    }
  },

  // ========== Question 19 ==========
  'pp_4024_on23_12_q19': {
    id: 'pp_4024_on23_12_q19', questionNumber: '19', title: 'Algebraic fractions',
    question: 'Express as a single fraction: [[(x+1)/8]] + [[3x/4]] − [[5x/16]].',
    marks: 2,
    hints: ['Common denominator = 16', '2(x+1)/16 + 12x/16 − 5x/16 = (2x+2+12x−5x)/16 = (9x+2)/16'],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Common denominator', stepKey: 's1', elements: [
        { type: 'text', value: 'LCD =' }, { type: 'box', key: 's1_a', width: 'w-10' }
      ]},
      { label: 'Convert numerators', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-16' }, { type: 'text', value: '+' }, { type: 'box', key: 's2_b', width: 'w-12' }, { type: 'text', value: '−' }, { type: 'box', key: 's2_c', width: 'w-12' }
      ]},
      { label: 'Simplify', stepKey: 's3', elements: [
        { type: 'text', value: '= (' }, { type: 'box', key: 's3_a', width: 'w-16' }, { type: 'text', value: ') / 16' }
      ]}
    ],
    parts: [{ label: 'Single fraction', key: 'answer', marks: 2 }],
    answer: {
      answer: '(9x+2)/16',
      answer_s1_a: '16',
      answer_s2_a: '2(x+1)', answer_s2_b: '12x', answer_s2_c: '5x',
      answer_s3_a: '9x+2'
    }
  },

  // ========== Question 20 ==========
  'pp_4024_on23_12_q20': {
    id: 'pp_4024_on23_12_q20', questionNumber: '20', title: 'Factorisation',
    question: '(a) Factorise 2cd + ce − 6d − 3e.\n(b) Factorise 3v² − 27t².',
    marks: 4,
    hints: ['(a) Group: c(2d+e) − 3(2d+e) = (c−3)(2d+e)', '(b) 3(v²−9t²) = 3(v+3t)(v−3t)'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Group terms', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-20' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-20' }
        ]},
        { label: 'Factor out', stepKey: 's2', elements: [
          { type: 'text', value: '= (' }, { type: 'box', key: 's2_a', width: 'w-14' }, { type: 'text', value: ')(' }, { type: 'box', key: 's2_b', width: 'w-14' }, { type: 'text', value: ')' }
        ]}
      ],
      'b': [
        { label: 'Common factor', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '(' }, { type: 'box', key: 's1_b', width: 'w-16' }, { type: 'text', value: ')' }
        ]},
        { label: 'Difference of squares', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '(' }, { type: 'box', key: 's2_b', width: 'w-14' }, { type: 'text', value: ')(' }, { type: 'box', key: 's2_c', width: 'w-14' }, { type: 'text', value: ')' }
        ]}
      ]
    },
    parts: [{ label: '(a) Factorised', key: 'a', marks: 2 }, { label: '(b) Factorised', key: 'b', marks: 2 }],
    answer: {
      a: '(c-3)(2d+e)', b: '3(v+3t)(v-3t)',
      a_s1_a: 'c(2d+e)', a_s1_b: '3(2d+e)',
      a_s2_a: 'c−3', a_s2_b: '2d+e',
      b_s1_a: '3', b_s1_b: 'v²−9t²',
      b_s2_a: '3', b_s2_b: 'v+3t', b_s2_c: 'v−3t'
    }
  },

  // ========== Question 21 ==========
  'pp_4024_on23_12_q21': {
    id: 'pp_4024_on23_12_q21', questionNumber: '21', title: 'Sector and arc length',
    question: 'Diagram A: sector centre D, radius 3y, angle 6x° (obtuse). Diagram B: sector centre P, radius y, angle x°. Major arc EF = 9 × arc QR.\n(a) Show x = 20.\n(b) Find y when area of sector QPR = 2π cm².',
    marks: 5,
    hints: ['(a) Major arc EF = (360−6x)/360 × 2π(3y), arc QR = x/360 × 2πy', '(b) Area = (x/360)πy² = (20/360)πy² = 2π → y² = 36, y = 6'],
    type: 'multi-part',
    equationSolveParts: ['a', 'b'],
    equationStagesMap: {
      'a': [
        { label: 'Major arc EF', stepKey: 's1', elements: [
          { type: 'text', value: '(360 −' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ') / 360 × 2π ×' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]},
        { label: 'Arc QR', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '/ 360 × 2π ×' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]},
        { label: 'Equation', stepKey: 's3', elements: [
          { type: 'text', value: '360 − 6x = 9 ×' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '× x/(' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: ')' }
        ]},
        { label: 'Solve', stepKey: 's4', elements: [
          { type: 'text', value: '360 −' }, { type: 'box', key: 's4_a', width: 'w-10' }, { type: 'text', value: '=' }, { type: 'box', key: 's4_b', width: 'w-10' },
          { type: 'text', value: '→ 360 =' }, { type: 'box', key: 's4_c', width: 'w-10' }, { type: 'text', value: 'x → x =' }, { type: 'box', key: 's4_d', width: 'w-10' }
        ]}
      ],
      'b': [
        { label: 'Area formula', stepKey: 's1', elements: [
          { type: 'text', value: '(' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '/ 360) × π × y² = 2π' }
        ]},
        { label: 'Solve', stepKey: 's2', elements: [
          { type: 'text', value: 'y² =' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: ', y =' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Show x = 20', key: 'a', marks: 3 }, { label: '(b) y', key: 'b', marks: 2 }],
    answer: {
      a: 'x = 20 shown', b: '6',
      a_s1_a: '6x', a_s1_b: '3y',
      a_s2_a: 'x', a_s2_b: 'y',
      a_s3_a: '1', a_s3_b: '3',
      a_s4_a: '6x', a_s4_b: '12x', a_s4_c: '18', a_s4_d: '20',
      b_s1_a: '20', b_s2_a: '36', b_s2_b: '6'
    }
  },

  // ========== Question 22 ==========
  'pp_4024_on23_12_q22': {
    id: 'pp_4024_on23_12_q22', questionNumber: '22', title: 'Matrix equation',
    question: 'Matrix equation: (x, 3)(x−1, 2) = (2x+6, 2y).\n(a) Show that x² − 3x = 0.\n(b)(i) Solve x² − 3x = 0.\n(b)(ii) Find y when x ≠ 0.',
    marks: 6,
    hints: ['(a) Expand: x(x−1) + 3(2) = 2x+6 → x²−x+6 = 2x+6 → x²−3x = 0', '(b)(i) x(x−3) = 0, x = 0 or 3', '(b)(ii) Sub x = 3: 3(2) + 3(?) = 2y...'],
    type: 'multi-part',
    equationSolveParts: ['a', 'bi', 'bii'],
    equationStagesMap: {
      'a': [
        { label: 'Expand top row', stepKey: 's1', elements: [
          { type: 'text', value: 'x(' }, { type: 'box', key: 's1_a', width: 'w-14' }, { type: 'text', value: ') + 3(' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: ') = 2x+6' }
        ]},
        { label: 'Simplify', stepKey: 's2', elements: [
          { type: 'box', key: 's2_a', width: 'w-14' }, { type: 'text', value: '+ 6 = 2x + 6' }
        ]},
        { label: 'Rearrange', stepKey: 's3', elements: [
          { type: 'box', key: 's3_a', width: 'w-20' }, { type: 'text', value: '= 0' }
        ]}
      ],
      'bi': [
        { label: 'Factorise', stepKey: 's1', elements: [
          { type: 'box', key: 's1_a', width: 'w-12' }, { type: 'text', value: '(' }, { type: 'box', key: 's1_b', width: 'w-14' }, { type: 'text', value: ') = 0' }
        ]},
        { label: 'Solutions', stepKey: 's2', elements: [
          { type: 'text', value: 'x =' }, { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: 'or x =' }, { type: 'box', key: 's2_b', width: 'w-10' }
        ]}
      ],
      'bii': [
        { label: 'Substitute x = 3', stepKey: 's1', elements: [
          { type: 'text', value: 'Using x =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: ', find y =' }, { type: 'box', key: 's1_b', width: 'w-10' }
        ]}
      ]
    },
    parts: [{ label: '(a) Proof', key: 'a', marks: 2 }, { label: '(b)(i) x values', key: 'bi', marks: 2 }, { label: '(b)(ii) y', key: 'bii', marks: 2 }],
    answer: {
      a: 'x²-3x=0 shown', bi: '0, 3', bii: '12',
      a_s1_a: 'x−1', a_s1_b: '2',
      a_s2_a: 'x²−x',
      a_s3_a: 'x²−3x',
      bi_s1_a: 'x', bi_s1_b: 'x−3',
      bi_s2_a: '0', bi_s2_b: '3',
      bii_s1_a: '3', bii_s1_b: '12'
    }
  },

  // ========== Question 23 ==========
  'pp_4024_on23_12_q23': {
    id: 'pp_4024_on23_12_q23', questionNumber: '23', title: 'Venn diagram',
    question: 'A shop sells hats (H), scarves (S), gloves (G). 40 people surveyed.\n(a) 2 buy all three. Those buying hat and scarf also buy gloves. 4 buy exactly two items. Complete the Venn diagram.\n(b) Find n(S ∩ (H ∪ G)′).',
    marks: 3,
    hints: ['(a) H∩S∩G = 2, H∩S only = 0, exactly two = 4 means H∩G only + S∩G only = 4', '(b) S only = people in S but not H or G = 10'],
    type: 'multi-part',
    parts: [{ label: '(a) Venn diagram', key: 'a', marks: 2 }, { label: '(b) n(S ∩ (H∪G)′)', key: 'b', marks: 1 }],
    answer: { a: 'Completed correctly', b: '10' }
  },

  // ========== Question 24 ==========
  'pp_4024_on23_12_q24': {
    id: 'pp_4024_on23_12_q24', questionNumber: '24', title: 'Vectors in triangle',
    question: 'OAB is a triangle. P lies on AB, AP:PB = 2:3. OA = 4a, OP = 3a + 2b.\n(a)(i) Find AP.\n(a)(ii) Find OB.\n(b) Q is on OA such that QP is parallel to OB. Find QP.',
    marks: 5,
    hints: ['(a)(i) AP = OP − OA = 3a+2b − 4a = 2b−a', '(a)(ii) AB = 5/2 × AP = 5b − 5a/2, OB = OA + AB = 4a + 5b − 5a/2 = 3a/2 + 5b... MS: −a+5b', '(b) QP = kOB for some k'],
    type: 'multi-part',
    equationSolveParts: ['ai', 'aii', 'b'],
    equationStagesMap: {
      'ai': [
        { label: 'AP = OP − OA', stepKey: 's1', elements: [
          { type: 'text', value: 'AP = (' }, { type: 'box', key: 's1_a', width: 'w-16' }, { type: 'text', value: ') − (' }, { type: 'box', key: 's1_b', width: 'w-12' }, { type: 'text', value: ')' }
        ]},
        { label: 'Simplify', stepKey: 's2', elements: [
          { type: 'text', value: 'AP =' }, { type: 'box', key: 's2_a', width: 'w-16' }
        ]}
      ],
      'aii': [
        { label: 'AP:PB = 2:3', stepKey: 's1', elements: [
          { type: 'text', value: 'AB =' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '/' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '× AP' }
        ]},
        { label: 'AB value', stepKey: 's2', elements: [
          { type: 'text', value: 'AB =' }, { type: 'box', key: 's2_a', width: 'w-20' }
        ]},
        { label: 'OB = OA + AB', stepKey: 's3', elements: [
          { type: 'text', value: 'OB =' }, { type: 'box', key: 's3_a', width: 'w-20' }
        ]}
      ],
      'b': [
        { label: 'QP parallel to OB', stepKey: 's1', elements: [
          { type: 'text', value: 'QP =' }, { type: 'box', key: 's1_a', width: 'w-20' }
        ]}
      ]
    },
    parts: [{ label: '(a)(i) AP', key: 'ai', marks: 1 }, { label: '(a)(ii) OB', key: 'aii', marks: 3 }, { label: '(b) QP', key: 'b', marks: 1 }],
    answer: {
      ai: '2b-a', aii: '-a+5b', b: '2/5(-a+5b)',
      ai_s1_a: '3a+2b', ai_s1_b: '4a', ai_s2_a: '2b−a',
      aii_s1_a: '5', aii_s1_b: '2', aii_s2_a: '5b−5a/2',
      aii_s3_a: '-a+5b',
      b_s1_a: '2/5(-a+5b)'
    }
  },
};

export const sections4024_12_2023ON: PastPaperSection[] = [
  { id: 's_4024_on23_12_q1', title: 'Q1 – Basic calculations', questionId: 'pp_4024_on23_12_q1' },
  { id: 's_4024_on23_12_q2', title: 'Q2 – Fraction of shape', questionId: 'pp_4024_on23_12_q2' },
  { id: 's_4024_on23_12_q3', title: 'Q3 – Decimals & cube root', questionId: 'pp_4024_on23_12_q3' },
  { id: 's_4024_on23_12_q4', title: 'Q4 – Temperature statistics', questionId: 'pp_4024_on23_12_q4' },
  { id: 's_4024_on23_12_q5', title: 'Q5 – Ratio', questionId: 'pp_4024_on23_12_q5' },
  { id: 's_4024_on23_12_q6', title: 'Q6 – Parallel lines', questionId: 'pp_4024_on23_12_q6' },
  { id: 's_4024_on23_12_q7', title: 'Q7 – Transformations', questionId: 'pp_4024_on23_12_q7' },
  { id: 's_4024_on23_12_q8', title: 'Q8 – Standard form', questionId: 'pp_4024_on23_12_q8' },
  { id: 's_4024_on23_12_q9', title: 'Q9 – Prime factors & LCM', questionId: 'pp_4024_on23_12_q9' },
  { id: 's_4024_on23_12_q10', title: 'Q10 – Estimation', questionId: 'pp_4024_on23_12_q10' },
  { id: 's_4024_on23_12_q11', title: 'Q11 – Inequality', questionId: 'pp_4024_on23_12_q11' },
  { id: 's_4024_on23_12_q12', title: 'Q12 – Simultaneous equations', questionId: 'pp_4024_on23_12_q12' },
  { id: 's_4024_on23_12_q13', title: 'Q13 – Mean', questionId: 'pp_4024_on23_12_q13' },
  { id: 's_4024_on23_12_q14', title: 'Q14 – Construction', questionId: 'pp_4024_on23_12_q14' },
  { id: 's_4024_on23_12_q15', title: 'Q15 – Sequences', questionId: 'pp_4024_on23_12_q15' },
  { id: 's_4024_on23_12_q16', title: 'Q16 – Rearrange formula', questionId: 'pp_4024_on23_12_q16' },
  { id: 's_4024_on23_12_q17', title: 'Q17 – Cumulative frequency', questionId: 'pp_4024_on23_12_q17' },
  { id: 's_4024_on23_12_q18', title: 'Q18 – Speed-time graph', questionId: 'pp_4024_on23_12_q18' },
  { id: 's_4024_on23_12_q19', title: 'Q19 – Algebraic fractions', questionId: 'pp_4024_on23_12_q19' },
  { id: 's_4024_on23_12_q20', title: 'Q20 – Factorisation', questionId: 'pp_4024_on23_12_q20' },
  { id: 's_4024_on23_12_q21', title: 'Q21 – Sector & arc', questionId: 'pp_4024_on23_12_q21' },
  { id: 's_4024_on23_12_q22', title: 'Q22 – Matrix equation', questionId: 'pp_4024_on23_12_q22' },
  { id: 's_4024_on23_12_q23', title: 'Q23 – Venn diagram', questionId: 'pp_4024_on23_12_q23' },
  { id: 's_4024_on23_12_q24', title: 'Q24 – Vectors', questionId: 'pp_4024_on23_12_q24' },
];
