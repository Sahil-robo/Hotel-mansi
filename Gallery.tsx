import { motion } from "motion/react";
import { Trees, Compass, Sparkles, Leaf } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // cinematic smooth ease
      },
    },
  };

  const imageRevealVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-transparent relative overflow-hidden noise-bg">
      {/* Decorative Warm Light Radial Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] gold-glow-radial -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] gold-glow-radial translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
        >
          {/* Left Text Column: Storytelling */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-accent">
                Welcome to Palitana's Premiere Haven
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-light leading-tight">
                More Than a <br />Restaurant
              </h2>
              <div className="h-[2px] w-14 bg-brand-accent mt-4" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-brand-light/85 leading-relaxed font-sans font-light"
            >
              Hotel Mansi Banquet & Garden Restaurant is designed for moments that deserve to feel memorable.
              From peaceful family dinners to lively evening gatherings, every corner is built around warmth, 
              comfort, and spectacular outdoors. The open garden, glowing lights, and calm surroundings 
              create an experience that feels deeply personal, welcoming, and effortless.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm text-brand-light/70 leading-relaxed font-sans font-light"
            >
              Located along the scenic Bhavnagar Road near Satua Baba School, our resort-like property offers 
              the perfect escape from the bustle. Here, the fresh evening air of Palitana blends with the 
              rich aroma of freshly-prepared 100% pure vegetarian multi-cuisine delicacies, framing gatherings you and your 
              loved ones will cherish forever.
            </motion.p>

            {/* Quick Pillars Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2 border-l border-brand-accent/20 pl-4 py-1">
                <Trees className="text-brand-accent" size={20} />
                <h4 className="text-sm font-semibold text-brand-light">Lush Gardens</h4>
                <p className="text-xs text-brand-light/60 font-sans font-light">Open sky outdoor dining lawns.</p>
              </div>
              <div className="space-y-2 border-l border-brand-accent/20 pl-4 py-1">
                <Leaf className="text-brand-accent" size={20} />
                <h4 className="text-sm font-semibold text-brand-light">100% Pure Veg</h4>
                <p className="text-xs text-brand-light/60 font-sans font-light">Strictly vegetarian & traditional culinary values.</p>
              </div>
              <div className="space-y-2 border-l border-brand-accent/20 pl-4 py-1">
                <Sparkles className="text-brand-accent" size={20} />
                <h4 className="text-sm font-semibold text-brand-light">Great Hospitality</h4>
                <p className="text-xs text-brand-light/60 font-sans font-light">Crafted for memorable celebrations.</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image Column: Elegant Entrance Reveal */}
          <div className="lg:col-span-6 relative">
            <motion.div
              variants={imageRevealVariants}
              className="relative aspect-[4/3] w-full shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              <img
                src="/assets/images/hotel_mansi_real_night_1779386622316.png"
                alt="Enchanting high-definition night view of Hotel Mansi Banquet & Garden Restaurant"
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl" />
            </motion.div>

            {/* Float Caption Badge */}
            <motion.div
              variants={itemVariants}
              className="absolute -bottom-6 -left-4 sm:-left-6 glass-card p-5 sm:p-6 rounded-2xl shadow-xl w-[260px] hidden sm:block"
            >
              <p className="font-serif text-brand-accent font-semibold text-lg leading-tight mb-1">
                A Scenic Oasis
              </p>
              <p className="text-xs text-brand-light/75 font-sans leading-relaxed font-light">
                Experience the magic as the dusk fades and the garden lanterns begin to glow.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
