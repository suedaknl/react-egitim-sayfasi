import React from 'react';
import { Lightbulb, AlertTriangle, Info } from 'lucide-react';

type CalloutType = 'tip' | 'error' | 'info' | 'warning';

interface CalloutProps {
  type: CalloutType;
  title: string;
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const styles = {
    tip: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800/50',
      text: 'text-emerald-900 dark:text-emerald-300',
      iconColor: 'text-emerald-500',
      icon: <Lightbulb size={20} />
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-800/50',
      text: 'text-rose-900 dark:text-rose-300',
      iconColor: 'text-rose-500',
      icon: <AlertTriangle size={20} />
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-800/50',
      text: 'text-amber-900 dark:text-amber-300',
      iconColor: 'text-amber-500',
      icon: <AlertTriangle size={20} />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800/50',
      text: 'text-blue-900 dark:text-blue-300',
      iconColor: 'text-blue-500',
      icon: <Info size={20} />
    }
  };

  const { bg, border, text, iconColor, icon } = styles[type];

  return (
    <div className={`my-6 flex gap-4 p-5 rounded-2xl border ${bg} ${border} animate-in fade-in slide-in-from-left-2 duration-500`}>
      <div className={`${iconColor} mt-0.5`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-bold text-sm uppercase tracking-wider mb-2 ${text}`}>
          {title}
        </h4>
        <div className={`text-sm leading-relaxed ${text} opacity-90 prose dark:prose-invert max-w-none`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
