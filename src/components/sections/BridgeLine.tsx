"use client";

import { motion } from "framer-motion";

export function BridgeLine() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed"
        >
          MetrixAI works for organizations between 200 and 2,500 employees who are serious about developing their people and protecting their leadership pipeline.
        </motion.p>
      </div>
    </section>
  );
}
