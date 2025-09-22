import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import sampleContent, { type SwipContent } from './sampleContent';

interface SwipsStore {
  content: SwipContent[];
  filters: {
    category: string | null;
    difficulty: string | null;
    type: 'all' | 'video' | 'card';
    search: string;
  };
  sorting: 'latest' | 'popular' | 'trending';
  userInteractions: {
    [key: string]: {
      isLiked: boolean;
      isDisliked: boolean;
      isWishlisted: boolean;
      isEnrolled: boolean;
      progress: number;
      lastViewed: string;
    };
  };
  // Actions
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
  toggleWishlist: (id: string) => void;
  toggleEnrollment: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  setFilter: (filter: Partial<SwipsStore['filters']>) => void;
  setSorting: (sorting: SwipsStore['sorting']) => void;
  getFilteredContent: () => SwipContent[];
}

const useSwipsStore = create<SwipsStore>()(
  persist(
    (set, get) => ({
      content: sampleContent,
      filters: {
        category: null,
        difficulty: null,
        type: 'all',
        search: ''
      },
      sorting: 'latest',
      userInteractions: {},

      toggleLike: (id) => set((state) => {
        const currentInteraction = state.userInteractions[id] || {
          isLiked: false,
          isDisliked: false,
          isWishlisted: false,
          isEnrolled: false,
          progress: 0,
          lastViewed: new Date().toISOString()
        };

        return {
          userInteractions: {
            ...state.userInteractions,
            [id]: {
              ...currentInteraction,
              isLiked: !currentInteraction.isLiked,
              isDisliked: false // Remove dislike if present
            }
          }
        };
      }),

      toggleDislike: (id) => set((state) => {
        const currentInteraction = state.userInteractions[id] || {
          isLiked: false,
          isDisliked: false,
          isWishlisted: false,
          isEnrolled: false,
          progress: 0,
          lastViewed: new Date().toISOString()
        };

        return {
          userInteractions: {
            ...state.userInteractions,
            [id]: {
              ...currentInteraction,
              isDisliked: !currentInteraction.isDisliked,
              isLiked: false // Remove like if present
            }
          }
        };
      }),

      toggleWishlist: (id) => set((state) => {
        const currentInteraction = state.userInteractions[id] || {
          isLiked: false,
          isDisliked: false,
          isWishlisted: false,
          isEnrolled: false,
          progress: 0,
          lastViewed: new Date().toISOString()
        };

        return {
          userInteractions: {
            ...state.userInteractions,
            [id]: {
              ...currentInteraction,
              isWishlisted: !currentInteraction.isWishlisted
            }
          }
        };
      }),

      toggleEnrollment: (id) => set((state) => {
        const currentInteraction = state.userInteractions[id] || {
          isLiked: false,
          isDisliked: false,
          isWishlisted: false,
          isEnrolled: false,
          progress: 0,
          lastViewed: new Date().toISOString()
        };

        return {
          userInteractions: {
            ...state.userInteractions,
            [id]: {
              ...currentInteraction,
              isEnrolled: !currentInteraction.isEnrolled,
              lastViewed: new Date().toISOString()
            }
          }
        };
      }),

      updateProgress: (id, progress) => set((state) => {
        const currentInteraction = state.userInteractions[id] || {
          isLiked: false,
          isDisliked: false,
          isWishlisted: false,
          isEnrolled: false,
          progress: 0,
          lastViewed: new Date().toISOString()
        };

        return {
          userInteractions: {
            ...state.userInteractions,
            [id]: {
              ...currentInteraction,
              progress: Math.min(100, Math.max(0, progress)),
              lastViewed: new Date().toISOString()
            }
          }
        };
      }),

      setFilter: (filter) => set((state) => ({
        filters: { ...state.filters, ...filter }
      })),

      setSorting: (sorting) => set({ sorting }),

      getFilteredContent: () => {
        const state = get();
        let filtered = [...state.content];

        // Apply filters
        if (state.filters.category) {
          filtered = filtered.filter(item => 
            item.category.toLowerCase() === state.filters.category?.toLowerCase()
          );
        }

        if (state.filters.difficulty) {
          filtered = filtered.filter(item => 
            item.difficulty.toLowerCase() === state.filters.difficulty?.toLowerCase()
          );
        }

        if (state.filters.type !== 'all') {
          filtered = filtered.filter(item => item.type === state.filters.type);
        }

        if (state.filters.search) {
          const search = state.filters.search.toLowerCase();
          filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search) ||
            item.tags.some(tag => tag.toLowerCase().includes(search))
          );
        }

        // Apply sorting
        switch (state.sorting) {
          case 'popular':
            filtered.sort((a, b) => b.likes - a.likes);
            break;
          case 'trending':
            filtered.sort((a, b) => b.views - a.views);
            break;
          case 'latest':
          default:
            filtered.sort((a, b) => 
              new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
            );
            break;
        }

        return filtered;
      }
    }),
    {
      name: 'swips-storage'
    }
  )
);

export default useSwipsStore;