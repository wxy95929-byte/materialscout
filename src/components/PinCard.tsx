import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { ProductResult } from "@/hooks/useAnalyzeImage";
import { Button } from "@/components/ui/button";

interface PinCardProps {
  product: ProductResult;
  index: number;
}

export function PinCard({ product, index }: PinCardProps) {
  const [imageError, setImageError] = useState(false);

  // Use product image, with a simple fallback
  const imageUrl = !imageError && product.product_image
    ? product.product_image
    : "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";

  // FORCE new tab to avoid "Refused to connect" errors in iframe
  const handleBuyNow = () => {
    if (!product.product_url) return;
    window.open(product.product_url, '_blank', 'noopener,noreferrer');
  };

  // Open Google Image Search for similar items
  const handleFindSimilar = () => {
    const query = encodeURIComponent(product.product_title + " interior design");
    window.open(`https://www.google.com/search?tbm=isch&q=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="break-inside-avoid mb-6 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image Area - 50% height with subtle overlay */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={product.product_title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          {/* Subtle dark overlay for depth */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Info Area - Typography-Led */}
        <div className="p-5 bg-card">
          {/* Category + Source */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              {product.item_name}
            </p>
            {product.product_source && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {product.product_source}
              </span>
            )}
          </div>
          
          {/* Hero Title - Large Serif */}
          <h3 className="font-serif text-xl font-semibold text-foreground leading-tight mb-3 line-clamp-2">
            {product.product_title}
          </h3>
          
          {/* Reasoning - 2 lines max */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {product.reasoning}
          </p>
          
          {/* Price Tag */}
          <p className="text-lg font-bold text-foreground mb-5">
            {product.estimated_price}
          </p>

          {/* Action Buttons - Side by Side */}
          <div className="flex gap-3">
            {/* Find Similar - Secondary Button */}
            <Button
              variant="outline"
              onClick={handleFindSimilar}
              className="flex-1 h-11 gap-2 rounded-full border-border hover:bg-accent"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Find Similar</span>
            </Button>

            {/* Buy Now - Primary Button using window.open */}
            <Button
              onClick={handleBuyNow}
              className="flex-1 h-11 gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Buy Now</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
