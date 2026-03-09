'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  pulseOffset: number;
  pulseSpeed: number; // radians per ms
  isStar: boolean;
  repelX: number;
  repelY: number;
  twinkling: boolean;
  twinkleStartTime: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  startTime: number;
}

const STAR_RATIO = 0.2;
const MOUSE_RADIUS = 120;
const CONNECT_RADIUS = 100;
const MAX_TWINKLE = 3;
const BURST_COUNT = 8;
const BURST_DURATION = 800;
const LERP = 0.04;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Cast here so TypeScript treats canvas as non-null inside all nested closures.
    // The runtime guard below still protects against the null case.
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let particles: Particle[] = [];
    let burstParticles: BurstParticle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let animId = 0;
    let lastTime = 0;
    let active = true;

    function isMobile() {
      return window.innerWidth < 768;
    }

    function initParticles() {
      const mobile = isMobile();
      const count = mobile ? 80 : 180;
      const starCount = Math.floor(count * STAR_RATIO);
      particles = [];
      for (let i = 0; i < count; i++) {
        const isStar = i < starCount;
        particles.push({
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          vx: rand(-0.15, 0.15),
          vy: rand(-0.15, 0.15),
          radius: isStar ? rand(2.5, 4) : rand(0.8, 2.2),
          baseOpacity: isStar ? rand(0.4, 0.6) : rand(0.08, 0.35),
          pulseOffset: rand(0, Math.PI * 2),
          pulseSpeed: (Math.PI * 2) / rand(3000, 8000),
          isStar,
          repelX: 0,
          repelY: 0,
          twinkling: false,
          twinkleStartTime: 0,
        });
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    function draw(time: number) {
      if (!active) return;
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mobile = isMobile();

      // Count currently twinkling
      let twinklingCount = 0;
      for (const p of particles) {
        if (p.twinkling) twinklingCount++;
      }

      for (const p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        else if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        else if (p.y > canvas.height + p.radius) p.y = -p.radius;

        // Pulse opacity
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.08;

        // Twinkle
        if (!p.twinkling && twinklingCount < MAX_TWINKLE && Math.random() < 0.01) {
          p.twinkling = true;
          p.twinkleStartTime = time;
          twinklingCount++;
        }
        let twinkleMod = 0;
        if (p.twinkling) {
          const elapsed = time - p.twinkleStartTime;
          const PEAK = 200;
          const FADE = 600;
          if (elapsed < PEAK) {
            twinkleMod = (0.9 - p.baseOpacity) * (elapsed / PEAK);
          } else if (elapsed < PEAK + FADE) {
            twinkleMod = (0.9 - p.baseOpacity) * (1 - (elapsed - PEAK) / FADE);
          } else {
            p.twinkling = false;
            twinklingCount = Math.max(0, twinklingCount - 1);
          }
        }

        // Mouse repulsion — based on logical position only, repelX/Y is the displacement
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.repelX = lerp(p.repelX, (dx / dist) * force * 30, LERP);
          p.repelY = lerp(p.repelY, (dy / dist) * force * 30, LERP);
        } else {
          p.repelX = lerp(p.repelX, 0, LERP);
          p.repelY = lerp(p.repelY, 0, LERP);
        }

        const drawX = p.x + p.repelX;
        const drawY = p.y + p.repelY;
        const opacity = Math.max(0, Math.min(1, p.baseOpacity + pulse + twinkleMod));

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${opacity.toFixed(3)})`;
        ctx.fill();
      }

      // Connecting lines — desktop only
      if (!mobile) {
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          const piX = pi.x + pi.repelX;
          const piY = pi.y + pi.repelY;
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const pjX = pj.x + pj.repelX;
            const pjY = pj.y + pj.repelY;
            const dx = piX - pjX;
            const dy = piY - pjY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CONNECT_RADIUS) {
              const alpha = (1 - d / CONNECT_RADIUS) * 0.06;
              ctx.beginPath();
              ctx.moveTo(piX, piY);
              ctx.lineTo(pjX, pjY);
              ctx.strokeStyle = `rgba(201,168,76,${alpha.toFixed(3)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Burst particles
      burstParticles = burstParticles.filter((bp) => {
        const elapsed = time - bp.startTime;
        if (elapsed >= BURST_DURATION) return false;
        const opacity = 0.8 * (1 - elapsed / BURST_DURATION);
        bp.x += bp.vx;
        bp.y += bp.vy;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${opacity.toFixed(3)})`;
        ctx.fill();
        return true;
      });

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onClick(e: MouseEvent) {
      const startTime = performance.now();
      for (let i = 0; i < BURST_COUNT; i++) {
        const angle = (i / BURST_COUNT) * Math.PI * 2;
        const speed = rand(1, 3);
        burstParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 3,
          startTime,
        });
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        active = false;
        cancelAnimationFrame(animId);
      } else {
        active = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(draw);
      }
    }

    resize();
    lastTime = performance.now();
    animId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
