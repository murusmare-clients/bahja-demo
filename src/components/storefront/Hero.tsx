'use client';

import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { MOCK_COMBOS } from '@/lib/mock-data';
import type { MenuItem } from '@/types';

function comboAsMenuItem(combo: (typeof MOCK_COMBOS)[number]): MenuItem {
  return {
    id: combo.id,
    categoryId: 'combo',
    nameFr: combo.nameFr,
    nameAr: combo.nameAr,
    descriptionFr: combo.descriptionFr,
    descriptionAr: combo.descriptionAr,
    price: combo.price,
    image: combo.image,
    available: combo.available,
  };
}

export default function Hero() {
  const t = useTranslations();
  const { addItem, openCart } = useCart();

  const featuredCombo = MOCK_COMBOS.find((c) => c.featured) ?? MOCK_COMBOS[0];

  const handleAddCombo = () => {
    addItem(comboAsMenuItem(featuredCombo));
    openCart();
  };

  return (
    <section className="shell py-6 pb-8 lg:py-10 lg:pb-14">
      <div className="surface relative overflow-hidden bg-gradient-to-br from-[#B91C1C] via-[#DC2626] to-[#E55A3E] p-6 text-white sm:p-8 lg:p-12">
        {/* Background overlay texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.25),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.15),transparent_35%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          {/* Left — content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              Alger · Pizza · Burgers
            </div>

            {/* Tagline */}
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {t('hero.tagline')}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              {t('hero.subtitle')}
            </p>

            {/* Social proof */}
            <div className="mt-5 flex items-center gap-1.5 text-sm text-white/80">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                ))}
              </div>
              <span className="font-semibold">4.9</span>
              <span className="text-white/60">· 500+ commandes livrées</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#menu">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-white px-7 font-bold text-brand-primary shadow-md hover:bg-white/90 sm:w-auto"
                >
                  {t('hero.cta')}
                </Button>
              </a>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-white/20 bg-white/10 px-7 text-white hover:bg-white/15 sm:w-auto"
                >
                  Contact
                </Button>
              </a>
            </div>
          </div>

          {/* Right — featured combo card */}
          <div className="w-full lg:w-[320px] xl:w-[360px]">
            <div className="rounded-[22px] bg-white/10 p-1 backdrop-blur-sm border border-white/15">
              <div className="overflow-hidden rounded-[18px] bg-white shadow-lg">
                {/* Combo image */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={featuredCombo.image}
                    alt={featuredCombo.nameFr}
                    fill
                    priority
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white shadow">
                    Combo
                  </div>
                </div>

                {/* Combo info */}
                <div className="p-4">
                  <h3 className="text-lg font-black text-foreground">{featuredCombo.nameFr}</h3>
                  {featuredCombo.descriptionFr && (
                    <p className="mt-1 text-sm leading-5 text-muted-foreground line-clamp-2">
                      {featuredCombo.descriptionFr}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xl font-black text-brand-primary">
                      {formatPrice(featuredCombo.price)}
                    </p>
                    <button
                      type="button"
                      onClick={handleAddCombo}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
