import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Zap, Layers, Combine, LayoutTemplate, 
  FormInput, Palette, X, Navigation, Globe, Database, Share2 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/', label: 'Temel Prensipler', icon: <Home size={20} /> },
  { path: '/performance', label: 'Performans Optimizasyonu', icon: <Zap size={20} /> },
  { path: '/refs', label: 'DOM ve Referans Yönetimi', icon: <Layers size={20} /> },
  { path: '/reducer', label: 'Durum Yönetimi Mimarisi', icon: <Combine size={20} /> },
  { path: '/layout-effect', label: 'Render Yaşam Döngüsü', icon: <LayoutTemplate size={20} /> },
  { path: '/form', label: 'Veri Girişi ve Validasyon', icon: <FormInput size={20} /> },
  { path: '/context', label: 'Bağlam ve Tema Yönetimi', icon: <Palette size={20} /> },
  // Yeni Ders Materyalleri Sayfaları
  { path: '/routing', label: 'Routing ve Navigasyon', icon: <Navigation size={20} /> },
  { path: '/api', label: 'API ve Veri Çekme', icon: <Globe size={20} /> },
  { path: '/data-management', label: 'Gelişmiş Veri Yönetimi', icon: <Database size={20} /> },
  { path: '/global-state', label: 'Global State Yönetimi', icon: <Share2 size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed md:sticky top-0 md:top-16 left-0 z-50 h-screen md:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-dark-bg border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full overflow-y-auto py-6 px-4">
          <div className="flex items-center justify-between md:hidden mb-6 px-2">
            <span className="font-bold text-lg text-slate-800 dark:text-slate-200">Rehber Menüsü</span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm shadow-primary-500/5' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 px-4 py-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Sürüm</p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">React 18.x + TS 5.x</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
