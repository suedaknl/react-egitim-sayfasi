import React, { useState, useMemo, useCallback } from 'react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';
import { Search, DollarSign, Activity } from 'lucide-react';

const basicMemoCode = `// 1. Ağır bir hesaplamayı belleğe alma
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// 2. Bir fonksiyon referansını koruma
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`;

const PerformanceHooks: React.FC = () => {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);

  // Örnek Ürün Verisi (1000 adet)
  const products = useMemo(() => Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Ürün #${i + 1} - ${['Laptop', 'Telefon', 'Tablet', 'Kulaklık'][i % 4]}`,
    price: Math.floor(Math.random() * 5000) + 100,
    category: ['Elektronik', 'Aksesuar', 'Ofis'][i % 3]
  })), []);

  // Ürün Yönetim Paneli - Filtreleme Operasyonu (useMemo ile optimize edildi)
  const filteredProducts = useMemo(() => {
    console.log("%c[Performans] Filtreleme işlemi yürütülüyor...", "color: #3b82f6; font-weight: bold;");
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      p.price <= maxPrice
    );
  }, [searchTerm, maxPrice, products]);

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Performans ve Render Optimizasyonu
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          React'in re-render döngüsünü kontrol altına alarak bellek ve işlemci kaynaklarını verimli kullanma stratejileri.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Hesaplama ve Referans Optimizasyonu" 
        description="useMemo ve useCallback hook'ları ile gereksiz iş yükünü önleme."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
            <h3 className="text-slate-900 dark:text-white">Neden Optimizasyon?</h3>
            <p>
              React bileşenleri, state veya props değiştiğinde tamamen yeniden render edilir. Bu süreçte bileşen içindeki tüm fonksiyonlar ve değişkenler yeniden oluşturulur.
            </p>
            <ul className="space-y-4 list-none p-0">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">1</div>
                <span><strong>Expensive Calculations:</strong> Büyük veri setlerini filtrelemek veya karmaşık matematiksel işlemler yapmak her render'da maliyetlidir.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">2</div>
                <span><strong>Referential Equality:</strong> JavaScript'te fonksiyonlar ve objeler her render'da yeni bir referans alır. Bu, alt bileşenlerin gereksiz yere render olmasına neden olur.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Kod Örneği</h4>
            <CodeSnippet code={basicMemoCode} language="typescript" />
          </div>
        </div>
      </Section>

      <Section 
        id="product-demo" 
        title="Ürün Yönetim Paneli (İnteraktif Demo)" 
        description="1000 ürünlük bir listede arama ve filtreleme yaparken useMemo'nun performans etkisini gözlemleyin."
      >
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Kontrol Paneli */}
            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} className="text-blue-500" /> Bağımsız Render
                </h4>
                <p className="text-xs text-slate-500 mb-4">Bu sayaç değiştiğinde filtreleme işlemi <strong>tetiklenmez</strong>.</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-primary-600 tabular-nums">{count}</span>
                  <button 
                    onClick={handleIncrement}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-700 transition-colors"
                  >
                    Sayaç Arttır
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                  <Search size={16} className="text-indigo-500" /> Ürün Filtrele
                </h4>
                <input 
                  type="text" 
                  placeholder="İsimle ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                />
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Maksimum Fiyat:</span>
                  <span>{maxPrice} TL</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="5000" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>

            {/* Liste */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col h-[400px]">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Ürün Listesi ({filteredProducts.length} Sonuç)</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Optimize Edildi</span>
                </div>
              </div>
              <div className="overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {filteredProducts.slice(0, 50).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{product.name}</h5>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">{product.category}</span>
                    </div>
                    <div className="flex items-center text-primary-600 font-black">
                      <DollarSign size={14} />
                      <span>{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section 
        id="comparison" 
        title="useMemo vs useEffect Farkı" 
        description="Hangi hook'u hangi senaryo için tercih etmelisiniz?"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Özellik</th>
                <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">useMemo</th>
                <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">useEffect</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="p-4 font-bold text-slate-900 dark:text-slate-200 italic">Amaç</td>
                <td className="p-4">Değer hesaplama ve cache'leme (Memoization)</td>
                <td className="p-4">Yan etki (side effect) yönetimi</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="p-4 font-bold text-slate-900 dark:text-slate-200 italic">Dönüş Değeri</td>
                <td className="p-4">Hesaplanan sonucu döndürür</td>
                <td className="p-4">Temizleme (cleanup) fonksiyonu döndürebilir</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="p-4 font-bold text-slate-900 dark:text-slate-200 italic">Çalışma Zamanı</td>
                <td className="p-4 text-emerald-600 font-medium">Render sırasında (Bileşen ekrana gelmeden)</td>
                <td className="p-4 text-amber-600 font-medium">Render tamamlandıktan sonra</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900 dark:text-slate-200 italic">Kullanım Alanı</td>
                <td className="p-4">Ağır hesaplamalar, referans koruma</td>
                <td className="p-4">Veri çekme, DOM manipülasyonu, Abonelikler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="tip" title="Hangi Hook Ne Zaman?">
          Değerleri saklamak için <code>useMemo</code>, fonksiyon referanslarını saklamak için <code>useCallback</code> kullanın. Unutmayın; her ikisi de birer "hesaplama maliyeti" taşır. Sadece ağır işlemlerde tercih edilmelidir.
        </Callout>
        <Callout type="error" title="Sık Yapılan Hata">
          Her şeyi memoize etmeye çalışmayın! React zaten hızlıdır. Gereksiz yere kullanmak, bellek tüketimini arttırır ve kodu karmaşıklaştırır. Sadece performans darboğazı hissettiğinizde optimize edin.
        </Callout>
      </div>
    </div>
  );
};

export default PerformanceHooks;

