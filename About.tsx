import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { NavItem } from "../types";
import Logo from "./Logo";

export default function Navbar() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Home", targetId: "hero" },
    { label: "Our Story", targetId: "about" },
    { label: "Offerings", targetId: "services" },
    { label: "Ambience", targetId: "gallery" },
    { label: "Reviews", targetId: "reviews" },
    { label: "Location", targetId: "map" },
    { label: "Contact", targetId: "contact" },
  ];

  // Dual Scroll Behaviors: Hide/Reveal, and Track Active Sections
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Navbar Visibility (Hide on scroll down, Reveal on scroll up)
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > prevScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setPrevScrollY(currentScrollY);

      // 2. Active Section detection with optimal offsets
      const scrollPosition = currentScrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.targetId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    
    // Smooth custom organic scroll duration
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple exponential ease out
        className="fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-8 sm:py-4 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-brand-primary/80 backdrop-blur-xl border border-brand-accent/15 rounded-full px-6 py-2.5 sm:px-8 shadow-[0_8px_32px_rgba(13,27,42,0.15)]">
          {/* Brand Logo Layout */}
          <div 
            onClick={() => scrollToSection("hero")} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <Logo size={46} className="text-brand-accent group-hover:scale-105 transition-transform duration-300 ease-out flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-serif text-brand-light font-bold text-sm sm:text-base leading-none tracking-wide group-hover:text-brand-accent transition-colors duration-300">
                Hotel Mansi
              </span>
              <span className="text-[9px] text-brand-accent/75 font-sans tracking-widest uppercase mt-0.5 font-medium">
                Banquet & Garden
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <button
                  key={item.targetId}
                  onClick={() => scrollToSection(item.targetId)}
                  className="relative text-xs uppercase tracking-widest font-medium cursor-pointer transition-colors pt-1"
                >
                  <span className={`transition-colors duration-300 ${isActive ? "text-brand-accent font-semibold" : "text-brand-light/75 hover:text-brand-light"}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-0 w-full h-[1.5px] bg-brand-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Call Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918160988600"
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-light text-brand-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-brand-accent/15"
            >
              <Phone size={12} className="fill-brand-primary" />
              <span>+91 8160988600</span>
            </a>
          </div>

          {/* Quick Mobile Menu Handle */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:+918160988600"
              className="md:hidden flex items-center justify-center bg-brand-accent text-brand-primary p-2 rounded-full transform hover:scale-105 transition-all"
            >
              <Phone size={12} className="fill-brand-primary" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-light hover:text-brand-accent cursor-pointer transition-colors p-1"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-brand-primary/95 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 items-center">
              {navItems.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => scrollToSection(item.targetId)}
                  className="font-serif text-2xl tracking-wide text-brand-light hover:text-brand-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}

              <div className="h-[1px] w-1/3 bg-brand-accent/20 my-2" />

              <a
                href="tel:+918160988600"
                className="flex items-center gap-2 bg-brand-accent text-brand-primary px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider shadow-lg shadow-brand-accent/15"
              >
                <Phone size={14} className="fill-brand-primary" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
