import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Architecture from './components/Architecture';
import Ownership from './components/Ownership';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030014]">
      {/* Background Effects */}
      <ParticleBackground />
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Ownership />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Assistant Widget */}
      <AIAssistant />
    </div>
  );
}
