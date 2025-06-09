"use client";

import Link from "next/link";

import { vt323 } from "@/lib/fonts";

import { Button } from "./ui/button";

export function JourneyStartButton() {
  return (
    <Link href="/journey">
      <Button
        className={`${vt323.className} bg-secondary text-primary border-primary rounded-none border-4 px-12 pt-10 pb-12 text-4xl font-bold transition-colors hover:bg-[#1a1d20] md:text-7xl`}
      >
        Start Journey
      </Button>
    </Link>
  );
}
