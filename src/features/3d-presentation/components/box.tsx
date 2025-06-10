"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

export function Box() {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((_, delta) => {
    if (meshRef.current !== null) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"#ffffff"} wireframe />
    </mesh>
  );
}

export function BoxFull() {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((_, delta) => {
    if (meshRef.current !== null) {
      meshRef.current.rotation.x += delta * 0.7;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"#ffffff"} />
    </mesh>
  );
}
