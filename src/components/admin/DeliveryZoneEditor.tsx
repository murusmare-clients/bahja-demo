'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import type { DeliveryZone } from '@/types';

interface DeliveryZoneEditorProps {
  zones: DeliveryZone[];
  onSave: (zones: DeliveryZone[]) => void;
}

export default function DeliveryZoneEditor({ zones, onSave }: DeliveryZoneEditorProps) {
  const [localZones, setLocalZones] = useState<DeliveryZone[]>(zones);
  const [saved, setSaved] = useState(false);

  const updateFee = (code: number, fee: number) => {
    setLocalZones((prev) => prev.map((z) => (z.wilayaCode === code ? { ...z, fee } : z)));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(localZones);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Définissez les frais de livraison par wilaya (en DA).
        </p>
        <Button
          onClick={handleSave}
          className={`gap-2 ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-primary hover:bg-brand-dark'}`}
        >
          <Save className="h-4 w-4" />
          {saved ? 'Enregistré ✓' : 'Enregistrer tout'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {localZones.map((zone) => (
          <div
            key={zone.wilayaCode}
            className="bg-white border rounded-lg p-3 flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{zone.wilayaFr}</p>
              <p className="text-xs text-muted-foreground">{zone.wilayaAr}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Input
                type="number"
                min={0}
                step={50}
                value={zone.fee}
                onChange={(e) => updateFee(zone.wilayaCode, parseInt(e.target.value) || 0)}
                className="w-20 h-8 text-sm text-center font-semibold"
              />
              <span className="text-xs text-muted-foreground">DA</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
