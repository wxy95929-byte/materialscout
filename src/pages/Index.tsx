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
    <div className="min-h-screen bg-surface-sunken">
      <Header />
      
      <main className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-7rem)]">
          {/* Left Panel - Upload & Constraints */}
          <div className="lg:col-span-3">
            <UploadPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* Center Panel - Agent Thinking */}
          <div className="lg:col-span-4">
            <AgentThinking currentStep={currentStep} isAnalyzing={isAnalyzing} />
          </div>

          {/* Right Panel - Procurement List */}
          <div className="lg:col-span-5">
            <ProcurementList 
              isComplete={isComplete} 
              budgetTier={selectedBudget}
              analysisResult={analysisResult}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
