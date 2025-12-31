export interface QuestionData {
  id: string;
  title: string;
  question: string;
  hints: string[];
  type: 'classification' | 'working' | 'calculation' | 'factorization';
  answer?: string | Record<string, string>;
  parts?: { label: string; key: string }[];
}

export interface ChapterSection {
  id: string;
  title: string;
  type: 'overview' | 'example' | 'exercise';
  content?: string;
  questionId?: string;
}

export interface Chapter {
  id: number;
  title: string;
  locked: boolean;
  sections: ChapterSection[];
}

export const questionDatabase: Record<string, QuestionData> = {
  example1: {
    id: 'example1',
    title: "Example 1: Number Classification",
    question: "From the list: 2, √3, 1/1000, -99, 2½, -¼, π, 0.3, 0, 2005\n\nClassify each number into the following sets:",
    hints: [
      "Natural numbers (ℕ) are positive counting numbers: 1, 2, 3, 4, ...",
      "Integers (ℤ) include all whole numbers: ..., -2, -1, 0, 1, 2, ...",
      "Rational numbers (ℚ) can be expressed as fractions p/q where q ≠ 0",
      "Irrational numbers cannot be expressed as fractions (like π, √2, √3)",
      "Real numbers (ℝ) include all rational and irrational numbers"
    ],
    type: 'classification',
    parts: [
      { label: "Natural Numbers (ℕ)", key: "natural" },
      { label: "Integers (ℤ)", key: "integers" },
      { label: "Rational Numbers (ℚ)", key: "rational" },
      { label: "Irrational Numbers", key: "irrational" },
      { label: "Real Numbers (ℝ)", key: "real" }
    ],
    answer: {
      natural: "2, 2005",
      integers: "2, -99, 0, 2005",
      rational: "2, 1/1000, -99, 2½, -¼, 0.3, 0, 2005",
      irrational: "√3, π",
      real: "2, √3, 1/1000, -99, 2½, -¼, π, 0.3, 0, 2005"
    }
  },
  example2: {
    id: 'example2',
    title: "Example 2: HCF and LCM",
    question: "Find the Highest Common Factor (HCF) and Lowest Common Multiple (LCM) of 24 and 36.",
    hints: [
      "First, find the prime factorization of each number",
      "24 = 2³ × 3",
      "36 = 2² × 3²",
      "HCF = product of common prime factors with lowest powers",
      "LCM = product of all prime factors with highest powers"
    ],
    type: 'calculation',
    parts: [
      { label: "Prime factorization of 24", key: "pf24" },
      { label: "Prime factorization of 36", key: "pf36" },
      { label: "HCF", key: "hcf" },
      { label: "LCM", key: "lcm" }
    ],
    answer: {
      pf24: "2³ × 3",
      pf36: "2² × 3²",
      hcf: "12",
      lcm: "72"
    }
  },
  example3: {
    id: 'example3',
    title: "Example 3: Prime Factorization",
    question: "Write 200 as a product of its prime factors using index notation.",
    hints: [
      "Start by dividing by the smallest prime number (2)",
      "200 ÷ 2 = 100",
      "100 ÷ 2 = 50",
      "50 ÷ 2 = 25",
      "25 ÷ 5 = 5",
      "5 ÷ 5 = 1",
      "Count how many times each prime appears"
    ],
    type: 'factorization',
    parts: [
      { label: "Division steps (show your work)", key: "steps" },
      { label: "Final answer in index notation", key: "answer" }
    ],
    answer: {
      steps: "200 ÷ 2 = 100\n100 ÷ 2 = 50\n50 ÷ 2 = 25\n25 ÷ 5 = 5\n5 ÷ 5 = 1",
      answer: "2³ × 5²"
    }
  },
  example4: {
    id: 'example4',
    title: "Example 4: Number Sets and Venn Diagrams",
    question: "Given U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, A = {even numbers}, B = {prime numbers}\n\nFind: A ∩ B, A ∪ B, and A'",
    hints: [
      "Even numbers in U: {2, 4, 6, 8, 10}",
      "Prime numbers in U: {2, 3, 5, 7}",
      "A ∩ B means elements in BOTH A and B",
      "A ∪ B means elements in A OR B (or both)",
      "A' means elements NOT in A (complement)"
    ],
    type: 'classification',
    parts: [
      { label: "Set A (even numbers)", key: "setA" },
      { label: "Set B (prime numbers)", key: "setB" },
      { label: "A ∩ B (intersection)", key: "intersection" },
      { label: "A ∪ B (union)", key: "union" },
      { label: "A' (complement of A)", key: "complement" }
    ],
    answer: {
      setA: "{2, 4, 6, 8, 10}",
      setB: "{2, 3, 5, 7}",
      intersection: "{2}",
      union: "{2, 3, 4, 5, 6, 7, 8, 10}",
      complement: "{1, 3, 5, 7, 9}"
    }
  },
  exercise1_1: {
    id: 'exercise1_1',
    title: "Exercise 1.1: Mixed Practice",
    question: "1. Express 180 as a product of prime factors.\n2. Find the HCF and LCM of 18 and 24.\n3. From the set {-5, 0, √2, 3/4, 7, π}, identify which are integers.",
    hints: [
      "For prime factorization, use a factor tree or division method",
      "Remember: 180 = 4 × 45 = 4 × 9 × 5",
      "For HCF, find common factors with lowest powers",
      "Integers are whole numbers (positive, negative, or zero)"
    ],
    type: 'working',
    parts: [
      { label: "Q1: Prime factorization of 180", key: "q1" },
      { label: "Q2a: HCF of 18 and 24", key: "q2a" },
      { label: "Q2b: LCM of 18 and 24", key: "q2b" },
      { label: "Q3: Integers from the set", key: "q3" }
    ],
    answer: {
      q1: "2² × 3² × 5",
      q2a: "6",
      q2b: "72",
      q3: "-5, 0, 7"
    }
  }
};

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Understanding Numbers",
    locked: false,
    sections: [
      {
        id: 'overview',
        title: "Overview",
        type: 'overview',
        content: `This chapter introduces the fundamental concepts of number systems and classification. You will learn to:

• Identify and classify different types of numbers (Natural, Integers, Rational, Irrational, Real)
• Understand set notation and number line representation
• Find Highest Common Factor (HCF) and Lowest Common Multiple (LCM)
• Express numbers as products of prime factors
• Work with Venn diagrams and set operations

By the end of this chapter, you'll have a solid foundation in number theory that will support your mathematical journey.`
      },
      { id: 'example1', title: "Example 1: Number Classification", type: 'example', questionId: 'example1' },
      { id: 'example2', title: "Example 2: HCF and LCM", type: 'example', questionId: 'example2' },
      { id: 'example3', title: "Example 3: Prime Factorization", type: 'example', questionId: 'example3' },
      { id: 'example4', title: "Example 4: Sets and Venn Diagrams", type: 'example', questionId: 'example4' },
      { id: 'exercise1_1', title: "Exercise 1.1", type: 'exercise', questionId: 'exercise1_1' }
    ]
  },
  { id: 2, title: "Algebraic Expressions", locked: true, sections: [] },
  { id: 3, title: "Linear Equations", locked: true, sections: [] },
  { id: 4, title: "Geometry Basics", locked: true, sections: [] },
  { id: 5, title: "Trigonometry", locked: true, sections: [] },
  { id: 6, title: "Statistics", locked: true, sections: [] },
  { id: 7, title: "Probability", locked: true, sections: [] },
  { id: 8, title: "Calculus Introduction", locked: true, sections: [] }
];

export const getQuestion = (id: string): QuestionData | undefined => {
  return questionDatabase[id];
};
