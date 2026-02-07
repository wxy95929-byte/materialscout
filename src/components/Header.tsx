import { Compass } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full max-w-[1800px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Material Scout</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Turn Pinterest Dreams into Purchase Lists
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">JS</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
