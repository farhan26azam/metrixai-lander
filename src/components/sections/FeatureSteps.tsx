"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Target, BarChart3 } from "lucide-react";
import { Section } from "@/components/ui";

const steps = [
  {
    title: "Upload Your People Data",
    description: "Connect your existing HR data in minutes. No complex setup. MetrixAI processes your workforce information and gets to work immediately.",
    icon: Upload,
    color: "blue",
  },
  {
    title: "See Every Employee's Real Potential",
    description: "Our AI maps skills, identifies hidden strengths, and surfaces employees you didn't know were ready — across your entire organization, in real time.",
    icon: Brain,
    color: "violet",
  },
  {
    title: "Build the Bench Before You Need It",
    description: "MetrixAI generates personalized growth plans for every employee — aligned to where your organization is going, not just where it's been.",
    icon: Target,
    color: "emerald",
  },
  {
    title: "Fill Roles From Within — Before You Post Externally",
    description: "See who's ready for what's open, what's coming, and what's next. Walk into every workforce decision with data — not gut feel.",
    icon: BarChart3,
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; iconBg: string; icon: string }> = {
  blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600" },
  violet: { bg: "bg-violet-50", iconBg: "bg-violet-100", icon: "text-violet-600" },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600" },
  amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", icon: "text-amber-600" },
};

export function FeatureSteps() {
  return (
    <Section background="white" id="how-it-works">
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 max-w-3xl mx-auto">
            From Blind Spot to Clear Picture — In Four Steps
          </h2>
        </motion.div>
      </div>

      {/* Grid layout for all screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, index) => {
          const colors = colorMap[step.color];
          const Icon = step.icon;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`${colors.bg} rounded-2xl p-6 h-full`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-400">Step {index + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
