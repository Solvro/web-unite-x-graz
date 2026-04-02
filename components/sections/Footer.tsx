import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      className="py-16 px-6"
      style={{
        backgroundColor: '#0B110E',
        borderTop: '1px solid rgba(0,232,122,0.15)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Tagline */}
        <div className="text-center mb-12">
          <p
            className="font-bold text-lg mb-1"
            style={{ color: '#F2F4F3', letterSpacing: '-0.01em' }}
          >
            {t('tagline')}
          </p>
          <p className="text-sm" style={{ color: 'rgba(242,244,243,0.45)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ backgroundColor: 'rgba(242,244,243,0.08)' }} />

        {/* Bottom */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs" style={{ color: 'rgba(242,244,243,0.45)' }}>Made with</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 12.25S1.75 9.1 1.75 5.25a3.5 3.5 0 0 1 5.25-3.03A3.5 3.5 0 0 1 12.25 5.25C12.25 9.1 7 12.25 7 12.25Z" fill="#E84040"/>
          </svg>
          <span className="text-xs" style={{ color: 'rgba(242,244,243,0.45)' }}>by</span>
          <a
            href="https://solvro.pwr.edu.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-80"
          >
            <Image src="/logos/solvro.svg" alt="KN Solvro" width={84} height={84} className="object-contain" />
          </a>
        </div>
      </div>
    </footer>
  );
}
