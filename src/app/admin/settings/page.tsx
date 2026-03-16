'use client';

import { useState } from 'react';
import StoreSettingsForm from '@/components/admin/StoreSettingsForm';
import { STORE_SETTINGS } from '@/lib/mock-data';
import type { StoreSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(STORE_SETTINGS);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Paramètres</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Informations du restaurant</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Mets à jour les textes, horaires, contact et branding du restaurant sans casser l&apos;interface.</p>
      </div>

      <StoreSettingsForm settings={settings} onSave={setSettings} />
    </div>
  );
}
