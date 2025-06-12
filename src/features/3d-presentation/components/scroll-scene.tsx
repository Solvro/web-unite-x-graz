"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

import { useScrollSection } from "../hooks/use-scroll-section";

interface SceneProps {
  models: ReactNode[];
}

export function Scene({ models }: SceneProps) {
  const section = useScrollSection({
    maxSections: models.length,
    sectionHeight: 0.5,
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -3, -3]} intensity={0.3} />
      {models[section]}
    </Canvas>
  );
}
