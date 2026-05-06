"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui";

const PUBLISHED = false;

const quote = {
  body: "Quote pending — placeholder.",
  attribution: "Attribution pending",
};

export function SocialProof() {
  if (!PUBLISHED) return null;

  return (
    <Section background="white" spacing="md">
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed">
          &ldquo;{quote.body}&rdquo;
        </blockquote>
        <figcaption className="mt-6 text-sm sm:text-base text-gray-600">
          — {quote.attribution}
        </figcaption>
      </motion.figure>
    </Section>
  );
}
