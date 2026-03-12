'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MenuItem, Category } from '@/types';

interface MenuItemFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  item?: MenuItem | null;
  categories: Category[];
}

const BLANK: Omit<MenuItem, 'id'> = {
  categoryId: '',
  nameFr: '',
  nameAr: '',
  descriptionFr: '',
  descriptionAr: '',
  price: 0,
  image: '',
  available: true,
};

export default function MenuItemForm({
  open,
  onClose,
  onSave,
  item,
  categories,
}: MenuItemFormProps) {
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(BLANK);
  const isEditing = !!item;

  useEffect(() => {
    if (item) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = item;
      setForm(rest);
    } else {
      setForm({ ...BLANK, categoryId: categories[0]?.id ?? '' });
    }
  }, [item, categories]);

  const handleSave = () => {
    if (!form.nameFr || !form.categoryId || !form.price) return;
    onSave({
      ...form,
      id: item?.id ?? `item-${Date.now()}`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Modifier un article' : 'Ajouter un article'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Catégorie</Label>
            <Select
              value={form.categoryId}
              onValueChange={(v) => setForm((f) => ({ ...f, categoryId: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.emoji} {c.nameFr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Nom (Français)</Label>
              <Input
                placeholder="Pizza Margherita"
                value={form.nameFr}
                onChange={(e) => setForm((f) => ({ ...f, nameFr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>الاسم (عربي)</Label>
              <Input
                placeholder="بيتزا مارغريتا"
                dir="rtl"
                value={form.nameAr}
                onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Description (FR)</Label>
              <Textarea
                rows={2}
                placeholder="Description en français..."
                value={form.descriptionFr}
                onChange={(e) => setForm((f) => ({ ...f, descriptionFr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>الوصف (عربي)</Label>
              <Textarea
                rows={2}
                dir="rtl"
                placeholder="الوصف بالعربية..."
                value={form.descriptionAr}
                onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Prix (DA)</Label>
              <Input
                type="number"
                min={0}
                placeholder="1200"
                value={form.price || ''}
                onChange={(e) => setForm((f) => ({ ...f, price: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>URL Image</Label>
              <Input
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={form.available}
              onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
              className="w-4 h-4 accent-brand-primary"
            />
            <Label htmlFor="available">Disponible</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="bg-brand-primary hover:bg-brand-dark">
            {isEditing ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
