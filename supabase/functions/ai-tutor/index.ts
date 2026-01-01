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
    const { question, partLabel, userAnswer, correctAnswer, missing, extra, attemptCount } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating adaptive feedback for:", { partLabel, userAnswer, attemptCount });

    const systemPrompt = `You are a patient, encouraging math tutor helping a student understand number classification and set theory. Your role is to guide students toward the correct answer WITHOUT ever revealing it directly.

CORE PRINCIPLES:
1. NEVER give the answer directly - guide them to discover it
2. Use Socratic questioning - ask leading questions
3. Build on what they already know correctly
4. Address misconceptions gently
5. Give ONE small hint at a time
6. Increase hint specificity based on attempt count
7. Use simple, clear language appropriate for a student
8. Be encouraging and positive

ATTEMPT-BASED PROGRESSION:
- Attempt 1-2: Very subtle hints, ask them to recall definitions
- Attempt 3-4: More specific hints about their errors
- Attempt 5+: Very specific guidance (but still no direct answers)

RESPONSE FORMAT:
- Keep responses to 1-3 short sentences
- Use encouraging language
- End with a question or prompt that guides their thinking
- Use relevant emojis sparingly (💡🤔✨)`;

    const userPrompt = `Question context: "${question}"

Part being answered: "${partLabel}"
Student's answer: "${userAnswer || "(no answer yet)"}"
What they're missing: ${missing?.length > 0 ? missing.join(", ") : "nothing"}
Extra items they included incorrectly: ${extra?.length > 0 ? extra.join(", ") : "none"}
Attempt number: ${attemptCount || 1}

Generate a helpful, adaptive hint that guides the student without giving away the answer. Consider what specific misconception they might have based on their errors.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ 
          hint: "Let me give you a moment to think. Review the definitions again - what makes a number belong to this category?" 
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
    const hint = data.choices?.[0]?.message?.content || "Think about the definition carefully. What properties does each number in your answer have?";

    console.log("Generated hint:", hint);

    return new Response(JSON.stringify({ hint }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-tutor function:", error);
    return new Response(JSON.stringify({ 
      hint: "Think carefully about the definition. What makes a number belong to this category?",
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
