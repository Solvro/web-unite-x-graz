"use client";

import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Box, BoxFull } from "./box";

export function Scene() {
  return (
    <Canvas gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -3, -3]} intensity={0.3} />

      <ScrollControls pages={2} damping={0.01}>
        <Scroll>
          <group position={[0, 0, 0]}>
            <Box />
          </group>
          <group position={[0, -7, 0]}>
            <BoxFull />
          </group>
        </Scroll>

        <Scroll html>
          <section className="flex h-screen flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Section 1: Wireframe
            </h2>
            <p>Box wireframe section 1</p>
          </section>

          <section className="flex h-screen flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-2xl font-semibold">Section 2: Full Box</h2>
            <p>Full box section 2</p>
          </section>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
