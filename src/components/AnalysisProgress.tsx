import { Check } from "lucide-react";

const steps = ["Scanning", "Identifying", "Matching", "Sourcing"];

interface AnalysisProgressProps {
  currentStep: number;
  isComplete: boolean;
}

export function AnalysisProgress({ currentStep, isComplete }: AnalysisProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep || isComplete;

        return (
          <div key={step} className="flex items-center gap-2">
            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  isCompleted
                    ? "bg-foreground text-background"
                    : isActive
                    ? "bg-foreground/20 text-foreground border border-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  isCompleted || isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-px transition-colors ${
                  isCompleted ? "bg-foreground" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
