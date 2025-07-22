import Image from "next/image";

import { vt323 } from "@/lib/fonts";

export function Hero() {
  return (
    <section className="container w-full overflow-hidden px-4 py-16">
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/background-animation-placeholder.jpg"
      >
        <source src="/background-animation.webm" type="video/webm" />
        <source src="/background-animation.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <h1 className="mb-8 text-center font-extrabold">
          <span className="block text-[min(8vw,60px)] leading-16">
            JOURNEY THROUGH THE
          </span>
          <span
            className={`${vt323.className} text-primary block text-[min(15vw,111px)] leading-10 sm:leading-18`}
          >
            Silicon World
          </span>
        </h1>

        {/* Text columns and image */}
        <div className="text-secondary-foreground flex flex-col items-center justify-center gap-8 px-4 md:flex-row">
          {/* Left text column */}
          <div className="md:w-2/5">
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque quae, similique magnam labore ex illo consectetur ut
              consequuntur, voluptates nihil Lorem.
            </p>
          </div>

          {/* Center image - overlapping with negative margin */}
          <div className="z-10 w-1/5 md:-mt-12">
            <div className="relative">
              <Image
                src="/amigus.png"
                alt="Solvro Logo"
                width={220}
                height={220}
                className="h-auto w-auto"
              />
            </div>
          </div>

          {/* Right text column */}
          <div className="md:w-2/5">
            <p className="text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, similique delectus. Praesentium molestiae alias maiores
              culpa. Explicabo facilis at, Lorem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
