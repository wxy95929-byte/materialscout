import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProcurementItem {
  id: string;
  detectedItem: string;
  materialSuggestion: string;
  matchReason: string;
  estimatedPrice: string;
  retailer: string;
  searchUrl: string;
}

export interface AnalysisResult {
  items: ProcurementItem[];
  estimatedTotal: string;
}

export function useAnalyzeRoom() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeRoom = async (
    imageBase64: string,
    budget: string,
    style: string
  ): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-room", {
        body: { imageBase64, budget, style },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      setError(message);
      toast.error("Analysis failed", { description: message });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeRoom, isAnalyzing, result, error, setResult };
}
