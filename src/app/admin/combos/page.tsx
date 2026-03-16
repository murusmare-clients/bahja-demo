'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ComboForm from '@/components/admin/ComboForm';
import { MOCK_COMBOS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import type { Combo } from '@/types';

export default function AdminCombosPage() {
  const [combos, setCombos] = useState<Combo[]>(MOCK_COMBOS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null);

  const openAdd = () => {
    setEditingCombo(null);
    setFormOpen(true);
  };

  const openEdit = (combo: Combo) => {
    setEditingCombo(combo);
    setFormOpen(true);
  };

  const handleSave = (combo: Combo) => {
    setCombos((prev) => {
      const exists = prev.find((c) => c.id === combo.id);
      if (exists) return prev.map((c) => (c.id === combo.id ? combo : c));
      return [...prev, combo];
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce combo ?')) {
      setCombos((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setCombos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : { ...c, featured: false }))
    );
  };

  const featuredCombo = combos.find((c) => c.featured);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Combos
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">
            Gestion des combos
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Créez des offres groupées et choisissez le combo mis en avant sur la page d&apos;accueil.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="h-11 rounded-full bg-brand-primary px-5 text-white hover:bg-brand-dark"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un combo
        </Button>
      </div>

      {/* Hero combo indicator */}
      {featuredCombo && (
        <div className="surface-soft flex items-center gap-4 px-5 py-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted">
            <Image
              src={featuredCombo.image}
              alt={featuredCombo.nameFr}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Affiché dans le hero
            </p>
            <p className="mt-0.5 font-bold text-foreground">{featuredCombo.nameFr}</p>
          </div>
          <p className="ml-auto text-lg font-black text-brand-primary">
            {formatPrice(featuredCombo.price)}
          </p>
        </div>
      )}

      {/* Combos grid */}
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {combos.map((combo) => (
          <article key={combo.id} className="surface overflow-hidden">
            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <Image
                src={combo.image}
                alt={combo.nameFr}
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {combo.featured && (
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-1 text-xs font-bold text-white shadow">
                  <Star className="h-3 w-3 fill-white" />
                  Hero
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">{combo.nameFr}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{combo.nameAr}</p>
                </div>
                <Badge variant={combo.available ? 'success' : 'muted'}>
                  {combo.available ? 'Disponible' : 'Masqué'}
                </Badge>
              </div>

              {combo.descriptionFr && (
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {combo.descriptionFr}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xl font-black text-brand-primary">{formatPrice(combo.price)}</p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => toggleFeatured(combo.id)}
                    title={combo.featured ? 'Retirer du hero' : 'Mettre en avant dans le hero'}
                  >
                    <Star
                      className={`h-4 w-4 ${combo.featured ? 'fill-amber-400 text-amber-400' : ''}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => openEdit(combo)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(combo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {combos.length === 0 && (
        <div className="surface py-12 text-center text-sm text-muted-foreground">
          Aucun combo créé pour le moment.
          <button onClick={openAdd} className="ml-2 font-semibold text-foreground underline underline-offset-4">
            Créer le premier
          </button>
        </div>
      )}

      <ComboForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        combo={editingCombo}
      />
    </div>
  );
}
