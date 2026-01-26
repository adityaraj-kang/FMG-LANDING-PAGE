import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemGrid from './components/ProblemGrid';
import SolutionFlow from './components/SolutionFlow';
import Ecosystem from './components/Ecosystem';

import InteractiveDemo from './components/InteractiveDemo';

import Footer from './components/Footer';
import WaitlistForm from './components/WaitlistForm';

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 overflow-x-hidden font-body">
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Hero onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      <ProblemGrid />
      <InteractiveDemo />
      <Ecosystem />
      <SolutionFlow />

      <Footer onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      <WaitlistForm
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        googleScriptUrl={import.meta.env.VITE_WAITLIST_SCRIPT_URL}
      />
    </div>
  );
}

export default App;
