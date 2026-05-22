import { Compass, Facebook, Instagram, Phone, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const scrollSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-[#04080F] text-brand-light py-16 sm:py-20 border-t border-brand-accent/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-brand-accent/10 pb-12 items-start">
          
          {/* Logo description Column - Span 5 */}
          <div className="md:col-span-5 space-y-4 font-sans">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollSection("hero")}>
              <Logo size={52} className="group-hover:scale-105 transition-transform duration-300 ease-out flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif text-brand-light font-bold text-base leading-none tracking-wide group-hover:text-brand-accent transition-colors duration-300">
                  Hotel Mansi
                </span>
                <span className="text-[9px] text-brand-accent/75 uppercase tracking-widest mt-0.5">
                  Banquet & Garden Restaurant
                </span>
              </div>
            </div>
            <p className="text-xs text-brand-light/50 font-light leading-relaxed max-w-sm">
              Creating cozy evening memories inside Gujarat's scenic foothill city. We invite you to dine under the starry night sky amidst glowing candles, ambient fairy lights, and delicious traditional food.
            </p>
          </div>

          {/* Quick links Column - Span 3 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-accent font-semibold">Resort Pathways</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home Base", target: "hero" },
                { label: "Our Story", target: "about" },
                { label: "Offerings", target: "services" },
                { label: "Ambience Gallery", target: "gallery" },
                { label: "Diner Reviews", target: "reviews" },
              ].map((lnk) => (
                <button
                  key={lnk.target}
                  onClick={() => scrollSection(lnk.target)}
                  className="text-xs text-brand-light/60 hover:text-brand-accent text-left cursor-pointer transition-colors font-light"
                >
                  {lnk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location details Column - Span 4 */}
          <div className="md:col-span-4 space-y-4 font-sans text-xs">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-accent font-semibold">Location corridors</h4>
            <p className="text-brand-light/65 leading-relaxed font-light">
              Bhavnagar Road, near Satua Baba School,<br />
              Palitana, Gujarat 364270, India
            </p>
            <div className="space-y-1.5 pt-1 text-brand-light/60 font-light">
              <a href="tel:+918160988600" className="flex items-center gap-2 hover:text-brand-accent">
                <Phone size={12} className="text-brand-accent" />
                <span>+91 8160988600</span>
              </a>
              <a href="mailto:hotelmansibanquetgardenrestaur@gmail.com" className="flex items-center gap-2 hover:text-brand-accent">
                <Mail size={12} className="text-brand-accent" />
                <span>hotelmansibanquetgardenrestaur@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Social / Copyright layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-brand-light/50 font-sans text-xs pt-6 border-t border-brand-accent/5">
          
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <p className="font-light text-brand-light/60">
              © 2026 Hotel Mansi Banquet & Garden Restaurant. Crafted with passion inside Palitana, Gujarat. All rights reserved.
            </p>
            <p className="text-[10px] text-brand-light/35 font-light">
              Alcohol-free pure vegetarian paradise. Highly recommended for family gatherings, weddings, and pilgrim delegates.
            </p>
          </div>

          {/* Interactive Suggestions & Social handles wrapper */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-brand-secondary/30 border border-brand-accent/10 px-4 py-3 rounded-2xl" id="social-community-hub">
            <div className="text-center sm:text-left space-y-0.5">
              <span className="text-[10px] text-brand-accent font-bold tracking-wider uppercase block">
                ⭐ Join Our Social Family
              </span>
              <p className="text-[9px] text-brand-light/60 font-light">
                Follow us on Instagram & Facebook for menus, event updates & pilgrim discounts!
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/hotelmansi_001?igsh=MWVndXR3ZGJvbTd6OA=="
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 border border-brand-accent/25 rounded-full text-brand-light hover:text-brand-accent hover:border-brand-accent/50 bg-[#0b131a] transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
                id="social-link-instagram"
                title="Follow hotelmansi_001 on Instagram for culinary showcases!"
              >
                <Instagram size={16} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0b131a] text-brand-light text-[9px] px-2 py-1.5 rounded-lg border border-brand-accent/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 text-center shadow-xl z-50">
                  📸 Follow <strong>@hotelmansi_001</strong> on Instagram for stunning garden videos!
                </span>
              </a>

              <a
                href="https://www.facebook.com/share/18XpLktzrm/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 border border-brand-accent/25 rounded-full text-brand-light hover:text-brand-accent hover:border-brand-accent/50 bg-[#0b131a] transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
                id="social-link-facebook"
                title="Follow Hotel Mansi on Facebook for banquet reservations!"
              >
                <Facebook size={16} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0b131a] text-brand-light text-[9px] px-2 py-1.5 rounded-lg border border-brand-accent/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 text-center shadow-xl z-50">
                  💙 Follow <strong>Hotel Mansi</strong> on Facebook for offers & festive updates!
                </span>
              </a>

              <a
                href="https://wa.me/918160988600"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 border border-brand-accent/25 rounded-full text-brand-accent hover:border-brand-accent/50 bg-[#0b131a] transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
                id="social-link-whatsapp"
                title="Message on WhatsApp for instantaneous table bookings"
              >
                <Compass size={16} className="text-brand-accent animate-pulse" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0b131a] text-brand-light text-[9px] px-2 py-1.5 rounded-lg border border-brand-accent/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 text-center shadow-xl z-50">
                  💬 Contact live host on WhatsApp: <strong>+91 8160988600</strong>
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
