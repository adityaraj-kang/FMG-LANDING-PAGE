import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ComingSoon from './components/ComingSoon';

import Legal from './components/Legal';
import AboutUs from './components/AboutUs';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendor" element={<ComingSoon />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </SmoothScroll>
  );
}

export default App;
