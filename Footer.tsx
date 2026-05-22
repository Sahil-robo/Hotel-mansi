import React from "react";
import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-transparent text-brand-light relative overflow-hidden noise-bg">
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] gold-glow-radial -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 z-0" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-16">
        
        {/* Call to action header */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-accent block">
            Plan An Evening
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-light">
            Ready to Visit?
          </h2>
          <div className="h-[2px] w-12 bg-brand-accent mx-auto" />
          <p className="text-xs sm:text-sm text-brand-light/70 font-sans leading-relaxed font-light">
            Drop in today for an unforgettable pure vegetarian open-air culinary experience amidst the glowing lanterns of Palitana.
          </p>
        </div>

        {/* Minimal Luxury Buttons Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Dialer Call */}
          <motion.a
            whileHover={{ y: -3, scale: 1.02 }}
            href="tel:+918160988600"
            className="flex items-center justify-center gap-3 bg-brand-accent hover:bg-brand-accent-light text-brand-primary py-5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg shadow-brand-accent/15 transition-all text-center"
          >
            <Phone size={14} className="fill-brand-primary" />
            <span>Call Now: +91 8160988600</span>
          </motion.a>

          {/* WhatsApp Direct Messaging */}
          <motion.a
            whileHover={{ y: -3, scale: 1.02 }}
            href="https://wa.me/918160988600"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 py-5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition-all text-center"
          >
            <MessageCircle size={14} className="fill-current text-green-400" />
            <span>Message on WhatsApp</span>
          </motion.a>
        </div>

      </div>
    </section>
  );
}
