import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabViewerProps {
  tabs: Tab[];
}

const TabViewer: React.FC<TabViewerProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full mt-6 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-dark-card'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div
                key={tab.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TabViewer;
