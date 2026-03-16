'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MenuItemForm from '@/components/admin/MenuItemForm';
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import type { MenuItem } from '@/types';

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const openAdd = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSave = (item: MenuItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.map((i) => (i.id === item.id ? item : i));
      return [...prev, item];
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer cet article ?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const toggleAvailability = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Menu</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Catalogue restaurant</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Gestion visuelle des produits, prix, photos et disponibilité.</p>
        </div>
        <Button onClick={openAdd} className="h-11 rounded-full bg-black px-5 text-white hover:bg-black/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un article
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="surface p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Articles</p>
          <p className="mt-3 text-2xl font-black text-foreground">{items.length}</p>
        </div>
        <div className="surface p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Disponibles</p>
          <p className="mt-3 text-2xl font-black text-foreground">{items.filter((i) => i.available).length}</p>
        </div>
        <div className="surface p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Masqués</p>
          <p className="mt-3 text-2xl font-black text-foreground">{items.filter((i) => !i.available).length}</p>
        </div>
        <div className="surface p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Ticket moyen</p>
          <p className="mt-3 text-2xl font-black text-foreground">{formatPrice(Math.round(items.reduce((s, i) => s + i.price, 0) / items.length))}</p>
        </div>
      </div>

      <Tabs defaultValue={MOCK_CATEGORIES[0]?.id}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
            {MOCK_CATEGORIES.map((cat) => {
              const count = items.filter((i) => i.categoryId === cat.id).length;
              return (
                <TabsTrigger key={cat.id} value={cat.id} className="rounded-full border border-black/8 bg-white px-4 py-2.5 text-sm font-semibold data-[state=active]:bg-black data-[state=active]:text-white">
                  {cat.nameFr}
                  <span className="ml-2 text-xs opacity-70">{count}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {MOCK_CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.categoryId === cat.id);
          return (
            <TabsContent key={cat.id} value={cat.id} className="mt-5">
              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {catItems.map((item) => (
                  <article key={item.id} className="surface overflow-hidden p-3">
                    <div className="flex gap-3">
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[20px] bg-muted">
                        <Image src={item.image} alt={item.nameFr} fill className="object-cover" sizes="112px" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="line-clamp-1 text-base font-bold text-foreground">{item.nameFr}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">{item.nameAr}</p>
                          </div>
                          <Badge variant={item.available ? 'success' : 'muted'}>{item.available ? 'Disponible' : 'Masqué'}</Badge>
                        </div>
                        {item.descriptionFr && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.descriptionFr}</p>}
                        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                          <p className="text-lg font-black text-foreground">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => toggleAvailability(item.id)} title={item.available ? 'Désactiver' : 'Activer'}>
                              {item.available ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => openEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {catItems.length === 0 && (
                <div className="surface py-10 text-center text-sm text-muted-foreground">
                  Aucun article dans cette catégorie.
                  <button onClick={openAdd} className="ml-2 font-semibold text-foreground underline underline-offset-4">Ajouter</button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <MenuItemForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} item={editingItem} categories={MOCK_CATEGORIES} />
    </div>
  );
}
