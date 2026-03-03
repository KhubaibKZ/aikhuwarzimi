// 4024/21 October/November 2022 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2022ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on22_21_q1': {
    id: 'pp_4024_on22_21_q1', questionNumber: '1', title: 'Time, percentages and ratio',
    question: '(a) Abid works 5 days each week: 08:15–12:40 and 13:30–17:00. Find total time per week.\n(b) Abid earns $14.20/hr. 5% pay increase. Calculate new hourly rate.\n(c) Abid divides earnings: 20% rent, 3/8 bills, rest savings. Find ratio rent:bills:savings.\n(d) $2400 invested for 4 years, simple interest gives $153.60. Find rate r%.\n(e) Compound interest 1.4% per year, after 5 years = $1822.38. Find initial investment.',
    marks: 12, hints: ['(a) Daily: 4h25m + 3h30m = 7h55m, weekly = 39h35m', '(b) 14.20 × 1.05 = 14.91', '(c) 20% = 8/40, 3/8 = 15/40, rest = 17/40, ratio 8:15:17', '(d) 153.60 = 2400×r×4/100, r = 1.6', '(e) P × 1.014⁵ = 1822.38'],
    type: 'multi-part',
    parts: [{ label: '(a) Total time', key: 'a', marks: 2 }, { label: '(b) New rate ($)', key: 'b', marks: 2 }, { label: '(c) Ratio', key: 'c', marks: 3 }, { label: '(d) r', key: 'd', marks: 2 }, { label: '(e) Initial ($)', key: 'e', marks: 3 }],
    answer: { a: '39h 35min', b: '14.91', c: '8:15:17', d: '1.6', e: '1700' }
  },
  'pp_4024_on22_21_q2': {
    id: 'pp_4024_on22_21_q2', questionNumber: '2', title: 'Scatter diagram and grouped data',
    question: '(a) Ages and heights of 10 boys.\n(i) Complete scatter diagram.\n(ii) Draw line of best fit.\n(iii) Estimate height of 14-year-old.\n(iv) Explain why line shouldn\'t be used for age 22.\n(b) Heights of 180 girls.\n(i) Percentage taller than 145 cm.\n(ii) Estimate mean height.',
    marks: 12, hints: ['(a)(iii) Read from line at age 14', '(a)(iv) Outside range of data', '(b)(i) (62+24)/180 × 100 = 47.8%', '(b)(ii) Use midpoints × frequencies'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Scatter diagram', key: 'ai', marks: 2 }, { label: '(a)(ii) Line of best fit', key: 'aii', marks: 1 }, { label: '(a)(iii) Height (cm)', key: 'aiii', marks: 1 }, { label: '(a)(iv) Explanation', key: 'aiv', marks: 1 }, { label: '(b)(i) Percentage', key: 'bi', marks: 2 }, { label: '(b)(ii) Mean (cm)', key: 'bii', marks: 3 }],
    answer: { ai: 'Points plotted', aii: 'Line drawn', aiii: '≈155', aiv: 'Outside range of data', bi: '47.8', bii: '144' }
  },
  'pp_4024_on22_21_q3': {
    id: 'pp_4024_on22_21_q3', questionNumber: '3', title: 'Cubic graph',
    question: '(a) Complete the table for y = x³/2 − 3x/2 + 2.\n(b) Draw the graph for −3 ≤ x ≤ 3.\n(c) Write down the coordinates of the minimum point for x ≥ 0.\n(d) Use your graph to solve x³/2 − 3x/2 + 2 = 0.',
    marks: 8, hints: ['(a) When x=3: 27/2 − 9/2 + 2 = 6.5', '(c) Minimum at approximately (1, −0.5) or similar', '(d) Read x-intercepts'],
    type: 'multi-part',
    parts: [{ label: '(a) Missing value', key: 'a', marks: 1 }, { label: '(b) Graph', key: 'b', marks: 3 }, { label: '(c) Minimum point', key: 'c', marks: 2 }, { label: '(d) Solutions', key: 'd', marks: 2 }],
    answer: { a: '6.5', b: 'Curve drawn', c: '(1, 0) approx', d: 'x ≈ −2, 1' }
  },
  'pp_4024_on22_21_q4': {
    id: 'pp_4024_on22_21_q4', questionNumber: '4', title: 'Functions',
    question: 'f(x) = 2/(x² − 7), g(x) = (4 − 3x)/2.\n(a) Find f(8).\n(b) Find g(−2).\n(c) Find g⁻¹(x).\n(d) Solve f(2x − 1) + 3 = 0.',
    marks: 9, hints: ['(a) 2/(64−7) = 2/57', '(b) (4+6)/2 = 5', '(c) 2y = 4−3x, x = (4−2y)/3, g⁻¹(x) = (4−2x)/3', '(d) 2/((2x−1)²−7) = −3'],
    type: 'multi-part',
    parts: [{ label: '(a) f(8)', key: 'a', marks: 1 }, { label: '(b) g(−2)', key: 'b', marks: 1 }, { label: '(c) g⁻¹(x)', key: 'c', marks: 3 }, { label: '(d) Solutions', key: 'd', marks: 4 }],
    answer: { a: '2/57', b: '5', c: '(4-2x)/3', d: '-1/2 and 3/2' }
  },
  'pp_4024_on22_21_q5': {
    id: 'pp_4024_on22_21_q5', questionNumber: '5', title: 'Probability',
    question: '(a)(i) George has two bags of black and white balls. Show he is more likely to take black from bag 2.\n(a)(ii) He takes from bag 2, 220 times with replacement. Expected white balls?\n(b) Bag: 7 blue, 6 red, 3 green. Two taken without replacement.\n(i) Complete tree diagram.\n(ii) Find P(at least one red).',
    marks: 12, hints: ['(a)(i) Compare probabilities', '(a)(ii) P(white) × 220 = 120', '(b)(ii) P(at least one red) = 1 − P(no red) = 5/8'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Justification', key: 'ai', marks: 2 }, { label: '(a)(ii) Expected', key: 'aii', marks: 2 }, { label: '(b)(i) Tree diagram', key: 'bi', marks: 2 }, { label: '(b)(ii) P(at least one red)', key: 'bii', marks: 3 }],
    answer: { ai: '5/11 > 4/9', aii: '120', bi: 'Complete tree', bii: '5/8' }
  },
  'pp_4024_on22_21_q6': {
    id: 'pp_4024_on22_21_q6', questionNumber: '6', title: 'Vectors and parallelogram',
    question: '(a)(i) Find vector AB.\n(a)(ii) Find |AB|.\n(a)(iii) ABCD is a parallelogram. BC = (−4, 1). Find C and D.\n(b) P(r,4), Q(t,u). Midpoint (1,3), gradient −1. Find r, t, u.',
    marks: 10, hints: ['(a)(i) AB = (5, −4) approx', '(b) Use midpoint and gradient equations'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Vector AB', key: 'ai', marks: 1 }, { label: '(a)(ii) |AB|', key: 'aii', marks: 2 }, { label: '(a)(iii) C and D', key: 'aiii', marks: 2 }, { label: '(b) r, t, u', key: 'b', marks: 4 }],
    answer: { ai: '(5,-4)', aii: '√41', aiii: 'C=(5,-3), D=(0,1)', b: 'r=0, t=2, u=2' }
  },
  'pp_4024_on22_21_q7': {
    id: 'pp_4024_on22_21_q7', questionNumber: '7', title: 'Transformations',
    question: '(a) Describe the transformation mapping A onto B.\n(b) Reflect shape A in the x-axis.\n(c) Enlarge shape A by scale factor 2, centre (5,4).\n(d) Transformation P = [[0,−1],[1,0]] maps A to C.\n(i) Draw C.\n(ii) Describe the transformation.\n(iii) Find the matrix mapping C to A.',
    marks: 12, hints: ['(a) Translation', '(d)(ii) Rotation 90° anticlockwise about origin', '(d)(iii) Inverse: [[0,1],[−1,0]]'],
    type: 'multi-part',
    parts: [{ label: '(a) Description', key: 'a', marks: 2 }, { label: '(b) Reflection', key: 'b', marks: 1 }, { label: '(c) Enlargement', key: 'c', marks: 2 }, { label: '(d)(i) Shape C', key: 'di', marks: 2 }, { label: '(d)(ii) Description', key: 'dii', marks: 3 }, { label: '(d)(iii) Matrix', key: 'diii', marks: 1 }],
    answer: { a: 'Translation', b: 'Reflected', c: 'Enlarged', di: 'Shape drawn', dii: 'Rotation 90° anticlockwise, (0,0)', diii: '[[0,1],[-1,0]]' }
  },
  'pp_4024_on22_21_q8': {
    id: 'pp_4024_on22_21_q8', questionNumber: '8', title: 'Speed equation and quadratic',
    question: 'Lara cycles 50 km at x km/h. Marco at (x−3) km/h.\n(a) Expression for Lara\'s time.\n(b) Marco takes 15 min longer. Show x² − 3x − 600 = 0.\n(c) Solve x² − 3x − 600 = 0 to 2 d.p.\n(d) Find Marco\'s time in hours and minutes.',
    marks: 10, hints: ['(a) 50/x', '(c) Use quadratic formula', '(d) Use positive root, find 50/(x−3)'],
    type: 'multi-part',
    parts: [{ label: '(a) Expression', key: 'a', marks: 1 }, { label: '(b) Show', key: 'b', marks: 4 }, { label: '(c) Solutions', key: 'c', marks: 3 }, { label: '(d) Time', key: 'd', marks: 2 }],
    answer: { a: '50/x', b: 'Shown', c: '26.0 and -23.0', d: '2h 10min' }
  },
  'pp_4024_on22_21_q9': {
    id: 'pp_4024_on22_21_q9', questionNumber: '9', title: 'Forming and solving equations',
    question: '(a) Kate thinks of n. Subtracts 8, multiplies by 3. Answer is 11 less than n. Form equation and solve.\n(b) Simplify (x²−4)/(2) ÷ (x²+2x) as a single fraction.',
    marks: 7, hints: ['(a) 3(n−8) = n−11, 3n−24 = n−11, 2n = 13, n = 6.5', '(b) (x−2)(x+2)/2 × 1/(x(x+2)) = (x−2)/(2x)'],
    type: 'multi-part',
    parts: [{ label: '(a) n', key: 'a', marks: 4 }, { label: '(b) Simplified', key: 'b', marks: 3 }],
    answer: { a: '6.5', b: '(x-2)/(2x)' }
  },
  'pp_4024_on22_21_q10': {
    id: 'pp_4024_on22_21_q10', questionNumber: '10', title: 'Bearings and trigonometry',
    question: 'P, Q, R are towns. Q is on bearing 052° from P. PQ = 11.5 km, QR = 14.6 km, PR = 17.2 km.\n(a) Calculate bearing of R from Q.\n(b) Angle of elevation 68° (±1°), distance 45 m (±1 m). Find lower bound of mast height.',
    marks: 7, hints: ['(a) Use cosine rule to find angle PQR, then bearing', '(b) Lower bound: tan(67.5°) × 44.5'],
    type: 'multi-part',
    parts: [{ label: '(a) Bearing', key: 'a', marks: 4 }, { label: '(b) Lower bound (m)', key: 'b', marks: 3 }],
    answer: { a: '150.5', b: '107' }
  },
  'pp_4024_on22_21_q11': {
    id: 'pp_4024_on22_21_q11', questionNumber: '11', title: 'Regular pentagon and pyramid',
    question: 'Regular pentagon ABCDE with centre O, AB = 6 cm, OA = d cm.\n(a) Show that d = 5.10 cm (to 2 d.p.).\n(b) Pyramid with vertex F above O, sloping edge 14 cm. Calculate volume.',
    marks: 8, hints: ['(a) Central angle = 72°, sin 36° = 3/d', '(b) Find height using Pythagoras, then V = ⅓ × base area × height'],
    type: 'multi-part',
    parts: [{ label: '(a) Show d = 5.10', key: 'a', marks: 3 }, { label: '(b) Volume (cm³)', key: 'b', marks: 5 }],
    answer: { a: 'd = 5.10 shown', b: '269' }
  },
};

export const sections4024_21_2022ON: PastPaperSection[] = Object.values(questions4024_21_2022ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  questionId: q.id,
  title: `Q${q.questionNumber} – ${q.title}`,
}));
