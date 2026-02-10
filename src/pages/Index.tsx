import { useState } from "react";
import { Plus } from "lucide-react";
import { SearchHero } from "@/components/SearchHero";
import { DiscoveryGrid } from "@/components/DiscoveryGrid";
import { AnalysisModal } from "@/components/AnalysisModal";
import { toast } from "sonner";

const TRENDING_STYLES = [
  {
    id: "modern-farmhouse-kitchen",
    name: "Modern Farmhouse Kitchen",
    // FIXED: Clean white kitchen, NO PEOPLE
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    description: "Rustic charm meets contemporary clean lines.",
  },
  {
    id: "japandi-bathroom",
    name: "Japandi Bathroom Oasis",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist fusion of Scandinavian and Japanese design.",
  },
  {
    id: "industrial-loft-living",
    name: "Industrial Loft Living",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    description: "Raw materials, exposed elements, and open spaces.",
  },
  {
    id: "coastal-dining-room",
    name: "Coastal Chic Dining",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    description: "Light, breezy, and inspired by the sea.",
  },
  {
    id: "mid-century-bedroom",
    name: "Mid-Century Modern Bedroom",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    description: "Retro functionality with organic forms.",
  },
  {
    id: "boho-patio",
    name: "Bohemian Outdoor Sanctuary",
    // FIXED: Actual Patio image, NOT a kitchen
    image:
      "https://images.unsplash.com/photo-1599695079450-937b83648eb1?auto=format&fit=crop&w=800&q=80",
    description: "Eclectic, relaxed, and filled with plants and texture.",
  },
] as const;

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (style: string) => {
    toast.info(`Exploring "${style}"`, {
      description: "Upload your own photo to get personalized recommendations",
      action: {
        label: "Upload",
        onClick: () => setIsModalOpen(true),
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Hero */}
      <SearchHero onCameraClick={() => setIsModalOpen(true)} />

      {/* Discovery Grid */}
      <DiscoveryGrid styles={[...TRENDING_STYLES]} onCardClick={handleCardClick} />


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
