import { useNavigate } from "react-router-dom";
import { DiscoveryCard } from "./DiscoveryCard";

export type TrendingStyle = {
  id: string;
  name: string;
  image: string;
  description: string;
};

interface DiscoveryGridProps {
  styles: TrendingStyle[];
  onCardClick?: (style: string) => void;
}

export function DiscoveryGrid({ styles }: DiscoveryGridProps) {
  const navigate = useNavigate();

  const handleCardClick = (styleId: string, imageUrl: string) => {
    const encodedImage = encodeURIComponent(imageUrl);
    navigate(`/result?demo=true&style=${styleId}&demoImage=${encodedImage}`);
  };

  return (
    <div className="px-4 lg:px-8 pb-24">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="font-serif text-2xl text-foreground">Trending Styles</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Explore curated renovations for inspiration
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto columns-2 lg:columns-3 xl:columns-4 gap-4">
        {styles.map((style, index) => (
          <DiscoveryCard
            key={style.id}
            title={style.name}
            imageUrl={style.image}
            index={index}
            onClick={() => handleCardClick(style.id, style.image)}
          />
        ))}
      </div>
    </div>
  );
}
