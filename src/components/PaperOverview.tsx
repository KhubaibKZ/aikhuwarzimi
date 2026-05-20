import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  CheckCircle2,
  FileText,
  BarChart3,
  Clock,
  Target,
  Brain,
  Award,
  RotateCcw,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { PastPaperWorkspace } from '@/components/PastPaperWorkspace';
import { pastPapers, getPastPaperQuestion } from '@/lib/pastPaperData';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import { useStudentAssignments } from '@/hooks/useStudentAssignments';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface PaperOverviewProps {
  paperId: string;
  onBack: () => void;
  studentMode?: boolean;
  enforceAssignments?: boolean;
}

function fmtTime(secs: number) {
  if (!secs || secs < 1) return '—';
  if (secs < 60) return `${Math.round(secs)}s`;
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}m ${s}s`;
}

export function PaperOverview({
  paperId,
  onBack,
  studentMode = false,
  enforceAssignments = false,
}: PaperOverviewProps) {
  const paper = pastPapers.find((p) => p.id === paperId);
  const { user } = useAuth();
  const { getPaperQuota } = useStudentAssignments();
  const { data: progressData } = useStudentProgress({ studentMode });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [openQid, setOpenQid] = useState<string | null>(null);
  const [tab, setTab] = useState<'paper' | 'learning'>('paper');
  const [resetting, setResetting] = useState(false);

  if (!paper) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Paper not found.</p>
        <Button variant="outline" size="sm" onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
    );
  }

  const paperRows = (progressData?.rows || []).filter((r: any) => r.paper_id === paperId);
  const submittedSet = new Set(paperRows.map((r: any) => r.question_id));

  const totalQs = paper.sections.length;
  const solvedQs = paperRows.length;
  const completionPct = totalQs ? Math.round((solvedQs / totalQs) * 100) : 0;

  const sectionMarks = (questionId: string) =>
    getPastPaperQuestion(questionId)?.marks || 0;

  // marks (sum of question marks × accuracy)
  const marksObtained = useMemo(
    () =>
      paperRows.reduce((sum: number, r: any) => {
        const m = sectionMarks(r.question_id);
        return sum + (Number(r.accuracy_score) / 100) * m;
      }, 0),
    [paperRows]
  );
  const marksAvailableSolved = paperRows.reduce(
    (sum: number, r: any) => sum + sectionMarks(r.question_id),
    0
  );
  const accuracyPct = marksAvailableSolved > 0 ? Math.round((marksObtained / marksAvailableSolved) * 100) : 0;
  const totalTime = paperRows.reduce((s: number, r: any) => s + (r.time_spent_seconds || 0), 0);
  const totalAi = paperRows.reduce((s: number, r: any) => s + (r.ai_usage_count || 0), 0);
  const aiIndependence = Math.max(0, Math.round(100 - totalAi * 5));

  const quota = studentMode ? getPaperQuota(paperId) : null;
  const currentQuestion = openQid ? getPastPaperQuestion(openQid) : null;

  const handleReset = async () => {
    if (!user) {
      toast({ title: 'Not logged in', description: 'Please log in to reset progress.', variant: 'destructive' });
      return;
    }
    if (!confirm('Reset all progress for this paper?')) return;
    setResetting(true);
    try {
      const workspaceMode = studentMode ? 'student' : 'general';
      await supabase
        .from('student_paper_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('paper_id', paperId)
        .eq('workspace_mode', workspaceMode);
      queryClient.invalidateQueries({ queryKey: ['student-progress'] });
      toast({ title: 'Paper reset', description: 'All progress for this paper has been cleared.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to reset paper progress.', variant: 'destructive' });
    } finally {
      setResetting(false);
    }
  };

  const sortedRecords = useMemo(
    () => [...paperRows].sort((a: any, b: any) => a.submitted_at.localeCompare(b.submitted_at)),
    [paperRows]
  );

  return (
    <div>
      {/* Back row */}
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Past Papers
        </Button>
        {solvedQs > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={resetting}
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className={cn('h-3.5 w-3.5', resetting && 'animate-spin')} />
            {resetting ? 'Resetting…' : 'Reset paper progress'}
          </Button>
        )}
      </div>

      <div>
          <Card className="mb-6">
            <CardContent className="pt-6 pb-5">
              <div className="flex items-start justify-between mb-3 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{paper.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {paper.category} · {paper.duration} · {paper.totalMarks} marks
                  </p>
                  {quota && (
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {quota.hints} hints · {quota.checkwork} checks available
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-foreground">
                    {solvedQs}
                    <span className="text-sm text-muted-foreground">/{totalQs}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Questions solved</p>
                </div>
              </div>
              <Progress value={completionPct} className="h-3" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{completionPct}% complete</span>
                <span>
                  {Math.round(marksObtained)} / {paper.totalMarks} marks earned
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {paper.sections.map((section) => {
              const done = submittedSet.has(section.questionId);
              const sectionLocked = !!section.locked;
              const rec = paperRows.find((r: any) => r.question_id === section.questionId);
              const titleParts = section.title.split('–');
              const qLabel = titleParts[0]?.trim() || section.title;
              const qSub = titleParts[1]?.trim() || '';
              return (
                <button
                  key={section.id}
                  onClick={() => !sectionLocked && setOpenQid(section.questionId)}
                  disabled={sectionLocked}
                  className={cn(
                    'text-left rounded-xl border p-3 transition-all',
                    sectionLocked
                      ? 'opacity-60 cursor-not-allowed border-border bg-card'
                      : done
                        ? 'border-success/50 bg-success/5 hover:shadow-md hover:border-success/70'
                        : 'border-border bg-card hover:shadow-md hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-foreground">{qLabel}</span>
                    {sectionLocked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : done ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : null}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 min-h-[28px]">{qSub}</p>
                  {done && rec && (() => {
                    const m = sectionMarks(section.questionId);
                    return (
                      <p className="text-[10px] mt-2 font-semibold text-success">
                        {Math.round((Number(rec.accuracy_score) / 100) * m)}/{m} marks
                      </p>
                    );
                  })()}
                  {sectionLocked && (
                    <p className="text-[10px] mt-2 italic text-muted-foreground">
                      {section.lockedReason || 'Locked'}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
      </div>

      {currentQuestion && (
        <PastPaperWorkspace
          question={currentQuestion}
          isOpen={!!openQid}
          onClose={() => setOpenQid(null)}
          workspaceMode={studentMode ? 'student' : 'general'}
        />
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          {icon}
          <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}
