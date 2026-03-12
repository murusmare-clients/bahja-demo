'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MenuItemCard from './MenuItemCard';
import type { Category, MenuItem } from '@/types';

interface MenuSectionProps {
  categories: Category[];
  items: MenuItem[];
  locale: string;
}

export default function MenuSection({ categories, items, locale }: MenuSectionProps) {
  const t = useTranslations('menu');
  const isRTL = locale === 'ar';

  return (
    <section id="menu" className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <Tabs defaultValue={categories[0]?.id} className="w-full">
          {/* Category tabs — horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList className="inline-flex gap-1 bg-transparent h-auto p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border text-sm font-semibold whitespace-nowrap data-[state=active]:bg-brand-primary data-[state=active]:text-white data-[state=active]:border-brand-primary transition-colors"
                >
                  <span>{cat.emoji}</span>
                  <span>{isRTL ? cat.nameAr : cat.nameFr}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Items grid */}
          {categories.map((cat) => {
            const catItems = items.filter((item) => item.categoryId === cat.id);
            return (
              <TabsContent key={cat.id} value={cat.id}>
                {catItems.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">
                    Aucun article dans cette catégorie.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {catItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} locale={locale} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
