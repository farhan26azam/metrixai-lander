"use client";

import { motion } from "framer-motion";
import { STEP_TITLES } from "@/lib/beta-form";
import { cn } from "@/lib/utils";

interface BetaFormProgressProps {
  step: number;
  totalSteps: number;
}

export function BetaFormProgress({ step, totalSteps }: BetaFormProgressProps) {
  const percent = ((step + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-blue-600">
          Step {step + 1} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(percent)}% complete
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${step + 1} of ${totalSteps}: ${STEP_TITLES[step]}`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <ol className="mt-3 hidden justify-between gap-2 sm:flex">
        {STEP_TITLES.map((title, index) => (
          <li
            key={title}
            className={cn(
              "text-xs font-medium transition-colors",
              index <= step ? "text-blue-600" : "text-gray-400"
            )}
          >
            {title}
          </li>
        ))}
      </ol>
    </div>
  );
}
