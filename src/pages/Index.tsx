import { useState } from "react";
import { Plus } from "lucide-react";
import { SearchHero } from "@/components/SearchHero";
import { DiscoveryGrid } from "@/components/DiscoveryGrid";
import { AnalysisModal } from "@/components/AnalysisModal";
import { toast } from "sonner";

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
      <DiscoveryGrid onCardClick={handleCardClick} />

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
