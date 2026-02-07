import { DiscoveryCard } from "./DiscoveryCard";

interface DiscoveryGridProps {
  onCardClick?: (style: string) => void;
}

// Featured styles with curated Unsplash images
const featuredStyles = [
  {
    id: "1",
    title: "Modern Farmhouse Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop",
  },
  {
    id: "2",
    title: "Japandi Bathroom",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=700&fit=crop",
  },
  {
    id: "3",
    title: "Industrial Loft Living Room",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=900&fit=crop",
  },
  {
    id: "4",
    title: "Scandinavian Bedroom",
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=750&fit=crop",
  },
  {
    id: "5",
    title: "Mediterranean Patio",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=850&fit=crop",
  },
  {
    id: "6",
    title: "Coastal Dining Room",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=700&fit=crop",
  },
  {
    id: "7",
    title: "Bohemian Reading Nook",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=900&fit=crop",
  },
  {
    id: "8",
    title: "Minimalist Home Office",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop",
  },
];

export function DiscoveryGrid({ onCardClick }: DiscoveryGridProps) {
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
            onClick={() => onCardClick?.(style.title)}
          />
        ))}
      </div>
    </div>
  );
}
