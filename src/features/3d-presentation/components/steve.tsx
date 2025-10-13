"use client";

import { useGLTF } from "@react-three/drei";

interface SteveProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: unknown;
}

export function Steve({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  ...props
}: SteveProps) {
  const { scene } = useGLTF("/steve.glb");

  return (
    <group position={position} rotation={rotation} scale={scale} {...props}>
      <primitive object={scene.clone()} scale={0.1} />
    </group>
  );
}
