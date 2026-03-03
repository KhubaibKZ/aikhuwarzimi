import { SyllabusData } from './syllabusData';

// O Level Mathematics (Syllabus D) 4024 — 2025-2027 Official Cambridge Syllabus
export const olevelMathsSyllabus: SyllabusData = {
  courseId: 'olevel-4024',
  courseName: 'O Level Mathematics (4024)',
  topics: [
    {
      id: 1,
      title: 'Number',
      subtopics: [
        { id: 'ol-1-1', code: '1.1', title: 'Types of Number', description: 'Natural numbers, integers, primes, squares, cubes, common factors, common multiples, rational and irrational numbers, reciprocals. Express as product of prime factors. HCF and LCM.', locked: true, questionIds: [] },
        { id: 'ol-1-2', code: '1.2', title: 'Sets', description: 'Set language, notation and Venn diagrams (up to 3 sets). Union, intersection, complement, subsets, universal set, empty set.', locked: true, questionIds: [] },
        { id: 'ol-1-3', code: '1.3', title: 'Powers and Roots', description: 'Squares, square roots, cubes, cube roots, other powers and roots. Recall squares 1–15 and cubes of 1–5, 10.', locked: true, questionIds: [] },
        { id: 'ol-1-4', code: '1.4', title: 'Fractions, Decimals and Percentages', description: 'Proper/improper fractions, mixed numbers, decimals, percentages. Equivalence, conversions, recurring decimals.', locked: true, questionIds: [] },
        { id: 'ol-1-5', code: '1.5', title: 'Ordering', description: 'Order quantities by magnitude using =, ≠, >, <, ≥, ≤.', locked: true, questionIds: [] },
        { id: 'ol-1-6', code: '1.6', title: 'The Four Operations', description: 'Calculations with integers, fractions and decimals. Correct ordering of operations and brackets. Negative numbers, practical situations.', locked: true, questionIds: [] },
        { id: 'ol-1-7', code: '1.7', title: 'Indices I', description: 'Positive, zero, negative and fractional indices. Rules of indices.', locked: true, questionIds: [] },
        { id: 'ol-1-8', code: '1.8', title: 'Standard Form', description: 'A × 10ⁿ where 1 ≤ A < 10. Convert into and out of standard form. Calculate with standard form.', locked: true, questionIds: [] },
        { id: 'ol-1-9', code: '1.9', title: 'Estimation', description: 'Round to decimal places and significant figures. Estimate calculations. Round answers appropriately.', locked: true, questionIds: [] },
        { id: 'ol-1-10', code: '1.10', title: 'Limits of Accuracy', description: 'Upper and lower bounds for rounded data. Bounds of calculation results.', locked: true, questionIds: [] },
        { id: 'ol-1-11', code: '1.11', title: 'Ratio and Proportion', description: 'Simplify ratios, divide in ratio, proportional reasoning in context (recipes, maps, best value).', locked: true, questionIds: [] },
        { id: 'ol-1-12', code: '1.12', title: 'Rates', description: 'Common measures of rate (pay, exchange, flow, fuel). Pressure, density, population density. Average speed.', locked: true, questionIds: [] },
        { id: 'ol-1-13', code: '1.13', title: 'Percentages', description: 'Percentage of quantity, one quantity as percentage of another, increase/decrease, simple and compound interest, reverse percentages.', locked: true, questionIds: [] },
        { id: 'ol-1-14', code: '1.14', title: 'Using a Calculator', description: 'Use calculator efficiently, enter values appropriately, interpret display.', locked: true, questionIds: [] },
        { id: 'ol-1-15', code: '1.15', title: 'Time', description: 'Seconds, minutes, hours, days. 24-hour and 12-hour clock. Timetables, time zones.', locked: true, questionIds: [] },
        { id: 'ol-1-16', code: '1.16', title: 'Money', description: 'Calculate with money. Convert between currencies.', locked: true, questionIds: [] },
        { id: 'ol-1-17', code: '1.17', title: 'Exponential Growth and Decay', description: 'Depreciation, population change. Knowledge of e not required.', locked: true, questionIds: [] },
        { id: 'ol-1-18', code: '1.18', title: 'Surds', description: 'Simplify surds. Rationalise the denominator.', locked: true, questionIds: [] },
      ]
    },
    {
      id: 2,
      title: 'Algebra and Graphs',
      subtopics: [
        { id: 'ol-2-1', code: '2.1', title: 'Introduction to Algebra', description: 'Letters represent generalised numbers. Substitute numbers into expressions and formulas.', locked: true, questionIds: [] },
        { id: 'ol-2-2', code: '2.2', title: 'Algebraic Manipulation', description: 'Simplify, expand (including 3+ brackets), factorise (common factors, grouping, difference of squares, trinomials). Complete the square.', locked: true, questionIds: [] },
        { id: 'ol-2-3', code: '2.3', title: 'Algebraic Fractions', description: 'Add, subtract, multiply, divide algebraic fractions. Factorise and simplify rational expressions.', locked: true, questionIds: [] },
        { id: 'ol-2-4', code: '2.4', title: 'Indices II', description: 'Positive, zero, negative and fractional indices with algebraic expressions. Rules of indices.', locked: true, questionIds: [] },
        { id: 'ol-2-5', code: '2.5', title: 'Equations', description: 'Construct and solve linear equations, fractional equations, simultaneous linear equations, quadratic equations (factorisation, completing the square, formula). Change subject of formulas.', locked: true, questionIds: [] },
        { id: 'ol-2-6', code: '2.6', title: 'Inequalities', description: 'Represent/interpret on number line. Solve linear inequalities. Two-variable inequalities graphically.', locked: true, questionIds: [] },
        { id: 'ol-2-7', code: '2.7', title: 'Sequences', description: 'Continue sequences. Term-to-term rules. nth term of linear, quadratic, cubic and exponential sequences.', locked: true, questionIds: [] },
        { id: 'ol-2-8', code: '2.8', title: 'Proportion', description: 'Direct and inverse proportion in algebraic terms. Linear, square, square root, cube and cube root proportion.', locked: true, questionIds: [] },
        { id: 'ol-2-9', code: '2.9', title: 'Graphs in Practical Situations', description: 'Travel graphs, conversion graphs. Rate of change, kinematics, distance–time and speed–time graphs, acceleration/deceleration. Area under speed–time graph.', locked: true, questionIds: [] },
        { id: 'ol-2-10', code: '2.10', title: 'Graphs of Functions', description: 'Tables of values. Draw/interpret graphs of axⁿ and abˣ+c. Solve equations graphically. Exponential growth/decay graphs. Estimate gradients by drawing tangents.', locked: true, questionIds: [] },
        { id: 'ol-2-11', code: '2.11', title: 'Sketching Curves', description: 'Sketch linear, quadratic, cubic, reciprocal, exponential graphs. Turning points, roots, symmetry, asymptotes.', locked: true, questionIds: [] },
        { id: 'ol-2-12', code: '2.12', title: 'Functions', description: 'Function notation f(x), domain and range. Inverse functions f⁻¹(x). Composite functions gf(x).', locked: true, questionIds: [] },
      ]
    },
    {
      id: 3,
      title: 'Coordinate Geometry',
      subtopics: [
        { id: 'ol-3-1', code: '3.1', title: 'Coordinates', description: 'Use and interpret Cartesian coordinates in two dimensions.', locked: true, questionIds: [] },
        { id: 'ol-3-2', code: '3.2', title: 'Drawing Linear Graphs', description: 'Draw straight-line graphs for linear equations.', locked: true, questionIds: [] },
        { id: 'ol-3-3', code: '3.3', title: 'Gradient of Linear Graphs', description: 'Find gradient of a straight line. Calculate gradient from coordinates of two points.', locked: true, questionIds: [] },
        { id: 'ol-3-4', code: '3.4', title: 'Length and Midpoint', description: 'Calculate length of a line segment. Find coordinates of the midpoint.', locked: true, questionIds: [] },
        { id: 'ol-3-5', code: '3.5', title: 'Equations of Linear Graphs', description: 'Interpret and obtain equation of a straight-line graph in forms ax + by = c and y = mx + c.', locked: true, questionIds: [] },
        { id: 'ol-3-6', code: '3.6', title: 'Parallel Lines', description: 'Find gradient and equation of a line parallel to a given line.', locked: true, questionIds: [] },
        { id: 'ol-3-7', code: '3.7', title: 'Perpendicular Lines', description: 'Find gradient and equation of a line perpendicular to a given line. Perpendicular bisector.', locked: true, questionIds: [] },
      ]
    },
    {
      id: 4,
      title: 'Geometry',
      subtopics: [
        { id: 'ol-4-1', code: '4.1', title: 'Geometrical Terms', description: 'Vocabulary of triangles, quadrilaterals, polygons, circles, solids (including frustum). Points, lines, planes, parallel, perpendicular, bearings.', locked: true, questionIds: [] },
        { id: 'ol-4-2', code: '4.2', title: 'Geometrical Constructions', description: 'Measure/draw lines and angles. Construct triangles with ruler and compasses. Draw, use and interpret nets.', locked: true, questionIds: [] },
        { id: 'ol-4-3', code: '4.3', title: 'Scale Drawings', description: 'Draw and interpret scale drawings. Three-figure bearings.', locked: true, questionIds: [] },
        { id: 'ol-4-4', code: '4.4', title: 'Similarity', description: 'Calculate lengths of similar shapes. Relationships between lengths, areas and volumes of similar shapes/solids.', locked: true, questionIds: [] },
        { id: 'ol-4-5', code: '4.5', title: 'Symmetry', description: 'Line symmetry and rotational symmetry in 2D. Symmetry properties of prisms, cylinders, pyramids and cones.', locked: true, questionIds: [] },
        { id: 'ol-4-6', code: '4.6', title: 'Angles', description: 'Angles at a point, on a line, vertically opposite, in triangles/quadrilaterals. Parallel lines (corresponding, alternate, co-interior). Polygon angles.', locked: true, questionIds: [] },
        { id: 'ol-4-7', code: '4.7', title: 'Circle Theorems I', description: 'Angle in semicircle, tangent-radius, angle at centre = 2× circumference, same segment, cyclic quadrilateral, alternate segment theorem.', locked: true, questionIds: [] },
        { id: 'ol-4-8', code: '4.8', title: 'Circle Theorems II', description: 'Equal chords equidistant from centre. Perpendicular bisector of chord passes through centre. Tangents from external point equal.', locked: true, questionIds: [] },
      ]
    },
    {
      id: 5,
      title: 'Mensuration',
      subtopics: [
        { id: 'ol-5-1', code: '5.1', title: 'Units of Measure', description: 'Metric units of mass, length, area, volume, capacity. Convert between units including area and volume units.', locked: true, questionIds: [] },
        { id: 'ol-5-2', code: '5.2', title: 'Area and Perimeter', description: 'Perimeter and area of rectangle, triangle, parallelogram and trapezium.', locked: true, questionIds: [] },
        { id: 'ol-5-3', code: '5.3', title: 'Circles, Arcs and Sectors', description: 'Circumference and area of circle. Arc length and sector area as fractions. Minor and major sectors.', locked: true, questionIds: [] },
        { id: 'ol-5-4', code: '5.4', title: 'Surface Area and Volume', description: 'Surface area and volume of cuboid, prism, cylinder, sphere, pyramid, cone.', locked: true, questionIds: [] },
        { id: 'ol-5-5', code: '5.5', title: 'Compound Shapes and Parts of Shapes', description: 'Perimeters, areas, surface areas and volumes of compound shapes/solids and parts of shapes/solids (e.g. frustum).', locked: true, questionIds: [] },
      ]
    },
    {
      id: 6,
      title: 'Trigonometry',
      subtopics: [
        { id: 'ol-6-1', code: '6.1', title: "Pythagoras' Theorem", description: "Know and use Pythagoras' theorem.", locked: true, questionIds: [] },
        { id: 'ol-6-2', code: '6.2', title: 'Right-Angled Triangles', description: 'Sine, cosine, tangent ratios. Problems in 2D. Perpendicular distance. Angles of elevation and depression.', locked: true, questionIds: [] },
        { id: 'ol-6-3', code: '6.3', title: 'Non-Right-Angled Triangles', description: 'Sine rule, cosine rule (including obtuse angles and ambiguous case). Area = ½ab sin C.', locked: true, questionIds: [] },
        { id: 'ol-6-4', code: '6.4', title: "Pythagoras' Theorem and Trigonometry in 3D", description: 'Calculations in three dimensions. Angle between a line and a plane.', locked: true, questionIds: [] },
      ]
    },
    {
      id: 7,
      title: 'Transformations and Vectors',
      subtopics: [
        { id: 'ol-7-1', code: '7.1', title: 'Transformations', description: 'Reflection, rotation (multiples of 90°), enlargement (positive, fractional, negative scale factors), translation by vector.', locked: true, questionIds: [] },
        { id: 'ol-7-2', code: '7.2', title: 'Vectors in Two Dimensions', description: 'Describe translations using vectors. Add, subtract vectors. Scalar multiplication.', locked: true, questionIds: [] },
        { id: 'ol-7-3', code: '7.3', title: 'Magnitude of a Vector', description: 'Calculate magnitude as √(x² + y²).', locked: true, questionIds: [] },
        { id: 'ol-7-4', code: '7.4', title: 'Vector Geometry', description: 'Directed line segments. Position vectors. Express vectors in terms of coplanar vectors. Solve geometric problems with vectors.', locked: true, questionIds: [] },
      ]
    },
    {
      id: 8,
      title: 'Probability',
      subtopics: [
        { id: 'ol-8-1', code: '8.1', title: 'Introduction to Probability', description: 'Probability scale 0–1. Probability notation P(A), P(A′). Single event probability. P(not A) = 1 − P(A).', locked: true, questionIds: [] },
        { id: 'ol-8-2', code: '8.2', title: 'Relative and Expected Frequencies', description: 'Relative frequency as estimate of probability. Calculate expected frequencies. Fair, bias, random.', locked: true, questionIds: [] },
        { id: 'ol-8-3', code: '8.3', title: 'Probability of Combined Events', description: 'Sample space diagrams, Venn diagrams (P(A∩B), P(A∪B)), tree diagrams.', locked: true, questionIds: [] },
      ]
    },
    {
      id: 9,
      title: 'Statistics',
      subtopics: [
        { id: 'ol-9-1', code: '9.1', title: 'Classifying Statistical Data', description: 'Classify and tabulate data. Tally tables, two-way tables.', locked: true, questionIds: [] },
        { id: 'ol-9-2', code: '9.2', title: 'Interpreting Statistical Data', description: 'Read, interpret and draw inferences from tables and diagrams. Compare data sets. Restrictions on conclusions.', locked: true, questionIds: [] },
        { id: 'ol-9-3', code: '9.3', title: 'Averages and Measures of Spread', description: 'Mean, median, mode, range for individual data. Estimated mean for grouped data. Modal class.', locked: true, questionIds: [] },
        { id: 'ol-9-4', code: '9.4', title: 'Statistical Charts and Diagrams', description: 'Bar charts (composite, dual), pie charts, pictograms, frequency distributions.', locked: true, questionIds: [] },
        { id: 'ol-9-5', code: '9.5', title: 'Scatter Diagrams', description: 'Draw/interpret scatter diagrams. Positive, negative, zero correlation. Line of best fit.', locked: true, questionIds: [] },
        { id: 'ol-9-6', code: '9.6', title: 'Cumulative Frequency Diagrams', description: 'Cumulative frequency tables and curves. Median, percentiles, quartiles, interquartile range.', locked: true, questionIds: [] },
        { id: 'ol-9-7', code: '9.7', title: 'Histograms', description: 'Draw/interpret histograms. Frequency density = frequency ÷ class width.', locked: true, questionIds: [] },
      ]
    }
  ]
};
