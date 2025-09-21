import { motion } from "framer-motion";
import { Trophy, Clock, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProgressOverview from "./ProgressOverview";

const SidePanel = () => {

  const leaderboard = [
    { name: "Arjun Sharma", score: 2580, avatar: "👨‍🎓", change: "+12" },
    { name: "Priya Singh", score: 2450, avatar: "👩‍🎓", change: "+8" },
    { name: "Rahul Kumar", score: 2340, avatar: "👨‍💻", change: "-3" },
    { name: "Sneha Patel", score: 2210, avatar: "👩‍💼", change: "+15" },
    { name: "Vikram Shah", score: 2180, avatar: "👨‍🔬", change: "+5" },
  ];

  const studyTimeData = [
    { day: "Mon", hours: 3.5 },
    { day: "Tue", hours: 4.2 },
    { day: "Wed", hours: 2.8 },
    { day: "Thu", hours: 5.1 },
    { day: "Fri", hours: 3.9 },
    { day: "Sat", hours: 6.2 },
    { day: "Sun", hours: 4.5 },
  ];

  const notifications = [
    { title: "New Test Available", time: "2h ago", type: "test" },
    { title: "Assignment Due Tomorrow", time: "4h ago", type: "assignment" },
    { title: "Live Session Starting", time: "1h ago", type: "live" },
  ];

  return (
    <div className="space-y-6 sticky top-24 overflow-hidden">
      {/* Progress Overview */}
      <ProgressOverview />

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Leaderboard
          </h3>
          <Badge variant="secondary" className="text-xs">Weekly</Badge>
        </div>
        
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div key={user.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium w-6">{index + 1}</div>
                <div className="text-lg">{user.avatar}</div>
                <div>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.score} pts</div>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                user.change.startsWith('+') 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-red-400 bg-red-400/10'
              }`}>
                {user.change}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Study Time Graph */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Study Time
          </h3>
          <Badge variant="secondary" className="text-xs">This Week</Badge>
        </div>
        
        <div className="space-y-2">
          {studyTimeData.map((day) => (
            <div key={day.day} className="flex items-center justify-between">
              <span className="text-sm w-12">{day.day}</span>
              <div className="flex-1 mx-3">
                <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${(day.hours / 6) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground w-8">{day.hours}h</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Notifications
          </h3>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'test' ? 'bg-red-400' :
                notification.type === 'assignment' ? 'bg-yellow-400' :
                'bg-green-400'
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{notification.title}</div>
                <div className="text-xs text-muted-foreground">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SidePanel;