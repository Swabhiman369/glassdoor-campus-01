import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Heart, Book, Play } from 'lucide-react';
import type { SwipContent } from '@/types/swip';
import { cn } from '@/lib/utils';

interface GridViewProps {
  items: SwipContent[];
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onWishlist: (id: string) => void;
  onEnroll: (id: string) => void;
  onViewItem?: (item: SwipContent) => void;
  userInteractions: Record<string, {
    isLiked: boolean;
    isDisliked: boolean;
    isWishlisted: boolean;
    isEnrolled: boolean;
  }>;
  type: 'video' | 'card';
}

const getPrice = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return '₹499';
    case 'Intermediate': return '₹999';
    case 'Advanced': return '₹1,499';
    default: return '₹499';
  }
};

const GridView: React.FC<GridViewProps> = ({
  items,
  onLike,
  onDislike,
  onWishlist,
  onEnroll,
  onViewItem,
  userInteractions,
  type
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className="group relative overflow-hidden bg-surface/60 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
            onClick={() => onViewItem?.(item)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[9/16]">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              {type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 p-3">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              {userInteractions[item.id]?.isEnrolled && (
                <Badge
                  variant="default"
                  className="absolute top-2 right-2 bg-primary text-primary-foreground"
                >
                  Enrolled
                </Badge>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 space-y-2">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {item.difficulty} • {getPrice(item.difficulty)}
                </Badge>
                <Button
                  variant="default"
                  size="sm"
                  className={cn(
                    "w-full transition-colors",
                    userInteractions[item.id]?.isEnrolled
                      ? "bg-surface/20 text-white hover:bg-surface/30"
                      : "bg-gradient-primary text-primary-foreground hover:bg-gradient-primary/90"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnroll(item.id);
                  }}
                >
                  {userInteractions[item.id]?.isEnrolled ? "Enrolled" : "Enroll Now"}
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors",
                      userInteractions[item.id]?.isLiked && "text-primary"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(item.id);
                    }}
                  >
                    <ThumbsUp className={cn(
                      "h-4 w-4",
                      userInteractions[item.id]?.isLiked && "fill-primary"
                    )} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors",
                      userInteractions[item.id]?.isDisliked && "text-destructive"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDislike(item.id);
                    }}
                  >
                    <ThumbsDown className={cn(
                      "h-4 w-4",
                      userInteractions[item.id]?.isDisliked && "fill-destructive"
                    )} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors",
                      userInteractions[item.id]?.isWishlisted && "text-primary"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onWishlist(item.id);
                    }}
                  >
                    <Heart className={cn(
                      "h-4 w-4",
                      userInteractions[item.id]?.isWishlisted && "fill-primary"
                    )} />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/documentation?topicId=${item.noteId || item.id}`;
                  }}
                >
                  <Book className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default GridView;