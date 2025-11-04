"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StartButton() {
  return (
    <div className="relative inline-flex items-center justify-center rounded-full border-2 border-white/40 p-1 transition-all hover:border-white/70">
      <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/60" />
      <Button
        variant="ghost"
        size="lg"
        className="flex items-center gap-3 rounded-full bg-transparent px-6 py-3 font-semibold text-white hover:bg-white/10"
      >
        Start here
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
