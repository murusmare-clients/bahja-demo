'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import type { MenuItem } from '@/types';

interface MenuItemCardProps {
  item: MenuItem;
  locale: string;
}

export default function MenuItemCard({ item, locale }: MenuItemCardProps) {
  const t = useTranslations('menu');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isRTL = locale === 'ar';

  const name = isRTL ? item.nameAr : item.nameFr;
  const description = isRTL ? item.descriptionAr : item.descriptionFr;

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    for (let i = 0; i < quantity; i += 1) addItem(item);
    setQuantity(1);
  };

  return (
    <article className="group surface overflow-hidden">
      <div className="grid min-h-[180px] gap-0 sm:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[190px] overflow-hidden bg-muted sm:min-h-full">
          <Image
            src={item.image}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 28vw"
          />
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <Badge variant="secondary" className="rounded-full bg-white text-black shadow-sm">
                {t('outOfStock')}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col p-4 sm:p-5">
          <div>
            <h3 className="line-clamp-2 text-lg font-bold leading-6 text-foreground">{name}</h3>
            {description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{description}</p>}
          </div>

          <div className="mt-auto space-y-3 pt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="whitespace-nowrap text-xl font-black text-foreground">{formatPrice(item.price)}</p>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-2 py-1">
                <button
                  type="button"
                  onClick={decrement}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-brand-bg"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-foreground">{quantity}</span>
                <button
                  type="button"
                  onClick={increment}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-brand-bg"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button size="sm" onClick={handleAdd} disabled={!item.available} className="w-full rounded-full bg-[#111111] px-4 text-white hover:bg-black">
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
