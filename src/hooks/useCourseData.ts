import { useState, useMemo } from "react";
import { 
  Code, 
  Palette, 
  Calculator, 
  Briefcase, 
  Camera, 
  Music,
  Beaker,
  Globe
} from "lucide-react";

export interface Course {
  id: number;
  title: string;
  subject: string;
  author: string;
  rating: number;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  price: number;
  isFree: boolean;
  image: string;
  tags: string[];
  isEnrolled: boolean;
  isInWishlist: boolean;
  addedDate: string;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  courseCount: number;
  totalStudents: number;
  averageRating: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  courses: Array<{
    id: number;
    title: string;
    price: number;
    isFree: boolean;
  }>;
}

export const useCourseData = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Complete React Development Course",
      subject: "Programming",
      author: "John Smith", 
      rating: 4.8,
      students: 15420,
      duration: "12 hours",
      level: "Intermediate",
      progress: 65,
      price: 2999,
      isFree: false,
  image: "/src/assets/courses/data-structures.jpg",
      tags: ["React", "JavaScript", "Frontend"],
      isEnrolled: true,
      isInWishlist: false,
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      subject: "Programming",
      author: "Sarah Johnson",
      rating: 4.9,
      students: 8930,
      duration: "18 hours", 
      level: "Advanced",
      progress: 100,
      price: 4999,
      isFree: false,
  image: "/src/assets/courses/data-structures.jpg",
      tags: ["Python", "Backend", "AI"],
      isEnrolled: true,
      isInWishlist: false,
      addedDate: "2024-01-20"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      subject: "Data Science",
      author: "Dr. Mike Chen",
      rating: 4.7,
      students: 12340,
      duration: "24 hours",
      level: "Beginner",
      price: 5999,
      isFree: false,
  image: "/src/assets/courses/statistics.jpg",
      tags: ["ML", "Python", "Data Science"],
      isEnrolled: false,
      isInWishlist: true,
      addedDate: "2024-01-25"
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      subject: "Programming",
      author: "Alex Rodriguez",
      rating: 4.6,
      students: 20150,
      duration: "30 hours",
      level: "Intermediate",
      progress: 23,
      price: 7999,
      isFree: false,
  image: "/src/assets/courses/data-structures.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      isEnrolled: true,
      isInWishlist: false,
      addedDate: "2024-02-01"
    },
    {
      id: 5,
      title: "Digital Marketing Mastery",
      subject: "Marketing",
      author: "Emma Wilson",
      rating: 4.5,
      students: 9870,
      duration: "15 hours",
      level: "Beginner",
      price: 0,
      isFree: true,
  image: "/src/assets/courses/digital-marketing.jpg",
      tags: ["Marketing", "SEO", "Social Media"],
      isEnrolled: false,
      isInWishlist: true,
      addedDate: "2024-02-05"
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      subject: "Design",
      author: "David Park",
      rating: 4.8,
      students: 11230,
      duration: "20 hours",
      level: "Intermediate",
      price: 3999,
      isFree: false,
  image: "/src/assets/courses/literature.jpg",
      tags: ["UI", "UX", "Figma"],
      isEnrolled: true,
      isInWishlist: false,
      addedDate: "2024-02-10"
    },
    {
      id: 7,
      title: "Photography Basics",
      subject: "Photography",
      author: "Lisa Chen",
      rating: 4.4,
      students: 6540,
      duration: "8 hours",
      level: "Beginner",
      price: 0,
      isFree: true,
  image: "/src/assets/courses/chemistry.jpg",
      tags: ["Photography", "Lighting", "Composition"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-02-15"
    },
    {
      id: 8,
      title: "Data Analysis with Excel",
      subject: "Data Science",
      author: "Robert Kumar",
      rating: 4.3,
      students: 14560,
      duration: "10 hours",
      level: "Beginner",
      price: 1999,
      isFree: false,
  image: "/src/assets/courses/statistics.jpg",
      tags: ["Excel", "Data", "Analytics"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-02-20"
    },
    {
      id: 9,
      title: "Graphic Design with Adobe",
      subject: "Design",
      author: "Maya Singh",
      rating: 4.7,
      students: 8900,
      duration: "16 hours",
      level: "Intermediate",
      price: 3499,
      isFree: false,
  image: "/src/assets/courses/literature.jpg",
      tags: ["Photoshop", "Illustrator", "Design"],
      isEnrolled: false,
      isInWishlist: true,
      addedDate: "2024-02-25"
    },
    {
      id: 10,
      title: "Financial Planning 101",
      subject: "Finance",
      author: "James Miller",
      rating: 4.2,
      students: 5670,
      duration: "6 hours",
      level: "Beginner",
      price: 0,
      isFree: true,
  image: "/src/assets/courses/calculus.jpg",
      tags: ["Finance", "Investment", "Planning"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-03-01"
    },
    {
      id: 11,
      title: "Mobile App Development",
      subject: "Programming",
      author: "Nina Patel",
      rating: 4.6,
      students: 7890,
      duration: "22 hours",
      level: "Advanced",
      price: 6999,
      isFree: false,
  image: "/src/assets/courses/data-structures.jpg",
      tags: ["React Native", "Mobile", "iOS", "Android"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-03-05"
    },
    {
      id: 12,
      title: "Music Production Basics",
      subject: "Music",
      author: "Chris Taylor",
      rating: 4.5,
      students: 4320,
      duration: "14 hours",
      level: "Beginner",
      price: 2499,
      isFree: false,
  image: "/src/assets/courses/physics.jpg",
      tags: ["Music", "Production", "Audio"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-03-10"
    },
    {
      id: 13,
      title: "Cloud Computing with AWS",
      subject: "Technology",
      author: "Kevin Wong",
      rating: 4.8,
      students: 10230,
      duration: "28 hours",
      level: "Advanced",
      price: 8999,
      isFree: false,
  image: "/src/assets/courses/environmental.jpg",
      tags: ["AWS", "Cloud", "DevOps"],
      isEnrolled: true,
      isInWishlist: false,
      addedDate: "2024-03-15"
    },
    {
      id: 14,
      title: "Chemistry for Beginners",
      subject: "Science",
      author: "Dr. Rachel Green",
      rating: 4.1,
      students: 3450,
      duration: "12 hours",
      level: "Beginner",
      price: 1499,
      isFree: false,
  image: "/src/assets/courses/chemistry.jpg",
      tags: ["Chemistry", "Science", "Lab"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-03-20"
    },
    {
      id: 15,
      title: "Content Writing Masterclass",
      subject: "Writing",
      author: "Sophie Brown",
      rating: 4.4,
      students: 6780,
      duration: "9 hours",
      level: "Intermediate",
      price: 0,
      isFree: true,
  image: "/src/assets/courses/literature.jpg",
      tags: ["Writing", "Content", "Copywriting"],
      isEnrolled: false,
      isInWishlist: true,
      addedDate: "2024-03-25"
    },
    {
      id: 16,
      title: "Blockchain Development",
      subject: "Programming",
      author: "Marcus Johnson",
      rating: 4.7,
      students: 5430,
      duration: "25 hours",
      level: "Advanced",
      price: 9999,
      isFree: false,
  image: "/src/assets/courses/data-structures.jpg",
      tags: ["Blockchain", "Crypto", "Web3"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-03-30"
    },
    {
      id: 17,
      title: "Video Editing Pro",
      subject: "Media",
      author: "Tom Anderson",
      rating: 4.6,
      students: 7650,
      duration: "18 hours", 
      level: "Intermediate",
      price: 4499,
      isFree: false,
  image: "/src/assets/courses/physics.jpg",
      tags: ["Video", "Editing", "Premiere"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-04-01"
    },
    {
      id: 18,
      title: "Language Learning Spanish",
      subject: "Languages",
      author: "Isabella Rodriguez",
      rating: 4.3,
      students: 12890,
      duration: "50 hours",
      level: "Beginner",
      price: 2999,
      isFree: false,
  image: "/src/assets/courses/literature.jpg",
      tags: ["Spanish", "Language", "Conversation"],
      isEnrolled: false,
      isInWishlist: false,
      addedDate: "2024-04-05"
    }
  ]);

  const subjects: Subject[] = [
    {
      id: 1,
      name: "Programming",
      description: "Learn to code with modern programming languages and frameworks",
      courseCount: 6,
      totalStudents: 58340,
      averageRating: 4.7,
      icon: Code,
      color: "from-primary to-primary-glow",
      courses: courses.filter(c => c.subject === "Programming").slice(0, 3)
    },
    {
      id: 2,
      name: "Design", 
      description: "Master UI/UX design, graphic design, and visual arts",
      courseCount: 2,
      totalStudents: 20130,
      averageRating: 4.8,
      icon: Palette,
      color: "from-secondary to-accent",
      courses: courses.filter(c => c.subject === "Design").slice(0, 3)
    },
    {
      id: 3,
      name: "Data Science",
      description: "Analyze data, build ML models, and extract insights",
      courseCount: 2,
      totalStudents: 26900,
      averageRating: 4.5,
      icon: Calculator,
      color: "from-accent to-warning",
      courses: courses.filter(c => c.subject === "Data Science").slice(0, 3)
    },
    {
      id: 4,
      name: "Marketing",
      description: "Digital marketing strategies and business growth",
      courseCount: 1,
      totalStudents: 9870,
      averageRating: 4.5,
      icon: Briefcase,
      color: "from-success to-primary",
      courses: courses.filter(c => c.subject === "Marketing").slice(0, 3)
    },
    {
      id: 5,
      name: "Photography",
      description: "Capture stunning photos and master photography techniques",
      courseCount: 1,
      totalStudents: 6540,
      averageRating: 4.4,
      icon: Camera,
      color: "from-warning to-accent",
      courses: courses.filter(c => c.subject === "Photography").slice(0, 3)
    },
    {
      id: 6,
      name: "Music",
      description: "Music production, composition, and audio engineering",
      courseCount: 1,
      totalStudents: 4320,
      averageRating: 4.5,
      icon: Music,
      color: "from-primary to-secondary",
      courses: courses.filter(c => c.subject === "Music").slice(0, 3)
    },
    {
      id: 7,
      name: "Science",
      description: "Explore chemistry, physics, and scientific principles",
      courseCount: 1,
      totalStudents: 3450,
      averageRating: 4.1,
      icon: Beaker,
      color: "from-success to-secondary",
      courses: courses.filter(c => c.subject === "Science").slice(0, 3)
    },
    {
      id: 8,
      name: "Languages",
      description: "Learn new languages and improve communication skills",
      courseCount: 1,
      totalStudents: 12890,
      averageRating: 4.3,
      icon: Globe,
      color: "from-accent to-primary",
      courses: courses.filter(c => c.subject === "Languages").slice(0, 3)
    }
  ];

  const enrollCourse = (courseId: number) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isEnrolled: true, progress: 0 }
        : course
    ));
  };

  const toggleWishlist = (courseId: number) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isInWishlist: !course.isInWishlist }
        : course
    ));
  };

  const enrolledCourses = useMemo(() => 
    courses.filter(course => course.isEnrolled), [courses]
  );

  const wishlistCourses = useMemo(() => 
    courses.filter(course => course.isInWishlist), [courses]
  );

  return {
    courses,
    subjects,
    enrolledCourses,
    wishlistCourses,
    enrollCourse,
    toggleWishlist
  };
};