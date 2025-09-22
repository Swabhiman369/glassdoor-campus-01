import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useFilterStore from '@/lib/useFilterStore';
import { cn } from '@/lib/utils';

export const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Engineering',
  'Environmental Science',
  'Economics',
  'Psychology',
  'Literature',
  'History',
  'Geography',
  'Art & Design',
  'Music',
  'Business',
  'Law',
  'Medicine',
  'Physical Education'
];

interface SubjectsFilterProps {
  className?: string;
}

const SubjectsFilter: React.FC<SubjectsFilterProps> = ({ className }) => {
  const { filters, setFilter } = useFilterStore();
  
  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex gap-2 pb-4">
        <button
          key="all"
          onClick={() => setFilter('category', null)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
            filters.category === null
              ? "bg-gradient-primary text-primary-foreground"
              : "bg-surface/60 hover:bg-surface/80 backdrop-blur-lg"
          )}
        >
          All Subjects
        </button>
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setFilter('category', subject)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
              filters.category === subject
                ? "bg-gradient-primary text-primary-foreground"
                : "bg-surface/60 hover:bg-surface/80 backdrop-blur-lg"
            )}
          >
            {subject}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default SubjectsFilter;