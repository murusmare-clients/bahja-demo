'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Info } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { formatOrderMessage, openWhatsApp } from '@/lib/whatsapp';
import { formatPrice } from '@/lib/utils';
import { ALGERIA_WILAYAS } from '@/lib/mock-data';
import type { CheckoutFormData } from '@/types';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM: CheckoutFormData = {
  name: '',
  phone: '',
  wilayaCode: 16,
  wilayaFr: 'Alger',
  commune: '',
  address: '',
  notes: '',
};

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const t = useTranslations();
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const selectedWilaya = ALGERIA_WILAYAS.find((w) => w.code === form.wilayaCode);
  const deliveryFee = selectedWilaya?.fee ?? 200;
  const total = subtotal() + deliveryFee;

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Requis';
    if (!form.phone.trim() || !/^0[5-7]\d{8}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro invalide (ex: 0555123456)';
    }
    if (!form.commune.trim()) newErrors.commune = 'Requis';
    if (!form.address.trim()) newErrors.address = 'Requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const message = formatOrderMessage(items, form, deliveryFee);
    openWhatsApp(message);
    clearCart();
    onClose();
    setForm(INITIAL_FORM);
  };

  const handleWilayaChange = (value: string) => {
    const code = parseInt(value);
    const wilaya = ALGERIA_WILAYAS.find((w) => w.code === code);
    setForm((f) => ({
      ...f,
      wilayaCode: code,
      wilayaFr: wilaya?.fr ?? '',
    }));
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t('checkout.title')}</DialogTitle>
        </DialogHeader>

        {/* Order summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="font-semibold text-sm mb-2">{t('checkout.summary')}</p>
          {items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.menuItem.nameFr}
              </span>
              <span className="font-medium">
                {formatPrice(item.menuItem.price * item.quantity)}
              </span>
            </div>
          ))}
          <Separator className="my-2" />
          <div className="flex justify-between text-sm">
            <span>{t('cart.subtotal')}</span>
            <span>{formatPrice(subtotal())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{t('checkout.deliveryFee')}</span>
            <span className="text-brand-primary">{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>{t('cart.total')}</span>
            <span className="text-brand-primary text-lg">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>{t('checkout.name')}</Label>
              <Input
                placeholder={t('checkout.namePlaceholder')}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>{t('checkout.phone')}</Label>
              <Input
                placeholder={t('checkout.phonePlaceholder')}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{t('checkout.wilaya')}</Label>
            <Select value={String(form.wilayaCode)} onValueChange={handleWilayaChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('checkout.wilayaPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {ALGERIA_WILAYAS.map((w) => (
                  <SelectItem key={w.code} value={String(w.code)}>
                    {w.fr} — {formatPrice(w.fee)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>{t('checkout.commune')}</Label>
            <Input
              placeholder={t('checkout.communePlaceholder')}
              value={form.commune}
              onChange={(e) => setForm((f) => ({ ...f, commune: e.target.value }))}
            />
            {errors.commune && <p className="text-xs text-destructive">{errors.commune}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>{t('checkout.address')}</Label>
            <Input
              placeholder={t('checkout.addressPlaceholder')}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            />
            {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>{t('checkout.notes')}</Label>
            <Textarea
              placeholder={t('checkout.notesPlaceholder')}
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </div>
        </div>

        {/* WhatsApp note */}
        <div className="flex gap-2 text-xs text-muted-foreground bg-green-50 border border-green-200 rounded-lg p-3">
          <Info className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
          <p>{t('checkout.whatsappNote')}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 gap-2"
            disabled={items.length === 0}
          >
            <MessageCircle className="h-4 w-4" />
            {t('checkout.send')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
