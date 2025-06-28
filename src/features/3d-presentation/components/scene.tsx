"use client";

import { Box, Cone } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import type * as THREE from "three";

import { SlideInOutRotateScale } from "@/lib/animations";
import { degToRad } from "@/lib/utils";

import { ScrollModel } from "./scroll-model";

export function Scene() {
  const animationScaleRotate = useMemo(() => {
    return (group: THREE.Group) =>
      SlideInOutRotateScale(group, "#section1", 2, { x: degToRad(35) });
  }, []); // NOTE: This is temporary, later move to individual models

  return (
    <div className="fixed inset-0">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.8} />
        <pointLight position={[-3, -3, -3]} intensity={0.3} />

        <Suspense fallback={null}>
          <ScrollModel trigger="#section1" timeline={animationScaleRotate}>
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
