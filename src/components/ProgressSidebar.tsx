import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import { pastPapers } from '@/lib/pastPaperData';
import { igcseMathsSyllabus } from '@/lib/syllabusData';
import { cn } from '@/lib/utils';

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

interface PaperProgressItem {
  paperId: string;
  code: string;
  session: string;
  year: number;
  category: string;
  totalQuestions: number;
  solvedQuestions: number;
  completionPercentage: number;
  totalMarks: number;
  marksObtained: number;
  scorePercentage: number;
}

function YearFolder({ year, papers }: { year: number; papers: PaperProgressItem[] }) {
  const [open, setOpen] = useState(false);
  const totalQ = papers.reduce((s, p) => s + p.totalQuestions, 0);
  const solvedQ = papers.reduce((s, p) => s + p.solvedQuestions, 0);
  const yearPct = totalQ > 0 ? Math.round((solvedQ / totalQ) * 100) : 0;

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left"
      >
        {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
        <span className="text-sm font-semibold text-foreground flex-1">{year}</span>
        <span className="text-[10px] text-muted-foreground">{solvedQ}/{totalQ} solved</span>
        <ProgressRing percentage={yearPct} size={32} strokeWidth={3} />
      </button>
      {open && (
        <div className="border-t border-border/50 divide-y divide-border/30">
          {papers.map(p => {
            // Extract variant from code e.g. "4024/12" -> "12"
            const variant = p.code.split('/')[1] || '';
            const paperNum = variant.startsWith('1') ? 'P1' : variant.startsWith('2') ? 'P2' : `P${variant}`;
            const scoreColor = p.scorePercentage > 80 ? 'text-green-400' : p.scorePercentage >= 50 ? 'text-yellow-400' : 'text-destructive';

            return (
              <div key={p.paperId} className="flex items-center gap-2.5 px-3 py-2 bg-card/50">
                <ProgressRing percentage={p.completionPercentage} size={34} strokeWidth={3} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-foreground">{p.code}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">{paperNum}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{p.session}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground">{p.solvedQuestions}/{p.totalQuestions}</span>
                    {p.solvedQuestions > 0 && (
                      <>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className={cn("text-[10px] font-semibold", scoreColor)}>
                          {p.marksObtained}/{p.totalMarks}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ProgressSidebarProps {
  activeTab?: 'syllabus' | 'pastpapers';
  courseId?: string;
}

export function ProgressSidebar({ activeTab = 'syllabus', courseId }: ProgressSidebarProps) {
  const { user } = useAuth();
  const { data, isLoading } = useStudentProgress();
  const { isCompleted } = useProgress();

  const showTopics = activeTab === 'syllabus';

  // Syllabus-based topic progress
  const syllabusTopicProgress = igcseMathsSyllabus.topics.map(topic => {
    const allQuestions = topic.subtopics.flatMap(s => s.questionIds);
    const completed = allQuestions.filter(id => isCompleted(id)).length;
    const percentage = allQuestions.length > 0 ? Math.round((completed / allQuestions.length) * 100) : 0;
    return { id: topic.id, title: topic.title, subtopicCount: topic.subtopics.length, percentage };
  });

  // Paper progress grouped by year
  const filteredPapers = pastPapers.filter(p => !courseId || p.courseId === courseId);
  const paperProgressItems: PaperProgressItem[] = filteredPapers.map(paper => {
    const result = data?.paperResults.find(r => r.paperId === paper.id);
    return {
      paperId: paper.id,
      code: paper.code,
      session: paper.session,
      year: paper.year,
      category: paper.category,
      totalQuestions: paper.sections.length,
      solvedQuestions: result?.solvedQuestions || 0,
      completionPercentage: result?.completionPercentage || 0,
      totalMarks: paper.totalMarks,
      marksObtained: result?.marksObtained || 0,
      scorePercentage: paper.totalMarks > 0 ? Math.round(((result?.marksObtained || 0) / paper.totalMarks) * 100) : 0,
    };
  });

  // Group by year descending
  const yearMap = new Map<number, PaperProgressItem[]>();
  paperProgressItems.forEach(p => {
    const arr = yearMap.get(p.year) || [];
    arr.push(p);
    yearMap.set(p.year, arr);
  });
  const years = Array.from(yearMap.keys()).sort((a, b) => b - a);

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
          <div className="space-y-2">
            {years.map(year => (
              <YearFolder key={year} year={year} papers={yearMap.get(year)!} />
            ))}
            {years.length === 0 && (
              <p className="text-xs text-muted-foreground">No papers available.</p>
            )}
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
