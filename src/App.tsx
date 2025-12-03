import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from './components/Analytics';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { SanityConfigProvider } from './contexts/SanityConfigContext';
import { Home } from './pages/Home';

// Lazy loading de páginas secundarias
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ClientsPage = lazy(() =>
  import('./pages/ClientsPage').then((m) => ({ default: m.ClientsPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const NovedadesPage = lazy(() =>
  import('./pages/NovedadesPage').then((m) => ({ default: m.NovedadesPage }))
);
const LinksPage = lazy(() => import('./pages/LinksPage').then((m) => ({ default: m.default })));

const App: React.FC = () => {
  return (
    <SanityConfigProvider>
      <LoadingScreen />
      <BrowserRouter basename="/es">
        <Analytics />
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/novedades" element={<NovedadesPage />} />
            <Route path="/links" element={<LinksPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SanityConfigProvider>
  );
};

export default App;
