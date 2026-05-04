import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { pastPapers, pastPaperQuestions } from '@/lib/pastPaperData';
import {
  runDeterministicAudit,
  summarizeAudit,
  getCheckLabel,
  type AuditCheckType,
  type AuditStatus,
} from '@/lib/auditEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ClipboardCheck, Loader2, Sparkles, Save, RefreshCcw, ExternalLink, Wand2 } from 'lucide-react';
import { PastPaperWorkspace } from '@/components/PastPaperWorkspace';
import { getPastPaperQuestion } from '@/lib/pastPaperData';
import { ProgressProvider } from '@/context/ProgressContext';

const STATUS_TONE: Record<AuditStatus, string> = {
  pass: 'bg-green-500/15 text-green-300 border-green-500/30',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  fail: 'bg-red-500/15 text-red-300 border-red-500/30',
  pending: 'bg-muted text-muted-foreground border-border',
};

interface StoredReport {
  id: string;
  check_type: AuditCheckType;
  status: AuditStatus;
  source: string;
  notes: string | null;
  audited_at: string;
}

export default function AdminAudit() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paperId, setPaperId] = useState<string>(pastPapers[0]?.id ?? '');
  const paper = useMemo(() => pastPapers.find((p) => p.id === paperId), [paperId]);
  const questionIds = useMemo(
    () => Array.from(new Set(paper?.sections.map((s) => s.questionId) ?? [])),
    [paper],
  );
  const [questionId, setQuestionId] = useState<string>('');

  useEffect(() => {
    setQuestionId(questionIds[0] ?? '');
  }, [paperId, questionIds]);

  const question = questionId ? pastPaperQuestions[questionId] : undefined;
  const report = useMemo(
    () => (question ? runDeterministicAudit(paperId, question) : null),
    [paperId, question],
  );
  const counts = report ? summarizeAudit(report) : null;

  const [stored, setStored] = useState<StoredReport[]>([]);
  const [loadingStored, setLoadingStored] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [savingKey, setSavingKey] = useState<AuditCheckType | null>(null);
  const [overrideNotes, setOverrideNotes] = useState<Partial<Record<AuditCheckType, string>>>({});
  const [overrideStatus, setOverrideStatus] = useState<Partial<Record<AuditCheckType, AuditStatus>>>({});
  const [qpImg, setQpImg] = useState<string>('');
  const [msImg, setMsImg] = useState<string>('');
  const [solvedImg, setSolvedImg] = useState<string>('');
  const [aiSummary, setAiSummary] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fixLoadingKey, setFixLoadingKey] = useState<string | null>(null);
  const [fixResults, setFixResults] = useState<Record<string, string>>({});

  const fileToBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] ?? '');
    r.onerror = reject;
    r.readAsDataURL(file);
  });

  const loadStored = async () => {
    if (!paperId || !questionId) return;
    setLoadingStored(true);
    const { data, error } = await supabase
      .from('audit_reports')
      .select('*')
      .eq('paper_id', paperId)
      .eq('question_id', questionId)
      .order('audited_at', { ascending: false });
    setLoadingStored(false);
    if (error) {
      toast({ title: 'Load failed', description: error.message, variant: 'destructive' });
      return;
    }
    setStored((data ?? []) as StoredReport[]);
  };

  useEffect(() => {
    setOverrideNotes({});
    setOverrideStatus({});
    loadStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId, questionId]);

  const saveCheck = async (checkType: AuditCheckType, defaultStatus: AuditStatus, defaultNotes: string) => {
    if (!question) return;
    setSavingKey(checkType);
    const { data: userRes } = await supabase.auth.getUser();
    const status = overrideStatus[checkType] ?? defaultStatus;
    const notes = overrideNotes[checkType] ?? defaultNotes;
    const { error } = await supabase.from('audit_reports').upsert(
      {
        paper_id: paperId,
        question_id: question.id,
        check_type: checkType,
        status,
        source: 'deterministic',
        notes,
        audited_by: userRes.user?.id ?? null,
        audited_at: new Date().toISOString(),
      },
      { onConflict: 'paper_id,question_id,check_type,source' },
    );
    setSavingKey(null);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Saved', description: getCheckLabel(checkType) });
    loadStored();
  };

  const runAiVision = async () => {
    if (!question) return;
    setAiLoading(true);
    setAiSummary('');
    const { data, error } = await supabase.functions.invoke('audit-vision', {
      body: {
        paperId,
        questionId: question.id,
        questionNumber: question.questionNumber,
        questionText: question.question,
        marks: question.marks,
        hints: question.hints,
        parts: question.parts,
        equationStages: question.equationStages ?? question.equationStagesMap ?? null,
        answerKey: question.answer ?? null,
        markingCriteria: question.markingCriteria ?? null,
        hasImage: !!question.image,
        hasInteractiveDiagram: !!question.diagramParts?.length,
        qpBase64: qpImg || undefined,
        msBase64: msImg || undefined,
        solvedBase64: solvedImg || undefined,
      },
    });
    setAiLoading(false);
    if (error) {
      toast({ title: 'AI audit failed', description: error.message, variant: 'destructive' });
      return;
    }
    const verdicts = (data as any)?.verdicts;
    if (!verdicts) {
      toast({ title: 'No verdict returned', variant: 'destructive' });
      return;
    }
    setAiSummary(verdicts.summary ?? '');
    const checkKeys: AuditCheckType[] = [
      'question_fidelity', 'diagram_fidelity', 'workspace_scaffolding', 'check_work_coverage', 'submit_validation',
    ];
    const { data: userRes } = await supabase.auth.getUser();
    const rows = checkKeys
      .filter((k) => verdicts[k])
      .map((k) => ({
        paper_id: paperId,
        question_id: question.id,
        check_type: k,
        status: verdicts[k].status,
        source: 'ai_vision',
        notes: verdicts[k].notes,
        audited_by: userRes.user?.id ?? null,
        audited_at: new Date().toISOString(),
      }));
    const { error: upErr } = await supabase
      .from('audit_reports')
      .upsert(rows, { onConflict: 'paper_id,question_id,check_type,source' });
    if (upErr) {
      toast({ title: 'Save failed', description: upErr.message, variant: 'destructive' });
    } else {
      toast({ title: 'AI audit saved', description: `${rows.length} verdict(s) stored` });
      loadStored();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-3 px-4 md:px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')} className="h-9 w-9 rounded-lg">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">Content Audit</h1>
            <p className="text-xs text-muted-foreground">Per-question 5-point inspection</p>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 md:px-6 space-y-6">
        <section className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-muted-foreground">Paper</label>
            <Select value={paperId} onValueChange={setPaperId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-[60vh]">
                {pastPapers.filter((p) => !p.locked).map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Question</label>
            <Select value={questionId} onValueChange={setQuestionId}>
              <SelectTrigger><SelectValue placeholder="Pick a question" /></SelectTrigger>
              <SelectContent className="max-h-[60vh]">
                {questionIds.map((qid) => {
                  const q = pastPaperQuestions[qid];
                  return (
                    <SelectItem key={qid} value={qid}>
                      Q{q?.questionNumber ?? '?'} — {q?.title ?? qid}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </section>

        {question && report && counts && (
          <section className="rounded-xl border border-border bg-card p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">{question.id}</div>
                <h2 className="text-xl font-semibold">Q{question.questionNumber} — {question.title}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge className={STATUS_TONE.pass}>✅ {counts.pass}</Badge>
                <Badge className={STATUS_TONE.warning}>⚠️ {counts.warning}</Badge>
                <Badge className={STATUS_TONE.fail}>❌ {counts.fail}</Badge>
                <Button size="sm" variant="outline" onClick={loadStored} disabled={loadingStored}>
                  <RefreshCcw className="h-3.5 w-3.5 mr-1" /> Reload
                </Button>
                <Button size="sm" onClick={runAiVision} disabled={aiLoading}>
                  {aiLoading ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1" />}
                  Deep AI audit
                </Button>
              </div>
            </div>

            <pre className="whitespace-pre-wrap rounded-lg bg-muted/40 p-3 text-sm text-foreground">{question.question}</pre>

            {/* QP / MS / Solved page screenshots — fed to the AI vision audit */}
            <div className="rounded-lg border border-dashed border-border p-3 space-y-2">
              <div className="text-xs text-muted-foreground">
                Attach the QP, MS and (optional) Solved Paper page screenshots so AI can compare against the source of truth.
              </div>
              <div className="grid gap-2 md:grid-cols-3 text-xs">
                {([
                  ['Question Paper page', qpImg, setQpImg] as const,
                  ['Marking Scheme page', msImg, setMsImg] as const,
                  ['Solved Paper page (optional)', solvedImg, setSolvedImg] as const,
                ]).map(([label, val, setter]) => (
                  <label key={label} className="flex flex-col gap-1">
                    <span className="text-muted-foreground">{label}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return setter('');
                        setter(await fileToBase64(f));
                      }}
                      className="text-xs"
                    />
                    {val && <span className="text-green-400">✓ attached ({Math.round(val.length / 1024)} KB base64)</span>}
                  </label>
                ))}
              </div>
            </div>

            {aiSummary && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                <div className="font-medium mb-1">AI summary</div>
                <div className="text-muted-foreground whitespace-pre-wrap">{aiSummary}</div>
              </div>
            )}

            <div className="space-y-3">
              {report.results.map((r) => {
                const stored_ = stored.filter((s) => s.check_type === r.checkType);
                const status = overrideStatus[r.checkType] ?? r.status;
                const notes = overrideNotes[r.checkType] ?? r.notes;
                const issues = r.issues ?? [];
                return (
                  <div key={r.checkType} className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-medium">{getCheckLabel(r.checkType)}</div>
                      <Select
                        value={status}
                        onValueChange={(v) => setOverrideStatus((p) => ({ ...p, [r.checkType]: v as AuditStatus }))}
                      >
                        <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pass">✅ pass</SelectItem>
                          <SelectItem value="warning">⚠️ warning</SelectItem>
                          <SelectItem value="fail">❌ fail</SelectItem>
                          <SelectItem value="pending">⏳ pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {issues.length > 0 && (
                      <div className="space-y-2">
                        {issues.map((iss, i) => {
                          const fixKey = `${r.checkType}::${i}`;
                          const fixOut = fixResults[fixKey];
                          return (
                            <div key={fixKey} className="rounded-md border border-red-500/20 bg-red-500/5 p-2 text-xs space-y-1">
                              <div className="text-foreground">{iss.message}</div>
                              {(iss.ref || iss.path) && (
                                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                                  {iss.ref && <span>📍 <span className="text-foreground">{iss.ref}</span></span>}
                                  {iss.path && <code className="rounded bg-muted px-1 py-0.5 font-mono">{iss.path}</code>}
                                </div>
                              )}
                              {iss.suggestion && (
                                <div className="text-amber-300/90">💡 {iss.suggestion}</div>
                              )}
                              <div className="flex items-center gap-2 pt-1">
                                <Button
                                  size="sm" variant="outline" className="h-7 text-xs"
                                  onClick={() => setPreviewOpen(true)}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" /> Open in workspace
                                </Button>
                                <Button
                                  size="sm" className="h-7 text-xs"
                                  disabled={fixLoadingKey === fixKey}
                                  onClick={async () => {
                                    setFixLoadingKey(fixKey);
                                    const { data, error } = await supabase.functions.invoke('audit-suggest-fix', {
                                      body: {
                                        paperId, questionId: question.id, checkType: r.checkType,
                                        issue: iss,
                                        questionSnippet: question.question?.slice(0, 600),
                                        contextSnippet: JSON.stringify({
                                          parts: question.parts,
                                          equationStages: question.equationStages,
                                          equationStagesMap: question.equationStagesMap,
                                          answer: question.answer,
                                          markingCriteria: question.markingCriteria,
                                        }, null, 2).slice(0, 4000),
                                      },
                                    });
                                    setFixLoadingKey(null);
                                    if (error) {
                                      toast({ title: 'Suggest fix failed', description: error.message, variant: 'destructive' });
                                      return;
                                    }
                                    setFixResults((p) => ({ ...p, [fixKey]: (data as any)?.fix ?? 'No fix returned.' }));
                                  }}
                                >
                                  {fixLoadingKey === fixKey ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Wand2 className="h-3 w-3 mr-1" />}
                                  Suggest fix
                                </Button>
                              </div>
                              {fixOut && (
                                <pre className="mt-1 whitespace-pre-wrap rounded bg-muted/50 p-2 text-foreground">{fixOut}</pre>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <Textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setOverrideNotes((p) => ({ ...p, [r.checkType]: e.target.value }))}
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {stored_.length === 0
                          ? 'Not yet saved.'
                          : stored_.map((s) => `${s.source}:${s.status} (${new Date(s.audited_at).toLocaleString()})`).join(' · ')}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => saveCheck(r.checkType, r.status, r.notes)} disabled={savingKey === r.checkType}>
                        {savingKey === r.checkType ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1" />}
                        Save
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {question && (() => {
          const liveQ = getPastPaperQuestion(question.id);
          return liveQ ? (
            <PastPaperWorkspace
              question={liveQ}
              isOpen={previewOpen}
              onClose={() => setPreviewOpen(false)}
              workspaceMode="general"
            />
          ) : null;
        })()}
      </main>
    </div>
  );
}
