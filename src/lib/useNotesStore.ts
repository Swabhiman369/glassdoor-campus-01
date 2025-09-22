import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  totalSlides: number;
  progress: number;
  lastModified: string;
  readTime: string;
  status: 'completed' | 'updated' | 'in-progress';
  slides?: {
    id: number;
    title: string;
    content: string;
  }[];
}

interface NotesStore {
  notes: Record<string, Note>;
  currentNoteId: string | null;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  setCurrentNote: (id: string | null) => void;
  getNoteById: (id: string) => Note | undefined;
  updateNoteProgress: (id: string, slideIndex: number) => void;
}

const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: {
        "react-tutorial": {
          id: "react-tutorial",
          title: "React Fundamentals",
          content: "A comprehensive guide to React fundamentals",
          category: "React",
          totalSlides: 3,
          progress: 0,
          lastModified: new Date().toISOString(),
          readTime: "15 min",
          status: "in-progress" as const,
          slides: [
            {
              id: 1,
              title: "Introduction to React",
              content: "React is a JavaScript library for building user interfaces. It lets you create reusable UI components that efficiently update and render automatically when your data changes."
            },
            {
              id: 2,
              title: "Component Lifecycle",
              content: "React components go through different stages: Mounting (creation), Updating (re-rendering), and Unmounting (removal). Understanding this lifecycle is crucial for managing component behavior."
            },
            {
              id: 3,
              title: "React Hooks",
              content: "Hooks are functions that let you use state and other React features in function components. They help you write cleaner, more maintainable code by extracting component logic into reusable functions."
            }
          ]
        },
        "ml-basics": {
          id: "ml-basics",
          title: "Machine Learning Fundamentals",
          content: "A beginner's guide to machine learning concepts and applications.",
          category: "Computer Science",
          totalSlides: 5,
          progress: 0,
          lastModified: new Date().toISOString(),
          readTime: "20 min",
          status: "in-progress" as const,
          slides: [
            {
              id: 1,
              title: "What is Machine Learning?",
              content: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed."
            },
            {
              id: 2,
              title: "Types of Machine Learning",
              content: "Explore supervised learning, unsupervised learning, and reinforcement learning approaches."
            },
            {
              id: 3,
              title: "Common Algorithms",
              content: "Learn about popular algorithms like linear regression, decision trees, and neural networks."
            },
            {
              id: 4,
              title: "Data Preprocessing",
              content: "Understanding data cleaning, normalization, and feature engineering techniques."
            },
            {
              id: 5,
              title: "Model Evaluation",
              content: "Methods to assess model performance including accuracy, precision, recall, and F1 score."
            }
          ]
        },
        "quantum-basics": {
          id: "quantum-basics",
          title: "Quantum Mechanics Introduction",
          content: "Understanding the fundamentals of quantum mechanics and wave functions.",
          category: "Physics",
          totalSlides: 4,
          progress: 0,
          lastModified: new Date().toISOString(),
          readTime: "25 min",
          status: "in-progress" as const,
          slides: [
            {
              id: 1,
              title: "Wave-Particle Duality",
              content: "The concept that matter and light exhibit both wave and particle properties."
            },
            {
              id: 2,
              title: "Schrödinger's Equation",
              content: "The fundamental equation describing quantum mechanical behavior."
            },
            {
              id: 3,
              title: "Uncertainty Principle",
              content: "Heisenberg's principle regarding limitations in measuring conjugate variables."
            },
            {
              id: 4,
              title: "Quantum States",
              content: "Understanding superposition and quantum state vectors."
            }
          ]
        }
      },
      currentNoteId: null,
      addNote: (note) => set((state) => ({
        notes: { ...state.notes, [note.id]: note }
      })),
      updateNote: (id, updates) => set((state) => ({
        notes: {
          ...state.notes,
          [id]: { ...state.notes[id], ...updates }
        }
      })),
      setCurrentNote: (id) => set({ currentNoteId: id }),
      getNoteById: (id) => get().notes[id],
      updateNoteProgress: (id, slideIndex) => {
        const note = get().notes[id];
        if (note) {
          const progress = Math.round((slideIndex / note.totalSlides) * 100);
          set((state) => ({
            notes: {
              ...state.notes,
              [id]: {
                ...note,
                progress,
                status: progress === 100 ? 'completed' : 'in-progress'
              }
            }
          }));
        }
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);

export default useNotesStore;