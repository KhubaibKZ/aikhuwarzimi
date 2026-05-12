// Smart keyboard configurations for different question types
// Keys focus on digits, variables, and symbols needed for each question

export const KEYBOARD_CONFIGS = {
  // ========== Question 2 - Geometry ==========
  
  // Q2(d) - Parallelogram angles
  'pp_0580_s22_q2d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['°', '+', '−', '×', '÷', '=', '/', '(', ')', '⌫'],
  ],

  // Q2(e) - Angles in ratio 3:5:7
  'pp_0580_s22_q2e': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['°', '+', '−', '×', '÷', '=', ':', '.', '⌫', 'Clear'],
  ],

  // ========== Question 3 - Word Problems ==========
  
  // Q3(a) - Ticket costs
  'pp_0580_s22_q3a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '+', '−', '×', '÷', '=', '.', '(', ')', '⌫'],
  ],

  // Q3(b) - Percentage increase
  'pp_0580_s22_q3b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '%', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],

  // Q3(c) - Temperature
  'pp_0580_s22_q3c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['°C', '+', '−', '×', '÷', '=', '.', '(', ')', '⌫'],
  ],

  // Q3(d) - Fraction calculation
  'pp_0580_s22_q3d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Q3(e) - Division rounding
  'pp_0580_s22_q3e': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '.', '(', ')', '⌫', 'Clear'],
  ],

  // Q3(f) - Percentage calculation
  'pp_0580_s22_q3f': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['%', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Q3(g) - Speed/distance/time
  'pp_0580_s22_q3g': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['hr', 'min', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],

  // ========== Question 4 - Volume & Area ==========
  
  // Q4(a) - Volume of prism
  'pp_0580_s22_q4a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['½', 'cm³', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],

  // Q4(b) - Circles in rectangle
  'pp_0580_s22_q4b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['π', '²', 'cm²', '%', '+', '−', '×', '÷', '=', '⌫'],
  ],

  // ========== Question 6 - Algebra ==========
  
  // Q6(a) - Expressions with w and d
  'pp_0580_s22_q6a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['w', 'd', '+', '−', '×', '÷', '=', '(', ')', '⌫'],
  ],

  // Q6(b) - Equations with x
  'pp_0580_s22_q6b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '×', '÷', '=', '(', ')', '⌫', 'Clear'],
  ],

  // Q6(c) - Simplifying with a, b, x
  'pp_0580_s22_q6c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['a', 'b', 'x', '+', '−', '×', '=', '(', ')', '⌫'],
  ],

  // Q6(d) - Simultaneous equations
  'pp_0580_s22_q6d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '÷', '=', '(', ')', '⌫'],
  ],

  // ========== Question 8 - Linear Graphs ==========
  
  // Q8(a) - Line equation
  'pp_0580_s22_q8a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', 'm', 'c', '+', '−', '=', '/', '.', '⌫'],
  ],

  // Q8(b) - Table of values
  'pp_0580_s22_q8b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '=', '.', '(', ')', '⌫'],
  ],

  // Q8(c) - Coordinates intersection
  'pp_0580_s22_q8c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '(', ')', ',', '−', '.', '=', '⌫', 'Clear'],
  ],

  // Q8(d) - Parallel line equation
  'pp_0580_s22_q8d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '=', '.', '(', ')', '⌫'],
  ],

  // ========== Question 9 - Reciprocal Graphs (Unified) ==========
  
  // Q9 - Complete question for y = 12/x
  'pp_0580_s22_q9': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '÷', '=', '/', '.', '⌫'],
  ],

  // ========== 0580/43 May/June 2021 - Individual Question Parts ==========

  // Q1 - Ratio, Percentages, Compound Growth
  'pp_0580_s21_q1a1': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '+', '−', '×', '÷', '=', '.', ':', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q1a2': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '%', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q1a3': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '%', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q1b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '%', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q1c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['%', '+', '−', '×', '÷', '=', '.', '(', ')', '⌫'],
  ],

  // Q2 - Algebra
  'pp_0580_s21_q2a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'p', 't', '+', '−', '×', '÷', '=', '²', '⌫'],
  ],
  'pp_0580_s21_q2b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', 'p', 't', '+', '−', '÷', '√', '=', '⌫'],
  ],
  'pp_0580_s21_q2c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '×', '÷', '=', '/', '(', ')', '⌫'],
  ],
  'pp_0580_s21_q2d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '=', '(', ')', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q2e': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'a', '+', '−', '×', '÷', '=', '/', '⌫', 'Clear'],
  ],

  // Q3 - Statistics
  'pp_0580_s21_q3a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q3b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q3c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q3d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Q4 - Coordinates & Vectors
  'pp_0580_s21_q4a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '÷', '=', '/', '.', '⌫'],
    ['(', ')', ',', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q4b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '(', ')', '⌫'],
  ],
  'pp_0580_s21_q4c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['t', 'u', '+', '−', '×', '÷', '=', '/', '⌫', 'Clear'],
  ],

  // Q5 - Simultaneous Equations
  'pp_0580_s21_q5a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '÷', '=', '/', '.', '⌫'],
  ],
  'pp_0580_s21_q5b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '÷', '=', '/', '.', '⌫'],
  ],

  // Q6 - Venn Diagrams & Probability
  'pp_0580_s21_q6a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q6e': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q6f': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Q7 - Inequalities & Completing the Square
  'pp_0580_s21_q7a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '<', '≤', '>', '≥', '=', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q7b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '×', '÷', '=', '²', '√', '⌫', 'Clear'],
    ['(', ')', '.', '⌫'],
  ],

  // Q8 - Surface Area & Volume
  'pp_0580_s21_q8a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '.', 'cm²', 'cm³', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q8b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'r', 'π', '²', '³', '+', '−', '×', '÷', '⌫'],
    ['√', '∛', '=', '/', '.', 'Clear'],
  ],
  'pp_0580_s21_q8c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['π', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Q9 - Trigonometry & 3D Geometry
  'pp_0580_s21_q9a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['sin', 'cos', 'tan', '°', '+', '−', '×', '÷', '=', '⌫'],
    ['√', '²', '/', '.', 'Clear'],
  ],
  'pp_0580_s21_q9b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['√', '²', '³', '°', '+', '−', '×', '÷', '=', '⌫'],
    ['tan', '.', 'Clear'],
  ],

  // Q10 - Functions
  'pp_0580_s21_q10a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'f', 'g', '+', '−', '×', '÷', '=', '(', ')'],
    ['⌫', 'Clear'],
  ],
  'pp_0580_s21_q10b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '×', '÷', '=', '/', '(', ')', '⌫'],
  ],
  'pp_0580_s21_q10c': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '×', '=', '²', '/', '(', ')', '⌫'],
  ],
  'pp_0580_s21_q10d': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '×', '=', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q10e': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q10f': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '+', '−', '=', '⌫', 'Clear'],
  ],

  // Q11 - Sequences
  'pp_0580_s21_q11a': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['n', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],
  'pp_0580_s21_q11b': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['n', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // ========== Generic Keyboards ==========

  // General geometry keyboard
  'geometry': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['°', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // General arithmetic keyboard
  'arithmetic': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '.', '(', ')', '⌫', 'Clear'],
  ],

  // Prime factorization keyboard
  'primeFactors': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['×', '÷', '²', '³', '=', '.', '(', ')', '⌫', 'Clear'],
  ],

  // LCM/HCF keyboard
  'lcmHcf': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['×', '÷', '²', '³', '=', ',', '(', ')', '⌫', 'Clear'],
  ],

  // Algebra keyboard
  'algebra': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '+', '−', '×', '÷', '=', '²', '⌫', 'Clear'],
  ],

  // Coordinates keyboard
  'coordinates': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', '(', ')', ',', '−', '.', '=', '⌫', 'Clear'],
  ],

  // Percentage keyboard
  'percentage': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['%', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Money/currency keyboard
  'money': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['$', '+', '−', '×', '÷', '=', '.', '(', ')', '⌫'],
  ],

  // Fraction keyboard
  'fraction': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['/', '+', '−', '×', '÷', '=', '.', '(', ')', '⌫'],
  ],

  // Indices / powers keyboard
  'indices': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['²', '³', '⁴', '⁻¹', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],

  // Trigonometry keyboard
  'trigonometry': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['sin', 'cos', 'tan', '°', '+', '−', '×', '÷', '=', '⌫'],
    ['√', '²', '/', '.', 'Clear'],
  ],

  // Standard form keyboard
  'standardForm': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['×', '10', '⁻', '+', '−', '=', '.', '(', ')', '⌫'],
  ],

  // Inequality keyboard
  'inequality': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', '<', '≤', '>', '≥', '+', '−', '×', '=', '⌫'],
  ],

  // Ratio keyboard
  'ratio': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    [':', '+', '−', '×', '÷', '=', '/', '.', '⌫', 'Clear'],
  ],

  // Bearings keyboard
  'bearings': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['°', '+', '−', '×', '÷', '=', '.', '⌫', 'Clear'],
  ],

  // Vectors keyboard — basic ops + key vector tokens + fraction builder
  'vectors': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['a', 'c', '½', '⅓', '⅔', '¼', '¾', '⅙', '⅚', 'a/b'],
    ['<v>OA</v>', '<v>OC</v>', '<v>AC</v>', '<v>AB</v>', '<v>AY</v>', '<v>OX</v>', '<v>OY</v>', '<v>YX</v>'],
    ['+', '−', '=', '(', ')', '.', '⌫', 'Clear'],
  ],

  // Probability keyboard
  'probability': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['/', '+', '−', '×', '=', '.', '(', ')', '⌫', 'Clear'],
  ],

  // Speed, distance, time keyboard
  'speedDistanceTime': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '÷', '=', '/', '.', 'hr', 'min', '⌫'],
  ],

  // Sets / Venn diagram keyboard
  'sets': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['∪', '∩', "'", 'ξ', '+', '−', '=', '(', ')', '⌫'],
  ],

  // Matrix keyboard
  'matrix': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['+', '−', '×', '=', '/', '.', '(', ')', '⌫', 'Clear'],
  ],

  // Mensuration (area/volume) keyboard
  'mensuration': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['π', '²', '³', '+', '−', '×', '÷', '=', '.', '⌫'],
  ],

  // Q17 (4024/11 Oct/Nov 2023) — Direct proportion
  'pp_4024_on23_11_q17': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['y', 'x', 'k', '∝', '=', '√', '²', '.', '/', '×'],
    ['(', ')', '+', '−', '÷', '½', '¼', '⌫', 'Clear'],
  ],

  // Q19 (4024/11 Oct/Nov 2023) — Speed-time graph (area equation in T)
  'pp_4024_on23_11_q19': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['T', '½', '(', ')', '+', '−', '×', '÷', '=', '.'],
    ['m/s²', '/', ',', '⌫', 'Clear'],
  ],

  // Q21 (4024/11 Oct/Nov 2023) — Factorisation (parts a, b & c simplification)
  'pp_4024_on23_11_q21': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['a', 'b', 'c', '(', ')', '+', '−', '×', '÷', '='],
    ['²', '³', '√', '/', 'a/b', ',', '.', '⌫', 'Clear'],
  ],

  // Q22 (4024/11 Oct/Nov 2023) — Functions (f(x), g(x), inverse, solve for p)
  'pp_4024_on23_11_q22': [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['x', 'y', 'p', 'f', 'g', '(', ')', '+', '−', '='],
    ['×', '÷', '/', 'a/b', '⁻¹', '²', ',', '.', '⌫', 'Clear'],
  ],
} as const;

export type KeyboardConfigKey = keyof typeof KEYBOARD_CONFIGS;

// Keyword-to-preset mapping for smart detection from question titles
const TITLE_KEYWORD_MAP: Array<{ keywords: RegExp; preset: KeyboardConfigKey }> = [
  { keywords: /trigonometr|sine|cosine|tangent|sin\b|cos\b|tan\b/i, preset: 'trigonometry' },
  { keywords: /bearing/i, preset: 'bearings' },
  { keywords: /vector/i, preset: 'vectors' },
  { keywords: /inequalit|number line.*inequalit/i, preset: 'inequality' },
  { keywords: /standard form|scientific notation/i, preset: 'standardForm' },
  { keywords: /indic|power|index notation/i, preset: 'indices' },
  { keywords: /venn|set notation|sets\b|union|intersection/i, preset: 'sets' },
  { keywords: /matri/i, preset: 'matrix' },
  { keywords: /probabil|tree diagram|combined event/i, preset: 'probability' },
  { keywords: /speed|distance.*time|time.*distance|velocity|rate/i, preset: 'speedDistanceTime' },
  { keywords: /ratio|proportion|share/i, preset: 'ratio' },
  { keywords: /percent|increase.*%|decrease.*%|simple interest|compound interest|profit|loss|discount/i, preset: 'percentage' },
  { keywords: /fraction|mixed number|improper/i, preset: 'fraction' },
  { keywords: /volume|surface area|prism|cylinder|cone|sphere|cuboid|cube|mensuration|capacity/i, preset: 'mensuration' },
  { keywords: /angle|polygon|triangle|quadrilateral|pentagon|hexagon|parallel.*line|symmetry|rotation|reflection|transformation|congruent|similar/i, preset: 'geometry' },
  { keywords: /coordinate|midpoint|gradient|equation.*line|y\s*=\s*mx|graph|plot|scatter|histogram|bar chart|pie chart|frequency/i, preset: 'coordinates' },
  { keywords: /simplif|expan|factoris|solve.*equation|simultaneous|quadratic|expression|formula|substitut|sequence|nth term|algebraic/i, preset: 'algebra' },
  { keywords: /money|cost|price|wage|salary|currency|exchange rate|\$/i, preset: 'money' },
];

// Get keyboard config for a question, with smart fallback based on question type and title
export function getKeyboardConfig(questionId: string, questionType?: string, questionTitle?: string): string[][] {
  const clone = (key: KeyboardConfigKey) => KEYBOARD_CONFIGS[key].map(row => [...row]);

  // Check for exact question match first
  if (questionId in KEYBOARD_CONFIGS) {
    return clone(questionId as KeyboardConfigKey);
  }

  // Smart detection from question title
  if (questionTitle) {
    for (const { keywords, preset } of TITLE_KEYWORD_MAP) {
      if (keywords.test(questionTitle)) {
        return clone(preset);
      }
    }
  }
  
  // Fallback based on question type
  if (questionType) {
    switch (questionType) {
      case 'angle-steps':
      case 'formula-fraction':
        return clone('geometry');
      case 'prime-factor':
        return clone('primeFactors');
      case 'lcm-ladder':
        return clone('lcmHcf');
      case 'calculation':
      case 'multi-part':
      default:
        return clone('arithmetic');
    }
  }
  
  // Default to arithmetic keyboard
  return clone('arithmetic');
}

// Get rough work placeholder based on question type
export function getRoughWorkPlaceholder(questionId: string, questionTitle: string): string {
  // Question-specific placeholders
  const placeholders: Record<string, string> = {
    'pp_0580_s22_q2d': `Example:
Reflex angle at D = 248°
Interior angle D = 360° − 248° = 112°
Adjacent angles add to 180°
Angle DCB = 180° − 112° = 68°`,
    
    'pp_0580_s22_q2e': `Example:
Total ratio = 3 + 5 + 7 = 15 parts
Sum of angles = 180°
One part = 180° ÷ 15 = 12°
Largest angle = 7 × 12° = ?`,
    
    'pp_0580_s22_q3a': `Example:
Adults: 2 × $375 = $750
Children: 3 × $194 = $582
Total = $750 + $582 = ?`,
    
    'pp_0580_s22_q3b': `Example:
Service charge = 18% of $110
= 0.18 × 110 = ?
Total = 110 + ? = ?`,
    
    'pp_0580_s22_q3g': `Example:
Time = Distance ÷ Speed
Time = 126 ÷ 54 = ? hours
Convert decimal to minutes:
? × 60 = ? minutes`,
    
    'pp_0580_s22_q4a': `Example:
Area of triangle = ½ × base × height
= ½ × 3 × 4 = ?
Volume = Area × length
= ? × 7 = ?`,
    
    'pp_0580_s22_q6b': `Example:
Athletic = x points
Rovers = x + 12 points  
United = 2x - 3 points
Total: x + (x + 12) + (2x - 3) = 121
Simplify: 4x + ? = 121`,
    
    'pp_0580_s22_q6d': `Example:
3x + 5y = 11  ... (1)
2x - 3y = 20  ... (2)
Multiply to eliminate a variable:
(1) × 3: 9x + 15y = 33
(2) × 5: 10x - 15y = 100
Add equations...`,
    
    'pp_0580_s22_q8a': `Example:
Points: (-4, 4) and (2, 1)
Gradient m = (y₂ - y₁) ÷ (x₂ - x₁)
m = (1 - 4) ÷ (2 - (-4))
m = -3 ÷ 6 = ?
Use y = mx + c with a point to find c`,
    
    'pp_0580_s22_q9': `Part (a): Complete the table
y = 12/x
When x = -6: y = 12 ÷ (-6) = ?
When x = -1: y = 12 ÷ (-1) = ?

Part (b): Plot points and draw curves
Part (c): Draw horizontal line at y = 5
Part (d): Find x where curves meet y = 5`,
  };

  if (questionId in placeholders) {
    return placeholders[questionId];
  }

  // Generic placeholder
  return `Work through ${questionTitle} step by step:
Step 1: Identify given information
Step 2: Choose the correct method/formula
Step 3: Calculate the answer`;
}
