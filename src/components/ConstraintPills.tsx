interface ConstraintPillsProps {
  budget: string;
  style: string;
  onBudgetChange: (budget: string) => void;
  onStyleChange: (style: string) => void;
}

const budgetOptions = [
  { value: "economy", label: "$ Economy" },
  { value: "standard", label: "$$ Standard" },
  { value: "luxury", label: "$$$ Luxury" },
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
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-2 min-w-max">
        {/* Budget Pills */}
        {budgetOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onBudgetChange(option.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              budget === option.value
                ? "bg-foreground text-background shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
        
        {/* Divider */}
        <div className="w-px h-8 bg-border self-center mx-1" />
        
        {/* Style Pills */}
        {styleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStyleChange(option.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              style === option.value
                ? "bg-foreground text-background shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
