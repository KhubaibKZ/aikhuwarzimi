import { useProgress } from '@/context/ProgressContext';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, BookOpen, PenTool } from 'lucide-react';

export function ProgressSidebar() {
  const { exampleProgress, exerciseProgress, completedExamples, completedExercises, totalExamples, totalExercises } = useProgress();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft animate-fade-in">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Progress Overview
        </h3>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                Examples Completed
              </span>
              <span className="font-medium text-primary">
                {completedExamples.length}/{totalExamples}
              </span>
            </div>
            <Progress value={exampleProgress} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <PenTool className="h-4 w-4 text-success" />
                Exercise Questions
              </span>
              <span className="font-medium text-success">
                {completedExercises.length}/{totalExercises}
              </span>
            </div>
            <Progress value={exerciseProgress} className="h-2 [&>div]:bg-success" />
          </div>
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
