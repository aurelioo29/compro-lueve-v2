"use client";
import { motion } from "framer-motion";

export function Stagger({
  children,
  delay = 0,
  stagger = 0.12,
  className = "",
}) {
  const container = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
