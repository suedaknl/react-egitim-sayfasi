import React, { useReducer } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, RotateCcw, Package, CreditCard } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

// 1. Tip ve Başlangıç State Tanımları
type CartItem = { id: number; name: string; price: number; quantity: number };
type CartState = { items: CartItem[]; total: number; itemCount: number };

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { id: number; name: string; price: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialCartState: CartState = { items: [], total: 0, itemCount: 0 };

// 2. Reducer Fonksiyonu (İş Mantığı Ayrıştırılmış)
function calculateTotals(items: CartItem[]) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 1) return state;
      const newItems = state.items.map(item => 
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return { items: newItems, ...calculateTotals(newItems) };
    }

    case 'CLEAR_CART':
      return initialCartState;

    default:
      return state;
  }
}

const PRODUCTS = [
  { id: 1, name: 'Premium Kablosuz Kulaklık', price: 2450 },
  { id: 2, name: 'Mekanik Klavye (RGB)', price: 1890 },
  { id: 3, name: 'Ergonomik Mouse', price: 950 },
];

const reducerCode = `// Reducer Fonksiyonu: State ve Action alır, yeni State döner.
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Yeni state kopyası oluşturularak döner (Immutability)
      return { ...state, items: [...state.items, action.payload] };
    // ... diğer durumlar
    default:
      return state;
  }
}

// Bileşen İçinde Kullanım
const [state, dispatch] = useReducer(cartReducer, initialState);`;

const AdvancedState: React.FC = () => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Durum Yönetimi Mimarisi (useReducer)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Deterministik state geçişleri ve karmaşık iş mantıklarının merkezi yönetimi.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Akademik Bakış: Reducer Deseni" 
        description="useReducer, React uygulamalarında state yönetimini bir 'Action - Dispatch - Reducer' döngüsü içine alır."
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>useReducer</strong>, state'in nasıl güncelleneceğine dair mantığı bileşenden ayırıp saf (pure) bir fonksiyona taşır. Bu, özellikle birbirine bağlı alt değerlerin bulunduğu veya state değişiminin karmaşık iş kurallarına tabi olduğu durumlarda (Business Logic) tercih edilir.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Action:</strong> State'de ne tür bir değişiklik yapılacağını tanımlayan nesnedir. Genellikle bir <code>type</code> ve isteğe bağlı bir <code>payload</code> içerir.</li>
              <li><strong>Dispatch:</strong> Aksiyonları reducer fonksiyonuna gönderen tetikleyici mekanizmadır.</li>
              <li><strong>Reducer:</strong> Mevcut durumu ve aksiyonu alıp, "değişmezlik" (immutability) prensibine uygun olarak yepyeni bir state kopyası üreten merkezi fonksiyondur.</li>
            </ul>
          </div>
          <CodeSnippet code={reducerCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="demo" 
        title="İnteraktif Demo: Alışveriş Sepeti (Shopping Cart)" 
        description="Ekleme, miktar güncelleme ve toplam tutar hesaplama işlemlerinin useReducer ile merkezi yönetimi."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ürün Listesi */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2 mb-4">
              <Package size={20} className="text-primary-500" /> Katalog
            </h3>
            {PRODUCTS.map(product => (
              <div key={product.id} className="p-4 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between shadow-sm hover:border-primary-500 transition-all group">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{product.name}</h4>
                  <p className="text-primary-600 font-medium">{product.price} ₺</p>
                </div>
                <button 
                  onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold group-hover:bg-primary-600 group-hover:text-white transition-all"
                >
                  Ekle
                </button>
              </div>
            ))}
          </div>

          {/* Sepet Detayı */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col h-full border border-slate-800">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-primary-400" />
                <h3 className="font-bold text-xl">Sepetiniz</h3>
              </div>
              <span className="bg-primary-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                {state.itemCount} Ürün
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] mb-6 pr-2 custom-scrollbar-dark">
              {state.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 opacity-50 py-10">
                  <ShoppingCart size={40} />
                  <p className="text-sm">Sepetiniz boş.</p>
                </div>
              ) : (
                state.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-primary-400 font-medium">{item.price} ₺</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-700">
                        <button 
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                          className="p-1 hover:text-primary-400 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                          className="p-1 hover:text-primary-400 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        className="text-rose-500 hover:bg-rose-500/10 p-1.5 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-800 pt-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Toplam Tutar</p>
                  <p className="text-3xl font-black text-primary-400 tabular-nums">{state.total} ₺</p>
                </div>
                {state.items.length > 0 && (
                  <button 
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    <RotateCcw size={14} /> Temizle
                  </button>
                )}
              </div>
              <button 
                disabled={state.items.length === 0}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 text-white font-black rounded-xl transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Ödemeye Geç
              </button>
            </div>
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="info" title="Ne Zaman Kullanılmalı?">
          <ul className="list-disc pl-4 space-y-1">
            <li>State yapısı iç içe geçmiş (nested) nesnelerden oluşuyorsa.</li>
            <li>Bir sonraki state, önceki state'e bağlı olarak hesaplanıyorsa.</li>
            <li>Aynı anda birden fazla state değerinin güncellenmesi gerekiyorsa.</li>
            <li>State güncelleme mantığını test edilebilir, saf fonksiyonlara taşımak istiyorsanız.</li>
          </ul>
        </Callout>
        <Callout type="tip" title="Avantajları">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Okunabilirlik:</strong> Tüm state değişimleri tek bir <code>switch-case</code> altında toplanır.</li>
            <li><strong>Öngörülebilirlik:</strong> Aksiyonlar sayesinde state'in nasıl değiştiği izlenebilir (Time-travel debugging dostu).</li>
            <li><strong>Performans:</strong> Gereksiz <code>useState</code> çağrılarından kurtarır.</li>
          </ul>
        </Callout>
      </div>
    </div>
  );
};

export default AdvancedState;
