import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/layout/Layout';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import './App.css';

function LoadingFallback() {
  return (
    <div className="app__loading">
      <div className="app__loading-spinner" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="app">
        <Layout>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </Layout>
        <Analytics />
      </div>
    </Suspense>
  );
}

export default App;
