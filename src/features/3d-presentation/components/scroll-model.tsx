// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import type * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

interface ScrollModelProps {
  trigger: string; // trigger can be either an id or a class of an html element
  children: ReactNode;
  left?: boolean;
  timeline?: (ref: THREE.Group) => gsap.core.Timeline;
}

export function ScrollModel({
  trigger,
  children,
  left = false,
  timeline,
}: ScrollModelProps) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    // floating animation
    /* NOTE: There is limitation when using it with custom timeline
     it overwrites any animation with y position or rotation */
    gsap.to(ref.current.position, {
      y: 0.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(ref.current.rotation, {
      y: 0.4,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    if (timeline === undefined) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger,
            start: "top 50%",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(
          ref.current.position,
          { x: left ? -10 : 10 },
          { x: left ? -2.5 : 2.5, duration: 0.4 },
        )
        .to(ref.current.position, {
          x: left ? -2.5 : 2.5,
          duration: 0.5,
        })
        .to(ref.current.position, {
          x: left ? -10 : 10,
          duration: 0.2,
        });
    } else {
      timeline(ref.current);
    }
  }, [left, timeline, trigger]);

  return (
    // Adjust to be in a center with the text
    <group ref={ref} position-y={-0.5}>
      {children}
    </group>
  );
}
