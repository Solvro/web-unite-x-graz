import { Scene } from "@/features/3d-presentation/components/scene";

export default function JourneyPage() {
  return (
    <main className="relative">
      <section id="hero" className="flex h-screen items-center justify-center">
        <h1 className="text-5xl font-bold">This is a hero</h1>
      </section>

      <section
        id="section1"
        className="flex h-[300vh] items-start justify-center"
      >
        <p className="sticky top-1/2 text-3xl font-bold">Wireframe</p>
      </section>

      <section
        id="section2"
        className="flex h-[300vh] items-start justify-center"
      >
        <p className="sticky top-1/2 text-3xl font-bold">Box Full</p>
      </section>

      <section
        id="section3"
        className="flex h-[300vh] items-start justify-center"
      >
        <p className="sticky top-1/2 text-3xl font-bold">Cone</p>
      </section>

      <Scene />
    </main>
  );
}
