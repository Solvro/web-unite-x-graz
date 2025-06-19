"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { sectionAtom } from "../atoms/section-atoms";

export function ScrollManager() {
  const [section, setSection] = useAtom(sectionAtom);
  const scroll = useScroll();
  const lastScroll = useRef(0);
  const isAnimation = useRef(false);

  scroll.fill.classList.add("top-0");
  scroll.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(scroll.el, {
      duration: 1,
      scrollTop: section * scroll.el.clientHeight,
      onStart: () => {
        isAnimation.current = true;
      },
      onComplete: () => {
        isAnimation.current = false;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useFrame(() => {
    if (isAnimation.current) {
      lastScroll.current = scroll.offset;
      return;
    }

    const currentSection = Math.round(scroll.offset * (scroll.pages - 1));
    const sectionSize = 1 / (scroll.pages - 1);

    if (
      scroll.offset > lastScroll.current &&
      currentSection + 1 < scroll.pages &&
      scroll.offset > (currentSection + 0.05) * sectionSize
    ) {
      setSection(currentSection + 1);
    } else if (
      scroll.offset < lastScroll.current &&
      currentSection - 1 >= 0 &&
      scroll.offset < (currentSection - 0.05) * sectionSize
    ) {
      setSection(currentSection - 1);
    }
    lastScroll.current = scroll.offset;
  });

  return null;
}
