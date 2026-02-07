import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductResult {
  item_name: string;
  reasoning: string;
  product_title: string;
  product_url: string;
  product_image: string | null;
  product_snippet: string;
  estimated_price: string;
}

export interface AnalyzeImageResult {
  products: ProductResult[];
}

export function useAnalyzeImage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalyzeImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (imageBase64: string): Promise<AnalyzeImageResult> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-image", {
        body: { imageBase64 },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setResult(data);
      return data as AnalyzeImageResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      setError(message);
      throw new Error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeImage, isAnalyzing, result, error, setResult };
}
