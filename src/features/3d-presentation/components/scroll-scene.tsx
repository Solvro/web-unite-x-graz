import { Canvas } from "@react-three/fiber";
import type { ReactElement } from "react";

interface SceneProps {
  currentModelIndex: number;
  models?: ReactElement[];
}

export function Scene({ currentModelIndex, models }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -3, -3]} intensity={0.3} />
      {models?.[currentModelIndex]}
    </Canvas>
  );
}
