"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  isCompleted
                    ? "bg-primary text-offwhite"
                    : isActive
                    ? "bg-primary/20 border-2 border-primary text-primary"
                    : "bg-dark-card border border-dark-border text-offwhite/30"
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : step}
              </div>
              <span
                className={`text-xs mt-2 font-medium whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-offwhite/60"
                    : "text-offwhite/30"
                }`}
              >
                {stepLabels[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-2 mt-[-1rem] ${
                  isCompleted ? "bg-primary" : "bg-dark-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
