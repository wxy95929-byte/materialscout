import { useNavigate } from "react-router-dom";
import { DiscoveryCard } from "./DiscoveryCard";

interface DiscoveryGridProps {
  onCardClick?: (style: string) => void;
}

// Featured styles with curated Unsplash images - specifically interior design shots
const featuredStyles = [
  {
    id: "modern-farmhouse",
    title: "Modern Farmhouse Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
  },
  {
    id: "japandi-bathroom",
    title: "Japandi Bathroom",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800",
  },
  {
    id: "industrial-loft",
    title: "Industrial Loft Living Room",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800",
  },
  {
    id: "boho-bedroom",
    title: "Bohemian Bedroom",
    imageUrl: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=800",
  },
  {
    id: "scandinavian-living",
    title: "Scandinavian Living Room",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800",
  },
  {
    id: "coastal-dining",
    title: "Coastal Dining Room",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800",
  },
  {
    id: "mid-century",
    title: "Mid-Century Modern",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800",
  },
  {
    id: "minimalist-office",
    title: "Minimalist Home Office",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800",
  },
];

export function DiscoveryGrid({ onCardClick }: DiscoveryGridProps) {
  const navigate = useNavigate();

  const handleCardClick = (styleId: string, styleTitle: string) => {
    // Navigate to demo results page
    navigate(`/result?demo=true&style=${styleId}`);
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
            onClick={() => handleCardClick(style.id, style.title)}
          />
        ))}
      </div>
    </div>
  );
}
