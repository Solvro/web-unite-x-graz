"use client";

import { useEffect, useState } from "react";

interface useScrollSectionOptions {
  maxSections?: number;
  sectionHeight?: number; // in viewport units, e.g.: 50vh = 0.5
}

export const useScrollSection = ({
  maxSections = 1,
  sectionHeight = 0.5,
}: useScrollSectionOptions) => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setCurrentSection(
      Math.floor(window.scrollY / (window.innerHeight * sectionHeight)),
    );

    const handleScroll = () => {
      const section = Math.floor(
        window.scrollY / (window.innerHeight * sectionHeight),
      );
      setCurrentSection(Math.min(section, maxSections - 1));
    };

    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxSections, sectionHeight]);

  return currentSection;
};
