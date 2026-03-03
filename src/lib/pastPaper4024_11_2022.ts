// 4024/11 May/June 2022 - Past Paper Questions
// Paper 1 Non-Calculator - 2 hours - 80 marks

import { PastPaperQuestion, PastPaperSection } from './pastPaperData';

export const questions4024_11_2022: Record<string, PastPaperQuestion> = {
  'pp_4024_s22_11_q1': {
    id: 'pp_4024_s22_11_q1', questionNumber: '1', title: 'Place value and rounding',
    question: '(a) Write down the value of the 5 in the number 253 624.\n(b) The crowd at a sports event is exactly 35 687. Write this number correct to the nearest ten.',
    marks: 2, hints: ['(a) The 5 is in the ten thousands place, so its value is 50 000', '(b) Look at the units digit (7 ≥ 5), so round up to 35 690'],
    type: 'multi-part',
    parts: [{ label: '(a) Value of 5', key: 'a', marks: 1 }, { label: '(b) Nearest ten', key: 'b', marks: 1 }],
    answer: { a: '50000', b: '35690' }
  },
  'pp_4024_s22_11_q2': {
    id: 'pp_4024_s22_11_q2', questionNumber: '2', title: 'Symmetry',
    question: '(a) Write down the number of lines of symmetry of this diagram.\n(b) Write down the order of rotational symmetry of this diagram.',
    marks: 2, hints: ['(a) Count the lines that divide the shape into mirror halves', '(b) Count how many times the shape fits onto itself in a full turn'],
    type: 'multi-part',
    parts: [{ label: '(a) Lines of symmetry', key: 'a', marks: 1 }, { label: '(b) Rotational symmetry order', key: 'b', marks: 1 }],
    answer: { a: '1', b: '2' }
  },
  'pp_4024_s22_11_q3': {
    id: 'pp_4024_s22_11_q3', questionNumber: '3', title: 'Temperature differences',
    question: '(a) Find the difference between the highest and lowest of the monthly temperatures in Vladivostok. Highest = 20 °C, lowest = −12 °C.\n(b) In February, the average temperature in Yakutsk is 37 °C below that in Vladivostok (−8 °C). Find the average temperature in Yakutsk in February.',
    marks: 2, hints: ['(a) Difference = 20 − (−12) = 32', '(b) −8 − 37 = −45'],
    type: 'multi-part',
    parts: [{ label: '(a) Difference (°C)', key: 'a', marks: 1 }, { label: '(b) Yakutsk temp (°C)', key: 'b', marks: 1 }],
    answer: { a: '32', b: '-45' }
  },
  'pp_4024_s22_11_q4': {
    id: 'pp_4024_s22_11_q4', questionNumber: '4', title: 'Cubes – volume and edges',
    question: 'Two cubes have a total volume of 152 cm³. One cube has an edge of length 5 cm.\n(a) Calculate the length of the edge of the other cube.\n(b) Work out the total length of all of the edges of the larger cube.',
    marks: 3, hints: ['5³ = 125, so other cube = 152 − 125 = 27 cm³', '(a) ³√27 = 3 cm', '(b) A cube has 12 edges. The larger cube has edge 5, so 12 × 5 = 60 cm'],
    type: 'multi-part',
    parts: [{ label: '(a) Edge length (cm)', key: 'a', marks: 2 }, { label: '(b) Total edge length (cm)', key: 'b', marks: 1 }],
    answer: { a: '3', b: '60' }
  },
  'pp_4024_s22_11_q5': {
    id: 'pp_4024_s22_11_q5', questionNumber: '5', title: 'Nets of solids',
    question: 'The diagram shows the net of a solid drawn on a 1 cm grid. Name the solid formed by this net and describe fully the dimensions of this solid.',
    marks: 3, hints: ['The net forms a cylinder', 'Measure the rectangle: height = 6 cm', 'The circles have radius 1.5 cm (diameter 3 cm)'],
    type: 'multi-part',
    parts: [{ label: 'Name of solid', key: 'name', marks: 1 }, { label: 'Radius or diameter', key: 'dim1', marks: 1 }, { label: 'Height or length', key: 'dim2', marks: 1 }],
    answer: { name: 'Cylinder', dim1: 'radius 1.5 cm', dim2: 'height 6 cm' }
  },
  'pp_4024_s22_11_q6': {
    id: 'pp_4024_s22_11_q6', questionNumber: '6', title: 'Prime and irrational numbers',
    question: '(a) Write down a prime number between 10 and 15.\n(b) Write down an irrational number between 10 and 15.',
    marks: 2, hints: ['(a) 11 or 13 are prime', '(b) √(any non-perfect square between 100 and 225), e.g. √150 or 3π'],
    type: 'multi-part',
    parts: [{ label: '(a) Prime number', key: 'a', marks: 1 }, { label: '(b) Irrational number', key: 'b', marks: 1 }],
    answer: { a: '11', b: '√150' }
  },
  'pp_4024_s22_11_q7': {
    id: 'pp_4024_s22_11_q7', questionNumber: '7', title: 'Median and mean from frequency table',
    question: '20 students were asked how many pets they owned.\n\nNumber of pets: 0, 1, 2, 3, 4, 5\nFrequency: 3, 8, 3, 4, 0, 2\n\n(a) Find the median number of pets.\n(b) Calculate the mean number of pets.',
    marks: 3, hints: ['(a) 20 values, median is average of 10th and 11th. Cumulative: 3, 11, ... so median = 1', '(b) Sum = 0×3 + 1×8 + 2×3 + 3×4 + 4×0 + 5×2 = 36. Mean = 36/20 = 1.8'],
    type: 'multi-part',
    parts: [{ label: '(a) Median', key: 'a', marks: 1 }, { label: '(b) Mean', key: 'b', marks: 2 }],
    answer: { a: '1', b: '1.8' }
  },
  'pp_4024_s22_11_q8': {
    id: 'pp_4024_s22_11_q8', questionNumber: '8', title: 'Fraction arithmetic',
    question: '(a) Work out 2/3 − 3/5.\n(b) Work out 3/2 × 5/3.',
    marks: 2, hints: ['(a) Common denominator 15: 10/15 − 9/15 = 1/15', '(b) 3/2 × 5/3 = 15/6 = 5/2 = 2½ or 9/10'],
    type: 'multi-part',
    parts: [{ label: '(a) 2/3 − 3/5', key: 'a', marks: 1 }, { label: '(b) 3/2 × 5/3', key: 'b', marks: 1 }],
    answer: { a: '1/15', b: '9/10' }
  },
  'pp_4024_s22_11_q9': {
    id: 'pp_4024_s22_11_q9', questionNumber: '9', title: 'Ordering lengths',
    question: 'Write these lengths in order of size, starting with the smallest: 32 000 cm, 3300 mm, 3.1 km, 34 m.',
    marks: 2, hints: ['Convert all to metres: 320 m, 3.3 m, 3100 m, 34 m', 'Order: 3.3 m, 34 m, 320 m, 3100 m'],
    type: 'short', answer: '3300 mm, 34 m, 32000 cm, 3.1 km'
  },
  'pp_4024_s22_11_q10': {
    id: 'pp_4024_s22_11_q10', questionNumber: '10', title: 'Scatter diagram',
    question: '(a) Complete the scatter diagram by plotting the remaining 5 points.\n(b) What type of correlation is shown on the scatter diagram?\n(c) Draw a line of best fit.\n(d) Use your line to estimate the monthly rent for an apartment 4 km from the city centre.',
    marks: 5, hints: ['(a) Plot the remaining data points', '(b) As distance increases, rent decreases — negative correlation', '(c) Draw a straight line through the middle of the data', '(d) Read from your line at 4 km'],
    type: 'multi-part',
    parts: [{ label: '(a) Points plotted', key: 'a', marks: 2 }, { label: '(b) Correlation type', key: 'b', marks: 1 }, { label: '(c) Line of best fit', key: 'c', marks: 1 }, { label: '(d) Estimated rent ($)', key: 'd', marks: 1 }],
    answer: { a: 'Points plotted', b: 'Negative', c: 'Line drawn', d: '≈290' }
  },
  'pp_4024_s22_11_q11': {
    id: 'pp_4024_s22_11_q11', questionNumber: '11', title: 'Relative frequency',
    question: '(a) 100 adults were asked the colour of their car. Red: 36, Black: 11, Blue: 23, Silver: 30. Write down the relative frequency that one of these cars is blue.\n(b) A different group of 1200 adults: the relative frequency of owning a white car is 0.3. Find the number who own a white car.',
    marks: 2, hints: ['(a) 23/100 = 0.23', '(b) 0.3 × 1200 = 360'],
    type: 'multi-part',
    parts: [{ label: '(a) Relative frequency (blue)', key: 'a', marks: 1 }, { label: '(b) Number with white car', key: 'b', marks: 1 }],
    answer: { a: '23/100', b: '360' }
  },
  'pp_4024_s22_11_q12': {
    id: 'pp_4024_s22_11_q12', questionNumber: '12', title: 'Estimation',
    question: 'By writing each number correct to 1 significant figure, estimate the value of 0.28 × 37.4 ÷ 77.8.',
    marks: 2, hints: ['0.28 ≈ 0.3, 37.4 ≈ 40, 77.8 ≈ 80', '0.3 × 40 ÷ 80 = 12 ÷ 80 = 0.15'],
    type: 'short', answer: '0.15'
  },
  'pp_4024_s22_11_q13': {
    id: 'pp_4024_s22_11_q13', questionNumber: '13', title: 'Expanding brackets and algebraic fractions',
    question: '(a) Expand and simplify:\n(i) (x + 3)(x − 4)\n(ii) 5(x + 2) − 2(2x − 1)\n(b) Write as a single fraction in its simplest form: 4b/3 + 5b/9.',
    marks: 6, hints: ['(a)(i) x² + 3x − 4x − 12 = x² − x − 12', '(a)(ii) 5x + 10 − 4x + 2 = x + 12', '(b) 12b/9 + 5b/9 = 17b/9'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) (x+3)(x−4)', key: 'ai', marks: 2 }, { label: '(a)(ii) 5(x+2)−2(2x−1)', key: 'aii', marks: 2 }, { label: '(b) 4b/3 + 5b/9', key: 'b', marks: 2 }],
    answer: { ai: 'x²−x−12', aii: 'x+12', b: '17b/9' }
  },
  'pp_4024_s22_11_q14': {
    id: 'pp_4024_s22_11_q14', questionNumber: '14', title: 'Standard form',
    question: '(a) Write 0.000863 in standard form.\n(b) The table shows approximate areas of deserts.\n(i) Write down the name of the desert with the largest area.\n(ii) Calculate the total area of the Arabian and Kalahari deserts. Give your answer in standard form.',
    marks: 4, hints: ['(a) 8.63 × 10⁻⁴', '(b)(i) Antarctica (14 × 10⁶)', '(b)(ii) 2.3 × 10⁶ + 0.9 × 10⁶ = 3.2 × 10⁶'],
    type: 'multi-part',
    parts: [{ label: '(a) Standard form', key: 'a', marks: 1 }, { label: '(b)(i) Largest desert', key: 'bi', marks: 1 }, { label: '(b)(ii) Total area (km²)', key: 'bii', marks: 2 }],
    answer: { a: '8.63×10⁻⁴', bi: 'Antarctica', bii: '3.2×10⁶' }
  },
  'pp_4024_s22_11_q15': {
    id: 'pp_4024_s22_11_q15', questionNumber: '15', title: 'Indices',
    question: '(a) Evaluate 7⁻³ × 7⁻⁴ as a power of 7.\n(b) Find the value of k when (3⁶)ᵏ = 3².\n(c) Simplify (3² × 2⁴)/(2² × 3⁵). Give your answer in the form 2ᵃ × 3ᵇ.',
    marks: 4, hints: ['(a) 7⁻³⁺⁽⁻⁴⁾ = 7⁻⁷', '(b) 3⁶ᵏ = 3², so 6k = 2, k = 1/3', '(c) 2⁴⁻² × 3²⁻⁵ = 2² × 3⁻³'],
    type: 'multi-part',
    parts: [{ label: '(a) 7⁻³ × 7⁻⁴', key: 'a', marks: 1 }, { label: '(b) k', key: 'b', marks: 1 }, { label: '(c) Simplified form', key: 'c', marks: 2 }],
    answer: { a: '7⁻⁷', b: '1/3', c: '2²×3⁻³' }
  },
  'pp_4024_s22_11_q16': {
    id: 'pp_4024_s22_11_q16', questionNumber: '16', title: 'Vectors – drawing',
    question: 'p = (2, 3) and q = (−3, 2).\n(a) On the unit grid, draw and label vector p.\n(b) On the unit grid, draw and label vector 2q.\n(c) On the unit grid, draw and label vector p − q.',
    marks: 4, hints: ['(a) Draw arrow 2 right, 3 up', '(b) 2q = (−6, 4)', '(c) p − q = (2−(−3), 3−2) = (5, 1)'],
    type: 'multi-part',
    parts: [{ label: '(a) Draw p', key: 'a', marks: 1 }, { label: '(b) Draw 2q', key: 'b', marks: 1 }, { label: '(c) Draw p−q', key: 'c', marks: 2 }],
    answer: { a: '(2,3)', b: '(-6,4)', c: '(5,1)' }
  },
  'pp_4024_s22_11_q17': {
    id: 'pp_4024_s22_11_q17', questionNumber: '17', title: 'Scale drawing – area',
    question: 'The scale of a map is 2 cm to 1 km. The area of a wood on the map is 6 cm². Calculate the actual area of the wood in km².',
    marks: 2, hints: ['Scale: 2 cm = 1 km, so 1 cm = 0.5 km', 'Area scale: (2 cm)² = (1 km)², so 4 cm² = 1 km²', '6 cm² = 6/4 = 1.5 km²'],
    type: 'short', answer: '1.5'
  },
  'pp_4024_s22_11_q18': {
    id: 'pp_4024_s22_11_q18', questionNumber: '18', title: 'Venn diagrams',
    question: '(a) In the Venn diagram, shade the region represented by P ∩ Q\'.\n(b) A club has 32 members. 14 female, 18 male. 5 females have black hair, 6 males have black hair. ξ = {members}, F = {females}, B = {black hair}. Complete the Venn diagram.',
    marks: 3, hints: ['(a) Shade P but not Q', '(b) F ∩ B = 5, F only = 9, B only = 6, outside both = 12'],
    type: 'multi-part',
    parts: [{ label: '(a) Shaded region', key: 'a', marks: 1 }, { label: '(b) Venn diagram values', key: 'b', marks: 2 }],
    answer: { a: 'P ∩ Q\' shaded', b: '9, 5, 6, 12' }
  },
  'pp_4024_s22_11_q19': {
    id: 'pp_4024_s22_11_q19', questionNumber: '19', title: 'Circle theorems',
    question: 'B, D, E, F and G are points on a circle centre O. AC is a tangent at B. Angle DFG = 75° and angle ABG = 48°.\n(a) Find angle DEG.\n(b) Find angle DOG.\n(c) Find angle DBC.',
    marks: 4, hints: ['(a) Angles in the same segment: DEG = DFG = 75°', '(b) Angle at centre = 2 × angle at circumference: DOG = 2 × 75 = 150°', '(c) Angle DBG = 75° (same segment), DBC = DBG − ABG... Use alternate segment theorem'],
    type: 'multi-part',
    parts: [{ label: '(a) Angle DEG', key: 'a', marks: 1 }, { label: '(b) Angle DOG', key: 'b', marks: 1 }, { label: '(c) Angle DBC', key: 'c', marks: 2 }],
    answer: { a: '75', b: '150', c: '27' }
  },
  'pp_4024_s22_11_q20': {
    id: 'pp_4024_s22_11_q20', questionNumber: '20', title: 'Functions',
    question: 'f(x) = (6x + 2)/5.\n(a) Find f(3).\n(b) Find x such that f⁻¹(x) = 3.',
    marks: 4, hints: ['(a) f(3) = (18+2)/5 = 20/5 = 4', '(b) f⁻¹(x) = 3 means f(3) = x, so x = 4. Or: f⁻¹(x) = (5x−2)/6, set equal to 3: 5x−2 = 18, x = 4'],
    type: 'multi-part',
    parts: [{ label: '(a) f(3)', key: 'a', marks: 1 }, { label: '(b) x when f⁻¹(x) = 3', key: 'b', marks: 3 }],
    answer: { a: '4', b: '4' }
  },
  'pp_4024_s22_11_q21': {
    id: 'pp_4024_s22_11_q21', questionNumber: '21', title: 'Inverse proportion',
    question: 'y is inversely proportional to (x + 1)². Given that y = 2 when x = 3, find y when x = 9.',
    marks: 2, hints: ['y = k/(x+1)². When x=3: 2 = k/16, so k = 32', 'When x=9: y = 32/100 = 0.32'],
    type: 'short', answer: '0.32'
  },
  'pp_4024_s22_11_q22': {
    id: 'pp_4024_s22_11_q22', questionNumber: '22', title: 'Factorisation',
    question: '(a) Factorise 5ax − 3ay − 10cx + 6cy.\n(b) Factorise 15x² − 7x − 4.',
    marks: 4, hints: ['(a) Group: a(5x−3y) − 2c(5x−3y) = (5x−3y)(a−2c)', '(b) Find factors: (3x+1)(5x−4) since 3×(−4) + 1×5 = −12+5 = −7 ✓'],
    type: 'multi-part',
    parts: [{ label: '(a) Factorise', key: 'a', marks: 2 }, { label: '(b) Factorise', key: 'b', marks: 2 }],
    answer: { a: '(5x−3y)(a−2c)', b: '(3x+1)(5x−4)' }
  },
  'pp_4024_s22_11_q23': {
    id: 'pp_4024_s22_11_q23', questionNumber: '23', title: 'Rearranging formulae',
    question: 'y = (3x + 2)/(2x − 1). Rearrange the formula to make x the subject.',
    marks: 4, hints: ['Multiply both sides by (2x−1)', 'y(2x−1) = 3x+2', '2xy − y = 3x + 2', '2xy − 3x = y + 2', 'x(2y−3) = y+2', 'x = (y+2)/(2y−3)'],
    type: 'short', answer: 'x = (y+2)/(2y−3)'
  },
  'pp_4024_s22_11_q24': {
    id: 'pp_4024_s22_11_q24', questionNumber: '24', title: 'Matrix algebra',
    question: 'M = [[1,0],[4,3]] and N = [[k,0],[1,4]]. Given that MN = NM, find the value of k.',
    marks: 3, hints: ['MN = [[k,0],[4k+3,12]]', 'NM = [[k,0],[17,12]]', 'Equating: 4k+3 = 17, so k = 3.5'],
    type: 'short', answer: '3.5'
  },
  'pp_4024_s22_11_q25': {
    id: 'pp_4024_s22_11_q25', questionNumber: '25', title: 'Vector geometry',
    question: 'In triangle ACD, B is the midpoint of AC and E is the midpoint of AD. AB = 6a + 3b and DC = 5a + 2b.\n(a)(i) Express AC in terms of a and b.\n(a)(ii) Express AD in terms of a and b.\n(b) Show that EB is parallel to DC.',
    marks: 6, hints: ['(a)(i) AC = 2 × AB = 12a + 6b', '(a)(ii) AD = AC + CD = 12a + 6b − (5a + 2b) = 7a + 4b', '(b) EB = EA + AB = −½(7a+4b) + 6a+3b = 2.5a + b = ½(5a+2b) = ½DC'],
    type: 'multi-part',
    parts: [{ label: '(a)(i) AC', key: 'ai', marks: 1 }, { label: '(a)(ii) AD', key: 'aii', marks: 2 }, { label: '(b) Show EB ∥ DC', key: 'b', marks: 3 }],
    answer: { ai: '12a+6b', aii: '7a+4b', b: 'EB = 2.5a+b = ½DC, so parallel' }
  },
};

export const sections4024_11_2022: PastPaperSection[] = Object.values(questions4024_11_2022).map(q => ({
  id: `s_${q.id.slice(3)}`,
  questionId: q.id,
  title: `Q${q.questionNumber} – ${q.title}`,
}));
