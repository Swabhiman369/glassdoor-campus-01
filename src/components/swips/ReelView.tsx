import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Heart, Book, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { SwipContent } from '@/types/swip';
import { Link } from 'react-router-dom';

interface ReelViewProps {
  items: SwipContent[];
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onWishlist: (id: string) => void;
  onEnroll: (id: string) => void;
  userInteractions: Record<string, {
    isLiked: boolean;
    isDisliked: boolean;
    isWishlisted: boolean;
    isEnrolled: boolean;
  }>;
  type: 'video' | 'card';
}

const ReelView: React.FC<ReelViewProps> = ({
  items,
  onLike,
  onDislike,
  onWishlist,
  onEnroll,
  userInteractions,
  type
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [currentIndex, items.length]);

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(false);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    trackMouse: true,
    delta: 10
  });

  const getPrice = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '₹499';
      case 'Intermediate': return '₹999';
      case 'Advanced': return '₹1,499';
      default: return '₹499';
    }
  };

  if (!currentItem) return null;

  return (
    <div className="w-full max-w-[calc((100vh-12rem)*0.5625)] aspect-[9/16] mx-auto relative" {...swipeHandlers}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full h-full rounded-2xl overflow-hidden bg-black"
        >
          {type === 'video' ? (
            <video
              src={currentItem.videoUrl}
              poster={currentItem.thumbnail}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
              onClick={() => setIsPlaying(!isPlaying)}
              autoPlay={isPlaying}
            />
          ) : (
            <img
              src={currentItem.thumbnail}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

          {/* Content */}
          <div className="absolute bottom-20 left-4 right-4 text-white space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold line-clamp-2">{currentItem.title}</h3>
              {userInteractions[currentItem.id]?.isEnrolled && (
                <Badge className="bg-primary text-primary-foreground">Enrolled</Badge>
              )}
            </div>
            <p className="text-sm text-white/80 line-clamp-2">{currentItem.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                {currentItem.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                {getPrice(currentItem.difficulty)}
              </Badge>
              {!userInteractions[currentItem.id]?.isEnrolled && (
                <Button
                  variant="default"
                  size="sm"
                  className="mt-2 w-full bg-gradient-primary text-primary-foreground hover:bg-gradient-primary/90"
                  onClick={(e) => {
                    e.preventDefault();
                    onEnroll(currentItem.id);
                  }}
                >
                  Enroll Now
                </Button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-white/10 hover:bg-white/20 ${
                userInteractions[currentItem.id]?.isLiked ? 'text-primary' : 'text-white'
              }`}
              onClick={() => onLike(currentItem.id)}
            >
              <ThumbsUp className={`w-5 h-5 ${userInteractions[currentItem.id]?.isLiked ? 'fill-primary' : ''}`} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-white/10 hover:bg-white/20 ${
                userInteractions[currentItem.id]?.isDisliked ? 'text-destructive' : 'text-white'
              }`}
              onClick={() => onDislike(currentItem.id)}
            >
              <ThumbsDown className={`w-5 h-5 ${userInteractions[currentItem.id]?.isDisliked ? 'fill-destructive' : ''}`} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-white/10 hover:bg-white/20 ${
                userInteractions[currentItem.id]?.isWishlisted ? 'text-primary' : 'text-white'
              }`}
              onClick={() => onWishlist(currentItem.id)}
            >
              <Heart className={`w-5 h-5 ${userInteractions[currentItem.id]?.isWishlisted ? 'fill-primary' : ''}`} />
            </Button>

            <Link to={`/documentation?topicId=${currentItem.noteId || currentItem.id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <Book className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Video Controls */}
          {type === 'video' && (
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
          )}

          {/* Progress Indicators */}
          <div className="absolute top-4 left-4 right-16 flex gap-1">
            {items.map((_, index) => (
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
    </div>
  );
};

export default ReelView;