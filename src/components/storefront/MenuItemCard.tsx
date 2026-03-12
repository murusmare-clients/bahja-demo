'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
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
  const { addItem, openCart } = useCart();
  const isRTL = locale === 'ar';

  const name = isRTL ? item.nameAr : item.nameFr;
  const description = isRTL ? item.descriptionAr : item.descriptionFr;

  const handleAdd = () => {
    addItem(item);
    openCart();
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              {t('outOfStock')}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-1 line-clamp-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{description}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-black text-lg text-brand-primary">{formatPrice(item.price)}</span>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!item.available}
            className="gap-1 bg-brand-primary hover:bg-brand-dark"
          >
            <Plus className="h-4 w-4" />
            {t('add')}
          </Button>
        </div>
      </div>
    </div>
  );
}
