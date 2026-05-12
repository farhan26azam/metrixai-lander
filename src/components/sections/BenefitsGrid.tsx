"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, UserCheck, TrendingUp, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui";

const benefits = [
  {
    title: "One View of Your Entire Workforce",
    description: "Stop piecing together spreadsheets and gut feelings. MetrixAI gives you a single, real-time picture of every employee's skills, readiness, and growth trajectory.",
    icon: LayoutDashboard,
    color: "blue",
  },
  {
    title: "Fill Roles From Within — With Confidence",
    description: "When a role opens up, MetrixAI shows you who inside your organization is ready to move into it — so you spend less on external searches and more on developing the people you already have.",
    icon: UserCheck,
    color: "amber",
  },
  {
    title: "Know Who's Next — Before You Need Them",
    description: "MetrixAI identifies your future leaders today, so you're never caught flat-footed by a departure, a promotion, or a board question about bench strength.",
    icon: TrendingUp,
    color: "violet",
  },
  {
    title: "Enterprise-Grade Security. Ready When You Are.",
    description: "SOC 2 in progress. SSO integration. Built to scale from 250 to 20,000 employees. Your data is protected. Your team is supported.",
    icon: ShieldCheck,
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; iconBg: string; icon: string }> = {
  blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600" },
  violet: { bg: "bg-violet-50", iconBg: "bg-violet-100", icon: "text-violet-600" },
  amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", icon: "text-amber-600" },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600" },
};

export function BenefitsGrid() {
  return (
    <Section background="white" id="features">
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 max-w-3xl mx-auto">
            Built for the HR Leaders Who Are Done Guessing
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {benefits.map((benefit, index) => {
          const colors = colorMap[benefit.color];
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`${colors.bg} rounded-2xl p-6 sm:p-8 h-full hover:shadow-lg transition-shadow`}>
                <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
