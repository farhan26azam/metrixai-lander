"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui";

const stats = [
  {
    value: "2x",
    label: "The retention rate at companies that excel at internal mobility vs. those that don't",
    source: "LinkedIn Global Talent Trends Report",
  },
  {
    value: "41%",
    label: "Longer employee tenure at companies that hire and develop from within",
    source: "LinkedIn Global Talent Trends Report",
  },
  {
    value: "218%",
    label: "Higher income per employee at organizations with structured talent development programs",
    source: "Association for Talent Development (ATD)",
  },
  {
    value: "33%",
    label: "More likely to be an industry leader — companies that prioritize internal talent development",
    source: "Deloitte 2025 Talent Survey",
  },
];

export function StatsStrip() {
  return (
    <Section background="gray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 max-w-3xl mx-auto px-4">
          What Changes When You Can See Your Talent Clearly
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4">
                {stat.value}
              </div>
              <p className="text-gray-700 font-medium mb-3 sm:mb-4 flex-grow text-sm sm:text-base leading-relaxed">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">Source: {stat.source}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
