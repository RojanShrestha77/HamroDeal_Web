// components/checkout/ProgressSteps.tsx
"use client";

import { CheckCircle2 } from "lucide-react";

interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  step.completed
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{step.number}</span>
                )}
              </div>
              <span className="mt-2 text-xs md:text-sm font-medium text-gray-700">
                {step.title}
              </span>
            </div>

            {/* Connector Line (don't show after last step) */}
            {index < steps.length - 1 && (
              <div className={`w-12 md:w-20 h-1 mx-2 ${step.completed ? "bg-black" : "bg-gray-300"}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}