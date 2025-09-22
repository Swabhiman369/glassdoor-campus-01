import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useState, useMemo } from "react";
import CourseCard from "@/components/CourseCard";
import SubjectCard from "@/components/SubjectCard";
import { useCourseData, Course } from "@/hooks/useCourseData";

// Import course images
import calculusImg from "@/assets/courses/calculus.jpg";
import chemistryImg from "@/assets/courses/chemistry.jpg";
import physicsImg from "@/assets/courses/physics.jpg";
import literatureImg from "@/assets/courses/literature.jpg";
import historyImg from "@/assets/courses/history.jpg";
import dataStructuresImg from "@/assets/courses/data-structures.jpg";
import environmentalImg from "@/assets/courses/environmental.jpg";
import statisticsImg from "@/assets/courses/statistics.jpg";
import quantumMechanicsImg from "@/assets/topics/quantum-mechanics.jpg";
import molecularBiologyImg from "@/assets/topics/molecular-biology.jpg";
import linearAlgebraImg from "@/assets/topics/linear-algebra.jpg";
import renaissanceArtImg from "@/assets/topics/renaissance-art.jpg";
import machineLearningImg from "@/assets/topics/machine-learning.jpg";
import digitalMarketingImg from "@/assets/topics/digital-marketing.jpg";

interface CoursesSectionProps {
  mode?: 'all' | 'wishlist' | 'enrolled';
}

const CoursesSection = ({ mode = 'all' }: CoursesSectionProps) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    courses,
    subjects,
    enrolledCourses,
    wishlistCourses,
    enrollCourse,
    toggleWishlist
  } = useCourseData();

  // Filter courses based on tab, search, and filters
  const filteredCourses = useMemo(() => {
    let filtered: Course[] = [];

    // Tab filtering
    switch (selectedTab) {
      case "all":
        filtered = courses;
        break;
      case "subjects":
        // For subjects tab, we'll show subjects instead of courses
        return [];
      case "mycourses":
        filtered = enrolledCourses;
        break;
      case "wishlist":
        filtered = wishlistCourses;
        break;
      default:
        filtered = courses;
    }

    // Search filtering
    if (searchQuery.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Level filtering
    if (filterBy !== "all") {
      if (filterBy === "free") {
        filtered = filtered.filter(course => course.isFree);
      } else if (filterBy === "paid") {
        filtered = filtered.filter(course => !course.isFree);
      } else {
        filtered = filtered.filter(course => 
          course.level.toLowerCase() === filterBy.toLowerCase()
        );
      }
    }

    // Sorting
    switch (sortBy) {
      case "recent":
        filtered = [...filtered].sort((a, b) => 
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        );
        break;
      case "priceLowToHigh":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered = [...filtered].sort((a, b) => b.students - a.students);
        break;
      default:
        break;
    }

    return filtered;
  }, [courses, enrolledCourses, wishlistCourses, selectedTab, searchQuery, filterBy, sortBy]);

  const handleViewCourses = (subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setSearchQuery(subject.name);
      setSelectedTab("all");
    }
  };

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
      className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Explore and continue your learning journey</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-card pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-surface/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Tabs and Filters */}
      <motion.div variants={itemVariants} className="glass-card p-4 sm:p-6 rounded-2xl">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full xl:w-auto">
            <TabsList className="glass-card p-1 bg-surface/60 w-full grid grid-cols-4 sm:w-auto sm:flex">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="subjects" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Subjects
              </TabsTrigger>
              <TabsTrigger value="mycourses" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                My Courses
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                Wishlist
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[160px] glass-card border-white/10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-[140px] glass-card border-white/10">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Based on Selected Tab */}
        {selectedTab === "subjects" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onViewCourses={handleViewCourses}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={enrollCourse}
                  onToggleWishlist={toggleWishlist}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchQuery 
                    ? `No courses found for "${searchQuery}"`
                    : selectedTab === "mycourses" 
                      ? "You haven't enrolled in any courses yet"
                      : selectedTab === "wishlist"
                        ? "Your wishlist is empty"
                        : "No courses available"
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CoursesSection;