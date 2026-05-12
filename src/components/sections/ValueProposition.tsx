"use client";

import { motion } from "framer-motion";

export function ValueProposition() {
  return (
    <section id="demo-video" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            See It For Yourself
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Watch how MetrixAI maps your workforce, surfaces readiness gaps, and builds your leadership pipeline — in under two minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
            <video
              src="/final-demo.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
