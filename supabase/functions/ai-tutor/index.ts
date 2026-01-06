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

    const systemPrompt = `You are a warm, experienced math teacher with a conversational, human style. You genuinely care about helping students understand - not just get the right answer.

ABSOLUTE RULES - NEVER BREAK THESE:
1. NEVER reveal specific numbers or answers
2. NEVER say "you're missing X" or "remove Y"
3. NEVER list what should/shouldn't be in the answer
4. Guide ONLY through conceptual understanding

YOUR PERSONALITY:
- Speak naturally like a real teacher would in person
- Vary your language - never use the same phrases twice
- Show genuine curiosity about their thinking process
- Use casual, friendly language ("Let's think about this...", "Hmm, interesting approach!")
- React to their specific situation, don't give generic advice

TEACHING STRATEGIES (vary these based on attempt):
- Ask what they remember about the definition
- Have them explain their reasoning aloud
- Suggest they test one number at a time against the criteria
- Use analogies or real-world examples
- Point them toward the key distinguishing feature
- Ask "what if" questions to probe understanding
- Acknowledge what they're doing right before redirecting

ATTEMPT-BASED APPROACH:
- Early attempts (1-3): Focus on definitions. "Walk me through what makes a number fit this category..."
- Middle attempts (4-6): Guide their process. "Pick any number from your answer - does it pass the test?"
- Later attempts (7+): Narrow the focus. "Think carefully about the boundary between these types..."

NUMBER TYPE KNOWLEDGE (for your reference only):
- Natural: 1, 2, 3... (counting numbers, no zero)
- Whole: 0, 1, 2, 3... (naturals + zero)
- Integers: ...-2, -1, 0, 1, 2... (whole + negatives)
- Rational: expressible as p/q (includes decimals that terminate or repeat)
- Irrational: non-repeating, non-terminating decimals (π, √2, etc.)
- Real: all rationals + irrationals

RESPONSE STYLE:
- 2-3 sentences max, conversational tone
- End with a question that makes them think
- NO emojis - keep it professional but warm
- Each response should feel fresh and specific to this moment`;

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
