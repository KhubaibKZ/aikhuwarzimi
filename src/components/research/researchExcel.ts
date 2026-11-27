import * as XLSX from 'xlsx';
import { researchMetrics, type ResearchParticipant } from '@/lib/research';

const qNum = (id: string) => id.match(/q(\d+)$/)?.[1] ?? id;
const dt = (s?: string | null) => (s ? new Date(s).toLocaleString() : '');

export function exportResearchExcel(participants: ResearchParticipant[], filename = 'research-data.xlsx') {
  const summary = participants.map(p => {
    const m = researchMetrics(p.submissions);
    return {
      Name: p.name, 'Participant ID': p.id, 'Questions Completed': m.solved, 'Total Attempts': m.attempts,
      'Marks Obtained': m.marks, 'Marks Available': m.available, 'Accuracy %': m.accuracy,
      'Hints Used': m.hints, 'Check Work Used': m.checks, ADI: m.adi,
      'Total Time (s)': m.time, 'Average Time (s)': m.averageTime,
      Joined: dt(p.created_at), 'Last Active': dt(p.last_active_at),
    };
  });
  const attempts = participants.flatMap(p => p.submissions.map(s => ({
    Name: p.name, Question: `Q${qNum(s.question_id)}`, Status: s.reset_at ? 'Reset (retained)' : 'Current',
    'Submitted At': dt(s.submitted_at), 'Reset At': dt(s.reset_at),
    'Marks Obtained': s.payload.marksObtained ?? 0, 'Marks Available': s.payload.marksAvailable ?? 0,
    Correct: s.payload.isCorrect ? 'Yes' : 'No', 'Hints Used': s.payload.aiUsageCount ?? 0,
    'Check Work Used': s.payload.checkworkCount ?? 0, 'Time (s)': s.payload.timeSpentSeconds ?? 0,
  })));
  const answers = participants.flatMap(p => p.submissions.flatMap(s =>
    Object.entries(s.payload.submittedAnswers || {}).map(([box, value]) => ({
      Name: p.name, Question: `Q${qNum(s.question_id)}`, Status: s.reset_at ? 'Reset (retained)' : 'Current',
      'Submitted At': dt(s.submitted_at), Box: box, Answer: value,
    }))));
  const wb = XLSX.utils.book_new();
  const add = (rows: object[], name: string) => {
    const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ Note: 'No data' }]);
    const keys = Object.keys(rows[0] || { Note: '' });
    ws['!cols'] = keys.map(k => ({ wch: Math.max(k.length, ...rows.map(r => String((r as Record<string, unknown>)[k] ?? '').length)) + 2 }));
    XLSX.utils.book_append_sheet(wb, ws, name);
  };
  add(summary, 'Participants Summary');
  add(attempts, 'Submissions');
  add(answers, 'Answers');
  XLSX.writeFile(wb, filename);
}
