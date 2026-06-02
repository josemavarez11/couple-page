"use client";

import { motion } from "framer-motion";
import CoupleCounter from "@/components/CoupleCounter";
import PolaroidGallery from "@/components/PolaroidGallery";
import React, { useState } from "react";

const AmbientParticles = () => {
  const [particles] = useState(() => 
    Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 40 + Math.random() * 60,
      size: Math.random() * 2 + 2,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.06 + 0.06,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#e2cfa3]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function Page() {
  return (
    <main className="relative w-full h-full dvh-full bg-[#100e0c] overflow-hidden flex flex-col">
      {/* Top Zone: Rope & Photos */}
      <div className="relative w-full h-[38dvh] pt-[env(safe-area-inset-top)] pt-4">
        <PolaroidGallery />
      </div>

      {/* Middle Zone: Counter Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-full max-w-5xl mx-auto">
          <CoupleCounter />
        </div>
      </div>

      {/* Bottom Zone: Dedication & Atmos */}
      <div className="relative z-10 w-full flex flex-col items-center pb-16 gap-6">
        {/* Ornamental Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 2 }}
          className="font-serif text-xs tracking-widest text-[#e2cfa3] mb-2"
        >
          — ✦ —
        </motion.div>

        {/* Dedication Block */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-light mb-2">
            juntos desde
          </span>
          <span className="font-serif italic text-lg text-white/60 tracking-wide">
            Mayo 13, 2026
          </span>
        </motion.div>
      </div>

      {/* Background Layers */}
      <AmbientParticles />
      
      {/* Bottom Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 rounded-full blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(226,207,163,0.04) 0%, transparent 70%)',
        }}
      />
    </main>
  );
}
