"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 sm:mb-8 max-w-4xl mx-auto">
            Stop paying to hire people you already have.
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
            Most companies discover who their best people are right after they lose them. MetrixAI shows you who&apos;s ready — before the next role opens, the next leader leaves, or the next external search begins.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <Link href="/demo" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto group shadow-lg">
                Request a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="#how-it-works"
              className="text-base sm:text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
