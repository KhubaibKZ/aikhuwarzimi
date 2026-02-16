import { useProgress } from '@/context/ProgressContext';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, FileText } from 'lucide-react';
import { pastPapers } from '@/lib/pastPaperData';
import { mockPastPaperResults } from '@/lib/analyticsData';

function PaperProgressRing({ percentage, size = 40, strokeWidth = 3.5 }: { percentage: number; size?: number; strokeWidth?: number }) {
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

export function ProgressSidebar() {
  const { exampleProgress, exerciseProgress, completedExamples, completedExercises, totalExamples, totalExercises } = useProgress();

  // Build per-paper completion data
  const paperProgress = pastPapers.map(paper => {
    const result = mockPastPaperResults.find(r => r.paperId === paper.id);
    const totalQuestions = paper.sections.length;
    const solvedQuestions = result ? result.solvedQuestions : 0;
    const completionPercentage = result ? result.completionPercentage : 0;
    return {
      code: paper.code,
      session: `${paper.session} ${paper.year}`,
      totalQuestions,
      solvedQuestions,
      completionPercentage,
    };
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft animate-fade-in">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Progress Overview
        </h3>

        <div className="space-y-4">
          {paperProgress.map((paper, i) => (
            <div key={i} className="flex items-center gap-3">
              <PaperProgressRing percentage={paper.completionPercentage} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{paper.code}</p>
                <p className="text-[10px] text-muted-foreground">{paper.solvedQuestions}/{paper.totalQuestions} questions</p>
              </div>
            </div>
          ))}
        </div>
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
