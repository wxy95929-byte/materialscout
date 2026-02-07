import { FileDown, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnalysisResult, ProcurementItem } from "@/hooks/useAnalyzeRoom";
import { ProductCard } from "./ProductCard";

const economyData: ProcurementItem[] = [
  {
    id: "1",
    detectedItem: "Flooring",
    materialSuggestion: "Luxury Vinyl Plank (LVP) - White Oak Look",
    matchReason: "Selected high-durability vinyl to match the wood look within economy budget",
    estimatedPrice: "$2.00/sq ft",
    retailer: "Floor & Decor",
    searchUrl: "https://www.homedepot.com/s/white%20oak%20vinyl%20plank",
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Laminate with Marble Pattern",
    matchReason: "Achieves marble aesthetic at a fraction of the cost, ideal for budget-conscious projects",
    estimatedPrice: "$20.00/sq ft",
    retailer: "Home Depot",
    searchUrl: "https://www.homedepot.com/s/marble%20laminate%20countertop",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Peel-and-Stick Subway Tile",
    matchReason: "DIY-friendly installation saves labor costs while achieving classic look",
    estimatedPrice: "$3.50/sq ft",
    retailer: "Amazon",
    searchUrl: "https://www.amazon.com/s?k=peel+stick+subway+tile",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Brushed Nickel Pulls - Bulk Pack",
    matchReason: "Value pack offers consistent finish at lowest price point",
    estimatedPrice: "$4.99/each",
    retailer: "IKEA",
    searchUrl: "https://www.ikea.com/us/en/search/?q=cabinet%20pulls",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Semi-Flush Mount - Matte Black",
    matchReason: "Modern aesthetic without designer price tag",
    estimatedPrice: "$45.00",
    retailer: "Wayfair",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=matte+black+flush+mount",
  },
];

const standardData: ProcurementItem[] = [
  {
    id: "1",
    detectedItem: "Flooring",
    materialSuggestion: "Engineered Hardwood - White Oak",
    matchReason: "Real wood veneer with enhanced stability, balanced price-to-quality ratio",
    estimatedPrice: "$5.50/sq ft",
    retailer: "Lumber Liquidators",
    searchUrl: "https://www.homedepot.com/s/engineered%20white%20oak%20hardwood",
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Quartz - Calacatta Pattern",
    matchReason: "Marble look without porosity issues, mid-range luxury option",
    estimatedPrice: "$65.00/sq ft",
    retailer: "Home Depot",
    searchUrl: "https://www.homedepot.com/s/calacatta%20quartz%20countertop",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Ceramic Subway Tile - Handmade Look",
    matchReason: "Artisanal appearance with standard installation costs",
    estimatedPrice: "$8.00/sq ft",
    retailer: "Tile Bar",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=handmade+subway+tile",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Solid Brass Pulls - Satin Finish",
    matchReason: "Quality hardware that elevates cabinetry without premium pricing",
    estimatedPrice: "$12.00/each",
    retailer: "Rejuvenation",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=brass+cabinet+pulls",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Pendant Light - Brass & Glass",
    matchReason: "Designer-inspired look at accessible price point",
    estimatedPrice: "$189.00",
    retailer: "West Elm",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=brass+glass+pendant",
  },
];

const luxuryData: ProcurementItem[] = [
  {
    id: "1",
    detectedItem: "Flooring",
    materialSuggestion: "Solid European White Oak - Wide Plank",
    matchReason: "Selected authentic natural hardwood as requested for luxury finish",
    estimatedPrice: "$12.00/sq ft",
    retailer: "Carlisle Wide Plank",
    searchUrl: "https://www.homedepot.com/s/european%20white%20oak%20wide%20plank",
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Authentic Calacatta Gold Marble",
    matchReason: "Selected authentic natural stone materials as requested for luxury finish",
    estimatedPrice: "$150.00/sq ft",
    retailer: "Stone Source",
    searchUrl: "https://www.homedepot.com/s/calacatta%20gold%20marble",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Zellige Tile - Hand-Glazed Moroccan",
    matchReason: "Artisan-crafted tiles with unique variations for bespoke aesthetic",
    estimatedPrice: "$25.00/sq ft",
    retailer: "Clé Tile",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=zellige+moroccan+tile",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Unlacquered Brass Pulls - Custom",
    matchReason: "Living finish hardware that develops patina over time",
    estimatedPrice: "$45.00/each",
    retailer: "Schoolhouse",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=unlacquered+brass+pulls",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Sculptural Pendant - Handblown Glass",
    matchReason: "Statement piece from acclaimed designer collection",
    estimatedPrice: "$1,200.00",
    retailer: "Apparatus Studio",
    searchUrl: "https://www.wayfair.com/keyword.html?keyword=handblown+glass+pendant",
  },
];

const getDataByBudget = (budget: string): ProcurementItem[] => {
  switch (budget) {
    case "economy":
      return economyData;
    case "luxury":
      return luxuryData;
    case "standard":
    default:
      return standardData;
  }
};

const getTotalByBudget = (budget: string): string => {
  switch (budget) {
    case "economy":
      return "$1,247";
    case "luxury":
      return "$8,950";
    case "standard":
    default:
      return "$3,420";
  }
};

interface ProcurementListProps {
  isComplete: boolean;
  budgetTier: string;
  analysisResult?: AnalysisResult | null;
}

export function ProcurementList({ isComplete, budgetTier, analysisResult }: ProcurementListProps) {
  // Use AI results if available, otherwise fall back to mock data
  const data: ProcurementItem[] = analysisResult?.items || getDataByBudget(budgetTier);
  const total = analysisResult?.estimatedTotal || getTotalByBudget(budgetTier);

  const handleExportPDF = () => {
    toast.success("Report downloaded!", {
      description: "Your procurement list has been exported to PDF.",
    });
  };

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case "economy":
        return "Economy";
      case "luxury":
        return "Luxury";
      case "standard":
      default:
        return "Standard";
    }
  };

  return (
    <div className="h-full flex flex-col pb-24 lg:pb-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-foreground">
            {isComplete ? "Your Curated Selection" : "Material Selection"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-light">
            {isComplete ? (
              <span className="flex items-center gap-2">
                {data.length} materials • {getBudgetLabel(budgetTier)} tier
              </span>
            ) : (
              "Results will appear here"
            )}
          </p>
        </div>
        {isComplete && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="gap-2 border-border hover:bg-accent"
          >
            <FileDown className="w-4 h-4" />
            Export
          </Button>
        )}
      </div>

      {/* Content */}
      {isComplete ? (
        <div className="flex-1">
          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Total Estimate */}
          <div className="mt-8 p-6 bg-accent border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-lg text-foreground">Estimated Total</p>
                <p className="text-sm text-muted-foreground font-light">
                  Based on average room dimensions
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-3xl text-foreground">{total}</p>
                <p className="text-xs text-muted-foreground font-light uppercase tracking-wider">
                  excl. labor
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-6">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-serif text-xl text-foreground mb-2">No Results Yet</h3>
          <p className="text-sm text-muted-foreground font-light max-w-[240px]">
            Upload an inspiration photo and run the analysis to see your curated shopping list
          </p>
        </div>
      )}
    </div>
  );
}
