import React from 'react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';
import CounterDemo from '../components/Interactive/CounterDemo';
import { ArrowRight, Atom, Sparkles, Zap, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const componentCode = `import React from 'react';

// Fonksiyonel bir React Bileşeni ve Tip Güvenliği
interface WelcomeProps {
  title: string;
}

const WelcomeCard: React.FC<WelcomeProps> = ({ title }) => {
  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <p>Bileşen tabanlı mimari ile UI yönetimi.</p>
    </div>
  );
};

export default WelcomeCard;`;

const basicPropsCode = `// Temel Props Kullanımı
const User = ({ name }: { name: string }) => <h1>{name}</h1>;`;

const realWorldPropsCode = `import React from 'react';

// Gerçek Hayat Senaryosu: Veri Odaklı Dashboard Kartı
interface DashboardCardProps {
  id: string;
  label: string;
  value: number | string;
  trend: 'up' | 'down';
  status?: 'active' | 'idle' | 'warning';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  label, value, trend, status = 'idle' 
}) => {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm border border-slate-100">
      <span className="text-xs text-slate-500 uppercase">{label}</span>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className={\`w-2 h-2 rounded-full \${
          status === 'active' ? 'bg-green-500' : 
          status === 'warning' ? 'bg-amber-500' : 'bg-slate-300'
        }\`} />
        <span className="text-xs capitalize text-slate-400">{status}</span>
      </div>
    </div>
  );
};`;

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-4 mb-8">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        {/* Abstract Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <Atom className="absolute top-10 right-[15%] text-slate-200 dark:text-slate-800/40 w-32 h-32 rotate-12 opacity-50" />
          <Zap className="absolute bottom-20 left-[10%] text-slate-200 dark:text-slate-800/40 w-16 h-16 -rotate-12 opacity-30" />
          <Code2 className="absolute top-1/2 right-[5%] text-slate-200 dark:text-slate-800/30 w-24 h-24 rotate-45 opacity-20" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 backdrop-blur-md mb-8 animate-bounce-slow">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Geleceğin Arayüzlerini İnşa Edin</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
            <span className="block text-slate-900 dark:text-white mb-2">MODERN REACT &</span>
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-400 bg-clip-text text-transparent italic">TSX REHBERİ</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
            Bileşenler, Hook'lar, State Yönetimi, API Entegrasyonu ve Performans Optimizasyonunu içeren Kapsamlı Bir Eğitim Portalı.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link 
              to="/performance" 
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full" />
              <span className="relative flex items-center gap-2">
                BAŞLA <ArrowRight size={20} />
              </span>
            </Link>

            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-5 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center gap-2"
            >
              RESMİ DÖKÜMANLAR
            </a>
          </div>
        </div>
      </div>


      <div className="space-y-16">
        <Section 
          id="philosophy" 
          title="Bileşen Tabanlı Mimari ve Deklaratif Yapı" 
          description="React'in temel felsefesi, UI'ı atomik ve bağımsız parçalara bölerek durum (state) değişikliklerine duyarlı bir sistem inşa etmektir."
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
              <h3 className="text-slate-900 dark:text-white">Virtual DOM ve Reconciliation</h3>
              <p>
                React, doğrudan tarayıcı DOM'u ile çalışmak yerine, bellek üzerinde hafif bir <strong>Virtual DOM</strong> kopyası oluşturur. Bir değişiklik olduğunda, React "Reconciliation" (Uzlaştırma) algoritmasını kullanarak eski ve yeni Virtual DOM arasındaki farkı (diffing) hesaplar.
              </p>
              <p>
                Bu süreç, tarayıcıya sadece değişen parçaların (patch) gönderilmesini sağlayarak, maliyetli DOM operasyonlarını minimize eder ve uygulama performansını maksimize eder.
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>Kompozisyon:</strong> Bileşenler birbirini kapsayarak karmaşık ağaç yapıları oluşturur.</li>
                <li><strong>Tek Yönlü Veri Akışı:</strong> Veri her zaman yukarıdan (Parent) aşağıya (Child) akar.</li>
              </ul>
            </div>
            <CodeSnippet code={componentCode} />
          </div>
        </Section>

        <Section 
          id="data-flow" 
          title="Tip Güvenli Veri Aktarımı: Props" 
          description="Bileşenler arası iletişim, TypeScript arayüzleri ile tanımlanan Props (Properties) nesneleri üzerinden sağlanır."
        >
          <div className="space-y-8">
            <div className="text-slate-600 dark:text-slate-400 max-w-3xl">
              <p>
                React'te her bileşen aslında bir fonksiyondur ve aldığı argümanlara <strong>Props</strong> denir. TypeScript kullanımı, bu verilerin yanlış tiplerde gönderilmesini derleme (compile) aşamasında engelleyerek çalışma zamanı (runtime) hatalarını minimize eder.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Temel Kullanım</h4>
                <CodeSnippet code={basicPropsCode} language="typescript" />
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Gerçek Hayat Senaryosu</h4>
                <CodeSnippet code={realWorldPropsCode} language="tsx" />
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="state-management" 
          title="Dinamik Durum Yönetimi: useState" 
          description="Bileşenin yaşam döngüsü boyunca değişen ve UI'ın yeniden çizilmesini tetikleyen verilere State (Durum) denir."
        >
          <div className="grid xl:grid-cols-2 gap-12 items-center">
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <h3 className="text-slate-900 dark:text-white">Re-render Mekanizması</h3>
              <p>
                <code>useState</code> kancası (hook), React'in bir bileşeni "izlemesini" sağlar. Durum güncelleme fonksiyonu (setCount gibi) çağrıldığında, React ilgili bileşeni ve onun alt ağacını yeniden render kuyruğuna ekler.
              </p>
              <p>
                Bu süreçte bellek yönetimi kritik önem taşır; React, renderlar arasında state değerini korumak için özel bir veri yapısı kullanır.
              </p>
              <Callout type="tip" title="En İyi Uygulama (Best Practice)">
                State güncellerken eğer yeni değer eski değere bağlıysa (örn: sayaç), her zaman fonksiyonel güncellemeyi tercih edin: <code>setCount(prev =&gt; prev + 1)</code>. Bu, asenkron güncellemelerde yarış durumlarını (race conditions) önler.
              </Callout>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
              <h4 className="text-center font-bold text-slate-500 mb-6 uppercase tracking-widest text-xs">Etkileşim Laboratuvarı</h4>
              <CounterDemo />
            </div>
          </div>
        </Section>

        <div className="grid md:grid-cols-2 gap-6">
          <Callout type="warning" title="Sık Yapılan Hata (Anti-pattern)">
            State'i doğrudan değiştirmeye çalışmayın (Örn: <code>state.value = 5</code>). React, bu değişikliği Virtual DOM'da fark edemez ve UI güncellenmez. Her zaman setter fonksiyonunu kullanın.
          </Callout>
          <Callout type="info" title="Mimari İpucu">
            Bileşenlerinizi mümkün olduğunca "saf" (pure) tutun. Bir bileşen, aynı props ve state ile her zaman aynı çıktıyı üretmelidir. Yan etkileri (API çağrıları vb.) sadece <code>useEffect</code> içinde yönetin.
          </Callout>
        </div>
      </div>
    </div>
  );
};

export default Home;
