import { Button } from "@/components/ui/button";
import { ConstraintPills } from "@/components/ConstraintPills";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { ProductTicket } from "@/components/ProductTicket";
import { AnalysisResult, ProcurementItem } from "@/hooks/useAnalyzeRoom";
import { ArrowRight, Sparkles } from "lucide-react";

// Mock data
const economyData: ProcurementItem[] = [
  { id: "1", detectedItem: "Flooring", materialSuggestion: "Luxury Vinyl Plank - White Oak", matchReason: "High-durability vinyl matches wood aesthetic within budget", estimatedPrice: "$2.00/sq ft", retailer: "Floor & Decor", searchUrl: "https://www.homedepot.com/s/white%20oak%20vinyl%20plank" },
  { id: "2", detectedItem: "Countertop", materialSuggestion: "Laminate - Marble Pattern", matchReason: "Achieves marble look at fraction of cost", estimatedPrice: "$20/sq ft", retailer: "Home Depot", searchUrl: "https://www.homedepot.com/s/marble%20laminate%20countertop" },
  { id: "3", detectedItem: "Backsplash", materialSuggestion: "Peel-and-Stick Subway Tile", matchReason: "DIY-friendly, saves labor costs", estimatedPrice: "$3.50/sq ft", retailer: "Amazon", searchUrl: "https://www.amazon.com/s?k=peel+stick+subway+tile" },
  { id: "4", detectedItem: "Hardware", materialSuggestion: "Brushed Nickel Pulls", matchReason: "Value pack with consistent finish", estimatedPrice: "$4.99/ea", retailer: "IKEA", searchUrl: "https://www.ikea.com/us/en/search/?q=cabinet%20pulls" },
  { id: "5", detectedItem: "Lighting", materialSuggestion: "Semi-Flush Mount - Matte Black", matchReason: "Modern aesthetic without designer pricing", estimatedPrice: "$45", retailer: "Wayfair", searchUrl: "https://www.wayfair.com/keyword.html?keyword=matte+black+flush+mount" },
];

const standardData: ProcurementItem[] = [
  { id: "1", detectedItem: "Flooring", materialSuggestion: "Engineered Hardwood - White Oak", matchReason: "Real wood veneer with enhanced stability", estimatedPrice: "$5.50/sq ft", retailer: "Lumber Liquidators", searchUrl: "https://www.homedepot.com/s/engineered%20white%20oak%20hardwood" },
  { id: "2", detectedItem: "Countertop", materialSuggestion: "Quartz - Calacatta Pattern", matchReason: "Marble look without porosity issues", estimatedPrice: "$65/sq ft", retailer: "Home Depot", searchUrl: "https://www.homedepot.com/s/calacatta%20quartz%20countertop" },
  { id: "3", detectedItem: "Backsplash", materialSuggestion: "Ceramic Subway - Handmade Look", matchReason: "Artisanal appearance, standard install", estimatedPrice: "$8/sq ft", retailer: "Tile Bar", searchUrl: "https://www.wayfair.com/keyword.html?keyword=handmade+subway+tile" },
  { id: "4", detectedItem: "Hardware", materialSuggestion: "Solid Brass Pulls - Satin", matchReason: "Quality hardware elevates cabinetry", estimatedPrice: "$12/ea", retailer: "Rejuvenation", searchUrl: "https://www.wayfair.com/keyword.html?keyword=brass+cabinet+pulls" },
  { id: "5", detectedItem: "Lighting", materialSuggestion: "Pendant - Brass & Glass", matchReason: "Designer-inspired at accessible price", estimatedPrice: "$189", retailer: "West Elm", searchUrl: "https://www.wayfair.com/keyword.html?keyword=brass+glass+pendant" },
];

const luxuryData: ProcurementItem[] = [
  { id: "1", detectedItem: "Flooring", materialSuggestion: "Solid European Oak - Wide Plank", matchReason: "Authentic natural hardwood for luxury finish", estimatedPrice: "$12/sq ft", retailer: "Carlisle Wide Plank", searchUrl: "https://www.homedepot.com/s/european%20white%20oak%20wide%20plank" },
  { id: "2", detectedItem: "Countertop", materialSuggestion: "Calacatta Gold Marble", matchReason: "Authentic natural stone materials", estimatedPrice: "$150/sq ft", retailer: "Stone Source", searchUrl: "https://www.homedepot.com/s/calacatta%20gold%20marble" },
  { id: "3", detectedItem: "Backsplash", materialSuggestion: "Zellige Tile - Moroccan", matchReason: "Artisan-crafted with unique variations", estimatedPrice: "$25/sq ft", retailer: "Clé Tile", searchUrl: "https://www.wayfair.com/keyword.html?keyword=zellige+moroccan+tile" },
  { id: "4", detectedItem: "Hardware", materialSuggestion: "Unlacquered Brass - Custom", matchReason: "Living finish develops patina over time", estimatedPrice: "$45/ea", retailer: "Schoolhouse", searchUrl: "https://www.wayfair.com/keyword.html?keyword=unlacquered+brass+pulls" },
  { id: "5", detectedItem: "Lighting", materialSuggestion: "Sculptural Pendant - Handblown", matchReason: "Statement piece from designer collection", estimatedPrice: "$1,200", retailer: "Apparatus Studio", searchUrl: "https://www.wayfair.com/keyword.html?keyword=handblown+glass+pendant" },
];

const getDataByBudget = (budget: string): ProcurementItem[] => {
  switch (budget) {
    case "economy": return economyData;
    case "luxury": return luxuryData;
    default: return standardData;
  }
};

const getTotalByBudget = (budget: string): string => {
  switch (budget) {
    case "economy": return "$1,247";
    case "luxury": return "$8,950";
    default: return "$3,420";
  }
};

interface IntelligencePanelProps {
  budget: string;
  style: string;
  onBudgetChange: (budget: string) => void;
  onStyleChange: (style: string) => void;
  currentStep: number;
  isAnalyzing: boolean;
  isComplete: boolean;
  analysisResult: AnalysisResult | null;
  hasImage: boolean;
  onAnalyze: () => void;
}

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
  const data = analysisResult?.items || getDataByBudget(budget);
  const total = analysisResult?.estimatedTotal || getTotalByBudget(budget);

  return (
    <div className="px-8 lg:px-12 py-8 lg:py-12 pb-32 lg:pb-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl lg:text-4xl text-foreground tracking-tight">
          Material Scout
        </h1>
        <p className="text-muted-foreground font-light mt-2 text-sm lg:text-base">
          Turn Pinterest Dreams into Purchase Lists
        </p>
      </div>

      {/* Constraint Pills */}
      <div className="mb-10">
        <ConstraintPills
          budget={budget}
          style={style}
          onBudgetChange={onBudgetChange}
          onStyleChange={onStyleChange}
        />
      </div>

      {/* Analyze Button */}
      <div className="mb-10">
        <Button
          onClick={onAnalyze}
          disabled={!hasImage || isAnalyzing}
          className="h-14 px-8 text-base font-medium bg-foreground hover:bg-foreground/90 text-background gap-3"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Photo
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
        {!hasImage && (
          <p className="text-sm text-muted-foreground font-light mt-3">
            Upload an image to start
          </p>
        )}
      </div>

      {/* Analysis Progress */}
      {(isAnalyzing || isComplete) && (
        <div className="mb-10">
          <AnalysisProgress currentStep={currentStep} isComplete={isComplete} />
        </div>
      )}

      {/* Results */}
      {isComplete && (
        <div className="animate-fade-in-up">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-2xl lg:text-3xl text-foreground">
              Your Selection
            </h2>
            <span className="text-sm text-muted-foreground font-light">
              {data.length} materials found
            </span>
          </div>

          {/* Product Tickets */}
          <div className="space-y-4 mb-8">
            {data.map((item, index) => (
              <ProductTicket key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-6 border-t border-border">
            <div>
              <p className="font-serif text-xl text-foreground">Estimated Total</p>
              <p className="text-sm text-muted-foreground font-light">excl. labor</p>
            </div>
            <p className="font-serif text-4xl text-foreground">{total}</p>
          </div>
        </div>
      )}
    </div>
  );
}
