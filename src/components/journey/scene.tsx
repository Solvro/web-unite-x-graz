"use client";

import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Box, BoxFull } from "./box";
import { ScrollWatcher } from "./scroll-watcher";
import { TextSections } from "./text-sections";

function sectionPosition(section: number): [number, number, number] {
  const gap = 8; // will this work with different screen sizes and number of sections?
  return [0, section * -gap, 0];
}

export function Scene() {
  const SECTIONS = 3;

  return (
    <div className="relative h-screen w-screen">
      <Canvas gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.8} />
        <pointLight position={[-3, -3, -3]} intensity={0.3} />

        <ScrollControls pages={SECTIONS} damping={0.01}>
          <Scroll>
            <group position={sectionPosition(0)}>
              <Box />
            </group>
            <group position={sectionPosition(1)}>
              <BoxFull />
            </group>
            <group position={sectionPosition(2)}>
              <Box />
            </group>
          </Scroll>

          <ScrollWatcher />
        </ScrollControls>
      </Canvas>

      <TextSections className="pointer-events-none fixed inset-30 z-10 w-1/3 text-2xl text-white" />
      {
        "^ pointer-events-none can be removed to enable text-selection at the cost of scroll lock"
      }
    </div>
  );
}
