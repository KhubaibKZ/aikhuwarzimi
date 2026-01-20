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
      hasWrong 
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
5. Keep hints concise (2-4 sentences)

Examples of good hints:
- "This problem involves the concept of percentage. Remember, to find X% of a number, you multiply the number by X/100."
- "Think about the properties of a right triangle. The Pythagorean theorem might be useful here."
- "When solving equations, remember to perform the same operation on both sides to maintain equality."`;

      userPrompt = `Question: "${question}"
Topic: ${topic || "Mathematics"}

${hints && hints.length > 0 ? `Related concepts from the curriculum:\n${hints.join('\n')}` : ''}

Provide a helpful conceptual hint that guides the student toward understanding how to approach this problem. Focus on the mathematical concept, not the specific answer.`;

    } else if (actionType === "checkWork") {
      // Check Work: Provide teacher-like guidance based on their work
      systemPrompt = `You are an experienced, warm math teacher reviewing a student's work. Your goal is to guide them without giving away the answer.

YOUR APPROACH:
- Be encouraging and supportive
- Point out what they did well (if anything is correct)
- For mistakes, guide them to reconsider their approach
- Ask probing questions that lead to understanding
- Never reveal the correct answer directly
- Be conversational and natural

BASED ON THEIR PROGRESS:
${hasWrong ? "- They have some incorrect answers. Gently guide them to reconsider." : ""}
${hasMissing ? "- They haven't completed all parts. Encourage them to attempt everything." : ""}
${!hasWrong && !hasMissing ? "- Their answers look good! Confirm their understanding." : ""}

ATTEMPT-BASED GUIDANCE:
- Attempt 1-2: Give gentle nudges and remind them of the concept
- Attempt 3-4: Be more specific about where to look
- Attempt 5+: Give stronger hints about the method, but still don't reveal the answer

Keep response to 2-4 sentences. Be natural and caring.`;

      userPrompt = `Question: "${question}"
Topic: ${topic || "Mathematics"}
Student's answers: ${JSON.stringify(userAnswers)}
Attempt number: ${attemptCount || 1}

${hints && hints.length > 0 ? `Key concepts:\n${hints.join('\n')}` : ''}

Provide teacher-like guidance to help the student. Remember: be encouraging, guide without giving answers, and ask questions that make them think.`;

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
