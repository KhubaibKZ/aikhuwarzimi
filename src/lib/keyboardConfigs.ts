// Smart keyboard configurations for different question types
// Each config contains keys specific to solving that type of problem

export const KEYBOARD_CONFIGS = {
  // ========== Question 2 - Geometry ==========
  
  // Q2(d) - Parallelogram angles
  'pp_0580_s22_q2d': [
    ['7', '8', '9', '°', '−'],
    ['4', '5', '6', '+', '='],
    ['1', '2', '3', '/', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['360', '248', '180', '112', '68'],
  ],

  // Q2(e) - Angles in ratio 3:5:7
  'pp_0580_s22_q2e': [
    ['7', '8', '9', '°', '−'],
    ['4', '5', '6', '+', '='],
    ['1', '2', '3', '/', '×'],
    ['0', '.', ':', '(', ')'],
    ['180', '15', '12', '84', '⌫'],
  ],

  // ========== Question 3 - Word Problems ==========
  
  // Q3(a) - Ticket costs: 2×375 + 3×194
  'pp_0580_s22_q3a': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '$', '(', ')', '⌫'],
    ['375', '194', '750', '582', '1332'],
  ],

  // Q3(b) - Percentage increase: 110 + 18%
  'pp_0580_s22_q3b': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '$', '%', '(', ')'],
    ['110', '18', '0.18', '19.8', '⌫'],
  ],

  // Q3(c) - Temperature: 16 - 23
  'pp_0580_s22_q3c': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '°C', '(', ')', '⌫'],
    ['16', '23', '-7'],
  ],

  // Q3(d) - Fraction: 3/8 of 768
  'pp_0580_s22_q3d': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '$', '/', '(', ')'],
    ['768', '96', '288', '⌫'],
  ],

  // Q3(e) - Division rounding: 604 ÷ 46
  'pp_0580_s22_q3e': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '(', ')', '⌫', 'Clear'],
    ['604', '46', '13', '14'],
  ],

  // Q3(f) - Percentage: 268/604 × 100
  'pp_0580_s22_q3f': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '%', '/', '(', ')'],
    ['268', '604', '100', '44.4', '⌫'],
  ],

  // Q3(g) - Speed/distance/time: 126 ÷ 54
  'pp_0580_s22_q3g': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', 'hr', 'min', '(', ')'],
    ['126', '54', '60', '2', '20', '⌫'],
  ],

  // ========== Question 4 - Volume & Area ==========
  
  // Q4(a) - Volume: ½×3×4×7
  'pp_0580_s22_q4a': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '½', 'cm³', '(', ')'],
    ['42', '6', '21', '⌫'],
  ],

  // Q4(b) - Circles in rectangle: π, radius 8
  'pp_0580_s22_q4b': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', 'π', '²', 'cm²', '%'],
    ['48', '32', '1536', '64', '21.5', '⌫'],
  ],

  // ========== Question 6 - Algebra ==========
  
  // Q6(a) - Expressions with w and d
  'pp_0580_s22_q6a': [
    ['7', '8', '9', 'w', 'd'],
    ['4', '5', '6', '+', '−'],
    ['1', '2', '3', '×', '÷'],
    ['0', '=', '(', ')', '⌫'],
  ],

  // Q6(b) - Equations: x, 12, 121
  'pp_0580_s22_q6b': [
    ['7', '8', '9', 'x', '+'],
    ['4', '5', '6', '−', '×'],
    ['1', '2', '3', '=', '÷'],
    ['0', '(', ')', '⌫', 'Clear'],
    ['12', '121', '28', '40', '53'],
  ],

  // Q6(c) - Simplifying: a, b, x
  'pp_0580_s22_q6c': [
    ['7', '8', '9', 'a', 'b'],
    ['4', '5', '6', 'x', '+'],
    ['1', '2', '3', '−', '×'],
    ['0', '=', '(', ')', '⌫'],
  ],

  // Q6(d) - Simultaneous equations
  'pp_0580_s22_q6d': [
    ['7', '8', '9', 'x', 'y'],
    ['4', '5', '6', '+', '−'],
    ['1', '2', '3', '×', '÷'],
    ['0', '=', '(', ')', '⌫'],
    ['11', '20', '-2'],
  ],

  // ========== Question 8 - Linear Graphs ==========
  
  // Q8(a) - Line equation: gradient, y-intercept
  'pp_0580_s22_q8a': [
    ['7', '8', '9', 'x', 'y'],
    ['4', '5', '6', '+', '−'],
    ['1', '2', '3', '=', '/'],
    ['0', '.', '½', '−½', '⌫'],
    ['m', 'c', '-½x', '+2'],
  ],

  // Q8(b) - Table of values: y = 2x + 5
  'pp_0580_s22_q8b': [
    ['7', '8', '9', 'x', 'y'],
    ['4', '5', '6', '+', '−'],
    ['1', '2', '3', '=', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['-5', '-3', '-1', '5'],
  ],

  // Q8(c) - Coordinates intersection
  'pp_0580_s22_q8c': [
    ['7', '8', '9', '(', ')'],
    ['4', '5', '6', ',', '−'],
    ['1', '2', '3', '.', '='],
    ['0', 'x', 'y', '⌫', 'Clear'],
    ['-1.2', '2.6'],
  ],

  // Q8(d) - Parallel line equation
  'pp_0580_s22_q8d': [
    ['7', '8', '9', 'x', 'y'],
    ['4', '5', '6', '+', '−'],
    ['1', '2', '3', '=', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['2x', '18', 'y ='],
  ],

  // ========== Generic Keyboards ==========

  // General geometry keyboard
  'geometry': [
    ['7', '8', '9', '°', '−'],
    ['4', '5', '6', '+', '='],
    ['1', '2', '3', '/', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['180', '360', '90', '45'],
  ],

  // General arithmetic keyboard
  'arithmetic': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '.'],
    ['0', '(', ')', '⌫', 'Clear'],
  ],

  // Prime factorization keyboard
  'primeFactors': [
    ['7', '8', '9', '×', '÷'],
    ['4', '5', '6', '²', '³'],
    ['1', '2', '3', '=', '.'],
    ['0', '(', ')', '⌫', 'Clear'],
  ],

  // LCM/HCF keyboard
  'lcmHcf': [
    ['7', '8', '9', '×', '÷'],
    ['4', '5', '6', '²', '³'],
    ['1', '2', '3', '=', ','],
    ['0', 'LCM', 'HCF', '⌫', 'Clear'],
  ],

  // Algebra keyboard
  'algebra': [
    ['7', '8', '9', 'x', 'y'],
    ['4', '5', '6', '+', '−'],
    ['1', '2', '3', '×', '÷'],
    ['0', '=', '(', ')', '⌫'],
    ['²', '³', '√', 'π', 'Clear'],
  ],

  // Coordinates keyboard
  'coordinates': [
    ['7', '8', '9', '(', ')'],
    ['4', '5', '6', ',', '−'],
    ['1', '2', '3', 'x', 'y'],
    ['0', '.', '=', '⌫', 'Clear'],
  ],

  // Percentage keyboard
  'percentage': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '%', '.'],
    ['0', '=', '/', '⌫', 'Clear'],
    ['100', '0.01'],
  ],

  // Money/currency keyboard
  'money': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '.', '='],
    ['0', '$', '(', ')', '⌫'],
  ],
} as const;

export type KeyboardConfigKey = keyof typeof KEYBOARD_CONFIGS;

// Get keyboard config for a question, with smart fallback based on question type
export function getKeyboardConfig(questionId: string, questionType?: string): string[][] {
  // Check for exact question match first
  if (questionId in KEYBOARD_CONFIGS) {
    return KEYBOARD_CONFIGS[questionId as KeyboardConfigKey].map(row => [...row]);
  }
  
  // Fallback based on question type
  if (questionType) {
    switch (questionType) {
      case 'angle-steps':
      case 'formula-fraction':
        return KEYBOARD_CONFIGS.geometry.map(row => [...row]);
      case 'prime-factor':
        return KEYBOARD_CONFIGS.primeFactors.map(row => [...row]);
      case 'lcm-ladder':
        return KEYBOARD_CONFIGS.lcmHcf.map(row => [...row]);
      case 'calculation':
        return KEYBOARD_CONFIGS.arithmetic.map(row => [...row]);
      case 'multi-part':
        return KEYBOARD_CONFIGS.arithmetic.map(row => [...row]);
      default:
        return KEYBOARD_CONFIGS.arithmetic.map(row => [...row]);
    }
  }
  
  // Default to arithmetic keyboard
  return KEYBOARD_CONFIGS.arithmetic.map(row => [...row]);
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
