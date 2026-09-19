"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });

  // Animate on mount rather than gating on scroll-into-view: these stats
  // are typically already on screen when the dashboard loads, and an
  // IntersectionObserver-based trigger can be unreliable there, which would
  // leave the counter stuck at 0 — misleading on a dashboard.
  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toString();
    });
  }, [spring]);

  return <motion.span ref={ref}>0</motion.span>;
}
