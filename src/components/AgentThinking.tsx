import { Check, Loader2, Search, Filter, ShoppingBag, Eye } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: "geometry",
    label: "Analyzing Image",
    description: "Detecting room layout and spatial relationships",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    id: "materials",
    label: "Identifying Materials",
    description: "Distinguishing textures, finishes, and material types",
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: "budget",
    label: "Applying Filters",
    description: "Matching material grades to your budget tier",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "retailers",
    label: "Finding Sources",
    description: "Searching trusted suppliers for availability",
    icon: <ShoppingBag className="w-4 h-4" />,
  },
];

type StepStatus = "pending" | "active" | "completed";

interface AgentThinkingProps {
  currentStep: number;
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-foreground">
          Analysis Process
        </h2>
        <p className="text-sm text-muted-foreground mt-1 font-light">
          {isAnalyzing
            ? "AI is analyzing your inspiration..."
            : currentStep >= steps.length
            ? "Analysis complete"
            : "Upload a photo to begin"}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Connector line */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-14 w-px h-6 transition-colors duration-500 ${
                    status === "completed" ? "bg-foreground" : "bg-border"
                  }`}
                />
              )}

              <div
                className={`relative flex gap-4 p-4 transition-all duration-300 ${
                  status === "active"
                    ? "bg-accent"
                    : status === "completed"
                    ? "bg-transparent"
                    : "bg-transparent opacity-40"
                }`}
              >
                {/* Step indicator */}
                <div
                  className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    status === "completed"
                      ? "bg-foreground text-background border-foreground"
                      : status === "active"
                      ? "bg-transparent text-foreground border-foreground animate-pulse"
                      : "bg-transparent text-muted-foreground border-border"
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
                    className={`text-sm font-medium transition-colors duration-300 ${
                      status === "active" || status === "completed"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 font-light transition-colors duration-300 ${
                      status === "active"
                        ? "text-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Active step progress bar */}
                  {status === "active" && (
                    <div className="mt-3 h-0.5 bg-border overflow-hidden">
                      <div className="h-full bg-foreground animate-shimmer" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion card */}
      {currentStep >= steps.length && (
        <div className="mt-8 p-5 bg-accent border border-border animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
              <Check className="w-4 h-4 text-background" />
            </div>
            <div>
              <p className="font-serif text-lg text-foreground">Analysis Complete</p>
              <p className="text-sm text-muted-foreground font-light">
                Found {steps.length} materials • Ready to shop
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
