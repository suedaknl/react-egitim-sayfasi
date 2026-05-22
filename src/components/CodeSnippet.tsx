import React from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'tsx' }) => {
  return (
    <div className="relative group rounded-xl overflow-hidden bg-slate-900 text-slate-50 my-6 shadow-md border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 text-xs text-slate-400 font-mono">
        <span>{language}</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
