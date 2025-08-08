"use client";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export const Loader = () => {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const hasFadedOut = useRef(false);

  useEffect(() => {
    if (progress === 100 && loaderRef.current && !hasFadedOut.current) {
      hasFadedOut.current = true;
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => setVisible(false),
      });
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
    >
      <div className="text-center">
        <div className="mb-4 text-2xl">Loading...</div>
        <div className="h-2 w-48 bg-gray-700">
          <div
            className="h-full bg-white transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm">{progress.toFixed(0)}%</div>
      </div>
    </div>
  );
};
