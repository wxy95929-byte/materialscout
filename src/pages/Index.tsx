import { useState, useEffect } from "react";
import { ImageCanvas } from "@/components/ImageCanvas";
import { IntelligencePanel } from "@/components/IntelligencePanel";
import { useAnalyzeRoom, AnalysisResult } from "@/hooks/useAnalyzeRoom";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { analyzeRoom, isAnalyzing } = useAnalyzeRoom();
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>("standard");
  const [selectedStyle, setSelectedStyle] = useState<string>("modern");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = (file: File, preview: string) => {
    setUploadedFile(file);
    setUploadedImage(preview);
    setIsComplete(false);
    setAnalysisResult(null);
    setCurrentStep(-1);
  };

  const handleClearImage = () => {
    setUploadedFile(null);
    setUploadedImage(null);
    setIsComplete(false);
    setAnalysisResult(null);
    setCurrentStep(-1);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || !uploadedImage) return;

    console.log("Starting AI analysis:", { file: uploadedFile.name, budget: selectedBudget, style: selectedStyle });
    setCurrentStep(0);
    setIsComplete(false);
    setAnalysisResult(null);

    const result = await analyzeRoom(uploadedImage, selectedBudget, selectedStyle);
    
    if (result) {
      setAnalysisResult(result);
      setCurrentStep(4);
      setIsComplete(true);
    } else {
      setCurrentStep(-1);
    }
  };

  // Step progression during analysis
  useEffect(() => {
    if (!isAnalyzing || currentStep < 0) return;

    if (currentStep < 3) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, currentStep]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop: Split Screen Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Half - The Canvas (Fixed) */}
        <div className="w-1/2 h-screen sticky top-0">
          <ImageCanvas 
            uploadedImage={uploadedImage}
            onImageUpload={handleImageUpload}
            onClearImage={handleClearImage}
          />
        </div>

        {/* Right Half - The Intelligence (Scrollable) */}
        <div className="w-1/2 min-h-screen overflow-y-auto">
          <IntelligencePanel
            budget={selectedBudget}
            style={selectedStyle}
            onBudgetChange={setSelectedBudget}
            onStyleChange={setSelectedStyle}
            currentStep={currentStep}
            isAnalyzing={isAnalyzing}
            isComplete={isComplete}
            analysisResult={analysisResult}
            hasImage={!!uploadedImage}
            onAnalyze={handleAnalyze}
          />
        </div>
      </div>

      {/* Mobile: Stacked Layout */}
      <div className="lg:hidden">
        {/* Image on Top */}
        <div className="w-full aspect-[4/3]">
          <ImageCanvas 
            uploadedImage={uploadedImage}
            onImageUpload={handleImageUpload}
            onClearImage={handleClearImage}
          />
        </div>

        {/* Results Below */}
        <IntelligencePanel
          budget={selectedBudget}
          style={selectedStyle}
          onBudgetChange={setSelectedBudget}
          onStyleChange={setSelectedStyle}
          currentStep={currentStep}
          isAnalyzing={isAnalyzing}
          isComplete={isComplete}
          analysisResult={analysisResult}
          hasImage={!!uploadedImage}
          onAnalyze={handleAnalyze}
        />
      </div>

      {/* Mobile FAB - Floating Action Button */}
      <button
        onClick={handleAnalyze}
        disabled={!uploadedImage || isAnalyzing}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 h-14 px-8 rounded-full bg-gradient-to-r from-foreground to-foreground/80 text-background font-semibold flex items-center gap-2 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        {isAnalyzing ? (
          <>
            <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analyze Photo
          </>
        )}
      </button>
    </div>
  );
};

export default Index;
