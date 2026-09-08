"use client";

import { type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChoiceGroupProps {
  legend: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/** Shared fieldset shell for the radio and checkbox groups. */
export function ChoiceGroup({
  legend,
  helperText,
  error,
  required,
  children,
}: ChoiceGroupProps) {
  return (
    <fieldset className="w-full">
      <legend className="mb-2 block text-sm font-medium text-gray-700">
        {legend}
        {required && <span className="ml-1 text-red-500">*</span>}
      </legend>
      {helperText && <p className="mb-3 text-sm text-gray-500">{helperText}</p>}
      <div className="space-y-2">{children}</div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface ChoiceOptionProps {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  checked: boolean;
  invalid?: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
}

export function ChoiceOption({
  type,
  name,
  value,
  label,
  checked,
  invalid,
  onChange,
  onBlur,
}: ChoiceOptionProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3",
        "transition-all duration-200 hover:border-blue-400",
        "focus-within:ring-2 focus-within:ring-blue-500/20",
        checked ? "border-blue-500 bg-blue-50/60" : "border-gray-200",
        invalid && !checked && "border-red-300"
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 transition-all duration-200",
          type === "radio" ? "rounded-full" : "rounded-md",
          checked ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
        )}
      >
        {checked &&
          (type === "radio" ? (
            <span className="h-2 w-2 rounded-full bg-white" />
          ) : (
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          ))}
      </span>
      <span className="text-sm text-gray-800 sm:text-base">{label}</span>
    </label>
  );
}
