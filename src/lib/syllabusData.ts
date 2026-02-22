// IGCSE Mathematics 0580 Syllabus Structure (2025-2027)
// Based on official Cambridge syllabus

export interface SubTopic {
  id: string;
  code: string; // e.g., "1.1", "1.2"
  title: string;
  description: string;
  locked: boolean;
  questionIds: string[]; // Links to questions in this subtopic
}

export interface MainTopic {
  id: number;
  title: string;
  subtopics: SubTopic[];
}

export interface SyllabusData {
  courseId: string;
  courseName: string;
  topics: MainTopic[];
}

// IGCSE Mathematics 0580 Extended Syllabus
export const igcseMathsSyllabus: SyllabusData = {
  courseId: 'igcse-0580',
  courseName: 'IGCSE Mathematics (0580)',
  topics: [
    {
      id: 1,
      title: 'Number',
      subtopics: [
        {
          id: '1-1',
          code: '1.1',
          title: 'Types of Number',
          description: 'Natural numbers, integers, prime numbers, square numbers, cube numbers, common factors, common multiples, rational and irrational numbers, reciprocals. Express as product of prime factors. Finding HCF and LCM.',
          locked: true,
          questionIds: ['example1', 'example2', 'example3', 'exercise1_1']
        },
        {
          id: '1-2',
          code: '1.2',
          title: 'Sets',
          description: 'Set language, notation and Venn diagrams. Union, intersection, complement, subsets, universal set.',
          locked: true,
          questionIds: ['example4']
        },
        {
          id: '1-3',
          code: '1.3',
          title: 'Powers and Roots',
          description: 'Squares, square roots, cubes, cube roots, other powers and roots of numbers.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-4',
          code: '1.4',
          title: 'Fractions, Decimals and Percentages',
          description: 'Proper fractions, improper fractions, mixed numbers, decimals, percentages. Recognise equivalence and convert between forms.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-5',
          code: '1.5',
          title: 'Ordering',
          description: 'Order quantities by magnitude using symbols =, ≠, >, <, ≥ and ≤.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-6',
          code: '1.6',
          title: 'The Four Operations',
          description: 'Calculations with integers, fractions and decimals, including correct ordering of operations and use of brackets.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-7',
          code: '1.7',
          title: 'Indices I',
          description: 'Understand and use indices (positive, zero and negative integers). Rules of indices.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-8',
          code: '1.8',
          title: 'Standard Form',
          description: 'Use standard form A × 10ⁿ. Convert numbers into and out of standard form. Calculate with values in standard form.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-9',
          code: '1.9',
          title: 'Estimation',
          description: 'Round values to decimal places and significant figures. Make estimates for calculations.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-10',
          code: '1.10',
          title: 'Limits of Accuracy',
          description: 'Give upper and lower bounds for data rounded to a specified accuracy.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-11',
          code: '1.11',
          title: 'Ratio and Proportion',
          description: 'Simplify ratios, divide quantities in given ratio, use proportional reasoning.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-12',
          code: '1.12',
          title: 'Rates',
          description: 'Common measures of rate (pay, exchange rates, speed). Solve problems involving average speed.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-13',
          code: '1.13',
          title: 'Percentages',
          description: 'Percentage of quantity, percentage increase/decrease, simple and compound interest.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-14',
          code: '1.14',
          title: 'Using a Calculator',
          description: 'Use a calculator efficiently, enter values appropriately, interpret display.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-15',
          code: '1.15',
          title: 'Time',
          description: 'Calculate with time units. 24-hour and 12-hour clock. Time zones.',
          locked: true,
          questionIds: []
        },
        {
          id: '1-16',
          code: '1.16',
          title: 'Money',
          description: 'Calculate with money. Convert between currencies.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 2,
      title: 'Algebra and Graphs',
      subtopics: [
        {
          id: '2-1',
          code: '2.1',
          title: 'Introduction to Algebra',
          description: 'Letters represent generalised numbers. Substitute numbers into expressions and formulas.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-2',
          code: '2.2',
          title: 'Algebraic Manipulation',
          description: 'Simplify expressions, expand products, factorise by extracting common factors.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-3',
          code: '2.3',
          title: 'Indices II',
          description: 'Rules of indices with algebraic expressions. Fractional indices.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-4',
          code: '2.4',
          title: 'Equations',
          description: 'Construct and solve linear equations. Simultaneous equations. Change subject of formulas.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-5',
          code: '2.5',
          title: 'Inequalities',
          description: 'Represent and interpret inequalities, including on a number line.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-6',
          code: '2.6',
          title: 'Sequences',
          description: 'Continue sequences, find nth term of linear, quadratic and cubic sequences.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-7',
          code: '2.7',
          title: 'Graphs in Practical Situations',
          description: 'Travel graphs, conversion graphs. Interpret gradient as rate of change.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-8',
          code: '2.8',
          title: 'Graphs of Functions',
          description: 'Draw and interpret graphs of linear, quadratic, reciprocal functions. Solve equations graphically.',
          locked: true,
          questionIds: []
        },
        {
          id: '2-9',
          code: '2.9',
          title: 'Sketching Curves',
          description: 'Recognise, sketch and interpret graphs of linear and quadratic functions.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 3,
      title: 'Coordinate Geometry',
      subtopics: [
        {
          id: '3-1',
          code: '3.1',
          title: 'Coordinates',
          description: 'Use and interpret Cartesian coordinates in two dimensions.',
          locked: true,
          questionIds: []
        },
        {
          id: '3-2',
          code: '3.2',
          title: 'Drawing Linear Graphs',
          description: 'Draw straight-line graphs for linear equations in form y = mx + c.',
          locked: true,
          questionIds: []
        },
        {
          id: '3-3',
          code: '3.3',
          title: 'Gradient of Linear Graphs',
          description: 'Find the gradient of a straight line.',
          locked: true,
          questionIds: []
        },
        {
          id: '3-4',
          code: '3.4',
          title: 'Equations of Linear Graphs',
          description: 'Interpret and obtain the equation of a straight-line graph in form y = mx + c.',
          locked: true,
          questionIds: []
        },
        {
          id: '3-5',
          code: '3.5',
          title: 'Parallel Lines',
          description: 'Find gradient and equation of a line parallel to a given line.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 4,
      title: 'Geometry',
      subtopics: [
        {
          id: '4-1',
          code: '4.1',
          title: 'Geometrical Terms',
          description: 'Vocabulary of triangles, quadrilaterals, polygons, solids and circles.',
          locked: true,
          questionIds: []
        },
        {
          id: '4-2',
          code: '4.2',
          title: 'Geometrical Constructions',
          description: 'Measure and draw lines and angles. Construct triangles. Draw and use nets.',
          locked: true,
          questionIds: []
        },
        {
          id: '4-3',
          code: '4.3',
          title: 'Scale Drawings',
          description: 'Draw and interpret scale drawings. Three-figure bearings.',
          locked: true,
          questionIds: []
        },
        {
          id: '4-4',
          code: '4.4',
          title: 'Similarity',
          description: 'Calculate lengths of similar shapes.',
          locked: true,
          questionIds: []
        },
        {
          id: '4-5',
          code: '4.5',
          title: 'Symmetry',
          description: 'Recognise line symmetry and rotational symmetry in two dimensions.',
          locked: true,
          questionIds: []
        },
        {
          id: '4-6',
          code: '4.6',
          title: 'Angles',
          description: 'Angles at a point, on a line, in triangles and quadrilaterals. Parallel line angles. Polygon angles.',
          locked: true,
          questionIds: []
        },
        {
          id: '4-7',
          code: '4.7',
          title: 'Circle Theorems',
          description: 'Angle in semicircle, angle between tangent and radius.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 5,
      title: 'Mensuration',
      subtopics: [
        {
          id: '5-1',
          code: '5.1',
          title: 'Units of Measure',
          description: 'Metric units of mass, length, area, volume and capacity. Convert between units.',
          locked: true,
          questionIds: []
        },
        {
          id: '5-2',
          code: '5.2',
          title: 'Area and Perimeter',
          description: 'Perimeter and area of rectangle, triangle, parallelogram and trapezium.',
          locked: true,
          questionIds: []
        },
        {
          id: '5-3',
          code: '5.3',
          title: 'Circles, Arcs and Sectors',
          description: 'Circumference and area of circle. Arc length and sector area.',
          locked: true,
          questionIds: []
        },
        {
          id: '5-4',
          code: '5.4',
          title: 'Surface Area and Volume',
          description: 'Surface area and volume of cuboid, prism, cylinder, sphere, pyramid, cone.',
          locked: true,
          questionIds: []
        },
        {
          id: '5-5',
          code: '5.5',
          title: 'Compound Shapes and Parts of Shapes',
          description: 'Perimeters, areas, surface areas and volumes of compound and partial shapes.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 6,
      title: 'Trigonometry',
      subtopics: [
        {
          id: '6-1',
          code: '6.1',
          title: "Pythagoras' Theorem",
          description: "Know and use Pythagoras' theorem.",
          locked: true,
          questionIds: []
        },
        {
          id: '6-2',
          code: '6.2',
          title: 'Right-Angled Triangles',
          description: 'Sine, cosine and tangent ratios. Solve problems using trigonometry.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 7,
      title: 'Transformations and Vectors',
      subtopics: [
        {
          id: '7-1',
          code: '7.1',
          title: 'Transformations',
          description: 'Reflection, rotation, enlargement and translation.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 8,
      title: 'Probability',
      subtopics: [
        {
          id: '8-1',
          code: '8.1',
          title: 'Introduction to Probability',
          description: 'Probability scale 0 to 1. Calculate probability of single event.',
          locked: true,
          questionIds: []
        },
        {
          id: '8-2',
          code: '8.2',
          title: 'Relative and Expected Frequencies',
          description: 'Relative frequency as estimate of probability. Calculate expected frequencies.',
          locked: true,
          questionIds: []
        },
        {
          id: '8-3',
          code: '8.3',
          title: 'Probability of Combined Events',
          description: 'Sample space diagrams, Venn diagrams, tree diagrams.',
          locked: true,
          questionIds: []
        }
      ]
    },
    {
      id: 9,
      title: 'Statistics',
      subtopics: [
        {
          id: '9-1',
          code: '9.1',
          title: 'Classifying Statistical Data',
          description: 'Classify and tabulate statistical data. Tally tables, two-way tables.',
          locked: true,
          questionIds: []
        },
        {
          id: '9-2',
          code: '9.2',
          title: 'Interpreting Statistical Data',
          description: 'Read, interpret and draw inferences from tables and statistical diagrams.',
          locked: true,
          questionIds: []
        },
        {
          id: '9-3',
          code: '9.3',
          title: 'Averages and Range',
          description: 'Calculate mean, median, mode and range.',
          locked: true,
          questionIds: []
        },
        {
          id: '9-4',
          code: '9.4',
          title: 'Statistical Charts and Diagrams',
          description: 'Bar charts, pie charts, pictograms, stem-and-leaf diagrams, frequency distributions.',
          locked: true,
          questionIds: []
        },
        {
          id: '9-5',
          code: '9.5',
          title: 'Scatter Diagrams',
          description: 'Draw and interpret scatter diagrams. Correlation. Line of best fit.',
          locked: true,
          questionIds: []
        }
      ]
    }
  ]
};

// Helper function to get a subtopic by ID
export const getSubTopic = (topicId: number, subtopicId: string): SubTopic | undefined => {
  const topic = igcseMathsSyllabus.topics.find(t => t.id === topicId);
  return topic?.subtopics.find(s => s.id === subtopicId);
};

// Helper function to get all questions for a subtopic
export const getSubTopicQuestions = (subtopicId: string): string[] => {
  for (const topic of igcseMathsSyllabus.topics) {
    const subtopic = topic.subtopics.find(s => s.id === subtopicId);
    if (subtopic) {
      return subtopic.questionIds;
    }
  }
  return [];
};
