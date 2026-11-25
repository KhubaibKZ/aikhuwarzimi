// Pre Test - Linear Inequalities
// Duration: 40 minutes - Max. Marks: 25

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questionsTestLinearInequalitiesPre: Record<string, PastPaperQuestion> = {
  'test_lin_ineq_pre_q1': {
    id: 'test_lin_ineq_pre_q1',
    questionNumber: '1',
    title: 'Linear inequality',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Solve the inequality.\n5x − 3 > 9',
    marks: 2,
    hints: [
      'Add 3 to both sides to isolate the term in x.',
      'Divide both sides by 5 to find the range of values for x.',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Add 3', stepKey: 's1', elements: [
        { type: 'text', value: '5x >' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_b', width: 'w-10' }
      ]},
      { label: 'Simplify', stepKey: 's2', elements: [
        { type: 'text', value: '5x >' }, { type: 'box', key: 's2_a', width: 'w-10' }
      ]},
      { label: 'Divide by 5', stepKey: 's3', elements: [
        { type: 'text', value: 'x >' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '÷' }, { type: 'box', key: 's3_b', width: 'w-10' }
      ]},
      { label: 'Answer', stepKey: 's4', elements: [
        { type: 'text', value: 'x >' }, { type: 'box', key: 's4_a', width: 'w-10' }
      ]},
    ],
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: 'x > 2.4|x > 12/5|x > 2 2/5' , answer_s1_a: '9', answer_s1_b: '3', answer_s2_a: '12', answer_s3_a: '12', answer_s3_b: '5', answer_s4_a: '2.4|12/5|2 2/5', },
    markingCriteria: { answer: 'M1 for 5x > 12; A1 for x > 2.4 or x > 12/5' },
  },
  'test_lin_ineq_pre_q2': {
    id: 'test_lin_ineq_pre_q2',
    questionNumber: '2',
    title: 'Linear inequality with fraction',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Solve the inequality [[x/3]] + 5 > 2.',
    marks: 2,
    hints: [
      'Subtract 5 from both sides first.',
      'Multiply both sides by 3 to solve for x.',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Subtract 5', stepKey: 's1', elements: [
        { type: 'text', value: 'x/3 >' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's1_b', width: 'w-10' }
      ]},
      { label: 'Simplify', stepKey: 's2', elements: [
        { type: 'text', value: 'x/3 >' }, { type: 'box', key: 's2_a', width: 'w-10' }
      ]},
      { label: 'Multiply by 3', stepKey: 's3', elements: [
        { type: 'text', value: 'x >' }, { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '×' }, { type: 'box', key: 's3_b', width: 'w-10' }
      ]},
      { label: 'Answer', stepKey: 's4', elements: [
        { type: 'text', value: 'x >' }, { type: 'box', key: 's4_a', width: 'w-10' }
      ]},
    ],
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: 'x > -9|x > −9' , answer_s1_a: '2', answer_s1_b: '5', answer_s2_a: '-3|−3', answer_s3_a: '-3|−3', answer_s3_b: '3', answer_s4_a: '-9|−9', },
    markingCriteria: { answer: 'M1 for x/3 > −3; A1 for x > −9' },
  },
  'test_lin_ineq_pre_q3': {
    id: 'test_lin_ineq_pre_q3',
    questionNumber: '3',
    title: 'Linear inequality with variable on both sides',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Solve the inequality.\n3n − 11 > 5n − 18',
    marks: 2,
    hints: [
      'Collect the n terms on one side and the constant terms on the other.',
      'Remember to reverse the inequality sign if you divide by a negative number.',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Collect terms', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: 'n −' }, { type: 'box', key: 's1_d', width: 'w-10' }, { type: 'text', value: 'n' }
      ]},
      { label: 'Simplify', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: 'n' }
      ]},
      { label: 'Divide', stepKey: 's3', elements: [
        { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '÷' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: '> n' }
      ]},
      { label: 'Answer', stepKey: 's4', elements: [
        { type: 'text', value: 'n <' }, { type: 'box', key: 's4_a', width: 'w-10' }
      ]},
    ],
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: 'n < 3.5|n < 7/2|n < 3 1/2|3.5 > n|7/2 > n' , answer_s1_a: '-11|−11', answer_s1_b: '18', answer_s1_c: '5', answer_s1_d: '3', answer_s2_a: '7', answer_s2_b: '2', answer_s3_a: '7', answer_s3_b: '2', answer_s4_a: '3.5|7/2|3 1/2', },
    markingCriteria: { answer: 'M1 for 7 > 2n or −2n > −7; A1 for n < 3.5 or n < 7/2' },
  },
  'test_lin_ineq_pre_q4': {
    id: 'test_lin_ineq_pre_q4',
    questionNumber: '4',
    title: 'Fractional linear inequality',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Solve the inequality.\n[[x/2]] − 13 > 12 + 3x',
    marks: 2,
    hints: [
      'Multiply every term by 2 to clear the fraction, or collect x terms directly.',
      'Simplify and divide carefully, reversing the sign if dividing by a negative.',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Multiply by 2', stepKey: 's1', elements: [
        { type: 'text', value: 'x −' }, { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: 'x' }
      ]},
      { label: 'Collect terms', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '−' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's2_c', width: 'w-10' }, { type: 'text', value: 'x −' }, { type: 'text', value: 'x' }
      ]},
      { label: 'Simplify', stepKey: 's3', elements: [
        { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's3_b', width: 'w-10' }, { type: 'text', value: 'x' }
      ]},
      { label: 'Divide', stepKey: 's4', elements: [
        { type: 'box', key: 's4_a', width: 'w-10' }, { type: 'text', value: '÷' }, { type: 'box', key: 's4_b', width: 'w-10' }, { type: 'text', value: '> x' }
      ]},
      { label: 'Answer', stepKey: 's5', elements: [
        { type: 'text', value: 'x <' }, { type: 'box', key: 's5_a', width: 'w-10' }
      ]},
    ],
    parts: [{ label: 'Answer', key: 'answer', marks: 2 }],
    answer: { answer: 'x < -10|x < −10|-10 > x|−10 > x' , answer_s1_a: '26', answer_s1_b: '24', answer_s1_c: '6', answer_s2_a: '-26|−26', answer_s2_b: '24', answer_s2_c: '6', answer_s3_a: '-50|−50', answer_s3_b: '5', answer_s4_a: '-50|−50', answer_s4_b: '5', answer_s5_a: '-10|−10', },
    markingCriteria: { answer: 'M1 for −25 > 2.5x or −50 > 5x; A1 for x < −10' },
  },
  'test_lin_ineq_pre_q5': {
    id: 'test_lin_ineq_pre_q5',
    questionNumber: '5',
    title: 'Double inequality and integers',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Find the integers which satisfy the inequality.\n−5 < 2n − 1 ≤ 5',
    marks: 4,
    hints: [
      'Add 1 to all three parts of the inequality.',
      'Divide all three parts by 2 to find the range for n.',
      'List every integer strictly greater than the lower bound and less than or equal to the upper bound.',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Add 1', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '< 2n ≤' }, { type: 'box', key: 's1_b', width: 'w-10' }
      ]},
      { label: 'Divide by 2', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '< n ≤' }, { type: 'box', key: 's2_b', width: 'w-10' }
      ]},
      { label: 'Integers', stepKey: 's3', elements: [
        { type: 'text', value: 'n =' }, { type: 'box', key: 's3_a', width: 'w-32', px: { w: 176, h: 32 } }
      ]},
    ],
    parts: [{ label: 'Integers', key: 'answer', marks: 4 }],
    answer: { answer: '-1, 0, 1, 2, 3|−1, 0, 1, 2, 3' , answer_s1_a: '-4|−4', answer_s1_b: '6', answer_s2_a: '-2|−2', answer_s2_b: '3', answer_s3_a: '-1, 0, 1, 2, 3|−1, 0, 1, 2, 3', },
    markingCriteria: { answer: 'M1 for −4 < 2n ≤ 6; A1 for −2 < n ≤ 3; B2 for −1, 0, 1, 2, 3' },
  },
  'test_lin_ineq_pre_q6': {
    id: 'test_lin_ineq_pre_q6',
    questionNumber: '6',
    title: 'Linear inequality with brackets',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Solve.\n4(2x − 3) ≥ 43 + 3x',
    marks: 3,
    hints: [
      'Expand the bracket on the left-hand side first.',
      'Collect x terms on one side and constants on the other, then divide.',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Expand', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: 'x −' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '≥ 43 + 3x' }
      ]},
      { label: 'Collect terms', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: 'x −' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: 'x ≥' }, { type: 'box', key: 's2_c', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's2_d', width: 'w-10' }
      ]},
      { label: 'Simplify', stepKey: 's3', elements: [
        { type: 'box', key: 's3_a', width: 'w-10' }, { type: 'text', value: 'x ≥' }, { type: 'box', key: 's3_b', width: 'w-10' }
      ]},
      { label: 'Answer', stepKey: 's4', elements: [
        { type: 'text', value: 'x ≥' }, { type: 'box', key: 's4_a', width: 'w-10' }
      ]},
    ],
    parts: [{ label: 'Answer', key: 'answer', marks: 3 }],
    answer: { answer: 'x ≥ 11|x >= 11|11 ≤ x|11 <= x' , answer_s1_a: '8', answer_s1_b: '12', answer_s2_a: '8', answer_s2_b: '3', answer_s2_c: '43', answer_s2_d: '12', answer_s3_a: '5', answer_s3_b: '55', answer_s4_a: '11', },
    markingCriteria: { answer: 'M1 for 8x − 12 ≥ 43 + 3x; M1 for 5x ≥ 55; A1 for x ≥ 11' },
  },
  'test_lin_ineq_pre_q7': {
    id: 'test_lin_ineq_pre_q7',
    questionNumber: '7',
    title: 'Positive integer solutions of an inequality',
    stepStyle: { fontPx: 16, numBox: { w: 64, h: 32 }, symBox: { w: 32, h: 32 } },
    question: 'Find all the positive integers which satisfy the inequality.\n3n − 8 > 5n − 15',
    marks: 3,
    hints: [
      'Solve the inequality for n by collecting n terms and constants.',
      'Positive integers start from 1 (0 is not positive).',
    ],
    type: 'multi-part',
    equationSolveParts: ['answer'],
    equationStages: [
      { label: 'Collect terms', stepKey: 's1', elements: [
        { type: 'box', key: 's1_a', width: 'w-10' }, { type: 'text', value: '+' }, { type: 'box', key: 's1_b', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's1_c', width: 'w-10' }, { type: 'text', value: 'n −' }, { type: 'box', key: 's1_d', width: 'w-10' }, { type: 'text', value: 'n' }
      ]},
      { label: 'Simplify', stepKey: 's2', elements: [
        { type: 'box', key: 's2_a', width: 'w-10' }, { type: 'text', value: '>' }, { type: 'box', key: 's2_b', width: 'w-10' }, { type: 'text', value: 'n' }
      ]},
      { label: 'Divide', stepKey: 's3', elements: [
        { type: 'text', value: 'n <' }, { type: 'box', key: 's3_a', width: 'w-10' }
      ]},
      { label: 'Positive integers', stepKey: 's4', elements: [
        { type: 'box', key: 's4_a', width: 'w-24', px: { w: 144, h: 32 } }
      ]},
    ],
    parts: [{ label: 'Positive integers', key: 'answer', marks: 3 }],
    answer: { answer: '1, 2, 3' , answer_s1_a: '-8|−8', answer_s1_b: '15', answer_s1_c: '5', answer_s1_d: '3', answer_s2_a: '7', answer_s2_b: '2', answer_s3_a: '3.5|7/2|3 1/2', answer_s4_a: '1, 2, 3', },
    markingCriteria: { answer: 'M1 for 7 > 2n or −2n > −7; A1 for n < 3.5; B1 for 1, 2, 3' },
  },
  'test_lin_ineq_pre_q8': {
    id: 'test_lin_ineq_pre_q8',
    questionNumber: '8',
    title: 'Forming linear inequalities (biscuits and cakes)',
    question:
      'Sima sells x biscuits and y cakes.\n' +
      '(a)(i) She sells at least 100 biscuits.\nWrite down an inequality in x.\n' +
      '(a)(ii) She sells at least 120 cakes.\nWrite down an inequality in y.\n' +
      '(a)(iii) She sells a maximum of 300 biscuits and cakes altogether.\nWrite down an inequality in x and y.\n' +
      '(a)(iv) Sima makes a profit of 40 cents on each biscuit and 80 cents on each cake. Her total profit is at least $160.\nShow that x + 2y ≥ 400.',
    marks: 4,
    hints: [
      '(a)(i) "At least 100" means greater than or equal to 100.',
      '(a)(ii) "At least 120" means greater than or equal to 120.',
      '(a)(iii) "A maximum of 300" means less than or equal to 300.',
      '(a)(iv) Convert $160 to cents (16000 cents), write the profit inequality, then divide through by 40.',
    ],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Inequality in x', key: 'ai', marks: 1 },
      { label: '(a)(ii) Inequality in y', key: 'aii', marks: 1 },
      { label: '(a)(iii) Inequality in x and y', key: 'aiii', marks: 1 },
      { label: '(a)(iv) Show x + 2y ≥ 400', key: 'aiv', marks: 1 },
    ],
    answer: {
      ai: 'x ≥ 100|x >= 100',
      aii: 'y ≥ 120|y >= 120',
      aiii: 'x + y ≤ 300|x + y <= 300|y + x ≤ 300',
      aiv: '40x + 80y ≥ 16000|0.4x + 0.8y ≥ 160|x + 2y ≥ 400',
    },
    markingCriteria: {
      ai: 'B1 for x ≥ 100',
      aii: 'B1 for y ≥ 120',
      aiii: 'B1 for x + y ≤ 300',
      aiv: 'B1 for 40x + 80y ≥ 16000 (or 0.4x + 0.8y ≥ 160) simplified to x + 2y ≥ 400',
    },
  },
  'test_lin_ineq_pre_q9': {
    id: 'test_lin_ineq_pre_q9',
    questionNumber: '9',
    title: 'Forming linear inequalities (potato sacks)',
    question:
      'The school cook buys potatoes in small sacks, each of mass 4 kg, and large sacks, each of mass 10 kg. He buys x small sacks and y large sacks. Today, he buys less than 80 kg of potatoes.\n' +
      '(a) Show that 2x + 5y < 40.\n' +
      '(b) He buys more large sacks than small sacks. He buys no more than 6 large sacks.\nWrite down two inequalities to show this information.',
    marks: 3,
    hints: [
      '(a) Write the total mass inequality 4x + 10y < 80, then simplify by dividing both sides by 2.',
      '(b) Translate "more large sacks than small sacks" and "no more than 6 large sacks" into two inequalities.',
    ],
    type: 'multi-part',
    parts: [
      { label: '(a) Show 2x + 5y < 40', key: 'a', marks: 1 },
      { label: '(b) First inequality (large vs small)', key: 'b1', marks: 1 },
      { label: '(b) Second inequality (large sacks)', key: 'b2', marks: 1 },
    ],
    answer: {
      a: '4x + 10y < 80|2x + 5y < 40',
      b1: 'y > x|x < y',
      b2: 'y ≤ 6|y <= 6',
    },
    markingCriteria: {
      a: 'B1 for 4x + 10y < 80 simplified to 2x + 5y < 40',
      b1: 'B1 for y > x or x < y',
      b2: 'B1 for y ≤ 6',
    },
  },
};

export const sectionsTestLinearInequalitiesPre: PastPaperSection[] = [
  { id: 's_test_lin_ineq_pre_q1', title: 'Q1 – Linear inequality', questionId: 'test_lin_ineq_pre_q1' },
  { id: 's_test_lin_ineq_pre_q2', title: 'Q2 – Linear inequality with fraction', questionId: 'test_lin_ineq_pre_q2' },
  { id: 's_test_lin_ineq_pre_q3', title: 'Q3 – Inequality (variable on both sides)', questionId: 'test_lin_ineq_pre_q3' },
  { id: 's_test_lin_ineq_pre_q4', title: 'Q4 – Fractional linear inequality', questionId: 'test_lin_ineq_pre_q4' },
  { id: 's_test_lin_ineq_pre_q5', title: 'Q5 – Double inequality & integers', questionId: 'test_lin_ineq_pre_q5' },
  { id: 's_test_lin_ineq_pre_q6', title: 'Q6 – Inequality with brackets', questionId: 'test_lin_ineq_pre_q6' },
  { id: 's_test_lin_ineq_pre_q7', title: 'Q7 – Positive integer solutions', questionId: 'test_lin_ineq_pre_q7' },
  { id: 's_test_lin_ineq_pre_q8', title: 'Q8 – Forming inequalities (biscuits & cakes)', questionId: 'test_lin_ineq_pre_q8' },
  { id: 's_test_lin_ineq_pre_q9', title: 'Q9 – Forming inequalities (potato sacks)', questionId: 'test_lin_ineq_pre_q9' },
];