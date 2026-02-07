import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GeminiItem {
  item_name: string;
  search_query: string;
  reasoning: string;
}

interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface TavilyImage {
  url: string;
}

interface TavilyResponse {
  results: TavilyResult[];
  images?: TavilyImage[];
}

interface ProductResult {
  item_name: string;
  reasoning: string;
  product_title: string;
  product_url: string;
  product_image: string | null;
  product_snippet: string;
  estimated_price: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Missing required field: imageBase64" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate image size (~5MB base64 = ~7MB encoded)
    if (typeof imageBase64 !== "string" || imageBase64.length > 7000000) {
      return new Response(
        JSON.stringify({ error: "Image too large. Maximum size is 5MB." }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const TAVILY_API_KEY = Deno.env.get("TAVILY_API_KEY");
    if (!TAVILY_API_KEY) {
      console.error("TAVILY_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Tavily API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========================================
    // STEP 1: Visual Reasoning with Gemini
    // ========================================
    console.log("Step 1: Analyzing image with Gemini...");

    const geminiPrompt = `Analyze this interior image. Identify the 3 most prominent furniture items or materials visible.

For each item, generate a specific, high-intent search query to find this exact product or a close visual alternative for sale online.

Return ONLY a raw JSON array. Do not use Markdown formatting. Do not wrap in code blocks.

Each item must be an object with exactly these keys:
- item_name (string): The specific name of the furniture/material
- search_query (string): A search query to find this product online (e.g., "mid century modern walnut coffee table buy online")
- reasoning (string): Why this item stands out and what makes it distinctive

Return ONLY the JSON array, nothing else.`;

    const geminiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: geminiPrompt },
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

    if (!geminiResponse.ok) {
      if (geminiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (geminiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await geminiResponse.text();
      console.error("Gemini gateway error:", geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI vision analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const geminiContent = geminiData.choices?.[0]?.message?.content;

    if (!geminiContent) {
      return new Response(
        JSON.stringify({ error: "No response from vision AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse Gemini JSON response
    let geminiItems: GeminiItem[];
    try {
      const cleanJson = geminiContent.replace(/```json/g, "").replace(/```/g, "").trim();
      geminiItems = JSON.parse(cleanJson);
      console.log("Gemini identified items:", geminiItems.length);
    } catch {
      console.error("Failed to parse Gemini response:", geminiContent);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI vision response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========================================
    // STEP 2: Agentic Search with Tavily
    // ========================================
    console.log("Step 2: Searching for real products with Tavily...");

    const productResults: ProductResult[] = [];

    for (const item of geminiItems) {
      try {
        console.log(`Searching for: ${item.search_query}`);
        
        const tavilyResponse = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: TAVILY_API_KEY,
            query: item.search_query,
            include_images: true,
            search_depth: "basic",
            max_results: 3,
          }),
        });

        if (!tavilyResponse.ok) {
          console.error(`Tavily search failed for "${item.item_name}":`, tavilyResponse.status);
          // Add item with fallback data
          productResults.push({
            item_name: item.item_name,
            reasoning: item.reasoning,
            product_title: item.item_name,
            product_url: `https://www.google.com/search?q=${encodeURIComponent(item.search_query)}`,
            product_image: null,
            product_snippet: "Search for this item online",
            estimated_price: "Check retailer",
          });
          continue;
        }

        const tavilyData: TavilyResponse = await tavilyResponse.json();
        
        // Get the first valid result
        const firstResult = tavilyData.results?.[0];
        const firstImage = tavilyData.images?.[0]?.url || null;

        // Try to extract price from content
        const priceMatch = firstResult?.content?.match(/\$[\d,]+(?:\.\d{2})?/);
        const estimatedPrice = priceMatch ? priceMatch[0] : "Check price";

        productResults.push({
          item_name: item.item_name,
          reasoning: item.reasoning,
          product_title: firstResult?.title || item.item_name,
          product_url: firstResult?.url || `https://www.google.com/search?q=${encodeURIComponent(item.search_query)}`,
          product_image: firstImage,
          product_snippet: firstResult?.content?.slice(0, 200) || "View product details",
          estimated_price: estimatedPrice,
        });

        console.log(`Found product: ${firstResult?.title || "fallback"}`);
      } catch (searchError) {
        console.error(`Search error for "${item.item_name}":`, searchError);
        // Add item with fallback data
        productResults.push({
          item_name: item.item_name,
          reasoning: item.reasoning,
          product_title: item.item_name,
          product_url: `https://www.google.com/search?q=${encodeURIComponent(item.search_query)}`,
          product_image: null,
          product_snippet: "Search for this item online",
          estimated_price: "Check retailer",
        });
      }
    }

    console.log("Agentic search complete. Products found:", productResults.length);

    return new Response(JSON.stringify({ products: productResults }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-image error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
