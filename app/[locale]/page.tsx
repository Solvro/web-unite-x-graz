import { AboutOrgs } from "@/components/sections/about-orgs";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { SiliconJourney } from "@/components/sections/silicon-journey";
import { StatsGrid } from "@/components/sections/stats-grid";
import { TheExchange } from "@/components/sections/the-exchange";
import { Navbar } from "@/components/ui/navbar";
import { routing } from "@/i18n/routing";

// eslint-disable-next-line unicorn/prevent-abbreviations
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SiliconJourney />
      <StatsGrid />
      <TheExchange />
      <AboutOrgs />
      <Footer />
    </main>
  );
}
