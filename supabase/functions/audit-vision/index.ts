// AI vision audit: compares a single question (text + answer) against the QP/MS PDF
// page via Gemini multimodal. Returns a structured per-check verdict.
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
  answerKey?: unknown;
  qpUrl?: string; // optional: image URL of QP page
  msUrl?: string; // optional: image URL of MS page
  qpBase64?: string; // optional inline png/jpg base64
  msBase64?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    // Auth: require admin
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { data: roleRow } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: 'Admin only' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Body;
    if (!body.questionText || !body.questionId) {
      return new Response(JSON.stringify({ error: 'questionText and questionId required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const userParts: Array<Record<string, unknown>> = [
      {
        type: 'text',
        text:
          `You are auditing a Cambridge past-paper question against the official Question Paper and Marking Scheme.\n\n` +
          `PAPER: ${body.paperId}\nQUESTION ${body.questionNumber} (id ${body.questionId})\n\n` +
          `RENDERED QUESTION TEXT:\n${body.questionText}\n\n` +
          `ANSWER KEY:\n${JSON.stringify(body.answerKey ?? null, null, 2)}\n\n` +
          `Compare against the attached QP page (and MS page if provided).\n` +
          `Return verdicts for: question_fidelity, diagram_fidelity, submit_validation.\n` +
          `Use status pass/warning/fail and one short note per check.`,
      },
    ];
    const pushImg = (url?: string, b64?: string) => {
      if (url) userParts.push({ type: 'image_url', image_url: { url } });
      else if (b64) userParts.push({ type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } });
    };
    pushImg(body.qpUrl, body.qpBase64);
    pushImg(body.msUrl, body.msBase64);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: 'You are a meticulous Cambridge past-paper auditor. Always respond via the provided tool.' },
          { role: 'user', content: userParts },
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'report_audit',
              description: 'Return per-check verdicts.',
              parameters: {
                type: 'object',
                properties: {
                  question_fidelity: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', enum: ['pass', 'warning', 'fail'] },
                      notes: { type: 'string' },
                    },
                    required: ['status', 'notes'],
                  },
                  diagram_fidelity: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', enum: ['pass', 'warning', 'fail'] },
                      notes: { type: 'string' },
                    },
                    required: ['status', 'notes'],
                  },
                  submit_validation: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', enum: ['pass', 'warning', 'fail'] },
                      notes: { type: 'string' },
                    },
                    required: ['status', 'notes'],
                  },
                },
                required: ['question_fidelity', 'diagram_fidelity', 'submit_validation'],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'report_audit' } },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error('AI gateway error', response.status, t);
      if (response.status === 429)
        return new Response(JSON.stringify({ error: 'Rate limited, try again.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      if (response.status === 402)
        return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
