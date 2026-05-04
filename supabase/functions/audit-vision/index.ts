// AI vision audit: full 5-check pass against QP/MS page images.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Body {
  paperId: string;
  questionId: string;
  questionNumber: string;
  questionText: string;
  marks?: number;
  hints?: string[];
  parts?: { label: string; key: string; marks: number }[];
  equationStages?: unknown;
  answerKey?: unknown;
  markingCriteria?: unknown;
  hasImage?: boolean;
  hasInteractiveDiagram?: boolean;
  qpBase64?: string; // QP page screenshot
  msBase64?: string; // MS page screenshot
  solvedBase64?: string; // SOLVED page screenshot (optional)
}

const verdictSchema = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['pass', 'warning', 'fail'] },
    notes: { type: 'string', description: 'One short paragraph explaining the verdict and exact discrepancy if any.' },
  },
  required: ['status', 'notes'],
  additionalProperties: false,
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { data: roleRow } = await supabase
      .from('user_roles').select('role')
      .eq('user_id', userData.user.id).eq('role', 'admin').maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: 'Admin only' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Body;
    if (!body.questionText || !body.questionId) {
      return new Response(JSON.stringify({ error: 'questionText and questionId required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const sys =
      `You are a meticulous Cambridge O Level / IGCSE past-paper auditor.\n` +
      `You will be shown the rendered question metadata from a learning app, plus screenshots of:\n` +
      `  • the official Question Paper page (QP)\n` +
      `  • the official Marking Scheme page (MS)\n` +
      `  • optionally the Solved Paper page\n\n` +
      `Audit against this strict 5-point definition. ALWAYS ground every verdict in the attached QP and MS images — never guess. If QP/MS aren't attached, lower confidence and say so.\n` +
      `1. question_fidelity — wording, symbols, numbers and formatting EXACTLY match QP. Any drift = fail. Be context-aware: words like "figures" can mean *significant figures* (e.g. "to 3 figures") and do NOT imply a diagram.\n` +
      `2. diagram_fidelity — only flag missing diagrams when the QP actually shows one. Phrases like "give your answer to N significant figures / decimal places / nearest whole number" are NOT diagram references. Confirm visually from the QP image.\n` +
      `3. workspace_scaffolding — only blank fillable boxes; no pre-filled steps, no instructional text inside the workspace. Structure must mirror the SOLVED paper's box layout.\n` +
      `4. check_work_coverage — every solving step has a stepKey and a corresponding answer entry so adaptive feedback can fire on each.\n` +
      `5. submit_validation — answer keys must match the MS exactly. IMPORTANT: if the MS only lists a final answer (no M1/A1/B1 breakdown — typical for 1-mark parts), then markingCriteria are NOT required and their absence must NOT be flagged. Only require markingCriteria when the MS itself awards method marks (M, A, B). Always provide "oe" alternatives where the MS lists equivalent forms.\n\n` +
      `Be SPECIFIC in notes: quote the exact word/number from the QP or MS that differs (or confirms the app is correct). For each non-pass verdict, embed a concrete fix the developer can paste into the question definition. Always respond via the tool.`;

    const userParts: Array<Record<string, unknown>> = [
      {
        type: 'text',
        text:
          `PAPER: ${body.paperId}\nQUESTION ${body.questionNumber} — id ${body.questionId}\nMarks: ${body.marks ?? '?'}\n\n` +
          `RENDERED QUESTION TEXT:\n${body.questionText}\n\n` +
          `PARTS:\n${JSON.stringify(body.parts ?? [], null, 2)}\n\n` +
          `EQUATION STAGES (workspace scaffold):\n${JSON.stringify(body.equationStages ?? null, null, 2)}\n\n` +
          `ANSWER KEY:\n${JSON.stringify(body.answerKey ?? null, null, 2)}\n\n` +
          `MARKING CRITERIA:\n${JSON.stringify(body.markingCriteria ?? null, null, 2)}\n\n` +
          `HINTS:\n${JSON.stringify(body.hints ?? [], null, 2)}\n\n` +
          `Has static image: ${body.hasImage ? 'yes' : 'no'}\n` +
          `Has interactive diagram: ${body.hasInteractiveDiagram ? 'yes' : 'no'}\n`,
      },
    ];
    const pushImg = (label: string, b64?: string) => {
      if (b64) {
        userParts.push({ type: 'text', text: `--- ${label} ---` });
        userParts.push({ type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } });
      }
    };
    pushImg('QUESTION PAPER PAGE', body.qpBase64);
    pushImg('MARKING SCHEME PAGE', body.msBase64);
    pushImg('SOLVED PAPER PAGE', body.solvedBase64);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: userParts },
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'report_audit',
            description: 'Return per-check verdicts for all 5 audit checks.',
            parameters: {
              type: 'object',
              properties: {
                question_fidelity: verdictSchema,
                diagram_fidelity: verdictSchema,
                workspace_scaffolding: verdictSchema,
                check_work_coverage: verdictSchema,
                submit_validation: verdictSchema,
                summary: { type: 'string', description: 'One-paragraph overall summary.' },
              },
              required: ['question_fidelity', 'diagram_fidelity', 'workspace_scaffolding', 'check_work_coverage', 'submit_validation', 'summary'],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: 'function', function: { name: 'report_audit' } },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error('AI gateway error', response.status, t);
      if (response.status === 429)
        return new Response(JSON.stringify({ error: 'Rate limited, try again.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      if (response.status === 402)
        return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      return new Response(JSON.stringify({ error: 'AI gateway error', detail: t }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const data = await response.json();
    const tc = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = tc ? JSON.parse(tc) : null;
    return new Response(JSON.stringify({ verdicts: parsed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('audit-vision error', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
