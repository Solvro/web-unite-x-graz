"use client";

import { useGLTF } from "@react-three/drei";

interface ModelProps {
  modelUrl: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: unknown;
}

export function Model({
  modelUrl,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  ...props
}: ModelProps) {
  const { scene } = useGLTF(modelUrl);

  return (
    <group position={position} rotation={rotation} scale={scale} {...props}>
      <primitive object={scene.clone()} />
    </group>
  );
}
