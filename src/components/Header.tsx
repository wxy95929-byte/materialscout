export function Header() {
  return (
    <header className="py-6 lg:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-foreground">
              Material Scout
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-light tracking-wide">
              Turn Pinterest Dreams into Purchase Lists
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Pricing
            </a>
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center border border-border">
              <span className="text-xs font-medium text-muted-foreground">JS</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
