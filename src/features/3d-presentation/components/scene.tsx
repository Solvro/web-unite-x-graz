"use client";

import { Environment } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";

import { Model } from "./model";
import { ScrollModel } from "./scroll-model";

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
        <Model modelUrl="/sand.glb" rotation={[0, Math.PI / 4, 0]} />
      </ScrollModel>
      <ScrollModel trigger="#section2">
        <Model
          modelUrl="/microscope.glb"
          scale={0.3}
          position={[0, -1, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </ScrollModel>
      <ScrollModel trigger="#section3" left>
        <Model
          modelUrl="/wafer.glb"
          rotation={[0, -Math.PI / 4, -Math.PI / 8]}
        />
      </ScrollModel>
    </>
  );
}
