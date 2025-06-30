"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { ScrollModel } from "./scroll-model";
import { journeySections } from "./sections";

export function Scene() {
  // const animationScaleRotate = useMemo(() => {
  //   return (group: THREE.Group) =>
  //     SlideInOutRotateScale(group, "#section1", 1.6, { x: degToRad(20) }, true);
  // }, []); // NOTE: This is temporary, later move to individual models

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.8} />
        <pointLight position={[-3, -3, -3]} intensity={0.3} />

        <Suspense fallback={null}>
          {journeySections.map((section) => (
            <ScrollModel
              key={section.id}
              trigger={`#${section.id}`}
              timeline={section.animation}
              left={section.modelLeft}
            >
              {section.model}
            </ScrollModel>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
