"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationBannerProps {
  monthsPassed: number;
}

export default function CelebrationBanner({ monthsPassed }: CelebrationBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Sequence: 300ms banner drops in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-center pt-8 md:pt-12">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
            }}
            className="relative pointer-events-auto"
          >
            {/* Ropes hanging from top */}
            <svg 
              className="absolute -top-12 left-4 w-px h-16 pointer-events-none opacity-60" 
              viewBox="0 0 1 100" 
              preserveAspectRatio="none"
            >
              <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#e2cfa3" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
            <svg 
              className="absolute -top-12 right-4 w-px h-16 pointer-events-none opacity-60" 
              viewBox="0 0 1 100" 
              preserveAspectRatio="none"
            >
              <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#e2cfa3" strokeWidth="1" strokeDasharray="2 2" />
            </svg>

            {/* Banner Container */}
            <div 
              className="relative bg-[#8b0000] text-[#fffdd0] w-[90vw] max-w-md px-6 pt-5 pb-8 shadow-2xl overflow-hidden"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(226, 207, 163, 0.3)"
              }}
            >
              {/* Scalloped Bottom Edge (Using CSS mask or clip-path or SVG background) */}
              <div 
                className="absolute bottom-0 left-0 w-full h-3"
                style={{
                  backgroundImage: "radial-gradient(circle at 10px 0, transparent 10px, #8b0000 11px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 10px",
                  backgroundRepeat: "repeat-x"
                }}
              />
              
              {/* Dismiss Button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-[#e2cfa3] hover:text-white transition-colors"
                aria-label="Dismiss banner"
              >
                ✕
              </button>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#e2cfa3]">✦</span>
                  <h2 className="font-serif font-bold text-xl md:text-2xl leading-tight">
                    ¡Felicidades por {monthsPassed} meses de noviazgo!
                  </h2>
                  <span className="text-[#e2cfa3]">✦</span>
                </div>
                
                <p className="font-serif italic text-sm md:text-base text-[#e2cfa3]">
                  "Te amo con todas mis fuerzas."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
