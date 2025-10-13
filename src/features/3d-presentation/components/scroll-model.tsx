"use client";

import { Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type * as THREE from "three";

// percentage of x offset the model will be placed at after animation relative to the screen edge
const X_OFFSET = 0.25;
// percentage of x offset the model will be placed at before animation relative to the screen edge
const X_OFFSCREEN_OFFSET = 0.25;

interface ScrollModelProps {
  trigger: string;
  children: ReactNode;
  left?: boolean;
  animateEnter?: boolean;
}

export function ScrollModel({
  trigger,
  left = false,
  animateEnter = true,
  children,
}: ScrollModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (modelRef.current === null) {
      return;
    }

    const targetX = left
      ? -(viewport.width / 2 - viewport.width * X_OFFSET)
      : viewport.width / 2 - viewport.width * X_OFFSET;

    if (animateEnter) {
      modelRef.current.position.x = left
        ? -(viewport.width / 2 + viewport.width * X_OFFSCREEN_OFFSET)
        : viewport.width / 2 + viewport.width * X_OFFSCREEN_OFFSET;

      gsap.to(modelRef.current.position, {
        x: targetX,
        scrollTrigger: {
          trigger,
          start: "-5% top",
          end: "10% top",
          scrub: true,
        },
        ease: "power2.out",
      });
    } else {
      modelRef.current.position.x = targetX;
    }

    gsap.to(modelRef.current.position, {
      y: 10,
      scrollTrigger: {
        trigger,
        start: "bottom bottom",
        end: "+=40% top",
        scrub: true,
      },
    });

    // scroll trigger cleaning is handled at page component
  }, [viewport.width, animateEnter, left, trigger]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatingRange={[-0.2, 0.2]}>
      <group ref={modelRef}>{children}</group>
    </Float>
  );
}
