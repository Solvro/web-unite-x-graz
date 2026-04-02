"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.startsWith("/pl") ? "pl" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const switchLocale = (locale: "en" | "pl") => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { href: "#journey", label: t("journey") },
    { href: "#exchange", label: t("exchange") },
    { href: "#about", label: t("about") },
  ];

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50">
        {/* Desktop background strip */}
        <div
          className="absolute inset-0 hidden transition-all duration-300 md:block"
          style={{
            backgroundColor: scrolled
              ? "rgba(11, 17, 14, 0.95)"
              : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(12, 107, 60, 0.3)"
              : "none",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-4">
          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "#F2F4F3" }}
                onMouseEnter={(event_) => {
                  event_.currentTarget.style.color = "#00E87A";
                }}
                onMouseLeave={(event_) => {
                  event_.currentTarget.style.color = "#F2F4F3";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language switcher (desktop) */}
          <div
            className="hidden items-center gap-1 text-sm font-semibold md:flex"
            style={{
              borderLeft: "1px solid rgba(12, 107, 60, 0.5)",
              paddingLeft: "1rem",
            }}
          >
            <button
              onClick={() => {
                switchLocale("en");
              }}
              className="rounded px-2 py-1 transition-colors duration-200"
              style={{
                color: currentLocale === "en" ? "#00E87A" : "#F2F4F3",
                opacity: currentLocale === "en" ? 1 : 0.5,
              }}
            >
              EN
            </button>
            <span style={{ color: "rgba(242, 244, 243, 0.3)" }}>|</span>
            <button
              onClick={() => {
                switchLocale("pl");
              }}
              className="rounded px-2 py-1 transition-colors duration-200"
              style={{
                color: currentLocale === "pl" ? "#00E87A" : "#F2F4F3",
                opacity: currentLocale === "pl" ? 1 : 0.5,
              }}
            >
              PL
            </button>
          </div>

          {/* Mobile hamburger - only element visible on mobile, with its own bg pill */}
          <button
            className="ml-auto flex flex-col justify-center gap-1.5 rounded-xl p-3 md:hidden"
            onClick={() => {
              setMenuOpen(true);
            }}
            aria-label="Open menu"
            style={{
              backgroundColor: "rgba(11, 17, 14, 0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(12, 107, 60, 0.3)",
            }}
          >
            <span
              className="block h-0.5 w-5"
              style={{ backgroundColor: "#F2F4F3" }}
            />
            <span
              className="block h-0.5 w-5"
              style={{ backgroundColor: "#F2F4F3" }}
            />
            <span
              className="block h-0.5 w-5"
              style={{ backgroundColor: "#F2F4F3" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay - outside <nav> to avoid z-index issues */}
      {menuOpen ? (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-10"
          style={{ backgroundColor: "#0B110E", zIndex: 9999 }}
        >
          {/* Close button */}
          <button
            onClick={() => {
              setMenuOpen(false);
            }}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              padding: "0.5rem",
              color: "#F2F4F3",
              fontSize: "1.5rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-semibold tracking-wide"
              style={{ color: "#F2F4F3" }}
              onMouseEnter={(event_) => {
                event_.currentTarget.style.color = "#00E87A";
              }}
              onMouseLeave={(event_) => {
                event_.currentTarget.style.color = "#F2F4F3";
              }}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}

          <div
            className="flex items-center gap-3 text-sm font-semibold"
            style={{
              borderTop: "1px solid rgba(12, 107, 60, 0.4)",
              paddingTop: "1.5rem",
            }}
          >
            <button
              onClick={() => {
                switchLocale("en");
                setMenuOpen(false);
              }}
              style={{
                color: currentLocale === "en" ? "#00E87A" : "#F2F4F3",
                opacity: currentLocale === "en" ? 1 : 0.5,
              }}
            >
              EN
            </button>
            <span style={{ color: "rgba(242, 244, 243, 0.3)" }}>|</span>
            <button
              onClick={() => {
                switchLocale("pl");
                setMenuOpen(false);
              }}
              style={{
                color: currentLocale === "pl" ? "#00E87A" : "#F2F4F3",
                opacity: currentLocale === "pl" ? 1 : 0.5,
              }}
            >
              PL
            </button>
          </div>

          {/* Made with love */}
          <div className="absolute bottom-8 flex items-center gap-2">
            <span
              className="text-xs"
              style={{ color: "rgba(242,244,243,0.45)" }}
            >
              Made with
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 12.25S1.75 9.1 1.75 5.25a3.5 3.5 0 0 1 5.25-3.03A3.5 3.5 0 0 1 12.25 5.25C12.25 9.1 7 12.25 7 12.25Z"
                fill="#E84040"
              />
            </svg>
            <span
              className="text-xs"
              style={{ color: "rgba(242,244,243,0.45)" }}
            >
              by
            </span>
            <a
              href="https://solvro.pwr.edu.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src="/logos/solvro.svg"
                alt="KN Solvro"
                width={72}
                height={20}
                className="object-contain"
                style={{ height: "auto" }}
              />
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
