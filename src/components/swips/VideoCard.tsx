import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Book, Heart, Play } from 'lucide-react';
import { useSwips } from '@/lib/SwipsContext';

interface VideoCardProps {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  videoUrl,
  thumbnail,
}) => {
  const navigate = useNavigate();
  const {
    getLikeCount,
    getDislikeCount,
    isLiked,
    isDisliked,
    isWishlisted,
    toggleLike,
    toggleDislike,
    toggleWishlist,
  } = useSwips();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleReadMore = () => {
    navigate(`/notes/${id}`);
  };

  return (
    <Card className="relative aspect-[9/16] w-full max-w-md mx-auto bg-black overflow-hidden">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          poster={thumbnail}
          autoPlay={isPlaying}
          loop
          playsInline
          muted
          onClick={() => {
            if (videoRef.current) {
              if (isPlaying) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
              setIsPlaying(!isPlaying);
            }
          }}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Play className="w-16 h-16 text-white opacity-75" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold mb-4">{title}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`text-white hover:bg-white/20 ${isLiked ? 'bg-white/20' : ''}`}
              onClick={() => toggleLike(id)}
            >
              <ThumbsUp className="h-5 w-5" />
              <span className="ml-1">{getLikeCount(id)}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={`text-white hover:bg-white/20 ${isDisliked(id) ? 'bg-white/20' : ''}`}
              onClick={() => toggleDislike(id)}
            >
              <ThumbsDown className="h-5 w-5" />
              <span className="ml-1">{getDislikeCount(id)}</span>
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`text-white hover:bg-white/20 ${isWishlisted(id) ? 'bg-white/20' : ''}`}
              onClick={() => toggleWishlist(id)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleReadMore}
            >
              <Book className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;