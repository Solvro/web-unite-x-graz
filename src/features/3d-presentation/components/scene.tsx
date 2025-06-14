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
          <group position={[1.5, 0, 0]}>
            <Box />
          </group>
          <group position={[-1.5, -7.6, 0]}>
            <BoxFull />
          </group>
        </Scroll>

        <Scroll html>
          <div className="flex w-screen flex-col items-center justify-center">
            <div className="flex h-screen w-full items-center justify-center">
              <section className="grid h-1/2 w-4xl grid-cols-2 items-center rounded border border-white px-4 py-10">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">
                    Section 1: Wireframe
                  </h2>
                  <p>Box wireframe section 1</p>
                </div>
              </section>
            </div>

            <div className="flex h-screen w-full items-center justify-center">
              <section className="grid h-1/2 w-4xl grid-cols-2 items-center rounded border border-white px-4 py-10 text-right">
                <div className="col-start-2">
                  <h2 className="mb-4 text-2xl font-semibold">
                    Section 2: Full Box
                  </h2>
                  <p>Full box section 2</p>
                </div>
              </section>
            </div>
          </div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
