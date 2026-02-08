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

export const ResultCard = ({
  name,
  reasoning,
  price,
  imageUrl,
  shoppingUrl,
}: ResultCardProps) => {
  // 1. Construct the Search URL (Fail-safe)
  const googleImageSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    `${name || "modern furniture"} interior design`
  )}`;

  // 2. Sanitize Shopping URL - ensure it starts with http/https
  const safeLink =
    shoppingUrl && shoppingUrl.startsWith("http")
      ? shoppingUrl
      : shoppingUrl
      ? `https://${shoppingUrl}`
      : null;

  // 3. Final URL - fallback to Google Shopping if no valid link
  const finalShoppingUrl =
    safeLink || `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(name)}`;

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
      {/* IMAGE HEADER */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Use a reliable, neutral grey placeholder image
            (e.target as HTMLImageElement).src =
              "https://placehold.co/800x600/e0e0e0/999999?text=Image+Unavailable";
          }}
        />

        {/* Price Tag Badge */}
        {price && (
          <div className="absolute bottom-3 right-3 bg-foreground/80 backdrop-blur-sm text-background text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {price}
          </div>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg font-medium text-foreground leading-snug line-clamp-2 mb-2">
          {name || "Stylish Furniture Item"}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {reasoning || "Selected based on your room's style and color palette."}
        </p>


        {/* BUTTONS - PURE <a> TAGS */}
        <div className="mt-auto flex gap-3 pt-2">
          {/* Find Similar Link */}
          <a
            href={googleImageSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground text-sm font-medium rounded-xl hover:bg-accent transition-colors no-underline"
          >
            <Search className="w-4 h-4" />
            <span>Similar</span>
          </a>

          {/* Buy Now Link */}
          <a
            href={finalShoppingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors shadow-sm no-underline"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Buy</span>
          </a>
        </div>
      </div>
    </div>
  );
};
