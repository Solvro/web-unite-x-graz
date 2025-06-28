"use client";

import { Box, Cone } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { ScrollModel } from "./scroll-model";

export function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.8} />
        <pointLight position={[-3, -3, -3]} intensity={0.3} />

        <Suspense fallback={null}>
          <ScrollModel trigger="#section1">
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color={"#ffffff"} wireframe />
            </mesh>
          </ScrollModel>

          <ScrollModel trigger="#section2" left>
            <Box />
          </ScrollModel>

          <ScrollModel trigger="#section3">
            <Cone />
          </ScrollModel>
        </Suspense>
      </Canvas>
    </div>
  );
}
