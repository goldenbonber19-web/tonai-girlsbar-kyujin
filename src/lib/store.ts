import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ShopStoreState {
  favorites: string[];
  compareList: string[];
  recentlyViewed: string[];

  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;

  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;

  addRecentlyViewed: (slug: string) => void;
}

export const useShopStore = create<ShopStoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      compareList: [],
      recentlyViewed: [],

      toggleFavorite: (slug) => {
        const favs = get().favorites;
        set({
          favorites: favs.includes(slug)
            ? favs.filter((s) => s !== slug)
            : [...favs, slug],
        });
      },
      isFavorite: (slug) => get().favorites.includes(slug),

      addToCompare: (slug) => {
        const list = get().compareList;
        if (list.includes(slug)) return true;
        if (list.length >= 4) return false;
        set({ compareList: [...list, slug] });
        return true;
      },
      removeFromCompare: (slug) =>
        set({ compareList: get().compareList.filter((s) => s !== slug) }),
      clearCompare: () => set({ compareList: [] }),
      isInCompare: (slug) => get().compareList.includes(slug),

      addRecentlyViewed: (slug) => {
        const list = get().recentlyViewed.filter((s) => s !== slug);
        set({ recentlyViewed: [slug, ...list].slice(0, 10) });
      },
    }),
    {
      name: "shop-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        } as Storage)
      ),
      skipHydration: true,
    }
  )
);
