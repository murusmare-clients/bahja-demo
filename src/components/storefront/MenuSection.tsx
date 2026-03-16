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
      {/* Section header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Carte
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Notre menu</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pizzas, burgers, sandwichs et plus — faits maison, livrés rapidement.
        </p>
      </div>

      <Tabs defaultValue={categories[0]?.id} className="w-full">
        <div className="mb-6 overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-foreground/65 shadow-sm transition-all data-[state=active]:border-brand-primary data-[state=active]:bg-brand-primary data-[state=active]:text-white data-[state=active]:shadow-md"
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
                <p className="py-12 text-center text-muted-foreground">
                  Aucun article dans cette catégorie.
                </p>
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
