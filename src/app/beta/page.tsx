import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { BetaApplicationForm } from "@/components/sections";
import { Rocket, KeyRound, LifeBuoy, Route, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Beta Program",
  description:
    "Apply to become a MetrixAI founding beta partner. Full platform access, dedicated onboarding support, and direct input into the product roadmap.",
};

const perks = [
  {
    icon: KeyRound,
    title: "Full Platform Access",
    description:
      "Complete access to MetrixAI for your organization throughout the beta program.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Onboarding",
    description:
      "Hands-on setup and support from the MetrixAI team so you are running quickly.",
  },
  {
    icon: Route,
    title: "Input Into the Roadmap",
    description:
      "Direct influence over what we build next, based on what your team actually needs.",
  },
  {
    icon: Tag,
    title: "Preferred Founding Pricing",
    description:
      "Beta partners who complete the program receive preferred founding pricing when they convert to a paid subscription.",
  },
];

export default function BetaPage() {
  return (
    <>
      {/* Section 1 — Introduction */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />

        <Container size="md" className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <Rocket className="h-4 w-4" />
              Founding Beta Program
            </span>

            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Welcome to the{" "}
              <span className="gradient-text">MetrixAI Beta Program</span>
            </h1>

            <p className="mb-8 text-lg text-gray-700 sm:text-xl">
              Thank you for your interest in becoming a founding beta partner. We
              are excited to have you here.
            </p>
          </div>

          <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            <p>
              MetrixAI is a workforce intelligence platform built for growing
              organizations between 150 and 3,000 employees. We give HR leaders,
              managers, and executives real-time visibility into the skills,
              career paths, and development needs of their people — so you can
              promote from within, build succession plans with confidence, and
              stop paying to replace talent you already have.
            </p>
            <p>
              As a founding beta partner you will receive full access to the
              platform, dedicated onboarding support, and direct input into the
              product roadmap. In exchange we ask for active use of the platform
              and honest feedback throughout the program.
            </p>
            <p>
              Please take a few minutes to complete the form below. A member of
              the MetrixAI team will follow up within 24 hours to schedule your
              introductory call and walk you through next steps.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 2 — What Beta Partners Receive */}
      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            What You Get as a Founding Beta Partner
          </h2>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            As a MetrixAI founding beta partner you will receive full access to
            the platform for your organization, dedicated onboarding support, and
            direct input into the product roadmap. In exchange we ask for active
            use of the platform and honest feedback throughout the program.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                  {perk.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-amber-900">
            Please note there is a nominal participation fee for the beta
            program. Details will be shared during your introductory call.
          </p>
          <p className="text-base leading-relaxed text-amber-900">
            A member of the MetrixAI team will follow up within 24 hours of your
            submission to schedule your intro call and walk you through next
            steps.
          </p>
        </div>
      </Section>

      {/* Section 3 — The Form */}
      <Section background="white" spacing="lg" id="beta-application">
        <div className="mx-auto max-w-3xl">
          <BetaApplicationForm />
        </div>
      </Section>
    </>
  );
}
