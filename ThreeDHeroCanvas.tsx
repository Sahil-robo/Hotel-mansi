import { motion } from "motion/react";

// Import modules
import Navbar from "./components/Navbar";
import ThreeDHeroCanvas from "./components/ThreeDHeroCanvas";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import MapSection from "./components/MapSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const scrollSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary garden-gradient relative noise-bg select-none">
      
      {/* 1. Global Translucent Navbar */}
      <Navbar />

      {/* 2. Cinematic Hero Section with custom 3D Canvas rendering */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center bg-brand-primary overflow-hidden text-brand-light font-sans"
      >
        {/* Widescreen Atmospheric background photo blended with custom dark-navy linear gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero_garden_seating_1779344686038.png"
            alt="Hotel Mansi Gardens at dusk"
            className="w-full h-full object-cover opacity-35 scale-102 transform animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
          {/* Edge vignettes to isolate golden fonts */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/80 to-[#040811]/90" />
          <div className="absolute inset-0 vignette-overlay" />
        </div>

        {/* Floating 3D Torus Knot & Particle System Canvas */}
        <ThreeDHeroCanvas />

        {/* Primary Typography Presentation Context */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full text-center py-20 mt-16 pb-12 sm:pb-16 flex flex-col items-center">
          
          {/* Subtle floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-1.5 bg-brand-secondary/40 border border-brand-accent/25 rounded-full px-4 py-1.5 mb-6 text-brand-accent shadow-[0_4px_12px_rgba(198,161,91,0.08)]"
          >
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium leading-none">
              Open-Air Luxury Resort dining
            </span>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto mb-10">
            {/* Playfair Display Luxury Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-brand-light"
            >
              Where Evenings Turn <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent font-serif italic">
                Into Experiences
              </span>
            </motion.h1>

            {/* Inter responsive body subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-lg lg:text-xl text-brand-light/75 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Open-air garden dining, sparkling water fountain, and warm glowing ambience inside Palitana, Gujarat.
            </motion.p>
          </div>

          {/* CTA Button Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <button
              onClick={() => scrollSection("gallery")}
              className="w-full sm:w-auto flex items-center justify-center bg-brand-accent hover:bg-brand-accent-light text-brand-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg shadow-brand-accent/15 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Explore Ambience
            </button>
            <button
              onClick={() => scrollSection("contact")}
              className="w-full sm:w-auto flex items-center justify-center bg-transparent hover:bg-white/5 border border-white/20 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. About / Storytelling Block */}
      <About />

      {/* 4. Services / Offerings Grid */}
      <Services />

      {/* 5. Cinematic Gallery Showcase */}
      <Gallery />

      {/* 6. Guest Reviews & Live Local Hub */}
      <Reviews />

      {/* 7. Find Us Map layout */}
      <MapSection />

      {/* 8. Luxury Booking / Inquiries Forms */}
      <Contact />

      {/* 9. Footers layout */}
      <Footer />

    </div>
  );
}
