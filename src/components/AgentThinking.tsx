import { Check, Loader2, Circle, Search, Filter, ShoppingBag, Eye } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: "geometry",
    label: "Analyzing Image Geometry",
    description: "Detecting room layout, surfaces, and spatial relationships",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    id: "materials",
    label: "Identifying Materials",
    description: "Distinguishing between marble, porcelain, wood types, and finishes",
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: "budget",
    label: "Applying Budget Filters",
    description: "Matching material grades to your selected price tier",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "retailers",
    label: "Searching Retailers",
    description: "Finding available products from trusted suppliers",
    icon: <ShoppingBag className="w-4 h-4" />,
  },
];

type StepStatus = "pending" | "active" | "completed";

interface AgentThinkingProps {
  currentStep: number; // -1 = not started, 0-3 = active step, 4 = all complete
  isAnalyzing: boolean;
}

export function AgentThinking({ currentStep, isAnalyzing }: AgentThinkingProps) {
  const getStepStatus = (index: number): StepStatus => {
    if (currentStep === -1) return "pending";
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <h2 className="text-lg font-semibold">Agent Thinking Process</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isAnalyzing
            ? "AI is analyzing your inspiration..."
            : currentStep >= steps.length
            ? "Analysis complete"
            : "Upload a photo to begin analysis"}
        </p>
      </div>

      <div className="panel-content flex-1">
        <div className="space-y-1">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={`absolute left-5 top-12 w-0.5 h-8 transition-colors duration-500 ${
                      status === "completed" ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                <div
                  className={`relative flex gap-4 p-3 rounded-xl transition-all duration-300 ${
                    status === "active"
                      ? "bg-accent"
                      : status === "completed"
                      ? "bg-transparent"
                      : "bg-transparent opacity-50"
                  }`}
                >
                  {/* Step indicator */}
                  <div
                    className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : status === "active"
                        ? "bg-primary/10 text-primary animate-pulse-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {status === "completed" ? (
                      <Check className="w-4 h-4" />
                    ) : status === "active" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        status === "active"
                          ? "text-primary"
                          : status === "completed"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 transition-colors duration-300 ${
                        status === "active"
                          ? "text-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Active step progress bar */}
                    {status === "active" && (
                      <div className="mt-3 h-1.5 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-shimmer" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary card when complete */}
        {currentStep >= steps.length && (
          <div className="mt-6 p-4 bg-accent rounded-xl border border-primary/20 animate-fade-in-up">
            <div className="flex items-center gap-2 text-primary">
              <Check className="w-5 h-5" />
              <span className="font-semibold text-sm">Analysis Complete</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Found 5 materials • Matched to your budget tier • Ready to shop
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
