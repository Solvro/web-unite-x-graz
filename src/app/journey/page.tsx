"use client";

// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import SplitType from "split-type";

import { Scene } from "@/features/3d-presentation/components/scene";
import { SectionCard } from "@/features/3d-presentation/components/section-card";
import { journeySections } from "@/features/3d-presentation/components/sections";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyPage() {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const splitTypes = document.querySelectorAll(".reveal-type");
    for (const char of splitTypes) {
      if (char instanceof HTMLElement) {
        const text = new SplitType(char, { types: "chars" });

        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: char,
            start: "top 35%",
            end: "top top",
            scrub: true,
          },
          opacity: 0,
          transformOrigin: "top",
          stagger: 0.1,
          duration: 3.5,
        });
      }
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

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
