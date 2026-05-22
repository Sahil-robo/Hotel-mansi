import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: string;
  cols: string; // Tailwind grid cols span for masonry styling
  rows: string; // Tailwind grid rows span for masonry styling
}

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const images: GalleryImage[] = [
    {
      id: "gal-1",
      title: "Luxury Garden Dining",
      description: "Atmospheric evening dinner spaces nestled among our lush lawns.",
      url: "/assets/images/hero_garden_seating_1779344686038.png",
      tag: "Garden",
      cols: "md:col-span-8",
      rows: "aspect-[16/9] md:aspect-auto md:h-[400px]",
    },
    {
      id: "gal-2",
      title: "Sparkling Outdoor Fountain",
      description: "Visual center point featuring cascading warm spotlight reflections.",
      url: "/assets/images/garden_fountain_1779344794639.png",
      tag: "Fountain",
      cols: "md:col-span-4",
      rows: "aspect-[3/4] md:aspect-auto md:h-[400px]",
    },
    {
      id: "gal-3",
      title: "Warm Hanging Lanterns",
      description: "Flickering candlelight and cozy vintage retro bulb grids overhead.",
      url: "/assets/images/warm_hanging_lights_1779344775331.png",
      tag: "Lighting",
      cols: "md:col-span-4",
      rows: "aspect-[3/4] md:aspect-auto md:h-[450px]",
    },
    {
      id: "gal-4",
      title: "Artisan Plated Culinary",
      description: "Fresh, beautifully plated gourmet 100% pure vegetarian recipes.",
      url: "/assets/images/hotel_mansi_fine_food_1779387683998.png",
      tag: "Fine Food",
      cols: "md:col-span-4",
      rows: "aspect-[4/3] md:aspect-auto md:h-[450px]",
    },
    {
      id: "gal-5",
      title: "Luxury Banqueting Halls",
      description: "Royal setup ready for your elite milestone celebrations and events.",
      url: "/assets/images/hotel_mansi_banquet_hall_1779387144209.png",
      tag: "Banquet",
      cols: "md:col-span-4",
      rows: "aspect-[4/3] md:aspect-auto md:h-[450px]",
    },
    {
      id: "gal-6",
      title: "Majestic Resort Landscapes",
      description: "Our stunning circular fountain, warm pathway LED lighting, and premium multi-story resort-style architecture at night.",
      url: "/assets/images/hotel_mansi_real_night_1779386622316.png",
      tag: "Entrance",
      cols: "md:col-span-12",
      rows: "aspect-[16/9] md:aspect-auto md:h-[350px]",
    },
  ];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-transparent relative overflow-hidden noise-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Gallery Intro Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-accent block">
              The Ambient Portrait
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-light tracking-tight">
              Experience the Ambience
            </h2>
            <div className="h-[2px] w-12 bg-brand-accent mt-4" />
          </div>
          <p className="text-xs sm:text-sm text-brand-light/75 font-sans max-w-sm font-light leading-relaxed">
            Take a visual walkthrough of Palitana's ultimate leisure destination. Each frame captures the warmth, soft evening glows, and elegant detailing from our garden and halls.
          </p>
        </div>

        {/* Cinematic Grid Base */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              onClick={() => setSelectedIdx(idx)}
              className={`${img.cols} ${img.rows} relative group overflow-hidden rounded-2xl cursor-pointer bg-brand-primary shadow-[0_15px_35px_rgba(13,27,42,0.08)]`}
            >
              {/* Image with zoom effect */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]"
                referrerPolicy="no-referrer"
              />

              {/* Soft vignette card overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

              {/* Image Tags & Info layout */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-widest bg-brand-accent/90 text-brand-primary font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {img.tag}
                </span>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center shadow">
                  <Maximize2 size={12} className="stroke-[2.5]" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="font-serif text-lg sm:text-xl text-brand-light font-medium tracking-wide">
                  {img.title}
                </h4>
                <p className="text-xs text-brand-light/75 font-sans font-light mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  {img.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox Overlay System */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 bg-brand-primary/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none"
          >
            {/* Close trigger */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 text-brand-light/70 hover:text-brand-accent hover:scale-105 cursor-pointer p-2 transition-all z-50 rounded-full border border-brand-light/10 bg-brand-secondary/40"
            >
              <X size={20} />
            </button>

            {/* Carousel navigation handles */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 text-brand-light/70 hover:text-brand-accent cursor-pointer p-4 transition-colors z-50 rounded-full border border-brand-light/10 hover:border-brand-accent/20 bg-brand-secondary/40"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 text-brand-light/70 hover:text-brand-accent cursor-pointer p-4 transition-colors z-50 rounded-full border border-brand-light/10 hover:border-brand-accent/20 bg-brand-secondary/40"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col gap-4 items-center relative"
            >
              <div className="relative max-h-[70vh] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-brand-accent/15">
                <img
                  src={images[selectedIdx].url}
                  alt={images[selectedIdx].title}
                  className="max-h-[72vh] object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-center space-y-2 max-w-lg mt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-accent font-bold">
                  {images[selectedIdx].tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-brand-light">
                  {images[selectedIdx].title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-light/70 font-sans font-light">
                  {images[selectedIdx].description}
                </p>
                <div className="text-xs text-brand-light/40 font-mono pt-1">
                  {selectedIdx + 1} / {images.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
