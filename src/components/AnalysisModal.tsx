import { useState, useEffect, useCallback } from "react";
import { X, Upload, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConstraintPills } from "@/components/ConstraintPills";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { ResultCard } from "@/components/ResultCard";
import { useAnalyzeImage, ProductResult } from "@/hooks/useAnalyzeImage";
import { toast } from "sonner";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

export function AnalysisModal({ isOpen, onClose }: AnalysisModalProps) {
  const { analyzeImage, isAnalyzing } = useAnalyzeImage();
  const [step, setStep] = useState<"upload" | "configure" | "results">("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedBudget, setSelectedBudget] = useState("standard");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProductResult[] | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("upload");
        setUploadedImage(null);
        setUploadedFile(null);
        setCurrentStep(-1);
        setIsComplete(false);
        setAnalysisResult(null);
      }, 300);
    }
  }, [isOpen]);

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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type", { description: "Please upload a JPEG, PNG, WebP, or GIF image." });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image too large", { description: "Maximum file size is 5MB." });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setUploadedFile(file);
      setUploadedImage(preview);
      setStep("configure");
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || !uploadedImage) return;
    setCurrentStep(0);
    setIsComplete(false);
    setAnalysisResult(null);

    try {
      // Pass budget and style to enable demo mode for "modern" + "standard"
      const result = await analyzeImage(uploadedImage, {
        budget: selectedBudget,
        style: selectedStyle,
      });

      const products = result.products || [];

      if (!products.length) {
        throw new Error("No products found in image");
      }

      setAnalysisResult(products);
      setCurrentStep(4);
      setIsComplete(true);
      setStep("results");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`API Error: ${message}`);
      setCurrentStep(-1);
    }
  };

  const data = analysisResult ?? [];
  
  // Calculate total from product prices
  const calculateProductTotal = (products: ProductResult[]): string => {
    let total = 0;
    for (const product of products) {
      const match = product.estimated_price.match(/\$?([\d,]+(?:\.\d{2})?)/);
      if (match) {
        const value = parseFloat(match[1].replace(/,/g, ""));
        if (!isNaN(value)) total += value;
      }
    }
    return total > 0 ? `$${total.toLocaleString()}` : "--";
  };
  
  const total = analysisResult ? calculateProductTotal(analysisResult) : "--";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {step !== "upload" && (
              <button
                onClick={() => setStep(step === "results" ? "configure" : "upload")}
                className="p-2 -ml-2 hover:bg-accent rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="font-serif text-xl text-foreground">
                {step === "upload" && "Upload Inspiration"}
                {step === "configure" && "Configure Analysis"}
                {step === "results" && "Your Materials"}
              </h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        {/* Step 1: Upload */}
        {step === "upload" && (
          <div className="space-y-8">
            <label
              className={`flex flex-col items-center justify-center w-full min-h-[50vh] cursor-pointer transition-all rounded-3xl border-2 border-dashed bg-gray-50 ${
                dragActive ? "border-foreground bg-accent" : "border-gray-300 hover:border-foreground/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Analyze Your Space
                </h3>
                <p className="text-muted-foreground font-light mb-4 max-w-sm">
                  Upload a photo of your room to extract textures, colors, and design vibes.
                </p>
                <p className="text-xs text-muted-foreground">
                  JPEG, PNG, WebP, or GIF • Max 5MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>

            {/* Quick Demo Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">No photo handy? Try one of ours:</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex justify-center gap-4">
                {[
                  { label: "Living Room", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=150&q=80" },
                  { label: "Kitchen", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=150&q=80" },
                  { label: "Bedroom", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=150&q=80" },
                ].map((demo) => (
                  <button
                    key={demo.label}
                    type="button"
                    onClick={async () => {
                      try {
                        const res = await fetch(demo.url);
                        const blob = await res.blob();
                        const file = new File([blob], `${demo.label.toLowerCase().replace(" ", "-")}.jpg`, { type: "image/jpeg" });
                        handleFile(file);
                      } catch {
                        toast.error("Failed to load demo image");
                      }
                    }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <img
                      src={demo.url}
                      alt={demo.label}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-transparent group-hover:border-foreground transition-all shadow-sm group-hover:shadow-md"
                    />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{demo.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Configure */}
        {step === "configure" && (
          <div className="space-y-8">
            {/* Preview Image */}
            {uploadedImage && (
              <div className="relative rounded-3xl overflow-hidden aspect-video">
                <img
                  src={uploadedImage}
                  alt="Your inspiration"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Constraints */}
            <div>
              <h2 className="font-serif text-xl text-foreground mb-4">Select Preferences</h2>
              <ConstraintPills
                budget={selectedBudget}
                style={selectedStyle}
                onBudgetChange={setSelectedBudget}
                onStyleChange={setSelectedStyle}
              />
            </div>

            {/* Analysis Progress */}
            {(isAnalyzing || isComplete) && (
              <div>
                <AnalysisProgress currentStep={currentStep} isComplete={isComplete} />
              </div>
            )}

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-14 text-base font-medium bg-foreground hover:bg-foreground/90 text-background gap-2 rounded-full"
              size="lg"
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
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Step 3: Results */}
        {step === "results" && (
          <div className="animate-fade-in-up">
            {/* Preview Image (smaller) */}
            {uploadedImage && (
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-8">
                <img
                  src={uploadedImage}
                  alt="Your inspiration"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-baseline justify-between mb-6 pt-8">
              <h2 className="font-serif text-2xl text-foreground">
                Style Inspiration
              </h2>
              <span className="text-sm text-muted-foreground">
                {data.length} vibes found
              </span>
            </div>

            {/* Grid with proper spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 pb-32">
              {data.map((product, index) => (
                <ResultCard
                  key={index}
                  id={String(index)}
                  name={product.product_title}
                  reasoning={product.reasoning}
                  imageUrl={product.product_image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
