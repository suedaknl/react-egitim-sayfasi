import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Modern React ve TSX Rehberi
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
          Bu proje eğitim amaçlı geliştirilmiştir. Modern web teknolojileri kullanılmıştır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
