"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Section, Button, Badge } from "@/components/ui";

const plans = [
  {
    name: "Core",
    description: "Essential talent intelligence for growing teams",
    price: "Contact Us",
    features: [
      "Up to 500 employees",
      "AI skill mapping",
      "Basic career pathing",
      "Development recommendations",
      "Onboarding assistance included",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    description: "Advanced features for scaling organizations",
    price: "Contact Us",
    features: [
      "Up to 2,500 employees",
      "Everything in Core, plus:",
      "Advanced succession planning",
      "Custom skill taxonomies",
      "API access",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Full platform for large organizations",
    price: "Custom",
    features: [
      "Unlimited employees",
      "Everything in Growth, plus:",
      "Dedicated success manager",
      "Custom integrations",
      "Advanced analytics",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingCards() {
  return (
    <Section background="gray" id="pricing">
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your organization
          </p>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-4">
            Built for organizations between 200 and 2,500 employees. Enterprise pricing available for larger teams.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
          >
            <div
              className={`bg-white rounded-2xl p-6 sm:p-8 h-full flex flex-col relative ${
                plan.popular
                  ? "ring-2 ring-blue-500 shadow-xl"
                  : "border border-gray-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <Badge
                  variant="primary"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                  Most Popular
                </Badge>
              )}

              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/demo" className="mt-auto">
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
