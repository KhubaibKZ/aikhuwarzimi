import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { pastPapers } from '@/lib/pastPaperData';
import type { TopicMastery, PastPaperResult, PaperScore } from '@/lib/analyticsData';

interface ProgressRow {
  id: string;
  paper_id: string;
  question_id: string;
  is_correct: boolean;
  accuracy_score: number;
  speed_score: number;
  ai_usage_count: number;
  time_spent_seconds: number;
  total_steps: number;
  completed_steps: number;
  submitted_at: string;
}

// Map question IDs to syllabus topic IDs
function getTopicIdForQuestion(questionId: string): { topicId: number; topic: string } {
  if (questionId.includes('q1')) return { topicId: 1, topic: 'Number' };
  if (questionId.includes('q2')) return { topicId: 4, topic: 'Geometry' };
  if (questionId.includes('q3')) return { topicId: 1, topic: 'Number' };
  if (questionId.includes('q4')) return { topicId: 5, topic: 'Mensuration' };
  if (questionId.includes('q5')) return { topicId: 2, topic: 'Algebra & Graphs' };
  if (questionId.includes('q6')) return { topicId: 2, topic: 'Algebra & Graphs' };
  if (questionId.includes('q7')) return { topicId: 7, topic: 'Transformations & Vectors' };
  if (questionId.includes('q8')) return { topicId: 3, topic: 'Coordinate Geometry' };
  if (questionId.includes('q9')) return { topicId: 2, topic: 'Algebra & Graphs' };
  if (questionId.includes('q10')) return { topicId: 6, topic: 'Trigonometry' };
  if (questionId.includes('q11')) return { topicId: 8, topic: 'Probability' };
  if (questionId.includes('q12')) return { topicId: 9, topic: 'Statistics' };
  return { topicId: 1, topic: 'Number' };
}

function calcOverall(a: number, r: number, s: number) {
  return Math.round(a * 0.4 + r * 0.3 + s * 0.3);
}

export function useStudentProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['student-progress', user?.id],
    queryFn: async () => {
      if (!user) return { topicMastery: [], paperResults: [], rows: [] };

      const { data, error } = await supabase
        .from('student_paper_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: true });

      if (error) throw error;
      const rows = (data || []) as ProgressRow[];

      // Build paper results
      const paperGroups = new Map<string, ProgressRow[]>();
      rows.forEach(r => {
        const group = paperGroups.get(r.paper_id) || [];
        group.push(r);
        paperGroups.set(r.paper_id, group);
      });

      const paperResults: PastPaperResult[] = [];
      paperGroups.forEach((questions, paperId) => {
        const paper = pastPapers.find(p => p.id === paperId);
        if (!paper) return;
        const totalQ = paper.sections.length;
        const solvedQ = questions.length;
        const totalAccuracy = questions.reduce((s, q) => s + Number(q.accuracy_score), 0);
        const avgAccuracy = solvedQ > 0 ? Math.round(totalAccuracy / solvedQ) : 0;
        paperResults.push({
          paperId,
          paperTitle: paper.title,
          code: paper.code,
          year: paper.year,
          session: paper.session,
          totalQuestions: totalQ,
          solvedQuestions: solvedQ,
          completionPercentage: Math.round((solvedQ / totalQ) * 100),
          completedDate: questions[questions.length - 1]?.submitted_at || '',
          totalMarks: paper.totalMarks,
          marksObtained: Math.round((avgAccuracy / 100) * paper.totalMarks),
        });
      });

      // Build topic mastery from per-paper data
      const topicPaperMap = new Map<number, { topic: string; papers: Map<string, ProgressRow[]> }>();
      rows.forEach(r => {
        const { topicId, topic } = getTopicIdForQuestion(r.question_id);
        if (!topicPaperMap.has(topicId)) {
          topicPaperMap.set(topicId, { topic, papers: new Map() });
        }
        const entry = topicPaperMap.get(topicId)!;
        const paperRows = entry.papers.get(r.paper_id) || [];
        paperRows.push(r);
        entry.papers.set(r.paper_id, paperRows);
      });

      const topicMastery: TopicMastery[] = [];
      topicPaperMap.forEach(({ topic, papers }, topicId) => {
        const paperScores: PaperScore[] = [];
        papers.forEach((qs, paperId) => {
          const paper = pastPapers.find(p => p.id === paperId);
          const avgAcc = Math.round(qs.reduce((s, q) => s + Number(q.accuracy_score), 0) / qs.length);
          const avgAiCount = qs.reduce((s, q) => s + q.ai_usage_count, 0) / qs.length;
          const independence = Math.round(Math.max(0, 100 - avgAiCount * 20));
          const avgTime = qs.reduce((s, q) => s + q.time_spent_seconds, 0) / qs.length;
          const speedScore = Math.round(Math.max(0, Math.min(100, 100 - (avgTime - 60) / 3)));

          paperScores.push({
            paperId,
            paperLabel: paper ? `${paper.code} ${paper.session.substring(0, 2)}${String(paper.year).substring(2)}` : paperId,
            accuracy: avgAcc,
            readiness: independence,
            speed: speedScore,
            overall: calcOverall(avgAcc, independence, speedScore),
          });
        });

        const latest = paperScores[paperScores.length - 1];
        let trend: TopicMastery['trend'] = 'new';
        let trendDelta = 0;
        if (paperScores.length >= 2) {
          const prev = paperScores[paperScores.length - 2].overall;
          const delta = latest.overall - prev;
          trendDelta = delta;
          trend = Math.abs(delta) <= 2 ? 'stable' : delta > 0 ? 'up' : 'down';
        }

        topicMastery.push({
          topic,
          topicId,
          latestAccuracy: latest.accuracy,
          latestReadiness: latest.readiness,
          latestSpeed: latest.speed,
          overallScore: latest.overall,
          paperScores,
          trend,
          trendDelta,
        });
      });

      return { topicMastery, paperResults, rows };
    },
    enabled: !!user,
  });
}
