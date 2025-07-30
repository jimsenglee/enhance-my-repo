
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className={`min-h-screen flex flex-col ${
      isAdmin 
        ? 'bg-gray-900' // Dark admin background
        : 'bg-gradient-to-br from-gray-50 to-gray-100' // Light user background
    }`}>
      <Navbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content */}
        <motion.main 
          className="flex-1 overflow-y-auto pt-16 transition-all duration-300 ease-in-out"
          animate={{
            marginLeft: sidebarOpen ? '280px' : '0px'
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <div className={`p-6 max-w-7xl mx-auto ${
            isAdmin ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
