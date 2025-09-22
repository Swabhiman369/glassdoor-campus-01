import React, { useState } from 'react';
import DynamicNavbar from '@/components/DynamicNavbar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GridView, ReelView } from '@/components/swips';
import SubjectsFilter from '@/components/swips/SubjectsFilter';
import { Play, Grid2X2, Heart, CheckCircle2, Search, X } from 'lucide-react';
import useFilterStore from '@/lib/useFilterStore';
import useSwipsStore from '@/lib/useSwipsStore';
import type { SwipContent } from '@/types/swip';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SwipsPage: React.FC = () => {
  const { filters, setFilter } = useFilterStore();
  const { content, userInteractions, toggleLike, toggleDislike, toggleWishlist, toggleEnrollment } = useSwipsStore();
  const [activeView, setActiveView] = useState<'all' | 'liked' | 'wishlisted' | 'enrolled'>('all');
  const [contentType, setContentType] = useState<'videos' | 'cards'>('cards');
  const [selectedItem, setSelectedItem] = useState<SwipContent | null>(null);

  const handleTabChange = (value: string) => {
    setContentType(value as 'videos' | 'cards');
    // Update content type filter
    setFilter('type', value === 'videos' ? 'video' : 'card');
    // Reset other filters
    setFilter('category', null);
    setFilter('difficulty', null);
    setFilter('search', '');
  };

  const handleViewChange = (value: typeof activeView) => {
    setActiveView(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar activeTab="swips" />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Content Type and View Selectors */}
        <div className="flex flex-col items-center gap-6">
          {/* Content Type (Videos/Cards) */}
          <Tabs
            value={contentType}
            onValueChange={handleTabChange}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2 glass-card bg-surface/60">
              <TabsTrigger
                value="videos"
                className={cn(
                  "data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Play className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="cards"
                className={cn(
                  "data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Grid2X2 className="w-4 h-4" />
                Cards
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Bar and View Mode Container */}
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="w-full sm:w-auto sm:flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                className="pl-10 glass-card bg-surface/60 w-full"
              />
            </div>

            {/* View Mode (All/Liked/Wishlist/Enrolled) */}
            <Tabs
              value={activeView}
              onValueChange={handleViewChange}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full sm:w-auto grid-cols-4 glass-card bg-surface/60">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground px-4"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="liked"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-1 px-2"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Liked</span>
                </TabsTrigger>
                <TabsTrigger
                  value="wishlisted"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-1 px-2"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Wish</span>
                </TabsTrigger>
                <TabsTrigger
                  value="enrolled"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-1 px-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Done</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Subjects Filter */}
          {activeView === 'all' && (
            <SubjectsFilter className="w-full" />
          )}
        </div>

        {/* Content Display */}
        <div className="mt-6 relative">
          {(() => {
            // Filter items based on view and type
            const filteredItems = content.filter(item => {
              const typeMatch = item.type === (contentType === 'videos' ? 'video' : 'card');
              const categoryMatch = !filters.category || item.category === filters.category;
              
              switch (activeView) {
                case 'liked':
                  return typeMatch && userInteractions[item.id]?.isLiked;
                case 'wishlisted':
                  return typeMatch && userInteractions[item.id]?.isWishlisted;
                case 'enrolled':
                  return typeMatch && userInteractions[item.id]?.isEnrolled;
                default:
                  return typeMatch && categoryMatch;
              }
            });

            if (selectedItem) {
              return (
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => setSelectedItem(null)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-surface/60"
                      onClick={() => setSelectedItem(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <ReelView
                    items={[selectedItem]}
                    type={selectedItem.type}
                    onLike={toggleLike}
                    onDislike={toggleDislike}
                    onWishlist={toggleWishlist}
                    onEnroll={toggleEnrollment}
                    userInteractions={userInteractions}
                  />
                </div>
              );
            }

            if (filteredItems.length === 0) {
              return (
                <div className="text-center py-12">
                  <p className="text-lg font-medium text-muted-foreground">
                    No {contentType} found{filters.category ? ` in ${filters.category}` : ''}.
                  </p>
                </div>
              );
            }

            return activeView === 'all' ? (
              <GridView
                items={filteredItems}
                type={contentType === 'videos' ? 'video' : 'card'}
                onLike={toggleLike}
                onDislike={toggleDislike}
                onWishlist={toggleWishlist}
                onEnroll={toggleEnrollment}
                onViewItem={setSelectedItem}
                userInteractions={userInteractions}
              />
            ) : (
              <ReelView
                items={filteredItems}
                type={contentType === 'videos' ? 'video' : 'card'}
                onLike={toggleLike}
                onDislike={toggleDislike}
                onWishlist={toggleWishlist}
                onEnroll={toggleEnrollment}
                userInteractions={userInteractions}
              />
            );
          })()}
        </div>
      </main>
    </div>
  );
};

export default SwipsPage;