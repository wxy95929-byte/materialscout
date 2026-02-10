import { useSearchParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";

type MoodItem = {
  id: string;
  name: string;
  reasoning: string;
  imageUrl: string;
};

type MoodBoard = {
  styleName: string;
  items: MoodItem[];
};

const MOOD_BOARDS: Record<string, MoodBoard> = {
  "modern-farmhouse-kitchen": {
    styleName: "Modern Farmhouse Kitchen",
    items: [
      { id: "1", name: "White Shiplap Texture", reasoning: "The quintessential farmhouse backdrop foundation.", imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Matte Black Accents", reasoning: "Adds modern contrast to the rustic white palette.", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Natural Wood Elements", reasoning: "Warmth that grounds the bright airy space.", imageUrl: "https://images.unsplash.com/photo-1606822350567-c290c008064d?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "japandi-bathroom": {
    styleName: "Japandi Bathroom Oasis",
    items: [
      { id: "1", name: "Zen Stone Textures", reasoning: "Natural, matte finishes for tranquility.", imageUrl: "https://images.unsplash.com/photo-1513689222272-91e8466b0a9b?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Bamboo Wood accents", reasoning: "Warmth and sustainability in design.", imageUrl: "https://images.unsplash.com/photo-1594269146507-68b6b15d2a65?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Soft Beige Linen", reasoning: "Softness without visual clutter.", imageUrl: "https://images.unsplash.com/photo-1579762593175-20226054f195?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "industrial-loft-living": {
    styleName: "Industrial Loft Living",
    items: [
      { id: "1", name: "Exposed Brick Texture", reasoning: "The hallmark of authentic industrial loft design.", imageUrl: "https://images.unsplash.com/photo-1579969561005-2b0235e4e758?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Distressed Leather", reasoning: "Adds character and history to the seating.", imageUrl: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Raw Concrete Finish", reasoning: "Cool, architectural tones for surfaces.", imageUrl: "https://images.unsplash.com/photo-1517646331032-9e8563c520a1?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "coastal-dining-room": {
    styleName: "Coastal Chic Dining",
    items: [
      { id: "1", name: "Weathered Driftwood", reasoning: "Sun-bleached wood tones from the shore.", imageUrl: "https://images.unsplash.com/photo-1516886635546-2495d4d3140e?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Ocean Blue Glass", reasoning: "Reflects the colors of the sea.", imageUrl: "https://images.unsplash.com/photo-1505152843812-748722b9b216?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Natural Jute Fiber", reasoning: "Sand-like texture for rugs and mats.", imageUrl: "https://images.unsplash.com/photo-1528459384483-3563964d363d?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "mid-century-bedroom": {
    styleName: "Mid-Century Modern Bedroom",
    items: [
      { id: "1", name: "Rich Walnut Wood", reasoning: "The definitive wood tone of the era.", imageUrl: "https://images.unsplash.com/photo-1610360348702-86937c569a30?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Geometric Patterns", reasoning: "Bold, retro shapes for textiles.", imageUrl: "https://images.unsplash.com/photo-1580196920985-3391d64c232f?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Brass Finishes", reasoning: "Sophisticated metallic accents.", imageUrl: "https://images.unsplash.com/photo-1507473888900-52e1ad14592a?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "boho-patio": {
    styleName: "Bohemian Outdoor Sanctuary",
    items: [
      { id: "1", name: "Rattan & Wicker", reasoning: "Organic woven textures for relaxed lounging.", imageUrl: "https://images.unsplash.com/photo-1616627561950-9f746e33018e?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Macrame Details", reasoning: "Handcrafted textiles add bohemian spirit.", imageUrl: "https://images.unsplash.com/photo-1520023718919-613d9657b93a?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Lush Potted Greenery", reasoning: "Blurring the line between indoors and nature.", imageUrl: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80" },
    ],
  },
};

const DEFAULT_MOOD: MoodBoard = {
  styleName: "Curated Inspiration",
  items: [
    {
      id: "1",
      name: "Select a Style",
      reasoning: "Pick a Trending Style to see a curated mood board.",
      imageUrl: "https://placehold.co/800x1000/e0e0e0/999999?text=Select+a+Trending+Style",
    },
  ],
};

function getMoodBoard(styleId: string): MoodBoard {
  return MOOD_BOARDS[styleId] ?? DEFAULT_MOOD;
}

export default function Result() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isDemo = searchParams.get("demo") === "true";
  const styleId = searchParams.get("style") || "";

  const displayImage =
    location.state?.image ||
    decodeURIComponent(searchParams.get("demoImage") || "") ||
    "https://placehold.co/800x600/e0e0e0/ffffff?text=No+Image+Selected";

  const moodData = getMoodBoard(styleId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="flex-1">
            <h1 className="font-serif text-xl lg:text-2xl text-foreground">
              {moodData.styleName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isDemo ? "Mood Board" : "Style Inspiration"}
            </p>
          </div>

          <Link
            to="/"
            className="p-2 rounded-full hover:bg-accent transition-colors"
            title="Home"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Demo Badge */}
        {isDemo && (
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border">
            <span className="text-sm font-medium text-foreground">✨ Mood Board</span>
            <span className="text-sm text-muted-foreground">
              Visual inspiration for {moodData.styleName}
            </span>
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Reference Image */}
          <div className="lg:w-1/3 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
                <img
                  src={displayImage}
                  alt="Style Inspiration"
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/800x600/e0e0e0/ffffff?text=Image+Unavailable";
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Your style inspiration
              </p>
            </div>
          </div>

          {/* Right: Mood Board Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moodData.items.map((item) => (
                <ResultCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  reasoning={item.reasoning}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Explore More Styles
          </Link>
        </div>
      </main>
    </div>
  );
}
