import { useNavigate } from "react-router-dom";
import { DiscoveryCard } from "./DiscoveryCard";

interface DiscoveryGridProps {
  onCardClick?: (style: string) => void;
}

// Featured styles with stable Unsplash search URLs - pure interior shots without people
const featuredStyles = [
  {
    id: "modern-farmhouse",
    title: "Modern Farmhouse Kitchen",
    imageUrl: "https://source.unsplash.com/800x600/?modern,farmhouse,kitchen,interior,nopeople",
  },
  {
    id: "japandi-bathroom",
    title: "Japandi Bathroom Oasis",
    imageUrl: "https://source.unsplash.com/800x600/?japandi,bathroom,zen,minimal,interior",
  },
  {
    id: "industrial-loft",
    title: "Industrial Loft Living",
    imageUrl: "https://source.unsplash.com/800x600/?industrial,loft,living,room,brick,concrete,interior",
  },
  {
    id: "coastal-dining",
    title: "Coastal Chic Dining",
    imageUrl: "https://source.unsplash.com/800x600/?coastal,dining,room,breezy,interior,nopeople",
  },
  {
    id: "mid-century",
    title: "Mid-Century Modern Bedroom",
    imageUrl: "https://source.unsplash.com/800x600/?mid-century,modern,bedroom,interior,retro",
  },
  {
    id: "boho-bedroom",
    title: "Bohemian Outdoor Sanctuary",
    imageUrl: "https://source.unsplash.com/800x600/?boho,patio,outdoor,cozy,plants,nopeople",
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
