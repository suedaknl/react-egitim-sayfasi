import React from 'react';
import Section from '../components/Section';
import Callout from '../components/Callout';
import CodeSnippet from '../components/CodeSnippet';

import { Compass, Map, Unlock, Layers, Share2 } from 'lucide-react';

const basicRoutingCode = `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <nav>
      <Link to="/">Anasayfa</Link>
      <Link to="/about">Hakkımızda</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);`;

const dynamicRoutingCode = `// Dinamik Rota Tanımı
<Route path="/user/:id" element={<UserProfile />} />

// useParams ile Erişim
const UserProfile = () => {
  const { id } = useParams();
  return <div>Kullanıcı ID: {id}</div>;
};

// useNavigate ile Yönlendirme
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    // İşlemler...
    navigate('/dashboard');
  };
  return <button onClick={handleLogin}>Giriş Yap</button>;
};`;

const nestedRoutingCode = `// App.tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>

// DashboardLayout.tsx
const DashboardLayout = () => (
  <div className="layout">
    <Sidebar />
    <main>
      {/* Alt rotalar burada render edilir */}
      <Outlet />
    </main>
  </div>
);`;

const protectedRouteCode = `const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Kullanımı
<Route 
  path="/admin" 
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  } 
/>`;

const RoutingAndNavigation: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Routing ve Navigasyon
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          React Router Dom v6 ile modern navigasyon stratejileri, nested routes ve programatik yönlendirme.
        </p>
      </div>

      <Section 
        id="concepts" 
        title="Modern Navigasyon Kavramları" 
        description="SPA (Single Page Application) mimarisinde sayfa yenilenmeden görünüm yönetimi."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              React uygulamalarında navigasyon, tarayıcının varsayılan sayfa yenileme davranışını engelleyerek 
              URL ile bileşen hiyerarşisini senkronize etme işlemidir.
            </p>
            <ul className="space-y-4 mt-6">
              <li className="flex gap-3">
                <Compass className="text-primary-500 shrink-0" size={20} />
                <span><strong>BrowserRouter:</strong> Uygulamanın yönlendirme geçmişini (history) yöneten ve Context sağlayan ana bileşen.</span>
              </li>
              <li className="flex gap-3">
                <Layers className="text-primary-500 shrink-0" size={20} />
                <span><strong>Routes & Route:</strong> URL eşleşmelerini kontrol eden ve hangi URL'de hangi bileşenin render edileceğini belirleyen tanımlayıcılar.</span>
              </li>
              <li className="flex gap-3">
                <Share2 className="text-primary-500 shrink-0" size={20} />
                <span><strong>Link:</strong> <code>&lt;a&gt;</code> etiketinin yerine geçen, sayfa yenilenmesini önleyerek navigasyon sağlayan bileşen.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Temel Yapı</h4>
            <CodeSnippet code={basicRoutingCode} language="tsx" />
          </div>
        </div>
      </Section>

      <Section 
        id="hooks" 
        title="Dinamik Rota ve Programatik Kontrol" 
        description="URL üzerinden veri taşıma ve olay tabanlı yönlendirme mekanizmaları."
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Map size={20} className="text-indigo-500" /> useParams Hook'u
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                URL içerisindeki dinamik kısımları (örn: <code>/urun/:slug</code>) okuyarak bileşen içerisinde kullanmanızı sağlar. Bu, aynı şablonun farklı verilerle gösterilmesini sağlar.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Unlock size={20} className="text-emerald-500" /> useNavigate Hook'u
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Bir form gönderimi veya login işlemi sonrası kullanıcıyı otomatik olarak başka bir sayfaya yönlendirmek için kullanılan fonksiyonel bir araçtır.
              </p>
            </div>
          </div>
          <CodeSnippet code={dynamicRoutingCode} language="tsx" />
        </div>
      </Section>

      <Section 
        id="advanced" 
        title="İleri Seviye: Nested Routes & Protection" 
        description="Karmaşık layout yapıları ve yetkilendirme tabanlı erişim kontrolü."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest text-xs">İç İçe Rotalar (Outlet)</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Özellikle Admin paneli veya Dashboard gibi ortak bir kenar çubuğuna (Sidebar) sahip yapılarda, 
              sadece değişen içeriği render etmek için <code>&lt;Outlet /&gt;</code> bileşeni kullanılır.
            </p>
            <CodeSnippet code={nestedRoutingCode} language="tsx" />
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest text-xs">Rota Koruması (Protected Route)</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Giriş yapmamış kullanıcıların Admin sayfası gibi özel alanlara erişmesini engellemek için Route bileşenleri yüksek seviyeli bir kontrol bileşeni ile sarmalanır.
            </p>
            <CodeSnippet code={protectedRouteCode} language="tsx" />
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Callout type="tip" title="İpucu: NavLink Kullanımı">
          Menü öğelerinde aktif olan sayfayı stilize etmek için <code>Link</code> yerine <code>NavLink</code> kullanın. NavLink, otomatik olarak <code>.active</code> sınıfı ekler.
        </Callout>
        <Callout type="error" title="Sık Yapılan Hata">
          Dış bağlantılar (örn: google.com) için <code>Link</code> bileşeni kullanmayın. <code>Link</code> sadece uygulama içi rotalar içindir. Dış bağlantılar için standart <code>&lt;a&gt;</code> etiketi kullanılmalıdır.
        </Callout>
      </div>
    </div>
  );
};

export default RoutingAndNavigation;

