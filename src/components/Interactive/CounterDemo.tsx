import React, { useState } from 'react';
import { Minus, Plus, RefreshCw } from 'lucide-react';

const CounterDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
      <div className="text-6xl font-black text-slate-800 dark:text-white mb-8 tracking-tighter tabular-nums">
        {count}
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="p-4 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 border border-slate-200 dark:border-slate-700"
          aria-label="Azalt"
        >
          <Minus size={24} />
        </button>
        
        <button
          onClick={() => setCount(0)}
          className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Sıfırla"
        >
          <RefreshCw size={20} />
        </button>
        
        <button
          onClick={() => setCount((c) => c + 1)}
          className="p-4 rounded-full bg-primary-500 text-white shadow-sm shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/40 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          aria-label="Artır"
        >
          <Plus size={24} />
        </button>
      </div>
      
      <div className="mt-8 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm">
        State: <code className="text-primary-600 dark:text-primary-400 font-bold">{`{ count: ${count} }`}</code>
      </div>
    </div>
  );
};

export default CounterDemo;
