import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Heart, Book, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import useSwipsStore from '@/lib/useSwipsStore';
import useFilterStore from '@/lib/useFilterStore';
import { useSwipeable } from 'react-swipeable';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { SwipContent } from '@/types/swip';

interface VideoFeedProps {
  filter?: 'all' | 'liked' | 'wishlisted' | 'enrolled';
}

const VideoFeed: React.FC<VideoFeedProps> = ({ filter = 'all' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const {
    content,
    userInteractions,
    toggleLike,
    toggleDislike,
    toggleWishlist,
    toggleEnrollment,
    updateProgress
  } = useSwipsStore();

  const { filters } = useFilterStore();

  // Get filtered videos
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

  const currentVideo = sortedVideos[currentIndex];
  const videoInteraction = currentVideo ? userInteractions[currentVideo.id] : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, currentIndex]);

  const handleSwipe = (direction: 'up' | 'down') => {
    setIsPlaying(false);
    if (direction === 'up' && currentIndex < sortedVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    trackMouse: true
  });

  if (!currentVideo) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-muted-foreground">No videos available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[calc((100vh-12rem)*0.5625)] aspect-[9/16] mx-auto h-[calc(100vh-12rem)]" {...swipeHandlers}>
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {/* Video Player */}
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnail}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
              onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* Video Info Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />
            
            {/* Video Title and Description */}
            <div className="absolute bottom-20 left-4 right-4 text-white space-y-2">
              <h3 className="text-lg font-semibold line-clamp-2">{currentVideo.title}</h3>
              <p className="text-sm text-white/80 line-clamp-2">{currentVideo.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {currentVideo.category}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {currentVideo.difficulty}
                </Badge>
              </div>

              {videoInteraction?.isEnrolled && (
                <div className="space-y-1">
                  <Progress value={progress} className="h-1" />
                  <div className="flex justify-between text-xs text-white/60">
                    <span>{Math.round(progress)}% complete</span>
                    <span>Updated {currentVideo.lastUpdated}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full bg-white/10 hover:bg-white/20 ${
                  videoInteraction?.isLiked ? 'text-primary' : 'text-white'
                }`}
                onClick={() => toggleLike(currentVideo.id)}
              >
                <ThumbsUp className={`w-5 h-5 ${videoInteraction?.isLiked ? 'fill-primary' : ''}`} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full bg-white/10 hover:bg-white/20 ${
                  videoInteraction?.isDisliked ? 'text-destructive' : 'text-white'
                }`}
                onClick={() => toggleDislike(currentVideo.id)}
              >
                <ThumbsDown className={`w-5 h-5 ${videoInteraction?.isDisliked ? 'fill-destructive' : ''}`} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full bg-white/10 hover:bg-white/20 ${
                  videoInteraction?.isWishlisted ? 'text-primary' : 'text-white'
                }`}
                onClick={() => toggleWishlist(currentVideo.id)}
              >
                <Heart className={`w-5 h-5 ${videoInteraction?.isWishlisted ? 'fill-primary' : ''}`} />
              </Button>

              {currentVideo.type === 'note' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => window.location.href = `/documentation?topicId=${currentVideo.id}`}
                >
                  <Book className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Playback Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute top-4 left-4 right-16 flex gap-1">
              {sortedVideos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicators */}
        <div className="absolute inset-y-0 left-0 w-1/3" onClick={() => handleSwipe('down')} />
        <div className="absolute inset-y-0 right-0 w-1/3" onClick={() => handleSwipe('up')} />
      </div>
    </div>
  );
};

export default VideoFeed;