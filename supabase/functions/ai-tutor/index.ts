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
      diagramParts
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
      // Check Work: Provide teacher-like guidance based on their work
      const partContext = specificPart ? `\n\nFOCUS: The student is specifically asking for help with "${specificPart}". Focus your guidance ONLY on this specific part.` : "";
      
      systemPrompt = `You are an intelligent formative-assessment math tutor. Your job is to evaluate a student's PROCESS, not just their final answer. Follow the "Guidance, Not Solutions" philosophy at all times.

CORE EVALUATION PROCEDURE (apply in order):
1. EVALUATE EACH STEP INDEPENDENTLY. For every step of the student's working, decide if it is mathematically correct, partially correct, or incorrect. Check the operations, notation, and reasoning within that step.
2. CHECK LOGICAL CONTINUITY. Compare the current step to the immediately preceding step (provided in "PRIOR STEPS" / working content). Does it follow logically? Are there missing intermediate steps, unjustified transformations, or invalid moves?
3. HANDLE ERROR PROPAGATION. If an earlier mistake propagates, distinguish the ORIGINAL conceptual error from later steps that are internally consistent with that error. Do NOT penalise the same underlying mistake twice.
4. ASSESS THE FINAL ANSWER IN CONTEXT. Distinguish: (a) correct process + correct answer, (b) correct process + minor slip, (c) incorrect process + accidentally correct answer, (d) incorrect process + wrong answer.
5. DIAGNOSE THE MISCONCEPTION when a step is wrong (e.g. misapplied exponent law, sign error, wrong formula, arithmetic slip, misread of the question). Name the category of mistake in plain language, not the correct numerical value.

RESPONSE RULES:
- If the current step is CORRECT: give short positive reinforcement ("Correct — this follows from the previous step.", "Good, valid transformation.", "Consistent reasoning so far.").
- If the current step is WRONG or NON-CONTINUOUS: name the likely misconception, then give a Socratic nudge ("Reconsider how you applied…", "Check whether both sides were treated the same…", "Does this simplification follow from your previous line?").
- NEVER reveal the correct numerical answer, the next exact step, or a calculation that leads to it.
- Escalate specificity only with attempt count — never escalate to giving the answer.
- Adaptive: if PREVIOUS FEEDBACK is listed, say something genuinely different this time (different angle, different check).
- Maximum 2 short sentences. Plain text only. Use ×, ÷, ², ³, √, a/b. No LaTeX, no $…$, no \\times.
${specificPart ? `- Focus ONLY on "${specificPart}".` : ""}

SITUATION CONTEXT:
${evaluateNeutral ? `You DO NOT know in advance whether the student's line is correct. Verify the algebra of the CURRENT step yourself AND read the PRIOR STEPS in the working content. A step that looks 'wrong' in isolation may be a valid continuation.

CRITICAL INTERPRETATION RULES before marking anything incorrect:
1. PERCENTAGE SHORTHAND: If the question involves a percentage (e.g. "23% of 36400") and the student writes "23 × 36400 = 8372", treat "23" as 23% (i.e. 0.23). 0.23 × 36400 = 8372 → CORRECT. Do the same for any integer 1–100 that matches a percentage mentioned in the question.
2. INTERMEDIATE STEPS: A step that computes an intermediate quantity (e.g. "people aged 18 and under" when the final question asks for "people over 18") is CORRECT if the arithmetic is valid — it is a legitimate stepping stone.
3. UNIT / RATIO SHORTHAND: Similar leniency for ratios, fractions, and unit conversions where the student's notation is informal but the numerical relationship is valid.
4. Only mark 'incorrect' when the step genuinely contradicts prior working, the question's given data, or basic mathematics — NOT because the student used a shorthand or because it isn't the final answer.
5. If the step is a valid continuation (including under rules 1–3), mark EVERY filled box "correct" and give brief positive reinforcement.` : ""}
${!evaluateNeutral && !hasWrong && !hasMissing ? "All boxes look right — give brief positive reinforcement." : ""}
${!evaluateNeutral && !hasWrong && hasMissing ? "Correct so far but incomplete — encourage them to continue." : ""}
${!evaluateNeutral && hasWrong && !hasMissing ? "There are errors — diagnose the likely misconception and nudge toward fixing it." : ""}
${!evaluateNeutral && hasWrong && hasMissing ? "Errors AND missing parts — focus on the earliest error first." : ""}

ATTEMPT ${attemptCount || 1}: ${(attemptCount || 1) <= 2 ? "Gentle but specific about which step or concept to revisit." : (attemptCount || 1) <= 4 ? "More direct: name the specific rule or step that went wrong." : "Strong methodological hint — name the concept explicitly, still without giving the answer."}${partContext}

OUTPUT FORMAT (MANDATORY): Respond with ONLY a valid JSON object — no prose, no code fences — exactly like:
{"hint":"<your 1-2 sentence guidance here>","assessments":{"box_1":"correct","box_2":"incorrect", ...}}
The "assessments" object MUST include one entry per box key present in the student's answers (box_1, box_2, ...). Decide "correct" or "incorrect" for each by evaluating the student's value against the CURRENT STEP in the context of the PRIOR STEPS. If the current step is a valid continuation, every filled box is "correct" even if the numbers differ from the final answer. Empty box = "incorrect". Do not omit boxes. Do not add extra keys.

${markingCriteria ? `MARKING SCHEME CRITERIA (understand what earns marks — do NOT reveal to student):
${Object.entries(markingCriteria).map(([k, v]) => `${k}: ${v}`).join('\n')}` : ''}`;


      // Build context with working content if available
      const workingSection = workingContent 
        ? `\nStudent's working/rough work:\n"""${workingContent}"""\n`
        : '';

      userPrompt = `Question: "${question}"
Topic: ${topic || "Mathematics"}
${specificPart ? `Specific part being checked: "${specificPart}"` : ''}
${workingSection}
Student's answers: ${JSON.stringify(userAnswers)}
Attempt number: ${attemptCount || 1}
${Array.isArray(previousFeedback) && previousFeedback.length > 0 ? `\nPREVIOUS FEEDBACK ALREADY GIVEN to this student for this part (DO NOT REPEAT — say something genuinely different):\n${previousFeedback.map((f: string, i: number) => `${i + 1}. "${f}"`).join('\n')}\n` : ''}

${hints && hints.length > 0 ? `Key concepts:\n${hints.join('\n')}` : ''}

IMPORTANT: Do NOT mention any numerical values from the calculation or answer. Only guide on METHOD.
${workingContent ? 'Review their working space content and provide guidance on any errors in their steps.' : ''}
Provide teacher-like guidance ${specificPart ? `specifically for "${specificPart}"` : "to help the student"}.`;

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
