"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BetaApplicationData } from "@/lib/beta-form";

interface StepProps {
  control: Control<BetaApplicationData>;
  errors: FieldErrors<BetaApplicationData>;
}

const ACKNOWLEDGEMENT =
  "I understand that MetrixAI's beta program includes a nominal participation fee and that a member of the MetrixAI team will follow up within 24 hours to schedule my introductory call.";

export function StepConfirm({ control, errors }: StepProps) {
  const hasError = Boolean(errors.acknowledgement);

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="acknowledgement"
        render={({ field }) => (
          <label
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-2xl border bg-white p-5 sm:p-6",
              "transition-all duration-200 hover:border-blue-400",
              "focus-within:ring-2 focus-within:ring-blue-500/20",
              field.value
                ? "border-blue-500 bg-blue-50/60"
                : hasError
                  ? "border-red-300"
                  : "border-gray-200"
            )}
          >
            <input
              type="checkbox"
              checked={field.value === true}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              className="sr-only"
              aria-describedby={
                hasError ? "acknowledgement-error" : undefined
              }
            />
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
                field.value
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300 bg-white"
              )}
            >
              {field.value && (
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              )}
            </span>
            <span className="text-sm leading-relaxed text-gray-800 sm:text-base">
              {ACKNOWLEDGEMENT}
              <span className="ml-1 text-red-500">*</span>
            </span>
          </label>
        )}
      />

      {hasError && (
        <p
          id="acknowledgement-error"
          className="text-sm text-red-600"
          role="alert"
        >
          {errors.acknowledgement?.message}
        </p>
      )}
    </div>
  );
}
