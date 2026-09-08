import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BetaApplicationForm } from "@/components/sections/beta/BetaApplicationForm";

/** jsdom has no scrollIntoView. */
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function fillStepOne() {
  fireEvent.change(screen.getByLabelText(/First Name/), {
    target: { value: "Jane" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/), {
    target: { value: "Carroll" },
  });
  fireEvent.change(screen.getByLabelText(/Company Name/), {
    target: { value: "Acme Inc." },
  });
  fireEvent.change(screen.getByLabelText(/Your Title/), {
    target: { value: "VP of People" },
  });
  fireEvent.change(screen.getByLabelText(/Email Address/), {
    target: { value: "jane@acme.com" },
  });
}

function fillStepTwo() {
  fireEvent.click(screen.getByRole("radio", { name: "250 to 1,000" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "Workday" }));
  fireEvent.change(
    screen.getByLabelText(/biggest challenge in understanding the skills/),
    { target: { value: "We have no visibility into skills." } }
  );
  fireEvent.click(
    screen.getByRole("radio", { name: "Yes I am the primary decision maker" })
  );
}

const clickContinue = () =>
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));

describe("BetaApplicationForm", () => {
  it("starts on step 1 of 3 with the progress bar", () => {
    render(<BetaApplicationForm />);

    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
    expect(
      screen.getByRole("heading", { name: "Your Information" })
    ).toBeInTheDocument();
  });

  it("does not advance past step 1 while required fields are empty", async () => {
    render(<BetaApplicationForm />);

    clickContinue();

    expect(
      await screen.findByText("Please enter your first name")
    ).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
  });

  it("treats phone number as optional", async () => {
    render(<BetaApplicationForm />);

    fillStepOne();
    clickContinue();

    // Advances without a phone number.
    expect(await screen.findByText("Step 2 of 3")).toBeInTheDocument();
  });

  it("rejects an invalid email address", async () => {
    render(<BetaApplicationForm />);

    fillStepOne();
    fireEvent.change(screen.getByLabelText(/Email Address/), {
      target: { value: "not-an-email" },
    });
    clickContinue();

    expect(
      await screen.findByText("Please enter a valid email address")
    ).toBeInTheDocument();
  });

  it("requires a value when 'Other' HR system is selected", async () => {
    render(<BetaApplicationForm />);

    fillStepOne();
    clickContinue();
    await screen.findByText("Step 2 of 3");

    fireEvent.click(screen.getByRole("radio", { name: "Under 250" }));
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Other — please specify" })
    );
    fireEvent.change(
      screen.getByLabelText(/biggest challenge in understanding the skills/),
      { target: { value: "No visibility." } }
    );
    fireEvent.click(
      screen.getByRole("radio", { name: "I am exploring on behalf of someone else" })
    );
    clickContinue();

    expect(
      await screen.findByText("Please specify which other system you use")
    ).toBeInTheDocument();
    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
  });

  it("blocks submission until the acknowledgement is checked", async () => {
    render(<BetaApplicationForm />);

    fillStepOne();
    clickContinue();
    await screen.findByText("Step 2 of 3");

    fillStepTwo();
    clickContinue();
    await screen.findByText("Step 3 of 3");

    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));

    expect(
      await screen.findByText("Please confirm before submitting")
    ).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits and shows the confirmation message", async () => {
    render(<BetaApplicationForm />);

    fillStepOne();
    clickContinue();
    await screen.findByText("Step 2 of 3");

    fillStepTwo();
    clickContinue();
    await screen.findByText("Step 3 of 3");

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));

    expect(await screen.findByText("Application Received")).toBeInTheDocument();
    expect(
      screen.getByText(/A member of our team will be in touch within 24 hours/)
    ).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [url, options] = (fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(url).toBe("/api/beta-application");
    expect(JSON.parse(options.body)).toMatchObject({
      firstName: "Jane",
      email: "jane@acme.com",
      employeeCount: "250 to 1,000",
      hrSystems: ["Workday"],
      acknowledgement: true,
    });
  });

  it("lets the user go back to a previous step", async () => {
    render(<BetaApplicationForm />);

    fillStepOne();
    clickContinue();
    await screen.findByText("Step 2 of 3");

    fireEvent.click(screen.getByRole("button", { name: /Back/ }));

    expect(await screen.findByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/)).toHaveValue("Jane");
  });

  it("surfaces an error when the submission request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 502 }));

    render(<BetaApplicationForm />);

    fillStepOne();
    clickContinue();
    await screen.findByText("Step 2 of 3");

    fillStepTwo();
    clickContinue();
    await screen.findByText("Step 3 of 3");

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));

    expect(
      await screen.findByText(/Something went wrong while submitting/)
    ).toBeInTheDocument();
    expect(screen.queryByText("Application Received")).not.toBeInTheDocument();
  });
});
