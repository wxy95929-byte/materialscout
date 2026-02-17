import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GeminiItem {
  item_name: string;
  shopping_query: string;
  reasoning: string;
}

interface SerperShoppingResult {
  title: string;
  source: string;
  link: string;
  price: string;
  imageUrl: string;
  rating?: number;
  ratingCount?: number;
}

interface SerperResponse {
  shopping?: SerperShoppingResult[];
}

interface ProductResult {
  item_name: string;
  reasoning: string;
  product_title: string;
  product_url: string;
  product_image: string;
  product_source: string;
  estimated_price: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, budget = "standard" } = await req.json();

    // Map budget to search modifiers
    const budgetConfig: Record<string, { keywords: string; brands: string; priceSort: string }> = {
      economy: {
        keywords: "affordable budget-friendly under $500",
        brands: "Target, IKEA, Wayfair, Amazon Basics, H&M Home",
        priceSort: "p_ord:p", // Sort by price: low to high
      },
      standard: {
        keywords: "",
        brands: "West Elm, CB2, Article, Crate & Barrel",
        priceSort: "",
      },
      luxury: {
        keywords: "high-end designer premium luxury Italian",
        brands: "Restoration Hardware, Arhaus, Pottery Barn, Design Within Reach, Roche Bobois",
        priceSort: "p_ord:pd", // Sort by price: high to low
      },
    };

    const selectedBudget = budgetConfig[budget.toLowerCase()] || budgetConfig.standard;
    console.log("Budget selected:", budget, "Config:", selectedBudget);

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
        JSON.stringify({ error: "Lovable API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const SERPER_API_KEY = Deno.env.get("SERPER_API_KEY");
    if (!SERPER_API_KEY) {
      console.error("SERPER_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Serper API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========================================
    // STEP 1: Gemini Visual Analysis
    // ========================================
    console.log("Step 1: Analyzing image with Gemini...");

    const geminiPrompt = `Analyze this room image. Identify the 3 most prominent furniture items or decor pieces that users would want to purchase.

For each item, provide:
1. item_name: A short descriptive name (e.g., "White Curved Sofa", "Oak Coffee Table")
2. shopping_query: A SHORT Google Shopping query (4-6 words max). Include only the key color, material, and item type. Do NOT add brand names or budget words.
   - GOOD: "white boucle curved sofa"
   - GOOD: "oak round coffee table"
   - GOOD: "black metal pendant light"
   - BAD: "standard light beige boucle upholstered platform bed West Elm style" (too long!)
3. reasoning: Why this item stands out

Return ONLY a raw JSON array, no markdown.

Example:
[
  {
    "item_name": "White Curved Sofa",
    "shopping_query": "white boucle curved sofa",
    "reasoning": "The organic curved shape creates a stunning focal point"
  }
]`;

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
    // STEP 2: Serper Google Shopping Search
    // ========================================
    console.log("Step 2: Searching Google Shopping via Serper...");

    const productResults: ProductResult[] = [];

    for (const item of geminiItems) {
      try {
        // Keep query short — budget filtering is done via price sorting, not keywords
        const searchQuery = item.shopping_query;
        
        console.log(`Searching for: "${searchQuery}" (Budget: ${budget})`);

        const serperBody: Record<string, string> = {
          q: searchQuery,
          gl: "us",
          hl: "en",
        };

        if (selectedBudget.priceSort) {
          serperBody.tbs = selectedBudget.priceSort;
        }

        const serperResponse = await fetch("https://google.serper.dev/shopping", {
          method: "POST",
          headers: {
            "X-API-KEY": SERPER_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serperBody),
        });

        if (!serperResponse.ok) {
          console.error(`Serper search failed for "${item.item_name}":`, serperResponse.status);
          continue;
        }

        const serperData: SerperResponse = await serperResponse.json();
        const firstResult = serperData.shopping?.[0];

        if (firstResult) {
          console.log(`  ✓ Found: ${firstResult.title} - ${firstResult.price} from ${firstResult.source}`);
          
          productResults.push({
            item_name: item.item_name,
            reasoning: item.reasoning,
            product_title: firstResult.title,
            product_url: firstResult.link,
            product_image: firstResult.imageUrl,
            product_source: firstResult.source,
            estimated_price: firstResult.price || "Check price",
          });
        } else {
          console.log(`  ✗ No shopping results for "${item.shopping_query}"`);
        }
      } catch (itemError) {
        console.error(`Error processing "${item.item_name}":`, itemError);
      }
    }

    if (productResults.length === 0) {
      return new Response(
        JSON.stringify({ error: "No products found. Try a different image." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Search complete. Products found:", productResults.length);

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
