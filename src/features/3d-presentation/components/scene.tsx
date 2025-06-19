"use client";

import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { ScrollManager } from "./scroll-manager";
import { SectionContent } from "./section-content";
import { sections } from "./sections";

export function Scene() {
  return (
    <Canvas gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -3, -3]} intensity={0.3} />

      <Suspense fallback={null}>
        <ScrollControls pages={sections.length} damping={0.1}>
          <ScrollManager />
          <Scroll>
            {sections.map((section, index) => (
              <group key={section.id} position={[0, -index * 7.7, 0]}>
                {section.model}
              </group>
            ))}
          </Scroll>
          <Scroll html>
            {sections.map((section) => (
              <SectionContent section={section} key={`section-${section.id}`} />
            ))}
          </Scroll>
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
