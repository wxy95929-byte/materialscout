import React from "react";
import { Search, ShoppingCart } from "lucide-react";

interface ResultCardProps {
  id: string;
  name: string;
  reasoning: string;
  price: string;
  imageUrl: string;
  shoppingUrl: string;
}

export const ResultCard = ({ name, reasoning, price, imageUrl, shoppingUrl }: ResultCardProps) => {
  
  // FUNCTION 1: Handle "Buy Now" - Forces a new tab safely
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const targetUrl = shoppingUrl && shoppingUrl.startsWith('http') 
      ? shoppingUrl 
      : `https://www.google.com/search?q=${encodeURIComponent(name)}&tbm=shop`;
    
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // FUNCTION 2: Handle "Find Similar" - Opens Google Images
  const handleFindSimilar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const query = encodeURIComponent(name + " interior design");
    const googleImageUrl = `https://www.google.com/search?tbm=isch&q=${query}`;
    
    window.open(googleImageUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-card rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 group">
      
      {/* 1. IMAGE SECTION (Fixed Height - 55%) */}
      <div className="relative h-[55%] w-full overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 bg-foreground/70 backdrop-blur-md text-background px-3 py-1 rounded-full text-sm font-semibold">
          {price || "Check Price"}
        </div>
      </div>

      {/* 2. CONTENT SECTION (Remaining Height) */}
      <div className="flex flex-col flex-1 p-6">
        {/* Text Area */}
        <div className="flex-1">
          <h3 className="text-xl font-serif font-bold text-foreground leading-tight line-clamp-2 mb-2">
            {name || "Unknown Item"}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {reasoning || "Matches your uploaded style perfectly."}
          </p>
        </div>

        {/* 3. BUTTONS (Fixed at Bottom) */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-border">
          
          {/* Find Similar Button */}
          <button 
            onClick={handleFindSimilar}
            className="flex-1 px-4 py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Similar</span>
          </button>
          
          {/* Buy Now Button */}
          <button 
            onClick={handleBuyNow}
            className="flex-[1.5] px-4 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
