import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";

// Demo data for each style - hardcoded curated results
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
  "modern-farmhouse": {
    styleName: "Modern Farmhouse Kitchen",
    items: [
      {
        id: "1",
        name: "Matte Black Cabinet Pulls",
        reasoning: "Classic shaker-style hardware that adds a modern edge to farmhouse cabinetry",
        price: "$8.99",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.homedepot.com/s/black%20cabinet%20pulls%20farmhouse",
      },
      {
        id: "2",
        name: "White Apron Farmhouse Sink",
        reasoning: "The quintessential farmhouse centerpiece with deep basin for functionality",
        price: "$349.00",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=farmhouse+sink+white+apron",
      },
      {
        id: "3",
        name: "Reclaimed Wood Counter Stool",
        reasoning: "Rustic wooden texture that brings warmth to the modern farmhouse aesthetic",
        price: "$189.00",
        imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.potterybarn.com/search/results.html?words=reclaimed+wood+counter+stool",
      },
    ],
  },
  "japandi-bathroom": {
    styleName: "Japandi Bathroom",
    items: [
      {
        id: "1",
        name: "Wooden Vanity with Vessel Sink",
        reasoning: "Natural oak combines Japanese minimalism with Scandinavian warmth",
        price: "$899.00",
        imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=wood+vanity+vessel+sink",
      },
      {
        id: "2",
        name: "Matte Black Rain Showerhead",
        reasoning: "Clean lines and functional beauty - essential Japandi hardware",
        price: "$159.00",
        imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.amazon.com/s?k=matte+black+rain+showerhead",
      },
      {
        id: "3",
        name: "Woven Seagrass Storage Basket",
        reasoning: "Organic texture for towels and toiletries with natural materials",
        price: "$34.00",
        imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.target.com/s?searchTerm=seagrass+storage+basket",
      },
    ],
  },
  "industrial-loft": {
    styleName: "Industrial Loft Living Room",
    items: [
      {
        id: "1",
        name: "Distressed Leather Sofa",
        reasoning: "Worn leather adds character and authenticity to the industrial space",
        price: "$1,899.00",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.article.com/product/15139/timber-charme-tan-sofa",
      },
      {
        id: "2",
        name: "Pipe Frame Coffee Table",
        reasoning: "Raw metal and reclaimed wood epitomize industrial design",
        price: "$449.00",
        imageUrl: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=industrial+pipe+coffee+table",
      },
      {
        id: "3",
        name: "Edison Bulb Pendant Light",
        reasoning: "Exposed filament lighting is the signature of loft aesthetics",
        price: "$89.00",
        imageUrl: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.amazon.com/s?k=edison+bulb+pendant+light+industrial",
      },
    ],
  },
  "boho-bedroom": {
    styleName: "Bohemian Bedroom",
    items: [
      {
        id: "1",
        name: "Macramé Wall Hanging",
        reasoning: "Handcrafted textile art brings warmth and bohemian spirit",
        price: "$65.00",
        imageUrl: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.etsy.com/search?q=macrame+wall+hanging+large",
      },
      {
        id: "2",
        name: "Rattan Headboard",
        reasoning: "Natural woven texture creates a relaxed, earthy focal point",
        price: "$299.00",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=rattan+headboard+queen",
      },
      {
        id: "3",
        name: "Moroccan Pouf Ottoman",
        reasoning: "Handstitched leather adds global texture and extra seating",
        price: "$149.00",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.worldmarket.com/search?q=moroccan+pouf",
      },
    ],
  },
  "scandinavian-living": {
    styleName: "Scandinavian Living Room",
    items: [
      {
        id: "1",
        name: "Light Oak Media Console",
        reasoning: "Clean lines and blonde wood define Scandinavian furniture",
        price: "$699.00",
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.article.com/product/13292/seno-oak-63-media-unit",
      },
      {
        id: "2",
        name: "White Bouclé Accent Chair",
        reasoning: "Textured fabric in neutral tones - quintessential Nordic comfort",
        price: "$549.00",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.cb2.com/furniture/chairs",
      },
      {
        id: "3",
        name: "Wool Area Rug - Cream",
        reasoning: "Soft texture underfoot adds hygge warmth to the space",
        price: "$399.00",
        imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.rugsusa.com/rugsusa/rugs/rugs-usa-chunky-loop/Natural/200?"
      },
    ],
  },
  "coastal-dining": {
    styleName: "Coastal Dining Room",
    items: [
      {
        id: "1",
        name: "Whitewashed Dining Table",
        reasoning: "Weathered finish evokes beachside living and casual elegance",
        price: "$899.00",
        imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.potterybarn.com/search/results.html?words=whitewash+dining+table",
      },
      {
        id: "2",
        name: "Woven Seagrass Dining Chairs",
        reasoning: "Natural fiber brings organic coastal texture to the table",
        price: "$199.00",
        imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=seagrass+dining+chair",
      },
      {
        id: "3",
        name: "Blue Ceramic Vase Set",
        reasoning: "Ocean-inspired hues add the perfect coastal color pop",
        price: "$79.00",
        imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.target.com/s?searchTerm=blue+ceramic+vase",
      },
    ],
  },
  "mid-century": {
    styleName: "Mid-Century Modern",
    items: [
      {
        id: "1",
        name: "Walnut Credenza",
        reasoning: "Iconic tapered legs and warm wood tones define the era",
        price: "$1,299.00",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.westelm.com/search/results.html?words=mid+century+credenza",
      },
      {
        id: "2",
        name: "Eames-Style Lounge Chair",
        reasoning: "The definitive mid-century silhouette for style and comfort",
        price: "$899.00",
        imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.amazon.com/s?k=eames+lounge+chair+replica",
      },
      {
        id: "3",
        name: "Sputnik Chandelier - Brass",
        reasoning: "Atomic-age lighting that commands attention",
        price: "$349.00",
        imageUrl: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=sputnik+chandelier+brass",
      },
    ],
  },
  "minimalist-office": {
    styleName: "Minimalist Home Office",
    items: [
      {
        id: "1",
        name: "White Standing Desk",
        reasoning: "Clean lines and functional design for focused productivity",
        price: "$499.00",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.autonomous.ai/standing-desks",
      },
      {
        id: "2",
        name: "Ergonomic Mesh Chair",
        reasoning: "Modern silhouette meets all-day comfort",
        price: "$399.00",
        imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.amazon.com/s?k=ergonomic+mesh+office+chair+white",
      },
      {
        id: "3",
        name: "Floating Wall Shelf Set",
        reasoning: "Invisible mounting creates a clean, uncluttered look",
        price: "$89.00",
        imageUrl: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=400",
        shoppingUrl: "https://www.ikea.com/us/en/search/products/?q=floating%20shelf%20white",
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
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400",
      shoppingUrl: "https://www.wayfair.com/keyword.html?keyword=modern+accent+chair",
    },
    {
      id: "2",
      name: "Textured Throw Pillow Set",
      reasoning: "Adds warmth and dimension to any seating arrangement",
      price: "$49.00",
      imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400",
      shoppingUrl: "https://www.target.com/s?searchTerm=textured+throw+pillow",
    },
    {
      id: "3",
      name: "Ceramic Table Lamp",
      reasoning: "Sculptural lighting that serves as functional art",
      price: "$129.00",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400",
      shoppingUrl: "https://www.westelm.com/search/results.html?words=ceramic+table+lamp",
    },
  ],
};

export default function Result() {
  const [searchParams] = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  const styleId = searchParams.get("style") || "";

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

      {/* Results Grid */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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