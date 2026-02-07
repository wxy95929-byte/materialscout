import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcurementItem } from "@/hooks/useAnalyzeRoom";

interface ProductTicketProps {
  item: ProcurementItem;
  index: number;
}

// Placeholder images for different material types
const getPlaceholderImage = (detectedItem: string): string => {
  const itemLower = detectedItem.toLowerCase();
  
  if (itemLower.includes("floor")) {
    return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop";
  }
  if (itemLower.includes("counter")) {
    return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop";
  }
  if (itemLower.includes("backsplash") || itemLower.includes("tile")) {
    return "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=120&h=120&fit=crop";
  }
  if (itemLower.includes("hardware") || itemLower.includes("cabinet")) {
    return "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=120&h=120&fit=crop";
  }
  if (itemLower.includes("light") || itemLower.includes("fixture")) {
    return "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=120&h=120&fit=crop";
  }
  return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop";
};

export function ProductTicket({ item, index }: ProductTicketProps) {
  return (
    <div 
      className="flex items-stretch gap-4 bg-card border border-border p-4 hover:border-foreground/20 transition-all animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 bg-muted overflow-hidden">
        <img
          src={getPlaceholderImage(item.detectedItem)}
          alt={item.materialSuggestion}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {item.detectedItem}
        </span>
        <h3 className="font-serif text-lg text-foreground leading-snug mt-0.5 truncate">
          {item.materialSuggestion}
        </h3>
        <p className="text-sm text-muted-foreground font-light mt-1 line-clamp-1">
          {item.matchReason}
        </p>
      </div>

      {/* Price & Action */}
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <div className="bg-accent px-3 py-1.5">
          <span className="text-sm font-semibold text-foreground">
            {item.estimatedPrice}
          </span>
        </div>
        <a
          href={item.searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
        >
          Shop
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
