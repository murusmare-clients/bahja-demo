import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (menuItem: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (menuItem) => {
        const items = get().items;
        const existing = items.find((i) => i.menuItem.id === menuItem.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { menuItem, quantity: 1 }] });
        }
      },

      removeItem: (menuItemId) => {
        set({ items: get().items.filter((i) => i.menuItem.id !== menuItemId) });
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItem.id === menuItemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),
    }),
    {
      name: 'bahdja-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
