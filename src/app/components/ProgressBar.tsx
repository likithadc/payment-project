import { Check } from "lucide-react";

const STEPS = [
  { label: "Trees" },
  { label: "Details" },
  { label: "Gift" },
  { label: "Review" },
];

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-center gap-0 max-w-md mx-auto">
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#1a7a3c] text-white"
                      : isActive
                      ? "bg-[#22c55e] text-white shadow-lg shadow-green-300/50 scale-110"
                      : "bg-white border-2 border-[#d4eddf] text-[#4a7a5c]"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span className="font-semibold">{stepNum}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 font-medium whitespace-nowrap ${
                    isActive ? "text-[#1a7a3c]" : isCompleted ? "text-[#1a7a3c]" : "text-[#4a7a5c]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-12 sm:w-20 mx-1 mb-4 transition-all duration-500 ${
                    stepNum < currentStep ? "bg-[#1a7a3c]" : "bg-[#d4eddf]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
