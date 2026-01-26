// Smart keyboard configurations for different question types
// Each config contains keys specific to solving that type of problem

export const KEYBOARD_CONFIGS = {
  // Q2(d) - Parallelogram angles
  'pp_0580_s22_q2d': [
    ['7', '8', '9', '°', '−'],
    ['4', '5', '6', '+', '='],
    ['1', '2', '3', '/', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['360', '248', '180', '112', '68'], // Key values for this problem
  ],

  // Q2(b) - Isosceles triangle angles  
  'pp_0580_s22_q2b': [
    ['7', '8', '9', '°', '−'],
    ['4', '5', '6', '+', '='],
    ['1', '2', '3', '/', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['180', '125', '55', '27.5'], // Key values: 180, given angle, supplements
  ],

  // Q2(a) - Pentagon interior angles
  'pp_0580_s22_q2a': [
    ['7', '8', '9', '°', '−'],
    ['4', '5', '6', '+', '='],
    ['1', '2', '3', '/', '×'],
    ['0', '.', '(', ')', '⌫'],
    ['180', '540', '108', 'n'], // Key: formula values (n-2)×180
  ],

  // Q2(c) - Prism faces/edges
  'pp_0580_s22_q2c': [
    ['7', '8', '9', '+', '−'],
    ['4', '5', '6', '×', '÷'],
    ['1', '2', '3', '=', '⌫'],
    ['0', 'faces', 'edges', 'vertices'],
  ],

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
} as const;

export type KeyboardConfigKey = keyof typeof KEYBOARD_CONFIGS;

export function getKeyboardConfig(questionId: string): string[][] {
  if (questionId in KEYBOARD_CONFIGS) {
    // Convert readonly arrays to mutable
    return KEYBOARD_CONFIGS[questionId as KeyboardConfigKey].map(row => [...row]);
  }
  // Default to geometry keyboard
  return KEYBOARD_CONFIGS.geometry.map(row => [...row]);
}
