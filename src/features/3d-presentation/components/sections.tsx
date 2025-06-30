/* eslint-disable react/no-unescaped-entities */
import { Box, Cone } from "@react-three/drei";
import type { ReactNode } from "react";
import type * as THREE from "three";

import { SlideInOutRotateScale } from "@/lib/animations";
import { degToRad } from "@/lib/utils";

interface Section {
  id: string;
  content: ReactNode;
  model: ReactNode;
  modelLeft?: boolean;
  animation?: (ref: THREE.Group) => gsap.core.Timeline;
}

export const journeySections: Section[] = [
  {
    id: "section1",
    content: (
      <>
        <h2 className="text-5xl font-bold">Purifying the Sand</h2>
        <p className="col-start-2 row-start-2 text-right">
          Common sand contains a lot of silicon dioxide (SiO₂), but it's not
          pure enough for electronics. The journey begins by extracting and
          refining silicon from quartz sand. Through a high-temperature chemical
          process, silicon is isolated and purified to 99.9999% purity—a
          requirement for creating reliable microchips.
        </p>
        <p className="row-start-3 mt-64 text-neutral-500">
          Silicon is isolated and purified to 99.9999% purity.
        </p>
      </>
    ),
    model: (
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={"#ffffff"} wireframe />
      </mesh>
    ),
    modelLeft: true,
    animation: (group: THREE.Group) =>
      SlideInOutRotateScale(group, "#section1", 1.6, { x: degToRad(20) }, true),
  },
  {
    id: "section2",
    content: (
      <>
        <h2 className="col-start-2 text-5xl font-bold">
          Growing a Silicon Ingot
        </h2>
        <p className="mb-64">
          The ultra-pure silicon is melted and grown into a single large crystal
          using a process called the Czochralski method. This crystal is shaped
          into a cylindrical ingot—a perfect lattice structure that forms the
          base for every modern microchip.
        </p>
      </>
    ),
    model: <Box />,
  },
  {
    id: "section3",
    content: (
      <>
        <h2 className="text-5xl font-bold">Wafer Slicing and Polishing</h2>
        <p className="col-start-2 row-start-2 mb-40 text-right">
          The silicon ingot is sliced into ultra-thin wafers, like microscopic
          pancakes. Each wafer is polished until it's mirror-smooth, creating a
          flat surface ready for circuit printing. These wafers are now the
          canvas for microchip design.
        </p>
        <p className="col-span-2 row-start-3 mt-24 mb-5">
          The silicon ingot is sliced into ultra-thin wafers, like microscopic
          pancakes. Each wafer is polished until it's mirror-smooth, creating a
          flat surface ready for circuit printing. These wafers are now the
          canvas for microchip design.
        </p>
      </>
    ),
    model: <Cone />,
    modelLeft: true,
  },
];
