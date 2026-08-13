"use client";

import { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";

const START_DATE = new Date("2026-05-13T00:00:00");
const TIMEZONE = "America/Caracas";

export function useCelebration() {
  const [isAnniversary, setIsAnniversary] = useState(false);
  const [monthsPassed, setMonthsPassed] = useState(0);

  useEffect(() => {
    const now = new Date();
    const nowInCaracas = formatInTimeZone(now, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    const dateNow = new Date(nowInCaracas);
    
    // Check if today is the 13th
    const isThirteenth = dateNow.getDate() === 13;
    
    // Calculate total months passed
    let months = (dateNow.getFullYear() - START_DATE.getFullYear()) * 12;
    months += dateNow.getMonth() - START_DATE.getMonth();
    
    // If today is before the 13th of the month, the current month isn't fully complete
    // But since we check isThirteenth, we know it is exactly the anniversary day.
    
    const hasPassedOneMonth = months >= 1;

    if (isThirteenth && hasPassedOneMonth) {
      const sessionKey = `anniversary_celebrated_${dateNow.getFullYear()}_${dateNow.getMonth()}`;
      const alreadyCelebrated = sessionStorage.getItem(sessionKey);

      if (!alreadyCelebrated) {
        setIsAnniversary(true);
        setMonthsPassed(months);
        sessionStorage.setItem(sessionKey, "true");
      }
    }
  }, []);

  return { isAnniversary, monthsPassed };
}
