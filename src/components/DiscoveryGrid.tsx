import { useNavigate } from "react-router-dom";
import { DiscoveryCard } from "./DiscoveryCard";

interface DiscoveryGridProps {
  onCardClick?: (style: string) => void;
}

// Featured styles with stable Unsplash image IDs - pure interior shots without people
const featuredStyles = [
  {
    id: "modern-farmhouse-kitchen",
    title: "Modern Farmhouse Kitchen",
    // Stable Image: Classic white farmhouse kitchen (Verified)
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "japandi-bathroom",
    title: "Japandi Bathroom Oasis",
    // Stable Image: Minimalist beige bathroom with bathtub
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "industrial-loft-living",
    title: "Industrial Loft Living",
    // Stable Image: Brick wall living room with leather sofa
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coastal-dining-room",
    title: "Coastal Chic Dining",
    // Stable Image: Bright dining room with woven chairs
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mid-century-bedroom",
    title: "Mid-Century Modern Bedroom",
    // Stable Image: Walnut bedframe with mid-century styling
    imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "boho-patio",
    title: "Bohemian Outdoor Sanctuary",
    // Stable Image: Cozy patio with plants (no people)
    imageUrl: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80",
  },
];

export function DiscoveryGrid({ onCardClick }: DiscoveryGridProps) {
  const navigate = useNavigate();

  const handleCardClick = (styleId: string, imageUrl: string) => {
    // Encode the image URL to ensure it passes correctly in the query params
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
        {featuredStyles.map((style, index) => (
          <DiscoveryCard
            key={style.id}
            title={style.title}
            imageUrl={style.imageUrl}
            index={index}
            onClick={() => handleCardClick(style.id, style.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
}
