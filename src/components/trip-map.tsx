import Image from "next/image";

export function TripMap() {
  return (
    <section id="trip-map" className="w-full">
      <div className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505] px-4 py-10 text-white shadow-[0_0_60px_rgba(12,12,12,0.8)] md:px-10 md:py-14">
        <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center">
          <Image
            src="/trip_map/map.svg"
            alt="Map of Europe showing the route from Wrocław to Graz and partner logos"
            width={1200}
            height={700}
            priority={false}
            className="h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
