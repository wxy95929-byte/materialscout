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
      {
        id: "1",
        name: "Warm Shiplap Walls",
        reasoning: "Horizontal wood paneling adds rustic depth and timeless farmhouse character.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "2",
        name: "Matte Black Hardware",
        reasoning: "Dark metal accents ground creamy tones and add industrial contrast.",
        imageUrl: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "3",
        name: "Open Shelving Vignette",
        reasoning: "Curated displays of ceramics and greenery bring warmth to open kitchens.",
        imageUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "4",
        name: "Natural Linen Textures",
        reasoning: "Soft, undyed fabrics layered on wood create an organic, lived-in feel.",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  "japandi-bathroom": {
    styleName: "Japandi Bathroom Oasis",
    items: [
      {
        id: "1",
        name: "Zen Stone Texture",
        reasoning: "Smooth river stones evoke calm and connect the space to nature.",
        imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "2",
        name: "Bamboo Details",
        reasoning: "Light wood grain introduces warmth without visual heaviness.",
        imageUrl: "https://images.unsplash.com/photo-1545083036-b175dd155a1d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "3",
        name: "Soft Beige Linen",
        reasoning: "Neutral textiles soften hard surfaces and add tactile luxury.",
        imageUrl: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c95?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "4",
        name: "Minimalist Room Corner",
        reasoning: "Intentional emptiness creates breathing room and visual peace.",
        imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  "industrial-loft-living": {
    styleName: "Industrial Loft Living",
    items: [
      {
        id: "1",
        name: "Exposed Brick Warmth",
        reasoning: "Raw masonry walls add historical texture and earthy color.",
        imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "2",
        name: "Concrete & Steel",
        reasoning: "Polished concrete floors and metal beams define the urban loft aesthetic.",
        imageUrl: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "3",
        name: "Vintage Edison Glow",
        reasoning: "Warm filament lighting softens harsh industrial materials.",
        imageUrl: "https://images.unsplash.com/photo-1507473888900-52e1ad14592a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "4",
        name: "Distressed Leather",
        reasoning: "Aged leather brings rich patina and inviting comfort to raw spaces.",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  "coastal-dining-room": {
    styleName: "Coastal Chic Dining",
    items: [
      {
        id: "1",
        name: "Weathered Driftwood",
        reasoning: "Sun-bleached wood tones evoke seaside serenity and organic warmth.",
        imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "2",
        name: "Woven Rattan Texture",
        reasoning: "Natural weave patterns bring breezy island vibes indoors.",
        imageUrl: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "3",
        name: "Ocean Blue Ceramics",
        reasoning: "Deep blue glazes echo the sea and anchor a coastal palette.",
        imageUrl: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "4",
        name: "Soft White Draping",
        reasoning: "Sheer, flowing fabrics capture light and movement like ocean breezes.",
        imageUrl: "https://images.unsplash.com/photo-1513506003013-192a5d52f0bf?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  "mid-century-bedroom": {
    styleName: "Mid-Century Modern Bedroom",
    items: [
      {
        id: "1",
        name: "Warm Walnut Grain",
        reasoning: "Rich wood tones are the backbone of mid-century warmth.",
        imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "2",
        name: "Brass & Gold Accents",
        reasoning: "Metallic touches add retro glamour to clean-lined furniture.",
        imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "3",
        name: "Geometric Patterns",
        reasoning: "Bold, angular motifs in textiles channel 1960s design energy.",
        imageUrl: "https://images.unsplash.com/photo-1596633606275-8252364df82a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "4",
        name: "Organic Greenery",
        reasoning: "Lush indoor plants soften angular furniture and bring life to the room.",
        imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  "boho-patio": {
    styleName: "Bohemian Outdoor Sanctuary",
    items: [
      {
        id: "1",
        name: "Layered Textiles",
        reasoning: "Mixed patterns and rich fabrics create an eclectic, cozy outdoor retreat.",
        imageUrl: "https://images.unsplash.com/photo-1617500588698-b80c102660d6?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "2",
        name: "Macramé & Fringe",
        reasoning: "Handcrafted knots and tassels add artisanal boho texture.",
        imageUrl: "https://images.unsplash.com/photo-1579656381226-5fc704617a8f?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "3",
        name: "Moroccan Lantern Glow",
        reasoning: "Patterned light casting creates a magical evening atmosphere.",
        imageUrl: "https://images.unsplash.com/photo-1542728929-1a067ca647dc?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "4",
        name: "Lush Tropical Greenery",
        reasoning: "Abundant palms and ferns transform patios into verdant escapes.",
        imageUrl: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80",
      },
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
