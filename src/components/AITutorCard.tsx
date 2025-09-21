import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AITutorCard = () => {
  const navigate = useNavigate();
  return (
    <div className="glass-card rounded-2xl p-6 h-64 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-4 right-4"
      >
        <Sparkles className="w-8 h-8 text-primary/40" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -3, 3, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-16 right-8"
      >
        <div className="w-4 h-4 bg-accent/30 rounded-full" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-gradient-primary rounded-xl"
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold">AI Tutor</h3>
            <p className="text-sm text-muted-foreground">Your Personal Learning Assistant</p>
          </div>
        </div>

        {/* 3D Teacher Animation Placeholder */}
        <div className="flex-1 flex items-center justify-center mb-4">
          <motion.div
            animate={{ 
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center relative"
          >
            {/* Teacher Avatar Placeholder */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center"
            >
              <div className="text-2xl">👨‍🏫</div>
            </motion.div>
            
            {/* Floating Books */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-lg"
            >
              📚
            </motion.div>
          </motion.div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-primary hover:shadow-glow-primary text-white rounded-xl"
          size="lg"
          onClick={() => navigate('/ai-teacher')}
        >
          Start Session
        </Button>
      </div>
    </div>
  );
};

export default AITutorCard;