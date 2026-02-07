import { FileDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ProcurementItem {
  id: string;
  detectedItem: string;
  materialSuggestion: string;
  matchReason: string;
  estimatedPrice: string;
  retailer: string;
}

const economyData: ProcurementItem[] = [
  {
    id: "1",
    detectedItem: "Flooring",
    materialSuggestion: "Luxury Vinyl Plank (LVP) - White Oak Look",
    matchReason: "Selected high-durability vinyl to match the wood look within economy budget",
    estimatedPrice: "$2.00/sq ft",
    retailer: "Floor & Decor",
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Laminate with Marble Pattern",
    matchReason: "Achieves marble aesthetic at a fraction of the cost, ideal for budget-conscious projects",
    estimatedPrice: "$20.00/sq ft",
    retailer: "Home Depot",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Peel-and-Stick Subway Tile",
    matchReason: "DIY-friendly installation saves labor costs while achieving classic look",
    estimatedPrice: "$3.50/sq ft",
    retailer: "Amazon",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Brushed Nickel Pulls - Bulk Pack",
    matchReason: "Value pack offers consistent finish at lowest price point",
    estimatedPrice: "$4.99/each",
    retailer: "IKEA",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Semi-Flush Mount - Matte Black",
    matchReason: "Modern aesthetic without designer price tag",
    estimatedPrice: "$45.00",
    retailer: "Wayfair",
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
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Quartz - Calacatta Pattern",
    matchReason: "Marble look without porosity issues, mid-range luxury option",
    estimatedPrice: "$65.00/sq ft",
    retailer: "Home Depot",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Ceramic Subway Tile - Handmade Look",
    matchReason: "Artisanal appearance with standard installation costs",
    estimatedPrice: "$8.00/sq ft",
    retailer: "Tile Bar",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Solid Brass Pulls - Satin Finish",
    matchReason: "Quality hardware that elevates cabinetry without premium pricing",
    estimatedPrice: "$12.00/each",
    retailer: "Rejuvenation",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Pendant Light - Brass & Glass",
    matchReason: "Designer-inspired look at accessible price point",
    estimatedPrice: "$189.00",
    retailer: "West Elm",
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
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Authentic Calacatta Gold Marble",
    matchReason: "Selected authentic natural stone materials as requested for luxury finish",
    estimatedPrice: "$150.00/sq ft",
    retailer: "Stone Source",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Zellige Tile - Hand-Glazed Moroccan",
    matchReason: "Artisan-crafted tiles with unique variations for bespoke aesthetic",
    estimatedPrice: "$25.00/sq ft",
    retailer: "Clé Tile",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Unlacquered Brass Pulls - Custom",
    matchReason: "Living finish hardware that develops patina over time",
    estimatedPrice: "$45.00/each",
    retailer: "Schoolhouse",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Sculptural Pendant - Handblown Glass",
    matchReason: "Statement piece from acclaimed designer collection",
    estimatedPrice: "$1,200.00",
    retailer: "Apparatus Studio",
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
}

export function ProcurementList({ isComplete, budgetTier }: ProcurementListProps) {
  const data = getDataByBudget(budgetTier);
  const total = getTotalByBudget(budgetTier);

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
  };

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case "economy":
        return "Economy ($)";
      case "luxury":
        return "Luxury ($$$)";
      case "standard":
      default:
        return "Standard ($$)";
    }
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Procurement List</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isComplete ? (
              <span className="flex items-center gap-2">
                Your curated shopping list
                <Badge variant="outline" className="text-xs">
                  {getBudgetLabel(budgetTier)}
                </Badge>
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
            className="gap-2"
          >
            <FileDown className="w-4 h-4" />
            Export PDF
          </Button>
        )}
      </div>

      <div className="panel-content flex-1 overflow-auto">
        {isComplete ? (
          <div className="stagger-children">
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">
                      Detected Item
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">
                      Material Suggestion
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">
                      Why This Match?
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">
                      Est. Price
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-medium">{item.detectedItem}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{item.materialSuggestion}</p>
                          <Badge variant="secondary" className="mt-1 text-xs font-normal">
                            {item.retailer}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.matchReason}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-primary">
                          {item.estimatedPrice}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          className="gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Buy</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Total estimate */}
            <div className="mt-4 p-4 bg-accent rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Estimated Total</p>
                <p className="text-xs text-muted-foreground">
                  Based on average room dimensions
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{total}</p>
                <p className="text-xs text-muted-foreground">excl. labor</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No Results Yet</h3>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Upload an inspiration photo and run the analysis to see your shopping list
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
