import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Target, Home, User, Zap, Heart, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterControls } from "@/components/swips";

interface DynamicNavbarProps {
  activeTab?: string; // Made optional since we'll derive it from the route
}

const ROUTE_MAP = {
  dashboard: "/dashboard",
  courses: "/courses",
  swips: "/swips",
  tests: "/tests",
  profile: "/profile",
  // wishlist: "/wishlist",
  enrolled: "/my-courses"
} as const;

const DynamicNavbar = ({ activeTab: propActiveTab }: DynamicNavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Determine active tab from current route
  const getCurrentTab = () => {
    const path = location.pathname;
    return Object.entries(ROUTE_MAP).find(([_, route]) => route === path)?.[0] || 
      (propActiveTab || 'dashboard');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'swips', label: 'Swips', icon: Zap },
    { id: 'tests', label: 'Tests', icon: Target },
    // { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabChange = (tabId: string) => {
    const route = ROUTE_MAP[tabId as keyof typeof ROUTE_MAP];
    navigate(route);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="backdrop-blur-2xl sticky top-0 z-50 px-4 sm:px-6 py-4"
      style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
    >
      {/* Filter Sheet for Swips */}
      {getCurrentTab() === 'swips' && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/5 backdrop-blur-xl bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10"
              >
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters & Sort</SheetTitle>
              </SheetHeader>
              <div className="mt-4 pb-20">
                <FilterControls />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Dynamic Island Navigation */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 px-3 py-2 rounded-full flex items-center space-x-1 border border-primary/20 shadow-lg shadow-primary/10 overflow-x-auto scrollbar-hide" style={{ minWidth: 0 }}>
          {tabs.map((tab) => {
            const isActive = getCurrentTab() === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-3 sm:px-4 py-2 rounded-full flex items-center space-x-2 transition-smooth ${
                  isActive 
                    ? 'text-primary-foreground bg-primary/80 shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full shadow-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="text-sm font-medium relative z-10 hidden sm:block">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default DynamicNavbar;