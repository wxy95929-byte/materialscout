import React from "react";
import { MapPin } from "lucide-react";

interface ResultCardProps {
  id: string;
  name: string;
  reasoning: string;
  imageUrl: string;
}

export const ResultCard = ({
  name,
  reasoning,
  imageUrl,
}: ResultCardProps) => {
  const exploreUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    `${name || "interior design"} aesthetic inspiration`
  )}`;

  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300">
      {/* Full-bleed Image */}
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

      {/* Caption */}
      <div className="flex flex-col p-4">
        <h3 className="font-serif text-lg font-medium text-foreground leading-snug line-clamp-2 mb-1.5">
          {name || "Design Inspiration"}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {reasoning || "A curated mood to inspire your next space."}
        </p>

        <a
          href={exploreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-accent text-foreground text-sm font-medium rounded-xl hover:bg-accent/80 transition-colors no-underline"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Style</span>
        </a>
      </div>
    </div>
  );
};
