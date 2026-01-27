import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LazyMotion, domMax } from 'framer-motion';

const LandingPage = lazy(() => import('./components/LandingPage'));
const ComingSoon = lazy(() => import('./components/ComingSoon'));
const Legal = lazy(() => import('./components/Legal'));
const AboutUs = lazy(() => import('./components/AboutUs'));
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <LazyMotion features={domMax} strict>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/vendor" element={<ComingSoon />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Suspense>
      </LazyMotion>
    </SmoothScroll>
  );
}

export default App;
