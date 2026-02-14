import React from "react";
import { MapPin, ShoppingBag } from "lucide-react";

interface ResultCardProps {
  id: string;
  name: string;
  reasoning: string;
  imageUrl: string;
  pinUrl?: string;
  isTrendingMode?: boolean;
}

const BRANDS = ["West Elm", "Crate & Barrel", "CB2", "Pottery Barn", "Anthropologie", "Rejuvenation", "IKEA", "Target"];

export const ResultCard = ({
  name,
  reasoning,
  imageUrl,
  pinUrl,
  isTrendingMode = true,
}: ResultCardProps) => {
  const isBrandedProduct = BRANDS.some(brand =>
    name.toLowerCase().includes(brand.toLowerCase()) ||
    reasoning.toLowerCase().includes(brand.toLowerCase())
  );

  const showShopButton = isBrandedProduct || !isTrendingMode;

  const shoppingUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(name || "interior design")}`;
  const pinterestUrl = pinUrl || `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(
    `${name || "interior design"} interior design style`
  )}`;

  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300">
      <div className="relative w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/800x1000/e0e0e0/999999?text=Image+Unavailable";
          }}
        />
      </div>

      <div className="flex flex-col p-4">
        <h3 className="font-serif text-lg font-medium text-foreground leading-snug line-clamp-2 mb-1.5">
          {name || "Design Inspiration"}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {reasoning || "A curated mood to inspire your next space."}
        </p>

        {showShopButton ? (
          <a
            href={shoppingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition-colors no-underline"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Similar</span>
          </a>
        ) : (
          <a
            href={pinterestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#E60023] text-white text-sm font-medium rounded-xl hover:bg-[#ad081b] transition-colors no-underline"
          >
            <MapPin className="w-4 h-4" />
            <span>Pin Inspiration</span>
          </a>
        )}
      </div>
    </div>
  );
};
