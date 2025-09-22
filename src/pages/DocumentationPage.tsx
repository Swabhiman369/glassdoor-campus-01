import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DynamicNavbar from '@/components/DynamicNavbar';
import { useSearchParams } from 'react-router-dom';
import useNotesStore from '@/lib/useNotesStore';
import useSwipsStore from '@/lib/useSwipsStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Download, 
  FileText, 
  GraduationCap, 
  Grid2X2, 
  Heart, 
  Share2 
} from 'lucide-react';

const DocumentationPage = () => {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topicId');
  const [activeTab, setActiveTab] = useState('notes');
  
  // Get content details from Swips store
  const { getFilteredContent, userInteractions, toggleWishlist } = useSwipsStore();
  const content = getFilteredContent().find(item => item.noteId === topicId);
  
  // Get notes content from Notes store
  const { notes } = useNotesStore();
  const noteContent = topicId ? notes[topicId] : null;

  // Animation variants
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

  if (!content || !noteContent) {
    return (
      <div className="min-h-screen bg-background">
        <DynamicNavbar activeTab="swips" />
        <main className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Topic Not Found
            </h1>
            <p className="text-muted-foreground">
              The requested topic could not be found or has been removed.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const userInteraction = userInteractions[content.id] || {
    isWishlisted: content.isWishlisted,
    isEnrolled: content.isEnrolled,
    progress: 0
  };

  const handleDownload = () => {
    // Create a blob with the notes content
    const notesText = `${noteContent.title}
${noteContent.category} | ${content.instructor}

${noteContent.content}

${noteContent.slides?.map(slide => `
${slide.title}
${slide.content}
`).join('\n')}
`;
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${noteContent.title.toLowerCase().replace(/\s+/g, '-')}-notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar activeTab="swips" />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnail */}
              <div className="w-full md:w-64 aspect-video rounded-lg overflow-hidden">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Info */}
              <div className="flex-grow space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {content.category}
                    </Badge>
                    <h1 className="text-3xl font-bold text-foreground">
                      {content.title}
                    </h1>
                    <p className="text-muted-foreground">
                      by {content.instructor}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleWishlist(content.id)}
                      className={userInteraction.isWishlisted ? 'bg-primary/20' : ''}
                    >
                      <Heart 
                        className={`h-4 w-4 ${userInteraction.isWishlisted ? 'fill-primary' : ''}`}
                      />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{noteContent.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Grid2X2 className="w-4 h-4" />
                    <span>{noteContent.totalSlides} slides</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{content.difficulty}</span>
                  </div>
                </div>

                {userInteraction.progress > 0 && (
                  <div className="space-y-2">
                    <Progress value={userInteraction.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {userInteraction.progress}% Complete
                    </p>
                  </div>
                )}

                <p className="text-muted-foreground">
                  {content.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Tabs */}
          <motion.div variants={itemVariants} className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="glass-card p-1 bg-surface/60 w-full justify-start">
                <TabsTrigger 
                  value="notes"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="flashcards"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
                >
                  <Grid2X2 className="w-4 h-4 mr-2" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger 
                  value="mindmap"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Mindmap
                </TabsTrigger>
              </TabsList>

              <Button 
                variant="outline" 
                onClick={handleDownload}
                className="mt-4"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Notes
              </Button>

              <TabsContent value="notes" className="mt-6 space-y-6">
                {noteContent.slides?.map((slide, index) => (
                  <Card key={slide.id} className="p-6 glass-card">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="mb-2">
                        Slide {index + 1}
                      </Badge>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {slide.content}
                      </p>
                    </motion.div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="flashcards" className="mt-6">
                <Card className="p-6 glass-card">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Flashcards coming soon!
                  </h2>
                  <p className="text-muted-foreground">
                    We're working on adding interactive flashcards to help you study more effectively.
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="mindmap" className="mt-6">
                <Card className="p-6 glass-card">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Mind maps coming soon!
                  </h2>
                  <p className="text-muted-foreground">
                    Visual learning tools and mind maps will be available in the next update.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DocumentationPage;