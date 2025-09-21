import { motion } from "framer-motion";
import DynamicNavbar from "@/components/DynamicNavbar";
import TestsSection from "@/components/TestsSection";
import { useNavigate } from "react-router-dom";

const TestsPage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar 
        activeTab="tests"
        onTabChange={handleTabChange}
      />
      
      <main className="max-w-7xl mx-auto hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TestsSection />
        </motion.div>
      </main>
    </div>
  );
};

export default TestsPage;