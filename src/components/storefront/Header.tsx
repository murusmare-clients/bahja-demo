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
    <header className="sticky top-0 z-50 border-b border-black/5 bg-brand-bg/90 backdrop-blur-xl">
      <div className="shell flex h-18 items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80"
              alt="Pizza logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={switchLocale}
            className="hidden gap-2 rounded-full border border-black/5 bg-white px-3 text-xs font-semibold sm:inline-flex"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {locale === 'fr' ? 'عربي' : 'FR'}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-black/5 bg-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <div className="shell space-y-3 py-4">
            <Button variant="ghost" size="sm" onClick={switchLocale} className="w-full justify-start rounded-full border border-black/5 bg-brand-bg text-xs font-semibold">
              <Globe className="mr-2 h-4 w-4" />
              {locale === 'fr' ? 'Passer en arabe' : 'Switch to French'}
            </Button>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block rounded-2xl px-1 py-2 text-sm font-medium text-foreground/80" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
