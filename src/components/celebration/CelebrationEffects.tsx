"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const PALETTE = ["#e2cfa3", "#c0392b", "#ffffff", "#ffd1dc"];

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export default function CelebrationEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    // 0ms: Confetti starts falling
    const startConfetti = () => {
      const duration = 6 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        if (Date.now() > animationEnd) {
          clearInterval(interval);
          return;
        }

        const particleCount = 40;
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() * 0.2 },
          colors: PALETTE,
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() * 0.2 },
          colors: PALETTE,
        });
      }, 250);
    };

    const launchFireworks = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);

      let particles: FireworkParticle[] = [];
      let animationFrameId: number;

      const createBurst = (x: number, y: number) => {
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        for (let i = 0; i < 25; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 2;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color,
            size: Math.random() * 2 + 1,
          });
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // gravity
          p.alpha -= 0.015;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // 600ms: First firework burst launches
      // 600ms - 3600ms: Remaining 5-9 bursts staggered
      const burstCount = Math.floor(Math.random() * 4) + 6; // 6-10
      const interval = 3000 / (burstCount - 1);

      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          const rx = Math.random() * width;
          const ry = Math.random() * height * 0.6;
          createBurst(rx, ry);
        }, 600 + i * interval);
      }

      // Clean up canvas after 5 seconds
      setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        setIsActive(false);
      }, 5000);
    };

    startConfetti();
    launchFireworks();

    return () => {
      // Cleanup is handled by the timeout, but we can be explicit
    };
  }, []);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ background: "transparent" }}
    />
  );
}
