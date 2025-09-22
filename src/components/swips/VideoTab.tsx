import React, { useState, useCallback } from 'react';
import VideoCard from './VideoCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import useSwipsStore from '@/lib/useSwipsStore';

interface VideoTabProps {
  filter?: 'all' | 'liked' | 'wishlisted' | 'enrolled';
}

const VideoTab: React.FC<VideoTabProps> = ({ filter = 'all' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  // Autoplay functionality
  React.useEffect(() => {
    let timeoutId: number;
    if (isAutoplay) {
      timeoutId = window.setTimeout(() => {
        handleSwipe('up');
      }, 10000); // Move to next video after 10 seconds
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentIndex, isAutoplay]);

  const {
    content,
    filters,
    sorting,
    userInteractions,
    toggleLike,
    toggleDislike,
    toggleWishlist
  } = useSwipsStore();

  // Get videos based on filter
  const videos = content.filter(item => item.type === 'video').filter(video => {
    switch (filter) {
      case 'liked':
        return userInteractions[video.id]?.isLiked;
      case 'wishlisted':
        return userInteractions[video.id]?.isWishlisted;
      case 'enrolled':
        return userInteractions[video.id]?.isEnrolled;
      default:
        return true;
    }
  });

  // Apply search and filters
  const filteredVideos = videos.filter(video => {
    const matchesSearch = !filters.search || 
      video.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      video.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || video.category === filters.category;
    const matchesDifficulty = !filters.difficulty || video.difficulty === filters.difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Apply sorting
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sorting) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return b.views - a.views;
      case 'latest':
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const handleSwipe = useCallback((direction: 'up' | 'down') => {
    setCurrentIndex((prev) => {
      if (direction === 'up') {
        return prev === sortedVideos.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? sortedVideos.length - 1 : prev - 1;
      }
    });
  }, [sortedVideos.length]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    delta: 50,
    swipeDuration: 500,
    trackMouse: true
  });

  if (sortedVideos.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-gray-500">No videos match your search criteria</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <div
        {...swipeHandlers}
        className="relative aspect-[9/16] w-full max-w-md overflow-hidden rounded-xl bg-black shadow-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <VideoCard
              id={sortedVideos[currentIndex].id}
              {...sortedVideos[currentIndex]}
              interaction={userInteractions[sortedVideos[currentIndex].id] || {
                isLiked: false,
                isDisliked: false,
                isWishlisted: false,
                isEnrolled: false,
                progress: 0
              }}
              onLike={() => toggleLike(sortedVideos[currentIndex].id)}
              onDislike={() => toggleDislike(sortedVideos[currentIndex].id)}
              onWishlist={() => toggleWishlist(sortedVideos[currentIndex].id)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe indicators */}
        <div className="absolute inset-x-0 top-4 flex justify-center space-x-1">
          {sortedVideos.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full ${
                index === currentIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'
              }`}
              initial={false}
              animate={{ opacity: index === currentIndex ? 1 : 0.5 }}
            />
          ))}
        </div>

        {/* Navigation hints */}
        <div className="absolute inset-y-0 left-0 w-1/3" onClick={() => handleSwipe('down')} />
        <div className="absolute inset-y-0 right-0 w-1/3" onClick={() => handleSwipe('up')} />

        {/* Autoplay toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAutoplay(!isAutoplay)}
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          {isAutoplay ? (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Pause className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Play className="h-5 w-5" />
            </motion.div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoTab;