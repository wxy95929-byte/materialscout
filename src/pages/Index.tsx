import { useState, useEffect } from "react";
import { ImageCanvas } from "@/components/ImageCanvas";
import { IntelligencePanel } from "@/components/IntelligencePanel";
import { useAnalyzeRoom, AnalysisResult } from "@/hooks/useAnalyzeRoom";

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
    </div>
  );
};

export default Index;
