import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ProcurementItem {
  id: string;
  detectedItem: string;
  materialSuggestion: string;
  matchReason: string;
  estimatedPrice: string;
  retailer: string;
  searchUrl: string;
}

interface AnalysisResponse {
  items: ProcurementItem[];
  estimatedTotal: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, budget, style } = await req.json();

    // Validate required fields
    if (!imageBase64 || !budget) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: imageBase64, budget" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate image size (limit to ~5MB base64, which is ~7MB in base64 encoding)
    if (typeof imageBase64 !== "string" || imageBase64.length > 7000000) {
      return new Response(
        JSON.stringify({ error: "Image too large. Maximum size is 5MB." }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate image format
    const formatMatch = imageBase64.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,/);
    if (!formatMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid image format. Supported formats: JPEG, PNG, WebP, GIF." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate base64 encoding
    const base64Data = imageBase64.split(",")[1];
    if (!base64Data) {
      return new Response(
        JSON.stringify({ error: "Invalid base64 encoding." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    try {
      atob(base64Data.slice(0, 100)); // Test decode first 100 chars
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid base64 encoding." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate budget parameter
    const validBudgets = ["economy", "standard", "luxury"];
    if (!validBudgets.includes(budget)) {
      return new Response(
        JSON.stringify({ error: "Invalid budget. Must be economy, standard, or luxury." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate style parameter (if provided)
    if (style) {
      const validStyles = ["modern", "japandi", "farmhouse", "industrial"];
      if (!validStyles.includes(style)) {
        return new Response(
          JSON.stringify({ error: "Invalid style preference." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const budgetDescriptions: Record<string, string> = {
      economy: "low budget - suggest affordable alternatives and look-alikes (vinyl instead of hardwood, laminate instead of marble, etc.)",
      standard: "mid-range budget - suggest quality materials with good value (engineered hardwood, quartz countertops, etc.)",
      luxury: "high-end budget - suggest premium authentic materials (solid hardwood, natural marble, designer fixtures, etc.)",
    };

    const systemPrompt = `You are a construction estimator and interior design material expert. Analyze the room image and identify materials visible in the photo.

Based on the budget tier (${budget}: ${budgetDescriptions[budget] || budgetDescriptions.standard}), suggest appropriate materials that match the aesthetic.

${style ? `The user prefers a ${style} design style.` : ""}

Return a JSON object with this exact structure:
{
  "items": [
    {
      "id": "1",
      "detectedItem": "Flooring",
      "materialSuggestion": "Specific product name and type",
      "matchReason": "Brief explanation of why this matches the budget and style",
      "estimatedPrice": "$X.XX/sq ft or $X.XX each",
      "retailer": "Store name",
      "searchUrl": "https://www.homedepot.com/s/search+terms or https://www.wayfair.com/keyword.html?keyword=search+terms"
    }
  ],
  "estimatedTotal": "$X,XXX"
}

Identify 4-6 items from the image (flooring, countertops, backsplash, cabinet hardware, light fixtures, wall paint, etc.).
Always provide realistic pricing and actual retailer search URLs.
Return ONLY the JSON object, no additional text.`;

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
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this room image and suggest materials for a ${budget} budget${style ? ` with ${style} style` : ""}.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response, handling potential markdown code blocks
    let analysisData: AnalysisResponse;
    try {
      let jsonStr = content.trim();
      // Remove markdown code blocks if present
      if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.slice(7);
      } else if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith("```")) {
        jsonStr = jsonStr.slice(0, -3);
      }
      analysisData = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(JSON.stringify(analysisData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-room error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
