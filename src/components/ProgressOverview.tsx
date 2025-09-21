import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy } from "lucide-react";

const ProgressOverview = () => {
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
    { name: "Art", progress: 82, icon: "🎨", completed: true }
  ];

  const overallProgress = Math.round(subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Progress Overview
        </h3>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="hsl(var(--progress-incomplete))"
              strokeWidth="8"
              fill="none"
              className="opacity-20"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="hsl(var(--progress-complete))"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-progress-complete">{overallProgress}%</div>
              <div className="text-xs text-muted-foreground">Overall</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="text-lg">{subject.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{subject.name}</span>
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressOverview;