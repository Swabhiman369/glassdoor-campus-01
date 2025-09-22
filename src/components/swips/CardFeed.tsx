import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import useSwipsStore from '@/lib/useSwipsStore';
import useFilterStore from '@/lib/useFilterStore';
import SwipCard from './SwipCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CardFeedProps {
  filter?: 'all' | 'liked' | 'wishlisted' | 'enrolled';
}

const CardFeed: React.FC<CardFeedProps> = ({ filter = 'all' }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });
  
  const {
    content,
    userInteractions,
    toggleLike,
    toggleDislike,
    toggleWishlist,
    toggleEnrollment
  } = useSwipsStore();
  
  const { filters, setFilter, resetFilters } = useFilterStore();

  // Get filtered cards
  const cards = content.filter(item => item.type === 'card').filter(card => {
    switch (filter) {
      case 'liked':
        return userInteractions[card.id]?.isLiked;
      case 'wishlisted':
        return userInteractions[card.id]?.isWishlisted;
      case 'enrolled':
        return userInteractions[card.id]?.isEnrolled;
      default:
        return true;
    }
  });

  // Apply filters
  const filteredCards = cards.filter(card => {
    const matchesSearch = !filters.search || 
      card.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      card.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || card.category === filters.category;
    const matchesDifficulty = !filters.difficulty || card.difficulty === filters.difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Apply sorting
  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (filters.sorting) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return b.views - a.views;
      case 'latest':
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  // Handle card swiping
  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && visibleRange.end < sortedCards.length) {
      setVisibleRange(prev => ({
        start: prev.start + 1,
        end: prev.end + 1
      }));
    } else if (direction === 'down' && visibleRange.start > 0) {
      setVisibleRange(prev => ({
        start: prev.start - 1,
        end: prev.end - 1
      }));
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    trackMouse: true,
    delta: 10 // min distance(px) before a swipe starts
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cards..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-primary/20' : ''}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="glass-card rounded-xl p-4 space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(content.map(item => item.category))).map(category => (
                  <Badge
                    key={category}
                    variant={filters.category === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setFilter('category', filters.category === category ? null : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulties */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
                  <Badge
                    key={difficulty}
                    variant={filters.difficulty === difficulty ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setFilter('difficulty', filters.difficulty === difficulty ? null : difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sort By</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'latest', label: 'Latest' },
                  { value: 'popular', label: 'Popular' },
                  { value: 'trending', label: 'Trending' }
                ].map(({ value, label }) => (
                  <Badge
                    key={value}
                    variant={filters.sorting === value ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setFilter('sorting', value as typeof filters.sorting)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cards Feed */}
      {sortedCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[40vh] text-center">
          <p className="text-lg text-muted-foreground">No cards match your criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              resetFilters();
              setFilter('sorting', 'latest');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div {...swipeHandlers} className="relative space-y-6">
          {/* Navigation Arrows */}
          {visibleRange.start > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-primary/20"
              onClick={() => handleSwipe('down')}
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
          )}

          {/* Visible Cards */}
          {sortedCards.slice(visibleRange.start, visibleRange.end).map((card, index) => {
            const interaction = userInteractions[card.id] || {
              isLiked: false,
              isDisliked: false,
              isWishlisted: false,
              isEnrolled: false,
              progress: 0
            };

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <SwipCard
                  {...card}
                  isLiked={interaction.isLiked}
                  isDisliked={interaction.isDisliked}
                  isWishlisted={interaction.isWishlisted}
                  isEnrolled={interaction.isEnrolled}
                  progress={interaction.progress}
                  onLike={() => toggleLike(card.id)}
                  onDislike={() => toggleDislike(card.id)}
                  onWishlist={() => toggleWishlist(card.id)}
                  onEnroll={() => toggleEnrollment(card.id)}
                />
              </motion.div>
            );
          })}

          {/* Load More Indicator */}
          {visibleRange.end < sortedCards.length && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-primary/20"
              onClick={() => handleSwipe('up')}
            >
              <ChevronDown className="w-5 h-5" />
            </Button>
          )}
        </div>
      )}

      {/* Progress Indicator */}
      {sortedCards.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg">
          {visibleRange.start + 1} - {Math.min(visibleRange.end, sortedCards.length)} of {sortedCards.length}
        </div>
      )}
    </div>
  );
};

export default CardFeed;