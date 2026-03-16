'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = () => {
    const nextLocale = locale === 'fr' ? 'ar' : 'fr';
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { label: t('nav.menu'), href: '#menu' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80"
              alt="Pizza logo"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span className="hidden font-bold text-foreground sm:block">El Bahdja</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-foreground/60 transition-colors hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#menu"
            className="hidden rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark md:inline-flex"
          >
            Commander
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={switchLocale}
            className="gap-2 rounded-full border border-black/[0.06] bg-white px-3 text-xs font-semibold shadow-sm"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {locale === 'fr' ? 'عربي' : 'FR'}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-black/[0.06] bg-white shadow-sm md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/[0.06] bg-white md:hidden">
          <div className="shell space-y-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-brand-bg hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#menu"
              className="mt-2 block rounded-full bg-brand-primary px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Commander
            </a>
            <button
              type="button"
              onClick={() => { switchLocale(); setMobileOpen(false); }}
              className="mt-1 flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-foreground/70 hover:bg-brand-bg"
            >
              <Globe className="h-4 w-4" />
              {locale === 'fr' ? 'Passer en arabe' : 'Switch to French'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
