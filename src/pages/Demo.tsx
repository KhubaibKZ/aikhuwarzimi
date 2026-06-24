import { useState, useEffect, useMemo } from 'react';
import logoImg from '@/assets/logo.png';
import iconProgress from '@/assets/icon-progress.png';
import iconMarks from '@/assets/icon-marks.png';
import iconBrain from '@/assets/icon-brain.png';
import iconTimer from '@/assets/icon-timer.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2, FileText, BarChart3, Sparkles, RotateCcw, Moon, Sun, Target } from 'lucide-react';
import { ProgressProvider } from '@/context/ProgressContext';
import { PastPaperWorkspace, type SubmitProgressPayload } from '@/components/PastPaperWorkspace';
import { pastPapers, getPastPaperQuestion } from '@/lib/pastPaperData';
import { useUsageTracker } from '@/hooks/useUsageTracker';
import StudentAnalytics from './StudentAnalytics';
import { computeTDI, tdiStatus, tdiToneClass } from '@/lib/aiDependenceIndex';

const DEMO_PAPER_IDS = ['pp_4024_on23_11', 'pp_4024_on23_12'] as const;
const STORAGE_KEY = 'demo_progress_v1';
const PAPER_KEY = 'demo_paper_id_v1';
const NAME_KEY = 'demo_visitor_name';


interface DemoRecord extends SubmitProgressPayload {}

function loadProgress(): Record<string, DemoRecord> {
  // Use sessionStorage so progress only lives for the current visit.
  // Clear any legacy persisted progress so questions are never green by default.
  try {
    localStorage.removeItem(STORAGE_KEY);
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}
function saveProgress(map: Record<string, DemoRecord>) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}


function fmtTime(secs: number) {
  if (secs < 60) return `${Math.round(secs)}s`;
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}m ${s}s`;
}

function DemoInner({ visitorName }: { visitorName: string }) {
  const [paperId, setPaperId] = useState<string>(() => {
    const saved = sessionStorage.getItem(PAPER_KEY);
    return saved && (DEMO_PAPER_IDS as readonly string[]).includes(saved) ? saved : DEMO_PAPER_IDS[0];
  });
  const paper = pastPapers.find(p => p.id === paperId);
  const [progressByPaper, setProgressByPaper] = useState<Record<string, Record<string, DemoRecord>>>(() => {
    const legacy = loadProgress();
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      // Migrate legacy flat shape into per-paper shape under first paper
      if (parsed && !parsed[DEMO_PAPER_IDS[0]] && Object.keys(legacy).length) {
        return { [DEMO_PAPER_IDS[0]]: legacy };
      }
      return parsed;
    } catch { return {}; }
  });
  const progress = progressByPaper[paperId] || {};
  const [openQid, setOpenQid] = useState<string | null>(null);
  const [tab, setTab] = useState('paper');
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));


  // Track this demo visit (who, when, how long).
  useUsageTracker({ enabled: true, accountType: 'demo', displayName: visitorName });

  useEffect(() => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progressByPaper)); }, [progressByPaper]);
  useEffect(() => { sessionStorage.setItem(PAPER_KEY, paperId); }, [paperId]);

  if (!paper) return <div className="p-8">Paper not found.</div>;



  const totalQs = paper.sections.length;
  const solvedQs = Object.keys(progress).length;
  const completionPct = Math.round((solvedQs / totalQs) * 100);

  const totalMarks = paper.totalMarks;
  const marksObtained = Object.values(progress).reduce((s, r) => s + (r.marksObtained || 0), 0);
  const marksAvailableSolved = Object.values(progress).reduce((s, r) => s + (r.marksAvailable || 0), 0);
  const accuracyPct = marksAvailableSolved > 0 ? Math.round((marksObtained / marksAvailableSolved) * 100) : 0;
  const totalTime = Object.values(progress).reduce((s, r) => s + r.timeSpentSeconds, 0);
  const totalAi = Object.values(progress).reduce((s, r) => s + r.aiUsageCount, 0);
  const totalCheckwork = Object.values(progress).reduce((s, r) => s + (r.checkworkCount || 0), 0);
  const aiTdi = computeTDI(totalAi, totalCheckwork, solvedQs);

  const currentQuestion = openQid ? getPastPaperQuestion(openQid) : null;

  const handleSubmitProgress = (payload: SubmitProgressPayload) => {
    setProgressByPaper(prev => ({
      ...prev,
      [paperId]: { ...(prev[paperId] || {}), [payload.questionId]: payload },
    }));
  };

  const resetAll = () => {
    if (confirm('Reset progress for this paper?')) {
      setProgressByPaper(prev => ({ ...prev, [paperId]: {} }));
    }
  };


  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const sortedRecords = useMemo(
    () => Object.values(progress).sort((a, b) => a.submittedAt.localeCompare(b.submittedAt)),
    [progress]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Custom demo header (no auth) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="AI Khuwarizmi" className="h-10 w-10 rounded-xl object-contain" />
            <div>
              <h1 className="text-lg font-bold text-foreground">AI KHUWARIZMI · Demo</h1>
              <p className="text-xs text-muted-foreground">{"\n"}</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="h-3 w-3" /> Research & Demo
            </span>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 md:px-6">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="paper" className="gap-2"><FileText className="h-4 w-4" />Paper</TabsTrigger>
            <TabsTrigger value="learning" className="gap-2"><BarChart3 className="h-4 w-4" />Student Analytics</TabsTrigger>
            <TabsTrigger value="demo" className="gap-2"><Sparkles className="h-4 w-4" />Student Demo Analytics</TabsTrigger>
          </TabsList>

          {/* ─── Paper tab ─── */}
          <TabsContent value="paper" className="mt-6">
            {/* Paper toggle inside Paper tab */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mr-1">Paper:</span>
              {DEMO_PAPER_IDS.map(pid => {
                const p = pastPapers.find(pp => pp.id === pid);
                if (!p) return null;
                const active = pid === paperId;
                return (
                  <Button
                    key={pid}
                    size="sm"
                    variant={active ? 'default' : 'outline'}
                    onClick={() => { setPaperId(pid); setOpenQid(null); }}
                  >
                    {p.code}
                  </Button>
                );
              })}
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{paper.title}</h2>
                    <p className="text-xs text-muted-foreground">{paper.category} · {paper.duration} · {paper.totalMarks} marks</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{solvedQs}<span className="text-sm text-muted-foreground">/{totalQs}</span></p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Questions solved</p>
                  </div>
                </div>
                <Progress value={completionPct} className="h-3" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{completionPct}% complete</span>
                  <span>{marksObtained} / {totalMarks} marks earned</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {paper.sections.map((section, sectionIndex) => {
                const rec = progress[section.questionId];
                const done = !!rec;
                return (
                  <button
                    key={section.id}
                    data-tour={sectionIndex === 0 ? 'demo-q1' : undefined}
                    onClick={() => setOpenQid(section.questionId)}
                    className={`text-left rounded-xl border p-3 transition-all hover:shadow-md hover:border-primary/50 ${done ? 'border-success/50 bg-success/5' : 'border-border bg-card'}`}

                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-foreground">{section.title.split('–')[0].trim()}</span>
                      {done && <CheckCircle2 className="h-4 w-4 text-success" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 min-h-[28px]">{section.title.split('–')[1]?.trim() || ''}</p>
                    {done && (
                      <p className="text-[10px] mt-2 font-semibold text-success">
                        {rec.marksObtained}/{rec.marksAvailable} marks
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {solvedQs > 0 && (
              <div className="mt-6 flex justify-end">
                <Button variant="outline" size="sm" onClick={resetAll} className="gap-2">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset demo progress
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ─── Learning Analytics (live from working) — mirrors Student Demo Analytics interface ─── */}
          <TabsContent value="learning" className="mt-6">
            <h2 className="text-sm font-bold text-foreground mb-4 flex items-center justify-center gap-2 uppercase tracking-widest">
              <Target className="h-4 w-4 text-primary" />
              OVERALL MASTERY
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {/* Progress */}
              <Card className="bg-card border-border">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <img src={iconProgress} alt="Progress" className="h-10 w-10 object-contain" loading="lazy" />
                  <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">Progress</p>
                  <div className="w-full">
                    <Progress value={completionPct} className="h-2.5 mb-1" />
                    <p className="text-xs text-muted-foreground">{solvedQs}/{totalQs} Questions</p>
                  </div>
                  <p className={`text-xl font-bold ${completionPct > 80 ? 'text-success' : completionPct >= 50 ? 'text-warning' : 'text-destructive'}`}>{completionPct}%</p>
                </CardContent>
              </Card>

              {/* Marks Obtained */}
              <Card className="bg-card border-border">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <img src={iconMarks} alt="Marks" className="h-10 w-10 object-contain" loading="lazy" />
                  <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">Marks Obtained</p>
                  <p className={`text-xl font-bold ${accuracyPct > 80 ? 'text-success' : accuracyPct >= 50 ? 'text-warning' : 'text-destructive'}`}>{marksObtained}/{totalMarks}</p>
                  <p className="text-[10px] text-muted-foreground">{accuracyPct}% accuracy on solved</p>
                </CardContent>
              </Card>

              {/* AI Dependence Index */}
              <Card className="bg-card border-border">
                <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
                  <img src={iconBrain} alt="AI Dependence Index" className="h-10 w-10 object-contain" loading="lazy" />
                  <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">AI Dependence Index</p>
                  <p className={`text-xl font-bold ${tdiToneClass(tdiStatus(aiTdi).tone)}`}>{aiTdi.toFixed(3)}</p>
                  <p className={`text-[10px] font-semibold ${tdiToneClass(tdiStatus(aiTdi).tone)}`}>{tdiStatus(aiTdi).emoji} {tdiStatus(aiTdi).label}</p>
                  <div className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-foreground">{totalAi}</span>
                      <span className="text-[10px] text-muted-foreground">Hints</span>
                    </div>
                    <div className="w-px bg-border" />
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-foreground">{totalCheckwork}</span>
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
                  <p className="text-xl font-bold text-foreground">{fmtTime(totalTime)}</p>
                  <p className="text-[10px] text-muted-foreground">avg {solvedQs ? fmtTime(totalTime / solvedQs) : '—'} / question</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-bold text-foreground">Question breakdown</h3>
                  <p className="text-xs text-muted-foreground">Live results from your demo session</p>
                </div>
                {sortedRecords.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No questions solved yet. Open the <strong>Paper</strong> tab and start solving — analytics will appear here in real time.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/30">
                      <div className="col-span-4">Question</div>
                      <div className="col-span-2 text-center">Marks</div>
                      <div className="col-span-2 text-center">Accuracy</div>
                      <div className="col-span-2 text-center">AI used</div>
                      <div className="col-span-2 text-right">Time</div>
                    </div>
                    {sortedRecords.map(rec => {
                      const q = getPastPaperQuestion(rec.questionId);
                      return (
                        <div key={rec.questionId} className="grid grid-cols-12 gap-2 px-4 py-2.5 text-xs items-center">
                          <div className="col-span-4">
                            <p className="font-semibold text-foreground">Q{q?.questionNumber}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{q?.title}</p>
                          </div>
                          <div className="col-span-2 text-center font-semibold text-foreground">{rec.marksObtained}/{rec.marksAvailable}</div>
                          <div className="col-span-2 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${rec.accuracyScore >= 80 ? 'bg-success/20 text-success' : rec.accuracyScore >= 50 ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'}`}>
                              {rec.accuracyScore}%
                            </span>
                          </div>
                          <div className="col-span-2 text-center text-muted-foreground">{rec.aiUsageCount}</div>
                          <div className="col-span-2 text-right text-muted-foreground">{fmtTime(rec.timeSpentSeconds)}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─── Demo Analytics tab ─── */}
          <TabsContent value="demo" className="mt-6 -mx-4 md:-mx-6">
            <div className="border-t border-border">
              <StudentAnalytics embedded />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {currentQuestion && (
        <PastPaperWorkspace
          question={currentQuestion}
          isOpen={!!openQid}
          onClose={() => setOpenQid(null)}
          workspaceMode="general"
          onSubmitProgress={handleSubmitProgress}
        />
      )}

    </div>
  );
}


function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
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

function DemoGate() {
  const [visitorName, setVisitorName] = useState<string>(() => sessionStorage.getItem(NAME_KEY) || '');
  const [nameInput, setNameInput] = useState('');

  const submitName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    sessionStorage.setItem(NAME_KEY, trimmed);
    setVisitorName(trimmed);
  };

  if (!visitorName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-7 text-center">
            <img src={logoImg} alt="AI Khuwarizmi" className="h-14 w-14 rounded-xl object-contain mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground">Welcome to the Demo</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-5">Enter your name to begin.</p>
            <Input
              autoFocus
              placeholder="Your name"
              value={nameInput}
              maxLength={60}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submitName(); }}
              className="mb-3"
            />
            <Button className="w-full" onClick={submitName} disabled={!nameInput.trim()}>
              Start Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <DemoInner visitorName={visitorName} />;
}

const Demo = () => (
  <ProgressProvider>
    <DemoGate />
  </ProgressProvider>
);

export default Demo;

