import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UsageTrackerOptions {
  enabled: boolean;
  accountType: 'student' | 'demo';
  userId?: string | null;
  displayName?: string | null;
  email?: string | null;
}

const HEARTBEAT_MS = 20_000;

/**
 * Logs a usage session (who, when, and how long) to the usage_sessions table.
 * Creates one row when enabled, then periodically updates its duration via a
 * heartbeat, on tab-hide, and on unload. Used for both logged-in students and
 * anonymous demo visitors.
 */
export function useUsageTracker({
  enabled,
  accountType,
  userId,
  displayName,
  email,
}: UsageTrackerOptions) {
  const sessionIdRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const start = async () => {
      startRef.current = Date.now();
      const id = crypto.randomUUID();
      // Per-session secret used to prove ownership of demo rows on update.
      const token = accountType === 'demo' ? crypto.randomUUID() + crypto.randomUUID() : null;
      const { error } = await supabase
        .from('usage_sessions')
        .insert({
          id,
          account_type: accountType,
          user_id: userId ?? null,
          display_name: displayName ?? null,
          email: email ?? null,
          duration_seconds: 0,
          session_token: token,
        });
      if (!error && !cancelled) {
        sessionIdRef.current = id;
        tokenRef.current = token;
      }
    };

    const beat = async () => {
      if (!sessionIdRef.current) return;
      const seconds = Math.floor((Date.now() - startRef.current) / 1000);
      if (accountType === 'demo') {
        if (!tokenRef.current) return;
        await supabase.rpc('update_demo_session', {
          _id: sessionIdRef.current,
          _token: tokenRef.current,
          _duration_seconds: seconds,
        });
      } else {
        await supabase
          .from('usage_sessions')
          .update({ duration_seconds: seconds, last_active_at: new Date().toISOString() })
          .eq('id', sessionIdRef.current);
      }
    };

    start();
    const interval = setInterval(beat, HEARTBEAT_MS);
    const onHide = () => { if (document.visibilityState === 'hidden') beat(); };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('beforeunload', beat);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('beforeunload', beat);
      beat();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, accountType, userId, displayName, email]);
}

