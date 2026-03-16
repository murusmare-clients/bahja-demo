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
    <div className="space-y-5">
      <section className="surface p-5 sm:p-6">
        <h3 className="text-lg font-bold text-foreground">Identité du restaurant</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nom (Français)</Label>
            <Input value={form.nameFr} onChange={(e) => setForm((f) => ({ ...f, nameFr: e.target.value }))} className="h-11 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <Label>الاسم (عربي)</Label>
            <Input dir="rtl" value={form.nameAr} onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))} className="h-11 rounded-2xl" />
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Description (FR)</Label>
            <Textarea rows={4} value={form.descriptionFr} onChange={(e) => setForm((f) => ({ ...f, descriptionFr: e.target.value }))} className="rounded-3xl" />
          </div>
          <div className="space-y-2">
            <Label>الوصف (عربي)</Label>
            <Textarea rows={4} dir="rtl" value={form.descriptionAr} onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))} className="rounded-3xl" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>URL Logo</Label>
          <Input placeholder="https://..." value={form.logoUrl} onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))} className="h-11 rounded-2xl" />
        </div>
      </section>

      <section className="surface p-5 sm:p-6">
        <h3 className="text-lg font-bold text-foreground">Contact & localisation</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Numéro WhatsApp</Label>
            <Input placeholder="213555123456" value={form.whatsappNumber} onChange={(e) => setForm((f) => ({ ...f, whatsappNumber: e.target.value }))} className="h-11 rounded-2xl" />
            <p className="text-xs text-muted-foreground">Format international sans +</p>
          </div>
          <div className="space-y-2">
            <Label>Téléphone affiché</Label>
            <Input placeholder="+213 555 123 456" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="h-11 rounded-2xl" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Adresse</Label>
          <Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="h-11 rounded-2xl" />
        </div>
        <div className="mt-4 space-y-2">
          <Label>URL d&apos;intégration Google Maps</Label>
          <Input placeholder="https://www.google.com/maps/embed?..." value={form.mapEmbedUrl} onChange={(e) => setForm((f) => ({ ...f, mapEmbedUrl: e.target.value }))} className="h-11 rounded-2xl" />
        </div>
      </section>

      <section className="surface p-5 sm:p-6">
        <h3 className="text-lg font-bold text-foreground">Horaires d&apos;ouverture</h3>
        <div className="mt-5 space-y-3">
          {form.hours.map((h, i) => (
            <div key={i} className="grid gap-3 rounded-[22px] bg-brand-bg p-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Jour</Label>
                <Input value={h.day} onChange={(e) => updateHour(i, 'day', e.target.value)} className="h-11 rounded-2xl bg-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Horaires</Label>
                <Input placeholder="11:00 — 23:00" value={h.hours} onChange={(e) => updateHour(i, 'hours', e.target.value)} className="h-11 rounded-2xl bg-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Button onClick={handleSave} className={`h-12 w-full rounded-2xl ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-black text-white hover:bg-black/90'}`}>
        <Save className="mr-2 h-4 w-4" />
        {saved ? 'Paramètres enregistrés' : 'Enregistrer les paramètres'}
      </Button>
    </div>
  );
}
