"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Section, Button } from "@/components/ui";

export function CTASection() {
  return (
    <Section
      background="white"
      spacing="xl"
      className="relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-white" />
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-violet-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Your Next Leadership Gap Won&apos;t Wait.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            Most companies find out who their high-potential employees are after they&apos;ve already left, or after a seat goes empty at the worst possible time. MetrixAI gives you that clarity now — so every decision about your people is grounded in data, not instinct.
          </p>
          <p className="text-base sm:text-lg text-gray-800 font-medium mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
            See what MetrixAI finds inside your workforce in 20 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/demo" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto group">
                Request a Demo
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:info@metrixai.io" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Talk to Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
