import { useSearchParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";

// Demo data for each style - hardcoded curated results with verified Unsplash URLs and real retailer links
const demoResultsByStyle: Record<string, {
  styleName: string;
  items: Array<{
    id: string;
    name: string;
    reasoning: string;
    price: string;
    imageUrl: string;
    shoppingUrl: string;
  }>;
}> = {
  "modern-farmhouse-kitchen": {
    styleName: "Modern Farmhouse Kitchen",
    items: [
      {
        id: "1",
        name: "Matte Black Windsor Chair",
        reasoning: "Classic farmhouse silhouette from Crate & Barrel.",
        price: "$149.00",
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.crateandbarrel.com/search?query=matte+black+windsor+chair",
      },
      {
        id: "2",
        name: "Rustic Wood Island Stool",
        reasoning: "Warm wood tones matching Pottery Barn's aesthetic.",
        price: "$225.00",
        imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.potterybarn.com/search/results.html?words=rustic+wood+bar+stool",
      },
      {
        id: "3",
        name: "Industrial Dome Pendant",
        reasoning: "Vintage style lighting found at West Elm.",
        price: "$189.00",
        imageUrl: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=industrial+dome+pendant",
      },
      {
        id: "4",
        name: "Stoneware Pitcher",
        reasoning: "Organic ceramics typical of Crate & Barrel.",
        price: "$45.00",
        imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.crateandbarrel.com/search?query=stoneware+pitcher",
      },
    ],
  },
  "japandi-bathroom": {
    styleName: "Japandi Bathroom Oasis",
    items: [
      {
        id: "1",
        name: "Bamboo Bathtub Tray",
        reasoning: "Natural wood element for spa-like relaxation.",
        price: "$45.00",
        imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.cb2.com/search?query=bamboo+bath+caddy",
      },
      {
        id: "2",
        name: "Stone Soap Dispenser",
        reasoning: "Matte finish aligns with Zen aesthetics.",
        price: "$25.00",
        imageUrl: "https://images.unsplash.com/photo-1585703900468-13c7a978ad86?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=stone+soap+dispenser",
      },
      {
        id: "3",
        name: "Minimalist Round Mirror",
        reasoning: "Simple geometry suitable for Japandi style.",
        price: "$120.00",
        imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.cb2.com/search?query=black+round+wall+mirror",
      },
      {
        id: "4",
        name: "Waffle Weave Towels",
        reasoning: "Textural warmth essential for the look.",
        price: "$35.00",
        imageUrl: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c95?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.potterybarn.com/search/results.html?words=waffle+weave+towels",
      },
    ],
  },
  "industrial-loft-living": {
    styleName: "Industrial Loft Living",
    items: [
      {
        id: "1",
        name: "Leather Chesterfield Sofa",
        reasoning: "Classic leather seating from Pottery Barn.",
        price: "$2,400.00",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.potterybarn.com/search/results.html?words=leather+chesterfield+sofa",
      },
      {
        id: "2",
        name: "Concrete Coffee Table",
        reasoning: "Modern industrial edge from CB2.",
        price: "$450.00",
        imageUrl: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.cb2.com/search?query=concrete+coffee+table",
      },
      {
        id: "3",
        name: "Metal Floor Lamp",
        reasoning: "Sleek functionality found at West Elm.",
        price: "$180.00",
        imageUrl: "https://images.unsplash.com/photo-1507473888900-52e1ad14592a?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=industrial+floor+lamp",
      },
      {
        id: "4",
        name: "Abstract Canvas Art",
        reasoning: "Large scale art for loft walls.",
        price: "$150.00",
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.crateandbarrel.com/search?query=abstract+wall+art",
      },
    ],
  },
  "coastal-dining-room": {
    styleName: "Coastal Chic Dining",
    items: [
      {
        id: "1",
        name: "Whitewashed Oak Table",
        reasoning: "Weathered wood foundation from Pottery Barn.",
        price: "$899.00",
        imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.potterybarn.com/search/results.html?words=whitewash+dining+table",
      },
      {
        id: "2",
        name: "Rattan Dining Chair",
        reasoning: "Natural texture from Crate & Barrel.",
        price: "$350.00",
        imageUrl: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.crateandbarrel.com/search?query=rattan+dining+chair",
      },
      {
        id: "3",
        name: "Blue Ceramic Vase",
        reasoning: "Ocean-inspired decor from West Elm.",
        price: "$79.00",
        imageUrl: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=blue+ceramic+vase",
      },
      {
        id: "4",
        name: "Woven Pendant Light",
        reasoning: "Breezy lighting from CB2.",
        price: "$199.00",
        imageUrl: "https://images.unsplash.com/photo-1513506003013-192a5d52f0bf?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.cb2.com/search?query=woven+pendant+light",
      },
    ],
  },
  "mid-century-bedroom": {
    styleName: "Mid-Century Modern Bedroom",
    items: [
      {
        id: "1",
        name: "Mid-Century Spindle Bed",
        reasoning: "Iconic silhouette from West Elm.",
        price: "$1,200.00",
        imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=mid+century+spindle+bed",
      },
      {
        id: "2",
        name: "Brass Table Lamp",
        reasoning: "Metallic accent from CB2.",
        price: "$120.00",
        imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.cb2.com/search?query=brass+table+lamp",
      },
      {
        id: "3",
        name: "Geometric Area Rug",
        reasoning: "Retro patterns from West Elm.",
        price: "$300.00",
        imageUrl: "https://images.unsplash.com/photo-1596633606275-8252364df82a?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=geometric+wool+rug",
      },
      {
        id: "4",
        name: "Ceramic Planter on Stand",
        reasoning: "Mid-century staple from West Elm.",
        price: "$60.00",
        imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=mid+century+planter",
      },
    ],
  },
  "boho-patio": {
    styleName: "Bohemian Outdoor Sanctuary",
    items: [
      {
        id: "1",
        name: "Wicker Lounge Chair",
        reasoning: "Outdoor lounging from Anthropologie.",
        price: "$299.00",
        imageUrl: "https://images.unsplash.com/photo-1617500588698-b80c102660d6?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.anthropologie.com/search?q=rattan+chair",
      },
      {
        id: "2",
        name: "Macrame Pillow",
        reasoning: "Boho texture from Urban Outfitters.",
        price: "$40.00",
        imageUrl: "https://images.unsplash.com/photo-1579656381226-5fc704617a8f?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.urbanoutfitters.com/search?q=macrame+pillow",
      },
      {
        id: "3",
        name: "Moroccan Lantern",
        reasoning: "Ambiance lighting from West Elm.",
        price: "$55.00",
        imageUrl: "https://images.unsplash.com/photo-1542728929-1a067ca647dc?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=moroccan+lantern",
      },
      {
        id: "4",
        name: "Potted Palm",
        reasoning: "Lush greenery from The Sill / West Elm.",
        price: "$85.00",
        imageUrl: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=faux+potted+plant",
      },
    ],
  },
  "minimalist-office": {
    styleName: "Minimalist Home Office",
    items: [
      {
        id: "1",
        name: "White Electric Standing Desk",
        reasoning: "Clean lines and functional design for focused productivity",
        price: "$499.00",
        imageUrl: "https://source.unsplash.com/800x600/?standing,desk,white,office,minimal",
        shoppingUrl: "https://www.google.com/search?q=white+electric+standing+desk&tbm=shop",
      },
      {
        id: "2",
        name: "Ergonomic Mesh Office Chair",
        reasoning: "Modern silhouette meets all-day comfort with lumbar support",
        price: "$399.00",
        imageUrl: "https://source.unsplash.com/800x600/?ergonomic,office,chair,mesh,modern",
        shoppingUrl: "https://www.google.com/search?q=ergonomic+mesh+office+chair+white&tbm=shop",
      },
      {
        id: "3",
        name: "Floating Wall Shelves (Set of 3)",
        reasoning: "Invisible mounting creates a clean, uncluttered look",
        price: "$89.00",
        imageUrl: "https://source.unsplash.com/800x600/?floating,shelf,wall,white,minimal",
        shoppingUrl: "https://www.google.com/search?q=floating+wall+shelf+white+set&tbm=shop",
      },
      {
        id: "4",
        name: "Desk Organizer - Concrete",
        reasoning: "Sculptural storage keeps essentials at hand",
        price: "$45.00",
        imageUrl: "https://source.unsplash.com/800x600/?desk,organizer,concrete,minimal,office",
        shoppingUrl: "https://www.google.com/search?q=concrete+desk+organizer&tbm=shop",
      },
      {
        id: "5",
        name: "LED Desk Lamp - Adjustable",
        reasoning: "Sleek task lighting with minimal footprint",
        price: "$79.00",
        imageUrl: "https://source.unsplash.com/800x600/?desk,lamp,led,minimal,modern",
        shoppingUrl: "https://www.google.com/search?q=led+desk+lamp+minimalist&tbm=shop",
      },
      {
        id: "6",
        name: "Wool Felt Desk Pad",
        reasoning: "Soft surface protects desk while adding warmth",
        price: "$35.00",
        imageUrl: "https://source.unsplash.com/800x600/?desk,pad,felt,wool,minimal",
        shoppingUrl: "https://www.google.com/search?q=wool+felt+desk+pad&tbm=shop",
      },
    ],
  },
};

// Default fallback demo data
const defaultDemo = {
  styleName: "Curated Selection",
  items: [
    {
      id: "1",
      name: "Modern Accent Chair",
      reasoning: "A versatile piece that complements any interior style",
      price: "$399.00",
      imageUrl: "https://source.unsplash.com/800x600/?accent,chair,modern,furniture",
      shoppingUrl: "https://www.google.com/search?q=modern+accent+chair&tbm=shop",
    },
    {
      id: "2",
      name: "Textured Throw Pillow Set",
      reasoning: "Adds warmth and dimension to any seating arrangement",
      price: "$49.00",
      imageUrl: "https://source.unsplash.com/800x600/?throw,pillow,textured,decor",
      shoppingUrl: "https://www.google.com/search?q=textured+throw+pillow&tbm=shop",
    },
    {
      id: "3",
      name: "Ceramic Table Lamp",
      reasoning: "Sculptural lighting that serves as functional art",
      price: "$129.00",
      imageUrl: "https://source.unsplash.com/800x600/?ceramic,table,lamp,lighting",
      shoppingUrl: "https://www.google.com/search?q=ceramic+table+lamp&tbm=shop",
    },
    {
      id: "4",
      name: "Natural Jute Area Rug",
      reasoning: "Grounds the space with organic texture",
      price: "$199.00",
      imageUrl: "https://source.unsplash.com/800x600/?jute,rug,natural,texture",
      shoppingUrl: "https://www.google.com/search?q=jute+area+rug&tbm=shop",
    },
    {
      id: "5",
      name: "Minimalist Wall Mirror",
      reasoning: "Expands the space with clean reflective surface",
      price: "$149.00",
      imageUrl: "https://source.unsplash.com/800x600/?wall,mirror,minimal,round",
      shoppingUrl: "https://www.google.com/search?q=minimalist+wall+mirror&tbm=shop",
    },
    {
      id: "6",
      name: "Indoor Plant in Ceramic Pot",
      reasoning: "Brings life and freshness to any room",
      price: "$45.00",
      imageUrl: "https://source.unsplash.com/800x600/?indoor,plant,ceramic,pot",
      shoppingUrl: "https://www.google.com/search?q=indoor+plant+ceramic+pot&tbm=shop",
    },
  ],
};

export default function Result() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isDemo = searchParams.get("demo") === "true";
  const styleId = searchParams.get("style") || "";
  
  // Unified image display logic:
  // Priority 1: Image uploaded by user (location.state.image)
  // Priority 2: Demo image passed from trending styles (searchParams.get('demoImage'))
  // Fallback: A default placeholder
  const displayImage = location.state?.image 
    || decodeURIComponent(searchParams.get('demoImage') || '') 
    || "https://placehold.co/800x600/e0e0e0/ffffff?text=No+Image+Selected";

  // Get demo data for the selected style
  const demoData = demoResultsByStyle[styleId] || defaultDemo;

  // Calculate total
  const calculateTotal = (): string => {
    let total = 0;
    for (const item of demoData.items) {
      const match = item.price.match(/\$?([\d,]+(?:\.\d{2})?)/);
      if (match) {
        const value = parseFloat(match[1].replace(/,/g, ""));
        if (!isNaN(value)) total += value;
      }
    }
    return `$${total.toLocaleString()}`;
  };

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
              {demoData.styleName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isDemo ? "Demo Preview" : "Analysis Results"}
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

      {/* Results Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Demo Badge */}
        {isDemo && (
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border">
            <span className="text-sm font-medium text-foreground">✨ Demo Mode</span>
            <span className="text-sm text-muted-foreground">
              Curated picks for {demoData.styleName}
            </span>
          </div>
        )}

        {/* Two-Column Layout: Reference Image + Results */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Reference Image (sticky on desktop) */}
          <div className="lg:w-1/3 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
                <img 
                  src={displayImage} 
                  alt="Room Analysis"
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x600/e0e0e0/ffffff?text=Image+Unavailable";
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Your style inspiration
              </p>
            </div>
          </div>

          {/* Right: Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoData.items.map((item) => (
                <ResultCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  reasoning={item.reasoning}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  shoppingUrl={item.shoppingUrl}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-6 mt-8 border-t border-border">
          <div>
            <p className="font-semibold text-lg text-foreground">Estimated Total</p>
            <p className="text-sm text-muted-foreground">excl. shipping & tax</p>
          </div>
          <p className="font-serif text-3xl text-foreground">{calculateTotal()}</p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Analyze Your Own Photo
          </Link>
        </div>
      </main>
    </div>
  );
}