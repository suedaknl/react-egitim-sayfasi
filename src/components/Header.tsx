import React from 'react';
import { Sun, Moon, Code2, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-dark-bg/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="w-full px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center gap-2 text-primary-600 dark:text-primary-500">
            <Code2 size={28} />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">React<span className="text-primary-600 dark:text-primary-500">Rehberi</span></span>
          </Link>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Temayı Değiştir"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
