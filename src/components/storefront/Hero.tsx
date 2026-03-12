import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-red-600 to-brand-accent min-h-[560px] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl rotate-12">🍕</div>
        <div className="absolute top-20 right-20 text-6xl -rotate-12">🍔</div>
        <div className="absolute bottom-20 left-1/4 text-7xl rotate-6">🥙</div>
        <div className="absolute bottom-10 right-10 text-8xl -rotate-6">🍕</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-5">
          🍕
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-20 text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold mb-6 border border-white/30">
          <Zap className="h-4 w-4 text-yellow-300" />
          {t('hero.badge')}
        </div>

        {/* Brand name */}
        <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg tracking-tight">
          Fast Food
          <span className="block text-yellow-300">El Bahdja</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-semibold mb-3 opacity-90">
          {t('hero.tagline')}
        </p>

        {/* Subtitle */}
        <p className="text-base md:text-lg opacity-75 max-w-xl mx-auto mb-10">
          {t('hero.subtitle')}
        </p>

        {/* CTA */}
        <a href="#menu">
          <Button
            size="lg"
            className="bg-white text-brand-primary hover:bg-yellow-50 font-bold text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-white/30 transition-all duration-200 hover:scale-105"
          >
            🛒 {t('hero.cta')}
          </Button>
        </a>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="#FFFAF0"
          />
        </svg>
      </div>
    </section>
  );
}
