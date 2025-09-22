import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  Heart,
  Eye,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  subject: string;
  author: string;
  rating: number;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  price: number;
  isFree: boolean;
  image: string;
  tags: string[];
  isEnrolled: boolean;
  isInWishlist: boolean;
  addedDate: string;
}

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: number) => void;
  onToggleWishlist: (courseId: number) => void;
  index?: number;
}

const CourseCard = ({ course, onEnroll, onToggleWishlist, index = 0 }: CourseCardProps) => {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleViewDetails = () => {
    navigate('/ai-teacher', { 
      state: { 
        videoId: course.id, 
        videoTitle: course.title,
        courseData: course 
      } 
    });
  };

  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay: index * 0.1 }}
      className="group glass-card p-4 rounded-2xl hover:shadow-glow transition-smooth cursor-pointer"
      whileHover={{ y: -5 }}
    >
      {/* Course Image */}
      <div className="aspect-video bg-gradient-glass rounded-xl mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20" />
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="object-cover w-full h-full absolute inset-0"
            style={{ zIndex: 1 }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
        )}
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <Button 
            size="sm" 
            onClick={handleViewDetails}
            className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full"
          >
            <Play className="w-4 h-4 mr-2" />
            {course.isEnrolled ? 'Continue' : 'Preview'}
          </Button>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(course.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm ${
              course.isInWishlist 
                ? 'bg-accent/20 text-accent hover:bg-accent/30' 
                : 'bg-surface/20 text-muted-foreground hover:bg-surface/30 hover:text-accent'
            }`}
          >
            <Heart className={`w-4 h-4 ${course.isInWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Free Badge */}
        {course.isFree && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-success text-white">
              Free
            </Badge>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {course.subject} • by {course.author}
          </p>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-warning fill-current" />
            <span>{course.rating}</span>
            <span>({course.students.toLocaleString()})</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Progress Bar for Enrolled Courses */}
        {course.isEnrolled && course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-surface/60 border-white/10">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
    <div className="flex items-center space-x-2 flex-wrap min-w-0">
            <Badge variant="outline" className="bg-surface/60 border-white/10">
              {course.level}
            </Badge>
            <span className="font-semibold text-foreground">
              {course.isFree ? 'Free' : `₹${course.price}`}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleViewDetails}
              className="p-2 hover:bg-surface/60"
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEnroll(course.id);
              }}
              className={course.isEnrolled 
                ? "bg-success/20 text-success hover:bg-success/30" 
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }
              disabled={course.isEnrolled}
            >
              {course.isEnrolled ? 'Enrolled' : 'Enroll'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;