interface ConstraintPillsProps {
  budget: string;
  style: string;
  onBudgetChange: (budget: string) => void;
  onStyleChange: (style: string) => void;
}

const budgetOptions = [
  { value: "economy", label: "$", title: "Economy" },
  { value: "standard", label: "$$", title: "Standard" },
  { value: "luxury", label: "$$$", title: "Luxury" },
];

const styleOptions = [
  { value: "modern", label: "Modern" },
  { value: "japandi", label: "Japandi" },
  { value: "farmhouse", label: "Farmhouse" },
  { value: "industrial", label: "Industrial" },
];

export function ConstraintPills({
  budget,
  style,
  onBudgetChange,
  onStyleChange,
}: ConstraintPillsProps) {
  return (
    <div className="space-y-6">
      {/* Budget Pills */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
          Budget
        </p>
        <div className="flex gap-2">
          {budgetOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onBudgetChange(option.value)}
              className={`px-5 py-2.5 text-sm font-medium transition-all ${
                budget === option.value
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span className="mr-1.5">{option.label}</span>
              <span className="hidden sm:inline">{option.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Style Pills */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
          Style
        </p>
        <div className="flex flex-wrap gap-2">
          {styleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onStyleChange(option.value)}
              className={`px-5 py-2.5 text-sm font-medium transition-all ${
                style === option.value
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
