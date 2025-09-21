import { motion } from "framer-motion";
import DynamicNavbar from "@/components/DynamicNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  School, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut, 
  Calendar,
  Target,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  const subjects = [
    { name: "Mathematics", progress: 85, color: "bg-success", level: "Advanced" },
    { name: "Physics", progress: 72, color: "bg-primary", level: "Intermediate" },
    { name: "Chemistry", progress: 68, color: "bg-warning", level: "Intermediate" },
    { name: "Biology", progress: 91, color: "bg-success", level: "Advanced" },
    { name: "English", progress: 78, color: "bg-primary", level: "Advanced" },
    { name: "History", progress: 55, color: "bg-warning", level: "Beginner" },
  ];

  const achievements = [
    { title: "First Test Completed", date: "2 days ago", icon: Target, color: "text-success" },
    { title: "Week Streak", date: "1 week ago", icon: TrendingUp, color: "text-warning" },
    { title: "Top Performer", date: "2 weeks ago", icon: Award, color: "text-primary" },
    { title: "Perfect Score", date: "3 weeks ago", icon: Trophy, color: "text-success" },
    { title: "Speed Demon", date: "1 month ago", icon: Zap, color: "text-warning" },
  ];

  const stats = [
    { label: "Tests Completed", value: "124", icon: Target, color: "text-success" },
    { label: "Average Score", value: "85%", icon: Trophy, color: "text-warning" },
    { label: "Study Streak", value: "7 days", icon: TrendingUp, color: "text-primary" },
    { label: "Hours Studied", value: "245", icon: BookOpen, color: "text-success" },
  ];

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
    <div className="min-h-screen bg-background">
      <DynamicNavbar 
        activeTab="profile"
        onTabChange={handleTabChange}
        onProfileClick={() => {}} // No-op since we're already on profile page
      />
      
      <main className="max-w-7xl mx-auto hide-scrollbar">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your progress</p>
          </motion.div>

          {/* Profile Info Card */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/api/placeholder/96/96" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Arjun Sharma</CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        arjun.sharma@email.com
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <School className="w-4 h-4 mr-2" />
                        Delhi Public School
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Joined October 2024
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" className="glass-card border-white/20">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="glass-card border-white/20 text-error hover:text-error">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle>Statistics Overview</CardTitle>
                <CardDescription>Your learning progress at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      className="text-center glass-card p-6 rounded-xl"
                    >
                      <div className="flex items-center justify-center mb-3">
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Subject Progress */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Subject Progress
                  </CardTitle>
                  <CardDescription>Your performance across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {subjects.map((subject, index) => (
                      <motion.div
                        key={subject.name}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-foreground">{subject.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs bg-surface/60 border-white/10">
                              {subject.level}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                        </div>
                        <Progress 
                          value={subject.progress} 
                          className="h-3"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest accomplishments and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center space-x-4 glass-card p-4 rounded-xl"
                      >
                        <div className={`p-2 rounded-lg bg-surface/60`}>
                          <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.date}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;