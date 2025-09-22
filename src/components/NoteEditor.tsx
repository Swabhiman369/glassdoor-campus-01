import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useNotesStore from "@/lib/useNotesStore";

interface NoteEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteId?: string;
}

const NoteEditor = ({ open, onOpenChange, noteId }: NoteEditorProps) => {
  const { notes, addNote, updateNote } = useNotesStore();
  const note = noteId ? notes[noteId] : null;

  const [formData, setFormData] = useState({
    title: note?.title || "",
    category: note?.category || "",
    content: note?.content || "",
    slides: note?.slides || [{ id: 1, title: "", content: "" }]
  });

  const handleSubmit = () => {
    if (!noteId) {
      // Create new note
      const newNote = {
        id: `note-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        content: formData.content,
        totalSlides: formData.slides.length,
        progress: 0,
        lastModified: new Date().toISOString(),
        readTime: "5 min",
        status: "in-progress" as const,
        slides: formData.slides
      };
      addNote(newNote);
    } else {
      // Update existing note
      updateNote(noteId, {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        lastModified: new Date().toISOString(),
        totalSlides: formData.slides.length,
        slides: formData.slides
      });
    }
    onOpenChange(false);
  };

  const addSlide = () => {
    setFormData(prev => ({
      ...prev,
      slides: [...prev.slides, { id: prev.slides.length + 1, title: "", content: "" }]
    }));
  };

  const updateSlide = (index: number, field: "title" | "content", value: string) => {
    setFormData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) => 
        i === index ? { ...slide, [field]: value } : slide
      )
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle>{noteId ? "Edit Note" : "Create Note"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Note title"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., React, JavaScript"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Brief description of the note"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Slides</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addSlide}
                className="glass-card border-white/20"
              >
                Add Slide
              </Button>
            </div>
            
            {formData.slides.map((slide, index) => (
              <div key={slide.id} className="space-y-4 glass-card p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Slide {index + 1}</h4>
                </div>
                
                <div className="space-y-2">
                  <Input
                    value={slide.title}
                    onChange={e => updateSlide(index, "title", e.target.value)}
                    placeholder="Slide title"
                  />
                  <Textarea
                    value={slide.content}
                    onChange={e => updateSlide(index, "content", e.target.value)}
                    placeholder="Slide content"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {noteId ? "Save Changes" : "Create Note"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteEditor;