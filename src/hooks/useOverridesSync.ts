import { useEffect, useSyncExternalStore } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  setAllOverrides,
  subscribeOverrides,
  getOverridesVersion,
  type QuestionOverrideRow,
} from '@/lib/questionOverrides';

let started = false;

async function loadAll() {
  const { data, error } = await supabase
    .from('question_overrides')
    .select('paper_id, question_id, override, diagram_image_url');
  if (error) {
    console.warn('[overrides] load failed', error);
    return;
  }
  setAllOverrides((data || []) as QuestionOverrideRow[]);
}

/** Mount once at the App root. Fetches overrides and subscribes to realtime. */
export function OverridesSync() {
  useEffect(() => {
    if (started) return;
    started = true;
    loadAll();
    const ch = supabase
      .channel('question_overrides_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'question_overrides' },
        () => loadAll(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
      started = false;
    };
  }, []);
  return null;
}

/** Subscribe to overrides cache version — re-renders consumers on change. */
export function useOverridesVersion() {
  return useSyncExternalStore(subscribeOverrides, getOverridesVersion, getOverridesVersion);
}
