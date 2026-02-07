import { useState } from "react";
import { ExternalLink, Heart, ScanSearch } from "lucide-react";
import { ProductResult } from "@/hooks/useAnalyzeImage";
import { toast } from "sonner";

interface PinCardProps {
  product: ProductResult;
  index: number;
}

// Fallback placeholder images when no real image is available
const getFallbackImage = (itemName: string): string => {
  const itemLower = itemName.toLowerCase();
  
  if (itemLower.includes("floor")) {
    return "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=600&fit=crop";
  }
  if (itemLower.includes("counter")) {
    return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop";
  }
  if (itemLower.includes("backsplash") || itemLower.includes("tile")) {
    return "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=550&fit=crop";
  }
  if (itemLower.includes("cabinet") || itemLower.includes("pull") || itemLower.includes("hardware")) {
    return "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=400&fit=crop";
  }
  if (itemLower.includes("light") || itemLower.includes("pendant") || itemLower.includes("lamp")) {
    return "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=650&fit=crop";
  }
  if (itemLower.includes("rug") || itemLower.includes("carpet")) {
    return "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=450&fit=crop";
  }
  if (itemLower.includes("table") || itemLower.includes("coffee")) {
    return "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=500&fit=crop";
  }
  if (itemLower.includes("paint") || itemLower.includes("wall")) {
    return "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=600&fit=crop";
  }
  if (itemLower.includes("sofa") || itemLower.includes("couch")) {
    return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=480&fit=crop";
  }
  if (itemLower.includes("chair")) {
    return "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=550&fit=crop";
  }
  if (itemLower.includes("bed") || itemLower.includes("mattress")) {
    return "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=500&fit=crop";
  }
  if (itemLower.includes("desk") || itemLower.includes("office")) {
    return "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=500&fit=crop";
  }
  return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=500&fit=crop";
};

export function PinCard({ product, index }: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use real product image from Tavily, fallback to placeholder
  const imageUrl = (!imageError && product.product_image) 
    ? product.product_image 
    : getFallbackImage(product.item_name);

  const handleVisualSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSearching(true);
    
    // Simulate visual search
    setTimeout(() => {
      setIsSearching(false);
      toast.success("Found similar products", {
        description: `Searching for more like "${product.item_name}"`,
        action: {
          label: "View",
          onClick: () => window.open(product.product_url, "_blank"),
        },
      });
    }, 1500);
  };

  return (
    <div 
      className="break-inside-avoid mb-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div
        className="group relative rounded-3xl overflow-hidden bg-muted cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4]">
          <img
            src={imageUrl}
            alt={product.product_title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
            onError={() => setImageError(true)}
          />
          
          {/* Real Product Badge */}
          {product.product_image && !imageError && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium">
              Real Product
            </div>
          )}
          
          {/* Visual Search Button - Always visible bottom right */}
          <button
            onClick={handleVisualSearch}
            disabled={isSearching}
            className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-white shadow-lg z-10"
            title="Find similar"
          >
            {isSearching ? (
              <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            ) : (
              <ScanSearch className="w-4 h-4 text-foreground" />
            )}
          </button>
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {/* Save/Heart Button - Top Right */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-white shadow-lg"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
              />
            </button>

            {/* Buy Now Button - Links to REAL product URL */}
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 right-3 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
            >
              Buy Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content - Product Info */}
        <div className="p-4 bg-card">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.item_name}
          </p>
          <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-2">
            {product.product_title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {product.reasoning}
          </p>
          <span className="inline-block mt-2 text-sm font-medium text-foreground">
            {product.estimated_price}
          </span>
        </div>
      </div>
    </div>
  );
}
