import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { UploadPanel } from "@/components/UploadPanel";
import { AgentThinking } from "@/components/AgentThinking";
import { ProcurementList } from "@/components/ProcurementList";
import { useAnalyzeRoom, AnalysisResult } from "@/hooks/useAnalyzeRoom";

const Index = () => {
  const { analyzeRoom, isAnalyzing } = useAnalyzeRoom();
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (file: File, budget: string, style: string) => {
    console.log("Starting AI analysis:", { file: file.name, budget, style });
    setCurrentStep(0);
    setIsComplete(false);
    setSelectedBudget(budget);
    setAnalysisResult(null);

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageBase64 = e.target?.result as string;
      
      // Start the analysis
      const result = await analyzeRoom(imageBase64, budget, style);
      
      if (result) {
        setAnalysisResult(result);
        setCurrentStep(4);
        setIsComplete(true);
      } else {
        setCurrentStep(-1);
      }
    };
    reader.readAsDataURL(file);
  };

  // Step progression during analysis
  useEffect(() => {
    if (!isAnalyzing || currentStep < 0) return;

    // Progress through steps while analyzing
    if (currentStep < 3) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, currentStep]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pb-8">
        {/* Hero Section with Tagline */}
        <div className="py-8 lg:py-12 text-center lg:text-left">
          <p className="text-sm text-muted-foreground font-light tracking-widest uppercase mb-2">
            AI-Powered Design Assistant
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Upload */}
          <div className="lg:col-span-4">
            <UploadPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* Center Column - Agent Process */}
          <div className="lg:col-span-3">
            <AgentThinking currentStep={currentStep} isAnalyzing={isAnalyzing} />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-5">
            <ProcurementList 
              isComplete={isComplete} 
              budgetTier={selectedBudget}
              analysisResult={analysisResult}
            />
          </div>
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-serif text-lg text-foreground">Material Scout</p>
            <p className="text-sm text-muted-foreground font-light">
              © 2024 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
