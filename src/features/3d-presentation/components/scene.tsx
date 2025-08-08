"use client";

import {
  Box,
  Environment,
  Float,
  OrbitControls,
  Sphere,
} from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";

import { ScrollModel } from "./scroll-model";
import { Steve } from "./steve";

export function Scene() {
  return (
    <>
      {/* TODO Lights need more work */}
      <Environment
        preset="studio"
        environmentIntensity={0.3}
        environmentRotation={[degToRad(-10), degToRad(180), 0]}
      />
      <directionalLight position={[-3, 2, 2]} intensity={0.4} />
      <ambientLight intensity={0.2} />

      <ScrollModel trigger="#section1" left animateEnter={false}>
        <Steve rotation={[0, Math.PI / 4, 0]} />
      </ScrollModel>
      <ScrollModel trigger="#section2">
        <Steve rotation={[0, -Math.PI / 4, 0]} />
      </ScrollModel>
      <ScrollModel trigger="#section3" left>
        <Box />
      </ScrollModel>
    </>
  );
}
