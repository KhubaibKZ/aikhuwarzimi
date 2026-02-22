import { useAuth } from '@/hooks/useAuth';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2 } from 'lucide-react';
import { pastPapers } from '@/lib/pastPaperData';
import { igcseMathsSyllabus } from '@/lib/syllabusData';

function ProgressRing({ percentage, size = 40, strokeWidth = 3.5 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage > 80 ? 'hsl(var(--success))' : percentage >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

interface ProgressSidebarProps {
  activeTab?: 'syllabus' | 'pastpapers';
}

export function ProgressSidebar({ activeTab = 'syllabus' }: ProgressSidebarProps) {
  const { user } = useAuth();
  const { data, isLoading } = useStudentProgress();
  const { isCompleted } = useProgress();

  const showTopics = activeTab === 'syllabus';

  // Syllabus-based topic progress (from ProgressContext, not past papers)
  const syllabusTopicProgress = igcseMathsSyllabus.topics.map(topic => {
    const allQuestions = topic.subtopics.flatMap(s => s.questionIds);
    const completed = allQuestions.filter(id => isCompleted(id)).length;
    const percentage = allQuestions.length > 0 ? Math.round((completed / allQuestions.length) * 100) : 0;
    return {
      id: topic.id,
      title: topic.title,
      subtopicCount: topic.subtopics.length,
      percentage,
    };
  });

  // Paper progress
  const paperProgress = pastPapers.map(paper => {
    const result = data?.paperResults.find(r => r.paperId === paper.id);
    return {
      code: paper.code,
      session: `${paper.session} ${paper.year}`,
      totalQuestions: paper.sections.length,
      solvedQuestions: result ? result.solvedQuestions : 0,
      completionPercentage: result ? result.completionPercentage : 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft animate-fade-in">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          {showTopics ? 'Topic Progress' : 'Paper Progress'}
        </h3>

        {showTopics ? (
          <div className="space-y-4">
            {syllabusTopicProgress.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <ProgressRing percentage={t.percentage} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{t.title}</p>
                  <p className="text-[10px] text-muted-foreground">{t.subtopicCount} subtopics</p>
                </div>
              </div>
            ))}
          </div>
        ) : !user ? (
          <p className="text-xs text-muted-foreground">Log in to track your progress.</p>
        ) : isLoading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-4">
            {paperProgress.map((paper, i) => (
              <div key={i} className="flex items-center gap-3">
                <ProgressRing percentage={paper.completionPercentage} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{paper.code}</p>
                  <p className="text-[10px] text-muted-foreground">{paper.solvedQuestions}/{paper.totalQuestions} questions</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-secondary/50 p-6 shadow-soft animate-fade-in" style={{ animationDelay: '100ms' }}>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Tips</h4>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
            Complete examples before attempting exercises
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
            Use hints if you get stuck
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
            Show your working for full marks
          </li>
        </ul>
      </div>
    </div>
  );
}
