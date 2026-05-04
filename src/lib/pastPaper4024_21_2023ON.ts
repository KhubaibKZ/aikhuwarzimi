// 4024/21 October/November 2023 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2023ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on23_21_q1': {
    id: 'pp_4024_on23_21_q1', questionNumber: '1', title: 'Population and percentages',
    question: '(a) Population 36400, 23% aged 18 and under. Find number over 18.\n(b) Ratio under 18:18-60:over 60 = 4:11:5. 890 over 60. Find total aged 60 and under.\n(c)(i) Population went from 702800 to 678202. Find % decrease.\n(c)(ii) Population increased 12% between 1980 and 2015 to 702800. Find 1980 population.\n(d)(i) Find difference between Bahrain (1.54×10⁶) and Maldives (3.92×10⁵) populations.\n(d)(ii) Which country has highest population density?',
    marks: 12, hints: ['(a) 77% of 36400 = 28028', '(b) 890/5 × (4+11) = 2670', '(c)(i) (702800−678202)/702800 × 100 = 3.5%', '(c)(ii) 702800/1.12 = 627500'],
    type: 'multi-part',
    parts: [
      { label: '(a) Over 18', key: 'a', marks: 2 }, { label: '(b) Aged 60 and under', key: 'b', marks: 2 },
      { label: '(c)(i) % decrease', key: 'ci', marks: 2 }, { label: '(c)(ii) 1980 population', key: 'cii', marks: 2 },
      { label: '(d)(i) Difference', key: 'di', marks: 1 }, { label: '(d)(ii) Highest density', key: 'dii', marks: 3 }
    ],
    answer: { a: '28028', b: '2670', ci: '3.5', cii: '627500', di: '1.148 × 10⁶', dii: 'Bahrain' }
  },
  'pp_4024_on23_21_q2': {
    id: 'pp_4024_on23_21_q2', questionNumber: '2', title: 'Transformations',
    question: '(a)(i) Write down the equation of line R.\n(a)(ii) Draw the image of triangle A after reflection in line R.\n(b) Describe fully the transformation mapping triangle A onto triangle B.',
    marks: 5, hints: ['(a)(i) Line R: x = 2', '(a)(ii) Reflect across x = 2', '(b) Rotation 90° anticlockwise about (0,0)'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Equation of R', key: 'ai', marks: 1 }, { label: '(a)(ii) Reflection', key: 'aii', marks: 1 }, { label: '(b) Transformation', key: 'b', marks: 3 }],
    answer: { ai: 'x = 2', aii: 'Correct reflection', b: 'Rotation, 90° anticlockwise, centre (0,0)' }
  },
  'pp_4024_on23_21_q3': {
    id: 'pp_4024_on23_21_q3', questionNumber: '3', title: 'Straight line and coordinate geometry',
    question: '(a)(i) Find gradient of line L: 4y = x − 5.\n(a)(ii) Find where L crosses y-axis.\n(b)(i) Find length of AB where A(4,5), B(−2,8).\n(b)(ii) Find equation of line AB in form y = mx + c.',
    marks: 7, hints: ['(a)(i) y = x/4 − 5/4, gradient = 1/4', '(a)(ii) (0, −5/4)', '(b)(i) √(36+9) = √45 = 6.71', '(b)(ii) m = (8−5)/(−2−4) = −1/2'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Gradient', key: 'ai', marks: 1 }, { label: '(a)(ii) y-intercept', key: 'aii', marks: 1 },
      { label: '(b)(i) Length AB', key: 'bi', marks: 2 }, { label: '(b)(ii) Equation', key: 'bii', marks: 3 }
    ],
    answer: { ai: '1/4', aii: '(0, -5/4)', bi: '6.71', bii: 'y = -1/2x + 7' }
  },
  'pp_4024_on23_21_q4': {
    id: 'pp_4024_on23_21_q4', questionNumber: '4', title: 'Sequences',
    question: '(a)(i) Find next term: 5, 12, 19, 26, 33.\n(a)(ii) Find nth term.\n(a)(iii) Tₖ + Tₖ₊₁ = 703. Find k.\n(b) nth term = n² + an + b. 1st term = 3, 3rd term = 19. Find the 6th term.',
    marks: 11, hints: ['(a)(i) +7 each time, next = 40', '(a)(ii) 7n − 2', '(a)(iii) (7k−2)+(7k+5) = 703, 14k+3=703, k=50', '(b) 1+a+b=3, 9+3a+b=19, solve: a=4, b=−2, 6th=58'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Next term', key: 'ai', marks: 1 }, { label: '(a)(ii) nth term', key: 'aii', marks: 2 },
      { label: '(a)(iii) k', key: 'aiii', marks: 3 }, { label: '(b) 6th term', key: 'b', marks: 5 }
    ],
    answer: { ai: '40', aii: '7n-2', aiii: '50', b: '58' }
  },
  'pp_4024_on23_21_q5': {
    id: 'pp_4024_on23_21_q5', questionNumber: '5', title: 'Timetable and cumulative frequency',
    question: '(a)(i) How long from town square to business park?\n(a)(ii) Tom arrives at railway station at 07:12. Find time he arrives at airport.\n(b)(i) Estimate workers with journey < 30 min.\n(b)(ii) Find IQR.\n(b)(iii) Find % with journey > 1 hour.\n(c) Lower bound of average speed: 37 km (nearest km), 43 min (nearest min).',
    marks: 11, hints: ['(a)(i) 46 minutes', '(a)(ii) Next bus at 07:28 from station, arrives airport 08:15', '(c) Lower bound speed = 36.5/(43.5/60)'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Minutes', key: 'ai', marks: 1 }, { label: '(a)(ii) Arrival time', key: 'aii', marks: 1 },
      { label: '(b)(i) Workers < 30 min', key: 'bi', marks: 1 }, { label: '(b)(ii) IQR', key: 'bii', marks: 2 },
      { label: '(b)(iii) % > 1 hour', key: 'biii', marks: 3 }, { label: '(c) Lower bound speed (km/h)', key: 'c', marks: 3 }
    ],
    answer: { ai: '46', aii: '08:15', bi: '56', bii: '30', biii: '17.5', c: '50.3' }
  },
  'pp_4024_on23_21_q6': {
    id: 'pp_4024_on23_21_q6', questionNumber: '6', title: 'Rectangle area and graph',
    question: 'ABCD rectangle area 30 cm², AB = x cm. Rectangle DEFG removed (AE = CG = 2 cm).\n(a) Expression for BC.\n(b) Show shaded area y = 2x + [[60/x]] − 4.\n(c) Complete table.\n(d) Draw graph.\n(e) When y = 24, find dimensions.',
    marks: 10, hints: ['(a) BC = 30/x', '(b) Shaded = total − removed rectangle', '(e) Read x values from graph at y = 24'],
    type: 'multi-part',
    parts: [
      { label: '(a) BC', key: 'a', marks: 1 }, { label: '(b) Show formula', key: 'b', marks: 3 },
      { label: '(c) Missing value', key: 'c', marks: 1 }, { label: '(d) Graph', key: 'd', marks: 3 },
      { label: '(e) Dimensions', key: 'e', marks: 2 }
    ],
    answer: { a: '30/x', b: 'y = 2x + 60/x - 4', c: '28.3', d: 'Correct curve', e: '3 cm by 10 cm' }
  },
  'pp_4024_on23_21_q7': {
    id: 'pp_4024_on23_21_q7', questionNumber: '7', title: 'Algebra',
    question: '(a) Simplify 7a − 4b − 2a + b.\n(b) Expand 3(2x−3) + 5(x+2).\n(c) Solve 6x² − 2x − 9 = 0 (2 d.p.).\n(d)(i) Simplify [[x/4]] × [[2/y]].\n(d)(ii) Write as single fraction: [[3/(x−5)]] − [[7/(2x+1)]].',
    marks: 11, hints: ['(a) 5a − 3b', '(b) 6x−9+5x+10 = 11x+1', '(c) Quadratic formula', '(d)(i) x/(2y) or xy/... MS says xy/2'],
    type: 'multi-part',
    parts: [
      { label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) Expanded', key: 'b', marks: 2 },
      { label: '(c) x values', key: 'c', marks: 3 }, { label: '(d)(i) Simplified', key: 'di', marks: 1 },
      { label: '(d)(ii) Single fraction', key: 'dii', marks: 3 }
    ],
    answer: { a: '5a-3b', b: '11x+1', c: '-1.07, 1.40', di: 'xy/2', dii: '(38-x)/((2x+1)(x-5))' }
  },
  'pp_4024_on23_21_q8': {
    id: 'pp_4024_on23_21_q8', questionNumber: '8', title: 'Statistics and probability',
    question: '(a) 40 children asked how many books read: 0→7, 1→11, 2→9, 3→5, 4→6, 5→2.\n(i) Mode. (ii) Median. (iii) Mean. (iv) P(4 or more books).\n(b) 10 books: 7 fiction, 3 non-fiction.\n(i) P(one fiction, one non-fiction) with replacement.\n(ii) P(only one fiction from 3) without replacement.',
    marks: 12, hints: ['(a)(i) Mode = 1', '(a)(ii) Median = 2', '(a)(iii) Mean = 78/40 = 1.95', '(a)(iv) 8/40 = 1/5'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Mode', key: 'ai', marks: 1 }, { label: '(a)(ii) Median', key: 'aii', marks: 1 },
      { label: '(a)(iii) Mean', key: 'aiii', marks: 2 }, { label: '(a)(iv) P(≥4)', key: 'aiv', marks: 2 },
      { label: '(b)(i) P(one each)', key: 'bi', marks: 2 }, { label: '(b)(ii) P(one fiction from 3)', key: 'bii', marks: 3 }
    ],
    answer: { ai: '1', aii: '2', aiii: '1.95', aiv: '1/5', bi: '21/50', bii: '7/40' }
  },
  'pp_4024_on23_21_q9': {
    id: 'pp_4024_on23_21_q9', questionNumber: '9', title: 'Prism and cuboid',
    question: '(a) Triangular prism: AB = 6, angle BAC = 55°, length 20, area of triangle = 34.4 cm².\n(i) Calculate volume.\n(ii) Show AC = 14.0 cm.\n(iii) Calculate surface area.\n(b) Cuboid with square base, height 8, volume 98. Calculate diagonal PQ.',
    marks: 14, hints: ['(a)(i) V = 34.4 × 20 = 688 cm³', '(a)(ii) ½ × 6 × AC × sin55 = 34.4', '(b) Base area = 98/8 = 12.25, side = 3.5, PQ = √(3.5²+3.5²+8²)'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Volume', key: 'ai', marks: 2 }, { label: '(a)(ii) AC', key: 'aii', marks: 3 },
      { label: '(a)(iii) Surface area', key: 'aiii', marks: 5 }, { label: '(b) PQ', key: 'b', marks: 4 }
    ],
    answer: { ai: '688 cm³', aii: '14.0', aiii: '702', b: '9.41' }
  },
  'pp_4024_on23_21_q10': {
    id: 'pp_4024_on23_21_q10', questionNumber: '10', title: 'Circle theorems and congruence',
    question: '(a) Circle centre O, diameters AC and BD. Show triangle OAB ≅ triangle ODC.\n(b) Diameter = 10, AB = 9. Calculate difference between circumference and perimeter of shaded shape.',
    marks: 8, hints: ['(a) AO = DO (radii), BO = CO (radii), AOB = DOC (vertically opposite) → SAS', '(b) Find angle AOB, use arcs'],
    type: 'multi-part',
    parts: [{ label: '(a) Congruence proof', key: 'a', marks: 3 }, { label: '(b) Difference (cm)', key: 'b', marks: 5 }],
    answer: { a: 'SAS congruence', b: '4.39' }
  },
};

export const sections4024_21_2023ON: PastPaperSection[] = [
  { id: 's_4024_on23_21_q1', title: 'Q1 – Population & percentages', questionId: 'pp_4024_on23_21_q1' },
  { id: 's_4024_on23_21_q2', title: 'Q2 – Transformations', questionId: 'pp_4024_on23_21_q2' },
  { id: 's_4024_on23_21_q3', title: 'Q3 – Coordinate geometry', questionId: 'pp_4024_on23_21_q3' },
  { id: 's_4024_on23_21_q4', title: 'Q4 – Sequences', questionId: 'pp_4024_on23_21_q4' },
  { id: 's_4024_on23_21_q5', title: 'Q5 – Timetable & cumulative frequency', questionId: 'pp_4024_on23_21_q5' },
  { id: 's_4024_on23_21_q6', title: 'Q6 – Rectangle area & graph', questionId: 'pp_4024_on23_21_q6' },
  { id: 's_4024_on23_21_q7', title: 'Q7 – Algebra', questionId: 'pp_4024_on23_21_q7' },
  { id: 's_4024_on23_21_q8', title: 'Q8 – Statistics & probability', questionId: 'pp_4024_on23_21_q8' },
  { id: 's_4024_on23_21_q9', title: 'Q9 – Prism & cuboid', questionId: 'pp_4024_on23_21_q9' },
  { id: 's_4024_on23_21_q10', title: 'Q10 – Circle theorems', questionId: 'pp_4024_on23_21_q10' },
];
