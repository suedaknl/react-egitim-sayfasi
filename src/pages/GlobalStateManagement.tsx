import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';
import { Database, Zap, Plus, Minus, RotateCcw, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

const reduxCode = `// 1. Slice Tanımlama (createSlice)
export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// 2. Bileşen İçinde Kullanım (useSelector & useDispatch)
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();

<button onClick={() => dispatch(increment())}>Artır</button>`;

const GlobalStateManagement: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<number>(5);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Global State Yönetimi (Redux Toolkit)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Uygulama genelindeki verinin merkezi bir kaynaktan (Single Source of Truth) yönetilmesi.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Akademik Bakış: Neden Redux?" 
        description="Büyük ölçekli React uygulamalarında bileşenler arası veri iletimi (Prop Drilling) karmaşıklığı Redux ile çözülür."
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>Redux</strong>, "Single Source of Truth" (Tek Gerçek Kaynak) prensibi üzerine kuruludur. Uygulamanın tüm state'i tek bir <strong>Store</strong> içinde tutulur. Bu yaklaşım, verinin uygulamanın her yerinden öngörülebilir bir şekilde erişilmesini ve güncellenmesini sağlar.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Store:</strong> Uygulama durumunun (state) tutulduğu merkezi depo.</li>
              <li><strong>Slice:</strong> Uygulamanın belirli bir bölümüne (örn: kullanıcı, sepet) ait state ve reducer mantığının birleşimi.</li>
              <li><strong>Action:</strong> State'i değiştirmek için gönderilen sinyal (type ve payload içerir).</li>
              <li><strong>Reducer:</strong> Action'ı alıp state'i güncelleyen saf fonksiyon (RTK'da iç mantıkta Immer ile kolaylaştırılmıştır).</li>
            </ul>
          </div>
          <CodeSnippet code={reduxCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="demo" 
        title="İnteraktif Demo: Global Sayaç Sistemi" 
        description="Redux Store üzerindeki verinin farklı metotlarla (basic ve payload) güncellenmesi."
      >
        <div className="max-w-2xl mx-auto bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-teal-400" />
          
          <div className="text-center mb-12">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Global State Değeri</p>
            <h2 className="text-7xl font-black text-primary-600 dark:text-primary-400 tabular-nums">{count}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" /> Temel Kontroller
              </h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => dispatch(decrement())}
                  className="flex-1 p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all"
                >
                  <Minus className="mx-auto" />
                </button>
                <button 
                  onClick={() => dispatch(increment())}
                  className="flex-1 p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-all shadow-lg shadow-primary-500/20"
                >
                  <Plus className="mx-auto" />
                </button>
              </div>
              <button 
                onClick={() => dispatch(reset())}
                className="w-full py-3 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw size={14} /> SIFIRLA
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Database size={18} className="text-primary-500" /> Payload Transferi
              </h4>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl outline-none focus:border-primary-500 text-slate-900 dark:text-white font-bold"
                />
                <button 
                  onClick={() => dispatch(incrementByAmount(inputValue))}
                  className="px-6 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  Ekle
                </button>
              </div>
              <p className="text-[10px] text-slate-500 italic">Girilen değer action.payload olarak reducer'a iletilir.</p>
            </div>
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="tip" title="Neden Redux Toolkit (RTK)?">
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li><strong>Basitlik:</strong> Eski Redux'taki karmaşık boilerplate kodları (switch-case, action types) ortadan kaldırır.</li>
            <li><strong>Immutability:</strong> İçerisinde <code>Immer</code> kütüphanesi barındırdığı için state'i doğrudan güncelliyor gibi kod yazmanıza izin verir.</li>
            <li><strong>Best Practices:</strong> Redux ekibinin önerdiği modern standartları (createSlice, configureStore) dayatır.</li>
          </ul>
        </Callout>
        <Callout type="info" title="Redux Akışı (Workflow)">
          <div className="flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400">
            UI (Event) <ArrowRight size={14} /> Dispatch(Action) <ArrowRight size={14} /> Reducer <ArrowRight size={14} /> Store Update <ArrowRight size={14} /> UI Re-render
          </div>
          <p className="mt-2 text-xs opacity-80 leading-relaxed">
            Bu döngü, verinin her zaman tek yönlü ve öngörülebilir bir şekilde akmasını sağlar, hata ayıklamayı (debugging) kolaylaştırır.
          </p>
        </Callout>
      </div>
    </div>
  );
};

export default GlobalStateManagement;
