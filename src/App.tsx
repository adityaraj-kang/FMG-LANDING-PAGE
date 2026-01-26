import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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
      <Analytics />
    </>
  );
}

export default App;
