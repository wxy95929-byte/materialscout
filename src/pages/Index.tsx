import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { UploadPanel } from "@/components/UploadPanel";
import { AgentThinking } from "@/components/AgentThinking";
import { ProcurementList } from "@/components/ProcurementList";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const simulateAnalysis = (file: File, budget: string, style: string) => {
    console.log("Starting analysis:", { file: file.name, budget, style });
    setIsAnalyzing(true);
    setCurrentStep(0);
    setIsComplete(false);
    setSelectedBudget(budget);
  };

  // Step progression during 3-second analysis
  useEffect(() => {
    if (!isAnalyzing) return;

    // Each step takes ~750ms to complete all 4 steps in ~3 seconds
    const stepDurations = [750, 750, 750, 750];
    
    if (currentStep < 4) {
      const timer = setTimeout(() => {
        if (currentStep < 3) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setCurrentStep(4);
          setIsAnalyzing(false);
          setIsComplete(true);
        }
      }, stepDurations[currentStep] || 750);

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
            <UploadPanel onAnalyze={simulateAnalysis} isAnalyzing={isAnalyzing} />
          </div>

          {/* Center Panel - Agent Thinking */}
          <div className="lg:col-span-4">
            <AgentThinking currentStep={currentStep} isAnalyzing={isAnalyzing} />
          </div>

          {/* Right Panel - Procurement List */}
          <div className="lg:col-span-5">
            <ProcurementList isComplete={isComplete} budgetTier={selectedBudget} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
