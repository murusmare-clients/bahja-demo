'use client';

import { useState } from 'react';
import { Truck } from 'lucide-react';
import DeliveryZoneEditor from '@/components/admin/DeliveryZoneEditor';
import { ALGERIA_WILAYAS } from '@/lib/mock-data';
import type { DeliveryZone } from '@/types';

export default function AdminDeliveryPage() {
  const [zones, setZones] = useState<DeliveryZone[]>(
    ALGERIA_WILAYAS.map((w) => ({
      wilayaCode: w.code,
      wilayaFr: w.fr,
      wilayaAr: w.ar,
      fee: w.fee,
    }))
  );

  const avgFee = Math.round(zones.reduce((s, z) => s + z.fee, 0) / zones.length);
  const minFee = Math.min(...zones.map((z) => z.fee));
  const maxFee = Math.max(...zones.map((z) => z.fee));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
          <Truck className="h-5 w-5 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black">Zones de Livraison</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Frais de livraison pour les 58 wilayas d&apos;Algérie
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-brand-primary">{minFee} DA</p>
          <p className="text-xs text-muted-foreground">Minimum</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-foreground">{avgFee} DA</p>
          <p className="text-xs text-muted-foreground">Moyenne</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-muted-foreground">{maxFee} DA</p>
          <p className="text-xs text-muted-foreground">Maximum</p>
        </div>
      </div>

      <DeliveryZoneEditor zones={zones} onSave={setZones} />
    </div>
  );
}
