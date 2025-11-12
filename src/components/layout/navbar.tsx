"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Flag } from "@/components/ui/flag";

export function Navbar({
  initialLang = "pl",
}: {
  initialLang?: "pl" | "en" | "de";
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLang] = useState<"pl" | "en" | "de">(initialLang);
  // IDs are handled inside Flag component now

  // Use the reusable Flag component for consistent rendering

  useLayoutEffect(() => {
    const element = menuRef.current;
    if (element === null) {
      return;
    }
    gsap.killTweensOf(element);
    if (open) {
      element.style.pointerEvents = "auto";
      gsap.fromTo(
        element,
        { opacity: 0, scaleY: 0.7, y: -8, transformOrigin: "top right" },
        { opacity: 1, scaleY: 1, y: 0, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        element.children,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.05, ease: "power2.out" },
      );
    } else {
      gsap.to(element, {
        opacity: 0,
        scaleY: 0.7,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          element.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-3 py-3 md:px-12">
      <div className="mx-auto flex items-center justify-between">
        {/* logo */}
        <Link href="/" className="group relative block h-16 w-16">
          <Image
            src="/logo_solvro_mono.svg"
            alt="Logo Solvro mono"
            fill
            className="pointer-events-none absolute inset-0 z-10 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
            priority
          />
          <Image
            src="/logo_solvro.svg"
            alt="Logo Solvro"
            fill
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            priority
          />
        </Link>

        {/* Language switcher (fixed top-right) */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            type="button"
            aria-label="Toggle language menu"
            aria-expanded={open}
            onClick={() => {
              setOpen((o) => !o);
            }}
            className="relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white p-1 [&_svg]:!h-full [&_svg]:!w-full"
            variant="ghost"
          >
            <Flag code={lang} />
          </Button>

          <div
            ref={menuRef}
            className="pointer-events-none absolute right-0 mt-2 flex origin-top-right flex-col items-end gap-2 opacity-0"
          >
            {(["pl", "en", "de"] as const)
              .filter((c) => c !== lang)
              .map((code) => (
                <Button
                  key={code}
                  type="button"
                  aria-label={
                    code === "pl"
                      ? "Polish"
                      : code === "en"
                        ? "English"
                        : "German"
                  }
                  title={
                    code === "pl"
                      ? "Polish"
                      : code === "en"
                        ? "English"
                        : "German"
                  }
                  onClick={async () => {
                    setLang(code);
                    try {
                      await fetch("/api/lang", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ lang: code }),
                      });
                    } catch {}
                    setOpen(false);
                  }}
                  className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white p-1 [&_svg]:!h-full [&_svg]:!w-full"
                  variant="ghost"
                >
                  <Flag code={code} />
                </Button>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
