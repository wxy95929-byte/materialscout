import { Camera } from "lucide-react";

interface SearchHeroProps {
  onCameraClick: () => void;
}

export function SearchHero({ onCameraClick }: SearchHeroProps) {
  return (
    <div className="w-full py-12 lg:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title */}
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
          Material Scout
        </h1>
        <p className="text-muted-foreground font-light mb-8 text-lg">
          Turn Pinterest Dreams into Purchase Lists
        </p>

        {/* Search Bar */}
        <div className="relative group">
        <button
            onClick={onCameraClick}
            className="flex items-center w-full bg-card border border-border rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <Camera className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
            <span className="flex-1 text-left text-muted-foreground text-base">
              Tap here to upload a room photo...
            </span>
          </button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground mt-4">
          Upload a photo or explore trending styles below
        </p>
      </div>
    </div>
  );
}
