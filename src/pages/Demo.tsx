import { useState, useEffect, useMemo } from 'react';
import logoImg from '@/assets/logo.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2, FileText, BarChart3, Sparkles, Clock, Target, Brain, Award, RotateCcw, Moon, Sun, Compass } from 'lucide-react';
import { ProgressProvider } from '@/context/ProgressContext';
import { PastPaperWorkspace, type SubmitProgressPayload } from '@/components/PastPaperWorkspace';
import { pastPapers, getPastPaperQuestion } from '@/lib/pastPaperData';
import { useUsageTracker } from '@/hooks/useUsageTracker';
import { GuidedTour, type TourStep } from '@/components/GuidedTour';
import StudentAnalytics from './StudentAnalytics';

const TOUR_STEPS: TourStep[] = [
  {
    selector: '[data-tour="demo-q1"]',
    title: 'Open Question 1',
    body: 'Click on Question 1 to open the interactive workspace and begin solving.',
    placement: 'bottom',
    interaction: 'click',
  },
  {
    selector: '[data-tour="hint-btn"]',
    title: 'Ask for a Hint',
    body: 'Stuck on what the question is asking? Tap Hint and the AI tutor will explain the idea.',
    placement: 'top',
    interaction: 'click',
  },
  {
    // Highlight the whole hint card; advance only when the student clicks OK.
    selector: '[data-tour="hint-feedback"]',
    advanceSelector: '[data-tour="hint-ok-btn"]',
    title: 'Read the hint, then click OK',
    body: 'The hint appears inside the workspace. Read it, then click OK to start part (a).',
    placement: 'top',
    interaction: 'click',
  },
  {
    selector: '[data-tour="answer-input-a"]',
    title: 'Part (a): enter a wrong answer first',
    body: 'Type an incorrect answer on purpose so you can see how Check Work gives AI guidance.',
    placement: 'bottom',
    interaction: 'input',
  },
  {
    selector: '[data-tour="checkwork-btn-a"]',
    title: 'Check part (a)',
    body: 'Tap Check Work to trigger the AI guidance for the wrong answer.',
    placement: 'left',
    interaction: 'click',
  },
  {
    // Highlight the full incorrect-feedback card; advance only on Try again.
    selector: '[data-tour="guidance-feedback-a"]',
    advanceSelector: '[data-tour="try-again-btn-a"]',
    title: 'Read the feedback, then Try again',
    body: 'This explains what went wrong and nudges you in the right direction. Click Try again to re-enter part (a).',
    placement: 'top',
    interaction: 'click',
  },
  {
    selector: '[data-tour="answer-input-a"]',
    title: 'Part (a): now enter the correct answer',
    body: 'Now type the correct answer, 8, to complete part (a).',
    placement: 'bottom',
    interaction: 'input',
  },
  {
    selector: '[data-tour="checkwork-btn-a"]',
    title: 'Check the correct answer',
    body: 'Tap Check Work again so you see the successful AI feedback too.',
    placement: 'left',
    interaction: 'click',
  },
  {
    // Highlight the full success card; advance only on Continue.
    selector: '[data-tour="guidance-feedback-correct-a"]',
    advanceSelector: '[data-tour="continue-btn-a"]',
    title: 'Part (a) is correct — Continue',
    body: 'This confirms part (a) is correct. Click Continue to move on to part (b).',
    placement: 'top',
    interaction: 'click',
  },
  {
    selector: '[data-tour="answer-input-b"]',
    title: 'Answer part (b)',
    body: 'Now type the answer for 40 × 0.3, which is 12, in the second box.',
    placement: 'bottom',
    interaction: 'input',
  },
  {
    selector: '[data-tour="checkwork-btn-b"]',
    title: 'Check part (b)',
    body: 'Tap Check Work so the demo shows the feedback for part (b) as well.',
    placement: 'left',
    interaction: 'click',
  },
  {
    // Highlight the full part (b) success card; advance only on Continue.
    selector: '[data-tour="guidance-feedback-correct-b"]',
    advanceSelector: '[data-tour="continue-btn-b"]',
    title: 'Part (b) is correct — Continue',
    body: 'Part (b) is confirmed. Click Continue, then submit the full question.',
    placement: 'top',
    interaction: 'click',
  },
  {
    selector: '[data-tour="submit-btn"]',
    title: 'Submit your answer',
    body: 'Finally, tap Submit to record the completed answer.',
    placement: 'top',
    interaction: 'click',
  },
  {
    selector: '[data-tour="submit-feedback"]',
    title: 'Submission feedback',
    body: 'This final message confirms the answer has been submitted and recorded.',
    placement: 'top',
    interaction: 'appear',
  },
];


const PAPER_ID = 'pp_4024_on23_11';
const STORAGE_KEY = 'demo_progress_v1';
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
  const paper = pastPapers.find(p => p.id === PAPER_ID);
  const [progress, setProgress] = useState<Record<string, DemoRecord>>(loadProgress());
  const [openQid, setOpenQid] = useState<string | null>(null);
  const [tab, setTab] = useState('paper');
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [tourActive, setTourActive] = useState(false);


  // Track this demo visit (who, when, how long).
  useUsageTracker({ enabled: true, accountType: 'demo', displayName: visitorName });

  useEffect(() => { saveProgress(progress); }, [progress]);

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
  const aiIndependence = Math.max(0, Math.round(100 - totalAi * 5));

  const currentQuestion = openQid ? getPastPaperQuestion(openQid) : null;

  const handleSubmitProgress = (payload: SubmitProgressPayload) => {
    setProgress(prev => ({ ...prev, [payload.questionId]: payload }));
  };

  const resetAll = () => {
    if (confirm('Reset all demo progress?')) {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
      setProgress({});
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
              <p className="text-xs text-muted-foreground">Cambridge O Level 4024/11 — Oct/Nov 2023</p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => { setTab('paper'); setTourActive(true); }}
              className="gap-1.5"
            >
              <Compass className="h-4 w-4" /> Guided tour
            </Button>
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
            <TabsTrigger value="learning" className="gap-2"><BarChart3 className="h-4 w-4" />Learning Analytics</TabsTrigger>
            <TabsTrigger value="demo" className="gap-2"><Sparkles className="h-4 w-4" />Demo Analytics</TabsTrigger>
          </TabsList>

          {/* ─── Paper tab ─── */}
          <TabsContent value="paper" className="mt-6">
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

          {/* ─── Learning Analytics (live from working) ─── */}
          <TabsContent value="learning" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <StatCard icon={<Target className="h-5 w-5" />} label="Progress" value={`${completionPct}%`} sub={`${solvedQs}/${totalQs} questions`} />
              <StatCard icon={<Award className="h-5 w-5" />} label="Marks" value={`${marksObtained}/${totalMarks}`} sub={`${accuracyPct}% accuracy on solved`} />
              <StatCard icon={<Brain className="h-5 w-5" />} label="AI Independence" value={`${aiIndependence}%`} sub={`${totalAi} AI hints used`} />
              <StatCard icon={<Clock className="h-5 w-5" />} label="Time on Paper" value={fmtTime(totalTime)} sub={`avg ${solvedQs ? fmtTime(totalTime / solvedQs) : '—'} / question`} />
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

      <GuidedTour steps={TOUR_STEPS} active={tourActive} onFinish={() => setTourActive(false)} />
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

