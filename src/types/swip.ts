export interface SwipContent {
  id: string;
  type: 'video' | 'card';
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration?: string;
  likes: number;
  views: number;
  isWishlisted: boolean;
  isEnrolled: boolean;
  instructor: string;
  tags: string[];
  videoUrl?: string;
  noteId?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lastUpdated: string;
}