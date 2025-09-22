import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SwipCard from './SwipCard';
import useSwipsStore from '@/lib/useSwipsStore';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  Filter
} from 'lucide-react';

const CardsTab: React.FC = () => {
  const {
    getFilteredContent,
    filters,
    sorting,
    searchQuery,
    setFilters,
    setSorting,
    setSearchQuery
  } = useSwipsStore();

  const content = getFilteredContent();
  const [showFilters, setShowFilters] = React.useState(false);

  // Virtual scrolling setup
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [visibleContent, setVisibleContent] = React.useState(content.slice(0, 12));

  const entry = useIntersectionObserver(loadMoreRef, {
    threshold: 0.1,
    root: null,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      const currentLength = visibleContent.length;
      const nextBatch = content.slice(
        currentLength,
        Math.min(currentLength + 12, content.length)
      );
      if (nextBatch.length > 0) {
        setVisibleContent(prev => [...prev, ...nextBatch]);
      }
    }
  }, [entry?.isIntersecting, content]);

  useEffect(() => {
    setVisibleContent(content.slice(0, 12));
  }, [searchQuery, filters, sorting]);

  const subjects = Array.from(new Set(content.map(item => item.category)));
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 -mx-4">
        <div className="flex flex-col space-y-4">
          {/* Search and Filter Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Filters Panel */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 py-2">
              {/* Subject Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Subjects
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center space-x-2 glass-card px-3 py-1.5 rounded-full text-sm"
                    >
                      <Checkbox
                        checked={filters.subject.includes(subject)}
                        onCheckedChange={(checked) => {
                          setFilters({
                            subject: checked
                              ? [...filters.subject, subject]
                              : filters.subject.filter((s) => s !== subject),
                          });
                        }}
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" /> Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <label
                      key={difficulty}
                      className="flex items-center space-x-2 glass-card px-3 py-1.5 rounded-full text-sm"
                    >
                      <Checkbox
                        checked={filters.difficulty.includes(difficulty)}
                        onCheckedChange={(checked) => {
                          setFilters({
                            difficulty: checked
                              ? [...filters.difficulty, difficulty]
                              : filters.difficulty.filter((d) => d !== difficulty),
                          });
                        }}
                      />
                      <span>{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Price</label>
                <Select
                  value={filters.price}
                  onValueChange={(value) => setFilters({ price: value as any })}
                >
                  <option value="all">All</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select
                  value={sorting}
                  onValueChange={(value) => setSorting(value as any)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </Select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cards Grid */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleContent.map((item) => (
          <SwipCard key={item.id} {...item} />
        ))}
      </div>

      {/* Load More Trigger */}
      {visibleContent.length < content.length && (
        <div ref={loadMoreRef} className="h-10" />
      )}

      {/* No Results */}
      {content.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No topics found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CardsTab;