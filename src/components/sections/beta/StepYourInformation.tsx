"use client";

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui";
import type { BetaApplicationData } from "@/lib/beta-form";

interface StepProps {
  register: UseFormRegister<BetaApplicationData>;
  errors: FieldErrors<BetaApplicationData>;
}

export function StepYourInformation({ register, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="First Name"
          required
          autoComplete="given-name"
          placeholder="Jane"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          required
          autoComplete="family-name"
          placeholder="Carroll"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Company Name"
        required
        autoComplete="organization"
        placeholder="Acme Inc."
        error={errors.companyName?.message}
        {...register("companyName")}
      />

      <Input
        label="Your Title"
        required
        autoComplete="organization-title"
        placeholder="VP of People"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Email Address"
        type="email"
        required
        autoComplete="email"
        placeholder="jane@company.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone Number"
        type="tel"
        autoComplete="tel"
        placeholder="(555) 123-4567"
        helperText="Optional"
        error={errors.phone?.message}
        {...register("phone")}
      />
    </div>
  );
}
