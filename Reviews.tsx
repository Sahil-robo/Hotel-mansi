import { motion } from "motion/react";
import { Trees, CalendarHeart, Utensils, Heart } from "lucide-react";
import { ServiceItem } from "../types";

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: "Open Garden Dining",
      description: "Relaxed outdoor tables set amidst beautifully manicured lawns and fountains, ideal for capturing cool evening breezes under a starry canopy of Edison bulb strings.",
      iconName: "Trees",
    },
    {
      title: "Banquet & Event Space",
      description: "A premium, fully-equipped celebratory hall and garden sector suited for elegant weddings, memorable anniversaries, corporate assemblies, and grand birthday events.",
      iconName: "CalendarHeart",
    },
    {
      title: "Pure Veg Multi-Cuisine",
      description: "A wide array of meticulously prepared 100% pure vegetarian dishes spanning Gujarati culinary heritages, Kathiyawadi favorites, rich North Indian curries, and comforting Continental options.",
      iconName: "Utensils",
    },
    {
      title: "Family-Friendly Atmosphere",
      description: "A safe, welcoming, and spacious resort environment designed to keep children delighted and seniors completely relaxed-perfect for multigenerational gatherings.",
      iconName: "Heart",
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Trees":
        return <Trees className="text-brand-accent group-hover:text-brand-light transition-colors duration-300" size={28} />;
      case "CalendarHeart":
        return <CalendarHeart className="text-brand-accent group-hover:text-brand-light transition-colors duration-300" size={28} />;
      case "Utensils":
        return <Utensils className="text-brand-accent group-hover:text-brand-light transition-colors duration-300" size={28} />;
      case "Heart":
        return <Heart className="text-brand-accent group-hover:text-brand-light transition-colors duration-300" size={28} />;
      default:
        return <Trees size={28} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-transparent text-brand-light relative overflow-hidden">
      {/* Dynamic Glowing Fireflies inside dark services section */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] gold-glow-radial -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] gold-glow-radial -translate-y-1/2 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-accent block">
            Crafted Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Exquisite Spaces & Flavors
          </h2>
          <div className="h-[2px] w-12 bg-brand-accent mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-brand-light/70 font-sans font-light leading-relaxed max-w-md mx-auto">
            From relaxed candlelit dinner gatherings to massive grand milestone celebrations, we treat every single plate and guest with meticulous luxury focus.
          </p>
        </div>

        {/* Services Grid with Custom Interactive Hover Elevation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                borderColor: "rgba(198, 161, 91, 0.45)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)"
              }}
              className="group relative glass-card p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between border border-brand-accent/15"
            >
              {/* Highlight Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-full border border-brand-accent/25 bg-brand-primary/80 flex items-center justify-center group-hover:bg-brand-accent transition-all duration-300 shadow-md">
                  {getIcon(svc.iconName)}
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-brand-light group-hover:text-brand-accent transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-light/70 font-sans font-light">
                    {svc.description}
                  </p>
                </div>
              </div>

              {/* Minimal Line Indicator on Card Bottom for luxury feel */}
              <div className="w-0 h-[1.5px] bg-brand-accent group-hover:w-full transition-all duration-500 ease-out mt-8" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
