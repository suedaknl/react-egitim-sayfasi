import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Globe, Server, AlertCircle, Loader2, User, Mail } from 'lucide-react';
import Section from '../components/Section';
import CodeSnippet from '../components/CodeSnippet';
import Callout from '../components/Callout';

// 1. Axios Instance ve Interceptor Örneği (Teknik Gösterim)
const axiosInstanceCode = `import axios from 'axios';

// 1. Merkezi bir instance oluşturma
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// 2. Request Interceptor: Her istekten önce çalışır
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Response Interceptor: Her cevaptan sonra çalışır
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    // Oturum sonlanmışsa login'e yönlendir
  }
  return Promise.reject(error);
});`;

interface UserData {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

const ApiAndDataFetching: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simülasyon için gecikme
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message || 'Veri çekilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          API ve Veri Çekme (Axios)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Modern web uygulamalarında sunucu ile iletişim ve asenkron veri yönetimi.
        </p>
      </div>

      <Section 
        id="theory" 
        title="Akademik Bakış: Neden Axios?" 
        description="Axios, Promise tabanlı yapısı ile tarayıcıların sunduğu Fetch API'sine güçlü bir alternatif sunar."
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>Axios</strong>, hem tarayıcıda hem de Node.js ortamında çalışabilen, HTTP isteklerini yönetmek için kullanılan popüler bir kütüphanedir. Fetch API'sine kıyasla birçok yerleşik avantaj sunar:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Otomatik JSON Dönüşümü:</strong> Gelen cevabı manuel olarak <code>.json()</code> yapmanıza gerek kalmaz.</li>
              <li><strong>Interceptors:</strong> İstekler gönderilmeden veya cevaplar alınmadan hemen önce global olarak müdahale edebilirsiniz (Token ekleme, loglama vb.).</li>
              <li><strong>Hata Yönetimi:</strong> HTTP hatalarını (4xx, 5xx) otomatik olarak <code>catch</code> bloğuna düşürür.</li>
              <li><strong>İstek İptali:</strong> Devam eden bir isteği (request) kolayca durdurabilirsiniz.</li>
            </ul>
          </div>
          <CodeSnippet code={axiosInstanceCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="demo" 
        title="İnteraktif Demo: Kullanıcı Rehberi" 
        description="JSONPlaceholder üzerinden çekilen gerçek verilerle Loading, Error ve Data durumlarının yönetimi."
      >
        <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="text-primary-500" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">Sunucu Verisi (JSONPlaceholder)</h3>
            </div>
            <button 
              onClick={fetchUsers}
              disabled={loading}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
            >
              {loading ? 'Güncelleniyor...' : 'Veriyi Yenile'}
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                <Loader2 size={40} className="animate-spin text-primary-500" />
                <p className="font-medium animate-pulse">Veriler güvenli kanaldan çekiliyor...</p>
              </div>
            ) : error ? (
              <div className="py-12 flex flex-col items-center justify-center text-rose-500 gap-3">
                <AlertCircle size={40} />
                <p className="font-bold">Bağlantı Hatası!</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                  <div key={user.id} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-primary-500 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                        <User size={20} />
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate">{user.name}</h4>
                    </div>
                    <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-slate-400" />
                        <span className="truncate">{user.company.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="tip" title="Teknik İpucu: Interceptors">
          Interceptors sayesinde her isteğe manuel olarak `Authorization` header'ı eklemekten kurtulursunuz. Ayrıca 401 (Unauthorized) hatalarını tek bir merkezden yakalayıp kullanıcıyı login sayfasına yönlendirebilirsiniz.
        </Callout>
        <Callout type="info" title="Hata Yönetimi (Error Handling)">
          Axios'ta hatalar hiyerarşiktir. `error.response` varsa sunucudan hata dönmüştür, `error.request` varsa isteğe cevap gelmemiştir. Bu ayrım, daha iyi bir kullanıcı deneyimi (UX) için kritiktir.
        </Callout>
      </div>
    </div>
  );
};

export default ApiAndDataFetching;
