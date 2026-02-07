import { Camera, Search } from "lucide-react";

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
          <div className="flex items-center bg-card border border-border rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
            <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="What's your dream room vibe?"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
              readOnly
            />
            <button
              onClick={onCameraClick}
              className="flex-shrink-0 w-10 h-10 -mr-2 rounded-full bg-foreground hover:bg-foreground/90 text-background flex items-center justify-center transition-all hover:scale-105"
              title="Upload inspiration photo"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground mt-4">
          Upload a photo or explore trending styles below
        </p>
      </div>
    </div>
  );
}
