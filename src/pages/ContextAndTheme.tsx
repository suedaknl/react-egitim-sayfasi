import React from 'react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Network, Zap, Shield, Database } from 'lucide-react';

const basicContextCode = `// 1. Context Nesnesi Oluşturma
const ThemeContext = createContext<Theme | undefined>(undefined);

// 2. Sağlayıcı (Provider) Bileşeni
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`;

const ContextAndTheme: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Bağlam (Context) ve Tema Yönetimi
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Uygulama genelindeki global verilerin prop-drilling olmadan, hiyerarşik olarak dağıtılması ve yönetilmesi.
        </p>
      </div>

      <Section 
        id="prop-drilling" 
        title="Prop Drilling ve Mimari Karmaşıklık" 
        description="Verinin hiyerarşideki derin bileşenlere taşınması sırasında karşılaşılan yapısal sorunlar."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
            <h3 className="text-slate-900 dark:text-white">Prop Drilling Nedir?</h3>
            <p>
              Bir veri veya fonksiyonun, aradaki bileşenler tarafından kullanılmamasına rağmen sadece alt bileşenlere ulaştırılmak amacıyla props yoluyla taşınması durumuna <strong>Prop Drilling</strong> denir.
            </p>
            <p>
              Bu durum kodun sürdürülebilirliğini zorlaştırır, bileşenleri birbirine sıkı sıkıya bağlar (tight coupling) ve gereksiz render operasyonlarına zemin hazırlar. Context API, bu veri transferini "yandan bir kanal" (shortcut) açarak çözer.
            </p>
            <div className="flex items-center gap-4 mt-6 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/30">
              <Network className="text-primary-500 shrink-0" />
              <p className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-tighter">
                Dependency Injection: Context, React ekosistemindeki bağımlılık enjeksiyonu desenidir.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Context Anatomisi</h4>
            <CodeSnippet code={basicContextCode} language="typescript" />
          </div>
        </div>
      </Section>

      <Section 
        id="redux-vs-context" 
        title="Akademik Karşılaştırma: Context vs Redux" 
        description="Global state yönetimi stratejilerinde doğru aracı seçme kriterleri."
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-emerald-500" size={24} />
              <h4 className="font-bold text-slate-900 dark:text-white">Context API</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Düşük frekanslı (low-frequency) güncellemeler için optimize edilmiştir. Tema seçimi, kullanıcı oturum bilgisi veya dil tercihi gibi seyrek değişen global veriler için mükemmeldir. Ek kütüphane gerektirmez, öğrenme eğrisi düşüktür.
            </p>
            <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">Hafif ve Esnek</span>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-blue-500" size={24} />
              <h4 className="font-bold text-slate-900 dark:text-white">Redux / Toolkit</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Yüksek frekanslı güncellemeler ve karmaşık state mantığı (middleware, undo/redo, devtools) için tasarlanmıştır. Veri akışını kesin kurallarla (actions, reducers) yönetir. Büyük ölçekli kurumsal uygulamalarda standarttır.
            </p>
            <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">Güçlü ve Yapısal</span>
          </div>
        </div>
      </Section>

      <Section 
        id="theme-engine" 
        title="Uygulamalı Senaryo: Config/Theme Provider" 
        description="Portalın şu an kullandığı tema sistemi, Context API üzerinden tüm renk değişkenlerini CSS katmanıyla senkronize eder."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400">
            <p>
              Projemizdeki <code>ThemeContext</code>, kullanıcının karanlık veya aydınlık mod tercihini tutar. Provider bileşeni değişim anında:
            </p>
            <ol className="text-sm space-y-2">
              <li>State güncellenir.</li>
              <li><code>localStorage</code> üzerine tercih kaydedilir.</li>
              <li>HTML kök dizinine (<code>document.documentElement</code>) 'dark' sınıfı eklenir/çıkarılır.</li>
            </ol>
            <p className="text-xs italic mt-4">
              Bu sayede Tailwind CSS ve özel CSS değişkenleri anlık olarak tüm arayüzü günceller.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-[3rem] border border-slate-200 dark:border-slate-800 text-center transition-all duration-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="mb-8 p-6 rounded-[2rem] bg-white dark:bg-slate-800 shadow-xl inline-block relative">
              {theme === 'light' ? (
                <Sun className="w-20 h-20 text-amber-500 animate-in zoom-in duration-500" />
              ) : (
                <Moon className="w-20 h-20 text-indigo-400 animate-in zoom-in duration-500" />
              )}
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Aktif Tema: <span className="text-primary-600 uppercase tracking-widest">{theme}</span>
            </h3>
            
            <button
              onClick={toggleTheme}
              className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
            >
              Temayı Dönüştür
              <Zap size={18} className="group-hover:fill-current" />
            </button>
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="tip" title="Best Practice: Context Ayrıştırma">
          Büyük bir context nesnesi oluşturmak yerine, mantıksal olarak ayrılmış küçük contextler kullanın. Bu, sadece ilgili context değiştiğinde sadece o veriyi tüketen bileşenlerin render edilmesini sağlar.
        </Callout>
        <Callout type="warning" title="Anti-pattern: Props Yerine Sürekli Context">
          Her veriyi context'e taşımayın. Eğer veri sadece 2-3 seviye aşağıya gidiyorsa, standart props kullanımı kodun okunabilirliği ve bileşenin bağımsızlığı (component isolation) için daha sağlıklıdır.
        </Callout>
      </div>
    </div>
  );
};

export default ContextAndTheme;


