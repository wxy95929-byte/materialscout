import { FileDown, ExternalLink, ShoppingCart } from "lucide-react";
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

const mockData: ProcurementItem[] = [
  {
    id: "1",
    detectedItem: "Flooring",
    materialSuggestion: "Luxury Vinyl Plank - Oak",
    matchReason: "Warm wood look with superior durability for high-traffic areas",
    estimatedPrice: "$3.50/sq ft",
    retailer: "Floor & Decor",
  },
  {
    id: "2",
    detectedItem: "Countertop",
    materialSuggestion: "Quartz - Calacatta",
    matchReason: "Marble aesthetic without porosity issues, ideal for kitchens",
    estimatedPrice: "$75/sq ft",
    retailer: "Home Depot",
  },
  {
    id: "3",
    detectedItem: "Backsplash",
    materialSuggestion: "Ceramic Subway Tile",
    matchReason: "Classic pattern matching modern style at economy price point",
    estimatedPrice: "$4.25/sq ft",
    retailer: "Wayfair",
  },
  {
    id: "4",
    detectedItem: "Cabinet Hardware",
    materialSuggestion: "Brushed Brass Pulls",
    matchReason: "Warm metal tone complements oak flooring and white cabinetry",
    estimatedPrice: "$8.99/each",
    retailer: "Amazon",
  },
  {
    id: "5",
    detectedItem: "Light Fixture",
    materialSuggestion: "Pendant - Matte Black",
    matchReason: "Industrial accent that pairs with brass hardware per style preference",
    estimatedPrice: "$149.00",
    retailer: "West Elm",
  },
];

interface ProcurementListProps {
  isComplete: boolean;
}

export function ProcurementList({ isComplete }: ProcurementListProps) {
  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    console.log("Exporting to PDF...");
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Procurement List</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isComplete ? "Your curated shopping list" : "Results will appear here"}
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
                  {mockData.map((item) => (
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
                <p className="text-2xl font-bold text-primary">$2,847</p>
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
