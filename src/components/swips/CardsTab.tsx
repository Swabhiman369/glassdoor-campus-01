import React, { useState } from 'react';
import SwipCard from './SwipCard';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import useSwipsStore from '@/lib/useSwipsStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CardsTabProps {
  filter?: 'all' | 'liked' | 'wishlisted' | 'enrolled';
}

const CardsTab: React.FC<CardsTabProps> = ({ filter = 'all' }) => {
  const [showFilters, setShowFilters] = useState(false);
  const {
    content,
    filters,
    setFilter,
    sorting,
    setSorting,
    userInteractions,
    toggleLike,
    toggleDislike,
    toggleWishlist,
    toggleEnrollment,
    getFilteredContent
  } = useSwipsStore();
  
  const [visibleCards, setVisibleCards] = useState(12);
  
  // Get filtered content
  const cards = getFilteredContent().filter(item => item.type === 'card' || item.type === 'note');

  if (cards.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <p className="text-lg text-muted-foreground">No cards match your current filters</p>
        <Button 
          variant="outline"
          onClick={() => {
            setFilter({
              category: null,
              difficulty: null,
              type: 'all',
              search: ''
            });
            setSorting('latest');
          }}
        >
          Reset filters
        </Button>
      </div>
    );
  }

  const handleLoadMore = () => {
    setVisibleCards(prev => Math.min(prev + 8, cards.length));
  };

  return (
    <div className="relative space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 p-4 glass-card rounded-xl">
        <div className="w-full flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search topics..."
              value={filters.search}
              onChange={(e) => setFilter({ ...filters, search: e.target.value })}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

        {/* Category Filter */}
        {showFilters && (
          <>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(content.map(item => item.category))).map(category => (
                <Badge
                  key={category}
                  variant={filters.category === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setFilter({
                    ...filters,
                    category: filters.category === category ? null : category
                  })}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
                <Badge
                  key={difficulty}
                  variant={filters.difficulty === difficulty ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setFilter({
                    ...filters,
                    difficulty: filters.difficulty === difficulty ? null : difficulty
                  })}
                >
                  {difficulty}
                </Badge>
              ))}
            </div>
          </>
        )}

        {/* Sorting Options */}
        <div className="flex flex-wrap gap-2 ml-auto">
          {[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'trending', label: 'Trending' }
          ].map(({ value, label }) => (
            <Badge
              key={value}
              variant={sorting === value ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => setSorting(value as typeof sorting)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.slice(0, visibleCards).map((card) => {
          const interaction = userInteractions[card.id] || {
            isLiked: false,
            isDisliked: false,
            isWishlisted: false,
            isEnrolled: false,
            progress: 0,
            lastViewed: new Date().toISOString()
          };

          return (
            <div key={card.id} className="h-fit">
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
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCards < cards.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="flex items-center gap-2"
          >
            Load More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Cards Counter */}
      {cards.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg">
          Showing {Math.min(visibleCards, cards.length)} of {cards.length}
        </div>
      )}
    </div>
  );
};

export default CardsTab;