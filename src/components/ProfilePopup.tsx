import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Mail, School, BookOpen, Trophy, Settings, LogOut, X } from "lucide-react";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePopup = ({ isOpen, onClose }: ProfilePopupProps) => {
  const subjects = [
    { name: "Mathematics", progress: 85, color: "bg-green-500" },
    { name: "Physics", progress: 72, color: "bg-blue-500" },
    { name: "Chemistry", progress: 68, color: "bg-purple-500" },
    { name: "Biology", progress: 91, color: "bg-emerald-500" },
  ];

  const achievements = [
    { title: "First Test Completed", date: "2 days ago" },
    { title: "Week Streak", date: "1 week ago" },
    { title: "Top Performer", date: "2 weeks ago" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="fixed top-20 right-6 w-96 max-h-[80vh] overflow-y-auto glass-card rounded-2xl p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Profile</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-surface-muted rounded-xl"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/api/placeholder/64/64" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">Arjun Sharma</h3>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  arjun.sharma@email.com
                </p>
                <p className="text-muted-foreground flex items-center mt-1">
                  <School className="w-4 h-4 mr-2" />
                  Delhi Public School
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center glass-card p-3 rounded-xl">
                <div className="text-2xl font-bold text-green-400">85%</div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
              <div className="text-center glass-card p-3 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">124</div>
                <div className="text-xs text-muted-foreground">Tests Done</div>
              </div>
              <div className="text-center glass-card p-3 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">7</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>

            {/* Subjects Progress */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Subject Progress
              </h4>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <Progress 
                      value={subject.progress} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Recent Achievements
              </h4>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{achievement.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.date}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-xl">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl text-red-400 hover:text-red-300">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfilePopup;