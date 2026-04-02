"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const grazPhotos = [
  "/photos/graz/graz-1.jpg",
  "/photos/graz/graz-2.jpg",
  "/photos/graz/graz-3.jpg",
  "/photos/graz/graz-5.jpg",
  "/photos/graz/graz-6.jpg",
  "/photos/graz/graz-7.jpg",
  "/photos/graz/graz-9.jpg",
  "/photos/graz/graz-10.jpg",
  "/photos/graz/graz-11.jpeg",
];

const wroclawPhotos = [
  "/photos/wroclaw/wroclaw-1.jpg",
  "/photos/wroclaw/wroclaw-2.jpg",
  "/photos/wroclaw/wroclaw-3.jpg",
  "/photos/wroclaw/wroclaw-4.jpg",
  "/photos/wroclaw/wroclaw-5.jpg",
  "/photos/wroclaw/wroclaw-6.jpg",
  "/photos/wroclaw/wroclaw-7.jpg",
  "/photos/wroclaw/wroclaw-8.jpg",
  "/photos/wroclaw/wroclaw-9.jpg",
  "/photos/wroclaw/wroclaw-10.jpg",
  "/photos/wroclaw/wroclaw-11.jpg",
];

export function PhotoGallery() {
  const t = useTranslations("gallery");
  const [activeTab, setActiveTab] = useState<"graz" | "wroclaw">("graz");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = activeTab === "graz" ? grazPhotos : wroclawPhotos;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goNext = useCallback(() => {
    if (lightboxIndex === null) {
      return;
    }
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  }, [lightboxIndex, photos.length]);

  const goPrevious = useCallback(() => {
    if (lightboxIndex === null) {
      return;
    }
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  }, [lightboxIndex, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const handleKey = (event_: KeyboardEvent) => {
      if (event_.key === "ArrowRight") {
        goNext();
      }
      if (event_.key === "ArrowLeft") {
        goPrevious();
      }
      if (event_.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, goNext, goPrevious]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="relative px-6 py-32"
      style={{ backgroundColor: "#0D2B1E" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{
              color: "#00E87A",
              border: "1px solid rgba(0,232,122,0.3)",
              backgroundColor: "rgba(0,232,122,0.05)",
            }}
          >
            Moments
          </div>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#F2F4F3",
              letterSpacing: "-0.02em",
            }}
          >
            {t("section_title")}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex rounded-full p-1"
            style={{
              backgroundColor: "#0B110E",
              border: "1px solid rgba(0,232,122,0.2)",
            }}
          >
            <button
              onClick={() => {
                setActiveTab("graz");
              }}
              className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor:
                  activeTab === "graz" ? "#00E87A" : "transparent",
                color:
                  activeTab === "graz" ? "#0B110E" : "rgba(242,244,243,0.6)",
              }}
            >
              {t("tab_graz")}
            </button>
            <button
              onClick={() => {
                setActiveTab("wroclaw");
              }}
              className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor:
                  activeTab === "wroclaw" ? "#00E87A" : "transparent",
                color:
                  activeTab === "wroclaw" ? "#0B110E" : "rgba(242,244,243,0.6)",
              }}
            >
              {t("tab_wroclaw")}
            </button>
          </div>
        </div>

        {/* Photo grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {photos.map((source, index) => (
              <motion.button
                key={source}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => {
                  openLightbox(index);
                }}
                className="group relative overflow-hidden rounded-xl focus:ring-2 focus:outline-none"
                style={{
                  aspectRatio: "1 / 1",
                }}
              >
                <Image
                  src={source}
                  alt={`Photo ${String(index + 1)}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: "rgba(0,232,122,0.15)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle
                      cx="16"
                      cy="16"
                      r="15"
                      fill="rgba(0,0,0,0.5)"
                      stroke="#00E87A"
                      strokeWidth="1"
                    />
                    <path
                      d="M11 16H21M16 11V21"
                      stroke="#00E87A"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex === null ? null : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              onClick={(event_) => {
                event_.stopPropagation();
              }}
            >
              <Image
                src={photos[lightboxIndex]}
                alt={`Photo ${String(lightboxIndex + 1)}`}
                width={1200}
                height={800}
                className="rounded-lg object-contain"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                  width: "auto",
                  height: "auto",
                }}
              />
              {/* Counter */}
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#F2F4F3" }}
              >
                {lightboxIndex + 1} / {photos.length}
              </div>
            </motion.div>

            {/* Close button */}
            <button
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#F2F4F3",
              }}
              onClick={closeLightbox}
              onMouseEnter={(event_) => {
                event_.currentTarget.style.backgroundColor =
                  "rgba(0,232,122,0.3)";
              }}
              onMouseLeave={(event_) => {
                event_.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.1)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2 2L16 16M16 2L2 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Prev button */}
            <button
              className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#F2F4F3",
              }}
              onClick={(event_) => {
                event_.stopPropagation();
                goPrevious();
              }}
              onMouseEnter={(event_) => {
                event_.currentTarget.style.backgroundColor =
                  "rgba(0,232,122,0.3)";
              }}
              onMouseLeave={(event_) => {
                event_.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.1)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M13 4L7 10L13 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#F2F4F3",
              }}
              onClick={(event_) => {
                event_.stopPropagation();
                goNext();
              }}
              onMouseEnter={(event_) => {
                event_.currentTarget.style.backgroundColor =
                  "rgba(0,232,122,0.3)";
              }}
              onMouseLeave={(event_) => {
                event_.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.1)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 4L13 10L7 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
