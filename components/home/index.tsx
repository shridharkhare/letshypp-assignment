import { CTASection } from './cta-section';
import { FeaturesSection } from './features-section';
import { Footer } from './footer';
import { HeroSection } from './hero-section';
import { HowItWorksSection } from './how-it-works-section';
import { StatsSection } from './stats-section';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
