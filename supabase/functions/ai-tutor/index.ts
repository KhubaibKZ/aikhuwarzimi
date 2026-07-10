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
      
      systemPrompt = `You are a warm, supportive math tutor guiding students through digital exercises.

RESPONSE STRUCTURE (MANDATORY - follow this exact pattern):
1. FIRST: REVERSE-ENGINEER the student's actual error. You MUST mentally compute several plausible wrong methods and check ARITHMETICALLY which one yields the student's exact number. Examples for "6 + 4 ÷ 2": correct = 8; left-to-right (6+4 then ÷2) = 5; treating as (6+4)/2 = 5; ignoring ÷ entirely = 10; concatenation/typo gives other values. ONLY name a specific wrong method if the math actually produces the student's number. If NO standard mistake pattern produces their answer (e.g. they wrote 55 for 6+4÷2 — no normal misordering gives 55), DO NOT invent one. Instead say something like "I can't tell exactly how you reached that number — re-do the calculation step by step" or "That value doesn't match any common slip here; double-check what you typed."
2. THEN: Guide what to check or try — a nudge toward the right approach WITHOUT revealing the answer.

ADAPTIVE FEEDBACK (CRITICAL):
- If previous feedback was already given to this student for this part, you MUST give DIFFERENT feedback this time. Do not repeat the same sentence or the same diagnosis. Vary the angle: mention a different check, a different concept, or escalate clarity.
- Each new attempt should feel like a fresh observation, not a copy of the previous one.

ABSOLUTE RULES (CRITICAL):
- Maximum 2 short sentences total (one for the error, one for guidance)
- NEVER reveal ANY numerical value that appears in or leads to the answer
- NEVER give calculations or partial calculations
- NEVER say "the answer should be..." or "you should get..."
- Be natural, warm, and human — like a teacher leaning over a desk
- NEVER use LaTeX notation like $x$ or \\times
${specificPart ? `- Focus ONLY on "${specificPart}"` : ""}

FORMATTING (plain text only):
- Use × for multiplication, ÷ for division, ² ³ for powers, √ for roots, a/b for fractions

EXAMPLES OF GOOD FEEDBACK:
✓ "Your answer suggests the operations were done left-to-right. Remember BODMAS — check which operation should be done first."
✓ "The subtraction looks off here. Double-check what you're subtracting from what."
✓ "This looks like you divided before multiplying. Re-read the expression and apply the order of operations."

EXAMPLES OF BAD FEEDBACK:
❌ "Great start on your first attempt! Take a look at..." — too generic, doesn't say what's wrong
❌ "The sum is 540°, divide by 5" — reveals the answer
❌ "Can you walk me through your calculation?" — not digital-friendly
❌ Long paragraphs with multiple sentences — too wordy

SITUATION CONTEXT:
${evaluateNeutral ? "You DO NOT know in advance whether the student's line is correct or wrong. FIRST, carefully verify the algebra of the current step yourself, AND read the PRIOR STEPS provided in the working content. A step that appears to have 'wrong' numbers in isolation may be perfectly valid as a CONTINUATION of a prior step (e.g. reusing an intermediate result, rearranging, or picking numbers derived earlier). If the current step follows logically and arithmetically from the prior steps and is mathematically consistent, confirm it briefly and mark every filled box 'correct'. Only mark boxes 'incorrect' when the current step genuinely contradicts the prior working or basic mathematics." : ""}
${!evaluateNeutral && !hasWrong && !hasMissing ? "Everything is correct! Give a brief thumbs-up like 'Spot on!' or 'That's correct, well done!'" : ""}
${!evaluateNeutral && !hasWrong && hasMissing ? "Work so far is correct. Encourage them: 'Looking good so far — keep going with the next part!'" : ""}
${!evaluateNeutral && hasWrong && !hasMissing ? "They have wrong answers. Identify the likely error, then nudge toward fixing it." : ""}
${!evaluateNeutral && hasWrong && hasMissing ? "They have errors and missing parts. Focus on the error first." : ""}

ATTEMPT ${attemptCount || 1}: ${(attemptCount || 1) <= 2 ? "Be gentle but specific about the error." : (attemptCount || 1) <= 4 ? "Be more direct about which step went wrong." : "Give a stronger methodological hint."}

CRITICAL: 2 sentences max for the hint. Plain text only. ${evaluateNeutral ? "If the step is a valid continuation of the prior steps, say so plainly (e.g. 'Correct — this follows from the previous step.') and mark all filled boxes correct. If it is wrong, identify the error without revealing the final answer to the overall question." : "NEVER mention ANY numbers from the calculation. Always start by identifying the error."}${partContext}

OUTPUT FORMAT (MANDATORY): Respond with ONLY a valid JSON object — no prose, no code fences — exactly like:
{"hint":"<your 2-sentence guidance here>","assessments":{"box_1":"correct","box_2":"incorrect", ...}}
The "assessments" object MUST include one entry per box key present in the student's answers (box_1, box_2, ...). For each, decide "correct" or "incorrect" by evaluating the student's value against the CURRENT STEP in the context of the PRIOR STEPS. If the current step is a valid continuation, every filled box is "correct" even if the numbers differ from the final answer. If a box is empty, mark it "incorrect". Do not omit any box. Do not add extra keys.

${markingCriteria ? `MARKING SCHEME CRITERIA (use to understand what earns marks — do NOT reveal to student):
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
