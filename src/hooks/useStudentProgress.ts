import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { pastPapers, pastPaperQuestions } from '@/lib/pastPaperData';
import { questionTopicMap } from '@/lib/questionTopicMap';
import type { TopicMastery, PastPaperResult, PaperScore } from '@/lib/analyticsData';

interface UseStudentProgressOptions {
  studentMode?: boolean;
}

interface ProgressRow {
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
  workspace_mode?: 'general' | 'student';
}

function calcOverall(a: number, r: number, s: number) {
  return Math.round(a * 0.4 + r * 0.3 + s * 0.3);
}

export function useStudentProgress(options: UseStudentProgressOptions = {}) {
  const { studentMode = false } = options;
  const { user } = useAuth();

  return useQuery({
    queryKey: ['student-progress', user?.id, studentMode ? 'student' : 'general'],
    queryFn: async () => {
      if (!user) return { topicMastery: [], paperResults: [], rows: [] };

      const workspaceMode = studentMode ? 'student' : 'general';

      // If studentMode, first fetch assigned paper IDs
      let assignedPaperIds: string[] | null = null;
      if (studentMode) {
        const { data: assignments } = await supabase
          .from('student_paper_assignments')
          .select('paper_id')
          .eq('student_id', user.id);
        assignedPaperIds = (assignments || []).map(a => a.paper_id);

        // No assigned papers means no student analytics rows by definition
        if (assignedPaperIds.length === 0) {
          return { topicMastery: [], paperResults: [], rows: [] };
        }
      }

      const { data, error } = await supabase
        .from('student_paper_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('workspace_mode', workspaceMode)
        .order('submitted_at', { ascending: true });

      if (error) throw error;
      let rows = (data || []) as ProgressRow[];

      // Filter to only assigned papers in student mode
      if (assignedPaperIds !== null) {
        const assignedSet = new Set(assignedPaperIds);
        rows = rows.filter(r => assignedSet.has(r.paper_id));
      }

      // ── Paper results ──
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
        // Calculate marks obtained by summing per-question marks weighted by accuracy
        const marksObtained = questions.reduce((sum, q) => {
          const qData = pastPaperQuestions[q.question_id];
          const qMarks = qData?.marks || 0;
          return sum + (Number(q.accuracy_score) / 100) * qMarks;
        }, 0);
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
          marksObtained: Math.round(marksObtained),
        });
      });

      // ── Topic mastery using questionTopicMap ──
      // Group all questions by topicId using the authoritative map
      const topicMap = new Map<number, { topic: string; papers: Map<string, ProgressRow[]> }>();

      rows.forEach(r => {
        const ref = questionTopicMap[r.question_id];
        if (!ref) return;
        const { topicId, topicTitle } = ref;
        if (!topicMap.has(topicId)) {
          topicMap.set(topicId, { topic: topicTitle, papers: new Map() });
        }
        const entry = topicMap.get(topicId)!;
        const paperRows = entry.papers.get(r.paper_id) || [];
        paperRows.push(r);
        entry.papers.set(r.paper_id, paperRows);
      });

      // Count total questions per topic across all papers (from questionTopicMap)
      const totalQuestionsPerTopic = new Map<number, number>();
      Object.values(questionTopicMap).forEach(ref => {
        totalQuestionsPerTopic.set(ref.topicId, (totalQuestionsPerTopic.get(ref.topicId) || 0) + 1);
      });

      const topicMastery: TopicMastery[] = [];
      topicMap.forEach(({ topic, papers }, topicId) => {
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

        // All questions across all papers for this topic (for averaging)
        const allQs = Array.from(papers.values()).flat();
        const avgAcc = Math.round(allQs.reduce((s, q) => s + Number(q.accuracy_score), 0) / allQs.length);
        const avgAiCount = allQs.reduce((s, q) => s + q.ai_usage_count, 0) / allQs.length;
        const avgIndependence = Math.round(Math.max(0, 100 - avgAiCount * 20));
        const avgTime = allQs.reduce((s, q) => s + q.time_spent_seconds, 0) / allQs.length;
        const avgSpeed = Math.round(Math.max(0, Math.min(100, 100 - (avgTime - 60) / 3)));

        const totalForTopic = totalQuestionsPerTopic.get(topicId) || 1;
        const completedForTopic = allQs.length;

        let trend: TopicMastery['trend'] = 'new';
        let trendDelta = 0;
        if (paperScores.length >= 2) {
          const prev = paperScores[paperScores.length - 2].overall;
          const latest = paperScores[paperScores.length - 1].overall;
          const delta = latest - prev;
          trendDelta = delta;
          trend = Math.abs(delta) <= 2 ? 'stable' : delta > 0 ? 'up' : 'down';
        }

        topicMastery.push({
          topic,
          topicId,
          latestAccuracy: avgAcc,
          latestReadiness: avgIndependence,
          latestSpeed: avgSpeed,
          overallScore: calcOverall(avgAcc, avgIndependence, avgSpeed),
          paperScores,
          trend,
          trendDelta,
          totalQuestions: totalForTopic,
          completedQuestions: completedForTopic,
        });
      });

      // Also include topics with 0 completion (from questionTopicMap but no rows)
      const allTopicIds = new Map<number, string>();
      Object.values(questionTopicMap).forEach(ref => {
        if (!allTopicIds.has(ref.topicId)) allTopicIds.set(ref.topicId, ref.topicTitle);
      });
      allTopicIds.forEach((topicTitle, topicId) => {
        if (!topicMap.has(topicId)) {
          topicMastery.push({
            topic: topicTitle,
            topicId,
            latestAccuracy: 0,
            latestReadiness: 0,
            latestSpeed: 0,
            overallScore: 0,
            paperScores: [],
            trend: 'new',
            trendDelta: 0,
            totalQuestions: totalQuestionsPerTopic.get(topicId) || 0,
            completedQuestions: 0,
          });
        }
      });

      // Sort by topicId
      topicMastery.sort((a, b) => a.topicId - b.topicId);

      return { topicMastery, paperResults, rows };
    },
    enabled: !!user,
  });
}
