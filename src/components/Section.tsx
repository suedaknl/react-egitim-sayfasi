import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, description, children }) => {
  return (
    <section id={id} className="py-16 scroll-mt-20">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
      <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm transition-colors duration-300">
        {children}
      </div>
    </section>
  );
};

export default Section;
