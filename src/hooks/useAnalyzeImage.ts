import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MaterialItem {
  name: string;
  reasoning: string;
  estimated_price: string;
  search_term: string;
}

export interface AnalyzeImageResult {
  materials: MaterialItem[];
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
