import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AITutorSquare = () => {
  const navigate = useNavigate();

  const handleAskNow = () => {
    navigate('/ai-teacher', { state: { openQA: true } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 h-80 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
          AI Tutor
        </h3>
      </div>

      {/* 3D Teacher Animation Area */}
      <div className="flex-1 flex items-center justify-center relative">
        <motion.div
          animate={{ 
            rotateY: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-32 h-32"
        >
          {/* Teacher Avatar */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 border-2 border-purple-400/30 flex items-center justify-center backdrop-blur-sm">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl"
            >
              🤖
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400/30 rounded-full backdrop-blur-sm border border-purple-400/50"
          />
          
          <motion.div
            animate={{ 
              y: [10, -10, 10],
              x: [-5, 5, -5]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400/30 rounded-full backdrop-blur-sm border border-blue-400/50"
          />
        </motion.div>

        {/* Thought Bubble */}
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1, 0.9]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 right-4 bg-surface/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
        >
          <p className="text-xs text-muted-foreground">Ready to help!</p>
        </motion.div>
      </div>

      {/* Ask Now Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm text-foreground hover:text-white transition-all duration-300"
          size="lg"
          onClick={handleAskNow}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Ask Now
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AITutorSquare;