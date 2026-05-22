import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { MousePointer2, Play, Pause, Volume2, Video } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

// 1. useImperativeHandle için Alt Bileşen (Video Player)
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  setVolume: (value: number) => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current?.play();
      setIsPlaying(true);
    },
    pause: () => {
      videoRef.current?.pause();
      setIsPlaying(false);
    },
    setVolume: (value: number) => {
      if (videoRef.current) videoRef.current.volume = value;
    }
  }));

  return (
    <div className="relative group rounded-3xl overflow-hidden border-4 border-slate-900 dark:border-slate-800 bg-black aspect-video flex items-center justify-center">
      <video 
        ref={videoRef}
        className="w-full h-full object-cover opacity-60"
        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-teal-and-blue-neon-lines-32616-large.mp4"
        loop
        muted
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-full text-white animate-pulse">
          {isPlaying ? <Play size={48} className="fill-current" /> : <Pause size={48} className="fill-current" />}
        </div>
      </div>
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white/50 text-[10px] font-black tracking-widest uppercase">
        <span>Kapsüllenmiş DOM Elemanı</span>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
});

const imperativeCode = `// 1. Alt Bileşen (ForwardRef)
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();
  
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause()
  }));
  
  return <video ref={videoRef} />;
});

// 2. Üst Bileşen (Parent)
const playerRef = useRef();
playerRef.current.play();`;

const RefsAndDOM: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<VideoPlayerHandle>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          DOM ve Referans Yönetimi
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          <code>useRef</code> ile doğrudan DOM erişimi ve <code>useImperativeHandle</code> ile bileşen kapsülleme.
        </p>
      </div>

      <Section 
        id="useref" 
        title="useRef: DOM'a Doğrudan Erişim" 
        description="React'in deklaratif yapısının dışına çıkıp bir elemente manuel müdahale etmek için kullanılır."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                <strong>useRef</strong>, bileşenin tüm yaşam döngüsü boyunca kalıcı olan ancak değiştiğinde re-render tetiklemeyen bir "kap" (container) gibidir. En yaygın kullanımı, HTML elementlerine doğrudan erişmektir.
              </p>
            </div>
            
            <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col gap-4 shadow-inner">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Örnek Giriş Alanı</label>
              <div className="flex gap-3">
                <input 
                  ref={inputRef}
                  type="text"
                  placeholder="Buraya odaklanmak için butona tıklayın..."
                  className="flex-1 px-5 py-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all text-sm"
                />
                <button 
                  onClick={focusInput}
                  className="px-6 bg-slate-900 dark:bg-primary-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  <MousePointer2 size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <CodeSnippet code={`const inputRef = useRef(null);\n\nconst handleClick = () => {\n  inputRef.current.focus();\n};`} language="tsx" />
          </div>
        </div>
      </Section>

      <Section 
        id="imperative" 
        title="İnteraktif Demo: Özel Video Player (Imperative)" 
        description="Parent bileşen, alt bileşenin içindeki DOM metodlarına useImperativeHandle ile güvenli bir şekilde erişir."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <VideoPlayer ref={videoPlayerRef} />
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Video size={18} className="text-primary-500" /> Parent Kontrol Paneli
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Aşağıdaki butonlar, alt bileşenin <code>useImperativeHandle</code> ile dışarıya açtığı (expose ettiği) metodları tetikler.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => videoPlayerRef.current?.play()}
                className="flex items-center justify-center gap-3 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg transition-all"
              >
                <Play size={18} /> OYNAT
              </button>
              <button 
                onClick={() => videoPlayerRef.current?.pause()}
                className="flex items-center justify-center gap-3 py-5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg transition-all"
              >
                <Pause size={18} /> DURDUR
              </button>
              <button 
                onClick={() => videoPlayerRef.current?.setVolume(1)}
                className="flex items-center justify-center gap-3 py-5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700"
              >
                <Volume2 size={18} /> MAX SES
              </button>
              <button 
                onClick={() => videoPlayerRef.current?.setVolume(0)}
                className="flex items-center justify-center gap-3 py-5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700"
              >
                SESİ KAPAT
              </button>
            </div>
            
            <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/30">
              <CodeSnippet code={imperativeCode} language="tsx" />
            </div>
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="info" title="useRef vs useState">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-2 pr-4 font-black">Özellik</th>
                <th className="py-2 pr-4 font-black">useRef</th>
                <th className="py-2 font-black">useState</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-2 pr-4 font-bold">Render Tetikler mi?</td>
                <td className="py-2 pr-4 text-rose-500">Hayır</td>
                <td className="py-2 text-emerald-500">Evet</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-2 pr-4 font-bold">Kullanım Amacı</td>
                <td className="py-2 pr-4">DOM Erişimi / Kalıcı Değişken</td>
                <td className="py-2">Görünümle (UI) İlişkili Veri</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold">Senkron mu?</td>
                <td className="py-2 pr-4">Evet (Anlık güncellenir)</td>
                <td className="py-2">Asenkron (Batching)</td>
              </tr>
            </tbody>
          </table>
        </Callout>
        <Callout type="tip" title="Best Practice: Encapsulation">
          <code>useImperativeHandle</code>, alt bileşenin iç yapısını korumak için mükemmeldir. Sadece gerekli metodları dışarı açarak (expose ederek) bileşenin kontrolsüz bir şekilde dışarıdan manipüle edilmesini engellersiniz.
        </Callout>
      </div>
    </div>
  );
};

export default RefsAndDOM;
