import { motion } from "framer-motion";
import DynamicNavbar from "@/components/DynamicNavbar";
import CoursesSection from "@/components/CoursesSection";
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar 
        activeTab="courses"
        onTabChange={handleTabChange}
      />
      
      <main className="max-w-7xl mx-auto hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CoursesSection />
        </motion.div>
      </main>
    </div>
  );
};

export default CoursesPage;