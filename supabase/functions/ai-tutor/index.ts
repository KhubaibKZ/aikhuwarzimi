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
    const { question, partLabel, userAnswer, attemptCount, hasErrors, hasMissing, hasExtra } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating adaptive feedback for:", { partLabel, userAnswer, attemptCount, hasErrors, hasMissing, hasExtra });

    const systemPrompt = `You are a patient, encouraging math tutor helping a student understand number classification and set theory. Your role is to guide students toward the correct answer WITHOUT ever revealing it directly.

ABSOLUTE RULES - NEVER BREAK THESE:
1. NEVER reveal any specific numbers or answers
2. NEVER say things like "you're missing X" or "remove Y" 
3. NEVER list what should or shouldn't be in the answer
4. ONLY guide through conceptual understanding and definitions

TEACHING APPROACH:
1. Use Socratic questioning - ask leading questions about definitions
2. Help them recall the properties/criteria for each number type
3. Encourage them to test each number against the definition
4. Give ONE conceptual hint at a time
5. Be encouraging and build confidence

ATTEMPT-BASED PROGRESSION:
- Attempt 1-2: Ask them to recall the definition. "What makes a number an integer?"
- Attempt 3-4: Guide them to check their work. "Look at each number - does it match the definition?"
- Attempt 5-6: Give conceptual clues. "Think about decimals vs whole numbers..."
- Attempt 7+: Stronger conceptual guidance, but STILL no direct answers

NUMBER TYPE DEFINITIONS (use these to guide, never reveal):
- Natural numbers: Counting numbers starting from 1 (1, 2, 3, ...)
- Whole numbers: Natural numbers plus zero (0, 1, 2, 3, ...)
- Integers: Whole numbers and their negatives (..., -2, -1, 0, 1, 2, ...)
- Rational: Can be expressed as a fraction p/q where q ≠ 0
- Irrational: Cannot be expressed as a fraction, infinite non-repeating decimals
- Real: All rational and irrational numbers

RESPONSE FORMAT:
- Keep responses to 2-3 short sentences maximum
- Use encouraging, supportive language
- End with a thought-provoking question
- Use emojis sparingly (💡🤔✨)`;

    // Build context about the error type without revealing specifics
    let errorContext = "";
    if (hasErrors) {
      if (hasMissing && hasExtra) {
        errorContext = "The student has both missing items and items that don't belong.";
      } else if (hasMissing) {
        errorContext = "The student is missing some items from their answer.";
      } else if (hasExtra) {
        errorContext = "The student has included some items that don't belong.";
      }
    }

    const userPrompt = `Question: "${question}"

Part being answered: "${partLabel}"
Student's current answer: "${userAnswer || "(no answer yet)"}"
Error type: ${errorContext || "Unknown error pattern"}
Attempt number: ${attemptCount || 1}

Generate a helpful hint that guides the student to discover the correct answer through understanding. DO NOT reveal any specific numbers. Focus on helping them understand the definition and apply it.`;

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
