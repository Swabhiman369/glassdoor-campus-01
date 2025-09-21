import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Share, 
  Edit,
  BookOpen,
  Eye,
  Clock,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const NotesSection = () => {
  const [viewMode, setViewMode] = useState("slides"); // "slides" or "reader"
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const slideNotes = [
    {
      id: 1,
      title: "React Hooks Introduction",
      content: "React Hooks are functions that let you use state and other React features without writing a class component.",
      category: "React",
      progress: 65,
      totalSlides: 24
    },
    {
      id: 2,
      title: "JavaScript ES6 Features",
      content: "ES6 introduced many new features including arrow functions, destructuring, template literals, and more.",
      category: "JavaScript",
      progress: 42,
      totalSlides: 18
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      content: "CSS Grid Layout is a two-dimensional layout system for the web that handles both columns and rows.",
      category: "CSS",
      progress: 88,
      totalSlides: 15
    }
  ];

  const fullNotes = [
    {
      id: 1,
      title: "Complete React Guide",
      category: "React",
      lastModified: "2 hours ago",
      readTime: "15 min",
      status: "updated"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      category: "JavaScript",  
      lastModified: "1 day ago",
      readTime: "22 min",
      status: "completed"
    },
    {
      id: 3,
      title: "Modern CSS Techniques",
      category: "CSS",
      lastModified: "3 days ago", 
      readTime: "18 min",
      status: "in-progress"
    }
  ];

  const currentNote = slideNotes[0]; // For demo purposes

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
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-muted-foreground">Review your study materials and documentation</p>
        </div>
        
        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
          <TabsList className="glass-card p-1 bg-surface/60">
            <TabsTrigger 
              value="slides" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              Slides
            </TabsTrigger>
            <TabsTrigger 
              value="reader" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Reader
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === "slides" ? (
          <motion.div
            key="slides"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Slide Viewer */}
            <div className="glass-card p-8 rounded-2xl">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Slide {currentSlide + 1} of {currentNote.totalSlides}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentSlide + 1) / currentNote.totalSlides) * 100)}% Complete
                  </span>
                </div>
                <Progress 
                  value={(currentSlide + 1) / currentNote.totalSlides * 100} 
                  className="h-2"
                />
              </div>

              {/* Current Slide Content */}
              <div className="glass-card p-12 rounded-2xl bg-gradient-glass min-h-[400px] flex flex-col justify-center">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6"
                >
                  <Badge className="bg-primary/20 text-primary border-primary/20">
                    {currentNote.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground">
                    {currentNote.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {currentNote.content}
                  </p>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="glass-card border-white/20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentSlide(Math.min(currentNote.totalSlides - 1, currentSlide + 1))}
                    disabled={currentSlide === currentNote.totalSlides - 1}
                    className="glass-card border-white/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="glass-card border-white/20"
                  >
                    {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    Auto-play
                  </Button>
                  <Button variant="outline" size="sm" className="glass-card border-white/20">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="glass-card border-white/20">
                    <Share className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Slide Notes List */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Slide Notes</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slideNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl border border-white/10 hover:shadow-glow transition-smooth cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="bg-surface/60 border-white/10">
                        {note.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {note.totalSlides} slides
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-foreground mb-2 group-hover:text-primary transition-smooth">
                      {note.title}
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{note.progress}%</span>
                      </div>
                      <Progress value={note.progress} className="h-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reader"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Documentation List */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Documentation</h3>
              <div className="space-y-3">
                {fullNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl border border-white/10 hover:shadow-glow transition-smooth cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                            {note.title}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>{note.category}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{note.readTime}</span>
                            </div>
                            <span>•</span>
                            <span>{note.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant="outline" 
                          className={`${
                            note.status === 'completed' ? 'bg-success/20 text-success border-success/20' :
                            note.status === 'updated' ? 'bg-warning/20 text-warning border-warning/20' :
                            'bg-primary/20 text-primary border-primary/20'
                          }`}
                        >
                          {note.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {note.status.replace('-', ' ')}
                        </Badge>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-smooth">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sample Documentation Viewer */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert max-w-none"
                >
                  <Badge className="bg-primary/20 text-primary border-primary/20 mb-4">
                    React
                  </Badge>
                  <h1 className="text-3xl font-bold text-foreground mb-6">
                    Complete React Guide
                  </h1>
                  
                  <div className="space-y-6 text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      React is a JavaScript library for building user interfaces. It was created by Facebook 
                      and is now maintained by Facebook and the community. React allows you to create 
                      reusable UI components.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                      Key Concepts
                    </h2>
                    
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Components: Building blocks of React applications</li>
                      <li>JSX: Syntax extension for JavaScript</li>
                      <li>Props: Data passed to components</li>
                      <li>State: Component's internal data</li>
                      <li>Hooks: Functions to use state and lifecycle features</li>
                    </ul>
                    
                    <div className="glass-card p-4 rounded-xl bg-surface/60 border border-white/10 mt-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Example: Function Component</h3>
                      <pre className="text-sm text-primary bg-surface/80 p-3 rounded-lg overflow-x-auto">
{`function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}`}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotesSection;