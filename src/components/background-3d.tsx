"use client";

import type { ReactElement } from "react";

import { useScrollSection } from "@/hooks/use-scroll-section";

import { Scene } from "./scroll-scene";

interface Background3DProps {
  models: ReactElement[];
  sectionHeight?: number;
}

export function Background3D({ models, sectionHeight }: Background3DProps) {
  const currentSection = useScrollSection({
    maxSections: models.length,
    sectionHeight,
  });

  return (
    <div className="fixed inset-0 -z-10">
      <Scene currentModelIndex={currentSection} models={models} />
    </div>
  );
}
