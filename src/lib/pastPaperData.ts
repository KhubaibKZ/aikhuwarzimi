export interface PastPaperQuestion {
  id: string;
  questionNumber: string;
  title: string;
  question: string;
  marks: number;
  hints: string[];
  type: 'short' | 'calculation' | 'multi-part' | 'grid' | 'proof';
  parts?: { label: string; key: string; marks: number }[];
  answer?: string | Record<string, string>;
}

export interface PastPaperSection {
  id: string;
  title: string;
  questionId: string;
}

export interface PastPaper {
  id: string;
  code: string;
  session: string;
  year: number;
  title: string;
  totalMarks: number;
  duration: string;
  sections: PastPaperSection[];
  locked?: boolean;
}

export const pastPaperQuestions: Record<string, PastPaperQuestion> = {
  // Question 1
  'pp_0580_s22_q1a': {
    id: 'pp_0580_s22_q1a',
    questionNumber: '1(a)',
    title: 'Write number in figures',
    question: 'Write the number six and a half million in figures.',
    marks: 1,
    hints: [
      'Six million is 6,000,000',
      'Half a million is 500,000',
      'Add them together'
    ],
    type: 'short',
    answer: '6500000'
  },
  'pp_0580_s22_q1b': {
    id: 'pp_0580_s22_q1b',
    questionNumber: '1(b)',
    title: 'Rounding to nearest ten',
    question: 'Write 6538 correct to the nearest ten.',
    marks: 1,
    hints: [
      'Look at the ones digit (8)',
      'If it is 5 or more, round up',
      'If it is less than 5, round down'
    ],
    type: 'short',
    answer: '6540'
  },
  'pp_0580_s22_q1c': {
    id: 'pp_0580_s22_q1c',
    questionNumber: '1(c)',
    title: 'Order of operations',
    question: 'Work out 6 × 5 + 12 ÷ 3',
    marks: 1,
    hints: [
      'Use BODMAS/BIDMAS order of operations',
      'Multiplication and division come before addition',
      '6 × 5 = 30 and 12 ÷ 3 = 4'
    ],
    type: 'short',
    answer: '34'
  },
  'pp_0580_s22_q1d': {
    id: 'pp_0580_s22_q1d',
    questionNumber: '1(d)',
    title: 'Number types',
    question: 'From this list of numbers: 9, 16, 18, 29, 57, 64, 87, 96\n\nWrite down:\n(i) a factor of 48\n(ii) a cube number\n(iii) a prime number',
    marks: 3,
    hints: [
      'Factors of 48 divide into 48 exactly',
      'Cube numbers are like 1³=1, 2³=8, 3³=27, 4³=64...',
      'Prime numbers are only divisible by 1 and themselves'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) A factor of 48', key: 'factor', marks: 1 },
      { label: '(ii) A cube number', key: 'cube', marks: 1 },
      { label: '(iii) A prime number', key: 'prime', marks: 1 }
    ],
    answer: {
      factor: '16',
      cube: '64',
      prime: '29'
    }
  },
  'pp_0580_s22_q1e': {
    id: 'pp_0580_s22_q1e',
    questionNumber: '1(e)',
    title: 'Square root',
    question: 'Find the value of √0.001225',
    marks: 1,
    hints: [
      'Use a calculator or recognize the pattern',
      '0.001225 = 0.035²',
      'The answer is a decimal'
    ],
    type: 'short',
    answer: '0.035'
  },
  'pp_0580_s22_q1f': {
    id: 'pp_0580_s22_q1f',
    questionNumber: '1(f)',
    title: 'Reciprocal',
    question: 'Find the reciprocal of 8.',
    marks: 1,
    hints: [
      'The reciprocal of a number n is 1/n',
      'Reciprocal of 8 = 1/8',
      'Can be written as a fraction or decimal'
    ],
    type: 'short',
    answer: '1/8'
  },
  'pp_0580_s22_q1g': {
    id: 'pp_0580_s22_q1g',
    questionNumber: '1(g)',
    title: 'Power of zero',
    question: 'Find the value of 8⁰',
    marks: 1,
    hints: [
      'Any non-zero number raised to the power of 0 equals 1',
      'This is a fundamental rule of indices'
    ],
    type: 'short',
    answer: '1'
  },
  'pp_0580_s22_q1h': {
    id: 'pp_0580_s22_q1h',
    questionNumber: '1(h)',
    title: 'Prime factorization',
    question: 'Write 180 as a product of its prime factors.',
    marks: 2,
    hints: [
      'Start dividing by the smallest prime (2)',
      '180 = 2 × 90 = 2 × 2 × 45 = 2 × 2 × 9 × 5',
      'Use index notation: 2² × 3² × 5'
    ],
    type: 'calculation',
    parts: [
      { label: 'Prime factorization (use index notation)', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '2² × 3² × 5'
    }
  },
  'pp_0580_s22_q1i': {
    id: 'pp_0580_s22_q1i',
    questionNumber: '1(i)',
    title: 'LCM',
    question: 'Find the lowest common multiple (LCM) of 160 and 180.',
    marks: 2,
    hints: [
      'First find prime factors: 160 = 2⁵ × 5, 180 = 2² × 3² × 5',
      'LCM uses highest power of each prime',
      'LCM = 2⁵ × 3² × 5'
    ],
    type: 'calculation',
    parts: [
      { label: 'LCM of 160 and 180', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '1440'
    }
  },
  'pp_0580_s22_q1j': {
    id: 'pp_0580_s22_q1j',
    questionNumber: '1(j)',
    title: 'Upper and lower bounds',
    question: 'The mass of an aircraft, m tonnes, is 473 tonnes, correct to the nearest ten.\n\nComplete this statement about the value of m.',
    marks: 2,
    hints: [
      'When rounding to nearest 10, the error is ±5',
      'Lower bound = 473 - 0.5 = 472.5',
      'Upper bound = 473 + 0.5 = 473.5'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Lower bound (≤ m)', key: 'lower', marks: 1 },
      { label: 'Upper bound (m <)', key: 'upper', marks: 1 }
    ],
    answer: {
      lower: '472.5',
      upper: '473.5'
    }
  },

  // Question 2 - Geometry
  'pp_0580_s22_q2a': {
    id: 'pp_0580_s22_q2a',
    questionNumber: '2(a)',
    title: 'Polygon sides',
    question: 'Write down the number of sides of a hexagon.',
    marks: 1,
    hints: [
      'Hex- means 6 (like hexadecimal)',
      'Pentagon = 5, Hexagon = 6, Heptagon = 7'
    ],
    type: 'short',
    answer: '6'
  },
  'pp_0580_s22_q2b': {
    id: 'pp_0580_s22_q2b',
    questionNumber: '2(b)',
    title: 'Triangle types',
    question: 'In triangle ABC, AB = AC.\n\n(i) Write down the mathematical name for this type of triangle.\n(ii) Measure angle CAB.\n(iii) Write down the mathematical name for angle CAB.',
    marks: 3,
    hints: [
      'A triangle with two equal sides is called isosceles',
      'Use a protractor to measure the angle',
      'Angles are classified: acute (<90°), right (=90°), obtuse (>90° and <180°)'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Name of triangle', key: 'name', marks: 1 },
      { label: '(ii) Angle CAB (degrees)', key: 'angle', marks: 1 },
      { label: '(iii) Type of angle', key: 'type', marks: 1 }
    ],
    answer: {
      name: 'Isosceles',
      angle: '125',
      type: 'Obtuse'
    }
  },
  'pp_0580_s22_q2c': {
    id: 'pp_0580_s22_q2c',
    questionNumber: '2(c)',
    title: 'Interior angle of pentagon',
    question: 'Show that the interior angle of a regular pentagon is 108°.',
    marks: 2,
    hints: [
      'Sum of interior angles = (n-2) × 180°',
      'Pentagon has 5 sides, so sum = (5-2) × 180° = 540°',
      'For a regular pentagon, divide by 5'
    ],
    type: 'proof',
    parts: [
      { label: 'Working (show calculation)', key: 'working', marks: 2 }
    ],
    answer: {
      working: '(5-2) × 180 ÷ 5 = 3 × 180 ÷ 5 = 540 ÷ 5 = 108°'
    }
  },
  'pp_0580_s22_q2d': {
    id: 'pp_0580_s22_q2d',
    questionNumber: '2(d)',
    title: 'Parallelogram angles',
    question: 'ABCD is a parallelogram. The reflex angle at D is 248°.\n\nFind angle DCB.',
    marks: 2,
    hints: [
      'Reflex angle + interior angle = 360°',
      'So angle D = 360° - 248° = 112°',
      'In a parallelogram, adjacent angles are supplementary (add to 180°)'
    ],
    type: 'calculation',
    parts: [
      { label: 'Angle DCB', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '68'
    }
  },
  'pp_0580_s22_q2e': {
    id: 'pp_0580_s22_q2e',
    questionNumber: '2(e)',
    title: 'Angles in ratio',
    question: 'The angles of a triangle are in the ratio 3 : 5 : 7.\n\nFind the size of the largest angle in this triangle.',
    marks: 3,
    hints: [
      'Total ratio = 3 + 5 + 7 = 15 parts',
      'Sum of angles in triangle = 180°',
      'Each part = 180° ÷ 15 = 12°',
      'Largest angle = 7 × 12°'
    ],
    type: 'calculation',
    parts: [
      { label: 'Largest angle (degrees)', key: 'answer', marks: 3 }
    ],
    answer: {
      answer: '84'
    }
  },

  // Question 3 - Word problems
  'pp_0580_s22_q3a': {
    id: 'pp_0580_s22_q3a',
    questionNumber: '3(a)',
    title: 'Ticket costs',
    question: 'Sachin, his wife and three children go on a coach holiday.\nEach adult ticket costs $375 and each child ticket costs $194.\n\nWork out the total cost of the tickets.',
    marks: 3,
    hints: [
      'There are 2 adults (Sachin and wife)',
      'There are 3 children',
      'Total = (2 × $375) + (3 × $194)'
    ],
    type: 'calculation',
    parts: [
      { label: 'Total cost ($)', key: 'answer', marks: 3 }
    ],
    answer: {
      answer: '1332'
    }
  },
  'pp_0580_s22_q3b': {
    id: 'pp_0580_s22_q3b',
    questionNumber: '3(b)',
    title: 'Percentage increase',
    question: 'A meal costs $110 plus a service charge of 18%.\n\nCalculate the total cost of the meal.',
    marks: 2,
    hints: [
      'Service charge = 18% of $110',
      '18% = 0.18',
      'Total = $110 + service charge'
    ],
    type: 'calculation',
    parts: [
      { label: 'Total cost ($)', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '129.8'
    }
  },
  'pp_0580_s22_q3c': {
    id: 'pp_0580_s22_q3c',
    questionNumber: '3(c)',
    title: 'Temperature change',
    question: 'One day, the temperature at midday is 16°C.\nAt midnight the temperature has fallen by 23°C.\n\nWork out the temperature at midnight.',
    marks: 1,
    hints: [
      'Temperature falls means subtract',
      '16 - 23 will give a negative number',
      'The answer is below zero'
    ],
    type: 'short',
    answer: '-7'
  },
  'pp_0580_s22_q3d': {
    id: 'pp_0580_s22_q3d',
    questionNumber: '3(d)',
    title: 'Fraction of amount',
    question: 'Sachin spends $768 on holiday.\nHe spends 3/8 of this amount on presents.\n\nFind how much he spends on presents.',
    marks: 2,
    hints: [
      'Calculate 3/8 of $768',
      'Divide $768 by 8, then multiply by 3',
      '768 ÷ 8 = 96'
    ],
    type: 'calculation',
    parts: [
      { label: 'Amount spent on presents ($)', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '288'
    }
  },
  'pp_0580_s22_q3e': {
    id: 'pp_0580_s22_q3e',
    questionNumber: '3(e)',
    title: 'Division with rounding',
    question: 'There are 604 passengers on the holiday.\nThe coach company uses coaches which can carry 46 passengers.\n\nWork out the number of coaches needed.',
    marks: 2,
    hints: [
      'Divide 604 by 46',
      '604 ÷ 46 = 13.13...',
      'You need to round UP because partial coaches aren\'t possible'
    ],
    type: 'calculation',
    parts: [
      { label: 'Number of coaches', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '14'
    }
  },
  'pp_0580_s22_q3f': {
    id: 'pp_0580_s22_q3f',
    questionNumber: '3(f)',
    title: 'Percentage calculation',
    question: '268 of the 604 passengers are women.\n\nFind the percentage of the passengers that are women.',
    marks: 2,
    hints: [
      'Percentage = (part ÷ whole) × 100',
      '(268 ÷ 604) × 100',
      'Give answer to 3 significant figures'
    ],
    type: 'calculation',
    parts: [
      { label: 'Percentage (%)', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '44.4'
    }
  },
  'pp_0580_s22_q3g': {
    id: 'pp_0580_s22_q3g',
    questionNumber: '3(g)',
    title: 'Speed, distance, time',
    question: 'A coach travels at an average speed of 54 km/h.\n\nFind how long, in hours and minutes, this coach takes to travel 126 km.',
    marks: 3,
    hints: [
      'Time = Distance ÷ Speed',
      'Time = 126 ÷ 54 = 2.333... hours',
      'Convert 0.333... hours to minutes: 0.333 × 60 = 20 minutes'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Hours', key: 'hours', marks: 1 },
      { label: 'Minutes', key: 'minutes', marks: 2 }
    ],
    answer: {
      hours: '2',
      minutes: '20'
    }
  },

  // Question 4 - Volume and Area
  'pp_0580_s22_q4a': {
    id: 'pp_0580_s22_q4a',
    questionNumber: '4(a)',
    title: 'Volume of prism',
    question: 'A right-angled triangular prism has dimensions: 3 cm, 4 cm base triangle and 7 cm length.\n\nWork out the volume of this prism.',
    marks: 2,
    hints: [
      'Volume of prism = Area of cross-section × length',
      'Area of triangle = ½ × base × height = ½ × 3 × 4',
      'Volume = 6 × 7'
    ],
    type: 'calculation',
    parts: [
      { label: 'Volume (cm³)', key: 'answer', marks: 2 }
    ],
    answer: {
      answer: '42'
    }
  },
  'pp_0580_s22_q4b': {
    id: 'pp_0580_s22_q4b',
    questionNumber: '4(b)',
    title: 'Rectangle with circles',
    question: 'A rectangle contains 6 congruent circles. Each circle has radius 8 cm and touches adjacent circles and the sides of the rectangle.\n\n(i) Show that the length of the rectangle is 48 cm.\n(ii) Find the area of the rectangle. Give the units of your answer.\n(iii) Calculate the percentage of the rectangle that is shaded.',
    marks: 7,
    hints: [
      'Length = 6 × radius × 1... wait, 3 circles across means length = 6 × 8 = 48 cm',
      'Width = 4 × 8 = 32 cm (2 circles high)',
      'Area of rectangle = 48 × 32',
      'Area of 6 circles = 6 × π × 8²',
      'Shaded area = Rectangle area - Circles area'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) Show length = 48 cm (working)', key: 'length', marks: 1 },
      { label: '(ii) Area of rectangle (with units)', key: 'area', marks: 3 },
      { label: '(iii) Percentage shaded (%)', key: 'percentage', marks: 3 }
    ],
    answer: {
      length: '3 circles × 2 radii = 3 × 16 = 48 cm',
      area: '1536 cm²',
      percentage: '21.5'
    }
  },

  // Question 6 - Algebra
  'pp_0580_s22_q6a': {
    id: 'pp_0580_s22_q6a',
    questionNumber: '6(a)',
    title: 'Writing expressions',
    question: 'A football team has w wins and d draws.\nThe team scores 3 points for each win and 1 point for each draw.\n\nWrite an expression, in terms of w and d, for the total number of points scored by the team.',
    marks: 2,
    hints: [
      'Points from wins = 3 × w = 3w',
      'Points from draws = 1 × d = d',
      'Total = 3w + d'
    ],
    type: 'short',
    answer: '3w + d'
  },
  'pp_0580_s22_q6b': {
    id: 'pp_0580_s22_q6b',
    questionNumber: '6(b)',
    title: 'Forming and solving equations',
    question: 'Athletic, Rovers and United are three football teams.\n• Athletic have a point score of x.\n• Rovers have 12 points more than Athletic.\n• United have 3 points fewer than twice Athletic\'s point score.\n• The total point score of all three teams is 121.\n\nUse this information to write down an equation in terms of x.\nSolve your equation to work out the point score for each team.',
    marks: 5,
    hints: [
      'Athletic = x, Rovers = x + 12, United = 2x - 3',
      'Total: x + (x + 12) + (2x - 3) = 121',
      'Simplify: 4x + 9 = 121',
      'Solve for x, then find each team\'s score'
    ],
    type: 'multi-part',
    parts: [
      { label: 'Equation in terms of x', key: 'equation', marks: 1 },
      { label: 'Athletic (points)', key: 'athletic', marks: 1 },
      { label: 'Rovers (points)', key: 'rovers', marks: 1 },
      { label: 'United (points)', key: 'united', marks: 2 }
    ],
    answer: {
      equation: 'x + (x + 12) + (2x - 3) = 121',
      athletic: '28',
      rovers: '40',
      united: '53'
    }
  },
  'pp_0580_s22_q6c': {
    id: 'pp_0580_s22_q6c',
    questionNumber: '6(c)',
    title: 'Simplifying expressions',
    question: 'Simplify.\n(i) 4a - 3b + 5a + 6b\n(ii) 6(2x + 1) - 5(x - 2)',
    marks: 4,
    hints: [
      'Collect like terms: 4a + 5a and -3b + 6b',
      'Expand brackets first: 6(2x+1) = 12x + 6',
      'Then 5(x-2) = 5x - 10',
      'Combine: 12x + 6 - 5x + 10'
    ],
    type: 'multi-part',
    parts: [
      { label: '(i) 4a - 3b + 5a + 6b', key: 'first', marks: 2 },
      { label: '(ii) 6(2x + 1) - 5(x - 2)', key: 'second', marks: 2 }
    ],
    answer: {
      first: '9a + 3b',
      second: '7x + 16'
    }
  },
  'pp_0580_s22_q6d': {
    id: 'pp_0580_s22_q6d',
    questionNumber: '6(d)',
    title: 'Simultaneous equations',
    question: 'Solve the simultaneous equations.\nYou must show all your working.\n\n3x + 5y = 11\n2x - 3y = 20',
    marks: 4,
    hints: [
      'Multiply equations to eliminate one variable',
      'Multiply first equation by 3 and second by 5 to eliminate y',
      'Or use substitution method',
      'Check your answer in both equations'
    ],
    type: 'multi-part',
    parts: [
      { label: 'x =', key: 'x', marks: 2 },
      { label: 'y =', key: 'y', marks: 2 }
    ],
    answer: {
      x: '7',
      y: '-2'
    }
  },

  // Question 8 - Linear graphs
  'pp_0580_s22_q8a': {
    id: 'pp_0580_s22_q8a',
    questionNumber: '8(a)',
    title: 'Equation of a line',
    question: 'The grid shows a line L passing through points (-4, 4) and (2, 1).\n\nFind the equation of line L. Give your answer in the form y = mx + c.',
    marks: 2,
    hints: [
      'Gradient m = (y₂ - y₁)/(x₂ - x₁) = (1-4)/(2-(-4))',
      'm = -3/6 = -1/2',
      'Use y = mx + c with a point to find c'
    ],
    type: 'short',
    answer: 'y = -½x + 2'
  },
  'pp_0580_s22_q8b': {
    id: 'pp_0580_s22_q8b',
    questionNumber: '8(b)',
    title: 'Table of values',
    question: 'Complete the table of values for y = 2x + 5.\n\n| x | -5 | -3 | 0 |\n| y |    |    |   |',
    marks: 2,
    hints: [
      'Substitute each x value into y = 2x + 5',
      'When x = -5: y = 2(-5) + 5 = -10 + 5 = -5',
      'When x = -3: y = 2(-3) + 5 = -6 + 5 = -1'
    ],
    type: 'multi-part',
    parts: [
      { label: 'y when x = -5', key: 'y1', marks: 1 },
      { label: 'y when x = -3', key: 'y2', marks: 1 },
      { label: 'y when x = 0', key: 'y3', marks: 0 }
    ],
    answer: {
      y1: '-5',
      y2: '-1',
      y3: '5'
    }
  },
  'pp_0580_s22_q8c': {
    id: 'pp_0580_s22_q8c',
    questionNumber: '8(c)',
    title: 'Intersection point',
    question: 'Write down the coordinates of the point which lies on both line L and the graph of y = 2x + 5.',
    marks: 1,
    hints: [
      'Find where the two lines cross',
      'This is where -½x + 2 = 2x + 5',
      'Read the coordinates from the graph'
    ],
    type: 'short',
    answer: '(-1.2, 2.6)'
  },
  'pp_0580_s22_q8d': {
    id: 'pp_0580_s22_q8d',
    questionNumber: '8(d)',
    title: 'Parallel lines',
    question: 'Write down the equation of the line that is parallel to y = 2x + 5 and passes through the point (0, 18).',
    marks: 1,
    hints: [
      'Parallel lines have the same gradient',
      'Gradient of y = 2x + 5 is 2',
      'The line passes through (0, 18), so c = 18'
    ],
    type: 'short',
    answer: 'y = 2x + 18'
  }
};

export const pastPapers: PastPaper[] = [
  {
    id: 'pp_0580_s22_31',
    code: '0580/31',
    session: 'May/June',
    year: 2022,
    title: '0580/31 May/June 2022',
    totalMarks: 104,
    duration: '2 hours',
    sections: [
      { id: 'q1a', title: 'Q1(a): Write number in figures', questionId: 'pp_0580_s22_q1a' },
      { id: 'q1b', title: 'Q1(b): Rounding to nearest ten', questionId: 'pp_0580_s22_q1b' },
      { id: 'q1c', title: 'Q1(c): Order of operations', questionId: 'pp_0580_s22_q1c' },
      { id: 'q1d', title: 'Q1(d): Number types', questionId: 'pp_0580_s22_q1d' },
      { id: 'q1e', title: 'Q1(e): Square root', questionId: 'pp_0580_s22_q1e' },
      { id: 'q1f', title: 'Q1(f): Reciprocal', questionId: 'pp_0580_s22_q1f' },
      { id: 'q1g', title: 'Q1(g): Power of zero', questionId: 'pp_0580_s22_q1g' },
      { id: 'q1h', title: 'Q1(h): Prime factorization', questionId: 'pp_0580_s22_q1h' },
      { id: 'q1i', title: 'Q1(i): LCM', questionId: 'pp_0580_s22_q1i' },
      { id: 'q1j', title: 'Q1(j): Upper and lower bounds', questionId: 'pp_0580_s22_q1j' },
      { id: 'q2a', title: 'Q2(a): Polygon sides', questionId: 'pp_0580_s22_q2a' },
      { id: 'q2b', title: 'Q2(b): Triangle types', questionId: 'pp_0580_s22_q2b' },
      { id: 'q2c', title: 'Q2(c): Interior angle of pentagon', questionId: 'pp_0580_s22_q2c' },
      { id: 'q2d', title: 'Q2(d): Parallelogram angles', questionId: 'pp_0580_s22_q2d' },
      { id: 'q2e', title: 'Q2(e): Angles in ratio', questionId: 'pp_0580_s22_q2e' },
      { id: 'q3a', title: 'Q3(a): Ticket costs', questionId: 'pp_0580_s22_q3a' },
      { id: 'q3b', title: 'Q3(b): Percentage increase', questionId: 'pp_0580_s22_q3b' },
      { id: 'q3c', title: 'Q3(c): Temperature change', questionId: 'pp_0580_s22_q3c' },
      { id: 'q3d', title: 'Q3(d): Fraction of amount', questionId: 'pp_0580_s22_q3d' },
      { id: 'q3e', title: 'Q3(e): Division with rounding', questionId: 'pp_0580_s22_q3e' },
      { id: 'q3f', title: 'Q3(f): Percentage calculation', questionId: 'pp_0580_s22_q3f' },
      { id: 'q3g', title: 'Q3(g): Speed, distance, time', questionId: 'pp_0580_s22_q3g' },
      { id: 'q4a', title: 'Q4(a): Volume of prism', questionId: 'pp_0580_s22_q4a' },
      { id: 'q4b', title: 'Q4(b): Rectangle with circles', questionId: 'pp_0580_s22_q4b' },
      { id: 'q6a', title: 'Q6(a): Writing expressions', questionId: 'pp_0580_s22_q6a' },
      { id: 'q6b', title: 'Q6(b): Forming and solving equations', questionId: 'pp_0580_s22_q6b' },
      { id: 'q6c', title: 'Q6(c): Simplifying expressions', questionId: 'pp_0580_s22_q6c' },
      { id: 'q6d', title: 'Q6(d): Simultaneous equations', questionId: 'pp_0580_s22_q6d' },
      { id: 'q8a', title: 'Q8(a): Equation of a line', questionId: 'pp_0580_s22_q8a' },
      { id: 'q8b', title: 'Q8(b): Table of values', questionId: 'pp_0580_s22_q8b' },
      { id: 'q8c', title: 'Q8(c): Intersection point', questionId: 'pp_0580_s22_q8c' },
      { id: 'q8d', title: 'Q8(d): Parallel lines', questionId: 'pp_0580_s22_q8d' }
    ]
  },
  {
    id: 'pp_0580_s21_43',
    code: '0580/43',
    session: 'May/June',
    year: 2021,
    title: '0580/43 May/June 2021',
    totalMarks: 130,
    duration: '2 hours 30 minutes',
    sections: [],
    locked: true
  }
];

export const getPastPaperQuestion = (id: string): PastPaperQuestion | undefined => {
  return pastPaperQuestions[id];
};
