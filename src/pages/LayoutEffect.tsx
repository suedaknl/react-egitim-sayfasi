import React, { useLayoutEffect, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

const AutoResizeTextarea: React.FC = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Reset height to get scrollHeight accurately
      textareaRef.current.style.height = "inherit";
      // Set height based on scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Maximize2 size={80} className="text-primary-500" />
      </div>
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">İçeriğe Göre Büyüyen Alan</label>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yazmaya başladıkça bu alan otomatik olarak genişleyecektir (Titreme oluşmadan)..."
        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-primary-500 text-slate-900 dark:text-white transition-colors resize-none overflow-hidden min-h-[100px] leading-relaxed"
      />
      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        useLayoutEffect ile senkron boyutlandırma aktif
      </div>
    </div>
  );
};

const layoutEffectCode = `useLayoutEffect(() => {
  // 1. Önce yüksekliği sıfırla/miras al (scrollHeight ölçümü için)
  ref.current.style.height = "inherit";
  
  // 2. scrollHeight kadar yeni yüksekliği ata
  // Bu işlem tarayıcı boyama (paint) yapmadan önce gerçekleştiği için titreme olmaz.
  ref.current.style.height = \`\${ref.current.scrollHeight}px\`;
}, [text]);`;

const LayoutEffectDemo: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Render Yaşam Döngüsü (useLayoutEffect)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Tarayıcı ekranı boyamadan (paint) önce senkron DOM güncellemeleri yapma stratejileri.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Senkronizasyon ve Paint Süreci" 
        description="Bileşenlerin ekrana yansıması (painting), Virtual DOM güncellendikten sonra gerçekleşen kritik bir adımdır."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Normalde <strong>useEffect</strong> asenkrondur; React render eder, tarayıcı ekranı boyar, ardından efekt çalışır. Bu görsel işlemlerde "flicker" (titreme) dediğimiz, elementin önce yanlış sonra doğru yerde gözükmesi sorununa yol açar.
            </p>
            <p>
              <strong>useLayoutEffect</strong> ise tarayıcı ekranı boyamadan hemen önce çalışır. React, bu efektin içindeki tüm senkron kodların bitmesini bekler ve ardından nihai sonucu ekrana yansıtır.
            </p>
          </div>
          <CodeSnippet code={layoutEffectCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="demo" 
        title="İnteraktif Demo: Dinamik Boyutlanan Textarea" 
        description="Yazdıkça boyutu senkron olarak ayarlanan bir textarea örneği ile görsel stabilitenin sağlanması."
      >
        <div className="py-10">
          <AutoResizeTextarea />
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="warning" title="useLayoutEffect vs useEffect">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-2 pr-4 font-black">Özellik</th>
                <th className="py-2 pr-4 font-black">useEffect</th>
                <th className="py-2 font-black">useLayoutEffect</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-2 pr-4 font-bold">Çalışma Zamanı</td>
                <td className="py-2 pr-4">Boyamadan Sonra (Async)</td>
                <td className="py-2">Boyamadan Önce (Sync)</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-2 pr-4 font-bold">Performans Etkisi</td>
                <td className="py-2 pr-4 text-emerald-500">Hafif (Bloke Etmez)</td>
                <td className="py-2 text-rose-500">Ağır (Bloke Eder)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold">Tercih Edilmeli</td>
                <td className="py-2 pr-4">Çoğu Senaryo</td>
                <td className="py-2">DOM Ölçümü / Görsel Stabilite</td>
              </tr>
            </tbody>
          </table>
        </Callout>
        <Callout type="info" title="Hangi Durumlarda Kullanılmalı?">
          Eğer bir elementin konumunu veya boyutunu ölçüp başka bir elementi ona göre yerleştiriyorsanız (Tooltip, Popover vb.) kesinlikle <code>useLayoutEffect</code> kullanmalısınız. Aksi takdirde kullanıcı elementlerin saniyeler içinde "zıpladığını" görür.
        </Callout>
      </div>
    </div>
  );
};

export default LayoutEffectDemo;
