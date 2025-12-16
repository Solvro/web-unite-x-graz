import Image from "next/image";

const HINTS = [
  {
    text: "Our journey took us to Graz's silicon valley",
    className: "top-2 left-1/2 -translate-x-1/2 text-center",
  },
  {
    text: "It was a long journey…",
    className: "left-4 top-1/3 max-w-[8rem] text-left",
  },
  {
    text: "Cool fact about Graz #2",
    className: "left-6 bottom-10 max-w-[10rem] text-left",
  },
  {
    text: "Cool fact about Graz #1",
    className: "right-8 bottom-12 max-w-[10rem] text-right",
  },
];

const LOGOS = [
  {
    src: "/trip_map/graz_logo.png",
    alt: "TU Graz logo",
    width: 120,
    height: 72,
  },
  {
    src: "/trip_map/best_logo.svg",
    alt: "BEST logo",
    width: 120,
    height: 40,
  },
];

export function TripMap() {
  return (
    <section id="trip-map" className="mt-16 w-full">
      <div className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505] px-4 py-10 text-white shadow-[0_0_60px_rgba(12,12,12,0.8)] md:px-10 md:py-14">
        <div className="relative mx-auto w-full max-w-5xl">
          <Image
            src="/trip_map/europe-map-2.svg"
            alt="Map of Europe showing the route from Wrocław to Graz"
            width={1200}
            height={700}
            priority={false}
            className="h-auto w-1/2 select-none"
            draggable={false}
          />

          <div
            aria-hidden
            className="absolute top-[63%] left-[57%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/40 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute top-[63%] left-[57%] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.9)]"
          />
          <div
            aria-hidden
            className="absolute top-[38%] left-[45%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-black/70"
          />
          <div
            aria-hidden
            className="absolute top-[51%] left-[53%] h-20 w-px origin-top translate-x-[-35%] rotate-[26deg] border-l border-dashed border-white/50"
          />
        </div>

        {HINTS.map((hint) => (
          <p
            key={hint.text}
            className={`pointer-events-none absolute text-sm text-white/80 md:text-base ${hint.className}`}
          >
            {hint.text}
          </p>
        ))}

        <aside className="absolute top-8 right-6 hidden max-w-[180px] flex-col items-end gap-4 text-right text-sm text-white/80 md:flex">
          <p className="text-xs tracking-[0.2em] text-white/60 uppercase">
            It was all possible thanks to
          </p>
          <div className="flex flex-col items-end gap-5">
            {LOGOS.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-auto w-32 object-contain"
              />
            ))}
          </div>
        </aside>

        <div className="mt-10 flex flex-col items-center gap-4 text-sm text-white/70 md:hidden">
          <p className="text-xs tracking-[0.2em] text-white/60 uppercase">
            It was all possible thanks to
          </p>
          <div className="flex items-center gap-8">
            {LOGOS.map((logo) => (
              <Image
                key={`mobile-${logo.src}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-12 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
