import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import SiliconJourney from '@/components/sections/SiliconJourney';
import StatsGrid from '@/components/sections/StatsGrid';
import TheExchange from '@/components/sections/TheExchange';
import AboutOrgs from '@/components/sections/AboutOrgs';
import Footer from '@/components/sections/Footer';
import { routing } from '@/i18n/routing';

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
