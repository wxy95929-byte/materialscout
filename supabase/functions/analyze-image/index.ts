import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GeminiItem {
  item_name: string;
  search_query: string;
  visual_keyword: string;
  reasoning: string;
}

interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface TavilyResponse {
  results: TavilyResult[];
}

interface ProductResult {
  item_name: string;
  reasoning: string;
  product_title: string;
  product_url: string;
  product_image: string;
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

For each item, generate TWO different search strings:

1. search_query: A specific commercial query to find this product for purchase online (e.g., "buy white curved boucle sofa wayfair", "mid century walnut coffee table shop")

2. visual_keyword: A purely aesthetic keyword string for finding matching photography. MUST include the specific COLOR and MATERIAL visible in the photo (e.g., "minimalist white boucle curved sofa interior", "warm beige travertine stone countertop", "brushed brass metal pendant light")

Return ONLY a raw JSON array. Do not use Markdown formatting. Do not wrap in code blocks.

Each item must be an object with exactly these keys:
- item_name (string): The specific name of the furniture/material
- search_query (string): Commercial query for purchasing
- visual_keyword (string): Aesthetic keywords including COLOR and MATERIAL for photo matching
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
    // STEP 2: Hybrid Execution
    // - Tavily for purchase URLs
    // - Unsplash for visually accurate images
    // ========================================
    console.log("Step 2: Hybrid search - Tavily for links, Unsplash for images...");

    const productResults: ProductResult[] = [];

    for (const item of geminiItems) {
      try {
        console.log(`Processing: ${item.item_name}`);
        console.log(`  - Search query: ${item.search_query}`);
        console.log(`  - Visual keyword: ${item.visual_keyword}`);

        // === TAVILY: Find purchase URL ===
        let productUrl = `https://www.google.com/search?q=${encodeURIComponent(item.search_query)}`;
        let productTitle = item.item_name;
        let productSnippet = "View product details";
        let estimatedPrice = "Check price";

        try {
          const tavilyResponse = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: TAVILY_API_KEY,
              query: item.search_query,
              include_images: false, // We don't need Tavily images
              search_depth: "basic",
              max_results: 3,
            }),
          });

          if (tavilyResponse.ok) {
            const tavilyData: TavilyResponse = await tavilyResponse.json();
            const firstResult = tavilyData.results?.[0];
            
            if (firstResult) {
              productUrl = firstResult.url;
              productTitle = firstResult.title || item.item_name;
              productSnippet = firstResult.content?.slice(0, 200) || "View product details";
              
              // Try to extract price from content
              const priceMatch = firstResult.content?.match(/\$[\d,]+(?:\.\d{2})?/);
              if (priceMatch) {
                estimatedPrice = priceMatch[0];
              }
            }
            console.log(`  - Tavily found: ${productTitle}`);
          } else {
            console.error(`  - Tavily search failed: ${tavilyResponse.status}`);
          }
        } catch (tavilyError) {
          console.error(`  - Tavily error:`, tavilyError);
        }

        // === UNSPLASH: Find visually accurate image ===
        // Use Unsplash Source API with the visual_keyword for color/material-accurate photos
        const unsplashKeywords = encodeURIComponent(item.visual_keyword.replace(/\s+/g, ","));
        const productImage = `https://source.unsplash.com/800x600/?${unsplashKeywords}`;
        console.log(`  - Unsplash image: ${productImage}`);

        productResults.push({
          item_name: item.item_name,
          reasoning: item.reasoning,
          product_title: productTitle,
          product_url: productUrl,
          product_image: productImage,
          product_snippet: productSnippet,
          estimated_price: estimatedPrice,
        });

      } catch (itemError) {
        console.error(`Error processing "${item.item_name}":`, itemError);
        // Add fallback entry
        const fallbackKeywords = encodeURIComponent(item.visual_keyword.replace(/\s+/g, ","));
        productResults.push({
          item_name: item.item_name,
          reasoning: item.reasoning,
          product_title: item.item_name,
          product_url: `https://www.google.com/search?q=${encodeURIComponent(item.search_query)}`,
          product_image: `https://source.unsplash.com/800x600/?${fallbackKeywords}`,
          product_snippet: "Search for this item online",
          estimated_price: "Check retailer",
        });
      }
    }

    console.log("Hybrid search complete. Products found:", productResults.length);

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
