'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const count = totalItems();

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
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-brand-primary">
          <span className="text-2xl">🍕</span>
          <span className="hidden sm:block">Fast Food El Bahdja</span>
          <span className="sm:hidden">El Bahdja</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-brand-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={switchLocale}
            className="gap-1.5 text-xs font-semibold"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {locale === 'fr' ? 'عربي' : 'FR'}
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative"
            aria-label={t('nav.cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium py-2 hover:text-brand-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
