'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Quotes() {
  const t = useTranslations('quotes');

  const quotes = [
    {
      text: t('quote1_text'),
      author: t('quote1_author'),
      role: t('quote1_role'),
    },
    {
      text: t('quote2_text'),
      author: t('quote2_author'),
      role: t('quote2_role'),
    },
  ];

  return (
    <section id="quotes" className="py-32 px-6" style={{ backgroundColor: '#0B110E' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: '#00E87A', border: '1px solid rgba(0,232,122,0.3)', backgroundColor: 'rgba(0,232,122,0.05)' }}
          >
            Reflections
          </div>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F2F4F3', letterSpacing: '-0.02em' }}
          >
            {t('section_title')}
          </h2>
        </motion.div>

        {/* Quotes grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: '#0D2B1E',
                border: '1px solid rgba(0,232,122,0.15)',
              }}
            >
              {/* Large quote mark */}
              <div
                className="absolute top-4 left-6 font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: '6rem', color: '#00E87A', opacity: 0.15, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Top accent line */}
              <div
                className="w-12 h-0.5 mb-6"
                style={{ backgroundColor: '#00E87A' }}
              />

              {/* Quote text */}
              <blockquote
                className="flex-1 text-base leading-relaxed mb-8 relative z-10"
                style={{ color: 'rgba(242,244,243,0.85)', fontStyle: 'italic' }}
              >
                &ldquo;{quote.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0,232,122,0.15)', color: '#00E87A', border: '1px solid rgba(0,232,122,0.3)' }}
                >
                  {quote.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#F2F4F3' }}>
                    {quote.author}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(242,244,243,0.5)' }}>
                    {quote.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
