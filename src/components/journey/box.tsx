"use client";

export function Box() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"#ffffff"} wireframe />
    </mesh>
  );
}

export function BoxFull() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"#ffffff"} />
    </mesh>
  );
}
