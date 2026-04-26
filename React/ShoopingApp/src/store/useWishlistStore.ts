import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './useCartStore';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((i) => i.id === product.id);
        if (!exists) {
          set({ items: [...currentItems, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((i) => i.id === product.id);
        if (exists) {
          set({ items: currentItems.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
      getWishlistCount: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
