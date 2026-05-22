@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-brand-primary: #0D1B2A;
  --color-brand-secondary: #1B263B;
  --color-brand-accent: #C6A15B;
  --color-brand-accent-light: #DFC28A;
  --color-brand-bg: #0D1B2A;
  --color-brand-card: rgba(255, 255, 255, 0.03);
  --color-brand-dark: #FFFFFF;
  --color-brand-light: #FFFFFF;
}

/* Base custom styles to ensure luxury smooth scrolling, noise overlay, aesthetic vibes */
html {
  scroll-behavior: smooth;
  font-family: var(--font-sans);
  background-color: var(--color-brand-primary);
  color: var(--color-brand-light);
}

body {
  overflow-x: hidden;
  background-color: var(--color-brand-primary);
}

/* Rich, atmospheric garden-gradient from Sophisticated Dark design specs */
.garden-gradient {
  background: radial-gradient(circle at 70% 30%, rgba(198, 161, 91, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(27, 38, 59, 1) 0%, transparent 60%),
              #0D1B2A;
}

/* Sophisticated Dark spec glass-card style */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
}

/* Subtle luxury grain/noise effect overlay */
.noise-bg {
  position: relative;
}

.noise-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.025;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  z-index: 10;
}

/* Custom hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom luxury gradients and reflections */
.glowing-orbs-container {
  overflow: hidden;
}

.gold-glow-radial {
  background: radial-gradient(circle, rgba(198, 161, 91, 0.15) 0%, rgba(198, 161, 91, 0) 70%);
}

.vignette-overlay {
  background: radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(13,27,42,0.4) 100%);
}

