/* eslint-disable react/no-unescaped-entities */
import { Scene } from "@/features/3d-presentation/components/scene";

export default function JourneyPage() {
  return (
    <main className="relative">
      <section className="grid h-screen place-content-center">
        <h2 className="text-7xl font-bold">Hero</h2>
      </section>

      <section id="section1" className="h-[300vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div className="grid w-full max-w-7xl grid-cols-2 gap-20 border border-white p-4">
            <h2 className="text-5xl font-bold">Purifying the Sand</h2>
            <p className="col-start-2 row-start-2 text-right">
              Common sand contains a lot of silicon dioxide (SiO₂), but it's not
              pure enough for electronics. The journey begins by extracting and
              refining silicon from quartz sand. Through a high-temperature
              chemical process, silicon is isolated and purified to 99.9999%
              purity—a requirement for creating reliable microchips.
            </p>
            <p className="row-start-3 mt-32 text-neutral-500">
              silicon is isolated and purified to 99.9999% purity.
            </p>
          </div>
        </div>
      </section>

      <section id="section2" className="h-[300vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div className="grid w-full max-w-7xl grid-cols-2 gap-12 border border-white p-4">
            <h2 className="col-start-2 text-5xl font-bold">
              Growing a Silicon Ingot
            </h2>
            <p className="row-start-2 mb-64">
              The ultra-pure silicon is melted and grown into a single large
              crystal using a process called the Czochralski method. This
              crystal is shaped into a cylindrical ingot—a perfect lattice
              structure that forms the base for every modern microchip.
            </p>
          </div>
        </div>
      </section>

      <section id="section3" className="h-[300vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div className="grid w-full max-w-7xl grid-cols-2 gap-12 border border-white p-4">
            <h2 className="text-5xl font-bold">Wafer Slicing and Polishing</h2>
            <p className="col-start-2 row-start-2 mb-40 text-right">
              The silicon ingot is sliced into ultra-thin wafers, like
              microscopic pancakes. Each wafer is polished until it's
              mirror-smooth, creating a flat surface ready for circuit printing.
              These wafers are now the canvas for microchip design.
            </p>
            <p className="col-span-2 row-start-3 mt-24 mb-5">
              The silicon ingot is sliced into ultra-thin wafers, like
              microscopic pancakes. Each wafer is polished until it's
              mirror-smooth, creating a flat surface ready for circuit printing.
              These wafers are now the canvas for microchip design.
            </p>
          </div>
        </div>
      </section>

      <Scene />
    </main>
  );
}
