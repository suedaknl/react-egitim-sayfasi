# 🚀 Modern React & TSX Rehberi

Bu proje, React ve TypeScript (TSX) kullanarak modern, bileşen tabanlı ve tip güvenli web arayüzleri geliştirme becerilerini sergilemek amacıyla hazırlanmış kapsamlı ve etkileşimli bir eğitim portalıdır. Single Page Application (SPA) mimarisiyle inşa edilmiş olup, temel kavramlardan ileri seviye durum yönetimi ve API entegrasyonlarına kadar geniş bir müfredatı kapsar.

## 🌟 Proje Özellikleri

* **İnteraktif Öğrenme Deneyimi:** Her konu, teorik anlatımın yanı sıra gerçek hayat senaryolarını simüle eden çalışan demolarla (Örn: Alışveriş Sepeti, Özel Video Player, Dinamik Formlar) desteklenmiştir.
* **Modern ve Tip Güvenli Mimari:** Projenin tamamı TypeScript ile geliştirilmiş, `interface` ve `type` tanımlamaları ile uçtan uca tip güvenliği sağlanmıştır.
* **Gelişmiş Durum Yönetimi:** Local state (`useState`, `useReducer`), global state (Redux Toolkit, Context API) ve server state (React Query) mimarilerinin tamamı projenin ilgili modüllerine entegre edilmiştir.
* **Performans Optimizasyonları:** `useMemo`, `useCallback` ve `useLayoutEffect` gibi ileri seviye hook'lar kullanılarak gereksiz render (re-render) ve görsel titreme (flicker) sorunları optimize edilmiştir.
* **Dinamik Form Yönetimi:** `react-hook-form` ve `yup` şema doğrulama (validation) kütüphaneleri ile dinamik alan (dynamic field) ekleme ve anlık hata fırlatma özellikleri implemente edilmiştir.

## 🛠️ Teknoloji Yığını

* **Core:** React 18, TypeScript, Vite
* **Routing:** React Router v6 (Nested Routes, Dynamic Routing)
* **State Management:** Redux Toolkit, React Context API
* **Data Fetching & API:** Axios, TanStack React Query
* **Form & Validation:** React Hook Form, Yup
* **Styling & UI:** Tailwind CSS (Dark/Light Mode desteği)

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Bağımlılıkları Yükleyin:**
   Proje dizininde terminali açın ve gerekli paketleri indirin.
   ```bash
   npm install
   
2. Geliştirme Sunucusunu Başlatın:
Vite geliştirici sunucusunu ayağa kaldırmak için aşağıdaki komutu çalıştırın.

Bash
npm run dev

3.Projeyi Görüntüleyin:
Terminalde beliren yerel sunucu adresine (genellikle http://localhost:5173) tarayıcınız üzerinden giderek projeyi inceleyebilirsiniz.

📂 Proje Yapısı
Plaintext
src/
 ├── components/       # Tekrar kullanılabilir UI bileşenleri (Callout, Header vb.)
 ├── pages/            # React Router ile bağlanan ana eğitim sayfaları
 ├── layouts/          # Sayfa iskeleti (Sidebar ve Outlet içeren MainLayout)
 ├── types/            # TypeScript interface ve tip tanımlamaları
 ├── store/            # Redux Toolkit slice ve store konfigürasyonları
 ├── App.tsx           # Ana uygulama ve Route yapılandırması
 └── index.css         # Tailwind direktifleri ve global stiller

👩‍💻 Geliştirici

Süeda Kanlı Samsun Üniversitesi, Yazılım Mühendisliği

