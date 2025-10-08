"use client";

import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import { Scene } from "./scene";

export function Experience() {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress]);

  return (
    <Canvas
      shadows
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
