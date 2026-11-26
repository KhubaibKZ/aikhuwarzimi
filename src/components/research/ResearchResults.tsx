import { researchMetrics, type ResearchSubmission } from '@/lib/research';
import { getPastPaperQuestion } from '@/lib/pastPaperData';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tdiStatus } from '@/lib/aiDependenceIndex';

export const researchTime = (seconds: number) => `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;

export function ResearchResults({ submissions, questionCount, history = false }: { submissions: ResearchSubmission[]; questionCount: number; history?: boolean }) {
  const m = researchMetrics(submissions);
  const rows = history ? submissions : submissions.filter(s => !s.reset_at);
  return <div className="space-y-6">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[
        ['Progress', `${m.solved}/${questionCount}`, `${m.attempts} saved attempts`],
        ['Marks Obtained', `${m.marks}/${m.available}`, `${m.accuracy}% accuracy`],
        ['AI Dependence Index', m.adi.toFixed(3), `${m.hints} hints · ${m.checks} Check Work`],
        ['Average Time', researchTime(m.averageTime), `${researchTime(m.time)} total`],
      ].map(([label, value, sub]) => <Card key={label}><CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold text-foreground">{value}</p><p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        {label === 'AI Dependence Index' && <p className="mt-1 text-xs text-primary">{m.solved ? tdiStatus(m.adi).label : '—'}</p>}
      </CardContent></Card>)}
    </div>
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table><TableHeader><TableRow><TableHead>Question</TableHead><TableHead>Marks</TableHead><TableHead>Accuracy</TableHead><TableHead>Hints / Checks</TableHead><TableHead>Time</TableHead>{history && <><TableHead>Submitted</TableHead><TableHead>Status</TableHead></>}</TableRow></TableHeader>
        <TableBody>{rows.map(s => <TableRow key={s.id}><TableCell>Q{getPastPaperQuestion(s.question_id)?.questionNumber}</TableCell><TableCell>{s.payload.marksObtained}/{s.payload.marksAvailable}</TableCell><TableCell>{s.payload.accuracyScore}%</TableCell><TableCell>{s.payload.aiUsageCount} / {s.payload.checkworkCount}</TableCell><TableCell>{researchTime(s.payload.timeSpentSeconds)}</TableCell>{history && <><TableCell className="whitespace-nowrap">{new Date(s.submitted_at).toLocaleString()}</TableCell><TableCell>{s.reset_at ? 'Reset (retained)' : 'Submitted'}</TableCell></>}</TableRow>)}</TableBody>
      </Table>
      {!rows.length && <p className="p-6 text-center text-sm text-muted-foreground">No submissions yet.</p>}
    </div>
  </div>;
}