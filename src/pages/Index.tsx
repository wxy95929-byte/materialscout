import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { SearchHero } from "@/components/SearchHero";
import { AnalysisModal } from "@/components/AnalysisModal";

const TRENDING_STYLES = [
  {
    id: "modern-farmhouse-kitchen",
    name: "Modern Farmhouse Kitchen",
    // FIXED: Clean white kitchen, NO PEOPLE
    image:
      "/images/farmhouse-kitchen-hero.jpeg",
    description: "Rustic charm meets contemporary clean lines.",
  },
  {
    id: "japandi-bathroom",
    name: "Japandi Bathroom Oasis",
    image:
      "/images/japandi-bathroom-hero.jpeg",
    description: "Minimalist fusion of Scandinavian and Japanese design.",
  },
  {
    id: "industrial-loft-living",
    name: "Industrial Loft Living",
    image:
      "/images/industrial-loft-hero.png",
    description: "Raw materials, exposed elements, and open spaces.",
  },
  {
    id: "coastal-dining-room",
    name: "Coastal Chic Dining",
    image:
      "/images/coastal-dining-hero.jpeg",
    description: "Light, breezy, and inspired by the sea.",
  },
  {
    id: "mid-century-bedroom",
    name: "Mid-Century Modern Bedroom",
    image:
      "/images/mid-century-bedroom-hero.png",
    description: "Retro functionality with organic forms.",
  },
  {
    id: "boho-patio",
    name: "Bohemian Outdoor Sanctuary",
    // FIXED: Actual Patio image, NOT a kitchen
    image:
      "/images/boho-patio-hero.png",
    description: "Eclectic, relaxed, and filled with plants and texture.",
  },
] as const;

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Search Hero */}
      <SearchHero onCameraClick={() => setIsModalOpen(true)} />

      {/* Trending Styles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Trending Styles</h2>
            <p className="mt-4 text-lg text-gray-600">Explore curated renovations for inspiration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRENDING_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => {
                  const encodedImage = encodeURIComponent(style.image);
                  navigate(`/result?demo=true&style=${style.id}&demoImage=${encodedImage}`);
                }}
                className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                    {style.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Material Scout. Designed by Xueying from MSIS program.
        </p>
      </footer>

      {/* FAB - Create New Project */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-40"
        title="Create New Project"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Analysis Modal */}
      <AnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
