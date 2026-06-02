"use client";

import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { motion, AnimatePresence } from "framer-motion";

const START_DATE = new Date("2026-05-13T00:00:00");
const TIMEZONE = "America/Caracas";

interface TimeValue {
  years: number;
  months: number;
  weeks: number;
  days: number;
}

const calculateTimeDiff = (): TimeValue => {
  const now = new Date();
  // Get current time in Caracas timezone
  const nowInCaracas = formatInTimeZone(now, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  const dateNow = new Date(nowInCaracas);
  
  let years = dateNow.getFullYear() - START_DATE.getFullYear();
  let months = dateNow.getMonth() - START_DATE.getMonth();
  let days = dateNow.getDate() - START_DATE.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = days;
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  return {
    years,
    months,
    weeks,
    days: remainingDays,
  };
};

const Digit = ({ value }: { value: number }) => {
  return (
    <div className="relative overflow-hidden inline-block h-[1em] w-[0.6em] text-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const NumberAnimation = ({ value }: { value: number }) => {
  const digits = value.toString().split("");
  return (
    <div className="flex justify-center">
      {digits.map((d, i) => (
        <Digit key={i} value={parseInt(d)} />
      ))}
    </div>
  );
};

const TimeUnit = ({ value, label, show }: { value: number; label: string; show: boolean }) => {
  if (!show) return null;
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8">
      <div className="font-serif text-[clamp(3rem,10vw,6rem)] leading-none mb-2 text-[#e2cfa3]">
        <NumberAnimation value={value} />
      </div>
      <div className="font-sans text-[clamp(0.7rem,2vw,0.9rem)] uppercase tracking-[0.2em] text-white/35 font-light">
        {label}
      </div>
    </div>
  );
};

export default function CoupleCounter() {
  const [time, setTime] = useState<TimeValue>({ years: 0, months: 0, weeks: 0, days: 0 });

  useEffect(() => {
    const update = () => setTime(calculateTimeDiff());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const { years, months, weeks, days } = time;

  const activeYears = years > 0;
  const activeMonths = (years > 0 || months > 0);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center w-full p-6">
      {/* Radial Vignette behind counter */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(226,207,163,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className={`grid grid-cols-2 md:flex md:flex-row justify-center items-center gap-5 md:gap-12 max-w-5xl mx-auto text-center`}>
        <TimeUnit value={years} label="Years" show={activeYears} />
        {activeYears || months > 0 ? (
          <>
            <TimeUnit value={months} label="Months" show={activeYears || months > 0} />
            <div className="hidden md:block w-px h-12 bg-white/10" />
          </>
        ) : null}
        
        <TimeUnit value={weeks} label="Semanas" show={true} />
        <div className="hidden md:block w-px h-12 bg-white/10" />
        <TimeUnit value={days} label="Días" show={true} />
      </div>
    </div>
  );
}
