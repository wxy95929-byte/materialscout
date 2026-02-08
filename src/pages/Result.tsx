import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";

// Demo data for each style - hardcoded curated results with verified Unsplash URLs
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
        name: "White Apron Farmhouse Sink",
        reasoning: "The quintessential farmhouse centerpiece with deep basin for functionality",
        price: "$349.00",
        imageUrl: "https://source.unsplash.com/800x600/?farmhouse,sink,white,kitchen",
        shoppingUrl: "https://www.google.com/search?q=white+apron+farmhouse+sink&tbm=shop",
      },
      {
        id: "2",
        name: "Matte Black Cabinet Pulls (Set of 10)",
        reasoning: "Classic shaker-style hardware that adds a modern edge to farmhouse cabinetry",
        price: "$45.00",
        imageUrl: "https://source.unsplash.com/800x600/?cabinet,hardware,black,kitchen",
        shoppingUrl: "https://www.google.com/search?q=matte+black+cabinet+pulls+farmhouse&tbm=shop",
      },
      {
        id: "3",
        name: "Reclaimed Wood Counter Stools (Set of 2)",
        reasoning: "Rustic wooden texture brings warmth to the modern farmhouse aesthetic",
        price: "$389.00",
        imageUrl: "https://source.unsplash.com/800x600/?wood,counter,stool,rustic",
        shoppingUrl: "https://www.google.com/search?q=reclaimed+wood+counter+stool&tbm=shop",
      },
      {
        id: "4",
        name: "Brushed Brass Pendant Lights (Set of 3)",
        reasoning: "Warm metallic finish provides elegant contrast against white cabinets",
        price: "$279.00",
        imageUrl: "https://source.unsplash.com/800x600/?brass,pendant,light,kitchen",
        shoppingUrl: "https://www.google.com/search?q=brass+pendant+light+kitchen&tbm=shop",
      },
      {
        id: "5",
        name: "Butcher Block Cutting Board",
        reasoning: "Functional decor that adds authentic farmhouse character",
        price: "$89.00",
        imageUrl: "https://source.unsplash.com/800x600/?butcher,block,cutting,board,wood",
        shoppingUrl: "https://www.google.com/search?q=butcher+block+cutting+board+large&tbm=shop",
      },
      {
        id: "6",
        name: "White Subway Tile Backsplash (per sq ft)",
        reasoning: "Timeless pattern that bridges traditional and contemporary farmhouse",
        price: "$12.00",
        imageUrl: "https://source.unsplash.com/800x600/?subway,tile,white,kitchen,backsplash",
        shoppingUrl: "https://www.google.com/search?q=white+subway+tile+backsplash&tbm=shop",
      },
    ],
  },
  "japandi-bathroom": {
    styleName: "Japandi Bathroom",
    items: [
      {
        id: "1",
        name: "Natural Oak Floating Vanity",
        reasoning: "Clean lines with natural wood grain combine Japanese minimalism with Scandinavian warmth",
        price: "$899.00",
        imageUrl: "https://source.unsplash.com/800x600/?bathroom,vanity,oak,wood,minimal",
        shoppingUrl: "https://www.google.com/search?q=oak+floating+bathroom+vanity&tbm=shop",
      },
      {
        id: "2",
        name: "White Ceramic Vessel Sink",
        reasoning: "Sculptural form meets function with organic rounded shape",
        price: "$189.00",
        imageUrl: "https://source.unsplash.com/800x600/?vessel,sink,ceramic,white,bathroom",
        shoppingUrl: "https://www.google.com/search?q=white+ceramic+vessel+sink+round&tbm=shop",
      },
      {
        id: "3",
        name: "Matte Black Rain Showerhead",
        reasoning: "Clean lines and functional beauty - essential Japandi hardware",
        price: "$159.00",
        imageUrl: "https://source.unsplash.com/800x600/?rain,showerhead,black,bathroom,modern",
        shoppingUrl: "https://www.google.com/search?q=matte+black+rain+showerhead&tbm=shop",
      },
      {
        id: "4",
        name: "Woven Seagrass Storage Baskets (Set of 3)",
        reasoning: "Organic texture for towels and toiletries with natural materials",
        price: "$68.00",
        imageUrl: "https://source.unsplash.com/800x600/?seagrass,basket,storage,natural",
        shoppingUrl: "https://www.google.com/search?q=seagrass+storage+basket+bathroom&tbm=shop",
      },
      {
        id: "5",
        name: "Bamboo Bath Mat",
        reasoning: "Sustainable material that brings spa-like tranquility",
        price: "$45.00",
        imageUrl: "https://source.unsplash.com/800x600/?bamboo,bath,mat,spa,bathroom",
        shoppingUrl: "https://www.google.com/search?q=bamboo+bath+mat&tbm=shop",
      },
      {
        id: "6",
        name: "Minimalist Wall Mirror - Round",
        reasoning: "Simple circular form creates focal point without visual clutter",
        price: "$129.00",
        imageUrl: "https://source.unsplash.com/800x600/?round,mirror,bathroom,minimal,wall",
        shoppingUrl: "https://www.google.com/search?q=round+bathroom+mirror+minimalist&tbm=shop",
      },
    ],
  },
  "industrial-loft": {
    styleName: "Industrial Loft Living Room",
    items: [
      {
        id: "1",
        name: "Distressed Brown Leather Sofa",
        reasoning: "Worn leather adds character and authenticity to the industrial space",
        price: "$1,899.00",
        imageUrl: "https://source.unsplash.com/800x600/?leather,sofa,brown,vintage,living",
        shoppingUrl: "https://www.google.com/search?q=distressed+leather+sofa+brown&tbm=shop",
      },
      {
        id: "2",
        name: "Reclaimed Wood & Pipe Coffee Table",
        reasoning: "Raw metal and salvaged wood epitomize industrial design",
        price: "$449.00",
        imageUrl: "https://source.unsplash.com/800x600/?industrial,coffee,table,wood,metal",
        shoppingUrl: "https://www.google.com/search?q=industrial+pipe+coffee+table&tbm=shop",
      },
      {
        id: "3",
        name: "Edison Bulb Pendant Cluster",
        reasoning: "Exposed filament lighting is the signature of loft aesthetics",
        price: "$189.00",
        imageUrl: "https://source.unsplash.com/800x600/?edison,bulb,pendant,light,industrial",
        shoppingUrl: "https://www.google.com/search?q=edison+bulb+pendant+light+cluster&tbm=shop",
      },
      {
        id: "4",
        name: "Metal Bookshelf with Wood Shelves",
        reasoning: "Open shelving displays collections while maintaining industrial edge",
        price: "$349.00",
        imageUrl: "https://source.unsplash.com/800x600/?industrial,bookshelf,metal,wood,loft",
        shoppingUrl: "https://www.google.com/search?q=industrial+metal+bookshelf&tbm=shop",
      },
      {
        id: "5",
        name: "Vintage Factory Cart Side Table",
        reasoning: "Authentic industrial artifact repurposed as functional furniture",
        price: "$275.00",
        imageUrl: "https://source.unsplash.com/800x600/?vintage,cart,table,industrial,metal",
        shoppingUrl: "https://www.google.com/search?q=industrial+cart+side+table&tbm=shop",
      },
      {
        id: "6",
        name: "Concrete Effect Floor Lamp",
        reasoning: "Raw material aesthetic adds sculptural interest to the space",
        price: "$199.00",
        imageUrl: "https://source.unsplash.com/800x600/?floor,lamp,concrete,modern,industrial",
        shoppingUrl: "https://www.google.com/search?q=concrete+floor+lamp+industrial&tbm=shop",
      },
    ],
  },
  "boho-bedroom": {
    styleName: "Bohemian Bedroom",
    items: [
      {
        id: "1",
        name: "Rattan Peacock Headboard",
        reasoning: "Statement woven piece creates a stunning bohemian focal point",
        price: "$449.00",
        imageUrl: "https://source.unsplash.com/800x600/?rattan,headboard,bedroom,boho,woven",
        shoppingUrl: "https://www.google.com/search?q=rattan+peacock+headboard&tbm=shop",
      },
      {
        id: "2",
        name: "Large Macramé Wall Hanging",
        reasoning: "Handcrafted textile art brings warmth and bohemian spirit",
        price: "$89.00",
        imageUrl: "https://source.unsplash.com/800x600/?macrame,wall,hanging,boho,textile",
        shoppingUrl: "https://www.google.com/search?q=macrame+wall+hanging+large&tbm=shop",
      },
      {
        id: "3",
        name: "Moroccan Leather Pouf",
        reasoning: "Handstitched leather adds global texture and extra seating",
        price: "$149.00",
        imageUrl: "https://source.unsplash.com/800x600/?moroccan,pouf,leather,ottoman,boho",
        shoppingUrl: "https://www.google.com/search?q=moroccan+leather+pouf&tbm=shop",
      },
      {
        id: "4",
        name: "Vintage Persian Rug 5x7",
        reasoning: "Rich patterns and colors ground the eclectic space",
        price: "$399.00",
        imageUrl: "https://source.unsplash.com/800x600/?persian,rug,vintage,colorful,pattern",
        shoppingUrl: "https://www.google.com/search?q=vintage+persian+rug+5x7&tbm=shop",
      },
      {
        id: "5",
        name: "Tassel Throw Blanket",
        reasoning: "Layered textiles add cozy warmth and visual interest",
        price: "$59.00",
        imageUrl: "https://source.unsplash.com/800x600/?throw,blanket,tassel,boho,cozy",
        shoppingUrl: "https://www.google.com/search?q=tassel+throw+blanket+boho&tbm=shop",
      },
      {
        id: "6",
        name: "Terracotta Table Lamp",
        reasoning: "Earthy material brings warm ambient glow",
        price: "$79.00",
        imageUrl: "https://source.unsplash.com/800x600/?terracotta,lamp,table,ceramic,warm",
        shoppingUrl: "https://www.google.com/search?q=terracotta+table+lamp&tbm=shop",
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
        imageUrl: "https://source.unsplash.com/800x600/?oak,media,console,scandinavian,minimal",
        shoppingUrl: "https://www.google.com/search?q=light+oak+media+console&tbm=shop",
      },
      {
        id: "2",
        name: "White Bouclé Accent Chair",
        reasoning: "Textured fabric in neutral tones - quintessential Nordic comfort",
        price: "$549.00",
        imageUrl: "https://source.unsplash.com/800x600/?boucle,chair,white,accent,scandinavian",
        shoppingUrl: "https://www.google.com/search?q=white+boucle+accent+chair&tbm=shop",
      },
      {
        id: "3",
        name: "Chunky Knit Wool Throw",
        reasoning: "Hygge essential that adds cozy texture",
        price: "$129.00",
        imageUrl: "https://source.unsplash.com/800x600/?chunky,knit,throw,blanket,cream,cozy",
        shoppingUrl: "https://www.google.com/search?q=chunky+knit+throw+blanket+cream&tbm=shop",
      },
      {
        id: "4",
        name: "Cream Wool Area Rug 8x10",
        reasoning: "Soft texture underfoot adds hygge warmth to the space",
        price: "$599.00",
        imageUrl: "https://source.unsplash.com/800x600/?wool,rug,cream,area,scandinavian",
        shoppingUrl: "https://www.google.com/search?q=cream+wool+area+rug+8x10&tbm=shop",
      },
      {
        id: "5",
        name: "Minimalist Floor Lamp - White",
        reasoning: "Sculptural lighting that doubles as functional art",
        price: "$179.00",
        imageUrl: "https://source.unsplash.com/800x600/?floor,lamp,white,minimal,scandinavian",
        shoppingUrl: "https://www.google.com/search?q=minimalist+white+floor+lamp&tbm=shop",
      },
      {
        id: "6",
        name: "Ceramic Vase Set - Neutral",
        reasoning: "Organic shapes in muted tones for understated elegance",
        price: "$68.00",
        imageUrl: "https://source.unsplash.com/800x600/?ceramic,vase,neutral,minimal,decor",
        shoppingUrl: "https://www.google.com/search?q=ceramic+vase+set+neutral&tbm=shop",
      },
    ],
  },
  "coastal-dining": {
    styleName: "Coastal Dining Room",
    items: [
      {
        id: "1",
        name: "Whitewashed Oak Dining Table",
        reasoning: "The weathered wood finish establishes the breezy coastal foundation",
        price: "$899.00",
        imageUrl: "https://source.unsplash.com/800x600/?whitewashed,oak,dining,table,interior",
        shoppingUrl: "https://www.google.com/search?q=whitewashed+oak+dining+table&tbm=shop",
      },
      {
        id: "2",
        name: "Woven Seagrass Dining Chairs (Set of 4)",
        reasoning: "Natural woven texture brings organic warmth and a relaxed feel",
        price: "$599.00",
        imageUrl: "https://source.unsplash.com/800x600/?woven,seagrass,dining,chairs,coastal",
        shoppingUrl: "https://www.google.com/search?q=woven+seagrass+dining+chairs&tbm=shop",
      },
      {
        id: "3",
        name: "Large Blue Ceramic Centerpiece Vase",
        reasoning: "A statement piece that adds a pop of ocean-inspired color",
        price: "$89.00",
        imageUrl: "https://source.unsplash.com/800x600/?blue,ceramic,vase,tabletop",
        shoppingUrl: "https://www.google.com/search?q=large+blue+ceramic+vase&tbm=shop",
      },
      {
        id: "4",
        name: "Oversized Rattan Pendant Light",
        reasoning: "Creates a striking focal point and filters light softly",
        price: "$249.00",
        imageUrl: "https://source.unsplash.com/800x600/?rattan,pendant,light,dining",
        shoppingUrl: "https://www.google.com/search?q=oversized+rattan+pendant+light&tbm=shop",
      },
      {
        id: "5",
        name: "Chunky Jute Area Rug (8x10)",
        reasoning: "Grounds the dining space with durable, sand-like texture",
        price: "$349.00",
        imageUrl: "https://source.unsplash.com/800x600/?jute,area,rug,natural,texture",
        shoppingUrl: "https://www.google.com/search?q=jute+area+rug+8x10&tbm=shop",
      },
      {
        id: "6",
        name: "Framed Coastal Abstract Print",
        reasoning: "Completes the look with art that echoes coastal colors and shapes",
        price: "$149.00",
        imageUrl: "https://source.unsplash.com/800x600/?abstract,coastal,art,print,framed",
        shoppingUrl: "https://www.google.com/search?q=framed+coastal+abstract+art&tbm=shop",
      },
    ],
  },
  "mid-century": {
    styleName: "Mid-Century Modern",
    items: [
      {
        id: "1",
        name: "Walnut Credenza with Sliding Doors",
        reasoning: "Iconic tapered legs and warm wood tones define the era",
        price: "$1,299.00",
        imageUrl: "https://source.unsplash.com/800x600/?walnut,credenza,mid,century,furniture",
        shoppingUrl: "https://www.google.com/search?q=walnut+mid+century+credenza&tbm=shop",
      },
      {
        id: "2",
        name: "Eames-Style Lounge Chair & Ottoman",
        reasoning: "The definitive mid-century silhouette for style and comfort",
        price: "$899.00",
        imageUrl: "https://source.unsplash.com/800x600/?eames,lounge,chair,leather,mid,century",
        shoppingUrl: "https://www.google.com/search?q=eames+lounge+chair+replica&tbm=shop",
      },
      {
        id: "3",
        name: "Sputnik Chandelier - Brass",
        reasoning: "Atomic-age lighting that commands attention",
        price: "$349.00",
        imageUrl: "https://source.unsplash.com/800x600/?sputnik,chandelier,brass,lighting,modern",
        shoppingUrl: "https://www.google.com/search?q=sputnik+chandelier+brass&tbm=shop",
      },
      {
        id: "4",
        name: "Teak Nesting Tables (Set of 3)",
        reasoning: "Versatile Danish design for flexible living",
        price: "$279.00",
        imageUrl: "https://source.unsplash.com/800x600/?teak,nesting,tables,danish,wood",
        shoppingUrl: "https://www.google.com/search?q=teak+nesting+tables+mid+century&tbm=shop",
      },
      {
        id: "5",
        name: "Sunburst Wall Clock - Gold",
        reasoning: "Iconic starburst motif captures atomic-age optimism",
        price: "$89.00",
        imageUrl: "https://source.unsplash.com/800x600/?sunburst,wall,clock,gold,retro",
        shoppingUrl: "https://www.google.com/search?q=sunburst+wall+clock+gold&tbm=shop",
      },
      {
        id: "6",
        name: "Geometric Pattern Throw Pillow Set",
        reasoning: "Bold patterns in period-appropriate colors tie the room together",
        price: "$79.00",
        imageUrl: "https://source.unsplash.com/800x600/?geometric,pillow,pattern,mid,century",
        shoppingUrl: "https://www.google.com/search?q=mid+century+geometric+throw+pillow&tbm=shop",
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
  const isDemo = searchParams.get("demo") === "true";
  const styleId = searchParams.get("style") || "";
  const refImage = searchParams.get("refImage") || "";

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
          {refImage && (
            <div className="lg:w-1/3 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                  <img 
                    src={decodeURIComponent(refImage)} 
                    alt={`${demoData.styleName} reference`}
                    className="w-full aspect-[4/3] object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/800x600/e0e0e0/999999?text=Reference+Image";
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Your style inspiration
                </p>
              </div>
            </div>
          )}

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