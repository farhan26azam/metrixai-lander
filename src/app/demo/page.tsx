import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { Calendar, Clock, Video } from "lucide-react";
import { CalendlyEmbed } from "./CalendlyEmbed";

export const metadata: Metadata = {
  title: "Schedule a Demo",
  description:
    "Book a personalized demo of MetrixAI. See who's ready, who's at risk, and who's next inside your workforce — in 20 minutes.",
};

const features = [
  {
    icon: Video,
    title: "Live Product Demo",
    description: "See MetrixAI in action with a personalized walkthrough",
  },
  {
    icon: Clock,
    title: "30-Minute Session",
    description: "Quick and focused demo tailored to your needs",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Choose a time that works best for you",
  },
];

export default function DemoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />

        <Container size="lg" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              See MetrixAI in{" "}
              <span className="gradient-text">Action</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Schedule a personalized demo and discover how MetrixAI can
              transform your talent management strategy.
            </p>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Calendly Section */}
      <Section background="white" spacing="lg">
        {/* <div className="max-w-4xl mx-auto"> */}
          {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-100"> */}
            {/* <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">
                Choose a Time
              </h2>
            </div> */}
            <h1 className="text-lg font-semibold text-gray-900 text-center">
              Choose a Time
            </h1>
            {/* <div className="rounded-b-2xl overflow-hidden"> */}
              <CalendlyEmbed />
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      </Section>
    </>
  );
}
