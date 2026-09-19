"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /** Animate immediately on mount instead of waiting for scroll-into-view.
   * Use for above-the-fold content (hero, form on a short page) where a
   * scroll-linked IntersectionObserver may never fire because the content
   * is already on screen when the page loads. */
  onMount?: boolean;
}) {
  const offset = {
    up: { y: 28 },
    down: { y: -28 },
    left: { x: 28 },
    right: { x: -28 },
    none: {},
  }[direction];

  const transition = {
    duration: 0.6,
    delay,
    ease: [0.21, 0.47, 0.32, 0.98] as const,
  };

  if (onMount) {
    return (
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
