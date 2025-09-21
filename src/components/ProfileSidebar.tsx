import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  X,
  User,
  Mail,
  School,
  BookOpen,
  Award,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Clock,
  Target,
  Star
} from "lucide-react";
import { useState } from "react";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar = ({ isOpen, onClose }: ProfileSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['subjects']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    institution: "MIT Computer Science",
    enrollmentDate: "September 2023",
    avatar: "/api/placeholder/80/80",
    grade: "Junior",
    gpa: 3.85,
    studyStreak: 12,
    avgStudyTime: "4.2 hours/day"
  };

  const subjects = [
    { name: "Computer Science", progress: 78, grade: "A-" },
    { name: "Mathematics", progress: 85, grade: "A" },
    { name: "Physics", progress: 72, grade: "B+" },
    { name: "Statistics", progress: 91, grade: "A+" }
  ];

  const achievements = [
    { name: "Study Streak Master", icon: "🔥", description: "15 days continuous study" },
    { name: "Quiz Champion", icon: "🏆", description: "100 quizzes completed" },
    { name: "Speed Learner", icon: "⚡", description: "Completed 5 courses in 30 days" }
  ];

  const sidebarVariants = {
    closed: { x: "-100%" },
    open: { x: 0 }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 lg:w-96 glass-card border-r border-white/10 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-surface/60"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* User Info */}
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground">{userProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              </div>
            </div>

            {/* Basic Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <School className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Institution</p>
                  <p className="text-foreground font-medium">{userProfile.institution}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Grade & GPA</p>
                  <p className="text-foreground font-medium">{userProfile.grade} • {userProfile.gpa}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Since</p>
                  <p className="text-foreground font-medium">{userProfile.enrollmentDate}</p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Subjects Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection('subjects')}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h4 className="text-lg font-semibold text-foreground">Subjects</h4>
                {expandedSections.includes('subjects') ? 
                  <ChevronDown className="w-4 h-4 text-muted-foreground" /> :
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                }
              </button>

              <AnimatePresence>
                {expandedSections.includes('subjects') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    {subjects.map((subject, index) => (
                      <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-4 rounded-xl border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{subject.name}</span>
                          <Badge variant="outline" className="bg-success/20 text-success border-success/20">
                            {subject.grade}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Separator className="bg-white/10" />

            {/* Study Characteristics */}
            <div className="p-6">
              <button
                onClick={() => toggleSection('study')}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h4 className="text-lg font-semibold text-foreground">Study Stats</h4>
                {expandedSections.includes('study') ? 
                  <ChevronDown className="w-4 h-4 text-muted-foreground" /> :
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                }
              </button>

              <AnimatePresence>
                {expandedSections.includes('study') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="glass-card p-4 rounded-xl text-center">
                      <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">{userProfile.studyStreak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">4.2h</div>
                      <div className="text-xs text-muted-foreground">Avg/Day</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <Target className="w-6 h-6 text-warning mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">87%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <Star className="w-6 h-6 text-accent mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">2.4k</div>
                      <div className="text-xs text-muted-foreground">XP Points</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Separator className="bg-white/10" />

            {/* Achievements */}
            <div className="p-6">
              <button
                onClick={() => toggleSection('achievements')}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h4 className="text-lg font-semibold text-foreground">Achievements</h4>
                {expandedSections.includes('achievements') ? 
                  <ChevronDown className="w-4 h-4 text-muted-foreground" /> :
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                }
              </button>

              <AnimatePresence>
                {expandedSections.includes('achievements') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3"
                  >
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-3 rounded-xl border border-white/10 flex items-center space-x-3"
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <p className="font-medium text-foreground text-sm">{achievement.name}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Separator className="bg-white/10" />

            {/* Settings */}
            <div className="p-6 space-y-2">
              <h4 className="text-lg font-semibold text-foreground mb-4">Settings</h4>
              
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-surface/60">
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-surface/60">
                <Shield className="w-4 h-4 mr-3" />
                Privacy & Security
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-surface/60">
                <Settings className="w-4 h-4 mr-3" />
                Preferences
              </Button>
              
              <Separator className="bg-white/10 my-4" />
              
              <Button variant="ghost" className="w-full justify-start text-error hover:bg-error/10">
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSidebar;