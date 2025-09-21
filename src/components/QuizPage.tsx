import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  BookmarkPlus,
  HelpCircle
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizPageProps {
  testTitle?: string;
  questions?: Question[];
  onExit?: () => void;
  onSubmit?: (answers: (number | null)[]) => void;
}

const QuizPage = ({ 
  testTitle = "React Component Lifecycle",
  questions = [
    {
      id: 1,
      question: "Which method is called after a React component is mounted to the DOM?",
      options: [
        "componentWillMount()",
        "componentDidMount()",
        "componentWillUpdate()",
        "componentDidUpdate()"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "What is the purpose of useEffect hook in React?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create custom hooks",
        "To optimize component rendering"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Which lifecycle method is called before a component is unmounted?",
      options: [
        "componentWillUnmount()",
        "componentDidUnmount()",
        "componentWillDestroy()",
        "componentDidDestroy()"
      ],
      correctAnswer: 0
    }
  ],
  onExit,
  onSubmit
}: QuizPageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [isBookmarked, setIsBookmarked] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = answers[currentQuestion] !== null;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(answers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background p-4 lg:p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onExit}
                className="hover:bg-surface/60"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">{testTitle}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`hover:bg-surface/60 ${isBookmarked ? 'text-primary' : ''}`}
              >
                <BookmarkPlus className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Question */}
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl mb-6">
          <div className="flex items-start space-x-4 mb-8">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium text-foreground leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
            </div>
          </div>

          {/* Options */}
          <RadioGroup 
            value={answers[currentQuestion]?.toString() || ""} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-4"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer group"
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center space-x-4">
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    className="text-primary border-primary/30"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 text-foreground font-medium cursor-pointer group-hover:text-primary transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-surface/60 text-xs font-semibold text-muted-foreground mr-3 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Label>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-white/10 hover:bg-surface/60"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="hover:bg-surface/60"
              >
                <Flag className="w-4 h-4 mr-2" />
                Flag for Review
              </Button>
              
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-primary hover:shadow-glow"
                  disabled={!hasAnswered}
                >
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-primary hover:shadow-glow"
                  disabled={!hasAnswered}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Question Navigator */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`
                  w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200
                  ${index === currentQuestion 
                    ? 'bg-primary text-primary-foreground shadow-glow' 
                    : answers[index] !== null
                    ? 'bg-success/20 text-success border border-success/20'
                    : 'bg-surface/60 text-muted-foreground hover:bg-surface border border-white/10'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizPage;