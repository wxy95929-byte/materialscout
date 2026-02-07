import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
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
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <h2 className="text-lg font-semibold">Upload Inspiration</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Share your Pinterest or Instagram photo
        </p>
      </div>

      <div className="panel-content flex-1 flex flex-col gap-6">
        {/* Upload Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
            dragActive
              ? "border-primary bg-accent"
              : preview
              ? "border-transparent"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={clearUpload}
                className="absolute top-2 right-2 p-1.5 bg-foreground/80 hover:bg-foreground rounded-full text-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center py-12 px-4 cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground mb-1">
                Drop your image here
              </span>
              <span className="text-xs text-muted-foreground">
                or click to browse
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          )}
        </div>

        {/* Project Constraints */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
            Project Constraints
          </h3>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-xs font-medium text-muted-foreground">
                Budget Tier
              </Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger id="budget" className="h-11">
                  <SelectValue placeholder="Select your budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">
                    <span className="flex items-center gap-2">
                      <span className="text-primary font-semibold">$</span>
                      Economy
                    </span>
                  </SelectItem>
                  <SelectItem value="standard">
                    <span className="flex items-center gap-2">
                      <span className="text-primary font-semibold">$$</span>
                      Standard
                    </span>
                  </SelectItem>
                  <SelectItem value="luxury">
                    <span className="flex items-center gap-2">
                      <span className="text-primary font-semibold">$$$</span>
                      Luxury
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="text-xs font-medium text-muted-foreground">
                Style Preference
              </Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style" className="h-11">
                  <SelectValue placeholder="Select your style" />
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

        {/* Analyze Button */}
        <div className="mt-auto pt-4">
          <Button
            onClick={handleAnalyze}
            disabled={!isReady || isAnalyzing}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              "Analyze Photo"
            )}
          </Button>
          {!isReady && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Upload an image and set your preferences to begin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
