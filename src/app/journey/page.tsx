"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
// import { useEffect } from "react";
import SplitType from "split-type";

import { Experience } from "@/features/3d-presentation/components/experience";
import { Loader } from "@/features/3d-presentation/components/loader";
import { UI } from "@/features/3d-presentation/components/ui";

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
        gsap.set(text.chars, { color: "gray" });

        gsap.to(text.chars, {
          scrollTrigger: {
            trigger: char,
            start: "50% 50%",
            end: "bottom top",
            scrub: true,
          },
          color: "white",
          stagger: 0.1,
          duration: 0.1,
        });
      }
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="relative">
      {/* I'm aware that there is loader component in react drei lib,
       but it does not show up and is very buggy in this setup */}
      <Loader />
      <UI />
      <div className="fixed inset-0">
        <Experience />
      </div>
    </main>
  );
}
