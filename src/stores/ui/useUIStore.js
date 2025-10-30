'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      isMenuOpen: false,
      scrollY: 0,
      isLoading: false,
      
      setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      
      setScrollY: (scrollY) => set({ scrollY }),
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'ui-store'
    }
  )
)