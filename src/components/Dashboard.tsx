import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Users,
  Bookmark,
  Eye,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import ArticleSlides from "./ArticleSlides";
import AITutorSquare from "./AITutorSquare";
import SidePanel from "./SidePanel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const continueWatching = [
    {
      id: 1,
      title: "Advanced Calculus",
      instructor: "Dr. Sharma",
      progress: 68,
      thumbnail: "/api/placeholder/160/90",
      duration: "2h 45m left"
    },
    {
      id: 2,
      title: "Organic Chemistry",
      instructor: "Prof. Patel",
      progress: 45,
      thumbnail: "/api/placeholder/160/90",
      duration: "4h 12m left"
    },
    {
      id: 3,
      title: "Physics Mechanics",
      instructor: "Dr. Kumar",
      progress: 82,
      thumbnail: "/api/placeholder/160/90",
      duration: "1h 23m left"
    },
    {
      id: 4,
      title: "English Literature",
      instructor: "Ms. Singh",
      progress: 30,
      thumbnail: "/api/placeholder/160/90",
      duration: "5h 45m left"
    },
    {
      id: 5,
      title: "World History",
      instructor: "Prof. Gupta",
      progress: 70,
      thumbnail: "/api/placeholder/160/90",
      duration: "2h 15m left"
    },
    {
      id: 6,
      title: "Data Structures",
      instructor: "Prof. Verma",
      progress: 55,
      thumbnail: "/api/placeholder/160/90",
      duration: "3h 30m left"
    },
    {
      id: 7,
      title: "Environmental Science",
      instructor: "Dr. Joshi",
      progress: 89,
      thumbnail: "/api/placeholder/160/90",
      duration: "45m left"
    },
    {
      id: 8,
      title: "Statistics",
      instructor: "Prof. Nair",
      progress: 37,
      thumbnail: "/api/placeholder/160/90",
      duration: "4h 50m left"
    }
  ];

  const recommendedTopics = [
    {
      id: 1,
      title: "Quantum Mechanics",
      category: "Physics",
      difficulty: "Advanced",
      backgroundImage: "/api/placeholder/300/180",
      isNew: true
    },
    {
      id: 2,
      title: "Molecular Biology",
      category: "Biology",
      difficulty: "Intermediate",
      backgroundImage: "/api/placeholder/300/180",
      isNew: false
    },
    {
      id: 3,
      title: "Linear Algebra",
      category: "Mathematics",
      difficulty: "Intermediate",
      backgroundImage: "/api/placeholder/300/180",
      isNew: true
    },
    {
      id: 4,
      title: "Renaissance Art",
      category: "History",
      difficulty: "Beginner",
      backgroundImage: "/api/placeholder/300/180",
      isNew: false
    },
    {
      id: 5,
      title: "Data Structures",
      category: "Computer Science",
      difficulty: "Advanced",
      backgroundImage: "/api/placeholder/300/180",
      isNew: true
    },
    {
      id: 6,
      title: "Environmental Science",
      category: "Science",
      difficulty: "Beginner",
      backgroundImage: "/api/placeholder/300/180",
      isNew: false
    },
    {
      id: 7,
      title: "Machine Learning Basics",
      category: "AI/ML",
      difficulty: "Intermediate",
      backgroundImage: "/api/placeholder/300/180",
      isNew: true
    },
    {
      id: 8,
      title: "Digital Marketing",
      category: "Business",
      difficulty: "Beginner",
      backgroundImage: "/api/placeholder/300/180",
      isNew: false
    }
  ];

  const subjects = [
    { name: "Mathematics", progress: 85, icon: "📐", completed: true },
    { name: "Physics", progress: 72, icon: "⚛️", completed: true },
    { name: "Chemistry", progress: 68, icon: "🧪", completed: false },
    { name: "Biology", progress: 91, icon: "🧬", completed: true },
    { name: "English", progress: 45, icon: "📚", completed: false },
    { name: "History", progress: 78, icon: "🏺", completed: true },
    { name: "Computer Science", progress: 63, icon: "💻", completed: false },
    { name: "Geography", progress: 40, icon: "🌍", completed: false },
    { name: "Economics", progress: 55, icon: "📊", completed: false },
    { name: "Political Science", progress: 0, icon: "🏛️", completed: false }
  ];

  const [showAllTests, setShowAllTests] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const upcomingTests = [
    { id: 1, title: "Calculus Final Exam", subject: "Mathematics", date: "Oct 25", time: "10:00 AM" },
    { id: 2, title: "Organic Chemistry Quiz", subject: "Chemistry", date: "Oct 28", time: "2:00 PM" },
    { id: 3, title: "Physics Lab Test", subject: "Physics", date: "Nov 2", time: "11:00 AM" },
    { id: 4, title: "Biology Mid-term", subject: "Biology", date: "Nov 5", time: "9:00 AM" },
    { id: 5, title: "English Literature Essay", subject: "English", date: "Nov 8", time: "1:00 PM" },
    { id: 6, title: "History Research Project", subject: "History", date: "Nov 12", time: "3:00 PM" },
    { id: 7, title: "Programming Assignment", subject: "CS", date: "Nov 15", time: "11:30 AM" }
  ];

  const freeEvents = [
    {
      id: 1,
      title: "AI in Education Webinar",
      date: "Oct 30",
      time: "7:00 PM",
      backgroundImage: "/api/placeholder/300/150",
      attendees: 1250
    },
    {
      id: 2,
      title: "Study Techniques Workshop",
      date: "Nov 3",
      time: "5:00 PM",
      backgroundImage: "/api/placeholder/300/150",
      attendees: 890
    },
    {
      id: 3,
      title: "Career Guidance Session",
      date: "Nov 7",
      time: "6:30 PM",
      backgroundImage: "/api/placeholder/300/150",
      attendees: 2100
    },
    {
      id: 4,
      title: "Science Fair Competition",
      date: "Nov 10",
      time: "4:00 PM",
      backgroundImage: "/api/placeholder/300/150",
      attendees: 850
    },
    {
      id: 5,
      title: "Programming Bootcamp",
      date: "Nov 15",
      time: "10:00 AM",
      backgroundImage: "/api/placeholder/300/150",
      attendees: 1450
    }
  ];

  const displayedTests = showAllTests ? upcomingTests : upcomingTests.slice(0, 5);
  const displayedSubjects = showAllSubjects ? subjects : subjects.slice(0, 5);

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Top Row - Articles and AI Tutor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ArticleSlides />
              <AITutorSquare />
            </div>

            {/* Continue Watching */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Play className="w-5 h-5 mr-2 text-green-500" />
                  Continue Watching
                </h3>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
                {continueWatching.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-xl p-3 cursor-pointer flex-shrink-0 w-44 sm:w-48"
                    onClick={() => navigate('/ai-teacher', { state: { videoId: course.id, videoTitle: course.title } })}
                  >
                    <div className="relative mb-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                    <Progress 
                      value={course.progress} 
                      className="h-1 mb-2"
                    />
                    <p className="text-xs text-muted-foreground">{course.duration}</p>
                  </motion.div>
                ))}
                </div>
              </div>
            </motion.div>

            {/* Recommended Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Recommended Topics
                </h3>
                <Button variant="ghost" size="sm">
                  Explore All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    whileHover={{ scale: 1.02 }}
                    className="relative h-32 rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate('/ai-teacher', { state: { videoId: topic.id, videoTitle: topic.title } })}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${topic.backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all" />
                    {topic.isNew && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        New
                      </Badge>
                    )}
                    <div className="absolute bottom-0 p-4 text-white">
                      <div className="text-xs text-gray-300 mb-1">{topic.category}</div>
                      <h4 className="font-semibold mb-1">{topic.title}</h4>
                      <div className="text-xs text-gray-400">{topic.difficulty}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Row - Subjects, Tests, Events */}
            <div className="space-y-6">
              {/* Subjects Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
                    Subjects
                  </h3>
                </div>
                <div className="space-y-3">
                  {displayedSubjects.map((subject) => (
                    <div key={subject.name} className="flex items-center space-x-3">
                      <div className="text-lg">{subject.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{subject.name}</span>
                           <span 
                            className={`text-sm ${
                              subject.completed 
                                ? 'text-progress-complete' 
                                : 'text-progress-incomplete'
                            }`}
                          >
                            {subject.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-progress-incomplete/20 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              subject.completed 
                                ? 'bg-progress-complete' 
                                : 'bg-progress-incomplete'
                            }`}
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {subjects.length > 5 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllSubjects(!showAllSubjects)}
                      className="w-full mt-2"
                    >
                      {showAllSubjects ? 'Show Less' : 'Show More'}
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Upcoming Tests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Tests
                  </h3>
                </div>
                <div className="space-y-3">
                  {displayedTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{test.title}</div>
                        <div className="text-xs text-muted-foreground">{test.subject}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{test.date}</div>
                        <div className="text-xs text-muted-foreground">{test.time}</div>
                      </div>
                    </div>
                  ))}
                  {upcomingTests.length > 5 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllTests(!showAllTests)}
                      className="w-full mt-2"
                    >
                      {showAllTests ? 'Show Less' : 'Show More'}
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Free Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-pink-500" />
                    Free Events
                  </h3>
                </div>
                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
                    {freeEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.02 }}
                        className="relative h-24 w-72 sm:w-80 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${event.backgroundImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent group-hover:from-black/90 transition-all" />
                        <div className="absolute inset-0 p-3 text-white flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2">{event.title}</h4>
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="text-xs">
                              <div>{event.date} • {event.time}</div>
                            </div>
                            <div className="text-xs flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {event.attendees}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 hidden lg:block">
            <SidePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;