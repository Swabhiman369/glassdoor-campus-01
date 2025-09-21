import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Target, 
  Clock, 
  CheckCircle, 
  BookmarkPlus,
  Shuffle,
  TrendingUp,
  Award,
  Zap,
  Filter,
  Search
} from "lucide-react";
import { useState } from "react";
import QuizPage from "./QuizPage";

const TestsSection = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterTopic, setFilterTopic] = useState("all");
  const [activeQuiz, setActiveQuiz] = useState<any>(null);

  const progressStats = {
    solved: 145,
    attempted: 23,
    accuracy: 87,
    totalQuestions: 500
  };

  const tests = [
    {
      id: 1,
      title: "React Component Lifecycle",
      topic: "React",
      difficulty: "Medium",
      avgTime: "12 min",
      submissions: 2340,
      askedIn: ["Google", "Facebook"],
      status: "solved",
      userScore: 95,
      attempts: 2
    },
    {
      id: 2,
      title: "Binary Search Algorithm",
      topic: "Algorithms",
      difficulty: "Easy",
      avgTime: "8 min",
      submissions: 5670,
      askedIn: ["Amazon", "Microsoft"],
      status: "attempted",
      userScore: 73,
      attempts: 1
    },
    {
      id: 3,
      title: "Database Optimization Strategies",
      topic: "Database",
      difficulty: "Hard",
      avgTime: "25 min",
      submissions: 890,
      askedIn: ["Netflix", "Uber"],
      status: "bookmarked",
      userScore: null,
      attempts: 0
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox",
      topic: "CSS",
      difficulty: "Medium",
      avgTime: "15 min",
      submissions: 3450,
      askedIn: ["Adobe", "Figma"],
      status: "not-attempted",
      userScore: null,
      attempts: 0
    }
  ];

  const filteredTests = tests.filter(test => {
    if (selectedTab === "all") return true;
    if (selectedTab === "attempted") return test.status === "attempted" || test.status === "solved";
    if (selectedTab === "solved") return test.status === "solved";
    if (selectedTab === "bookmarks") return test.status === "bookmarked";
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success/20 text-success border-success/20';
      case 'medium': return 'bg-warning/20 text-warning border-warning/20';
      case 'hard': return 'bg-error/20 text-error border-error/20';
      default: return 'bg-surface/60 border-white/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'bg-success/20 text-success border-success/20';
      case 'attempted': return 'bg-warning/20 text-warning border-warning/20';
      case 'bookmarked': return 'bg-primary/20 text-primary border-primary/20';
      default: return 'bg-surface/60 border-white/10';
    }
  };

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

  // Show quiz page if a test is selected
  if (activeQuiz) {
    return (
      <QuizPage
        testTitle={activeQuiz.title}
        onExit={() => setActiveQuiz(null)}
        onSubmit={(answers) => {
          console.log('Quiz submitted:', answers);
          setActiveQuiz(null);
        }}
      />
    );
  }

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
          <h1 className="text-3xl font-bold text-foreground">Tests</h1>
          <p className="text-muted-foreground">Practice and improve your skills with our test library</p>
        </div>
        
        <Button className="bg-gradient-primary hover:shadow-glow">
          <Shuffle className="w-4 h-4 mr-2" />
          Pick Random
        </Button>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Progress Overview</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-surface-muted"
                />
                {/* Progress circle */}
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(progressStats.solved / progressStats.totalQuestions) * 100}, 100`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  {Math.round((progressStats.solved / progressStats.totalQuestions) * 100)}%
                </span>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-success mb-1">{progressStats.solved}</div>
              <div className="text-sm text-muted-foreground">Solved</div>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-warning mb-1">{progressStats.attempted}</div>
              <div className="text-sm text-muted-foreground">Attempted</div>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary mb-1">{progressStats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Tabs */}
      <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full lg:w-auto">
            <TabsList className="glass-card p-1 bg-surface/60">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                All
              </TabsTrigger>
              <TabsTrigger value="attempted" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Attempted
              </TabsTrigger>
              <TabsTrigger value="solved" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Solved
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Bookmarks
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search and Filters */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tests..."
                className="glass-card pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-surface/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-[120px] glass-card border-white/10">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterTopic} onValueChange={setFilterTopic}>
              <SelectTrigger className="w-[120px] glass-card border-white/10">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="algorithms">Algorithms</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Question List Table */}
        <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-surface/30 border-white/10">
                <TableHead className="text-foreground font-semibold">Title</TableHead>
                <TableHead className="text-foreground font-semibold">Topic</TableHead>
                <TableHead className="text-foreground font-semibold">Difficulty</TableHead>
                <TableHead className="text-foreground font-semibold">Avg Time</TableHead>
                <TableHead className="text-foreground font-semibold">Submissions</TableHead>
                <TableHead className="text-foreground font-semibold">Asked In</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test, index) => (
                <motion.tr
                  key={test.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-surface/30 border-white/10 cursor-pointer group"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-smooth">
                        {test.title}
                      </div>
                      {test.userScore && (
                        <div className="text-sm text-muted-foreground">
                          Score: {test.userScore}% ({test.attempts} attempts)
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-surface/60 border-white/10">
                      {test.topic}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                      {test.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{test.avgTime}</TableCell>
                  <TableCell className="text-muted-foreground">{test.submissions.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {test.askedIn.slice(0, 2).map((company) => (
                        <Badge key={company} variant="outline" className="text-xs bg-surface/60 border-white/10">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(test.status)}>
                      {test.status === 'not-attempted' ? 'New' : test.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <BookmarkPlus className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary hover:shadow-glow opacity-0 group-hover:opacity-100 transition-smooth"
                        onClick={() => setActiveQuiz(test)}
                      >
                        {test.status === 'solved' ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Gamification Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-warning mr-2" />
              <span className="text-lg font-semibold text-foreground">2,450 XP</span>
            </div>
            <p className="text-sm text-muted-foreground">Experience Points</p>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-success mr-2" />
              <span className="text-lg font-semibold text-foreground">7 Days</span>
            </div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </div>
          
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-primary mr-2" />
              <span className="text-lg font-semibold text-foreground">Gold</span>
            </div>
            <p className="text-sm text-muted-foreground">Current Rank</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestsSection;