// Analytics data for student performance visualization
// Maps to all 9 IGCSE 0580 syllabus topics with paper-wise breakdown

export interface PaperScore {
  paperId: string;
  paperLabel: string; // e.g. "0580/43 MJ21"
  accuracy: number;
  readiness: number;
  speed: number;
  overall: number;
}

export interface TopicMastery {
  topic: string;
  topicId: number; // maps to syllabus topic id
  latestAccuracy: number;
  latestReadiness: number;
  latestSpeed: number;
  overallScore: number;
  paperScores: PaperScore[]; // chronological, per-paper breakdown
  trend: 'up' | 'down' | 'stable' | 'new'; // improvement/decline
  trendDelta: number; // percentage change between last two papers
  totalQuestions?: number; // total questions mapped to this topic across all papers
  completedQuestions?: number; // questions the student has completed
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
  completedDate: string;
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

function calcOverall(a: number, r: number, s: number) {
  return Math.round(a * 0.4 + r * 0.3 + s * 0.3);
}

function getTrend(scores: PaperScore[]): { trend: TopicMastery['trend']; delta: number } {
  if (scores.length < 2) return { trend: 'new', delta: 0 };
  const last = scores[scores.length - 1].overall;
  const prev = scores[scores.length - 2].overall;
  const delta = last - prev;
  if (Math.abs(delta) <= 2) return { trend: 'stable', delta };
  return { trend: delta > 0 ? 'up' : 'down', delta };
}

// All 9 syllabus topics with mock paper-wise progress
export const mockTopicMastery: TopicMastery[] = (() => {
  const raw: {
    topic: string; topicId: number;
    papers: { id: string; label: string; a: number; r: number; s: number }[];
  }[] = [
    {
      topic: 'Number', topicId: 1,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 82, r: 70, s: 75 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 88, r: 75, s: 82 },
      ],
    },
    {
      topic: 'Algebra & Graphs', topicId: 2,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 60, r: 55, s: 50 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 65, r: 80, s: 55 },
      ],
    },
    {
      topic: 'Coordinate Geometry', topicId: 3,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 70, r: 65, s: 60 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 72, r: 65, s: 58 },
      ],
    },
    {
      topic: 'Geometry', topicId: 4,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 68, r: 60, s: 55 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 75, r: 68, s: 62 },
      ],
    },
    {
      topic: 'Mensuration', topicId: 5,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 85, r: 80, s: 65 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 90, r: 85, s: 70 },
      ],
    },
    {
      topic: 'Trigonometry', topicId: 6,
      papers: [
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 55, r: 45, s: 50 },
      ],
    },
    {
      topic: 'Transformations & Vectors', topicId: 7,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 78, r: 72, s: 68 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 74, r: 70, s: 65 },
      ],
    },
    {
      topic: 'Probability', topicId: 8,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 80, r: 75, s: 78 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 78, r: 70, s: 75 },
      ],
    },
    {
      topic: 'Statistics', topicId: 9,
      papers: [
        { id: 'pp_0580_s22_31', label: '0580/31 MJ22', a: 40, r: 35, s: 45 },
        { id: 'pp_0580_s21_43', label: '0580/43 MJ21', a: 45, r: 40, s: 50 },
      ],
    },
  ];

  return raw.map(t => {
    const paperScores: PaperScore[] = t.papers.map(p => ({
      paperId: p.id,
      paperLabel: p.label,
      accuracy: p.a,
      readiness: p.r,
      speed: p.s,
      overall: calcOverall(p.a, p.r, p.s),
    }));
    const latest = paperScores[paperScores.length - 1];
    const { trend, delta } = getTrend(paperScores);
    return {
      topic: t.topic,
      topicId: t.topicId,
      latestAccuracy: latest.accuracy,
      latestReadiness: latest.readiness,
      latestSpeed: latest.speed,
      overallScore: latest.overall,
      paperScores,
      trend,
      trendDelta: delta,
    };
  });
})();

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
