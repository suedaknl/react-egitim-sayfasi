import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PerformanceHooks from './pages/PerformanceHooks';
import RefsAndDOM from './pages/RefsAndDOM';
import AdvancedState from './pages/AdvancedState';
import LayoutEffectDemo from './pages/LayoutEffect';
import FormValidation from './pages/FormValidation';
import ContextAndTheme from './pages/ContextAndTheme';

// Yeni Sayfalar
import RoutingAndNavigation from './pages/RoutingAndNavigation';
import ApiAndDataFetching from './pages/ApiAndDataFetching';
import AdvancedDataManagement from './pages/AdvancedDataManagement';
import GlobalStateManagement from './pages/GlobalStateManagement';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="performance" element={<PerformanceHooks />} />
          <Route path="refs" element={<RefsAndDOM />} />
          <Route path="reducer" element={<AdvancedState />} />
          <Route path="layout-effect" element={<LayoutEffectDemo />} />
          <Route path="form" element={<FormValidation />} />
          <Route path="context" element={<ContextAndTheme />} />
          
          {/* Yeni Sayfalar */}
          <Route path="routing" element={<RoutingAndNavigation />} />
          <Route path="api" element={<ApiAndDataFetching />} />
          <Route path="data-management" element={<AdvancedDataManagement />} />
          <Route path="global-state" element={<GlobalStateManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
