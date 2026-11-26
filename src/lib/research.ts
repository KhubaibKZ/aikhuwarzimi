import type { SubmitProgressPayload } from '@/components/PastPaperWorkspace';
import { computeTDI } from '@/lib/aiDependenceIndex';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export const RESEARCH_ACCESS_KEY = 'research_access_v1';
export const RESEARCH_PAPER_ID = 'test_linear_inequalities_pre';
export interface ResearchSubmission {
  id: string;
  participant_id?: string;
  paper_id: string;
  question_id: string;
  payload: SubmitProgressPayload;
  submitted_at: string;
  reset_at: string | null;
}
export interface ResearchParticipant {
  id: string;
  name: string;
  created_at?: string;
  last_active_at?: string;
  submissions: ResearchSubmission[];
}
export function createResearchToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
}
export function researchCurrent(submissions: ResearchSubmission[]) {
  return Object.fromEntries(submissions.filter(s => !s.reset_at).map(s => [s.question_id, s]));
}
export function researchMetrics(submissions: ResearchSubmission[]) {
  const current = Object.values(researchCurrent(submissions));
  const sum = (key: 'marksObtained' | 'marksAvailable' | 'timeSpentSeconds' | 'aiUsageCount' | 'checkworkCount') =>
    current.reduce((n, s) => n + (Number(s.payload[key]) || 0), 0);
  const marks = sum('marksObtained');
  const available = sum('marksAvailable');
  const hints = sum('aiUsageCount');
  const checks = sum('checkworkCount');
  const time = sum('timeSpentSeconds');
  return { solved: current.length, attempts: submissions.length, marks, available, accuracy: available ? Math.round(marks / available * 100) : 0,
    hints, checks, time, averageTime: current.length ? Math.round(time / current.length) : 0, adi: computeTDI(hints, checks, current.length) };
}
export async function resumeResearch(token: string): Promise<ResearchParticipant> {
  const { data, error } = await supabase.rpc('research_resume', { p_token: token });
  if (error) throw error;
  return data as unknown as ResearchParticipant;
}
export async function saveResearch(token: string, id: string, payload: SubmitProgressPayload) {
  const { error } = await supabase.rpc('research_submit', { p_token: token, p_attempt_id: id, p_payload: payload as unknown as Json });
  if (error) throw error;
}