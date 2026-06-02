// Demo analytics data for the public /analytics page
// Shows realistic mock data for 10 papers across 4 years (2021-2024)

import type { PastPaperResult, TopicMastery, PaperScore } from './analyticsData';
import { independenceFromUsage } from './aiDependenceIndex';
import { olevelMathsSyllabus } from './olevelSyllabusData';

// ── Demo Progress Rows (simulating student_paper_progress rows) ──

export interface DemoRow {
  id: string;
  paper_id: string;
  question_id: string;
  is_correct: boolean;
  accuracy_score: number;
  speed_score: number;
  ai_usage_count: number;
  checkwork_count: number;
  time_spent_seconds: number;
  total_steps: number;
  completed_steps: number;
  submitted_at: string;
  marks_obtained: number; // whole number marks (marking scheme style)
  marks_available: number; // total marks for this question
}

const demoPapers = [
  { id: 'demo_4024_11_2021', code: '4024/11', year: 2021, session: 'May/June', title: '4024/11 May/June 2021', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_12_2021', code: '4024/12', year: 2021, session: 'Oct/Nov', title: '4024/12 Oct/Nov 2021', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_11_2022', code: '4024/11', year: 2022, session: 'May/June', title: '4024/11 May/June 2022', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_12_2022', code: '4024/12', year: 2022, session: 'Oct/Nov', title: '4024/12 Oct/Nov 2022', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_21_2022', code: '4024/21', year: 2022, session: 'May/June', title: '4024/21 May/June 2022', totalMarks: 100, totalQuestions: 11 },
  { id: 'demo_4024_11_2023', code: '4024/11', year: 2023, session: 'May/June', title: '4024/11 May/June 2023', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_12_2023', code: '4024/12', year: 2023, session: 'Oct/Nov', title: '4024/12 Oct/Nov 2023', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_21_2023', code: '4024/21', year: 2023, session: 'Oct/Nov', title: '4024/21 Oct/Nov 2023', totalMarks: 100, totalQuestions: 11 },
  { id: 'demo_4024_11_2024', code: '4024/11', year: 2024, session: 'May/June', title: '4024/11 May/June 2024', totalMarks: 80, totalQuestions: 25 },
  { id: 'demo_4024_12_2024', code: '4024/12', year: 2024, session: 'Oct/Nov', title: '4024/12 Oct/Nov 2024', totalMarks: 80, totalQuestions: 25 },
];

// 9 topics matching O Level 4024 syllabus
const topics = [
  { id: 1, name: 'Number' },
  { id: 2, name: 'Algebra & Graphs' },
  { id: 3, name: 'Coordinate Geometry' },
  { id: 4, name: 'Geometry' },
  { id: 5, name: 'Mensuration' },
  { id: 6, name: 'Trigonometry' },
  { id: 7, name: 'Transformations & Vectors' },
  { id: 8, name: 'Probability' },
  { id: 9, name: 'Statistics' },
];

// Realistic mark distributions per question (Paper 1: 1-4 marks, Paper 2: 4-10 marks)
function getQuestionMarks(paper: typeof demoPapers[0], qIndex: number, rng: () => number): number {
  if (paper.code.startsWith('4024/2')) {
    // Paper 2: larger questions, 4-10 marks each
    return Math.round(4 + rng() * 6);
  }
  // Paper 1: 1-4 marks per question
  const options = [1, 2, 2, 3, 3, 3, 4, 4];
  return options[Math.floor(rng() * options.length)];
}

// Seed-based pseudo-random for consistency
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateDemoRows(): DemoRow[] {
  const rows: DemoRow[] = [];
  const rng = seededRandom(42);
  let qIndex = 0;

  for (const paper of demoPapers) {
    const qCount = paper.totalQuestions;
    // Not all questions solved — vary completion
    const solved = Math.round(qCount * (0.6 + rng() * 0.35));
    for (let q = 0; q < solved; q++) {
      const questionId = `demo_${paper.id}_q${q + 1}`;
      const marksAvailable = getQuestionMarks(paper, q, rng);
      
      // Marks obtained: whole number from 0 to marksAvailable (weighted toward partial/full)
      const roll = rng();
      let marksObtained: number;
      if (roll < 0.15) marksObtained = 0; // 15% chance of 0
      else if (roll < 0.35) marksObtained = Math.max(1, Math.floor(marksAvailable * 0.3 + rng() * marksAvailable * 0.2)); // partial low
      else if (roll < 0.65) marksObtained = Math.round(marksAvailable * 0.5 + rng() * marksAvailable * 0.3); // partial mid
      else marksObtained = Math.min(marksAvailable, Math.round(marksAvailable * 0.8 + rng() * marksAvailable * 0.2)); // high/full
      marksObtained = Math.min(marksObtained, marksAvailable);
      
      const accuracyScore = marksAvailable > 0 ? Math.round((marksObtained / marksAvailable) * 100) : 0;
      
      const hintCount = rng() < 0.2 ? Math.round(1 + rng() * 2) : 0; // 20% chance, 1-3 hints
      const checkworkCount = rng() < 0.25 ? Math.round(1 + rng() * 2) : 0; // 25% chance, 1-3
      const time = Math.round(30 + rng() * 280);
      
      rows.push({
        id: `demo_row_${qIndex++}`,
        paper_id: paper.id,
        question_id: questionId,
        is_correct: marksObtained === marksAvailable,
        accuracy_score: accuracyScore,
        speed_score: Math.round(Math.max(0, Math.min(100, 100 - (time - 60) / 3))),
        ai_usage_count: hintCount,
        checkwork_count: checkworkCount,
        time_spent_seconds: time,
        total_steps: Math.round(2 + rng() * 4),
        completed_steps: Math.round(2 + rng() * 3),
        submitted_at: `${paper.year}-${paper.session.includes('May') ? '06' : '11'}-${String(10 + Math.round(rng() * 15)).padStart(2, '0')}`,
        marks_obtained: marksObtained,
        marks_available: marksAvailable,
      });
    }
  }
  return rows;
}

// Pick a subtopic for a given topic + question index, deterministically
function pickSubtopic(topicId: number, qNum: number): { code: string; title: string } {
  const t = olevelMathsSyllabus.topics.find(tp => tp.id === topicId);
  if (!t || t.subtopics.length === 0) return { code: '', title: '' };
  const sub = t.subtopics[(qNum - 1) % t.subtopics.length];
  return { code: sub.code, title: sub.title };
}

// Build a topic map for demo questions
function buildDemoTopicMap(rows: DemoRow[]) {
  const map: Record<string, { topicId: number; topicTitle: string; subtopicCode: string; subtopicTitle: string }> = {};
  for (const r of rows) {
    const match = r.question_id.match(/_q(\d+)$/);
    const qNum = match ? parseInt(match[1]) : 1;
    const topic = topics[(qNum - 1) % 9];
    const sub = pickSubtopic(topic.id, qNum);
    map[r.question_id] = { topicId: topic.id, topicTitle: topic.name, subtopicCode: sub.code, subtopicTitle: sub.title };
  }
  return map;
}


// Pre-generate
const demoRows = generateDemoRows();
const demoTopicMap = buildDemoTopicMap(demoRows);

// ── Paper Results ──
export const demoPaperResults: PastPaperResult[] = (() => {
  const paperGroups = new Map<string, DemoRow[]>();
  demoRows.forEach(r => {
    const g = paperGroups.get(r.paper_id) || [];
    g.push(r);
    paperGroups.set(r.paper_id, g);
  });

  const results: PastPaperResult[] = [];
  paperGroups.forEach((questions, paperId) => {
    const paper = demoPapers.find(p => p.id === paperId)!;
    const solvedQ = questions.length;
    const marksObtained = questions.reduce((s, q) => s + q.marks_obtained, 0);
    const totalMarksAnswered = questions.reduce((s, q) => s + q.marks_available, 0);
    results.push({
      paperId,
      paperTitle: paper.title,
      code: paper.code,
      year: paper.year,
      session: paper.session,
      totalQuestions: paper.totalQuestions,
      solvedQuestions: solvedQ,
      completionPercentage: Math.round((solvedQ / paper.totalQuestions) * 100),
      completedDate: questions[questions.length - 1]?.submitted_at || '',
      totalMarks: paper.totalMarks,
      marksObtained,
    });
  });
  return results;
})();

// ── Topic Mastery ──
function calcOverall(a: number, r: number, s: number) {
  return Math.round(a * 0.4 + r * 0.3 + s * 0.3);
}

export const demoTopicMastery: TopicMastery[] = (() => {
  const topicData = new Map<number, { topic: string; papers: Map<string, DemoRow[]> }>();

  demoRows.forEach(r => {
    const ref = demoTopicMap[r.question_id];
    if (!ref) return;
    if (!topicData.has(ref.topicId)) topicData.set(ref.topicId, { topic: ref.topicTitle, papers: new Map() });
    const entry = topicData.get(ref.topicId)!;
    const pRows = entry.papers.get(r.paper_id) || [];
    pRows.push(r);
    entry.papers.set(r.paper_id, pRows);
  });

  const totalPerTopic = new Map<number, number>();
  Object.values(demoTopicMap).forEach(ref => {
    totalPerTopic.set(ref.topicId, (totalPerTopic.get(ref.topicId) || 0) + 1);
  });

  const mastery: TopicMastery[] = [];
  topicData.forEach(({ topic, papers }, topicId) => {
    const paperScores: PaperScore[] = [];
    papers.forEach((qs, paperId) => {
      const paper = demoPapers.find(p => p.id === paperId);
      // Use actual marks for accuracy
      const totalMarks = qs.reduce((s, q) => s + q.marks_available, 0);
      const marksObt = qs.reduce((s, q) => s + q.marks_obtained, 0);
      const avgAcc = totalMarks > 0 ? Math.round((marksObt / totalMarks) * 100) : 0;
      
      const totalHints = qs.reduce((s, q) => s + q.ai_usage_count, 0);
      const totalCheckwork = qs.reduce((s, q) => s + q.checkwork_count, 0);
      const independence = independenceFromUsage(totalHints, totalCheckwork, qs.length);
      const avgTime = qs.reduce((s, q) => s + q.time_spent_seconds, 0) / qs.length;
      const speed = Math.round(Math.max(0, Math.min(100, 100 - (avgTime - 60) / 3)));
      paperScores.push({
        paperId,
        paperLabel: paper ? `${paper.code} ${paper.session.substring(0, 2)}${String(paper.year).substring(2)}` : paperId,
        accuracy: avgAcc,
        readiness: independence,
        speed,
        overall: calcOverall(avgAcc, independence, speed),
      });
    });

    const allQs = Array.from(papers.values()).flat();
    const totalMarks = allQs.reduce((s, q) => s + q.marks_available, 0);
    const marksObt = allQs.reduce((s, q) => s + q.marks_obtained, 0);
    const avgAcc = totalMarks > 0 ? Math.round((marksObt / totalMarks) * 100) : 0;
    
    const totalHintsAll = allQs.reduce((s, q) => s + q.ai_usage_count, 0);
    const totalCheckworkAll = allQs.reduce((s, q) => s + q.checkwork_count, 0);
    const avgInd = independenceFromUsage(totalHintsAll, totalCheckworkAll, allQs.length);
    const avgTime = allQs.reduce((s, q) => s + q.time_spent_seconds, 0) / allQs.length;
    const avgSpeed = Math.round(Math.max(0, Math.min(100, 100 - (avgTime - 60) / 3)));

    let trend: TopicMastery['trend'] = 'new';
    let trendDelta = 0;
    if (paperScores.length >= 2) {
      const delta = paperScores[paperScores.length - 1].overall - paperScores[paperScores.length - 2].overall;
      trendDelta = delta;
      trend = Math.abs(delta) <= 2 ? 'stable' : delta > 0 ? 'up' : 'down';
    }

    mastery.push({
      topic,
      topicId,
      latestAccuracy: avgAcc,
      latestReadiness: avgInd,
      latestSpeed: avgSpeed,
      overallScore: calcOverall(avgAcc, avgInd, avgSpeed),
      paperScores,
      trend,
      trendDelta,
      totalQuestions: totalPerTopic.get(topicId) || 0,
      completedQuestions: allQs.length,
    });
  });

  topics.forEach(t => {
    if (!topicData.has(t.id)) {
      mastery.push({
        topic: t.name, topicId: t.id,
        latestAccuracy: 0, latestReadiness: 0, latestSpeed: 0, overallScore: 0,
        paperScores: [], trend: 'new', trendDelta: 0,
        totalQuestions: totalPerTopic.get(t.id) || 0, completedQuestions: 0,
      });
    }
  });

  mastery.sort((a, b) => a.topicId - b.topicId);
  return mastery;
})();

// Build FULL topic map (all questions including unsolved) for correct progress denominator
function buildFullDemoTopicMap() {
  const map: Record<string, { topicId: number; topicTitle: string; subtopicCode: string; subtopicTitle: string; paperId: string }> = {};
  for (const paper of demoPapers) {
    for (let q = 0; q < paper.totalQuestions; q++) {
      const topic = topics[q % 9];
      const questionId = `demo_${paper.id}_q${q + 1}`;
      const sub = pickSubtopic(topic.id, q + 1);
      map[questionId] = { topicId: topic.id, topicTitle: topic.name, subtopicCode: sub.code, subtopicTitle: sub.title, paperId: paper.id };
    }
  }
  return map;
}

// Export rows for question breakdown
export const demoRows_ = demoRows;
export const demoPapers_ = demoPapers;
export const demoTopicMap_ = demoTopicMap;
export const demoFullTopicMap_ = buildFullDemoTopicMap();
