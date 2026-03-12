'use client';

import { useState } from 'react';
import StoreSettingsForm from '@/components/admin/StoreSettingsForm';
import { STORE_SETTINGS } from '@/lib/mock-data';
import type { StoreSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(STORE_SETTINGS);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black">Paramètres du restaurant</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Gérez les informations générales de votre établissement
        </p>
      </div>

      <StoreSettingsForm settings={settings} onSave={setSettings} />
    </div>
  );
}
