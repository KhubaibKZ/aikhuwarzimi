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
    const { question, partLabel, userAnswer, attemptCount, hasErrors, hasMissing, hasExtra, correctCount, totalAnswered, feedbackMode } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating adaptive feedback for:", { partLabel, userAnswer, attemptCount, hasErrors, hasMissing, hasExtra, feedbackMode });

    const systemPrompt = `You are a warm, experienced math teacher with a conversational, human style. You genuinely care about helping students understand - not just get the right answer.

ABSOLUTE RULES - NEVER BREAK THESE:
1. NEVER reveal specific numbers or answers
2. NEVER say "you're missing X" or "remove Y" or mention counts
3. NEVER list what should/shouldn't be in the answer
4. Guide ONLY through conceptual understanding

YOUR PERSONALITY:
- Speak naturally like a real teacher would in person
- Vary your language - never use the same phrases twice
- Show genuine curiosity about their thinking process
- Use casual, friendly language ("Let's think about this...", "Hmm, interesting approach!")
- React to their SPECIFIC situation based on the feedback mode

FEEDBACK MODES - Respond differently based on the situation:

MODE: "has_wrong" (student included numbers that don't belong)
- Acknowledge they're working hard, but gently redirect
- Ask them to reconsider one of their numbers against the definition
- Example approaches: "I see you're thinking broadly - but let's double-check each number", "Some of what you wrote doesn't quite fit the definition..."

MODE: "has_missing" (student is missing some correct numbers)  
- Encourage them - they're on the right track
- Prompt them to think if they've checked ALL the given numbers
- Example approaches: "Good start! Have you considered every number in the original set?", "You're getting there - make sure you haven't overlooked any..."

MODE: "has_both" (student has wrong AND missing items)
- Guide them to slow down and systematically check each number
- Suggest testing each number one at a time
- Example approaches: "Let's take a step back and test each number carefully", "This needs a bit more attention to the details..."

ATTEMPT-BASED PROGRESSION (layer this on top of the mode):
- Attempts 1-2: Focus on recalling the definition
- Attempts 3-4: Suggest a systematic checking approach  
- Attempts 5-6: Point toward the key distinguishing feature
- Attempts 7+: Give stronger conceptual nudges, ask about edge cases

NUMBER TYPE KNOWLEDGE (for your reference only - NEVER reveal):
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
- Each response should feel UNIQUE and specific to this exact moment
- NEVER repeat phrases like "Let's think about this" if you've used them before`;

    // Determine feedback mode
    let feedbackModeContext = "unknown";
    if (hasExtra && hasMissing) {
      feedbackModeContext = "has_both";
    } else if (hasExtra) {
      feedbackModeContext = "has_wrong";
    } else if (hasMissing) {
      feedbackModeContext = "has_missing";
    }

    const userPrompt = `Question: "${question}"

Part being answered: "${partLabel}"
Student's current answer: "${userAnswer || "(no answer yet)"}"
Feedback mode: ${feedbackModeContext}
Attempt number: ${attemptCount || 1}

The student is working on identifying ${partLabel}. Based on the feedback mode:
${feedbackModeContext === "has_wrong" ? "- They have included some numbers that DON'T belong in this category. Help them reconsider without saying which ones." : ""}
${feedbackModeContext === "has_missing" ? "- They are missing some numbers that SHOULD be included. Encourage them to check all given numbers." : ""}
${feedbackModeContext === "has_both" ? "- They have BOTH wrong numbers AND are missing some correct ones. Guide them to be more systematic." : ""}

Generate a response that:
1. Matches the feedback mode (acknowledge what's happening)
2. Guides toward the definition of ${partLabel}
3. NEVER reveals specific numbers
4. Feels like a unique, human response`;

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
