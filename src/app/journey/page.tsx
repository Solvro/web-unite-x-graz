"use client";

import { Suspense } from "react";

import { Scene } from "@/components/journey/scene";

export default function JourneyPage() {
  return (
    <div className="fixed inset-0 h-screen w-full">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
