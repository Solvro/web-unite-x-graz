'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

// ── map ───────────────────────────────────────────────────────────────────────

const GEO_URL = '/countries-50m.json';
const GRAZ: [number, number]    = [15.44, 47.07];
const WROCLAW: [number, number] = [17.04, 51.11];

const EUROPEAN_COUNTRIES = new Set([
  '008','020','040','112','056','070','100','191','196','203','208','233','246',
  '250','276','300','348','352','372','380','428','438','440','442','807',
  '470','498','492','499','528','578','616','620','642','643','674','688',
  '703','705','724','752','756','804','826',
]);

function EuropeMap() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="w-full" style={{ maxHeight: 420, overflow: 'hidden' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: isMobile ?[17, 50.8]:[16,49] as [number, number], scale: isMobile ? 1800 : 1200 }}
        style={{ width: '100%', height: 'auto' }}
        height={420}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter(geo => EUROPEAN_COUNTRIES.has(String(geo.id)))
              .map(geo => {
                const isPoland  = String(geo.id) === '616';
                const isAustria = String(geo.id) === '040';
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isPoland || isAustria ? 'rgba(0,232,122,0.28)' : 'rgba(13,43,30,0.7)'}
                    stroke={isPoland || isAustria ? 'rgba(0,232,122,0.7)' : 'rgba(0,232,122,0.18)'}
                    strokeWidth={isPoland || isAustria ? 1.2 : 0.5}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', fill: isPoland || isAustria ? 'rgba(0,232,122,0.4)' : 'rgba(31,187,110,0.25)' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
          }
        </Geographies>
        <Line from={GRAZ} to={WROCLAW} stroke="#00E87A" strokeWidth={2} strokeDasharray="7 5" strokeLinecap="round" className="map-flight-line" />
        <Marker coordinates={GRAZ}>
          <circle r={5} fill="#00E87A" />
          <circle r={10} fill="rgba(0,232,122,0.15)" stroke="#00E87A" strokeWidth={1} className="map-pulse" />
          <text textAnchor="middle" y={-14} style={{ fontFamily: 'inherit', fill: '#F2F4F3', fontSize: 11, fontWeight: 600 }}>Graz</text>
          <text textAnchor="middle" y={-4}  style={{ fontFamily: 'inherit', fill: 'rgba(242,244,243,0.5)', fontSize: 9 }}>Austria</text>
        </Marker>
        <Marker coordinates={WROCLAW}>
          <circle r={5} fill="#1FBB6E" />
          <circle r={10} fill="rgba(31,187,110,0.15)" stroke="#1FBB6E" strokeWidth={1} className="map-pulse" style={{ animationDelay: '1s' }} />
          <text textAnchor="middle" y={-14} style={{ fontFamily: 'inherit', fill: '#F2F4F3', fontSize: 11, fontWeight: 600 }}>Wrocław</text>
          <text textAnchor="middle" y={-4}  style={{ fontFamily: 'inherit', fill: 'rgba(242,244,243,0.5)', fontSize: 9 }}>Poland</text>
        </Marker>
      </ComposableMap>
    </div>
  );
}

// ── photo data ────────────────────────────────────────────────────────────────

const GRAZ_PHOTOS = [
  '/photos/graz/graz-1.jpg',
  '/photos/graz/graz-2.jpg',
  '/photos/graz/graz-3.jpg',
  '/photos/graz/graz-5.jpg',
  '/photos/graz/graz-6.jpg',
  '/photos/graz/graz-7.jpg',
  '/photos/graz/graz-9.jpg',
  '/photos/graz/graz-10.jpg',
  '/photos/graz/graz-11.jpeg',
];
const WROCLAW_PHOTOS = Array.from({ length: 11 }, (_, i) =>
  `/photos/wroclaw/wroclaw-${i + 1}.jpg`
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
  align: 'left' | 'right';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const photoCount = Math.min(5, visit.photos.length);
  // Drive active photo index from scroll position
  const photoIndexMotion = useTransform(scrollYProgress, [0, 1], [0, photoCount - 0.001]);
  const [bgIndex, setBgIndex] = useState(0);
  useMotionValueEvent(photoIndexMotion, 'change', v => setBgIndex(Math.floor(v)));

  const gradientDir = align === 'left' ? 'to right' : 'to left';

  return (
    // 160vh scroll container - sticky panel visible while scrolling through this range
    <div ref={containerRef} style={{ height: '160vh' }}>
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
        <div className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(11,17,14,0.98) 0%, rgba(11,17,14,0.85) 45%, rgba(11,17,14,0.2) 100%)' }}
        />
        <div className="absolute inset-0 hidden lg:block"
          style={{ background: `linear-gradient(${gradientDir}, rgba(11,17,14,0.97) 0%, rgba(11,17,14,0.90) 38%, rgba(11,17,14,0.45) 65%, rgba(11,17,14,0.15) 100%)` }}
        />

        {/* Content */}
        <div className="relative h-full flex items-end lg:items-center pb-12 lg:pb-0 px-6">
          <div className="max-w-5xl mx-auto w-full">
            <div
              className={`max-w-sm lg:max-w-sm w-full ${align === 'right' ? 'lg:ml-auto' : ''}`}
            >
              {/* Date label */}
              <p
                className="text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: visit.accent, opacity: 0.8 }}
              >
                {visit.date}
              </p>

              <h3
                className="font-bold mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#F2F4F3', letterSpacing: '-0.02em' }}
              >
                {visit.location}
              </h3>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'rgba(242,244,243,0.65)' }}
              >
                {visit.body}
              </p>

              {/* Company tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {visit.companies.map(c => (
                  <span
                    key={c}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      color: 'rgba(242,244,243,0.55)',
                      backgroundColor: 'rgba(242,244,243,0.07)',
                      border: '1px solid rgba(242,244,243,0.12)',
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
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const prev = useCallback(() => setLightboxIdx(i => i === null ? null : (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length), []);
  const next = useCallback(() => setLightboxIdx(i => i === null ? null : (i + 1) % ALL_PHOTOS.length), []);

  // Auto-scroll: slow continuous scroll, wraps by duplicating photos
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let rafId: number;
    const speed = 0.5; // px per frame
    const step = () => {
      if (!isPaused.current) {
        el.scrollLeft += speed;
        // When we've scrolled past the first copy, jump back silently
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     setLightboxIdx(null);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [lightboxIdx, prev, next]);

  return (
    <div id="gallery" className="py-10 px-6" style={{ backgroundColor: '#0B110E' }}>
      <div className="max-w-6xl mx-auto">

        {/* Horizontal scroll strip — seamless loop via doubled photos */}
        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto pb-2"
          onMouseDown={e => {
            isDragging.current = true;
            didDrag.current = false;
            isPaused.current = true;
            dragStartX.current = e.pageX;
            dragStartScroll.current = stripRef.current!.scrollLeft;
            stripRef.current!.style.cursor = 'grabbing';
          }}
          onMouseMove={e => {
            if (!isDragging.current) return;
            const dx = e.pageX - dragStartX.current;
            if (Math.abs(dx) > 4) didDrag.current = true;
            stripRef.current!.scrollLeft = dragStartScroll.current - dx;
          }}
          onMouseUp={() => {
            isDragging.current = false;
            isPaused.current = false;
            stripRef.current!.style.cursor = 'grab';
          }}
          onMouseLeave={() => {
            isDragging.current = false;
            isPaused.current = false;
            if (stripRef.current) stripRef.current.style.cursor = 'grab';
          }}
          style={{ scrollbarWidth: 'none', cursor: 'grab' }}
        >
          {[...ALL_PHOTOS, ...ALL_PHOTOS].map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => { if (!didDrag.current) setLightboxIdx(i % ALL_PHOTOS.length); }}
              className="relative flex-shrink-0 overflow-hidden rounded-xl group focus:outline-none"
              style={{ width: 160, height: 110 }}
            >
              <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(0,232,122,0.15)' }} />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
            onClick={() => setLightboxIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            >
              <Image
                src={ALL_PHOTOS[lightboxIdx]} alt={`Photo ${lightboxIdx + 1}`}
                width={1200} height={800}
                className="object-contain rounded-lg"
                style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto' }}
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'rgba(242,244,243,0.6)' }}>
                {lightboxIdx + 1} / {ALL_PHOTOS.length}
              </div>
            </motion.div>
            <button onClick={() => setLightboxIdx(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#F2F4F3' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#F2F4F3' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#F2F4F3' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── main section ──────────────────────────────────────────────────────────────

export default function TheExchange() {
  const t = useTranslations('exchange');

  const visits: VisitData[] = [
    {
      date:      t('graz_date'),
      location:  t('graz_title'),
      body:      t('graz_body'),
      companies: ['ams OSRAM', 'Silicon Austria Labs', 'TU Graz'],
      accent:    '#00E87A',
      photos:    GRAZ_PHOTOS,
    },
    {
      date:      t('wroclaw_date'),
      location:  t('wroclaw_title'),
      body:      t('wroclaw_body'),
      companies: ['XTPL', 'Balluff', 'WCSS', 'PWr / NaMi'],
      accent:    '#1FBB6E',
      photos:    WROCLAW_PHOTOS,
    },
  ];

  return (
    <section id="exchange" style={{ backgroundColor: '#0B110E' }}>

      {/* ── Header + Map (non-sticky, normal scroll) ── */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#0D2B1E', border: '1px solid rgba(0,232,122,0.12)' }}
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
