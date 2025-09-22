import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import useFilterStore from '@/lib/useFilterStore';
import type { FilterState } from '@/lib/useFilterStore';

const subjects = [
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

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const sortOptions: Array<FilterState['sorting']> = ['latest', 'popular', 'trending'];

export const FilterControls: React.FC = () => {
  const { filters, setFilter, resetFilters } = useFilterStore();

  return (
    <div className="space-y-4 p-4">
      {/* Search */}
      <div>
        <Input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="min-w-[200px] flex-1">
          <Select
            value={filters.category ?? ''}
            onValueChange={(value) => setFilter('category', value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {subjects.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Filter */}
        <div className="min-w-[200px] flex-1">
          <Select
            value={filters.difficulty ?? ''}
            onValueChange={(value) => setFilter('difficulty', value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content Type Filter */}
        <div className="min-w-[200px] flex-1">
          <Select
            value={filters.type}
            onValueChange={(value: FilterState['type']) => setFilter('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="card">Cards</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="min-w-[200px] flex-1">
          <Select
            value={filters.sorting}
            onValueChange={(value: FilterState['sorting']) => setFilter('sorting', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.search && (
          <Badge variant="secondary" className="gap-2">
            Search: {filters.search}
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setFilter('search', '')}
            >
              ×
            </button>
          </Badge>
        )}
        {filters.category && (
          <Badge variant="secondary" className="gap-2">
            Category: {filters.category}
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setFilter('category', null)}
            >
              ×
            </button>
          </Badge>
        )}
        {filters.difficulty && (
          <Badge variant="secondary" className="gap-2">
            Level: {filters.difficulty}
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setFilter('difficulty', null)}
            >
              ×
            </button>
          </Badge>
        )}
        {filters.type !== 'all' && (
          <Badge variant="secondary" className="gap-2">
            Type: {filters.type}
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setFilter('type', 'all')}
            >
              ×
            </button>
          </Badge>
        )}
        <Badge variant="secondary" className="gap-2">
          Sort: {filters.sorting.charAt(0).toUpperCase() + filters.sorting.slice(1)}
          <button
            className="ml-1 hover:text-destructive"
            onClick={() => setFilter('sorting', 'latest')}
          >
            ×
          </button>
        </Badge>
        {(filters.search || filters.category || filters.difficulty || filters.type !== 'all' || filters.sorting !== 'latest') && (
          <button
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Reset All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterControls;