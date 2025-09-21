import { motion } from "framer-motion";
import DynamicNavbar from "@/components/DynamicNavbar";
import Dashboard from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const DashboardHomePage = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar 
        activeTab="dashboard"
        onTabChange={handleTabChange}
      />
      
      <main className="max-w-7xl mx-auto hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardHomePage;