"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// The real value is rendered in the server HTML, so it is always correct
// even if the animation never runs (hidden tab, reduced motion, slow JS).
// When the page is visible, the counter restarts from 0 and counts up.
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const skip =
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) return;

    el.textContent = "0";
    const unsubscribe = spring.on("change", (latest) => {
      el.textContent = Math.round(latest).toString();
    });
    motionValue.set(value);
    return unsubscribe;
  }, [value, motionValue, spring]);

  return <span ref={ref}>{value}</span>;
}
