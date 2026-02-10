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
      { id: "1", name: "White Shiplap Texture", reasoning: "The foundation of farmhouse style.", imageUrl: "/images/white-shiplap.jpeg" },
      { id: "2", name: "Matte Black Hardware", reasoning: "Modern contrast against white cabinets.", imageUrl: "/images/matte-black-hardware.png" },
      { id: "3", name: "Natural Oak Details", reasoning: "Brings warmth to the clean palette.", imageUrl: "/images/natural-oak.png" },
    ],
  },
  "japandi-bathroom": {
    styleName: "Japandi Bathroom Oasis",
    items: [
      { id: "1", name: "Stone Textures", reasoning: "Natural elements for a zen spa feel.", imageUrl: "/images/stone-bathroom.jpg" },
      { id: "2", name: "Warm Bamboo", reasoning: "Sustainable wood accents.", imageUrl: "/images/warm-bamboo.jpeg" },
      { id: "3", name: "Minimalist Ceramics", reasoning: "Clean lines and function.", imageUrl: "/images/minimalist-ceramics.jpg" },
    ],
  },
  "industrial-loft-living": {
    styleName: "Industrial Loft Living",
    items: [
      { id: "1", name: "Exposed Brick", reasoning: "The signature of industrial lofts.", imageUrl: "/images/exposed-brick.jpeg" },
      { id: "2", name: "Distressed Leather", reasoning: "Timeless and durable seating material.", imageUrl: "https://images.unsplash.com/photo-1544075191-447087654a9c?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Concrete Surfaces", reasoning: "Cool grey tones for a modern edge.", imageUrl: "https://images.unsplash.com/photo-1516644243610-858348633324?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "coastal-dining-room": {
    styleName: "Coastal Chic Dining",
    items: [
      { id: "1", name: "Driftwood Finishes", reasoning: "Weathered wood evokes the beach.", imageUrl: "https://images.unsplash.com/photo-1519757045388-6c4b2663994c?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Sea Glass Blue", reasoning: "A pop of color from the ocean.", imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Sandy Beige Linen", reasoning: "Neutral backdrop like the shore.", imageUrl: "https://images.unsplash.com/photo-1579762593175-20226054f195?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "mid-century-bedroom": {
    styleName: "Mid-Century Modern Bedroom",
    items: [
      { id: "1", name: "Walnut Wood", reasoning: "The classic mid-century material.", imageUrl: "https://images.unsplash.com/photo-1610360348702-86937c569a30?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Mustard Velvet", reasoning: "Retro color pops for textiles.", imageUrl: "https://images.unsplash.com/photo-1598532163257-52d880cb18a2?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Geometric Rugs", reasoning: "Bold patterns to anchor the room.", imageUrl: "https://images.unsplash.com/photo-1575296500388-349f43a059d0?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "boho-patio": {
    styleName: "Bohemian Outdoor Sanctuary",
    items: [
      { id: "1", name: "Woven Rattan", reasoning: "Essential for that relaxed bohemian vibe.", imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80" },
      { id: "2", name: "Tropical Greenery", reasoning: "Blurring the lines between indoors and out.", imageUrl: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80" },
      { id: "3", name: "Macrame Textiles", reasoning: "Soft, handcrafted textures.", imageUrl: "https://images.unsplash.com/photo-1599695079450-937b83648eb1?auto=format&fit=crop&w=800&q=80" },
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
