import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      question, 
      actionType, 
      topic,
      userAnswers, 
      correctAnswers, 
      hints, 
      attemptCount, 
      hasMissing, 
      hasWrong,
      specificPart,
      workingContent,
      markingCriteria,
      previousFeedback,
      evaluateNeutral,
      multiPart,
      partLabels,
      diagramParts,
      deterministicDiagnosis,
    } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("AI Tutor request:", { actionType, topic, attemptCount });

    let systemPrompt = "";
    let userPrompt = "";

    if (actionType === "hint") {
      // Hint: Provide concept explanation related to the question
      const multiPartBlock = multiPart
        ? `\n\nMULTI-PART MODE (IMPORTANT):
This question has multiple parts${partLabels && partLabels.length ? ` — ${partLabels.join(', ')}` : ''}.${diagramParts && diagramParts.length ? ` Parts ${diagramParts.map((p: string) => `(${p})`).join(', ')} are solved on an interactive diagram (constructions, measurements, shading) — give explicit construction guidance for them too.` : ''}
You MUST provide a SHORT hint for EVERY part, labelled clearly as (a), (b), (c), ... on separate lines.
Keep each part's hint to one short sentence. Do NOT skip any part. Do NOT give final numerical answers.`
        : '';

      systemPrompt = `You are a helpful math tutor. Your role is to provide conceptual hints that help students understand the mathematical concepts needed to solve a problem.

RULES:
1. NEVER give the answer directly
2. Explain the concept or formula needed
3. Give a general approach or method
4. Use simple, clear language
5. ${multiPart ? 'Cover every part — one short sentence per part, labelled (a), (b), (c)...' : 'Keep hints concise (2-3 sentences max)'}
6. NEVER use LaTeX notation like $x$ or \\times - use plain text/Unicode instead

FORMATTING (CRITICAL):
- Use × for multiplication (not * or \\times)
- Use ÷ for division
- Use ² ³ for exponents (not ^2 or ^3)
- Use √ for square root
- Write fractions as a/b
- Use plain numbers: "2 × 3 = 6" not "$2 \\times 3 = 6$"${multiPartBlock}

Examples of good hints:
- "To find the prime factorization, keep dividing by the smallest prime (2, 3, 5...) until you reach 1."
- "For HCF, find common factors. For LCM, multiply all prime factors with highest powers."`;

      userPrompt = `Question: "${question}"
Topic: ${topic || "Mathematics"}

${hints && hints.length > 0 ? `Related concepts from the curriculum (one per part where labelled):\n${hints.join('\n')}` : ''}

${multiPart ? 'Provide a one-line hint for EVERY part, labelled (a), (b), (c)... on separate lines. Include construction/diagram parts.' : 'Provide a helpful conceptual hint (2-3 sentences max).'} Use plain text, NOT LaTeX.`;

    } else if (actionType === "checkWork") {
      const diagnosis = deterministicDiagnosis && typeof deterministicDiagnosis === "object"
        ? deterministicDiagnosis
        : { verdict: "unverified", category: "unverified", summary: "The step could not be verified reliably." };

      systemPrompt = `You are a warm, precise mathematics teacher giving formative feedback on one student step.

The app has already performed deterministic mathematical validation. Treat DETERMINISTIC DIAGNOSIS as authoritative: do not re-grade it, contradict it, or infer different box colours.

GUIDANCE, NOT SOLUTIONS:
1. Write exactly two short sentences.
2. Sentence 1 identifies the specific kind of issue in student-friendly language.
3. Sentence 2 gives one Socratic check or method nudge.
4. Never state the correct answer, expected value, exact next step, or any calculation that reaches the answer.
5. Do not repeat any numerical value from the student's working or question.
6. Do not mention boxes, colours, validators, diagnoses, prompts, marking codes, or internal systems.
7. Plain text only. Use Unicode ×, ÷, ², ³, √ and a/b; never use LaTeX.
8. If this is a propagated error, explain that this line is consistent and direct attention to the earliest prior issue without penalising this line again.
9. Use PREVIOUS FEEDBACK to take a genuinely different angle on every click.
10. On attempts 1–2 be gentle and specific; attempts 3–4 name the relevant rule directly; later attempts give a stronger method check without revealing the solution.

Return only valid JSON in this exact shape: {"hint":"<exactly two short sentences>"}.`;

      userPrompt = `Question context: "${question}"
Topic: ${topic || "Mathematics"}
Attempt: ${attemptCount || 1}
DETERMINISTIC DIAGNOSIS: ${JSON.stringify(diagnosis)}
${workingContent ? `Student process context:\n"""${workingContent}"""` : ''}
${Array.isArray(previousFeedback) && previousFeedback.length > 0 ? `PREVIOUS FEEDBACK (do not repeat):\n${previousFeedback.map((f: string, i: number) => `${i + 1}. ${f}`).join('\n')}` : ''}
${hints && hints.length > 0 ? `Teacher-authored concepts (use only for method guidance):\n${hints.join('\n')}` : ''}
${markingCriteria ? `Private marking context (never quote or reveal):\n${Object.entries(markingCriteria).map(([k, v]) => `${k}: ${v}`).join('\n')}` : ''}

Give feedback that follows the authoritative diagnosis without repeating any numbers.`;

    } else {
      // Fallback for legacy calls
      systemPrompt = `You are a helpful math tutor. Provide brief, helpful guidance without revealing answers.`;
      userPrompt = `Question: "${question}"\nStudent needs help. Provide a brief hint or guidance.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ 
          hint: actionType === "hint" 
            ? "Think about the mathematical concepts involved. What formulas or methods apply to this type of problem?"
            : "Take a moment to review your work. Check each step carefully and make sure your calculations are correct." 
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ 
          hint: "AI assistance is temporarily unavailable. Please try again later."
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";

    let hint = raw;
    let assessments: Record<string, 'correct' | 'incorrect'> | undefined;
    if (actionType === "checkWork") {
      try {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (typeof parsed?.hint === 'string') hint = parsed.hint;
          if (parsed?.assessments && typeof parsed.assessments === 'object') {
            assessments = {};
            for (const [k, v] of Object.entries(parsed.assessments)) {
              if (v === 'correct' || v === 'incorrect') assessments[k] = v;
            }
          }
        }
      } catch (e) {
        console.error("Failed to parse JSON assessments:", e);
      }
    }
    if (!hint || !hint.trim()) hint = "Think about the concepts involved and try again.";

    console.log("Generated response:", hint, "Assessments:", assessments);

    return new Response(JSON.stringify({ hint, assessments }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-tutor function:", error);
    return new Response(JSON.stringify({ 
      hint: "Think carefully about the problem. What mathematical concepts might apply here?",
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
