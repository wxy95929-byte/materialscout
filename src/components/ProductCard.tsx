import { ExternalLink } from "lucide-react";
import { ProcurementItem } from "@/hooks/useAnalyzeRoom";

interface ProductCardProps {
  item: ProcurementItem;
  index: number;
}

// Placeholder images for different material types
const getPlaceholderImage = (detectedItem: string): string => {
  const itemLower = detectedItem.toLowerCase();
  
  if (itemLower.includes("floor")) {
    return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop";
  }
  if (itemLower.includes("counter")) {
    return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop";
  }
  if (itemLower.includes("backsplash") || itemLower.includes("tile")) {
    return "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop";
  }
  if (itemLower.includes("cabinet") || itemLower.includes("hardware")) {
    return "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop";
  }
  if (itemLower.includes("light") || itemLower.includes("fixture")) {
    return "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop";
  }
  if (itemLower.includes("paint") || itemLower.includes("wall")) {
    return "https://images.unsplash.com/photo-1562184647-4d85f60ae2a9?w=400&h=400&fit=crop";
  }
  
  // Default material image
  return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop";
};

export function ProductCard({ item, index }: ProductCardProps) {
  return (
    <div 
      className="product-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Material Image */}
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={getPlaceholderImage(item.detectedItem)}
          alt={item.materialSuggestion}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category Tag */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {item.detectedItem}
        </span>

        {/* Material Name */}
        <h3 className="font-serif text-lg text-foreground mt-2 leading-snug">
          {item.materialSuggestion}
        </h3>

        {/* Match Reason */}
        <p className="text-sm text-muted-foreground mt-2 font-light line-clamp-2">
          {item.matchReason}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          {/* Price Tag */}
          <div className="bg-accent px-3 py-1.5">
            <span className="text-sm font-medium text-foreground">
              {item.estimatedPrice}
            </span>
          </div>

          {/* Shop Link */}
          <a
            href={item.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.retailer}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
