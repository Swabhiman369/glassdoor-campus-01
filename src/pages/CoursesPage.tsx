import { motion } from "framer-motion";
import DynamicNavbar from "@/components/DynamicNavbar";
import CoursesSection from "@/components/CoursesSection";
import { useNavigate } from "react-router-dom";

interface CoursesPageProps {
  wishlistView?: boolean;
  enrolledView?: boolean;
}

const CoursesPage = ({ wishlistView, enrolledView }: CoursesPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar 
        activeTab={wishlistView ? 'wishlist' : enrolledView ? 'enrolled' : 'courses'}
      />
      
      <main className="max-w-7xl mx-auto hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CoursesSection 
            mode={wishlistView ? 'wishlist' : enrolledView ? 'enrolled' : 'all'}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default CoursesPage;