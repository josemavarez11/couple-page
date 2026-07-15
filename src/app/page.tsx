"use client";

import { motion } from "framer-motion";
import CoupleCounter from "@/components/CoupleCounter";
import PolaroidGallery from "@/components/PolaroidGallery";
import { useState } from "react";

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
    <main className="relative w-full h-screen bg-[#100e0c] overflow-y-auto flex flex-col">
      {/* Top Zone: Rope & Photos */}
      <div className="relative w-full min-h-[45vh] pb-8 pt-[env(safe-area-inset-top)] pt-4">
        <PolaroidGallery />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 mt-6 overflow-visible">
        <div className="w-full max-w-3xl mx-auto mb-8 px-4 overflow-visible">
            <div
              className="w-full rounded-3xl border border-white/15 bg-white/90 p-5 text-sm text-neutral-900 shadow-[0_20px_80px_rgba(0,0,0,0.12)] whitespace-pre-wrap break-words overflow-visible"
            >
              {`Hola Linda, mi princesa. Hoy quiero dejar salir mis sentimientos en algun lugar donde pueda expresarlos de formas más ordenada y sin nervios.
              No estoy seguro de si sigues revisando esta pagina o si ya no lo haces, pero quiero que esto igualmente quede aquí porque es un lugar seguro que creé para los dos
              y que está pensado sobre todo para que tu puedas reencontrarte con una pequeña idea de lo que siento por ti y de lo que significas para mi.
              Los días sin ti cada vez se me hacen más largos y difíciles, y aunque trato de mantenerme ocupado y distraído, no puedo evitar sentir un vacío en mi corazón, pero no solo un vacio por tu ausencia fisica si no tambien 
              por los lindos momentos que no estoy compartiendo conmigo. Tambien he intentado darte espacio y tiempo pero no puedo evitar sentir que me estoy perdiendo de ti y de todo lo que eres. Me duele mucho no poder estar a tu lado y no poder abrazarte, besarte y decirte lo mucho que te amo todo el tiempo como siempre lo hago.
              Me cuesta mucho aceptar que no puedo estar contigo en este momento, renunciar a nuestro noviazgo y a todo lo que hemos logrado implicaría renunciar a una parte de mi vida que es muy importante para mi y que me hace feliz. No quiero renunciar a ti, no quiero renunciar a nosotros, no quiero renunciar a lo que hemos construido juntos. Quiero seguir luchando por nuestro amor y por nuestra relación, quiero seguir construyendo recuerdos y momentos felices contigo, quiero seguir amándote y cuidándote como siempre lo he hecho.
              Quiero que sepas que te amo con todo mi corazón y que quiero estar para ti, apoyándote, escuchándote y amándote incondicionalmente. Eres la persona más importante en mi vida y no quiero perderte nunca. Sigo rogando porque llegue el momento en el que podamos estar juntos de nuevo y seguir siendo novio de la mejor persona del mundo. Te amo, Linda Vélez.`}
            </div>
            <div
              className="w-full rounded-3xl border border-white/15 bg-white/90 p-5 text-sm text-neutral-900 shadow-[0_20px_80px_rgba(0,0,0,0.12)] whitespace-pre-wrap break-words overflow-visible"
            >
              {`Hola Linda. Sabes el proposito con el que creé este esapcio para los dos y el significado que tiene. El dia de hoy se cumplen exactamente dos meses de aquel hermoso día en el que te pedí que fueras mi novia. Yo sé perfectamente lo que lamentablemente ocurrió hace poco y la situación en la que nos
  encontramos ahora, pero eso jamás borrará que hace dos meses me hiciste la persona más feliz del mundo y que me diste la oportunidad de tener a mi lado a la persona más increible que he conocido.
  Si llegas a leer revisar esto quiero que sepas que gracias por todo lo que me has dado, por tu amor, tu tiempo, tu paciencia y tu cariño. Gracias por ser tú, por ser tan especial y única. Gracias por hacerme sentir amado y valorado. Gracias por ser mi compañera, mi amiga y mi confidente. Gracias por ser mi novia. Te amo con todas las fuerzas de mi alma y corazón.
  A pesar de la situación no puedo dejar pasar la fecha de hoy sin decirte que te amo y que eres la persona más importante en mi vida.
  Hoy no ha sido un dia sencillo al ver que no puedo compartir este día coontigo como tenía en mi mente desde hace rato,  pero intento ser fuerte
  porque siempre quiero ser el superheroe que me decias que era para ti. Te amo y siempre será el amor de mi vida, y espero que algún día podamos estar juntos de nuevo.
  Le pediré a Dios que nos de la oportunidad de estar juntos y que nos permita superar cualquier obstáculo que se nos presente. Te amo Linda Vélez.`}
            </div>
        </div>
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
