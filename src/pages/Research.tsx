import { useEffect, useRef, useState } from 'react';
import { BarChart3, CheckCircle2, ClipboardCheck, FlaskConical, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ProgressProvider } from '@/context/ProgressContext';
import { PastPaperWorkspace, type SubmitProgressPayload } from '@/components/PastPaperWorkspace';
import { pastPapers, getPastPaperQuestion } from '@/lib/pastPaperData';
import { supabase } from '@/integrations/supabase/client';
import { createResearchToken, RESEARCH_ACCESS_KEY, RESEARCH_PAPER_ID, researchCurrent, researchMetrics, resumeResearch, saveResearch, type ResearchParticipant } from '@/lib/research';
import { ResearchResults } from '@/components/research/ResearchResults';

function ResearchInner() {
  const [token, setToken] = useState(() => localStorage.getItem(RESEARCH_ACCESS_KEY) || '');
  const [participant, setParticipant] = useState<ResearchParticipant | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(!!token);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const pendingRef = useRef<{ id: string; payload: SubmitProgressPayload } | null>(null);
  const paper = pastPapers.find(p => p.id === RESEARCH_PAPER_ID);
  const pendingKey = `research_pending:${token}`;

  const load = async (access: string) => {
    const data = await resumeResearch(access);
    setParticipant(data);
  };
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const restore = async () => {
      setLoading(true); setError('');
      try {
        const pending = localStorage.getItem(`research_pending:${token}`);
        if (pending) {
          const attempt = JSON.parse(pending) as { id: string; payload: SubmitProgressPayload };
          pendingRef.current = attempt;
          await saveResearch(token, attempt.id, attempt.payload);
          localStorage.removeItem(`research_pending:${token}`);
          pendingRef.current = null;
        }
        const data = await resumeResearch(token);
        if (!cancelled) setParticipant(data);
      } catch { if (!cancelled) setError('Your records could not be loaded. Please retry.'); }
      finally { if (!cancelled) setLoading(false); }
    };
    void restore();
    return () => { cancelled = true; };
  }, [token]);

  const join = async () => {
    if (!name.trim() || loading) return;
    setLoading(true); setError('');
    const access = createResearchToken();
    try {
      const { error: joinError } = await supabase.rpc('research_join', { p_name: name.trim(), p_token: access });
      if (joinError) throw joinError;
      localStorage.setItem(RESEARCH_ACCESS_KEY, access);
      setToken(access);
    } catch { setError('Could not start your research session. Please try again.'); setLoading(false); }
  };
  const submit = async (payload: SubmitProgressPayload) => {
    const attempt = pendingRef.current || { id: crypto.randomUUID(), payload };
    pendingRef.current = attempt;
    localStorage.setItem(pendingKey, JSON.stringify(attempt));
    setSaving(true); setError('');
    try {
      await saveResearch(token, attempt.id, attempt.payload);
      localStorage.removeItem(pendingKey); pendingRef.current = null;
      await load(token);
    } catch { setError('Your submission is waiting to be saved. Keep this page open and retry.'); }
    finally { setSaving(false); }
  };
  const retry = async () => {
    if (pendingRef.current) { await submit(pendingRef.current.payload); return; }
    setLoading(true); setError('');
    try { await load(token); } catch { setError('Your records could not be loaded. Please retry.'); }
    finally { setLoading(false); }
  };

  if (!participant) return <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <Card className="w-full max-w-md"><CardContent className="p-7">
      <img src={logo} alt="AI Khuwarizmi" className="mx-auto mb-5 h-16 w-16 object-contain" />
      <h1 className="text-center text-2xl font-bold text-foreground">Research</h1>
      {!token && <form onSubmit={e => { e.preventDefault(); void join(); }} className="mt-6 space-y-4">
        <label htmlFor="participant-name" className="block text-sm text-foreground">Participant name</label>
        <Input id="participant-name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} maxLength={60} required />
        <p className="text-xs text-muted-foreground">Your name, submitted answers, marks, time, and AI usage will be saved for the research administrator.</p>
        <Button className="w-full gap-2" disabled={loading || !name.trim()} type="submit">{loading && <Loader2 className="h-4 w-4 animate-spin" />}Start Research</Button>
      </form>}
      {loading && token && <p className="mt-6 text-center text-muted-foreground">Loading your research…</p>}
      {error && <div role="alert" className="mt-4 space-y-3"><p className="text-sm text-destructive">{error}</p>{token && <Button onClick={() => void retry()} disabled={loading}>Retry</Button>}</div>}
    </CardContent></Card>
  </div>;
  if (!paper) return <p className="p-8">Practice Material is unavailable.</p>;
  const current = researchCurrent(participant.submissions);
  const metrics = researchMetrics(participant.submissions);
  const question = openId ? getPastPaperQuestion(openId) : null;
  const record = openId ? current[openId]?.payload : undefined;
  return <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-card"><div className="container flex flex-wrap items-center justify-between gap-3 px-4 py-4">
      <div className="flex items-center gap-3"><img src={logo} alt="AI Khuwarizmi" className="h-11 w-11 object-contain" /><div><h1 className="text-lg font-bold text-foreground">AI KHUWARIZMI · Research</h1><p className="text-sm text-muted-foreground">{participant.name}</p></div></div>
      <Button variant="ghost" size="sm" disabled={saving || !!pendingRef.current} onClick={() => { if (confirm('Start a session for a new participant?')) { localStorage.removeItem(RESEARCH_ACCESS_KEY); setToken(''); setParticipant(null); setName(''); } }}>New participant</Button>
    </div></header>
    <main className="container max-w-6xl px-4 py-6">
      {error && <div role="alert" className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-destructive p-3 text-sm text-destructive">{error}<Button variant="outline" size="sm" disabled={saving} onClick={() => void retry()}>Retry saving</Button></div>}
      <p role="status" className="mb-4 text-xs text-muted-foreground">{saving ? 'Saving submission…' : pendingRef.current ? 'Submission not yet saved' : 'Research records saved'}</p>
      <Tabs defaultValue="practice"><TabsList className="mb-6 grid w-full max-w-md grid-cols-2"><TabsTrigger value="practice" className="gap-2"><ClipboardCheck className="h-4 w-4" />Practice Material</TabsTrigger><TabsTrigger value="analytics" className="gap-2"><BarChart3 className="h-4 w-4" />Analytics</TabsTrigger></TabsList>
        <TabsContent value="practice">
          <div className="mb-6 border-b border-border pb-6"><div className="flex items-start justify-between gap-4"><div><h2 className="text-2xl font-bold text-foreground">{paper.title}</h2><p className="mt-2 text-sm text-muted-foreground">{paper.duration} · {paper.totalMarks} marks · {paper.sections.length} questions</p></div><FlaskConical className="h-7 w-7 shrink-0 text-primary" /></div><Progress value={metrics.solved / paper.sections.length * 100} className="mt-5 h-2" /><p className="mt-2 text-xs text-muted-foreground">{metrics.solved}/{paper.sections.length} questions submitted</p></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{paper.sections.map(section => <Button key={section.id} variant="outline" disabled={saving || !!pendingRef.current} onClick={() => setOpenId(section.questionId)} className={`h-auto min-h-24 flex-col items-start gap-2 whitespace-normal p-4 text-left ${current[section.questionId] ? 'border-success/50 bg-success/5 text-success' : ''}`}>
            <span className="flex w-full items-center justify-between gap-2"><span className="font-bold">Q{getPastPaperQuestion(section.questionId)?.questionNumber}</span>{current[section.questionId] && <CheckCircle2 className="h-4 w-4" />}</span>
            <span className="text-xs text-muted-foreground">{getPastPaperQuestion(section.questionId)?.title}</span>
            {current[section.questionId] && <span className="text-xs">Submitted · {current[section.questionId].payload.marksObtained}/{current[section.questionId].payload.marksAvailable} marks</span>}
          </Button>)}</div>
        </TabsContent>
        <TabsContent value="analytics"><ResearchResults submissions={participant.submissions} questionCount={paper.sections.length} /></TabsContent>
      </Tabs>
    </main>
    {question && <PastPaperWorkspace key={question.id} question={question} isOpen onClose={() => setOpenId(null)} persistAccountProgress={false} onSubmitProgress={payload => { void submit(payload); }} restoredSubmission={record?.submittedAnswers ? { answers: record.submittedAnswers, timeSpentSeconds: record.timeSpentSeconds } : null} onResetExternal={async () => {
      if (pendingRef.current) throw new Error('Save the pending submission first');
      const { error: resetError } = await supabase.rpc('research_reset', { p_token: token, p_question_id: question.id });
      if (resetError) throw resetError;
      await load(token);
    }} />}
  </div>;
}

export default function Research() { return <ProgressProvider><ResearchInner /></ProgressProvider>; }