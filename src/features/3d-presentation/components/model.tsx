"use client";

import { animated, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import * as THREE from "three";

import { sectionAtom } from "../atoms/section-atoms";

interface ModelProps {
  modelSection: number;
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  rotation?: [number, number, number];
  wireframe?: boolean;
}

export function Model({
  modelSection,
  wireframe = false,
  position,
  scale,
  rotation,
}: ModelProps) {
  const [sectionIndex] = useAtom(sectionAtom);

  const modelMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0,
    wireframe,
  });

  const { opacity, size } = useSpring({
    opacity: sectionIndex === modelSection ? 1 : 0,
    size: sectionIndex === modelSection ? 1 : 0.5,
    delay: sectionIndex === modelSection ? 500 : 250,
    config: { tension: 250, friction: 50 },
  });

  useFrame(() => {
    modelMaterial.opacity = opacity.get();
  });

  return (
    <group position={position} rotation={rotation}>
      <animated.mesh
        scale={size.to((s) => [
          (Array.isArray(scale) ? scale[0] : (scale ?? 1)) * s,
          (Array.isArray(scale) ? scale[1] : (scale ?? 1)) * s,
          (Array.isArray(scale) ? scale[2] : (scale ?? 1)) * s,
        ])}
        geometry={new THREE.BoxGeometry()}
        material={modelMaterial}
      />
    </group>
  );
}
