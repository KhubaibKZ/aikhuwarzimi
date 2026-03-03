// 4024/11 October/November 2022 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2022ON: Record<string, PastPaperQuestion> = {
  'pp_4024_on22_11_q1': {
    id: 'pp_4024_on22_11_q1', questionNumber: '1', title: 'Temperature changes',
    question: '(a) The temperature was −2 °C. The temperature decreases by 8 °C. Find the temperature after this change.\n(b) On another day, the temperature increases from −5 °C to 3 °C. Work out the increase in temperature.',
    marks: 2, hints: ['(a) −2 − 8 = −10', '(b) 3 − (−5) = 8'],
    type: 'multi-part',
    parts: [{ label: '(a) Temperature (°C)', key: 'a', marks: 1 }, { label: '(b) Increase (°C)', key: 'b', marks: 1 }],
    answer: { a: '-10', b: '8' }
  },
  'pp_4024_on22_11_q2': {
    id: 'pp_4024_on22_11_q2', questionNumber: '2', title: 'Percentage of an amount',
    question: 'Find 45% of $1.20.',
    marks: 2, hints: ['45% = 0.45', '0.45 × 1.20 = 0.54'],
    type: 'short', answer: '0.54'
  },
  'pp_4024_on22_11_q3': {
    id: 'pp_4024_on22_11_q3', questionNumber: '3', title: 'Ordering fractions',
    question: 'Write these fractions in order of size, starting with the smallest: 11/12, 4/5, 27/30, 13/15.',
    marks: 2, hints: ['Convert to common denominator 60', '4/5 = 48/60, 13/15 = 52/60, 27/30 = 54/60, 11/12 = 55/60'],
    type: 'short', answer: '4/5, 13/15, 27/30, 11/12'
  },
  'pp_4024_on22_11_q4': {
    id: 'pp_4024_on22_11_q4', questionNumber: '4', title: 'Bearings and scale drawing',
    question: 'The diagram shows the position of two ships, A and B. On the diagram 1 cm represents 30 m.\n(a) Find, by measurement, the actual distance of B from A.\n(b) Measure the bearing of B from A.\n(c) A third ship C is on a bearing of 164° from A and 252° from B. Mark the position of C.',
    marks: 5, hints: ['(a) Measure AB in cm, multiply by 30', '(b) Measure angle clockwise from North at A', '(c) Draw bearing lines from A and B, find intersection'],
    type: 'multi-part',
    parts: [{ label: '(a) Distance (m)', key: 'a', marks: 2 }, { label: '(b) Bearing', key: 'b', marks: 1 }, { label: '(c) Position of C', key: 'c', marks: 2 }],
    answer: { a: '162-174', b: '123-127', c: 'Correct position' }
  },
  'pp_4024_on22_11_q5': {
    id: 'pp_4024_on22_11_q5', questionNumber: '5', title: 'Rounding and estimation',
    question: '(a)(i) Write 306.248 correct to 2 decimal places.\n(a)(ii) Write 306.248 correct to 2 significant figures.\n(b) By writing each number correct to 1 significant figure, estimate the value of 923.37 ÷ 1046.',
    marks: 4, hints: ['(a)(i) 306.25', '(a)(ii) 310', '(b) 900 ÷ 1000 = 0.9'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) 2 d.p.', key: 'ai', marks: 1 }, { label: '(a)(ii) 2 s.f.', key: 'aii', marks: 1 }, { label: '(b) Estimate', key: 'b', marks: 2 }],
    answer: { ai: '306.25', aii: '310', b: '9/1000' }
  },
  'pp_4024_on22_11_q6': {
    id: 'pp_4024_on22_11_q6', questionNumber: '6', title: 'Indices',
    question: '(a) Write 4 × 4 × 4 × 4 × 4 as a power of 4.\n(b) Simplify √(5j²).\n(c) Simplify (2x³)⁴.',
    marks: 3, hints: ['(a) 4⁵', '(b) 5', '(c) 2⁴ × x¹² = 16x¹²'],
    type: 'multi-part',
    parts: [{ label: '(a) Power of 4', key: 'a', marks: 1 }, { label: '(b) Simplified', key: 'b', marks: 1 }, { label: '(c) Simplified', key: 'c', marks: 1 }],
    answer: { a: '4⁵', b: '5', c: '16x¹²' }
  },
  'pp_4024_on22_11_q7': {
    id: 'pp_4024_on22_11_q7', questionNumber: '7', title: 'Fraction arithmetic',
    question: '(a) Work out 7/8 − 3/4.\n(b) Work out 1³⁄₅ ÷ 4/7. Give your answer as a mixed number in its lowest terms.',
    marks: 3, hints: ['(a) 7/8 − 6/8 = 1/8', '(b) 8/5 × 7/4 = 56/20 = 14/5 = 2⁴⁄₅'],
    type: 'multi-part',
    parts: [{ label: '(a) 7/8 − 3/4', key: 'a', marks: 1 }, { label: '(b) Mixed number', key: 'b', marks: 2 }],
    answer: { a: '1/8', b: '2 4/5' }
  },
  'pp_4024_on22_11_q8': {
    id: 'pp_4024_on22_11_q8', questionNumber: '8', title: 'Factorisation',
    question: 'Factorise 3a² + 12a.',
    marks: 2, hints: ['Common factor is 3a', '3a(a + 4)'],
    type: 'short', answer: '3a(a+4)'
  },
  'pp_4024_on22_11_q9': {
    id: 'pp_4024_on22_11_q9', questionNumber: '9', title: 'Venn diagrams',
    question: '(a) In the Venn diagram, shade the region represented by A ∩ B.\n(b) Students study English (E), Spanish (S) and German (G). E has 11, E∩S = 3, S only = 7, E∩G = 5, all three = 2, S∩G = 10, G only = 8, outside = 4.\n(i) Find the number who study English and German but not Spanish.\n(ii) Find n(G ∪ S).',
    marks: 3, hints: ['(a) Shade the overlap of A and B', '(b)(i) E∩G but not S = 5', '(b)(ii) Add all in G or S'],
    type: 'multi-part',
    parts: [{ label: '(a) Shaded region', key: 'a', marks: 1 }, { label: '(b)(i) E∩G not S', key: 'bi', marks: 1 }, { label: '(b)(ii) n(G∪S)', key: 'bii', marks: 1 }],
    answer: { a: 'A∩B shaded', bi: '5', bii: '15' }
  },
  'pp_4024_on22_11_q10': {
    id: 'pp_4024_on22_11_q10', questionNumber: '10', title: 'Standard form',
    question: '(a) Write the number 320 000 000 in standard form.\n(b) Evaluate (2 × 10⁻³)/(4 × 10⁹). Give your answer in standard form.',
    marks: 3, hints: ['(a) 3.2 × 10⁸', '(b) 0.5 × 10⁻¹² = 5 × 10⁻¹³'],
    type: 'multi-part',
    parts: [{ label: '(a) Standard form', key: 'a', marks: 1 }, { label: '(b) Standard form', key: 'b', marks: 2 }],
    answer: { a: '3.2×10⁸', b: '5×10⁻¹³' }
  },
  'pp_4024_on22_11_q11': {
    id: 'pp_4024_on22_11_q11', questionNumber: '11', title: 'Prime factors and HCF',
    question: '(a) Write 120 as a product of its prime factors.\n(b) 315 = 3² × 5 × 7. Find the smallest integer value of n such that 315n is a square number.',
    marks: 3, hints: ['(a) 120 = 2³ × 3 × 5', '(b) Need all primes to even powers: n = 5 × 7 = 35'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime factorisation', key: 'a', marks: 2 }, { label: '(b) Value of n', key: 'b', marks: 1 }],
    answer: { a: '2³×3×5', b: '35' }
  },
  'pp_4024_on22_11_q12': {
    id: 'pp_4024_on22_11_q12', questionNumber: '12', title: 'Expanding brackets',
    question: '(a) Expand and simplify 3(2x + 1) − 2(4x + 3).\n(b) Expand and simplify (x + 5)(x − 3).',
    marks: 4, hints: ['(a) 6x + 3 − 8x − 6 = −2x − 3', '(b) x² + 5x − 3x − 15 = x² + 2x − 15'],
    type: 'multi-part',
    parts: [{ label: '(a) Expanded', key: 'a', marks: 2 }, { label: '(b) Expanded', key: 'b', marks: 2 }],
    answer: { a: '-2x-3', b: 'x²+2x-15' }
  },
  'pp_4024_on22_11_q13': {
    id: 'pp_4024_on22_11_q13', questionNumber: '13', title: 'Sequences',
    question: '(a) The nth term of a sequence is 3n² − 1. Find the first three terms of the sequence.\n(b) These are the first five terms of a different sequence: 1, 3, 9, 27, 81. Find an expression, in terms of n, for the nth term.',
    marks: 4, hints: ['(a) n=1: 2, n=2: 11, n=3: 26', '(b) Powers of 3: 3⁰, 3¹, 3², ... = 3ⁿ⁻¹'],
    type: 'multi-part',
    parts: [{ label: '(a) First three terms', key: 'a', marks: 2 }, { label: '(b) nth term', key: 'b', marks: 2 }],
    answer: { a: '2, 11, 26', b: '3ⁿ⁻¹' }
  },
  'pp_4024_on22_11_q14': {
    id: 'pp_4024_on22_11_q14', questionNumber: '14', title: 'Circle theorems',
    question: 'B, C and D are points on a circle, centre O. AB is a tangent at B. BD is a diameter and OCA is a straight line. ∠CDB = x°.\n(a) Find an expression for ∠COB.\n(b) Find an expression for ∠OAB.\n(c) Find an expression for ∠CBO.',
    marks: 5, hints: ['(a) Angle at centre = 2 × angle at circumference: 2x', '(b) ∠OBA = 90° (tangent), ∠OAB = 90 − 2x', '(c) ∠CBO = 90 − x'],
    type: 'multi-part',
    parts: [{ label: '(a) ∠COB', key: 'a', marks: 1 }, { label: '(b) ∠OAB', key: 'b', marks: 2 }, { label: '(c) ∠CBO', key: 'c', marks: 2 }],
    answer: { a: '2x', b: '90-2x', c: '90-x' }
  },
  'pp_4024_on22_11_q15': {
    id: 'pp_4024_on22_11_q15', questionNumber: '15', title: 'Similar triangles',
    question: 'Triangle ABC is mathematically similar to triangle DEC. AB = 12 cm, BC = 27 cm, CD = 7 cm and DE = 3 cm.\n(a) Calculate AC.\n(b) Given that the area of triangle ABC is 160 cm², calculate the area of triangle DEC.',
    marks: 4, hints: ['(a) Scale factor = 12/3 = 4, AC = 4 × 7 = 28', '(b) Area factor = 4² = 16, area = 160/16 = 10'],
    type: 'multi-part',
    parts: [{ label: '(a) AC (cm)', key: 'a', marks: 2 }, { label: '(b) Area (cm²)', key: 'b', marks: 2 }],
    answer: { a: '28', b: '10' }
  },
  'pp_4024_on22_11_q16': {
    id: 'pp_4024_on22_11_q16', questionNumber: '16', title: 'Inequalities and graphs',
    question: '(a) Find the gradient of the line L.\n(b) The shaded region on the diagram is defined by three inequalities. Write down these three inequalities.',
    marks: 4, hints: ['(a) Gradient = rise/run = 2', '(b) x ≥ 1, y ≤ 5, y ≥ 2x + 1'],
    type: 'multi-part',
    parts: [{ label: '(a) Gradient', key: 'a', marks: 1 }, { label: '(b) Inequalities', key: 'b', marks: 3 }],
    answer: { a: '2', b: 'x≥1, y≤5, y≥2x+1' }
  },
  'pp_4024_on22_11_q17': {
    id: 'pp_4024_on22_11_q17', questionNumber: '17', title: 'Speed-time graph',
    question: 'The diagram shows the speed–time graph of Sam\'s journey.\n(a) Calculate the acceleration, in m/s², for the first 2 minutes.\n(b) Calculate Sam\'s average speed, in m/s, for the whole journey.',
    marks: 4, hints: ['(a) Acceleration = 10/120 = 1/12 m/s²', '(b) Total distance = ½×120×10 + 360×10 + ½×120×10 = 9600/600 = 16'],
    type: 'multi-part',
    parts: [{ label: '(a) Acceleration (m/s²)', key: 'a', marks: 1 }, { label: '(b) Average speed (m/s)', key: 'b', marks: 3 }],
    answer: { a: '1/12', b: '16' }
  },
  'pp_4024_on22_11_q18': {
    id: 'pp_4024_on22_11_q18', questionNumber: '18', title: 'Direct proportion',
    question: 'b is directly proportional to the square of a. When a = 3, b = 18. Find b when a = 5.',
    marks: 2, hints: ['b = ka², 18 = k(9), k = 2', 'b = 2(25) = 50'],
    type: 'short', answer: '50'
  },
  'pp_4024_on22_11_q19': {
    id: 'pp_4024_on22_11_q19', questionNumber: '19', title: 'Congruent triangles',
    question: 'ABD is an equilateral triangle. C lies on DB and AC is perpendicular to DB. Show that triangle ADC is congruent to triangle ABC. Give a reason for each statement.',
    marks: 3, hints: ['AC = AC (common)', 'AD = AB (equilateral triangle)', '∠ACD = ∠ACB = 90°', 'Congruent by RHS'],
    type: 'multi-part',
    parts: [{ label: 'Proof of congruence', key: 'proof', marks: 3 }],
    answer: { proof: 'RHS: AC common, AD=AB (equilateral), ∠ACD=∠ACB=90°' }
  },
  'pp_4024_on22_11_q20': {
    id: 'pp_4024_on22_11_q20', questionNumber: '20', title: 'Histogram',
    question: 'A farmer records the mass of each of his sheep.\n(a) Use the histogram to find the value of a.\n(b) Complete the histogram.',
    marks: 3, hints: ['(a) Read frequency density × class width', '(b) Draw rectangles with correct frequency densities'],
    type: 'multi-part',
    parts: [{ label: '(a) Value of a', key: 'a', marks: 1 }, { label: '(b) Histogram', key: 'b', marks: 2 }],
    answer: { a: '30', b: 'Correct histogram' }
  },
  'pp_4024_on22_11_q21': {
    id: 'pp_4024_on22_11_q21', questionNumber: '21', title: 'Matrix operations',
    question: 'A = [[3,1],[−4,2]], A + 2B = [[−1,5],[10,12]].\n(a) Find B.\n(b) Find A⁻¹.',
    marks: 4, hints: ['(a) 2B = [[-1,5],[10,12]] - [[3,1],[-4,2]] = [[-4,4],[14,10]], B = [[-2,2],[7,5]]', '(b) det = 6+4=10, A⁻¹ = (1/10)[[2,-1],[4,3]]'],
    type: 'multi-part',
    parts: [{ label: '(a) Matrix B', key: 'a', marks: 2 }, { label: '(b) A⁻¹', key: 'b', marks: 2 }],
    answer: { a: '[[-1,2],[7,5]]', b: '(1/10)[[2,-1],[4,3]]' }
  },
  'pp_4024_on22_11_q22': {
    id: 'pp_4024_on22_11_q22', questionNumber: '22', title: 'Completing the square',
    question: '(a) x² − 6x − 7 = (x + a)² + b. Find the value of a and the value of b.\n(b) Hence solve the equation x² − 6x − 7 = 0.',
    marks: 4, hints: ['(a) (x−3)² − 9 − 7 = (x−3)² − 16, so a = −3, b = −16', '(b) (x−3)² = 16, x−3 = ±4, x = 7 or x = −1'],
    type: 'multi-part',
    parts: [{ label: '(a) a', key: 'a_val', marks: 1 }, { label: '(a) b', key: 'b_val', marks: 1 }, { label: '(b) Solutions', key: 'b', marks: 2 }],
    answer: { a_val: '-3', b_val: '-16', b: '7 or -1' }
  },
  'pp_4024_on22_11_q23': {
    id: 'pp_4024_on22_11_q23', questionNumber: '23', title: 'Cone and sphere',
    question: 'A solid cone has radius y cm. The slant height is 25% larger than the radius. A solid sphere has radius R cm. The surface area of the sphere equals the total surface area of the cone.\n(a) Show that y = 4R.\n(b) Find the volume of the cone in terms of R.',
    marks: 7, hints: ['(a) Slant height = 1.25y, TSA cone = πy² + πy(1.25y) = 2.25πy²', '4πR² = 2.25πy², y² = 16R²/9... y = 4R', '(b) h = √(l²−r²), V = ⅓πy²h'],
    type: 'multi-part',
    parts: [{ label: '(a) Show y = 4R', key: 'a', marks: 3 }, { label: '(b) Volume', key: 'b', marks: 4 }],
    answer: { a: 'y = 4R shown', b: '16πR³/27' }
  },
};

export const sections4024_11_2022ON: PastPaperSection[] = Object.values(questions4024_11_2022ON).map(q => ({
  id: `s_${q.id.slice(3)}`,
  questionId: q.id,
  title: `Q${q.questionNumber} – ${q.title}`,
}));
