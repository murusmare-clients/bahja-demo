'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const t = useTranslations();
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    closeCart();
    setCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-brand-primary" />
              {t('cart.title')}
              {items.length > 0 && (
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {items.length} article{items.length > 1 ? 's' : ''}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-16 gap-4">
              <div className="text-6xl">🛒</div>
              <div>
                <p className="font-semibold text-lg">{t('cart.empty')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('cart.emptySubtitle')}</p>
              </div>
              <Button variant="outline" onClick={closeCart}>
                {t('cart.continue')}
              </Button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-3 items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-1">{item.menuItem.nameFr}</p>
                      <p className="text-brand-primary font-bold text-sm mt-0.5">
                        {formatPrice(item.menuItem.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive mt-1"
                        onClick={() => removeItem(item.menuItem.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('cart.subtotal')}</span>
                  <span className="text-brand-primary">{formatPrice(subtotal())}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  + frais de livraison calculés à la commande
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-base gap-2"
                  onClick={handleCheckout}
                >
                  💬 {t('cart.checkout')}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
