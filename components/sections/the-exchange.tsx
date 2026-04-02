"use client";

import { geoMercator, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { feature } from "topojson-client";
import type {
  GeometryCollection,
  Objects,
  Topology,
} from "topojson-specification";

// ── map ───────────────────────────────────────────────────────────────────────

const GRAZ: [number, number] = [15.44, 47.07];
const WROCLAW: [number, number] = [17.04, 51.11];
const MAP_W = 800;
const MAP_H = 420;

// Numeric ISO 3166-1 codes for European countries
const EUROPEAN_IDS = new Set([
  8, 20, 40, 112, 56, 70, 100, 191, 196, 203, 208, 233, 246, 250, 276, 300, 348,
  352, 372, 380, 428, 438, 440, 442, 807, 470, 498, 492, 499, 528, 578, 616,
  620, 642, 643, 674, 688, 703, 705, 724, 752, 756, 804, 826,
]);

interface CountryPath {
  d: string;
  highlight: boolean;
}

interface GeoFeature {
  id: string | number;
  geometry: Geometry | null;
  properties: GeoJsonProperties;
  type: "Feature";
}

function EuropeMap() {
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 767px)");
      const handler = () => {
        onStoreChange();
      };
      mq.addEventListener("change", handler);
      return () => {
        mq.removeEventListener("change", handler);
      };
    },
    () => {
      if (typeof window === "undefined") {
        return false;
      }
      return window.matchMedia("(max-width: 767px)").matches;
    },
    () => false,
  );
  const [countryPaths, setCountryPaths] = useState<CountryPath[]>([]);
  const [grazPt, setGrazPt] = useState<[number, number] | null>(null);
  const [wroclawPt, setWroclawPt] = useState<[number, number] | null>(null);

  useEffect(() => {
    void fetch("/countries-50m.json")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then(async (response) => response.json())
      .then((world: Topology<Objects>) => {
        const center: [number, number] = isMobile ? [17, 50.8] : [16, 49];
        const scale = isMobile ? 1800 : 1200;

        const projection = geoMercator()
          .center(center)
          .scale(scale)
          .translate([MAP_W / 2, MAP_H / 2]);

        const pathGen = geoPath(projection);
        const featureCollection = feature(
          world,
          world.objects.countries as GeometryCollection<GeoJsonProperties>,
        ) as FeatureCollection | Feature;

        const features =
          "features" in featureCollection
            ? featureCollection.features
            : [featureCollection];

        setCountryPaths(
          (features as GeoFeature[])
            .filter((f) => EUROPEAN_IDS.has(Number(f.id)))
            .map((f) => ({
              d: pathGen(f as GeoPermissibleObjects) ?? "",
              highlight: Number(f.id) === 40 || Number(f.id) === 616,
            })),
        );

        const gp = projection(GRAZ);
        const wp = projection(WROCLAW);
        setGrazPt(gp === null ? null : [gp[0], gp[1]]);
        setWroclawPt(wp === null ? null : [wp[0], wp[1]]);
      });
  }, [isMobile]);

  const flightD =
    grazPt !== null && wroclawPt !== null
      ? `M ${String(grazPt[0])} ${String(grazPt[1])} Q ${String((grazPt[0] + wroclawPt[0]) / 2)} ${String(Math.min(grazPt[1], wroclawPt[1]) - 30)} ${String(wroclawPt[0])} ${String(wroclawPt[1])}`
      : "";

  return (
    <div className="w-full" style={{ maxHeight: MAP_H, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${String(MAP_W)} ${String(MAP_H)}`}
        style={{ width: "100%", height: "auto" }}
      >
        {countryPaths.map((p) => (
          <path
            key={p.d}
            d={p.d}
            fill={p.highlight ? "rgba(0,232,122,0.28)" : "rgba(13,43,30,0.7)"}
            stroke={
              p.highlight ? "rgba(0,232,122,0.7)" : "rgba(0,232,122,0.18)"
            }
            strokeWidth={p.highlight ? 1.2 : 0.5}
          />
        ))}

        {flightD.length > 0 ? (
          <path
            d={flightD}
            fill="none"
            stroke="#00E87A"
            strokeWidth={2}
            strokeDasharray="7 5"
            strokeLinecap="round"
            className="map-flight-line"
          />
        ) : null}

        {grazPt === null ? null : (
          <g transform={`translate(${String(grazPt[0])},${String(grazPt[1])})`}>
            <circle
              r={10}
              fill="rgba(0,232,122,0.15)"
              stroke="#00E87A"
              strokeWidth={1}
              className="map-pulse"
            />
            <circle r={5} fill="#00E87A" />
            <text
              textAnchor="middle"
              y={-14}
              style={{
                fontFamily: "inherit",
                fill: "#F2F4F3",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Graz
            </text>
            <text
              textAnchor="middle"
              y={-4}
              style={{
                fontFamily: "inherit",
                fill: "rgba(242,244,243,0.5)",
                fontSize: 9,
              }}
            >
              Austria
            </text>
          </g>
        )}

        {wroclawPt === null ? null : (
          <g
            transform={`translate(${String(wroclawPt[0])},${String(wroclawPt[1])})`}
          >
            <circle
              r={10}
              fill="rgba(31,187,110,0.15)"
              stroke="#1FBB6E"
              strokeWidth={1}
              className="map-pulse"
              style={{ animationDelay: "1s" }}
            />
            <circle r={5} fill="#1FBB6E" />
            <text
              textAnchor="middle"
              y={-14}
              style={{
                fontFamily: "inherit",
                fill: "#F2F4F3",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Wrocław
            </text>
            <text
              textAnchor="middle"
              y={-4}
              style={{
                fontFamily: "inherit",
                fill: "rgba(242,244,243,0.5)",
                fontSize: 9,
              }}
            >
              Poland
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

// ── photo data ────────────────────────────────────────────────────────────────

const GRAZ_PHOTOS = Array.from(
  { length: 9 },
  (_, index) => `/photos/graz/graz-${String(index + 1)}.jpg`,
);

const WROCLAW_PHOTOS = Array.from(
  { length: 11 },
  (_, index) => `/photos/wroclaw/wroclaw-${String(index + 1)}.jpg`,
);

// ── chapter ───────────────────────────────────────────────────────────────────

interface VisitData {
  date: string;
  location: string;
  body: string;
  companies: string[];
  accent: string;
  photos: string[];
}

function Chapter({
  visit,
  align,
}: {
  visit: VisitData;
  align: "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const photoCount = Math.min(5, visit.photos.length);
  // Drive active photo index from scroll position
  const photoIndexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, photoCount - 0.001],
  );
  const [bgIndex, setBgIndex] = useState(0);
  useMotionValueEvent(photoIndexMotion, "change", (v) => {
    setBgIndex(Math.floor(v));
  });

  const gradientDirection = align === "left" ? "to right" : "to left";

  return (
    // 160vh scroll container - sticky panel visible while scrolling through this range
    <div ref={containerRef} style={{ height: "160vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-bleed background photos - crossfade on scroll */}
        <AnimatePresence initial={false}>
          <motion.div
            key={bgIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={visit.photos[bgIndex]}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay - bottom-up on mobile, side on desktop */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(11,17,14,0.98) 0%, rgba(11,17,14,0.85) 45%, rgba(11,17,14,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(${gradientDirection}, rgba(11,17,14,0.97) 0%, rgba(11,17,14,0.90) 38%, rgba(11,17,14,0.45) 65%, rgba(11,17,14,0.15) 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex h-full items-end px-6 pb-12 lg:items-center lg:pb-0">
          <div className="mx-auto w-full max-w-5xl">
            <div
              className={`w-full max-w-sm lg:max-w-sm ${align === "right" ? "lg:ml-auto" : ""}`}
            >
              {/* Date label */}
              <p
                className="mb-3 text-xs font-medium tracking-widest uppercase"
                style={{ color: visit.accent, opacity: 0.8 }}
              >
                {visit.date}
              </p>

              <h3
                className="mb-4 leading-tight font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "#F2F4F3",
                  letterSpacing: "-0.02em",
                }}
              >
                {visit.location}
              </h3>

              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: "rgba(242,244,243,0.65)" }}
              >
                {visit.body}
              </p>

              {/* Company tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                {visit.companies.map((c) => (
                  <span
                    key={c}
                    className="rounded-full px-2.5 py-1 text-xs"
                    style={{
                      color: "rgba(242,244,243,0.55)",
                      backgroundColor: "rgba(242,244,243,0.07)",
                      border: "1px solid rgba(242,244,243,0.12)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── compact gallery ───────────────────────────────────────────────────────────

const ALL_PHOTOS = [...GRAZ_PHOTOS, ...WROCLAW_PHOTOS];

function CompactGallery() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const previous = useCallback(() => {
    setLightboxIndex((index) =>
      index === null
        ? null
        : (index - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length,
    );
  }, []);
  const next = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? null : (index + 1) % ALL_PHOTOS.length,
    );
  }, []);

  // Auto-scroll: slow continuous scroll, wraps by duplicating photos
  useEffect(() => {
    const element = stripRef.current;
    if (element === null) {
      return;
    }
    let rafId: number;
    const speed = 0.5; // px per frame
    const step = () => {
      if (!isPaused.current) {
        element.scrollLeft += speed;
        // When we've scrolled past the first copy, jump back silently
        if (element.scrollLeft >= element.scrollWidth / 2) {
          element.scrollLeft -= element.scrollWidth / 2;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const handler = (event_: KeyboardEvent) => {
      if (event_.key === "ArrowLeft") {
        previous();
      }
      if (event_.key === "ArrowRight") {
        next();
      }
      if (event_.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, previous, next]);

  return (
    <div
      id="gallery"
      className="px-6 py-10"
      style={{ backgroundColor: "#0B110E" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Horizontal scroll strip — seamless loop via doubled photos */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto pb-2"
          role="application"
          aria-label="Photo strip"
          onMouseDown={(event_) => {
            isDragging.current = true;
            didDrag.current = false;
            isPaused.current = true;
            dragStartX.current = event_.pageX;
            if (stripRef.current !== null) {
              dragStartScroll.current = stripRef.current.scrollLeft;
              stripRef.current.style.cursor = "grabbing";
            }
          }}
          onMouseMove={(event_) => {
            if (!isDragging.current) {
              return;
            }
            const dx = event_.pageX - dragStartX.current;
            if (Math.abs(dx) > 4) {
              didDrag.current = true;
            }
            if (stripRef.current !== null) {
              stripRef.current.scrollLeft = dragStartScroll.current - dx;
            }
          }}
          onMouseUp={() => {
            isDragging.current = false;
            isPaused.current = false;
            if (stripRef.current !== null) {
              stripRef.current.style.cursor = "grab";
            }
          }}
          onMouseLeave={() => {
            isDragging.current = false;
            isPaused.current = false;
            if (stripRef.current !== null) {
              stripRef.current.style.cursor = "grab";
            }
          }}
          style={{ scrollbarWidth: "none", cursor: "grab" }}
        >
          {[...ALL_PHOTOS, ...ALL_PHOTOS].map((source, index) => (
            <button
              key={`${source}-${String(index)}`}
              onClick={() => {
                if (!didDrag.current) {
                  setLightboxIndex(index % ALL_PHOTOS.length);
                }
              }}
              className="group relative flex-shrink-0 overflow-hidden rounded-xl focus:outline-none"
              style={{ width: 160, height: 110 }}
            >
              <Image
                src={source}
                alt={`Photo ${String(index + 1)}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: "rgba(0,232,122,0.15)" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex === null ? null : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={() => {
              setLightboxIndex(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(event_) => {
                event_.stopPropagation();
              }}
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            >
              <Image
                src={ALL_PHOTOS[lightboxIndex]}
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
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "rgba(242,244,243,0.6)",
                }}
              >
                {lightboxIndex + 1} / {ALL_PHOTOS.length}
              </div>
            </motion.div>
            <button
              onClick={() => {
                setLightboxIndex(null);
              }}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#F2F4F3",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={(event_) => {
                event_.stopPropagation();
                previous();
              }}
              className="absolute top-1/2 left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#F2F4F3",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 3L5 9L11 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={(event_) => {
                event_.stopPropagation();
                next();
              }}
              className="absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#F2F4F3",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M7 3L13 9L7 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── main section ──────────────────────────────────────────────────────────────

export function TheExchange() {
  const t = useTranslations("exchange");

  const visits: VisitData[] = [
    {
      date: t("graz_date"),
      location: t("graz_title"),
      body: t("graz_body"),
      companies: ["ams OSRAM", "Silicon Austria Labs", "TU Graz"],
      accent: "#00E87A",
      photos: GRAZ_PHOTOS,
    },
    {
      date: t("wroclaw_date"),
      location: t("wroclaw_title"),
      body: t("wroclaw_body"),
      companies: ["XTPL", "Balluff", "WCSS", "PWr", "NaMi"],
      accent: "#1FBB6E",
      photos: WROCLAW_PHOTOS,
    },
  ];

  return (
    <section
      id="exchange"
      style={{ backgroundColor: "#0B110E", position: "relative" }}
    >
      {/* ── Header + Map (non-sticky, normal scroll) ── */}
      <div className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2
              className="mb-4 font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#F2F4F3",
                letterSpacing: "-0.02em",
              }}
            >
              {t("section_title")}
            </h2>
            <p
              className="mx-auto max-w-xl"
              style={{ color: "rgba(242,244,243,0.6)", fontSize: "1.05rem" }}
            >
              {t("section_subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#0D2B1E",
              border: "1px solid rgba(0,232,122,0.12)",
            }}
          >
            <EuropeMap />
          </motion.div>
        </div>
      </div>

      {/* ── Sticky chapters ── */}
      <Chapter visit={visits[0]} align="left" />
      <Chapter visit={visits[1]} align="right" />
      <CompactGallery />
    </section>
  );
}
