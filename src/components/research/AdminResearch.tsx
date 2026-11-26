import { useEffect, useState } from 'react';
import { Download, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { researchMetrics, RESEARCH_PAPER_ID, type ResearchParticipant, type ResearchSubmission } from '@/lib/research';
import { pastPapers, getPastPaperQuestion } from '@/lib/pastPaperData';
import { ResearchResults, researchTime } from './ResearchResults';

// Page through the Data API so older participants and attempts remain accessible.
async function loadAllParticipants() {
  const rows: Omit<ResearchParticipant, 'submissions'>[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase.from('research_participants').select('id,name,created_at,last_active_at').order('created_at', { ascending: false }).order('id').range(offset, offset + 499);
    if (error) throw error;
    rows.push(...(data || []));
    if (!data || data.length < 500) return rows;
  }
}
async function loadAllSubmissions() {
  const rows: ResearchSubmission[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase.from('research_submissions').select('*').order('submitted_at', { ascending: true }).order('id').range(offset, offset + 499);
    if (error) throw error;
    rows.push(...((data || []) as unknown as ResearchSubmission[]));
    if (!data || data.length < 500) return rows;
  }
}

export function AdminResearch() {
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const [participants, setParticipants] = useState<ResearchParticipant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const paper = pastPapers.find(p => p.id === RESEARCH_PAPER_ID);
  const selected = participants.find(p => p.id === selectedId);
  const load = async () => {
    setLoading(true); setError('');
    try {
      const [people, submissions] = await Promise.all([loadAllParticipants(), loadAllSubmissions()]);
      setParticipants(people.map(p => ({ ...p, submissions: submissions.filter(s => s.participant_id === p.id) })));
    } catch { setError('Research records could not be loaded. Please retry.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { if (isAdmin) void load(); }, [isAdmin]);
  const download = () => {
    const data = selected ? [selected] : participants;
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'research-submissions.json'; a.click(); URL.revokeObjectURL(url);
  };
  if (roleLoading) return <p className="py-8 text-muted-foreground">Checking access…</p>;
  if (!isAdmin) return <p className="py-8 text-muted-foreground">Sign in with your admin account to view private Research participants and submissions.</p>;
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold text-foreground">Research</h2><p className="text-sm text-muted-foreground">{participants.length} participants · {participants.reduce((n, p) => n + p.submissions.length, 0)} submissions</p></div>
      <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" asChild><a href="https://aikhuwarizmi.io/research" target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Open Research</a></Button><Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button><Button variant="outline" size="sm" onClick={download} disabled={!participants.length}><Download className="mr-2 h-4 w-4" />Export</Button></div>
    </div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Input placeholder="Search participants" aria-label="Search participants" value={search} onChange={e => setSearch(e.target.value)} />
    <div className="overflow-x-auto rounded-lg border border-border"><Table><TableHeader><TableRow><TableHead>Participant</TableHead><TableHead>Progress</TableHead><TableHead>Accuracy</TableHead><TableHead>AI Dependence</TableHead><TableHead>Time</TableHead><TableHead>Joined</TableHead><TableHead /></TableRow></TableHeader><TableBody>
      {participants.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => { const m = researchMetrics(p.submissions); return <TableRow key={p.id}><TableCell><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.id.slice(0, 8)}</p></TableCell><TableCell>{m.solved}/{paper?.sections.length ?? 0}</TableCell><TableCell>{m.accuracy}%</TableCell><TableCell>{m.adi.toFixed(3)}</TableCell><TableCell className="whitespace-nowrap">{researchTime(m.time)}</TableCell><TableCell className="whitespace-nowrap">{p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}</TableCell><TableCell><Button size="sm" variant="outline" onClick={() => setSelectedId(p.id)}>View submissions</Button></TableCell></TableRow>; })}
    </TableBody></Table>{loading && <p className="p-5 text-sm text-muted-foreground">Loading research records…</p>}{!loading && !participants.length && <p className="p-5 text-sm text-muted-foreground">No participants yet.</p>}</div>
    {selected && <section className="space-y-5 border-t border-border pt-6"><h3 className="text-lg font-bold text-foreground">{selected.name} · Submissions</h3><ResearchResults submissions={selected.submissions} questionCount={paper?.sections.length ?? 0} history />
      {selected.submissions.map(s => <details key={s.id} className="border-b border-border pb-4"><summary className="cursor-pointer text-sm font-medium text-foreground">Q{getPastPaperQuestion(s.question_id)?.questionNumber} · {new Date(s.submitted_at).toLocaleString()} · {s.reset_at ? 'Previous attempt' : 'Submitted answers'}</summary><dl className="mt-3 grid gap-2 sm:grid-cols-2">{Object.entries(s.payload.submittedAnswers || {}).map(([key, value]) => <div key={key} className="min-w-0 rounded-md bg-muted p-3"><dt className="break-all text-xs text-muted-foreground">{key}</dt><dd className="mt-1 break-words font-mono text-sm text-foreground">{value}</dd></div>)}</dl></details>)}
    </section>}
  </div>;
}