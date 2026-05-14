"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// NOTE: localStorage is a stopgap for the static prototype.
// Production should sync via Supabase (RLS-protected `user_watchlist` table).
// See spec sections 5 & 14: "Persist everything to the database, not localStorage."

interface WatchlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id: string) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      has: (id: string) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "catalyst-watchlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
