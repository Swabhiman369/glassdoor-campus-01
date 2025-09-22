import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FilterState {
  search: string;
  category: string | null;
  difficulty: string | null;
  type: 'all' | 'video' | 'card';
  sorting: 'latest' | 'popular' | 'trending';
}

interface FilterStore {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  search: '',
  category: null,
  difficulty: null,
  type: 'all',
  sorting: 'latest'
};

const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: initialState,
      
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value
          }
        })),
      
      resetFilters: () =>
        set({ filters: initialState })
    }),
    {
      name: 'filter-storage'
    }
  )
);

export default useFilterStore;