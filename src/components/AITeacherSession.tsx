import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Maximize,
  Send,
  Download,
  ExternalLink,
  BookOpen,
  Image,
  Video,
  FileText,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AITeacherSession = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [qaOpen, setQaOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [storyboardPosition, setStoryboardPosition] = useState({ x: 20, y: 20 });
  const [currentVideo, setCurrentVideo] = useState(null);

  // Handle navigation state
  useEffect(() => {
    if (location.state) {
      const { openQA, videoId, videoTitle } = location.state;
      
      // Auto-open Q&A section if coming from "Ask Now"
      if (openQA) {
        setQaOpen(true);
      }
      
      // Load video if coming from video click
      if (videoId && videoTitle) {
        setCurrentVideo({ id: videoId, title: videoTitle });
      }
    }
  }, [location.state]);

  const lessonTopics = [
    { id: 1, title: "Introduction to Algebra", current: false, completed: true },
    { id: 2, title: "Linear Equations", current: true, completed: false },
    { id: 3, title: "Quadratic Functions", current: false, completed: false },
    { id: 4, title: "Practice Problems", current: false, completed: false }
  ];

  const resources = [
    {
      type: "video",
      title: "Linear Equations Explained",
      description: "Khan Academy - 15 min",
      icon: Video,
      link: "#"
    },
    {
      type: "image",
      title: "Equation Solving Steps",
      description: "Visual diagram",
      icon: Image,
      link: "#"
    },
    {
      type: "article",
      title: "Advanced Linear Algebra",
      description: "MIT OpenCourseWare",
      icon: BookOpen,
      link: "#"
    },
    {
      type: "worksheet",
      title: "Practice Worksheet",
      description: "20 problems with solutions",
      icon: FileText,
      download: true
    }
  ];

  const recentQA = [
    {
      question: "How do I solve for x in 2x + 5 = 11?",
      answer: "Subtract 5 from both sides: 2x = 6, then divide by 2: x = 3",
      timestamp: "2 min ago"
    },
    {
      question: "What's the difference between linear and quadratic equations?",
      answer: "Linear equations have variables to the first power (x), while quadratic equations have variables to the second power (x²).",
      timestamp: "5 min ago"
    }
  ];

  const handleQuestionSubmit = () => {
    if (currentQuestion.trim()) {
      // Handle question submission
      setCurrentQuestion("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Main Video Area */}
        <div className={`flex-1 relative transition-all duration-300 ${sidebarOpen ? 'mr-80' : 'mr-0'}`}>
          {/* Video Player */}
          <div className="relative h-full bg-black flex items-center justify-center">
            {/* Placeholder for 3D AI Teacher */}
            <div className="w-full h-full bg-gradient-to-br from-surface/20 to-surface/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-16 h-16 text-primary" />
                </div>
                <p className="text-lg font-medium">
                  {currentVideo ? `Loading: ${currentVideo.title}` : 'AI Teacher Rendering...'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentVideo ? 'Video will play here' : '3D Avatar will appear here'}
                </p>
              </div>
            </div>

            {/* Floating Storyboard */}
            <motion.div
              drag
              dragMomentum={false}
              className="absolute bg-card/95 backdrop-blur-md border border-border rounded-lg p-4 cursor-move shadow-glow"
              style={{
                left: storyboardPosition.x,
                top: storyboardPosition.y,
                width: '300px',
                minHeight: '200px'
              }}
              onDrag={(_, info) => {
                setStoryboardPosition({
                  x: Math.max(0, storyboardPosition.x + info.delta.x),
                  y: Math.max(0, storyboardPosition.y + info.delta.y)
                });
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Digital Study Board</h3>
                <Badge variant="secondary" className="text-xs">Live</Badge>
              </div>
              
              <div className="space-y-2">
                {lessonTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-2 rounded text-xs transition-colors ${
                      topic.current
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : topic.completed
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-background/50'
                    }`}
                  >
                    {topic.title}
                    {topic.completed && <span className="ml-2">✓</span>}
                    {topic.current && <span className="ml-2">▶</span>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  ⏸️
                </Button>
                <span className="text-white text-sm">15:32 / 45:20</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFullscreen(!fullscreen)}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resources Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-10"
            >
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Resources</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <Card key={index} className="p-3 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          <resource.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {resource.description}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {resource.download && (
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="w-3 h-3" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Toggle (when closed) */}
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="fixed right-4 top-4 z-20 bg-card border border-border shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Q&A Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
        <div className="flex items-center justify-between p-3">
          <h3 className="font-semibold">Doubts & Q&A</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQaOpen(!qaOpen)}
          >
            {qaOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
        </div>

        <AnimatePresence>
          {qaOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator />
              <div className="p-4 max-h-80 overflow-y-auto">
                {/* Question Input */}
                <div className="flex space-x-2 mb-4">
                  <Textarea
                    placeholder="Ask the AI teacher a question..."
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    className="flex-1 min-h-[40px] resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleQuestionSubmit}
                    disabled={!currentQuestion.trim()}
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Recent Q&A */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Recent Questions</h4>
                  {recentQA.map((qa, index) => (
                    <div key={index} className="space-y-2">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium">Q: {qa.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">{qa.timestamp}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg ml-4">
                        <p className="text-sm">A: {qa.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AITeacherSession;