import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LandingPage from './components/LandingPage';
import ComingSoon from './components/ComingSoon';

import Legal from './components/Legal';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendor" element={<ComingSoon />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <SpeedInsights />
    </>
  );
}

export default App;
