'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function FloatingCartButton() {
  const { totalItems, subtotal, openCart } = useCart();
  const count = totalItems();

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <Button
        onClick={openCart}
        className="h-14 w-full max-w-md rounded-full bg-black px-5 text-white shadow-[0_20px_50px_rgba(17,24,39,0.24)] hover:bg-black/90"
      >
        <div className="flex w-full items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-black">
              {count}
            </span>
            <ShoppingCart className="h-4 w-4" />
            Voir le panier
          </span>
          <span className="whitespace-nowrap text-sm font-semibold">{formatPrice(subtotal())}</span>
        </div>
      </Button>
    </div>
  );
}
