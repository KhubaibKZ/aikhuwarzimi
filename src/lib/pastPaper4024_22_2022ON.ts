// 4024/22 October/November 2022 - Past Paper Questions
// Paper 2 Calculator - 2 hours 30 minutes - 100 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_22_2022ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on22_22_q1': {
    id: 'pp_4024_on22_22_q1', questionNumber: '1', title: 'Time, currency and percentages',
    question: '(a) Hala travels London→Paris→Marseille. London→Paris: 2h28min. Paris→Marseille: 3h30min. Local time in Paris/Marseille is 1h ahead.\n(i) Complete timetable (Paris arrive 16:50, Paris depart 19:31).\n(ii) How long does Hala wait in Paris?\n(b) £1 = $0.75. $1 = €r. She changes £250 into €290. Find r.\n(c)(i) Holiday $420/person for 3 people, 20% deposit. Find deposit.\n(c)(ii) Airport parking $85.68 for 8 days includes 15% reduction. Find full price per day.',
    marks: 12, hints: ['(a)(i) London depart: 16:50−2:28+1:00 = 13:22, Marseille arrive: 23:01', '(a)(ii) 19:31−16:50 = 2h41min', '(b) 250×0.75 = $187.50... £250 → $0.75×250... r = 0.87', '(c)(i) 420×3×0.2 = 252', '(c)(ii) 85.68/0.85/8 = 12.60'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Timetable', key: 'ai', marks: 2 }, { label: '(a)(ii) Wait time', key: 'aii', marks: 1 }, { label: '(b) r', key: 'b', marks: 3 }, { label: '(c)(i) Deposit ($)', key: 'ci', marks: 2 }, { label: '(c)(ii) Full price/day ($)', key: 'cii', marks: 3 }],
    answer: { ai: '13:22, 23:01', aii: '2h 41min', b: '0.87', ci: '252', cii: '12.60' }
  },
  'pp_4024_on22_22_q2': {
    id: 'pp_4024_on22_22_q2', questionNumber: '2', title: 'Statistics – mean, range, cumulative frequency',
    question: '(a) Type A tomatoes: 17(5), 18(2), 19(7), 20(3), 21(2), 22(1).\n(i) Calculate mean.\n(ii) Calculate range.\n(iii) Type B mean=17.1, range=8. Compare.\n(b) Strawberry masses (120 total), cumulative frequency.\n(i) Draw cumulative frequency diagram.\n(ii) Estimate percentage with mass > 21 g.',
    marks: 12, hints: ['(a)(i) Σfx/Σf = 378/20 = 18.9', '(a)(ii) 22−17 = 5', '(b)(ii) Read at m=21, calculate percentage'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Mean', key: 'ai', marks: 2 }, { label: '(a)(ii) Range', key: 'aii', marks: 1 }, { label: '(a)(iii) Comparison', key: 'aiii', marks: 2 }, { label: '(b)(i) CF diagram', key: 'bi', marks: 3 }, { label: '(b)(ii) Percentage', key: 'bii', marks: 3 }],
    answer: { ai: '18.9', aii: '5', aiii: 'Type A higher mean, Type B more spread', bi: 'Diagram drawn', bii: '≈15%' }
  },
  'pp_4024_on22_22_q3': {
    id: 'pp_4024_on22_22_q3', questionNumber: '3', title: 'Surface area optimisation',
    question: 'Cuboid height h, square base edge x, volume 60 cm³.\n(a) Show A = 2x² + 240/x.\n(b) Complete table.\n(c) Draw graph for 1 ≤ x ≤ 8.\n(d) Find minimum surface area.\n(e) Surface area = 120 cm². Height > edge. Find dimensions.',
    marks: 11, hints: ['(a) h = 60/x², A = 2x² + 4x(60/x²) = 2x² + 240/x', '(b) x=7: 98+240/7 = 132.3, x=8: 128+30 = 158', '(d) ≈90-92', '(e) Read x from graph at A=120, find h'],
    type: 'multi-part',
    parts: [{ label: '(a) Show formula', key: 'a', marks: 2 }, { label: '(b) Table values', key: 'b', marks: 2 }, { label: '(c) Graph', key: 'c', marks: 3 }, { label: '(d) Min area (cm²)', key: 'd', marks: 1 }, { label: '(e) Dimensions', key: 'e', marks: 3 }],
    answer: { a: 'Shown', b: '98, 112', c: 'Graph drawn', d: '≈90', e: '≈2.2 × 2.2 × 12.4' }
  },
  'pp_4024_on22_22_q4': {
    id: 'pp_4024_on22_22_q4', questionNumber: '4', title: 'Sets and Venn diagrams',
    question: 'ξ = {integers 10 ≤ x ≤ 40}, P = multiples of 6, Q = square numbers.\n(a)(i) Write elements of P ∩ Q.\n(a)(ii) Find n(P ∪ Q).\n(b) Describe shaded region using set notation.\n(c)(i) Complete Venn diagram for F, S, A languages.\n(c)(ii) Two selected at random, P(both Spanish only).\n(c)(iii) Three from French, P(exactly one also studies Arabic).',
    marks: 12, hints: ['(a)(i) P∩Q = {36}', '(a)(ii) P = {12,18,24,30,36}, Q = {16,25,36}, n(P∪Q) = 7', '(c)(ii) 5/25 × 4/24 = 1/30'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) P∩Q', key: 'ai', marks: 1 }, { label: '(a)(ii) n(P∪Q)', key: 'aii', marks: 1 }, { label: '(b) Set notation', key: 'b', marks: 1 }, { label: '(c)(i) Venn diagram', key: 'ci', marks: 2 }, { label: '(c)(ii) P(both Spanish only)', key: 'cii', marks: 2 }, { label: '(c)(iii) P(one Arabic)', key: 'ciii', marks: 3 }],
    answer: { ai: '{36}', aii: '7', b: '(D∪C)∩B\'', ci: '7,5,3,4,1,0,3,2', cii: '1/30', ciii: '45/91' }
  },
  'pp_4024_on22_22_q5': {
    id: 'pp_4024_on22_22_q5', questionNumber: '5', title: 'Simultaneous equations and standard form',
    question: '(a) Bag of x five-cent and y ten-cent coins.\n(i) x + y = 130.\n(ii) 5x + 10y = 815.\n(iii) Solve simultaneously.\n(b) Machine makes 720 coins/min, 24h/day, 300 days. Total value in standard form.\n(c) Diameters: 5¢ = 21.2mm (±0.05), 10¢ = 17.9mm (±0.05). Upper bound of difference between two lines of 10 coins.',
    marks: 12, hints: ['(a)(iii) x = 97, y = 33', '(b) 720×24×60×300×0.05 = 1.56×10⁷', '(c) UB = 10(21.25) − 10(17.85) = 34'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Equation 1', key: 'ai', marks: 1 }, { label: '(a)(ii) Equation 2', key: 'aii', marks: 1 }, { label: '(a)(iii) Solutions', key: 'aiii', marks: 3 }, { label: '(b) Total ($)', key: 'b', marks: 3 }, { label: '(c) Upper bound (mm)', key: 'c', marks: 3 }],
    answer: { ai: 'x+y=130', aii: '5x+10y=815', aiii: 'x=97, y=33', b: '1.56×10⁷', c: '34' }
  },
  'pp_4024_on22_22_q6': {
    id: 'pp_4024_on22_22_q6', questionNumber: '6', title: 'Transformations',
    question: '(a) Reflect triangle A in the line x = 1. Label image B.\n(b) Triangle A → D by two transformations. First Y, then translation (6,0). Describe Y fully.',
    marks: 7, hints: ['(a) Each point reflected in x=1', '(b) Work backwards from D using translation, then describe Y'],
    type: 'multi-part',
    parts: [{ label: '(a) Reflection', key: 'a', marks: 2 }, { label: '(b) Transformation Y', key: 'b', marks: 5 }],
    answer: { a: 'Reflected in x=1', b: 'Rotation 90° anticlockwise about (0,0)' }
  },
  'pp_4024_on22_22_q7': {
    id: 'pp_4024_on22_22_q7', questionNumber: '7', title: 'Cosine rule and elevation',
    question: 'ABCD floor plan. AB=160, BC=95, BD=107, CD=165.\n(a) Calculate angle BCD.\n(b) Light above B, elevation from C is 8.2°. Find elevation from A.',
    marks: 8, hints: ['(a) Use cosine rule in triangle BCD', '(b) Find height from tan8.2° × 107, then elevation from A'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle BCD', key: 'a', marks: 4 }, { label: '(b) Elevation from A', key: 'b', marks: 4 }],
    answer: { a: '83.4', b: '9.22' }
  },
  'pp_4024_on22_22_q8': {
    id: 'pp_4024_on22_22_q8', questionNumber: '8', title: 'Algebra skills',
    question: '(a) Simplify 6v + 3w − 5w − v.\n(b) Solve 5x − 7 = 10.\n(c)(i) Simplify a × a × a².\n(c)(ii) Simplify b³ ÷ b⁵.\n(d)(i) Find r when p=7, t=−5, r=4p−3t.\n(d)(ii) Rearrange r = 4p − 3t to make p the subject.\n(e) Solve 5x² + 3x − 6 = 0 to 3 s.f.',
    marks: 12, hints: ['(a) 5v − 2w', '(b) 5x = 17, x = 3.4', '(c)(i) a⁴', '(c)(ii) b⁻²', '(d)(i) 28+15 = 43', '(d)(ii) p = (r+3t)/4', '(e) Quadratic formula'],
    type: 'multi-part',
    parts: [{ label: '(a) Simplified', key: 'a', marks: 2 }, { label: '(b) x', key: 'b', marks: 2 }, { label: '(c)(i) Simplified', key: 'ci', marks: 1 }, { label: '(c)(ii) Simplified', key: 'cii', marks: 1 }, { label: '(d)(i) r', key: 'di', marks: 1 }, { label: '(d)(ii) p =', key: 'dii', marks: 2 }, { label: '(e) Solutions', key: 'e', marks: 3 }],
    answer: { a: '5v-2w', b: '3.4', ci: 'a⁴', cii: 'b⁻²', di: '43', dii: '(r+3t)/4', e: '0.836 and -1.44' }
  },
  'pp_4024_on22_22_q9': {
    id: 'pp_4024_on22_22_q9', questionNumber: '9', title: 'Hemisphere bowl',
    question: 'Wooden bowl: large hemisphere diameter 20 cm, rim width 2 cm (small hemisphere removed).\n(a) Show total surface area = 364π cm².\n(b) Wood density 0.74 g/cm³. Find mass.\n(c) Similar bowl with surface area 546π cm². Find its mass.',
    marks: 9, hints: ['(a) 2π(10²) + 2π(8²) + π(10²−8²) = 364π', '(b) Volume = ²⁄₃π(10³−8³) × 0.74', '(c) Scale factor³ × mass'],
    type: 'multi-part',
    parts: [{ label: '(a) Show 364π', key: 'a', marks: 3 }, { label: '(b) Mass (g)', key: 'b', marks: 3 }, { label: '(c) Mass (g)', key: 'c', marks: 3 }],
    answer: { a: '364π shown', b: '756', c: '1390' }
  },
  'pp_4024_on22_22_q10': {
    id: 'pp_4024_on22_22_q10', questionNumber: '10', title: 'Circle theorems and area',
    question: '(a)(i) A,B,C,D on circle, AC diameter, ∠ACD = ∠CAB = 40°. Show ABC ≅ CDA.\n(a)(ii) Explain why ABCD is a rectangle.\n(b) E,F,G,H on circle centre O, radius 6. ∠EHO = 30°, ∠EFG = 116°. Calculate shaded area.',
    marks: 10, hints: ['(a)(i) AAS: AC common, ∠ACD=∠CAB, ∠ABC=∠CDA=90°', '(a)(ii) All angles 90°', '(b) ∠HOG = 112°, area = sector − triangle'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) Congruence proof', key: 'ai', marks: 3 }, { label: '(a)(ii) Rectangle', key: 'aii', marks: 2 }, { label: '(b) Shaded area (cm²)', key: 'b', marks: 5 }],
    answer: { ai: 'AAS congruence shown', aii: 'All angles 90° (angle in semicircle)', b: '18.5' }
  },
};

export const sections4024_22_2022ON: PastPaperSection[] = Object.values(questions4024_22_2022ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  questionId: q.id,
  title: `Q${q.questionNumber} – ${q.title}`,
}));
