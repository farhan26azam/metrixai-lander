"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { events } from "@/lib/analytics";
import {
  betaApplicationSchema,
  getOtherSystemError,
  OTHER_HR_SYSTEM,
  STEP_FIELDS,
  STEP_TITLES,
  type BetaApplicationData,
} from "@/lib/beta-form";
import { StepYourInformation } from "./StepYourInformation";
import { StepOrganization } from "./StepOrganization";
import { StepConfirm } from "./StepConfirm";
import { BetaFormProgress } from "./BetaFormProgress";

const TOTAL_STEPS = STEP_TITLES.length;

export function BetaApplicationForm() {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // The step transition must never gate visibility: server-rendered markup has
  // to show the fields even before hydration, so the first paint skips the
  // entrance animation and only later step changes animate.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BetaApplicationData>({
    resolver: zodResolver(betaApplicationSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      title: "",
      email: "",
      phone: "",
      hrSystems: [],
      hrSystemsOther: "",
      challenge: "",
    },
  });

  const hrSystems = watch("hrSystems");
  const hrSystemsOther = watch("hrSystemsOther");
  const showOtherField = hrSystems?.includes(OTHER_HR_SYSTEM) ?? false;

  /** Applies the one conditional rule the flat schema cannot express. */
  const validateOtherSystem = () => {
    const message = getOtherSystemError(hrSystems, hrSystemsOther);
    if (message) {
      setError("hrSystemsOther", { type: "manual", message });
      return false;
    }
    return true;
  };

  const scrollToTop = () => {
    headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step], { shouldFocus: true });
    if (!valid) return;
    if (step === 1 && !validateOtherSystem()) return;

    setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1));
    scrollToTop();
  };

  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 0));
    scrollToTop();
  };

  const onSubmit = async (data: BetaApplicationData) => {
    if (!validateOtherSystem()) {
      setStep(1);
      scrollToTop();
      return;
    }

    setSubmitError(null);

    try {
      const response = await fetch("/api/beta-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
      events.formSubmit("beta-application");
      scrollToTop();
    } catch (error) {
      console.error("Beta application submission error:", error);
      setSubmitError(
        "Something went wrong while submitting your application. Please try again, or email us at info@metrixai.io."
      );
    }
  };

  if (isSubmitted) {
    return (
      <div ref={headingRef} className="scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Application Received
          </h3>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Thank you for completing your MetrixAI beta program application. A
            member of our team will be in touch within 24 hours to schedule your
            introductory call and walk you through everything you need to know.
            We look forward to speaking with you.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={headingRef} className="scroll-mt-28">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="mb-8">
          <h3 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Complete Your Beta Program Application
          </h3>
          <p className="text-base leading-relaxed text-gray-600">
            Please complete all required fields below. A member of the MetrixAI
            team will be in touch within 24 hours.
          </p>
        </div>

        <BetaFormProgress step={step} totalSteps={TOTAL_STEPS} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div
            key={step}
            initial={hasMounted ? { opacity: 0, x: 12 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h4 className="mb-6 text-lg font-semibold text-gray-900 sm:text-xl">
              {STEP_TITLES[step]}
            </h4>

            {step === 0 && (
              <StepYourInformation register={register} errors={errors} />
            )}
            {step === 1 && (
              <StepOrganization
                control={control}
                register={register}
                errors={errors}
                showOtherField={showOtherField}
              />
            )}
            {step === 2 && <StepConfirm control={control} errors={errors} />}
          </motion.div>

          {submitError && (
            <p
              className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
              role="alert"
            >
              {submitError}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < TOTAL_STEPS - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                size="lg"
                className="group w-full sm:w-auto"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
