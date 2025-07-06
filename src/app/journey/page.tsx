import { Scene } from "@/features/3d-presentation/components/scene";
import { SectionCard } from "@/features/3d-presentation/components/section-card";
import { journeySections } from "@/features/3d-presentation/components/sections";

export default function JourneyPage() {
  return (
    <main className="relative">
      <section className="grid h-screen place-content-center">
        <h2 className="text-7xl font-bold">Hero</h2>
      </section>

      {journeySections.map((section) => (
        <SectionCard key={section.id} id={section.id}>
          {section.content}
        </SectionCard>
      ))}

      <Scene />
    </main>
  );
}
