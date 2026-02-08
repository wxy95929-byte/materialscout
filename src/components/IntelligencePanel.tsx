import { Button } from "@/components/ui/button";
import { ConstraintPills } from "@/components/ConstraintPills";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { PinCard } from "@/components/PinCard";
import { ProductResult } from "@/hooks/useAnalyzeImage";
import { ArrowRight, Sparkles, DollarSign } from "lucide-react";

interface IntelligencePanelProps {
  budget: string;
  style: string;
  onBudgetChange: (budget: string) => void;
  onStyleChange: (style: string) => void;
  currentStep: number;
  isAnalyzing: boolean;
  isComplete: boolean;
  analysisResult: ProductResult[] | null;
  hasImage: boolean;
  onAnalyze: () => void;
}

const budgetLabels: Record<string, { label: string; icon: string; description: string }> = {
  economy: { label: "Economy", icon: "$", description: "Budget-friendly finds" },
  standard: { label: "Standard", icon: "$$", description: "Mid-range selections" },
  luxury: { label: "Luxury", icon: "$$$", description: "Premium designer pieces" },
};

export function IntelligencePanel({
  budget,
  style,
  onBudgetChange,
  onStyleChange,
  currentStep,
  isAnalyzing,
  isComplete,
  analysisResult,
  hasImage,
  onAnalyze,
}: IntelligencePanelProps) {
  const data = analysisResult || [];
  
  // Calculate total from product prices
  const calculateTotal = (): string => {
    if (!analysisResult) return "--";
    let total = 0;
    for (const product of analysisResult) {
      const match = product.estimated_price.match(/\$?([\d,]+(?:\.\d{2})?)/);
      if (match) {
        const value = parseFloat(match[1].replace(/,/g, ""));
        if (!isNaN(value)) total += value;
      }
    }
    return total > 0 ? `$${total.toLocaleString()}` : "--";
  };

  const total = calculateTotal();

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-10 pb-32 lg:pb-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl lg:text-4xl text-foreground tracking-tight">
          Material Scout
        </h1>
        <p className="text-muted-foreground font-light mt-1 text-sm">
          Turn Pinterest Dreams into Purchase Lists
        </p>
      </div>

      {/* Horizontal Scrollable Pills */}
      <div className="mb-6">
        <ConstraintPills
          budget={budget}
          style={style}
          onBudgetChange={onBudgetChange}
          onStyleChange={onStyleChange}
        />
      </div>

      {/* Analyze Button - Hidden on mobile (FAB used instead) */}
      <div className="hidden lg:block mb-8">
        <Button
          onClick={onAnalyze}
          disabled={!hasImage || isAnalyzing}
          className="h-12 px-6 text-base font-medium bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze Photo
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
        {!hasImage && (
          <p className="text-sm text-muted-foreground font-light mt-2">
            Upload an image to start
          </p>
        )}
      </div>

      {/* Analysis Progress */}
      {(isAnalyzing || isComplete) && (
        <div className="mb-8">
          <AnalysisProgress currentStep={currentStep} isComplete={isComplete} />
        </div>
      )}

      {/* Pinterest-Style Masonry Grid Results */}
      {isComplete && data.length > 0 && (
        <div className="animate-fade-in-up">
          {/* Results Header with Budget Indicator */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-foreground">
                Discover Materials
              </h2>
              <span className="text-sm text-muted-foreground">
                {data.length} pins
              </span>
            </div>
            
            {/* Budget Tier Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-accent border border-border">
              <span className="text-sm font-semibold text-foreground">
                {budgetLabels[budget]?.icon || "$$"}
              </span>
              <span className="text-sm text-muted-foreground">
                {budgetLabels[budget]?.description || "Curated for you"}
              </span>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 lg:columns-3 gap-4">
            {data.map((product, index) => (
              <PinCard key={index} product={product} index={index} />
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-6 mt-6 border-t border-border">
            <div>
              <p className="font-semibold text-lg text-foreground">Estimated Total</p>
              <p className="text-sm text-muted-foreground">excl. labor</p>
            </div>
            <p className="font-serif text-3xl text-foreground">{total}</p>
          </div>
        </div>
      )}
    </div>
  );
}
