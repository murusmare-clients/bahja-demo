'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Combo } from '@/types';

interface ComboFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (combo: Combo) => void;
  combo: Combo | null;
}

const EMPTY: Omit<Combo, 'id'> = {
  nameFr: '',
  nameAr: '',
  descriptionFr: '',
  descriptionAr: '',
  price: 0,
  image: '',
  available: true,
  featured: false,
};

export default function ComboForm({ open, onClose, onSave, combo }: ComboFormProps) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (combo) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = combo;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
  }, [combo, open]);

  const set = (field: keyof typeof EMPTY, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved: Combo = {
      id: combo?.id ?? `combo-${Date.now()}`,
      ...form,
    };
    onSave(saved);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            {combo ? 'Modifier le combo' : 'Nouveau combo'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Image preview */}
          {form.image && (
            <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-muted">
              <Image src={form.image} alt="Aperçu" fill className="object-cover" sizes="512px" />
            </div>
          )}

          <div className="space-y-2">
            <Label>URL de l&apos;image</Label>
            <Input
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
              placeholder="https://..."
              className="h-11 rounded-2xl border-black/10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nom (français)</Label>
              <Input
                value={form.nameFr}
                onChange={(e) => set('nameFr', e.target.value)}
                placeholder="Combo Solo"
                required
                className="h-11 rounded-2xl border-black/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Nom (arabe)</Label>
              <Input
                dir="rtl"
                value={form.nameAr}
                onChange={(e) => set('nameAr', e.target.value)}
                placeholder="كومبو سولو"
                className="h-11 rounded-2xl border-black/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description (français)</Label>
            <Textarea
              value={form.descriptionFr}
              onChange={(e) => set('descriptionFr', e.target.value)}
              placeholder="Burger crispy, frites et boisson..."
              className="rounded-2xl border-black/10"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Description (arabe)</Label>
            <Textarea
              dir="rtl"
              value={form.descriptionAr}
              onChange={(e) => set('descriptionAr', e.target.value)}
              placeholder="برغر مقرمش..."
              className="rounded-2xl border-black/10"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Prix (DA)</Label>
            <Input
              type="number"
              min={0}
              value={form.price || ''}
              onChange={(e) => set('price', Number(e.target.value))}
              placeholder="1350"
              required
              className="h-11 rounded-2xl border-black/10"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => set('available', e.target.checked)}
                className="h-4 w-4 rounded accent-brand-primary"
              />
              Disponible
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-4 w-4 rounded accent-brand-primary"
              />
              Mis en avant (hero)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="rounded-full" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-brand-primary text-white hover:bg-brand-dark"
            >
              {combo ? 'Enregistrer' : 'Créer le combo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
