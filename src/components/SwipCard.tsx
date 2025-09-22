import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import useSwipsStore from '@/lib/useSwipsStore';
import { Heart, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';

interface SwipCardProps {
  id: string;
  noteId: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  instructor: string;
  difficulty: string;
  price: number;
  duration: string;
  likes: number;
  dislikes: number;
}

const SwipCard: React.FC<SwipCardProps> = ({
  id,
  noteId,
  title,
  description,
  thumbnail,
  category,
  instructor,
  difficulty,
  price,
  duration,
  likes,
  dislikes
}) => {
  const navigate = useNavigate();
  const { userInteractions, toggleWishlist, toggleLike } = useSwipsStore();
  
  const userInteraction = userInteractions[id] || {
    isWishlisted: false,
    isEnrolled: false,
    progress: 0
  };

  const handleReadMore = () => {
    navigate(`/documentation?topicId=${noteId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="overflow-hidden glass-card border-0">
        {/* Thumbnail */}
        <div className="relative w-full aspect-video">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="glass-badge">
              {duration}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Badge variant="outline">{category}</Badge>
              <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
              <p className="text-sm text-muted-foreground">by {instructor}</p>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleWishlist(id)}
              className={userInteraction.isWishlisted ? 'bg-primary/20' : ''}
            >
              <Heart 
                className={`h-4 w-4 ${userInteraction.isWishlisted ? 'fill-primary' : ''}`}
              />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Progress bar for enrolled content */}
          {userInteraction.isEnrolled && (
            <div className="space-y-1">
              <Progress value={userInteraction.progress} className="h-1" />
              <p className="text-xs text-muted-foreground">
                {userInteraction.progress}% Complete
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Badge variant="secondary">{difficulty}</Badge>
              <Badge variant={price === 0 ? "success" : "default"}>
                {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleLike(id, true)}
                className="p-1 hover:text-primary"
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="sr-only">Like</span>
                <span className="text-xs ml-1">{likes}</span>
              </button>

              <button
                onClick={() => toggleLike(id, false)}
                className="p-1 hover:text-primary"
              >
                <ThumbsDown className="h-4 w-4" />
                <span className="sr-only">Dislike</span>
                <span className="text-xs ml-1">{dislikes}</span>
              </button>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleReadMore}
          >
            Read More <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default SwipCard;