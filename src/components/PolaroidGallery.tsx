"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { photos } from "@/lib/photos";
import PolaroidImage from "@/components/PolaroidImage";

interface PolaroidState {
  id: string;
  src: string;
  t: number; // Parameter t for the catenary curve [0, 1]
  rotate: number;
  delay: number;
  windDuration: number;
  scale: number;
  verticalOffset: number;
}

const Clothespin = () => (

  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-3 h-5">
    <svg viewBox="0 0 20 40" className="w-full h-full">
      <defs>
        <linearGradient id="clipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d1d5db" />
          <stop offset="50%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      {/* Clip Body */}
      <rect x="4" y="10" width="12" height="25" rx="2" fill="url(#clipGradient)" stroke="#4b5563" strokeWidth="1" />
      {/* Top Arms */}
      <path d="M4 12 Q 0 5, 4 2 L 6 10" fill="none" stroke="#9ca3af" strokeWidth="2" />
      <path d="M16 12 Q 20 5, 16 2 L 14 10" fill="none" stroke="#9ca3af" strokeWidth="2" />
    </svg>
  </div>
);

const getInitialSet = (): PolaroidState[] => {
  const count = 5;
  const selected = photos.sort(() => Math.random() - 0.5).slice(0, count);
  return selected.map((src, i) => {
    const t = 0.1 + (i * (0.8 / (count - 1)));
    const rotate = Math.random() * 4 - 2;
    const delay = i * 0.15;
    const windDuration = 4 + Math.random() * 4;
    const scale = 0.9 + Math.random() * 0.2;
    const verticalOffset = Math.random() * 16 - 8;
    return {
      id: `${src}-${Math.random()}`,
      src,
      t,
      rotate,
      delay,
      windDuration,
      scale,
      verticalOffset,
    };
  });
};

export default function PolaroidGallery() {
  const [currentSet, setCurrentSet] = useState<PolaroidState[]>(getInitialSet);
  const y0 = 48; // Top anchor y
  const S = 40; // Sag amount

  const rotatePhotos = React.useCallback(() => {
    const count = 5;
    setCurrentSet((prevSet) => {
      const currentSrcs = prevSet.map(p => p.src);
      const available = photos.filter(p => !currentSrcs.includes(p));
      const selected = available.length <= count 
        ? photos.sort(() => Math.random() - 0.5).slice(0, count)
        : [...available].sort(() => Math.random() - 0.5).slice(0, count);
      
      return selected.map((src, i) => {
        const t = 0.1 + (i * (0.8 / (count - 1)));
        const rotate = Math.random() * 4 - 2;
        const delay = i * 0.15;
        const windDuration = 4 + Math.random() * 4;
        const scale = 0.9 + Math.random() * 0.2;
        const verticalOffset = Math.random() * 16 - 8;
        return {
          id: `${src}-${Math.random()}`,
          src,
          t,
          rotate,
          delay,
          windDuration,
          scale,
          verticalOffset,
        };
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(rotatePhotos, 15000);
    return () => clearInterval(interval);
  }, [rotatePhotos]);

  // Catenary Y calculation: y = y0 + 4S(t - t^2)
  const getY = (t: number) => y0 + 4 * S * (t - t * t);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* The Realistic Rope */}
      <svg 
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-[200px] pointer-events-none" 
        style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))' }}
      >
        <defs>
          <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="50%" stopColor="#A68B6A" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
        </defs>
        {/* Shadow path */}
        <path 
          d={`M 0 ${y0} Q 50 ${y0 + 2 * S} 100 ${y0}`} 
          fill="none" 
          stroke="#5D4C37" 
          strokeWidth="0.5" 
          className="opacity-40"
          style={{ strokeLinecap: 'round' }}
        />
        {/* Main Rope path */}
        <path 
          d={`M 0 ${y0} Q 50 ${y0 + 2 * S} 100 ${y0}`} 
          fill="none" 
          stroke="url(#ropeGradient)" 
          strokeWidth="0.4" 
          style={{ strokeLinecap: 'round' }}
        />
      </svg>

      <AnimatePresence mode="popLayout">
        <div 
          className="relative w-full h-full"
        >
          {currentSet.map((polaroid, i) => (
            <PolaroidItem 
              key={polaroid.src} 
              polaroid={polaroid} 
              getY={getY} 
              index={i}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

function PolaroidItem({ polaroid, getY, index }: { polaroid: PolaroidState; getY: (t: number) => number; index: number }) {
  const controls = useAnimation();

  const handleTouch = async () => {
    // Break the animation into separate spring segments to avoid the keyframe crash
    await controls.start({
      rotate: polaroid.rotate + 12,
      transition: { type: "spring", stiffness: 120, damping: 12, mass: 0.5 }
    });
    await controls.start({
      rotate: polaroid.rotate - 12,
      transition: { type: "spring", stiffness: 120, damping: 12, mass: 0.5 }
    });
    await controls.start({
      rotate: polaroid.rotate,
      transition: { type: "spring", stiffness: 120, damping: 12, mass: 0.5 }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, rotate: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: polaroid.rotate,
        transition: { delay: polaroid.delay, duration: 0.8, ease: "easeOut" } 
      }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      style={{
        position: 'absolute',
        left: `${polaroid.t * 100}%`,
        top: `${getY(polaroid.t) + polaroid.verticalOffset}px`,
        x: '-50%', // Precise centering
        transformOrigin: 'top center',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      className="pointer-events-auto cursor-pointer"
      onTouchStart={handleTouch}
    >
      <Clothespin />
      
      <motion.div
        animate={controls}
        whileHover={{ 
          rotate: [polaroid.rotate, polaroid.rotate + 3, polaroid.rotate - 3, polaroid.rotate],
          scale: 1.05,
          transition: { duration: 0.4 } // Use tween for hover keyframes to avoid crash
        }}
        className="bg-white p-2 pb-5 shadow-2xl"
        style={{
          boxShadow: '0 15px 35px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.3)',
          width: 'clamp(74px, 21vw, 110px)',
        }}
      >
        <div 
          className="relative overflow-hidden bg-gray-200" 
          style={{ 
            width: 'clamp(58px, 17vw, 90px)', 
            height: 'clamp(58px, 17vw, 90px)',
            margin: '0 auto',
            transform: `scale(${polaroid.scale})`
          }}
        >
          <PolaroidImage
            src={polaroid.src}
            alt="Memory"
            id={polaroid.id}
            priority={index < 3} // LCP fix: prioritize first 3 images
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

