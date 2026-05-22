import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { RefreshCw, Server, AlertCircle, Loader2 } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

const queryCode = `import { useQuery, useQueryClient } from '@tanstack/react-query';

// 1. Veri Çekme Fonksiyonu
const fetchPosts = async () => {
  const { data } = await axios.get('https://api.example.com/posts');
  return data;
};

// 2. useQuery Kullanımı
const { data, isLoading, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5000 // 5 saniye boyunca veri "taze" kabul edilir
});

// 3. Manuel Yenileme (Invalidation)
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['posts'] });`;

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
  return data;
};

const AdvancedDataManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 30000, // 30 saniye
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Gelişmiş Veri Yönetimi (React Query)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Sunucu state yönetimi, akıllı önbellekleme (caching) ve otomatik senkronizasyon stratejileri.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Akademik Bakış: Sunucu vs İstemci State" 
        description="React Query, sunucudan gelen veriyi yönetme biçimimizi kökten değiştirir."
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Geleneksel state yönetimi (Redux, Context vb.), sunucudan gelen veriyi "istemci state'i" gibi ele alır. Ancak sunucu verisi asenkrondur ve her an değişebilir. 
              <strong>React Query</strong>, bu veriyi <strong>Server State</strong> olarak tanımlar ve kendi yaşam döngüsüyle (caching, background refetching) yönetir.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>Caching:</strong> Veri bir kez çekildiğinde hafızaya alınır, aynı sayfaya dönüldüğünde anında gösterilir.</li>
              <li><strong>Refetching:</strong> Veri "stale" (bayat) olduğunda veya pencere odağa geldiğinde otomatik olarak güncellenir.</li>
              <li><strong>Status Management:</strong> Loading, Error ve Success durumlarını manuel state tutmadan sağlar.</li>
            </ul>
          </div>
          <CodeSnippet code={queryCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="demo" 
        title="İnteraktif Demo: Akıllı Veri Senkronizasyonu" 
        description="Aşağıdaki liste React Query tarafından yönetilmektedir. Veri çekme ve manuel cache temizleme (invalidation) süreçlerini inceleyin."
      >
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-inner overflow-hidden relative">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isFetching ? 'bg-primary-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                <Server size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Post Servisi</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                  {isFetching ? 'Veri Senkronize Ediliyor...' : 'Önbellekten Sunuluyor'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isFetching}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl shadow-sm hover:border-primary-500 transition-all active:scale-95"
            >
              <RefreshCw size={18} className={isFetching ? 'animate-spin' : ''} />
              Cache'i Temizle & Yenile
            </button>
          </div>

          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Loader2 size={48} className="animate-spin text-primary-500" />
              <p className="text-slate-400 font-medium">İlk veri yüklemesi yapılıyor...</p>
            </div>
          ) : isError ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-rose-500">
              <AlertCircle size={48} />
              <p className="font-bold">Bir hata oluştu!</p>
              <p className="text-xs opacity-70">{(error as any)?.message}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
              {data?.map(post => (
                <div key={post.id} className="p-6 bg-white dark:bg-dark-card border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-full mb-4 text-xs font-black">
                    {post.id}
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{post.title}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="info" title="React Query Nedir?">
          Asenkron verilerin çekilmesi, önbelleğe alınması, senkronize edilmesi ve güncellenmesini sağlayan bir "Server State" kütüphanesidir. Redux gibi genel bir state kütüphanesinin yerini almaz, ancak sunucu verilerini yönetmek için çok daha gelişmiş bir çözüm sunar.
        </Callout>
        <Callout type="warning" title="Önemli İpuçları: Stale vs Cache">
          <ul className="list-disc pl-4 space-y-2 text-xs">
            <li><strong>Stale Time:</strong> Verinin ne kadar süre "taze" (fresh) kabul edileceğini belirler. Bu süre boyunca arka planda refetch yapılmaz.</li>
            <li><strong>Cache Time:</strong> Kullanılmayan verinin ne kadar süre hafızada (memory) tutulacağını belirler.</li>
            <li><strong>Invalidation:</strong> <code>invalidateQueries</code> fonksiyonu ile manuel olarak cache'i geçersiz kılıp veriyi zorla yeniletebilirsiniz.</li>
          </ul>
        </Callout>
      </div>
    </div>
  );
};

export default AdvancedDataManagement;
