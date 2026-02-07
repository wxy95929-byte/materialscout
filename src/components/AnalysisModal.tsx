import { useState, useEffect, useCallback } from "react";
import { X, Upload, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConstraintPills } from "@/components/ConstraintPills";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { PinCard } from "@/components/PinCard";
import { useAnalyzeImage, MaterialItem } from "@/hooks/useAnalyzeImage";
import { ProcurementItem } from "@/hooks/useAnalyzeRoom";
import { toast } from "sonner";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

// Mock data
const economyData: ProcurementItem[] = [
  { id: "1", detectedItem: "Flooring", materialSuggestion: "Luxury Vinyl Plank - White Oak", matchReason: "High-durability vinyl matches wood aesthetic within budget", estimatedPrice: "$2.00/sq ft", retailer: "Floor & Decor", searchUrl: "https://www.homedepot.com/s/white%20oak%20vinyl%20plank" },
  { id: "2", detectedItem: "Countertop", materialSuggestion: "Laminate - Marble Pattern", matchReason: "Achieves marble look at fraction of cost", estimatedPrice: "$20/sq ft", retailer: "Home Depot", searchUrl: "https://www.homedepot.com/s/marble%20laminate%20countertop" },
  { id: "3", detectedItem: "Backsplash", materialSuggestion: "Peel-and-Stick Subway Tile", matchReason: "DIY-friendly, saves labor costs", estimatedPrice: "$3.50/sq ft", retailer: "Amazon", searchUrl: "https://www.amazon.com/s?k=peel+stick+subway+tile" },
  { id: "4", detectedItem: "Hardware", materialSuggestion: "Brushed Nickel Pulls", matchReason: "Value pack with consistent finish", estimatedPrice: "$4.99/ea", retailer: "IKEA", searchUrl: "https://www.ikea.com/us/en/search/?q=cabinet%20pulls" },
  { id: "5", detectedItem: "Lighting", materialSuggestion: "Semi-Flush Mount - Matte Black", matchReason: "Modern aesthetic without designer pricing", estimatedPrice: "$45", retailer: "Wayfair", searchUrl: "https://www.wayfair.com/keyword.html?keyword=matte+black+flush+mount" },
];

const standardData: ProcurementItem[] = [
  { id: "1", detectedItem: "Flooring", materialSuggestion: "Engineered Hardwood - White Oak", matchReason: "Real wood veneer with enhanced stability", estimatedPrice: "$5.50/sq ft", retailer: "Lumber Liquidators", searchUrl: "https://www.homedepot.com/s/engineered%20white%20oak%20hardwood" },
  { id: "2", detectedItem: "Countertop", materialSuggestion: "Quartz - Calacatta Pattern", matchReason: "Marble look without porosity issues", estimatedPrice: "$65/sq ft", retailer: "Home Depot", searchUrl: "https://www.homedepot.com/s/calacatta%20quartz%20countertop" },
  { id: "3", detectedItem: "Backsplash", materialSuggestion: "Ceramic Subway - Handmade Look", matchReason: "Artisanal appearance, standard install", estimatedPrice: "$8/sq ft", retailer: "Tile Bar", searchUrl: "https://www.wayfair.com/keyword.html?keyword=handmade+subway+tile" },
  { id: "4", detectedItem: "Hardware", materialSuggestion: "Solid Brass Pulls - Satin", matchReason: "Quality hardware elevates cabinetry", estimatedPrice: "$12/ea", retailer: "Rejuvenation", searchUrl: "https://www.wayfair.com/keyword.html?keyword=brass+cabinet+pulls" },
  { id: "5", detectedItem: "Lighting", materialSuggestion: "Pendant - Brass & Glass", matchReason: "Designer-inspired at accessible price", estimatedPrice: "$189", retailer: "West Elm", searchUrl: "https://www.wayfair.com/keyword.html?keyword=brass+glass+pendant" },
];

const luxuryData: ProcurementItem[] = [
  { id: "1", detectedItem: "Flooring", materialSuggestion: "Solid European Oak - Wide Plank", matchReason: "Authentic natural hardwood for luxury finish", estimatedPrice: "$12/sq ft", retailer: "Carlisle Wide Plank", searchUrl: "https://www.homedepot.com/s/european%20white%20oak%20wide%20plank" },
  { id: "2", detectedItem: "Countertop", materialSuggestion: "Calacatta Gold Marble", matchReason: "Authentic natural stone materials", estimatedPrice: "$150/sq ft", retailer: "Stone Source", searchUrl: "https://www.homedepot.com/s/calacatta%20gold%20marble" },
  { id: "3", detectedItem: "Backsplash", materialSuggestion: "Zellige Tile - Moroccan", matchReason: "Artisan-crafted with unique variations", estimatedPrice: "$25/sq ft", retailer: "Clé Tile", searchUrl: "https://www.wayfair.com/keyword.html?keyword=zellige+moroccan+tile" },
  { id: "4", detectedItem: "Hardware", materialSuggestion: "Unlacquered Brass - Custom", matchReason: "Living finish develops patina over time", estimatedPrice: "$45/ea", retailer: "Schoolhouse", searchUrl: "https://www.wayfair.com/keyword.html?keyword=unlacquered+brass+pulls" },
  { id: "5", detectedItem: "Lighting", materialSuggestion: "Sculptural Pendant - Handblown", matchReason: "Statement piece from designer collection", estimatedPrice: "$1,200", retailer: "Apparatus Studio", searchUrl: "https://www.wayfair.com/keyword.html?keyword=handblown+glass+pendant" },
];

const getDataByBudget = (budget: string): ProcurementItem[] => {
  switch (budget) {
    case "economy": return economyData;
    case "luxury": return luxuryData;
    default: return standardData;
  }
};

const getTotalByBudget = (budget: string): string => {
  switch (budget) {
    case "economy": return "$1,247";
    case "luxury": return "$8,950";
    default: return "$3,420";
  }
};

const calculateTotal = (items: ProcurementItem[]): string => {
  let total = 0;
  for (const item of items) {
    const match = item.estimatedPrice.match(/\$?([\d,]+(?:\.\d{2})?)/);
    if (match) {
      const value = parseFloat(match[1].replace(/,/g, ""));
      if (!isNaN(value)) total += value;
    }
  }
  return `$${total.toLocaleString()}`;
};

export function AnalysisModal({ isOpen, onClose }: AnalysisModalProps) {
  const { analyzeImage, isAnalyzing } = useAnalyzeImage();
  const [step, setStep] = useState<"upload" | "configure" | "results">("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedBudget, setSelectedBudget] = useState("standard");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProcurementItem[] | null>(null);
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

    const result = await analyzeImage(uploadedImage);
    
    if (result && result.materials) {
      // Convert MaterialItem[] to ProcurementItem[]
      const items: ProcurementItem[] = result.materials.map((mat, idx) => ({
        id: String(idx + 1),
        detectedItem: mat.name,
        materialSuggestion: mat.name,
        matchReason: mat.reasoning,
        estimatedPrice: mat.estimated_price,
        retailer: "Search Online",
        searchUrl: `https://www.google.com/search?q=${encodeURIComponent(mat.search_term)}`,
      }));
      setAnalysisResult(items);
      setCurrentStep(4);
      setIsComplete(true);
      setStep("results");
    } else {
      setCurrentStep(-1);
    }
  };

  const data = analysisResult || getDataByBudget(selectedBudget);
  const total = analysisResult ? calculateTotal(analysisResult) : getTotalByBudget(selectedBudget);

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
          <label
            className={`flex flex-col items-center justify-center w-full min-h-[60vh] cursor-pointer transition-all rounded-3xl border-2 border-dashed ${
              dragActive ? "border-foreground bg-accent" : "border-border hover:border-foreground/50"
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
                Drop your inspiration here
              </h3>
              <p className="text-muted-foreground font-light mb-4">
                or click to browse
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

            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-serif text-2xl text-foreground">
                Discover Materials
              </h2>
              <span className="text-sm text-muted-foreground">
                {data.length} items found
              </span>
            </div>

            {/* Masonry Grid */}
            <div className="columns-2 lg:columns-3 gap-4 mb-8">
              {data.map((item, index) => (
                <PinCard key={item.id} item={item} index={index} />
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-6 border-t border-border">
              <div>
                <p className="font-semibold text-lg text-foreground">Estimated Total</p>
                <p className="text-sm text-muted-foreground">excl. labor</p>
              </div>
              <p className="font-serif text-3xl text-foreground">{total}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
