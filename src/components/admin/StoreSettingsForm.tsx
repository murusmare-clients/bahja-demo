'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import type { StoreSettings } from '@/types';

interface StoreSettingsFormProps {
  settings: StoreSettings;
  onSave: (settings: StoreSettings) => void;
}

export default function StoreSettingsForm({ settings, onSave }: StoreSettingsFormProps) {
  const [form, setForm] = useState<StoreSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateHour = (index: number, field: 'day' | 'hours', value: string) => {
    setForm((f) => ({
      ...f,
      hours: f.hours.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Store identity */}
      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-base border-b pb-3">Identité du restaurant</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Nom (Français)</Label>
            <Input
              value={form.nameFr}
              onChange={(e) => setForm((f) => ({ ...f, nameFr: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>الاسم (عربي)</Label>
            <Input
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
              rows={3}
              value={form.descriptionFr}
              onChange={(e) => setForm((f) => ({ ...f, descriptionFr: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>الوصف (عربي)</Label>
            <Textarea
              rows={3}
              dir="rtl"
              value={form.descriptionAr}
              onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>URL Logo</Label>
          <Input
            placeholder="https://..."
            value={form.logoUrl}
            onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
          />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-base border-b pb-3">Contact & Localisation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Numéro WhatsApp</Label>
            <Input
              placeholder="213555123456"
              value={form.whatsappNumber}
              onChange={(e) => setForm((f) => ({ ...f, whatsappNumber: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">Format international sans +</p>
          </div>
          <div className="space-y-1.5">
            <Label>Téléphone affiché</Label>
            <Input
              placeholder="+213 555 123 456"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Adresse</Label>
          <Input
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>URL d&apos;intégration Google Maps</Label>
          <Input
            placeholder="https://www.google.com/maps/embed?..."
            value={form.mapEmbedUrl}
            onChange={(e) => setForm((f) => ({ ...f, mapEmbedUrl: e.target.value }))}
          />
        </div>
      </section>

      {/* Hours */}
      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-base border-b pb-3">Horaires d&apos;ouverture</h3>
        <div className="space-y-3">
          {form.hours.map((h, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Jour</Label>
                <Input
                  value={h.day}
                  onChange={(e) => updateHour(i, 'day', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Horaires</Label>
                <Input
                  placeholder="11:00 — 23:00"
                  value={h.hours}
                  onChange={(e) => updateHour(i, 'hours', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Button
        onClick={handleSave}
        className={`gap-2 w-full ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-primary hover:bg-brand-dark'}`}
        size="lg"
      >
        <Save className="h-4 w-4" />
        {saved ? '✓ Paramètres enregistrés' : 'Enregistrer les paramètres'}
      </Button>
    </div>
  );
}
