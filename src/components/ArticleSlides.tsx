import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  topic: string;
  description: string;
  category: string;
  readTime: string;
  backgroundImage: string;
}

const ArticleSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const articles: Article[] = [
    {
      id: 1,
      topic: "Quantum Physics Basics",
      description: "Understanding the fundamental principles of quantum mechanics and wave-particle duality",
      category: "Physics",
      readTime: "5 min read",
      backgroundImage: "/api/placeholder/400/200"
    },
    {
      id: 2,
      topic: "Organic Chemistry Reactions",
      description: "Master the key organic reactions including substitution, elimination, and addition mechanisms",
      category: "Chemistry",
      readTime: "7 min read",
      backgroundImage: "/api/placeholder/400/200"
    },
    {
      id: 3,
      topic: "Calculus Integration",
      description: "Learn advanced integration techniques including substitution and integration by parts",
      category: "Mathematics",
      readTime: "6 min read",
      backgroundImage: "/api/placeholder/400/200"
    },
    {
      id: 4,
      topic: "Cell Biology",
      description: "Explore cellular structures, organelles, and their functions in living organisms",
      category: "Biology",
      readTime: "4 min read",
      backgroundImage: "/api/placeholder/400/200"
    },
    {
      id: 5,
      topic: "World War II History",
      description: "Understanding the causes, major battles, and consequences of the Second World War",
      category: "History",
      readTime: "8 min read",
      backgroundImage: "/api/placeholder/400/200"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % articles.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, articles.length]);

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Simulate opening full documentation
    console.log(`Opening full documentation for: ${articles[index].topic}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
    setIsAutoPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 h-80"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold">Short Notes</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="w-8 h-8 p-0 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="w-8 h-8 p-0 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Slides */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleSlideClick(currentSlide)}
          >
            <div
              className="w-full h-full bg-cover bg-center relative rounded-xl"
              style={{ backgroundImage: `url(${articles[currentSlide].backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-xs text-blue-300 mb-1">{articles[currentSlide].category}</div>
                <h4 className="font-semibold text-lg mb-2 line-clamp-2">{articles[currentSlide].topic}</h4>
                <p className="text-sm text-gray-300 line-clamp-2 mb-2">{articles[currentSlide].description}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {articles[currentSlide].readTime}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-blue-400 w-6'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ArticleSlides;