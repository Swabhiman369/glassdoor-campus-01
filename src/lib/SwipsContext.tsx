import React, { createContext, useContext, useState, useEffect } from 'react';

interface SwipItem {
  id: string;
  title: string;
  type: 'video' | 'card';
  likes: number;
  dislikes: number;
  subject: string;
  difficulty: string;
  price: string | number;
}

interface SwipsContextType {
  // Filters and sorting
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  subjectFilter: string;
  setSubjectFilter: (subject: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;

  // User interactions
  likedItems: Set<string>;
  toggleLike: (id: string) => void;
  dislikedItems: Set<string>;
  toggleDislike: (id: string) => void;
  wishlistedItems: Set<string>;
  toggleWishlist: (id: string) => void;
  enrolledItems: Set<string>;
  toggleEnrolled: (id: string) => void;

  // Stats
  getLikeCount: (id: string) => number;
  getDislikeCount: (id: string) => number;
  isLiked: (id: string) => boolean;
  isDisliked: (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  isEnrolled: (id: string) => boolean;
}

const SwipsContext = createContext<SwipsContextType | undefined>(undefined);

export const useSwips = () => {
  const context = useContext(SwipsContext);
  if (!context) {
    throw new Error('useSwips must be used within a SwipsProvider');
  }
  return context;
};

interface SwipsProviderProps {
  children: React.ReactNode;
}

export const SwipsProvider: React.FC<SwipsProviderProps> = ({ children }) => {
  // Filters and sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // User interaction states - Load from localStorage
  const [likedItems, setLikedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('swips-liked');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [dislikedItems, setDislikedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('swips-disliked');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('swips-wishlisted');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [enrolledItems, setEnrolledItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('swips-enrolled');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('swips-liked', JSON.stringify([...likedItems]));
  }, [likedItems]);

  useEffect(() => {
    localStorage.setItem('swips-disliked', JSON.stringify([...dislikedItems]));
  }, [dislikedItems]);

  useEffect(() => {
    localStorage.setItem('swips-wishlisted', JSON.stringify([...wishlistedItems]));
  }, [wishlistedItems]);

  useEffect(() => {
    localStorage.setItem('swips-enrolled', JSON.stringify([...enrolledItems]));
  }, [enrolledItems]);

  // Toggle functions
  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setDislikedItems(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
      return next;
    });
  };

  const toggleDislike = (id: string) => {
    setDislikedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setLikedItems(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
      return next;
    });
  };

  const toggleWishlist = (id: string) => {
    setWishlistedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleEnrolled = (id: string) => {
    setEnrolledItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Helper functions
  const getLikeCount = (id: string) => {
    // In a real app, this would fetch from an API
    return likedItems.has(id) ? 1 : 0;
  };

  const getDislikeCount = (id: string) => {
    // In a real app, this would fetch from an API
    return dislikedItems.has(id) ? 1 : 0;
  };

  const isLiked = (id: string) => likedItems.has(id);
  const isDisliked = (id: string) => dislikedItems.has(id);
  const isWishlisted = (id: string) => wishlistedItems.has(id);
  const isEnrolled = (id: string) => enrolledItems.has(id);

  const value = {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    subjectFilter,
    setSubjectFilter,
    difficultyFilter,
    setDifficultyFilter,
    priceFilter,
    setPriceFilter,
    likedItems,
    toggleLike,
    dislikedItems,
    toggleDislike,
    wishlistedItems,
    toggleWishlist,
    enrolledItems,
    toggleEnrolled,
    getLikeCount,
    getDislikeCount,
    isLiked,
    isDisliked,
    isWishlisted,
    isEnrolled,
  };

  return (
    <SwipsContext.Provider value={value}>
      {children}
    </SwipsContext.Provider>
  );
};

export default SwipsContext;