'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MenuItemCard from './MenuItemCard';
import type { Category, MenuItem } from '@/types';

interface MenuSectionProps {
  categories: Category[];
  items: MenuItem[];
  locale: string;
}

export default function MenuSection({ categories, items, locale }: MenuSectionProps) {
  const isRTL = locale === 'ar';

  return (
    <section id="menu" className="shell py-4 pb-12 lg:pb-14">
      <Tabs defaultValue={categories[0]?.id} className="w-full">
        <div className="mb-5 overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full border border-black/6 bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-foreground/70 shadow-sm data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                {isRTL ? cat.nameAr : cat.nameFr}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((cat) => {
          const catItems = items.filter((item) => item.categoryId === cat.id);
          return (
            <TabsContent key={cat.id} value={cat.id}>
              {catItems.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">Aucun article dans cette catégorie.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {catItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} locale={locale} />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
