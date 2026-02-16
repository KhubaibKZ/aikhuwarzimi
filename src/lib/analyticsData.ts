// Mock analytics data for student performance visualization
// In production, this would come from the database based on actual student interactions

export interface TopicMastery {
  topic: string;
  accuracy: number; // 0-100 percentage
  readiness: number; // 0-100 (1 - check work usage rate) * 100
  speed: number; // 0-100 score based on time-per-step
  overallScore: number; // weighted: accuracy*0.4 + readiness*0.3 + speed*0.3
}

export interface PastPaperResult {
  paperId: string;
  paperTitle: string;
  code: string;
  year: number;
  session: string;
  totalQuestions: number;
  solvedQuestions: number;
  completionPercentage: number;
  completedDate: string; // ISO string
  totalMarks: number;
  marksObtained: number;
}

export function getMasteryColor(score: number): 'green' | 'yellow' | 'red' {
  if (score > 80) return 'green';
  if (score >= 50) return 'yellow';
  return 'red';
}

export function getMasteryLabel(score: number): string {
  if (score > 80) return 'Strong';
  if (score >= 50) return 'Developing';
  return 'Needs Work';
}

// Mock data — simulates a student who has attempted the available past papers
export const mockTopicMastery: TopicMastery[] = [
  {
    topic: 'Number & Arithmetic',
    accuracy: 88,
    readiness: 75,
    speed: 82,
    overallScore: 88 * 0.4 + 75 * 0.3 + 82 * 0.3,
  },
  {
    topic: 'Geometry & Angles',
    accuracy: 72,
    readiness: 65,
    speed: 58,
    overallScore: 72 * 0.4 + 65 * 0.3 + 58 * 0.3,
  },
  {
    topic: 'Algebra',
    accuracy: 65,
    readiness: 80,
    speed: 55,
    overallScore: 65 * 0.4 + 80 * 0.3 + 55 * 0.3,
  },
  {
    topic: 'Mensuration',
    accuracy: 90,
    readiness: 85,
    speed: 70,
    overallScore: 90 * 0.4 + 85 * 0.3 + 70 * 0.3,
  },
  {
    topic: 'Graphs & Functions',
    accuracy: 45,
    readiness: 40,
    speed: 50,
    overallScore: 45 * 0.4 + 40 * 0.3 + 50 * 0.3,
  },
  {
    topic: 'Statistics & Probability',
    accuracy: 78,
    readiness: 70,
    speed: 75,
    overallScore: 78 * 0.4 + 70 * 0.3 + 75 * 0.3,
  },
];

export const mockPastPaperResults: PastPaperResult[] = [
  {
    paperId: 'pp_0580_s22_31',
    paperTitle: '0580/31 May/June 2022',
    code: '0580/31',
    year: 2022,
    session: 'May/June',
    totalQuestions: 33,
    solvedQuestions: 28,
    completionPercentage: 85,
    completedDate: '2025-12-15',
    totalMarks: 104,
    marksObtained: 78,
  },
  {
    paperId: 'pp_0580_s21_43',
    paperTitle: '0580/43 May/June 2021',
    code: '0580/43',
    year: 2021,
    session: 'May/June',
    totalQuestions: 38,
    solvedQuestions: 22,
    completionPercentage: 58,
    completedDate: '2026-01-20',
    totalMarks: 130,
    marksObtained: 64,
  },
];
