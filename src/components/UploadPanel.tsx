import { useState, useCallback } from "react";
import { Upload, X, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

interface UploadPanelProps {
  onAnalyze: (file: File, budget: string, style: string) => void;
  isAnalyzing: boolean;
}

export function UploadPanel({ onAnalyze, isAnalyzing }: UploadPanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [budget, setBudget] = useState<string>("");
  const [style, setStyle] = useState<string>("");

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
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image too large", {
        description: "Maximum file size is 5MB. Please choose a smaller image.",
      });
      return;
    }

    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setPreview(null);
  };

  const handleAnalyze = () => {
    if (uploadedFile && budget && style) {
      onAnalyze(uploadedFile, budget, style);
    }
  };

  const isReady = uploadedFile && budget && style;

  return (
    <div className="flex flex-col h-full">
      {/* Hero Upload Area */}
      <div
        className={`upload-frame aspect-[4/3] lg:aspect-[3/4] flex flex-col items-center justify-center transition-all duration-300 ${
          dragActive ? "border-primary bg-accent/50" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Your inspiration"
              className="w-full h-full object-cover"
            />
            <button
              onClick={clearUpload}
              className="absolute top-4 right-4 p-2 bg-foreground/80 hover:bg-foreground rounded-full text-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer p-8 text-center w-full h-full">
            <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">
              Upload Inspiration
            </h3>
            <p className="text-sm text-muted-foreground font-light max-w-[200px]">
              Drop your Pinterest or Instagram photo here
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Project Constraints */}
      <div className="mt-8 space-y-6">
        <h4 className="font-serif text-lg text-foreground">
          Project Details
        </h4>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Budget Tier
            </Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="budget" className="h-12 bg-card border-border">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">
                  <span className="flex items-center gap-3">
                    <span className="text-muted-foreground">$</span>
                    <span>Economy</span>
                  </span>
                </SelectItem>
                <SelectItem value="standard">
                  <span className="flex items-center gap-3">
                    <span className="text-muted-foreground">$$</span>
                    <span>Standard</span>
                  </span>
                </SelectItem>
                <SelectItem value="luxury">
                  <span className="flex items-center gap-3">
                    <span className="text-muted-foreground">$$$</span>
                    <span>Luxury</span>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Style Preference
            </Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style" className="h-12 bg-card border-border">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="japandi">Japandi</SelectItem>
                <SelectItem value="farmhouse">Farmhouse</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Desktop Analyze Button */}
      <div className="hidden lg:block mt-8">
        <Button
          onClick={handleAnalyze}
          disabled={!isReady || isAnalyzing}
          className="w-full h-14 text-base font-medium tracking-wide bg-foreground hover:bg-foreground/90 text-background"
          size="lg"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            "Analyze Photo"
          )}
        </Button>
        {!isReady && (
          <p className="text-xs text-muted-foreground text-center mt-3 font-light">
            Upload an image and set your preferences
          </p>
        )}
      </div>

      {/* Mobile Sticky Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
        <Button
          onClick={handleAnalyze}
          disabled={!isReady || isAnalyzing}
          className="w-full h-14 text-base font-medium tracking-wide bg-foreground hover:bg-foreground/90 text-background"
          size="lg"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            "Analyze Photo"
          )}
        </Button>
      </div>
    </div>
  );
}
