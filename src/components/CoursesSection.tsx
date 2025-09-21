import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Filter,
  Search,
  MoreVertical
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CoursesSection = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Complete React Development Course",
      author: "John Smith",
      rating: 4.8,
      students: 15420,
      duration: "12 hours",
      level: "Intermediate",
      progress: 65,
      status: "running",
      image: "/api/placeholder/300/200",
      tags: ["React", "JavaScript", "Frontend"],
      price: "$49.99"
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      author: "Sarah Johnson",
      rating: 4.9,
      students: 8930,
      duration: "18 hours",
      level: "Advanced",
      progress: 100,
      status: "completed",
      image: "/api/placeholder/300/200",
      tags: ["Python", "Backend", "AI"],
      price: "$79.99"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      author: "Dr. Mike Chen",
      rating: 4.7,
      students: 12340,
      duration: "24 hours",
      level: "Beginner",
      progress: 0,
      status: "wishlist",
      image: "/api/placeholder/300/200",
      tags: ["ML", "Python", "Data Science"],
      price: "$99.99"
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      author: "Alex Rodriguez",
      rating: 4.6,
      students: 20150,
      duration: "30 hours",
      level: "Intermediate",
      progress: 23,
      status: "running",
      image: "/api/placeholder/300/200",
      tags: ["React", "Node.js", "MongoDB"],
      price: "$119.99"
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (selectedTab === "all") return true;
    return course.status === selectedTab;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">Explore and continue your learning journey</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              className="glass-card pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-surface/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </motion.div>
      </div>

      {/* Tabs and Filters */}
      <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full lg:w-auto">
            <TabsList className="glass-card p-1 bg-surface/60">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                All Courses
              </TabsTrigger>
              <TabsTrigger value="running" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Running
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Completed
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Wishlist
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] glass-card border-white/10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[140px] glass-card border-white/10">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              className="group glass-card p-4 rounded-2xl hover:shadow-glow transition-smooth cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => navigate('/ai-teacher', { state: { videoId: course.id, videoTitle: course.title } })}
            >
              {/* Course Image */}
              <div className="aspect-video bg-gradient-glass rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {course.status === 'completed' ? 'Review' : 
                     course.status === 'running' ? 'Continue' : 'Start'}
                  </Button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={
                      course.status === 'completed' ? 'default' :
                      course.status === 'running' ? 'secondary' : 'outline'
                    }
                    className={
                      course.status === 'completed' ? 'bg-success text-white' :
                      course.status === 'running' ? 'bg-warning text-white' : 'bg-surface/80'
                    }
                  >
                    {course.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {course.status === 'running' && <Play className="w-3 h-3 mr-1" />}
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">by {course.author}</p>
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

                {/* Progress Bar */}
                {course.status === 'running' && (
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

                {/* Price and Level */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <Badge variant="outline" className="bg-surface/60 border-white/10">
                    {course.level}
                  </Badge>
                  <span className="font-semibold text-foreground">{course.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CoursesSection;