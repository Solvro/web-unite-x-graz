"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSetAtom } from "jotai";
import { useRef } from "react";

import { scrollSectionAtom } from "@/atoms/general-atoms";

function evalSection(sections: number, scrollPos: number): number {
  const section = Math.floor(scrollPos * sections);
  return Math.min(section, sections - 1);
}

export function ScrollWatcher() {
  const scroll = useScroll();
  const setSection = useSetAtom(scrollSectionAtom);
  const lastSection = useRef(0);
  const SECTIONS = 3; // Total number of sections we want to have

  useFrame(() => {
    // Current scroll offset (0 to 1)
    const scrollPos = scroll.offset;

    // Define section breakpoints
    const newSection = evalSection(SECTIONS, scrollPos);

    // Update section if changed
    if (newSection !== lastSection.current) {
      setSection(newSection);
      lastSection.current = newSection;
    }
  });

  return null;
}
