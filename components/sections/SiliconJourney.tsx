'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const stepIcons = [
  // Sand / SiO2
  <svg key="sand" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" stroke="#00E87A" strokeWidth="1" strokeOpacity="0.3"/>
    <circle cx="40" cy="40" r="28" fill="rgba(0,232,122,0.06)" stroke="#00E87A" strokeWidth="1" strokeOpacity="0.5"/>
    <text x="40" y="47" textAnchor="middle" fontSize="24" fill="#00E87A">SiO₂</text>
    <circle cx="20" cy="62" r="4" fill="#1FBB6E" fillOpacity="0.5"/>
    <circle cx="35" cy="68" r="3" fill="#1FBB6E" fillOpacity="0.4"/>
    <circle cx="52" cy="65" r="5" fill="#1FBB6E" fillOpacity="0.3"/>
    <circle cx="62" cy="60" r="3" fill="#1FBB6E" fillOpacity="0.5"/>
  </svg>,
  // Crystal ingot
  <svg key="ingot" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" stroke="#00E87A" strokeWidth="1" strokeOpacity="0.3"/>
    <rect x="32" y="15" width="16" height="50" rx="8" fill="rgba(0,232,122,0.1)" stroke="#00E87A" strokeWidth="1.5"/>
    <line x1="40" y1="15" x2="40" y2="65" stroke="#00E87A" strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="3 3"/>
    <ellipse cx="40" cy="15" rx="8" ry="3" fill="#00E87A" fillOpacity="0.3"/>
    <text x="40" y="80" textAnchor="middle" fontSize="8" fill="#00E87A" fillOpacity="0.7">INGOT</text>
  </svg>,
  // Wafer
  <svg key="wafer" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" stroke="#00E87A" strokeWidth="1" strokeOpacity="0.3"/>
    <circle cx="40" cy="40" r="26" fill="rgba(0,232,122,0.05)" stroke="#00E87A" strokeWidth="2"/>
    <circle cx="40" cy="40" r="20" stroke="#1FBB6E" strokeWidth="0.5" strokeOpacity="0.5"/>
    <circle cx="40" cy="40" r="14" stroke="#1FBB6E" strokeWidth="0.5" strokeOpacity="0.5"/>
    <circle cx="40" cy="40" r="8" stroke="#1FBB6E" strokeWidth="0.5" strokeOpacity="0.5"/>
    <line x1="14" y1="40" x2="66" y2="40" stroke="#00E87A" strokeWidth="0.5" strokeOpacity="0.4"/>
    <line x1="40" y1="14" x2="40" y2="66" stroke="#00E87A" strokeWidth="0.5" strokeOpacity="0.4"/>
  </svg>,
  // Circuit/chip
  <svg key="circuit" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" stroke="#00E87A" strokeWidth="1" strokeOpacity="0.3"/>
    <rect x="22" y="22" width="36" height="36" rx="4" fill="rgba(0,232,122,0.08)" stroke="#00E87A" strokeWidth="1.5"/>
    <rect x="28" y="28" width="24" height="24" rx="2" fill="rgba(0,232,122,0.1)" stroke="#1FBB6E" strokeWidth="0.5"/>
    <line x1="22" y1="32" x2="18" y2="32" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="40" x2="18" y2="40" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="48" x2="18" y2="48" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="58" y1="32" x2="62" y2="32" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="58" y1="40" x2="62" y2="40" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="58" y1="48" x2="62" y2="48" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="32" y1="58" x2="32" y2="62" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="40" y1="58" x2="40" y2="62" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="48" y1="58" x2="48" y2="62" stroke="#00E87A" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="35" y="35" width="10" height="10" rx="1" fill="#00E87A" fillOpacity="0.4"/>
  </svg>,
  // Packaged chip
  <svg key="package" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" stroke="#00E87A" strokeWidth="1" strokeOpacity="0.3"/>
    <rect x="20" y="28" width="40" height="24" rx="3" fill="#0D2B1E" stroke="#00E87A" strokeWidth="1.5"/>
    <rect x="26" y="33" width="28" height="14" rx="2" fill="rgba(0,232,122,0.15)" stroke="#1FBB6E" strokeWidth="0.5"/>
    {[0,1,2,3,4].map(i => (
      <rect key={`bot-${i}`} x={23 + i * 7} y={52} width="4" height="5" rx="0.5" fill="#0C6B3C"/>
    ))}
    {[0,1,2,3,4].map(i => (
      <rect key={`top-${i}`} x={23 + i * 7} y={23} width="4" height="5" rx="0.5" fill="#0C6B3C"/>
    ))}
    <text x="40" y="43" textAnchor="middle" fontSize="7" fill="#00E87A" fontWeight="600">CPU</text>
  </svg>,
];

const steps = [
  { key: 'step1', titleKey: 'step1_title', bodyKey: 'step1_body', labelKey: 'step1_label', iconIdx: 0 },
  { key: 'step2', titleKey: 'step2_title', bodyKey: 'step2_body', labelKey: 'step2_label', iconIdx: 1 },
  { key: 'step3', titleKey: 'step3_title', bodyKey: 'step3_body', labelKey: 'step3_label', iconIdx: 2 },
  { key: 'step4', titleKey: 'step4_title', bodyKey: 'step4_body', labelKey: 'step4_label', iconIdx: 3 },
  { key: 'step5', titleKey: 'step5_title', bodyKey: 'step5_body', labelKey: 'step5_label', iconIdx: 4 },
];

export default function SiliconJourney() {
  const t = useTranslations('silicon');

  return (
    <section id="journey" className="py-32 px-6" style={{ backgroundColor: '#0B110E' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <h2
            className="font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F2F4F3', letterSpacing: '-0.02em' }}
          >
            {t('intro_title')}
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(242,244,243,0.6)' }}
          >
            {t('intro_body')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
              >
                {/* Visual */}
                <div className="flex-shrink-0 flex flex-col items-center gap-4">
                  <div
                    className="w-40 h-40 rounded-2xl p-6 flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(13, 43, 30, 0.8)',
                      border: '1px solid rgba(0,232,122,0.2)',
                      boxShadow: '0 0 40px rgba(0,232,122,0.06)',
                    }}
                  >
                    {stepIcons[step.iconIdx]}
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-center max-w-[160px]"
                    style={{
                      backgroundColor: 'rgba(0,232,122,0.08)',
                      border: '1px solid rgba(0,232,122,0.25)',
                      color: '#00E87A',
                    }}
                  >
                    {t(step.labelKey as Parameters<typeof t>[0])}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 max-w-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-5xl font-bold"
                      style={{ color: 'rgba(0,232,122,0.15)', letterSpacing: '-0.04em' }}
                    >
                      0{index + 1}
                    </span>
                    <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,232,122,0.15)' }} />
                  </div>
                  <h3
                    className="font-bold mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#F2F4F3' }}
                  >
                    {t(step.titleKey as Parameters<typeof t>[0])}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'rgba(242,244,243,0.65)', fontSize: '1.05rem' }}>
                    {t(step.bodyKey as Parameters<typeof t>[0])}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
