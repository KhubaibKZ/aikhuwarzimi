// Maps each past paper question ID to its syllabus topic & subtopic
// Based on IGCSE Mathematics 0580 (2025-2027) syllabus structure

export interface SyllabusRef {
  topicId: number;
  topicTitle: string;
  subtopicCode: string;
  subtopicTitle: string;
}

export const questionTopicMap: Record<string, SyllabusRef> = {
  // =============================================
  // 0580/31 May/June 2022 (Core Paper 3)
  // =============================================
  'pp_0580_s22_q1a': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s22_q1b': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.9', subtopicTitle: 'Estimation' },
  'pp_0580_s22_q1c': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.6', subtopicTitle: 'The Four Operations' },
  'pp_0580_s22_q1d': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s22_q1e': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.3', subtopicTitle: 'Powers and Roots' },
  'pp_0580_s22_q1f': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s22_q1g': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.7', subtopicTitle: 'Indices I' },
  'pp_0580_s22_q1h': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s22_q1i': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s22_q1j': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.10', subtopicTitle: 'Limits of Accuracy' },
  'pp_0580_s22_q2a': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.1', subtopicTitle: 'Geometrical Terms' },
  'pp_0580_s22_q2b': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.1', subtopicTitle: 'Geometrical Terms' },
  'pp_0580_s22_q2c': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.6', subtopicTitle: 'Angles' },
  'pp_0580_s22_q2d': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.6', subtopicTitle: 'Angles' },
  'pp_0580_s22_q2e': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.6', subtopicTitle: 'Angles' },
  'pp_0580_s22_q3a': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.6', subtopicTitle: 'The Four Operations' },
  'pp_0580_s22_q3b': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s22_q3c': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.6', subtopicTitle: 'The Four Operations' },
  'pp_0580_s22_q3d': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.4', subtopicTitle: 'Fractions, Decimals and Percentages' },
  'pp_0580_s22_q3e': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.9', subtopicTitle: 'Estimation' },
  'pp_0580_s22_q3f': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s22_q3g': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.12', subtopicTitle: 'Rates' },
  'pp_0580_s22_q4a': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.4', subtopicTitle: 'Surface Area and Volume' },
  'pp_0580_s22_q4b': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.5', subtopicTitle: 'Compound Shapes and Parts of Shapes' },
  'pp_0580_s22_q6a': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.1', subtopicTitle: 'Introduction to Algebra' },
  'pp_0580_s22_q6b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.4', subtopicTitle: 'Equations' },
  'pp_0580_s22_q6c': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s22_q6d': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.4', subtopicTitle: 'Equations' },
  'pp_0580_s22_q8a': { topicId: 3, topicTitle: 'Coordinate Geometry', subtopicCode: '3.4', subtopicTitle: 'Equations of Linear Graphs' },
  'pp_0580_s22_q8b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s22_q8c': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s22_q8d': { topicId: 3, topicTitle: 'Coordinate Geometry', subtopicCode: '3.5', subtopicTitle: 'Parallel Lines' },
  'pp_0580_s22_q9': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },

  // =============================================
  // 0580/43 May/June 2021 (Extended Paper 4)
  // =============================================
  'pp_0580_s21_q1a1': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.11', subtopicTitle: 'Ratio and Proportion' },
  'pp_0580_s21_q1a2': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s21_q1a3': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s21_q1b': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s21_q1c': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s21_q2a': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.1', subtopicTitle: 'Introduction to Algebra' },
  'pp_0580_s21_q2b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.4', subtopicTitle: 'Equations' },
  'pp_0580_s21_q2c': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s21_q2d': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s21_q2e': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s21_q3a': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.3', subtopicTitle: 'Averages and Range' },
  'pp_0580_s21_q3b': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.4', subtopicTitle: 'Statistical Charts and Diagrams' },
  'pp_0580_s21_q3c': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.3', subtopicTitle: 'Averages and Range' },
  'pp_0580_s21_q3d': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.3', subtopicTitle: 'Averages and Range' },
  'pp_0580_s21_q4a': { topicId: 3, topicTitle: 'Coordinate Geometry', subtopicCode: '3.4', subtopicTitle: 'Equations of Linear Graphs' },
  'pp_0580_s21_q4b': { topicId: 7, topicTitle: 'Transformations and Vectors', subtopicCode: '7.1', subtopicTitle: 'Transformations' },
  'pp_0580_s21_q4c': { topicId: 7, topicTitle: 'Transformations and Vectors', subtopicCode: '7.1', subtopicTitle: 'Transformations' },
  'pp_0580_s21_q5a': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.4', subtopicTitle: 'Equations' },
  'pp_0580_s21_q5b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.4', subtopicTitle: 'Equations' },
  'pp_0580_s21_q6a': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.2', subtopicTitle: 'Sets' },
  'pp_0580_s21_q6e': { topicId: 8, topicTitle: 'Probability', subtopicCode: '8.3', subtopicTitle: 'Probability of Combined Events' },
  'pp_0580_s21_q6f': { topicId: 8, topicTitle: 'Probability', subtopicCode: '8.3', subtopicTitle: 'Probability of Combined Events' },
  'pp_0580_s21_q7a': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.5', subtopicTitle: 'Inequalities' },
  'pp_0580_s21_q7b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s21_q8a': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.4', subtopicTitle: 'Surface Area and Volume' },
  'pp_0580_s21_q8b': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.4', subtopicTitle: 'Surface Area and Volume' },
  'pp_0580_s21_q8c': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.4', subtopicTitle: 'Surface Area and Volume' },
  'pp_0580_s21_q9a': { topicId: 6, topicTitle: 'Trigonometry', subtopicCode: '6.2', subtopicTitle: 'Right-Angled Triangles' },
  'pp_0580_s21_q9b': { topicId: 6, topicTitle: 'Trigonometry', subtopicCode: '6.1', subtopicTitle: "Pythagoras' Theorem" },
  'pp_0580_s21_q10a': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s21_q10b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s21_q10c': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s21_q10d': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s21_q10e': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s21_q10f': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.8', subtopicTitle: 'Graphs of Functions' },
  'pp_0580_s21_q11a': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.6', subtopicTitle: 'Sequences' },
  'pp_0580_s21_q11b': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.6', subtopicTitle: 'Sequences' },

  // =============================================
  // 0580/11 May/June 2020 (Core Paper 1)
  // =============================================
  'pp_0580_s20_q1': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s20_q2': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.3', subtopicTitle: 'Averages and Range' },
  'pp_0580_s20_q3': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.5', subtopicTitle: 'Ordering' },
  'pp_0580_s20_q4b': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.5', subtopicTitle: 'Symmetry' },
  'pp_0580_s20_q5': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.6', subtopicTitle: 'Angles' },
  'pp_0580_s20_q6': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.15', subtopicTitle: 'Time' },
  'pp_0580_s20_q7': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.2', subtopicTitle: 'Area and Perimeter' },
  'pp_0580_s20_q8': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.1', subtopicTitle: 'Types of Number' },
  'pp_0580_s20_q9': { topicId: 7, topicTitle: 'Transformations and Vectors', subtopicCode: '7.1', subtopicTitle: 'Transformations' },
  'pp_0580_s20_q10': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.6', subtopicTitle: 'Angles' },
  'pp_0580_s20_q11': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.4', subtopicTitle: 'Surface Area and Volume' },
  'pp_0580_s20_q12': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.6', subtopicTitle: 'Sequences' },
  'pp_0580_s20_q13': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s20_q14': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.6', subtopicTitle: 'Angles' },
  'pp_0580_s20_q15': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.3', subtopicTitle: 'Indices II' },
  'pp_0580_s20_q16': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.8', subtopicTitle: 'Standard Form' },
  'pp_0580_s20_q17': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_s20_q18': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.5', subtopicTitle: 'Scatter Diagrams' },
  'pp_0580_s20_q19': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.10', subtopicTitle: 'Limits of Accuracy' },
  'pp_0580_s20_q20': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.4', subtopicTitle: 'Fractions, Decimals and Percentages' },
  'pp_0580_s20_q21': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_s20_q22': { topicId: 3, topicTitle: 'Coordinate Geometry', subtopicCode: '3.4', subtopicTitle: 'Equations of Linear Graphs' },
  'pp_0580_s20_q23': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.4', subtopicTitle: 'Similarity' },

  // =============================================
  // 0580/22 Feb/March 2022 (Extended Paper 2)
  // =============================================
  'pp_0580_fm22_q1': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.2', subtopicTitle: 'Geometrical Constructions' },
  'pp_0580_fm22_q2': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.14', subtopicTitle: 'Using a Calculator' },
  'pp_0580_fm22_q3': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.15', subtopicTitle: 'Time' },
  'pp_0580_fm22_q4': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.4', subtopicTitle: 'Surface Area and Volume' },
  'pp_0580_fm22_q5': { topicId: 3, topicTitle: 'Coordinate Geometry', subtopicCode: '3.3', subtopicTitle: 'Gradient of Linear Graphs' },
  'pp_0580_fm22_q6': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.2', subtopicTitle: 'Geometrical Constructions' },
  'pp_0580_fm22_q7': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.5', subtopicTitle: 'Inequalities' },
  'pp_0580_fm22_q8': { topicId: 7, topicTitle: 'Transformations and Vectors', subtopicCode: '7.1', subtopicTitle: 'Transformations' },
  'pp_0580_fm22_q9': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.2', subtopicTitle: 'Algebraic Manipulation' },
  'pp_0580_fm22_q10': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.6', subtopicTitle: 'Sequences' },
  'pp_0580_fm22_q11': { topicId: 9, topicTitle: 'Statistics', subtopicCode: '9.5', subtopicTitle: 'Scatter Diagrams' },
  'pp_0580_fm22_q12': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_fm22_q13': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.7', subtopicTitle: 'Indices I' },
  'pp_0580_fm22_q14': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.3', subtopicTitle: 'Circles, Arcs and Sectors' },
  'pp_0580_fm22_q15': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.4', subtopicTitle: 'Fractions, Decimals and Percentages' },
  'pp_0580_fm22_q16': { topicId: 3, topicTitle: 'Coordinate Geometry', subtopicCode: '3.4', subtopicTitle: 'Equations of Linear Graphs' },
  'pp_0580_fm22_q17': { topicId: 5, topicTitle: 'Mensuration', subtopicCode: '5.5', subtopicTitle: 'Compound Shapes and Parts of Shapes' },
  'pp_0580_fm22_q18': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.13', subtopicTitle: 'Percentages' },
  'pp_0580_fm22_q19': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.11', subtopicTitle: 'Ratio and Proportion' },
  'pp_0580_fm22_q20': { topicId: 2, topicTitle: 'Algebra and Graphs', subtopicCode: '2.4', subtopicTitle: 'Equations' },
  'pp_0580_fm22_q21': { topicId: 6, topicTitle: 'Trigonometry', subtopicCode: '6.2', subtopicTitle: 'Right-Angled Triangles' },
  'pp_0580_fm22_q22': { topicId: 7, topicTitle: 'Transformations and Vectors', subtopicCode: '7.1', subtopicTitle: 'Transformations' },
};

// Get the syllabus reference for a question
export const getQuestionSyllabusRef = (questionId: string): SyllabusRef | undefined => {
  return questionTopicMap[questionId];
};
