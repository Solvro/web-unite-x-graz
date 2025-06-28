"use client";

import { Box, Cone } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { Suspense } from "react";

import { degToRad } from "@/lib/utils";

import { ScrollModel } from "./scroll-model";

export function Scene() {
  return (
    <div className="fixed inset-0">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.8} />
        <pointLight position={[-3, -3, -3]} intensity={0.3} />

        <Suspense fallback={null}>
          <ScrollModel
            trigger="#section1"
            timeline={(group) =>
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: "#section1",
                    start: "top 50%",
                    end: "bottom top",
                    scrub: true,
                  },
                })
                .fromTo(group.position, { x: 10 }, { x: 2.5, duration: 0.2 })
                .to(group.scale, { x: 2, y: 2, z: 2, duration: 0.4 }, "<")
                .to(group.rotation, { x: degToRad(35), duration: 0.4 }, "<")
                .to(group.position, { x: 10, duration: 0.2 })
                .to(group.scale, { x: 1, y: 1, z: 1, duration: 0.2 }, "<")
                .to(group.rotation, { x: 0, duration: 0.2 }, "<")
            }
          >
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color={"#ffffff"} wireframe />
            </mesh>
          </ScrollModel>

          <ScrollModel trigger="#section2" left>
            <Box />
          </ScrollModel>

          <ScrollModel trigger="#section3">
            <Cone />
          </ScrollModel>
        </Suspense>
      </Canvas>
    </div>
  );
}
