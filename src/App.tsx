import React from 'react';
import { useLenis, LenisContext } from './hooks/useLenis';
import { SkipLink } from './components/SkipLink/SkipLink';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { RunLine } from './components/RunLine/RunLine';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { Planner } from './components/Planner/Planner';
import { Route } from './components/Route/Route';
import { Prices } from './components/Prices/Prices';
import { Split } from './components/Split/Split';
import { Mumbai } from './components/Mumbai/Mumbai';
import { Faq } from './components/Faq/Faq';
import { Closing } from './components/Closing/Closing';
import { Footer } from './components/Footer/Footer';
import { BackToTop } from './components/BackToTop/BackToTop';

export const App: React.FC = () => {
  const lenisControls = useLenis();

  return (
    <LenisContext.Provider value={lenisControls}>
      <ProgressBar />
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <RunLine />
        <HowItWorks />
        <Planner />
        <Route />
        <Prices />
        <Split />
        <Mumbai />
        <Faq />
        <Closing />
      </main>
      <BackToTop />
      <Footer />
    </LenisContext.Provider>
  );
};

export default App;
