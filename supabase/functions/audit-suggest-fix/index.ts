// Suggest a concrete fix for a single audit issue.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const auth = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: auth } } },
    );
    const { data: u } = await supabase.auth.getUser();
    if (!u?.user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    const { data: role } = await supabase.from('user_roles').select('role').eq('user_id', u.user.id).eq('role', 'admin').maybeSingle();
    if (!role) return new Response(JSON.stringify({ error: 'Admin only' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const { questionId, paperId, checkType, issue, questionSnippet, contextSnippet } = await req.json();
    const KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!KEY) throw new Error('LOVABLE_API_KEY not configured');

    const sys = `You are a Cambridge past-paper content engineer. Given a single audit issue, return a SHORT concrete fix the developer can apply to the question definition (TypeScript object). Be specific: name the field, give the corrected value, no preamble.

Context-aware rules you MUST apply before suggesting a fix:
- "figures" in phrases like "to 3 figures" / "to 3 significant figures" / "to 2 decimal places" refers to rounding, NOT a diagram. Do not propose adding a diagram for these.
- If the official MS for this part only lists a final answer (no M1/A1/B1), do NOT propose adding markingCriteria — instead reply: "No fix needed — MS is answer-only for this part."
- If the issue contradicts the actual QP/MS (e.g. flags a missing diagram on a sig-fig question), reply: "False positive — <one-line reason>." and suggest no code change.`;
    const user =
`PAPER: ${paperId}
QUESTION: ${questionId}
CHECK: ${checkType}

ISSUE: ${issue.message}
LOCATION: ${issue.ref ?? '(unknown)'}
PATH: ${issue.path ?? '(unknown)'}
HEURISTIC SUGGESTION: ${issue.suggestion ?? '(none)'}

QUESTION SNIPPET:
${questionSnippet ?? ''}

CONTEXT:
${contextSnippet ?? ''}

Return:
1) Root cause (one sentence)
2) Exact fix (field path + new value, code-style)
3) Why it satisfies the audit rule (one sentence)`;

    const r = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'system', content: sys }, { role: 'user', content: user }],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      const status = r.status === 429 ? 429 : r.status === 402 ? 402 : 500;
      return new Response(JSON.stringify({ error: status === 429 ? 'Rate limited' : status === 402 ? 'AI credits exhausted' : 'AI gateway error', detail: t }), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const j = await r.json();
    const fix = j?.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ fix }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
