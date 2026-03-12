'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import MenuItemForm from '@/components/admin/MenuItemForm';
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import type { MenuItem } from '@/types';
import Image from 'next/image';

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
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Gestion du Menu</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {items.length} article{items.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2 bg-brand-primary hover:bg-brand-dark">
          <Plus className="h-4 w-4" />
          Ajouter un article
        </Button>
      </div>

      {/* Tabs by category */}
      <Tabs defaultValue={MOCK_CATEGORIES[0]?.id}>
        <TabsList className="bg-transparent gap-1 p-0 flex-wrap h-auto">
          {MOCK_CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.categoryId === cat.id).length;
            return (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-lg"
              >
                {cat.emoji} {cat.nameFr}
                <span className="ml-1 text-xs opacity-70">({count})</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {MOCK_CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.categoryId === cat.id);
          return (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="rounded-xl border bg-white overflow-hidden mt-2">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Image</TableHead>
                      <TableHead>Article</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {catItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="w-16">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.nameFr}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-semibold text-sm">{item.nameFr}</p>
                          <p className="text-xs text-muted-foreground">{item.nameAr}</p>
                          {item.descriptionFr && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {item.descriptionFr}
                            </p>
                          )}
                        </TableCell>
                        <TableCell className="font-bold text-brand-primary">
                          {formatPrice(item.price)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.available ? 'success' : 'muted'}>
                            {item.available ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-brand-primary"
                              onClick={() => toggleAvailability(item.id)}
                              title={item.available ? 'Désactiver' : 'Activer'}
                            >
                              {item.available ? (
                                <ToggleRight className="h-4 w-4" />
                              ) : (
                                <ToggleLeft className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-brand-primary"
                              onClick={() => openEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {catItems.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Aucun article dans cette catégorie.{' '}
                          <button
                            onClick={openAdd}
                            className="text-brand-primary underline"
                          >
                            Ajouter
                          </button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <MenuItemForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        item={editingItem}
        categories={MOCK_CATEGORIES}
      />
    </div>
  );
}
