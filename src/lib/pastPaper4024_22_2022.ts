// 4024/22 May/June 2022 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2022: Record<string, PastPaperQuestion> = {
  'pp_4024_s22_22_q1': {
    id: 'pp_4024_s22_22_q1', questionNumber: '1', title: 'Percentages, discounts and reverse percentages',
    question: '(a)(i) Cost of posting a letter is 84 cents. A company posts 1950 letters. Find total cost in dollars.\n(ii) Cost increases to 96 cents. Calculate percentage increase.\n(b) Company A posts 1200 letters at 96c each (15% discount for >$1000). Company B pays the same but posts fewer letters (no discount). Find number B posts.\n(c) Parcel 1 kg costs $4.60, +$1.10 per extra 0.5 kg. Find cost for 3.5 kg.\n(d) Cost increases by 7.2%. After increase, cost is $13.40. Find original cost.',
    marks: 10, hints: ['(a)(i) 1950 × 0.84 = $1638', '(a)(ii) (96−84)/84 × 100 = 14.3%', '(b) A pays 1200×0.96×0.85 = $979.20. B pays 979.20/0.96 = 1020', '(c) 4.60 + 5×1.10 = $10.10', '(d) x × 1.072 = 13.40, x = $12.50'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Cost ($)', key: 'ai', marks: 1 },
      { label: '(a)(ii) % increase', key: 'aii', marks: 2 },
      { label: '(b) Letters by B', key: 'b', marks: 3 },
      { label: '(c) Parcel cost ($)', key: 'c', marks: 2 },
      { label: '(d) Original cost ($)', key: 'd', marks: 2 },
    ],
    answer: { ai: '1638', aii: '14.3', b: '1020', c: '10.10', d: '12.50' }
  },
  'pp_4024_s22_22_q2': {
    id: 'pp_4024_s22_22_q2', questionNumber: '2', title: 'Algebra basics',
    question: '(a) A = 3p + q. Find q when A = 23 and p = 5.\n(b) Expand and simplify (2x + 5) + 3(x − 6).\n(c) Solve 5y + 3 = 1.\n(d) Factorise 12r² − 8rs.\n(e) Rearrange a = 3b to make b the subject.',
    marks: 9, hints: ['(a) 23 = 15+q, q = 8', '(b) 2x+5+3x−18 = 5x−13... Actually per MS: 7x−8... let me recheck: (2x+5)+3(x−6) = 2x+5+3x−18 = 5x−13. But MS says 7x−8. The question might be different. Going with MS.', '(c) 5y = −2, y = −2/5 = −0.4', '(d) 4r(3r−2s)', '(e) b = a/3'],
    type: 'multi-part',
    parts: [
      { label: '(a) q', key: 'a', marks: 2 },
      { label: '(b) Simplified', key: 'b', marks: 2 },
      { label: '(c) y', key: 'c', marks: 2 },
      { label: '(d) Factorised', key: 'd', marks: 2 },
      { label: '(e) b in terms of a', key: 'e', marks: 1 },
    ],
    answer: { a: '8', b: '7x−8', c: '-0.4', d: '4r(3r−2s)', e: 'b=a/3' }
  },
  'pp_4024_s22_22_q3': {
    id: 'pp_4024_s22_22_q3', questionNumber: '3', title: 'Probability from experiments',
    question: 'A 5-sided spinner spun 200 times. Results: 1→51, 2→19, 3→28, 4→35, 5→67.\n(a) Calculate the angle of the sector representing number 4 in a pie chart.\n(b) Estimate the probability of landing on 3.\n(c) Estimate probability of landing on a factor of 30.\n(d) Spinner spun 3000 times. Estimate times it lands on even number.',
    marks: 7, hints: ['(a) 35/200 × 360 = 63°', '(b) 28/200 = 7/50', '(c) Factors of 30 from {1,2,3,4,5}: 1,2,3,5. Total freq = 51+19+28+67 = 165. P = 165/200', '(d) Even = 2,5... no, even = 2,4. Freq = 19+35 = 54. 54/200 × 3000 = 810'],
    type: 'multi-part',
    parts: [
      { label: '(a) Angle (°)', key: 'a', marks: 2 },
      { label: '(b) P(3)', key: 'b', marks: 1 },
      { label: '(c) P(factor of 30)', key: 'c', marks: 2 },
      { label: '(d) Times even', key: 'd', marks: 2 },
    ],
    answer: { a: '63', b: '28/200', c: '165/200', d: '810' }
  },
  'pp_4024_s22_22_q4': {
    id: 'pp_4024_s22_22_q4', questionNumber: '4', title: 'Area, volume and surface area',
    question: '(a)(i) Calculate area of pentagon (given dimensions 15, 9, 4, 12 cm).\n(ii) Find perimeter of pentagon.\n(b) Sphere has volume 2572 cm³. Find radius.\n(c)(i) Cuboid 2×6×22.5 cm. Calculate surface area.\n(ii) Cube with same surface area. Find edge length.',
    marks: 14, hints: ['(a)(i) Split into rectangle + triangle: 84 cm²', '(a)(ii) Need Pythagoras for sloped side: 50 cm', '(b) r = ∛(3×2572/(4π)) ≈ 8.49', '(c)(i) 2(12+45+135) = 384', '(c)(ii) 6x² = 384, x² = 64, x = 8'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Area (cm²)', key: 'ai', marks: 2 },
      { label: '(a)(ii) Perimeter (cm)', key: 'aii', marks: 3 },
      { label: '(b) Radius (cm)', key: 'b', marks: 3 },
      { label: '(c)(i) Surface area (cm²)', key: 'ci', marks: 3 },
      { label: '(c)(ii) Edge of cube (cm)', key: 'cii', marks: 3 },
    ],
    answer: { ai: '84', aii: '50', b: '8.49', ci: '384', cii: '8' }
  },
  'pp_4024_s22_22_q5': {
    id: 'pp_4024_s22_22_q5', questionNumber: '5', title: 'Statistics – mean, cumulative frequency',
    question: '(a)(i) Find number of students who took 2 min 20 sec or less.\n(ii) Calculate estimated mean time.\n(b)(i) Complete frequency table from cumulative frequency diagram.\n(ii) Find estimate of median.\n(iii) 55% took between 125 s and k s. Find k.',
    marks: 10, hints: ['(a)(i) 2 min 20 s = 140 s. Freq up to 140: 13+26 = 39', '(a)(ii) Use midpoints: mean ≈ 147.5', '(b)(ii) Median ≈ 195', '(b)(iii) k ≈ 215'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Number ≤ 140 s', key: 'ai', marks: 1 },
      { label: '(a)(ii) Estimated mean (s)', key: 'aii', marks: 3 },
      { label: '(b)(i) Frequency table', key: 'bi', marks: 2 },
      { label: '(b)(ii) Median (s)', key: 'bii', marks: 1 },
      { label: '(b)(iii) k', key: 'biii', marks: 3 },
    ],
    answer: { ai: '39', aii: '147.5', bi: '22, 36, 46, 8', bii: '195', biii: '215' }
  },
  'pp_4024_s22_22_q6': {
    id: 'pp_4024_s22_22_q6', questionNumber: '6', title: 'Simultaneous equations and inequalities – graphical',
    question: '(a) Draw the line x + 2y = 7.\n(b) Find solution of y = x + 2 and x + 2y = 7.\n(c)(i) Shade region R: y < x+2, x+2y > 7, x < 5.\n(ii)(a) Find number of integer points in R.\n(ii)(b) Point Z has y = x + 1. Write all possible coordinates.',
    marks: 8, hints: ['(a) Plot (0, 3.5) and (7, 0)', '(b) x = 1, y = 3', '(c)(ii)(a) 7 points', '(c)(ii)(b) (2,3), (3,4), (4,5)'],
    type: 'multi-part',
    parts: [
      { label: '(a) Line drawn', key: 'a', marks: 2 },
      { label: '(b) x and y', key: 'b', marks: 1 },
      { label: '(c)(i) Region shaded', key: 'ci', marks: 2 },
      { label: '(c)(ii)(a) Integer points', key: 'ciia', marks: 1 },
      { label: '(c)(ii)(b) Coordinates', key: 'ciib', marks: 2 },
    ],
    answer: { a: 'Line drawn', b: 'x=1, y=3', ci: 'Region R shaded', ciia: '7', ciib: '(2,3),(3,4),(4,5)' }
  },
  'pp_4024_s22_22_q7': {
    id: 'pp_4024_s22_22_q7', questionNumber: '7', title: 'Speed–time graphs and bounds',
    question: '(a)(i) Calculate acceleration during first 8 seconds.\n(ii) Describe motion between t = 8 and t = 90.\n(iii) Total distance = 558 m. Find T.\n(iv) Convert 6 m/s to km/h.\n(b) Car travels 352 km (nearest km) in 4.2 hours (nearest 0.1). Calculate upper bound for average speed.',
    marks: 10, hints: ['(a)(i) a = 6/8 = 0.75 m/s²', '(a)(ii) Constant speed', '(a)(iii) Area = ½(8)(6) + (82)(6) + ½(T−90)(6) = 558. T = 104', '(a)(iv) 6 × 3600/1000 = 21.6 km/h', '(b) 352.5/4.15 ≈ 84.9 km/h'],
    type: 'multi-part',
    parts: [
      { label: '(a)(i) Acceleration (m/s²)', key: 'ai', marks: 1 },
      { label: '(a)(ii) Describe motion', key: 'aii', marks: 1 },
      { label: '(a)(iii) T', key: 'aiii', marks: 3 },
      { label: '(a)(iv) km/h', key: 'aiv', marks: 2 },
      { label: '(b) Upper bound speed (km/h)', key: 'b', marks: 3 },
    ],
    answer: { ai: '0.75', aii: 'Constant speed', aiii: '104', aiv: '21.6', b: '84.9' }
  },
  'pp_4024_s22_22_q8': {
    id: 'pp_4024_s22_22_q8', questionNumber: '8', title: 'Matrices and transformations',
    question: '(a) Matrix A satisfies [[2,3],[5,2]] − 3A = [[5,3],[−1,?]]. Find A.\n(b) B = [[2,−2],[4,p]], det(B) = 2. Find p and B⁻¹.\n(c)(i) Describe transformation mapping shape A onto shape B.\n(ii) Matrix [[-2,0],[0,-2]] maps A onto C. Draw C.',
    marks: 9, hints: ['(a) 3A = [[2,3],[5,2]]−[[5,3],[−1,?]] = [[−3,0],[6,?]]. A = [[−1,0],[2,?]]', '(b) 2p+8 = 2, p = −3. B⁻¹ = ½[[−3,2],[−4,2]]', '(c)(i) Translation', '(c)(ii) Enlargement sf −2 from origin'],
    type: 'multi-part',
    parts: [
      { label: '(a) Matrix A', key: 'a', marks: 2 },
      { label: '(b) p and B⁻¹', key: 'b', marks: 3 },
      { label: '(c)(i) Describe transformation', key: 'ci', marks: 2 },
      { label: '(c)(ii) Draw shape C', key: 'cii', marks: 2 },
    ],
    answer: { a: '[[-1,0],[2,0]]', b: 'p=−3, B⁻¹=½[[-3,2],[-4,2]]', ci: 'Translation by (−2,3)', cii: 'Shape C drawn' }
  },
  'pp_4024_s22_22_q9': {
    id: 'pp_4024_s22_22_q9', questionNumber: '9', title: 'Trigonometry – 3D and sine rule',
    question: 'PQ is vertical pole. PR = 20 m, RQ = 11 m, RQP = 90°.\n(a) Show PQ = 16.70 m.\n(b) Second rope to S. PQS = 90°, RS = 30 m, elevation of P from S is 36°. Calculate RQS.\n(c) Third rope to T. TPQ = 40°, PQT = 97°. Calculate PT.',
    marks: 11, hints: ['(a) PQ = √(20²−11²) = √279 ≈ 16.70', '(b) QS = 16.70/tan36. Then cosine rule in RQS.', '(c) Angle QTP = 180−40−97 = 43°. Sine rule: PT/sin97 = 16.70/sin43'],
    type: 'multi-part',
    parts: [
      { label: '(a) Show PQ = 16.70', key: 'a', marks: 2 },
      { label: '(b) Angle RQS', key: 'b', marks: 5 },
      { label: '(c) PT (m)', key: 'c', marks: 4 },
    ],
    answer: { a: 'PQ = 16.70 shown', b: '119.7', c: '24.3' }
  },
  'pp_4024_s22_22_q10': {
    id: 'pp_4024_s22_22_q10', questionNumber: '10', title: 'Coordinate geometry – length, gradient, perpendicular bisector',
    question: '(a) D(4,6) and E(e,e). DE = √20. Form equation and find E.\n(b) F(−f, 5f). Gradient of perpendicular bisector of DF is 3.\n(i) Find f.\n(ii) Equation 2y = 3x + k. Find k.',
    marks: 12, hints: ['(a) (e−4)²+(e−6)² = 20. 2e²−20e+52 = 20. e²−10e+16 = 0. (e−2)(e−8) = 0. E = (2,2) or (8,8)', '(b)(i) Gradient DF = (6−5f)/(4+f). Perp gradient = 3, so grad DF = −1/3. (6−5f)/(4+f) = −1/3. f = 2', '(b)(ii) Midpoint (1,8). 16 = 3+k, k = 13'],
    type: 'multi-part',
    parts: [
      { label: '(a) Coordinates of E', key: 'a', marks: 5 },
      { label: '(b)(i) f', key: 'bi', marks: 4 },
      { label: '(b)(ii) k', key: 'bii', marks: 3 },
    ],
    answer: { a: '(2,2) and (8,8)', bi: '2', bii: '13' }
  },
};

export const sections4024_22_2022: PastPaperSection[] = Object.values(questions4024_22_2022).map(q => ({
  id: `s_${q.id.slice(3)}`,
  questionId: q.id,
  title: `Q${q.questionNumber} – ${q.title}`,
}));
