import { Carousel } from "@/components/carousel";
import { Hero } from "@/components/hero";
import { JourneyStartButton } from "@/components/journey-start-button";
import { SectionIndicator } from "@/components/section-indicator";

import { PaddingWrapper } from "../components/padding-wrapper";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      <SectionIndicator />
      <PaddingWrapper className="mt-32 flex flex-col items-center justify-center">
        <section id="section-1">
          <Hero />
        </section>

        <section id="section-2"></section>

        <section id="section-3" className=""></section>
        <Carousel />

        <section id="section-4">
          <JourneyStartButton />
        </section>
      </PaddingWrapper>
    </div>
  );
}
