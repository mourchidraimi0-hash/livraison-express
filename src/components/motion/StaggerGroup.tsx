"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function StaggerGroup({
  children,
  className,
  onMount = false,
}: {
  children: ReactNode;
  className?: string;
  /** Animate immediately on mount instead of waiting for scroll-into-view.
   * Use for above-the-fold content where an IntersectionObserver may never
   * fire because the content is already on screen when the page loads. */
  onMount?: boolean;
}) {
  if (onMount) {
    return (
      <motion.div variants={container} initial="hidden" animate="show" className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
