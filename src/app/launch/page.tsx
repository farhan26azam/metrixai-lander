import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { EarlyAccessForm, LaunchModal } from "@/components/sections";
import { Rocket, Gift, MessageSquare, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Early Access",
  description:
    "Join the MetrixAI early access program. Be among the first to see who's ready, who's at risk, and who's next inside your workforce.",
};

const benefits = [
  {
    title: "Priority Demo Access",
    description:
      "Be among the first to see MetrixAI in action with a personalized demo.",
    icon: Rocket,
  },
  {
    title: "Dedicated Onboarding",
    description:
      "Get white-glove setup and training from our founding team.",
    icon: Gift,
  },
  {
    title: "Influence the Roadmap",
    description:
      "Your feedback directly shapes our product development priorities.",
    icon: MessageSquare,
  },
  {
    title: "Founding Member Pricing",
    description: "Lock in exclusive pricing as an early adopter.",
    icon: Percent,
  },
];

export default function LaunchPage() {
  return (
    <>
      {/* Launch Modal - Shows on page load */}
      <LaunchModal />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />

        <Container size="lg" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Early Access Program
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Be Part of the{" "}
              <span className="gradient-text">Launch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Join our early access program and shape the future of talent
              intelligence. Get exclusive benefits as a founding member.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <Section background="gray" spacing="lg" id="early-access-form">
        <div className="max-w-xl mx-auto">
          <EarlyAccessForm />
        </div>
      </Section>

      {/* How It Works */}
      <Section background="white" spacing="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Happens Next?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here&apos;s what to expect after you join the waitlist
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Confirmation Email",
                description:
                  "You'll receive an email confirming your spot on the waitlist within minutes.",
              },
              {
                step: "2",
                title: "Demo Invitation",
                description:
                  "Our team will reach out to schedule your personalized demo session.",
              },
              {
                step: "3",
                title: "Onboarding",
                description:
                  "Once approved, you'll get dedicated onboarding support to get started.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
