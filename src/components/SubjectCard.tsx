import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, TrendingUp } from "lucide-react";

interface Subject {
  id: number;
  name: string;
  description: string;
  courseCount: number;
  totalStudents: number;
  averageRating: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  courses: Array<{
    id: number;
    title: string;
    price: number;
    isFree: boolean;
  }>;
}

interface SubjectCardProps {
  subject: Subject;
  onViewCourses: (subjectId: number) => void;
  index?: number;
}

const SubjectCard = ({ subject, onViewCourses, index = 0 }: SubjectCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const IconComponent = subject.icon;

  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay: index * 0.1 }}
      className="group glass-card p-6 rounded-2xl hover:shadow-glow transition-smooth cursor-pointer"
      whileHover={{ y: -5 }}
    >
      {/* Subject Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${subject.color}`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
              {subject.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {subject.courseCount} courses
            </p>
          </div>
        </div>
        
        <Badge variant="outline" className="bg-surface/60 border-white/10">
          <TrendingUp className="w-3 h-3 mr-1" />
          {subject.averageRating}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {subject.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{subject.totalStudents.toLocaleString()} students</span>
        </div>
        <div className="flex items-center space-x-1">
          <BookOpen className="w-4 h-4" />
          <span>{subject.courseCount} courses</span>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="space-y-2 mb-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Featured Courses
        </h4>
        <div className="space-y-1">
          {subject.courses.slice(0, 3).map((course) => (
            <div key={course.id} className="flex items-center justify-between text-sm">
              <span className="text-foreground truncate flex-1 mr-2">
                {course.title}
              </span>
              <span className="text-muted-foreground font-medium">
                {course.isFree ? 'Free' : `₹${course.price}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <Button
        onClick={() => onViewCourses(subject.id)}
        className="w-full bg-surface/60 hover:bg-surface/80 text-foreground"
        variant="ghost"
      >
        View All Courses
      </Button>
    </motion.div>
  );
};

export default SubjectCard;