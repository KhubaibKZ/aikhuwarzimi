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

function cleanExtractedQuestion(raw: string) {
  return raw
    .trim()
    .replace(/^```(?:text|markdown)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .replace(/\r\n/g, '\n')
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, '[[$1/$2]]')
    .replace(/\[\[\s*\[\[([^\]]+?)\]\]\s*\]\]/g, '[[$1]]')
    .replace(/\[\[\s*\(?\s*([^\]/]+?)\s*\)?\s*\/\s*\(?\s*([^\]]+?)\s*\)?\s*\]\]/g, '[[$1/$2]]')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
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
      `You are an OCR transcription engine for Cambridge O Level / IGCSE maths exam questions.\n` +
      `STRICT RULES:\n` +
      `- Output ONLY what is visible in the image. Do not solve, infer, paraphrase, correct, or add missing values.\n` +
      `- Preserve the exact wording, line breaks, numbers, variables, signs, punctuation, and table values from the image.\n` +
      `- Preserve part labels exactly: (a), (b), (i), (ii), etc., each on its own line.\n` +
      `- Use proper Unicode math symbols where they are visible: × ÷ − ± ° π √ ² ³ ⁿ ≤ ≥ ≠ ≈ ∞ → ↔ ∠ △.\n` +
      `- Use the normal keyboard hyphen-minus '-' only when the image shows a typed minus/hyphen in text; do not change visible signs.\n` +
      `- Render any fraction (including ones inside an equation) as [[num/den]] with NO extra brackets around it. Example: y = 2x + [[60/x]] − 4.\n` +
      `- Render square root over a fraction as √[[num/den]].\n` +
      `- Use plain ASCII for variables and exponents like 6x² − 2x − 9 = 0.\n` +
      `- If the image contains a table, render ONLY the visible table rows as a Markdown table. Use the first visible row as the first table row, then a |---|---| separator row with the same number of columns, then the remaining visible rows. Every row MUST start and end with '|'. Match the exact column order and values in the image.\n` +
      `- For a two-row x/y table, the output must look like:\n| x | 2 | 3 | 4 |\n|---|---|---|---|\n| y | 30 | 22 | 19 |\n` +
      `- Do NOT wrap fractions in [[ ... ]] more than once (never output [[[[..]]]] or [[ [[..]] ]]).\n` +
      `- Do NOT output LaTeX, code fences, bullet points, commentary, or answers.\n` +
      `- Do NOT include diagrams; omit them silently.\n` +
      `Return ONLY the transcribed question text.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: sys },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Transcribe this image exactly. Keep equations and tables in the required markup.' },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
        max_tokens: 1800,
        temperature: 0,
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
    const finishReason = data?.choices?.[0]?.finish_reason;
    if (finishReason === 'length') {
      return new Response(JSON.stringify({ error: 'Question extraction was truncated. Please crop closer to the question and retry.' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const text = cleanExtractedQuestion(data?.choices?.[0]?.message?.content ?? '');
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
