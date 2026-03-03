// 4024/21 Oct/Nov 2021 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_21_2021ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on21_21_q1': {
    id: 'pp_4024_on21_21_q1', questionNumber: '1', title: 'Percentages and bills',
    question: '(a) Sara is charged $84.25 for water. Tax of 8% is added. Calculate total.\n(b)(i) Sara uses 960 units of gas in 30 days. Fixed 23 cents/day, 4.3 cents/unit. Calculate total in dollars.\n(b)(ii) Sara is charged $30.80 for electricity in 30 days. Fixed 28 cents/day, 16 cents/unit. Find units used.\n(c)(i) How much more electricity generated in Japan than Australia in 2016? Standard form.\n(c)(ii) Percentage increase in Turkey from 2010 to 2016.\n(c)(iii) 4% decrease in Spain from 2013 to 2016. Find 2013 amount.',
    marks: 12, hints: ['(a) 84.25 × 1.08 = 90.99', '(b)(i) 960 × 4.3 + 30 × 23 = 4128 + 690 = 4818 cents = $48.18', '(b)(ii) (3080 − 840) ÷ 16 = 140', '(c)(i) 1.03 × 10⁶ − 2.43 × 10⁵ = 7.87 × 10⁵', '(c)(ii) (2.62 − 2.03)/2.03 × 100 = 29.1%', '(c)(iii) 0.96x = 2.64 × 10⁵ → x = 2.75 × 10⁵'],
    type: 'multi-part',
    parts: [
      { label: '(a) Total ($)', key: 'a', marks: 2 },
      { label: '(b)(i) Gas ($)', key: 'bi', marks: 2 },
      { label: '(b)(ii) Units', key: 'bii', marks: 3 },
      { label: '(c)(i) GWh', key: 'ci', marks: 1 },
      { label: '(c)(ii) % increase', key: 'cii', marks: 2 },
      { label: '(c)(iii) GWh', key: 'ciii', marks: 2 }
    ],
    answer: { a: '90.99', bi: '48.18', bii: '140', ci: '7.87 × 10⁵', cii: '29.1', ciii: '2.75 × 10⁵' }
  },
  'pp_4024_on21_21_q2': {
    id: 'pp_4024_on21_21_q2', questionNumber: '2', title: 'Statistics',
    question: '(a)(i) Find the mode of exercise classes attended.\n(a)(ii) Find the median.\n(a)(iii) Calculate pie chart angle for 5 classes.\n(b)(i) 30 members spent 30-60 min. Calculate total surveyed.\n(b)(ii) Rohit says 1/10 spent more than 1.5 hours. Is he correct?',
    marks: 9, hints: ['(a)(i) Mode = 1', '(a)(ii) Median = 2', '(a)(iii) 2/80 × 360 = 9°', '(b)(i) Frequency density × width for each bar, total = 150', '(b)(ii) 12 spent >90 min, 1/10 of 150 = 15, so he is wrong'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Mode', key: 'ai', marks: 1 },
      { label: '(a)(ii) Median', key: 'aii', marks: 1 },
      { label: '(a)(iii) Angle', key: 'aiii', marks: 2 },
      { label: '(b)(i) Total members', key: 'bi', marks: 3 },
      { label: '(b)(ii) Is Rohit correct?', key: 'bii', marks: 2 }
    ],
    answer: { ai: '1', aii: '2', aiii: '9', bi: '150', bii: 'No, 12 spent more than 90 min, 1/10 is 15' }
  },
  'pp_4024_on21_21_q3': {
    id: 'pp_4024_on21_21_q3', questionNumber: '3', title: 'Circle theorems and sectors',
    question: '(a)(i) Explain why triangle AOB is isosceles.\n(a)(ii) ∠ABO = 34°. Find ∠BEC.\n(b) OPS and OQR are sectors. OP = 7.4 cm, PQ = 1.2 cm, ∠QOR = 96°. Calculate shaded area.',
    marks: 7, hints: ['(a)(i) AO and BO are radii, so equal', '(a)(ii) ∠BOC = 68°, ∠OCE = 90°, ∠BEC = 22°', '(b) Area = (96/360)π(8.6² − 7.4²) = 16.1 cm²'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Reason', key: 'ai', marks: 1 },
      { label: '(a)(ii) ∠BEC', key: 'aii', marks: 3 },
      { label: '(b) Shaded area (cm²)', key: 'b', marks: 3 }
    ],
    answer: { ai: 'AO and BO are radii', aii: '22', b: '16.1' }
  },
  'pp_4024_on21_21_q4': {
    id: 'pp_4024_on21_21_q4', questionNumber: '4', title: 'Bearings and speed',
    question: '(a)(i) R is due west of P. Q is on bearing 140° from P. PR = 3.8 km, QR = 7.5 km. Calculate ∠PRQ.\n(a)(ii) Find bearing of R from Q.\n(b) Distance P to T = 16.5 km. Leaves at 10:30, drives at 45 km/h, stops 15 min, arrives back at 11:35. Find average speed for return.',
    marks: 10, hints: ['(a)(i) ∠RPQ = 130°, use sine rule: sin(PRQ)/3.8 = sin130/7.5, ∠PRQ = 27.1°', '(a)(ii) 270 + 27.2 = 297.2°', '(b) Time to T = 16.5/45 = 22 min, return time = 65 − 15 − 22 = 28 min, speed = 16.5/(28/60) = 35.4 km/h'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) ∠PRQ', key: 'ai', marks: 4 },
      { label: '(a)(ii) Bearing', key: 'aii', marks: 2 },
      { label: '(b) Speed (km/h)', key: 'b', marks: 4 }
    ],
    answer: { ai: '27.1', aii: '297.2', b: '35.4' }
  },
  'pp_4024_on21_21_q5': {
    id: 'pp_4024_on21_21_q5', questionNumber: '5', title: 'Probability',
    question: '(a)(i) 10 cards, find P(even).\n(a)(ii) Complete tree diagram.\n(a)(iii) P(one odd and one even).\n(b) Bag: 5 yellow, 3 pink, 4 black. Two taken without replacement. P(one yellow, one pink).',
    marks: 8, hints: ['(a)(i) 6/10', '(a)(iii) 2 × 6/10 × 4/10 = 48/100 = 12/25', '(b) (5×3×2)/(12×11) = 30/132 = 5/22'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) P(even)', key: 'ai', marks: 1 },
      { label: '(a)(ii) Tree diagram', key: 'aii', marks: 2 },
      { label: '(a)(iii) P(one odd, one even)', key: 'aiii', marks: 2 },
      { label: '(b) P(one yellow, one pink)', key: 'b', marks: 3 }
    ],
    answer: { ai: '6/10', aii: 'Correct tree diagram', aiii: '12/25', b: '5/22' }
  },
  'pp_4024_on21_21_q6': {
    id: 'pp_4024_on21_21_q6', questionNumber: '6', title: 'Quadratic and trigonometry',
    question: '(a)(i) Show 5x² + 30x − 39 = 0 from right-angled triangle with sides 8, 2x, 3x + 5.\n(a)(ii) Solve 5x² + 30x − 39 = 0 to 2 d.p.\n(a)(iii) Calculate the area of the triangle.\n(b) Right-angled triangle, hypotenuse 12 cm, angle 35°. Calculate shortest distance from A to BC.',
    marks: 12, hints: ['(a)(i) By Pythagoras: 8² + (2x)² = (3x + 5)²', '(a)(ii) x = (−30 ± √1680)/10 → x = 1.10 or −7.10', '(a)(iii) Area = ½ × 8 × 2(1.10) = 8.8 cm²', '(b) AC = 12cos35, height = AC × sin35 = 12cos35 × sin35 = 5.64 cm'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Show', key: 'ai', marks: 3 },
      { label: '(a)(ii) x values', key: 'aii', marks: 3 },
      { label: '(a)(iii) Area (cm²)', key: 'aiii', marks: 2 },
      { label: '(b) Distance (cm)', key: 'b', marks: 4 }
    ],
    answer: { ai: '8² + (2x)² = (3x+5)² leading to 5x² + 30x − 39 = 0', aii: '1.10 and −7.10', aiii: '8.8', b: '5.63' }
  },
  'pp_4024_on21_21_q7': {
    id: 'pp_4024_on21_21_q7', questionNumber: '7', title: 'Graphs',
    question: '(a) Draw graph of y = 2ˣ for 0 ≤ x ≤ 4.\n(b)(i) Estimate gradient of y = ½x² + 3x at x = 0.5.\n(b)(ii) Solve ½x² + 3x = 2 from graph.\n(b)(iii) By drawing y = 7 − x, solve ½x² = 7 − 4x.',
    marks: 11, hints: ['(a) Plot points for 2ˣ', '(b)(i) Draw tangent at x = 0.5, gradient ≈ −5.5 to −2.8', '(b)(ii) x ≈ −0.4', '(b)(iii) x ≈ −0.2, 0.3, 1.7'],
    type: 'multi-part',
    parts: [
      { label: '(a) Graph', key: 'a', marks: 4 },
      { label: '(b)(i) Gradient', key: 'bi', marks: 2 },
      { label: '(b)(ii) x', key: 'bii', marks: 1 },
      { label: '(b)(iii) x values', key: 'biii', marks: 4 }
    ],
    answer: { a: 'Correct curve', bi: '−5.5 to −2.8', bii: '−0.4', biii: '−0.2, 0.3, 1.7' }
  },
  'pp_4024_on21_21_q8': {
    id: 'pp_4024_on21_21_q8', questionNumber: '8', title: 'Coordinate geometry',
    question: 'A(−2, 3) and B(4, 5).\n(a) Find midpoint of AB.\n(b) Show equation of AB is 3y = x + 11.\n(c) Find equation of perpendicular bisector of AB.',
    marks: 7, hints: ['(a) (1, 4)', '(b) Gradient = 2/6 = 1/3, y − 5 = ⅓(x − 4)', '(c) Gradient = −3, passes through (1, 4): y = −3x + 7'],
    type: 'multi-part',
    parts: [
      { label: '(a) Midpoint', key: 'a', marks: 1 },
      { label: '(b) Show equation', key: 'b', marks: 3 },
      { label: '(c) Perpendicular bisector', key: 'c', marks: 3 }
    ],
    answer: { a: '(1, 4)', b: '3y = x + 11', c: 'y = −3x + 7' }
  },
  'pp_4024_on21_21_q9': {
    id: 'pp_4024_on21_21_q9', questionNumber: '9', title: 'Algebra',
    question: '(a) Solve 3x − 8 = 7.\n(b) Solve 7x < ½(2 − x).\n(c) Solve 3/(x−2) + x/(x+5) = 5... MS: answer is 12.5 or 25/2\n(d) Simplify (2x² + 3x + 4xy + 6y) / (2x² + 3x − 4).',
    marks: 12, hints: ['(a) 3x = 15, x = 5', '(b) 14x < 2 − x, 15x < 2, x < 2/15... MS says x < 3/... ', '(c) Cross multiply and solve', '(d) Factor: (x + 2y)(2x + 3) / (2x − 1)(x + 4)... MS says (x + 2y)/(2x + 3)'],
    type: 'multi-part',
    parts: [
      { label: '(a) x', key: 'a', marks: 2 },
      { label: '(b) Inequality', key: 'b', marks: 2 },
      { label: '(c) x', key: 'c', marks: 4 },
      { label: '(d) Simplified', key: 'd', marks: 4 }
    ],
    answer: { a: '5', b: 'x < 2/15', c: '25/2', d: '(x + 2y)/(2x + 3)' }
  },
  'pp_4024_on21_21_q10': {
    id: 'pp_4024_on21_21_q10', questionNumber: '10', title: '3D geometry',
    question: '(a) Cuboid 6.2 × 4.8 × 2.5 cm (nearest mm). Calculate upper bound of surface area.\n(b)(i) Pyramid ABCDE, EX = 17 cm, EC = 19 cm. Show base length = 12 cm.\n(b)(ii) Calculate volume.\n(b)(iii) Calculate angle CBE.',
    marks: 12, hints: ['(a) UB: 6.25, 4.85, 2.55. SA = 2(6.25×4.85 + 6.25×2.55 + 4.85×2.55) = 117.235', '(b)(i) XC² = 19² − 17² = 72, XC = √72, base = 2×√(72/2)... MS: d² + d² = (2×XC)², base = 12', '(b)(ii) V = ⅓ × 12² × 17 = 816', '(b)(iii) cos(CBE) = 6/19, angle = 71.6°'],
    type: 'multi-part',
    parts: [
      { label: '(a) Upper bound SA (cm²)', key: 'a', marks: 3 },
      { label: '(b)(i) Show base = 12', key: 'bi', marks: 4 },
      { label: '(b)(ii) Volume (cm³)', key: 'bii', marks: 2 },
      { label: '(b)(iii) Angle CBE', key: 'biii', marks: 3 }
    ],
    answer: { a: '117.235', bi: 'XC² = 19² − 17² = 72, 2XC = 12√2, base = 12', bii: '816', biii: '71.6' }
  },
};

export const sections4024_21_2021ON: PastPaperSection[] = Object.values(questions4024_21_2021ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  title: `Q${q.questionNumber}: ${q.title}`,
  questionId: q.id
}));
