import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-200 selection:text-primary-900 dark:selection:bg-primary-900 dark:selection:text-primary-100 bg-white dark:bg-dark-bg transition-colors duration-300">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 flex flex-col w-full min-w-0">
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
