import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

interface ImageCanvasProps {
  uploadedImage: string | null;
  onImageUpload: (file: File, preview: string) => void;
  onClearImage: () => void;
}

export function ImageCanvas({ uploadedImage, onImageUpload, onClearImage }: ImageCanvasProps) {
  const [dragActive, setDragActive] = useState(false);

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
      toast.error("Invalid file type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image too large", {
        description: "Maximum file size is 5MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onImageUpload(file, preview);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full bg-muted relative">
      {uploadedImage ? (
        // Full bleed image
        <div className="relative w-full h-full">
          <img
            src={uploadedImage}
            alt="Your inspiration"
            className="w-full h-full object-cover"
          />
          {/* Clear button */}
          <button
            onClick={onClearImage}
            className="absolute top-6 right-6 p-3 bg-foreground/80 hover:bg-foreground rounded-full text-background transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-8">
            <p className="text-background/90 font-serif text-lg">Your Inspiration</p>
          </div>
        </div>
      ) : (
        // Drop zone
        <label
          className={`flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all ${
            dragActive ? "bg-accent" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className={`border-2 border-dashed rounded-sm p-16 transition-colors ${
            dragActive ? "border-foreground bg-accent" : "border-border"
          }`}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">
                Drop your inspiration here
              </h3>
              <p className="text-sm text-muted-foreground font-light">
                or click to browse
              </p>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
