// Extract question text from a question image using AI vision.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Body {
  imageBase64: string; // data URL or raw base64
  mimeType?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { imageBase64, mimeType } = (await req.json()) as Body;
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'imageBase64 required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const dataUrl = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:${mimeType || 'image/png'};base64,${imageBase64}`;

    const sys =
      `You transcribe Cambridge O Level / IGCSE math question images into clean plain text.\n` +
      `STRICT RULES:\n` +
      `- Output ONLY the question wording, no explanations, no answers, no commentary.\n` +
      `- Preserve part labels exactly: (a), (b), (i), (ii), etc., each on its own line.\n` +
      `- Use proper Unicode math symbols: × ÷ − ± ° π √ ² ³ ⁿ ≤ ≥ ≠ ≈ ∞ → ↔ ∠ △.\n` +
      `- Render any fraction (including ones inside an equation) as [[num/den]] with NO extra brackets around it. Example: y = 2x + [[60/x]] − 4.\n` +
      `- Render square root over a fraction as √[[num/den]].\n` +
      `- Use plain ASCII for variables and exponents like 6x² − 2x − 9 = 0.\n` +
      `- If the image contains a table, render it as a GitHub-flavoured Markdown table with a header row, a |---|---| separator row, and one data row per table row. Every row MUST start and end with '|'. Match the exact column order and values in the image.\n` +
      `- Do NOT wrap fractions in [[ ... ]] more than once (never output [[[[..]]]] or [[ [[..]] ]]).\n` +
      `- Do NOT include diagrams; omit them silently.\n` +
      `Return ONLY the transcribed question text.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: sys },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Transcribe this question following the rules.' },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
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
    const text: string = data?.choices?.[0]?.message?.content?.trim?.() ?? '';
    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('extract-question error', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
