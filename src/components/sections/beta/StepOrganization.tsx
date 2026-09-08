"use client";

import type {
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { ChoiceGroup, ChoiceOption, Input, Textarea } from "@/components/ui";
import {
  DECISION_MAKER_OPTIONS,
  EMPLOYEE_COUNT_OPTIONS,
  HR_SYSTEM_OPTIONS,
  OTHER_HR_SYSTEM,
  type BetaApplicationData,
} from "@/lib/beta-form";

interface StepProps {
  control: Control<BetaApplicationData>;
  register: UseFormRegister<BetaApplicationData>;
  errors: FieldErrors<BetaApplicationData>;
  showOtherField: boolean;
}

export function StepOrganization({
  control,
  register,
  errors,
  showOtherField,
}: StepProps) {
  return (
    <div className="space-y-8">
      <Controller
        control={control}
        name="employeeCount"
        render={({ field }) => (
          <ChoiceGroup
            legend="How many employees does your organization currently have?"
            required
            error={errors.employeeCount?.message}
          >
            {EMPLOYEE_COUNT_OPTIONS.map((option) => (
              <ChoiceOption
                key={option}
                type="radio"
                name={field.name}
                value={option}
                label={option}
                checked={field.value === option}
                invalid={Boolean(errors.employeeCount)}
                onChange={() => field.onChange(option)}
                onBlur={field.onBlur}
              />
            ))}
          </ChoiceGroup>
        )}
      />

      <div className="space-y-4">
        <Controller
          control={control}
          name="hrSystems"
          render={({ field }) => (
            <ChoiceGroup
              legend="What HR systems or tools are you currently using to manage your workforce data?"
              helperText="Select all that apply."
              required
              error={errors.hrSystems?.message}
            >
              {HR_SYSTEM_OPTIONS.map((option) => {
                const selected = field.value?.includes(option) ?? false;
                return (
                  <ChoiceOption
                    key={option}
                    type="checkbox"
                    name={field.name}
                    value={option}
                    label={
                      option === OTHER_HR_SYSTEM
                        ? "Other — please specify"
                        : option
                    }
                    checked={selected}
                    invalid={Boolean(errors.hrSystems)}
                    onChange={(checked) => {
                      const current = field.value ?? [];
                      field.onChange(
                        checked
                          ? [...current, option]
                          : current.filter((v) => v !== option)
                      );
                    }}
                    onBlur={field.onBlur}
                  />
                );
              })}
            </ChoiceGroup>
          )}
        />

        {showOtherField && (
          <Input
            label="Please specify"
            required
            placeholder="Which system are you using?"
            error={errors.hrSystemsOther?.message}
            {...register("hrSystemsOther")}
          />
        )}
      </div>

      <Textarea
        label="What is your biggest challenge in understanding the skills and capabilities of your current workforce?"
        required
        placeholder="Tell us what you are running into today..."
        error={errors.challenge?.message}
        {...register("challenge")}
      />

      <Controller
        control={control}
        name="decisionMaker"
        render={({ field }) => (
          <ChoiceGroup
            legend="Are you the primary decision maker for HR technology purchases at your organization?"
            required
            error={errors.decisionMaker?.message}
          >
            {DECISION_MAKER_OPTIONS.map((option) => (
              <ChoiceOption
                key={option}
                type="radio"
                name={field.name}
                value={option}
                label={option}
                checked={field.value === option}
                invalid={Boolean(errors.decisionMaker)}
                onChange={() => field.onChange(option)}
                onBlur={field.onBlur}
              />
            ))}
          </ChoiceGroup>
        )}
      />
    </div>
  );
}
