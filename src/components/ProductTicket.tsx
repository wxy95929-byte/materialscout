import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcurementItem } from "@/hooks/useAnalyzeRoom";

interface ProductTicketProps {
  item: ProcurementItem;
  index: number;
}

// Placeholder images for different material types using relevant Unsplash keywords
const getPlaceholderImage = (detectedItem: string): string => {
  const itemLower = detectedItem.toLowerCase();
  
  if (itemLower.includes("floor")) {
    return "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=120&h=120&fit=crop"; // wood flooring
  }
  if (itemLower.includes("counter")) {
    return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=120&h=120&fit=crop"; // marble countertop
  }
  if (itemLower.includes("backsplash") || itemLower.includes("tile")) {
    return "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=120&h=120&fit=crop"; // subway tile
  }
  if (itemLower.includes("hardware") || itemLower.includes("cabinet") || itemLower.includes("pull")) {
    return "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=120&h=120&fit=crop"; // brass cabinet hardware
  }
  if (itemLower.includes("light") || itemLower.includes("pendant") || itemLower.includes("fixture")) {
    return "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&h=120&fit=crop"; // pendant light
  }
  if (itemLower.includes("rug") || itemLower.includes("carpet")) {
    return "https://images.unsplash.com/photo-1600166898405-da9535204843?w=120&h=120&fit=crop"; // beige rug
  }
  if (itemLower.includes("table") || itemLower.includes("coffee")) {
    return "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=120&h=120&fit=crop"; // modern coffee table
  }
  if (itemLower.includes("paint") || itemLower.includes("wall")) {
    return "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=120&h=120&fit=crop"; // wall paint
  }
  if (itemLower.includes("sofa") || itemLower.includes("couch")) {
    return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop"; // modern sofa
  }
  if (itemLower.includes("chair")) {
    return "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=120&h=120&fit=crop"; // accent chair
  }
  return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=120&h=120&fit=crop"; // interior design default
};

export function ProductTicket({ item, index }: ProductTicketProps) {
  return (
    <div 
      className="flex items-stretch gap-4 bg-card p-4 hover:bg-accent/30 transition-all animate-fade-in-up"
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
