import { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import iconProgress from '@/assets/icon-progress.png';
import iconMarks from '@/assets/icon-marks.png';
import iconBrain from '@/assets/icon-brain.png';
import iconTimer from '@/assets/icon-timer.png';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronDown, ChevronUp, ArrowLeft, TrendingUp, TrendingDown,
  Minus, Target, Zap, Brain, FileText, Sparkles, BarChart3, BookOpen, Lock, Clock,
  ClipboardList, Award
} from 'lucide-react';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import { pastPapers, pastPaperQuestions } from '@/lib/pastPaperData';
import { questionTopicMap } from '@/lib/questionTopicMap';
import {
  getMasteryColor, getMasteryLabel,
  type TopicMastery
} from '@/lib/analyticsData';
import { PaperFilter } from '@/components/PaperFilter';
import { demoPaperResults, demoTopicMastery, demoRows_, demoPapers_, demoTopicMap_, demoFullTopicMap_ } from '@/lib/demoAnalyticsData';

const masteryColorMap = {
  green: 'hsl(142, 76%, 36%)',
  yellow: 'hsl(38, 92%, 50%)',
  red: 'hsl(0, 62%, 50%)',
};

const masteryBgMap = {
  green: 'bg-success/20 text-success',
  yellow: 'bg-warning/20 text-warning',
  red: 'bg-destructive/20 text-destructive',
};

// ─── Circular Gauge ───
function MasteryGauge({ percentage, size = 160, strokeWidth = 10 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = getMasteryColor(percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={masteryColorMap[color]} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{percentage}%</span>
        <span className="text-xs text-muted-foreground mt-0.5">{getMasteryLabel(percentage)}</span>
      </div>
    </div>
  );
}

function SmallCircle({ percentage, size = 70, strokeWidth = 5 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = getMasteryColor(percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={masteryColorMap[color]} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

// ─── Trend Icon ───
function TrendIndicator({ trend, delta }: { trend: TopicMastery['trend']; delta: number }) {
  if (trend === 'new') return <span className="text-[10px] text-muted-foreground italic">NEW</span>;
  if (trend === 'stable') return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  if (trend === 'up') return (
    <span className="flex items-center gap-0.5 text-success text-xs font-semibold">
      <TrendingUp className="h-3.5 w-3.5" />+{delta}
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-destructive text-xs font-semibold">
      <TrendingDown className="h-3.5 w-3.5" />{delta}
    </span>
  );
}

// Helper to format seconds
function formatTimeSec(secs: number): string {
  if (secs < 60) return `${Math.round(secs)}s`;
  const m = Math.floor(secs / 60);
  const s2 = Math.round(secs % 60);
  if (m < 60) return `${m}m ${s2}s`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h ${rm}m`;
}

// ─── Topic Row with per-topic stats + question breakdown ───
interface TopicRowProps {
  topic: TopicMastery;
  index: number;
  rows: any[];
  demoMode?: boolean;
}

function TopicRow({ topic, index, rows, demoMode = false }: TopicRowProps) {
  const [expanded, setExpanded] = useState(false);
  const hasData = (topic.completedQuestions || 0) > 0;

  const activeTopicMap = demoMode ? demoTopicMap_ : questionTopicMap;
  const activePapers = demoMode ? demoPapers_ : pastPapers;

  // Get all question IDs for this topic
  const topicQuestionIds = useMemo(() => {
    const ids = new Set<string>();
    Object.entries(activeTopicMap).forEach(([qId, ref]) => {
      if (ref.topicId === topic.topicId) ids.add(qId);
    });
    return ids;
  }, [topic.topicId, activeTopicMap]);

  // Filter rows to only this topic's questions
  const topicRows = useMemo(() =>
    rows.filter((r: any) => topicQuestionIds.has(r.question_id)),
    [rows, topicQuestionIds]
  );

  // Count total questions for this topic only from selected papers
  const totalQsInTopic = useMemo(() => {
    const paperIdsInScope = new Set(rows.map((r: any) => r.paper_id));
    let count = 0;
    if (demoMode) {
      // Use full topic map (includes unsolved questions) for correct denominator
      Object.entries(demoFullTopicMap_).forEach(([, ref]) => {
        if (ref.topicId === topic.topicId && paperIdsInScope.has(ref.paperId)) {
          count++;
        }
      });
    } else {
      for (const paper of pastPapers) {
        if (!paperIdsInScope.has(paper.id)) continue;
        for (const s of paper.sections) {
          const ref = questionTopicMap[s.questionId];
          if (ref && ref.topicId === topic.topicId) count++;
        }
      }
    }
    return count || 1;
  }, [rows, topic.topicId, demoMode]);
  const completedQs = topicRows.length;
  const progressPct = totalQsInTopic > 0 ? Math.round((completedQs / totalQsInTopic) * 100) : 0;

  const { marksObtained, totalMarks } = useMemo(() => {
    let mo = 0, tm = 0;
    topicRows.forEach((r: any) => {
      if (demoMode) {
        // Demo rows have marks_obtained and marks_available directly
        tm += r.marks_available || 0;
        mo += r.marks_obtained || 0;
      } else {
        const qData = pastPaperQuestions[r.question_id];
        const qMarks = qData?.marks || 0;
        tm += qMarks;
        mo += (Number(r.accuracy_score) / 100) * qMarks;
      }
    });
    return { marksObtained: Math.round(mo), totalMarks: tm };
  }, [topicRows, demoMode]);
  const accuracyPct = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;

  const totalHints = topicRows.reduce((s: number, r: any) => s + (r.ai_usage_count || 0), 0);
  const totalCheckWork = topicRows.reduce((s: number, r: any) => s + (r.checkwork_count || 0), 0);
  const totalAiActions = totalHints + totalCheckWork;
  const aiIndependence = Math.max(0, Math.round((100 - totalAiActions * 0.1) * 10) / 10);

  const totalTime = topicRows.reduce((s: number, r: any) => s + (r.time_spent_seconds || 0), 0);
  const avgTime = completedQs > 0 ? totalTime / completedQs : 0;

  const questionBreakdown = useMemo(() => {
    return topicRows.map((r: any) => {
      let qMarks: number, obtMarks: number;
      if (demoMode) {
        qMarks = r.marks_available || 3;
        obtMarks = r.marks_obtained || 0;
      } else {
        qMarks = pastPaperQuestions[r.question_id]?.marks || 0;
        obtMarks = Math.round((Number(r.accuracy_score) / 100) * qMarks);
      }
      const paper = demoMode
        ? demoPapers_.find(p => p.id === r.paper_id)
        : pastPapers.find(p => p.id === r.paper_id);
      const qNo = demoMode
        ? r.question_id.replace(/^demo_.*_q/, 'Q')
        : (pastPaperQuestions[r.question_id]?.questionNumber || r.question_id);
      const ref: any = activeTopicMap[r.question_id];
      const subtopicCode = ref?.subtopicCode || '';
      const subtopicTitle = ref?.subtopicTitle || 'Other';
      return {
        paper: paper ? `${paper.code} ${paper.session.substring(0, 2)}${String(paper.year).substring(2)}` : r.paper_id,
        questionNo: qNo,
        marks: `${obtMarks}/${qMarks}`,
        hintUsed: r.ai_usage_count > 0 ? 'Yes' : 'No',
        checkWorkUsed: r.checkwork_count || 0,
        timeTaken: formatTimeSec(r.time_spent_seconds || 0),
        subtopicCode,
        subtopicTitle,
      };
    });
  }, [topicRows, demoMode, activeTopicMap]);

  // Group breakdown rows by subtopic (preserve first-seen order)
  const subtopicGroups = useMemo(() => {
    const groups = new Map<string, { code: string; title: string; items: typeof questionBreakdown }>();
    questionBreakdown.forEach(q => {
      const key = q.subtopicCode || q.subtopicTitle;
      if (!groups.has(key)) groups.set(key, { code: q.subtopicCode, title: q.subtopicTitle, items: [] });
      groups.get(key)!.items.push(q);
    });
    // sort by subtopic code numerically when possible
    return Array.from(groups.values()).sort((a, b) => {
      const an = parseFloat(a.code) || 999;
      const bn = parseFloat(b.code) || 999;
      return an - bn;
    });
  }, [questionBreakdown]);


  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => hasData && setExpanded(!expanded)}
        className={`w-full flex items-center gap-3 p-3.5 transition-colors ${hasData ? 'hover:bg-secondary/30 cursor-pointer' : 'cursor-default'}`}
      >
        <span className="text-sm font-semibold text-foreground min-w-[100px] text-left truncate">{topic.topic}</span>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 max-w-[220px]">
            <Progress value={progressPct} className="h-2" />
          </div>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            {completedQs}/{totalQsInTopic} Qs
          </span>
        </div>
        {hasData ? (
          <>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${masteryBgMap[getMasteryColor(progressPct)]}`}>
              {progressPct}%
            </span>
            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
          </>
        ) : (
          <span className="text-[10px] text-muted-foreground italic">Not started</span>
        )}
      </button>

      {expanded && hasData && (
        <div className="border-t border-border bg-secondary/10 animate-fade-in">
          {/* Per-topic summary stats */}
          <div className="px-4 py-3 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/50 p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Accuracy</p>
              <p className={`text-lg font-bold ${accuracyPct > 80 ? 'text-success' : accuracyPct >= 50 ? 'text-warning' : 'text-destructive'}`}>{accuracyPct}%</p>
              <p className="text-[10px] text-muted-foreground">{marksObtained}/{totalMarks} marks</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">AI Independence</p>
              <p className={`text-lg font-bold ${aiIndependence > 80 ? 'text-success' : aiIndependence >= 50 ? 'text-warning' : 'text-destructive'}`}>{aiIndependence}%</p>
              <p className="text-[10px] text-muted-foreground">{totalHints} hints · {totalCheckWork} checkwork</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg Time</p>
              <p className="text-lg font-bold text-foreground">{formatTimeSec(avgTime)}</p>
              <p className="text-[10px] text-muted-foreground">per question</p>
            </div>
          </div>

          {/* Question-wise breakdown table */}
          <div className="overflow-x-auto border-t border-border/30">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border/50">
                  <th className="text-left py-2 px-4 font-medium">Paper</th>
                  <th className="text-left py-2 px-2 font-medium">Question No</th>
                  <th className="text-center py-2 px-2 font-medium">Marks</th>
                  <th className="text-center py-2 px-2 font-medium">Hint Used</th>
                  <th className="text-center py-2 px-2 font-medium">Check Work</th>
                  <th className="text-center py-2 px-2 font-medium">Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {questionBreakdown.map((q, i) => (
                  <tr key={i} className="border-b border-border/30 last:border-0">
                    <td className="py-2 px-4 font-medium text-foreground">{q.paper}</td>
                    <td className="py-2 px-2 text-foreground">{q.questionNo}</td>
                    <td className="py-2 px-2 text-center">{q.marks}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={q.hintUsed === 'Yes' ? 'text-foreground font-medium' : 'text-muted-foreground'}>{q.hintUsed}</span>
                    </td>
                    <td className="py-2 px-2 text-center">{q.checkWorkUsed}</td>
                    <td className="py-2 px-2 text-center">{q.timeTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Main Page ───
export default function StudentAnalytics({ studentMode = false, embedded = false }: { studentMode?: boolean; embedded?: boolean }) {
  const navigate = useNavigate();
  const { data, isLoading } = useStudentProgress({ studentMode });

  const isDemoMode = !studentMode;
  const allPaperResults = isDemoMode ? demoPaperResults : (data?.paperResults || []);
  const allRows: any[] = isDemoMode ? demoRows_ : (data?.rows || []);

  // Paper filter state — default: all selected
  const paperOptions = useMemo(() =>
    allPaperResults.map(p => ({ paperId: p.paperId, label: p.paperTitle, year: p.year, session: p.session })),
    [allPaperResults]
  );
  const [selectedPaperIds, setSelectedPaperIds] = useState<Set<string> | null>(null);

  // Effective selection: null means "all"
  const effectiveSelection = useMemo(() => {
    if (!selectedPaperIds || selectedPaperIds.size === 0) return new Set(paperOptions.map(p => p.paperId));
    return selectedPaperIds;
  }, [selectedPaperIds, paperOptions]);

  // Filtered data
  const paperResults = useMemo(() => allPaperResults.filter(p => effectiveSelection.has(p.paperId)), [allPaperResults, effectiveSelection]);
  const rows = useMemo(() => allRows.filter((r: any) => effectiveSelection.has(r.paper_id)), [allRows, effectiveSelection]);
  const topicMastery = useMemo(() => {
    const allTopics = isDemoMode ? demoTopicMastery : (data?.topicMastery || []);
    if (effectiveSelection.size === paperOptions.length) return allTopics;
    return allTopics.map(t => {
      const filteredScores = t.paperScores.filter(ps => effectiveSelection.has(ps.paperId));
      if (filteredScores.length === 0) return { ...t, paperScores: [], overallScore: 0, latestAccuracy: 0, latestReadiness: 0, latestSpeed: 0, trend: 'new' as const, trendDelta: 0, completedQuestions: 0 };
      const avgAcc = Math.round(filteredScores.reduce((s, ps) => s + ps.accuracy, 0) / filteredScores.length);
      const avgInd = Math.round(filteredScores.reduce((s, ps) => s + ps.readiness, 0) / filteredScores.length);
      const avgSpd = Math.round(filteredScores.reduce((s, ps) => s + ps.speed, 0) / filteredScores.length);
      const overall = Math.round(avgAcc * 0.4 + avgInd * 0.3 + avgSpd * 0.3);
      let trend: TopicMastery['trend'] = 'new';
      let trendDelta = 0;
      if (filteredScores.length >= 2) {
        const delta = filteredScores[filteredScores.length - 1].overall - filteredScores[filteredScores.length - 2].overall;
        trendDelta = delta;
        trend = Math.abs(delta) <= 2 ? 'stable' : delta > 0 ? 'up' : 'down';
      }
      return { ...t, paperScores: filteredScores, overallScore: overall, latestAccuracy: avgAcc, latestReadiness: avgInd, latestSpeed: avgSpd, trend, trendDelta };
    });
  }, [isDemoMode, data?.topicMastery, effectiveSelection, paperOptions.length]);

  // Overall = average across ALL individual questions (not average of topics)
  const totalQs = rows.length;
  const avgAccuracy = totalQs > 0 ? Math.round(rows.reduce((s, r: any) => s + Number(r.accuracy_score), 0) / totalQs) : 0;
  const totalHintsOverall = rows.reduce((s, r: any) => s + (r.ai_usage_count || 0), 0);
  const totalCheckWorkOverall = rows.reduce((s, r: any) => s + (r.checkwork_count || 0), 0);
  const totalAiActionsOverall = totalHintsOverall + totalCheckWorkOverall;
  const avgIndependence = totalQs > 0 ? Math.max(0, Math.round((100 - totalAiActionsOverall * 0.1) * 10) / 10) : 0;
  const avgTime = totalQs > 0 ? rows.reduce((s, r: any) => s + r.time_spent_seconds, 0) / totalQs : 0;
  const avgSpeed = totalQs > 0 ? Math.round(Math.max(0, Math.min(100, 100 - (avgTime - 60) / 3))) : 0;
  const avgScore = totalQs > 0 ? Math.round(avgAccuracy * 0.4 + avgIndependence * 0.3 + avgSpeed * 0.3) : 0;

  return (
    <div className="min-h-screen bg-background">
      {!embedded && <Header hideAdmin={studentMode} studentMode={studentMode} />}

      <main className="container px-4 py-6 md:px-6 max-w-5xl">
        {!embedded && (
          <Button variant="ghost" size="sm" onClick={() => navigate(studentMode ? '/student' : '/dashboard')} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        )}

        <h1 className="text-xl font-bold text-foreground flex items-center gap-2 mb-5 uppercase tracking-widest justify-center">
          <BarChart3 className="h-5 w-5 text-primary" />
          {isDemoMode ? 'Student Demo Analytics' : 'Your Progress'}
        </h1>

        <Tabs defaultValue="pastpapers" className="w-full">
          <TabsList className="mb-6 w-full max-w-md">
            <TabsTrigger value="syllabus" className="flex-1 gap-2" disabled>
              <BookOpen className="h-4 w-4" />
              Syllabus
              <Lock className="h-3 w-3 ml-1 text-muted-foreground" />
            </TabsTrigger>
            <TabsTrigger value="pastpapers" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Past Paper Progress
            </TabsTrigger>
          </TabsList>

          {/* ── Syllabus Tab (Coming Soon) ── */}
          <TabsContent value="syllabus">
            <Card className="bg-card border-border">
              <CardContent className="p-10 text-center">
                <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Syllabus-based progress tracking will be available once syllabus content is complete.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Past Paper Progress Tab ── */}
          <TabsContent value="pastpapers">
            {/* Paper Filter */}
            {paperOptions.length > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <PaperFilter
                  papers={paperOptions}
                  selectedPaperIds={effectiveSelection}
                  onChange={setSelectedPaperIds}
                />
                <span className="text-[11px] text-muted-foreground">
                  Showing {paperResults.length} of {allPaperResults.length} paper(s)
                </span>
              </div>
            )}

            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center justify-center gap-2 uppercase tracking-widest">
              <Target className="h-5 w-5 text-primary" />
              Overall Mastery
            </h2>

            {/* Key Metrics Row */}
            {(() => {
              // Progress: questions done / total questions in selected papers
              const totalPaperQuestions = paperResults.reduce((s, p) => s + p.totalQuestions, 0);
              const totalSolvedQuestions = paperResults.reduce((s, p) => s + p.solvedQuestions, 0);
              const progressPct = totalPaperQuestions > 0 ? Math.round((totalSolvedQuestions / totalPaperQuestions) * 100) : 0;

              // Accuracy: marks obtained / total marks as percentage
              const totalMarks = paperResults.reduce((s, p) => s + p.totalMarks, 0);
              const marksObtained = paperResults.reduce((s, p) => s + p.marksObtained, 0);
              const accuracyPct = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;

              // AI Dependence: count hints & checkwork used
              const totalHints = rows.reduce((s: number, r: any) => s + (r.ai_usage_count || 0), 0);
              const totalCheckWork = rows.reduce((s: number, r: any) => s + (r.checkwork_count || 0), 0);
              const totalAiActions = totalHints + totalCheckWork;
              const aiIndependence = Math.max(0, Math.round((100 - totalAiActions * 0.1) * 10) / 10);

              // Time Taken: total seconds
              const totalTime = rows.reduce((s: number, r: any) => s + (r.time_spent_seconds || 0), 0);
              const formatTime = (secs: number) => {
                if (secs < 60) return `${secs}s`;
                const m = Math.floor(secs / 60);
                const s2 = secs % 60;
                if (m < 60) return `${m}m ${s2}s`;
                const h = Math.floor(m / 60);
                const rm = m % 60;
                return `${h}h ${rm}m`;
              };

              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {/* Progress */}
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <img src={iconProgress} alt="Progress" className="h-10 w-10 object-contain" loading="lazy" />
                      <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">Progress</p>
                      <div className="w-full">
                        <Progress value={progressPct} className="h-2.5 mb-1" />
                        <p className="text-xs text-muted-foreground">{totalSolvedQuestions}/{totalPaperQuestions} Questions</p>
                      </div>
                      <p className={`text-xl font-bold ${progressPct > 80 ? 'text-success' : progressPct >= 50 ? 'text-warning' : 'text-destructive'}`}>{progressPct}%</p>
                    </CardContent>
                  </Card>

                  {/* Marks Obtained */}
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <img src={iconMarks} alt="Marks" className="h-10 w-10 object-contain" loading="lazy" />
                      <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">Marks Obtained</p>
                      <p className={`text-xl font-bold ${accuracyPct > 80 ? 'text-success' : accuracyPct >= 50 ? 'text-warning' : 'text-destructive'}`}>{marksObtained}/{totalMarks}</p>
                    </CardContent>
                  </Card>

                  {/* AI Independence */}
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
                      <img src={iconBrain} alt="AI Independence" className="h-10 w-10 object-contain" loading="lazy" />
                      <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">AI Independence</p>
                      <p className={`text-xl font-bold ${aiIndependence > 80 ? 'text-success' : aiIndependence >= 50 ? 'text-warning' : 'text-destructive'}`}>{aiIndependence}%</p>
                      <div className="flex gap-3 text-xs">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-bold text-foreground">{totalHints}</span>
                          <span className="text-[10px] text-muted-foreground">Hints</span>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-bold text-foreground">{totalCheckWork}</span>
                          <span className="text-[10px] text-muted-foreground">Check Work</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Taken */}
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <img src={iconTimer} alt="Time Taken" className="h-10 w-10 object-contain" loading="lazy" />
                      <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">Time Taken</p>
                      <p className="text-xl font-bold text-foreground">{formatTime(totalTime)}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}

            {/* Topic Mastery Matrix */}
            <section className="mb-10">
              <h2 className="text-sm font-bold text-foreground mb-4 flex items-center justify-center gap-2 uppercase tracking-widest">
                <Sparkles className="h-4 w-4 text-primary" />
                TOPIC MASTERY MATRIX
              </h2>
              {topicMastery.length === 0 && !isLoading ? (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet. Submit answers on past papers to see your topic mastery.</p>
              ) : (
                <div className="space-y-2.5">
                  {topicMastery.map((topic, i) => (
                    <TopicRow key={topic.topicId} topic={topic} index={i} rows={rows} demoMode={isDemoMode} />
                  ))}
                </div>
              )}
            </section>

            {/* Topic Performance Radar */}
            <section>
              <h2 className="text-sm font-bold text-foreground mb-4 flex items-center justify-center gap-2 uppercase tracking-widest">
                <Target className="h-4 w-4 text-primary" />
                TOPIC PERFORMANCE RADAR
              </h2>
              {topicMastery.length === 0 || topicMastery.every(t => t.completedQuestions === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet. Solve past papers to see your topic radar.</p>
              ) : (
                <div className="bg-card border border-border rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={topicMastery.map(t => ({
                      topic: t.topic.length > 12 ? t.topic.substring(0, 12) + '…' : t.topic,
                      accuracy: t.latestAccuracy,
                      independence: t.latestReadiness,
                      speed: t.latestSpeed,
                    }))}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="topic" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }} />
                      <Radar name="Accuracy" dataKey="accuracy" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} />
                      <Radar name="Independence" dataKey="independence" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={2} />
                      <Radar name="Speed" dataKey="speed" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-2 text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />Accuracy</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />Independence</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />Speed</span>
                  </div>
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
