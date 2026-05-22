import { useEffect, useRef, useState } from "react";

export default function ThreeDHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Torus knot mathematical configuration
    const p = 2; // winding number
    const q = 3; // winding number
    const R = Math.min(width, height) * 0.15; // Major radius
    const r = Math.min(width, height) * 0.06; // Minor radius
    
    // Generate torus knot vertices
    const knotPoints: { x: number; y: number; z: number }[] = [];
    const steps = 140;
    for (let i = 0; i < steps; i++) {
      const phi = (i / steps) * Math.PI * 2;
      const r_mod = R + r * Math.cos(q * phi);
      const x = r_mod * Math.cos(p * phi);
      const y = r_mod * Math.sin(p * phi);
      const z = r * Math.sin(q * phi);
      knotPoints.push({ x, y, z });
    }

    // Garden fireflies particle system (the ambient particles)
    const particleCount = 45;
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      alpha: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1, // Drifts slightly upwards like fireflies
        vz: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.01 + 0.005,
      });
    }

    let angleX = 0;
    let angleY = 0;
    const focalLength = 400;

    // Manage mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      setMouse((prev) => ({
        ...prev,
        targetX: clientX * 0.15,
        targetY: clientY * 0.15,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Projection & Matrix rotation rendering logic
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (cinematic camera drift)
      const currentMouseX = mouse.x + (mouse.targetX - mouse.x) * 0.05;
      const currentMouseY = mouse.y + (mouse.targetY - mouse.y) * 0.05;
      mouse.x = currentMouseX;
      mouse.y = currentMouseY;

      // Base rotation speeds + mouse influence
      angleX += 0.005 + mouse.y * 0.0001;
      angleY += 0.008 + mouse.x * 0.0001;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // --- Draw Golden Torus Knot behind other components ---
      const projectedPoints: { x: number; y: number; depth: number }[] = [];

      for (let i = 0; i < knotPoints.length; i++) {
        const pt = knotPoints[i];

        // Rotate X
        let y1 = pt.y * cosX - pt.z * sinX;
        let z1 = pt.y * sinX + pt.z * cosX;

        // Rotate Y
        let x2 = pt.x * cosY + z1 * sinY;
        let z2 = -pt.x * sinY + z1 * cosY;

        // Center shift & camera depth
        const zFinal = z2 + 350;

        // 3D Perspective Projection
        const scale = focalLength / zFinal;
        const projX = x2 * scale + width / 2 + mouse.x * 0.3;
        const projY = y1 * scale + height / 2 + mouse.y * 0.3;

        projectedPoints.push({ x: projX, y: projY, depth: zFinal });
      }

      // Draw wireframes with depth opacity
      ctx.lineWidth = 1.4;
      for (let i = 0; i < projectedPoints.length; i++) {
        const j = (i + 1) % projectedPoints.length;
        const pt1 = projectedPoints[i];
        const pt2 = projectedPoints[j];

        // Depth shader calculations
        const avgDepth = (pt1.depth + pt2.depth) / 2;
        const opacity = Math.max(0.05, Math.min(0.65, (500 - avgDepth) / 180));

        ctx.strokeStyle = `rgba(198, 161, 91, ${opacity})`; // Accent gold #C6A15B
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.stroke();

        // Connect cross wires for elegant architectural geometry grid structure
        const oppositeIndex = (i + Math.floor(steps / 4)) % steps;
        const ptOpposite = projectedPoints[oppositeIndex];
        const oppOpacity = opacity * 0.15;
        if (oppOpacity > 0.01) {
          ctx.strokeStyle = `rgba(198, 161, 91, ${oppOpacity})`;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(ptOpposite.x, ptOpposite.y);
          ctx.stroke();
        }
      }

      // --- Render Glowing Fireflies (Drifting Ambient Particles) ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient noise drifting
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around boundaries
        if (p.x < -width / 2) p.x = width / 2;
        if (p.x > width / 2) p.x = -width / 2;
        if (p.y < -height / 2) p.y = height / 2;
        if (p.y > height / 2) p.y = -height / 2;
        if (p.z < -200) p.z = 200;
        if (p.z > 200) p.z = -200;

        // Perspective project particle
        const zFinal = p.z + 300;
        const scale = focalLength / zFinal;
        const projX = p.x * scale + width / 2 + mouse.x * 0.15;
        const projY = p.y * scale + height / 2 + mouse.y * 0.15;

        // Particle size & style (soft warm gold fireflies)
        const size = p.size * scale * 0.8;
        const alpha = Math.max(0.1, Math.min(p.alpha, (400 - zFinal) / 200));

        // Let some particles glow softly with radial light reflections
        ctx.beginPath();
        ctx.fillStyle = `rgba(198, 161, 91, ${alpha})`;
        ctx.shadowColor = "rgba(198, 161, 91, 0.8)";
        ctx.shadowBlur = size * 3;
        ctx.arc(projX, projY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 select-none z-1"
    />
  );
}
