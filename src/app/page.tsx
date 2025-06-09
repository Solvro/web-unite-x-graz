import { Hero } from "@/components/hero";
import { JourneyStartButton } from "@/components/journey-start-button";

import { PaddingWrapper } from "../components/padding-wrapper";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      <PaddingWrapper className="mt-32 flex justify-center">
        <Hero />
      </PaddingWrapper>
      <JourneyStartButton />
    </div>
  );
}
