'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// ---------- interactive canvas background ----------

const GRID_SPACING = 55;
const DOT_RADIUS = 1.5;
const CURSOR_RADIUS = 180;       // px - influence zone
const LINE_CONNECT_RADIUS = 100; // px - draw lines between nearby lit nodes
const BASE_ALPHA = 0.12;
const BRIGHT_ALPHA = 0.9;

interface Node {
  x: number;
  y: number;
}

function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function buildGrid() {
      if (!canvas) return;
      const cols = Math.ceil(canvas.width / GRID_SPACING) + 1;
      const rows = Math.ceil(canvas.height / GRID_SPACING) + 1;
      const nodes: Node[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({ x: c * GRID_SPACING, y: r * GRID_SPACING });
        }
      }
      nodesRef.current = nodes;
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const nodes = nodesRef.current;

      // Collect lit nodes for line drawing
      const litNodes: Array<{ node: Node; alpha: number }> = [];

      for (const node of nodes) {
        let alpha = BASE_ALPHA;
        if (mouse) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS) {
            alpha = BASE_ALPHA + (BRIGHT_ALPHA - BASE_ALPHA) * (1 - dist / CURSOR_RADIUS);
            litNodes.push({ node, alpha });
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,232,122,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Draw connecting lines between lit nodes that are close together
      if (litNodes.length > 1) {
        for (let i = 0; i < litNodes.length; i++) {
          for (let j = i + 1; j < litNodes.length; j++) {
            const a = litNodes[i];
            const b = litNodes[j];
            const dx = a.node.x - b.node.x;
            const dy = a.node.y - b.node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINE_CONNECT_RADIUS) {
              const lineAlpha = Math.min(a.alpha, b.alpha) * (1 - dist / LINE_CONNECT_RADIUS) * 0.6;
              ctx.beginPath();
              ctx.moveTo(a.node.x, a.node.y);
              ctx.lineTo(b.node.x, b.node.y);
              ctx.strokeStyle = `rgba(0,232,122,${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // only react when the cursor is within the section bounds
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      ) {
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        mouseRef.current = null;
      }
    }

    function onMouseLeave() {
      mouseRef.current = null;
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}

// ---------- hero section ----------

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D2B1E 0%, #0B110E 60%)' }}
    >
      <InteractiveBackground />

      {/* Radial gradient overlay so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, #0B110E 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="font-bold leading-none">
          {/* Title line 1 */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="block uppercase tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              color: '#F2F4F3',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title1')}
          </motion.span>

          {/* Title line 2 */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="block mb-8"
            style={{
              fontSize: 'clamp(2.8rem, 9vw, 8rem)',
              color: '#00E87A',
              letterSpacing: '-0.03em',
            }}
          >
            {t('title2')}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl mx-auto text-lg leading-relaxed mb-12"
          style={{ color: 'rgba(242,244,243,0.65)', fontWeight: 400 }}
        >
          {t('subtitle')}
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#journey"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        style={{ textDecoration: 'none' }}
      >
        <span
          className="text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: 'rgba(242,244,243,0.4)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#00E87A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,244,243,0.4)')}
        >
          {t('cta_journey')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(0,232,122,0.6), transparent)' }}
        />
      </motion.a>
    </section>
  );
}
