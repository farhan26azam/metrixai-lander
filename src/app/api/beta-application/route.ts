import { NextRequest, NextResponse } from "next/server";
import {
  betaApplicationSchema,
  getOtherSystemError,
  OTHER_HR_SYSTEM,
} from "@/lib/beta-form";

/**
 * Receives a beta program application and forwards it to the Google Apps
 * Script web app, which appends a row to the Google Sheet and emails the team.
 *
 * Requires GOOGLE_SCRIPT_URL. See docs/beta-form-google-sheet-setup.md.
 */
export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = betaApplicationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const otherError = getOtherSystemError(data.hrSystems, data.hrSystemsOther);
  if (otherError) {
    return NextResponse.json(
      { error: otherError, details: { hrSystemsOther: [otherError] } },
      { status: 400 }
    );
  }

  // Flatten the multi-select into one readable cell for the sheet, expanding
  // "Other" into the value the applicant typed.
  const hrSystems = data.hrSystems
    .map((system) =>
      system === OTHER_HR_SYSTEM && data.hrSystemsOther
        ? `Other: ${data.hrSystemsOther}`
        : system
    )
    .join(", ");

  const row = {
    submittedAt: new Date().toISOString(),
    firstName: data.firstName,
    lastName: data.lastName,
    companyName: data.companyName,
    title: data.title,
    email: data.email,
    phone: data.phone || "",
    employeeCount: data.employeeCount,
    hrSystems,
    challenge: data.challenge,
    decisionMaker: data.decisionMaker,
    acknowledged: "Yes",
  };

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    // Not configured yet. Keep the page reviewable on preview deployments, but
    // make the gap loud in the logs — submissions are NOT being stored.
    console.error(
      "[beta-application] GOOGLE_SCRIPT_URL is not set. Submission was NOT saved to the Google Sheet:",
      row
    );
    return NextResponse.json({ success: true, stored: false }, { status: 200 });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      // Apps Script answers the POST with a 302 to script.googleusercontent.com.
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Apps Script responded with ${response.status}`);
    }

    return NextResponse.json({ success: true, stored: true }, { status: 200 });
  } catch (error) {
    console.error("[beta-application] Failed to record submission:", error, row);
    return NextResponse.json(
      { error: "We could not record your application. Please try again." },
      { status: 502 }
    );
  }
}
