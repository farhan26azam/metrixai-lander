"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui";

const stats = [
  {
    value: "213%",
    label: "The average cost of one unplanned leadership departure",
    source: "Center for American Progress",
  },
  {
    value: "6x",
    label: "Less expensive to promote from within than hire externally",
    source: "Josh Bersin Research",
  },
  {
    value: "70%",
    label: "Of employees would stay longer if they saw a clear path forward",
    source: "LinkedIn Workplace Learning Report",
  },
];

export function Problem() {
  return (
    <Section background="gray" id="problem">
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4 sm:mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Challenge
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            The Leadership Gap Nobody Sees Coming
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4">
                {stat.value}
              </div>
              <p className="text-gray-700 font-medium mb-3 sm:mb-4 flex-grow text-sm sm:text-base">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">Source: {stat.source}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center text-gray-700 mt-8 sm:mt-12 max-w-2xl mx-auto text-base sm:text-lg font-medium px-4"
      >
        Traditional HR systems track your people. MetrixAI tells you who&apos;s ready.
      </motion.p>
    </Section>
  );
}
