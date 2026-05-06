import {
  Hero,
  SocialProof,
  Problem,
  FeatureSteps,
  ValueProposition,
  BenefitsGrid,
  BridgeLine,
  StatsStrip,
  PricingCards,
  CTASection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Problem />
      <FeatureSteps />
      <ValueProposition />
      <BenefitsGrid />
      <BridgeLine />
      <StatsStrip />
      <PricingCards />
      <CTASection />
    </>
  );
}
