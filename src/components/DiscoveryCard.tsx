interface DiscoveryCardProps {
  title: string;
  imageUrl: string;
  index: number;
  onClick?: () => void;
}

export function DiscoveryCard({ title, imageUrl, index, onClick }: DiscoveryCardProps) {
  return (
    <div 
      className="break-inside-avoid mb-4 animate-fade-in-up cursor-pointer group"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={onClick}
    >
      <div className="relative rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover transition-all duration-300 group-hover:brightness-90"
        />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-12">
          <h3 className="text-white font-semibold text-base leading-snug drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
