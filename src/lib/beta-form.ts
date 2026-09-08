import { z } from "zod";

export const EMPLOYEE_COUNT_OPTIONS = [
  "Under 250",
  "250 to 1,000",
  "1,000 to 2,500",
  "2,500 and above",
] as const;

export const HR_SYSTEM_OPTIONS = [
  "Workday",
  "BambooHR",
  "ADP",
  "UKG",
  "Paylocity",
  "Rippling",
  "Spreadsheets or no formal system",
  "Other",
] as const;

export const DECISION_MAKER_OPTIONS = [
  "Yes I am the primary decision maker",
  "I am a key influencer but the final decision involves others",
  "I am exploring on behalf of someone else",
] as const;

export const OTHER_HR_SYSTEM = "Other";

/**
 * Kept intentionally flat (no object-level .refine) so react-hook-form can
 * validate one step at a time. Zod skips object-level refinements until every
 * field parses, which would hide the "Other — please specify" error while the
 * user is still part-way through the form. That one conditional rule is applied
 * separately by `getOtherSystemError` on both the client and the server.
 */
export const betaApplicationSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name"),
  lastName: z.string().trim().min(1, "Please enter your last name"),
  companyName: z.string().trim().min(1, "Please enter your company name"),
  title: z.string().trim().min(1, "Please enter your title"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  employeeCount: z.enum(EMPLOYEE_COUNT_OPTIONS, {
    message: "Please select your organization size",
  }),
  hrSystems: z
    .array(z.enum(HR_SYSTEM_OPTIONS))
    .min(1, "Please select at least one option"),
  hrSystemsOther: z.string().trim().optional(),
  challenge: z.string().trim().min(1, "Please tell us about your biggest challenge"),
  decisionMaker: z.enum(DECISION_MAKER_OPTIONS, {
    message: "Please select one option",
  }),
  acknowledgement: z.literal(true, {
    message: "Please confirm before submitting",
  }),
});

export type BetaApplicationData = z.infer<typeof betaApplicationSchema>;

/** The "Other" checkbox requires a value in its companion text field. */
export function getOtherSystemError(
  hrSystems: readonly string[] | undefined,
  hrSystemsOther: string | undefined
): string | null {
  if (!hrSystems?.includes(OTHER_HR_SYSTEM)) return null;
  if (hrSystemsOther && hrSystemsOther.trim().length > 0) return null;
  return "Please specify which other system you use";
}

/** Field names belonging to each step, used for per-step validation. */
export const STEP_FIELDS = [
  ["firstName", "lastName", "companyName", "title", "email", "phone"],
  ["employeeCount", "hrSystems", "hrSystemsOther", "challenge", "decisionMaker"],
  ["acknowledgement"],
] as const satisfies readonly (readonly (keyof BetaApplicationData)[])[];

export const STEP_TITLES = [
  "Your Information",
  "About Your Organization",
  "Before We Talk",
] as const;
