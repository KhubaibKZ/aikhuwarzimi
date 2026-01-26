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
      specificPart
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
      systemPrompt = `You are a helpful math tutor. Your role is to provide conceptual hints that help students understand the mathematical concepts needed to solve a problem.

RULES:
1. NEVER give the answer directly
2. Explain the concept or formula needed
3. Give a general approach or method
4. Use simple, clear language
5. Keep hints concise (2-3 sentences max)
6. NEVER use LaTeX notation like $x$ or \\times - use plain text/Unicode instead

FORMATTING (CRITICAL):
- Use × for multiplication (not * or \\times)
- Use ÷ for division
- Use ² ³ for exponents (not ^2 or ^3)
- Use √ for square root
- Write fractions as a/b
- Use plain numbers: "2 × 3 = 6" not "$2 \\times 3 = 6$"

Examples of good hints:
- "To find the prime factorization, keep dividing by the smallest prime (2, 3, 5...) until you reach 1."
- "For HCF, find common factors. For LCM, multiply all prime factors with highest powers."`;

      userPrompt = `Question: "${question}"
Topic: ${topic || "Mathematics"}

${hints && hints.length > 0 ? `Related concepts from the curriculum:\n${hints.join('\n')}` : ''}

Provide a helpful conceptual hint (2-3 sentences max). Use plain text, NOT LaTeX.`;

    } else if (actionType === "checkWork") {
      // Check Work: Provide teacher-like guidance based on their work
      const partContext = specificPart ? `\n\nFOCUS: The student is specifically asking for help with "${specificPart}". Focus your guidance ONLY on this specific part.` : "";
      
      systemPrompt = `You are a warm, supportive math tutor guiding students through digital exercises.

ABSOLUTE RULES (CRITICAL - VIOLATION = FAILURE):
- Maximum 2-3 short sentences
- NEVER reveal ANY numerical value that appears in or leads to the answer
- NEVER mention intermediate results (e.g., "540°", "the sum is...", "divide by 5")
- NEVER give calculations or partial calculations
- NEVER say phrases like "what happens when you divide X by Y" - this reveals the answer!
- Only ask about the METHOD or PROCESS, never about specific numbers
- Be natural and encouraging
- NEVER use LaTeX notation like $x$ or \\times
${specificPart ? `- Focus ONLY on "${specificPart}"` : ""}

LANGUAGE STYLE (CRITICAL - digital learning context):
- Students are working step-by-step in an app - they can't "walk you through" or "explain verbally"
- Use action-oriented guidance: "Try checking...", "Look at...", "Double-check..."
- Reference their inputs: "The value you entered...", "Your answer shows..."
- Guide next steps: "Consider what the formula needs...", "Think about which value goes where..."
- AVOID: "Can you walk me through...", "Tell me how...", "Explain your thinking..."
- PREFER: "Check if...", "Look at the formula and see if...", "Try applying..."

FORMATTING (CRITICAL - use plain text only):
- Use × for multiplication (not * or \\times)
- Use ÷ for division, ² ³ for powers
- Use √ for roots, write fractions as a/b

EXAMPLES OF FORBIDDEN RESPONSES:
❌ "If the sum is 540°, divide by 5" - REVEALS THE ANSWER
❌ "The total is 540°, what next?" - REVEALS INTERMEDIATE VALUE
❌ "Can you walk me through your calculation?" - NOT DIGITAL-FRIENDLY
❌ "Tell me how you got this" - IMPLIES VERBAL RESPONSE

GOOD FEEDBACK EXAMPLES:
✓ "Check your formula - are you using the correct value for n?"
✓ "Look at what the formula gives you versus what the question asks."
✓ "Try reviewing your substitution into the formula."
✓ "Double-check the value you're dividing by."

ADAPT TO SITUATION:
${hasWrong && hasMissing ? "They have errors AND missing parts. Guide them to check their approach." : ""}
${hasWrong && !hasMissing ? "They completed everything but have mistakes. Point to the step that needs review." : ""}
${!hasWrong && hasMissing ? "Their work so far looks good! Encourage them to continue with the next step." : ""}
${!hasWrong && !hasMissing ? "Everything looks correct! Give brief positive confirmation." : ""}

ATTEMPT ${attemptCount || 1} STRATEGY:
${(attemptCount || 1) <= 2 ? "Be gentle - suggest checking their method or formula." : ""}
${(attemptCount || 1) >= 3 && (attemptCount || 1) <= 4 ? "Point to a specific STEP (not value) that needs review." : ""}
${(attemptCount || 1) >= 5 ? "Give a methodological hint about the PROCESS only." : ""}

CRITICAL: 2-3 lines max. Plain text only. NEVER mention ANY numbers from the calculation.${partContext}`;

      userPrompt = `Question: "${question}"
Topic: ${topic || "Mathematics"}
${specificPart ? `Specific part being checked: "${specificPart}"` : ""}
Student's answers: ${JSON.stringify(userAnswers)}
Attempt number: ${attemptCount || 1}

${hints && hints.length > 0 ? `Key concepts:\n${hints.join('\n')}` : ''}

IMPORTANT: Do NOT mention any numerical values from the calculation or answer. Only guide on METHOD.
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
    const hint = data.choices?.[0]?.message?.content || "Think about the concepts involved and try again.";

    console.log("Generated response:", hint);

    return new Response(JSON.stringify({ hint }), {
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
